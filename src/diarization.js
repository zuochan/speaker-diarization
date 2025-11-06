import * as ort from 'onnxruntime-web';
import Meyda from 'meyda';
import * as mlKMeans from 'ml-kmeans';
const kmeans = mlKMeans.kmeans || mlKMeans.default || mlKMeans;

const wasmModuleUrl = new URL(
  '../node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.jsep.mjs',
  import.meta.url
).href;
const wasmBinaryUrl = new URL(
  '../node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.jsep.wasm',
  import.meta.url
).href;

class BrowserSpeakerDiarization {
  constructor() {
    this.vadSession = null;
    this.embeddingSession = null;
    this.audioContext = null;
    this.vadStateMeta = null;
    this.vadState = null;
    this.vadSampleRateTensor = null;
    this.vadOutputName = null;
    this.vadStateOutputName = null;
    this.fixedNumSpeakers = 2; // 話者数を固定（2人）
    this.minOutputSegmentSec = 0.3; // これ未満の短い区間は結果として出力しない
  }
  
  async initialize() {
    // Configure ONNX Runtime to load WASM assets bundled by Vite with caching disabled
    const response = await fetch(wasmBinaryUrl, {
      cache: 'no-store',
      credentials: 'same-origin'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ONNX Runtime wasm: ${response.status}`);
    }

    const wasmBinary = new Uint8Array(await response.arrayBuffer());

    ort.env.wasm.numThreads = 1;
    ort.env.wasm.simd = true;
    ort.env.wasm.wasmBinary = wasmBinary;
    ort.env.wasm.wasmPaths = {
      wasm: wasmBinaryUrl,
      mjs: wasmModuleUrl
    };

    // 実行プロバイダをブラウザ環境に応じて設定
    const providers = ['wasm'];

    // VADモデルの読み込み
    try {
      console.log("🔄 VADモデルを読み込み中...");
      this.vadSession = await ort.InferenceSession.create(
        '/models/silero-vad.onnx',
        { executionProviders: providers }
      );
      console.log("✅ VADモデル読み込み成功");
    } catch (e) {
      console.error("❌ VAD モデルの読み込みに失敗:", e);
      throw new Error("VADモデルの初期化に失敗しました");
    }

    // 埋め込みモデルの読み込み
    try {
      console.log("🔄 埋め込みモデルを読み込み中...");
      this.embeddingSession = await ort.InferenceSession.create(
        '/models/wespeaker-simplified.onnx',
        { 
          executionProviders: providers,
          graphOptimizationLevel: 'all'
        }
      );
      console.log("✅ 埋め込みモデル読み込み成功");
    } catch (e) {
      console.error("❌ 埋め込みモデルの読み込みに失敗:", e);
      throw new Error("埋め込みモデルの初期化に失敗しました");
    }

    this.audioContext = new AudioContext({ sampleRate: 16000 });

    this.vadOutputName = this.resolveVadOutputName();
    this.vadStateOutputName = this.resolveVadStateOutputName();

    // 配列を名前付きオブジェクトに変換（もし配列だった場合）
    let vadInputMetadataRaw = this.vadSession.inputMetadata ?? {};
    let vadInputMetadata = Array.isArray(vadInputMetadataRaw)
      ? Object.fromEntries(vadInputMetadataRaw.map(entry => [entry.name, entry]))
      : vadInputMetadataRaw;

    // 🔧 state の入力名を強制的に指定
    const stateInputName = 'state';
    const stateOutputName = 'stateN';

    this.vadStateInputName = stateInputName;
    this.vadStateOutputName = stateOutputName;

    if (!vadInputMetadata[stateInputName]) {
      console.error("❌ 指定した state 入力名が存在しません:", stateInputName);
      console.error("📥 vadInputMetadata:", vadInputMetadata);
      throw new Error(`VADモデルに ${stateInputName} という入力が見つかりませんでした`);
    }

    this.vadStateMeta = vadInputMetadata[stateInputName];
    this.resetVadState();

    const srMeta = vadInputMetadata.sr ?? null;
    if (srMeta) {
      this.vadSampleRateTensor = this.createConstantTensor(
        srMeta,
        this.audioContext.sampleRate
      );
    } else {
      this.vadSampleRateTensor = null;
    }
  }
  
  async diarizeAudio(audioBuffer) {
    if (this.vadStateMeta) {
      this.resetVadState();
    }

    // 1. 音声区間検出
    const allSegments = await this.detectSpeech(audioBuffer);
    console.log(`${allSegments.length}個の音声セグメントを検出`);
    const speechSegments = this.filterShortSegments(allSegments, this.minOutputSegmentSec);
    if (speechSegments.length !== allSegments.length) {
      console.log(`短区間を除外: ${allSegments.length - speechSegments.length}件 (< ${this.minOutputSegmentSec}s)`);
    }

    // 2. 話者埋め込みを抽出
    let { embeddings, segmentMap } = await this.extractEmbeddings(speechSegments);
    ({ embeddings, segmentMap } = this.sanitizeEmbeddings(embeddings, segmentMap));

    if (embeddings.length === 0) {
      console.warn("⚠️ 有効な埋め込みが得られなかったため、単一話者として扱います。");
      return speechSegments.map(segment => ({
        start: segment.start,
        end: segment.end,
        speaker: '話者_0',
        confidence: 0
      }));
    }

    // 3. 話者をクラスタリング
    const desired = this.fixedNumSpeakers ?? 2;
    const numSpeakers = Math.max(1, Math.min(desired, embeddings.length));
    let clusterResult;
    try {
      clusterResult = kmeans(embeddings, numSpeakers, {
        initialization: 'random', // k-means++ の行選択エラー回避
        maxIterations: 100
      });
    } catch (e) {
      console.warn("⚠️ KMeansの初期化に失敗したため、単一話者にフォールバックします。", e);
      return speechSegments.map(segment => ({
        start: segment.start,
        end: segment.end,
        speaker: '話者_0',
        confidence: 0
      }));
    }

    // 4. タイムラインを構築（埋め込みが生成できた区間のみ出力）
    const timeline = [];
    for (let embeddingIndex = 0; embeddingIndex < segmentMap.length; embeddingIndex++) {
      const segmentIndex = segmentMap[embeddingIndex];
      const segment = speechSegments[segmentIndex];
      const clusterId = clusterResult.clusters[embeddingIndex] ?? 0;
      const centroidEntry = clusterResult.centroids[clusterId];
      const centroid = Array.isArray(centroidEntry?.centroid)
        ? centroidEntry.centroid
        : centroidEntry;

      timeline.push({
        start: segment.start,
        end: segment.end,
        speaker: `話者_${clusterId}`,
        confidence: centroid
          ? this.calculateConfidence(embeddings[embeddingIndex], centroid)
          : 0
      });
    }
    return timeline;
  }
  filterShortSegments(segments, minSec = 0.3) {
    if (!Array.isArray(segments) || segments.length === 0) return [];
    return segments.filter(s => (s.end - s.start) >= minSec);
  }

  
  async detectSpeech(audioBuffer) {
    const segments = [];
    const windowSize = 512;
    const hopSize = 256;
    let inSpeech = false;
    let segmentStart = 0;

    for (let i = 0; i < audioBuffer.length - windowSize; i += hopSize) {
      const window = audioBuffer.slice(i, i + windowSize);
      const input = new ort.Tensor('float32', window, [1, windowSize]);

      const feeds = { input };

      // 明示的に state を追加
      if (!this.vadState) {
        throw new Error("VAD state が未初期化です。initialize() で失敗している可能性があります。");
      }
      feeds[this.vadStateInputName] = this.vadState;

      // sr もあれば追加
      if (this.vadSampleRateTensor) {
        feeds.sr = this.vadSampleRateTensor;
      }

      const output = await this.vadSession.run(feeds);

      // 出力名の解決
      const vadTensor = this.vadOutputName
        ? output[this.vadOutputName]
        : Object.values(output)[0];

      // state 出力名の解決（再代入）
      if (this.vadStateOutputName && output[this.vadStateOutputName]) {
        this.vadState = output[this.vadStateOutputName];
      }

      const isSpeech = vadTensor.data[0] > 0.5;

      if (isSpeech && !inSpeech) {
        segmentStart = i;
        inSpeech = true;
      } else if (!isSpeech && inSpeech) {
        segments.push({
          start: segmentStart / this.audioContext.sampleRate,
          end: i / this.audioContext.sampleRate,
          audio: audioBuffer.slice(segmentStart, i)
        });
        inSpeech = false;
      }
    }

    if (inSpeech) {
      segments.push({
        start: segmentStart / this.audioContext.sampleRate,
        end: audioBuffer.length / this.audioContext.sampleRate,
        audio: audioBuffer.slice(segmentStart)
      });
    }

    return this.mergeShortSegments(segments, 0.3);
  }
  
  async extractEmbeddings(segments) {
    const embeddings = [];
    const segmentMap = [];

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const features = this.extractMFCC(segment.audio);
      if (features.length < 80) {
        console.warn(`⚠️ セグメント${i}のフレーム数が不足しているためスキップします。`);
        continue;
      }

      const usableLength = Math.floor(features.length / 80) * 80;
      const trimmed = features.slice(0, usableLength);

      const frames = usableLength / 80;
      const tensor = new ort.Tensor('float32', trimmed, [1, frames, 80]);

      const output = await this.embeddingSession.run({ feats: tensor });

      const embeddingTensor = output.embs;

      if (!embeddingTensor || !embeddingTensor.data) {
        console.warn("⚠️ 埋め込み出力が不正または空です");
        continue;
      }

      // 安全なベクトル化（[1,D] か [1,T,D] を想定）。時間方向がある場合は平均プーリング。
      const vector = this.poolEmbeddingTensor(embeddingTensor);
      if (!vector || !vector.length || !vector.every(Number.isFinite)) {
        console.warn("⚠️ 埋め込みベクトルが無効（NaN/Infinity/長さ0）だったためスキップします。");
        continue;
      }

      embeddings.push(this.l2Normalize(vector));
      segmentMap.push(i);
    }

    console.log("✅ 抽出された埋め込み数:", embeddings.length);
    if (segmentMap.length !== segments.length) {
      console.warn(`ℹ️ 埋め込みに使用できなかったセグメント数: ${segments.length - segmentMap.length}`);
    }

    return { embeddings, segmentMap };
  }

  l2Normalize(vec) {
    const norm = Math.hypot(...vec);
    if (!isFinite(norm) || norm === 0) return vec.slice();
    return vec.map(x => x / norm);
  }

  poolEmbeddingTensor(tensor) {
    const dims = Array.isArray(tensor.dims) ? tensor.dims : [];
    const data = tensor.data;
    if (!dims.length) return Array.from(data);

    // Expected shapes: [1, D] or [1, T, D]
    if (dims.length === 2) {
      const D = dims[1] ?? data.length;
      return Array.from(data).slice(0, D);
    }
    if (dims.length === 3) {
      const T = dims[1];
      const D = dims[2];
      const out = new Array(D).fill(0);
      for (let t = 0; t < T; t++) {
        const base = t * D;
        for (let d = 0; d < D; d++) out[d] += data[base + d];
      }
      for (let d = 0; d < D; d++) out[d] /= T || 1;
      return out;
    }
    // Fallback: treat the last dimension as a single vector
    const D = dims[dims.length - 1] || data.length;
    return Array.from(data).slice(-D);
  }

  sanitizeEmbeddings(embeddings, segmentMap) {
    if (!embeddings || embeddings.length === 0) return { embeddings: [], segmentMap: [] };

    // 1) Keep only finite-number vectors
    const finiteFiltered = [];
    const indexFiltered = [];
    for (let i = 0; i < embeddings.length; i++) {
      const v = embeddings[i];
      if (Array.isArray(v) && v.length && v.every(Number.isFinite)) {
        finiteFiltered.push(v);
        indexFiltered.push(segmentMap[i]);
      }
    }
    if (finiteFiltered.length === 0) return { embeddings: [], segmentMap: [] };

    // 2) Unify dimensionality: choose the most frequent length and truncate others
    const lengths = finiteFiltered.map(v => v.length);
    const freq = lengths.reduce((m, l) => (m.set(l, (m.get(l) || 0) + 1), m), new Map());
    let targetDim = lengths[0], maxFreq = 0;
    for (const [l, c] of freq.entries()) if (c > maxFreq) (maxFreq = c, targetDim = l);

    const sameDim = [];
    const sameDimIdx = [];
    for (let i = 0; i < finiteFiltered.length; i++) {
      const v = finiteFiltered[i];
      const vv = v.length === targetDim ? v : v.slice(0, targetDim);
      const norm = Math.hypot(...vv);
      if (norm > 0) {
        sameDim.push(vv);
        sameDimIdx.push(indexFiltered[i]);
      }
    }

    return { embeddings: sameDim, segmentMap: sameDimIdx };
  }
  
  extractMFCC(audioData) {
    // Meyda のオフライン抽出。必要に応じて sampleRate / window を調整。
    const mfccs = [];
    const bufferSize = 512;
    const hopSize = 256;
    for (let i = 0; i + bufferSize <= audioData.length; i += hopSize) {
      const frame = audioData.slice(i, i + bufferSize);
      const features = Meyda.extract('mfcc', frame, { sampleRate: 16000, bufferSize });
      if (Array.isArray(features) && features.length) mfccs.push(...features);
    }
    return new Float32Array(mfccs);
  }

  estimateSpeakerCount(embeddings) {
    console.log("🧪 埋め込み数:", embeddings.length);

    // 一意ベクトルの概算（小数第3位で丸めて比較）
    const uniqueKeys = new Set(
      embeddings.map(v => v.map(x => Math.round(x * 1e3) / 1e3).join(','))
    );
    const uniqueCount = uniqueKeys.size;

    if (embeddings.length < 2 || uniqueCount < 2) {
      console.warn("❗ クラスタリングできるだけの多様性がありません。");
      return 1;
    }

    const maxK = Math.min(10, uniqueCount, Math.floor(embeddings.length / 2));
    let bestK = 2;
    let bestError = Infinity;

    for (let k = 2; k <= maxK; k++) {
      if (embeddings.length < k) break;
      try {
        const result = kmeans(embeddings, k, { initialization: 'random', maxIterations: 50 });
        const err =
          (result.computeInformation && Number.isFinite(result.computeInformation.error))
            ? result.computeInformation.error
            : (Array.isArray(result.centroids)
              ? result.clusters.reduce((sum, cIdx, i) => {
                  const cEntry = result.centroids[cIdx];
                  const c = Array.isArray(cEntry?.centroid) ? cEntry.centroid : cEntry;
                  const v = embeddings[i];
                  const d2 = v.reduce((s, val, j) => {
                    const diff = val - c[j];
                    return s + diff * diff;
                  }, 0);
                  return sum + d2;
                }, 0)
              : Infinity);

        if (err < bestError * 0.9) { // 明確な改善がある場合のみ更新
          bestError = err;
          bestK = k;
        }
      } catch (e) {
        console.warn(`k=${k} のkmeansで失敗:`, e);
        break;
      }
    }

    console.log("🧩 得られた埋め込み数:", embeddings.length, "unique:", uniqueCount, "bestK:", bestK);
    return Math.min(bestK, uniqueCount, embeddings.length);
  }
  
  calculateConfidence(embedding, centroid) {
    // 信頼度スコアとしてコサイン類似度を使用
    const dotProduct = embedding.reduce((sum, val, i) => 
      sum + val * centroid[i], 0);
    const normA = Math.sqrt(embedding.reduce((sum, val) => 
      sum + val * val, 0));
    const normB = Math.sqrt(centroid.reduce((sum, val) => 
      sum + val * val, 0));
    
    return dotProduct / (normA * normB);
  }

  resetVadState() {
    if (!this.vadStateMeta) {
      this.vadState = null;
      return;
    }
    
    this.vadState = this.createConstantTensor(this.vadStateMeta, 0);
  }

  resolveVadOutputName() {
    if (!this.vadSession) return null;
    if (this.vadSession.outputNames.includes('output')) {
      return 'output';
    }
    return this.vadSession.outputNames[0] ?? null;
  }

  resolveVadStateOutputName() {
    if (!this.vadSession) return null;
    const candidates = this.vadSession.outputNames.filter(
      name => name !== this.vadOutputName
    );
    const stateName = candidates.find(name => name.toLowerCase().includes('state'));
    return stateName ?? candidates[0] ?? null;
  }

  createConstantTensor(meta, value) {
    const shape = this.getConcreteShape(meta?.dimensions ?? meta?.shape);
    const size = shape.reduce((total, dim) => total * dim, 1);
    const type = this.normalizeTensorType(meta?.type);
    const typedArray = this.createTypedArray(type, size);
    
    if (type === 'bool') {
      typedArray.fill(value ? 1 : 0);
    } else if (type === 'int64') {
      typedArray.fill(BigInt(value));
    } else {
      typedArray.fill(value);
    }
    
    return new ort.Tensor(type, typedArray, shape);
  }

  getConcreteShape(shape) {
    if (!shape || shape.length === 0) {
      return [1];
    }

    return shape.map(dim => {
      if (typeof dim === 'number') {
        // 不定値（-1）や異常な大きさを避ける
        return dim > 0 && dim < 10000 ? dim : 1;
      }
      // 文字列（'?'）や undefined 対策
      return 1;
    });
  }

  createTypedArray(type, size) {
    switch (type) {
      case 'float32':
        return new Float32Array(size);
      case 'float64':
        return new Float64Array(size);
      case 'int32':
        return new Int32Array(size);
      case 'int16':
        return new Int16Array(size);
      case 'int8':
        return new Int8Array(size);
      case 'uint32':
        return new Uint32Array(size);
      case 'uint16':
        return new Uint16Array(size);
      case 'uint8':
      case 'bool':
        return new Uint8Array(size);
      case 'int64':
        return new BigInt64Array(size);
      default:
        throw new Error(`Unsupported tensor type: ${type}`);
    }
  }

  normalizeTensorType(type) {
    if (!type) {
      return 'float32';
    }
    if (type.startsWith('tensor(') && type.endsWith(')')) {
      return type.slice(7, -1);
    }
    return type;
  }
  
  mergeShortSegments(segments, minGap = 0.3) {
    if (segments.length === 0) return [];
    
    const merged = [segments[0]];
    
    for (let i = 1; i < segments.length; i++) {
      const lastSegment = merged[merged.length - 1];
      
      if (segments[i].start - lastSegment.end < minGap) {
        // セグメントをマージ
        lastSegment.end = segments[i].end;
        lastSegment.audio = new Float32Array([
          ...lastSegment.audio,
          ...segments[i].audio
        ]);
      } else {
        merged.push(segments[i]);
      }
    }
    
    return merged;
  }
}

// 使用例
async function processMeetingAudio() {
  const diarizer = new BrowserSpeakerDiarization();
  await diarizer.initialize();
  
  // ファイル入力から音声を取得
  const fileInput = document.getElementById('audioFile');
  const audioFile = fileInput.files[0];
  const arrayBuffer = await audioFile.arrayBuffer();
  
  // 音声をデコード
  const audioBuffer = await diarizer.audioContext.decodeAudioData(arrayBuffer);
  const audioData = audioBuffer.getChannelData(0); // モノチャンネルを取得
  
  // 話者分離を実行
  const timeline = await diarizer.diarizeAudio(audioData);
  
  // 結果を表示
  timeline.forEach(segment => {
    console.log(
      `${segment.speaker}: ${segment.start.toFixed(2)}秒 - ${segment.end.toFixed(2)}秒 ` +
      `(信頼度: ${(segment.confidence * 100).toFixed(1)}%)`
    );
  });
  
  return timeline;
}

export { BrowserSpeakerDiarization };

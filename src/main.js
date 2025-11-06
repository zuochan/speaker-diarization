import { BrowserSpeakerDiarization } from './diarization.js';

let diarizer = null;
let objectUrl = null;      // for player.src cleanup
let segments = [];         // diarization result [{start,end,speaker,confidence}]
let rafId = null;          // requestAnimationFrame id
let lastActiveIdx = -1;    // currently highlighted segment index

let timelineClickHandler = null; // to avoid stacking click listeners on #timeline
let playerEventsHooked = false;  // to avoid stacking audio event listeners

const initBtn = document.getElementById('initBtn');
const processBtn = document.getElementById('processBtn');
const statusEl = document.getElementById('status');
const resultEl = document.getElementById('result');
const fileInput = document.getElementById('audioFile');
const player = document.getElementById('player');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const timelineEl = document.getElementById('timeline');

if (processBtn) processBtn.disabled = true;

initBtn?.addEventListener('click', async () => {
  try {
    if (statusEl) statusEl.textContent = 'モデルを読み込んでいます...';
    diarizer = new BrowserSpeakerDiarization();
    await diarizer.initialize();
    if (statusEl) statusEl.textContent = '準備完了！音声ファイルを選択してください';
    if (processBtn) processBtn.disabled = false;
  } catch (error) {
    console.error(error);
    if (statusEl) statusEl.textContent = `エラー: ${error?.message ?? error}`;
  }
});

processBtn?.addEventListener('click', async () => {
  try {
    const file = fileInput?.files?.[0];
    if (!file) { alert('音声ファイルを選択してください'); return; }

    // 既存のフックを解除
    unhookPlayerEvents();

    // 音声プレーヤーに読み込む
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(file);
    player.src = objectUrl;

    // 画面リセット
    segments = [];
    cancelRaf();
    lastActiveIdx = -1;
    clearTimeline();
    clearResults();
    updateTimeDisplays(0, 0);

    if (statusEl) statusEl.textContent = '音声を処理中...';

    // WebAudio でデコード（diarizer のコンテキストを使用）
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await diarizer.audioContext.decodeAudioData(arrayBuffer);
    const audioData = audioBuffer.getChannelData(0);

    // 話者分離を実行
    segments = await diarizer.diarizeAudio(audioData);

    // メタデータがまだなら待つ
    if (player.readyState < 1) {
      await waitForEvent(player, 'loadedmetadata');
    }

    // 念のためソート（start昇順）
    segments.sort((a, b) => a.start - b.start);

    // タイムライン描画 & テーブル表示
    renderTimeline(segments, player.duration);
    displayResults(segments, resultEl);

    // シーク・再生同期の開始
    hookPlayerEvents();

    if (statusEl) statusEl.textContent = '完了！';
  } catch (error) {
    console.error(error);
    if (statusEl) statusEl.textContent = `エラー: ${error?.message ?? error}`;
  }
});

function displayResults(timeline, container) {
  if (!container) return;
  container.innerHTML = '';
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>#</th>
        <th>話者</th>
        <th>開始</th>
        <th>終了</th>
        <th>信頼度</th>
      </tr>
    </thead>
    <tbody>
      ${timeline.map((segment, idx) => `
        <tr data-idx="${idx}">
          <td>${idx}</td>
          <td>${segment.speaker}</td>
          <td>${formatTime(segment.start)}</td>
          <td>${formatTime(segment.end)}</td>
          <td>${(segment.confidence * 100).toFixed(1)}%</td>
        </tr>
      `).join('')}
    </tbody>
  `;

  // 行クリックで該当区間へシーク
  table.querySelectorAll('tbody tr').forEach(tr => {
    tr.addEventListener('click', () => {
      const idx = Number(tr.getAttribute('data-idx'));
      const seg = segments[idx];
      if (!seg) return;
      player.currentTime = seg.start + 0.001; // 発音頭切れを避ける
      player.play().catch(() => {});
    });
  });

  container.appendChild(table);
}

/* ===== Timeline Rendering & Sync ===== */
function renderTimeline(timeline, duration) {
  clearTimeline();
  if (!timelineEl || !Number.isFinite(duration) || duration <= 0) return;

  // セグメントを追加
  timeline.forEach((seg, idx) => {
    const left = (seg.start / duration) * 100;
    const width = ((seg.end - seg.start) / duration) * 100;
    const el = document.createElement('div');
    el.className = `segment ${seg.speaker === '話者_0' ? 'spk0' : 'spk1'}`;
    el.style.left = `${left}%`;
    el.style.width = `${width}%`;
    el.dataset.idx = String(idx);
    el.title = `${seg.speaker} ${formatTime(seg.start)} - ${formatTime(seg.end)}`;
    el.addEventListener('click', (ev) => {
      ev.stopPropagation();
      player.currentTime = seg.start + 0.001;
      player.play().catch(() => {});
    });
    timelineEl.appendChild(el);
  });

  // 再生ヘッド
  const head = document.createElement('div');
  head.className = 'playhead';
  head.style.left = '0%';
  timelineEl.appendChild(head);

  // タイムラインクリックでシーク（多重バインド防止）
  if (timelineClickHandler) {
    timelineEl.removeEventListener('click', timelineClickHandler);
  }
  timelineClickHandler = (e) => {
    const rect = timelineEl.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    player.currentTime = ratio * duration;
  };
  timelineEl.addEventListener('click', timelineClickHandler);
}

function clearTimeline() {
  if (!timelineEl) return;
  timelineEl.innerHTML = '';
}

function hookPlayerEvents() {
  if (playerEventsHooked) return; // すでにフック済みなら何もしない
  playerEventsHooked = true;

  // 初期表示
  updateTimeDisplays(player.currentTime, player.duration);

  player.addEventListener('timeupdate', onTimeUpdate);
  player.addEventListener('durationchange', onTimeUpdate);
  player.addEventListener('seeking', onTimeUpdate);
  player.addEventListener('play', startRaf);
  player.addEventListener('pause', cancelRaf);
  player.addEventListener('ended', cancelRaf);

  startRaf();
}

function unhookPlayerEvents() {
  if (!playerEventsHooked) return;
  player.removeEventListener('timeupdate', onTimeUpdate);
  player.removeEventListener('durationchange', onTimeUpdate);
  player.removeEventListener('seeking', onTimeUpdate);
  player.removeEventListener('play', startRaf);
  player.removeEventListener('pause', cancelRaf);
  player.removeEventListener('ended', cancelRaf);
  cancelRaf();
  playerEventsHooked = false;
}

function onTimeUpdate() {
  updateTimeDisplays(player.currentTime, player.duration);
  updatePlayhead(player.currentTime, player.duration);
  setActiveSegment(player.currentTime);
}

function startRaf() {
  cancelRaf();
  const step = () => {
    onTimeUpdate();
    rafId = requestAnimationFrame(step);
  };
  rafId = requestAnimationFrame(step);
}

function cancelRaf() {
  if (rafId != null) cancelAnimationFrame(rafId);
  rafId = null;
}

function updatePlayhead(t, duration) {
  const head = timelineEl?.querySelector('.playhead');
  if (!head || !Number.isFinite(duration) || duration <= 0) return;
  const left = Math.min(100, Math.max(0, (t / duration) * 100));
  head.style.left = `${left}%`;
}

function setActiveSegment(t) {
  if (!Array.isArray(segments) || segments.length === 0) return;
  const idx = findSegmentIndexAtTime(segments, t);
  if (idx === lastActiveIdx) return;

  // タイムラインのハイライト
  const prev = timelineEl?.querySelector(`.segment[data-idx="${lastActiveIdx}"]`);
  prev?.classList.remove('active');
  const cur = timelineEl?.querySelector(`.segment[data-idx="${idx}"]`);
  cur?.classList.add('active');

  // テーブルのハイライト（任意）
  const prevRow = resultEl?.querySelector(`tr[data-idx="${lastActiveIdx}"]`);
  prevRow?.classList.remove('active-row');
  const curRow = resultEl?.querySelector(`tr[data-idx="${idx}"]`);
  curRow?.classList.add('active-row');

  lastActiveIdx = idx;
}

function findSegmentIndexAtTime(list, t) {
  // 二分探索（start <= t < end）
  let lo = 0, hi = list.length - 1, ans = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const seg = list[mid];
    if (t < seg.start) {
      hi = mid - 1;
    } else if (t >= seg.end) {
      lo = mid + 1;
    } else {
      return mid;
    }
  }
  // どれにも当たらない場合は直前セグメント or 0
  return Math.max(0, Math.min(list.length - 1, hi));
}

/* ===== Utilities ===== */
function waitForEvent(target, type) {
  return new Promise(res => target.addEventListener(type, () => res(), { once: true }));
}

function formatTime(sec) {
  if (!Number.isFinite(sec)) return '00:00.0';
  const m = Math.floor(sec / 60);
  const s = sec - m * 60;
  const whole = Math.floor(s).toString().padStart(2, '0');
  const tenth = Math.floor((s - Math.floor(s)) * 10);
  return `${m.toString().padStart(2, '0')}:${whole}.${tenth}`;
}

function updateTimeDisplays(current, duration) {
  if (currentTimeEl) currentTimeEl.textContent = formatTime(current);
  if (durationEl) durationEl.textContent = formatTime(duration);
}

function clearResults() {
  if (resultEl) resultEl.innerHTML = '';
}
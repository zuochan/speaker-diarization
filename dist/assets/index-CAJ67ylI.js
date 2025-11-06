(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();/*!
 * ONNX Runtime Web v1.23.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var js=Object.defineProperty,_m=Object.getOwnPropertyDescriptor,bm=Object.getOwnPropertyNames,vm=Object.prototype.hasOwnProperty,$m=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,i)=>(typeof require<"u"?require:t)[i]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),ce=(e,t)=>()=>(e&&(t=e(e=0)),t),Br=(e,t)=>{for(var i in t)js(e,i,{get:t[i],enumerable:!0})},xm=(e,t,i,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of bm(t))!vm.call(e,n)&&n!==i&&js(e,n,{get:()=>t[n],enumerable:!(r=_m(t,n))||r.enumerable});return e},oi=e=>xm(js({},"__esModule",{value:!0}),e),Vr,rr,Ar,Za,Nd,Dd=ce(()=>{Vr=new Map,rr=[],Ar=(e,t,i)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=Vr.get(e);if(r===void 0)Vr.set(e,{backend:t,priority:i});else{if(r.priority>i)return;if(r.priority===i&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${i}`)}if(i>=0){let n=rr.indexOf(e);n!==-1&&rr.splice(n,1);for(let o=0;o<rr.length;o++)if(Vr.get(rr[o]).priority<=i){rr.splice(o,0,e);return}rr.push(e)}return}throw new TypeError("not a valid backend")},Za=async e=>{let t=Vr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let i=!!t.initPromise;try{return i||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(r){return i||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Nd=async e=>{let t=e.executionProviders||[],i=t.map(c=>typeof c=="string"?c:c.name),r=i.length===0?rr:i,n,o=[],l=new Set;for(let c of r){let m=await Za(c);typeof m=="string"?o.push({name:c,err:m}):(n||(n=m),n===m&&l.add(c))}if(!n)throw new Error(`no available backend found. ERR: ${o.map(c=>`[${c.name}] ${c.err}`).join(", ")}`);for(let{name:c,err:m}of o)i.includes(c)&&console.warn(`removing requested execution provider "${c}" from session options because it is not available: ${m}`);let h=t.filter(c=>l.has(typeof c=="string"?c:c.name));return[n,new Proxy(e,{get:(c,m)=>m==="executionProviders"?h:Reflect.get(c,m)})]}}),Sm=ce(()=>{Dd()}),jd,km=ce(()=>{jd="1.23.0"}),Sn,yt,Pd=ce(()=>{km(),Sn="warning",yt={wasm:{},webgl:{},webgpu:{},versions:{common:jd},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Sn=e}},get logLevel(){return Sn}},Object.defineProperty(yt,"logLevel",{enumerable:!0})}),Je,Cm=ce(()=>{Pd(),Je=yt}),qd,Ud,Tm=ce(()=>{qd=(e,t)=>{let i=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);i.width=e.dims[3],i.height=e.dims[2];let r=i.getContext("2d");if(r!=null){let n,o;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],o=e.dims[3]):(n=e.dims[3],o=e.dims[2]);let l=t?.format!==void 0?t.format:"RGB",h=t?.norm,c,m;h===void 0||h.mean===void 0?c=[255,255,255,255]:typeof h.mean=="number"?c=[h.mean,h.mean,h.mean,h.mean]:(c=[h.mean[0],h.mean[1],h.mean[2],0],h.mean[3]!==void 0&&(c[3]=h.mean[3])),h===void 0||h.bias===void 0?m=[0,0,0,0]:typeof h.bias=="number"?m=[h.bias,h.bias,h.bias,h.bias]:(m=[h.bias[0],h.bias[1],h.bias[2],0],h.bias[3]!==void 0&&(m[3]=h.bias[3]));let y=o*n,_=0,v=y,S=y*2,k=-1;l==="RGBA"?(_=0,v=y,S=y*2,k=y*3):l==="RGB"?(_=0,v=y,S=y*2):l==="RBG"&&(_=0,S=y,v=y*2);for(let E=0;E<o;E++)for(let N=0;N<n;N++){let I=(e.data[_++]-m[0])*c[0],T=(e.data[v++]-m[1])*c[1],j=(e.data[S++]-m[2])*c[2],B=k===-1?255:(e.data[k++]-m[3])*c[3];r.fillStyle="rgba("+I+","+T+","+j+","+B+")",r.fillRect(N,E,1,1)}if("toDataURL"in i)return i.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Ud=(e,t)=>{let i=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(i!=null){let n,o,l;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],o=e.dims[1],l=e.dims[3]):(n=e.dims[3],o=e.dims[2],l=e.dims[1]);let h=t!==void 0&&t.format!==void 0?t.format:"RGB",c=t?.norm,m,y;c===void 0||c.mean===void 0?m=[255,255,255,255]:typeof c.mean=="number"?m=[c.mean,c.mean,c.mean,c.mean]:(m=[c.mean[0],c.mean[1],c.mean[2],255],c.mean[3]!==void 0&&(m[3]=c.mean[3])),c===void 0||c.bias===void 0?y=[0,0,0,0]:typeof c.bias=="number"?y=[c.bias,c.bias,c.bias,c.bias]:(y=[c.bias[0],c.bias[1],c.bias[2],0],c.bias[3]!==void 0&&(y[3]=c.bias[3]));let _=o*n;if(t!==void 0&&(t.format!==void 0&&l===4&&t.format!=="RGBA"||l===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let v=4,S=0,k=1,E=2,N=3,I=0,T=_,j=_*2,B=-1;h==="RGBA"?(I=0,T=_,j=_*2,B=_*3):h==="RGB"?(I=0,T=_,j=_*2):h==="RBG"&&(I=0,j=_,T=_*2),r=i.createImageData(n,o);for(let W=0;W<o*n;S+=v,k+=v,E+=v,N+=v,W++)r.data[S]=(e.data[I++]-y[0])*m[0],r.data[k]=(e.data[T++]-y[1])*m[1],r.data[E]=(e.data[j++]-y[2])*m[2],r.data[N]=B===-1?255:(e.data[B++]-y[3])*m[3]}else throw new Error("Can not access image data");return r}}),Ci,Ld,Fd,Wd,Vd,Gd,Em=ce(()=>{Ps(),Ci=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:i,width:r}=t,n=t.norm??{mean:255,bias:0},o,l;typeof n.mean=="number"?o=[n.mean,n.mean,n.mean,n.mean]:o=[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],typeof n.bias=="number"?l=[n.bias,n.bias,n.bias,n.bias]:l=[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let h=t.format!==void 0?t.format:"RGBA",c=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",m=i*r,y=c==="RGBA"?new Float32Array(m*4):new Float32Array(m*3),_=4,v=0,S=1,k=2,E=3,N=0,I=m,T=m*2,j=-1;h==="RGB"&&(_=3,v=0,S=1,k=2,E=-1),c==="RGBA"?j=m*3:c==="RBG"?(N=0,T=m,I=m*2):c==="BGR"&&(T=0,I=m,N=m*2);for(let B=0;B<m;B++,v+=_,k+=_,S+=_,E+=_)y[N++]=(e[v]+l[0])/o[0],y[I++]=(e[S]+l[1])/o[1],y[T++]=(e[k]+l[2])/o[2],j!==-1&&E!==-1&&(y[j++]=(e[E]+l[3])/o[3]);return c==="RGBA"?new At("float32",y,[1,4,i,r]):new At("float32",y,[1,3,i,r])},Ld=async(e,t)=>{let i=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,n=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,o=typeof e=="string",l,h=t??{},c=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},m=y=>typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||y instanceof OffscreenCanvas?y.getContext("2d"):null;if(i){let y=c();y.width=e.width,y.height=e.height;let _=m(y);if(_!=null){let v=e.height,S=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(v=t.resizedHeight,S=t.resizedWidth),t!==void 0){if(h=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");h.tensorFormat="RGBA",h.height=v,h.width=S}else h.tensorFormat="RGBA",h.height=v,h.width=S;_.drawImage(e,0,0),l=_.getImageData(0,0,S,v).data}else throw new Error("Can not access image data")}else if(r){let y,_;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(y=t.resizedHeight,_=t.resizedWidth):(y=e.height,_=e.width),t!==void 0&&(h=t),h.format="RGBA",h.height=y,h.width=_,t!==void 0){let v=c();v.width=_,v.height=y;let S=m(v);if(S!=null)S.putImageData(e,0,0),l=S.getImageData(0,0,_,y).data;else throw new Error("Can not access image data")}else l=e.data}else if(n){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let y=c();y.width=e.width,y.height=e.height;let _=m(y);if(_!=null){let v=e.height,S=e.width;return _.drawImage(e,0,0,S,v),l=_.getImageData(0,0,S,v).data,h.height=v,h.width=S,Ci(l,h)}else throw new Error("Can not access image data")}else{if(o)return new Promise((y,_)=>{let v=c(),S=m(v);if(!e||!S)return _();let k=new Image;k.crossOrigin="Anonymous",k.src=e,k.onload=()=>{v.width=k.width,v.height=k.height,S.drawImage(k,0,0,v.width,v.height);let E=S.getImageData(0,0,v.width,v.height);h.height=v.height,h.width=v.width,y(Ci(E.data,h))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(l!==void 0)return Ci(l,h);throw new Error("Input data provided is not supported - aborted tensor creation")},Fd=(e,t)=>{let{width:i,height:r,download:n,dispose:o}=t,l=[1,r,i,4];return new At({location:"texture",type:"float32",texture:e,dims:l,download:n,dispose:o})},Wd=(e,t)=>{let{dataType:i,dims:r,download:n,dispose:o}=t;return new At({location:"gpu-buffer",type:i??"float32",gpuBuffer:e,dims:r,download:n,dispose:o})},Vd=(e,t)=>{let{dataType:i,dims:r,download:n,dispose:o}=t;return new At({location:"ml-tensor",type:i??"float32",mlTensor:e,dims:r,download:n,dispose:o})},Gd=(e,t,i)=>new At({location:"cpu-pinned",type:e,data:t,dims:i??[t.length]})}),wr,ri,kn,Kd,Im=ce(()=>{wr=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),ri=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),kn=!1,Kd=()=>{if(!kn){kn=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,i=globalThis.Float16Array,r=typeof i<"u"&&i.from;e&&(wr.set("int64",BigInt64Array),ri.set(BigInt64Array,"int64")),t&&(wr.set("uint64",BigUint64Array),ri.set(BigUint64Array,"uint64")),r?(wr.set("float16",i),ri.set(i,"float16")):wr.set("float16",Uint16Array)}}}),Hd,Zd,zm=ce(()=>{Ps(),Hd=e=>{let t=1;for(let i=0;i<e.length;i++){let r=e[i];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${i}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${i}] must be a non-negative integer, got: ${r}`);t*=r}return t},Zd=(e,t)=>{switch(e.location){case"cpu":return new At(e.type,e.data,t);case"cpu-pinned":return new At({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new At({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new At({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new At({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),At,Ps=ce(()=>{Tm(),Em(),Im(),zm(),At=class{constructor(e,t,i){Kd();let r,n;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,r=e.type,n=e.dims,e.location){case"cpu-pinned":{let l=wr.get(r);if(!l)throw new TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(e.data instanceof l))throw new TypeError(`buffer should be of type ${l.name}`);this.cpuData=e.data;break}case"texture":{if(r!=="float32")throw new TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint64"&&r!=="int8"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let l,h;if(typeof e=="string")if(r=e,h=i,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");l=t}else{let c=wr.get(e);if(c===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&c===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${c.name} as data.`);e==="uint64"||e==="int64"?l=c.from(t,BigInt):l=c.from(t)}else if(t instanceof c)l=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")l=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&c!==Uint16Array)l=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${r} tensor's data must be type of ${c}`)}else if(h=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let c=typeof e[0];if(c==="string")r="string",l=e;else if(c==="boolean")r="bool",l=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${c}.`)}else if(e instanceof Uint8ClampedArray)r="uint8",l=Uint8Array.from(e);else{let c=ri.get(e.constructor);if(c===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);r=c,l=e}if(h===void 0)h=[l.length];else if(!Array.isArray(h))throw new TypeError("A tensor's dims must be a number array");n=h,this.cpuData=l,this.dataLocation="cpu"}let o=Hd(n);if(this.cpuData&&o!==this.cpuData.length&&!((r==="uint4"||r==="int4")&&Math.ceil(o/2)===this.cpuData.length))throw new Error(`Tensor's size(${o}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=n,this.size=o}static async fromImage(e,t){return Ld(e,t)}static fromTexture(e,t){return Fd(e,t)}static fromGpuBuffer(e,t){return Wd(e,t)}static fromMLTensor(e,t){return Vd(e,t)}static fromPinnedBuffer(e,t,i){return Gd(e,t,i)}toDataURL(e){return qd(this,e)}toImageData(e){return Ud(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Zd(this,e)}}}),Bt,Xd=ce(()=>{Ps(),Bt=At}),Li,Cn,Ht,Ft,br,vr,Yd=ce(()=>{Pd(),Li=(e,t)=>{(typeof yt.trace>"u"?!yt.wasm.trace:!yt.trace)||console.timeStamp(`${e}::ORT::${t}`)},Cn=(e,t)=>{let i=new Error().stack?.split(/\r\n|\r|\n/g)||[],r=!1;for(let n=0;n<i.length;n++){if(r&&!i[n].includes("TRACE_FUNC")){let o=`FUNC_${e}::${i[n].trim().split(" ")[1]}`;t&&(o+=`::${t}`),Li("CPU",o);return}i[n].includes("TRACE_FUNC")&&(r=!0)}},Ht=e=>{(typeof yt.trace>"u"?!yt.wasm.trace:!yt.trace)||Cn("BEGIN",e)},Ft=e=>{(typeof yt.trace>"u"?!yt.wasm.trace:!yt.trace)||Cn("END",e)},br=e=>{(typeof yt.trace>"u"?!yt.wasm.trace:!yt.trace)||console.time(`ORT::${e}`)},vr=e=>{(typeof yt.trace>"u"?!yt.wasm.trace:!yt.trace)||console.timeEnd(`ORT::${e}`)}}),Qd,Am=ce(()=>{Dd(),Xd(),Yd(),Qd=class Jd{constructor(t){this.handler=t}async run(t,i,r){Ht(),br("InferenceSession.run");let n={},o={};if(typeof t!="object"||t===null||t instanceof Bt||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let l=!0;if(typeof i=="object"){if(i===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(i instanceof Bt)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(i)){if(i.length===0)throw new TypeError("'fetches' cannot be an empty array.");l=!1;for(let m of i){if(typeof m!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(m)===-1)throw new RangeError(`'fetches' contains invalid output name: ${m}.`);n[m]=null}if(typeof r=="object"&&r!==null)o=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let m=!1,y=Object.getOwnPropertyNames(i);for(let _ of this.outputNames)if(y.indexOf(_)!==-1){let v=i[_];(v===null||v instanceof Bt)&&(m=!0,l=!1,n[_]=v)}if(m){if(typeof r=="object"&&r!==null)o=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else o=i}}else if(typeof i<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let m of this.inputNames)if(typeof t[m]>"u")throw new Error(`input '${m}' is missing in 'feeds'.`);if(l)for(let m of this.outputNames)n[m]=null;let h=await this.handler.run(t,n,o),c={};for(let m in h)if(Object.hasOwnProperty.call(h,m)){let y=h[m];y instanceof Bt?c[m]=y:c[m]=new Bt(y.type,y.data,y.dims)}return vr("InferenceSession.run"),Ft(),c}async release(){return this.handler.dispose()}static async create(t,i,r,n){Ht(),br("InferenceSession.create");let o,l={};if(typeof t=="string"){if(o=t,typeof i=="object"&&i!==null)l=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(o=t,typeof i=="object"&&i!==null)l=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let y=t,_=0,v=t.byteLength;if(typeof i=="object"&&i!==null)l=i;else if(typeof i=="number"){if(_=i,!Number.isSafeInteger(_))throw new RangeError("'byteOffset' must be an integer.");if(_<0||_>=y.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${y.byteLength}).`);if(v=t.byteLength-_,typeof r=="number"){if(v=r,!Number.isSafeInteger(v))throw new RangeError("'byteLength' must be an integer.");if(v<=0||_+v>y.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${y.byteLength-_}].`);if(typeof n=="object"&&n!==null)l=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof i<"u")throw new TypeError("'options' must be an object.");o=new Uint8Array(y,_,v)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[h,c]=await Nd(l),m=await h.createInferenceSessionHandler(o,c);return vr("InferenceSession.create"),Ft(),new Jd(m)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Fi,Mm=ce(()=>{Am(),Fi=Qd}),Rm=ce(()=>{}),Om=ce(()=>{}),Bm=ce(()=>{}),Nm=ce(()=>{}),Dm={};Br(Dm,{InferenceSession:()=>Fi,TRACE:()=>Li,TRACE_EVENT_BEGIN:()=>br,TRACE_EVENT_END:()=>vr,TRACE_FUNC_BEGIN:()=>Ht,TRACE_FUNC_END:()=>Ft,Tensor:()=>Bt,env:()=>Je,registerBackend:()=>Ar});var Nt=ce(()=>{Sm(),Cm(),Mm(),Xd(),Rm(),Om(),Yd(),Bm(),Nm()}),qs=ce(()=>{}),ep={};Br(ep,{default:()=>tp});var Tn,En,tp,jm=ce(()=>{oc(),kr(),Us(),Tn="ort-wasm-proxy-worker",En=globalThis.self?.name===Tn,En&&(self.onmessage=e=>{let{type:t,in:i}=e.data;try{switch(t){case"init-wasm":Ls(i.wasm).then(()=>{sa(i).then(()=>{postMessage({type:t})},r=>{postMessage({type:t,err:r})})},r=>{postMessage({type:t,err:r})});break;case"init-ep":{let{epName:r,env:n}=i;aa(n,r).then(()=>{postMessage({type:t})},o=>{postMessage({type:t,err:o})});break}case"copy-from":{let{buffer:r}=i,n=Xi(r);postMessage({type:t,out:n});break}case"create":{let{model:r,options:n}=i;oa(r,n).then(o=>{postMessage({type:t,out:o})},o=>{postMessage({type:t,err:o})});break}case"release":ua(i),postMessage({type:t});break;case"run":{let{sessionId:r,inputIndices:n,inputs:o,outputIndices:l,options:h}=i;la(r,n,o,l,new Array(l.length).fill(null),h).then(c=>{c.some(m=>m[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:c},pa([...o,...c]))},c=>{postMessage({type:t,err:c})});break}case"end-profiling":da(i),postMessage({type:t});break;default:}}catch(r){postMessage({type:t,err:r})}}),tp=En?null:e=>new Worker(e??zt,{type:"module",name:Tn})}),rp={};Br(rp,{default:()=>ip});var In,ip,Xa,Pm=ce(()=>{In=async function(e={}){var t,i,r=e,n=new Promise((u,f)=>{t=u,i=f}),o=typeof window=="object",l=typeof WorkerGlobalScope<"u",h=l&&self.name?.startsWith("em-pthread");r.mountExternalData=(u,f)=>{u.startsWith("./")&&(u=u.substring(2)),(r.Fb||(r.Fb=new Map)).set(u,f)},r.unmountExternalData=()=>{delete r.Fb};var c=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qc:!0}).buffer.constructor;let m=u=>async(...f)=>{try{if(r.Gb)throw Error("Session already started");let w=r.Gb={ec:f[0],errors:[]},b=await u(...f);if(r.Gb!==w)throw Error("Session mismatch");r.Kb?.flush();let C=w.errors;if(0<C.length){let D=await Promise.all(C);if(D=D.filter(G=>G),0<D.length)throw Error(D.join(`
`))}return b}finally{r.Gb=null}};r.jsepInit=(u,f)=>{if(u==="webgpu"){[r.Kb,r.Vb,r.Zb,r.Lb,r.Yb,r.Ab,r.$b,r.bc,r.Wb,r.Xb,r.ac]=f;let w=r.Kb;r.jsepRegisterBuffer=(b,C,D,G)=>w.registerBuffer(b,C,D,G),r.jsepGetBuffer=b=>w.getBuffer(b),r.jsepCreateDownloader=(b,C,D)=>w.createDownloader(b,C,D),r.jsepOnCreateSession=b=>{w.onCreateSession(b)},r.jsepOnReleaseSession=b=>{w.onReleaseSession(b)},r.jsepOnRunStart=b=>w.onRunStart(b),r.cc=(b,C)=>{w.upload(b,C)}}else if(u==="webnn"){let w=f[0];[r.oc,r.Ob,r.webnnEnsureTensor,r.Pb,r.webnnDownloadTensor,r.nc,r.webnnEnableTraceEvent]=f.slice(1),r.webnnReleaseTensorId=r.Ob,r.webnnUploadTensor=r.Pb,r.webnnRegisterMLContext=r.nc,r.webnnOnRunStart=b=>w.onRunStart(b),r.webnnOnRunEnd=w.onRunEnd.bind(w),r.webnnOnReleaseSession=b=>{w.onReleaseSession(b)},r.webnnCreateMLTensorDownloader=(b,C)=>w.createMLTensorDownloader(b,C),r.webnnRegisterMLTensor=(b,C,D,G)=>w.registerMLTensor(b,C,D,G),r.webnnCreateMLContext=b=>w.createMLContext(b),r.webnnRegisterMLConstant=(b,C,D,G,re,he)=>w.registerMLConstant(b,C,D,G,re,r.Fb,he),r.webnnRegisterGraphInput=w.registerGraphInput.bind(w),r.webnnIsGraphInput=w.isGraphInput.bind(w),r.webnnRegisterGraphOutput=w.registerGraphOutput.bind(w),r.webnnIsGraphOutput=w.isGraphOutput.bind(w),r.webnnCreateTemporaryTensor=w.createTemporaryTensor.bind(w),r.webnnIsGraphInputOutputTypeSupported=w.isGraphInputOutputTypeSupported.bind(w)}};let y=()=>{let u=(f,w,b)=>(...C)=>{let D=Gt,G=w?.();C=f(...C);let re=w?.();return G!==re&&(f=re,b(G),w=b=null),Gt!=D?new Promise((he,we)=>{fn={resolve:he,reject:we}}):C};(()=>{for(let f of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])r[f]=u(r[f],()=>r[f],w=>r[f]=w)})(),m!==void 0&&(r._OrtRun=m(r._OrtRun),r._OrtRunWithBinding=m(r._OrtRunWithBinding)),y=void 0};r.asyncInit=()=>{y?.()};var _,v,S=(u,f)=>{throw f},k=import.meta.url,E="";if(o||l){try{E=new URL(".",k).href}catch{}l&&(v=u=>{var f=new XMLHttpRequest;return f.open("GET",u,!1),f.responseType="arraybuffer",f.send(null),new Uint8Array(f.response)}),_=async u=>{if(Se(u))return new Promise((w,b)=>{var C=new XMLHttpRequest;C.open("GET",u,!0),C.responseType="arraybuffer",C.onload=()=>{C.status==200||C.status==0&&C.response?w(C.response):b(C.status)},C.onerror=b,C.send(null)});var f=await fetch(u,{credentials:"same-origin"});if(f.ok)return f.arrayBuffer();throw Error(f.status+" : "+f.url)}}var N,I,T,j,B,W,Q,X,ie,fe,_e,xe,ke,q,O,Y=console.log.bind(console),U=console.error.bind(console),Z=Y,oe=U,le=!1,Se=u=>u.startsWith("file://");function J(){return I.buffer!=B.buffer&&Ue(),B}function K(){return I.buffer!=B.buffer&&Ue(),W}function me(){return I.buffer!=B.buffer&&Ue(),Q}function De(){return I.buffer!=B.buffer&&Ue(),X}function P(){return I.buffer!=B.buffer&&Ue(),ie}function Ae(){return I.buffer!=B.buffer&&Ue(),fe}function it(){return I.buffer!=B.buffer&&Ue(),_e}function je(){return I.buffer!=B.buffer&&Ue(),q}if(h){let u=function(f){try{var w=f.data,b=w.Db;if(b==="load"){let C=[];self.onmessage=D=>C.push(D),self.startWorker=()=>{postMessage({Db:"loaded"});for(let D of C)u(D);self.onmessage=u};for(let D of w.Sb)r[D]&&!r[D].proxy||(r[D]=(...G)=>{postMessage({Db:"callHandler",Rb:D,args:G})},D=="print"&&(Z=r[D]),D=="printErr"&&(oe=r[D]));I=w.kc,Ue(),O(w.lc)}else if(b==="run"){en(w.Bb),_n(w.Bb,0,0,1,0,0),ci(),Ur(w.Bb),Ye||(Da(),Ye=!0);try{tn(w.hc,w.Jb)}catch(C){if(C!="unwind")throw C}}else w.target!=="setimmediate"&&(b==="checkMailbox"?Ye&&gi():b&&(oe(`worker: received unknown command ${b}`),oe(w)))}catch(C){throw ja(),C}};var Ye=!1;self.onunhandledrejection=f=>{throw f.reason||f},self.onmessage=u}function Ue(){var u=I.buffer;r.HEAP8=B=new Int8Array(u),Q=new Int16Array(u),r.HEAPU8=W=new Uint8Array(u),X=new Uint16Array(u),r.HEAP32=ie=new Int32Array(u),r.HEAPU32=fe=new Uint32Array(u),_e=new Float32Array(u),q=new Float64Array(u),xe=new BigInt64Array(u),ke=new BigUint64Array(u)}function lt(){h?startWorker(r):se.Da()}var dt,vt=0,or=null;function ur(){if(--vt==0&&or){var u=or;or=null,u()}}function Wt(u){throw oe(u="Aborted("+u+")"),le=!0,u=new WebAssembly.RuntimeError(u+". Build with -sASSERTIONS for more info."),i(u),u}function di(){return{a:{L:wm,Aa:gm,b:nn,$:jr,A:d,pa:s,X:p,Z:g,qa:z,na:A,ga:M,ma:R,J:H,Y:L,V:ne,oa:ye,W:ee,va:ve,E:Me,Q:tt,O:at,D:Et,v:pt,s:Rt,P:mt,z:ln,R:dn,ja:pn,T:$c,aa:xc,M:Sc,F:kc,ia:Ur,sa:Cc,r:Tc,Ca:Ec,w:Ac,o:Mc,m:Oc,c:be,Ba:Bc,n:Nc,j:Pc,u:qc,p:Uc,f:Lc,t:Fc,l:Wc,e:Vc,k:Gc,h:Kc,g:Hc,d:Zc,da:Xc,ea:Yc,fa:Qc,ba:xa,ca:Sa,N:ka,xa:em,ua:rm,i:im,C:nm,G:sm,ta:tm,x:am,ra:om,U:um,q:Jc,y:lm,K:dm,S:pm,za:hm,ya:fm,ka:Ia,la:za,_:Er,B:Aa,I:Ma,ha:Ra,H:Oa,a:I,wa:Vt}}}class Tr{name="ExitStatus";constructor(f){this.message=`Program terminated with exit(${f})`,this.status=f}}var $t=u=>{u.terminate(),u.onmessage=()=>{}},Nr=[],lr=u=>{Tt.length==0&&(Dr(),mi(Tt[0]));var f=Tt.pop();if(!f)return 6;dr.push(f),Zt[u.Bb]=f,f.Bb=u.Bb;var w={Db:"run",hc:u.fc,Jb:u.Jb,Bb:u.Bb};return f.postMessage(w,u.Nb),0},wt=0,et=(u,f,...w)=>{for(var b=2*w.length,C=$n(),D=vn(8*b),G=D>>>3,re=0;re<w.length;re++){var he=w[re];typeof he=="bigint"?(xe[G+2*re]=1n,xe[G+2*re+1]=he):(xe[G+2*re]=0n,je()[G+2*re+1>>>0]=he)}return u=Pa(u,0,b,D,f),ki(C),u};function Vt(u){if(h)return et(0,1,u);if(j=u,!(0<wt)){for(var f of dr)$t(f);for(f of Tt)$t(f);Tt=[],dr=[],Zt={},le=!0}S(0,new Tr(u))}function pi(u){if(h)return et(1,0,u);Er(u)}var Er=u=>{if(j=u,h)throw pi(u),"unwind";Vt(u)},Tt=[],dr=[],hi=[],Zt={},fi=u=>{var f=u.Bb;delete Zt[f],Tt.push(u),dr.splice(dr.indexOf(u),1),u.Bb=0,qa(f)};function ci(){hi.forEach(u=>u())}var mi=u=>new Promise(f=>{u.onmessage=C=>{var D=(C=C.data).Db;if(C.Hb&&C.Hb!=yn()){var G=Zt[C.Hb];G?G.postMessage(C,C.Nb):oe(`Internal error! Worker sent a message "${D}" to target pthread ${C.Hb}, but that thread no longer exists!`)}else D==="checkMailbox"?gi():D==="spawnThread"?lr(C):D==="cleanupThread"?fi(Zt[C.ic]):D==="loaded"?(u.loaded=!0,f(u)):C.target==="setimmediate"?u.postMessage(C):D==="callHandler"?r[C.Rb](...C.args):D&&oe(`worker sent an unknown command ${D}`)},u.onerror=C=>{throw oe(`worker sent an error! ${C.filename}:${C.lineno}: ${C.message}`),C};var w,b=[];for(w of[])r.propertyIsEnumerable(w)&&b.push(w);u.postMessage({Db:"load",Sb:b,kc:I,lc:T})});function Dr(){var u=new Worker((()=>{let f=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new f("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});Tt.push(u)}var en=u=>{Ue();var f=Ae()[u+52>>>2>>>0];u=Ae()[u+56>>>2>>>0],Fa(f,f-u),ki(f)},tn=(u,f)=>{wt=0,u=Wa(u,f),0<wt?j=u:bn(u)};class rn{constructor(f){this.Ib=f-24}}function nn(u,f,w){var b=new rn(u>>>=0);throw f>>>=0,w>>>=0,Ae()[b.Ib+16>>>2>>>0]=0,Ae()[b.Ib+4>>>2>>>0]=f,Ae()[b.Ib+8>>>2>>>0]=w,u}function pr(u,f,w,b){return h?et(2,1,u,f,w,b):jr(u,f,w,b)}function jr(u,f,w,b){if(u>>>=0,w>>>=0,b>>>=0,c===void 0)return 6;var C=[];return h&&C.length===0?pr(u,f>>>=0,w,b):(u={fc:w,Bb:u,Jb:b,Nb:C},h?(u.Db="spawnThread",postMessage(u,C),0):lr(u))}var Pr=typeof TextDecoder<"u"?new TextDecoder:void 0,$=(u,f=0,w=NaN)=>{var b=(f>>>=0)+w;for(w=f;u[w]&&!(w>=b);)++w;if(16<w-f&&u.buffer&&Pr)return Pr.decode(u.buffer instanceof ArrayBuffer?u.subarray(f,w):u.slice(f,w));for(b="";f<w;){var C=u[f++];if(128&C){var D=63&u[f++];if((224&C)==192)b+=String.fromCharCode((31&C)<<6|D);else{var G=63&u[f++];65536>(C=(240&C)==224?(15&C)<<12|D<<6|G:(7&C)<<18|D<<12|G<<6|63&u[f++])?b+=String.fromCharCode(C):(C-=65536,b+=String.fromCharCode(55296|C>>10,56320|1023&C))}}else b+=String.fromCharCode(C)}return b},a=(u,f)=>(u>>>=0)?$(K(),u,f):"";function d(u,f,w){return h?et(3,1,u,f,w):0}function s(u,f){if(h)return et(4,1,u,f)}function p(u,f){if(h)return et(5,1,u,f)}function g(u,f,w){if(h)return et(6,1,u,f,w)}function z(u,f,w){return h?et(7,1,u,f,w):0}function A(u,f){if(h)return et(8,1,u,f)}function M(u,f,w){if(h)return et(9,1,u,f,w)}function R(u,f,w,b){if(h)return et(10,1,u,f,w,b)}function H(u,f,w,b){if(h)return et(11,1,u,f,w,b)}function L(u,f,w,b){if(h)return et(12,1,u,f,w,b)}function ne(u){if(h)return et(13,1,u)}function ye(u,f){if(h)return et(14,1,u,f)}function ee(u,f,w){if(h)return et(15,1,u,f,w)}var ue,ve=()=>Wt(""),F=u=>{for(var f="";K()[u>>>0];)f+=ue[K()[u++>>>0]];return f},ge={},$e={},Oe=r.BindingError=class extends Error{constructor(u){super(u),this.name="BindingError"}};function Re(u,f,w={}){return(function(b,C,D={}){var G=C.name;if(!b)throw new Oe(`type "${G}" must have a positive integer typeid pointer`);if($e.hasOwnProperty(b)){if(D.Tb)return;throw new Oe(`Cannot register type '${G}' twice`)}$e[b]=C,ge.hasOwnProperty(b)&&(C=ge[b],delete ge[b],C.forEach(re=>re()))})(u,f,w)}var nt=(u,f,w)=>{switch(f){case 1:return w?b=>J()[b>>>0]:b=>K()[b>>>0];case 2:return w?b=>me()[b>>>1>>>0]:b=>De()[b>>>1>>>0];case 4:return w?b=>P()[b>>>2>>>0]:b=>Ae()[b>>>2>>>0];case 8:return w?b=>xe[b>>>3]:b=>ke[b>>>3];default:throw new TypeError(`invalid integer width (${f}): ${u}`)}};function Me(u,f,w){w>>>=0,Re(u>>>=0,{name:f=F(f>>>0),fromWireType:b=>b,toWireType:function(b,C){if(typeof C!="bigint"&&typeof C!="number")throw C=C===null?"null":(b=typeof C)=="object"||b==="array"||b==="function"?C.toString():""+C,new TypeError(`Cannot convert "${C}" to ${this.name}`);return typeof C=="number"&&(C=BigInt(C)),C},Cb:ze,readValueFromPointer:nt(f,w,f.indexOf("u")==-1),Eb:null})}var ze=8;function tt(u,f,w,b){Re(u>>>=0,{name:f=F(f>>>0),fromWireType:function(C){return!!C},toWireType:function(C,D){return D?w:b},Cb:ze,readValueFromPointer:function(C){return this.fromWireType(K()[C>>>0])},Eb:null})}var V=[],de=[];function be(u){9<(u>>>=0)&&--de[u+1]==0&&(de[u]=void 0,V.push(u))}var pe=u=>{if(!u)throw new Oe(`Cannot use deleted val. handle = ${u}`);return de[u]},Ve=u=>{switch(u){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let f=V.pop()||de.length;return de[f]=u,de[f+1]=1,f}};function He(u){return this.fromWireType(Ae()[u>>>2>>>0])}var st={name:"emscripten::val",fromWireType:u=>{var f=pe(u);return be(u),f},toWireType:(u,f)=>Ve(f),Cb:ze,readValueFromPointer:He,Eb:null};function at(u){return Re(u>>>0,st)}var ct=(u,f)=>{switch(f){case 4:return function(w){return this.fromWireType(it()[w>>>2>>>0])};case 8:return function(w){return this.fromWireType(je()[w>>>3>>>0])};default:throw new TypeError(`invalid float width (${f}): ${u}`)}};function Et(u,f,w){w>>>=0,Re(u>>>=0,{name:f=F(f>>>0),fromWireType:b=>b,toWireType:(b,C)=>C,Cb:ze,readValueFromPointer:ct(f,w),Eb:null})}function pt(u,f,w,b,C){if(u>>>=0,w>>>=0,f=F(f>>>0),C===-1&&(C=4294967295),C=re=>re,b===0){var D=32-8*w;C=re=>re<<D>>>D}var G=f.includes("unsigned")?function(re,he){return he>>>0}:function(re,he){return he};Re(u,{name:f,fromWireType:C,toWireType:G,Cb:ze,readValueFromPointer:nt(f,w,b!==0),Eb:null})}function Rt(u,f,w){function b(D){var G=Ae()[D>>>2>>>0];return D=Ae()[D+4>>>2>>>0],new C(J().buffer,D,G)}var C=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][f];Re(u>>>=0,{name:w=F(w>>>0),fromWireType:b,Cb:ze,readValueFromPointer:b},{Tb:!0})}var bt=(u,f,w)=>{var b=K();if(f>>>=0,0<w){var C=f;w=f+w-1;for(var D=0;D<u.length;++D){var G=u.charCodeAt(D);if(55296<=G&&57343>=G&&(G=65536+((1023&G)<<10)|1023&u.charCodeAt(++D)),127>=G){if(f>=w)break;b[f++>>>0]=G}else{if(2047>=G){if(f+1>=w)break;b[f++>>>0]=192|G>>6}else{if(65535>=G){if(f+2>=w)break;b[f++>>>0]=224|G>>12}else{if(f+3>=w)break;b[f++>>>0]=240|G>>18,b[f++>>>0]=128|G>>12&63}b[f++>>>0]=128|G>>6&63}b[f++>>>0]=128|63&G}}b[f>>>0]=0,u=f-C}else u=0;return u},Fe=u=>{for(var f=0,w=0;w<u.length;++w){var b=u.charCodeAt(w);127>=b?f++:2047>=b?f+=2:55296<=b&&57343>=b?(f+=4,++w):f+=3}return f};function mt(u,f){Re(u>>>=0,{name:f=F(f>>>0),fromWireType:function(w){for(var b,C=Ae()[w>>>2>>>0],D=w+4,G=D,re=0;re<=C;++re){var he=D+re;re!=C&&K()[he>>>0]!=0||(G=a(G,he-G),b===void 0?b=G:(b+="\0",b+=G),G=he+1)}return Xt(w),b},toWireType:function(w,b){b instanceof ArrayBuffer&&(b=new Uint8Array(b));var C=typeof b=="string";if(!(C||ArrayBuffer.isView(b)&&b.BYTES_PER_ELEMENT==1))throw new Oe("Cannot pass non-string to std::string");var D=C?Fe(b):b.length,G=Si(4+D+1),re=G+4;return Ae()[G>>>2>>>0]=D,C?bt(b,re,D+1):K().set(b,re>>>0),w!==null&&w.push(Xt,G),G},Cb:ze,readValueFromPointer:He,Eb(w){Xt(w)}})}var xt=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,kt=(u,f)=>{for(var w=u>>1,b=w+f/2;!(w>=b)&&De()[w>>>0];)++w;if(32<(w<<=1)-u&&xt)return xt.decode(K().slice(u,w));for(w="",b=0;!(b>=f/2);++b){var C=me()[u+2*b>>>1>>>0];if(C==0)break;w+=String.fromCharCode(C)}return w},ht=(u,f,w)=>{if(w??=2147483647,2>w)return 0;var b=f;w=(w-=2)<2*u.length?w/2:u.length;for(var C=0;C<w;++C){var D=u.charCodeAt(C);me()[f>>>1>>>0]=D,f+=2}return me()[f>>>1>>>0]=0,f-b},sn=u=>2*u.length,an=(u,f)=>{for(var w=0,b="";!(w>=f/4);){var C=P()[u+4*w>>>2>>>0];if(C==0)break;++w,65536<=C?(C-=65536,b+=String.fromCharCode(55296|C>>10,56320|1023&C)):b+=String.fromCharCode(C)}return b},on=(u,f,w)=>{if(f>>>=0,w??=2147483647,4>w)return 0;var b=f;w=b+w-4;for(var C=0;C<u.length;++C){var D=u.charCodeAt(C);if(55296<=D&&57343>=D&&(D=65536+((1023&D)<<10)|1023&u.charCodeAt(++C)),P()[f>>>2>>>0]=D,(f+=4)+4>w)break}return P()[f>>>2>>>0]=0,f-b},un=u=>{for(var f=0,w=0;w<u.length;++w){var b=u.charCodeAt(w);55296<=b&&57343>=b&&++w,f+=4}return f};function ln(u,f,w){if(u>>>=0,f>>>=0,w=F(w>>>=0),f===2)var b=kt,C=ht,D=sn,G=re=>De()[re>>>1>>>0];else f===4&&(b=an,C=on,D=un,G=re=>Ae()[re>>>2>>>0]);Re(u,{name:w,fromWireType:re=>{for(var he,we=Ae()[re>>>2>>>0],Ce=re+4,Be=0;Be<=we;++Be){var Le=re+4+Be*f;Be!=we&&G(Le)!=0||(Ce=b(Ce,Le-Ce),he===void 0?he=Ce:(he+="\0",he+=Ce),Ce=Le+f)}return Xt(re),he},toWireType:(re,he)=>{if(typeof he!="string")throw new Oe(`Cannot pass non-string to C++ string type ${w}`);var we=D(he),Ce=Si(4+we+f);return Ae()[Ce>>>2>>>0]=we/f,C(he,Ce+4,we+f),re!==null&&re.push(Xt,Ce),Ce},Cb:ze,readValueFromPointer:He,Eb(re){Xt(re)}})}function dn(u,f){Re(u>>>=0,{Ub:!0,name:f=F(f>>>0),Cb:0,fromWireType:()=>{},toWireType:()=>{}})}function pn(u){_n(u>>>0,!l,1,!o,131072,!1),ci()}var qr=u=>{if(!le)try{if(u(),!(0<wt))try{h?bn(j):Er(j)}catch(f){f instanceof Tr||f=="unwind"||S(0,f)}}catch(f){f instanceof Tr||f=="unwind"||S(0,f)}};function Ur(u){u>>>=0,typeof Atomics.jc=="function"&&(Atomics.jc(P(),u>>>2,u).value.then(gi),u+=128,Atomics.store(P(),u>>>2,1))}var gi=()=>{var u=yn();u&&(Ur(u),qr(La))};function $c(u,f){(u>>>=0)==f>>>0?setTimeout(gi):h?postMessage({Hb:u,Db:"checkMailbox"}):(u=Zt[u])&&u.postMessage({Db:"checkMailbox"})}var hn=[];function xc(u,f,w,b,C){for(f>>>=0,b/=2,hn.length=b,w=C>>>0>>>3,C=0;C<b;C++)hn[C]=xe[w+2*C]?xe[w+2*C+1]:je()[w+2*C+1>>>0];return(f?wn[f]:mm[u])(...hn)}var Sc=()=>{wt=0};function kc(u){u>>>=0,h?postMessage({Db:"cleanupThread",ic:u}):fi(Zt[u])}function Cc(u){}var wi=(u,f)=>{var w=$e[u];if(w===void 0)throw u=Na(u),w=F(u),Xt(u),new Oe(`${f} has unknown type ${w}`);return w},ca=(u,f,w)=>{var b=[];return u=u.toWireType(b,w),b.length&&(Ae()[f>>>2>>>0]=Ve(b)),u};function Tc(u,f,w){return f>>>=0,w>>>=0,u=pe(u>>>0),f=wi(f,"emval::as"),ca(f,w,u)}function Ec(u,f){return f>>>=0,u=pe(u>>>0),(f=wi(f,"emval::as")).toWireType(null,u)}var yi=u=>{try{u()}catch(f){Wt(f)}},tr=0,Gt=null,ma=0,_i=[],ga={},wa={},Ic=0,fn=null,zc=[];function ya(u){return(function(f){if(!le){if(tr===0){var w=!1,b=!1;f((C=0)=>{if(!le&&(ma=C,w=!0,b)){tr=2,yi(()=>Ka(Gt)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),C=!1;try{var D=(function(){var he=P()[Gt+8>>>2>>>0];return he=se[wa[he]],--wt,he()})()}catch(he){D=he,C=!0}var G=!1;if(!Gt){var re=fn;re&&(fn=null,(C?re.reject:re.resolve)(D),G=!0)}if(C&&!G)throw D}}),b=!0,w||(tr=1,Gt=(function(){var C=Si(65548),D=C+12;Ae()[C>>>2>>>0]=D,Ae()[C+4>>>2>>>0]=D+65536,D=_i[0];var G=ga[D];return G===void 0&&(G=Ic++,ga[D]=G,wa[G]=D),D=G,P()[C+8>>>2>>>0]=D,C})(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),yi(()=>Va(Gt)))}else tr===2?(tr=0,yi(Ha),Xt(Gt),Gt=null,zc.forEach(qr)):Wt(`invalid state: ${tr}`);return ma}})(f=>{u().then(f)})}function Ac(u){return u>>>=0,ya(async()=>{var f=await pe(u);return Ve(f)})}var bi=[];function Mc(u,f,w,b){return w>>>=0,b>>>=0,(u=bi[u>>>0])(null,f=pe(f>>>0),w,b)}var Rc={},vi=u=>{var f=Rc[u];return f===void 0?F(u):f};function Oc(u,f,w,b,C){return w>>>=0,b>>>=0,C>>>=0,(u=bi[u>>>0])(f=pe(f>>>0),f[w=vi(w)],b,C)}function Bc(u,f){return f>>>=0,(u=pe(u>>>0))==pe(f)}var _a=()=>typeof globalThis=="object"?globalThis:Function("return this")();function Nc(u){return(u>>>=0)==0?Ve(_a()):(u=vi(u),Ve(_a()[u]))}var Dc=u=>{var f=bi.length;return bi.push(u),f},jc=(u,f)=>{for(var w=Array(u),b=0;b<u;++b)w[b]=wi(Ae()[f+4*b>>>2>>>0],`parameter ${b}`);return w};function Pc(u,f,w){var b=(f=jc(u,f>>>0)).shift();u--;var C=`return function (obj, func, destructorsRef, args) {
`,D=0,G=[];w===0&&G.push("obj");for(var re=["retType"],he=[b],we=0;we<u;++we)G.push(`arg${we}`),re.push(`argType${we}`),he.push(f[we]),C+=`  var arg${we} = argType${we}.readValueFromPointer(args${D?"+"+D:""});
`,D+=f[we].Cb;return C+=`  var rv = ${w===1?"new func":"func.call"}(${G.join(", ")});
`,b.Ub||(re.push("emval_returnValue"),he.push(ca),C+=`  return emval_returnValue(retType, destructorsRef, rv);
`),u=new Function(...re,C+`};
`)(...he),w=`methodCaller<(${f.map(Ce=>Ce.name).join(", ")}) => ${b.name}>`,Dc(Object.defineProperty(u,"name",{value:w}))}function qc(u){return u=vi(u>>>0),Ve(r[u])}function Uc(u,f){return f>>>=0,u=pe(u>>>0),f=pe(f),Ve(u[f])}function Lc(u){9<(u>>>=0)&&(de[u+1]+=1)}function Fc(){return Ve([])}function Wc(u){u=pe(u>>>0);for(var f=Array(u.length),w=0;w<u.length;w++)f[w]=u[w];return Ve(f)}function Vc(u){return Ve(vi(u>>>0))}function Gc(){return Ve({})}function Kc(u){for(var f=pe(u>>>=0);f.length;){var w=f.pop();f.pop()(w)}be(u)}function Hc(u,f,w){f>>>=0,w>>>=0,u=pe(u>>>0),f=pe(f),w=pe(w),u[f]=w}function Zc(u,f){return f>>>=0,u=(u=wi(u>>>0,"_emval_take_value")).readValueFromPointer(f),Ve(u)}function Xc(u,f){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),f>>>=0,u=new Date(1e3*u),P()[f>>>2>>>0]=u.getUTCSeconds(),P()[f+4>>>2>>>0]=u.getUTCMinutes(),P()[f+8>>>2>>>0]=u.getUTCHours(),P()[f+12>>>2>>>0]=u.getUTCDate(),P()[f+16>>>2>>>0]=u.getUTCMonth(),P()[f+20>>>2>>>0]=u.getUTCFullYear()-1900,P()[f+24>>>2>>>0]=u.getUTCDay(),u=(u.getTime()-Date.UTC(u.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,P()[f+28>>>2>>>0]=u}var ba=u=>u%4==0&&(u%100!=0||u%400==0),va=[0,31,60,91,121,152,182,213,244,274,305,335],$a=[0,31,59,90,120,151,181,212,243,273,304,334];function Yc(u,f){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),f>>>=0,u=new Date(1e3*u),P()[f>>>2>>>0]=u.getSeconds(),P()[f+4>>>2>>>0]=u.getMinutes(),P()[f+8>>>2>>>0]=u.getHours(),P()[f+12>>>2>>>0]=u.getDate(),P()[f+16>>>2>>>0]=u.getMonth(),P()[f+20>>>2>>>0]=u.getFullYear()-1900,P()[f+24>>>2>>>0]=u.getDay();var w=(ba(u.getFullYear())?va:$a)[u.getMonth()]+u.getDate()-1|0;P()[f+28>>>2>>>0]=w,P()[f+36>>>2>>>0]=-60*u.getTimezoneOffset(),w=new Date(u.getFullYear(),6,1).getTimezoneOffset();var b=new Date(u.getFullYear(),0,1).getTimezoneOffset();u=0|(w!=b&&u.getTimezoneOffset()==Math.min(b,w)),P()[f+32>>>2>>>0]=u}function Qc(u){u>>>=0;var f=new Date(P()[u+20>>>2>>>0]+1900,P()[u+16>>>2>>>0],P()[u+12>>>2>>>0],P()[u+8>>>2>>>0],P()[u+4>>>2>>>0],P()[u>>>2>>>0],0),w=P()[u+32>>>2>>>0],b=f.getTimezoneOffset(),C=new Date(f.getFullYear(),6,1).getTimezoneOffset(),D=new Date(f.getFullYear(),0,1).getTimezoneOffset(),G=Math.min(D,C);return 0>w?P()[u+32>>>2>>>0]=+(C!=D&&G==b):0<w!=(G==b)&&(C=Math.max(D,C),f.setTime(f.getTime()+6e4*((0<w?G:C)-b))),P()[u+24>>>2>>>0]=f.getDay(),w=(ba(f.getFullYear())?va:$a)[f.getMonth()]+f.getDate()-1|0,P()[u+28>>>2>>>0]=w,P()[u>>>2>>>0]=f.getSeconds(),P()[u+4>>>2>>>0]=f.getMinutes(),P()[u+8>>>2>>>0]=f.getHours(),P()[u+12>>>2>>>0]=f.getDate(),P()[u+16>>>2>>>0]=f.getMonth(),P()[u+20>>>2>>>0]=f.getYear(),u=f.getTime(),BigInt(isNaN(u)?-1:u/1e3)}function xa(u,f,w,b,C,D,G){return h?et(16,1,u,f,w,b,C,D,G):-52}function Sa(u,f,w,b,C,D){if(h)return et(17,1,u,f,w,b,C,D)}var Lr={},Jc=()=>performance.timeOrigin+performance.now();function ka(u,f){if(h)return et(18,1,u,f);if(Lr[u]&&(clearTimeout(Lr[u].id),delete Lr[u]),!f)return 0;var w=setTimeout(()=>{delete Lr[u],qr(()=>Ua(u,performance.timeOrigin+performance.now()))},f);return Lr[u]={id:w,rc:f},0}function em(u,f,w,b){u>>>=0,f>>>=0,w>>>=0,b>>>=0;var C=new Date().getFullYear(),D=new Date(C,0,1).getTimezoneOffset();C=new Date(C,6,1).getTimezoneOffset();var G=Math.max(D,C);Ae()[u>>>2>>>0]=60*G,P()[f>>>2>>>0]=+(D!=C),u=(f=re=>{var he=Math.abs(re);return`UTC${0<=re?"-":"+"}${String(Math.floor(he/60)).padStart(2,"0")}${String(he%60).padStart(2,"0")}`})(D),f=f(C),C<D?(bt(u,w,17),bt(f,b,17)):(bt(u,b,17),bt(f,w,17))}var tm=()=>Date.now();function rm(u,f,w){return 0<=u&&3>=u?(u===0?u=Date.now():u=performance.timeOrigin+performance.now(),xe[w>>>0>>>3]=BigInt(Math.round(1e6*u)),0):28}var cn=[],Ca=(u,f)=>{cn.length=0;for(var w;w=K()[u++>>>0];){var b=w!=105;f+=(b&=w!=112)&&f%8?4:0,cn.push(w==112?Ae()[f>>>2>>>0]:w==106?xe[f>>>3]:w==105?P()[f>>>2>>>0]:je()[f>>>3>>>0]),f+=b?8:4}return cn};function im(u,f,w){return u>>>=0,f=Ca(f>>>0,w>>>0),wn[u](...f)}function nm(u,f,w){return u>>>=0,f=Ca(f>>>0,w>>>0),wn[u](...f)}var sm=()=>{};function am(u,f){return oe(a(u>>>0,f>>>0))}var om=()=>{throw wt+=1,"unwind"};function um(){return 4294901760}var lm=()=>navigator.hardwareConcurrency;function dm(){return Wt("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function pm(u){u>>>=0;var f=K().length;if(u<=f||4294901760<u)return!1;for(var w=1;4>=w;w*=2){var b=f*(1+.2/w);b=Math.min(b,u+100663296);e:{b=(Math.min(4294901760,65536*Math.ceil(Math.max(u,b)/65536))-I.buffer.byteLength+65535)/65536|0;try{I.grow(b),Ue();var C=1;break e}catch{}C=void 0}if(C)return!0}return!1}var $i=()=>(Wt("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Fr={},Ta=u=>{u.forEach(f=>{$i()})};function hm(){var u=Error().stack.toString().split(`
`);return u[0]=="Error"&&u.shift(),Ta(u),Fr.Mb=$i(),Fr.dc=u,Fr.Mb}function fm(u,f,w){if(u>>>=0,f>>>=0,Fr.Mb==u)var b=Fr.dc;else(b=Error().stack.toString().split(`
`))[0]=="Error"&&b.shift(),Ta(b);for(var C=3;b[C]&&$i()!=u;)++C;for(u=0;u<w&&b[u+C];++u)P()[f+4*u>>>2>>>0]=$i();return u}var mn,gn={},Ea=()=>{if(!mn){var u,f={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(u in gn)gn[u]===void 0?delete f[u]:f[u]=gn[u];var w=[];for(u in f)w.push(`${u}=${f[u]}`);mn=w}return mn};function Ia(u,f){if(h)return et(19,1,u,f);u>>>=0,f>>>=0;var w,b=0,C=0;for(w of Ea()){var D=f+b;Ae()[u+C>>>2>>>0]=D,b+=bt(w,D,1/0)+1,C+=4}return 0}function za(u,f){if(h)return et(20,1,u,f);u>>>=0,f>>>=0;var w=Ea();for(var b of(Ae()[u>>>2>>>0]=w.length,u=0,w))u+=Fe(b)+1;return Ae()[f>>>2>>>0]=u,0}function Aa(u){return h?et(21,1,u):52}function Ma(u,f,w,b){return h?et(22,1,u,f,w,b):52}function Ra(u,f,w,b){return h?et(23,1,u,f,w,b):70}var cm=[null,[],[]];function Oa(u,f,w,b){if(h)return et(24,1,u,f,w,b);f>>>=0,w>>>=0,b>>>=0;for(var C=0,D=0;D<w;D++){var G=Ae()[f>>>2>>>0],re=Ae()[f+4>>>2>>>0];f+=8;for(var he=0;he<re;he++){var we=u,Ce=K()[G+he>>>0],Be=cm[we];Ce===0||Ce===10?((we===1?Z:oe)($(Be)),Be.length=0):Be.push(Ce)}C+=re}return Ae()[b>>>2>>>0]=C,0}h||(function(){for(var u=r.numThreads-1;u--;)Dr();Nr.push(()=>{vt++,(function(f){h?f():Promise.all(Tt.map(mi)).then(f)})(()=>ur())})})();for(var Ba=Array(256),xi=0;256>xi;++xi)Ba[xi]=String.fromCharCode(xi);ue=Ba,de.push(0,1,void 0,1,null,1,!0,1,!1,1),r.count_emval_handles=()=>de.length/2-5-V.length,h||(I=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Ue()),r.wasmBinary&&(N=r.wasmBinary),r.stackSave=()=>$n(),r.stackRestore=u=>ki(u),r.stackAlloc=u=>vn(u),r.setValue=function(u,f,w="i8"){switch(w.endsWith("*")&&(w="*"),w){case"i1":case"i8":J()[u>>>0]=f;break;case"i16":me()[u>>>1>>>0]=f;break;case"i32":P()[u>>>2>>>0]=f;break;case"i64":xe[u>>>3]=BigInt(f);break;case"float":it()[u>>>2>>>0]=f;break;case"double":je()[u>>>3>>>0]=f;break;case"*":Ae()[u>>>2>>>0]=f;break;default:Wt(`invalid type for setValue: ${w}`)}},r.getValue=function(u,f="i8"){switch(f.endsWith("*")&&(f="*"),f){case"i1":case"i8":return J()[u>>>0];case"i16":return me()[u>>>1>>>0];case"i32":return P()[u>>>2>>>0];case"i64":return xe[u>>>3];case"float":return it()[u>>>2>>>0];case"double":return je()[u>>>3>>>0];case"*":return Ae()[u>>>2>>>0];default:Wt(`invalid type for getValue: ${f}`)}},r.UTF8ToString=a,r.stringToUTF8=bt,r.lengthBytesUTF8=Fe;var mm=[Vt,pi,pr,d,s,p,g,z,A,M,R,H,L,ne,ye,ee,xa,Sa,ka,Ia,za,Aa,Ma,Ra,Oa],wn={892060:(u,f,w,b,C)=>{if(r===void 0||!r.Fb)return 1;if((u=a(Number(u>>>0))).startsWith("./")&&(u=u.substring(2)),!(u=r.Fb.get(u)))return 2;if(f=Number(f>>>0),w=Number(w>>>0),b=Number(b>>>0),f+w>u.byteLength)return 3;try{let D=u.subarray(f,f+w);switch(C){case 0:K().set(D,b>>>0);break;case 1:r.mc?r.mc(b,D):r.cc(b,D);break;default:return 4}return 0}catch{return 4}},892884:(u,f,w)=>{r.Pb(u,K().subarray(f>>>0,f+w>>>0))},892948:()=>r.oc(),892990:u=>{r.Ob(u)},893027:()=>{r.Wb()},893058:()=>{r.Xb()},893087:()=>{r.ac()},893112:u=>r.Vb(u),893145:u=>r.Zb(u),893177:(u,f,w)=>{r.Lb(Number(u),Number(f),Number(w),!0)},893240:(u,f,w)=>{r.Lb(Number(u),Number(f),Number(w))},893297:()=>typeof wasmOffsetConverter<"u",893354:u=>{r.Ab("Abs",u,void 0)},893405:u=>{r.Ab("Neg",u,void 0)},893456:u=>{r.Ab("Floor",u,void 0)},893509:u=>{r.Ab("Ceil",u,void 0)},893561:u=>{r.Ab("Reciprocal",u,void 0)},893619:u=>{r.Ab("Sqrt",u,void 0)},893671:u=>{r.Ab("Exp",u,void 0)},893722:u=>{r.Ab("Erf",u,void 0)},893773:u=>{r.Ab("Sigmoid",u,void 0)},893828:(u,f,w)=>{r.Ab("HardSigmoid",u,{alpha:f,beta:w})},893907:u=>{r.Ab("Log",u,void 0)},893958:u=>{r.Ab("Sin",u,void 0)},894009:u=>{r.Ab("Cos",u,void 0)},894060:u=>{r.Ab("Tan",u,void 0)},894111:u=>{r.Ab("Asin",u,void 0)},894163:u=>{r.Ab("Acos",u,void 0)},894215:u=>{r.Ab("Atan",u,void 0)},894267:u=>{r.Ab("Sinh",u,void 0)},894319:u=>{r.Ab("Cosh",u,void 0)},894371:u=>{r.Ab("Asinh",u,void 0)},894424:u=>{r.Ab("Acosh",u,void 0)},894477:u=>{r.Ab("Atanh",u,void 0)},894530:u=>{r.Ab("Tanh",u,void 0)},894582:u=>{r.Ab("Not",u,void 0)},894633:(u,f,w)=>{r.Ab("Clip",u,{min:f,max:w})},894702:u=>{r.Ab("Clip",u,void 0)},894754:(u,f)=>{r.Ab("Elu",u,{alpha:f})},894812:u=>{r.Ab("Gelu",u,void 0)},894864:u=>{r.Ab("Relu",u,void 0)},894916:(u,f)=>{r.Ab("LeakyRelu",u,{alpha:f})},894980:(u,f)=>{r.Ab("ThresholdedRelu",u,{alpha:f})},895050:(u,f)=>{r.Ab("Cast",u,{to:f})},895108:u=>{r.Ab("Add",u,void 0)},895159:u=>{r.Ab("Sub",u,void 0)},895210:u=>{r.Ab("Mul",u,void 0)},895261:u=>{r.Ab("Div",u,void 0)},895312:u=>{r.Ab("Pow",u,void 0)},895363:u=>{r.Ab("Equal",u,void 0)},895416:u=>{r.Ab("Greater",u,void 0)},895471:u=>{r.Ab("GreaterOrEqual",u,void 0)},895533:u=>{r.Ab("Less",u,void 0)},895585:u=>{r.Ab("LessOrEqual",u,void 0)},895644:(u,f,w,b,C)=>{r.Ab("ReduceMean",u,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:b?Array.from(P().subarray(Number(b)>>>0,Number(C)>>>0)):[]})},895819:(u,f,w,b,C)=>{r.Ab("ReduceMax",u,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:b?Array.from(P().subarray(Number(b)>>>0,Number(C)>>>0)):[]})},895993:(u,f,w,b,C)=>{r.Ab("ReduceMin",u,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:b?Array.from(P().subarray(Number(b)>>>0,Number(C)>>>0)):[]})},896167:(u,f,w,b,C)=>{r.Ab("ReduceProd",u,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:b?Array.from(P().subarray(Number(b)>>>0,Number(C)>>>0)):[]})},896342:(u,f,w,b,C)=>{r.Ab("ReduceSum",u,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:b?Array.from(P().subarray(Number(b)>>>0,Number(C)>>>0)):[]})},896516:(u,f,w,b,C)=>{r.Ab("ReduceL1",u,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:b?Array.from(P().subarray(Number(b)>>>0,Number(C)>>>0)):[]})},896689:(u,f,w,b,C)=>{r.Ab("ReduceL2",u,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:b?Array.from(P().subarray(Number(b)>>>0,Number(C)>>>0)):[]})},896862:(u,f,w,b,C)=>{r.Ab("ReduceLogSum",u,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:b?Array.from(P().subarray(Number(b)>>>0,Number(C)>>>0)):[]})},897039:(u,f,w,b,C)=>{r.Ab("ReduceSumSquare",u,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:b?Array.from(P().subarray(Number(b)>>>0,Number(C)>>>0)):[]})},897219:(u,f,w,b,C)=>{r.Ab("ReduceLogSumExp",u,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:b?Array.from(P().subarray(Number(b)>>>0,Number(C)>>>0)):[]})},897399:u=>{r.Ab("Where",u,void 0)},897452:(u,f,w)=>{r.Ab("Transpose",u,{perm:f?Array.from(P().subarray(Number(f)>>>0,Number(w)>>>0)):[]})},897576:(u,f,w,b)=>{r.Ab("DepthToSpace",u,{blocksize:f,mode:a(w),format:b?"NHWC":"NCHW"})},897709:(u,f,w,b)=>{r.Ab("DepthToSpace",u,{blocksize:f,mode:a(w),format:b?"NHWC":"NCHW"})},897842:(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze,ft)=>{r.Ab("ConvTranspose",u,{format:he?"NHWC":"NCHW",autoPad:f,dilations:[w],group:b,kernelShape:[C],pads:[D,G],strides:[re],wIsConst:()=>!!J()[we>>>0],outputPadding:Ce?Array.from(P().subarray(Number(Ce)>>>0,Number(Be)>>>0)):[],outputShape:Le?Array.from(P().subarray(Number(Le)>>>0,Number(Ze)>>>0)):[],activation:a(ft)})},898275:(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze)=>{r.Ab("ConvTranspose",u,{format:re?"NHWC":"NCHW",autoPad:f,dilations:Array.from(P().subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),group:b,kernelShape:Array.from(P().subarray(Number(C)>>>0,2+(Number(C)>>>0)>>>0)),pads:Array.from(P().subarray(Number(D)>>>0,4+(Number(D)>>>0)>>>0)),strides:Array.from(P().subarray(Number(G)>>>0,2+(Number(G)>>>0)>>>0)),wIsConst:()=>!!J()[he>>>0],outputPadding:we?Array.from(P().subarray(Number(we)>>>0,Number(Ce)>>>0)):[],outputShape:Be?Array.from(P().subarray(Number(Be)>>>0,Number(Le)>>>0)):[],activation:a(Ze)})},898936:(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze,ft)=>{r.Ab("ConvTranspose",u,{format:he?"NHWC":"NCHW",autoPad:f,dilations:[w],group:b,kernelShape:[C],pads:[D,G],strides:[re],wIsConst:()=>!!J()[we>>>0],outputPadding:Ce?Array.from(P().subarray(Number(Ce)>>>0,Number(Be)>>>0)):[],outputShape:Le?Array.from(P().subarray(Number(Le)>>>0,Number(Ze)>>>0)):[],activation:a(ft)})},899369:(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze)=>{r.Ab("ConvTranspose",u,{format:re?"NHWC":"NCHW",autoPad:f,dilations:Array.from(P().subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),group:b,kernelShape:Array.from(P().subarray(Number(C)>>>0,2+(Number(C)>>>0)>>>0)),pads:Array.from(P().subarray(Number(D)>>>0,4+(Number(D)>>>0)>>>0)),strides:Array.from(P().subarray(Number(G)>>>0,2+(Number(G)>>>0)>>>0)),wIsConst:()=>!!J()[he>>>0],outputPadding:we?Array.from(P().subarray(Number(we)>>>0,Number(Ce)>>>0)):[],outputShape:Be?Array.from(P().subarray(Number(Be)>>>0,Number(Le)>>>0)):[],activation:a(Ze)})},900030:(u,f)=>{r.Ab("GlobalAveragePool",u,{format:f?"NHWC":"NCHW"})},900121:(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze)=>{r.Ab("AveragePool",u,{format:Ze?"NHWC":"NCHW",auto_pad:f,ceil_mode:w,count_include_pad:b,storage_order:C,dilations:D?Array.from(P().subarray(Number(D)>>>0,Number(G)>>>0)):[],kernel_shape:re?Array.from(P().subarray(Number(re)>>>0,Number(he)>>>0)):[],pads:we?Array.from(P().subarray(Number(we)>>>0,Number(Ce)>>>0)):[],strides:Be?Array.from(P().subarray(Number(Be)>>>0,Number(Le)>>>0)):[]})},900600:(u,f)=>{r.Ab("GlobalAveragePool",u,{format:f?"NHWC":"NCHW"})},900691:(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze)=>{r.Ab("AveragePool",u,{format:Ze?"NHWC":"NCHW",auto_pad:f,ceil_mode:w,count_include_pad:b,storage_order:C,dilations:D?Array.from(P().subarray(Number(D)>>>0,Number(G)>>>0)):[],kernel_shape:re?Array.from(P().subarray(Number(re)>>>0,Number(he)>>>0)):[],pads:we?Array.from(P().subarray(Number(we)>>>0,Number(Ce)>>>0)):[],strides:Be?Array.from(P().subarray(Number(Be)>>>0,Number(Le)>>>0)):[]})},901170:(u,f)=>{r.Ab("GlobalMaxPool",u,{format:f?"NHWC":"NCHW"})},901257:(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze)=>{r.Ab("MaxPool",u,{format:Ze?"NHWC":"NCHW",auto_pad:f,ceil_mode:w,count_include_pad:b,storage_order:C,dilations:D?Array.from(P().subarray(Number(D)>>>0,Number(G)>>>0)):[],kernel_shape:re?Array.from(P().subarray(Number(re)>>>0,Number(he)>>>0)):[],pads:we?Array.from(P().subarray(Number(we)>>>0,Number(Ce)>>>0)):[],strides:Be?Array.from(P().subarray(Number(Be)>>>0,Number(Le)>>>0)):[]})},901732:(u,f)=>{r.Ab("GlobalMaxPool",u,{format:f?"NHWC":"NCHW"})},901819:(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze)=>{r.Ab("MaxPool",u,{format:Ze?"NHWC":"NCHW",auto_pad:f,ceil_mode:w,count_include_pad:b,storage_order:C,dilations:D?Array.from(P().subarray(Number(D)>>>0,Number(G)>>>0)):[],kernel_shape:re?Array.from(P().subarray(Number(re)>>>0,Number(he)>>>0)):[],pads:we?Array.from(P().subarray(Number(we)>>>0,Number(Ce)>>>0)):[],strides:Be?Array.from(P().subarray(Number(Be)>>>0,Number(Le)>>>0)):[]})},902294:(u,f,w,b,C)=>{r.Ab("Gemm",u,{alpha:f,beta:w,transA:b,transB:C})},902398:u=>{r.Ab("MatMul",u,void 0)},902452:(u,f,w,b)=>{r.Ab("ArgMax",u,{keepDims:!!f,selectLastIndex:!!w,axis:b})},902560:(u,f,w,b)=>{r.Ab("ArgMin",u,{keepDims:!!f,selectLastIndex:!!w,axis:b})},902668:(u,f)=>{r.Ab("Softmax",u,{axis:f})},902731:(u,f)=>{r.Ab("Concat",u,{axis:f})},902791:(u,f,w,b,C)=>{r.Ab("Split",u,{axis:f,numOutputs:w,splitSizes:b?Array.from(P().subarray(Number(b)>>>0,Number(C)>>>0)):[]})},902947:u=>{r.Ab("Expand",u,void 0)},903001:(u,f)=>{r.Ab("Gather",u,{axis:Number(f)})},903072:(u,f)=>{r.Ab("GatherElements",u,{axis:Number(f)})},903151:(u,f)=>{r.Ab("GatherND",u,{batch_dims:Number(f)})},903230:(u,f,w,b,C,D,G,re,he,we,Ce)=>{r.Ab("Resize",u,{antialias:f,axes:w?Array.from(P().subarray(Number(w)>>>0,Number(b)>>>0)):[],coordinateTransformMode:a(C),cubicCoeffA:D,excludeOutside:G,extrapolationValue:re,keepAspectRatioPolicy:a(he),mode:a(we),nearestMode:a(Ce)})},903592:(u,f,w,b,C,D,G)=>{r.Ab("Slice",u,{starts:f?Array.from(P().subarray(Number(f)>>>0,Number(w)>>>0)):[],ends:b?Array.from(P().subarray(Number(b)>>>0,Number(C)>>>0)):[],axes:D?Array.from(P().subarray(Number(D)>>>0,Number(G)>>>0)):[]})},903856:u=>{r.Ab("Tile",u,void 0)},903908:(u,f,w)=>{r.Ab("InstanceNormalization",u,{epsilon:f,format:w?"NHWC":"NCHW"})},904022:(u,f,w)=>{r.Ab("InstanceNormalization",u,{epsilon:f,format:w?"NHWC":"NCHW"})},904136:u=>{r.Ab("Range",u,void 0)},904189:(u,f)=>{r.Ab("Einsum",u,{equation:a(f)})},904270:(u,f,w,b,C)=>{r.Ab("Pad",u,{mode:f,value:w,pads:b?Array.from(P().subarray(Number(b)>>>0,Number(C)>>>0)):[]})},904413:(u,f,w,b,C,D)=>{r.Ab("BatchNormalization",u,{epsilon:f,momentum:w,spatial:!!C,trainingMode:!!b,format:D?"NHWC":"NCHW"})},904582:(u,f,w,b,C,D)=>{r.Ab("BatchNormalization",u,{epsilon:f,momentum:w,spatial:!!C,trainingMode:!!b,format:D?"NHWC":"NCHW"})},904751:(u,f,w)=>{r.Ab("CumSum",u,{exclusive:Number(f),reverse:Number(w)})},904848:(u,f,w)=>{r.Ab("DequantizeLinear",u,{axis:f,blockSize:w})},904938:(u,f,w,b,C)=>{r.Ab("GridSample",u,{align_corners:f,mode:a(w),padding_mode:a(b),format:C?"NHWC":"NCHW"})},905108:(u,f,w,b,C)=>{r.Ab("GridSample",u,{align_corners:f,mode:a(w),padding_mode:a(b),format:C?"NHWC":"NCHW"})},905278:(u,f)=>{r.Ab("ScatterND",u,{reduction:a(f)})},905363:(u,f,w,b,C,D,G,re,he)=>{r.Ab("Attention",u,{numHeads:f,isUnidirectional:w,maskFilterValue:b,scale:C,doRotary:D,qkvHiddenSizes:G?Array.from(P().subarray(Number(re)>>>0,Number(re)+G>>>0)):[],pastPresentShareBuffer:!!he})},905635:u=>{r.Ab("BiasAdd",u,void 0)},905690:u=>{r.Ab("BiasSplitGelu",u,void 0)},905751:u=>{r.Ab("FastGelu",u,void 0)},905807:(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze,ft,It)=>{r.Ab("Conv",u,{format:Be?"NHWC":"NCHW",auto_pad:f,dilations:w?Array.from(P().subarray(Number(w)>>>0,Number(b)>>>0)):[],group:C,kernel_shape:D?Array.from(P().subarray(Number(D)>>>0,Number(G)>>>0)):[],pads:re?Array.from(P().subarray(Number(re)>>>0,Number(he)>>>0)):[],strides:we?Array.from(P().subarray(Number(we)>>>0,Number(Ce)>>>0)):[],w_is_const:()=>!!J()[Number(Le)>>>0],activation:a(Ze),activation_params:ft?Array.from(it().subarray(Number(ft)>>>0,Number(It)>>>0)):[]})},906391:u=>{r.Ab("Gelu",u,void 0)},906443:(u,f,w,b,C,D,G,re,he)=>{r.Ab("GroupQueryAttention",u,{numHeads:f,kvNumHeads:w,scale:b,softcap:C,doRotary:D,rotaryInterleaved:G,smoothSoftmax:re,localWindowSize:he})},906660:(u,f,w,b)=>{r.Ab("LayerNormalization",u,{axis:f,epsilon:w,simplified:!!b})},906771:(u,f,w,b)=>{r.Ab("LayerNormalization",u,{axis:f,epsilon:w,simplified:!!b})},906882:(u,f,w,b,C,D)=>{r.Ab("MatMulNBits",u,{k:f,n:w,accuracyLevel:b,bits:C,blockSize:D})},907009:(u,f,w,b,C,D)=>{r.Ab("MultiHeadAttention",u,{numHeads:f,isUnidirectional:w,maskFilterValue:b,scale:C,doRotary:D})},907168:(u,f)=>{r.Ab("QuickGelu",u,{alpha:f})},907232:(u,f,w,b,C)=>{r.Ab("RotaryEmbedding",u,{interleaved:!!f,numHeads:w,rotaryEmbeddingDim:b,scale:C})},907371:(u,f,w)=>{r.Ab("SkipLayerNormalization",u,{epsilon:f,simplified:!!w})},907473:(u,f,w)=>{r.Ab("SkipLayerNormalization",u,{epsilon:f,simplified:!!w})},907575:(u,f,w,b)=>{r.Ab("GatherBlockQuantized",u,{gatherAxis:f,quantizeAxis:w,blockSize:b})},907696:u=>{r.$b(u)},907730:(u,f)=>r.bc(Number(u),Number(f),r.Gb.ec,r.Gb.errors)};function gm(u,f,w){return ya(async()=>{await r.Yb(Number(u),Number(f),Number(w))})}function wm(){return typeof wasmOffsetConverter<"u"}var se=await(async function(){function u(b,C){return se=b.exports,se=(function(){var D=se,G={};for(let[re,he]of Object.entries(D))G[re]=typeof he=="function"?(...we)=>{_i.push(re);try{return he(...we)}finally{le||(_i.pop(),Gt&&tr===1&&_i.length===0&&(tr=0,wt+=1,yi(Ga),typeof Fibers<"u"&&Fibers.sc()))}}:he;return G})(),se=(function(){var D=se,G=he=>we=>he(we)>>>0,re=he=>()=>he()>>>0;return(D=Object.assign({},D)).Ea=G(D.Ea),D.gb=re(D.gb),D.ib=G(D.ib),D.tb=G(D.tb),D.ub=re(D.ub),D.__cxa_get_exception_ptr=G(D.__cxa_get_exception_ptr),D})(),hi.push(se.jb),T=C,ur(),se}vt++;var f=di();if(r.instantiateWasm)return new Promise(b=>{r.instantiateWasm(f,(C,D)=>{b(u(C,D))})});if(h)return new Promise(b=>{O=C=>{var D=new WebAssembly.Instance(C,di());b(u(D,C))}});dt??=r.locateFile?r.locateFile?r.locateFile("ort-wasm-simd-threaded.jsep.wasm",E):E+"ort-wasm-simd-threaded.jsep.wasm":new URL("/assets/ort-wasm-simd-threaded.jsep-CLmJQkb_.wasm",import.meta.url).href;try{var w=await(async function(b){var C=dt;if(!N&&typeof WebAssembly.instantiateStreaming=="function"&&!Se(C))try{var D=fetch(C,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(D,b)}catch(G){oe(`wasm streaming compile failed: ${G}`),oe("falling back to ArrayBuffer instantiation")}return(async function(G,re){try{var he=await(async function(we){if(!N)try{var Ce=await _(we);return new Uint8Array(Ce)}catch{}if(we==dt&&N)we=new Uint8Array(N);else{if(!v)throw"both async and sync fetching of the wasm failed";we=v(we)}return we})(G);return await WebAssembly.instantiate(he,re)}catch(we){oe(`failed to asynchronously prepare wasm: ${we}`),Wt(we)}})(C,b)})(f);return u(w.instance,w.module)}catch(b){return i(b),Promise.reject(b)}})(),Na=u=>(Na=se.Ea)(u),Da=()=>(Da=se.Fa)();r._OrtInit=(u,f)=>(r._OrtInit=se.Ga)(u,f),r._OrtGetLastError=(u,f)=>(r._OrtGetLastError=se.Ha)(u,f),r._OrtCreateSessionOptions=(u,f,w,b,C,D,G,re,he,we)=>(r._OrtCreateSessionOptions=se.Ia)(u,f,w,b,C,D,G,re,he,we),r._OrtAppendExecutionProvider=(u,f,w,b,C)=>(r._OrtAppendExecutionProvider=se.Ja)(u,f,w,b,C),r._OrtAddFreeDimensionOverride=(u,f,w)=>(r._OrtAddFreeDimensionOverride=se.Ka)(u,f,w),r._OrtAddSessionConfigEntry=(u,f,w)=>(r._OrtAddSessionConfigEntry=se.La)(u,f,w),r._OrtReleaseSessionOptions=u=>(r._OrtReleaseSessionOptions=se.Ma)(u),r._OrtCreateSession=(u,f,w)=>(r._OrtCreateSession=se.Na)(u,f,w),r._OrtReleaseSession=u=>(r._OrtReleaseSession=se.Oa)(u),r._OrtGetInputOutputCount=(u,f,w)=>(r._OrtGetInputOutputCount=se.Pa)(u,f,w),r._OrtGetInputOutputMetadata=(u,f,w,b)=>(r._OrtGetInputOutputMetadata=se.Qa)(u,f,w,b),r._OrtFree=u=>(r._OrtFree=se.Ra)(u),r._OrtCreateTensor=(u,f,w,b,C,D)=>(r._OrtCreateTensor=se.Sa)(u,f,w,b,C,D),r._OrtGetTensorData=(u,f,w,b,C)=>(r._OrtGetTensorData=se.Ta)(u,f,w,b,C),r._OrtReleaseTensor=u=>(r._OrtReleaseTensor=se.Ua)(u),r._OrtCreateRunOptions=(u,f,w,b)=>(r._OrtCreateRunOptions=se.Va)(u,f,w,b),r._OrtAddRunConfigEntry=(u,f,w)=>(r._OrtAddRunConfigEntry=se.Wa)(u,f,w),r._OrtReleaseRunOptions=u=>(r._OrtReleaseRunOptions=se.Xa)(u),r._OrtCreateBinding=u=>(r._OrtCreateBinding=se.Ya)(u),r._OrtBindInput=(u,f,w)=>(r._OrtBindInput=se.Za)(u,f,w),r._OrtBindOutput=(u,f,w,b)=>(r._OrtBindOutput=se._a)(u,f,w,b),r._OrtClearBoundOutputs=u=>(r._OrtClearBoundOutputs=se.$a)(u),r._OrtReleaseBinding=u=>(r._OrtReleaseBinding=se.ab)(u),r._OrtRunWithBinding=(u,f,w,b,C)=>(r._OrtRunWithBinding=se.bb)(u,f,w,b,C),r._OrtRun=(u,f,w,b,C,D,G,re)=>(r._OrtRun=se.cb)(u,f,w,b,C,D,G,re),r._OrtEndProfiling=u=>(r._OrtEndProfiling=se.db)(u),r._JsepOutput=(u,f,w)=>(r._JsepOutput=se.eb)(u,f,w),r._JsepGetNodeName=u=>(r._JsepGetNodeName=se.fb)(u);var yn=()=>(yn=se.gb)(),Xt=r._free=u=>(Xt=r._free=se.hb)(u),Si=r._malloc=u=>(Si=r._malloc=se.ib)(u),_n=(u,f,w,b,C,D)=>(_n=se.kb)(u,f,w,b,C,D),ja=()=>(ja=se.lb)(),Pa=(u,f,w,b,C)=>(Pa=se.mb)(u,f,w,b,C),qa=u=>(qa=se.nb)(u),bn=u=>(bn=se.ob)(u),Ua=(u,f)=>(Ua=se.pb)(u,f),La=()=>(La=se.qb)(),Fa=(u,f)=>(Fa=se.rb)(u,f),ki=u=>(ki=se.sb)(u),vn=u=>(vn=se.tb)(u),$n=()=>($n=se.ub)(),Wa=r.dynCall_ii=(u,f)=>(Wa=r.dynCall_ii=se.vb)(u,f);r.dynCall_vii=(u,f,w)=>(r.dynCall_vii=se.dynCall_vii)(u,f,w),r.dynCall_iiiii=(u,f,w,b,C)=>(r.dynCall_iiiii=se.dynCall_iiiii)(u,f,w,b,C),r.dynCall_iii=(u,f,w)=>(r.dynCall_iii=se.dynCall_iii)(u,f,w),r.dynCall_iiiiii=(u,f,w,b,C,D)=>(r.dynCall_iiiiii=se.dynCall_iiiiii)(u,f,w,b,C,D),r.dynCall_iiiiiiii=(u,f,w,b,C,D,G,re)=>(r.dynCall_iiiiiiii=se.dynCall_iiiiiiii)(u,f,w,b,C,D,G,re),r.dynCall_iiiiiii=(u,f,w,b,C,D,G)=>(r.dynCall_iiiiiii=se.dynCall_iiiiiii)(u,f,w,b,C,D,G),r.dynCall_vi=(u,f)=>(r.dynCall_vi=se.dynCall_vi)(u,f),r.dynCall_iiii=(u,f,w,b)=>(r.dynCall_iiii=se.dynCall_iiii)(u,f,w,b),r.dynCall_i=u=>(r.dynCall_i=se.dynCall_i)(u),r.dynCall_viiiiiiii=(u,f,w,b,C,D,G,re,he)=>(r.dynCall_viiiiiiii=se.dynCall_viiiiiiii)(u,f,w,b,C,D,G,re,he),r.dynCall_viii=(u,f,w,b)=>(r.dynCall_viii=se.dynCall_viii)(u,f,w,b),r.dynCall_viijj=(u,f,w,b,C)=>(r.dynCall_viijj=se.dynCall_viijj)(u,f,w,b,C),r.dynCall_viiiiii=(u,f,w,b,C,D,G)=>(r.dynCall_viiiiii=se.dynCall_viiiiii)(u,f,w,b,C,D,G),r.dynCall_viiii=(u,f,w,b,C)=>(r.dynCall_viiii=se.dynCall_viiii)(u,f,w,b,C),r.dynCall_viiiii=(u,f,w,b,C,D)=>(r.dynCall_viiiii=se.dynCall_viiiii)(u,f,w,b,C,D),r.dynCall_vfiii=(u,f,w,b,C)=>(r.dynCall_vfiii=se.dynCall_vfiii)(u,f,w,b,C),r.dynCall_viiiiff=(u,f,w,b,C,D,G)=>(r.dynCall_viiiiff=se.dynCall_viiiiff)(u,f,w,b,C,D,G),r.dynCall_viiiiiff=(u,f,w,b,C,D,G,re)=>(r.dynCall_viiiiiff=se.dynCall_viiiiiff)(u,f,w,b,C,D,G,re),r.dynCall_ffff=(u,f,w,b)=>(r.dynCall_ffff=se.dynCall_ffff)(u,f,w,b),r.dynCall_viiff=(u,f,w,b,C)=>(r.dynCall_viiff=se.dynCall_viiff)(u,f,w,b,C),r.dynCall_fffffff=(u,f,w,b,C,D,G)=>(r.dynCall_fffffff=se.dynCall_fffffff)(u,f,w,b,C,D,G),r.dynCall_jjjjjjj=(u,f,w,b,C,D,G)=>(r.dynCall_jjjjjjj=se.dynCall_jjjjjjj)(u,f,w,b,C,D,G),r.dynCall_jjjjjj=(u,f,w,b,C,D)=>(r.dynCall_jjjjjj=se.dynCall_jjjjjj)(u,f,w,b,C,D),r.dynCall_iijjii=(u,f,w,b,C,D)=>(r.dynCall_iijjii=se.dynCall_iijjii)(u,f,w,b,C,D),r.dynCall_viiiiiiiiiiiii=(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze)=>(r.dynCall_viiiiiiiiiiiii=se.dynCall_viiiiiiiiiiiii)(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze),r.dynCall_viiiiiiiiii=(u,f,w,b,C,D,G,re,he,we,Ce)=>(r.dynCall_viiiiiiiiii=se.dynCall_viiiiiiiiii)(u,f,w,b,C,D,G,re,he,we,Ce),r.dynCall_viiiiiiiiiii=(u,f,w,b,C,D,G,re,he,we,Ce,Be)=>(r.dynCall_viiiiiiiiiii=se.dynCall_viiiiiiiiiii)(u,f,w,b,C,D,G,re,he,we,Ce,Be),r.dynCall_viiiiiiiiiiii=(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le)=>(r.dynCall_viiiiiiiiiiii=se.dynCall_viiiiiiiiiiii)(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le),r.dynCall_viiiiiiiiiiiiiiiiii=(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze,ft,It,Yt,hr,Wr)=>(r.dynCall_viiiiiiiiiiiiiiiiii=se.dynCall_viiiiiiiiiiiiiiiiii)(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze,ft,It,Yt,hr,Wr),r.dynCall_viiiiiiiii=(u,f,w,b,C,D,G,re,he,we)=>(r.dynCall_viiiiiiiii=se.dynCall_viiiiiiiii)(u,f,w,b,C,D,G,re,he,we),r.dynCall_viiiiiiiiiiiiiiiiiii=(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze,ft,It,Yt,hr,Wr,xn)=>(r.dynCall_viiiiiiiiiiiiiiiiiii=se.dynCall_viiiiiiiiiiiiiiiiiii)(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze,ft,It,Yt,hr,Wr,xn),r.dynCall_viiiiiii=(u,f,w,b,C,D,G,re)=>(r.dynCall_viiiiiii=se.dynCall_viiiiiii)(u,f,w,b,C,D,G,re),r.dynCall_viiiiiiiiiiiiiii=(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze,ft,It)=>(r.dynCall_viiiiiiiiiiiiiii=se.dynCall_viiiiiiiiiiiiiii)(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze,ft,It),r.dynCall_jiji=(u,f,w,b)=>(r.dynCall_jiji=se.dynCall_jiji)(u,f,w,b),r.dynCall_v=u=>(r.dynCall_v=se.dynCall_v)(u),r.dynCall_iidiiii=(u,f,w,b,C,D,G)=>(r.dynCall_iidiiii=se.dynCall_iidiiii)(u,f,w,b,C,D,G),r.dynCall_iiiiiiiii=(u,f,w,b,C,D,G,re,he)=>(r.dynCall_iiiiiiiii=se.dynCall_iiiiiiiii)(u,f,w,b,C,D,G,re,he),r.dynCall_iiij=(u,f,w,b)=>(r.dynCall_iiij=se.dynCall_iiij)(u,f,w,b),r.dynCall_iiiiiiiiii=(u,f,w,b,C,D,G,re,he,we)=>(r.dynCall_iiiiiiiiii=se.dynCall_iiiiiiiiii)(u,f,w,b,C,D,G,re,he,we),r.dynCall_iiiiiiiiiiiii=(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le)=>(r.dynCall_iiiiiiiiiiiii=se.dynCall_iiiiiiiiiiiii)(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le),r.dynCall_iiiiiiiiiii=(u,f,w,b,C,D,G,re,he,we,Ce)=>(r.dynCall_iiiiiiiiiii=se.dynCall_iiiiiiiiiii)(u,f,w,b,C,D,G,re,he,we,Ce),r.dynCall_ji=(u,f)=>(r.dynCall_ji=se.dynCall_ji)(u,f),r.dynCall_iijii=(u,f,w,b,C)=>(r.dynCall_iijii=se.dynCall_iijii)(u,f,w,b,C),r.dynCall_vij=(u,f,w)=>(r.dynCall_vij=se.dynCall_vij)(u,f,w),r.dynCall_viiijii=(u,f,w,b,C,D,G)=>(r.dynCall_viiijii=se.dynCall_viiijii)(u,f,w,b,C,D,G),r.dynCall_viijiiiiiiiiiiiiii=(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze,ft,It,Yt,hr)=>(r.dynCall_viijiiiiiiiiiiiiii=se.dynCall_viijiiiiiiiiiiiiii)(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze,ft,It,Yt,hr),r.dynCall_viiiji=(u,f,w,b,C,D)=>(r.dynCall_viiiji=se.dynCall_viiiji)(u,f,w,b,C,D),r.dynCall_fiii=(u,f,w,b)=>(r.dynCall_fiii=se.dynCall_fiii)(u,f,w,b),r.dynCall_viijii=(u,f,w,b,C,D)=>(r.dynCall_viijii=se.dynCall_viijii)(u,f,w,b,C,D),r.dynCall_viij=(u,f,w,b)=>(r.dynCall_viij=se.dynCall_viij)(u,f,w,b),r.dynCall_jiij=(u,f,w,b)=>(r.dynCall_jiij=se.dynCall_jiij)(u,f,w,b),r.dynCall_fi=(u,f)=>(r.dynCall_fi=se.dynCall_fi)(u,f),r.dynCall_fii=(u,f,w)=>(r.dynCall_fii=se.dynCall_fii)(u,f,w),r.dynCall_jii=(u,f,w)=>(r.dynCall_jii=se.dynCall_jii)(u,f,w),r.dynCall_dii=(u,f,w)=>(r.dynCall_dii=se.dynCall_dii)(u,f,w),r.dynCall_fiiii=(u,f,w,b,C)=>(r.dynCall_fiiii=se.dynCall_fiiii)(u,f,w,b,C),r.dynCall_fif=(u,f,w)=>(r.dynCall_fif=se.dynCall_fif)(u,f,w),r.dynCall_jfi=(u,f,w)=>(r.dynCall_jfi=se.dynCall_jfi)(u,f,w),r.dynCall_viiiiiiiiiiiiii=(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze,ft)=>(r.dynCall_viiiiiiiiiiiiii=se.dynCall_viiiiiiiiiiiiii)(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze,ft),r.dynCall_viiiiiiiiiiiiiiiiiiii=(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze,ft,It,Yt,hr,Wr,xn,ym)=>(r.dynCall_viiiiiiiiiiiiiiiiiiii=se.dynCall_viiiiiiiiiiiiiiiiiiii)(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze,ft,It,Yt,hr,Wr,xn,ym),r.dynCall_viiiiiiiiiiiiiiii=(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze,ft,It,Yt)=>(r.dynCall_viiiiiiiiiiiiiiii=se.dynCall_viiiiiiiiiiiiiiii)(u,f,w,b,C,D,G,re,he,we,Ce,Be,Le,Ze,ft,It,Yt),r.dynCall_iif=(u,f,w)=>(r.dynCall_iif=se.dynCall_iif)(u,f,w),r.dynCall_jiiii=(u,f,w,b,C)=>(r.dynCall_jiiii=se.dynCall_jiiii)(u,f,w,b,C),r.dynCall_jiii=(u,f,w,b)=>(r.dynCall_jiii=se.dynCall_jiii)(u,f,w,b),r.dynCall_viif=(u,f,w,b)=>(r.dynCall_viif=se.dynCall_viif)(u,f,w,b),r.dynCall_viiij=(u,f,w,b,C)=>(r.dynCall_viiij=se.dynCall_viiij)(u,f,w,b,C),r.dynCall_viiiijii=(u,f,w,b,C,D,G,re)=>(r.dynCall_viiiijii=se.dynCall_viiiijii)(u,f,w,b,C,D,G,re),r.dynCall_iiiiij=(u,f,w,b,C,D)=>(r.dynCall_iiiiij=se.dynCall_iiiiij)(u,f,w,b,C,D),r.dynCall_iiiiid=(u,f,w,b,C,D)=>(r.dynCall_iiiiid=se.dynCall_iiiiid)(u,f,w,b,C,D),r.dynCall_iiiiijj=(u,f,w,b,C,D,G)=>(r.dynCall_iiiiijj=se.dynCall_iiiiijj)(u,f,w,b,C,D,G),r.dynCall_iiiiiijj=(u,f,w,b,C,D,G,re)=>(r.dynCall_iiiiiijj=se.dynCall_iiiiiijj)(u,f,w,b,C,D,G,re);var Va=u=>(Va=se.wb)(u),Ga=()=>(Ga=se.xb)(),Ka=u=>(Ka=se.yb)(u),Ha=()=>(Ha=se.zb)();return(function u(){if(0<vt)or=u;else if(h)t(r),lt();else{for(;0<Nr.length;)Nr.shift()(r);0<vt?or=u:(r.calledRun=!0,le||(lt(),t(r)))}})(),r.PTR_SIZE=4,n},ip=In,Xa=globalThis.self?.name?.startsWith("em-pthread"),Xa&&In()}),zn,$s,Ya,zt,np,Ti,Qa,Ja,An,eo,Mn,sp,Rn,ap,Us=ce(()=>{qs(),zn=typeof location>"u"?void 0:location.origin,$s=import.meta.url>"file:"&&import.meta.url<"file;",Ya=()=>{{if($s){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,zn).href}return import.meta.url}},zt=Ya(),np=()=>{if(zt&&!zt.startsWith("blob:"))return zt.substring(0,zt.lastIndexOf("/")+1)},Ti=(e,t)=>{try{let i=t??zt;return(i?new URL(e,i):new URL(e)).origin===zn}catch{return!1}},Qa=(e,t)=>{let i=t??zt;try{return(i?new URL(e,i):new URL(e)).href}catch{return}},Ja=(e,t)=>`${t??"./"}${e}`,An=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},eo=async e=>(await import(e)).default,Mn=(jm(),oi(ep)).default,sp=async()=>{if(!zt)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Ti(zt))return[void 0,Mn()];let e=await An(zt);return[e,Mn(e)]},Rn=(Pm(),oi(rp)).default,ap=async(e,t,i,r)=>{let n=Rn&&!(e||t);if(n)if(zt)n=Ti(zt);else if(r&&!i)n=!0;else throw new Error("cannot determine the script source URL.");if(n)return[void 0,Rn];{let o="ort-wasm-simd-threaded.jsep.mjs",l=e??Qa(o,t),h=i&&l&&!Ti(l,t),c=h?await An(l):l??Ja(o,t);return[h?c:void 0,await eo(c)]}}}),On,Ei,Gr,Bn,to,ro,io,Ls,rt,kr=ce(()=>{Us(),Ei=!1,Gr=!1,Bn=!1,to=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},ro=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},io=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Ls=async e=>{if(Ei)return Promise.resolve();if(Gr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Bn)throw new Error("previous call to 'initializeWebAssembly()' failed.");Gr=!0;let t=e.initTimeout,i=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!io())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!ro())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let r=to();i>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+i+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=i=1);let n=e.wasmPaths,o=typeof n=="string"?n:void 0,l=n?.mjs,h=l?.href??l,c=n?.wasm,m=c?.href??c,y=e.wasmBinary,[_,v]=await ap(h,o,i>1,!!y||!!m),S=!1,k=[];if(t>0&&k.push(new Promise(E=>{setTimeout(()=>{S=!0,E()},t)})),k.push(new Promise((E,N)=>{let I={numThreads:i};if(y)I.wasmBinary=y;else if(m||o)I.locateFile=T=>m??o+T;else if(h&&h.indexOf("blob:")!==0)I.locateFile=T=>new URL(T,h).href;else if(_){let T=np();T&&(I.locateFile=j=>T+j)}v(I).then(T=>{Gr=!1,Ei=!0,On=T,E(),_&&URL.revokeObjectURL(_)},T=>{Gr=!1,Bn=!0,N(T)})})),await Promise.race(k),S)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},rt=()=>{if(Ei&&On)return On;throw new Error("WebAssembly is not initialized yet.")}}),Lt,Wi,Qe,Fs=ce(()=>{kr(),Lt=(e,t)=>{let i=rt(),r=i.lengthBytesUTF8(e)+1,n=i._malloc(r);return i.stringToUTF8(e,n,r),t.push(n),n},Wi=(e,t,i,r)=>{if(typeof e=="object"&&e!==null){if(i.has(e))throw new Error("Circular reference in options");i.add(e)}Object.entries(e).forEach(([n,o])=>{let l=t?t+n:n;if(typeof o=="object")Wi(o,l+".",i,r);else if(typeof o=="string"||typeof o=="number")r(l,o.toString());else if(typeof o=="boolean")r(l,o?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof o}`)})},Qe=e=>{let t=rt(),i=t.stackSave();try{let r=t.PTR_SIZE,n=t.stackAlloc(2*r);t._OrtGetLastError(n,n+r);let o=Number(t.getValue(n,r===4?"i32":"i64")),l=t.getValue(n+r,"*"),h=l?t.UTF8ToString(l):"";throw new Error(`${e} ERROR_CODE: ${o}, ERROR_MESSAGE: ${h}`)}finally{t.stackRestore(i)}}}),op,qm=ce(()=>{kr(),Fs(),op=e=>{let t=rt(),i=0,r=[],n=e||{};try{if(e?.logSeverityLevel===void 0)n.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)n.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(n.terminate=!1);let o=0;return e?.tag!==void 0&&(o=Lt(e.tag,r)),i=t._OrtCreateRunOptions(n.logSeverityLevel,n.logVerbosityLevel,!!n.terminate,o),i===0&&Qe("Can't create run options."),e?.extra!==void 0&&Wi(e.extra,"",new WeakSet,(l,h)=>{let c=Lt(l,r),m=Lt(h,r);t._OrtAddRunConfigEntry(i,c,m)!==0&&Qe(`Can't set a run config entry: ${l} - ${h}.`)}),[i,r]}catch(o){throw i!==0&&t._OrtReleaseRunOptions(i),r.forEach(l=>t._free(l)),o}}}),no,so,ao,Kr,oo,up,Um=ce(()=>{kr(),Fs(),no=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},so=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},ao=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(i=>(typeof i=="string"?i:i.name)==="webgpu")&&(e.enableMemPattern=!1)},Kr=(e,t,i,r)=>{let n=Lt(t,r),o=Lt(i,r);rt()._OrtAddSessionConfigEntry(e,n,o)!==0&&Qe(`Can't set a session config entry: ${t} - ${i}.`)},oo=async(e,t,i)=>{for(let r of t){let n=typeof r=="string"?r:r.name,o=[];switch(n){case"webnn":if(n="WEBNN",typeof r!="string"){let y=r?.deviceType;y&&Kr(e,"deviceType",y,i)}break;case"webgpu":if(n="JS",typeof r!="string"){let y=r;if(y?.preferredLayout){if(y.preferredLayout!=="NCHW"&&y.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${y.preferredLayout}`);Kr(e,"preferredLayout",y.preferredLayout,i)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${n}`)}let l=Lt(n,i),h=o.length,c=0,m=0;if(h>0){c=rt()._malloc(h*rt().PTR_SIZE),i.push(c),m=rt()._malloc(h*rt().PTR_SIZE),i.push(m);for(let y=0;y<h;y++)rt().setValue(c+y*rt().PTR_SIZE,o[y][0],"*"),rt().setValue(m+y*rt().PTR_SIZE,o[y][1],"*")}await rt()._OrtAppendExecutionProvider(e,l,c,m,h)!==0&&Qe(`Can't append execution provider: ${n}.`)}},up=async e=>{let t=rt(),i=0,r=[],n=e||{};ao(n);try{let o=no(n.graphOptimizationLevel??"all"),l=so(n.executionMode??"sequential"),h=typeof n.logId=="string"?Lt(n.logId,r):0,c=n.logSeverityLevel??2;if(!Number.isInteger(c)||c<0||c>4)throw new Error(`log severity level is not valid: ${c}`);let m=n.logVerbosityLevel??0;if(!Number.isInteger(m)||m<0||m>4)throw new Error(`log verbosity level is not valid: ${m}`);let y=typeof n.optimizedModelFilePath=="string"?Lt(n.optimizedModelFilePath,r):0;if(i=t._OrtCreateSessionOptions(o,!!n.enableCpuMemArena,!!n.enableMemPattern,l,!!n.enableProfiling,0,h,c,m,y),i===0&&Qe("Can't create session options."),n.executionProviders&&await oo(i,n.executionProviders,r),n.enableGraphCapture!==void 0){if(typeof n.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);Kr(i,"enableGraphCapture",n.enableGraphCapture.toString(),r)}if(n.freeDimensionOverrides)for(let[_,v]of Object.entries(n.freeDimensionOverrides)){if(typeof _!="string")throw new Error(`free dimension override name must be a string: ${_}`);if(typeof v!="number"||!Number.isInteger(v)||v<0)throw new Error(`free dimension override value must be a non-negative integer: ${v}`);let S=Lt(_,r);t._OrtAddFreeDimensionOverride(i,S,v)!==0&&Qe(`Can't set a free dimension override: ${_} - ${v}.`)}return n.extra!==void 0&&Wi(n.extra,"",new WeakSet,(_,v)=>{Kr(i,_,v,r)}),[i,r]}catch(o){throw i!==0&&t._OrtReleaseSessionOptions(i)!==0&&Qe("Can't release session options."),r.forEach(l=>t._free(l)),o}}}),yr,Jt,_r,Qi,Vi,Ws,Vs,xs,Ne=ce(()=>{yr=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Jt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},_r=(e,t)=>{let i=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((n,o)=>n*o,1);return i>0?Math.ceil(r*i):void 0},Qi=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Vi=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Ws=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Vs=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",xs=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Gs,lp=ce(()=>{qs(),Gs=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let i=t.headers.get("Content-Length"),r=i?parseInt(i,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),o;try{o=new ArrayBuffer(r)}catch(h){if(h instanceof RangeError){let c=Math.ceil(r/65536);o=new WebAssembly.Memory({initial:c,maximum:c}).buffer}else throw h}let l=0;for(;;){let{done:h,value:c}=await n.read();if(h)break;let m=c.byteLength;new Uint8Array(o,l,m).set(c),l+=m}return new Uint8Array(o,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),uo,lo,po,ho,Ks,fo,Ge,er=ce(()=>{Ne(),uo=["V","I","W","E","F"],lo=(e,t)=>{console.log(`[${uo[e]},${new Date().toISOString()}]${t}`)},Ks=(e,t)=>{po=e,ho=t},fo=(e,t)=>{let i=Vi(e),r=Vi(po);i>=r&&lo(i,typeof t=="function"?t():t)},Ge=(...e)=>{ho&&fo(...e)}}),co,Rr,te,Gi,dp,pp,hp,Pe=ce(()=>{co=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Rr=class{static calcShape(e,t,i=!1){let r=e.length,n=t.length;if(r===0)return t;if(n===0)return e;let o=Math.max(e.length,t.length),l=new Array(o);if(i){if(r<2||n<2)return;let h=co.calcMatMulShape([e[r-2],e[r-1]],[t[n-2],t[n-1]]);if(h===void 0)return;[l[o-2],l[o-1]]=h}for(let h=i?3:1;h<=o;h++){let c=r-h<0?1:e[r-h],m=n-h<0?1:t[n-h];if(c!==m&&c>1&&m>1)return;let y=Math.max(c,m);if(c&&m)l[o-h]=Math.max(c,m);else{if(y>1)return;l[o-h]=0}}return l}static isValidBroadcast(e,t){let i=e.length,r=t.length;if(i>r)return!1;for(let n=1;n<=i;n++)if(e[i-n]!==1&&e[i-n]!==t[r-n])return!1;return!0}},te=class Pi{static size(t){return Pi.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,i=4){let r=t.length;if(r===0)return[];let n=new Array(r),o=r-1;for(;o>=0;){if(t[o]%i===0){n[o]=t[o]/i;break}if(i%t[o]!==0)throw new Error("cannot convert shape");n[o]=1,i/=t[o],o--}for(o--;o>=0;o--)n[o]=t[o];return n}static sizeFromDimension(t,i){if(i<0||i>t.length)throw new Error(`invalid dimension of ${i} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Pi.getSizeFromDimensionRange(t,i,t.length)}static sizeToDimension(t,i){if(i<0||i>t.length)throw new Error(`invalid dimension of ${i} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Pi.getSizeFromDimensionRange(t,0,i)}static getSizeFromDimensionRange(t,i,r){let n=1;for(let o=i;o<r;o++){if(t[o]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(t[o])}return n}static computeStrides(t){let i=t.length;if(i===0)return[];if(i===1)return[1];let r=new Array(i);r[i-1]=1,r[i-2]=t[i-1];for(let n=i-3;n>=0;--n)r[n]=r[n+1]*t[n+1];return r}static normalizeAxis(t,i){if(t<-i&&t>=i)throw new Error("unsupported axis for this operation.");return t<0?t+i:t}static normalizeAxes(t,i){return t.map(r=>this.normalizeAxis(r,i??t.length))}static sortBasedOnPerm(t,i){return i?i.map(r=>t[r]):t.slice().reverse()}static padShape(t,i){let r=t.length;return t.map((n,o)=>n+i[o]+i[o+r])}static areEqual(t,i){return t.length!==i.length?!1:t.every((r,n)=>r===i[n])}},Gi=class ii{static adjustPoolAttributes(t,i,r,n,o,l){if(!t&&r.length!==i.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let h=0;h<i.length-2;h++)h>=r.length?r.push(i[h+2]):r[h]=i[h+2];for(let h=0;h<r.length;h++)if(h<n.length){if(n[h]<0)throw new Error("strides should be greater than or equal to 1")}else n.push(1);for(let h=0;h<r.length;h++)if(h<o.length){if(o[h]<0)throw new Error("dilations should be greater than or equal to 1")}else o.push(1);for(let h=0;h<r.length*2;h++)if(h<l.length){if(l[h]<0)throw new Error("pad should be greater than or equal to 1")}else l.push(0);for(let h=0;h<r.length;h++){if(r[h]<=0)throw new Error("kernel shapes need to be greater than 0");if(l[h]>=r[h]||l[h+r.length]>=r[h])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,i,r,n,o,l,h){if(h){if(o.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(i.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let c=0;c<t.length-2;c++)ii.adjustPadAndReturnShape(t[c+(l?1:2)],i[c],r[c],n[c],o,c,c+t.length-2,h)}}static computePoolOutputShape(t,i,r,n,o,l,h){if(i.length<=0)throw new Error("input shape must be of size greater than 0");let c=[i[0],i[1]];return ii.computeShapeHelper(t,i,c,r,n,o,l,h),c}static computeConvOutputShape(t,i,r,n,o,l,h){if(t.length<=0||i.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let c=[t[0],i[0]];return ii.computeShapeHelper(!1,t,c,r,n,o,l,h),c}static computeShapeHelper(t,i,r,n,o,l,h,c){if(t)for(let m=0;m<i.length-2;m++)r.push(1);else for(let m=0;m<i.length-2;m++)r.push(ii.adjustPadAndReturnShape(i[m+2],n[m],o[m],l[m],h,m,m+i.length-2,c))}static adjustPadAndReturnShape(t,i,r,n,o,l,h,c){let m=r*(n-1)+1;if(c&&c!=="NOTSET")switch(c){case"VALID":return o[l]=0,o[h]=0,Math.floor((t-m)/i+1);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let y=((t+i-1)/i-1)*i+n-t;return o[l]=Math.floor(c==="SAME_LOWER"?(y+1)/2:y/2),o[h]=y-o[l],Math.floor((t+y-n)/i+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+o[l]+o[h]-m)/i+1)}},dp=class{static getShapeOfGemmResult(e,t,i,r,n){if(e.length!==2||i.length!==2)throw new Error("shape need to be of size 2");let o,l,h;t?(o=e[1],l=e[0]):(o=e[0],l=e[1]);let c=-1;if(r?(h=i[0],c=1):(h=i[1],c=0),i[c]!==l)throw new Error("dimension mismatch");if(o<=0||h<=0||l<=0)throw new Error("invalid shape specified");if(n&&!Rr.isValidBroadcast(n,[o,h]))throw new Error("gemm: invalid bias shape for broadcast");return[o,h,l]}},pp=-34028234663852886e22,hp=34028234663852886e22}),Hs,fp=ce(()=>{Ne(),Hs=(e,t)=>new(Qi(t))(e)}),Nn,Ss,Dn,mo,jn,go,Pn,qn,Un,wo,cp,Lm=ce(()=>{Ne(),er(),Nn=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Ss=(e,t)=>{if(t==="int32")return e;let i=Nn.get(t);if(!i)throw new Error(`WebNN backend does not support data type: ${t}`);let r=i/8;if(e.byteLength%r!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${r}.`);let n=e.byteLength/r,o=new(Qi(t))(e.buffer,e.byteOffset,n);switch(t){case"int64":case"uint64":{let l=new Int32Array(n);for(let h=0;h<n;h++){let c=o[h];if(c>2147483647n||c<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");l[h]=Number(c)}return new Uint8Array(l.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&o.some(h=>h>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let l=Int32Array.from(o,Number);return new Uint8Array(l.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Dn=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let i=e.byteLength/4,r=new Int32Array(e.buffer,e.byteOffset,i);switch(t){case"int64":{let n=BigInt64Array.from(r,BigInt);return new Uint8Array(n.buffer)}case"uint64":{if(r.some(o=>o<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let n=BigUint64Array.from(r,BigInt);return new Uint8Array(n.buffer)}case"int8":{if(r.some(o=>o<-128||o>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let n=Int8Array.from(r,Number);return new Uint8Array(n.buffer)}case"uint8":{if(r.some(n=>n<0||n>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(r,Number)}case"uint32":{if(r.some(o=>o<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let n=Uint32Array.from(r,Number);return new Uint8Array(n.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},mo=1,jn=()=>mo++,go=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Pn=(e,t)=>{let i=Nn.get(e);if(!i)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((r,n)=>r*n)*i/8):0},qn=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:i,tensor:r,dataType:n,shape:o,fallbackDataType:l}=e;this.sessionId=t,this.mlContext=i,this.mlTensor=r,this.dataType=n,this.tensorShape=o,this.fallbackDataType=l}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Pn(this.dataType,this.tensorShape)}destroy(){Ge("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),i=Dn(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(i);return}else return i.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,i){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===i.length&&this.tensorShape.every((r,n)=>r===i[n])}setIsDataConverted(e){this.isDataConverted=e}},Un=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,i,r){let n=this.tensorManager.getMLContext(e),o;if(!n.opSupportLimits().input.dataTypes.includes(t)){if(o=go.get(t),!o||!n.opSupportLimits().input.dataTypes.includes(o))throw new Error(`WebNN backend does not support data type: ${t}`);Ge("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${o}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(n,t,i))return this.wrapper.tensor;if(r){if(this.wrapper.byteLength!==Pn(t,i))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let l=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,i,l,!0,!0,o),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Ss(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else Ge("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Dn(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},wo=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}reserveTensorId(){let e=jn();return this.tensorTrackersById.set(e,new Un(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,i,r,n){Ge("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${i}, shape: ${r}, copyOld: ${n}}`);let o=this.tensorTrackersById.get(t);if(!o)throw new Error("Tensor not found.");return o.ensureTensor(e,i,r,n)}upload(e,t){let i=this.tensorTrackersById.get(e);if(!i)throw new Error("Tensor not found.");i.upload(t)}async download(e,t){Ge("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let i=this.tensorTrackersById.get(e);if(!i)throw new Error("Tensor not found.");return i.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,i,r){let n=this.getMLContext(e),o=jn(),l=new qn({sessionId:e,context:n,tensor:t,dataType:i,shape:r});return this.tensorTrackersById.set(o,new Un(this,l)),this.externalTensors.add(l),o}async getCachedTensor(e,t,i,r,n,o,l){let h=this.getMLContext(e);for(let[m,y]of this.freeTensors.entries())if(y.canReuseTensor(h,t,i)){Ge("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${l?`fallbackDataType: ${l},`:""} shape: ${i}`);let _=this.freeTensors.splice(m,1)[0];return _.sessionId=e,_}Ge("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${l?`fallbackDataType: ${l},`:""} shape: ${i}}`);let c=await h.createTensor({dataType:l??t,shape:i,dimensions:i,usage:r,writable:n,readable:o});return new qn({sessionId:e,context:h,tensor:c,dataType:t,shape:i,fallbackDataType:l})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},cp=(...e)=>new wo(...e)}),Hr,yo,mp,Fm=ce(()=>{Ne(),kr(),fp(),Lm(),er(),Hr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),yo=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let i=Object.keys(e).sort(),r=Object.keys(t).sort();return i.length===r.length&&i.every((n,o)=>n===r[o]&&e[n]===t[n])},mp=class{constructor(e){this.tensorManager=cp(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,Ks(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){Ge("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){Ge("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let i of t)Ge("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${i}}`),this.tensorManager.releaseTensorId(i);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let i=this.mlContextCache.findIndex(r=>r.gpuDevice===e);if(i!==-1)return this.mlContextCache[i].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:r}),r}}else if(e===void 0){let i=this.mlContextCache.findIndex(r=>r.options===void 0&&r.gpuDevice===void 0);if(i!==-1)return this.mlContextCache[i].mlContext;{let r=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:r}),r}}let t=this.mlContextCache.findIndex(i=>yo(i.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:i}),i}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let i=this.sessionIdsByMLContext.get(t);i||(i=new Set,this.sessionIdsByMLContext.set(t,i)),i.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let i=this.sessionIdsByMLContext.get(t);if(i.delete(e),i.size===0){this.sessionIdsByMLContext.delete(t);let r=this.mlContextCache.findIndex(n=>n.mlContext===t);r!==-1&&this.mlContextCache.splice(r,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){Ge("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,i,r,n){let o=Hr.get(i);if(!o)throw new Error(`Unsupported ONNX data type: ${i}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,o,r,n)}async createTemporaryTensor(e,t,i){Ge("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${i}}`);let r=Hr.get(t);if(!r)throw new Error(`Unsupported ONNX data type: ${t}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,n,r,i,!1);let o=this.temporarySessionTensorIds.get(e);return o?o.push(n):this.temporarySessionTensorIds.set(e,[n]),n}uploadTensor(e,t){if(!rt().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");Ge("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let i=await this.tensorManager.download(e);return Hs(i,t)}}registerMLTensor(e,t,i,r){let n=Hr.get(i);if(!n)throw new Error(`Unsupported ONNX data type: ${i}`);let o=this.tensorManager.registerTensor(e,t,n,r);return Ge("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${n}, dimensions: ${r}} -> {tensorId: ${o}}`),o}registerMLConstant(e,t,i,r,n,o,l=!1){if(!o)throw new Error("External mounted files are not available.");let h=e;e.startsWith("./")&&(h=e.substring(2));let c=o.get(h);if(!c)throw new Error(`File with name ${h} not found in preloaded files.`);if(t+i>c.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let m=c.slice(t,t+i).buffer,y;switch(n.dataType){case"float32":y=new Float32Array(m);break;case"float16":y=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(m):new Uint16Array(m);break;case"int32":y=new Int32Array(m);break;case"uint32":y=new Uint32Array(m);break;case"int64":if(l){let _=Ss(new Uint8Array(m),"int64");y=new Int32Array(_.buffer),n.dataType="int32"}else y=new BigInt64Array(m);break;case"uint64":y=new BigUint64Array(m);break;case"int8":y=new Int8Array(m);break;case"int4":case"uint4":case"uint8":y=new Uint8Array(m);break;default:throw new Error(`Unsupported data type: ${n.dataType} in creating WebNN Constant from external data.`)}return Ge("verbose",()=>`[WebNN] registerMLConstant {dataType: ${n.dataType}, shape: ${n.shape}}} ${l?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),r.constant(n,y)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let i=this.sessionGraphInputs.get(e);return i?i.includes(t):!1}isGraphOutput(e,t){let i=this.sessionGraphOutputs.get(e);return i?i.includes(t):!1}isGraphInputOutputTypeSupported(e,t,i=!0){let r=this.mlContextBySessionId.get(e),n=Hr.get(yr(t));return typeof n>"u"?!1:i?!!r?.opSupportLimits().input.dataTypes.includes(n):!!r?.opSupportLimits().output.dataTypes.includes(n)}flush(){}}}),Zs=ce(()=>{}),Ln,Ii,zi,_o,bo,Fn,ks,vo,gp,Wm=ce(()=>{er(),Zs(),Ln=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Ii=[],zi=e=>Math.ceil(Number(e)/16)*16,_o=e=>{for(let t=0;t<Ii.length;t++){let i=Ii[t];if(e<=i)return i}return Math.ceil(e/16)*16},bo=1,Fn=()=>bo++,ks=async(e,t,i,r)=>{let n=zi(i),o=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let l=e.getCommandEncoder();e.endComputePass(),l.copyBufferToBuffer(t,0,o,0,n),e.flush(),await o.mapAsync(GPUMapMode.READ);let h=o.getMappedRange();if(r){let c=r();return c.set(new Uint8Array(h,0,i)),c}else return new Uint8Array(h.slice(0,i))}finally{o.destroy()}},vo=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Ln)Ii.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let i=t.buffer,r=t.byteOffset,n=t.byteLength,o=zi(n),l=this.storageCache.get(e);if(!l)throw new Error("gpu data for uploading does not exist");if(Number(l.originalSize)!==n)throw new Error(`inconsistent data size. gpu data size=${l.originalSize}, data size=${n}`);let h=this.backend.device.createBuffer({mappedAtCreation:!0,size:o,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),c=h.getMappedRange();new Uint8Array(c).set(new Uint8Array(i,r,n)),h.unmap();let m=this.backend.device.createCommandEncoder();m.copyBufferToBuffer(h,0,l.gpuData.buffer,0,o),this.backend.device.queue.submit([m.finish()]),h.destroy(),Ge("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let i=this.storageCache.get(e);if(!i)throw new Error("source gpu data for memcpy does not exist");let r=this.storageCache.get(t);if(!r)throw new Error("destination gpu data for memcpy does not exist");if(i.originalSize!==r.originalSize)throw new Error("inconsistent source and destination gpu data size");let n=zi(i.originalSize),o=this.backend.getCommandEncoder();this.backend.endComputePass(),o.copyBufferToBuffer(i.gpuData.buffer,0,r.gpuData.buffer,0,n)}registerExternalBuffer(e,t,i){let r;if(i){if(r=i[0],e===i[1])return Ge("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`),r;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else r=Fn();return this.storageCache.set(r,{gpuData:{id:r,type:0,buffer:e},originalSize:t}),Ge("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`),r}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),Ge("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let i=_o(e),r,n=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,o=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||o){let h=(n?this.freeBuffers:this.freeUniformBuffers).get(i);h?h.length>0?r=h.pop():r=this.backend.device.createBuffer({size:i,usage:t}):r=this.backend.device.createBuffer({size:i,usage:t})}else r=this.backend.device.createBuffer({size:i,usage:t});let l={id:Fn(),type:0,buffer:r};return this.storageCache.set(l.id,{gpuData:l,originalSize:Number(e)}),Ge("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${l.id}`),l}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,i=this.storageCache.get(t);if(!i){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return Ge("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${i.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(i.gpuData.buffer),i.originalSize}async download(e,t){let i=this.storageCache.get(Number(e));if(!i)throw new Error("data does not exist");await ks(this.backend,i.gpuData.buffer,i.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Ln.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let i=this.freeBuffers.get(e.size)||[];t===void 0||i.length>=t?e.destroy():i.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let i=this.freeUniformBuffers.get(e.size)||[];t===void 0||i.length>=t?e.destroy():i.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(i=>{i.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(Ge("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(i=>{i.gpuData.buffer.destroy()}),this.storageCache=new Map)}},gp=(...e)=>new vo(...e)}),$o,Xe,ut=ce(()=>{$o=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},Xe=e=>new $o(e)}),Or,Ai,gt,St,Ie,ot,Cs,Mr,sr,Ee,Zr,ae,Te,wp,Xs,xo,yp,qe=ce(()=>{Ne(),Pe(),Or=64,Ai=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},gt=(e,t=1)=>{let i=Ai(e,t);return typeof i=="string"?i:i[0]},St=(e,t=1)=>{let i=Ai(e,t);return typeof i=="string"?i:i[1]},Ie=(...e)=>{let t=[];return e.forEach(i=>{i.length!==0&&t.push({type:12,data:i},{type:12,data:te.computeStrides(i)})}),t},ot=e=>e%4===0?4:e%2===0?2:1,Cs=(e="f32",t,i="0")=>!t||t===1?`${e}(${i})`:`vec${t}<${e}>(${i})`,Mr=(e,t,i)=>e==="f32"?i:t===1?`f32(${i})`:`vec${t}<f32>(${i})`,sr=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,Ee=(e,t,i,r)=>e.startsWith("uniforms.")&&i>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:i>1?`${e}[${t}]`:e,Zr=(e,t,i,r,n)=>{let o=typeof i=="number",l=o?i:i.length,h=[...new Array(l).keys()],c=l<2?"u32":l<=4?`vec${l}<u32>`:`array<u32, ${l}>`,m=Ai(t,n),y=typeof m=="string"?m:m[1],_=typeof m=="string"?m:m[0],v={indices:c,value:y,storage:_,tensor:t},S=J=>typeof J=="string"?J:`${J}u`,k={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},E=o?"uniforms.":"",N=`${E}${e}_shape`,I=`${E}${e}_strides`,T="";for(let J=0;J<l-1;J++)T+=`
    let dim${J} = current / ${Ee(I,J,l)};
    let rest${J} = current % ${Ee(I,J,l)};
    indices[${J}] = dim${J};
    current = rest${J};
    `;T+=`indices[${l-1}] = current;`;let j=l<2?"":`
  fn o2i_${e}(offset: u32) -> ${v.indices} {
    var indices: ${v.indices};
    var current = offset;
    ${T}
    return indices;
  }`,B=J=>(k.offsetToIndices=!0,l<2?J:`o2i_${e}(${J})`),W=[];if(l>=2)for(let J=l-1;J>=0;J--)W.push(`${Ee(I,J,l)} * (indices[${J}])`);let Q=l<2?"":`
  fn i2o_${e}(indices: ${v.indices}) -> u32 {
    return ${W.join("+")};
  }`,X=J=>(k.indicesToOffset=!0,l<2?J:`i2o_${e}(${J})`),ie=(...J)=>l===0?"0u":`${v.indices}(${J.map(S).join(",")})`,fe=(J,K)=>l<2?`${J}`:`${Ee(J,K,l)}`,_e=(J,K,me)=>l<2?`${J}=${me};`:`${Ee(J,K,l)}=${me};`,xe={},ke=(J,K)=>{k.broadcastedIndicesToOffset=!0;let me=`${K.name}broadcastedIndicesTo${e}Offset`;if(me in xe)return`${me}(${J})`;let De=[];for(let P=l-1;P>=0;P--){let Ae=K.indicesGet("outputIndices",P+K.rank-l);De.push(`${fe(I,P)} * (${Ae} % ${fe(N,P)})`)}return xe[me]=`fn ${me}(outputIndices: ${K.type.indices}) -> u32 {
             return ${De.length>0?De.join("+"):"0u"};
           }`,`${me}(${J})`},q=(J,K)=>(()=>{if(v.storage===v.value)return`${e}[${J}]=${K};`;if(v.storage==="vec2<u32>"&&v.value==="i32")return`${e}[${J}]=vec2<u32>(u32(${K}), select(0u, 0xFFFFFFFFu, ${K} < 0));`;if(v.storage==="vec2<u32>"&&v.value==="u32")return`${e}[${J}]=vec2<u32>(u32(${K}), 0u);`;if(v.storage==="u32"&&v.value==="vec4<bool>")return`${e}[${J}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${K}));`;throw new Error(`not supported combination of storage type ${v.storage} and value type ${v.value} yet`)})(),O=J=>(()=>{if(v.storage===v.value)return`${e}[${J}]`;if(v.storage==="vec2<u32>"&&v.value==="i32")return`i32(${e}[${J}].x)`;if(v.storage==="vec2<u32>"&&v.value==="u32")return`u32(${e}[${J}].x)`;if(v.storage==="u32"&&v.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${J}] & 0xFFu), bool(${e}[${J}] & 0xFF00u), bool(${e}[${J}] & 0xFF0000u), bool(${e}[${J}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${v.storage} and value type ${v.value} yet`)})(),Y=l<2?"":`
  fn get_${e}ByIndices(indices: ${v.indices}) -> ${y} {
    return ${O(`i2o_${e}(indices)`)};
  }`,U=l<2?"":(()=>{let J=h.map(me=>`d${me}: u32`).join(", "),K=h.map(me=>`d${me}`).join(", ");return`
  fn get_${e}(${J}) -> ${y} {
    return get_${e}ByIndices(${ie(K)});
  }`})(),Z=(...J)=>{if(J.length!==l)throw new Error(`indices length must be ${l}`);let K=J.map(S).join(",");return l===0?O("0u"):l===1?O(K[0]):(k.get=!0,k.getByIndices=!0,k.indicesToOffset=!0,`get_${e}(${K})`)},oe=J=>l<2?O(J):(k.getByIndices=!0,k.indicesToOffset=!0,`get_${e}ByIndices(${J})`),le=l<2?"":`
  fn set_${e}ByIndices(indices: ${v.indices}, value: ${y}) {
    ${q(`i2o_${e}(indices)`,"value")}
  }`,Se=l<2?"":(()=>{let J=h.map(me=>`d${me}: u32`).join(", "),K=h.map(me=>`d${me}`).join(", ");return`
  fn set_${e}(${J}, value: ${y}) {
    set_${e}ByIndices(${ie(K)}, value);
  }`})();return{impl:()=>{let J=[],K=!1;return k.offsetToIndices&&(J.push(j),K=!0),k.indicesToOffset&&(J.push(Q),K=!0),k.broadcastedIndicesToOffset&&(Object.values(xe).forEach(me=>J.push(me)),K=!0),k.set&&(J.push(Se),K=!0),k.setByIndices&&(J.push(le),K=!0),k.get&&(J.push(U),K=!0),k.getByIndices&&(J.push(Y),K=!0),!o&&K&&J.unshift(`const ${N} = ${v.indices}(${i.join(",")});`,`const ${I} = ${v.indices}(${te.computeStrides(i).join(",")});`),J.join(`
`)},type:v,offsetToIndices:B,indicesToOffset:X,broadcastedIndicesToOffset:ke,indices:ie,indicesGet:fe,indicesSet:_e,set:(...J)=>{if(J.length!==l+1)throw new Error(`indices length must be ${l}`);let K=J[l];if(typeof K!="string")throw new Error("value must be string");let me=J.slice(0,l).map(S).join(",");return l===0?q("0u",K):l===1?q(me[0],K):(k.set=!0,k.setByIndices=!0,k.indicesToOffset=!0,`set_${e}(${me}, ${K})`)},setByOffset:q,setByIndices:(J,K)=>l<2?q(J,K):(k.setByIndices=!0,k.indicesToOffset=!0,`set_${e}ByIndices(${J}, ${K});`),get:Z,getByOffset:O,getByIndices:oe,usage:r,name:e,strides:I,shape:N,rank:l}},ae=(e,t,i,r=1)=>Zr(e,t,i,"input",r),Te=(e,t,i,r=1)=>Zr(e,t,i,"output",r),wp=(e,t,i)=>Zr(e,t,i,"atomicOutput",1),Xs=(e,t,i,r=1)=>Zr(e,t,i,"internal",r),xo=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Or){let t=typeof e=="number"?e:e[0],i=typeof e=="number"?1:e[1],r=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||i>this.limits.maxComputeWorkgroupSizeY||r>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${i}, ${r}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*i*r>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${i}, ${r}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,o=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,l=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*i*r}u + local_idx;`;return`@compute @workgroup_size(${t}, ${i}, ${r})
  fn main(${o}) {
    ${l}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let i=e.usage==="input"?"read":"read_write",r=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${i}> ${e.name}: array<${r}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,i=1){return this.uniforms.push({name:e,type:t,length:i}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:i,length:r}of this.uniforms)if(r&&r>4)i==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${i}>, ${Math.ceil(r/8)}>`):e.push(`${t}:array<vec4<${i}>, ${Math.ceil(r/4)}>`);else{let n=r==null||r===1?i:`vec${r}<${i}>`;e.push(`${t}:${n}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},yp=(e,t)=>new xo(e,t)}),So,Wn,ko,Co,To,Eo,Mt,_p,bp,ar=ce(()=>{Ne(),Pe(),ut(),qe(),So=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Wn=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),ko=(e,t)=>te.sortBasedOnPerm(e,Wn(e.length,t)),Co=(e,t,i,r)=>{let n=`fn perm(i: ${r.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`;for(let o=0;o<t;++o)n+=`a[${e[o]}]=i[${o}];`;return n+="return a;}"},To=(e,t)=>{let i=[],r=[];for(let n=0;n<e.length;++n)e[n]!==1&&i.push(e[n]),e[t[n]]!==1&&r.push(t[n]);return{newShape:i,newPerm:r}},Eo=(e,t)=>{let i=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<i)return!1;i=e[r]}return!0},Mt=(e,t)=>{let i=e.dataType,r=e.dims.length,n=Wn(r,t),o=ko(e.dims,n),l=e.dims,h=o,c=r<2||Eo(n,e.dims),m;if(c)return m=k=>{let E=ae("input",i,l,4),N=Te("output",i,h,4);return`
  ${k.registerUniform("output_size","u32").declareVariables(E,N)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let k=te.size(o);return{outputs:[{dims:o,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(k/64/4)},programUniforms:[{type:12,data:Math.ceil(k/4)}]}},getShaderSource:m};let{newShape:y,newPerm:_}=To(e.dims,n),v=te.areEqual(_,[2,3,1]),S=te.areEqual(_,[3,1,2]);if(y.length===2||v||S){l=v?[y[0],y[1]*y[2]]:S?[y[0]*y[1],y[2]]:y,h=[l[1],l[0]];let k=16;return m=E=>{let N=ae("a",i,l.length),I=Te("output",i,h.length);return`
  ${E.registerUniform("output_size","u32").declareVariables(N,I)}
  var<workgroup> tile : array<array<${I.type.value}, ${k+1}>, ${k}>;
  ${E.mainStart([k,k,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${k} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${k}u + local_id.x;
    let input_row = workgroup_id_x * ${k}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${N.getByIndices(`${N.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${k}u + local_id.x;
    let output_row = workgroup_id_y * ${k}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${I.setByIndices(`${I.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let E=te.size(o);return{outputs:[{dims:o,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(h[1]/k),y:Math.ceil(h[0]/k)},programUniforms:[{type:12,data:E},...Ie(l,h)]}},getShaderSource:m}}return m=k=>{let E=ae("a",i,l.length),N=Te("output",i,h.length);return`
  ${k.registerUniform("output_size","u32").declareVariables(E,N)}

  ${Co(n,r,E,N)}

  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${N.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${N.setByOffset("global_idx",E.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let k=te.size(o);return{outputs:[{dims:o,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:[{type:12,data:k},...Ie(l,h)]}},getShaderSource:m}},_p=(e,t)=>{So(e.inputs,t.perm),e.compute(Mt(e.inputs[0],t.perm))},bp=e=>Xe({perm:e.perm})}),Io,zo,Ao,Mo,Ro,Oo,Bo,No,Do,jo,Dt,vp,$p,xp,Sp,kp,Cp,Tp,Ep,Ip,zp,Vm=ce(()=>{Ne(),Pe(),qe(),Ys(),ar(),Io={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},zo={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Ao={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Mo={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Ro=(e,t)=>{let i=[];for(let r=t-e;r<t;++r)i.push(r);return i},Oo=(e,t)=>{let i=[],r=e.length;for(let o=0;o<r;o++)t.indexOf(o)===-1&&i.push(e[o]);let n=t.map(o=>e[o]);return[i,n]},Bo=(e,t)=>{let i=e.length+t.length,r=[],n=0;for(let o=0;o<i;o++)t.indexOf(o)===-1?r.push(e[n++]):r.push(1);return r},No=(e,t)=>{for(let i=0;i<e.length;++i)if(e[e.length-i-1]!==t-1-i)return!1;return!0},Do=(e,t)=>{let i=[];if(!No(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&i.push(r);e.forEach(r=>i.push(r))}return i},jo=(e,t,i,r,n,o,l)=>{let h=i[0].dims,c=te.size(o),m=te.size(l),y=ae("_A",i[0].dataType,h),_=Te("output",n,o),v=64;c===1&&(v=256);let S=`
          var<workgroup> aBestValues : array<f32, ${v}>;
       `,k=E=>`
        ${E.registerUniform("reduceSize","u32").declareVariables(y,_)}
        ${S}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${E.mainStart(v)}

          let outputIndex = global_idx / ${v};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Ao[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${v}) {
           let candidate = f32(${y.getByOffset("offset + k")});
           bestValue = ${Io[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${v}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${zo[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${_.setByOffset("outputIndex",`${r==="mean"?`${_.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${_.type.storage}(${Mo[r]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${v}`,inputDependencies:["type"]},getShaderSource:k,getRunData:()=>({outputs:[{dims:o,dataType:n}],dispatchGroup:{x:c},programUniforms:[{type:12,data:m}]})}},Dt=(e,t,i,r)=>{let n=e.inputs.length===1?i:Ts(e.inputs,i),o=n.axes;o.length===0&&!n.noopWithEmptyAxes&&(o=e.inputs[0].dims.map((S,k)=>k));let l=te.normalizeAxes(o,e.inputs[0].dims.length),h=l,c=e.inputs[0],m=Do(h,e.inputs[0].dims.length);m.length>0&&(c=e.compute(Mt(e.inputs[0],m),{inputs:[0],outputs:[-1]})[0],h=Ro(h.length,c.dims.length));let[y,_]=Oo(c.dims,h),v=y;n.keepDims&&(v=Bo(y,l)),e.compute(jo(t,n.cacheKey,[c],r,e.inputs[0].dataType,v,_),{inputs:[c]})},vp=(e,t)=>{Dt(e,"ReduceMeanShared",t,"mean")},$p=(e,t)=>{Dt(e,"ReduceL1Shared",t,"l1")},xp=(e,t)=>{Dt(e,"ReduceL2Shared",t,"l2")},Sp=(e,t)=>{Dt(e,"ReduceLogSumExpShared",t,"logSumExp")},kp=(e,t)=>{Dt(e,"ReduceMaxShared",t,"max")},Cp=(e,t)=>{Dt(e,"ReduceMinShared",t,"min")},Tp=(e,t)=>{Dt(e,"ReduceProdShared",t,"prod")},Ep=(e,t)=>{Dt(e,"ReduceSumShared",t,"sum")},Ip=(e,t)=>{Dt(e,"ReduceSumSquareShared",t,"sumSquare")},zp=(e,t)=>{Dt(e,"ReduceLogSumShared",t,"logSum")}}),jt,Po,Ki,Ts,Pt,qo,Uo,Lo,Fo,Wo,Vo,Go,Ko,Ho,Zo,qt,Ap,Mp,Rp,Op,Bp,Np,Dp,jp,Pp,qp,Ys=ce(()=>{Ne(),Pe(),ut(),qe(),Vm(),jt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Po=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Ki=(e,t,i,r,n,o,l=!1,h=!1)=>{let c=[],m=i[0].dims,y=m.length,_=te.normalizeAxes(n,y),v=!h&&_.length===0;m.forEach((E,N)=>{v||_.indexOf(N)>=0?l&&c.push(1):c.push(E)});let S=c.length,k=te.size(c);return{name:e,shaderCache:t,getShaderSource:E=>{let N=[],I=ae("_A",i[0].dataType,y),T=Te("output",o,S),j=r(I,T,_),B=j[2];for(let W=0,Q=0;W<y;W++)v||_.indexOf(W)>=0?(l&&Q++,B=`for(var j${W}: u32 = 0; j${W} < ${m[W]}; j${W}++) {
                  ${j[2].includes("last_index")?`let last_index = j${W};`:""}
                  ${I.indicesSet("input_indices",W,`j${W}`)}
                  ${B}
                }`):(N.push(`${I.indicesSet("input_indices",W,T.indicesGet("output_indices",Q))};`),Q++);return`

        ${E.registerUniform("output_size","u32").declareVariables(I,T)}

        ${E.mainStart()}
          ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${I.type.indices};
          let output_indices = ${T.offsetToIndices("global_idx")};

          ${N.join(`
`)}
          ${j[0]}       // init ops for reduce max/min
          ${j[1]}
          ${B}
          ${j[3]}
          ${j.length===4?T.setByOffset("global_idx","value"):j.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:c,dataType:o}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:[{type:12,data:k},...Ie(m,c)]})}},Ts=(e,t)=>{let i=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>i.push(Number(r))),Xe({axes:i,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Pt=(e,t,i,r)=>{let n=e.inputs,o=n.length===1?i:Ts(n,i);e.compute(Ki(t,{hint:o.cacheKey,inputDependencies:["rank"]},[n[0]],o.noopWithEmptyAxes&&o.axes.length===0?Po:r,o.axes,n[0].dataType,o.keepDims,o.noopWithEmptyAxes),{inputs:[0]})},qo=(e,t)=>{jt(e.inputs),Pt(e,"ReduceLogSum",t,(i,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${i.getByIndices("input_indices")};`,"value = log(value);"])},Uo=(e,t)=>{jt(e.inputs),Pt(e,"ReduceL1",t,(i,r)=>[`var value = ${r.type.storage}(0);`,"",`value += abs(${i.getByIndices("input_indices")});`,""])},Lo=(e,t)=>{jt(e.inputs),Pt(e,"ReduceL2",t,(i,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${i.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Fo=(e,t)=>{jt(e.inputs),Pt(e,"ReduceLogSumExp",t,(i,r)=>[`var value = ${r.type.storage}(0);`,"",`value += exp(${i.getByIndices("input_indices")});`,"value = log(value);"])},Wo=(e,t)=>{jt(e.inputs),Pt(e,"ReduceMax",t,(i,r,n)=>{let o=[];for(let l=0;l<i.rank;l++)(n.indexOf(l)>=0||n.length===0)&&o.push(i.indicesSet("input_indices",l,0));return[`${o.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};`,`value = max(value, ${i.getByIndices("input_indices")});`,""]})},Vo=(e,t)=>{jt(e.inputs),Pt(e,"ReduceMean",t,(i,r,n)=>{let o=1;for(let l=0;l<i.rank;l++)(n.indexOf(l)>=0||n.length===0)&&(o*=e.inputs[0].dims[l]);return["var sum = f32(0);","",`sum += f32(${i.getByIndices("input_indices")});`,`let value = ${r.type.value}(sum / ${o});`]})},Go=(e,t)=>{jt(e.inputs),Pt(e,"ReduceMin",t,(i,r,n)=>{let o=[];for(let l=0;l<i.rank;l++)(n.indexOf(l)>=0||n.length===0)&&o.push(`input_indices[${l}] = 0;`);return[`${o.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};`,`value = min(value, ${i.getByIndices("input_indices")});`,""]})},Ko=(e,t)=>{jt(e.inputs),Pt(e,"ReduceProd",t,(i,r)=>[`var value = ${r.type.storage}(1);`,"",`value *= ${i.getByIndices("input_indices")};`,""])},Ho=(e,t)=>{jt(e.inputs),Pt(e,"ReduceSum",t,(i,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${i.getByIndices("input_indices")};`,""])},Zo=(e,t)=>{jt(e.inputs),Pt(e,"ReduceSumSquare",t,(i,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${i.getByIndices("input_indices")}; value += t * t;`,""])},qt=(e,t,i)=>{if(t.length===0)return i;let r=1,n=1;for(let o=0;o<t.length;o++)t.indexOf(o)===-1?r*=e[o]:n*=e[o];return n<32&&r>1024},Ap=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Vo(e,t):vp(e,t)},Mp=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Uo(e,t):$p(e,t)},Rp=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Lo(e,t):xp(e,t)},Op=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Fo(e,t):Sp(e,t)},Bp=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Wo(e,t):kp(e,t)},Np=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Go(e,t):Cp(e,t)},Dp=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ko(e,t):Tp(e,t)},jp=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ho(e,t):Ep(e,t)},Pp=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Zo(e,t):Ip(e,t)},qp=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?qo(e,t):zp(e,t)}}),Vn,Up,Lp,Es,Gm=ce(()=>{Ne(),ut(),Ys(),Vn=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Up=(e,t)=>{Vn(e.inputs);let i=(r,n,o)=>{let l=[];for(let h=0;h<r.rank;h++)(o.indexOf(h)>=0||o.length===0)&&l.push(`input_indices[${h}] = 0;`);return[`${l.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Ki("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],i,[t.axis],7,t.keepDims),{inputs:[0]})},Lp=(e,t)=>{Vn(e.inputs);let i=(r,n,o)=>{let l=[];for(let h=0;h<r.rank;h++)(o.indexOf(h)>=0||o.length===0)&&l.push(`input_indices[${h}] = 0;`);return[`${l.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Ki("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],i,[t.axis],7,t.keepDims),{inputs:[0]})},Es=e=>Xe(e)}),Xo,Mi,Yo,Qo,Jo,ui,eu,Fp,Qs=ce(()=>{Ne(),Pe(),Zs(),qe(),Xo=(e,t)=>{let i=e[0],r=e[1],n=e[2],o=e[3],l=e[4],h=e[5];if(l&&h)throw new Error("Attention cannot have both past and attention_bias");if(i.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let c=i.dims[0],m=i.dims[1],y=i.dims[2];if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==y)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let _=n.dims[0]/3,v=_,S=v;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let j of t.qkvHiddenSizes)if(j%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");_=t.qkvHiddenSizes[0],v=t.qkvHiddenSizes[1],S=t.qkvHiddenSizes[2]}let k=m;if(_!==v)throw new Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==_+v+S)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let E=0;if(l){if(v!==S)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(l.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(l.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(l.dims[1]!==c)throw new Error('Input "past" second dimension must be batch_size');if(l.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(l.dims[4]!==v/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(E=l.dims[3])}let N=k+E,I=-1,T=0;if(o)throw new Error("Mask not supported");if(l)throw new Error("past is not supported");if(h){if(h.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(h.dims[0]!==c||h.dims[1]!==t.numHeads||h.dims[2]!==m||h.dims[3]!==N)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:m,pastSequenceLength:E,kvSequenceLength:k,totalSequenceLength:N,maxSequenceLength:I,inputHiddenSize:y,hiddenSize:_,vHiddenSize:S,headSize:Math.floor(_/t.numHeads),vHeadSize:Math.floor(S/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:T,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Mi=(e,t,i)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${i?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Yo=(e,t,i,r,n,o,l,h)=>{let c=ot(l?1:o),m=64,y=o/c;y<m&&(m=32);let _=Math.ceil(o/c/m),v=[{type:12,data:t},{type:12,data:i},{type:12,data:r},{type:12,data:n},{type:12,data:y},{type:12,data:_}],S=gt(e.dataType,c),k=St(1,c),E=["type"];l&&E.push("type"),h&&E.push("type");let N=I=>{let T=Te("x",e.dataType,e.dims,c),j=[T],B=l?ae("seq_lens",l.dataType,l.dims):void 0;B&&j.push(B);let W=h?ae("total_sequence_length_input",h.dataType,h.dims):void 0;W&&j.push(W);let Q=St(e.dataType),X=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${m}>;
  var<workgroup> thread_sum: array<f32, ${m}>;
  ${I.registerUniforms(X).declareVariables(...j)}
  ${I.mainStart([m,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Mi(B,W,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${m}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${l?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${k}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${k}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(c){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${c}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${m}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${k}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${k}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(c){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${c}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${m}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${T.type.value}(${Q}(1.0) / ${Q}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${k}(x[offset + i]);
        x[offset + i] = ${T.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${l?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${T.type.value}(${Q}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${m};${S};${c}`,inputDependencies:E},getShaderSource:N,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:n,z:t*i},programUniforms:v})}},Qo=(e,t,i,r,n,o,l,h,c)=>{let m=l+o.kvSequenceLength,y=[o.batchSize,o.numHeads,o.sequenceLength,m],_=e>1&&r,v=o.kvNumHeads?o.kvNumHeads:o.numHeads,S=_?[o.batchSize,v,m,o.headSize]:void 0,k=o.nReps?o.nReps:1,E=o.scale===0?1/Math.sqrt(o.headSize):o.scale,N=ot(o.headSize),I=o.headSize/N,T=12,j={x:Math.ceil(m/T),y:Math.ceil(o.sequenceLength/T),z:o.batchSize*o.numHeads},B=[{type:12,data:o.sequenceLength},{type:12,data:I},{type:12,data:m},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:1,data:E},{type:12,data:l},{type:12,data:o.kvSequenceLength},{type:12,data:k}],W=_&&r&&te.size(r.dims)>0,Q=["type","type"];W&&Q.push("type"),n&&Q.push("type"),h&&Q.push("type"),c&&Q.push("type");let X=[{dims:y,dataType:t.dataType,gpuDataType:0}];_&&X.push({dims:S,dataType:t.dataType,gpuDataType:0});let ie=fe=>{let _e=ae("q",t.dataType,t.dims,N),xe=ae("key",i.dataType,i.dims,N),ke=[_e,xe];if(W){let le=ae("past_key",r.dataType,r.dims,N);ke.push(le)}n&&ke.push(ae("attention_bias",n.dataType,n.dims));let q=h?ae("seq_lens",h.dataType,h.dims):void 0;q&&ke.push(q);let O=c?ae("total_sequence_length_input",c.dataType,c.dims):void 0;O&&ke.push(O);let Y=Te("output",t.dataType,y),U=[Y];_&&U.push(Te("present_key",t.dataType,S,N));let Z=St(1,N),oe=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${T}u;

  var<workgroup> tileQ: array<${_e.type.storage}, ${T*T}>;
  var<workgroup> tileK: array<${_e.type.storage}, ${T*T}>;
  ${fe.registerUniforms(oe).declareVariables(...ke,...U)}
  ${fe.mainStart([T,T,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${k===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${k===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Mi(q,O,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${W&&_?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${_?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${Z}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${W&&_?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${_?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${Z}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(N){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${N}`)}})()};
        output[outputIdx] = ${Y.type.value} (sum * uniforms.alpha) + ${n?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${N};${n!==void 0};${r!==void 0};${e}`,inputDependencies:Q},getRunData:()=>({outputs:X,dispatchGroup:j,programUniforms:B}),getShaderSource:ie}},Jo=(e,t,i,r,n,o,l=void 0,h=void 0)=>{let c=o+n.kvSequenceLength,m=n.nReps?n.nReps:1,y=n.vHiddenSize*m,_=e>1&&r,v=n.kvNumHeads?n.kvNumHeads:n.numHeads,S=_?[n.batchSize,v,c,n.headSize]:void 0,k=[n.batchSize,n.sequenceLength,y],E=12,N={x:Math.ceil(n.vHeadSize/E),y:Math.ceil(n.sequenceLength/E),z:n.batchSize*n.numHeads},I=[{type:12,data:n.sequenceLength},{type:12,data:c},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:12,data:y},{type:12,data:o},{type:12,data:n.kvSequenceLength},{type:12,data:m}],T=_&&r&&te.size(r.dims)>0,j=["type","type"];T&&j.push("type"),l&&j.push("type"),h&&j.push("type");let B=[{dims:k,dataType:t.dataType,gpuDataType:0}];_&&B.push({dims:S,dataType:t.dataType,gpuDataType:0});let W=Q=>{let X=ae("probs",t.dataType,t.dims),ie=ae("v",i.dataType,i.dims),fe=[X,ie];T&&fe.push(ae("past_value",r.dataType,r.dims));let _e=l?ae("seq_lens",l.dataType,l.dims):void 0;l&&fe.push(_e);let xe=h?ae("total_sequence_length_input",h.dataType,h.dims):void 0;h&&fe.push(xe);let ke=[Te("output",t.dataType,k)];_&&ke.push(Te("present_value",t.dataType,S));let q=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${E}u;
  var<workgroup> tileQ: array<${X.type.value}, ${E*E}>;
  var<workgroup> tileV: array<${X.type.value}, ${E*E}>;
  ${Q.registerUniforms(q).declareVariables(...fe,...ke)}
  ${Q.mainStart([E,E,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${m===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${m===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Mi(_e,xe,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${T&&_?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${_?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${X.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${T&&_?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${_?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:j},getRunData:()=>({outputs:B,dispatchGroup:N,programUniforms:I}),getShaderSource:W}},ui=(e,t,i,r,n,o,l,h,c,m,y=void 0,_=void 0)=>{let v=Math.min(e.outputCount,1+(l?1:0)+(h?1:0)),S=v>1?m.pastSequenceLength:0,k=S+m.kvSequenceLength,E=c&&te.size(c.dims)>0?c:void 0,N=[t,i];v>1&&l&&te.size(l.dims)>0&&N.push(l),E&&N.push(E),y&&N.push(y),_&&N.push(_);let I=e.compute(Qo(v,t,i,l,E,m,S,y,_),{inputs:N,outputs:v>1?[-1,1]:[-1]})[0];e.compute(Yo(I,m.batchSize,m.numHeads,S,m.sequenceLength,k,y,_),{inputs:y&&_?[I,y,_]:[I],outputs:[]});let T=[I,r];v>1&&h&&te.size(h.dims)>0&&T.push(h),y&&T.push(y),_&&T.push(_),e.compute(Jo(v,I,r,h,m,S,y,_),{inputs:T,outputs:v>1?[0,2]:[0]})},eu=(e,t)=>{let i=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,n=t.inputHiddenSize,o=t.headSize,l=12,h={x:Math.ceil(t.headSize/l),y:Math.ceil(t.sequenceLength/l),z:t.batchSize*t.numHeads},c=[e.inputs[0],e.inputs[1],e.inputs[2]],m=[{type:12,data:r},{type:12,data:n},{type:12,data:o},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],y=_=>{let v=Te("output_q",c[0].dataType,i),S=Te("output_k",c[0].dataType,i),k=Te("output_v",c[0].dataType,i),E=ae("input",c[0].dataType,c[0].dims),N=ae("weight",c[1].dataType,c[1].dims),I=ae("bias",c[2].dataType,c[2].dims),T=E.type.storage,j=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${l}u;
  var<workgroup> tileInput: array<${T}, ${l*l}>;
  var<workgroup> tileWeightQ: array<${T}, ${l*l}>;
  var<workgroup> tileWeightK: array<${T}, ${l*l}>;
  var<workgroup> tileWeightV: array<${T}, ${l*l}>;
  ${_.registerUniforms(j).declareVariables(E,N,I,v,S,k)}
  ${_.mainStart([l,l,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${T}(0);
    var valueK = ${T}(0);
    var valueV = ${T}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:i,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:i,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:i,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:h,programUniforms:m}),getShaderSource:y},{inputs:c,outputs:[-1,-1,-1]})},Fp=(e,t)=>{let i=Xo(e.inputs,t),[r,n,o]=eu(e,i);return ui(e,r,n,o,e.inputs[4],void 0,void 0,void 0,e.inputs[5],i)}}),tu,ru,iu,Wp,Km=ce(()=>{Nt(),Ne(),Pe(),ut(),qe(),tu=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let i=(r,n,o)=>{let l=n.length;if(l!==r.length)throw new Error(`${o}: num dimensions != ${l}`);n.forEach((h,c)=>{if(h!==r[c])throw new Error(`${o}: dim[${c}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);i(e[1].dims,r,"Invalid input scale"),i(e[2].dims,r,"Invalid input B"),i(e[3].dims,r,"Invalid input mean"),i(e[4].dims,r,"Invalid input var")}else i(e[1].dims,[1],"Invalid input scale"),i(e[2].dims,[1],"Invalid input B"),i(e[3].dims,[1],"Invalid input mean"),i(e[4].dims,[1],"Invalid input var")},ru=(e,t)=>{let{epsilon:i,spatial:r,format:n}=t,o=e[0].dims,l=r?ot(o[o.length-1]):1,h=n==="NHWC"&&o.length>1?l:1,c=te.size(o)/l,m=r,y=m?o.length:o,_=ae("x",e[0].dataType,e[0].dims,l),v=ae("scale",e[1].dataType,e[1].dims,h),S=ae("bias",e[2].dataType,e[2].dims,h),k=ae("inputMean",e[3].dataType,e[3].dims,h),E=ae("inputVar",e[4].dataType,e[4].dims,h),N=Te("y",e[0].dataType,y,l),I=()=>{let j="";if(r)j=`let cOffset = ${o.length===1?"0u":n==="NHWC"?`outputIndices[${o.length-1}] / ${l}`:"outputIndices[1]"};`;else if(n==="NCHW")j=`
            ${N.indicesSet("outputIndices","0","0")}
            let cOffset = ${N.indicesToOffset("outputIndices")};`;else{j=`var cIndices = ${v.type.indices}(0);
                       cIndices[0] = outputIndices[${o.length-1}];`;for(let B=1;B<v.rank;B++)j+=`cIndices[${B}] = outputIndices[${B}];`;j+=`let cOffset = ${v.indicesToOffset("cIndices")};`}return j},T=j=>`
  const epsilon = ${i};
  ${j.registerUniform("outputSize","u32").declareVariables(_,v,S,k,E,N)}
  ${j.mainStart()}
  ${j.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${N.offsetToIndices(`global_idx * ${l}`)};
    ${I()}
    let scale = ${v.getByOffset("cOffset")};
    let bias = ${S.getByOffset("cOffset")};
    let inputMean = ${k.getByOffset("cOffset")};
    let inputVar = ${E.getByOffset("cOffset")};
    let x = ${_.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${N.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${l}`,inputDependencies:m?["rank","type","type","type","type"]:void 0},getShaderSource:T,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m?[{type:12,data:c},...Ie(o)]:[{type:12,data:c}]})}},iu=e=>Xe(e),Wp=(e,t)=>{let{inputs:i,outputCount:r}=e,n=iu({...t,outputCount:r});if(Je.webgpu.validateInputContent&&tu(i,n),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(ru(i,n))}}),nu,su,Vp,Hm=ce(()=>{Pe(),qe(),nu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},su=e=>{let t=e[0].dims,i=e[0].dims[2],r=te.size(t)/4,n=e[0].dataType,o=ae("input",n,t,4),l=ae("bias",n,[i],4),h=ae("residual",n,t,4),c=Te("output",n,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:m=>`
  const channels = ${i}u / 4;
  ${m.declareVariables(o,l,h,c)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${o.getByOffset("global_idx")}
      + ${l.getByOffset("global_idx % channels")} + ${h.getByOffset("global_idx")};
    ${c.setByOffset("global_idx","value")}
  }`}},Vp=e=>{nu(e.inputs),e.compute(su(e.inputs))}}),au,Ke,Gp,Kp,Hp,Zp,Xp,Yp,Qp,Jp,eh,ou,th,rh,ih,nh,ni,sh,qi,ah,oh,uh,lh,dh,ph,hh,fh,ch,mh,gh,wh,yh,_h,bh,vh,Gn,$h,Is,zs,xh,Sh,kh,uu,lu,Ch,Js=ce(()=>{Ne(),Pe(),ut(),qe(),au=(e,t,i,r,n,o,l)=>{let h=Math.ceil(t/4),c="";typeof n=="string"?c=`${n}(a)`:c=n("a");let m=ae("inputData",i,[h],4),y=Te("outputData",r,[h],4),_=[{name:"vec_size",type:"u32"}];return l&&_.push(...l),`
      ${e.registerUniforms(_).declareVariables(m,y)}

  ${o??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${m.getByOffset("global_idx")};
    ${y.setByOffset("global_idx",c)}
  }`},Ke=(e,t,i,r,n,o=e.dataType,l,h)=>{let c=[{type:12,data:Math.ceil(te.size(e.dims)/4)}];return l&&c.push(...l),{name:t,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:m=>au(m,te.size(e.dims),e.dataType,o,i,r,h),getRunData:m=>({outputs:[{dims:e.dims,dataType:o}],dispatchGroup:{x:Math.ceil(te.size(m[0].dims)/64/4)},programUniforms:c})}},Gp=e=>{e.compute(Ke(e.inputs[0],"Abs","abs"))},Kp=e=>{e.compute(Ke(e.inputs[0],"Acos","acos"))},Hp=e=>{e.compute(Ke(e.inputs[0],"Acosh","acosh"))},Zp=e=>{e.compute(Ke(e.inputs[0],"Asin","asin"))},Xp=e=>{e.compute(Ke(e.inputs[0],"Asinh","asinh"))},Yp=e=>{e.compute(Ke(e.inputs[0],"Atan","atan"))},Qp=e=>{e.compute(Ke(e.inputs[0],"Atanh","atanh"))},Jp=e=>Xe(e),eh=(e,t)=>{let i;switch(t.to){case 10:i="vec4<f16>";break;case 1:i="vec4<f32>";break;case 12:i="vec4<u32>";break;case 6:i="vec4<i32>";break;case 9:i="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(Ke(e.inputs[0],"Cast",i,void 0,t.cacheKey,t.to))},ou=e=>{let t,i,r=e.length>=2&&e[1].data!==0,n=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,i=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,i=n?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return Xe({min:t,max:i})},th=(e,t)=>{let i=t||ou(e.inputs),r=St(e.inputs[0].dataType);e.compute(Ke(e.inputs[0],"Clip",n=>`clamp(${n}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,i.cacheKey,void 0,[{type:e.inputs[0].dataType,data:i.min},{type:e.inputs[0].dataType,data:i.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},rh=e=>{e.compute(Ke(e.inputs[0],"Ceil","ceil"))},ih=e=>{e.compute(Ke(e.inputs[0],"Cos","cos"))},nh=e=>{e.compute(Ke(e.inputs[0],"Cosh","cosh"))},ni=e=>Xe(e),sh=(e,t)=>{let i=St(e.inputs[0].dataType);e.compute(Ke(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
  const elu_alpha_ = ${i}(${t.alpha});

  fn elu_f32(a: ${i}) -> ${i} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${i}>) -> vec4<${i}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},qi=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,ah=e=>{let t=St(e.inputs[0].dataType);e.compute(Ke(e.inputs[0],"Erf",i=>`erf_vf32(${i})`,qi(t)))},oh=e=>{e.compute(Ke(e.inputs[0],"Exp","exp"))},uh=e=>{e.compute(Ke(e.inputs[0],"Floor","floor"))},lh=e=>{let t=St(e.inputs[0].dataType);e.compute(Ke(e.inputs[0],"Gelu",i=>`0.5 * ${i} * (1.0 + erf_vf32(${i} * 0.7071067811865475))`,qi(t)))},dh=(e,t)=>{let i=St(e.inputs[0].dataType);e.compute(Ke(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${i}>(0.0))`,`const leaky_relu_alpha_ = ${i}(${t.alpha});`,t.cacheKey))},ph=e=>{e.compute(Ke(e.inputs[0],"Not",t=>`!${t}`))},hh=e=>{e.compute(Ke(e.inputs[0],"Neg",t=>`-${t}`))},fh=e=>{e.compute(Ke(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},ch=e=>{let t=St(e.inputs[0].dataType);e.compute(Ke(e.inputs[0],"Relu",i=>`select(vec4<${t}>(0.0), ${i}, ${i} > vec4<${t}>(0.0))`))},mh=e=>{e.compute(Ke(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},gh=e=>Xe(e),wh=(e,t)=>{let i=St(e.inputs[0].dataType);e.compute(Ke(e.inputs[0],"HardSigmoid",r=>`max(vec4<${i}>(0.0), min(vec4<${i}>(1.0), ${t.alpha} * ${r} + vec4<${i}>(${t.beta})))`,void 0,t.cacheKey))},yh=e=>{e.compute(Ke(e.inputs[0],"Sin","sin"))},_h=e=>{e.compute(Ke(e.inputs[0],"Sinh","sinh"))},bh=e=>{e.compute(Ke(e.inputs[0],"Sqrt","sqrt"))},vh=e=>{e.compute(Ke(e.inputs[0],"Tan","tan"))},Gn=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,$h=e=>{e.compute(Ke(e.inputs[0],"Tanh",Gn))},Is=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Gn("v")};
}
`,zs=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,xh=e=>{let t=St(e.inputs[0].dataType);e.compute(Ke(e.inputs[0],"FastGelu",zs,Is(t),void 0,e.inputs[0].dataType))},Sh=(e,t)=>{let i=St(e.inputs[0].dataType);return e.compute(Ke(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${i}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${i}>(${t.alpha});`,t.cacheKey)),0},kh=e=>{e.compute(Ke(e.inputs[0],"Log","log"))},uu=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,lu=e=>`quick_gelu_impl(${e})`,Ch=(e,t)=>{let i=St(e.inputs[0].dataType);e.compute(Ke(e.inputs[0],"QuickGelu",lu,uu(i,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),du,pu,Th,Zm=ce(()=>{Pe(),qe(),Js(),du=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},pu=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let i=ae("input",e[0].dataType,e[0].dims,4),r=ae("bias",e[0].dataType,[e[0].dims[2]],4),n=Te("output",e[0].dataType,t,4),o=te.size(t)/4,l=gt(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)}}),getShaderSource:h=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${h.declareVariables(i,r,n)}

  ${qi(l)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes(o)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Th=e=>{du(e.inputs),e.compute(pu(e.inputs))}}),hu,fu,Ut,Eh,Ih,zh,Ah,Mh,Rh,Oh,Bh,Nh,Dh,Xm=ce(()=>{Ne(),Pe(),qe(),hu=(e,t,i,r,n,o,l,h,c,m,y,_)=>{let v,S;typeof h=="string"?v=S=(T,j)=>`${h}((${T}),(${j}))`:typeof h=="function"?v=S=h:(v=h.scalar,S=h.vector);let k=Te("outputData",y,r.length,4),E=ae("aData",c,t.length,4),N=ae("bData",m,i.length,4),I;if(n)if(o){let T=te.size(t)===1,j=te.size(i)===1,B=t.length>0&&t[t.length-1]%4===0,W=i.length>0&&i[i.length-1]%4===0;T||j?I=k.setByOffset("global_idx",S(T?`${E.type.value}(${E.getByOffset("0")}.x)`:E.getByOffset("global_idx"),j?`${N.type.value}(${N.getByOffset("0")}.x)`:N.getByOffset("global_idx"))):I=`
            let outputIndices = ${k.offsetToIndices("global_idx * 4u")};
            let offsetA = ${E.broadcastedIndicesToOffset("outputIndices",k)};
            let offsetB = ${N.broadcastedIndicesToOffset("outputIndices",k)};
            ${k.setByOffset("global_idx",S(l||B?E.getByOffset("offsetA / 4u"):`${E.type.value}(${E.getByOffset("offsetA / 4u")}[offsetA % 4u])`,l||W?N.getByOffset("offsetB / 4u"):`${N.type.value}(${N.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else I=k.setByOffset("global_idx",S(E.getByOffset("global_idx"),N.getByOffset("global_idx")));else{if(!o)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let T=(j,B,W="")=>{let Q=`aData[indexA${B}][componentA${B}]`,X=`bData[indexB${B}][componentB${B}]`;return`
            let outputIndices${B} = ${k.offsetToIndices(`global_idx * 4u + ${B}u`)};
            let offsetA${B} = ${E.broadcastedIndicesToOffset(`outputIndices${B}`,k)};
            let offsetB${B} = ${N.broadcastedIndicesToOffset(`outputIndices${B}`,k)};
            let indexA${B} = offsetA${B} / 4u;
            let indexB${B} = offsetB${B} / 4u;
            let componentA${B} = offsetA${B} % 4u;
            let componentB${B} = offsetB${B} % 4u;
            ${j}[${B}] = ${W}(${v(Q,X)});
          `};y===9?I=`
            var data = vec4<u32>(0);
            ${T("data",0,"u32")}
            ${T("data",1,"u32")}
            ${T("data",2,"u32")}
            ${T("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:I=`
            ${T("outputData[global_idx]",0)}
            ${T("outputData[global_idx]",1)}
            ${T("outputData[global_idx]",2)}
            ${T("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(E,N,k)}

        ${_??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${I}
      }`},fu=(e,t,i,r,n,o,l=i.dataType)=>{let h=i.dims.map(E=>Number(E)??1),c=r.dims.map(E=>Number(E)??1),m=!te.areEqual(h,c),y=h,_=te.size(h),v=!1,S=!1,k=[m];if(m){let E=Rr.calcShape(h,c,!1);if(!E)throw new Error("Can't perform binary op on the given tensors");y=E.slice(),_=te.size(y);let N=te.size(h)===1,I=te.size(c)===1,T=h.length>0&&h[h.length-1]%4===0,j=c.length>0&&c[c.length-1]%4===0;k.push(N),k.push(I),k.push(T),k.push(j);let B=1;for(let W=1;W<y.length;W++){let Q=h[h.length-W],X=c[c.length-W];if(Q===X)B*=Q;else break}B%4===0?(S=!0,v=!0):(N||I||T||j)&&(v=!0)}else v=!0;return k.push(v),{name:e,shaderCache:{hint:t+k.map(E=>E.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:E=>hu(E,h,c,y,v,m,S,n,i.dataType,r.dataType,l,o),getRunData:()=>({outputs:[{dims:y,dataType:l}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(te.size(y)/4)},...Ie(h,c,y)]})}},Ut=(e,t,i,r,n,o)=>{e.compute(fu(t,n??"",e.inputs[0],e.inputs[1],i,r,o))},Eh=e=>{Ut(e,"Add",(t,i)=>`${t}+${i}`)},Ih=e=>{Ut(e,"Div",(t,i)=>`${t}/${i}`)},zh=e=>{Ut(e,"Equal",{scalar:(t,i)=>`u32(${t}==${i})`,vector:(t,i)=>`vec4<u32>(${t}==${i})`},void 0,void 0,9)},Ah=e=>{Ut(e,"Mul",(t,i)=>`${t}*${i}`)},Mh=e=>{let t=ae("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ut(e,"Pow",{scalar:(i,r)=>`pow_custom(${i},${r})`,vector:(i,r)=>`pow_vector_custom(${i},${r})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Rh=e=>{Ut(e,"Sub",(t,i)=>`${t}-${i}`)},Oh=e=>{Ut(e,"Greater",{scalar:(t,i)=>`u32(${t}>${i})`,vector:(t,i)=>`vec4<u32>(${t}>${i})`},void 0,void 0,9)},Bh=e=>{Ut(e,"Less",{scalar:(t,i)=>`u32(${t}<${i})`,vector:(t,i)=>`vec4<u32>(${t}<${i})`},void 0,void 0,9)},Nh=e=>{Ut(e,"GreaterOrEqual",{scalar:(t,i)=>`u32(${t}>=${i})`,vector:(t,i)=>`vec4<u32>(${t}>=${i})`},void 0,void 0,9)},Dh=e=>{Ut(e,"LessOrEqual",{scalar:(t,i)=>`u32(${t}<=${i})`,vector:(t,i)=>`vec4<u32>(${t}<=${i})`},void 0,void 0,9)}}),cu,mu,gu,wu,jh,Ph,Ym=ce(()=>{Ne(),Pe(),ut(),qe(),cu=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let i=0,r=e[i],n=r.dataType,o=r.dims.length;e.forEach((l,h)=>{if(h!==i){if(l.dataType!==n)throw new Error("input tensors should be one type");if(l.dims.length!==o)throw new Error("input tensors should have the same shape");l.dims.forEach((c,m)=>{if(m!==t&&c!==r.dims[m])throw new Error("non concat dimensions must match")})}})},mu=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,gu=(e,t)=>{let i=e.length,r=[];for(let n=0;n<i;++n){let o=t.setByOffset("global_idx",e[n].getByIndices("indices"));i===1?r.push(o):n===0?r.push(`if (inputIndex == ${n}u) { ${o} }`):n===i-1?r.push(`else { ${o} }`):r.push(`else if (inputIndex == ${n}) { ${o} }`)}return r.join(`
`)},wu=(e,t,i,r)=>{let n=te.size(i),o=new Array(e.length),l=new Array(e.length),h=0,c=[],m=[],y=[{type:12,data:n}];for(let E=0;E<e.length;++E)h+=e[E].dims[t],o[E]=h,m.push(e[E].dims.length),l[E]=ae(`input${E}`,r,m[E]),c.push("rank"),y.push({type:12,data:o[E]});for(let E=0;E<e.length;++E)y.push(...Ie(e[E].dims));y.push(...Ie(i));let _=Te("output",r,i.length),v=_.indicesGet("indices",t),S=Array.from(Array(o.length).keys()).map(E=>`uniforms.sizeInConcatAxis${E}`).join(","),k=E=>`

  ${(()=>{E.registerUniform("outputSize","u32");for(let N=0;N<e.length;N++)E.registerUniform(`sizeInConcatAxis${N}`,"u32");return E.declareVariables(...l,_)})()}

  ${mu(o.length,S)}

  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${_.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${v});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${o.length}u>(${S});
      ${v} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${gu(l,_)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:i,dataType:r}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:y}),getShaderSource:k}},jh=(e,t)=>{let i=e.inputs,r=i[0].dims,n=te.normalizeAxis(t.axis,r.length);cu(i,n);let o=r.slice();o[n]=i.reduce((h,c)=>h+(c.dims.length>n?c.dims[n]:0),0);let l=i.filter(h=>te.size(h.dims)>0);e.compute(wu(l,n,o,i[0].dataType),{inputs:l})},Ph=e=>Xe({axis:e.axis})}),$r,xr,Sr,ea,Cr=ce(()=>{Ne(),Pe(),$r=(e,t,i="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${i}(uniforms.clip_min)), ${t}(${i}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${i}(uniforms.alpha) * value + ${i}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${i}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},xr=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Sr=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},ea=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[i,r]=e?.activation_params||[.2,.5];return{activation:t,alpha:i,beta:r}}else if(t==="Clip"){let[i,r]=e?.activation_params||[pp,hp];return{activation:t,clipMax:r,clipMin:i}}else if(t==="LeakyRelu"){let[i]=e?.activation_params||[.01];return{activation:t,alpha:i}}return{activation:t}}}),_t,qh,ta=ce(()=>{_t=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},qh=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Uh,Qm=ce(()=>{Uh=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),ai,ra,ia=ce(()=>{Ne(),Pe(),qe(),Cr(),ai=(e,t,i,r,n)=>{let o=r-i;return`
      ${Array.from({length:i}).map((l,h)=>`
      if (${Ee(t.shape,h,t.rank)} != 1) {
        ${t.indicesSet(e,h,Ee(n,h+o,r))}
      } else {
        ${t.indicesSet(e,h,0)}
      }`).join("")}
`},ra=(e,t,i,r,n=!1,o)=>{let l=e[0].dims,h=e[1].dims,c=l[l.length-2],m=h[h.length-1],y=l[l.length-1],_=ot(m),v=ot(y),S=ot(c),k=te.size(i)/_/S,E=e.length>2,N=r?r.slice(0,-2):i.slice(0,-2),I=[te.size(N),c,m],T=[{type:12,data:k},{type:12,data:c},{type:12,data:m},{type:12,data:y}];xr(t,T),T.push(...Ie(N,l,h)),E&&T.push(...Ie(e[2].dims)),T.push(...Ie(I));let j=B=>{let W=Xs("batch_dims",e[0].dataType,N.length),Q=ae("a",e[0].dataType,l.length,v),X=ae("b",e[1].dataType,h.length,_),ie=Te("output",e[0].dataType,I.length,_),fe=gt(ie.type.tensor),_e=$r(t,ie.type.value,fe),xe=[Q,X],ke="";if(E){let Y=n?_:1;xe.push(ae("bias",e[2].dataType,e[2].dims.length,Y)),ke=`${n?`value += bias[col / ${Y}];`:`value += ${ie.type.value}(bias[row + i]);`}`}let q=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Sr(t,q);let O=()=>{let Y=`var a_data: ${Q.type.value};`;for(let U=0;U<v;U++)Y+=`
              let b_data${U} = b[(b_offset + (k + ${U}) * uniforms.N + col) / ${_}];`;for(let U=0;U<S;U++){Y+=`a_data = a[(a_offset + (row + ${U}) * uniforms.K + k) / ${v}];`;for(let Z=0;Z<v;Z++)Y+=`
            values[${U}] = fma(${X.type.value}(a_data${v===1?"":`[${Z}]`}), b_data${Z}, values[${U}]);
`}return Y};return`
  ${B.registerUniforms(q).registerInternalVariables(W).declareVariables(...xe,ie)}
  ${B.mainStart()}
    ${B.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${_})) * ${_};
    var index1 = global_idx / (uniforms.N / ${_});
    let stride1 = uniforms.M / ${S};
    let row = (index1 % stride1) * ${S};
    let batch = index1 / stride1;

    ${i.length===2?"":`let batch_indices = ${W.offsetToIndices("batch")};`}

    var a_indices: ${Q.type.indices};
    ${ai("a_indices",Q,Q.rank-2,W.rank,"batch_indices")}
    ${Q.indicesSet("a_indices",Q.rank-2,0)}
    ${Q.indicesSet("a_indices",Q.rank-1,0)}
    let a_offset = ${Q.indicesToOffset("a_indices")};

    var b_indices: ${X.type.indices};
    ${ai("b_indices",X,X.rank-2,W.rank,"batch_indices")}
    ${X.indicesSet("b_indices",X.rank-2,0)}
    ${X.indicesSet("b_indices",X.rank-1,0)}
    let b_offset = ${X.indicesToOffset("b_indices")};
    var values: array<${ie.type.value}, ${S}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${v}) {
      ${O()}
    }
    for (var i = 0u; i < ${S}u; i++) {
      var value = values[i];
      ${ke}
      ${_e}
      let cur_indices = ${ie.type.indices}(batch, row + i, col);
      let offset = ${ie.indicesToOffset("cur_indices")};
      ${ie.setByOffset(`offset / ${_}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${_};${v};${S};${n}`,inputDependencies:E?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:o?o(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:T}),getShaderSource:j}}}),yu,_u,As,Kn,bu,Ms,vu,Hi,na=ce(()=>{Ne(),Pe(),qe(),Cr(),ia(),ta(),yu=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,_u=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,As=(e,t,i="f32",r,n=!1,o=32,l=!1,h=32)=>{let c=t[1]*e[1],m=t[0]*e[0],y=n?c:o,_=n?o:c,v=y/t[0],S=o/t[1];if(!((n&&v===4&&e[1]===4||!n&&(v===3||v===4))&&y%t[0]===0&&o%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${n} is true, innerElementSize ${v} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${v} must be 3 or 4.
  tileAWidth ${y} must be divisible by workgroupSize[0]${t[0]}. tileInner ${o} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${v}<${i}>, ${y/v}>, ${_}>;
var<workgroup> mm_Bsub: array<array<vec4<${i}>, ${m/e[0]}>, ${o}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${v};
const tileInner = ${o};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${l?"0":"i32(globalId.z)"};
  ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${c};

  let num_tiles = ${l?`${Math.ceil(h/o)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${l?`i32(globalId.z) * ${h}`:"0"};

  var acc: array<vec4<${i}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${S};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${yu(n,r)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${S}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${v===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${_u(n,v)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Kn=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,bu=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Ms=(e,t,i="f32",r,n=!1,o=32,l=!1,h=32,c=!1)=>{let m=e[1]*t[1],y=e[0]*t[0],_=n?m:o,v=n?o:m;if(!(v%t[1]===0&&_%t[0]===0&&o%t[1]===0))throw new Error(`tileAHight ${v} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${_} must be divisible by workgroupSize[0]${t[0]}, tileInner ${o} must be divisible by workgroupSize[1]${t[1]}`);let S=v/t[1],k=_/t[0],E=o/t[1],N=c?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${m};
    let globalColStart = i32(workgroupId.x) * ${y};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${v}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${_}; inputCol = inputCol + ${t[0]}) {
          ${Kn(n,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${o}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${y}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${i}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${n?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${m};

let tileRowA = i32(localId.y) * ${S};
let tileColA = i32(localId.x) * ${k};
let tileRowB = i32(localId.y) * ${E};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${S}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${k}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Kn(n,r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${E}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${i}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${bu(n)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${i}, ${_}>, ${v}>;
  var<workgroup> mm_Bsub : array<array<${i}, ${y}>, ${o}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${o};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${l?"0":"i32(globalId.z)"};
    ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${l?`${Math.ceil(h/o)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${l?`i32(globalId.z) * ${h}`:"0"};

    var acc : array<array<${i}, colPerThread>, rowPerThread>;
    ${N}
  }
`},vu=(e,t,i,r,n=!1)=>{let[o,l,h,c]=r,m=gt(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${o.type.indices}) -> ${_t(e,m)} {
      var value = ${_t(e,m)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${l.type.indices};
        ${ai("aIndices",l,l.rank-2,o.rank,"batchIndices")}
        ${l.indicesSet("aIndices",l.rank-2,"u32(row)")}
        ${l.indicesSet("aIndices",l.rank-1,"u32(colIn)")}
        value = ${l.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${o.type.indices}) -> ${_t(e,m)} {
      var value = ${_t(e,m)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${h.type.indices};
        ${ai("bIndices",h,h.rank-2,o.rank,"batchIndices")}
        ${h.indicesSet("bIndices",h.rank-2,"u32(row)")}
        ${h.indicesSet("bIndices",h.rank-1,"u32(colIn)")}
        value = ${h.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${_t(e,m)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${n?"bias[colIn]":`${_t(e,m)}(bias[row])`};`:""}
        ${i}
        ${c.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Hi=(e,t,i,r,n=!1,o)=>{let l=e[0].dims,h=e[1].dims,c=l.slice(0,-2),m=h.slice(0,-2),y=r?r.slice(0,-2):i.slice(0,-2),_=te.size(y),v=l[l.length-2],S=l[l.length-1],k=h[h.length-1],E=S%4===0&&k%4===0,N=v<=8?[4,1,1]:[4,4,1],I=[8,8,1],T=[Math.ceil(k/I[0]/N[0]),Math.ceil(v/I[1]/N[1]),Math.ceil(_/I[2]/N[2])],j=E?4:1,B=[...c,v,S/j],W=B.length,Q=[...m,S,k/j],X=Q.length,ie=[_,v,k/j],fe=[{type:6,data:v},{type:6,data:k},{type:6,data:S}];xr(t,fe),fe.push(...Ie(y,B,Q));let _e=["rank","rank"],xe=e.length>2;xe&&(fe.push(...Ie(e[2].dims)),_e.push("rank")),fe.push(...Ie(ie));let ke=q=>{let O=y.length,Y=Xs("batchDims",e[0].dataType,O,1),U=gt(e[0].dataType),Z=ae("a",e[0].dataType,W,j),oe=ae("b",e[1].dataType,X,j),le=Te("result",e[0].dataType,ie.length,j),Se=[Z,oe];if(xe){let P=n?j:1;Se.push(ae("bias",e[2].dataType,e[2].dims.length,P))}let J=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Sr(t,J);let K=gt(le.type.tensor),me=$r(t,le.type.value,K),De=vu(j,xe,me,[Y,Z,oe,le],n);return`
  ${q.registerUniforms(J).registerInternalVariables(Y).declareVariables(...Se,le)}
  ${De}
  ${E?As(N,I,U,Y):Ms(N,I,U,Y)}
                   `};return{name:"MatMul",shaderCache:{hint:`${N};${t.activation};${E};${n}`,inputDependencies:_e},getRunData:()=>({outputs:[{dims:o?o(i):i,dataType:e[0].dataType}],dispatchGroup:{x:T[0],y:T[1],z:T[2]},programUniforms:fe}),getShaderSource:ke}}}),$u,Lh,Jm=ce(()=>{Ne(),er(),qe(),Cr(),ta(),Qm(),na(),$u=(e,t,i,r,n=!1,o,l=4,h=4,c=4,m="f32")=>{let y=fe=>{switch(fe){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${m}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${fe} is not supported.`)}},_=fe=>{switch(fe){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${fe} is not supported.`)}},v=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,S=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,k=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",E=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",N=e?"row":"col",I=e?"col":"row",T=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${N} / outWidth;
    let outCol = ${N} % outWidth;

    let WRow = ${I} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${I} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${I} % inChannels;
    var resData = ${_t(l,m)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${k} && xCol >= 0 && xCol < ${E}) {
      ${v}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${y(l)}
    }
    return resData;`,j=e?t&&r?`
    let col = colIn * ${l};
    ${T}`:`
    let col = colIn * ${l};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${T}
    }
    return ${_t(l,m)}(0.0);`:r&&i?`
    let col = colIn * ${l};
    ${T}`:`
    let col = colIn * ${l};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${T}
    }
    return ${_t(l,m)}(0.0);`,B=e?r&&i?_(h):`
    let col = colIn * ${h};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${_(h)}
    }
    return ${_t(h,m)}(0.0);`:`
    let col = colIn * ${h};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${_(h)}
    }
    return ${_t(h,m)}(0.0);`,W=_t(c,m),Q=_t(e?l:h,m),X=_t(e?h:l,m),ie=$r(o,W,m);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${Q} {
      ${e?j:B}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${X} {
      ${e?B:j}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${W}) {
      let col = colIn * ${c};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${S}
      ${qh(n)}
      ${ie}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Lh=(e,t,i,r,n,o,l,h,c)=>{let m=t.format==="NHWC",y=m?e[0].dims[3]:e[0].dims[1],_=i[0],v=m?i[2]:i[3],S=m?i[1]:i[2],k=m?i[3]:i[1],E=m&&(y%4===0||y%3===0)&&k%4===0,N=m?k:v*S,I=m?v*S:k,T=[8,8,1],j=r<=8?[4,1,1]:[4,4,1],B=[Math.ceil(N/T[0]/j[0]),Math.ceil(I/T[1]/j[1]),Math.ceil(_/T[2]/j[2])];Ge("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${B}`);let W=E?m&&y%4!==0?3:4:1,Q=T[1]*j[1],X=T[0]*j[0],ie=Math.max(T[0]*W,T[1]),fe=r%Q===0,_e=n%X===0,xe=o%ie===0,ke=E?[W,4,4]:[1,1,1],q=[{type:6,data:r},{type:6,data:n},{type:6,data:o},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];xr(t,q),q.push(...Ie(e[0].dims,e[1].dims));let O=["rank","rank"];l&&(q.push(...Ie(e[2].dims)),O.push("rank")),q.push(...Ie(i));let Y=U=>{let Z=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Sr(t,Z);let oe=E?4:1,le=gt(e[0].dataType),Se=`
      fn setOutputAtIndex(flatIndex : i32, value : ${E?`vec4<${le}>`:le}) {
        result[flatIndex] = ${E?`vec4<${le}>`:le}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${E?`vec4<${le}>`:le}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${E?"/ 4":""}, value);
      }`,J=ae("x",e[0].dataType,e[0].dims.length,W===3?1:W),K=ae("w",e[1].dataType,e[1].dims.length,oe),me=[J,K],De=Te("result",e[0].dataType,i.length,oe);if(l){let P=ae("bias",e[2].dataType,e[2].dims.length,oe);me.push(P),Se+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${E?`vec4<${le}>`:le} {
          return bias[coords.${m?"w":"y"}${E?"/ 4":""}];
        }`}return`
        ${Uh("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${U.registerUniforms(Z).declareVariables(...me,De)}
        ${Se}
        ${$u(m,fe,_e,xe,l,t,ke[0],ke[1],ke[2],le)}
        ${E?As(j,T,le,void 0,!m,ie):Ms(j,T,le,void 0,!m,ie,!1,void 0,h)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${W};${E};${fe};${_e};${xe};${Q};${X};${ie}`,inputDependencies:O},getRunData:()=>({outputs:[{dims:c?c(i):i,dataType:e[0].dataType}],dispatchGroup:{x:B[0],y:B[1],z:B[2]},programUniforms:q}),getShaderSource:Y}}}),xu,Hn,Xr,Su,Zn,ku,Fh,Wh,eg=ce(()=>{Ne(),er(),Pe(),qe(),Cr(),ta(),xu=e=>{let t=1;for(let i=0;i<e.length;i++)t*=e[i];return t},Hn=e=>typeof e=="number"?[e,e,e]:e,Xr=(e,t)=>t<=1?e:e+(e-1)*(t-1),Su=(e,t,i,r=1)=>{let n=Xr(t,r);return Math.floor((e[0]*(i-1)-i+n)/2)},Zn=(e,t,i,r,n)=>{n==null&&(n=Su(e,t[0],r[0]));let o=[0,0,0,i];for(let l=0;l<3;l++)e[l]+2*n>=t[l]&&(o[l]=Math.trunc((e[l]-t[l]+2*n)/r[l]+1));return o},ku=(e,t,i,r,n,o,l,h,c,m)=>{let y,_,v,S;if(e==="VALID"&&(e=0),typeof e=="number"){y={top:e,bottom:e,left:e,right:e,front:e,back:e};let k=Zn([t,i,r,1],[h,c,m],1,[n,o,l],e);_=k[0],v=k[1],S=k[2]}else if(Array.isArray(e)){if(!e.every((E,N,I)=>E===I[0]))throw Error(`Unsupported padding parameter: ${e}`);y={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let k=Zn([t,i,r,1],[h,c,m],1,[n,o,l],e[0]);_=k[0],v=k[1],S=k[2]}else if(e==="SAME_UPPER"){_=Math.ceil(t/n),v=Math.ceil(i/o),S=Math.ceil(r/l);let k=(_-1)*n+h-t,E=(v-1)*o+c-i,N=(S-1)*l+m-r,I=Math.floor(k/2),T=k-I,j=Math.floor(E/2),B=E-j,W=Math.floor(N/2),Q=N-W;y={top:j,bottom:B,left:W,right:Q,front:I,back:T}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:y,outDepth:_,outHeight:v,outWidth:S}},Fh=(e,t,i,r,n,o=!1,l="channelsLast")=>{let h,c,m,y,_;if(l==="channelsLast")[h,c,m,y,_]=e;else if(l==="channelsFirst")[h,_,c,m,y]=e;else throw new Error(`Unknown dataFormat ${l}`);let[v,,S,k,E]=t,[N,I,T]=Hn(i),[j,B,W]=Hn(r),Q=Xr(S,j),X=Xr(k,B),ie=Xr(E,W),{padInfo:fe,outDepth:_e,outHeight:xe,outWidth:ke}=ku(n,c,m,y,N,I,T,Q,X,ie),q=o?v*_:v,O=[0,0,0,0,0];return l==="channelsFirst"?O=[h,q,_e,xe,ke]:l==="channelsLast"&&(O=[h,_e,xe,ke,q]),{batchSize:h,dataFormat:l,inDepth:c,inHeight:m,inWidth:y,inChannels:_,outDepth:_e,outHeight:xe,outWidth:ke,outChannels:q,padInfo:fe,strideDepth:N,strideHeight:I,strideWidth:T,filterDepth:S,filterHeight:k,filterWidth:E,effectiveFilterDepth:Q,effectiveFilterHeight:X,effectiveFilterWidth:ie,dilationDepth:j,dilationHeight:B,dilationWidth:W,inShape:e,outShape:O,filterShape:t}},Wh=(e,t,i,r,n,o)=>{let l=o==="channelsLast";l?e[0].dims[3]:e[0].dims[1];let h=[64,1,1],c={x:i.map((N,I)=>I)},m=[Math.ceil(xu(c.x.map(N=>i[N]))/h[0]),1,1];Ge("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${m}`);let y=1,_=te.size(i),v=[{type:12,data:_},{type:12,data:r},{type:12,data:n},{type:12,data:t.strides},{type:12,data:t.dilations}];xr(t,v),v.push(...Ie(e[0].dims,e[1].dims));let S=["rank","rank"],k=e.length===3;k&&(v.push(...Ie(e[2].dims)),S.push("rank")),v.push(...Ie(i));let E=N=>{let I=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Sr(t,I);let T=1,j=gt(e[0].dataType),B=ae("x",e[0].dataType,e[0].dims.length,y),W=ae("W",e[1].dataType,e[1].dims.length,T),Q=[B,W],X=Te("result",e[0].dataType,i.length,T),ie="";if(k){let xe=ae("bias",e[2].dataType,e[2].dims.length,T);Q.push(xe),ie+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${j} {
          return bias[${l?Ee("coords",4,5):Ee("coords",1,5)}];
        }`}let fe=_t(y,j),_e=$r(t,fe,j);return`
            ${ie}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${B.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${W.getByIndices("aIndices")};
            }
          ${N.registerUniforms(I).declareVariables(...Q,X)}
          ${N.mainStart()}
          ${N.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${X.offsetToIndices("global_idx")};
              let batch = ${Ee("coords",0,B.rank)};
              let d2 = ${l?Ee("coords",B.rank-1,B.rank):Ee("coords",1,B.rank)};
              let xFRCCorner = vec3<u32>(${l?Ee("coords",1,B.rank):Ee("coords",2,B.rank)},
              ${l?Ee("coords",2,B.rank):Ee("coords",3,B.rank)},
              ${l?Ee("coords",3,B.rank):Ee("coords",4,B.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${l?Ee("uniforms.x_shape",1,B.rank):Ee("uniforms.x_shape",2,B.rank)};
              let xShapeZ = ${l?Ee("uniforms.x_shape",2,B.rank):Ee("uniforms.x_shape",3,B.rank)};
              let xShapeW = ${l?Ee("uniforms.x_shape",3,B.rank):Ee("uniforms.x_shape",4,B.rank)};
              let xShapeU = ${l?Ee("uniforms.x_shape",4,B.rank):Ee("uniforms.x_shape",1,B.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${l?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${l?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${l?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${l?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${k?"value = value + getBiasByOutputCoords(coords)":""};
              ${_e}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${l};${y};${k}`,inputDependencies:S},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:m[0],y:m[1],z:m[2]},programUniforms:v}),getShaderSource:E}}}),Vh,Gh,tg=ce(()=>{Ne(),Pe(),qe(),Cr(),Vh=(e,t,i,r)=>{let n=e.length>2,o=n?"value += b[output_channel];":"",l=e[0].dims,h=e[1].dims,c=t.format==="NHWC",m=c?i[3]:i[1],y=m/t.group,_=c&&y>=4?ot(m):1,v=te.size(i)/_,S=[{type:12,data:v},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:y}];xr(t,S),S.push(...Ie(l,[h[0],h[1],h[2],h[3]/_]));let k=n?["rank","rank","rank"]:["rank","rank"];S.push(...Ie([i[0],i[1],i[2],i[3]/_]));let E=N=>{let I=Te("output",e[0].dataType,i.length,_),T=gt(I.type.tensor),j=$r(t,I.type.value,T),B=ae("x",e[0].dataType,l.length),W=ae("w",e[1].dataType,h.length,_),Q=[B,W];n&&Q.push(ae("b",e[2].dataType,e[2].dims,_));let X=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Sr(t,X);let ie=c?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${B.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${W.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${B.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${W.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${N.registerUniforms(X).declareVariables(...Q,I)}

  ${N.mainStart()}
    ${N.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${I.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${c?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${c?1:2}], outputIndices[${c?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${_} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${c?2:1}];

    var value: ${I.type.value} = ${I.type.value}(0);
    ${ie}
    ${o}
    ${j}
    ${I.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${_}`,inputDependencies:k},getRunData:()=>({outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:S}),getShaderSource:E}},Gh=(e,t,i,r)=>{let n=e.length>2,o=ot(i[3]),l=ot(i[2]),h=te.size(i)/o/l,c=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/o],m=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/o],y=[i[0],i[1],i[2],i[3]/o],_=[{type:12,data:h},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];xr(t,_),_.push(...Ie(c,m,y));let v=(l-1)*t.strides[1]+m[1],S=k=>{let E=Te("output",e[0].dataType,y.length,o),N=gt(E.type.tensor),I=$r(t,E.type.value,N),T=ae("x",e[0].dataType,c.length,o),j=ae("w",e[1].dataType,m.length,o),B=[T,j];n&&B.push(ae("b",e[2].dataType,e[2].dims,o));let W=n?"value += b[output_channel];":"",Q=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Sr(t,Q),`
  ${k.registerUniforms(Q).declareVariables(...B,E)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${l}u;
    let col = (index1 % width1) * ${l}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${T.type.value}, ${v}>;
    var values: array<${E.type.value}, ${l}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${m[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${v}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${T.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${T.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${m[1]}; w_width++) {
          let w_val = ${j.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${l}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${l}u; i++) {
      var value = values[i];
      ${W}
      ${I}
      ${E.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${o};${l};${v};${m[0]};${m[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:_}),getShaderSource:S}}}),Cu,Ri,Tu,Oi,Rs,Xn,Eu,Iu,Os,rg=ce(()=>{Pe(),Jm(),eg(),na(),tg(),Cr(),ia(),ar(),Cu=(e,t,i,r,n,o)=>{let l=e[0],h=e.slice(o?1:2,o?3:4),c=h.length,m=t[0],y=t.slice(2).map((v,S)=>v+(v-1)*(i[S]-1)),_=h.map((v,S)=>v+r[S]+r[S+c]).map((v,S)=>Math.floor((v-y[S]+n[S])/n[S]));return _.splice(0,0,l),_.splice(o?3:1,0,m),_},Ri=[2,3,1,0],Tu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let i=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(i!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Oi=(e,t)=>{let i=e.kernelShape.slice();i.length<t[1].dims.length-2&&i.push(...Array(t[1].dims.length-2-i.length).fill(0));for(let o=2;o<t[1].dims.length;++o)i[o-2]===0&&(i[o-2]=t[1].dims[o]);let r=e.pads.slice();Gi.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,i,r,e.format==="NHWC",e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:i,pads:r}),n},Rs=e=>{let t=ea(e),i=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],n=e.dilations,o=e.group,l=e.kernel_shape,h=e.pads,c=e.strides,m=e.w_is_const();return{autoPad:r,format:i,dilations:n,group:o,kernelShape:l,pads:h,strides:c,wIsConst:m,...t,cacheKey:`${e.format};${t.activation};`}},Xn=(e,t,i,r)=>{let n=i.format==="NHWC",o=Cu(t[0].dims,t[1].dims,i.dilations,i.pads,i.strides,n);if(i.group!==1){let Q=[t[0]];if(n){let X=e.kernelCustomData.wT??e.compute(Mt(t[1],Ri),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=X),Q.push(X)}else Q.push(t[1]);t.length===3&&Q.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&n&&t[1].dims[0]===i.group&&t[1].dims[1]===1&&i.dilations[0]===1&&i.dilations[1]===1?e.compute(Gh(Q,i,o,r),{inputs:Q}):e.compute(Vh(Q,i,o,r),{inputs:Q});return}let l=t.length===3,h=t[0].dims[n?1:2],c=t[0].dims[n?2:3],m=t[0].dims[n?3:1],y=t[1].dims[2],_=t[1].dims[3],v=o[n?1:2],S=o[n?2:3],k=o[n?3:1],E=n&&y===h&&_===c&&i.pads[0]===0&&i.pads[1]===0;if(E||y===1&&_===1&&i.dilations[0]===1&&i.dilations[1]===1&&i.strides[0]===1&&i.strides[1]===1&&i.pads[0]===0&&i.pads[1]===0){let Q=o[0],X,ie,fe,_e=[];if(n){let q=e.kernelCustomData.wT??e.compute(Mt(t[1],Ri),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];if(i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=q),E){let O=h*c*m;X=t[0].reshape([1,Q,O]),ie=q.reshape([1,O,k]),fe=[1,Q,k]}else X=t[0].reshape([Q,h*c,m]),ie=q.reshape([1,m,k]),fe=[Q,v*S,k];_e.push(X),_e.push(ie)}else X=t[0].reshape([Q,m,h*c]),ie=t[1].reshape([1,k,m]),fe=[Q,k,v*S],_e.push(ie),_e.push(X);l&&_e.push(t[2]);let xe=fe[2],ke=_e[0].dims[_e[0].dims.length-1];xe<8&&ke<8?e.compute(ra(_e,i,o,fe,n,r),{inputs:_e}):e.compute(Hi(_e,i,o,fe,n,r),{inputs:_e});return}let N=!0,I=e.kernelCustomData.wT??e.compute(Mt(t[1],Ri),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=I);let T=[t[0],I];l&&T.push(t[2]);let j=n?v*S:k,B=n?k:v*S,W=y*_*m;e.compute(Lh(T,i,o,j,B,W,l,N,r),{inputs:T})},Eu=(e,t)=>{let i=t.format==="NHWC",r=[e.inputs[0].reshape(i?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let n=[0,t.pads[0],0,t.pads[1]],o=[1].concat(t.strides),l=[1].concat(t.dilations),h=[1].concat(t.kernelShape),c=Oi({...t,pads:n,strides:o,dilations:l,kernelShape:h},r);Xn(e,r,c,m=>i?[m[0],m[2],m[3]]:[m[0],m[1],m[3]])},Iu=(e,t,i)=>{let r=i.format==="NHWC"?"channelsLast":"channelsFirst",n=Oi(i,t),o=i.autoPad==="NOTSET"?i.pads:i.autoPad,l=Fh(t[0].dims,t[1].dims,i.strides,i.dilations,o,!1,r);e.compute(Wh(t,n,l.outShape,[l.filterDepth,l.filterHeight,l.filterWidth],[l.padInfo.front,l.padInfo.top,l.padInfo.left],r))},Os=(e,t)=>{if(Tu(e.inputs,t),e.inputs[0].dims.length===3)Eu(e,t);else if(e.inputs[0].dims.length===5)Iu(e,e.inputs,t);else{let i=Oi(t,e.inputs);Xn(e,e.inputs,i)}}}),Kh,ig=ce(()=>{Ne(),er(),Pe(),qe(),Kh=(e,t,i)=>{let r=e.length>2,n=t.outputShape,o=t.format==="NHWC",l=t.group,h=e[1].dims,c=h[2]/l,m=h[3],y=o?ot(c):1,_=o&&m===1&&c>=4,v=_?Math.floor(c/4)*4:Math.floor(c/y)*y,S=c-v,k=o?ot(m):1,E=o?m===1?y:k:1,N=te.size(n)/k,I=[Math.ceil(N/64),1,1];Ge("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${I}`);let T=["rank","rank"],j=[t.strides[0],t.strides[1]],B=[t.kernelShape[o?1:2],t.kernelShape[o?2:3]],W=[t.dilations[0],t.dilations[1]],Q=[B[0]+(t.dilations[0]<=1?0:(t.kernelShape[o?1:2]-1)*(t.dilations[0]-1)),B[1]+(t.dilations[1]<=1?0:(t.kernelShape[o?2:3]-1)*(t.dilations[1]-1))],X=[Q[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),Q[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],ie=[{type:12,data:N},{type:12,data:j},{type:12,data:B},{type:12,data:W},{type:12,data:Q},{type:6,data:X},{type:12,data:v},{type:12,data:c},{type:12,data:m},...Ie(e[0].dims,e[1].dims)];r&&(ie.push(...Ie(e[2].dims)),T.push("rank")),ie.push(...Ie(n));let fe=_e=>{let xe=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:j.length},{name:"filter_dims",type:"u32",length:B.length},{name:"dilations",type:"u32",length:B.length},{name:"effective_filter_dims",type:"u32",length:Q.length},{name:"pads",type:"i32",length:X.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],ke=gt(e[0].dataType),q=o?1:2,O=o?2:3,Y=o?3:1,U=ae("W",e[1].dataType,e[1].dims.length,E),Z=ae("Dy",e[0].dataType,e[0].dims.length,y),oe=[Z,U];r&&oe.push(ae("bias",e[2].dataType,[n[Y]].length,k));let le=Te("result",e[0].dataType,n.length,k),Se=()=>{let me="";if(_)y===4?me+=`
        let xValue = ${Z.getByOffset("x_offset")};
        let wValue = ${U.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:y===2?me+=`
          dotProd = dotProd + dot(vec4<${ke}>(${Z.getByOffset("x_offset")}, ${Z.getByOffset("x_offset + 1u")}), vec4<${ke}>(${U.getByOffset("w_offset")}, ${U.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:y===1&&(me+=`
          dotProd = dotProd + dot(vec4<${ke}>(${Z.getByOffset("x_offset")}, ${Z.getByOffset("x_offset + 1u")}, ${Z.getByOffset("x_offset + 2u")}, ${Z.getByOffset("x_offset + 3u")}), vec4<${ke}>(${U.getByOffset("w_offset")}, ${U.getByOffset("w_offset + 1u")}, ${U.getByOffset("w_offset + 2u")}, ${U.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(me+=`
                  let xValue = ${o?Z.getByOffset(`${Z.indicesToOffset(`${Z.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${y}`):Z.get("batch","inputChannel","idyR","idyC")};
        `,y===1)me+=`
          let w_offset = ${U.indicesToOffset(`${U.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${U.getByOffset(`w_offset / ${E}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let De=0;De<y;De++)me+=`
            let wValue${De} = ${U.getByOffset(`${U.indicesToOffset(`${U.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${De}, wOutChannel)`)} / ${E}`)};
            dotProd = dotProd + xValue[${De}] * wValue${De};`;return me},J=()=>{if(S===0)return"";if(!_)throw new Error(`packInputAs4 ${_} is not true.`);let me="";if(y===1){me+="dotProd = dotProd";for(let De=0;De<S;De++)me+=`
            + ${Z.getByOffset(`x_offset + ${De}`)} * ${U.getByOffset(`w_offset + ${De}`)}`;me+=";"}else if(y===2){if(S!==2)throw new Error(`Invalid inputChannelsRemainder ${S}.`);me+=`
          let xValue = ${Z.getByOffset("x_offset")};
          let wValue = ${U.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return me},K=`
            let outputIndices = ${le.offsetToIndices(`global_idx * ${k}`)};
            let batch = ${le.indicesGet("outputIndices",0)};
            let d1 = ${le.indicesGet("outputIndices",Y)};
            let r = ${le.indicesGet("outputIndices",q)};
            let c = ${le.indicesGet("outputIndices",O)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${le.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${ke}(dyRCorner) + ${ke}(wR)) / ${ke}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${ke}(uniforms.Dy_shape[${q}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${ke}(dyCCorner) + ${ke}(wC)) / ${ke}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${ke}(uniforms.Dy_shape[${O}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${_?`
                var x_offset = ${Z.indicesToOffset(`${Z.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${y};
                var w_offset = ${U.indicesToOffset(`${U.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${E};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${_?4:y}) {
                  ${Se()}
                  inputChannel = inputChannel + ${_?4:y};
                }
                ${J()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${k}]`:""};
            ${le.setByOffset("global_idx","value")};
          `;return`
    ${_e.registerUniforms(xe).declareVariables(...oe,le)}
      ${_e.mainStart()}
      ${_e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${K}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${y}${E}${k}${_}${S}`,inputDependencies:T},getRunData:()=>({dispatchGroup:{x:I[0],y:I[1],z:I[2]},outputs:[{dims:i?i(n):n,dataType:e[0].dataType}],programUniforms:ie}),getShaderSource:fe}}}),zu,Au,Mu,Yn,Hh,Ru,Qn,Ou,Zh,ng=ce(()=>{ig(),Cr(),ar(),zu=(e,t,i,r,n,o)=>(e-1)*t+i+(r-1)*n+1-o,Au=(e,t,i,r,n)=>{let o=Math.floor(e/2);t==="SAME_UPPER"?(i[r]=o,i[n]=e-o):t==="SAME_LOWER"&&(i[r]=e-o,i[n]=o)},Mu=(e,t,i,r,n,o,l,h,c,m)=>{let y=e.length-2,_=m.length===0;c.length<y&&c.push(...Array(y-c.length).fill(0));let v=e[0],S=t[h?3:1]*n;for(let k=0,E=e.length-y-(h?1:0);k<y;++k,++E){let N=e[E],I=_?N*l[k]:m[k],T=zu(N,l[k],o[k],t[E],i[k],I);Au(T,r,o,k,k+y),_&&m.push(l[k]*(N-1)+c[k]+(t[E]-1)*i[k]+1-o[k]-o[k+y])}m.splice(0,0,v),m.splice(h?3:1,0,S)},Yn=(e,t)=>{let i=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((_,v)=>_*v,1)===0){i.length=0;for(let _=2;_<t[1].dims.length;++_)i.push(t[1].dims[_])}let r=e.format==="NHWC";i.splice(0,0,t[1].dims[0]),i.splice(r?3:1,0,t[1].dims[1]);let n=e.pads.slice(),o=e.outputShape.slice(),l=e.outputPadding.slice(),h=t[0].dims,c=e.dilations.slice();if(c.reduce((_,v)=>_+v,0)===0){let _=t[0].dims.length-2;c=new Array(_).fill(1)}let m=e.strides.slice();if(m.reduce((_,v)=>_+v,0)===0){let _=t[0].dims.length-2;m=new Array(_).fill(1)}Mu(h,i,c,e.autoPad,e.group,n,m,r,l,o);let y=Object.assign({},e);return Object.assign(y,{kernelShape:i,pads:n,outputPadding:l,outputShape:o,dilations:c,strides:m}),y},Hh=e=>{let t=ea(e),i=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,o=e.group,l=e.kernelShape,h=e.pads,c=e.strides,m=e.wIsConst(),y=e.outputPadding,_=e.outputShape;return{autoPad:r,format:i,dilations:n,group:o,kernelShape:l,outputPadding:y,outputShape:_,pads:h,strides:c,wIsConst:m,...t,cacheKey:`${e.format};${t.activation};`}},Ru=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let i=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(i!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.reduce((l,h)=>l+h,0)>0&&t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.reduce((l,h)=>l+h,0)>0&&t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.reduce((l,h)=>l+h,0)>0&&t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.outputPadding.length!==o&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${o}D`);if(t.kernelShape.reduce((l,h)=>l+h,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Qn=(e,t,i,r)=>{let n=e.kernelCustomData.wT??e.compute(Mt(t[1],[2,3,0,1]),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n);let o=[t[0],n];t.length===3&&o.push(t[2]),e.compute(Kh(o,i,r),{inputs:o})},Ou=(e,t)=>{let i=t.format==="NHWC",r=[e.inputs[0].reshape(i?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let n=t.kernelShape;(n.length===0||n[0]===0)&&(n=[e.inputs[1].dims[2]]);let o=t.dilations;(o.length===0||o[0]===0)&&(o=[1]);let l=t.strides;(l.length===0||l[0]===0)&&(l=[1]);let h=t.pads;h.length===0&&(h=[0,0]),h=[0,h[0],0,h[1]],l=[1].concat(l),o=[1].concat(o),n=[1].concat(n);let c=t.outputPadding;c=[0].concat(c);let m=Yn({...t,pads:h,strides:l,dilations:o,kernelShape:n,outputPadding:c},r);Qn(e,r,m,y=>i?[y[0],y[2],y[3]]:[y[0],y[1],y[3]])},Zh=(e,t)=>{if(Ru(e.inputs,t),e.inputs[0].dims.length===3)Ou(e,t);else{let i=Yn(t,e.inputs);Qn(e,e.inputs,i)}}}),Bu,Xh,Yh,sg=ce(()=>{Ne(),Pe(),ut(),qe(),Bu=(e,t,i,r)=>{let n=te.size(t),o=t.length,l=ae("input",e,o),h=Te("output",e,o),c=i.dataType===6?i.getInt32Array()[0]:Number(i.getBigInt64Array()[0]),m=te.normalizeAxis(c,o),y=_=>{let v=` i32(${l.indicesGet("inputIndices","uniforms.axis")}) `,S=Ee("uniforms.input_shape","uniforms.axis",o),k=r.reverse?v+(r.exclusive?" + 1":""):"0",E=r.reverse?S:v+(r.exclusive?"":" + 1");return`
                ${_.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(l,h)}
                ${_.mainStart()}
                  ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${h.offsetToIndices("global_idx")};
                  var sum = ${h.type.value}(0);
                  let first : i32 = ${k};
                  let last : i32 = ${E};
                  for (var i : i32 = first; i < last; i++) {
                    ${l.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${l.getByIndices("inputIndices")};
                  }
                  ${h.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},{type:12,data:m},...Ie(t,t)]}),getShaderSource:y}},Xh=(e,t)=>{let i=e.inputs[0].dims,r=e.inputs[0].dataType,n=e.inputs[1];e.compute(Bu(r,i,n,t),{inputs:[0]})},Yh=e=>{let t=e.exclusive===1,i=e.reverse===1;return Xe({exclusive:t,reverse:i})}}),Nu,Du,ju,Qh,Jh,ag=ce(()=>{Ne(),Pe(),ut(),qe(),Nu=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Du=(e,t,i,r)=>{let n=[];n.push(`fn perm(i: ${r.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`);for(let o=0;o<t;++o)n.push(i.indicesSet("a",e[o],`i[${o}]`));return n.push("return a;}"),n.join(`
`)},ju=(e,t)=>{let i,r,n,o,l,h,c=t.format==="NHWC",m=t.blocksize,y=t.mode==="DCR";c?([i,r,n,o]=e.dims,l=y?[i,r,n,m,m,o/m**2]:[i,r,n,o/m**2,m,m],h=y?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([i,r,n,o]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],l=y?[i,m,m,o/m**2,r,n]:[i,o/m**2,m,m,r,n],h=y?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let _=e.reshape(l),v=_.dims.length,S=e.dataType,k=ae("a",S,v),E=Te("output",S,v),N=I=>`
  ${I.registerUniform("output_size","u32").declareVariables(k,E)}

  ${Du(h,v,k,E)}

  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${E.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${E.setByOffset("global_idx",k.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:I=>{let T=c?[i,r*m,n*m,o/m**2]:[i,o/m**2,r*m,n*m],j=te.size(T),B=_.dims,W=te.sortBasedOnPerm(B,h);return{outputs:[{dims:T,dataType:I[0].dataType}],dispatchGroup:{x:Math.ceil(j/64)},programUniforms:[{type:12,data:j},...Ie(B,W)]}},getShaderSource:N}},Qh=(e,t)=>{Nu(e.inputs),e.compute(ju(e.inputs[0],t))},Jh=e=>Xe({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Bi,Yr,Jn,Pu,qu,Uu,Lu,es,Fu,ef,tf,og=ce(()=>{Ne(),Pe(),ut(),qe(),Bi="[a-zA-Z]|\\.\\.\\.",Yr="("+Bi+")+",Jn="^"+Yr+"$",Pu="("+Yr+",)*"+Yr,qu="^"+Pu+"$",Uu=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let i=this.symbolToIndices.get(e);i===void 0?i=[t]:i.push(t),this.symbolToIndices.set(e,i)}},Lu=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[i,r]=t.includes("->")?t.split("->",2):[t,""];if(!i.match(RegExp(qu)))throw new Error("Invalid LHS term");if(i.split(",").forEach((n,o)=>{let l=e[o].dims.slice();if(!n.match(RegExp(Jn)))throw new Error("Invalid LHS term");let h=this.processTerm(n,!0,l,o);this.lhs.push(h)}),r==="")r+=[...this.symbolToInfo.entries()].filter(([n,o])=>o.count===1||n==="...").map(([n])=>n).join("");else if(!r.match(RegExp(Yr)))throw new Error("Invalid RHS");r.match(RegExp(Bi,"g"))?.forEach(n=>{if(n==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let o=this.symbolToInfo.get(n);if(o===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(o.dimValue)}}),this.rhs=this.processTerm(r,!1,this.outputDims)}addSymbol(e,t,i){let r=this.symbolToInfo.get(e);if(r!==void 0){if(r.dimValue!==t&&r.count!==1)throw new Error("Dimension mismatch");r.count++,r.inputIndices.push(i)}else r={count:1,dimValue:t,inputIndices:[i]};this.symbolToInfo.set(e,r)}processTerm(e,t,i,r=-1){let n=i.length,o=!1,l=[],h=0;if(!e.match(RegExp(Jn))&&!t&&e!=="")throw new Error("Invalid LHS term");let c=e.match(RegExp(Bi,"g")),m=new Uu(r);return c?.forEach((y,_)=>{if(y==="..."){if(o)throw new Error("Only one ellipsis is allowed per input term");o=!0;let v=n-c.length+1;if(v<0)throw new Error("Ellipsis out of bounds");if(l=i.slice(h,h+v),this.hasEllipsis){if(this.ellipsisDims.length!==l.length||this.ellipsisDims.toString()!==l.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=l;else throw new Error("Ellipsis must be specified in the LHS");for(let S=0;S<l.length;S++){let k=String.fromCharCode(48+S);m.addSymbol(k,_+S),this.addSymbol(k,i[h++],r)}}else m.addSymbol(y,_+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(y,i[h++],r)}),m}},es=e=>e+"_max",Fu=(e,t,i,r)=>{let n=e.map(m=>m.length).map((m,y)=>ae(`input${y}`,t,m)),o=te.size(r),l=Te("output",t,r.length),h=[...i.symbolToInfo.keys()].filter(m=>!i.rhs.symbolToIndices.has(m)),c=m=>{let y=[],_="var prod = 1.0;",v="var sum = 0.0;",S="sum += prod;",k=[],E=[],N=[],I=[],T=i.symbolToInfo.size===i.rhs.symbolToIndices.size;i.symbolToInfo.forEach((B,W)=>{if(i.rhs.symbolToIndices.has(W)){let Q=i.rhs.symbolToIndices.get(W)?.[0];Q!==void 0&&i.lhs.forEach((X,ie)=>{if(B.inputIndices.includes(ie)){let fe=X.symbolToIndices.get(W);if(fe===void 0)throw new Error("Invalid symbol error");fe.forEach(_e=>{y.push(`${n[ie].indicesSet(`input${ie}Indices`,_e,l.indicesGet("outputIndices",Q))}`)})}})}else i.lhs.forEach((Q,X)=>{if(B.inputIndices.includes(X)){let ie=Q.symbolToIndices.get(W);if(ie===void 0)throw new Error("Invalid symbol error");ie.forEach(fe=>{k.push(`${n[X].indicesSet(`input${X}Indices`,fe,`${W}`)}`)}),I.push(`prod *= ${n[X].getByIndices(`input${X}Indices`)};`)}}),E.push(`for(var ${W}: u32 = 0; ${W} < uniforms.${es(W)}; ${W}++) {`),N.push("}")});let j=T?[...y,`let sum = ${n.map((B,W)=>B.getByIndices(`input${W}Indices`)).join(" * ")};`]:[...y,v,...E,...k,_,...I,S,...N];return`
            ${m.registerUniforms(h.map(B=>({name:`${es(B)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...n,l)}

            ${m.mainStart()}
            ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${l.offsetToIndices("global_idx")};
            ${n.map((B,W)=>`var input${W}Indices: ${n[W].type.indices};`).join(`
`)}
            ${j.join(`
`)};
            ${l.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:i.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let m=h.filter(_=>i.symbolToInfo.has(_)).map(_=>({type:12,data:i.symbolToInfo.get(_)?.dimValue||0}));m.push({type:12,data:o});let y=e.map((_,v)=>[...Ie(_)]).reduce((_,v)=>_.concat(v),m);return y.push(...Ie(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:y}},getShaderSource:c}},ef=(e,t)=>{let i=new Lu(e.inputs,t.equation),r=i.outputDims,n=e.inputs.map((o,l)=>o.dims);e.compute(Fu(n,e.inputs[0].dataType,i,r))},tf=e=>{let t=e.equation.replace(/\s+/g,"");return Xe({equation:t})}}),Wu,ts,Vu,Gu,rf,ug=ce(()=>{Ne(),Pe(),qe(),Wu=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,i=Array.from(e[1].getBigInt64Array(),Number),r=i.length<t.length?0:i.length-t.length,n=t.length<i.length?0:t.length-i.length;for(;r<i.length&&n<t.length;++r,++n)if(i[r]!==t[n]&&i[r]!==1&&t[n]!==1)throw new Error("Expand requires shape to be broadcastable to input")},ts=(e,t)=>{let i=e.length-t.length,r=[];for(let n=0;n<i;++n)r.push(e[n]);for(let n=0;n<t.length;++n)r.push(t[n]===1?e[n+i]:t[n]);return r},Vu=(e,t)=>e.length>t.length?ts(e,t):ts(t,e),Gu=e=>{let t=e[0].dims,i=Array.from(e[1].getBigInt64Array(),Number),r=Vu(t,i),n=e[0].dataType,o=n===9||te.size(t)===1,l=n===9||t.length>0&&t[t.length-1]%4===0?4:1,h=o||r.length>0&&r[r.length-1]%4===0?4:1,c=Math.ceil(te.size(r)/h),m=_=>{let v=ae("input",n,t.length,l),S=Te("output",n,r.length,h),k;if(n===9){let E=(N,I,T="")=>`
          let outputIndices${I} = ${S.offsetToIndices(`outputOffset + ${I}u`)};
          let offset${I} = ${v.broadcastedIndicesToOffset(`outputIndices${I}`,S)};
          let index${I} = offset${I} / 4u;
          let component${I} = offset${I} % 4u;
          ${N}[${I}] = ${T}(${v.getByOffset(`index${I}`)}[component${I}]);
        `;k=`
        let outputOffset = global_idx * ${h};
        var data = vec4<u32>(0);
        ${E("data",0,"u32")}
        ${E("data",1,"u32")}
        ${E("data",2,"u32")}
        ${E("data",3,"u32")}
        ${S.setByOffset("global_idx","data")}
      }`}else k=`
        let outputIndices = ${S.offsetToIndices(`global_idx * ${h}`)};
        let inputOffset = ${v.broadcastedIndicesToOffset("outputIndices",S)};
        let data = ${S.type.value}(${v.getByOffset(`inputOffset / ${l}`)});
        ${S.setByOffset("global_idx","data")}
      }`;return`
    ${_.registerUniform("vec_size","u32").declareVariables(v,S)}
    ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${k}`},y=[{type:12,data:c},...Ie(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${l}${h}`,inputDependencies:["rank"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:y})}},rf=e=>{Wu(e.inputs),e.compute(Gu(e.inputs),{inputs:[0]})}}),Ku,nf,lg=ce(()=>{Ne(),Pe(),qe(),Js(),Ku=e=>{let t=e[0].dataType,i=te.size(e[0].dims),r=te.size(e[1].dims),n=r%4===0,o=l=>{let h=ae("x",t,[1],4),c=ae("bias",t,[1],4),m=Te("y",t,[1],4),y=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],_=S=>`
      let bias${S}_offset: u32 = (global_idx * 4 + ${S}) % uniforms.bias_size;
      let bias${S} = ${c.getByOffset(`bias${S}_offset / 4`)}[bias${S}_offset % 4];`,v=n?`
      let bias = ${c.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${_(0)}${_(1)}${_(2)}${_(3)}
      let bias = ${h.type.value}(bias0, bias1, bias2, bias3);`;return`${l.registerUniforms(y).declareVariables(h,c,m)}

    ${Is(St(t))}

    ${l.mainStart(Or)}
      ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${h.getByOffset("global_idx")};
      ${v}
      let x_in = x + bias;
      ${m.setByOffset("global_idx",zs("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:o,getRunData:l=>({outputs:[{dims:l[0].dims,dataType:l[0].dataType}],programUniforms:[{type:12,data:Math.ceil(i/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(i/Or/4)}})}},nf=e=>{e.inputs.length<2||te.size(e.inputs[1].dims)===0?xh(e):e.compute(Ku(e.inputs))}}),Hu,Zu,sf,af,dg=ce(()=>{Ne(),Pe(),ut(),qe(),Hu=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Zu=(e,t)=>{let i=e[0].dims,r=e[1].dims,n=i.length,o=te.normalizeAxis(t.axis,n),l=i.slice(0);l.splice(o,1,...r);let h=i[o],c=e[0].dataType===9?4:1,m=Math.ceil(te.size(l)/c),y=[{type:12,data:m},{type:6,data:h},{type:12,data:o},...Ie(e[0].dims,e[1].dims,l)],_=v=>{let S=ae("data",e[0].dataType,e[0].dims.length,c),k=ae("inputIndices",e[1].dataType,e[1].dims.length),E=Te("output",e[0].dataType,l.length,c),N=T=>{let j=r.length,B=`var indicesIndices${T}  = ${k.type.indices}(0);`;for(let W=0;W<j;W++)B+=`${j>1?`indicesIndices${T}[${W}]`:`indicesIndices${T}`} = ${l.length>1?`outputIndices${T}[uniforms.axis + ${W}]`:`outputIndices${T}`};`;B+=`
          var idx${T} = ${k.getByIndices(`indicesIndices${T}`)};
          if (idx${T} < 0) {
            idx${T} = idx${T} + uniforms.axisDimLimit;
          }
          var dataIndices${T} : ${S.type.indices};
        `;for(let W=0,Q=0;W<n;W++)W===o?(B+=`${n>1?`dataIndices${T}[${W}]`:`dataIndices${T}`} = u32(idx${T});`,Q+=j):(B+=`${n>1?`dataIndices${T}[${W}]`:`dataIndices${T}`} = ${l.length>1?`outputIndices${T}[${Q}]`:`outputIndices${T}`};`,Q++);return B},I;if(e[0].dataType===9){let T=(j,B,W="")=>`
          let outputIndices${B} = ${E.offsetToIndices(`outputOffset + ${B}u`)};
          ${N(B)};
          let offset${B} = ${S.indicesToOffset(`dataIndices${B}`)};
          let index${B} = offset${B} / 4u;
          let component${B} = offset${B} % 4u;
          ${j}[${B}] = ${W}(${S.getByOffset(`index${B}`)}[component${B}]);
        `;I=`
        let outputOffset = global_idx * ${c};
        var value = vec4<u32>(0);
        ${T("value",0,"u32")}
        ${T("value",1,"u32")}
        ${T("value",2,"u32")}
        ${T("value",3,"u32")}
        ${E.setByOffset("global_idx","value")}
      `}else I=`
      let outputIndices = ${E.offsetToIndices("global_idx")};
      ${N("")};
      let value = ${S.getByIndices("dataIndices")};
      ${E.setByOffset("global_idx","value")};
      `;return`
      ${v.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(S,k,E)}
      ${v.mainStart()}
        ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${I}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:y}),getShaderSource:_}},sf=e=>Xe({axis:e.axis}),af=(e,t)=>{let i=e.inputs;Hu(i),e.compute(Zu(e.inputs,t))}}),Xu,of,uf,pg=ce(()=>{Ne(),Pe(),qe(),Xu=(e,t,i,r,n,o,l,h,c)=>{let m=[{type:12,data:o},{type:12,data:r},{type:12,data:n},{type:12,data:i},{type:12,data:l},{type:12,data:h},{type:12,data:c}],y=[o];m.push(...Ie(t.dims,y));let _=v=>{let S=ae("indices_data",t.dataType,t.dims.length),k=Te("input_slice_offsets_data",12,1,1),E=[S,k],N=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:n.length},{name:"sizes_from_slice_dims_data",type:"u32",length:i.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${v.registerUniforms(N).declareVariables(...E)}
  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${n.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${i.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${n.length}_${i.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:y,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:m}),getShaderSource:_},{inputs:[t],outputs:[-1]})[0]},of=(e,t)=>{let i=e.inputs,r=i[0].dims,n=i[0].dataType,o=i[1].dims,l=o[o.length-1],h=te.sizeToDimension(o,o.length-1),c=te.sizeFromDimension(r,t.batchDims+l),m=te.sizeToDimension(r,t.batchDims),y=te.sizeFromDimension(r,t.batchDims),_=h/m,v=new Array(l),S=c;for(let B=0;B<l;++B)v[l-1-B]=S,S*=r[t.batchDims+l-1-B];let k=Xu(e,i[1],v,t.batchDims,r,h,_,y,l),E=t.batchDims+l;if(E>r.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let N=o.slice(0,-1).concat(r.slice(E)),I=te.size(N),T=[{type:12,data:I},{type:12,data:c},...Ie(i[0].dims,k.dims,N)],j=B=>{let W=ae("data",i[0].dataType,i[0].dims.length),Q=ae("slice_offsets",12,k.dims.length),X=Te("output",i[0].dataType,N.length);return`
          ${B.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(W,Q,X)}
            ${B.mainStart()}
            ${B.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:N,dataType:n}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:T}),getShaderSource:j},{inputs:[i[0],k]})},uf=e=>({batchDims:e.batch_dims,cacheKey:""})}),Yu,Qu,lf,df,hg=ce(()=>{Ne(),Pe(),ut(),qe(),Yu=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let i=te.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,n=e[0],o=e[2],l=e.length===4?e[3]:void 0;if(o.dims.length!==n.dims.length||!n.dims.map((h,c)=>c===i?Math.ceil(h/r)===o.dims[c]:h===o.dims[c]).reduce((h,c)=>h&&c,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(l){if(l.dataType!==n.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(l.dims.length!==o.dims.length||!l.dims.map((h,c)=>h===o.dims[c]).reduce((h,c)=>h&&c,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Qu=(e,t)=>{let i=e[0].dims,r=e[1].dims,n=i.length,o=te.normalizeAxis(t.gatherAxis,n),l=te.normalizeAxis(t.quantizeAxis,n),h=i.slice(0);h.splice(o,1,...r);let c=te.size(h),m=e[2].dataType,y=e[0].dataType===22,_=[{type:12,data:c},{type:12,data:l},{type:12,data:o},{type:12,data:t.blockSize},...Ie(...e.map((S,k)=>S.dims),h)],v=S=>{let k=ae("data",e[0].dataType,e[0].dims.length),E=ae("inputIndices",e[1].dataType,e[1].dims.length),N=ae("scales",e[2].dataType,e[2].dims.length),I=e.length>3?ae("zeroPoint",e[3].dataType,e[3].dims.length):void 0,T=Te("output",m,h.length),j=[k,E,N];I&&j.push(I);let B=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${S.registerUniforms(B).declareVariables(...j,T)}
        ${S.mainStart()}
        let output_indices = ${T.offsetToIndices("global_idx")};
        var indices_indices = ${E.type.indices}(0);
        ${r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${T.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${E.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${T.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${k.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${T.indicesGet("output_indices","i")};
          ${k.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${E.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${i[o]};
        }
        ${k.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${h.length}; i++) {
          let index = ${T.indicesGet("output_indices",`i + ${r.length} - 1`)};
          ${k.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${k.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${k.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${y?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${N.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${N.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${N.getByIndices("scale_indices")};
        ${I?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${I.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${I.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${y?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${St(m)}(quantized_data - zero_point) * scale;
        ${T.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((S,k)=>k!==1).map(S=>S.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(S,k)=>"rank")},getRunData:()=>({outputs:[{dims:h,dataType:m}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:_}),getShaderSource:v}},lf=(e,t)=>{let i=e.inputs;Yu(i,t),e.compute(Qu(e.inputs,t))},df=e=>Xe({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Ju,el,pf,hf,fg=ce(()=>{Ne(),Pe(),ut(),qe(),Ju=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},el=(e,t)=>{let i=e[0].dims,r=e[0].dataType,n=i.length,o=e[1].dims,l=e[1].dataType,h=te.normalizeAxis(t.axis,n),c=i[h],m=o.slice(0),y=te.size(m),_=ae("input",r,n),v=ae("indicesInput",l,o.length),S=Te("output",r,m.length),k=[{type:12,data:y},{type:6,data:c},{type:12,data:h}];return k.push(...Ie(i,o,m)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:m,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:k}),getShaderSource:E=>`
      ${E.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,v,S)}
      ${E.mainStart()}
      ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${S.offsetToIndices("global_idx")};

      var idx = ${v.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${_.type.indices}(outputIndices);
      ${_.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${_.getByIndices("inputIndices")};

      ${S.setByOffset("global_idx","value")};
  }`}},pf=e=>Xe({axis:e.axis}),hf=(e,t)=>{let i=e.inputs;Ju(i),e.compute(el(e.inputs,t))}}),tl,rl,ff,cf,cg=ce(()=>{Ne(),Pe(),qe(),tl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},rl=(e,t)=>{let i=e[0].dims.slice(),r=e[1].dims.slice(),[n,o,l]=dp.getShapeOfGemmResult(i,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),h=[n,o];if(!h)throw new Error("Can't use gemm on the given tensors");let c=16,m=Math.ceil(o/c),y=Math.ceil(n/c),_=!0,v=te.size(h),S=[{type:12,data:_?m:v},{type:12,data:n},{type:12,data:o},{type:12,data:l},{type:1,data:t.alpha},{type:1,data:t.beta}],k=["type","type"];e.length===3&&(S.push(...Ie(e[2].dims)),k.push("rank")),S.push(...Ie(h));let E=I=>{let T="";t.transA&&t.transB?T="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?T="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?T="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(T="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let j=t.alpha===1?"":"value *= uniforms.alpha;",B=ae("a",e[0].dataType,e[0].dims),W=ae("b",e[1].dataType,e[1].dims),Q=B.type.value,X=null,ie=[B,W];e.length===3&&(X=ae("c",e[2].dataType,e[2].dims.length),ie.push(X));let fe=Te("output",e[0].dataType,h.length);ie.push(fe);let _e=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${I.registerUniforms(_e).declareVariables(...ie)}

  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${Q}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${T}
    }

    ${j}
    ${X!=null?`let cOffset = ${X.broadcastedIndicesToOffset("vec2(m, n)",fe)}; value += ${Q}(uniforms.beta) * ${X.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},N=I=>{let T=ae("a",e[0].dataType,e[0].dims),j=ae("b",e[1].dataType,e[1].dims),B=null,W=[T,j];e.length===3&&(B=ae("c",e[2].dataType,e[2].dims.length),W.push(B));let Q=Te("output",e[0].dataType,h.length);W.push(Q);let X=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],ie="",fe="";t.transA&&t.transB?(fe=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${T.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${j.type.value}(0);
      }
      `,ie="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(fe=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${T.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${j.type.value}(0);
      }
      `,ie="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(fe=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${T.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${j.type.value}(0);
      }
      `,ie="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(fe=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${T.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${j.type.value}(0);
      }
      `,ie="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let _e=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${I.registerUniforms(X).declareVariables(...W)}
  var<workgroup> tile_a: array<array<${T.type.storage}, ${c}>, ${c}>;
  var<workgroup> tile_b: array<array<${j.type.storage}, ${c}>, ${c}>;
  ${I.mainStart([c,c,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${c};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${c};
    let num_tiles = (uniforms.K - 1) / ${c} + 1;
    var k_start = 0u;
    var value = ${Q.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${fe}
      k_start = k_start + ${c};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${c}; k++) {
        ${ie}
      }
      workgroupBarrier();
    }

    ${_e}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${B!=null?`let cOffset = ${B.broadcastedIndicesToOffset("vec2(m, n)",Q)}; value += ${Q.type.value}(uniforms.beta) * ${B.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return _?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:k},getRunData:()=>({outputs:[{dims:h,dataType:e[0].dataType}],dispatchGroup:{x:m*y},programUniforms:S}),getShaderSource:N}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:k},getRunData:()=>({outputs:[{dims:h,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:S}),getShaderSource:E}},ff=e=>{let t=e.transA,i=e.transB,r=e.alpha,n=e.beta;return{transA:t,transB:i,alpha:r,beta:n,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},cf=(e,t)=>{tl(e.inputs),e.compute(rl(e.inputs,t))}}),Kt,Qt,fr,cr,il,nl,sl,al,ol,ul,ll,dl,mf,gf,mg=ce(()=>{Ne(),Pe(),ut(),qe(),[Kt,Qt,fr,cr]=[0,1,2,3],il=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},nl=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,sl=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,al=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,ol=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,ul=(e,t,i)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Kt}] = batch;
     indices[${Qt}] = channel;`+(()=>{switch(i.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${fr}] = u32(r);
            indices[${cr}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${fr}] = u32(clamp(r, 0, H - 1));
          indices[${cr}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${fr}] = gs_reflect(r, border[1], border[3]);
          indices[${cr}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${i.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,ll=(e,t,i)=>(()=>{switch(i.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Kt}], indices[${Qt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Kt}], indices[${Qt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Kt}], indices[${Qt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Kt}], indices[${Qt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Kt}], indices[${Qt}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Kt}], indices[${Qt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${i.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,dl=(e,t)=>{let i=ae("x",e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],n=ae("grid",e[1].dataType,r.length,2),o=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(o=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Kt,Qt,fr,cr]=[0,3,1,2]);let l=Te("output",e[0].dataType,o.length),h=i.type.value,c=te.size(o),m=[{type:12,data:c},...Ie(e[0].dims,r,o)],y=_=>`
  ${_.registerUniform("output_size","u32").declareVariables(i,n,l)}
  ${nl}
  ${sl(h)}
  ${al(t)}
  ${ol(t)}
  ${ul(i,h,t)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${fr}]);
      let W_in = i32(uniforms.x_shape[${cr}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${l.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Kt}], indices[${fr}], indices[${cr}]);
      let nxy = ${n.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${ll(l,h,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:_=>{let v=te.size(o);return{outputs:[{dims:o,dataType:_[0].dataType}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:m}},getShaderSource:y}},mf=(e,t)=>{il(e.inputs),e.compute(dl(e.inputs,t))},gf=e=>Xe({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Ct,pl,wf,rs,hl,si,yf,_f=ce(()=>{Ne(),Pe(),ut(),Zs(),Qs(),qe(),ar(),Ct=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,pl=(e,t)=>{let i=e[0],r=Ct(e,1),n=Ct(e,2),o=Ct(e,3),l=Ct(e,4),h=Ct(e,5),c=Ct(e,6),m=Ct(e,7);if(i.dims.length!==3&&i.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let y=i.dims[0],_=i.dims[1],v=i.dims.length===3?i.dims[2]:t.numHeads*i.dims[4],S=_,k=0,E=0,N=Math.floor(v/t.numHeads);if(c&&m&&te.size(c.dims)&&te.size(m.dims)){if(c.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(c.dims[0]!==y||c.dims[1]!==t.numHeads||c.dims[3]!==N)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(m.dims[0]!==y||m.dims[1]!==t.numHeads||m.dims[3]!==N)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(c.dims[2]!==m.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(m.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');k=c.dims[2],E=c.dims[2]}else if(c&&te.size(c.dims)||m&&te.size(m.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let I;if(r&&te.size(r.dims)>0){if(i.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(i.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==i.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');I=2,S=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==N)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');I=5,S=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==N)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');I=0,S=r.dims[2]}}else{if(i.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(i.dims[2]!==t.numHeads||i.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');I=3}if(o&&te.size(o.dims)>0){if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let T=k+S,j=0;if(l&&te.size(l.dims)>0){j=8;let X=l.dims;throw X.length===1?X[0]===y?j=1:X[0]===3*y+2&&(j=3):X.length===2&&X[0]===y&&X[1]===T&&(j=5),j===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let B=!1,W=v;if(n&&te.size(n.dims)>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(i.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(S!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');W=n.dims[2]}else{if(S!==n.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');W=n.dims[1]*n.dims[3],B=!0}}let Q=!1;if(l&&te.size(l.dims)>0)throw new Error("Key padding mask is not supported");if(h&&te.size(h.dims)>0){if(h.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(h.dims[0]!==y||h.dims[1]!==t.numHeads||h.dims[2]!==_||h.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:y,sequenceLength:_,pastSequenceLength:k,kvSequenceLength:S,totalSequenceLength:T,maxSequenceLength:E,inputHiddenSize:0,hiddenSize:v,vHiddenSize:W,headSize:N,vHeadSize:Math.floor(W/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:j,scale:t.scale,broadcastResPosBias:Q,passPastInKv:B,qkvFormat:I}},wf=e=>Xe({...e}),rs=Xe({perm:[0,2,1,3]}),hl=(e,t,i,r,n,o,l)=>{let h=[r,n,o],c=te.size(h),m=[{type:12,data:c},{type:12,data:l},{type:12,data:o}],y=_=>{let v=Te("qkv_with_bias",t.dataType,h),S=ae("qkv",t.dataType,h),k=ae("bias",i.dataType,h),E=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${_.registerUniforms(E).declareVariables(S,k,v)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:h,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:y},{inputs:[t,i],outputs:[-1]})[0]},si=(e,t,i,r,n,o,l,h)=>{let c=o;if(l&&te.size(l.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return c=hl(e,o,l,t,r,i*n,h),c=c.reshape([t,r,i,n]),i===1||r===1?c:e.compute(Mt(c,rs.perm),{inputs:[c],outputs:[-1]})[0]}else return o.dims.length===3&&(c=o.reshape([t,r,i,n])),i===1||r===1?c:e.compute(Mt(c,rs.perm),{inputs:[c],outputs:[-1]})[0]},yf=(e,t)=>{let i=pl(e.inputs,t),r=e.inputs[0],n=Ct(e.inputs,1),o=Ct(e.inputs,2),l=Ct(e.inputs,3),h=Ct(e.inputs,4),c=Ct(e.inputs,5),m=Ct(e.inputs,6),y=Ct(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if(n?.dims.length===5)throw new Error("Packed KV is not implemented");let _=n&&o&&n.dims.length===4&&o.dims.length===4,v=si(e,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,r,l,0);if(_)return ui(e,v,n,o,h,void 0,m,y,c,i);if(!n||!o)throw new Error("key and value must be provided");let S=si(e,i.batchSize,i.numHeads,i.kvSequenceLength,i.headSize,n,l,i.hiddenSize),k=si(e,i.batchSize,i.numHeads,i.kvSequenceLength,i.vHeadSize,o,l,2*i.hiddenSize);ui(e,v,S,k,h,void 0,m,y,c,i)}}),fl,cl,ml,gl,Bs,bf,vf,$f=ce(()=>{Ne(),Pe(),ut(),qe(),fl=e=>{if(!e||e.length<1)throw new Error("too few inputs")},cl=(e,t)=>{let i=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(n=>i.push(Number(n))),r=i.length),Xe({numOutputs:r,axis:t.axis,splitSizes:i})},ml=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${Ee("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,gl=e=>{let t=e.length,i=[];for(let r=0;r<t;++r){let n=e[r].setByIndices("indices","input[global_idx]");t===1?i.push(n):r===0?i.push(`if (output_number == ${r}u) { ${n} }`):r===t-1?i.push(`else { ${n} }`):i.push(`else if (output_number == ${r}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${i.join(`
`)}
      }`},Bs=(e,t)=>{let i=e[0].dims,r=te.size(i),n=e[0].dataType,o=te.normalizeAxis(t.axis,i.length),l=new Array(t.numOutputs),h=ae("input",n,i.length),c=new Array(t.numOutputs),m=[],y=[],_=0,v=[{type:12,data:r}];for(let k=0;k<t.numOutputs;k++){_+=t.splitSizes[k],c[k]=_;let E=i.slice();E[o]=t.splitSizes[k],y.push(E),l[k]=Te(`output${k}`,n,E.length),m.push({dims:y[k],dataType:e[0].dataType})}v.push({type:12,data:c},...Ie(i,...y));let S=k=>`
  ${k.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",c.length).declareVariables(h,...l)}
  ${ml(c.length)}
  ${gl(l)}

  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${h.offsetToIndices("global_idx")};
    var index = ${h.indicesGet("indices",o)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Ee("uniforms.size_in_split_axis","output_number - 1u",c.length)};
      ${h.indicesSet("indices",o,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:m,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:v})}},bf=(e,t)=>{fl(e.inputs);let i=e.inputs.length===1?t:cl(e.inputs,t);e.compute(Bs(e.inputs,i),{inputs:[0]})},vf=e=>{let t=e.axis,i=e.splitSizes,r=e.numOutputs<0?i.length:e.numOutputs;if(r!==i.length)throw new Error("numOutputs and splitSizes length must be equal");return Xe({axis:t,numOutputs:r,splitSizes:i})}}),wl,Zi,xf,Sf=ce(()=>{Ne(),Pe(),ut(),qe(),wl=(e,t)=>{let[i,r,n,o]=e,{numHeads:l,rotaryEmbeddingDim:h}=t;if(i.dims.length!==3&&i.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${i.dims.length}`);if(!te.areEqual(r.dims,[])&&!te.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(!te.areEqual(n.dims,o.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(h>0&&l===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let c=i.dims[0],m=i.dims[i.dims.length-2],y=n.dims[0],_=te.sizeFromDimension(i.dims,1)/m,v=h===0?n.dims[1]*2:_/l;if(h>v)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(c!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(m!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(v/2!==n.dims[1]&&h/2!==n.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`);if(m>y)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Zi=(e,t)=>{let{interleaved:i,numHeads:r,rotaryEmbeddingDim:n,scale:o}=t,l=e[0].dims[0],h=te.sizeFromDimension(e[0].dims,1),c=e[0].dims[e[0].dims.length-2],m=h/c,y=e[2].dims[1],_=n===0?y*2:m/r,v=new Array(l,c,m/_,_-y),S=te.computeStrides(v),k=[{type:1,data:o},{type:12,data:v},{type:12,data:S},...e[0].dims.length===3?new Array({type:12,data:[h,m,_,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[h,_,c*_,1]}):[],...Ie(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],E=N=>{let I=ae("input",e[0].dataType,e[0].dims.length),T=ae("position_ids",e[1].dataType,e[1].dims.length),j=ae("cos_cache",e[2].dataType,e[2].dims.length),B=ae("sin_cache",e[3].dataType,e[3].dims.length),W=Te("output",e[0].dataType,e[0].dims.length);return N.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:v.length},{name:"global_strides",type:"u32",length:S.length},{name:"input_output_strides",type:"u32",length:S.length}]),`
        ${N.declareVariables(I,T,j,B,W)}

        ${N.mainStart(Or)}
          let half_rotary_emb_dim = uniforms.${j.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${N.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${T.broadcastedIndicesToOffset("bsnh.xy",Te("",T.type.tensor,2))};
            let position_id =
                u32(${T.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${i});
            let j = i + select(half_rotary_emb_dim, 1, ${i});
            let re = ${I.getByOffset("i")} * ${j.get("position_id","bsnh[3]")} -
                ${I.getByOffset("j")} * ${B.get("position_id","bsnh[3]")};
            ${W.setByOffset("i","re")}
            let im = ${I.getByOffset("i")} * ${B.get("position_id","bsnh[3]")} +
                ${I.getByOffset("j")} * ${j.get("position_id","bsnh[3]")};
            ${W.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${W.setByOffset("k",I.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:Xe({interleaved:i}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:E,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(te.size(v)/Or)},programUniforms:k})}},xf=(e,t)=>{wl(e.inputs,t),e.compute(Zi(e.inputs,t))}}),yl,_l,is,bl,kf,gg=ce(()=>{ut(),Ne(),Qs(),_f(),$f(),ar(),Sf(),qe(),yl=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let i=e[0],r=e[1],n=e[2],o=e[3],l=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(i.dims.length!==3&&i.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let h=!1,c=i.dims[0],m=i.dims[1],y=i.dims.length===3?h?i.dims[2]/3:i.dims[2]:t.numHeads*i.dims[4],_=m,v=0,S=!r||r.dims.length===0,k=Math.floor(S?y/(t.numHeads+2*t.kvNumHeads):y/t.numHeads);S&&(y=k*t.numHeads);let E=o&&o.dims.length!==0,N=l&&l.dims.length!==0;if(E&&o.dims.length===4&&o.dims[0]===c&&o.dims[1]!==t.kvNumHeads&&o.dims[2]===t.kvNumHeads&&o.dims[3]===k)throw new Error("BSNH pastKey/pastValue is not supported");if(E&&N){if(o.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');v=o.dims[2]}else if(E||N)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let I=1;if(r&&r.dims.length>0){if(i.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(i.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(i.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');_=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==k)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');_=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==k)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');_=r.dims[2]}}else{if(i.dims.length!==3&&i.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(i.dims.length===5&&(i.dims[2]!==t.numHeads||i.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');I=3}let T=0,j=!1,B=t.kvNumHeads?k*t.kvNumHeads:y;if(n&&n.dims.length>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(i.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(_!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');B=n.dims[2]}else{if(_!==n.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');B=n.dims[1]*n.dims[3],j=!0}}let W=e.length>4?e[5]:void 0;if(W&&W.dims.length!==1&&W.dims[0]!==c)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:c,sequenceLength:m,pastSequenceLength:v,kvSequenceLength:_,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:y,vHiddenSize:B,headSize:k,vHeadSize:Math.floor(B/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:T,scale:t.scale,broadcastResPosBias:!1,passPastInKv:j,qkvFormat:I}},_l=Xe({perm:[0,2,1,3]}),is=(e,t,i)=>{let r=t,n=i.kvNumHeads;return t.dims.length===3&&i.kvSequenceLength!==0&&(r=t.reshape([i.batchSize,i.kvSequenceLength,n,i.headSize]),r=e.compute(Mt(r,_l.perm),{inputs:[r],outputs:[-1]})[0]),r},bl=(e,t,i,r)=>{let n=7,o=["type","type"],l=[e*t],h=e*t,c=[{type:12,data:h},{type:12,data:t},{type:12,data:e}],m=y=>{let _=ae("seq_lens",i.dataType,i.dims),v=ae("total_seq_lens",r.dataType,r.dims),S=Te("pos_ids",n,l),k=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${y.registerUniforms(k).declareVariables(_,v,S)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${v.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${_.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${S.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${S.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${S.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:l,dataType:n}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:c}),getShaderSource:m}},kf=(e,t)=>{let i=yl(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let r=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,o=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,l=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,h=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,c=e.inputs.length>4?e.inputs[5]:void 0,m=e.inputs.length>5?e.inputs[6]:void 0,y=i.kvNumHeads?i.kvNumHeads:i.numHeads,_=Xe({axis:2,numOutputs:3,splitSizes:[i.numHeads*i.headSize,y*i.headSize,y*i.headSize]}),[v,S,k]=!n&&!o?e.compute(Bs([r],_),{inputs:[r],outputs:[-1,-1,-1]}):[r,n,o],E,N;if(t.doRotary){let B=e.compute(bl(i.batchSize,i.sequenceLength,c,m),{inputs:[c,m],outputs:[-1]})[0],W=e.inputs[7],Q=e.inputs[8],X=Xe({interleaved:t.rotaryInterleaved!==0,numHeads:i.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),ie=[v,B,W,Q],fe=[-1];E=e.compute(Zi(ie,X),{inputs:ie,outputs:fe})[0],ie.splice(0,1,S);let _e=Xe({interleaved:t.rotaryInterleaved!==0,numHeads:i.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});N=e.compute(Zi(ie,_e),{inputs:ie,outputs:fe})[0]}let I=si(e,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,t.doRotary?E:v,void 0,0),T=is(e,t.doRotary?N:S,i),j=is(e,k,i);ui(e,I,T,j,void 0,void 0,l,h,void 0,i,c,m)}}),ns,vl,$l,Cf,wg=ce(()=>{Ne(),Pe(),ar(),qe(),ns=(e,t,i,r,n,o,l,h)=>{let c=ot(o),m=c===1?"f32":`vec${c}f`,y=c===1?"vec2f":`mat2x${c}f`,_=n*l,v=64;_===1&&(v=256);let S=[n,l,o/c],k=[n,l,2],E=["rank","type","type"],N=[];N.push(...Ie(S,k));let I=T=>{let j=ae("x",t.dataType,3,c),B=ae("scale",i.dataType,i.dims),W=ae("bias",r.dataType,r.dims),Q=Te("output",1,3,2),X=[j,B,W,Q];return`
  var<workgroup> workgroup_shared : array<${y}, ${v}>;
  const workgroup_size = ${v}u;
  ${T.declareVariables(...X)}
  ${T.mainStart(v)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${m}(0);
    var squared_sum = ${m}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${m}(${j.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${y}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${sr("workgroup_shared[0][0]",c)} / f32(hight * ${c});
      let squared_sum_final = ${sr("workgroup_shared[0][1]",c)} / f32(hight * ${c});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${h}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${c};${h};${v}`,inputDependencies:E},getRunData:()=>({outputs:[{dims:k,dataType:1}],dispatchGroup:{x:_},programUniforms:N}),getShaderSource:I},{inputs:[t,i,r],outputs:[-1]})[0]},vl=(e,t,i)=>{let r=t[0].dims,n=r,o=2,l=r[0],h=r[1],c=te.sizeFromDimension(r,o),m=ot(c),y=te.size(n)/m,_=ns(e,t[0],t[1],t[2],l,c,h,i.epsilon),v=[l,h,c/m],S=[l,h],k=["type","none"],E=N=>{let I=ae("x",t[0].dataType,v.length,m),T=ae("scale_shift",1,S.length,2),j=Te("output",t[0].dataType,v.length,m),B=[I,T,j];return`
  ${N.registerUniform("output_size","u32").declareVariables(...B)}
  ${N.mainStart()}
  ${N.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${j.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${T.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${I.getByOffset("global_idx")} * ${j.type.value}(scale_shift.x) + ${j.type.value}(scale_shift.y);
      ${j.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${m}`,inputDependencies:k},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...Ie(v,S,v)]}),getShaderSource:E},{inputs:[t[0],_]})},$l=(e,t,i)=>{let r=t[0].dims,n=r,o=r[0],l=r[r.length-1],h=te.sizeFromDimension(r,1)/l,c=ot(l),m=te.size(n)/c,y=[{type:12,data:h},{type:12,data:Math.floor(l/c)}],_=["type","type"],v=!1,S=[0,r.length-1];for(let I=0;I<r.length-2;I++)v=v||r[I+1]!==1,S.push(I+1);v=v&&r[r.length-1]!==1;let k=v?e.compute(Mt(e.inputs[0],S),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},(I,T)=>r[S[T]])),E=ns(e,k,t[1],t[2],o,h,l,i.epsilon),N=I=>{let T=gt(t[0].dataType),j=c===1?"vec2f":`mat${c}x2f`,B=X=>{let ie=X===0?"x":"y",fe=c===1?"f32":`vec${c}f`;switch(c){case 1:return`${T}(${fe}(scale.${ie}))`;case 2:return`vec2<${T}>(${fe}(scale[0].${ie}, scale[1].${ie}))`;case 4:return`vec4<${T}>(${fe}(scale[0].${ie}, scale[1].${ie}, scale[2].${ie}, scale[3].${ie}))`;default:throw new Error(`Not supported compoents ${c}`)}},W=ae("input",t[0].dataType,t[0].dims,c),Q=Te("output",t[0].dataType,n,c);return`
  @group(0) @binding(0) var<storage, read> input : array<${W.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${j}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${Q.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${I.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${B(0)}, ${B(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${c}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:y}),getShaderSource:N},{inputs:[t[0],E]})},Cf=(e,t)=>{t.format==="NHWC"?$l(e,e.inputs,t):vl(e,e.inputs,t)}}),xl,Sl,Tf,yg=ce(()=>{Ne(),Pe(),qe(),xl=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Sl=(e,t,i)=>{let r=t.simplified,n=e[0].dims,o=e[1],l=!r&&e[2],h=n,c=te.normalizeAxis(t.axis,n.length),m=te.sizeToDimension(n,c),y=te.sizeFromDimension(n,c),_=te.size(o.dims),v=l?te.size(l.dims):0;if(_!==y||l&&v!==y)throw new Error(`Size of X.shape()[axis:] == ${y}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${_} and bias size of ${v}`);let S=[];for(let W=0;W<n.length;++W)W<c?S.push(n[W]):S.push(1);let k=ot(y),E=["type","type"],N=[{type:12,data:m},{type:1,data:y},{type:12,data:Math.floor(y/k)},{type:1,data:t.epsilon}];l&&E.push("type");let I=i>1,T=i>2,j=W=>{let Q=gt(e[0].dataType),X=[ae("x",e[0].dataType,e[0].dims,k),ae("scale",o.dataType,o.dims,k)];l&&X.push(ae("bias",l.dataType,l.dims,k)),X.push(Te("output",e[0].dataType,h,k)),I&&X.push(Te("mean_data_output",1,S)),T&&X.push(Te("inv_std_output",1,S));let ie=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${W.registerUniforms(ie).declareVariables(...X)}
  ${W.mainStart()}
    ${W.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Cs("f32",k)};
    var mean_square_vector = ${Cs("f32",k)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Mr(Q,k,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${sr("mean_vector",k)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${sr("mean_square_vector",k)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Mr(Q,k,"x[j + offset]")};
      let f32scale = ${Mr(Q,k,"scale[j]")};
      output[j + offset] = ${X[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${l?`+ ${Mr(Q,k,"bias[j]")}`:""}
      );
    }

    ${I?"mean_data_output[global_idx] = mean":""};
    ${T?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},B=[{dims:h,dataType:e[0].dataType}];return I&&B.push({dims:S,dataType:1}),T&&B.push({dims:S,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${k};${i};${r}`,inputDependencies:E},getRunData:()=>({outputs:B,dispatchGroup:{x:Math.ceil(m/64)},programUniforms:N}),getShaderSource:j}},Tf=(e,t)=>{xl(e.inputs),e.compute(Sl(e.inputs,t,e.outputCount))}}),kl,Ef,_g=ce(()=>{Pe(),ia(),na(),kl=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Ef=e=>{kl(e.inputs);let t=Rr.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let i=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(i<8&&r<8)e.compute(ra(e.inputs,{activation:""},t));else{let n=t[t.length-2],o=te.size(e.inputs[0].dims.slice(0,-2)),l=te.size(e.inputs[1].dims.slice(0,-2));if(o!==1&&n===1&&l===1){let h=e.inputs[0].reshape([1,o,r]),c=e.inputs[1].reshape([1,r,i]),m=[1,o,i],y=[h,c];e.compute(Hi(y,{activation:""},t,m),{inputs:y})}else e.compute(Hi(e.inputs,{activation:""},t))}}}),Cl,Tl,El,If,zf,bg=ce(()=>{Ne(),Pe(),ut(),qe(),Cl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let i=e[0],r=i.dims.length;if(i.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let n=Math.floor((t.k+t.blockSize-1)/t.blockSize),o=t.blockSize/8*t.bits,l=e[1];if(!te.areEqual(l.dims,[t.n,n,o]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let h=e[2].dims;if(te.size(h)!==t.n*n)throw new Error("scales input size error.");if(e.length===4){let c=e[3].dims,m=t.n*(t.bits===8?n:Math.floor((n*t.bits+7)/8));if(te.size(c)!==m)throw new Error("zeroPoints input size error.")}},Tl=(e,t)=>{let i=e[0].dims,r=i.length,n=i[r-2],o=t.k,l=t.n,h=i.slice(0,r-2),c=te.size(h),m=e[1].dims[2]/4,y=e[0].dataType,_=ot(t.k),v=ot(m),S=ot(l),k=h.concat([n,l]),E=n>1&&l/S%2===0?2:1,N=te.size(k)/S/E,I=64,T=[],j=[c,n,o/_],B=te.convertShape(e[1].dims).slice();B.splice(-1,1,m/v),T.push(...Ie(j)),T.push(...Ie(B)),T.push(...Ie(e[2].dims)),e.length===4&&T.push(...Ie(te.convertShape(e[3].dims)));let W=[c,n,l/S];T.push(...Ie(W));let Q=X=>{let ie=j.length,fe=ae("a",e[0].dataType,ie,_),_e=ae("b",12,B.length,v),xe=ae("scales",e[2].dataType,e[2].dims.length),ke=[fe,_e,xe],q=e.length===4?ae("zero_points",12,e[3].dims.length):void 0;q&&ke.push(q);let O=W.length,Y=Te("output",e[0].dataType,O,S),U=gt(e[0].dataType),Z=(()=>{switch(_){case 1:return`array<${U}, 8>`;case 2:return`mat4x2<${U}>`;case 4:return`mat2x4<${U}>`;default:throw new Error(`${_}-component is not supported.`)}})(),oe=()=>{let J=`
          // reuse a data
            var input_offset = ${fe.indicesToOffset(`${fe.type.indices}(batch, row, word_offset)`)};
            var a_data: ${Z};
            for (var j: u32 = 0; j < ${8/_}; j++) {
              a_data[j] = ${fe.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let K=0;K<S*E;K++)J+=`
            b_value = ${v===1?`b${K}_data`:`b${K}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${Z}(${Array.from({length:4},(me,De)=>`${U}(b_value_lower[${De}]), ${U}(b_value_upper[${De}])`).join(", ")});
            b_dequantized_values = ${_===1?`${Z}(${Array.from({length:8},(me,De)=>`(b_quantized_values[${De}] - ${q?`zero_point${K}`:"zero_point"}) * scale${K}`).join(", ")});`:`(b_quantized_values - ${Z}(${Array(8).fill(`${q?`zero_point${K}`:"zero_point"}`).join(",")})) * scale${K};`};
            workgroup_shared[local_id.x * ${E} + ${Math.floor(K/S)}]${S>1?`[${K%S}]`:""} += ${Array.from({length:8/_},(me,De)=>`${_===1?`a_data[${De}] * b_dequantized_values[${De}]`:`dot(a_data[${De}], b_dequantized_values[${De}])`}`).join(" + ")};
          `;return J},le=()=>{let J=`
            var col_index = col * ${S};
            ${q?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${U}(8);`}
            `;for(let K=0;K<S*E;K++)J+=`
            let scale${K} = ${xe.getByOffset("col_index * nBlocksPerCol + block")};
            ${q?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${q.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${K} = ${U}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return J},Se=()=>{let J=`col_index = col * ${S};`;for(let K=0;K<S*E;K++)J+=`
            let b${K}_data = ${_e.getByIndices(`${_e.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return J+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${Z};
            var b_dequantized_values: ${Z};`,J};return`
        var<workgroup> workgroup_shared: array<${Y.type.value}, ${E*I}>;
        ${X.declareVariables(...ke,Y)}
        ${X.mainStart([I,1,1])}
          let output_indices = ${Y.offsetToIndices(`(global_idx / ${I}) * ${E}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${I}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/_};
            ${le()}
            for (var word: u32 = 0; word < ${m}; word += ${v}) {
              ${Se()}
              for (var i: u32 = 0; i < ${v}; i++) {
                ${oe()}
                word_offset += ${8/_};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${E}) {
            var output_value: ${Y.type.value} = ${Y.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${I}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${E};
            }
            ${Y.setByIndices(`${Y.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${_};${v};${S};${E};${I}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:k,dataType:y}],dispatchGroup:{x:N},programUniforms:T}),getShaderSource:Q}},El=(e,t)=>{let i=e[0].dims,r=i.length,n=i[r-2],o=t.k,l=t.n,h=i.slice(0,r-2),c=te.size(h),m=e[1].dims[2]/4,y=e[0].dataType,_=ot(t.k),v=ot(m),S=h.concat([n,l]),k=128,E=l%8===0?8:l%4===0?4:1,N=k/E,I=N*v*8,T=I/_,j=I/t.blockSize,B=te.size(S)/E,W=[],Q=[c,n,o/_],X=te.convertShape(e[1].dims).slice();X.splice(-1,1,m/v),W.push(...Ie(Q)),W.push(...Ie(X)),W.push(...Ie(e[2].dims)),e.length===4&&W.push(...Ie(te.convertShape(e[3].dims)));let ie=[c,n,l];W.push(...Ie(ie));let fe=_e=>{let xe=Q.length,ke=ae("a",e[0].dataType,xe,_),q=ae("b",12,X.length,v),O=ae("scales",e[2].dataType,e[2].dims.length),Y=[ke,q,O],U=e.length===4?ae("zero_points",12,e[3].dims.length):void 0;U&&Y.push(U);let Z=ie.length,oe=Te("output",e[0].dataType,Z),le=gt(e[0].dataType),Se=()=>{switch(_){case 1:return`
          let a_data0 = vec4<${le}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${le}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${le}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${le}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${_}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${ke.type.value}, ${T}>;
        var<workgroup> inter_results: array<array<${oe.type.value}, ${N}>, ${E}>;
        ${_e.declareVariables(...Y,oe)}
        ${_e.mainStart([N,E,1])}
          let output_indices = ${oe.offsetToIndices(`workgroup_index * ${E}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${j} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${T};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${T}; a_offset += ${k})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${ke.getByIndices(`${ke.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${ke.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${j} + local_id.x;
            ${U?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${U.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${le}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${le}(8);`}
            let scale = ${O.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${q.getByIndices(`${q.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/_};
            for (var i: u32 = 0; i < ${v}; i++) {
              ${Se()}
              let b_value = ${v===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${le}>(${Array.from({length:4},(J,K)=>`${le}(b_value_lower[${K}]), ${le}(b_value_upper[${K}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${le}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(J,K)=>`${`dot(a_data${K}, b_dequantized_values[${K}])`}`).join(" + ")};
              word_offset += ${8/_};
            }
            workgroupBarrier();
          }

          if (local_idx < ${E}) {
            var output_value: ${oe.type.value} = ${oe.type.value}(0);
            for (var b = 0u; b < ${N}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${oe.setByIndices(`${oe.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${_};${v};${N};${E}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:S,dataType:y}],dispatchGroup:{x:B},programUniforms:W}),getShaderSource:fe}},If=(e,t)=>{Cl(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(El(e.inputs,t)):e.compute(Tl(e.inputs,t))},zf=e=>Xe(e)}),Il,zl,Al,Ml,Rl,Ol,Bl,Nl,Af,vg=ce(()=>{Ne(),Pe(),qe(),Il=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},zl=(e,t,i)=>{let r="";for(let n=t-1;n>=0;--n)r+=`
            k = i32(${e.indicesGet("indices",n)}) - ${Ee("uniforms.pads",n,i)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Ee("uniforms.x_shape",n,t)})) {
              break;
            }
            offset += k * i32(${Ee("uniforms.x_strides",n,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r}
            value = x[offset];
          }
      `},Al=(e,t,i)=>{let r="";for(let n=t-1;n>=0;--n)r+=`
                k = i32(${e.indicesGet("indices",n)}) - ${Ee("uniforms.pads",n,i)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${Ee("uniforms.x_shape",n,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${Ee("uniforms.x_shape",n,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${Ee("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Ml=(e,t,i)=>{let r="";for(let n=t-1;n>=0;--n)r+=`
                k = i32(${e.indicesGet("indices",n)}) - ${Ee("uniforms.pads",n,i)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${Ee("uniforms.x_shape",n,t)})) {
                  k = i32(${Ee("uniforms.x_shape",n,t)}) - 1;
                }
                offset += k * i32(${Ee("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Rl=(e,t,i)=>{let r="";for(let n=t-1;n>=0;--n)r+=`
                k = i32(${e.indicesGet("indices",n)}) - ${Ee("uniforms.pads",n,i)};
                if (k < 0)  {
                  k += i32(${Ee("uniforms.x_shape",n,t)}]);
                }
                if (k >= i32(${Ee("uniforms.x_shape",n,t)})) {
                  k -= i32(${Ee("uniforms.x_shape",n,t)});
                }
                offset += k * i32(${Ee("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Ol=(e,t,i)=>{switch(i.mode){case 0:return zl(e,t,i.pads.length);case 1:return Al(e,t,i.pads.length);case 2:return Ml(e,t,i.pads.length);case 3:return Rl(e,t,i.pads.length);default:throw new Error("Invalid mode")}},Bl=(e,t)=>{let i=te.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,n=te.size(i),o=[{type:12,data:n},{type:6,data:t.pads}],l=e.length>=3&&e[2].data;t.mode===0&&o.push({type:l?e[2].dataType:1,data:t.value}),o.push(...Ie(e[0].dims,i));let h=["rank"],c=m=>{let y=Te("output",e[0].dataType,i.length),_=ae("x",e[0].dataType,r.length),v=_.type.value,S=Ol(y,r.length,t),k=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&k.push({name:"constant_value",type:l?v:"f32"}),`
            ${m.registerUniforms(k).declareVariables(_,y)}
            ${m.mainStart()}
            ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${y.offsetToIndices("global_idx")};

            var value = ${v}(0);
            ${S}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${l}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(te.size(i)/64)},programUniforms:o}),getShaderSource:c}},Nl=(e,t)=>{if(e.length>1){let i=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,o=new Int32Array(2*n).fill(0);if(e.length>=4){let h=e[3].getBigInt64Array();for(let c=0;c<h.length;c++)o[Number(h[c])]=Number(i[c]),o[Number(h[c])+n]=Number(i[c+h.length])}else i.forEach((h,c)=>o[Number(c)]=Number(h));let l=[];return o.forEach(h=>l.push(h)),{mode:t.mode,value:r,pads:l}}else return t},Af=(e,t)=>{Il(e.inputs);let i=Nl(e.inputs,t);e.compute(Bl(e.inputs,i),{inputs:[0]})}}),Qr,ss,as,os,us,Dl,jl,ls,ds,Mf,Rf,ps,Of,Bf,hs,Nf,Df,jf,Pf,$g=ce(()=>{Nt(),Ne(),Pe(),qe(),Qr=e=>{if(Je.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},ss=(e,t,i)=>{let r=t.format==="NHWC",n=e.dims.slice();r&&n.splice(1,0,n.pop());let o=Object.hasOwnProperty.call(t,"dilations"),l=t.kernelShape.slice(),h=t.strides.slice(),c=o?t.dilations.slice():[],m=t.pads.slice();Gi.adjustPoolAttributes(i,n,l,h,c,m);let y=Gi.computePoolOutputShape(i,n,h,c,l,m,t.autoPad),_=Object.assign({},t);o?Object.assign(_,{kernelShape:l,strides:h,pads:m,dilations:c,cacheKey:t.cacheKey}):Object.assign(_,{kernelShape:l,strides:h,pads:m,cacheKey:t.cacheKey});let v=y.slice();return v.push(v.splice(1,1)[0]),[_,r?v:y]},as=(e,t)=>{let i=t.format==="NHWC",r=te.size(e),n=te.size(t.kernelShape),o=[{type:12,data:r},{type:12,data:n}],l=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let h=t.kernelShape[t.kernelShape.length-1],c=t.strides[t.strides.length-1],m=t.pads[t.pads.length/2-1],y=t.pads[t.pads.length-1],_=!!(m+y);o.push({type:12,data:h},{type:12,data:c},{type:12,data:m},{type:12,data:y}),l.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let v=!1;if(t.kernelShape.length===2){let S=t.kernelShape[t.kernelShape.length-2],k=t.strides[t.strides.length-2],E=t.pads[t.pads.length/2-2],N=t.pads[t.pads.length-2];v=!!(E+N),o.push({type:12,data:S},{type:12,data:k},{type:12,data:E},{type:12,data:N}),l.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[o,l,!0,_,v]}else{if(i)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let h=te.computeStrides(t.kernelShape);o.push({type:12,data:h},{type:12,data:t.pads},{type:12,data:t.strides}),l.push({name:"kernelStrides",type:"u32",length:h.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let c=t.pads.reduce((m,y)=>m+y);return[o,l,!!c,!1,!1]}},os=(e,t,i,r,n,o,l,h,c,m,y,_)=>{let v=n.format==="NHWC",S=t.type.value,k=Te("output",t.type.tensor,r);if(n.kernelShape.length<=2){let E="",N="",I="",T=i-(v?2:1);if(y?E=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${T}] < 0 || xIndices[${T}]
                      >= uniforms.x_shape[${T}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${o}
                }`:E=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${o}
                }`,n.kernelShape.length===2){let j=i-(v?3:2);_?N=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${j}] = indices[${j}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${j}] < 0 || xIndices[${j}] >= uniforms.x_shape[${j}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:N=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${j}] = indices[${j}] * uniforms.sh - uniforms.phStart + j;
                `,I=`
              }
            `}return`
            ${e.registerUniforms(c).declareVariables(t,k)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${k.offsetToIndices("global_idx")};
              var xIndices = ${k.offsetToIndices("global_idx")};

              var value = ${S}(${h});
              var pad = 0;
              ${N}
              ${E}
              ${I}
              ${l}

              output[global_idx] = value;
            }`}else{if(v)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let E=n.kernelShape.length,N=n.pads.length,I="";return m?I=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${o}
              }`:I=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${o}
            `,`
            ${e.registerUniforms(c).declareVariables(t,k)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${k.offsetToIndices("global_idx")};
              var xIndices = ${k.offsetToIndices("global_idx")};

              var offsets: array<u32, ${E}>;

              var value = ${S}(${h});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${E-1}u; j++) {
                  offsets[j] = offset / ${Ee("uniforms.kernelStrides","j",E)};
                  offset -= offsets[j] * ${Ee("uniforms.kernelStrides","j",E)};
                }
                offsets[${E-1}] = offset;

                isPad = false;
                for (var j = ${i-E}u; j < ${i}u; j++) {
                  xIndices[j] = indices[j] * ${Ee("uniforms.strides",`j - ${i-E}u`,E)}
                    + offsets[j - ${i-E}u] - ${Ee("uniforms.pads","j - 2u",N)};
                  ${I}
              }
              ${l}

              output[global_idx] = value;
            }`}},us=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Dl=e=>`${us(e)};${e.countIncludePad}`,jl=e=>`${us(e)};${e.storageOrder};${e.dilations}`,ls=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ds=(e,t,i,r)=>{let[n,o]=ss(t,r,i),l=ae("x",t.dataType,t.dims.length),h=l.type.value,c="value += x_val;",m="";n.countIncludePad?m+=`value /= ${h}(uniforms.kernelSize);`:m+=`value /= ${h}(i32(uniforms.kernelSize) - pad);`;let[y,_,v,S,k]=as(o,n);y.push(...Ie(t.dims,o));let E=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${v};${S};${k}`,inputDependencies:E},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(te.size(o)/64)},programUniforms:y}),getShaderSource:N=>os(N,l,t.dims.length,o.length,n,c,m,0,_,v,S,k)}},Mf=e=>{let t=e.count_include_pad!==0,i=ls(e);if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...i,cacheKey:""};return{...r,cacheKey:Dl(r)}},Rf=(e,t)=>{Qr(e.inputs),e.compute(ds("AveragePool",e.inputs[0],!1,t))},ps={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Of=e=>{let t=e.format;return{format:t,...ps,cacheKey:t}},Bf=(e,t)=>{Qr(e.inputs),e.compute(ds("GlobalAveragePool",e.inputs[0],!0,t))},hs=(e,t,i,r)=>{let[n,o]=ss(t,r,i),l=`
      value = max(x_val, value);
    `,h="",c=ae("x",t.dataType,t.dims.length),m=["rank"],[y,_,v,S,k]=as(o,n);return y.push(...Ie(t.dims,o)),{name:e,shaderCache:{hint:`${r.cacheKey};${v};${S};${k}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(te.size(o)/64)},programUniforms:y}),getShaderSource:E=>os(E,c,t.dims.length,o.length,n,l,h,t.dataType===10?-65504:-1e5,_,v,S,k)}},Nf=(e,t)=>{Qr(e.inputs),e.compute(hs("MaxPool",e.inputs[0],!1,t))},Df=e=>{let t=e.storage_order,i=e.dilations,r=ls(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let n={storageOrder:t,dilations:i,...r,cacheKey:""};return{...n,cacheKey:jl(n)}},jf=e=>{let t=e.format;return{format:t,...ps,cacheKey:t}},Pf=(e,t)=>{Qr(e.inputs),e.compute(hs("GlobalMaxPool",e.inputs[0],!0,t))}}),Pl,ql,qf,Uf,xg=ce(()=>{Ne(),Pe(),ut(),qe(),Pl=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((i,r)=>i===e[2].dims[r]).reduce((i,r)=>i&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,o)=>o===t.axis||n===e[0].dims[o]).reduce((n,o)=>n&&o,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let i=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(i/r)||t.blockSize>Math.ceil(i/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},ql=(e,t)=>{let i=te.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,n=r===3,o=e[0].dims,l=e[1].dataType,h=te.size(o),c=r===3||r===2,m=c?[Math.ceil(te.size(e[0].dims)/4)]:e[0].dims,y=e[1].dims,_=e.length>2?e[2]:void 0,v=_?c?[Math.ceil(te.size(_.dims)/4)]:_.dims:void 0,S=y.length===0||y.length===1&&y[0]===1,k=S===!1&&y.length===1,E=ot(h),N=S&&(!c||E===4),I=N?E:1,T=N&&!c?E:1,j=ae("input",c?12:r,m.length,T),B=ae("scale",l,y.length),W=_?ae("zero_point",c?12:r,v.length):void 0,Q=Te("output",l,o.length,I),X=[j,B];W&&X.push(W);let ie=[m,y];_&&ie.push(v);let fe=[{type:12,data:h/I},{type:12,data:i},{type:12,data:t.blockSize},...Ie(...ie,o)],_e=xe=>{let ke=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${xe.registerUniforms(ke).declareVariables(...X,Q)}
      ${xe.mainStart()}
          ${xe.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${Q.offsetToIndices("global_idx")};

          // Set input x
          ${c?`
            let input = ${j.getByOffset("global_idx / 4")};
            let x_vec = ${n?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${I===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${j.getByOffset("global_idx")};`};

          // Set scale input
          ${S?`let scale_value= ${B.getByOffset("0")}`:k?`
            let scale_index = ${Q.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${B.getByOffset("scale_index")};`:`
            var scale_indices: ${B.type.indices} = output_indices;
            let index = ${B.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${B.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${B.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${W?S?c?`
                let zero_point_input = ${W.getByOffset("0")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${W.getByOffset("0")}`:k?c?`
                let zero_point_index = ${Q.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${W.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${Q.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${W.getByOffset("zero_point_index")};`:c?`
                let zero_point_offset = ${B.indicesToOffset("scale_indices")};
                let zero_point_input = ${W.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${W.getByIndices("scale_indices")};`:`let zero_point_value = ${c?n?"i32":"u32":j.type.value}(0);`};
      // Compute and write output
      ${Q.setByOffset("global_idx",`${Q.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:W?["rank","rank","rank"]:["rank","rank"]},getShaderSource:_e,getRunData:()=>({outputs:[{dims:o,dataType:l}],dispatchGroup:{x:Math.ceil(h/I/64),y:1,z:1},programUniforms:fe})}},qf=(e,t)=>{Pl(e.inputs,t),e.compute(ql(e.inputs,t))},Uf=e=>Xe({axis:e.axis,blockSize:e.blockSize})}),Ul,Ll,Lf,Sg=ce(()=>{Nt(),Ne(),qe(),Ul=(e,t,i)=>{let r=e===t,n=e<t&&i<0,o=e>t&&i>0;if(r||n||o)throw new Error("Range these inputs' contents are invalid.")},Ll=(e,t,i,r)=>{let n=Math.abs(Math.ceil((t-e)/i)),o=[n],l=n,h=[{type:12,data:l},{type:r,data:e},{type:r,data:i},...Ie(o)],c=m=>{let y=Te("output",r,o.length),_=y.type.value,v=[{name:"outputSize",type:"u32"},{name:"start",type:_},{name:"delta",type:_}];return`
        ${m.registerUniforms(v).declareVariables(y)}
        ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${_}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:c,getRunData:()=>({outputs:[{dims:o,dataType:r}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h})}},Lf=e=>{let t=0,i=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],i=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],i=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),Je.webgpu.validateInputContent&&Ul(t,i,r),e.compute(Ll(t,i,r,e.inputs[0].dataType),{inputs:[]})}}),Fl,Wl,Ff,Wf,kg=ce(()=>{Ne(),Pe(),ut(),qe(),Fl=(e,t,i,r)=>{if(e!=="none"&&r!=="i32"&&r!=="u32"&&r!=="f32")throw new Error(`Input ${r} is not supported with reduction ${e}.`);let n=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,o=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${i};`;case"add":return r==="i32"||r==="u32"?`atomicAdd(&${t}, bitcast<${r}>(${i}));`:`
              ${n}bitcast<${r}>(oldValue) + (${i})${o}`;case"max":return r==="i32"||r==="u32"?`atomicMax(&${t}, bitcast<${r}>(${i}));`:`
                ${n}max(bitcast<f32>(oldValue), (${i}))${o}`;case"min":return r==="i32"||r==="u32"?`atomicMin(&${t}, bitcast<${r}>(${i}));`:`${n}min(bitcast<${r}>(oldValue), (${i}))${o}`;case"mul":return`${n}(bitcast<${r}>(oldValue) * (${i}))${o}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Wl=(e,t)=>{let i=e[0].dims,r=e[1].dims,n=i,o=1,l=Math.ceil(te.sizeToDimension(r,r.length-1)/o),h=r[r.length-1],c=te.sizeFromDimension(i,h),m=[{type:12,data:l},{type:12,data:h},{type:12,data:c},...Ie(e[1].dims,e[2].dims,n)],y=_=>{let v=ae("indices",e[1].dataType,e[1].dims.length),S=ae("updates",e[2].dataType,e[2].dims.length,o),k=t.reduction!=="none"&&t.reduction!==""?wp("output",e[0].dataType,n.length):Te("output",e[0].dataType,n.length,o);return`
      ${_.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(v,S,k)}
      ${_.mainStart()}
        ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${Fl(t.reduction,"output[data_offset + i]","value",k.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:m}),getShaderSource:y}},Ff=e=>Xe({reduction:e.reduction}),Wf=(e,t)=>{e.compute(Wl(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Vl,Gl,Kl,fs,Hl,Zl,Xl,Yl,Ql,Jl,ed,td,cs,rd,id,nd,sd,ad,Vf,Gf,Cg=ce(()=>{Ne(),Pe(),ut(),qe(),Vl=(e,t)=>{if(e.every(i=>i>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Gl=(e,t,i)=>{t.every(n=>n>=0&&n<i||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(i).fill(1);return t.forEach((n,o)=>r[n]=e[o]),r},Kl=(e,t,i,r,n,o)=>{let[l,h,c]=i>10?[1,2,3]:[-1,e.length>1?1:-1,-1],m=e[0].dims.length;if(l>0&&e.length>l&&e[l].dims.length>0)e[l].getFloat32Array().forEach(y=>o.push(y));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(h>0&&e.length>h&&e[h].dims.length===1&&e[h].dims[0]>0){if(e[h].getFloat32Array().forEach(y=>r.push(y)),r.length!==0&&r.length!==m&&i>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Vl(r,t),t.axes.length>0&&Gl(r,t.axes,m).forEach((y,_)=>r[_]=y)}if(c>0&&e.length>c&&e[c].dims.length===1&&e[c].dims[0]>0&&(e[c].getBigInt64Array().forEach(y=>n.push(Number(y))),n.length!==0&&n.length!==m&&i>=18&&n.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof n<"u"&&r.length>0&&n.length>m)throw new Error("Resize requires only of scales or sizes to be specified")},fs=(e,t,i,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${i}));
  let fract = ${r}(big % (${i})) / ${r}(${i});
  return whole + fract;
`,Hl=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${fs("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${fs("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Zl=(e,t,i)=>`fn getNearestPixelFromOriginal(xOriginal: ${i}, isDownSample: bool) -> ${i} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Xl=(e,t,i)=>{let r=new Array(i).fill(0).concat(new Array(i).fill(1)),n=e.length===0?r:e.slice();return t.length>0?(t.forEach((o,l)=>{r[o]=n[l],r[l+i]=n[t.length+l]}),r):n},Yl=(e,t,i,r)=>{let n=[];if(i.length>0)if(r.length>0){if(e.forEach(o=>n.push(o)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((o,l)=>n[o]=i[l])}else i.forEach(o=>n.push(o));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");n=e.map((o,l)=>Math.round(o*t[l]))}return n},Ql=(e,t,i)=>{let r=(()=>{switch(i.keepAspectRatioPolicy){case"not_larger":return i.axes.length>0?Math.min(...i.axes.map(o=>t[o]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return i.axes.length>0?Math.max(...i.axes.map(o=>t[o]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${i.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let n=e.slice();return i.axes.length>0?(i.axes.forEach(o=>t[o]=r),i.axes.forEach(o=>n[o]=Math.round(e[o]*t[o]))):(t.fill(r,0,t.length),n.forEach((o,l)=>n[l]=Math.round(o*t[l]))),n},Jl=(e,t,i,r,n)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${i.length}> {
      var original_indices: array<${e.type.value}, ${i.length}>;
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${Ee("uniforms.scales","i",r)};
        var roi_low = ${Ee("uniforms.roi","i",n)};
        var roi_hi = ${Ee("uniforms.roi",`i + ${t.length}`,n)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${Ee("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${Ee("uniforms.output_shape","i",i.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,ed=(e,t,i,r,n,o,l)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${Ee("uniforms.scales","i",n)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Ee("uniforms.roi","i",o)};
          var roi_hi = ${Ee("uniforms.roi",`i + ${i.length}`,o)};
          var input_shape_i = ${Ee("uniforms.input_shape","i",i.length)};
          var output_shape_i = ${Ee("uniforms.output_shape","i",r.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${l} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,td=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${Ee("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,cs=(e,t,i,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",i,"batch")};
`:"",rd=(e,t,i,r,n)=>{let[o,l,h,c]=i.length===2?[-1,0,1,-1]:[0,2,3,1],m=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${m} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",l,`max(0, min(row, ${i[l]} - 1))`)};
      ${e.indicesSet("input_indices",h,`max(0, min(col, ${i[h]} - 1))`)};
      ${cs(e,c,o,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${m} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${m} = originalIndices[${l}];
      var col:${m} = originalIndices[${h}];
      ${r?`if (row < 0 || row > (${i[l]} - 1) || col < 0 || col > (${i[h]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${i[l]} - 1));
      col = max(0, min(col, ${i[h]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${i.length>2?`u32(originalIndices[${c}])`:"0"};
      var batch: u32 =  ${i.length>2?`u32(originalIndices[${o}])`:"0"};
      var x11: ${m} = getInputValue(batch, channel, row1, col1);
      var x12: ${m} = getInputValue(batch, channel, row1, col2);
      var x21: ${m} = getInputValue(batch, channel, row2, col1);
      var x22: ${m} = getInputValue(batch, channel, row2, col2);
      var dx1: ${m} = abs(row - ${m}(row1));
      var dx2: ${m} = abs(${m}(row2) - row);
      var dy1: ${m} = abs(col - ${m}(col1));
      var dy2: ${m} = abs(${m}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},id=(e,t,i,r,n,o,l,h,c,m)=>{let y=i.length===2,[_,v]=y?[0,1]:[2,3],S=e.type.value,k=E=>{let N=E===_?"row":"col";return`
      fn ${N}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${S} {
        var output_index = ${t.indicesGet("output_indices",E)};
        var originalIdx: ${S} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[E]},
        ${r[E]}, ${i[E]}, ${o[E]}, ${o[E]} + ${i.length});
        var fractOriginalIdx: ${S} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${h} && (originalIdx < 0 || originalIdx > (${i[E]} - 1))) {
          return ${c};
        }
        var data: array<${S}, 4> = array<${S}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${N}: ${S} = originalIdx + ${S}(i);
          if (${N} < 0 || ${N} >= ${i[E]}) {
            ${m?`coefs[i + 1] = 0.0;
                        continue;`:h?`return ${c};`:`${N} = max(0, min(${N}, ${i[E]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",E,`u32(${N})`)};
          data[i + 1] = ${E===_?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${k(_)};
    ${k(v)};
  fn getCubicInterpolationCoefs(s: ${S}) -> array<${S}, 4> {
    var absS = abs(s);
    var coeffs: array<${S}, 4> = array<${S}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${S} = 1.0 - absS;
    var twoMinusAbsS: ${S} = 2.0 - absS;
    var onePlusAbsS: ${S} = 1.0 + absS;
    coeffs[0] = ((${l} * onePlusAbsS - 5 * ${l}) * onePlusAbsS + 8 * ${l}) * onePlusAbsS - 4 * ${l};
    coeffs[1] = ((${l} + 2) * absS - (${l} + 3)) * absS * absS + 1;
    coeffs[2] = ((${l} + 2) * oneMinusAbsS - (${l} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${l} * twoMinusAbsS - 5 * ${l}) * twoMinusAbsS + 8 * ${l}) * twoMinusAbsS - 4 * ${l};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${S}, 4>, coefs: array<${S}, 4>) -> ${S} {
    var coefsSum: ${S} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${S} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},nd=(e,t,i,r,n)=>{let[o,l,h,c,m]=i.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],y=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${y} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",l,`max(0, min(depth, ${i[l]} - 1))`)};
      ${e.indicesSet("input_indices",h,`max(0, min(height, ${i[h]} - 1))`)};
      ${e.indicesSet("input_indices",c,`max(0, min(width, ${i[c]} - 1))`)};
      ${cs(e,m,o,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${y} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${y} = originalIndices[${l}];
      var height:${y} = originalIndices[${h}];
      var width:${y} = originalIndices[${c}];
      ${r?`if (depth < 0 || depth > (${i[l]} - 1) || height < 0 || height > (${i[h]} - 1) || width < 0 || (width > ${i[c]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${i[l]} - 1));
      height = max(0, min(height, ${i[h]} - 1));
      width = max(0, min(width, ${i[c]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${i.length>3?`u32(originalIndices[${m}])`:"0"};
      var batch: u32 =  ${i.length>3?`u32(originalIndices[${o}])`:"0"};

      var x111: ${y} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${y} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${y} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${y} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${y} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${y} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${y} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${y} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${y} = abs(depth - ${y}(depth1));
      var dx2: ${y} = abs(${y}(depth2) - depth);
      var dy1: ${y} = abs(height - ${y}(height1));
      var dy2: ${y} = abs(${y}(height2) - height);
      var dz1: ${y} = abs(width - ${y}(width1));
      var dz2: ${y} = abs(${y}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},sd=(e,t,i,r,n,o)=>{let l=e.dims,h=Xl(o,t.axes,l.length),c=Yl(l,r,n,t.axes),m=r.slice();r.length===0&&(m=l.map((T,j)=>T===0?1:c[j]/T),t.keepAspectRatioPolicy!=="stretch"&&(c=Ql(l,m,t)));let y=Te("output",e.dataType,c.length),_=ae("input",e.dataType,l.length),v=te.size(c),S=l.length===c.length&&l.every((T,j)=>T===c[j]),k=t.coordinateTransformMode==="tf_crop_and_resize",E=t.extrapolationValue,N=_.type.value,I=T=>`
      ${S?"":`
      ${Hl(t.coordinateTransformMode,N)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${td(_,l)};
              ${Zl(t.nearestMode,i,N)};
              ${ed(_,y,l,c,m.length,h.length,k)};
              `;case"linear":return`
              ${Jl(y,l,c,m.length,h.length)};
              ${(()=>{if(l.length===2||l.length===4)return`${rd(_,y,l,k,E)}`;if(l.length===3||l.length===5)return`${nd(_,y,l,k,E)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(l.length===2||l.length===4)return`${id(_,y,l,c,m,h,t.cubicCoeffA,k,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${T.registerUniform("output_size","u32").registerUniform("scales","f32",m.length).registerUniform("roi","f32",h.length).declareVariables(_,y)}
      ${T.mainStart()}
        ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${S?"output[global_idx] = input[global_idx];":`
        let output_indices = ${y.offsetToIndices("global_idx")};
        var input_indices: ${_.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${_.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${l.length===2||l.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${i}|${m.length>0?t.mode==="cubic"?m:m.length:""}|${n.length>0?n:""}|${h.length>0?h:""}|${S}|${t.mode==="nearest"?l.length:l}`,inputDependencies:["rank"]},getShaderSource:I,getRunData:()=>({outputs:[{dims:c,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:[{type:12,data:v},{type:1,data:m},{type:1,data:h},...Ie(l,c)]})}},ad=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Vf=(e,t)=>{let i=[],r=[],n=[],o=ad(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Kl(e.inputs,t,o,i,r,n),e.compute(sd(e.inputs[0],t,o,i,r,n),{inputs:[0]})},Gf=e=>{let t=e.antialias,i=e.axes,r=e.coordinateTransformMode,n=e.cubicCoeffA,o=e.excludeOutside!==0,l=e.extrapolationValue,h=e.keepAspectRatioPolicy,c=e.mode,m=e.nearestMode===""?"simple":e.nearestMode;return Xe({antialias:t,axes:i,coordinateTransformMode:r,cubicCoeffA:n,excludeOutside:o,extrapolationValue:l,keepAspectRatioPolicy:h,mode:c,nearestMode:m})}}),od,ud,Kf,Tg=ce(()=>{Ne(),Pe(),qe(),od=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],i=e[1],r=e[2];if(t.dataType!==i.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(i.dims.length!==3&&i.dims.length!==2)throw new Error("Skip must be 2D or 3D");let n=t.dims[t.dims.length-1],o=t.dims[t.dims.length-2];if(i.dims[i.dims.length-1]!==n)throw new Error("Skip must have the same hidden size as input");if(i.dims[i.dims.length-2]!==o)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==n)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let l=e[3];if(l.dims.length!==1)throw new Error("Beta must be 1D");if(l.dims[l.dims.length-1]!==n)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let l=e[4];if(l.dims.length!==1)throw new Error("Bias must be 1D");if(l.dims[l.dims.length-1]!==n)throw new Error("Bias must have the same hidden size as input")}},ud=(e,t,i,r)=>{let n=t.simplified,o=e[0].dims,l=te.size(o),h=o,c=l,m=o.slice(-1)[0],y=r?o.slice(0,-1).concat(1):[],_=!n&&e.length>3,v=e.length>4,S=r&&i>1,k=r&&i>2,E=i>3,N=64,I=ot(m),T=[{type:12,data:c},{type:12,data:I},{type:12,data:m},{type:1,data:t.epsilon}],j=W=>{let Q=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],X=[ae("x",e[0].dataType,e[0].dims,I),ae("skip",e[1].dataType,e[1].dims,I),ae("gamma",e[2].dataType,e[2].dims,I)];_&&X.push(ae("beta",e[3].dataType,e[3].dims,I)),v&&X.push(ae("bias",e[4].dataType,e[4].dims,I)),X.push(Te("output",e[0].dataType,h,I)),S&&X.push(Te("mean_output",1,y)),k&&X.push(Te("inv_std_output",1,y)),E&&X.push(Te("input_skip_bias_sum",e[0].dataType,h,I));let ie=gt(e[0].dataType),fe=gt(1,I);return`

      ${W.registerUniforms(Q).declareVariables(...X)}
      var<workgroup> sum_shared : array<${fe}, ${N}>;
      var<workgroup> sum_squared_shared : array<${fe}, ${N}>;

      ${W.mainStart([N,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${N};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${N};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${N-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${v?"bias[offset1d + i]":ie+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${E?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Mr(ie,I,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${N};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${sr("sum",I)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${sr("square_sum",I)} / f32(uniforms.hidden_size) ${n?"":"- mean * mean"} + uniforms.epsilon);
        ${S?"mean_output[global_idx] = mean;":""}
        ${k?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${n?"":`- ${ie}(mean)`}) *
            ${ie}(inv_std_dev) * gamma[offset1d + i]
            ${_?"+ beta[offset1d + i]":""};
        }
      }`},B=[{dims:h,dataType:e[0].dataType}];return i>1&&B.push({dims:y,dataType:1}),i>2&&B.push({dims:y,dataType:1}),i>3&&B.push({dims:o,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${I};${S};${k};${E}`,inputDependencies:e.map((W,Q)=>"type")},getShaderSource:j,getRunData:()=>({outputs:B,dispatchGroup:{x:Math.ceil(c/m)},programUniforms:T})}},Kf=(e,t)=>{od(e.inputs);let i=[0];e.outputCount>1&&i.push(-3),e.outputCount>2&&i.push(-3),e.outputCount>3&&i.push(3),e.compute(ud(e.inputs,t,e.outputCount,!1),{outputs:i})}}),ld,Jr,dd,ms,pd,hd,Hf,Zf,Eg=ce(()=>{Ne(),Pe(),ut(),qe(),ld=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((i,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},Jr=(e,t)=>{let i=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>i.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>i.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return i},dd=(e,t)=>{if(e.length>1){let i=Jr(e,1),r=Jr(e,2),n=Jr(e,3);return n.length===0&&(n=[...Array(e[0].dims.length).keys()]),Xe({starts:i,ends:r,axes:n})}else return t},ms=(e,t,i,r,n)=>{let o=e;return e<0&&(o+=i[r[t]]),n[t]<0?Math.max(0,Math.min(o,i[r[t]]-1)):Math.max(0,Math.min(o,i[r[t]]))},pd=(e,t,i)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${i.length-1}; i >= 0; i--) {
            let input_shape_i = ${Ee("uniforms.input_shape","i",i.length)};
            let steps_i = ${Ee("uniforms.steps","i",i.length)};
            let signs_i = ${Ee("uniforms.signs","i",i.length)};
            let starts_i = ${Ee("uniforms.starts","i",i.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,hd=(e,t)=>{let i=e[0].dims,r=te.size(i),n=t.axes.length>0?te.normalizeAxes(t.axes,i.length):[...Array(i.length).keys()],o=Jr(e,4);o.forEach(I=>I!==0||(()=>{throw new Error("step cannot be 0")})),o.length===0&&(o=Array(n.length).fill(1));let l=t.starts.map((I,T)=>ms(I,T,i,n,o)),h=t.ends.map((I,T)=>ms(I,T,i,n,o));if(n.length!==l.length||n.length!==h.length)throw new Error("start, ends and axes should have the same number of elements");if(n.length!==i.length)for(let I=0;I<i.length;++I)n.includes(I)||(l.splice(I,0,0),h.splice(I,0,i[I]),o.splice(I,0,1));let c=o.map(I=>Math.sign(I));o.forEach((I,T,j)=>{if(I<0){let B=(h[T]-l[T])/I,W=l[T],Q=W+B*o[T];l[T]=Q,h[T]=W,j[T]=-I}});let m=i.slice(0);n.forEach((I,T)=>{m[I]=Math.ceil((h[I]-l[I])/o[I])});let y={dims:m,dataType:e[0].dataType},_=Te("output",e[0].dataType,m.length),v=ae("input",e[0].dataType,e[0].dims.length),S=te.size(m),k=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:l.length},{name:"signs",type:"i32",length:c.length},{name:"steps",type:"u32",length:o.length}],E=[{type:12,data:S},{type:12,data:l},{type:6,data:c},{type:12,data:o},...Ie(e[0].dims,m)],N=I=>`
      ${I.registerUniforms(k).declareVariables(v,_)}
        ${pd(v,_,i)}
        ${I.mainStart()}
          ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${_.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${_.setByOffset("global_idx",v.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${c.length}_${l.length}_${o.length}`,inputDependencies:["rank"]},getShaderSource:N,getRunData:()=>({outputs:[y],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:E})}},Hf=(e,t)=>{ld(e.inputs,t);let i=dd(e.inputs,t);e.compute(hd(e.inputs,i),{inputs:[0]})},Zf=e=>{let t=e.starts,i=e.ends,r=e.axes;return Xe({starts:t,ends:i,axes:r})}}),fd,cd,Xf,Yf,Ig=ce(()=>{Ne(),Pe(),ut(),ar(),qe(),fd=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},cd=(e,t)=>{let i=e.inputs[0],r=i.dims,n=te.size(r),o=r.length,l=te.normalizeAxis(t.axis,o),h=l<r.length-1,c,m=[];h?(m=Array.from({length:o},(X,ie)=>ie),m[l]=o-1,m[o-1]=l,c=e.compute(Mt(i,m),{inputs:[i],outputs:[-1]})[0]):c=i;let y=c.dims,_=y[o-1],v=n/_,S=ot(_),k=_/S,E=64;v===1&&(E=256);let N=(X,ie)=>ie===4?`max(max(${X}.x, ${X}.y), max(${X}.z, ${X}.w))`:ie===2?`max(${X}.x, ${X}.y)`:ie===3?`max(max(${X}.x, ${X}.y), ${X}.z)`:X,I=ae("x",c.dataType,c.dims,S),T=Te("result",c.dataType,c.dims,S),j=I.type.value,B=gt(c.dataType)==="f32"?`var threadMax = ${j}(-3.402823e+38f);`:`var threadMax = ${j}(-65504.0h);`,W=X=>`
      var<workgroup> rowMaxShared : ${j};
      var<workgroup> rowSumShared : ${j};
      var<workgroup> threadShared : array<${j}, ${E}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${j} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${j}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${X.registerUniform("packedCols","i32").declareVariables(I,T)}
      ${X.mainStart(E)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${E};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${B}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${j}(${N("threadShared[0]",S)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${j}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${j}(${sr("threadShared[0]",S)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${j}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,Q=e.compute({name:"Softmax",shaderCache:{hint:`${S};${E}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:y,dataType:c.dataType}],dispatchGroup:{x:v},programUniforms:[{type:6,data:k}]}),getShaderSource:W},{inputs:[c],outputs:[h?-1:0]})[0];h&&e.compute(Mt(Q,m),{inputs:[Q]})},Xf=(e,t)=>{fd(e.inputs),cd(e,t)},Yf=e=>Xe({axis:e.axis})}),gs,md,gd,wd,Qf,zg=ce(()=>{Ne(),Pe(),qe(),gs=e=>Array.from(e.getBigInt64Array(),Number),md=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(gs(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},gd=(e,t)=>{let i=[];for(let r=0;r<e.length;++r)i.push(e[r]*t[r]);return i},wd=(e,t)=>{let i=e[0].dims,r=t??gs(e[1]),n=gd(i,r),o=te.size(n),l=e[0].dataType,h=ae("input",l,i.length),c=Te("output",l,n.length),m=y=>`
      const inputShape = ${h.indices(...i)};
      ${y.registerUniform("output_size","u32").declareVariables(h,c)}
      ${y.mainStart()}
      ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${c.offsetToIndices("global_idx")};
      var input_indices: ${h.type.indices};
      for (var i = 0; i < ${i.length}; i++) {
        let input_dim_i = ${h.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${c.indicesGet("output_indices","i")}  % input_dim_i;

        ${h.indicesSet("input_indices","i","input_dim_value")}
      }
      ${c.setByOffset("global_idx",h.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},...Ie(e[0].dims,n)]}),getShaderSource:m}},Qf=e=>{md(e.inputs),e.compute(wd(e.inputs),{inputs:[0]})}}),yd,_d,Jf,Ag=ce(()=>{Ne(),Pe(),qe(),yd=(e,t,i,r,n)=>{let o=Te("output_data",n,i.length,4),l=ae("a_data",t[1].dataType,t[1].dims.length,4),h=ae("b_data",t[2].dataType,t[2].dims.length,4),c=ae("c_data",t[0].dataType,t[0].dims.length,4),m,y=(_,v,S)=>`select(${v}, ${_}, ${S})`;if(!r)m=o.setByOffset("global_idx",y(l.getByOffset("global_idx"),h.getByOffset("global_idx"),c.getByOffset("global_idx")));else{let _=(v,S,k="")=>{let E=`a_data[index_a${S}][component_a${S}]`,N=`b_data[index_b${S}][component_b${S}]`,I=`bool(c_data[index_c${S}] & (0xffu << (component_c${S} * 8)))`;return`
            let output_indices${S} = ${o.offsetToIndices(`global_idx * 4u + ${S}u`)};
            let offset_a${S} = ${l.broadcastedIndicesToOffset(`output_indices${S}`,o)};
            let offset_b${S} = ${h.broadcastedIndicesToOffset(`output_indices${S}`,o)};
            let offset_c${S} = ${c.broadcastedIndicesToOffset(`output_indices${S}`,o)};
            let index_a${S} = offset_a${S} / 4u;
            let index_b${S} = offset_b${S} / 4u;
            let index_c${S} = offset_c${S} / 4u;
            let component_a${S} = offset_a${S} % 4u;
            let component_b${S} = offset_b${S} % 4u;
            let component_c${S} = offset_c${S} % 4u;
            ${v}[${S}] = ${k}(${y(E,N,I)});
          `};n===9?m=`
            var data = vec4<u32>(0);
            ${_("data",0,"u32")}
            ${_("data",1,"u32")}
            ${_("data",2,"u32")}
            ${_("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:m=`
            ${_("output_data[global_idx]",0)}
            ${_("output_data[global_idx]",1)}
            ${_("output_data[global_idx]",2)}
            ${_("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(c,l,h,o)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${m}
      }`},_d=e=>{let t=e[1].dims,i=e[2].dims,r=e[0].dims,n=e[1].dataType,o=!(te.areEqual(t,i)&&te.areEqual(i,r)),l=t,h=te.size(t);if(o){let m=Rr.calcShape(Rr.calcShape(t,i,!1),r,!1);if(!m)throw new Error("Can't perform where op on the given tensors");l=m,h=te.size(l)}let c=Math.ceil(h/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:m=>yd(m,e,l,o,n),getRunData:()=>({outputs:[{dims:l,dataType:n}],dispatchGroup:{x:Math.ceil(h/64/4)},programUniforms:[{type:12,data:c},...Ie(r,t,i,l)]})}},Jf=e=>{e.compute(_d(e.inputs))}}),ec,Mg=ce(()=>{Gm(),Qs(),Km(),Hm(),Zm(),Xm(),Ym(),rg(),ng(),sg(),ag(),og(),ug(),lg(),dg(),pg(),hg(),fg(),cg(),mg(),gg(),wg(),yg(),_g(),bg(),_f(),vg(),$g(),xg(),Sg(),kg(),Ys(),Cg(),Sf(),Tg(),Eg(),Ig(),$f(),zg(),ar(),Js(),Ag(),ec=new Map([["Abs",[Gp]],["Acos",[Kp]],["Acosh",[Hp]],["Add",[Eh]],["ArgMax",[Lp,Es]],["ArgMin",[Up,Es]],["Asin",[Zp]],["Asinh",[Xp]],["Atan",[Yp]],["Atanh",[Qp]],["Attention",[Fp]],["AveragePool",[Rf,Mf]],["BatchNormalization",[Wp]],["BiasAdd",[Vp]],["BiasSplitGelu",[Th]],["Cast",[eh,Jp]],["Ceil",[rh]],["Clip",[th]],["Concat",[jh,Ph]],["Conv",[Os,Rs]],["ConvTranspose",[Zh,Hh]],["Cos",[ih]],["Cosh",[nh]],["CumSum",[Xh,Yh]],["DepthToSpace",[Qh,Jh]],["DequantizeLinear",[qf,Uf]],["Div",[Ih]],["Einsum",[ef,tf]],["Elu",[sh,ni]],["Equal",[zh]],["Erf",[ah]],["Exp",[oh]],["Expand",[rf]],["FastGelu",[nf]],["Floor",[uh]],["FusedConv",[Os,Rs]],["Gather",[af,sf]],["GatherElements",[hf,pf]],["GatherBlockQuantized",[lf,df]],["GatherND",[of,uf]],["Gelu",[lh]],["Gemm",[cf,ff]],["GlobalAveragePool",[Bf,Of]],["GlobalMaxPool",[Pf,jf]],["Greater",[Oh]],["GreaterOrEqual",[Nh]],["GridSample",[mf,gf]],["GroupQueryAttention",[kf]],["HardSigmoid",[wh,gh]],["InstanceNormalization",[Cf]],["LayerNormalization",[Tf]],["LeakyRelu",[dh,ni]],["Less",[Bh]],["LessOrEqual",[Dh]],["Log",[kh]],["MatMul",[Ef]],["MatMulNBits",[If,zf]],["MaxPool",[Nf,Df]],["Mul",[Ah]],["MultiHeadAttention",[yf,wf]],["Neg",[hh]],["Not",[ph]],["Pad",[Af]],["Pow",[Mh]],["QuickGelu",[Ch,ni]],["Range",[Lf]],["Reciprocal",[fh]],["ReduceMin",[Np]],["ReduceMean",[Ap]],["ReduceMax",[Bp]],["ReduceSum",[jp]],["ReduceProd",[Dp]],["ReduceL1",[Mp]],["ReduceL2",[Rp]],["ReduceLogSum",[qp]],["ReduceLogSumExp",[Op]],["ReduceSumSquare",[Pp]],["Relu",[ch]],["Resize",[Vf,Gf]],["RotaryEmbedding",[xf]],["ScatterND",[Wf,Ff]],["Sigmoid",[mh]],["Sin",[yh]],["Sinh",[_h]],["Slice",[Hf,Zf]],["SkipLayerNormalization",[Kf]],["Split",[bf,vf]],["Sqrt",[bh]],["Softmax",[Xf,Yf]],["Sub",[Rh]],["Tan",[vh]],["Tanh",[$h]],["ThresholdedRelu",[Sh,ni]],["Tile",[Qf]],["Transpose",[_p,bp]],["Where",[Jf]]])}),tc,Rg=ce(()=>{Nt(),er(),qe(),tc=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,i,r,n){Ht(e.programInfo.name);let o=this.backend.device,l=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let h=[];for(let m of t)h.push({binding:h.length,resource:{buffer:m.buffer}});for(let m of i)h.push({binding:h.length,resource:{buffer:m.buffer}});n&&h.push({binding:h.length,resource:n});let c=o.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:h,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let m={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:c,dispatchGroup:r};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(m)}l.setPipeline(e.computePipeline),l.setBindGroup(0,c),l.dispatchWorkgroups(...r),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Ft(e.programInfo.name)}dispose(){}build(e,t){Ht(e.name);let i=this.backend.device,r=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(m=>{i.features.has(m.feature)&&r.push(`enable ${m.extension};`)});let n=yp(t,this.backend.device.limits),o=e.getShaderSource(n),l=`${r.join(`
`)}
${n.additionalImplementations}
${o}`,h=i.createShaderModule({code:l,label:e.name});Ge("verbose",()=>`[WebGPU] ${e.name} shader code: ${l}`);let c=i.createComputePipeline({compute:{module:h,entryPoint:"main"},layout:"auto",label:e.name});return Ft(e.name),{programInfo:e,computePipeline:c,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,i=typeof e=="number"?1:e.y||1,r=typeof e=="number"?1:e.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=n&&i<=n&&r<=n)return[t,i,r];let o=t*i*r,l=Math.ceil(Math.sqrt(o));if(l>n){if(l=Math.ceil(Math.cbrt(o)),l>n)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[l,l,l]}else return[l,l,1]}}}),rc={};Br(rc,{WebGpuBackend:()=>ic});var bd,vd,$d,ic,Og=ce(()=>{Nt(),Ne(),er(),fp(),Wm(),Mg(),Rg(),bd=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let i=[];for(let r=0;r<e.length;++r){let n=e[r].dataType;switch(t[r]){case"none":{i.push("");break}case"type":{i.push(`${n}`);break}case"rank":{let o=e[r].dims.length;i.push(`${n};${o}`);break}case"dims":{let o=e[r].dims.join(",");i.push(`${n};${o}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return i.join("|")},vd=(e,t,i)=>{let r=e.name;return e.shaderCache?.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+i+`:${bd(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,r},$d=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},ic=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let i=[],r={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:i},n=o=>t.features.has(o)&&i.push(o)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups"),this.device=await t.requestDevice(r),this.adapterInfo=new $d(t.info||await t.requestAdapterInfo()),this.gpuDataManager=gp(this),this.programManager=new tc(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Ks(e.logLevel,!!e.debug),this.device.onuncapturederror=o=>{o.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${o.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ht(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),i=this.pendingQueries.get(e);for(let r=0;r<t.length/2;r++){let n=i[r],o=n.kernelId,l=this.kernels.get(o),h=l.kernelType,c=l.kernelName,m=n.programName,y=n.inputTensorViews,_=n.outputTensorViews,v=t[r*2],S=t[r*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=v);let k=Number(v-this.queryTimeBase),E=Number(S-this.queryTimeBase);if(!Number.isSafeInteger(k)||!Number.isSafeInteger(E))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:y.map(N=>({dims:N.dims,dataType:Jt(N.dataType)})),outputsMetadata:_.map(N=>({dims:N.dims,dataType:Jt(N.dataType)})),kernelId:o,kernelType:h,kernelName:c,programName:m,startTime:k,endTime:E});else{let N="";y.forEach((T,j)=>{N+=`input[${j}]: [${T.dims}] | ${Jt(T.dataType)}, `});let I="";_.forEach((T,j)=>{I+=`output[${j}]: [${T.dims}] | ${Jt(T.dataType)}, `}),console.log(`[profiling] kernel "${o}|${h}|${c}|${m}" ${N}${I}start time: ${k} ns, execution time: ${E-k} ns`)}Li("GPU",`${m}::${v}::${S}`)}e.unmap(),this.pendingQueries.delete(e)}),Ft()}run(e,t,i,r,n,o){Ht(e.name);let l=[];for(let T=0;T<t.length;++T){let j=t[T].data;if(j===0)continue;let B=this.gpuDataManager.get(j);if(!B)throw new Error(`no GPU data for input: ${j}`);l.push(B)}let{outputs:h,dispatchGroup:c,programUniforms:m}=e.getRunData(t),y=i.length===0?h.map((T,j)=>j):i;if(y.length!==h.length)throw new Error(`Output size ${y.length} must be equal to ${h.length}.`);let _=[],v=[];for(let T=0;T<h.length;++T){if(!Number.isInteger(y[T])||y[T]<-3||y[T]>=o)throw new Error(`Invalid output index: ${y[T]}`);if(y[T]===-3)continue;let j=y[T]===-1,B=y[T]===-2,W=j||B?n(h[T].dataType,h[T].dims):r(y[T],h[T].dataType,h[T].dims);if(_.push(W),W.data===0)continue;let Q=this.gpuDataManager.get(W.data);if(!Q)throw new Error(`no GPU data for output: ${W.data}`);if(j&&this.temporaryData.push(Q),B){let X=this.kernelPersistentData.get(this.currentKernelId);X||(X=[],this.kernelPersistentData.set(this.currentKernelId,X)),X.push(Q)}v.push(Q)}if(l.length!==t.length||v.length!==_.length){if(v.length===0)return Ft(e.name),_;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let S;if(m){let T=0,j=[];m.forEach(X=>{let ie=typeof X.data=="number"?[X.data]:X.data;if(ie.length===0)return;let fe=X.type===10?2:4,_e,xe;X.type===10?(xe=ie.length>4?16:ie.length>2?8:ie.length*fe,_e=ie.length>4?16:fe*ie.length):(xe=ie.length<=2?ie.length*fe:16,_e=16),T=Math.ceil(T/xe)*xe,j.push(T);let ke=X.type===10?8:4;T+=ie.length>4?Math.ceil(ie.length/ke)*_e:ie.length*fe});let B=16;T=Math.ceil(T/B)*B;let W=new ArrayBuffer(T);m.forEach((X,ie)=>{let fe=j[ie],_e=typeof X.data=="number"?[X.data]:X.data;if(X.type===6)new Int32Array(W,fe,_e.length).set(_e);else if(X.type===12)new Uint32Array(W,fe,_e.length).set(_e);else if(X.type===10)new Uint16Array(W,fe,_e.length).set(_e);else if(X.type===1)new Float32Array(W,fe,_e.length).set(_e);else throw new Error(`Unsupported uniform type: ${Jt(X.type)}`)});let Q=this.gpuDataManager.create(T,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(Q.buffer,0,W,0,T),this.gpuDataManager.release(Q.id),S={offset:0,size:T,buffer:Q.buffer}}let k=this.programManager.normalizeDispatchGroupSize(c),E=k[1]===1&&k[2]===1,N=vd(e,t,E),I=this.programManager.getArtifact(N);if(I||(I=this.programManager.build(e,k),this.programManager.setArtifact(N,I),Ge("info",()=>`[artifact] key: ${N}, programName: ${e.name}`)),m&&I.uniformVariablesInfo){if(m.length!==I.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${I.uniformVariablesInfo.length}, got ${m.length} in program "${I.programInfo.name}".`);for(let T=0;T<m.length;T++){let j=m[T],B=j.type,W=typeof j.data=="number"?1:j.data.length,[Q,X]=I.uniformVariablesInfo[T];if(B!==Q||W!==X)throw new Error(`Uniform variable ${T} mismatch: expect type ${Q} with size ${X}, got type ${B} with size ${W} in program "${I.programInfo.name}".`)}}if(Ge("info",()=>`[ProgramManager] run "${e.name}" (key=${N}) with ${k[0]}x${k[1]}x${k[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let T={kernelId:this.currentKernelId,programName:I.programInfo.name,inputTensorViews:t,outputTensorViews:_};this.pendingKernels.push(T),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(T)}return this.programManager.run(I,l,v,k,S),Ft(e.name),_}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,i,r){let n=ec.get(e);if(!n)throw new Error(`kernel not implemented: ${e}`);let o={kernelType:e,kernelName:r,kernelEntry:n[0],attributes:[n[1],i]};this.kernels.set(t,o)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let i of t)this.gpuDataManager.release(i.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,i){let r=this.kernels.get(e);if(!r)throw new Error(`kernel not created: ${e}`);let n=r.kernelType,o=r.kernelName,l=r.kernelEntry,h=r.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${n}] ${o}" is not allowed to be called recursively`);this.currentKernelId=e,h[0]&&(h[1]=h[0](h[1]),h[0]=void 0),Ge("info",()=>`[WebGPU] Start to run kernel "[${n}] ${o}"...`);let c=this.env.debug;this.temporaryData=[];try{return c&&this.device.pushErrorScope("validation"),l(t,h[1]),0}catch(m){return i.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${o}" failed. ${m}`)),1}finally{c&&i.push(this.device.popErrorScope().then(m=>m?`GPU validation error for kernel "[${n}] ${o}": ${m.message}`:null));for(let m of this.temporaryData)this.gpuDataManager.release(m.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,i,r){let n=this.sessionExternalDataMapping.get(e);n||(n=new Map,this.sessionExternalDataMapping.set(e,n));let o=n.get(t),l=this.gpuDataManager.registerExternalBuffer(i,r,o);return n.set(t,[l,i]),l}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(i=>this.gpuDataManager.unregisterExternalBuffer(i[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,i){return async()=>{let r=await ks(this,e,t);return Hs(r.buffer,i)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){Ge("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){Ge("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){Ge("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),i=e.length;this.pendingKernels=[];for(let r=0;r<i;r++){let n=this.getComputePassEncoder(),o=e[r];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(o.computePipeline),n.setBindGroup(0,o.bindGroup),n.dispatchWorkgroups(...o.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[r]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),nc={};Br(nc,{init:()=>sc});var Ni,xd,sc,Bg=ce(()=>{Ne(),er(),Pe(),Fm(),Ni=class ac{constructor(t,i,r,n){this.module=t,this.dataType=i,this.data=r,this.dims=n}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=te.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=te.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=te.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=te.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(te.size(t)!==te.size(this.dims))throw new Error("Invalid new shape");return new ac(this.module,this.dataType,this.data,t)}},xd=class{constructor(e,t,i){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let r=e.PTR_SIZE,n=i/e.PTR_SIZE,o=r===4?"i32":"i64";this.opKernelContext=Number(e.getValue(r*n++,o));let l=Number(e.getValue(r*n++,o));this.outputCount=Number(e.getValue(r*n++,o)),this.customDataOffset=Number(e.getValue(r*n++,"*")),this.customDataSize=Number(e.getValue(r*n++,o));let h=[];for(let c=0;c<l;c++){let m=Number(e.getValue(r*n++,o)),y=Number(e.getValue(r*n++,"*")),_=Number(e.getValue(r*n++,o)),v=[];for(let S=0;S<_;S++)v.push(Number(e.getValue(r*n++,o)));h.push(new Ni(e,m,y,v))}this.inputs=h}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let i=t?.inputs?.map(l=>typeof l=="number"?this.inputs[l]:l)??this.inputs,r=t?.outputs??[],n=(l,h,c)=>new Ni(this.module,h,this.output(l,c),c),o=(l,h)=>{let c=_r(l,h);if(!c)throw new Error(`Unsupported data type: ${l}`);let m=c>0?this.backend.gpuDataManager.create(c).id:0;return new Ni(this.module,l,m,h)};return this.backend.run(e,i,r,n,o,this.outputCount)}output(e,t){let i=this.module.stackSave();try{let r=this.module.PTR_SIZE,n=r===4?"i32":"i64",o=this.module.stackAlloc((1+t.length)*r);this.module.setValue(o,t.length,n);for(let l=0;l<t.length;l++)this.module.setValue(o+r*(l+1),t[l],n);return this.module._JsepOutput(this.opKernelContext,e,o)}catch(r){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${r}`)}finally{this.module.stackRestore(i)}}},sc=async(e,t,i,r)=>{let n=t.jsepInit;if(!n)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let o=(Og(),oi(rc)).WebGpuBackend,l=new o;await l.initialize(i,r),n("webgpu",[l,h=>l.alloc(Number(h)),h=>l.free(h),(h,c,m,y=!1)=>{if(y)Ge("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(h)}, dst=${Number(c)}, size=${Number(m)}`),l.memcpy(Number(h),Number(c));else{Ge("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(h)}, gpuDataId=${Number(c)}, size=${Number(m)}`);let _=t.HEAPU8.subarray(Number(h>>>0),Number(h>>>0)+Number(m));l.upload(Number(c),_)}},async(h,c,m)=>{Ge("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${h}, dataOffset=${c}, size=${m}`),await l.download(Number(h),()=>t.HEAPU8.subarray(Number(c)>>>0,Number(c+m)>>>0))},(h,c,m)=>l.createKernel(h,Number(c),m,t.UTF8ToString(t._JsepGetNodeName(Number(c)))),h=>l.releaseKernel(h),(h,c,m,y)=>{Ge("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${m}, kernel=${h}, contextDataOffset=${c}`);let _=new xd(t,l,Number(c));return l.computeKernel(Number(h),_,y)},()=>l.captureBegin(),()=>l.captureEnd(),()=>l.replay()])}else{let o=new mp(i);n("webnn",[o,()=>o.reserveTensorId(),l=>o.releaseTensorId(l),async(l,h,c,m,y)=>o.ensureTensor(l,h,c,m,y),(l,h)=>{o.uploadTensor(l,h)},async(l,h)=>o.downloadTensor(l,h),(l,h)=>o.registerMLContext(l,h),!!i.trace])}}}),Sd,sa,aa,ir,kd,ws,Xi,oa,ua,ys,la,da,pa,oc=ce(()=>{Nt(),qm(),Um(),Ne(),kr(),Fs(),lp(),Sd=(e,t)=>{rt()._OrtInit(e,t)!==0&&Qe("Can't initialize onnxruntime.")},sa=async e=>{Sd(e.wasm.numThreads,Vi(e.logLevel))},aa=async(e,t)=>{rt().asyncInit?.();let i=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(i){if(typeof i.limits!="object"||typeof i.features!="object"||typeof i.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let r=e.webgpu.powerPreference;if(r!==void 0&&r!=="low-power"&&r!=="high-performance")throw new Error(`Invalid powerPreference setting: "${r}"`);let n=e.webgpu.forceFallbackAdapter;if(n!==void 0&&typeof n!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${n}"`);if(i=await navigator.gpu.requestAdapter({powerPreference:r,forceFallbackAdapter:n}),!i)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let r=(Bg(),oi(nc)).init;t==="webgpu"&&await r("webgpu",rt(),e,i),t==="webnn"&&await r("webnn",rt(),e)}},ir=new Map,kd=e=>{let t=rt(),i=t.stackSave();try{let r=t.PTR_SIZE,n=t.stackAlloc(2*r);t._OrtGetInputOutputCount(e,n,n+r)!==0&&Qe("Can't get session input/output count.");let o=r===4?"i32":"i64";return[Number(t.getValue(n,o)),Number(t.getValue(n+r,o))]}finally{t.stackRestore(i)}},ws=(e,t)=>{let i=rt(),r=i.stackSave(),n=0;try{let o=i.PTR_SIZE,l=i.stackAlloc(2*o);i._OrtGetInputOutputMetadata(e,t,l,l+o)!==0&&Qe("Can't get session input/output metadata.");let h=Number(i.getValue(l,"*"));n=Number(i.getValue(l+o,"*"));let c=i.HEAP32[n/4];if(c===0)return[h,0];let m=i.HEAPU32[n/4+1],y=[];for(let _=0;_<m;_++){let v=Number(i.getValue(n+8+_*o,"*"));y.push(v!==0?i.UTF8ToString(v):Number(i.getValue(n+8+(_+m)*o,"*")))}return[h,c,y]}finally{i.stackRestore(r),n!==0&&i._OrtFree(n)}},Xi=e=>{let t=rt(),i=t._malloc(e.byteLength);if(i===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,i),[i,e.byteLength]},oa=async(e,t)=>{let i,r,n=rt();Array.isArray(e)?[i,r]=e:e.buffer===n.HEAPU8.buffer?[i,r]=[e.byteOffset,e.byteLength]:[i,r]=Xi(e);let o=0,l=0,h=0,c=[],m=[],y=[];try{if([l,c]=await up(t),t?.externalData&&n.mountExternalData){let B=[];for(let W of t.externalData){let Q=typeof W=="string"?W:W.path;B.push(Gs(typeof W=="string"?W:W.data).then(X=>{n.mountExternalData(Q,X)}))}await Promise.all(B)}for(let B of t?.executionProviders??[])if((typeof B=="string"?B:B.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,typeof B!="string"){let W=B,Q=W?.context,X=W?.gpuDevice,ie=W?.deviceType,fe=W?.powerPreference;Q?n.currentContext=Q:X?n.currentContext=await n.webnnCreateMLContext(X):n.currentContext=await n.webnnCreateMLContext({deviceType:ie,powerPreference:fe})}else n.currentContext=await n.webnnCreateMLContext();break}o=await n._OrtCreateSession(i,r,l),n.webgpuOnCreateSession?.(o),o===0&&Qe("Can't create a session."),n.jsepOnCreateSession?.(),n.currentContext&&(n.webnnRegisterMLContext(o,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[_,v]=kd(o),S=!!t?.enableGraphCapture,k=[],E=[],N=[],I=[],T=[];for(let B=0;B<_;B++){let[W,Q,X]=ws(o,B);W===0&&Qe("Can't get an input name."),m.push(W);let ie=n.UTF8ToString(W);k.push(ie),N.push(Q===0?{name:ie,isTensor:!1}:{name:ie,isTensor:!0,type:Jt(Q),shape:X})}for(let B=0;B<v;B++){let[W,Q,X]=ws(o,B+_);W===0&&Qe("Can't get an output name."),y.push(W);let ie=n.UTF8ToString(W);E.push(ie),I.push(Q===0?{name:ie,isTensor:!1}:{name:ie,isTensor:!0,type:Jt(Q),shape:X});{if(S&&t?.preferredOutputLocation===void 0){T.push("gpu-buffer");continue}let fe=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[ie]??"cpu",_e=n.webnnIsGraphOutput;if(fe==="cpu"&&_e&&_e(o,ie)){T.push("ml-tensor-cpu-output");continue}if(fe!=="cpu"&&fe!=="cpu-pinned"&&fe!=="gpu-buffer"&&fe!=="ml-tensor")throw new Error(`Not supported preferred output location: ${fe}.`);if(S&&fe!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${fe}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);T.push(fe)}}let j=null;return T.some(B=>B==="gpu-buffer"||B==="ml-tensor"||B==="ml-tensor-cpu-output")&&(h=n._OrtCreateBinding(o),h===0&&Qe("Can't create IO binding."),j={handle:h,outputPreferredLocations:T,outputPreferredLocationsEncoded:T.map(B=>B==="ml-tensor-cpu-output"?"ml-tensor":B).map(B=>xs(B))}),ir.set(o,[o,m,y,j,S,!1]),[o,k,E,N,I]}catch(_){throw m.forEach(v=>n._OrtFree(v)),y.forEach(v=>n._OrtFree(v)),h!==0&&n._OrtReleaseBinding(h)!==0&&Qe("Can't release IO binding."),o!==0&&n._OrtReleaseSession(o)!==0&&Qe("Can't release session."),_}finally{n._free(i),l!==0&&n._OrtReleaseSessionOptions(l)!==0&&Qe("Can't release session options."),c.forEach(_=>n._free(_)),n.unmountExternalData?.()}},ua=e=>{let t=rt(),i=ir.get(e);if(!i)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,n,o,l,h]=i;l&&(h&&t._OrtClearBoundOutputs(l.handle)!==0&&Qe("Can't clear bound outputs."),t._OrtReleaseBinding(l.handle)!==0&&Qe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),n.forEach(c=>t._OrtFree(c)),o.forEach(c=>t._OrtFree(c)),t._OrtReleaseSession(r)!==0&&Qe("Can't release session."),ir.delete(e)},ys=async(e,t,i,r,n,o,l=!1)=>{if(!e){t.push(0);return}let h=rt(),c=h.PTR_SIZE,m=e[0],y=e[1],_=e[3],v=_,S,k;if(m==="string"&&(_==="gpu-buffer"||_==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(l&&_!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(_==="gpu-buffer"){let I=e[2].gpuBuffer;k=_r(yr(m),y);{let T=h.jsepRegisterBuffer;if(!T)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');S=T(r,o,I,k)}}else if(_==="ml-tensor"){let I=e[2].mlTensor;k=_r(yr(m),y);let T=h.webnnRegisterMLTensor;if(!T)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');S=T(r,I,yr(m),y)}else{let I=e[2];if(Array.isArray(I)){k=c*I.length,S=h._malloc(k),i.push(S);for(let T=0;T<I.length;T++){if(typeof I[T]!="string")throw new TypeError(`tensor data at index ${T} is not a string`);h.setValue(S+T*c,Lt(I[T],i),"*")}}else{let T=h.webnnIsGraphInput,j=h.webnnIsGraphOutput;if(m!=="string"&&T&&j){let B=h.UTF8ToString(n);if(T(r,B)||j(r,B)){let W=yr(m);k=_r(W,y),v="ml-tensor";let Q=h.webnnCreateTemporaryTensor,X=h.webnnUploadTensor;if(!Q||!X)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let ie=await Q(r,W,y);X(ie,new Uint8Array(I.buffer,I.byteOffset,I.byteLength)),S=ie}else k=I.byteLength,S=h._malloc(k),i.push(S),h.HEAPU8.set(new Uint8Array(I.buffer,I.byteOffset,k),S)}else k=I.byteLength,S=h._malloc(k),i.push(S),h.HEAPU8.set(new Uint8Array(I.buffer,I.byteOffset,k),S)}}let E=h.stackSave(),N=h.stackAlloc(4*y.length);try{y.forEach((T,j)=>h.setValue(N+j*c,T,c===4?"i32":"i64"));let I=h._OrtCreateTensor(yr(m),S,k,N,y.length,xs(v));I===0&&Qe(`Can't create tensor for input/output. session=${r}, index=${o}.`),t.push(I)}finally{h.stackRestore(E)}},la=async(e,t,i,r,n,o)=>{let l=rt(),h=l.PTR_SIZE,c=ir.get(e);if(!c)throw new Error(`cannot run inference. invalid session id: ${e}`);let m=c[0],y=c[1],_=c[2],v=c[3],S=c[4],k=c[5],E=t.length,N=r.length,I=0,T=[],j=[],B=[],W=[],Q=l.stackSave(),X=l.stackAlloc(E*h),ie=l.stackAlloc(E*h),fe=l.stackAlloc(N*h),_e=l.stackAlloc(N*h);try{[I,T]=op(o),br("wasm prepareInputOutputTensor");for(let O=0;O<E;O++)await ys(i[O],j,W,e,y[t[O]],t[O],S);for(let O=0;O<N;O++)await ys(n[O],B,W,e,_[r[O]],E+r[O],S);vr("wasm prepareInputOutputTensor");for(let O=0;O<E;O++)l.setValue(X+O*h,j[O],"*"),l.setValue(ie+O*h,y[t[O]],"*");for(let O=0;O<N;O++)l.setValue(fe+O*h,B[O],"*"),l.setValue(_e+O*h,_[r[O]],"*");if(v&&!k){let{handle:O,outputPreferredLocations:Y,outputPreferredLocationsEncoded:U}=v;if(y.length!==E)throw new Error(`input count from feeds (${E}) is expected to be always equal to model's input count (${y.length}).`);br("wasm bindInputsOutputs");for(let Z=0;Z<E;Z++){let oe=t[Z];await l._OrtBindInput(O,y[oe],j[Z])!==0&&Qe(`Can't bind input[${Z}] for session=${e}.`)}for(let Z=0;Z<N;Z++){let oe=r[Z];n[Z]?.[3]?l._OrtBindOutput(O,_[oe],B[Z],0)!==0&&Qe(`Can't bind pre-allocated output[${Z}] for session=${e}.`):l._OrtBindOutput(O,_[oe],0,U[oe])!==0&&Qe(`Can't bind output[${Z}] to ${Y[Z]} for session=${e}.`)}vr("wasm bindInputsOutputs"),ir.set(e,[m,y,_,v,S,!0])}l.jsepOnRunStart?.(m),l.webnnOnRunStart?.(m);let xe;v?xe=await l._OrtRunWithBinding(m,v.handle,N,fe,I):xe=await l._OrtRun(m,ie,X,E,_e,N,fe,I),xe!==0&&Qe("failed to call OrtRun().");let ke=[],q=[];br("wasm ProcessOutputTensor");for(let O=0;O<N;O++){let Y=Number(l.getValue(fe+O*h,"*"));if(Y===B[O]){ke.push(n[O]);continue}let U=l.stackSave(),Z=l.stackAlloc(4*h),oe=!1,le,Se=0;try{l._OrtGetTensorData(Y,Z,Z+h,Z+2*h,Z+3*h)!==0&&Qe(`Can't access output tensor data on index ${O}.`);let J=h===4?"i32":"i64",K=Number(l.getValue(Z,J));Se=l.getValue(Z+h,"*");let me=l.getValue(Z+h*2,"*"),De=Number(l.getValue(Z+h*3,J)),P=[];for(let je=0;je<De;je++)P.push(Number(l.getValue(me+je*h,J)));l._OrtFree(me)!==0&&Qe("Can't free memory for tensor dims.");let Ae=P.reduce((je,Ye)=>je*Ye,1);le=Jt(K);let it=v?.outputPreferredLocations[r[O]];if(le==="string"){if(it==="gpu-buffer"||it==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let je=[];for(let Ye=0;Ye<Ae;Ye++){let Ue=l.getValue(Se+Ye*h,"*"),lt=l.getValue(Se+(Ye+1)*h,"*"),dt=Ye===Ae-1?void 0:lt-Ue;je.push(l.UTF8ToString(Ue,dt))}ke.push([le,P,je,"cpu"])}else if(it==="gpu-buffer"&&Ae>0){let je=l.jsepGetBuffer;if(!je)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Ye=je(Se),Ue=_r(K,Ae);if(Ue===void 0||!Ws(le))throw new Error(`Unsupported data type: ${le}`);oe=!0,ke.push([le,P,{gpuBuffer:Ye,download:l.jsepCreateDownloader(Ye,Ue,le),dispose:()=>{l._OrtReleaseTensor(Y)!==0&&Qe("Can't release tensor.")}},"gpu-buffer"])}else if(it==="ml-tensor"&&Ae>0){let je=l.webnnEnsureTensor,Ye=l.webnnIsGraphInputOutputTypeSupported;if(!je||!Ye)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(_r(K,Ae)===void 0||!Vs(le))throw new Error(`Unsupported data type: ${le}`);if(!Ye(e,le,!1))throw new Error(`preferredLocation "ml-tensor" for ${le} output is not supported by current WebNN Context.`);let Ue=await je(e,Se,K,P,!1);oe=!0,ke.push([le,P,{mlTensor:Ue,download:l.webnnCreateMLTensorDownloader(Se,le),dispose:()=>{l.webnnReleaseTensorId(Se),l._OrtReleaseTensor(Y)}},"ml-tensor"])}else if(it==="ml-tensor-cpu-output"&&Ae>0){let je=l.webnnCreateMLTensorDownloader(Se,le)(),Ye=ke.length;oe=!0,q.push((async()=>{let Ue=[Ye,await je];return l.webnnReleaseTensorId(Se),l._OrtReleaseTensor(Y),Ue})()),ke.push([le,P,[],"cpu"])}else{let je=Qi(le),Ye=new je(Ae);new Uint8Array(Ye.buffer,Ye.byteOffset,Ye.byteLength).set(l.HEAPU8.subarray(Se,Se+Ye.byteLength)),ke.push([le,P,Ye,"cpu"])}}finally{l.stackRestore(U),le==="string"&&Se&&l._free(Se),oe||l._OrtReleaseTensor(Y)}}v&&!S&&(l._OrtClearBoundOutputs(v.handle)!==0&&Qe("Can't clear bound outputs."),ir.set(e,[m,y,_,v,S,!1]));for(let[O,Y]of await Promise.all(q))ke[O][2]=Y;return vr("wasm ProcessOutputTensor"),ke}finally{l.webnnOnRunEnd?.(m),l.stackRestore(Q),j.forEach(xe=>l._OrtReleaseTensor(xe)),B.forEach(xe=>l._OrtReleaseTensor(xe)),W.forEach(xe=>l._free(xe)),I!==0&&l._OrtReleaseRunOptions(I),T.forEach(xe=>l._free(xe))}},da=e=>{let t=rt(),i=ir.get(e);if(!i)throw new Error("invalid session id");let r=i[0],n=t._OrtEndProfiling(r);n===0&&Qe("Can't get an profile file name."),t._OrtFree(n)},pa=e=>{let t=[];for(let i of e){let r=i[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}}),nr,Ot,Ir,ei,ti,Di,_s,ji,mr,gr,Cd,uc,lc,dc,pc,hc,fc,cc,mc=ce(()=>{Nt(),oc(),kr(),Us(),nr=()=>!!Je.wasm.proxy&&typeof document<"u",Ir=!1,ei=!1,ti=!1,ji=new Map,mr=(e,t)=>{let i=ji.get(e);i?i.push(t):ji.set(e,[t])},gr=()=>{if(Ir||!ei||ti||!Ot)throw new Error("worker not ready")},Cd=e=>{switch(e.data.type){case"init-wasm":Ir=!1,e.data.err?(ti=!0,_s[1](e.data.err)):(ei=!0,_s[0]()),Di&&(URL.revokeObjectURL(Di),Di=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=ji.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},uc=async()=>{if(!ei){if(Ir)throw new Error("multiple calls to 'initWasm()' detected.");if(ti)throw new Error("previous call to 'initWasm()' failed.");if(Ir=!0,nr())return new Promise((e,t)=>{Ot?.terminate(),sp().then(([i,r])=>{try{Ot=r,Ot.onerror=o=>t(o),Ot.onmessage=Cd,_s=[e,t];let n={type:"init-wasm",in:Je};!n.in.wasm.wasmPaths&&(i||$s)&&(n.in.wasm.wasmPaths={wasm:new URL("/assets/ort-wasm-simd-threaded.jsep-CLmJQkb_.wasm",import.meta.url).href}),Ot.postMessage(n),Di=i}catch(n){t(n)}},t)});try{await Ls(Je.wasm),await sa(Je),ei=!0}catch(e){throw ti=!0,e}finally{Ir=!1}}},lc=async e=>{if(nr())return gr(),new Promise((t,i)=>{mr("init-ep",[t,i]);let r={type:"init-ep",in:{epName:e,env:Je}};Ot.postMessage(r)});await aa(Je,e)},dc=async e=>nr()?(gr(),new Promise((t,i)=>{mr("copy-from",[t,i]);let r={type:"copy-from",in:{buffer:e}};Ot.postMessage(r,[e.buffer])})):Xi(e),pc=async(e,t)=>{if(nr()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return gr(),new Promise((i,r)=>{mr("create",[i,r]);let n={type:"create",in:{model:e,options:{...t}}},o=[];e instanceof Uint8Array&&o.push(e.buffer),Ot.postMessage(n,o)})}else return oa(e,t)},hc=async e=>{if(nr())return gr(),new Promise((t,i)=>{mr("release",[t,i]);let r={type:"release",in:e};Ot.postMessage(r)});ua(e)},fc=async(e,t,i,r,n,o)=>{if(nr()){if(i.some(l=>l[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(n.some(l=>l))throw new Error("pre-allocated output tensor is not supported for proxy.");return gr(),new Promise((l,h)=>{mr("run",[l,h]);let c=i,m={type:"run",in:{sessionId:e,inputIndices:t,inputs:c,outputIndices:r,options:o}};Ot.postMessage(m,pa(c))})}else return la(e,t,i,r,n,o)},cc=async e=>{if(nr())return gr(),new Promise((t,i)=>{mr("end-profiling",[t,i]);let r={type:"end-profiling",in:e};Ot.postMessage(r)});da(e)}}),bs,Td,gc,Ng=ce(()=>{Nt(),mc(),Ne(),qs(),lp(),bs=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Td=e=>{switch(e[3]){case"cpu":return new Bt(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Ws(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:i,download:r,dispose:n}=e[2];return Bt.fromGpuBuffer(i,{dataType:t,dims:e[1],download:r,dispose:n})}case"ml-tensor":{let t=e[0];if(!Vs(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:i,download:r,dispose:n}=e[2];return Bt.fromMLTensor(i,{dataType:t,dims:e[1],download:r,dispose:n})}default:throw new Error(`invalid data location: ${e[3]}`)}},gc=class{async fetchModelAndCopyToWasmMemory(e){return dc(await Gs(e))}async loadModel(e,t){Ht();let i;typeof e=="string"?i=await this.fetchModelAndCopyToWasmMemory(e):i=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await pc(i,t),Ft()}async dispose(){return hc(this.sessionId)}async run(e,t,i){Ht();let r=[],n=[];Object.entries(e).forEach(_=>{let v=_[0],S=_[1],k=this.inputNames.indexOf(v);if(k===-1)throw new Error(`invalid input '${v}'`);r.push(S),n.push(k)});let o=[],l=[];Object.entries(t).forEach(_=>{let v=_[0],S=_[1],k=this.outputNames.indexOf(v);if(k===-1)throw new Error(`invalid output '${v}'`);o.push(S),l.push(k)});let h=r.map((_,v)=>bs(_,()=>`input "${this.inputNames[n[v]]}"`)),c=o.map((_,v)=>_?bs(_,()=>`output "${this.outputNames[l[v]]}"`):null),m=await fc(this.sessionId,n,h,l,c,i),y={};for(let _=0;_<m.length;_++)y[this.outputNames[l[_]]]=o[_]??Td(m[_]);return Ft(),y}startProfiling(){}endProfiling(){cc(this.sessionId)}}}),wc={};Br(wc,{OnnxruntimeWebAssemblyBackend:()=>Ds,initializeFlags:()=>Ns,wasmBackend:()=>yc});var Ns,Ds,yc,Dg=ce(()=>{Nt(),mc(),Ng(),Ns=()=>{(typeof Je.wasm.initTimeout!="number"||Je.wasm.initTimeout<0)&&(Je.wasm.initTimeout=0);let e=Je.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),Je.wasm.simd=!1),typeof Je.wasm.proxy!="boolean"&&(Je.wasm.proxy=!1),typeof Je.wasm.trace!="boolean"&&(Je.wasm.trace=!1),typeof Je.wasm.numThreads!="number"||!Number.isInteger(Je.wasm.numThreads)||Je.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)Je.wasm.numThreads=1;else{let t=typeof navigator>"u"?$m("node:os").cpus().length:navigator.hardwareConcurrency;Je.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Ds=class{async init(e){Ns(),await uc(),await lc(e)}async createInferenceSessionHandler(e,t){let i=new gc;return await i.loadModel(e,t),i}},yc=new Ds});Nt();Nt();Nt();var jg="1.23.0";{let e=(Dg(),oi(wc)).wasmBackend;Ar("webgpu",e,5),Ar("webnn",e,5),Ar("cpu",e,10),Ar("wasm",e,10)}Object.defineProperty(Je.versions,"web",{value:jg,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _c(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function bc(e){if(Object.prototype.hasOwnProperty.call(e,"__esModule"))return e;var t=e.default;if(typeof t=="function"){var i=function r(){var n=!1;try{n=this instanceof r}catch{}return n?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};i.prototype=t.prototype}else i={};return Object.defineProperty(i,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(i,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}),i}var Ui={exports:{}},Pg=Ui.exports,Ed;function qg(){return Ed||(Ed=1,(function(e,t){(function(i,r){e.exports=r()})(Pg,(function(){function i(q,O,Y){for(var U,Z=0,oe=O.length;Z<oe;Z++)!U&&Z in O||(U||(U=Array.prototype.slice.call(O,0,Z)),U[Z]=O[Z]);return q.concat(U||Array.prototype.slice.call(O))}var r=Object.freeze({__proto__:null,blackman:function(q){for(var O=new Float32Array(q),Y=2*Math.PI/(q-1),U=2*Y,Z=0;Z<q/2;Z++)O[Z]=.42-.5*Math.cos(Z*Y)+.08*Math.cos(Z*U);for(Z=Math.ceil(q/2);Z>0;Z--)O[q-Z]=O[Z-1];return O},hamming:function(q){for(var O=new Float32Array(q),Y=0;Y<q;Y++)O[Y]=.54-.46*Math.cos(2*Math.PI*(Y/q-1));return O},hanning:function(q){for(var O=new Float32Array(q),Y=0;Y<q;Y++)O[Y]=.5-.5*Math.cos(2*Math.PI*Y/(q-1));return O},sine:function(q){for(var O=Math.PI/(q-1),Y=new Float32Array(q),U=0;U<q;U++)Y[U]=Math.sin(O*U);return Y}}),n={};function o(q){for(;q%2==0&&q>1;)q/=2;return q===1}function l(q,O){if(O!=="rect"){if(O!==""&&O||(O="hanning"),n[O]||(n[O]={}),!n[O][q.length])try{n[O][q.length]=r[O](q.length)}catch{throw new Error("Invalid windowing function")}q=(function(Y,U){for(var Z=[],oe=0;oe<Math.min(Y.length,U.length);oe++)Z[oe]=Y[oe]*U[oe];return Z})(q,n[O][q.length])}return q}function h(q,O,Y){for(var U=new Float32Array(q),Z=0;Z<U.length;Z++)U[Z]=Z*O/Y,U[Z]=13*Math.atan(U[Z]/1315.8)+3.5*Math.atan(Math.pow(U[Z]/7518,2));return U}function c(q){return Float32Array.from(q)}function m(q){return 1125*Math.log(1+q/700)}function y(q,O,Y){for(var U,Z=new Float32Array(q+2),oe=new Float32Array(q+2),le=O/2,Se=m(0),J=(m(le)-Se)/(q+1),K=new Array(q+2),me=0;me<Z.length;me++)Z[me]=me*J,oe[me]=(U=Z[me],700*(Math.exp(U/1125)-1)),K[me]=Math.floor((Y+1)*oe[me]/O);for(var De=new Array(q),P=0;P<De.length;P++){for(De[P]=new Array(Y/2+1).fill(0),me=K[P];me<K[P+1];me++)De[P][me]=(me-K[P])/(K[P+1]-K[P]);for(me=K[P+1];me<K[P+2];me++)De[P][me]=(K[P+2]-me)/(K[P+2]-K[P+1])}return De}function _(q,O,Y,U,Z,oe,le){U===void 0&&(U=5),Z===void 0&&(Z=2),oe===void 0&&(oe=!0),le===void 0&&(le=440);var Se=Math.floor(Y/2)+1,J=new Array(Y).fill(0).map((function(Ue,lt){return q*(function(dt,vt){return Math.log2(16*dt/vt)})(O*lt/Y,le)}));J[0]=J[1]-1.5*q;var K,me,De,P=J.slice(1).map((function(Ue,lt){return Math.max(Ue-J[lt])}),1).concat([1]),Ae=Math.round(q/2),it=new Array(q).fill(0).map((function(Ue,lt){return J.map((function(dt){return(10*q+Ae+dt-lt)%q-Ae}))})),je=it.map((function(Ue,lt){return Ue.map((function(dt,vt){return Math.exp(-.5*Math.pow(2*it[lt][vt]/P[vt],2))}))}));if(me=(K=je)[0].map((function(){return 0})),De=K.reduce((function(Ue,lt){return lt.forEach((function(dt,vt){Ue[vt]+=Math.pow(dt,2)})),Ue}),me).map(Math.sqrt),je=K.map((function(Ue,lt){return Ue.map((function(dt,vt){return dt/(De[vt]||1)}))})),Z){var Ye=J.map((function(Ue){return Math.exp(-.5*Math.pow((Ue/q-U)/Z,2))}));je=je.map((function(Ue){return Ue.map((function(lt,dt){return lt*Ye[dt]}))}))}return oe&&(je=i(i([],je.slice(3),!0),je.slice(0,3))),je.map((function(Ue){return Ue.slice(0,Se)}))}function v(q,O){for(var Y=0,U=0,Z=0;Z<O.length;Z++)Y+=Math.pow(Z,q)*Math.abs(O[Z]),U+=O[Z];return Y/U}function S(q){var O=q.ampSpectrum,Y=q.barkScale,U=q.numberOfBarkBands,Z=U===void 0?24:U;if(typeof O!="object"||typeof Y!="object")throw new TypeError;var oe=Z,le=new Float32Array(oe),Se=0,J=O,K=new Int32Array(oe+1);K[0]=0;for(var me=Y[J.length-1]/oe,De=1,P=0;P<J.length;P++)for(;Y[P]>me;)K[De++]=P,me=De*Y[J.length-1]/oe;for(K[oe]=J.length-1,P=0;P<oe;P++){for(var Ae=0,it=K[P];it<K[P+1];it++)Ae+=J[it];le[P]=Math.pow(Ae,.23)}for(P=0;P<le.length;P++)Se+=le[P];return{specific:le,total:Se}}function k(q){var O=q.ampSpectrum;if(typeof O!="object")throw new TypeError;for(var Y=new Float32Array(O.length),U=0;U<Y.length;U++)Y[U]=Math.pow(O[U],2);return Y}function E(q){var O=q.ampSpectrum,Y=q.melFilterBank,U=q.bufferSize;if(typeof O!="object")throw new TypeError("Valid ampSpectrum is required to generate melBands");if(typeof Y!="object")throw new TypeError("Valid melFilterBank is required to generate melBands");for(var Z=k({ampSpectrum:O}),oe=Y.length,le=Array(oe),Se=new Float32Array(oe),J=0;J<Se.length;J++){le[J]=new Float32Array(U/2),Se[J]=0;for(var K=0;K<U/2;K++)le[J][K]=Y[J][K]*Z[K],Se[J]+=le[J][K];Se[J]=Math.log(Se[J]+1)}return Array.prototype.slice.call(Se)}function N(q){return q&&q.__esModule&&Object.prototype.hasOwnProperty.call(q,"default")?q.default:q}var I=null,T=N((function(q,O){var Y=q.length;return O=O||2,I&&I[Y]||(function(U){(I=I||{})[U]=new Array(U*U);for(var Z=Math.PI/U,oe=0;oe<U;oe++)for(var le=0;le<U;le++)I[U][le+oe*U]=Math.cos(Z*(le+.5)*oe)})(Y),q.map((function(){return 0})).map((function(U,Z){return O*q.reduce((function(oe,le,Se,J){return oe+le*I[Y][Se+Z*Y]}),0)}))})),j=Object.freeze({__proto__:null,amplitudeSpectrum:function(q){return q.ampSpectrum},buffer:function(q){return q.signal},chroma:function(q){var O=q.ampSpectrum,Y=q.chromaFilterBank;if(typeof O!="object")throw new TypeError("Valid ampSpectrum is required to generate chroma");if(typeof Y!="object")throw new TypeError("Valid chromaFilterBank is required to generate chroma");var U=Y.map((function(oe,le){return O.reduce((function(Se,J,K){return Se+J*oe[K]}),0)})),Z=Math.max.apply(Math,U);return Z?U.map((function(oe){return oe/Z})):U},complexSpectrum:function(q){return q.complexSpectrum},energy:function(q){var O=q.signal;if(typeof O!="object")throw new TypeError;for(var Y=0,U=0;U<O.length;U++)Y+=Math.pow(Math.abs(O[U]),2);return Y},loudness:S,melBands:E,mfcc:function(q){var O=q.ampSpectrum,Y=q.melFilterBank,U=q.numberOfMFCCCoefficients,Z=q.bufferSize,oe=Math.min(40,Math.max(1,U||13));if(Y.length<oe)throw new Error("Insufficient filter bank for requested number of coefficients");var le=E({ampSpectrum:O,melFilterBank:Y,bufferSize:Z});return T(le).slice(0,oe)},perceptualSharpness:function(q){for(var O=S({ampSpectrum:q.ampSpectrum,barkScale:q.barkScale}),Y=O.specific,U=0,Z=0;Z<Y.length;Z++)U+=Z<15?(Z+1)*Y[Z+1]:.066*Math.exp(.171*(Z+1));return U*=.11/O.total},perceptualSpread:function(q){for(var O=S({ampSpectrum:q.ampSpectrum,barkScale:q.barkScale}),Y=0,U=0;U<O.specific.length;U++)O.specific[U]>Y&&(Y=O.specific[U]);return Math.pow((O.total-Y)/O.total,2)},powerSpectrum:k,rms:function(q){var O=q.signal;if(typeof O!="object")throw new TypeError;for(var Y=0,U=0;U<O.length;U++)Y+=Math.pow(O[U],2);return Y/=O.length,Y=Math.sqrt(Y)},spectralCentroid:function(q){var O=q.ampSpectrum;if(typeof O!="object")throw new TypeError;return v(1,O)},spectralCrest:function(q){var O=q.ampSpectrum;if(typeof O!="object")throw new TypeError;var Y=0,U=-1/0;return O.forEach((function(Z){Y+=Math.pow(Z,2),U=Z>U?Z:U})),Y/=O.length,Y=Math.sqrt(Y),U/Y},spectralFlatness:function(q){var O=q.ampSpectrum;if(typeof O!="object")throw new TypeError;for(var Y=0,U=0,Z=0;Z<O.length;Z++)Y+=Math.log(O[Z]),U+=O[Z];return Math.exp(Y/O.length)*O.length/U},spectralFlux:function(q){var O=q.signal,Y=q.previousSignal,U=q.bufferSize;if(typeof O!="object"||typeof Y!="object")throw new TypeError;for(var Z=0,oe=-U/2;oe<O.length/2-1;oe++)x=Math.abs(O[oe])-Math.abs(Y[oe]),Z+=(x+Math.abs(x))/2;return Z},spectralKurtosis:function(q){var O=q.ampSpectrum;if(typeof O!="object")throw new TypeError;var Y=O,U=v(1,Y),Z=v(2,Y),oe=v(3,Y),le=v(4,Y);return(-3*Math.pow(U,4)+6*U*Z-4*U*oe+le)/Math.pow(Math.sqrt(Z-Math.pow(U,2)),4)},spectralRolloff:function(q){var O=q.ampSpectrum,Y=q.sampleRate;if(typeof O!="object")throw new TypeError;for(var U=O,Z=Y/(2*(U.length-1)),oe=0,le=0;le<U.length;le++)oe+=U[le];for(var Se=.99*oe,J=U.length-1;oe>Se&&J>=0;)oe-=U[J],--J;return(J+1)*Z},spectralSkewness:function(q){var O=q.ampSpectrum;if(typeof O!="object")throw new TypeError;var Y=v(1,O),U=v(2,O),Z=v(3,O);return(2*Math.pow(Y,3)-3*Y*U+Z)/Math.pow(Math.sqrt(U-Math.pow(Y,2)),3)},spectralSlope:function(q){var O=q.ampSpectrum,Y=q.sampleRate,U=q.bufferSize;if(typeof O!="object")throw new TypeError;for(var Z=0,oe=0,le=new Float32Array(O.length),Se=0,J=0,K=0;K<O.length;K++){Z+=O[K];var me=K*Y/U;le[K]=me,Se+=me*me,oe+=me,J+=me*O[K]}return(O.length*J-oe*Z)/(Z*(Se-Math.pow(oe,2)))},spectralSpread:function(q){var O=q.ampSpectrum;if(typeof O!="object")throw new TypeError;return Math.sqrt(v(2,O)-Math.pow(v(1,O),2))},zcr:function(q){var O=q.signal;if(typeof O!="object")throw new TypeError;for(var Y=0,U=1;U<O.length;U++)(O[U-1]>=0&&O[U]<0||O[U-1]<0&&O[U]>=0)&&Y++;return Y}});function B(q){if(Array.isArray(q)){for(var O=0,Y=Array(q.length);O<q.length;O++)Y[O]=q[O];return Y}return Array.from(q)}var W={},Q={},X={bitReverseArray:function(q){if(W[q]===void 0){for(var O=(q-1).toString(2).length,Y="0".repeat(O),U={},Z=0;Z<q;Z++){var oe=Z.toString(2);oe=Y.substr(oe.length)+oe,oe=[].concat(B(oe)).reverse().join(""),U[Z]=parseInt(oe,2)}W[q]=U}return W[q]},multiply:function(q,O){return{real:q.real*O.real-q.imag*O.imag,imag:q.real*O.imag+q.imag*O.real}},add:function(q,O){return{real:q.real+O.real,imag:q.imag+O.imag}},subtract:function(q,O){return{real:q.real-O.real,imag:q.imag-O.imag}},euler:function(q,O){var Y=-2*Math.PI*q/O;return{real:Math.cos(Y),imag:Math.sin(Y)}},conj:function(q){return q.imag*=-1,q},constructComplexArray:function(q){var O={};O.real=q.real===void 0?q.slice():q.real.slice();var Y=O.real.length;return Q[Y]===void 0&&(Q[Y]=Array.apply(null,Array(Y)).map(Number.prototype.valueOf,0)),O.imag=Q[Y].slice(),O}},ie=function(q){var O={};q.real===void 0||q.imag===void 0?O=X.constructComplexArray(q):(O.real=q.real.slice(),O.imag=q.imag.slice());var Y=O.real.length,U=Math.log2(Y);if(Math.round(U)!=U)throw new Error("Input size must be a power of 2.");if(O.real.length!=O.imag.length)throw new Error("Real and imaginary components must have the same length.");for(var Z=X.bitReverseArray(Y),oe={real:[],imag:[]},le=0;le<Y;le++)oe.real[Z[le]]=O.real[le],oe.imag[Z[le]]=O.imag[le];for(var Se=0;Se<Y;Se++)O.real[Se]=oe.real[Se],O.imag[Se]=oe.imag[Se];for(var J=1;J<=U;J++)for(var K=Math.pow(2,J),me=0;me<K/2;me++)for(var De=X.euler(me,K),P=0;P<Y/K;P++){var Ae=K*P+me,it=K*P+me+K/2,je={real:O.real[Ae],imag:O.imag[Ae]},Ye={real:O.real[it],imag:O.imag[it]},Ue=X.multiply(De,Ye),lt=X.subtract(je,Ue);O.real[it]=lt.real,O.imag[it]=lt.imag;var dt=X.add(Ue,je);O.real[Ae]=dt.real,O.imag[Ae]=dt.imag}return O},fe=ie,_e=(function(){function q(O,Y){var U=this;if(this._m=Y,!O.audioContext)throw this._m.errors.noAC;if(O.bufferSize&&!o(O.bufferSize))throw this._m._errors.notPow2;if(!O.source)throw this._m._errors.noSource;this._m.audioContext=O.audioContext,this._m.bufferSize=O.bufferSize||this._m.bufferSize||256,this._m.hopSize=O.hopSize||this._m.hopSize||this._m.bufferSize,this._m.sampleRate=O.sampleRate||this._m.audioContext.sampleRate||44100,this._m.callback=O.callback,this._m.windowingFunction=O.windowingFunction||"hanning",this._m.featureExtractors=j,this._m.EXTRACTION_STARTED=O.startImmediately||!1,this._m.channel=typeof O.channel=="number"?O.channel:0,this._m.inputs=O.inputs||1,this._m.outputs=O.outputs||1,this._m.numberOfMFCCCoefficients=O.numberOfMFCCCoefficients||this._m.numberOfMFCCCoefficients||13,this._m.numberOfBarkBands=O.numberOfBarkBands||this._m.numberOfBarkBands||24,this._m.spn=this._m.audioContext.createScriptProcessor(this._m.bufferSize,this._m.inputs,this._m.outputs),this._m.spn.connect(this._m.audioContext.destination),this._m._featuresToExtract=O.featureExtractors||[],this._m.barkScale=h(this._m.bufferSize,this._m.sampleRate,this._m.bufferSize),this._m.melFilterBank=y(Math.max(this._m.melBands,this._m.numberOfMFCCCoefficients),this._m.sampleRate,this._m.bufferSize),this._m.inputData=null,this._m.previousInputData=null,this._m.frame=null,this._m.previousFrame=null,this.setSource(O.source),this._m.spn.onaudioprocess=function(Z){var oe;U._m.inputData!==null&&(U._m.previousInputData=U._m.inputData),U._m.inputData=Z.inputBuffer.getChannelData(U._m.channel),U._m.previousInputData?((oe=new Float32Array(U._m.previousInputData.length+U._m.inputData.length-U._m.hopSize)).set(U._m.previousInputData.slice(U._m.hopSize)),oe.set(U._m.inputData,U._m.previousInputData.length-U._m.hopSize)):oe=U._m.inputData;var le=(function(Se,J,K){if(Se.length<J)throw new Error("Buffer is too short for frame length");if(K<1)throw new Error("Hop length cannot be less that 1");if(J<1)throw new Error("Frame length cannot be less that 1");var me=1+Math.floor((Se.length-J)/K);return new Array(me).fill(0).map((function(De,P){return Se.slice(P*K,P*K+J)}))})(oe,U._m.bufferSize,U._m.hopSize);le.forEach((function(Se){U._m.frame=Se;var J=U._m.extract(U._m._featuresToExtract,U._m.frame,U._m.previousFrame);typeof U._m.callback=="function"&&U._m.EXTRACTION_STARTED&&U._m.callback(J),U._m.previousFrame=U._m.frame}))}}return q.prototype.start=function(O){this._m._featuresToExtract=O||this._m._featuresToExtract,this._m.EXTRACTION_STARTED=!0},q.prototype.stop=function(){this._m.EXTRACTION_STARTED=!1},q.prototype.setSource=function(O){this._m.source&&this._m.source.disconnect(this._m.spn),this._m.source=O,this._m.source.connect(this._m.spn)},q.prototype.setChannel=function(O){O<=this._m.inputs?this._m.channel=O:console.error("Channel ".concat(O," does not exist. Make sure you've provided a value for 'inputs' that is greater than ").concat(O," when instantiating the MeydaAnalyzer"))},q.prototype.get=function(O){return this._m.inputData?this._m.extract(O||this._m._featuresToExtract,this._m.inputData,this._m.previousInputData):null},q})(),xe={audioContext:null,spn:null,bufferSize:512,sampleRate:44100,melBands:26,chromaBands:12,callback:null,windowingFunction:"hanning",featureExtractors:j,EXTRACTION_STARTED:!1,numberOfMFCCCoefficients:13,numberOfBarkBands:24,_featuresToExtract:[],windowing:l,_errors:{notPow2:new Error("Meyda: Buffer size must be a power of 2, e.g. 64 or 512"),featureUndef:new Error("Meyda: No features defined."),invalidFeatureFmt:new Error("Meyda: Invalid feature format"),invalidInput:new Error("Meyda: Invalid input."),noAC:new Error("Meyda: No AudioContext specified."),noSource:new Error("Meyda: No source node specified.")},createMeydaAnalyzer:function(q){return new _e(q,Object.assign({},xe))},listAvailableFeatureExtractors:function(){return Object.keys(this.featureExtractors)},extract:function(q,O,Y){var U=this;if(!O)throw this._errors.invalidInput;if(typeof O!="object")throw this._errors.invalidInput;if(!q)throw this._errors.featureUndef;if(!o(O.length))throw this._errors.notPow2;this.barkScale!==void 0&&this.barkScale.length==this.bufferSize||(this.barkScale=h(this.bufferSize,this.sampleRate,this.bufferSize)),this.melFilterBank!==void 0&&this.barkScale.length==this.bufferSize&&this.melFilterBank.length==this.melBands||(this.melFilterBank=y(Math.max(this.melBands,this.numberOfMFCCCoefficients),this.sampleRate,this.bufferSize)),this.chromaFilterBank!==void 0&&this.chromaFilterBank.length==this.chromaBands||(this.chromaFilterBank=_(this.chromaBands,this.sampleRate,this.bufferSize)),"buffer"in O&&O.buffer===void 0?this.signal=c(O):this.signal=O;var Z=ke(O,this.windowingFunction,this.bufferSize);if(this.signal=Z.windowedSignal,this.complexSpectrum=Z.complexSpectrum,this.ampSpectrum=Z.ampSpectrum,Y){var oe=ke(Y,this.windowingFunction,this.bufferSize);this.previousSignal=oe.windowedSignal,this.previousComplexSpectrum=oe.complexSpectrum,this.previousAmpSpectrum=oe.ampSpectrum}var le=function(Se){return U.featureExtractors[Se]({ampSpectrum:U.ampSpectrum,chromaFilterBank:U.chromaFilterBank,complexSpectrum:U.complexSpectrum,signal:U.signal,bufferSize:U.bufferSize,sampleRate:U.sampleRate,barkScale:U.barkScale,melFilterBank:U.melFilterBank,previousSignal:U.previousSignal,previousAmpSpectrum:U.previousAmpSpectrum,previousComplexSpectrum:U.previousComplexSpectrum,numberOfMFCCCoefficients:U.numberOfMFCCCoefficients,numberOfBarkBands:U.numberOfBarkBands})};if(typeof q=="object")return q.reduce((function(Se,J){var K;return Object.assign({},Se,((K={})[J]=le(J),K))}),{});if(typeof q=="string")return le(q);throw this._errors.invalidFeatureFmt}},ke=function(q,O,Y){var U={};q.buffer===void 0?U.signal=c(q):U.signal=q,U.windowedSignal=l(U.signal,O),U.complexSpectrum=fe(U.windowedSignal),U.ampSpectrum=new Float32Array(Y/2);for(var Z=0;Z<Y/2;Z++)U.ampSpectrum[Z]=Math.sqrt(Math.pow(U.complexSpectrum.real[Z],2)+Math.pow(U.complexSpectrum.imag[Z],2));return U};return typeof window<"u"&&(window.Meyda=xe),xe}))})(Ui)),Ui.exports}var Ug=qg();const Lg=_c(Ug);function Ji(e,t){let i=0;for(let r=0;r<e.length;r++)i+=(e[r]-t[r])*(e[r]-t[r]);return i}const vs={distanceFunction:Ji};function Fg(e,t,i=vs){const r=i.distanceFunction||vs.distanceFunction,n=i.similarityFunction||vs.similarityFunction;let o=-1;if(typeof n=="function"){let l=Number.MIN_VALUE;for(let h=0;h<e.length;h++){const c=n(t,e[h]);c>l&&(l=c,o=h)}}else if(typeof r=="function"){let l=Number.MAX_VALUE;for(let h=0;h<e.length;h++){const c=r(t,e[h]);c<l&&(l=c,o=h)}}else throw new Error("A similarity or distance function it's required");return o}function Wg(e,t){let i=new Array(e.length);for(let r=0;r<e.length;++r)for(let n=r;n<e.length;++n){i[r]||(i[r]=new Array(e.length)),i[n]||(i[n]=new Array(e.length));const o=t(e[r],e[n]);i[r][n]=o,i[n][r]=o}return i}function vc(e,t,i,r){for(let n=0;n<e.length;n++)i[n]=Fg(t,e[n],{distanceFunction:r});return i}function Vg(e,t,i,r){const n=t[0].length;let o=new Array(r),l=new Array(r);for(let h=0;h<r;h++){o[h]=new Array(n),l[h]=0;for(let c=0;c<n;c++)o[h][c]=0}for(let h=0;h<t.length;h++){l[i[h]]++;for(let c=0;c<n;c++)o[i[h]][c]+=t[h][c]}for(let h=0;h<r;h++)for(let c=0;c<n;c++)l[h]?o[h][c]/=l[h]:o[h][c]=e[h][c];return o}function Gg(e,t,i,r){for(let n=0;n<e.length;n++)if(i(e[n],t[n])>r)return!1;return!0}class Kg{constructor(t,i,r,n,o){this.clusters=t,this.centroids=i,this.converged=r,this.iterations=n,this.distance=o}nearest(t){const i=new Array(t.length);return vc(t,this.centroids,i,this.distance)}computeInformation(t){let i=this.centroids.map(r=>({centroid:r,error:0,size:0}));for(let r=0;r<t.length;r++)i[this.clusters[r]].error+=this.distance(t[r],this.centroids[this.clusters[r]]),i[this.clusters[r]].size++;for(let r=0;r<this.centroids.length;r++){let n=i[r].error;i[r].size&&n!==-1?n/=i[r].size:i[r].error=-1}return i}}function Hg(e,t){throw new Error(`${t}: "${String(e)}"`)}function Zg(e,t){if(t<=0||t>e.length||!Number.isInteger(t))throw new Error("K should be a positive integer smaller than the number of points")}var We={};const Xg=Object.prototype.toString;function li(e){const t=Xg.call(e);return t.endsWith("Array]")&&!t.includes("Big")}const Yg=Object.freeze(Object.defineProperty({__proto__:null,isAnyArray:li},Symbol.toStringTag,{value:"Module"})),Qg=bc(Yg);function Jg(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(!li(e))throw new TypeError("input must be an array");if(e.length===0)throw new TypeError("input must not be empty");var i=t.fromIndex,r=i===void 0?0:i,n=t.toIndex,o=n===void 0?e.length:n;if(r<0||r>=e.length||!Number.isInteger(r))throw new Error("fromIndex must be a positive integer smaller than length");if(o<=r||o>e.length||!Number.isInteger(o))throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");for(var l=e[r],h=r+1;h<o;h++)e[h]>l&&(l=e[h]);return l}function e0(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(!li(e))throw new TypeError("input must be an array");if(e.length===0)throw new TypeError("input must not be empty");var i=t.fromIndex,r=i===void 0?0:i,n=t.toIndex,o=n===void 0?e.length:n;if(r<0||r>=e.length||!Number.isInteger(r))throw new Error("fromIndex must be a positive integer smaller than length");if(o<=r||o>e.length||!Number.isInteger(o))throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");for(var l=e[r],h=r+1;h<o;h++)e[h]<l&&(l=e[h]);return l}function t0(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(li(e)){if(e.length===0)throw new TypeError("input must not be empty")}else throw new TypeError("input must be an array");var i;if(t.output!==void 0){if(!li(t.output))throw new TypeError("output option must be an array if specified");i=t.output}else i=new Array(e.length);var r=e0(e),n=Jg(e);if(r===n)throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");var o=t.min,l=o===void 0?t.autoMinMax?r:0:o,h=t.max,c=h===void 0?t.autoMinMax?n:1:h;if(l>=c)throw new RangeError("min option must be smaller than max option");for(var m=(c-l)/(n-r),y=0;y<e.length;y++)i[y]=(e[y]-r)*m+l;return i}const r0=Object.freeze(Object.defineProperty({__proto__:null,default:t0},Symbol.toStringTag,{value:"Module"})),i0=bc(r0);var Id;function n0(){if(Id)return We;Id=1,Object.defineProperty(We,"__esModule",{value:!0});var e=Qg,t=i0;const i=" ".repeat(2),r=" ".repeat(4);function n(){return o(this)}function o($,a={}){const{maxRows:d=15,maxColumns:s=10,maxNumSize:p=8,padMinus:g="auto"}=a;return`${$.constructor.name} {
${i}[
${r}${l($,d,s,p,g)}
${i}]
${i}rows: ${$.rows}
${i}columns: ${$.columns}
}`}function l($,a,d,s,p){const{rows:g,columns:z}=$,A=Math.min(g,a),M=Math.min(z,d),R=[];if(p==="auto"){p=!1;e:for(let H=0;H<A;H++)for(let L=0;L<M;L++)if($.get(H,L)<0){p=!0;break e}}for(let H=0;H<A;H++){let L=[];for(let ne=0;ne<M;ne++)L.push(h($.get(H,ne),s,p));R.push(`${L.join(" ")}`)}return M!==z&&(R[R.length-1]+=` ... ${z-d} more columns`),A!==g&&R.push(`... ${g-a} more rows`),R.join(`
${r}`)}function h($,a,d){return($>=0&&d?` ${c($,a-1)}`:c($,a)).padEnd(a)}function c($,a){let d=$.toString();if(d.length<=a)return d;let s=$.toFixed(a);if(s.length>a&&(s=$.toFixed(Math.max(0,a-(s.length-a)))),s.length<=a&&!s.startsWith("0.000")&&!s.startsWith("-0.000"))return s;let p=$.toExponential(a);return p.length>a&&(p=$.toExponential(Math.max(0,a-(p.length-a)))),p.slice(0)}function m($,a){$.prototype.add=function(s){return typeof s=="number"?this.addS(s):this.addM(s)},$.prototype.addS=function(s){for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)+s);return this},$.prototype.addM=function(s){if(s=a.checkMatrix(s),this.rows!==s.rows||this.columns!==s.columns)throw new RangeError("Matrices dimensions must be equal");for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)+s.get(p,g));return this},$.add=function(s,p){return new a(s).add(p)},$.prototype.sub=function(s){return typeof s=="number"?this.subS(s):this.subM(s)},$.prototype.subS=function(s){for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)-s);return this},$.prototype.subM=function(s){if(s=a.checkMatrix(s),this.rows!==s.rows||this.columns!==s.columns)throw new RangeError("Matrices dimensions must be equal");for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)-s.get(p,g));return this},$.sub=function(s,p){return new a(s).sub(p)},$.prototype.subtract=$.prototype.sub,$.prototype.subtractS=$.prototype.subS,$.prototype.subtractM=$.prototype.subM,$.subtract=$.sub,$.prototype.mul=function(s){return typeof s=="number"?this.mulS(s):this.mulM(s)},$.prototype.mulS=function(s){for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)*s);return this},$.prototype.mulM=function(s){if(s=a.checkMatrix(s),this.rows!==s.rows||this.columns!==s.columns)throw new RangeError("Matrices dimensions must be equal");for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)*s.get(p,g));return this},$.mul=function(s,p){return new a(s).mul(p)},$.prototype.multiply=$.prototype.mul,$.prototype.multiplyS=$.prototype.mulS,$.prototype.multiplyM=$.prototype.mulM,$.multiply=$.mul,$.prototype.div=function(s){return typeof s=="number"?this.divS(s):this.divM(s)},$.prototype.divS=function(s){for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)/s);return this},$.prototype.divM=function(s){if(s=a.checkMatrix(s),this.rows!==s.rows||this.columns!==s.columns)throw new RangeError("Matrices dimensions must be equal");for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)/s.get(p,g));return this},$.div=function(s,p){return new a(s).div(p)},$.prototype.divide=$.prototype.div,$.prototype.divideS=$.prototype.divS,$.prototype.divideM=$.prototype.divM,$.divide=$.div,$.prototype.mod=function(s){return typeof s=="number"?this.modS(s):this.modM(s)},$.prototype.modS=function(s){for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)%s);return this},$.prototype.modM=function(s){if(s=a.checkMatrix(s),this.rows!==s.rows||this.columns!==s.columns)throw new RangeError("Matrices dimensions must be equal");for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)%s.get(p,g));return this},$.mod=function(s,p){return new a(s).mod(p)},$.prototype.modulus=$.prototype.mod,$.prototype.modulusS=$.prototype.modS,$.prototype.modulusM=$.prototype.modM,$.modulus=$.mod,$.prototype.and=function(s){return typeof s=="number"?this.andS(s):this.andM(s)},$.prototype.andS=function(s){for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)&s);return this},$.prototype.andM=function(s){if(s=a.checkMatrix(s),this.rows!==s.rows||this.columns!==s.columns)throw new RangeError("Matrices dimensions must be equal");for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)&s.get(p,g));return this},$.and=function(s,p){return new a(s).and(p)},$.prototype.or=function(s){return typeof s=="number"?this.orS(s):this.orM(s)},$.prototype.orS=function(s){for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)|s);return this},$.prototype.orM=function(s){if(s=a.checkMatrix(s),this.rows!==s.rows||this.columns!==s.columns)throw new RangeError("Matrices dimensions must be equal");for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)|s.get(p,g));return this},$.or=function(s,p){return new a(s).or(p)},$.prototype.xor=function(s){return typeof s=="number"?this.xorS(s):this.xorM(s)},$.prototype.xorS=function(s){for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)^s);return this},$.prototype.xorM=function(s){if(s=a.checkMatrix(s),this.rows!==s.rows||this.columns!==s.columns)throw new RangeError("Matrices dimensions must be equal");for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)^s.get(p,g));return this},$.xor=function(s,p){return new a(s).xor(p)},$.prototype.leftShift=function(s){return typeof s=="number"?this.leftShiftS(s):this.leftShiftM(s)},$.prototype.leftShiftS=function(s){for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)<<s);return this},$.prototype.leftShiftM=function(s){if(s=a.checkMatrix(s),this.rows!==s.rows||this.columns!==s.columns)throw new RangeError("Matrices dimensions must be equal");for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)<<s.get(p,g));return this},$.leftShift=function(s,p){return new a(s).leftShift(p)},$.prototype.signPropagatingRightShift=function(s){return typeof s=="number"?this.signPropagatingRightShiftS(s):this.signPropagatingRightShiftM(s)},$.prototype.signPropagatingRightShiftS=function(s){for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)>>s);return this},$.prototype.signPropagatingRightShiftM=function(s){if(s=a.checkMatrix(s),this.rows!==s.rows||this.columns!==s.columns)throw new RangeError("Matrices dimensions must be equal");for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)>>s.get(p,g));return this},$.signPropagatingRightShift=function(s,p){return new a(s).signPropagatingRightShift(p)},$.prototype.rightShift=function(s){return typeof s=="number"?this.rightShiftS(s):this.rightShiftM(s)},$.prototype.rightShiftS=function(s){for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)>>>s);return this},$.prototype.rightShiftM=function(s){if(s=a.checkMatrix(s),this.rows!==s.rows||this.columns!==s.columns)throw new RangeError("Matrices dimensions must be equal");for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)>>>s.get(p,g));return this},$.rightShift=function(s,p){return new a(s).rightShift(p)},$.prototype.zeroFillRightShift=$.prototype.rightShift,$.prototype.zeroFillRightShiftS=$.prototype.rightShiftS,$.prototype.zeroFillRightShiftM=$.prototype.rightShiftM,$.zeroFillRightShift=$.rightShift,$.prototype.not=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,~this.get(s,p));return this},$.not=function(s){return new a(s).not()},$.prototype.abs=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.abs(this.get(s,p)));return this},$.abs=function(s){return new a(s).abs()},$.prototype.acos=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.acos(this.get(s,p)));return this},$.acos=function(s){return new a(s).acos()},$.prototype.acosh=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.acosh(this.get(s,p)));return this},$.acosh=function(s){return new a(s).acosh()},$.prototype.asin=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.asin(this.get(s,p)));return this},$.asin=function(s){return new a(s).asin()},$.prototype.asinh=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.asinh(this.get(s,p)));return this},$.asinh=function(s){return new a(s).asinh()},$.prototype.atan=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.atan(this.get(s,p)));return this},$.atan=function(s){return new a(s).atan()},$.prototype.atanh=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.atanh(this.get(s,p)));return this},$.atanh=function(s){return new a(s).atanh()},$.prototype.cbrt=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.cbrt(this.get(s,p)));return this},$.cbrt=function(s){return new a(s).cbrt()},$.prototype.ceil=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.ceil(this.get(s,p)));return this},$.ceil=function(s){return new a(s).ceil()},$.prototype.clz32=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.clz32(this.get(s,p)));return this},$.clz32=function(s){return new a(s).clz32()},$.prototype.cos=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.cos(this.get(s,p)));return this},$.cos=function(s){return new a(s).cos()},$.prototype.cosh=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.cosh(this.get(s,p)));return this},$.cosh=function(s){return new a(s).cosh()},$.prototype.exp=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.exp(this.get(s,p)));return this},$.exp=function(s){return new a(s).exp()},$.prototype.expm1=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.expm1(this.get(s,p)));return this},$.expm1=function(s){return new a(s).expm1()},$.prototype.floor=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.floor(this.get(s,p)));return this},$.floor=function(s){return new a(s).floor()},$.prototype.fround=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.fround(this.get(s,p)));return this},$.fround=function(s){return new a(s).fround()},$.prototype.log=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.log(this.get(s,p)));return this},$.log=function(s){return new a(s).log()},$.prototype.log1p=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.log1p(this.get(s,p)));return this},$.log1p=function(s){return new a(s).log1p()},$.prototype.log10=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.log10(this.get(s,p)));return this},$.log10=function(s){return new a(s).log10()},$.prototype.log2=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.log2(this.get(s,p)));return this},$.log2=function(s){return new a(s).log2()},$.prototype.round=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.round(this.get(s,p)));return this},$.round=function(s){return new a(s).round()},$.prototype.sign=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.sign(this.get(s,p)));return this},$.sign=function(s){return new a(s).sign()},$.prototype.sin=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.sin(this.get(s,p)));return this},$.sin=function(s){return new a(s).sin()},$.prototype.sinh=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.sinh(this.get(s,p)));return this},$.sinh=function(s){return new a(s).sinh()},$.prototype.sqrt=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.sqrt(this.get(s,p)));return this},$.sqrt=function(s){return new a(s).sqrt()},$.prototype.tan=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.tan(this.get(s,p)));return this},$.tan=function(s){return new a(s).tan()},$.prototype.tanh=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.tanh(this.get(s,p)));return this},$.tanh=function(s){return new a(s).tanh()},$.prototype.trunc=function(){for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.set(s,p,Math.trunc(this.get(s,p)));return this},$.trunc=function(s){return new a(s).trunc()},$.pow=function(s,p){return new a(s).pow(p)},$.prototype.pow=function(s){return typeof s=="number"?this.powS(s):this.powM(s)},$.prototype.powS=function(s){for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)**s);return this},$.prototype.powM=function(s){if(s=a.checkMatrix(s),this.rows!==s.rows||this.columns!==s.columns)throw new RangeError("Matrices dimensions must be equal");for(let p=0;p<this.rows;p++)for(let g=0;g<this.columns;g++)this.set(p,g,this.get(p,g)**s.get(p,g));return this}}function y($,a,d){let s=d?$.rows:$.rows-1;if(a<0||a>s)throw new RangeError("Row index out of range")}function _($,a,d){let s=d?$.columns:$.columns-1;if(a<0||a>s)throw new RangeError("Column index out of range")}function v($,a){if(a.to1DArray&&(a=a.to1DArray()),a.length!==$.columns)throw new RangeError("vector size must be the same as the number of columns");return a}function S($,a){if(a.to1DArray&&(a=a.to1DArray()),a.length!==$.rows)throw new RangeError("vector size must be the same as the number of rows");return a}function k($,a){if(!e.isAnyArray(a))throw new TypeError("row indices must be an array");for(let d=0;d<a.length;d++)if(a[d]<0||a[d]>=$.rows)throw new RangeError("row indices are out of range")}function E($,a){if(!e.isAnyArray(a))throw new TypeError("column indices must be an array");for(let d=0;d<a.length;d++)if(a[d]<0||a[d]>=$.columns)throw new RangeError("column indices are out of range")}function N($,a,d,s,p){if(arguments.length!==5)throw new RangeError("expected 4 arguments");if(T("startRow",a),T("endRow",d),T("startColumn",s),T("endColumn",p),a>d||s>p||a<0||a>=$.rows||d<0||d>=$.rows||s<0||s>=$.columns||p<0||p>=$.columns)throw new RangeError("Submatrix indices are out of range")}function I($,a=0){let d=[];for(let s=0;s<$;s++)d.push(a);return d}function T($,a){if(typeof a!="number")throw new TypeError(`${$} must be a number`)}function j($){if($.isEmpty())throw new Error("Empty matrix has no elements to index")}function B($){let a=I($.rows);for(let d=0;d<$.rows;++d)for(let s=0;s<$.columns;++s)a[d]+=$.get(d,s);return a}function W($){let a=I($.columns);for(let d=0;d<$.rows;++d)for(let s=0;s<$.columns;++s)a[s]+=$.get(d,s);return a}function Q($){let a=0;for(let d=0;d<$.rows;d++)for(let s=0;s<$.columns;s++)a+=$.get(d,s);return a}function X($){let a=I($.rows,1);for(let d=0;d<$.rows;++d)for(let s=0;s<$.columns;++s)a[d]*=$.get(d,s);return a}function ie($){let a=I($.columns,1);for(let d=0;d<$.rows;++d)for(let s=0;s<$.columns;++s)a[s]*=$.get(d,s);return a}function fe($){let a=1;for(let d=0;d<$.rows;d++)for(let s=0;s<$.columns;s++)a*=$.get(d,s);return a}function _e($,a,d){const s=$.rows,p=$.columns,g=[];for(let z=0;z<s;z++){let A=0,M=0,R=0;for(let H=0;H<p;H++)R=$.get(z,H)-d[z],A+=R,M+=R*R;a?g.push((M-A*A/p)/(p-1)):g.push((M-A*A/p)/p)}return g}function xe($,a,d){const s=$.rows,p=$.columns,g=[];for(let z=0;z<p;z++){let A=0,M=0,R=0;for(let H=0;H<s;H++)R=$.get(H,z)-d[z],A+=R,M+=R*R;a?g.push((M-A*A/s)/(s-1)):g.push((M-A*A/s)/s)}return g}function ke($,a,d){const s=$.rows,p=$.columns,g=s*p;let z=0,A=0,M=0;for(let R=0;R<s;R++)for(let H=0;H<p;H++)M=$.get(R,H)-d,z+=M,A+=M*M;return a?(A-z*z/g)/(g-1):(A-z*z/g)/g}function q($,a){for(let d=0;d<$.rows;d++)for(let s=0;s<$.columns;s++)$.set(d,s,$.get(d,s)-a[d])}function O($,a){for(let d=0;d<$.rows;d++)for(let s=0;s<$.columns;s++)$.set(d,s,$.get(d,s)-a[s])}function Y($,a){for(let d=0;d<$.rows;d++)for(let s=0;s<$.columns;s++)$.set(d,s,$.get(d,s)-a)}function U($){const a=[];for(let d=0;d<$.rows;d++){let s=0;for(let p=0;p<$.columns;p++)s+=$.get(d,p)**2/($.columns-1);a.push(Math.sqrt(s))}return a}function Z($,a){for(let d=0;d<$.rows;d++)for(let s=0;s<$.columns;s++)$.set(d,s,$.get(d,s)/a[d])}function oe($){const a=[];for(let d=0;d<$.columns;d++){let s=0;for(let p=0;p<$.rows;p++)s+=$.get(p,d)**2/($.rows-1);a.push(Math.sqrt(s))}return a}function le($,a){for(let d=0;d<$.rows;d++)for(let s=0;s<$.columns;s++)$.set(d,s,$.get(d,s)/a[s])}function Se($){const a=$.size-1;let d=0;for(let s=0;s<$.columns;s++)for(let p=0;p<$.rows;p++)d+=$.get(p,s)**2/a;return Math.sqrt(d)}function J($,a){for(let d=0;d<$.rows;d++)for(let s=0;s<$.columns;s++)$.set(d,s,$.get(d,s)/a)}class K{static from1DArray(a,d,s){if(a*d!==s.length)throw new RangeError("data length does not match given dimensions");let g=new P(a,d);for(let z=0;z<a;z++)for(let A=0;A<d;A++)g.set(z,A,s[z*d+A]);return g}static rowVector(a){let d=new P(1,a.length);for(let s=0;s<a.length;s++)d.set(0,s,a[s]);return d}static columnVector(a){let d=new P(a.length,1);for(let s=0;s<a.length;s++)d.set(s,0,a[s]);return d}static zeros(a,d){return new P(a,d)}static ones(a,d){return new P(a,d).fill(1)}static rand(a,d,s={}){if(typeof s!="object")throw new TypeError("options must be an object");const{random:p=Math.random}=s;let g=new P(a,d);for(let z=0;z<a;z++)for(let A=0;A<d;A++)g.set(z,A,p());return g}static randInt(a,d,s={}){if(typeof s!="object")throw new TypeError("options must be an object");const{min:p=0,max:g=1e3,random:z=Math.random}=s;if(!Number.isInteger(p))throw new TypeError("min must be an integer");if(!Number.isInteger(g))throw new TypeError("max must be an integer");if(p>=g)throw new RangeError("min must be smaller than max");let A=g-p,M=new P(a,d);for(let R=0;R<a;R++)for(let H=0;H<d;H++){let L=p+Math.round(z()*A);M.set(R,H,L)}return M}static eye(a,d,s){d===void 0&&(d=a),s===void 0&&(s=1);let p=Math.min(a,d),g=this.zeros(a,d);for(let z=0;z<p;z++)g.set(z,z,s);return g}static diag(a,d,s){let p=a.length;d===void 0&&(d=p),s===void 0&&(s=d);let g=Math.min(p,d,s),z=this.zeros(d,s);for(let A=0;A<g;A++)z.set(A,A,a[A]);return z}static min(a,d){a=this.checkMatrix(a),d=this.checkMatrix(d);let s=a.rows,p=a.columns,g=new P(s,p);for(let z=0;z<s;z++)for(let A=0;A<p;A++)g.set(z,A,Math.min(a.get(z,A),d.get(z,A)));return g}static max(a,d){a=this.checkMatrix(a),d=this.checkMatrix(d);let s=a.rows,p=a.columns,g=new this(s,p);for(let z=0;z<s;z++)for(let A=0;A<p;A++)g.set(z,A,Math.max(a.get(z,A),d.get(z,A)));return g}static checkMatrix(a){return K.isMatrix(a)?a:new P(a)}static isMatrix(a){return a!=null&&a.klass==="Matrix"}get size(){return this.rows*this.columns}apply(a){if(typeof a!="function")throw new TypeError("callback must be a function");for(let d=0;d<this.rows;d++)for(let s=0;s<this.columns;s++)a.call(this,d,s);return this}to1DArray(){let a=[];for(let d=0;d<this.rows;d++)for(let s=0;s<this.columns;s++)a.push(this.get(d,s));return a}to2DArray(){let a=[];for(let d=0;d<this.rows;d++){a.push([]);for(let s=0;s<this.columns;s++)a[d].push(this.get(d,s))}return a}toJSON(){return this.to2DArray()}isRowVector(){return this.rows===1}isColumnVector(){return this.columns===1}isVector(){return this.rows===1||this.columns===1}isSquare(){return this.rows===this.columns}isEmpty(){return this.rows===0||this.columns===0}isSymmetric(){if(this.isSquare()){for(let a=0;a<this.rows;a++)for(let d=0;d<=a;d++)if(this.get(a,d)!==this.get(d,a))return!1;return!0}return!1}isDistance(){if(!this.isSymmetric())return!1;for(let a=0;a<this.rows;a++)if(this.get(a,a)!==0)return!1;return!0}isEchelonForm(){let a=0,d=0,s=-1,p=!0,g=!1;for(;a<this.rows&&p;){for(d=0,g=!1;d<this.columns&&g===!1;)this.get(a,d)===0?d++:this.get(a,d)===1&&d>s?(g=!0,s=d):(p=!1,g=!0);a++}return p}isReducedEchelonForm(){let a=0,d=0,s=-1,p=!0,g=!1;for(;a<this.rows&&p;){for(d=0,g=!1;d<this.columns&&g===!1;)this.get(a,d)===0?d++:this.get(a,d)===1&&d>s?(g=!0,s=d):(p=!1,g=!0);for(let z=d+1;z<this.rows;z++)this.get(a,z)!==0&&(p=!1);a++}return p}echelonForm(){let a=this.clone(),d=0,s=0;for(;d<a.rows&&s<a.columns;){let p=d;for(let g=d;g<a.rows;g++)a.get(g,s)>a.get(p,s)&&(p=g);if(a.get(p,s)===0)s++;else{a.swapRows(d,p);let g=a.get(d,s);for(let z=s;z<a.columns;z++)a.set(d,z,a.get(d,z)/g);for(let z=d+1;z<a.rows;z++){let A=a.get(z,s)/a.get(d,s);a.set(z,s,0);for(let M=s+1;M<a.columns;M++)a.set(z,M,a.get(z,M)-a.get(d,M)*A)}d++,s++}}return a}reducedEchelonForm(){let a=this.echelonForm(),d=a.columns,s=a.rows,p=s-1;for(;p>=0;)if(a.maxRow(p)===0)p--;else{let g=0,z=!1;for(;g<s&&z===!1;)a.get(p,g)===1?z=!0:g++;for(let A=0;A<p;A++){let M=a.get(A,g);for(let R=g;R<d;R++){let H=a.get(A,R)-M*a.get(p,R);a.set(A,R,H)}}p--}return a}set(){throw new Error("set method is unimplemented")}get(){throw new Error("get method is unimplemented")}repeat(a={}){if(typeof a!="object")throw new TypeError("options must be an object");const{rows:d=1,columns:s=1}=a;if(!Number.isInteger(d)||d<=0)throw new TypeError("rows must be a positive integer");if(!Number.isInteger(s)||s<=0)throw new TypeError("columns must be a positive integer");let p=new P(this.rows*d,this.columns*s);for(let g=0;g<d;g++)for(let z=0;z<s;z++)p.setSubMatrix(this,this.rows*g,this.columns*z);return p}fill(a){for(let d=0;d<this.rows;d++)for(let s=0;s<this.columns;s++)this.set(d,s,a);return this}neg(){return this.mulS(-1)}getRow(a){y(this,a);let d=[];for(let s=0;s<this.columns;s++)d.push(this.get(a,s));return d}getRowVector(a){return P.rowVector(this.getRow(a))}setRow(a,d){y(this,a),d=v(this,d);for(let s=0;s<this.columns;s++)this.set(a,s,d[s]);return this}swapRows(a,d){y(this,a),y(this,d);for(let s=0;s<this.columns;s++){let p=this.get(a,s);this.set(a,s,this.get(d,s)),this.set(d,s,p)}return this}getColumn(a){_(this,a);let d=[];for(let s=0;s<this.rows;s++)d.push(this.get(s,a));return d}getColumnVector(a){return P.columnVector(this.getColumn(a))}setColumn(a,d){_(this,a),d=S(this,d);for(let s=0;s<this.rows;s++)this.set(s,a,d[s]);return this}swapColumns(a,d){_(this,a),_(this,d);for(let s=0;s<this.rows;s++){let p=this.get(s,a);this.set(s,a,this.get(s,d)),this.set(s,d,p)}return this}addRowVector(a){a=v(this,a);for(let d=0;d<this.rows;d++)for(let s=0;s<this.columns;s++)this.set(d,s,this.get(d,s)+a[s]);return this}subRowVector(a){a=v(this,a);for(let d=0;d<this.rows;d++)for(let s=0;s<this.columns;s++)this.set(d,s,this.get(d,s)-a[s]);return this}mulRowVector(a){a=v(this,a);for(let d=0;d<this.rows;d++)for(let s=0;s<this.columns;s++)this.set(d,s,this.get(d,s)*a[s]);return this}divRowVector(a){a=v(this,a);for(let d=0;d<this.rows;d++)for(let s=0;s<this.columns;s++)this.set(d,s,this.get(d,s)/a[s]);return this}addColumnVector(a){a=S(this,a);for(let d=0;d<this.rows;d++)for(let s=0;s<this.columns;s++)this.set(d,s,this.get(d,s)+a[d]);return this}subColumnVector(a){a=S(this,a);for(let d=0;d<this.rows;d++)for(let s=0;s<this.columns;s++)this.set(d,s,this.get(d,s)-a[d]);return this}mulColumnVector(a){a=S(this,a);for(let d=0;d<this.rows;d++)for(let s=0;s<this.columns;s++)this.set(d,s,this.get(d,s)*a[d]);return this}divColumnVector(a){a=S(this,a);for(let d=0;d<this.rows;d++)for(let s=0;s<this.columns;s++)this.set(d,s,this.get(d,s)/a[d]);return this}mulRow(a,d){y(this,a);for(let s=0;s<this.columns;s++)this.set(a,s,this.get(a,s)*d);return this}mulColumn(a,d){_(this,a);for(let s=0;s<this.rows;s++)this.set(s,a,this.get(s,a)*d);return this}max(a){if(this.isEmpty())return NaN;switch(a){case"row":{const d=new Array(this.rows).fill(Number.NEGATIVE_INFINITY);for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.get(s,p)>d[s]&&(d[s]=this.get(s,p));return d}case"column":{const d=new Array(this.columns).fill(Number.NEGATIVE_INFINITY);for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.get(s,p)>d[p]&&(d[p]=this.get(s,p));return d}case void 0:{let d=this.get(0,0);for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.get(s,p)>d&&(d=this.get(s,p));return d}default:throw new Error(`invalid option: ${a}`)}}maxIndex(){j(this);let a=this.get(0,0),d=[0,0];for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.get(s,p)>a&&(a=this.get(s,p),d[0]=s,d[1]=p);return d}min(a){if(this.isEmpty())return NaN;switch(a){case"row":{const d=new Array(this.rows).fill(Number.POSITIVE_INFINITY);for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.get(s,p)<d[s]&&(d[s]=this.get(s,p));return d}case"column":{const d=new Array(this.columns).fill(Number.POSITIVE_INFINITY);for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.get(s,p)<d[p]&&(d[p]=this.get(s,p));return d}case void 0:{let d=this.get(0,0);for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.get(s,p)<d&&(d=this.get(s,p));return d}default:throw new Error(`invalid option: ${a}`)}}minIndex(){j(this);let a=this.get(0,0),d=[0,0];for(let s=0;s<this.rows;s++)for(let p=0;p<this.columns;p++)this.get(s,p)<a&&(a=this.get(s,p),d[0]=s,d[1]=p);return d}maxRow(a){if(y(this,a),this.isEmpty())return NaN;let d=this.get(a,0);for(let s=1;s<this.columns;s++)this.get(a,s)>d&&(d=this.get(a,s));return d}maxRowIndex(a){y(this,a),j(this);let d=this.get(a,0),s=[a,0];for(let p=1;p<this.columns;p++)this.get(a,p)>d&&(d=this.get(a,p),s[1]=p);return s}minRow(a){if(y(this,a),this.isEmpty())return NaN;let d=this.get(a,0);for(let s=1;s<this.columns;s++)this.get(a,s)<d&&(d=this.get(a,s));return d}minRowIndex(a){y(this,a),j(this);let d=this.get(a,0),s=[a,0];for(let p=1;p<this.columns;p++)this.get(a,p)<d&&(d=this.get(a,p),s[1]=p);return s}maxColumn(a){if(_(this,a),this.isEmpty())return NaN;let d=this.get(0,a);for(let s=1;s<this.rows;s++)this.get(s,a)>d&&(d=this.get(s,a));return d}maxColumnIndex(a){_(this,a),j(this);let d=this.get(0,a),s=[0,a];for(let p=1;p<this.rows;p++)this.get(p,a)>d&&(d=this.get(p,a),s[0]=p);return s}minColumn(a){if(_(this,a),this.isEmpty())return NaN;let d=this.get(0,a);for(let s=1;s<this.rows;s++)this.get(s,a)<d&&(d=this.get(s,a));return d}minColumnIndex(a){_(this,a),j(this);let d=this.get(0,a),s=[0,a];for(let p=1;p<this.rows;p++)this.get(p,a)<d&&(d=this.get(p,a),s[0]=p);return s}diag(){let a=Math.min(this.rows,this.columns),d=[];for(let s=0;s<a;s++)d.push(this.get(s,s));return d}norm(a="frobenius"){switch(a){case"max":return this.max();case"frobenius":return Math.sqrt(this.dot(this));default:throw new RangeError(`unknown norm type: ${a}`)}}cumulativeSum(){let a=0;for(let d=0;d<this.rows;d++)for(let s=0;s<this.columns;s++)a+=this.get(d,s),this.set(d,s,a);return this}dot(a){K.isMatrix(a)&&(a=a.to1DArray());let d=this.to1DArray();if(d.length!==a.length)throw new RangeError("vectors do not have the same size");let s=0;for(let p=0;p<d.length;p++)s+=d[p]*a[p];return s}mmul(a){a=P.checkMatrix(a);let d=this.rows,s=this.columns,p=a.columns,g=new P(d,p),z=new Float64Array(s);for(let A=0;A<p;A++){for(let M=0;M<s;M++)z[M]=a.get(M,A);for(let M=0;M<d;M++){let R=0;for(let H=0;H<s;H++)R+=this.get(M,H)*z[H];g.set(M,A,R)}}return g}mpow(a){if(!this.isSquare())throw new RangeError("Matrix must be square");if(!Number.isInteger(a)||a<0)throw new RangeError("Exponent must be a non-negative integer");let d=P.eye(this.rows),s=this;for(let p=a;p>=1;p/=2)(p&1)!==0&&(d=d.mmul(s)),s=s.mmul(s);return d}strassen2x2(a){a=P.checkMatrix(a);let d=new P(2,2);const s=this.get(0,0),p=a.get(0,0),g=this.get(0,1),z=a.get(0,1),A=this.get(1,0),M=a.get(1,0),R=this.get(1,1),H=a.get(1,1),L=(s+R)*(p+H),ne=(A+R)*p,ye=s*(z-H),ee=R*(M-p),ue=(s+g)*H,ve=(A-s)*(p+z),F=(g-R)*(M+H),ge=L+ee-ue+F,$e=ye+ue,Oe=ne+ee,Re=L-ne+ye+ve;return d.set(0,0,ge),d.set(0,1,$e),d.set(1,0,Oe),d.set(1,1,Re),d}strassen3x3(a){a=P.checkMatrix(a);let d=new P(3,3);const s=this.get(0,0),p=this.get(0,1),g=this.get(0,2),z=this.get(1,0),A=this.get(1,1),M=this.get(1,2),R=this.get(2,0),H=this.get(2,1),L=this.get(2,2),ne=a.get(0,0),ye=a.get(0,1),ee=a.get(0,2),ue=a.get(1,0),ve=a.get(1,1),F=a.get(1,2),ge=a.get(2,0),$e=a.get(2,1),Oe=a.get(2,2),Re=(s+p+g-z-A-H-L)*ve,nt=(s-z)*(-ye+ve),Me=A*(-ne+ye+ue-ve-F-ge+Oe),ze=(-s+z+A)*(ne-ye+ve),tt=(z+A)*(-ne+ye),V=s*ne,de=(-s+R+H)*(ne-ee+F),be=(-s+R)*(ee-F),pe=(R+H)*(-ne+ee),Ve=(s+p+g-A-M-R-H)*F,He=H*(-ne+ee+ue-ve-F-ge+$e),st=(-g+H+L)*(ve+ge-$e),at=(g-L)*(ve-$e),ct=g*ge,Et=(H+L)*(-ge+$e),pt=(-g+A+M)*(F+ge-Oe),Rt=(g-M)*(F-Oe),bt=(A+M)*(-ge+Oe),Fe=p*ue,mt=M*$e,xt=z*ee,kt=R*ye,ht=L*Oe,sn=V+ct+Fe,an=Re+ze+tt+V+st+ct+Et,on=V+de+pe+Ve+ct+pt+bt,un=nt+Me+ze+V+ct+pt+Rt,ln=nt+ze+tt+V+mt,dn=ct+pt+Rt+bt+xt,pn=V+de+be+He+st+at+ct,qr=st+at+ct+Et+kt,Ur=V+de+be+pe+ht;return d.set(0,0,sn),d.set(0,1,an),d.set(0,2,on),d.set(1,0,un),d.set(1,1,ln),d.set(1,2,dn),d.set(2,0,pn),d.set(2,1,qr),d.set(2,2,Ur),d}mmulStrassen(a){a=P.checkMatrix(a);let d=this.clone(),s=d.rows,p=d.columns,g=a.rows,z=a.columns;p!==g&&console.warn(`Multiplying ${s} x ${p} and ${g} x ${z} matrix: dimensions do not match.`);function A(L,ne,ye){let ee=L.rows,ue=L.columns;if(ee===ne&&ue===ye)return L;{let ve=K.zeros(ne,ye);return ve=ve.setSubMatrix(L,0,0),ve}}let M=Math.max(s,g),R=Math.max(p,z);d=A(d,M,R),a=A(a,M,R);function H(L,ne,ye,ee){if(ye<=512||ee<=512)return L.mmul(ne);ye%2===1&&ee%2===1?(L=A(L,ye+1,ee+1),ne=A(ne,ye+1,ee+1)):ye%2===1?(L=A(L,ye+1,ee),ne=A(ne,ye+1,ee)):ee%2===1&&(L=A(L,ye,ee+1),ne=A(ne,ye,ee+1));let ue=parseInt(L.rows/2,10),ve=parseInt(L.columns/2,10),F=L.subMatrix(0,ue-1,0,ve-1),ge=ne.subMatrix(0,ue-1,0,ve-1),$e=L.subMatrix(0,ue-1,ve,L.columns-1),Oe=ne.subMatrix(0,ue-1,ve,ne.columns-1),Re=L.subMatrix(ue,L.rows-1,0,ve-1),nt=ne.subMatrix(ue,ne.rows-1,0,ve-1),Me=L.subMatrix(ue,L.rows-1,ve,L.columns-1),ze=ne.subMatrix(ue,ne.rows-1,ve,ne.columns-1),tt=H(K.add(F,Me),K.add(ge,ze),ue,ve),V=H(K.add(Re,Me),ge,ue,ve),de=H(F,K.sub(Oe,ze),ue,ve),be=H(Me,K.sub(nt,ge),ue,ve),pe=H(K.add(F,$e),ze,ue,ve),Ve=H(K.sub(Re,F),K.add(ge,Oe),ue,ve),He=H(K.sub($e,Me),K.add(nt,ze),ue,ve),st=K.add(tt,be);st.sub(pe),st.add(He);let at=K.add(de,pe),ct=K.add(V,be),Et=K.sub(tt,V);Et.add(de),Et.add(Ve);let pt=K.zeros(2*st.rows,2*st.columns);return pt=pt.setSubMatrix(st,0,0),pt=pt.setSubMatrix(at,st.rows,0),pt=pt.setSubMatrix(ct,0,st.columns),pt=pt.setSubMatrix(Et,st.rows,st.columns),pt.subMatrix(0,ye-1,0,ee-1)}return H(d,a,M,R)}scaleRows(a={}){if(typeof a!="object")throw new TypeError("options must be an object");const{min:d=0,max:s=1}=a;if(!Number.isFinite(d))throw new TypeError("min must be a number");if(!Number.isFinite(s))throw new TypeError("max must be a number");if(d>=s)throw new RangeError("min must be smaller than max");let p=new P(this.rows,this.columns);for(let g=0;g<this.rows;g++){const z=this.getRow(g);z.length>0&&t(z,{min:d,max:s,output:z}),p.setRow(g,z)}return p}scaleColumns(a={}){if(typeof a!="object")throw new TypeError("options must be an object");const{min:d=0,max:s=1}=a;if(!Number.isFinite(d))throw new TypeError("min must be a number");if(!Number.isFinite(s))throw new TypeError("max must be a number");if(d>=s)throw new RangeError("min must be smaller than max");let p=new P(this.rows,this.columns);for(let g=0;g<this.columns;g++){const z=this.getColumn(g);z.length&&t(z,{min:d,max:s,output:z}),p.setColumn(g,z)}return p}flipRows(){const a=Math.ceil(this.columns/2);for(let d=0;d<this.rows;d++)for(let s=0;s<a;s++){let p=this.get(d,s),g=this.get(d,this.columns-1-s);this.set(d,s,g),this.set(d,this.columns-1-s,p)}return this}flipColumns(){const a=Math.ceil(this.rows/2);for(let d=0;d<this.columns;d++)for(let s=0;s<a;s++){let p=this.get(s,d),g=this.get(this.rows-1-s,d);this.set(s,d,g),this.set(this.rows-1-s,d,p)}return this}kroneckerProduct(a){a=P.checkMatrix(a);let d=this.rows,s=this.columns,p=a.rows,g=a.columns,z=new P(d*p,s*g);for(let A=0;A<d;A++)for(let M=0;M<s;M++)for(let R=0;R<p;R++)for(let H=0;H<g;H++)z.set(p*A+R,g*M+H,this.get(A,M)*a.get(R,H));return z}kroneckerSum(a){if(a=P.checkMatrix(a),!this.isSquare()||!a.isSquare())throw new Error("Kronecker Sum needs two Square Matrices");let d=this.rows,s=a.rows,p=this.kroneckerProduct(P.eye(s,s)),g=P.eye(d,d).kroneckerProduct(a);return p.add(g)}transpose(){let a=new P(this.columns,this.rows);for(let d=0;d<this.rows;d++)for(let s=0;s<this.columns;s++)a.set(s,d,this.get(d,s));return a}sortRows(a=me){for(let d=0;d<this.rows;d++)this.setRow(d,this.getRow(d).sort(a));return this}sortColumns(a=me){for(let d=0;d<this.columns;d++)this.setColumn(d,this.getColumn(d).sort(a));return this}subMatrix(a,d,s,p){N(this,a,d,s,p);let g=new P(d-a+1,p-s+1);for(let z=a;z<=d;z++)for(let A=s;A<=p;A++)g.set(z-a,A-s,this.get(z,A));return g}subMatrixRow(a,d,s){if(d===void 0&&(d=0),s===void 0&&(s=this.columns-1),d>s||d<0||d>=this.columns||s<0||s>=this.columns)throw new RangeError("Argument out of range");let p=new P(a.length,s-d+1);for(let g=0;g<a.length;g++)for(let z=d;z<=s;z++){if(a[g]<0||a[g]>=this.rows)throw new RangeError(`Row index out of range: ${a[g]}`);p.set(g,z-d,this.get(a[g],z))}return p}subMatrixColumn(a,d,s){if(d===void 0&&(d=0),s===void 0&&(s=this.rows-1),d>s||d<0||d>=this.rows||s<0||s>=this.rows)throw new RangeError("Argument out of range");let p=new P(s-d+1,a.length);for(let g=0;g<a.length;g++)for(let z=d;z<=s;z++){if(a[g]<0||a[g]>=this.columns)throw new RangeError(`Column index out of range: ${a[g]}`);p.set(z-d,g,this.get(z,a[g]))}return p}setSubMatrix(a,d,s){if(a=P.checkMatrix(a),a.isEmpty())return this;let p=d+a.rows-1,g=s+a.columns-1;N(this,d,p,s,g);for(let z=0;z<a.rows;z++)for(let A=0;A<a.columns;A++)this.set(d+z,s+A,a.get(z,A));return this}selection(a,d){k(this,a),E(this,d);let s=new P(a.length,d.length);for(let p=0;p<a.length;p++){let g=a[p];for(let z=0;z<d.length;z++){let A=d[z];s.set(p,z,this.get(g,A))}}return s}trace(){let a=Math.min(this.rows,this.columns),d=0;for(let s=0;s<a;s++)d+=this.get(s,s);return d}clone(){return this.constructor.copy(this,new P(this.rows,this.columns))}static copy(a,d){for(const[s,p,g]of a.entries())d.set(s,p,g);return d}sum(a){switch(a){case"row":return B(this);case"column":return W(this);case void 0:return Q(this);default:throw new Error(`invalid option: ${a}`)}}product(a){switch(a){case"row":return X(this);case"column":return ie(this);case void 0:return fe(this);default:throw new Error(`invalid option: ${a}`)}}mean(a){const d=this.sum(a);switch(a){case"row":{for(let s=0;s<this.rows;s++)d[s]/=this.columns;return d}case"column":{for(let s=0;s<this.columns;s++)d[s]/=this.rows;return d}case void 0:return d/this.size;default:throw new Error(`invalid option: ${a}`)}}variance(a,d={}){if(typeof a=="object"&&(d=a,a=void 0),typeof d!="object")throw new TypeError("options must be an object");const{unbiased:s=!0,mean:p=this.mean(a)}=d;if(typeof s!="boolean")throw new TypeError("unbiased must be a boolean");switch(a){case"row":{if(!e.isAnyArray(p))throw new TypeError("mean must be an array");return _e(this,s,p)}case"column":{if(!e.isAnyArray(p))throw new TypeError("mean must be an array");return xe(this,s,p)}case void 0:{if(typeof p!="number")throw new TypeError("mean must be a number");return ke(this,s,p)}default:throw new Error(`invalid option: ${a}`)}}standardDeviation(a,d){typeof a=="object"&&(d=a,a=void 0);const s=this.variance(a,d);if(a===void 0)return Math.sqrt(s);for(let p=0;p<s.length;p++)s[p]=Math.sqrt(s[p]);return s}center(a,d={}){if(typeof a=="object"&&(d=a,a=void 0),typeof d!="object")throw new TypeError("options must be an object");const{center:s=this.mean(a)}=d;switch(a){case"row":{if(!e.isAnyArray(s))throw new TypeError("center must be an array");return q(this,s),this}case"column":{if(!e.isAnyArray(s))throw new TypeError("center must be an array");return O(this,s),this}case void 0:{if(typeof s!="number")throw new TypeError("center must be a number");return Y(this,s),this}default:throw new Error(`invalid option: ${a}`)}}scale(a,d={}){if(typeof a=="object"&&(d=a,a=void 0),typeof d!="object")throw new TypeError("options must be an object");let s=d.scale;switch(a){case"row":{if(s===void 0)s=U(this);else if(!e.isAnyArray(s))throw new TypeError("scale must be an array");return Z(this,s),this}case"column":{if(s===void 0)s=oe(this);else if(!e.isAnyArray(s))throw new TypeError("scale must be an array");return le(this,s),this}case void 0:{if(s===void 0)s=Se(this);else if(typeof s!="number")throw new TypeError("scale must be a number");return J(this,s),this}default:throw new Error(`invalid option: ${a}`)}}toString(a){return o(this,a)}[Symbol.iterator](){return this.entries()}*entries(){for(let a=0;a<this.rows;a++)for(let d=0;d<this.columns;d++)yield[a,d,this.get(a,d)]}*values(){for(let a=0;a<this.rows;a++)for(let d=0;d<this.columns;d++)yield this.get(a,d)}}K.prototype.klass="Matrix",typeof Symbol<"u"&&(K.prototype[Symbol.for("nodejs.util.inspect.custom")]=n);function me($,a){return $-a}function De($){return $.every(a=>typeof a=="number")}K.random=K.rand,K.randomInt=K.randInt,K.diagonal=K.diag,K.prototype.diagonal=K.prototype.diag,K.identity=K.eye,K.prototype.negate=K.prototype.neg,K.prototype.tensorProduct=K.prototype.kroneckerProduct;class P extends K{data;#e(a,d){if(this.data=[],Number.isInteger(d)&&d>=0)for(let s=0;s<a;s++)this.data.push(new Float64Array(d));else throw new TypeError("nColumns must be a positive integer");this.rows=a,this.columns=d}constructor(a,d){if(super(),P.isMatrix(a))this.#e(a.rows,a.columns),P.copy(a,this);else if(Number.isInteger(a)&&a>=0)this.#e(a,d);else if(e.isAnyArray(a)){const s=a;if(a=s.length,d=a?s[0].length:0,typeof d!="number")throw new TypeError("Data must be a 2D array with at least one element");this.data=[];for(let p=0;p<a;p++){if(s[p].length!==d)throw new RangeError("Inconsistent array dimensions");if(!De(s[p]))throw new TypeError("Input data contains non-numeric values");this.data.push(Float64Array.from(s[p]))}this.rows=a,this.columns=d}else throw new TypeError("First argument must be a positive number or an array")}set(a,d,s){return this.data[a][d]=s,this}get(a,d){return this.data[a][d]}removeRow(a){return y(this,a),this.data.splice(a,1),this.rows-=1,this}addRow(a,d){return d===void 0&&(d=a,a=this.rows),y(this,a,!0),d=Float64Array.from(v(this,d)),this.data.splice(a,0,d),this.rows+=1,this}removeColumn(a){_(this,a);for(let d=0;d<this.rows;d++){const s=new Float64Array(this.columns-1);for(let p=0;p<a;p++)s[p]=this.data[d][p];for(let p=a+1;p<this.columns;p++)s[p-1]=this.data[d][p];this.data[d]=s}return this.columns-=1,this}addColumn(a,d){typeof d>"u"&&(d=a,a=this.columns),_(this,a,!0),d=S(this,d);for(let s=0;s<this.rows;s++){const p=new Float64Array(this.columns+1);let g=0;for(;g<a;g++)p[g]=this.data[s][g];for(p[g++]=d[s];g<this.columns+1;g++)p[g]=this.data[s][g-1];this.data[s]=p}return this.columns+=1,this}}m(K,P);class Ae extends K{#e;get size(){return this.#e.size}get rows(){return this.#e.rows}get columns(){return this.#e.columns}get diagonalSize(){return this.rows}static isSymmetricMatrix(a){return P.isMatrix(a)&&a.klassType==="SymmetricMatrix"}static zeros(a){return new this(a)}static ones(a){return new this(a).fill(1)}constructor(a){if(super(),P.isMatrix(a)){if(!a.isSymmetric())throw new TypeError("not symmetric data");this.#e=P.copy(a,new P(a.rows,a.rows))}else if(Number.isInteger(a)&&a>=0)this.#e=new P(a,a);else if(this.#e=new P(a),!this.isSymmetric())throw new TypeError("not symmetric data")}clone(){const a=new Ae(this.diagonalSize);for(const[d,s,p]of this.upperRightEntries())a.set(d,s,p);return a}toMatrix(){return new P(this)}get(a,d){return this.#e.get(a,d)}set(a,d,s){return this.#e.set(a,d,s),this.#e.set(d,a,s),this}removeCross(a){return this.#e.removeRow(a),this.#e.removeColumn(a),this}addCross(a,d){d===void 0&&(d=a,a=this.diagonalSize);const s=d.slice();return s.splice(a,1),this.#e.addRow(a,s),this.#e.addColumn(a,d),this}applyMask(a){if(a.length!==this.diagonalSize)throw new RangeError("Mask size do not match with matrix size");const d=[];for(const[s,p]of a.entries())p||d.push(s);d.reverse();for(const s of d)this.removeCross(s);return this}toCompact(){const{diagonalSize:a}=this,d=new Array(a*(a+1)/2);for(let s=0,p=0,g=0;g<d.length;g++)d[g]=this.get(p,s),++s>=a&&(s=++p);return d}static fromCompact(a){const d=a.length,s=(Math.sqrt(8*d+1)-1)/2;if(!Number.isInteger(s))throw new TypeError(`This array is not a compact representation of a Symmetric Matrix, ${JSON.stringify(a)}`);const p=new Ae(s);for(let g=0,z=0,A=0;A<d;A++)p.set(g,z,a[A]),++g>=s&&(g=++z);return p}*upperRightEntries(){for(let a=0,d=0;a<this.diagonalSize;void 0){const s=this.get(a,d);yield[a,d,s],++d>=this.diagonalSize&&(d=++a)}}*upperRightValues(){for(let a=0,d=0;a<this.diagonalSize;void 0)yield this.get(a,d),++d>=this.diagonalSize&&(d=++a)}}Ae.prototype.klassType="SymmetricMatrix";class it extends Ae{static isDistanceMatrix(a){return Ae.isSymmetricMatrix(a)&&a.klassSubType==="DistanceMatrix"}constructor(a){if(super(a),!this.isDistance())throw new TypeError("Provided arguments do no produce a distance matrix")}set(a,d,s){return a===d&&(s=0),super.set(a,d,s)}addCross(a,d){return d===void 0&&(d=a,a=this.diagonalSize),d=d.slice(),d[a]=0,super.addCross(a,d)}toSymmetricMatrix(){return new Ae(this)}clone(){const a=new it(this.diagonalSize);for(const[d,s,p]of this.upperRightEntries())d!==s&&a.set(d,s,p);return a}toCompact(){const{diagonalSize:a}=this,d=(a-1)*a/2,s=new Array(d);for(let p=1,g=0,z=0;z<s.length;z++)s[z]=this.get(g,p),++p>=a&&(p=++g+1);return s}static fromCompact(a){const d=a.length;if(d===0)return new this(0);const s=(Math.sqrt(8*d+1)+1)/2;if(!Number.isInteger(s))throw new TypeError(`This array is not a compact representation of a DistanceMatrix, ${JSON.stringify(a)}`);const p=new this(s);for(let g=1,z=0,A=0;A<d;A++)p.set(g,z,a[A]),++g>=s&&(g=++z+1);return p}}it.prototype.klassSubType="DistanceMatrix";class je extends K{constructor(a,d,s){super(),this.matrix=a,this.rows=d,this.columns=s}}class Ye extends je{constructor(a,d){_(a,d),super(a,a.rows,1),this.column=d}set(a,d,s){return this.matrix.set(a,this.column,s),this}get(a){return this.matrix.get(a,this.column)}}class Ue extends je{constructor(a,d){E(a,d),super(a,a.rows,d.length),this.columnIndices=d}set(a,d,s){return this.matrix.set(a,this.columnIndices[d],s),this}get(a,d){return this.matrix.get(a,this.columnIndices[d])}}class lt extends je{constructor(a){super(a,a.rows,a.columns)}set(a,d,s){return this.matrix.set(a,this.columns-d-1,s),this}get(a,d){return this.matrix.get(a,this.columns-d-1)}}class dt extends je{constructor(a){super(a,a.rows,a.columns)}set(a,d,s){return this.matrix.set(this.rows-a-1,d,s),this}get(a,d){return this.matrix.get(this.rows-a-1,d)}}class vt extends je{constructor(a,d){y(a,d),super(a,1,a.columns),this.row=d}set(a,d,s){return this.matrix.set(this.row,d,s),this}get(a,d){return this.matrix.get(this.row,d)}}class or extends je{constructor(a,d){k(a,d),super(a,d.length,a.columns),this.rowIndices=d}set(a,d,s){return this.matrix.set(this.rowIndices[a],d,s),this}get(a,d){return this.matrix.get(this.rowIndices[a],d)}}class ur extends je{constructor(a,d,s){k(a,d),E(a,s),super(a,d.length,s.length),this.rowIndices=d,this.columnIndices=s}set(a,d,s){return this.matrix.set(this.rowIndices[a],this.columnIndices[d],s),this}get(a,d){return this.matrix.get(this.rowIndices[a],this.columnIndices[d])}}class Wt extends je{constructor(a,d,s,p,g){N(a,d,s,p,g),super(a,s-d+1,g-p+1),this.startRow=d,this.startColumn=p}set(a,d,s){return this.matrix.set(this.startRow+a,this.startColumn+d,s),this}get(a,d){return this.matrix.get(this.startRow+a,this.startColumn+d)}}class di extends je{constructor(a){super(a,a.columns,a.rows)}set(a,d,s){return this.matrix.set(d,a,s),this}get(a,d){return this.matrix.get(d,a)}}class Tr extends K{constructor(a,d={}){const{rows:s=1}=d;if(a.length%s!==0)throw new Error("the data length is not divisible by the number of rows");super(),this.rows=s,this.columns=a.length/s,this.data=a}set(a,d,s){let p=this._calculateIndex(a,d);return this.data[p]=s,this}get(a,d){let s=this._calculateIndex(a,d);return this.data[s]}_calculateIndex(a,d){return a*this.columns+d}}class $t extends K{constructor(a){super(),this.data=a,this.rows=a.length,this.columns=a[0].length}set(a,d,s){return this.data[a][d]=s,this}get(a,d){return this.data[a][d]}}function Nr($,a){if(e.isAnyArray($))return $[0]&&e.isAnyArray($[0])?new $t($):new Tr($,a);throw new Error("the argument is not an array")}class lr{constructor(a){a=$t.checkMatrix(a);let d=a.clone(),s=d.rows,p=d.columns,g=new Float64Array(s),z=1,A,M,R,H,L,ne,ye,ee,ue;for(A=0;A<s;A++)g[A]=A;for(ee=new Float64Array(s),M=0;M<p;M++){for(A=0;A<s;A++)ee[A]=d.get(A,M);for(A=0;A<s;A++){for(ue=Math.min(A,M),L=0,R=0;R<ue;R++)L+=d.get(A,R)*ee[R];ee[A]-=L,d.set(A,M,ee[A])}for(H=M,A=M+1;A<s;A++)Math.abs(ee[A])>Math.abs(ee[H])&&(H=A);if(H!==M){for(R=0;R<p;R++)ne=d.get(H,R),d.set(H,R,d.get(M,R)),d.set(M,R,ne);ye=g[H],g[H]=g[M],g[M]=ye,z=-z}if(M<s&&d.get(M,M)!==0)for(A=M+1;A<s;A++)d.set(A,M,d.get(A,M)/d.get(M,M))}this.LU=d,this.pivotVector=g,this.pivotSign=z}isSingular(){let a=this.LU,d=a.columns;for(let s=0;s<d;s++)if(a.get(s,s)===0)return!0;return!1}solve(a){a=P.checkMatrix(a);let d=this.LU;if(d.rows!==a.rows)throw new Error("Invalid matrix dimensions");if(this.isSingular())throw new Error("LU matrix is singular");let p=a.columns,g=a.subMatrixRow(this.pivotVector,0,p-1),z=d.columns,A,M,R;for(R=0;R<z;R++)for(A=R+1;A<z;A++)for(M=0;M<p;M++)g.set(A,M,g.get(A,M)-g.get(R,M)*d.get(A,R));for(R=z-1;R>=0;R--){for(M=0;M<p;M++)g.set(R,M,g.get(R,M)/d.get(R,R));for(A=0;A<R;A++)for(M=0;M<p;M++)g.set(A,M,g.get(A,M)-g.get(R,M)*d.get(A,R))}return g}get determinant(){let a=this.LU;if(!a.isSquare())throw new Error("Matrix must be square");let d=this.pivotSign,s=a.columns;for(let p=0;p<s;p++)d*=a.get(p,p);return d}get lowerTriangularMatrix(){let a=this.LU,d=a.rows,s=a.columns,p=new P(d,s);for(let g=0;g<d;g++)for(let z=0;z<s;z++)g>z?p.set(g,z,a.get(g,z)):g===z?p.set(g,z,1):p.set(g,z,0);return p}get upperTriangularMatrix(){let a=this.LU,d=a.rows,s=a.columns,p=new P(d,s);for(let g=0;g<d;g++)for(let z=0;z<s;z++)g<=z?p.set(g,z,a.get(g,z)):p.set(g,z,0);return p}get pivotPermutationVector(){return Array.from(this.pivotVector)}}function wt($,a){let d=0;return Math.abs($)>Math.abs(a)?(d=a/$,Math.abs($)*Math.sqrt(1+d*d)):a!==0?(d=$/a,Math.abs(a)*Math.sqrt(1+d*d)):0}class et{constructor(a){a=$t.checkMatrix(a);let d=a.clone(),s=a.rows,p=a.columns,g=new Float64Array(p),z,A,M,R;for(M=0;M<p;M++){let H=0;for(z=M;z<s;z++)H=wt(H,d.get(z,M));if(H!==0){for(d.get(M,M)<0&&(H=-H),z=M;z<s;z++)d.set(z,M,d.get(z,M)/H);for(d.set(M,M,d.get(M,M)+1),A=M+1;A<p;A++){for(R=0,z=M;z<s;z++)R+=d.get(z,M)*d.get(z,A);for(R=-R/d.get(M,M),z=M;z<s;z++)d.set(z,A,d.get(z,A)+R*d.get(z,M))}}g[M]=-H}this.QR=d,this.Rdiag=g}solve(a){a=P.checkMatrix(a);let d=this.QR,s=d.rows;if(a.rows!==s)throw new Error("Matrix row dimensions must agree");if(!this.isFullRank())throw new Error("Matrix is rank deficient");let p=a.columns,g=a.clone(),z=d.columns,A,M,R,H;for(R=0;R<z;R++)for(M=0;M<p;M++){for(H=0,A=R;A<s;A++)H+=d.get(A,R)*g.get(A,M);for(H=-H/d.get(R,R),A=R;A<s;A++)g.set(A,M,g.get(A,M)+H*d.get(A,R))}for(R=z-1;R>=0;R--){for(M=0;M<p;M++)g.set(R,M,g.get(R,M)/this.Rdiag[R]);for(A=0;A<R;A++)for(M=0;M<p;M++)g.set(A,M,g.get(A,M)-g.get(R,M)*d.get(A,R))}return g.subMatrix(0,z-1,0,p-1)}isFullRank(){let a=this.QR.columns;for(let d=0;d<a;d++)if(this.Rdiag[d]===0)return!1;return!0}get upperTriangularMatrix(){let a=this.QR,d=a.columns,s=new P(d,d),p,g;for(p=0;p<d;p++)for(g=0;g<d;g++)p<g?s.set(p,g,a.get(p,g)):p===g?s.set(p,g,this.Rdiag[p]):s.set(p,g,0);return s}get orthogonalMatrix(){let a=this.QR,d=a.rows,s=a.columns,p=new P(d,s),g,z,A,M;for(A=s-1;A>=0;A--){for(g=0;g<d;g++)p.set(g,A,0);for(p.set(A,A,1),z=A;z<s;z++)if(a.get(A,A)!==0){for(M=0,g=A;g<d;g++)M+=a.get(g,A)*p.get(g,z);for(M=-M/a.get(A,A),g=A;g<d;g++)p.set(g,z,p.get(g,z)+M*a.get(g,A))}}return p}}class Vt{constructor(a,d={}){if(a=$t.checkMatrix(a),a.isEmpty())throw new Error("Matrix must be non-empty");let s=a.rows,p=a.columns;const{computeLeftSingularVectors:g=!0,computeRightSingularVectors:z=!0,autoTranspose:A=!1}=d;let M=!!g,R=!!z,H=!1,L;if(s<p)if(!A)L=a.clone(),console.warn("Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose");else{L=a.transpose(),s=L.rows,p=L.columns,H=!0;let V=M;M=R,R=V}else L=a.clone();let ne=Math.min(s,p),ye=Math.min(s+1,p),ee=new Float64Array(ye),ue=new P(s,ne),ve=new P(p,p),F=new Float64Array(p),ge=new Float64Array(s),$e=new Float64Array(ye);for(let V=0;V<ye;V++)$e[V]=V;let Oe=Math.min(s-1,p),Re=Math.max(0,Math.min(p-2,s)),nt=Math.max(Oe,Re);for(let V=0;V<nt;V++){if(V<Oe){ee[V]=0;for(let de=V;de<s;de++)ee[V]=wt(ee[V],L.get(de,V));if(ee[V]!==0){L.get(V,V)<0&&(ee[V]=-ee[V]);for(let de=V;de<s;de++)L.set(de,V,L.get(de,V)/ee[V]);L.set(V,V,L.get(V,V)+1)}ee[V]=-ee[V]}for(let de=V+1;de<p;de++){if(V<Oe&&ee[V]!==0){let be=0;for(let pe=V;pe<s;pe++)be+=L.get(pe,V)*L.get(pe,de);be=-be/L.get(V,V);for(let pe=V;pe<s;pe++)L.set(pe,de,L.get(pe,de)+be*L.get(pe,V))}F[de]=L.get(V,de)}if(M&&V<Oe)for(let de=V;de<s;de++)ue.set(de,V,L.get(de,V));if(V<Re){F[V]=0;for(let de=V+1;de<p;de++)F[V]=wt(F[V],F[de]);if(F[V]!==0){F[V+1]<0&&(F[V]=0-F[V]);for(let de=V+1;de<p;de++)F[de]/=F[V];F[V+1]+=1}if(F[V]=-F[V],V+1<s&&F[V]!==0){for(let de=V+1;de<s;de++)ge[de]=0;for(let de=V+1;de<s;de++)for(let be=V+1;be<p;be++)ge[de]+=F[be]*L.get(de,be);for(let de=V+1;de<p;de++){let be=-F[de]/F[V+1];for(let pe=V+1;pe<s;pe++)L.set(pe,de,L.get(pe,de)+be*ge[pe])}}if(R)for(let de=V+1;de<p;de++)ve.set(de,V,F[de])}}let Me=Math.min(p,s+1);if(Oe<p&&(ee[Oe]=L.get(Oe,Oe)),s<Me&&(ee[Me-1]=0),Re+1<Me&&(F[Re]=L.get(Re,Me-1)),F[Me-1]=0,M){for(let V=Oe;V<ne;V++){for(let de=0;de<s;de++)ue.set(de,V,0);ue.set(V,V,1)}for(let V=Oe-1;V>=0;V--)if(ee[V]!==0){for(let de=V+1;de<ne;de++){let be=0;for(let pe=V;pe<s;pe++)be+=ue.get(pe,V)*ue.get(pe,de);be=-be/ue.get(V,V);for(let pe=V;pe<s;pe++)ue.set(pe,de,ue.get(pe,de)+be*ue.get(pe,V))}for(let de=V;de<s;de++)ue.set(de,V,-ue.get(de,V));ue.set(V,V,1+ue.get(V,V));for(let de=0;de<V-1;de++)ue.set(de,V,0)}else{for(let de=0;de<s;de++)ue.set(de,V,0);ue.set(V,V,1)}}if(R)for(let V=p-1;V>=0;V--){if(V<Re&&F[V]!==0)for(let de=V+1;de<p;de++){let be=0;for(let pe=V+1;pe<p;pe++)be+=ve.get(pe,V)*ve.get(pe,de);be=-be/ve.get(V+1,V);for(let pe=V+1;pe<p;pe++)ve.set(pe,de,ve.get(pe,de)+be*ve.get(pe,V))}for(let de=0;de<p;de++)ve.set(de,V,0);ve.set(V,V,1)}let ze=Me-1,tt=Number.EPSILON;for(;Me>0;){let V,de;for(V=Me-2;V>=-1&&V!==-1;V--){const be=Number.MIN_VALUE+tt*Math.abs(ee[V]+Math.abs(ee[V+1]));if(Math.abs(F[V])<=be||Number.isNaN(F[V])){F[V]=0;break}}if(V===Me-2)de=4;else{let be;for(be=Me-1;be>=V&&be!==V;be--){let pe=(be!==Me?Math.abs(F[be]):0)+(be!==V+1?Math.abs(F[be-1]):0);if(Math.abs(ee[be])<=tt*pe){ee[be]=0;break}}be===V?de=3:be===Me-1?de=1:(de=2,V=be)}switch(V++,de){case 1:{let be=F[Me-2];F[Me-2]=0;for(let pe=Me-2;pe>=V;pe--){let Ve=wt(ee[pe],be),He=ee[pe]/Ve,st=be/Ve;if(ee[pe]=Ve,pe!==V&&(be=-st*F[pe-1],F[pe-1]=He*F[pe-1]),R)for(let at=0;at<p;at++)Ve=He*ve.get(at,pe)+st*ve.get(at,Me-1),ve.set(at,Me-1,-st*ve.get(at,pe)+He*ve.get(at,Me-1)),ve.set(at,pe,Ve)}break}case 2:{let be=F[V-1];F[V-1]=0;for(let pe=V;pe<Me;pe++){let Ve=wt(ee[pe],be),He=ee[pe]/Ve,st=be/Ve;if(ee[pe]=Ve,be=-st*F[pe],F[pe]=He*F[pe],M)for(let at=0;at<s;at++)Ve=He*ue.get(at,pe)+st*ue.get(at,V-1),ue.set(at,V-1,-st*ue.get(at,pe)+He*ue.get(at,V-1)),ue.set(at,pe,Ve)}break}case 3:{const be=Math.max(Math.abs(ee[Me-1]),Math.abs(ee[Me-2]),Math.abs(F[Me-2]),Math.abs(ee[V]),Math.abs(F[V])),pe=ee[Me-1]/be,Ve=ee[Me-2]/be,He=F[Me-2]/be,st=ee[V]/be,at=F[V]/be,ct=((Ve+pe)*(Ve-pe)+He*He)/2,Et=pe*He*(pe*He);let pt=0;(ct!==0||Et!==0)&&(ct<0?pt=0-Math.sqrt(ct*ct+Et):pt=Math.sqrt(ct*ct+Et),pt=Et/(ct+pt));let Rt=(st+pe)*(st-pe)+pt,bt=st*at;for(let Fe=V;Fe<Me-1;Fe++){let mt=wt(Rt,bt);mt===0&&(mt=Number.MIN_VALUE);let xt=Rt/mt,kt=bt/mt;if(Fe!==V&&(F[Fe-1]=mt),Rt=xt*ee[Fe]+kt*F[Fe],F[Fe]=xt*F[Fe]-kt*ee[Fe],bt=kt*ee[Fe+1],ee[Fe+1]=xt*ee[Fe+1],R)for(let ht=0;ht<p;ht++)mt=xt*ve.get(ht,Fe)+kt*ve.get(ht,Fe+1),ve.set(ht,Fe+1,-kt*ve.get(ht,Fe)+xt*ve.get(ht,Fe+1)),ve.set(ht,Fe,mt);if(mt=wt(Rt,bt),mt===0&&(mt=Number.MIN_VALUE),xt=Rt/mt,kt=bt/mt,ee[Fe]=mt,Rt=xt*F[Fe]+kt*ee[Fe+1],ee[Fe+1]=-kt*F[Fe]+xt*ee[Fe+1],bt=kt*F[Fe+1],F[Fe+1]=xt*F[Fe+1],M&&Fe<s-1)for(let ht=0;ht<s;ht++)mt=xt*ue.get(ht,Fe)+kt*ue.get(ht,Fe+1),ue.set(ht,Fe+1,-kt*ue.get(ht,Fe)+xt*ue.get(ht,Fe+1)),ue.set(ht,Fe,mt)}F[Me-2]=Rt;break}case 4:{if(ee[V]<=0&&(ee[V]=ee[V]<0?-ee[V]:0,R))for(let be=0;be<=ze;be++)ve.set(be,V,-ve.get(be,V));for(;V<ze&&!(ee[V]>=ee[V+1]);){let be=ee[V];if(ee[V]=ee[V+1],ee[V+1]=be,R&&V<p-1)for(let pe=0;pe<p;pe++)be=ve.get(pe,V+1),ve.set(pe,V+1,ve.get(pe,V)),ve.set(pe,V,be);if(M&&V<s-1)for(let pe=0;pe<s;pe++)be=ue.get(pe,V+1),ue.set(pe,V+1,ue.get(pe,V)),ue.set(pe,V,be);V++}Me--;break}}}if(H){let V=ve;ve=ue,ue=V}this.m=s,this.n=p,this.s=ee,this.U=ue,this.V=ve}solve(a){let d=a,s=this.threshold,p=this.s.length,g=P.zeros(p,p);for(let ne=0;ne<p;ne++)Math.abs(this.s[ne])<=s?g.set(ne,ne,0):g.set(ne,ne,1/this.s[ne]);let z=this.U,A=this.rightSingularVectors,M=A.mmul(g),R=A.rows,H=z.rows,L=P.zeros(R,H);for(let ne=0;ne<R;ne++)for(let ye=0;ye<H;ye++){let ee=0;for(let ue=0;ue<p;ue++)ee+=M.get(ne,ue)*z.get(ye,ue);L.set(ne,ye,ee)}return L.mmul(d)}solveForDiagonal(a){return this.solve(P.diag(a))}inverse(){let a=this.V,d=this.threshold,s=a.rows,p=a.columns,g=new P(s,this.s.length);for(let H=0;H<s;H++)for(let L=0;L<p;L++)Math.abs(this.s[L])>d&&g.set(H,L,a.get(H,L)/this.s[L]);let z=this.U,A=z.rows,M=z.columns,R=new P(s,A);for(let H=0;H<s;H++)for(let L=0;L<A;L++){let ne=0;for(let ye=0;ye<M;ye++)ne+=g.get(H,ye)*z.get(L,ye);R.set(H,L,ne)}return R}get condition(){return this.s[0]/this.s[Math.min(this.m,this.n)-1]}get norm2(){return this.s[0]}get rank(){let a=Math.max(this.m,this.n)*this.s[0]*Number.EPSILON,d=0,s=this.s;for(let p=0,g=s.length;p<g;p++)s[p]>a&&d++;return d}get diagonal(){return Array.from(this.s)}get threshold(){return Number.EPSILON/2*Math.max(this.m,this.n)*this.s[0]}get leftSingularVectors(){return this.U}get rightSingularVectors(){return this.V}get diagonalMatrix(){return P.diag(this.s)}}function pi($,a=!1){return $=$t.checkMatrix($),a?new Vt($).inverse():Er($,P.eye($.rows))}function Er($,a,d=!1){return $=$t.checkMatrix($),a=$t.checkMatrix(a),d?new Vt($).solve(a):$.isSquare()?new lr($).solve(a):new et($).solve(a)}function Tt($){if($=P.checkMatrix($),$.isSquare()){if($.columns===0)return 1;let a,d,s,p;if($.columns===2)return a=$.get(0,0),d=$.get(0,1),s=$.get(1,0),p=$.get(1,1),a*p-d*s;if($.columns===3){let g,z,A;return g=new ur($,[1,2],[1,2]),z=new ur($,[1,2],[0,2]),A=new ur($,[1,2],[0,1]),a=$.get(0,0),d=$.get(0,1),s=$.get(0,2),a*Tt(g)-d*Tt(z)+s*Tt(A)}else return new lr($).determinant}else throw Error("determinant can only be calculated for a square matrix")}function dr($,a){let d=[];for(let s=0;s<$;s++)s!==a&&d.push(s);return d}function hi($,a,d,s=1e-9,p=1e-9){if($>p)return new Array(a.rows+1).fill(0);{let g=a.addRow(d,[0]);for(let z=0;z<g.rows;z++)Math.abs(g.get(z,0))<s&&g.set(z,0,0);return g.to1DArray()}}function Zt($,a={}){const{thresholdValue:d=1e-9,thresholdError:s=1e-9}=a;$=P.checkMatrix($);let p=$.rows,g=new P(p,p);for(let z=0;z<p;z++){let A=P.columnVector($.getRow(z)),M=$.subMatrixRow(dr(p,z)).transpose(),H=new Vt(M).solve(A),L=P.sub(A,M.mmul(H)).abs().max();g.setRow(z,hi(L,H,z,d,s))}return g}function fi($,a=Number.EPSILON){if($=P.checkMatrix($),$.isEmpty())return $.transpose();let d=new Vt($,{autoTranspose:!0}),s=d.leftSingularVectors,p=d.rightSingularVectors,g=d.diagonal;for(let z=0;z<g.length;z++)Math.abs(g[z])>a?g[z]=1/g[z]:g[z]=0;return p.mmul(P.diag(g).mmul(s.transpose()))}function ci($,a=$,d={}){$=new P($);let s=!1;if(typeof a=="object"&&!P.isMatrix(a)&&!e.isAnyArray(a)?(d=a,a=$,s=!0):a=new P(a),$.rows!==a.rows)throw new TypeError("Both matrices must have the same number of rows");const{center:p=!0}=d;p&&($=$.center("column"),s||(a=a.center("column")));const g=$.transpose().mmul(a);for(let z=0;z<g.rows;z++)for(let A=0;A<g.columns;A++)g.set(z,A,g.get(z,A)*(1/($.rows-1)));return g}function mi($,a=$,d={}){$=new P($);let s=!1;if(typeof a=="object"&&!P.isMatrix(a)&&!e.isAnyArray(a)?(d=a,a=$,s=!0):a=new P(a),$.rows!==a.rows)throw new TypeError("Both matrices must have the same number of rows");const{center:p=!0,scale:g=!0}=d;p&&($.center("column"),s||a.center("column")),g&&($.scale("column"),s||a.scale("column"));const z=$.standardDeviation("column",{unbiased:!0}),A=s?z:a.standardDeviation("column",{unbiased:!0}),M=$.transpose().mmul(a);for(let R=0;R<M.rows;R++)for(let H=0;H<M.columns;H++)M.set(R,H,M.get(R,H)*(1/(z[R]*A[H]))*(1/($.rows-1)));return M}class Dr{constructor(a,d={}){const{assumeSymmetric:s=!1}=d;if(a=$t.checkMatrix(a),!a.isSquare())throw new Error("Matrix is not a square matrix");if(a.isEmpty())throw new Error("Matrix must be non-empty");let p=a.columns,g=new P(p,p),z=new Float64Array(p),A=new Float64Array(p),M=a,R,H,L=!1;if(s?L=!0:L=a.isSymmetric(),L){for(R=0;R<p;R++)for(H=0;H<p;H++)g.set(R,H,M.get(R,H));en(p,A,z,g),tn(p,A,z,g)}else{let ne=new P(p,p),ye=new Float64Array(p);for(H=0;H<p;H++)for(R=0;R<p;R++)ne.set(R,H,M.get(R,H));rn(p,ne,ye,g),nn(p,A,z,g,ne)}this.n=p,this.e=A,this.d=z,this.V=g}get realEigenvalues(){return Array.from(this.d)}get imaginaryEigenvalues(){return Array.from(this.e)}get eigenvectorMatrix(){return this.V}get diagonalMatrix(){let a=this.n,d=this.e,s=this.d,p=new P(a,a),g,z;for(g=0;g<a;g++){for(z=0;z<a;z++)p.set(g,z,0);p.set(g,g,s[g]),d[g]>0?p.set(g,g+1,d[g]):d[g]<0&&p.set(g,g-1,d[g])}return p}}function en($,a,d,s){let p,g,z,A,M,R,H,L;for(M=0;M<$;M++)d[M]=s.get($-1,M);for(A=$-1;A>0;A--){for(L=0,z=0,R=0;R<A;R++)L=L+Math.abs(d[R]);if(L===0)for(a[A]=d[A-1],M=0;M<A;M++)d[M]=s.get(A-1,M),s.set(A,M,0),s.set(M,A,0);else{for(R=0;R<A;R++)d[R]/=L,z+=d[R]*d[R];for(p=d[A-1],g=Math.sqrt(z),p>0&&(g=-g),a[A]=L*g,z=z-p*g,d[A-1]=p-g,M=0;M<A;M++)a[M]=0;for(M=0;M<A;M++){for(p=d[M],s.set(M,A,p),g=a[M]+s.get(M,M)*p,R=M+1;R<=A-1;R++)g+=s.get(R,M)*d[R],a[R]+=s.get(R,M)*p;a[M]=g}for(p=0,M=0;M<A;M++)a[M]/=z,p+=a[M]*d[M];for(H=p/(z+z),M=0;M<A;M++)a[M]-=H*d[M];for(M=0;M<A;M++){for(p=d[M],g=a[M],R=M;R<=A-1;R++)s.set(R,M,s.get(R,M)-(p*a[R]+g*d[R]));d[M]=s.get(A-1,M),s.set(A,M,0)}}d[A]=z}for(A=0;A<$-1;A++){if(s.set($-1,A,s.get(A,A)),s.set(A,A,1),z=d[A+1],z!==0){for(R=0;R<=A;R++)d[R]=s.get(R,A+1)/z;for(M=0;M<=A;M++){for(g=0,R=0;R<=A;R++)g+=s.get(R,A+1)*s.get(R,M);for(R=0;R<=A;R++)s.set(R,M,s.get(R,M)-g*d[R])}}for(R=0;R<=A;R++)s.set(R,A+1,0)}for(M=0;M<$;M++)d[M]=s.get($-1,M),s.set($-1,M,0);s.set($-1,$-1,1),a[0]=0}function tn($,a,d,s){let p,g,z,A,M,R,H,L,ne,ye,ee,ue,ve,F,ge,$e;for(z=1;z<$;z++)a[z-1]=a[z];a[$-1]=0;let Oe=0,Re=0,nt=Number.EPSILON;for(R=0;R<$;R++){for(Re=Math.max(Re,Math.abs(d[R])+Math.abs(a[R])),H=R;H<$&&!(Math.abs(a[H])<=nt*Re);)H++;if(H>R)do{for(p=d[R],L=(d[R+1]-p)/(2*a[R]),ne=wt(L,1),L<0&&(ne=-ne),d[R]=a[R]/(L+ne),d[R+1]=a[R]*(L+ne),ye=d[R+1],g=p-d[R],z=R+2;z<$;z++)d[z]-=g;for(Oe=Oe+g,L=d[H],ee=1,ue=ee,ve=ee,F=a[R+1],ge=0,$e=0,z=H-1;z>=R;z--)for(ve=ue,ue=ee,$e=ge,p=ee*a[z],g=ee*L,ne=wt(L,a[z]),a[z+1]=ge*ne,ge=a[z]/ne,ee=L/ne,L=ee*d[z]-ge*p,d[z+1]=g+ge*(ee*p+ge*d[z]),M=0;M<$;M++)g=s.get(M,z+1),s.set(M,z+1,ge*s.get(M,z)+ee*g),s.set(M,z,ee*s.get(M,z)-ge*g);L=-ge*$e*ve*F*a[R]/ye,a[R]=ge*L,d[R]=ee*L}while(Math.abs(a[R])>nt*Re);d[R]=d[R]+Oe,a[R]=0}for(z=0;z<$-1;z++){for(M=z,L=d[z],A=z+1;A<$;A++)d[A]<L&&(M=A,L=d[A]);if(M!==z)for(d[M]=d[z],d[z]=L,A=0;A<$;A++)L=s.get(A,z),s.set(A,z,s.get(A,M)),s.set(A,M,L)}}function rn($,a,d,s){let p=0,g=$-1,z,A,M,R,H,L,ne;for(L=p+1;L<=g-1;L++){for(ne=0,R=L;R<=g;R++)ne=ne+Math.abs(a.get(R,L-1));if(ne!==0){for(M=0,R=g;R>=L;R--)d[R]=a.get(R,L-1)/ne,M+=d[R]*d[R];for(A=Math.sqrt(M),d[L]>0&&(A=-A),M=M-d[L]*A,d[L]=d[L]-A,H=L;H<$;H++){for(z=0,R=g;R>=L;R--)z+=d[R]*a.get(R,H);for(z=z/M,R=L;R<=g;R++)a.set(R,H,a.get(R,H)-z*d[R])}for(R=0;R<=g;R++){for(z=0,H=g;H>=L;H--)z+=d[H]*a.get(R,H);for(z=z/M,H=L;H<=g;H++)a.set(R,H,a.get(R,H)-z*d[H])}d[L]=ne*d[L],a.set(L,L-1,ne*A)}}for(R=0;R<$;R++)for(H=0;H<$;H++)s.set(R,H,R===H?1:0);for(L=g-1;L>=p+1;L--)if(a.get(L,L-1)!==0){for(R=L+1;R<=g;R++)d[R]=a.get(R,L-1);for(H=L;H<=g;H++){for(A=0,R=L;R<=g;R++)A+=d[R]*s.get(R,H);for(A=A/d[L]/a.get(L,L-1),R=L;R<=g;R++)s.set(R,H,s.get(R,H)+A*d[R])}}}function nn($,a,d,s,p){let g=$-1,z=0,A=$-1,M=Number.EPSILON,R=0,H=0,L=0,ne=0,ye=0,ee=0,ue=0,ve=0,F,ge,$e,Oe,Re,nt,Me,ze,tt,V,de,be,pe,Ve,He;for(F=0;F<$;F++)for((F<z||F>A)&&(d[F]=p.get(F,F),a[F]=0),ge=Math.max(F-1,0);ge<$;ge++)H=H+Math.abs(p.get(F,ge));for(;g>=z;){for(Oe=g;Oe>z&&(ee=Math.abs(p.get(Oe-1,Oe-1))+Math.abs(p.get(Oe,Oe)),ee===0&&(ee=H),!(Math.abs(p.get(Oe,Oe-1))<M*ee));)Oe--;if(Oe===g)p.set(g,g,p.get(g,g)+R),d[g]=p.get(g,g),a[g]=0,g--,ve=0;else if(Oe===g-1){if(Me=p.get(g,g-1)*p.get(g-1,g),L=(p.get(g-1,g-1)-p.get(g,g))/2,ne=L*L+Me,ue=Math.sqrt(Math.abs(ne)),p.set(g,g,p.get(g,g)+R),p.set(g-1,g-1,p.get(g-1,g-1)+R),ze=p.get(g,g),ne>=0){for(ue=L>=0?L+ue:L-ue,d[g-1]=ze+ue,d[g]=d[g-1],ue!==0&&(d[g]=ze-Me/ue),a[g-1]=0,a[g]=0,ze=p.get(g,g-1),ee=Math.abs(ze)+Math.abs(ue),L=ze/ee,ne=ue/ee,ye=Math.sqrt(L*L+ne*ne),L=L/ye,ne=ne/ye,ge=g-1;ge<$;ge++)ue=p.get(g-1,ge),p.set(g-1,ge,ne*ue+L*p.get(g,ge)),p.set(g,ge,ne*p.get(g,ge)-L*ue);for(F=0;F<=g;F++)ue=p.get(F,g-1),p.set(F,g-1,ne*ue+L*p.get(F,g)),p.set(F,g,ne*p.get(F,g)-L*ue);for(F=z;F<=A;F++)ue=s.get(F,g-1),s.set(F,g-1,ne*ue+L*s.get(F,g)),s.set(F,g,ne*s.get(F,g)-L*ue)}else d[g-1]=ze+L,d[g]=ze+L,a[g-1]=ue,a[g]=-ue;g=g-2,ve=0}else{if(ze=p.get(g,g),tt=0,Me=0,Oe<g&&(tt=p.get(g-1,g-1),Me=p.get(g,g-1)*p.get(g-1,g)),ve===10){for(R+=ze,F=z;F<=g;F++)p.set(F,F,p.get(F,F)-ze);ee=Math.abs(p.get(g,g-1))+Math.abs(p.get(g-1,g-2)),ze=tt=.75*ee,Me=-.4375*ee*ee}if(ve===30&&(ee=(tt-ze)/2,ee=ee*ee+Me,ee>0)){for(ee=Math.sqrt(ee),tt<ze&&(ee=-ee),ee=ze-Me/((tt-ze)/2+ee),F=z;F<=g;F++)p.set(F,F,p.get(F,F)-ee);R+=ee,ze=tt=Me=.964}for(ve=ve+1,Re=g-2;Re>=Oe&&(ue=p.get(Re,Re),ye=ze-ue,ee=tt-ue,L=(ye*ee-Me)/p.get(Re+1,Re)+p.get(Re,Re+1),ne=p.get(Re+1,Re+1)-ue-ye-ee,ye=p.get(Re+2,Re+1),ee=Math.abs(L)+Math.abs(ne)+Math.abs(ye),L=L/ee,ne=ne/ee,ye=ye/ee,!(Re===Oe||Math.abs(p.get(Re,Re-1))*(Math.abs(ne)+Math.abs(ye))<M*(Math.abs(L)*(Math.abs(p.get(Re-1,Re-1))+Math.abs(ue)+Math.abs(p.get(Re+1,Re+1))))));)Re--;for(F=Re+2;F<=g;F++)p.set(F,F-2,0),F>Re+2&&p.set(F,F-3,0);for($e=Re;$e<=g-1&&(Ve=$e!==g-1,$e!==Re&&(L=p.get($e,$e-1),ne=p.get($e+1,$e-1),ye=Ve?p.get($e+2,$e-1):0,ze=Math.abs(L)+Math.abs(ne)+Math.abs(ye),ze!==0&&(L=L/ze,ne=ne/ze,ye=ye/ze)),ze!==0);$e++)if(ee=Math.sqrt(L*L+ne*ne+ye*ye),L<0&&(ee=-ee),ee!==0){for($e!==Re?p.set($e,$e-1,-ee*ze):Oe!==Re&&p.set($e,$e-1,-p.get($e,$e-1)),L=L+ee,ze=L/ee,tt=ne/ee,ue=ye/ee,ne=ne/L,ye=ye/L,ge=$e;ge<$;ge++)L=p.get($e,ge)+ne*p.get($e+1,ge),Ve&&(L=L+ye*p.get($e+2,ge),p.set($e+2,ge,p.get($e+2,ge)-L*ue)),p.set($e,ge,p.get($e,ge)-L*ze),p.set($e+1,ge,p.get($e+1,ge)-L*tt);for(F=0;F<=Math.min(g,$e+3);F++)L=ze*p.get(F,$e)+tt*p.get(F,$e+1),Ve&&(L=L+ue*p.get(F,$e+2),p.set(F,$e+2,p.get(F,$e+2)-L*ye)),p.set(F,$e,p.get(F,$e)-L),p.set(F,$e+1,p.get(F,$e+1)-L*ne);for(F=z;F<=A;F++)L=ze*s.get(F,$e)+tt*s.get(F,$e+1),Ve&&(L=L+ue*s.get(F,$e+2),s.set(F,$e+2,s.get(F,$e+2)-L*ye)),s.set(F,$e,s.get(F,$e)-L),s.set(F,$e+1,s.get(F,$e+1)-L*ne)}}}if(H!==0){for(g=$-1;g>=0;g--)if(L=d[g],ne=a[g],ne===0)for(Oe=g,p.set(g,g,1),F=g-1;F>=0;F--){for(Me=p.get(F,F)-L,ye=0,ge=Oe;ge<=g;ge++)ye=ye+p.get(F,ge)*p.get(ge,g);if(a[F]<0)ue=Me,ee=ye;else if(Oe=F,a[F]===0?p.set(F,g,Me!==0?-ye/Me:-ye/(M*H)):(ze=p.get(F,F+1),tt=p.get(F+1,F),ne=(d[F]-L)*(d[F]-L)+a[F]*a[F],nt=(ze*ee-ue*ye)/ne,p.set(F,g,nt),p.set(F+1,g,Math.abs(ze)>Math.abs(ue)?(-ye-Me*nt)/ze:(-ee-tt*nt)/ue)),nt=Math.abs(p.get(F,g)),M*nt*nt>1)for(ge=F;ge<=g;ge++)p.set(ge,g,p.get(ge,g)/nt)}else if(ne<0)for(Oe=g-1,Math.abs(p.get(g,g-1))>Math.abs(p.get(g-1,g))?(p.set(g-1,g-1,ne/p.get(g,g-1)),p.set(g-1,g,-(p.get(g,g)-L)/p.get(g,g-1))):(He=pr(0,-p.get(g-1,g),p.get(g-1,g-1)-L,ne),p.set(g-1,g-1,He[0]),p.set(g-1,g,He[1])),p.set(g,g-1,0),p.set(g,g,1),F=g-2;F>=0;F--){for(V=0,de=0,ge=Oe;ge<=g;ge++)V=V+p.get(F,ge)*p.get(ge,g-1),de=de+p.get(F,ge)*p.get(ge,g);if(Me=p.get(F,F)-L,a[F]<0)ue=Me,ye=V,ee=de;else if(Oe=F,a[F]===0?(He=pr(-V,-de,Me,ne),p.set(F,g-1,He[0]),p.set(F,g,He[1])):(ze=p.get(F,F+1),tt=p.get(F+1,F),be=(d[F]-L)*(d[F]-L)+a[F]*a[F]-ne*ne,pe=(d[F]-L)*2*ne,be===0&&pe===0&&(be=M*H*(Math.abs(Me)+Math.abs(ne)+Math.abs(ze)+Math.abs(tt)+Math.abs(ue))),He=pr(ze*ye-ue*V+ne*de,ze*ee-ue*de-ne*V,be,pe),p.set(F,g-1,He[0]),p.set(F,g,He[1]),Math.abs(ze)>Math.abs(ue)+Math.abs(ne)?(p.set(F+1,g-1,(-V-Me*p.get(F,g-1)+ne*p.get(F,g))/ze),p.set(F+1,g,(-de-Me*p.get(F,g)-ne*p.get(F,g-1))/ze)):(He=pr(-ye-tt*p.get(F,g-1),-ee-tt*p.get(F,g),ue,ne),p.set(F+1,g-1,He[0]),p.set(F+1,g,He[1]))),nt=Math.max(Math.abs(p.get(F,g-1)),Math.abs(p.get(F,g))),M*nt*nt>1)for(ge=F;ge<=g;ge++)p.set(ge,g-1,p.get(ge,g-1)/nt),p.set(ge,g,p.get(ge,g)/nt)}for(F=0;F<$;F++)if(F<z||F>A)for(ge=F;ge<$;ge++)s.set(F,ge,p.get(F,ge));for(ge=$-1;ge>=z;ge--)for(F=z;F<=A;F++){for(ue=0,$e=z;$e<=Math.min(ge,A);$e++)ue=ue+s.get(F,$e)*p.get($e,ge);s.set(F,ge,ue)}}}function pr($,a,d,s){let p,g;return Math.abs(d)>Math.abs(s)?(p=s/d,g=d+p*s,[($+p*a)/g,(a-p*$)/g]):(p=d/s,g=s+p*d,[(p*$+a)/g,(p*a-$)/g])}class jr{constructor(a){if(a=$t.checkMatrix(a),!a.isSymmetric())throw new Error("Matrix is not symmetric");let d=a,s=d.rows,p=new P(s,s),g=!0,z,A,M;for(A=0;A<s;A++){let R=0;for(M=0;M<A;M++){let H=0;for(z=0;z<M;z++)H+=p.get(M,z)*p.get(A,z);H=(d.get(A,M)-H)/p.get(M,M),p.set(A,M,H),R=R+H*H}for(R=d.get(A,A)-R,g&&=R>0,p.set(A,A,Math.sqrt(Math.max(R,0))),M=A+1;M<s;M++)p.set(A,M,0)}this.L=p,this.positiveDefinite=g}isPositiveDefinite(){return this.positiveDefinite}solve(a){a=$t.checkMatrix(a);let d=this.L,s=d.rows;if(a.rows!==s)throw new Error("Matrix dimensions do not match");if(this.isPositiveDefinite()===!1)throw new Error("Matrix is not positive definite");let p=a.columns,g=a.clone(),z,A,M;for(M=0;M<s;M++)for(A=0;A<p;A++){for(z=0;z<M;z++)g.set(M,A,g.get(M,A)-g.get(z,A)*d.get(M,z));g.set(M,A,g.get(M,A)/d.get(M,M))}for(M=s-1;M>=0;M--)for(A=0;A<p;A++){for(z=M+1;z<s;z++)g.set(M,A,g.get(M,A)-g.get(z,A)*d.get(z,M));g.set(M,A,g.get(M,A)/d.get(M,M))}return g}get lowerTriangularMatrix(){return this.L}}class Pr{constructor(a,d={}){a=$t.checkMatrix(a);let{Y:s}=d;const{scaleScores:p=!1,maxIterations:g=1e3,terminationCriteria:z=1e-10}=d;let A;if(s){if(e.isAnyArray(s)&&typeof s[0]=="number"?s=P.columnVector(s):s=$t.checkMatrix(s),s.rows!==a.rows)throw new Error("Y should have the same number of rows as X");A=s.getColumnVector(0)}else A=a.getColumnVector(0);let M=1,R,H,L,ne;for(let ye=0;ye<g&&M>z;ye++)L=a.transpose().mmul(A).div(A.transpose().mmul(A).get(0,0)),L=L.div(L.norm()),R=a.mmul(L).div(L.transpose().mmul(L).get(0,0)),ye>0&&(M=R.clone().sub(ne).pow(2).sum()),ne=R.clone(),s?(H=s.transpose().mmul(R).div(R.transpose().mmul(R).get(0,0)),H=H.div(H.norm()),A=s.mmul(H).div(H.transpose().mmul(H).get(0,0))):A=R;if(s){let ye=a.transpose().mmul(R).div(R.transpose().mmul(R).get(0,0));ye=ye.div(ye.norm());let ee=a.clone().sub(R.clone().mmul(ye.transpose())),ue=A.transpose().mmul(R).div(R.transpose().mmul(R).get(0,0)),ve=s.clone().sub(R.clone().mulS(ue.get(0,0)).mmul(H.transpose()));this.t=R,this.p=ye.transpose(),this.w=L.transpose(),this.q=H,this.u=A,this.s=R.transpose().mmul(R),this.xResidual=ee,this.yResidual=ve,this.betas=ue}else this.w=L.transpose(),this.s=R.transpose().mmul(R).sqrt(),p?this.t=R.clone().div(this.s.get(0,0)):this.t=R,this.xResidual=a.sub(R.mmul(L.transpose()))}}return We.AbstractMatrix=K,We.CHO=jr,We.CholeskyDecomposition=jr,We.DistanceMatrix=it,We.EVD=Dr,We.EigenvalueDecomposition=Dr,We.LU=lr,We.LuDecomposition=lr,We.Matrix=P,We.MatrixColumnSelectionView=Ue,We.MatrixColumnView=Ye,We.MatrixFlipColumnView=lt,We.MatrixFlipRowView=dt,We.MatrixRowSelectionView=or,We.MatrixRowView=vt,We.MatrixSelectionView=ur,We.MatrixSubView=Wt,We.MatrixTransposeView=di,We.NIPALS=Pr,We.Nipals=Pr,We.QR=et,We.QrDecomposition=et,We.SVD=Vt,We.SingularValueDecomposition=Vt,We.SymmetricMatrix=Ae,We.WrapperMatrix1D=Tr,We.WrapperMatrix2D=$t,We.correlation=mi,We.covariance=ci,We.default=P,We.determinant=Tt,We.inverse=pi,We.linearDependencies=Zt,We.pseudoInverse=fi,We.solve=Er,We.wrap=Nr,We}var ha=n0();const zd=_c(ha),zr=ha.Matrix;zd.Matrix?zd.Matrix:ha.Matrix;const Ad=8,s0=1/16777216,a0=15,o0=18,u0=11;function l0(e,t){e>>>=0,t>>>=0;const i=e&65535;return((e-i)*t>>>0)+i*t>>>0}class d0{constructor(t=Date.now()){this.state=new Uint32Array(4),this.init(t),this.random=this.getFloat.bind(this)}getUint32(){return this.nextState(),this.state[3]+this.state[2]>>>0}getFloat(){return(this.getUint32()>>>8)*s0}init(t){if(!Number.isInteger(t))throw new TypeError("seed must be an integer");this.state[0]=t,this.state[1]=0,this.state[2]=0,this.state[3]=0;for(let i=1;i<Ad;i++)this.state[i&3]^=i+l0(1812433253,this.state[i-1&3]^this.state[i-1&3]>>>30>>>0)>>>0;this.periodCertification();for(let i=0;i<Ad;i++)this.nextState()}periodCertification(){this.state[0]===0&&this.state[1]===0&&this.state[2]===0&&this.state[3]===0&&(this.state[0]=88,this.state[1]=83,this.state[2]=65,this.state[3]=68)}nextState(){let t=this.state[0];t^=t<<a0,t^=t>>>o0,t^=this.state[3]<<u0,this.state[0]=this.state[1],this.state[1]=this.state[2],this.state[2]=this.state[3],this.state[3]=t}}const p0=1e-8;function Md(e,t={},i=Math.random){const{size:r=1,replace:n=!1,probabilities:o}=t;let l,h;if(typeof e=="number"?l=h0(e):l=e.slice(),o){if(!n)throw new Error("choice with probabilities and no replacement is not implemented");if(o.length!==l.length)throw new Error("the length of probabilities option should be equal to the number of choices");h=[o[0]];for(let m=1;m<o.length;m++)h[m]=h[m-1]+o[m];if(Math.abs(1-h[h.length-1])>p0)throw new Error(`probabilities should sum to 1, but instead sums to ${h[h.length-1]}`)}if(n===!1&&r>l.length)throw new Error("size option is too large");const c=[];for(let m=0;m<r;m++){const y=f0(l.length,i,h);c.push(l[y]),n||l.splice(y,1)}return c}function h0(e){const t=[];for(let i=0;i<e;i++)t.push(i);return t}function f0(e,t,i){const r=t();if(i){let n=0;for(;r>i[n];)n++;return n}else return Math.floor(r*e)}class fa{constructor(t=Math.random){if(typeof t=="number"){const i=new d0(t);this.randomGenerator=i.random}else this.randomGenerator=t}choice(t,i){return typeof t=="number"?Md(t,i,this.randomGenerator):Md(t,i,this.randomGenerator)}random(){return this.randomGenerator()}randInt(t,i){return i===void 0&&(i=t,t=0),t+Math.floor(this.randomGenerator()*(i-t))}randomSample(t){const i=[];for(let r=0;r<t;r++)i.push(this.random());return i}}function c0(e,t,i){return new fa(i).choice(e,{size:t})}function m0(e,t,i,r){const n=new fa(r);let o=new Array(t);if(o[0]=Math.floor(n.random()*e.length),t>1){let l={dist:-1,index:-1};for(let h=0;h<e.length;++h)i[o[0]][h]>l.dist&&(l.dist=i[o[0]][h],l.index=h);if(o[1]=l.index,t>2)for(let h=2;h<t;++h){let c={dist:-1,index:-1};for(let m=0;m<e.length;++m){let y={dist:Number.MAX_VALUE,index:-1};for(let _=0;_<h;++_)i[_][m]<y.dist&&!o.includes(m)&&(y={dist:i[_][m],index:m});y.dist!==Number.MAX_VALUE&&y.dist>c.dist&&(c={...y})}o[h]=c.index}}return o.map(l=>e[l])}function g0(e,t,i={}){const r=new zr(e),n=r.rows,o=new fa(i.seed),l=[],h=i.localTrials||2+Math.floor(Math.log(t)),c=o.randInt(n);l.push(r.getRow(c));let m=new zr(1,r.rows);for(let S=0;S<r.rows;S++)m.set(0,S,Ji(r.getRow(S),l[0]));let y=[Rd(m.getRow(0))];const _=1/y[0][n-1];let v=zr.mul(m,_);for(let S=1;S<t;S++){const k=o.choice(n,{replace:!0,size:h,probabilities:v.getRow(0)}),E=r.selection(k,y0(r.columns)),N=w0(E,r);let I=1/0,T=1/0,j=m;for(let B=0;B<h;B++){const W=zr.min(m,[N.getRow(B)]),Q=W.sum();Q<T&&(I=k[B],T=Q,j=W)}l[S]=r.getRow(I),m=j,y=[Rd(m.getRow(0))],v=zr.mul(m,1/y[0][n-1])}return l}function w0(e,t){const i=new zr(e.rows,t.rows);for(let r=0;r<e.rows;r++)for(let n=0;n<t.rows;n++)i.set(r,n,Ji(e.getRow(r),t.getRow(n)));return i}function y0(e){let t=[];for(let i=0;i<e;i++)t.push(i);return t}function Rd(e){let t=[e[0]];for(let i=1;i<e.length;i++)t[i]=t[i-1]+e[i];return t}const _0={maxIterations:100,tolerance:1e-6,initialization:"kmeans++",distanceFunction:Ji};function b0(e,t,i,r,n,o){i=vc(t,e,i,n.distanceFunction);let l=Vg(e,t,i,r),h=Gg(l,e,n.distanceFunction,n.tolerance);return new Kg(i,l,h,o,n.distanceFunction)}function Od(e,t,i){const r=$0(i);Zg(e,t);let n=v0(e,t,r);r.maxIterations===0&&(r.maxIterations=Number.MAX_VALUE);let o=new Array(e.length),l=!1,h=0,c;for(;!l&&h<r.maxIterations;)c=b0(n,e,o,t,r,++h),l=c.converged,n=c.centroids;if(!c)throw new Error("unreachable: no kmeans step executed");return c}function v0(e,t,i){let r;if(Array.isArray(i.initialization)){if(i.initialization.length!==t)throw new Error("The initial centers should have the same length as K");r=i.initialization}else switch(i.initialization){case"kmeans++":r=g0(e,t,i);break;case"random":r=c0(e,t,i.seed);break;case"mostDistant":r=m0(e,t,Wg(e,i.distanceFunction),i.seed);break;default:Hg(i.initialization,"Unknown initialization method")}return r}function $0(e){return{..._0,...e}}const x0=new URL("/assets/ort-wasm-simd-threaded.jsep-D2-dU8Fv.mjs",import.meta.url).href,Bd=new URL("/assets/ort-wasm-simd-threaded.jsep-CLmJQkb_.wasm",import.meta.url).href;class S0{constructor(){this.vadSession=null,this.embeddingSession=null,this.audioContext=null}async initialize(){const t=await fetch(Bd,{cache:"no-store",credentials:"same-origin"});if(!t.ok)throw new Error(`Failed to fetch ONNX Runtime wasm: ${t.status}`);const i=new Uint8Array(await t.arrayBuffer());Je.wasm.numThreads=1,Je.wasm.simd=!0,Je.wasm.wasmBinary=i,Je.wasm.wasmPaths={wasm:Bd,mjs:x0},this.vadSession=await Fi.create("/models/silero-vad.onnx",{executionProviders:["webgpu","wasm"]}),this.embeddingSession=await Fi.create("/models/wespeaker-ecapa-tdnn.onnx",{executionProviders:["webgpu","wasm"],graphOptimizationLevel:"all"}),this.audioContext=new AudioContext({sampleRate:16e3})}async diarizeAudio(t){const i=await this.detectSpeech(t);console.log(`${i.length}個の音声セグメントを検出`);const r=await this.extractEmbeddings(i),n=this.estimateSpeakerCount(r),o=Od(r,n,{initialization:"kmeans++",maxIterations:100});return i.map((l,h)=>({start:l.start,end:l.end,speaker:`話者_${o.clusters[h]}`,confidence:this.calculateConfidence(r[h],o.centroids[o.clusters[h]])}))}async detectSpeech(t){const i=[];let o=!1,l=0;for(let h=0;h<t.length-512;h+=256){const c=t.slice(h,h+512),m=new Bt("float32",c,[1,512]),_=(await this.vadSession.run({input:m})).output.data[0]>.5;_&&!o?(l=h,o=!0):!_&&o&&(i.push({start:l/this.audioContext.sampleRate,end:h/this.audioContext.sampleRate,audio:t.slice(l,h)}),o=!1)}return this.mergeShortSegments(i,.3)}async extractEmbeddings(t){const i=[];for(const r of t){const n=this.extractMFCC(r.audio),o=Math.floor(n.length/80),l=new Bt("float32",n,[1,o,80]),h=await this.embeddingSession.run({audio_features:l});i.push(Array.from(h.embeddings.data))}return i}extractMFCC(t){const i=[];for(let n=0;n<t.length-512;n+=512/2){const o=t.slice(n,n+512),l=Lg.extract("mfcc",o);i.push(...l)}return new Float32Array(i)}estimateSpeakerCount(t){const i=Math.min(10,Math.floor(t.length/3));let r=2,n=1/0;for(let o=2;o<=i;o++){const l=Od(t,o,{maxIterations:50});l.computeInformation.error<n*.8&&(n=l.computeInformation.error,r=o)}return r}calculateConfidence(t,i){const r=t.reduce((l,h,c)=>l+h*i[c],0),n=Math.sqrt(t.reduce((l,h)=>l+h*h,0)),o=Math.sqrt(i.reduce((l,h)=>l+h*h,0));return r/(n*o)}mergeShortSegments(t,i=.3){if(t.length===0)return[];const r=[t[0]];for(let n=1;n<t.length;n++){const o=r[r.length-1];t[n].start-o.end<i?(o.end=t[n].end,o.audio=new Float32Array([...o.audio,...t[n].audio])):r.push(t[n])}return r}}let Yi=null;document.getElementById("initBtn").addEventListener("click",async()=>{const e=document.getElementById("status");try{e.textContent="モデルを読み込んでいます...",Yi=new S0,await Yi.initialize(),e.textContent="準備完了！音声ファイルを選択してください",document.getElementById("processBtn").disabled=!1}catch(t){e.textContent=`エラー: ${t.message}`,console.error(t)}});document.getElementById("processBtn").addEventListener("click",async()=>{const t=document.getElementById("audioFile").files[0];if(!t){alert("音声ファイルを選択してください");return}const i=document.getElementById("status"),r=document.getElementById("result");try{i.textContent="音声を処理中...",r.innerHTML="";const n=await t.arrayBuffer(),l=(await Yi.audioContext.decodeAudioData(n)).getChannelData(0),h=await Yi.diarizeAudio(l);i.textContent="完了！",k0(h,r)}catch(n){i.textContent=`エラー: ${n.message}`,console.error(n)}});function k0(e,t){const i=document.createElement("table");i.innerHTML=`
    <thead>
      <tr>
        <th>話者</th>
        <th>開始時間</th>
        <th>終了時間</th>
        <th>信頼度</th>
      </tr>
    </thead>
    <tbody>
      ${e.map(r=>`
        <tr>
          <td>${r.speaker}</td>
          <td>${r.start.toFixed(2)}秒</td>
          <td>${r.end.toFixed(2)}秒</td>
          <td>${(r.confidence*100).toFixed(1)}%</td>
        </tr>
      `).join("")}
    </tbody>
  `,t.appendChild(i)}

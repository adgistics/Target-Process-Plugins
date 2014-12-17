!function(e){"use strict";"function"==typeof define&&define.amd?define(["jQuery"],e):e(window.jQuery)}(function(e){"use strict";e.support.xhrFileUpload=!(!window.XMLHttpRequestUpload||!window.FileReader),e.support.xhrFormDataFileUpload=!!window.FormData,e.widget("blueimp.fileupload",{widgetEventPrefix:"fileupload",options:{dropZone:e(document),pasteZone:e(document),fileInput:void 0,replaceFileInput:!0,paramName:void 0,singleFileUploads:!0,limitMultiFileUploads:void 0,sequentialUploads:!1,limitConcurrentUploads:void 0,forceIframeTransport:!1,redirect:void 0,redirectParamName:void 0,postMessage:void 0,multipart:!0,maxChunkSize:void 0,uploadedBytes:void 0,recalculateProgress:!0,progressInterval:100,bitrateInterval:500,autoUpload:!0,formData:function(e){return e.serializeArray()},add:function(t,i){(i.autoUpload||i.autoUpload!==!1&&(e(this).data("blueimp-fileupload")||e(this).data("fileupload")).options.autoUpload)&&i.submit()},processData:!1,contentType:!1,cache:!1},_refreshOptionsList:["fileInput","dropZone","pasteZone","multipart","forceIframeTransport"],_BitrateTimer:function(){this.timestamp=+new Date,this.loaded=0,this.bitrate=0,this.getBitrate=function(e,t,i){var r=e-this.timestamp;return(!this.bitrate||!i||r>i)&&(this.bitrate=(t-this.loaded)*(1e3/r)*8,this.loaded=t,this.timestamp=e),this.bitrate}},_isXHRUpload:function(t){return!t.forceIframeTransport&&(!t.multipart&&e.support.xhrFileUpload||e.support.xhrFormDataFileUpload)},_getFormData:function(t){var i;return"function"==typeof t.formData?t.formData(t.form):e.isArray(t.formData)?t.formData:t.formData?(i=[],e.each(t.formData,function(e,t){i.push({name:e,value:t})}),i):[]},_getTotal:function(t){var i=0;return e.each(t,function(e,t){i+=t.size||1}),i},_initProgressObject:function(e){e._progress={loaded:0,total:0,bitrate:0}},_onProgress:function(e,t){if(e.lengthComputable){var i,r=+new Date;if(t._time&&t.progressInterval&&r-t._time<t.progressInterval&&e.loaded!==e.total)return;t._time=r,i=Math.floor(e.loaded/e.total*(t.chunkSize||t._progress.total))+(t.uploadedBytes||0),this._progress.loaded+=i-t._progress.loaded,this._progress.bitrate=this._bitrateTimer.getBitrate(r,this._progress.loaded,t.bitrateInterval),t._progress.loaded=t.loaded=i,t._progress.bitrate=t.bitrate=t._bitrateTimer.getBitrate(r,i,t.bitrateInterval),this._trigger("progress",e,t),this._trigger("progressall",e,this._progress)
}},_initProgressListener:function(t){var i=this,r=t.xhr?t.xhr():e.ajaxSettings.xhr();r.upload&&(e(r.upload).bind("progress",function(e){var r=e.originalEvent;e.lengthComputable=r.lengthComputable,e.loaded=r.loaded,e.total=r.total,i._onProgress(e,t)}),t.xhr=function(){return r})},_initXHRData:function(t){var i,r=t.files[0],n=t.multipart||!e.support.xhrFileUpload,o=t.paramName[0];t.headers=t.headers||{},t.contentRange&&(t.headers["Content-Range"]=t.contentRange),n?e.support.xhrFormDataFileUpload&&(t.postMessage?(i=this._getFormData(t),t.blob?i.push({name:o,value:t.blob}):e.each(t.files,function(e,r){i.push({name:t.paramName[e]||o,value:r})})):(t.formData instanceof FormData?i=t.formData:(i=new FormData,e.each(this._getFormData(t),function(e,t){i.append(t.name,t.value)})),t.blob?(t.headers["Content-Disposition"]='attachment; filename="'+encodeURI(r.name)+'"',i.append(o,t.blob,r.name)):e.each(t.files,function(e,r){(window.Blob&&r instanceof Blob||window.File&&r instanceof File)&&i.append(t.paramName[e]||o,r,r.name)})),t.data=i):(t.headers["Content-Disposition"]='attachment; filename="'+encodeURI(r.name)+'"',t.contentType=r.type,t.data=t.blob||r),t.blob=null},_initIframeSettings:function(t){t.dataType="iframe "+(t.dataType||""),t.formData=this._getFormData(t),t.redirect&&e("<a></a>").prop("href",t.url).prop("host")!==location.host&&t.formData.push({name:t.redirectParamName||"redirect",value:t.redirect})},_initDataSettings:function(e){this._isXHRUpload(e)?(this._chunkedUpload(e,!0)||(e.data||this._initXHRData(e),this._initProgressListener(e)),e.postMessage&&(e.dataType="postmessage "+(e.dataType||""))):this._initIframeSettings(e,"iframe")},_getParamName:function(t){var i=e(t.fileInput),r=t.paramName;return r?e.isArray(r)||(r=[r]):(r=[],i.each(function(){for(var t=e(this),i=t.prop("name")||"files[]",n=(t.prop("files")||[1]).length;n;)r.push(i),n-=1}),r.length||(r=[i.prop("name")||"files[]"])),r},_initFormSettings:function(t){t.form&&t.form.length||(t.form=e(t.fileInput.prop("form")),t.form.length||(t.form=e(this.options.fileInput.prop("form")))),t.paramName=this._getParamName(t),t.url||(t.url=t.form.prop("action")||location.href),t.type=(t.type||t.form.prop("method")||"").toUpperCase(),"POST"!==t.type&&"PUT"!==t.type&&"PATCH"!==t.type&&(t.type="POST"),t.formAcceptCharset||(t.formAcceptCharset=t.form.attr("accept-charset"))
},_getAJAXSettings:function(t){var i=e.extend({},this.options,t);return this._initFormSettings(i),this._initDataSettings(i),i},_getDeferredState:function(e){return e.state?e.state():e.isResolved()?"resolved":e.isRejected()?"rejected":"pending"},_enhancePromise:function(e){return e.success=e.done,e.error=e.fail,e.complete=e.always,e},_getXHRPromise:function(t,i,r){var n=e.Deferred(),o=n.promise();return i=i||this.options.context||o,t===!0?n.resolveWith(i,r):t===!1&&n.rejectWith(i,r),o.abort=n.promise,this._enhancePromise(o)},_addConvenienceMethods:function(e,t){var i=this;t.submit=function(){return"pending"!==this.state()&&(t.jqXHR=this.jqXHR=i._trigger("submit",e,this)!==!1&&i._onSend(e,this)),this.jqXHR||i._getXHRPromise()},t.abort=function(){return this.jqXHR?this.jqXHR.abort():this._getXHRPromise()},t.state=function(){return this.jqXHR?i._getDeferredState(this.jqXHR):void 0},t.progress=function(){return this._progress}},_getUploadedBytes:function(e){var t=e.getResponseHeader("Range"),i=t&&t.split("-"),r=i&&i.length>1&&parseInt(i[1],10);return r&&r+1},_chunkedUpload:function(t,i){var r,n,o=this,s=t.files[0],a=s.size,l=t.uploadedBytes=t.uploadedBytes||0,p=t.maxChunkSize||a,d=s.slice||s.webkitSlice||s.mozSlice,u=e.Deferred(),h=u.promise();return this._isXHRUpload(t)&&d&&(l||a>p)&&!t.data?i?!0:l>=a?(s.error="Uploaded bytes exceed file size",this._getXHRPromise(!1,t.context,[null,"error",s.error])):(n=function(){var i=e.extend({},t),h=i._progress.loaded;i.blob=d.call(s,l,l+p,s.type),i.chunkSize=i.blob.size,i.contentRange="bytes "+l+"-"+(l+i.chunkSize-1)+"/"+a,o._initXHRData(i),o._initProgressListener(i),r=(o._trigger("chunksend",null,i)!==!1&&e.ajax(i)||o._getXHRPromise(!1,i.context)).done(function(r,s,p){l=o._getUploadedBytes(p)||l+i.chunkSize,i._progress.loaded===h&&o._onProgress(e.Event("progress",{lengthComputable:!0,loaded:l-i.uploadedBytes,total:l-i.uploadedBytes}),i),t.uploadedBytes=i.uploadedBytes=l,i.result=r,i.textStatus=s,i.jqXHR=p,o._trigger("chunkdone",null,i),o._trigger("chunkalways",null,i),a>l?n():u.resolveWith(i.context,[r,s,p])
}).fail(function(e,t,r){i.jqXHR=e,i.textStatus=t,i.errorThrown=r,o._trigger("chunkfail",null,i),o._trigger("chunkalways",null,i),u.rejectWith(i.context,[e,t,r])})},this._enhancePromise(h),h.abort=function(){return r.abort()},n(),h):!1},_beforeSend:function(e,t){0===this._active&&(this._trigger("start"),this._bitrateTimer=new this._BitrateTimer,this._progress.loaded=this._progress.total=0,this._progress.bitrate=0),t._progress||(t._progress={}),t._progress.loaded=t.loaded=t.uploadedBytes||0,t._progress.total=t.total=this._getTotal(t.files)||1,t._progress.bitrate=t.bitrate=0,this._active+=1,this._progress.loaded+=t.loaded,this._progress.total+=t.total},_onDone:function(t,i,r,n){var o=n._progress.total;n._progress.loaded<o&&this._onProgress(e.Event("progress",{lengthComputable:!0,loaded:o,total:o}),n),n.result=t,n.textStatus=i,n.jqXHR=r,this._trigger("done",null,n)},_onFail:function(e,t,i,r){r.jqXHR=e,r.textStatus=t,r.errorThrown=i,this._trigger("fail",null,r),r.recalculateProgress&&(this._progress.loaded-=r._progress.loaded,this._progress.total-=r._progress.total)},_onAlways:function(e,t,i,r){this._active-=1,this._trigger("always",null,r),0===this._active&&this._trigger("stop")},_onSend:function(t,i){i.submit||this._addConvenienceMethods(t,i);var r,n,o,s,a=this,l=a._getAJAXSettings(i),p=function(){return a._sending+=1,l._bitrateTimer=new a._BitrateTimer,r=r||((n||a._trigger("send",t,l)===!1)&&a._getXHRPromise(!1,l.context,n)||a._chunkedUpload(l)||e.ajax(l)).done(function(e,t,i){a._onDone(e,t,i,l)}).fail(function(e,t,i){a._onFail(e,t,i,l)}).always(function(e,t,i){if(a._sending-=1,a._onAlways(e,t,i,l),l.limitConcurrentUploads&&l.limitConcurrentUploads>a._sending)for(var r=a._slots.shift();r;){if("pending"===a._getDeferredState(r)){r.resolve();break}r=a._slots.shift()}})};return this._beforeSend(t,l),this.options.sequentialUploads||this.options.limitConcurrentUploads&&this.options.limitConcurrentUploads<=this._sending?(this.options.limitConcurrentUploads>1?(o=e.Deferred(),this._slots.push(o),s=o.pipe(p)):s=this._sequence=this._sequence.pipe(p,p),s.abort=function(){return n=[void 0,"abort","abort"],r?r.abort():(o&&o.rejectWith(l.context,n),p())
},this._enhancePromise(s)):p()},_onAdd:function(t,i){var r,n,o,s,a=this,l=!0,p=e.extend({},this.options,i),d=p.limitMultiFileUploads,u=this._getParamName(p);if((p.singleFileUploads||d)&&this._isXHRUpload(p))if(!p.singleFileUploads&&d)for(o=[],r=[],s=0;s<i.files.length;s+=d)o.push(i.files.slice(s,s+d)),n=u.slice(s,s+d),n.length||(n=u),r.push(n);else r=u;else o=[i.files],r=[u];return i.originalFiles=i.files,e.each(o||i.files,function(n,s){var p=e.extend({},i);return p.files=o?s:[s],p.paramName=r[n],a._initProgressObject(p),a._addConvenienceMethods(t,p),l=a._trigger("add",t,p)}),l},_replaceFileInput:function(t){var i=t.clone(!0);e("<form></form>").append(i)[0].reset(),t.after(i).detach(),e.cleanData(t.unbind("remove")),this.options.fileInput=this.options.fileInput.map(function(e,r){return r===t[0]?i[0]:r}),t[0]===this.element[0]&&(this.element=i)},_handleFileTreeEntry:function(t,i){var r,n=this,o=e.Deferred(),s=function(e){e&&!e.entry&&(e.entry=t),o.resolve([e])};return i=i||"",t.isFile?t._file?(t._file.relativePath=i,o.resolve(t._file)):t.file(function(e){e.relativePath=i,o.resolve(e)},s):t.isDirectory?(r=t.createReader(),r.readEntries(function(e){n._handleFileTreeEntries(e,i+t.name+"/").done(function(e){o.resolve(e)}).fail(s)},s)):o.resolve([]),o.promise()},_handleFileTreeEntries:function(t,i){var r=this;return e.when.apply(e,e.map(t,function(e){return r._handleFileTreeEntry(e,i)})).pipe(function(){return Array.prototype.concat.apply([],arguments)})},_getDroppedFiles:function(t){t=t||{};var i=t.items;return i&&i.length&&(i[0].webkitGetAsEntry||i[0].getAsEntry)?this._handleFileTreeEntries(e.map(i,function(e){var t;return e.webkitGetAsEntry?(t=e.webkitGetAsEntry(),t&&(t._file=e.getAsFile()),t):e.getAsEntry()})):e.Deferred().resolve(e.makeArray(t.files)).promise()},_getSingleFileInputFiles:function(t){t=e(t);var i,r,n=t.prop("webkitEntries")||t.prop("entries");if(n&&n.length)return this._handleFileTreeEntries(n);if(i=e.makeArray(t.prop("files")),i.length)void 0===i[0].name&&i[0].fileName&&e.each(i,function(e,t){t.name=t.fileName,t.size=t.fileSize
});else{if(r=t.prop("value"),!r)return e.Deferred().resolve([]).promise();i=[{name:r.replace(/^.*\\/,"")}]}return e.Deferred().resolve(i).promise()},_getFileInputFiles:function(t){return t instanceof e&&1!==t.length?e.when.apply(e,e.map(t,this._getSingleFileInputFiles)).pipe(function(){return Array.prototype.concat.apply([],arguments)}):this._getSingleFileInputFiles(t)},_onChange:function(t){var i=this,r={fileInput:e(t.target),form:e(t.target.form)};this._getFileInputFiles(r.fileInput).always(function(e){r.files=e,i.options.replaceFileInput&&i._replaceFileInput(r.fileInput),i._trigger("change",t,r)!==!1&&i._onAdd(t,r)})},_onPaste:function(t){var i=t.originalEvent.clipboardData,r=i&&i.items||[],n={files:[]};return e.each(r,function(e,t){var i=t.getAsFile&&t.getAsFile();i&&n.files.push(i)}),this._trigger("paste",t,n)===!1||this._onAdd(t,n)===!1?!1:void 0},_onDrop:function(e){var t=this,i=e.dataTransfer=e.originalEvent.dataTransfer,r={};i&&i.files&&i.files.length&&e.preventDefault(),this._getDroppedFiles(i).always(function(i){r.files=i,t._trigger("drop",e,r)!==!1&&t._onAdd(e,r)})},_onDragOver:function(t){var i=t.dataTransfer=t.originalEvent.dataTransfer;return this._trigger("dragover",t)===!1?!1:void(i&&-1!==e.inArray("Files",i.types)&&(i.dropEffect="copy",t.preventDefault()))},_initEventHandlers:function(){this._isXHRUpload(this.options)&&(this._on(this.options.dropZone,{dragover:this._onDragOver,drop:this._onDrop}),this._on(this.options.pasteZone,{paste:this._onPaste})),this._on(this.options.fileInput,{change:this._onChange})},_destroyEventHandlers:function(){this._off(this.options.dropZone,"dragover drop"),this._off(this.options.pasteZone,"paste"),this._off(this.options.fileInput,"change")},_setOption:function(t,i){var r=-1!==e.inArray(t,this._refreshOptionsList);r&&this._destroyEventHandlers(),this._super(t,i),r&&(this._initSpecialOptions(),this._initEventHandlers())},_initSpecialOptions:function(){var t=this.options;void 0===t.fileInput?t.fileInput=this.element.is('input[type="file"]')?this.element:this.element.find('input[type="file"]'):t.fileInput instanceof e||(t.fileInput=e(t.fileInput)),t.dropZone instanceof e||(t.dropZone=e(t.dropZone)),t.pasteZone instanceof e||(t.pasteZone=e(t.pasteZone))
},_create:function(){var t=this.options;e.extend(t,e(this.element[0].cloneNode(!1)).data()),this._initSpecialOptions(),this._slots=[],this._sequence=this._getXHRPromise(!0),this._sending=this._active=0,this._initProgressObject(this),this._initEventHandlers()},progress:function(){return this._progress},add:function(t){var i=this;t&&!this.options.disabled&&(t.fileInput&&!t.files?this._getFileInputFiles(t.fileInput).always(function(e){t.files=e,i._onAdd(null,t)}):(t.files=e.makeArray(t.files),this._onAdd(null,t)))},send:function(t){if(t&&!this.options.disabled){if(t.fileInput&&!t.files){var i,r,n=this,o=e.Deferred(),s=o.promise();return s.abort=function(){return r=!0,i?i.abort():(o.reject(null,"abort","abort"),s)},this._getFileInputFiles(t.fileInput).always(function(e){r||(t.files=e,i=n._onSend(null,t).then(function(e,t,i){o.resolve(e,t,i)},function(e,t,i){o.reject(e,t,i)}))}),this._enhancePromise(s)}if(t.files=e.makeArray(t.files),t.files.length)return this._onSend(null,t)}return this._getXHRPromise(!1,t&&t.context)}})});
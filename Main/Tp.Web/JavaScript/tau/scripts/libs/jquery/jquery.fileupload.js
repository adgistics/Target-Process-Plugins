define(["libs/jquery/jquery.ui"],function(a){return function(a){a.widget("blueimp.fileupload",{options:{namespace:undefined,dropZone:a(document),fileInput:undefined,replaceFileInput:!0,paramName:undefined,singleFileUploads:!0,sequentialUploads:!1,forceIframeTransport:!1,multipart:!0,maxChunkSize:undefined,uploadedBytes:undefined,recalculateProgress:!0,formData:function(a){return a.serializeArray()},add:function(a,b){b.submit()},processData:!1,contentType:!1,cache:!1},_refreshOptionsList:["namespace","dropZone","fileInput"],_isXHRUpload:function(a){var b="undefined";return!a.forceIframeTransport&&typeof XMLHttpRequestUpload!==b&&typeof File!==b&&(!a.multipart||typeof FormData!==b)},_getFormData:function(b){var c;return typeof b.formData=="function"?b.formData(b.form):a.isArray(b.formData)?b.formData:b.formData?(c=[],a.each(b.formData,function(a,b){c.push({name:a,value:b})}),c):[]},_getTotal:function(b){var c=0;return a.each(b,function(a,b){c+=b.size||1}),c},_onProgress:function(a,b){if(a.lengthComputable){var c=b.total||this._getTotal(b.files),d=parseInt(a.loaded/a.total*(b.chunkSize||c),10)+(b.uploadedBytes||0);this._loaded+=d-(b.loaded||b.uploadedBytes||0),b.lengthComputable=!0,b.loaded=d,b.total=c,this._trigger("progress",a,b),this._trigger("progressall",a,{lengthComputable:!0,loaded:this._loaded,total:this._total})}},_initProgressListener:function(b){var c=this,d=b.xhr?b.xhr():a.ajaxSettings.xhr();d.upload&&d.upload.addEventListener&&(d.upload.addEventListener("progress",function(a){c._onProgress(a,b)},!1),b.xhr=function(){return d})},_initXHRData:function(b){var c,d=b.files[0];if(!b.multipart||b.blob)b.headers=a.extend(b.headers,{"X-File-Name":d.name,"X-File-Type":d.type,"X-File-Size":d.size}),b.blob?b.multipart||(b.contentType="application/octet-stream",b.data=b.blob):(b.contentType=d.type,b.data=d);b.multipart&&typeof FormData!="undefined"&&(b.formData instanceof FormData?c=b.formData:(c=new FormData,a.each(this._getFormData(b),function(a,b){c.append(b.name,b.value)})),b.blob?c.append(b.paramName,b.blob):a.each(b.files,function(a,d){d instanceof Blob&&c.append(b.paramName,d)}),b.data=c),b.blob=null},_initIframeSettings:function(a){a.dataType="iframe "+(a.dataType||""),a.formData=this._getFormData(a)},_initDataSettings:function(a){this._isXHRUpload(a)?this._chunkedUpload(a,!0)||(a.data||this._initXHRData(a),this._initProgressListener(a)):this._initIframeSettings(a)},_initFormSettings:function(b){if(!b.form||!b.form.length)b.form=a(b.fileInput.prop("form"));b.paramName||(b.paramName=b.fileInput.prop("name")||"files[]"),b.url||(b.url=b.form.prop("action")||location.href),b.type=(b.type||b.form.prop("method")||"").toUpperCase(),b.type!=="POST"&&b.type!=="PUT"&&(b.type="POST")},_getAJAXSettings:function(b){var c=a.extend({},this.options,b);return this._initFormSettings(c),this._initDataSettings(c),c},_enhancePromise:function(a){return a.success=a.done,a.error=a.fail,a.complete=a.always,a},_getXHRPromise:function(b,c,d){var e=a.Deferred(),f=e.promise();return c=c||this.options.context||f,b===!0?e.resolveWith(c,d):b===!1&&e.rejectWith(c,d),f.abort=e.promise,this._enhancePromise(f)},_chunkedUpload:function(b,c){var d=this,e=b.files[0],f=e.size,g=b.uploadedBytes=b.uploadedBytes||0,h=b.maxChunkSize||f,i=e.webkitSlice||e.mozSlice||e.slice,j,k,l,m;return!(this._isXHRUpload(b)&&i&&(g||h<f))||b.data?!1:c?!0:g>=f?(e.error="uploadedBytes",this._getXHRPromise(!1)):(k=Math.ceil((f-g)/h),j=function(c){return c?j(c-=1).pipe(function(){var f=a.extend({},b);return f.blob=i.call(e,g+c*h,g+(c+1)*h),f.chunkSize=f.blob.size,d._initXHRData(f),d._initProgressListener(f),l=(a.ajax(f)||d._getXHRPromise(!1,f.context)).done(function(){f.loaded||d._onProgress(a.Event("progress",{lengthComputable:!0,loaded:f.chunkSize,total:f.chunkSize}),f),b.uploadedBytes=f.uploadedBytes+=f.chunkSize}),l}):d._getXHRPromise(!0)},m=j(k),m.abort=function(){return l.abort()},this._enhancePromise(m))},_beforeSend:function(a,b){this._active===0&&this._trigger("start"),this._active+=1,this._loaded+=b.uploadedBytes||0,this._total+=this._getTotal(b.files)},_onDone:function(b,c,d,e){this._isXHRUpload(e)||this._onProgress(a.Event("progress",{lengthComputable:!0,loaded:1,total:1}),e),e.result=b,e.textStatus=c,e.jqXHR=d,this._trigger("done",null,e)},_onFail:function(a,b,c,d){d.jqXHR=a,d.textStatus=b,d.errorThrown=c,this._trigger("fail",null,d),d.recalculateProgress&&(this._loaded-=d.loaded||d.uploadedBytes||0,this._total-=d.total||this._getTotal(d.files))},_onAlways:function(a,b,c,d,e){this._active-=1,e.result=a,e.textStatus=b,e.jqXHR=c,e.errorThrown=d,this._trigger("always",null,e),this._active===0&&(this._trigger("stop"),this._loaded=this._total=0)},_onSend:function(b,c){var d=this,e,f,g=d._getAJAXSettings(c),h=function(c,f){return e=e||(c!==!1&&d._trigger("send",b,g)!==!1&&(d._chunkedUpload(g)||a.ajax(g))||d._getXHRPromise(!1,g.context,f)).done(function(a,b,c){d._onDone(a,b,c,g)}).fail(function(a,b,c){d._onFail(a,b,c,g)}).always(function(a,b,c){c&&c.done?d._onAlways(a,b,c,undefined,g):d._onAlways(undefined,b,a,c,g)}),e};return this._beforeSend(b,g),this.options.sequentialUploads?(f=this._sequence=this._sequence.pipe(h,h),f.abort=function(){return e?e.abort():h(!1,[undefined,"abort","abort"])},this._enhancePromise(f)):h()},_onAdd:function(b,c){var d=this,e=!0,f=a.extend({},this.options,c);if(f.singleFileUploads&&this._isXHRUpload(f))return a.each(c.files,function(f,g){var h=a.extend({},c,{files:[g]});return h.submit=function(){return d._onSend(b,h)},e=d._trigger("add",b,h)}),e;if(c.files.length)return c=a.extend({},c),c.submit=function(){return d._onSend(b,c)},this._trigger("add",b,c)},_normalizeFile:function(a,b){b.name===undefined&&b.size===undefined&&(b.name=b.fileName,b.size=b.fileSize)},_replaceFileInput:function(a){var b=a.clone(!0).val("");return a.replaceWith(b),b},_onChange:function(b){var c=b.data.fileupload,d={files:a.each(a.makeArray(b.target.files),c._normalizeFile),fileInput:a(b.target),form:a(b.target.form)};d.files.length||(d.files=[{name:b.target.value.replace(/^.*\\/,"")}]),d.form.length?d.fileInput.data("blueimp.fileupload.form",d.form):d.form=d.fileInput.data("blueimp.fileupload.form"),c.options.replaceFileInput&&c._replaceFileInput(d.fileInput);if(c._trigger("change",b,d)===!1||c._onAdd(b,d)===!1)return!1},_onDrop:function(b){var c=b.data.fileupload,d=b.dataTransfer=b.originalEvent.dataTransfer,e={files:a.each(a.makeArray(d&&d.files),c._normalizeFile)};if(c._trigger("drop",b,e)===!1||c._onAdd(b,e)===!1)return!1;b.preventDefault()},_onDragOver:function(a){var b=a.data.fileupload,c=a.dataTransfer=a.originalEvent.dataTransfer;if(b._trigger("dragover",a)===!1)return!1;c&&(c.dropEffect=c.effectAllowed="copy"),a.preventDefault()},_initEventHandlers:function(){var a=this.options.namespace||this.name;this.options.dropZone.bind("dragover."+a,{fileupload:this},this._onDragOver).bind("drop."+a,{fileupload:this},this._onDrop),this.options.fileInput.bind("change."+a,{fileupload:this},this._onChange)},_destroyEventHandlers:function(){var a=this.options.namespace||this.name;this.options.dropZone.unbind("dragover."+a,this._onDragOver).unbind("drop."+a,this._onDrop),this.options.fileInput.unbind("change."+a,this._onChange)},_beforeSetOption:function(a,b){this._destroyEventHandlers()},_afterSetOption:function(b,c){var d=this.options;d.fileInput||(d.fileInput=a()),d.dropZone||(d.dropZone=a()),this._initEventHandlers()},_setOption:function(b,c){var d=a.inArray(b,this._refreshOptionsList)!==-1;d&&this._beforeSetOption(b,c),a.Widget.prototype._setOption.call(this,b,c),d&&this._afterSetOption(b,c)},_create:function(){var b=this.options;b.fileInput===undefined?b.fileInput=this.element.is("input:file")?this.element:this.element.find("input:file"):b.fileInput||(b.fileInput=a()),b.dropZone||(b.dropZone=a()),this._sequence=this._getXHRPromise(!0),this._active=this._loaded=this._total=0,this._initEventHandlers()},destroy:function(){this._destroyEventHandlers(),a.Widget.prototype.destroy.call(this)},enable:function(){a.Widget.prototype.enable.call(this),this._initEventHandlers()},disable:function(){this._destroyEventHandlers(),a.Widget.prototype.disable.call(this)},add:function(b){if(!b||this.options.disabled)return;b.files=a.each(a.makeArray(b.files),this._normalizeFile),this._onAdd(null,b)},send:function(b){if(b&&!this.options.disabled){b.files=a.each(a.makeArray(b.files),this._normalizeFile);if(b.files.length)return this._onSend(null,b)}return this._getXHRPromise(!1,b&&b.context)}})}(a),a.fn.fileupload})
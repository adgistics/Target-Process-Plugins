/*
 * jQuery File Upload Plugin 5.6
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

(function(factory){typeof define=="function"&&define.amd?define(["jQuery","./jquery.iframe-transport"],factory):factory(window.jQuery)})(function($){$.widget("blueimp.fileupload",{options:{namespace:undefined,dropZone:$(document),fileInput:undefined,replaceFileInput:!0,paramName:undefined,singleFileUploads:!0,limitMultiFileUploads:undefined,sequentialUploads:!1,limitConcurrentUploads:undefined,forceIframeTransport:!1,postMessage:undefined,multipart:!0,maxChunkSize:undefined,uploadedBytes:undefined,recalculateProgress:!0,formData:function(form){return form.serializeArray()},add:function(e,data){data.submit()},processData:!1,contentType:!1,cache:!1},_refreshOptionsList:["namespace","dropZone","fileInput"],_isXHRUpload:function(options){var undef="undefined";return!options.forceIframeTransport&&typeof XMLHttpRequestUpload!==undef&&typeof File!==undef&&(!options.multipart||typeof FormData!==undef)},_getFormData:function(options){var formData;return typeof options.formData=="function"?options.formData(options.form):$.isArray(options.formData)?options.formData:options.formData?(formData=[],$.each(options.formData,function(name,value){formData.push({name:name,value:value})}),formData):[]},_getTotal:function(files){var total=0;return $.each(files,function(index,file){total+=file.size||1}),total},_onProgress:function(e,data){if(e.lengthComputable){var total=data.total||this._getTotal(data.files),loaded=parseInt(e.loaded/e.total*(data.chunkSize||total),10)+(data.uploadedBytes||0);this._loaded+=loaded-(data.loaded||data.uploadedBytes||0),data.lengthComputable=!0,data.loaded=loaded,data.total=total,this._trigger("progress",e,data),this._trigger("progressall",e,{lengthComputable:!0,loaded:this._loaded,total:this._total})}},_initProgressListener:function(options){var that=this,xhr=options.xhr?options.xhr():$.ajaxSettings.xhr();xhr.upload&&($(xhr.upload).bind("progress",function(e){var oe=e.originalEvent;e.lengthComputable=oe.lengthComputable,e.loaded=oe.loaded,e.total=oe.total,that._onProgress(e,options)}),options.xhr=function(){return xhr})},_initXHRData:function(options){var formData,file=options.files[0];if(!options.multipart||options.blob)options.headers=$.extend(options.headers,{"X-File-Name":file.name,"X-File-Type":file.type,"X-File-Size":file.size}),options.blob?options.multipart||(options.contentType="application/octet-stream",options.data=options.blob):(options.contentType=file.type,options.data=file);options.multipart&&typeof FormData!="undefined"&&(options.postMessage?(formData=this._getFormData(options),options.blob?formData.push({name:options.paramName,value:options.blob}):$.each(options.files,function(index,file){formData.push({name:options.paramName,value:file})})):(options.formData instanceof FormData?formData=options.formData:(formData=new FormData,$.each(this._getFormData(options),function(index,field){formData.append(field.name,field.value)})),options.blob?formData.append(options.paramName,options.blob):$.each(options.files,function(index,file){file instanceof Blob&&formData.append(options.paramName,file)})),options.data=formData),options.blob=null},_initIframeSettings:function(options){options.dataType="iframe "+(options.dataType||""),options.formData=this._getFormData(options)},_initDataSettings:function(options){this._isXHRUpload(options)?(this._chunkedUpload(options,!0)||(options.data||this._initXHRData(options),this._initProgressListener(options)),options.postMessage&&(options.dataType="postmessage "+(options.dataType||""))):this._initIframeSettings(options,"iframe")},_initFormSettings:function(options){if(!options.form||!options.form.length)options.form=$(options.fileInput.prop("form"));options.paramName||(options.paramName=options.fileInput.prop("name")||"files[]"),options.url||(options.url=options.form.prop("action")||location.href),options.type=(options.type||options.form.prop("method")||"").toUpperCase(),options.type!=="POST"&&options.type!=="PUT"&&(options.type="POST")},_getAJAXSettings:function(data){var options=$.extend({},this.options,data);return this._initFormSettings(options),this._initDataSettings(options),options},_enhancePromise:function(promise){return promise.success=promise.done,promise.error=promise.fail,promise.complete=promise.always,promise},_getXHRPromise:function(resolveOrReject,context,args){var dfd=$.Deferred(),promise=dfd.promise();return context=context||this.options.context||promise,resolveOrReject===!0?dfd.resolveWith(context,args):resolveOrReject===!1&&dfd.rejectWith(context,args),promise.abort=dfd.promise,this._enhancePromise(promise)},_chunkedUpload:function(options,testOnly){var that=this,file=options.files[0],fs=file.size,ub=options.uploadedBytes=options.uploadedBytes||0,mcs=options.maxChunkSize||fs,slice=file.webkitSlice||file.mozSlice||file.slice,upload,n,jqXHR,pipe;return!(this._isXHRUpload(options)&&slice&&(ub||mcs<fs))||options.data?!1:testOnly?!0:ub>=fs?(file.error="uploadedBytes",this._getXHRPromise(!1,options.context,[null,"error",file.error])):(n=Math.ceil((fs-ub)/mcs),upload=function(i){return i?upload(i-=1).pipe(function(){var o=$.extend({},options);return o.blob=slice.call(file,ub+i*mcs,ub+(i+1)*mcs),o.chunkSize=o.blob.size,that._initXHRData(o),that._initProgressListener(o),jqXHR=($.ajax(o)||that._getXHRPromise(!1,o.context)).done(function(){o.loaded||that._onProgress($.Event("progress",{lengthComputable:!0,loaded:o.chunkSize,total:o.chunkSize}),o),options.uploadedBytes=o.uploadedBytes+=o.chunkSize}),jqXHR}):that._getXHRPromise(!0,options.context)},pipe=upload(n),pipe.abort=function(){return jqXHR.abort()},this._enhancePromise(pipe))},_beforeSend:function(e,data){this._active===0&&this._trigger("start"),this._active+=1,this._loaded+=data.uploadedBytes||0,this._total+=this._getTotal(data.files)},_onDone:function(result,textStatus,jqXHR,options){this._isXHRUpload(options)||this._onProgress($.Event("progress",{lengthComputable:!0,loaded:1,total:1}),options),options.result=result,options.textStatus=textStatus,options.jqXHR=jqXHR,this._trigger("done",null,options)},_onFail:function(jqXHR,textStatus,errorThrown,options){options.jqXHR=jqXHR,options.textStatus=textStatus,options.errorThrown=errorThrown,this._trigger("fail",null,options),options.recalculateProgress&&(this._loaded-=options.loaded||options.uploadedBytes||0,this._total-=options.total||this._getTotal(options.files))},_onAlways:function(jqXHRorResult,textStatus,jqXHRorError,options){this._active-=1,options.textStatus=textStatus,jqXHRorError&&jqXHRorError.always?(options.jqXHR=jqXHRorError,options.result=jqXHRorResult):(options.jqXHR=jqXHRorResult,options.errorThrown=jqXHRorError),this._trigger("always",null,options),this._active===0&&(this._trigger("stop"),this._loaded=this._total=0)},_onSend:function(e,data){var that=this,jqXHR,slot,pipe,options=that._getAJAXSettings(data),send=function(resolve,args){return that._sending+=1,jqXHR=jqXHR||(resolve!==!1&&that._trigger("send",e,options)!==!1&&(that._chunkedUpload(options)||$.ajax(options))||that._getXHRPromise(!1,options.context,args)).done(function(result,textStatus,jqXHR){that._onDone(result,textStatus,jqXHR,options)}).fail(function(jqXHR,textStatus,errorThrown){that._onFail(jqXHR,textStatus,errorThrown,options)}).always(function(jqXHRorResult,textStatus,jqXHRorError){that._sending-=1,that._onAlways(jqXHRorResult,textStatus,jqXHRorError,options);if(options.limitConcurrentUploads&&options.limitConcurrentUploads>that._sending){var nextSlot=that._slots.shift();while(nextSlot){if(!nextSlot.isRejected()){nextSlot.resolve();break}nextSlot=that._slots.shift()}}}),jqXHR};return this._beforeSend(e,options),this.options.sequentialUploads||this.options.limitConcurrentUploads&&this.options.limitConcurrentUploads<=this._sending?(this.options.limitConcurrentUploads>1?(slot=$.Deferred(),this._slots.push(slot),pipe=slot.pipe(send)):pipe=this._sequence=this._sequence.pipe(send,send),pipe.abort=function(){var args=[undefined,"abort","abort"];return jqXHR?jqXHR.abort():(slot&&slot.rejectWith(args),send(!1,args))},this._enhancePromise(pipe)):send()},_onAdd:function(e,data){var that=this,result=!0,options=$.extend({},this.options,data),limit=options.limitMultiFileUploads,fileSet,i;if(!options.singleFileUploads&&!limit||!this._isXHRUpload(options))fileSet=[data.files];else if(!options.singleFileUploads&&limit){fileSet=[];for(i=0;i<data.files.length;i+=limit)fileSet.push(data.files.slice(i,i+limit))}return data.originalFiles=data.files,$.each(fileSet||data.files,function(index,element){var files=fileSet?element:[element],newData=$.extend({},data,{files:files});return newData.submit=function(){return newData.jqXHR=this.jqXHR=that._trigger("submit",e,this)!==!1&&that._onSend(e,this),this.jqXHR},result=that._trigger("add",e,newData)}),result},_normalizeFile:function(index,file){file.name===undefined&&file.size===undefined&&(file.name=file.fileName,file.size=file.fileSize)},_replaceFileInput:function(input){var inputClone=input.clone(!0);$("<form></form>").append(inputClone)[0].reset(),input.after(inputClone).detach(),$.cleanData(input.unbind("remove")),this.options.fileInput=this.options.fileInput.map(function(i,el){return el===input[0]?inputClone[0]:el}),input[0]===this.element[0]&&(this.element=inputClone)},_onChange:function(e){var that=e.data.fileupload,data={files:$.each($.makeArray(e.target.files),that._normalizeFile),fileInput:$(e.target),form:$(e.target.form)};data.files.length||(data.files=[{name:e.target.value.replace(/^.*\\/,"")}]),that.options.replaceFileInput&&that._replaceFileInput(data.fileInput);if(that._trigger("change",e,data)===!1||that._onAdd(e,data)===!1)return!1},_onPaste:function(e){var that=e.data.fileupload,cbd=e.originalEvent.clipboardData,items=cbd&&cbd.items||[],data={files:[]};$.each(items,function(index,item){var file=item.getAsFile&&item.getAsFile();file&&data.files.push(file)});if(that._trigger("paste",e,data)===!1||that._onAdd(e,data)===!1)return!1},_onDrop:function(e){var that=e.data.fileupload,dataTransfer=e.dataTransfer=e.originalEvent.dataTransfer,data={files:$.each($.makeArray(dataTransfer&&dataTransfer.files),that._normalizeFile)};if(that._trigger("drop",e,data)===!1||that._onAdd(e,data)===!1)return!1;e.preventDefault()},_onDragOver:function(e){var that=e.data.fileupload,dataTransfer=e.dataTransfer=e.originalEvent.dataTransfer;if(that._trigger("dragover",e)===!1)return!1;dataTransfer&&(dataTransfer.dropEffect=dataTransfer.effectAllowed="copy"),e.preventDefault()},_initEventHandlers:function(){var ns=this.options.namespace;this.options.dropZone.bind("dragover."+ns,{fileupload:this},this._onDragOver).bind("drop."+ns,{fileupload:this},this._onDrop).bind("paste."+ns,{fileupload:this},this._onPaste),this.options.fileInput.bind("change."+ns,{fileupload:this},this._onChange)},_destroyEventHandlers:function(){var ns=this.options.namespace;this.options.dropZone.unbind("dragover."+ns,this._onDragOver).unbind("drop."+ns,this._onDrop).unbind("paste."+ns,this._onPaste),this.options.fileInput.unbind("change."+ns,this._onChange)},_beforeSetOption:function(key,value){this._destroyEventHandlers()},_afterSetOption:function(key,value){var options=this.options;options.fileInput||(options.fileInput=$()),options.dropZone||(options.dropZone=$()),this._initEventHandlers()},_setOption:function(key,value){var refresh=$.inArray(key,this._refreshOptionsList)!==-1;refresh&&this._beforeSetOption(key,value),$.Widget.prototype._setOption.call(this,key,value),refresh&&this._afterSetOption(key,value)},_create:function(){var options=this.options;options.namespace=options.namespace||this.widgetName,options.fileInput===undefined?options.fileInput=this.element.is("input:file")?this.element:this.element.find("input:file"):options.fileInput||(options.fileInput=$()),options.dropZone||(options.dropZone=$()),this._slots=[],this._sequence=this._getXHRPromise(!0),this._sending=this._active=this._loaded=this._total=0,this._initEventHandlers()},destroy:function(){this._destroyEventHandlers(),$.Widget.prototype.destroy.call(this)},enable:function(){$.Widget.prototype.enable.call(this),this._initEventHandlers()},disable:function(){this._destroyEventHandlers(),$.Widget.prototype.disable.call(this)},add:function(data){if(!data||this.options.disabled)return;data.files=$.each($.makeArray(data.files),this._normalizeFile),this._onAdd(null,data)},send:function(data){if(data&&!this.options.disabled){data.files=$.each($.makeArray(data.files),this._normalizeFile);if(data.files.length)return this._onSend(null,data)}return this._getXHRPromise(!1,data&&data.context)}})})
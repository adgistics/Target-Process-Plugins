define(["libs/jquery/jquery.ui"],function(jq){return function($,pluginName){if(pluginName in $)throw new Error('jQuery already has the "'+pluginName+'" property.');var getSelection=function(el){var start=0,end=0,normalizedValue,range,textInputRange,len,endRange,statusSelection=!1;return typeof el.selectionStart=="number"&&typeof el.selectionEnd=="number"?(start=el.selectionStart,end=el.selectionEnd):(range=document.selection.createRange(),range&&range.parentElement()==el&&(len=el.value.length,normalizedValue=el.value.replace(/\r\n/g,"\n"),textInputRange=el.createTextRange(),textInputRange.moveToBookmark(range.getBookmark()),endRange=el.createTextRange(),endRange.collapse(!1),textInputRange.compareEndPoints("StartToEnd",endRange)>-1?start=end=len:(start=-textInputRange.moveStart("character",-len),start+=normalizedValue.slice(0,start).split("\n").length-1,textInputRange.compareEndPoints("EndToEnd",endRange)>-1?end=len:(end=-textInputRange.moveEnd("character",-len),end+=normalizedValue.slice(0,end).split("\n").length-1)))),start-end!=0&&(statusSelection=!0),{start:start,end:end,statusSelection:statusSelection}},bindNamespacedEvents=function($element,eventMap){for(var eventType in eventMap)$element.bind(eventType+"."+pluginName,eventMap[eventType])},unbindNamespacedEvents=function($element,eventMap){for(var eventType in eventMap)$element.unbind(eventType+"."+pluginName,eventMap[eventType])},InputMaskEditor=function($element,options){this.setOptions(options),this.initElement($element),this.bindEvents(options)};InputMaskEditor.prototype={constructor:InputMaskEditor,initElement:function($element){this.$element=$element.addClass(this.className)},setOptions:function(options){var _options=options||{};this.onSave=$.isFunction(_options.onSave)?_options.onSave:$.noop,this.onEditStart=$.isFunction(_options.onEditStart)?_options.onEditStart:$.noop,this.onEditEnd=$.isFunction(_options.onEditEnd)?_options.onEditEnd:$.noop,this.maxLength=_options.maxLength||255,this.mask=_options.mask?new RegExp(_options.mask):!1,this.restoreText=typeof _options.restoreText=="undefined"?!0:_options.restoreText,this.enabled=options.enabled||!0,this.className=options.className||"editableText",this.classNameActive=options.className||"active"},bindEvents:function(options){options=options||{};var self=this;options.resetOnBlur&&(self.onBlur=function(){this._cancelEdit()}),bindNamespacedEvents(self.$element,{blur:$.proxy(self,"onBlur"),keydown:$.proxy(self,"mapKeys"),keypress:$.proxy(self,"mapKeys"),click:$.proxy(self,"onFocus")}),$.browser.msie||$(window).blur(function(){self.$element.blur()})},unbindEvents:function(options){options=options||{};var self=this;options.resetOnBlur&&(self.onBlur=function(){this._cancelEdit()}),unbindNamespacedEvents(self.$element,{blur:$.proxy(self,"onBlur"),keydown:$.proxy(self,"mapKeys"),keypress:$.proxy(self,"mapKeys"),click:$.proxy(self,"onFocus")})},onKeyDefault:function(event){var k=event.which;if(event.ctrlKey||event.altKey||event.metaKey||k<32)return!0;var charValue=String.fromCharCode(k),value=event.target.value,selectionParam=getSelection(event.target);selectionParam.statusSelection?value=value.substring(0,selectionParam.start)+charValue+value.substring(selectionParam.end):value+=charValue;if(!this.mask.test(value))return event.preventDefault()},trimText:function(text){return _.trim(text)},normalizeText:function(text){var normalizedText=this.trimText(text);return normalizedText.length==0&&this.restoreText===!0&&(normalizedText=this.getInitialText()),normalizedText},mapKeys:function(event){switch(event.which){case 13:break;case 27:break;default:event.type=="keypress"&&this.mask&&this.onKeyDefault(event)}}},$.fn[pluginName]=function(options){return this.each(function(index,element){var $element=$(element);$element.data(pluginName,new InputMaskEditor($element,options))})},$[pluginName]=function(element,options){return $(element)[pluginName](options)}}(jq,"inputMaskEditor"),jq.fn.inputMaskEditor})
define(["Underscore","tau/core/class"],function(_,Class){var store2=Class.extend({init:function(configurator){this.path=configurator.getApplicationPath()+"/api/v2/",this.service=$.ajax},escapeExpressionArgument:function(arg){return encodeURIComponent(this._jsEscape(_.asString(arg)))},findAll:function(query){return this.service({url:this.path+query}).pipe(function(responseData){return responseData.items})},_jsEscape:function(content){return content.replace(/(["'\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")}});return store2.prototype.arg=store2.prototype.escapeExpressionArgument,store2})
define(["tau/core/class"],function(Class){return Class.extend({init:function(configurator){},asArray:function(str){return this._process(str)},asString:function(arr){var tags=this._process(arr);return tags.join(", ")},_process:function(tags){return _.isString(tags)&&(tags=tags.split(",")),tags=_.map(tags,function(token){return _.trim(token)}),tags=_.compact(tags),tags=_.uniq(tags,!1,function(v){return v.toLowerCase()}),tags}})})
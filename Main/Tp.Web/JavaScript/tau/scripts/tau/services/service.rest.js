define(["Underscore","jQuery","tau/core/Class","tau/core/types","tau/services/service.arrayToJsonConverter","tau/core/header","tau/core/tau","libs/json2"],function(a,b,c,d,e,f,g){var h=c.extend({init:function(c){c=c||{},a.defaults(c,{api:b,types:d.getDictionary()}),this.config=c},remove:function(a){var b=this,c={Id:a.config.id},d={url:b.getUrl(a),contentType:"application/json; charset=utf-8",type:"DELETE",processData:!1,data:JSON.stringify(c),dataType:"json"},e=this.getErrorCallback(a);b.config.api.ajax(d).success(function(){a.callbacks.success({id:a.config.id})}).error(e)},save:function(b){var c={$set:b.config.$set||{}};if(b.type==="prioritizer"){a.extend(c,{$include:this._formIncludes(b.config.fields)}),this.executeCrudCommandViaPageService(b,c,"save");return}this.executeCrudCommand(b,c,"save")},getErrorCallback:function(a){var c=this.config.appPath,d=function(d){if(d.status===401){document.location.href=c+"/login.aspx?ReturnUrl="+document.location.href;return}try{d.response=b.parseJSON(d.responseText)}catch(e){}finally{a.callbacks.failure(d)}};return d},executeCrudCommandViaPageService:function(c,d,e){var g=this,h={id:c.config.id,type:c.type};a.extend(h,d);var i=JSON.stringify({json:JSON.stringify(h)}),j={url:[g.config.appPath,"PageServices/RESTCrud.asmx",e].join("/"),contentType:"application/json; charset=utf-8",type:"POST",data:i,dataType:"json"},k=this.getErrorCallback(c);g.config.api.ajax(j).success(function(d){var e={id:d.d.id};if(d.d.isError===!0){c.callbacks.failure({Message:d.d.errorMessage,CRUD:!0});return}if(d.d.jsonToReturn&&d.d.jsonToReturn.length>0){var g=b.parseJSON(d.d.jsonToReturn);g=f.formatObject(g),a.extend(e,g.data)}c.callbacks.success(e)}).error(k)},executeCrudCommand:function(b,c){var d=this;a.defaults(b.config,{format:"json"});var e={id:b.config.id};a.extend(e,c.$set);var f=d.getUrl(b,"resultInclude"),g=b.config.format,h=d._getFields(b),i=d._getApiConfig(f,g,"convert",h);a.extend(i,{url:f,contentType:"application/json; charset=utf-8",type:"POST",processData:!1,data:JSON.stringify(e),dataType:"json"}),d._executeApiCall(b,"json",i)},find:function(a){this.get(a)},refresh:function(a){this.get(a)},getCompleteCallback:function(a){var b=this,c=function(c){if(a.type==="context"||a.type==="implementationHistory")c.id=a.config.id;if(a.config.nested===!0){var d=b._getNestedObject(a),e=f.header.getFieldName(d),g={id:a.config.id};g[e]=c,c=g}a.callbacks.success(c)};return c},_getArrayConverter:function(a,b){var c=this;return function(d){var f=c.config.api.parseJSON(d);return e[a]({header:b},f)}},_getJsonConverter:function(){var a=this;return function(b){var c=a.config.api.parseJSON(b);return f.formatObject(c)}},_getApiConfig:function(a,b,c,d){var e=this;return{url:a,accepts:{array:"application/x-array"},dataType:b,converters:{"text array":e._getArrayConverter(c,d),"text json":e._getJsonConverter()}}},_getNextPageFields:function(a){var b=a.fields,c=g.getQueryValueFromUrl(a.url,"include");return c&&c.length>0&&(b=f.parseFieldsFromString(c)),b},_executeApiCall:function(b,c,d){var e=this,f=e.getErrorCallback(b),g=e.getCompleteCallback(b),h=null,i=[],j=function(){var a=i.length===0;return a&&g(h),a},k=function(a){for(var b=0,c=a.nextPages.length;b<c;b++){var d=a.nextPages[b];l(d)}},l=function(b){var d=e._getNextPageFields(b),g=e._getApiConfig(b.url,c,"convertArray",d);e.config.api.ajax(g).success(function(c){i=i.concat(c.nextPages||[]);var d=b.holder;a.each(c.data,function(a){d.push(a)}),c.data.getNextPage&&(c.data.getNextPage().holder=b.holder),k(c);var e=i.indexOf(b);i.splice(e,1),j()}).error(f)},m=function(a){h=a.data;if(b.name==="find"){g(h);return}i=i.concat(a.nextPages||[]),j(),k(a)};e.config.api.ajax(d).success(m).error(f)},get:function(b){var c=this;a.defaults(b.config,{format:"array"});var d=b.config.nested===!0||!b.config.id?"convertArray":"convert",e=c.getUrl(b),f=b.config.format,g=c._getFields(b),h=c._getApiConfig(e,f,d,g);c._executeApiCall(b,f,h)},_formIncludes:function(b){var c=[],d=this;return a.each(b,function(a){if(f.header.isSimple(a)){var b=a;a.indexOf("$ref")===0&&(b=a.replace("$ref:","")),c.push(b);return}var e=f.header.getFieldName(a);c.push(e+d._formIncludes(a[e]))}),["[",c.join(","),"]"].join("")},_getQueryOperators:function(){var b=function(b,c){var d=this,e=[];return a.isArray(c)||(c=[c]),a.each(c,function(a){e.push("("+b+" "+d.name+" "+JSON.stringify(a)+")")}),e},c=function(a){return["("+a+" "+this.name+")"]},d=function(b,c){var d=this,e=[];a.isArray(c)||(c=[c]);var f=[];return a(c).each(function(a){f.push(JSON.stringify(a))}),e.push("("+b+" "+d.name+" ("+f.join(",")+"))"),e};return{$in:{name:"in",render:d},$ne:{name:"ne",render:b},$gt:{name:"gt",render:b},$gte:{name:"gte",render:b},$lt:{name:"lt",render:b},$lte:{name:"lte",render:b},$contains:{name:"contains",render:b},$eq:{name:"eq",render:b},$isNull:{name:"is null",render:c},$isNotNull:{name:"is not null",render:c}}},_isQueryValueWithOperator:function(b,c){var d=a(b).keys();if(d.length===0)return!1;var e=c||this._getQueryOperators();return e.hasOwnProperty(d[0])},_formWhere:function(b,c){var d=[],e=this;c=c||"";var f=e._getQueryOperators();return a.each(a(b).keys(),function(g){var h=b[g],i=c+g;if(a.isString(h)||a.isNumber(h)||a.isDate(h)||a.isArray(h)||a.isBoolean(h)||a.isNull(h)){var j=h===null?"$isNull":"$eq";d=d.concat(f[j].render(i,h));return}if(e._isQueryValueWithOperator(h,f)){a.each(a(h).keys(),function(a){d=d.concat(f[a].render(i,h[a]))});return}d.push(e._formWhere(h,g+"."))}),d},_getWhere:function(a){var b=this._formWhere(a);return b.length===0?"":"&where="+encodeURIComponent(b.join(" and "))},_getNestedObject:function(b){var c=null;return a.each(b.config.fields,function(a){f.header.isSimple(a)||(c=a)}),c},_getFields:function(a){if(a.config.nested!==!0)return a.config.fields;var b=this._getNestedObject(a),c=f.header.getFieldName(b);return b[c]},_getOrderBy:function(a){return!a.config.$orderBy||a.config.$orderBy===""?"":"&orderBy="+a.config.$orderBy},_getOrderByDesc:function(a){return!a.config.$orderByDesc||a.config.$orderByDesc===""?"":"&orderByDesc="+a.config.$orderByDesc},getUrl:function(b,c){var d=this,e={$skip:0,$limit:999,$query:{}};a.defaults(b.config,e);if(b.type==="context")return b.config.format="json",[d.config.path,"context.asmx","?ids="+b.config.id].join("/");if(b.type==="implementationHistory")return b.config.format="json",[d.config.appPath,"Reports/ImplementationHistory.ashx?id="+b.config.id+"&"+(new Date).valueOf()].join("/");var g=d.config.types[b.type]||{resource:b.type},h=b.config.fields,i=[d.config.path,g.resource+".asmx",b.config.id].join("/");if(b.config.nested===!0){var j=d._getNestedObject(b),k=f.header.getFieldName(j);h=j[k],i=[i,k].join("/")}return i=[i,"?skip=",b.config.$skip,"&take=",b.config.$limit,"&",c?c:"include","=",d._formIncludes(h),b.name==="find"?d._getWhere(b.config.$query):"",d._getOrderBy(b),d._getOrderByDesc(b)].join(""),i}});return h})
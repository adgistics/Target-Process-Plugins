define(["jQuery"],function(){return function(){var constants={},ownProp=Object.prototype.hasOwnProperty,allowed={string:1,number:1,"boolean":1,regexp:1};return constants.emailRegexp=/^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,{define:function(name,value){return this.defined(name)?!1:ownProp.call(allowed,$.type(value))?(constants[name]=value,!0):!1},defined:function(name){return ownProp.call(constants,name)},get:function(name){return this.defined(name)?constants[name]:null}}}()})
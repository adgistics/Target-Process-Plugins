define(function(){var a=!1,b=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/,c=function(){},d=0,e=function(a,b){return b};return c.extend=function(c){function j(){!a&&this.init&&(this.__objectId=d++,this.init.apply(this,arguments))}var f=this.prototype;a=!0;var g=new this;a=!1,g.__profiler=g.__profiler||e;for(var h in c){if(h==="__profiler")continue;var i=typeof c[h]=="function"&&typeof f[h]=="function"&&b.test(c[h])?function(a,b){return function(){var c=this._super;this._super=f[a];var d=b.apply(this,arguments);return this._super=c,d}}(h,c[h]):c[h];g[h]=g.__profiler(h,i)}return j.prototype=g,j.constructor=j,j.extend=arguments.callee,j},c})
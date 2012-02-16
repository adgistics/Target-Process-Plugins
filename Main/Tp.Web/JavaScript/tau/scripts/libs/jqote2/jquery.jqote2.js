define(["libs/jquery/jquery"],function(a){return function(b){function m(a,c){throw b.extend(a,c),a}function n(a){var b=[];if(l.call(a)!==f)return!1;for(var c=0,d=a.length;c<d;c++)b[c]=a[c].jqote_id;return b.length?b.sort().join(".").replace(/(\b\d+\b)\.(?:\1(\.|$))+/g,"$1$2"):!1}function o(a,c){var d,e=[],c=c||j,g=l.call(a);if(g===h)return a.jqote_id?[a]:!1;if(g!==f)return[b.jqotec(a,c)];if(g===f)for(var i=0,k=a.length;i<k;i++)(d=o(a[i],c))&&e.push(d[0]);return e.length?e:!1}var c="UndefinedTemplateError",d="TemplateCompilationError",e="TemplateExecutionError",f="[object Array]",g="[object String]",h="[object Function]",i=1,j="%",k=/^[^<]*(<[\w\W]+>)[^>]*$/,l=Object.prototype.toString;b.fn.extend({jqote:function(a,c){var a=l.call(a)===f?a:[a],d="";return this.each(function(e){var f=b.jqotec(this,c);for(var g=0;g<a.length;g++)d+=f.call(a[g],e,g,a,f)}),d}}),b.each({app:"append",pre:"prepend",sub:"html"},function(a,c){b.fn["jqote"+a]=function(d,e,f){var g,h,i=b.jqote(d,e,f),j=k.test(i)?b:function(a){return b(document.createTextNode(a))};return!(g=n(o(d)))||(h=new RegExp("(^|\\.)"+g.split(".").join("\\.(.*)?")+"(\\.|$)")),this.each(function(){var d=j(i);b(this)[c](d),(d[0].nodeType===3?b(this):d).trigger("jqote."+a,[d,h])})}}),b.extend({jqote:function(a,b,d){var e="",d=d||j,g=o(a);g===!1&&m(new Error("Empty or undefined template passed to $.jqote"),{type:c}),b=l.call(b)!==f?[b]:b;for(var h=0,i=g.length;h<i;h++)for(var k=0;k<b.length;k++)e+=g[h].call(b[k],h,k,b,g[h]);return e},jqotec:function(f,h){var n,o,p,h=h||j,q=l.call(f);if(q===g&&k.test(f)){o=p=f;if(n=b.jqotecache[f])return n}else{o=q===g||f.nodeType?b(f):f instanceof a?f:null,(!o[0]||!(p=o[0].innerHTML)&&!(p=o.text()))&&m(new Error("Empty or undefined template passed to $.jqotec"),{type:c});if(n=b.jqotecache[b.data(o[0],"jqote_id")])return n}var r="",s,t=p.replace(/\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\n\t]/g,"").split("<"+h).join(h+">").split(h+">");for(var u=0,v=t.length;u<v;u++)r+=t[u].charAt(0)!==""?"out+='"+t[u].replace(/(\\|["'])/g,"\\$1")+"'":t[u].charAt(1)==="="?";out+=("+t[u].substr(2)+");":t[u].charAt(1)==="!"?";out+=$.jqotenc(("+t[u].substr(2)+"));":";"+t[u].substr(1);r="try{"+('var out="";'+r+";return out;").split("out+='';").join("").split('var out="";out+=').join("var out=")+'}catch(e){e.type="'+e+'";e.args=arguments;e.template=arguments.callee.toString();throw e;}';try{var w=new Function("i, j, data, fn",r)}catch(x){m(x,{type:d})}return s=o instanceof a?b.data(o[0],"jqote_id",i):o,b.jqotecache[s]=(w.jqote_id=i++,w)},jqotefn:function(a){var c=l.call(a),d=c===g&&k.test(a)?a:b.data(b(a)[0],"jqote_id");return b.jqotecache[d]||!1},jqotetag:function(a){l.call(a)===g&&(j=a)},jqotenc:function(a){return a.toString().replace(/&(?!\w+;)/g,"&#38;").split("<").join("&#60;").split(">").join("&#62;").split('"').join("&#34;").split("'").join("&#39;")},jqotecache:{}}),b.event.special.jqote={add:function(a){var b,c=a.handler,d=a.data?l.call(a.data)!==f?[a.data]:a.data:[];a.namespace||(a.namespace="app.pre.sub");if(!d.length||!(b=n(o(d))))return;a.handler=function(a,d,e){return!e||e.test(b)?c.apply(this,[a,d]):null}}}}(a),a})
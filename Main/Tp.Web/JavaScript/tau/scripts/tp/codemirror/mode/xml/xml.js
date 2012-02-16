define(["tp/codemirror/lib/codemirror"],function(a){a.defineMode("xml",function(a,b){function h(a,b){function c(c){return b.tokenize=c,c(a,b)}var d=a.next();if(d=="<"){if(a.eat("!"))return a.eat("[")?a.match("CDATA[")?c(k("atom","]]>")):null:a.match("--")?c(k("comment","-->")):a.match("DOCTYPE",!0,!0)?(a.eatWhile(/[\w\._\-]/),c(k("meta",">"))):null;if(a.eat("?"))return a.eatWhile(/[\w\._\-]/),b.tokenize=k("meta","?>"),"meta";g=a.eat("/")?"closeTag":"openTag",a.eatSpace(),f="";var e;while(e=a.eat(/[^\s\u00a0=<>\"\'\/?]/))f+=e;return b.tokenize=i,"tag"}return d=="&"?(a.eatWhile(/[^;]/),a.eat(";"),"atom"):(a.eatWhile(/[^&<]/),null)}function i(a,b){var c=a.next();return c==">"||c=="/"&&a.eat(">")?(b.tokenize=h,g=c==">"?"endTag":"selfcloseTag","tag"):c=="="?(g="equals",null):/[\'\"]/.test(c)?(b.tokenize=j(c),b.tokenize(a,b)):(a.eatWhile(/[^\s\u00a0=<>\"\'\/?]/),"word")}function j(a){return function(b,c){while(!b.eol())if(b.next()==a){c.tokenize=i;break}return"string"}}function k(a,b){return function(c,d){while(!c.eol()){if(c.match(b)){d.tokenize=h;break}c.next()}return a}}function n(){for(var a=arguments.length-1;a>=0;a--)l.cc.push(arguments[a])}function o(){return n.apply(null,arguments),!0}function p(a,b){var c=d.doNotIndent.hasOwnProperty(a)||l.context&&l.context.noIndent;l.context={prev:l.context,tagName:a,indent:l.indented,startOfLine:b,noIndent:c}}function q(){l.context&&(l.context=l.context.prev)}function r(a){if(a=="openTag")return l.tagName=f,o(u,s(l.startOfLine));if(a=="closeTag"){var b=!1;return l.context?b=l.context.tagName!=f:b=!0,b&&(m="error"),o(t(b))}return a=="string"?((!l.context||l.context.name!="!cdata")&&p("!cdata"),l.tokenize==h&&q(),o()):o()}function s(a){return function(b){return b=="selfcloseTag"||b=="endTag"&&d.autoSelfClosers.hasOwnProperty(l.tagName.toLowerCase())?o():b=="endTag"?(p(l.tagName,a),o()):o()}}function t(a){return function(b){return a&&(m="error"),b=="endTag"?(q(),o()):(m="error",o(arguments.callee))}}function u(a){return a=="word"?(m="attribute",o(u)):a=="equals"?o(v,u):a=="string"?(m="error",o(u)):n()}function v(a){return a=="word"&&d.allowUnquoted?(m="string",o()):a=="string"?o(w):n()}function w(a){return a=="string"?o(w):n()}var c=a.indentUnit,d=b.htmlMode?{autoSelfClosers:{br:!0,img:!0,hr:!0,link:!0,input:!0,meta:!0,col:!0,frame:!0,base:!0,area:!0},doNotIndent:{pre:!0,"!cdata":!0},allowUnquoted:!0}:{autoSelfClosers:{},doNotIndent:{"!cdata":!0},allowUnquoted:!1},e=b.alignCDATA,f,g,l,m;return{startState:function(){return{tokenize:h,cc:[],indented:0,startOfLine:!0,tagName:null,context:null}},token:function(a,b){a.sol()&&(b.startOfLine=!0,b.indented=a.indentation());if(a.eatSpace())return null;m=g=f=null;var c=b.tokenize(a,b);b.type=g;if((c||g)&&c!="comment"){l=b;for(;;){var d=b.cc.pop()||r;if(d(g||c))break}}return b.startOfLine=!1,m||c},indent:function(a,b){var d=a.context;if(d&&d.noIndent)return 0;if(e&&/<!\[CDATA\[/.test(b))return 0;d&&/^<\//.test(b)&&(d=d.prev);while(d&&!d.startOfLine)d=d.prev;return d?d.indent+c:0},compareStates:function(a,b){if(a.indented!=b.indented||a.tokenize!=b.tokenize)return!1;for(var c=a.context,d=b.context;;c=c.prev,d=d.prev){if(!c||!d)return c==d;if(c.tagName!=d.tagName)return!1}},electricChars:"/"}}),a.defineMIME("application/xml","xml"),a.defineMIME("text/html",{name:"xml",htmlMode:!0})})
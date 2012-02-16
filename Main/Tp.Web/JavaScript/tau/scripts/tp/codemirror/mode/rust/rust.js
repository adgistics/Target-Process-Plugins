define(["tp/codemirror/lib/codemirror"],function(a){a.defineMode("rust",function(){function h(a,b){return f=a,b}function i(a,b){var c=a.next();if(c=='"')return b.tokenize=j,b.tokenize(a,b);if(c=="'")return f="atom",a.eat("\\")?a.skipTo("'")?(a.next(),"string"):"error":(a.next(),a.eat("'")?"string":"error");if(c=="/"){if(a.eat("/"))return a.skipToEnd(),"comment";if(a.eat("*"))return b.tokenize=k(1),b.tokenize(a,b)}if(c=="#")return a.eat("[")?(f="open-attr",null):(a.eatWhile(/\w/),h("macro","meta"));if(c==":"&&a.match(":<"))return h("op",null);if(c.match(/\d/)||c=="."&&a.eat(/\d/)){var d=!1;return!a.match(/^x[\da-f]+/i)&&!a.match(/^b[01]+/)&&(a.eatWhile(/\d/),a.eat(".")&&(d=!0,a.eatWhile(/\d/)),a.match(/^e[+\-]?\d+/i)&&(d=!0)),d?a.match(/^f(?:32|64)/):a.match(/^[ui](?:8|16|32|64)/),h("atom","number")}return c.match(/[()\[\]{}:;,]/)?h(c,null):c=="-"&&a.eat(">")?h("->",null):c.match(e)?(a.eatWhile(e),h("op",null)):(a.eatWhile(/\w/),g=a.current(),a.match(/^::\w/)?(a.backUp(1),h("prefix","variable-2")):b.keywords.propertyIsEnumerable(g)?h(b.keywords[g],g.match(/true|false/)?"atom":"keyword"):h("name","variable"))}function j(a,b){var c,d=!1;while(c=a.next()){if(c=='"'&&!d)return b.tokenize=i,h("atom","string");d=!d&&c=="\\"}return h("op","string")}function k(a){return function(b,c){var d=null,e;while(e=b.next()){if(e=="/"&&d=="*"){if(a==1){c.tokenize=i;break}return c.tokenize=k(a-1),c.tokenize(b,c)}if(e=="*"&&d=="/")return c.tokenize=k(a+1),c.tokenize(b,c);d=e}return"comment"}}function m(){for(var a=arguments.length-1;a>=0;a--)l.cc.push(arguments[a])}function n(){return m.apply(null,arguments),!0}function o(a,b){var c=function(){var c=l.state;c.lexical={indented:c.indented,column:l.stream.column(),type:a,prev:c.lexical,info:b}};return c.lex=!0,c}function p(){var a=l.state;a.lexical.prev&&(a.lexical.type==")"&&(a.indented=a.lexical.indented),a.lexical=a.lexical.prev)}function q(){l.state.keywords=d}function r(){l.state.keywords=c}function s(a,b){function c(d){return d==","?n(a,c):d==b?n():n(c)}return function(d){return d==b?n():m(a,c)}}function t(a){return a=="}"?n():a=="let"?n(o("stat","let"),B,p,t):a=="fn"?n(o("stat"),F,p,t):a=="type"?n(o("stat"),G,u,p,t):a=="tag"?n(o("stat"),H,p,t):a=="mod"?n(o("stat"),J,p,t):a=="open-attr"?n(o("]"),s(v,"]"),p):a=="ignore"||a.match(/[\]\);,]/)?n(t):m(o("stat"),v,p,u,t)}function u(a){return a==";"?n():m()}function v(a){return a=="atom"||a=="name"?n(w):a=="{"?n(o("}"),y,p):a.match(/[\[\(]/)?V(a,v):a.match(/[\]\)\};,]/)?m():a=="if-style"?n(v,v):a=="else-style"||a=="op"?n(v):a=="for"?n(P,D,E,v,v):a=="alt"?n(v,R):a=="fn"?n(F):a=="macro"?n(U):n()}function w(a){return g=="."?n(x):g=="::<"?n(K,w):a=="op"||g==":"?n(v):a=="("||a=="["?V(a,v):m()}function x(a){return g.match(/^\w+$/)?(l.marked="variable",n(w)):m(v)}function y(a){if(a=="op"){if(g=="|")return n(A,p,o("}","block"),t);if(g=="||")return n(p,o("}","block"),t)}return g=="mutable"||g.match(/^\w+$/)&&l.stream.peek()==":"&&!l.stream.match("::",!1)?m(z(v)):m(t)}function z(a){function b(c){return g=="mutable"||g=="with"?(l.marked="keyword",n(b)):g.match(/^\w*$/)?(l.marked="variable",n(b)):c==":"?n(a,b):c=="}"?n():n(b)}return b}function A(a){return a=="name"?(l.marked="def",n(A)):a=="op"&&g=="|"?n():n(A)}function B(a){return a.match(/[\]\)\};]/)?n():g=="="?n(v,C):a==","?n(B):m(P,D,B)}function C(a){return a.match(/[\]\)\};,]/)?m(B):m(v,C)}function D(a){return a==":"?n(q,M,r):m()}function E(a){return a=="name"&&g=="in"?(l.marked="keyword",n()):m()}function F(a){return a=="name"?(l.marked="def",n(F)):g=="<"?n(K,F):a=="{"?m(v):a=="("?n(o(")"),s(L,")"),p,F):a=="->"?n(q,M,r,F):n(F)}function G(a){return a=="name"?(l.marked="def",n(G)):g=="<"?n(K,G):g=="="?n(q,M,r):n(G)}function H(a){return a=="name"?(l.marked="def",n(H)):g=="<"?n(K,H):g=="="?n(q,M,r,u):a=="{"?n(o("}"),q,I,r,p):n(H)}function I(a){return a=="}"?n():a=="("?n(o(")"),s(M,")"),p,I):(g.match(/^\w+$/)&&(l.marked="def"),n(I))}function J(a){return a=="name"?(l.marked="def",n(J)):a=="{"?n(o("}"),t,p):m()}function K(a){return g==">"?n():g==","?n(K):m(M,K)}function L(a){return a=="name"?(l.marked="def",n(L)):a==":"?n(q,M,r):m()}function M(a){return a=="name"?(l.marked="variable-3",n(N)):g=="mutable"?(l.marked="keyword",n(M)):a=="atom"?n(N):a=="op"||a=="obj"?n(M):a=="fn"?n(O):a=="{"?n(o("{"),z(M),p):V(a,M)}function N(a){return g=="<"?n(K):m()}function O(a){return a=="("?n(o("("),s(M,")"),p,O):a=="->"?n(M):m()}function P(a){return a=="name"?(l.marked="def",n(Q)):a=="atom"?n(Q):a=="op"?n(P):a.match(/[\]\)\};,]/)?m():V(a,P)}function Q(a){return a=="op"&&g=="."?n():g=="to"?(l.marked="keyword",n(P)):m()}function R(a){return a=="{"?n(o("}","alt"),S,p):m()}function S(a){return a=="}"?n():a=="|"?n(S):g=="when"?(l.marked="keyword",n(v,T)):a.match(/[\]\);,]/)?n(S):m(P,T)}function T(a){return a=="{"?n(o("}","alt"),t,p,S):m(S)}function U(a){return a.match(/[\[\(\{]/)?V(a,v):m()}function V(a,b){return a=="["?n(o("]"),s(b,"]"),p):a=="("?n(o(")"),s(b,")"),p):a=="{"?n(o("}"),s(b,"}"),p):n()}function W(a,b,c){var d=a.cc;l.state=a,l.stream=b,l.marked=null,l.cc=d;for(;;){var e=d.length?d.pop():t;if(e(f)){while(d.length&&d[d.length-1].lex)d.pop()();return l.marked||c}}}var a=4,b=2,c={"if":"if-style","while":"if-style","else":"else-style","do":"else-style",ret:"else-style",fail:"else-style","break":"atom",cont:"atom","const":"let",resource:"fn",let:"let",fn:"fn","for":"for",alt:"alt",obj:"fn",lambda:"fn",type:"type",tag:"tag",mod:"mod",as:"op","true":"atom","false":"atom",assert:"op",check:"op",claim:"op","native":"ignore",unsafe:"ignore","import":"else-style","export":"else-style",copy:"op",log:"op",log_err:"op",use:"op",bind:"op"},d=function(){var a={fn:"fn",block:"fn",obj:"obj"},b="bool uint int i8 i16 i32 i64 u8 u16 u32 u64 float f32 f64 str char".split(" ");for(var c=0,d=b.length;c<d;++c)a[b[c]]="atom";return a}(),e=/[+\-*&%=<>!?|\.@]/,f,g,l={state:null,stream:null,marked:null,cc:null};return p.lex=q.lex=r.lex=!0,{startState:function(){return{tokenize:i,cc:[],lexical:{indented:-a,column:0,type:"top",align:!1},keywords:c,indented:0}},token:function(a,b){a.sol()&&(b.lexical.hasOwnProperty("align")||(b.lexical.align=!1),b.indented=a.indentation());if(a.eatSpace())return null;f=g=null;var c=b.tokenize(a,b);return c=="comment"?c:(b.lexical.hasOwnProperty("align")||(b.lexical.align=!0),f=="prefix"?c:(g||(g=a.current()),W(b,a,c)))},indent:function(c,d){if(c.tokenize!=i)return 0;var e=d&&d.charAt(0),f=c.lexical,g=f.type,h=e==g;return g=="stat"?f.indented+a:f.align?f.column+(h?0:1):f.indented+(h?0:f.info=="alt"?b:a)},electricChars:"{}"}}),a.defineMIME("text/x-rustsrc","rust")})
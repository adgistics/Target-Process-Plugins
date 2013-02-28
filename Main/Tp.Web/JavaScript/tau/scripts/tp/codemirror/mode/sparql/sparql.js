define(["tp/codemirror/lib/codemirror"],function(CodeMirror){CodeMirror.defineMode("sparql",function(config){function wordRegexp(words){return new RegExp("^(?:"+words.join("|")+")$","i")}function tokenBase(stream,state){var ch=stream.next();curPunc=null;if(ch=="$"||ch=="?")return stream.match(/^[\w\d]*/),"variable-2";if(ch=="<"&&!stream.match(/^[\s\u00a0=]/,!1))return stream.match(/^[^\s\u00a0>]*>?/),"atom";if(ch=='"'||ch=="'")return state.tokenize=tokenLiteral(ch),state.tokenize(stream,state);if(/[{}\(\),\.;\[\]]/.test(ch))return curPunc=ch,null;if(ch=="#")return stream.skipToEnd(),"comment";if(operatorChars.test(ch))return stream.eatWhile(operatorChars),null;if(ch==":")return stream.eatWhile(/[\w\d\._\-]/),"atom";stream.eatWhile(/[_\w\d]/);if(stream.eat(":"))return stream.eatWhile(/[\w\d_\-]/),"atom";var word=stream.current(),type;return ops.test(word)?null:keywords.test(word)?"keyword":"variable"}function tokenLiteral(quote){return function(stream,state){var escaped=!1,ch;while((ch=stream.next())!=null){if(ch==quote&&!escaped){state.tokenize=tokenBase;break}escaped=!escaped&&ch=="\\"}return"string"}}function pushContext(state,type,col){state.context={prev:state.context,indent:state.indent,col:col,type:type}}function popContext(state){state.indent=state.context.indent,state.context=state.context.prev}var indentUnit=config.indentUnit,curPunc,ops=wordRegexp(["str","lang","langmatches","datatype","bound","sameterm","isiri","isuri","isblank","isliteral","union","a"]),keywords=wordRegexp(["base","prefix","select","distinct","reduced","construct","describe","ask","from","named","where","order","limit","offset","filter","optional","graph","by","asc","desc"]),operatorChars=/[*+\-<>=&|]/;return{startState:function(base){return{tokenize:tokenBase,context:null,indent:0,col:0}},token:function(stream,state){stream.sol()&&(state.context&&state.context.align==null&&(state.context.align=!1),state.indent=stream.indentation());if(stream.eatSpace())return null;var style=state.tokenize(stream,state);style!="comment"&&state.context&&state.context.align==null&&state.context.type!="pattern"&&(state.context.align=!0);if(curPunc=="(")pushContext(state,")",stream.column());else if(curPunc=="[")pushContext(state,"]",stream.column());else if(curPunc=="{")pushContext(state,"}",stream.column());else if(/[\]\}\)]/.test(curPunc)){while(state.context&&state.context.type=="pattern")popContext(state);state.context&&curPunc==state.context.type&&popContext(state)}else curPunc=="."&&state.context&&state.context.type=="pattern"?popContext(state):/atom|string|variable/.test(style)&&state.context&&(/[\}\]]/.test(state.context.type)?pushContext(state,"pattern",stream.column()):state.context.type=="pattern"&&!state.context.align&&(state.context.align=!0,state.context.col=stream.column()));return style},indent:function(state,textAfter){var firstChar=textAfter&&textAfter.charAt(0),context=state.context;if(/[\]\}]/.test(firstChar))while(context&&context.type=="pattern")context=context.prev;var closing=context&&firstChar==context.type;return context?context.type=="pattern"?context.col:context.align?context.col+(closing?0:1):context.indent+(closing?0:indentUnit):0}}}),CodeMirror.defineMIME("application/x-sparql-query","sparql")})
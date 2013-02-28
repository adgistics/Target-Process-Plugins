define(["tp/codemirror/lib/codemirror"],function(CodeMirror){CodeMirror.defineMode("pascal",function(config){function words(str){var obj={},words=str.split(" ");for(var i=0;i<words.length;++i)obj[words[i]]=!0;return obj}function tokenBase(stream,state){var ch=stream.next();if(ch=="#"&&state.startOfLine)return stream.skipToEnd(),"meta";if(ch=='"'||ch=="'")return state.tokenize=tokenString(ch),state.tokenize(stream,state);if(ch=="("&&stream.eat("*"))return state.tokenize=tokenComment,tokenComment(stream,state);if(/[\[\]{}\(\),;\:\.]/.test(ch))return curPunc=ch,null;if(/\d/.test(ch))return stream.eatWhile(/[\w\.]/),"number";if(ch=="/"&&stream.eat("/"))return stream.skipToEnd(),"comment";if(isOperatorChar.test(ch))return stream.eatWhile(isOperatorChar),"operator";stream.eatWhile(/[\w\$_]/);var cur=stream.current();return keywords.propertyIsEnumerable(cur)?(blockKeywords.propertyIsEnumerable(cur)&&(curPunc="newstatement"),"keyword"):atoms.propertyIsEnumerable(cur)?"atom":"word"}function tokenString(quote){return function(stream,state){var escaped=!1,next,end=!1;while((next=stream.next())!=null){if(next==quote&&!escaped){end=!0;break}escaped=!escaped&&next=="\\"}if(end||!escaped)state.tokenize=null;return"string"}}function tokenComment(stream,state){var maybeEnd=!1,ch;while(ch=stream.next()){if(ch==")"&&maybeEnd){state.tokenize=null;break}maybeEnd=ch=="*"}return"comment"}function Context(indented,column,type,align,prev){this.indented=indented,this.column=column,this.type=type,this.align=align,this.prev=prev}function pushContext(state,col,type){return state.context=new Context(state.indented,col,type,null,state.context)}function popContext(state){var t=state.context.type;if(t==")"||t=="]")state.indented=state.context.indented;return state.context=state.context.prev}var keywords=words("and array begin case const div do downto else end file for forward integer boolean char function goto if in label mod nil not of or packed procedure program record repeat set string then to type until var while with"),blockKeywords=words("case do else for if switch while struct then of"),atoms={"null":!0},isOperatorChar=/[+\-*&%=<>!?|\/]/,curPunc;return{startState:function(basecolumn){return{tokenize:null,context:new Context((basecolumn||0)-config.indentUnit,0,"top",!1),indented:0,startOfLine:!0}},token:function(stream,state){var ctx=state.context;stream.sol()&&(ctx.align==null&&(ctx.align=!1),state.indented=stream.indentation(),state.startOfLine=!0);if(stream.eatSpace())return null;curPunc=null;var style=(state.tokenize||tokenBase)(stream,state);return style=="comment"||style=="meta"?style:(ctx.align==null&&(ctx.align=!0),curPunc!=";"&&curPunc!=":"||ctx.type!="statement"?curPunc=="["?pushContext(state,stream.column(),"]"):curPunc=="("?pushContext(state,stream.column(),")"):curPunc==ctx.type?popContext(state):(ctx.type=="top"||ctx.type=="statement"&&curPunc=="newstatement")&&pushContext(state,stream.column(),"statement"):popContext(state),state.startOfLine=!1,style)},electricChars:"{}"}}),CodeMirror.defineMIME("text/x-pascal","pascal")})
define(["tp/codemirror/lib/codemirror"],function(CodeMirror){CodeMirror.defineMode("rust",function(){function r(tc,style){return tcat=tc,style}function tokenBase(stream,state){var ch=stream.next();if(ch=='"')return state.tokenize=tokenString,state.tokenize(stream,state);if(ch=="'")return tcat="atom",stream.eat("\\")?stream.skipTo("'")?(stream.next(),"string"):"error":(stream.next(),stream.eat("'")?"string":"error");if(ch=="/"){if(stream.eat("/"))return stream.skipToEnd(),"comment";if(stream.eat("*"))return state.tokenize=tokenComment(1),state.tokenize(stream,state)}if(ch=="#")return stream.eat("[")?(tcat="open-attr",null):(stream.eatWhile(/\w/),r("macro","meta"));if(ch==":"&&stream.match(":<"))return r("op",null);if(ch.match(/\d/)||ch=="."&&stream.eat(/\d/)){var flp=!1;return!stream.match(/^x[\da-f]+/i)&&!stream.match(/^b[01]+/)&&(stream.eatWhile(/\d/),stream.eat(".")&&(flp=!0,stream.eatWhile(/\d/)),stream.match(/^e[+\-]?\d+/i)&&(flp=!0)),flp?stream.match(/^f(?:32|64)/):stream.match(/^[ui](?:8|16|32|64)/),r("atom","number")}return ch.match(/[()\[\]{}:;,]/)?r(ch,null):ch=="-"&&stream.eat(">")?r("->",null):ch.match(operatorChar)?(stream.eatWhile(operatorChar),r("op",null)):(stream.eatWhile(/\w/),content=stream.current(),stream.match(/^::\w/)?(stream.backUp(1),r("prefix","variable-2")):state.keywords.propertyIsEnumerable(content)?r(state.keywords[content],content.match(/true|false/)?"atom":"keyword"):r("name","variable"))}function tokenString(stream,state){var ch,escaped=!1;while(ch=stream.next()){if(ch=='"'&&!escaped)return state.tokenize=tokenBase,r("atom","string");escaped=!escaped&&ch=="\\"}return r("op","string")}function tokenComment(depth){return function(stream,state){var lastCh=null,ch;while(ch=stream.next()){if(ch=="/"&&lastCh=="*"){if(depth==1){state.tokenize=tokenBase;break}return state.tokenize=tokenComment(depth-1),state.tokenize(stream,state)}if(ch=="*"&&lastCh=="/")return state.tokenize=tokenComment(depth+1),state.tokenize(stream,state);lastCh=ch}return"comment"}}function pass(){for(var i=arguments.length-1;i>=0;i--)cx.cc.push(arguments[i])}function cont(){return pass.apply(null,arguments),!0}function pushlex(type,info){var result=function(){var state=cx.state;state.lexical={indented:state.indented,column:cx.stream.column(),type:type,prev:state.lexical,info:info}};return result.lex=!0,result}function poplex(){var state=cx.state;state.lexical.prev&&(state.lexical.type==")"&&(state.indented=state.lexical.indented),state.lexical=state.lexical.prev)}function typecx(){cx.state.keywords=typeKeywords}function valcx(){cx.state.keywords=valKeywords}function commasep(comb,end){function more(type){return type==","?cont(comb,more):type==end?cont():cont(more)}return function(type){return type==end?cont():pass(comb,more)}}function block(type){return type=="}"?cont():type=="let"?cont(pushlex("stat","let"),letdef1,poplex,block):type=="fn"?cont(pushlex("stat"),fndef,poplex,block):type=="type"?cont(pushlex("stat"),tydef,endstatement,poplex,block):type=="tag"?cont(pushlex("stat"),tagdef,poplex,block):type=="mod"?cont(pushlex("stat"),mod,poplex,block):type=="open-attr"?cont(pushlex("]"),commasep(expression,"]"),poplex):type=="ignore"||type.match(/[\]\);,]/)?cont(block):pass(pushlex("stat"),expression,poplex,endstatement,block)}function endstatement(type){return type==";"?cont():pass()}function expression(type){return type=="atom"||type=="name"?cont(maybeop):type=="{"?cont(pushlex("}"),exprbrace,poplex):type.match(/[\[\(]/)?matchBrackets(type,expression):type.match(/[\]\)\};,]/)?pass():type=="if-style"?cont(expression,expression):type=="else-style"||type=="op"?cont(expression):type=="for"?cont(pattern,maybetype,inop,expression,expression):type=="alt"?cont(expression,altbody):type=="fn"?cont(fndef):type=="macro"?cont(macro):cont()}function maybeop(type){return content=="."?cont(maybeprop):content=="::<"?cont(typarams,maybeop):type=="op"||content==":"?cont(expression):type=="("||type=="["?matchBrackets(type,expression):pass()}function maybeprop(type){return content.match(/^\w+$/)?(cx.marked="variable",cont(maybeop)):pass(expression)}function exprbrace(type){if(type=="op"){if(content=="|")return cont(blockvars,poplex,pushlex("}","block"),block);if(content=="||")return cont(poplex,pushlex("}","block"),block)}return content=="mutable"||content.match(/^\w+$/)&&cx.stream.peek()==":"&&!cx.stream.match("::",!1)?pass(record_of(expression)):pass(block)}function record_of(comb){function ro(type){return content=="mutable"||content=="with"?(cx.marked="keyword",cont(ro)):content.match(/^\w*$/)?(cx.marked="variable",cont(ro)):type==":"?cont(comb,ro):type=="}"?cont():cont(ro)}return ro}function blockvars(type){return type=="name"?(cx.marked="def",cont(blockvars)):type=="op"&&content=="|"?cont():cont(blockvars)}function letdef1(type){return type.match(/[\]\)\};]/)?cont():content=="="?cont(expression,letdef2):type==","?cont(letdef1):pass(pattern,maybetype,letdef1)}function letdef2(type){return type.match(/[\]\)\};,]/)?pass(letdef1):pass(expression,letdef2)}function maybetype(type){return type==":"?cont(typecx,rtype,valcx):pass()}function inop(type){return type=="name"&&content=="in"?(cx.marked="keyword",cont()):pass()}function fndef(type){return type=="name"?(cx.marked="def",cont(fndef)):content=="<"?cont(typarams,fndef):type=="{"?pass(expression):type=="("?cont(pushlex(")"),commasep(argdef,")"),poplex,fndef):type=="->"?cont(typecx,rtype,valcx,fndef):cont(fndef)}function tydef(type){return type=="name"?(cx.marked="def",cont(tydef)):content=="<"?cont(typarams,tydef):content=="="?cont(typecx,rtype,valcx):cont(tydef)}function tagdef(type){return type=="name"?(cx.marked="def",cont(tagdef)):content=="<"?cont(typarams,tagdef):content=="="?cont(typecx,rtype,valcx,endstatement):type=="{"?cont(pushlex("}"),typecx,tagblock,valcx,poplex):cont(tagdef)}function tagblock(type){return type=="}"?cont():type=="("?cont(pushlex(")"),commasep(rtype,")"),poplex,tagblock):(content.match(/^\w+$/)&&(cx.marked="def"),cont(tagblock))}function mod(type){return type=="name"?(cx.marked="def",cont(mod)):type=="{"?cont(pushlex("}"),block,poplex):pass()}function typarams(type){return content==">"?cont():content==","?cont(typarams):pass(rtype,typarams)}function argdef(type){return type=="name"?(cx.marked="def",cont(argdef)):type==":"?cont(typecx,rtype,valcx):pass()}function rtype(type){return type=="name"?(cx.marked="variable-3",cont(rtypemaybeparam)):content=="mutable"?(cx.marked="keyword",cont(rtype)):type=="atom"?cont(rtypemaybeparam):type=="op"||type=="obj"?cont(rtype):type=="fn"?cont(fntype):type=="{"?cont(pushlex("{"),record_of(rtype),poplex):matchBrackets(type,rtype)}function rtypemaybeparam(type){return content=="<"?cont(typarams):pass()}function fntype(type){return type=="("?cont(pushlex("("),commasep(rtype,")"),poplex,fntype):type=="->"?cont(rtype):pass()}function pattern(type){return type=="name"?(cx.marked="def",cont(patternmaybeop)):type=="atom"?cont(patternmaybeop):type=="op"?cont(pattern):type.match(/[\]\)\};,]/)?pass():matchBrackets(type,pattern)}function patternmaybeop(type){return type=="op"&&content=="."?cont():content=="to"?(cx.marked="keyword",cont(pattern)):pass()}function altbody(type){return type=="{"?cont(pushlex("}","alt"),altblock1,poplex):pass()}function altblock1(type){return type=="}"?cont():type=="|"?cont(altblock1):content=="when"?(cx.marked="keyword",cont(expression,altblock2)):type.match(/[\]\);,]/)?cont(altblock1):pass(pattern,altblock2)}function altblock2(type){return type=="{"?cont(pushlex("}","alt"),block,poplex,altblock1):pass(altblock1)}function macro(type){return type.match(/[\[\(\{]/)?matchBrackets(type,expression):pass()}function matchBrackets(type,comb){return type=="["?cont(pushlex("]"),commasep(comb,"]"),poplex):type=="("?cont(pushlex(")"),commasep(comb,")"),poplex):type=="{"?cont(pushlex("}"),commasep(comb,"}"),poplex):cont()}function parse(state,stream,style){var cc=state.cc;cx.state=state,cx.stream=stream,cx.marked=null,cx.cc=cc;for(;;){var combinator=cc.length?cc.pop():block;if(combinator(tcat)){while(cc.length&&cc[cc.length-1].lex)cc.pop()();return cx.marked||style}}}var indentUnit=4,altIndentUnit=2,valKeywords={"if":"if-style","while":"if-style","else":"else-style","do":"else-style",ret:"else-style",fail:"else-style","break":"atom",cont:"atom","const":"let",resource:"fn",let:"let",fn:"fn","for":"for",alt:"alt",obj:"fn",lambda:"fn",type:"type",tag:"tag",mod:"mod",as:"op","true":"atom","false":"atom",assert:"op",check:"op",claim:"op","native":"ignore",unsafe:"ignore","import":"else-style","export":"else-style",copy:"op",log:"op",log_err:"op",use:"op",bind:"op"},typeKeywords=function(){var keywords={fn:"fn",block:"fn",obj:"obj"},atoms="bool uint int i8 i16 i32 i64 u8 u16 u32 u64 float f32 f64 str char".split(" ");for(var i=0,e=atoms.length;i<e;++i)keywords[atoms[i]]="atom";return keywords}(),operatorChar=/[+\-*&%=<>!?|\.@]/,tcat,content,cx={state:null,stream:null,marked:null,cc:null};return poplex.lex=typecx.lex=valcx.lex=!0,{startState:function(){return{tokenize:tokenBase,cc:[],lexical:{indented:-indentUnit,column:0,type:"top",align:!1},keywords:valKeywords,indented:0}},token:function(stream,state){stream.sol()&&(state.lexical.hasOwnProperty("align")||(state.lexical.align=!1),state.indented=stream.indentation());if(stream.eatSpace())return null;tcat=content=null;var style=state.tokenize(stream,state);return style=="comment"?style:(state.lexical.hasOwnProperty("align")||(state.lexical.align=!0),tcat=="prefix"?style:(content||(content=stream.current()),parse(state,stream,style)))},indent:function(state,textAfter){if(state.tokenize!=tokenBase)return 0;var firstChar=textAfter&&textAfter.charAt(0),lexical=state.lexical,type=lexical.type,closing=firstChar==type;return type=="stat"?lexical.indented+indentUnit:lexical.align?lexical.column+(closing?0:1):lexical.indented+(closing?0:lexical.info=="alt"?altIndentUnit:indentUnit)},electricChars:"{}"}}),CodeMirror.defineMIME("text/x-rustsrc","rust")})
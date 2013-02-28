define(["tp/codemirror/lib/codemirror"],function(CodeMirror){CodeMirror.defineMode("jinja2",function(config,parserConf){function tokenBase(stream,state){var ch=stream.next();if(ch=="{")if(ch=stream.eat(/\{|%|#/))return stream.eat("-"),state.tokenize=inTag(ch),"tag"}function inTag(close){return close=="{"&&(close="}"),function(stream,state){var ch=stream.next();return(ch==close||ch=="-"&&stream.eat(close))&&stream.eat("}")?(state.tokenize=tokenBase,"tag"):stream.match(keywords)?"keyword":close=="#"?"comment":"string"}}var keywords=["block","endblock","for","endfor","in","true","false","loop","none","self","super","if","as","not","and","else","import","with","without","context"];return keywords=new RegExp("^(("+keywords.join(")|(")+"))\\b"),{startState:function(){return{tokenize:tokenBase}},token:function(stream,state){return state.tokenize(stream,state)}}})})
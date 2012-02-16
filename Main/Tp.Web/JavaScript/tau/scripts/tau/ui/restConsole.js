define(["Underscore","jQuery","tau/core/repository","tau/services/service.rest","tau/store/store","tau/core/types.targetprocess","libs/jquery/jquery.console","libs/json2"],function(_,$,repository,serviceRest,store,tauTypes){function initConsole(a){control=$("#console").console({promptLabel:"tau > ",commandValidate:function(a){return a==""?!1:!0},continuedPromptLabel:"  ",commandHandle:function(b,c){var d=a.parse(b);c(d)},autofocus:!0,animateScroll:!0,promptHistory:!0,welcomeMessage:["Welcome to <b>TargetProccess Rest v.1</b> console","---------------------------------------------------","You can execute rest commands using javascript here","<br/>"].join("<br/>")}),layout(),$(window).resize(layout)}function layout(){$("#console, #console .jquery-console-inner").css({height:$(window).height()-12+"px"})}var control=null;$(function(){var restApi=new serviceRest({appPath:appHostAndPath,path:appHostAndPath+"/api/v1"}),repInstance=new repository({service:restApi}),storeInstance=new store({proxy:repInstance}),commandProcessor={command:{},currentId:0,store:storeInstance,parse:function(a){try{this.currentId++;var b=this._parse(a)||"";if(b==="clear")return;return[{msg:JSON.stringify(this.command)+"<div class='rest-out' id='r"+this.currentId+"'>"+b+"</div>",className:"jquery-console-message-value"}]}catch(c){return[{msg:"Error:"+c.message,className:"jquery-console-message-error"}]}},_getRef:function(a,b,c){var d={};d[a]=[];var e=b[c.refs[a].name];return e.fields.length===1&&_.each(_.keys(e.refs),function(b){if(b.indexOf("parent")<0&&b.indexOf("general")<0&&b.indexOf("assignable")<0){var c={};c[b]=[],d[a].push(c)}}),d},_appendAllFields:function(){var a=tauTypes.getDictionary(),b=a[this.command.type],c=[],d=this;b.name!=="context"&&_.each(b.simpleFields,function(a){c.push(a)}),_.extend(this.command.config,{fields:c})},_doRequest:function(){var a=this.currentId,b=new Date,c=null,d={success:function(d){var e="<div class='stats'>execution time: "+(new Date-b)/1e3+" ms</div>",f=_.isArray(d.data)?d.data.length:1;e+="<pre class='prettyprint'>"+JSON.stringify(d.data,null,"\t")+"</pre>",e+="<div class='stats'>"+f+" entities(s) retrieved</div>",$("#r"+a).html(e),control.scrollToBottom(),c=e},failure:function(b){var c=b.data,d=c.responseText.length>1e3?"request failed: "+c.status+" "+c.statusText:c.responseText;$("#r"+a).html(d).addClass("jquery-console-message-error").removeClass("rest-out")}};return _.defaults(this.command,{name:"get"}),this.store[this.command.name](this.command.type,this.command.config,d).done(),c},_getHelp:function(a){var b=null,c=["types? - display the information about all types","&lt;type&gt;? - display the information about type. For example: story?","","GET command can be formed using following steps: <ul>","<li>  Provide type of entity. For example: story","<li>  Provide id of entity. For example: id:2",'<li>  Configure command fields.For example: fields:["id", "name", { entityState: [] }]','<li>  Use "done" to complete command configuration',"</ul>","resource/id - get entity with all fields for defined resource by id","For example: story/2"].join("<br/>");if(a.indexOf("types")>=0)b=_.keys(tauTypes.getDictionary());else{var d=tauTypes.findByKeyword(a.substr(0,a.length-1));d&&(b=d)}return b?"<pre><code>"+JSON.stringify(b||{},null,"\t")+"</code></pre>":c},_processResourcePath:function(a){var b=a.split("\\");b.length===1&&(b=a.split("/"));if(b.length===1)return null;var c=tauTypes.findByKeyword(b[0]);if(!c)return null;var d=parseInt(b[1]);if(!_.isNumber(d))return null;this.command.type=c.name,_.extend(this.command.config,{id:d});if(b.length>2){var e=b[2].split(","),f=[];_.each(e,function(a){if(!c.refs.hasOwnProperty(a)){f.push(a);return}var b={};b[a]=[],f.push(b)}),_.extend(this.command.config,{fields:f})}else this._appendAllFields();return this._doRequest()||"executing request: '"+a+"'..."},_parse:function(arg){_.defaults(this.command,{name:"get",config:{}});var resourceParts=this._processResourcePath(arg);if(resourceParts)return resourceParts;if(arg[arg.length-1]==="?")return this._getHelp(arg);if(arg.toLowerCase()==="clear")return $(".jquery-console-inner>div").remove(),"clear";if(arg=="done")return this._doRequest()||"executing command...";var type=tauTypes.findByKeyword(arg);if(type){this.command.type=type.name;return}if(arg=="all_fields"&&this.command.type){this._appendAllFields();return}eval("var setting = {"+arg+"}");if(setting.hasOwnProperty("type")||setting.hasOwnProperty("name")){_.extend(this.command,setting);return}_.extend(this.command.config,setting)}};initConsole(commandProcessor)})})
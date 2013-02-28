define(["Underscore","./extension.tracking.base","tau/configurator"],function(_,Extension,configurator){return Extension.extend({"global store.command.executed":function(evt,data){if(!data||!data.command||!data.command.config||data.command.name!="save"&&data.command.name!="remove")return;var id=data.command.config.id,idString=id?" #"+id:"",type=data.command.type.toLowerCase();if(data.command.name=="remove"){this.fire("track.action",{name:"delete "+type+idString,area:"entity",tags:["delete "+type,"delete entity","entity"],type:type,id:id});return}if(data.command.name=="save"&&data.command.config.$set){var actionName=id?"update ":"add ",changes=_.keys(data.command.config.$set);if(changes.length===0)return;var keys=changes.join(","),user=window.loggedUser||configurator.getLoggedUser()||{id:0,role:"N/A"};this.fire("track.action.id.sid",{_id:this.getHost()+"/"+evt.caller.id+"/"+user.id+"/"+changes.join("_"),name:actionName+type+idString+" ["+keys.toLowerCase()+"]",area:"entity",tags:[actionName+type,actionName+"entity","entity","add|update"],type:type,changes:changes,id:id})}},"global store.command.failed":function(ev){var message="something is wrong";try{if(ev.data&&ev.data.data){ev.data.data.Message&&(message=ev.data.data.Message);var response=ev.data.data.response;if(response){response.Message&&(message=response.Message);if(_.isArray(response)){var parts=[response[1]];_.isArray(response[4])&&response[4].length>0&&response[4][0]!=parts[0]&&parts.push(response[4][0]),message=parts.join(":&nbsp;")}response.Error&&response.Error.Message&&(message=response.Error.Message)}}}catch(e){}var error={name:message,tags:["error","rest"]};this.fire("track.error",error),this.fire("track.action",error)}})})
define(["Underscore","tau/models/extension.model.base"],function(_,ExtensionBase){return ExtensionBase.extend({category:"model feature roles retriever extension","bus registerStoreRequest":function(){var processId=this.config.context.getProcessId();this.fire("get",{type:"process",query:{id:processId,nested:!0,fields:[{entityStates:["id",{role:["id","name","hasEffort","isPair"]},{entityType:["id","name"]}],list:!0}]},callback:{scope:this,success:this.onEntityStatesRetrieved}})},onEntityStatesRetrieved:function(evtArgs){if(!this.config)return;var entityStates=evtArgs.data.entityStates,roles=this.roles=[],roleIds={},entityTypeName=this.config.context.entity.entityType.name.toLocaleLowerCase();_.each(entityStates,function(entityState){var role=entityState.role;role&&entityState.entityType.name.toLowerCase()===entityTypeName&&(roleIds.hasOwnProperty(role.id)||(roleIds[role.id]=!0,roles.push(role)))}),this.fire("rolesReady",roles)}})})
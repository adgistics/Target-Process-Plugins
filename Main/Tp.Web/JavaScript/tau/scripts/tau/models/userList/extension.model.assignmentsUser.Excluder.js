define(["Underscore","tau/core/model-base"],function(_,EditableBase){return EditableBase.extend({"bus registerStoreRequest":function(){var entity=this.config.context.entity||{entityType:{}},roleType={role:["id","name"]},userType={generalUser:["id","firstName","lastName"]};this.fire("get",{type:entity.entityType.name,query:{id:entity.id,fields:[{assignments:["id",roleType,userType],list:!0}]},callback:{scope:this,success:this.onEntityRetrieved}})},"bus assignmentsUserExluder":function(evtArgs){var data=this.config.data||{},entity=evtArgs.data.data,excludedUsers=[],roleId=data.roleId||(data.role||{}).id;if(roleId){var assignments=entity.assignments||[];for(var i=0;i<assignments.length;i++)assignments[i].role.id==roleId&&excludedUsers.push(assignments[i].generalUser)}this.fire("excludedUserReady",excludedUsers)},onEntityRetrieved:function(evtArgs){this.fire("assignmentsUserExluder",evtArgs)}})})
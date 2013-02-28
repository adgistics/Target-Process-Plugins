define(["Underscore","tau/models/extension.model.base"],function(_,ExtensionBase){return ExtensionBase.extend({category:"model assignment to role mapper","bus registerStoreRequest":function(){var entity=this.config.context.entity||{entityType:{}},userType={generalUser:["id","firstName","lastName"]};this.fire("get",{type:entity.entityType.name,query:{id:entity.id,fields:[{assignments:["id",{role:["id","name"]},userType],list:!0}]},callback:{scope:this,success:this.onAssignmentsRetrieved}})},"bus assignmentsReady+rolesReady+extendDataToBind":function(evtArgs){var assignments=(evtArgs.assignmentsReady||{}).data,rolesForEntity=(evtArgs.rolesReady||{}).data,dataToBind=(evtArgs.extendDataToBind||{}).data,groups=[];for(var i=0;i<rolesForEntity.length;i++){var role=rolesForEntity[i],group={};group.role=role,group.users=this.getUsersInRole(assignments,role),group.allowAdd=!0,this.fire("userGroupWasCreated",group),groups.push(group)}dataToBind.assignments={groups:groups}},_convertUserDataToViewData:function(user){var avatar=user.avatarUri+"32";return{id:user.id,name:_.trim([user.firstName,user.lastName].join(" "))||user.email,avatar:avatar}},getUsersInRole:function(assignments,role){var users=[];assignments=_.sortBy(assignments,function(assignment){return assignment.id});var assignmentsCount=assignments.length;for(var i=0;i<assignmentsCount;i++){var assignment=assignments[i];if(assignment.role.id==role.id){var userData=this._convertUserDataToViewData(assignment.generalUser);userData.assignmentId=assignment.id,userData.roleId=role.id,users.push(userData)}}return users}})})
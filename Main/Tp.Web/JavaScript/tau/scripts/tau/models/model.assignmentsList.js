define(["Underscore","tau/store/types","tau/core/model-base","tau/models/assignmentsList/extension.model.effortRetriever","tau/models/assignmentsList/extension.model.store.operations","tau/models/assignmentsList/extension.model.effortPointsRetriever","tau/models/assignmentsList/extension.model.assignmentsRetriever","tau/models/assignmentsList/extension.model.entityRolesRetriever","tau/models/assignmentsList/extension.model.featureRolesRetriever","tau/models/assignmentsList/extension.model.assignmentToRolesMapper","tau/models/assignmentsList/extension.model.taskEffortRetriever"],function(_,types,ModelBase,EffortRetriever,StoreOperations,EffortPointsRetriever,AssignmentsRetriever,EntityRolesRetriever,FeatureRolesRetriever,AssignmentToRolesMapper,TaskEffortRetriever){var AssignmentsListModel=ModelBase.extend({"bus assignmentsReady":function(evtArgs){this.assignments=evtArgs.data},"bus assignmentsReady:last+userAvatarChanged":function(evtArgs,assignments,userData){var assignmentUser=_.find(assignments,function(item){return item.generalUser.id==userData.id});assignmentUser!==undefined&&this.fire("avatarChanged",userData)},"bus roleEffortsReady":function(evtArgs){this.roleEfforts=evtArgs.data},destroyExtensions:function(){var extensions=this.extensions||[];if(extensions.length>0){var entityId=this.config.context.entity.id,bus=this.bus;_.each(extensions,function(extension){extension.destroy("destroy")})}delete this.extensions},initExtensions:function(){this.destroyExtensions();var type=types.findByKeyword(this.config.context.entity.entityType.name),rolesRetrieved=new(type.name!="feature"?EntityRolesRetriever:FeatureRolesRetriever)(this.config);this.extensions=[new EffortRetriever(this.config),new StoreOperations(this.config),new EffortPointsRetriever(this.config),new AssignmentsRetriever(this.config),rolesRetrieved,new AssignmentToRolesMapper(this.config)],type.name.toLowerCase()=="userstory"&&this.extensions.push(new TaskEffortRetriever(this.config))},onInit:function(){this.clearData();var self=this;self.store.unbind(self),self.initExtensions(),self.fire("registerStoreRequest"),self.fire("commitTransaction",{success:self.done,scope:self}),this.bindStoreListeners()},done:function(){var initialData={};this.bus.fire("extendDataToBind",initialData),this.bus.fire("dataBind",initialData),this.destroyExtensions()},bindStoreListeners:function(){var self=this;self.store.on({eventName:"afterSave",type:"assignment",listener:self},function(){self.afterAssignmentSaved.apply(self,arguments)}),self.store.on({eventName:"afterSave",type:"user",hasChanges:["avatarUri"],listener:self},function(){self.afterUserSaved.apply(self,arguments)}),self.store.on({eventName:"beforeSave",type:"assignment",listener:self},function(){self.beforeSaveAssignment.apply(self,arguments)}),self.store.on({eventName:"beforeSave",type:"roleEffort",listener:self},function(){self.beforeSaveRoleEffort.apply(self,arguments)}),self.store.on({eventName:"afterSave",type:"roleEffort",listener:self},function(){self.afterSaveRoleEffort.apply(self,arguments)}),self.store.on({eventName:"beforeRemove",type:"assignment",listener:self},function(){self.beforeRemoveAssignment.apply(self,arguments)}),self.store.on({eventName:"afterRemove",type:"assignment",listener:self},function(){self.afterAssignmentRemoved.apply(self,arguments)});var entityId=this.config.context.entity.id,entityTypeName=this.config.context.entity.entityType.name,filter={id:entityId};self.store.on({eventName:"beforeRemove",type:entityTypeName,listener:self,filter:filter},function(){self.store.unbind(self)}),self.store.on({eventName:"beforeSave",type:entityTypeName,listener:self,filter:filter,hasChanges:["entityState"]},_.bind(self.beforeEntityEntityStateChanged,self)),self.store.on({eventName:"afterSave",type:entityTypeName,listener:self,filter:filter,hasChanges:["entityState"]},_.bind(self.afterEntityEntityStateChanged,self)),self.store.on({eventName:"afterSave",type:entityTypeName,listener:self,filter:filter,hasChanges:["effort|effortToDo|effortCompleted|tasks-count|tasks-effort-sum|tasks-effortToDo-sum"]},_.bind(self.onDataUpdate,self))},beforeEntityEntityStateChanged:function(evtArgs){this.fire("beforeStateChanged")},afterEntityEntityStateChanged:function(evtArgs){this.fire("afterStateChanged")},onDataUpdate:function(evtArgs){this.fire("dataDidUpdated")},beforeSaveRoleEffort:function(command){var roleEffortId=command.data.id;if(_.isNumber(roleEffortId)&&this.isRoleEffortOfCurrentEntity(roleEffortId)){var cmd=command.data.cmd;cmd.config.fields=cmd.config.fields||[],cmd.config.fields.push("effortToDo"),this.fire("beforeSaveRoleEffort",{roleEffortId:roleEffortId})}},afterSaveRoleEffort:function(command){var roleEffortId=command.data.id;_.isNumber(roleEffortId)&&this.isRoleEffortOfCurrentEntity(roleEffortId)&&this.fire("afterSaveRoleEffort",{roleEffortId:roleEffortId})},beforeRemoveAssignment:function(command){this.fireEventIfAssignmentFromCurrentEntity(command,"beforeRemoveAssignment")},afterAssignmentRemoved:function(command){this.fireEventIfAssignmentFromCurrentEntity(command,"afterAssignmentRemoved")},beforeSaveAssignment:function(command){_.isNumber(command.data.id)?this.fireEventIfAssignmentFromCurrentEntity(command,"beforeSaveAssignment"):this.fireEventIfAssignmentFromCurrentEntity(command,"beforeAddAssignment")},afterAssignmentSaved:function(command){var e=command.data,id=e.cmd?e.cmd.config.id:e.obj?e.obj.id:null;_.isNumber(id)?this.fireEventIfAssignmentFromCurrentEntity(command,"afterAssignmentSaved"):this.fireEventIfAssignmentFromCurrentEntity(command,"afterAssignmentAdded")},afterUserSaved:function(command){this.fire("userAvatarChanged",command.data)},fireEventIfAssignmentFromCurrentEntity:function(command,eventName){var assignmentId=command.data.id,dataChanges=command.data.changes||command.data.obj;if(this.isAssignmentOfCurrentEntity(assignmentId)||((dataChanges||{}).assignable||{}).id===this.config.context.entity.id){var data=_.extend({assignmentId:assignmentId},dataChanges);this.fire(eventName,data)}},isRoleEffortOfCurrentEntity:function(roleEffortId){return _.any(this.roleEfforts,function(roleEffort){return roleEffort.id===roleEffortId})},isAssignmentOfCurrentEntity:function(assignmentId){return _.any(this.assignments,function(assignment){return assignment.id===assignmentId})},clearData:function(){delete this.assignments,delete this.roleEfforts},destroy:function(){this.clearData(),this._super.apply(this,arguments)}});return AssignmentsListModel})
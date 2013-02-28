define(["tau/core/model-base"],function(ModelBase){var initialDataProcessor=function(model){this.model=model};initialDataProcessor.prototype={setEntity:function(result){this.entity=result.data},done:function(){if(!this.model.config)return;var e=this.model.entity=this.entity;if(!e)return;var data={id:e.id,entityType:{name:e.__type},entityState:{id:e.entityState.id,name:e.entityState.name,isFinal:e.entityState.isFinal},effortCompleted:e.effortCompleted,effortToDo:e.effortToDo,timeSpent:e.timeSpent,timeRemain:e.timeRemain},total=Math.round(100*parseFloat(data.effortToDo)+100*parseFloat(data.effortCompleted))/100;data.percentCompleted=Math.round(1e4*(data.effortCompleted/total))/100,data.percentCompleted=isNaN(data.percentCompleted)?0:data.percentCompleted,data.percentCompleted=data.percentCompleted>100?100:data.percentCompleted,e.entityState.isFinal&&(data.percentCompleted=100),data.disableSpentRemain=this.model.config.context.getTimeTrackingPolicies().disableSpentRemain;var max=this.model.config.maxWidthPercents;_.isUndefined(max)===!1?data.maxWidthPercents=max:data.maxWidthPercents=100,this.model.bus.fire("dataBind",data)}};var progressBarModel=ModelBase.extend({name:"Progress Bar",beforeSaveRoleEffort:function(evt){var config=evt.data.cmd.config;config.fields=config.fields||[],config.fields.push({assignable:["id","effortCompleted","effortToDo","timeSpent","timeRemain"]})},afterSaveEntity:function(command){var data=command.data;data.changes.hasOwnProperty("timeRemain")&&data.id===this.config.context.entity.id&&this.fire("remainTimeChanged")},afterSaveRoleEffort:function(command){var self=this;self.fire("roleEffortChanged")},onDataUpdated:function(evt){var self=this;self.fire("refresh")},onInit:function(){var self=this,proc=new initialDataProcessor(this),ctx=this.config.context,entityTypeName=ctx.entity.entityType.name,entityId=ctx.entity.id,fields=["effortCompleted","effortToDo","timeSpent","timeRemain",{entityState:["id","name","isFinal"]}],beforeSaveCallback=function(evt){var requiredUpdates=evt.data.cmd.config.fields;evt.data.cmd.config.fields=requiredUpdates.concat(fields),self.fire("beforeChanges",evt.data.changes)},afterSaveCallback=function(evt){var cmd=evt.data?evt.data.cmd:null;if(cmd!=null&&self.isInTransaction(evt))return;self.fire("applyChanges",evt.data.changes)};self.store.unbind(this),self.store.on({eventName:"beforeSave",type:entityTypeName,filter:{id:ctx.entity.id},hasChanges:["entityState"],listener:this},beforeSaveCallback),self.store.on({eventName:"afterSave",type:entityTypeName,filter:{id:ctx.entity.id},hasChanges:["entityState"],listener:this},afterSaveCallback),self.store.on({eventName:"afterSave",type:entityTypeName,filter:{id:ctx.entity.id},hasChanges:["effort|effortCompleted|effortToDo|timeSpent|timeRemain"],listener:self},_.bind(self.onDataUpdated,self)),self.store.on({eventName:"beforeSave",type:"roleEffort",listener:this},function(){self.beforeSaveRoleEffort.apply(self,arguments)}),self.store.on({eventName:"afterSave",type:"roleEffort",filter:{assignable:{id:ctx.entity.id}},listener:this},function(evt){if(self.isInTransaction(evt))return;self.afterSaveRoleEffort.apply(self,arguments)}),self.store.on({eventName:"afterSave",type:entityTypeName,listener:this},function(){self.afterSaveEntity.apply(self,arguments)}),this.store.get(entityTypeName,{id:entityId,fields:fields},{success:proc.setEntity,scope:proc}).done({success:proc.done,scope:proc})},isInTransaction:function(evt){var self=this,cmd=evt.data?evt.data.cmd:{};return cmd===self.lastCmd?!0:(self.lastCmd=cmd,!1)},"bus evict":function(){var entity=this.config.context.entity;this.store.evictProperties(entity.id,entity.entityType.name,["effortCompleted","effortToDo","timeSpent","timeRemain","entityState"])}});return progressBarModel})
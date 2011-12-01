define(["tau/core/model-base"],function(a){var b=function(a){this.model=a};b.prototype={setEntity:function(a){this.entity=a.data},done:function(){var a=this.model.entity=this.entity;if(!!a){var b={id:a.id,entityType:{id:a.entityType.id,name:a.entityType.name},entityState:{id:a.entityState.id,name:a.entityState.name,isFinal:a.entityState.isFinal},effortCompleted:a.effortCompleted,effortToDo:a.effortToDo,timeSpent:a.timeSpent,timeRemain:a.timeRemain},c=Math.round(100*parseFloat(b.effortToDo)+100*parseFloat(b.effortCompleted))/100;b.percentCompleted=Math.round(1e4*(b.effortCompleted/c))/100,b.percentCompleted=isNaN(b.percentCompleted)?0:b.percentCompleted,b.percentCompleted=b.percentCompleted>100?100:b.percentCompleted,a.entityState.isFinal&&(b.percentCompleted=100),this.model.bus.fire("dataBind",b)}}};var c=a.extend({name:"Progress Bar",init:function(){this._super.apply(this,arguments);var a=this;a.store.on({eventName:"beforeSave",type:"roleEffort",listener:this},function(){a.beforeSaveRoleEffort.apply(a,arguments)}),a.store.on({eventName:"afterSave",type:"roleEffort",listener:this},function(){a.afterSaveRoleEffort.apply(a,arguments)})},beforeSaveRoleEffort:function(a){var b=a.data.cmd.config;b.fields=b.fields||[],b.fields.push({assignable:["id","effortCompleted","effortToDo","timeSpent","timeRemain"]})},afterSaveRoleEffort:function(a){var b=this;b.store.get("roleEffort",{id:a.data.obj.id,fields:[{assignable:["id"]}]},{success:function(a){a.data.assignable.id===b.config.context.assignable.id&&b.fire("roleEffortChanged")}}).done()},onInit:function(){var a=this,c=new b(this),d=this.config.context,e=d.entity.entityType.name,f=d.entity.id,g=["effortCompleted","effortToDo","timeSpent","timeRemain",{entityType:["id","name"]},{entityState:["id","name","isFinal"]}],h=function(b){var c=b.data.changes,d=b.data.cmd.config.fields;c.entityState&&(b.data.cmd.config.fields=d.concat(g),a.fire("beforeChanges",b.data.changes))},i=function(b){b.data.changes.entityState&&a.fire("applyChanges",b.data.changes)};a.store.on({eventName:"beforeSave",type:e,listener:this},h),a.store.on({eventName:"afterSave",type:e,listener:this},i),this.store.get(e,{id:f,fields:g},{success:c.setEntity,scope:c}).done({success:c.done,scope:c})},"bus evict":function(){var a=this.config.context.general;this.store.evictProperties(a.id,a.entityType.name,["effortCompleted","effortToDo","timeSpent","timeRemain","entityState"])}});return c})
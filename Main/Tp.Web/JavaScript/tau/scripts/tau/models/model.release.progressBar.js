define(["Underscore","tau/core/model-base"],function(_,ModelBase){var IterationProgressBarModel=ModelBase.extend({name:"Iteration Progress Bar",afterSaveRoleEffort:function(command){var self=this;self.fire("roleEffortChanged")},onDataUpdate:function(evt){var self=this;self.fire("refresh")},floatToString:function(flt){return flt.toFixed(2).replace(".00","")},_getEffortPoints:function(){return this.config.context.getEffortPoint().shortName},onInit:function(){var self=this,ctx=this.config.context,entityTypeName=ctx.entity.entityType.name,entityId=ctx.entity.id,fields=["bugs-effortToDo-sum","bugs-effortCompleted-sum","userStories-effortToDo-sum","userStories-effortCompleted-sum",{features:["effortToDo","effortCompleted","userStories-count"]}];self.store.unbind(self),self.store.on({eventName:"afterSave",type:"roleEffort",listener:self,filter:{assignable:{id:entityId}}},_.bind(self.afterSaveRoleEffort,self)),self.store.on({eventName:"afterSave",type:entityTypeName,listener:self,filter:{id:entityId},hasChanges:[fields.join("|")]},_.bind(self.onDataUpdate,self)),self.store.get(entityTypeName,{id:entityId,fields:fields},{success:self.onEntityRetrieved,scope:self}).done({success:self.done,scope:self})},onEntityRetrieved:function(result){var src=result.data,filter=function(feature){return feature["userStories-count"]==0},features=result.data.features,featuresWithoutUserStories=_.filter(features,filter),toDo=_.pluck(featuresWithoutUserStories,"effortToDo"),completed=_.pluck(featuresWithoutUserStories,"effortCompleted"),sum=function(arr){return _.reduce(arr,function(memo,num){return memo+num},0)},effortToDo=src["bugs-effortToDo-sum"]+src["userStories-effortToDo-sum"]+sum(toDo),effortCompleted=src["bugs-effortCompleted-sum"]+src["userStories-effortCompleted-sum"]+sum(completed),total=Math.round(100*parseFloat(effortToDo)+100*parseFloat(effortCompleted))/100,percentCompleted=Math.round(1e4*(effortCompleted/total))/100;percentCompleted=isNaN(percentCompleted)?0:percentCompleted,percentCompleted=percentCompleted>100?100:percentCompleted,this.effortToDo=effortToDo,this.effortCompleted=effortCompleted,this.percentCompleted=percentCompleted},done:function(){this.fire("dataBind",{effortToDo:this.floatToString(this.effortToDo),effortCompleted:this.floatToString(this.effortCompleted),percentCompleted:this.percentCompleted,totalEffort:this.floatToString(this.effortToDo+this.effortCompleted),point:this._getEffortPoints()})}});return IterationProgressBarModel})
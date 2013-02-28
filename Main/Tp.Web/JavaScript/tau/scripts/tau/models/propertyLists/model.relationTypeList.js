define(["Underscore","tau/models/propertyLists/model.propertyList.base"],function(_,ModelBase){return ModelBase.extend({name:"relationType-list-model",propertyType:"relationType",onInit:function(){var self=this,success=function(r){self.assignable=r[0].data,self.store.get(self.propertyType,self.createGetRelationTypesCommand()).done({success:_.bind(self.onDataRetrieved,self)})};this.getAssignable(success)},getRequiredFields:function(){return[{relationType:["id"]}]},createGetRelationTypesCommand:function(){return{fields:["id","name"]}},processData:function(relationTypes){var currentRelationTypeId=this.assignable.relationType.id;this.fire("dataBind",{states:_.select(relationTypes,function(i){return i.id!==currentRelationTypeId}),completed:!0,nullableValue:!1})}})})
define(["Underscore","tau/models/propertyLists/model.propertyList.base"],function(_,ModelBase){return ModelBase.extend({onInit:function(){var self=this,config=this.config,entity=this.config.context.entity;this.propertyType=config.listType,self.store.get(config.listType,{fields:["id","name"]}).get(entity.entityType.name,{id:entity.id,fields:["id",config.listType]}).done({success:_.bind(self.onDataRetrieved,self)})},onDataRetrieved:function(result){var items=result[0].data,entity=result[1].data,current=this.config.data,showReset=!!(this.config.showReset&&current&&current.id),data={states:_.reject(items,function(item){return current&&item.id===current.id}),completed:!0,nullableValue:showReset};this.fire("dataBind",data)}})})
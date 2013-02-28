define(["Underscore","tau/core/extension.base.stateful"],function(_,Class){var Model=Class.extend({isCommandForEntityInContext:function(command){var e=command.data,id=e.cmd?e.cmd.config.id:e.obj?e.obj.id:null;return id===this.config.context.entity.id},isPropertyChanged:function(propertyList,data){var changes=data.changes,$set=data.cmd&&data.cmd.config.$set||{};return _.any(propertyList,function(property){return changes&&changes.hasOwnProperty(property)||$set.hasOwnProperty(property)})},attachToChangePropertiesOfCurrentEntity:function(propertyField){var propertyList=_.isArray(propertyField)?propertyField:[propertyField],entityId=this.config.context.entity.id,self=this,afterSaveHandler=function(evtArgs){var data=evtArgs.data;self.isPropertyChanged(propertyList,data)&&self.fire("propertyChanged",data)},beforeSaveHandler=function(evtArgs){var data=evtArgs.data;self.isPropertyChanged(propertyList,data)&&self.fire("beforeChangeProperty",data)};self.store.unbind(self);var typeName=this.config.context.entity.entityType.name||"general";self.store.on({type:typeName,eventName:"afterSave",filter:{id:entityId},listener:self},afterSaveHandler),self.store.on({type:typeName,eventName:"beforeSave",filter:{id:entityId},listener:self},beforeSaveHandler),self.store.on({eventName:"failure",listener:self},function(res){var data=res.data;data.cmd.config.id==entityId&&self.isPropertyChanged(propertyList,data)&&self.fire("propertyChanged",data)}),propertyField[this.propertyName]=[this.displayField,this.valueField]},"bus evictData":function(){var ctxEntity=this.config.entity||this.config.context.entity,currentEntityId=ctxEntity.id;this.store.config.proxy.evictPersistedObject(currentEntityId,"context"),this.store.config.proxy.evictPersistedObject(currentEntityId,ctxEntity.type||ctxEntity.entityType.name)}});return Model})
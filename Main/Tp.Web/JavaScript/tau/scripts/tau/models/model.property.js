define(["tau/core/model.editable.base"],function(ModelBase){return ModelBase.extend({init:function(config){this._super.apply(this,arguments);if(!config.propertyName)throw"PropertyName was not configured";this.propertyName=config.propertyName,this.displayField=config.displayField||"name",this.valueField=config.valueField||"id",this.listenedEntities={}},isPropertyChanged:function(propertyList,data){var changes=data.changes,$set=data.cmd&&data.cmd.config.$set||{},id=data.cmd&&data.cmd.config.id;return _.any(propertyList,function(property){return changes&&changes.hasOwnProperty(property)||id&&$set.hasOwnProperty(property)})},getEntityTypeName:function(){return this.config.context.entity.entityType.name},getEntityId:function(){return this.config.context.entity.id},buildRequest:function(propertyField){var chain=this.store;return chain=chain.get(this.getEntityTypeName(),{id:this.getEntityId(),fields:["id",propertyField]}),chain},getPropertyData:function(propertyField){var chain=this.buildRequest(propertyField);chain.done({success:this.onEntityRetrieved,scope:this})},getPropertyFields:function(){return[this.displayField,this.valueField]},onInit:function(){this._super.apply(this,arguments);var propertyField={};propertyField[this.propertyName]=this.getPropertyFields(),this.listenOfPropertyChanged(),this.getPropertyData(propertyField)},listenOfPropertyChanged:function(){var entityId=this.config.context.entity.id;this.listenedEntities[entityId]||(this.listenedEntities[entityId]=!0,this.attachToChangePropertiesOfCurrentEntity(this.propertyName))},onProcessProperty:function(property){if(!this.config)return;var data={id:property[this.valueField],name:this.propertyName.toLowerCase(),text:property[this.displayField],isEditable:this.config.editable};return this.config.showUrl&&property.id&&(data.hasUrl=!0,data.__type=property.__type,data.id=property.id),data.placeholderText=this.config.placeholderText,data.value=data.text,data},processProperty:function(property){var data=this.onProcessProperty(property);this.fire("dataBind",data)},onEntityRetrieved:function(r){if(!this.config)return;var property=this.property=r[0].data[this.propertyName]||{};this.processProperty(property)},entityBelongCurrentContext:function(data){return data.changes.hasOwnProperty(this.config.propertyName)&&data.cmd.config.id==this.config.context.entity.id},onEntityAfterSave:function(evtArgs){var data=evtArgs.data;this.entityBelongCurrentContext(data)&&this.fire("changed",data)},onEntityBeforeSave:function(evtArgs){var data=evtArgs.data;this.entityBelongCurrentContext(data)&&this.fire("beforeChanged",data)}})})
define(["tau/core/model.editable.base","tau/configurator"],function(a,b){return a.extend({init:function(a){this._super.apply(this,arguments);if(!a.propertyName)throw"PropertyName was not configured";this.propertyName=a.propertyName,this.displayField=a.displayField||"name",this.valueField=a.valueField||"id",this.listenedEntities={}},getEntityTypeName:function(){return this.config.context.entity.entityType.name},getEntityId:function(){return this.config.context.entity.id},buildRequest:function(a){var b=this.store;return b=b.get(this.getEntityTypeName(),{id:this.getEntityId(),fields:["id",a]}),b},getPropertyData:function(a){var b=this.buildRequest(a);b.done({success:this.onEntityRetrieved,scope:this})},getPropertyFields:function(){return[this.displayField,this.valueField]},onInit:function(){this._super.apply(this,arguments);var a={};a[this.propertyName]=this.getPropertyFields(),this.listenOfPropertyChanged(),this.getPropertyData(a)},listenOfPropertyChanged:function(){var a=this.config.context.entity.id;this.listenedEntities[a]||(this.listenedEntities[a]=!0,this.attachToChangePropertiesOfCurrentEntity(this.propertyName))},onProcessProperty:function(a){var b={id:a[this.valueField],name:this.propertyName.toLowerCase(),text:a[this.displayField]};return this.config.showUrl&&a.id&&(b.hasUrl=!0,b.__type=a.__type,b.id=a.id),b.placeholderText=this.config.placeholderText,b},processProperty:function(a){var b=this.onProcessProperty(a);this.fire("dataBind",b)},onEntityRetrieved:function(a){var b=this.property=a[0].data[this.propertyName]||{};this.processProperty(b)},entityBelongCurrentContext:function(a){return a.changes.hasOwnProperty(this.config.propertyName)&&a.cmd.config.id==this.config.context.entity.id},onEntityAfterSave:function(a){var b=a.data;this.entityBelongCurrentContext(b)&&this.fire("changed",b)},onEntityBeforeSave:function(a){var b=a.data;this.entityBelongCurrentContext(b)&&this.fire("beforeChanged",b)}})})
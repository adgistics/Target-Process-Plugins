define(["Underscore","tau/core/extension.base"],function(_,ModelBase){return ModelBase.extend({"bus beforeInit:last + entitySelected":function(evt,initConfig,selectedData){var targetField=initConfig.config.customField,entity=initConfig.config.context.entity,store=initConfig.config.context.configurator.getStore(),self=this;store.get(entity.entityType.name,{id:entity.id,fields:["customFields"]}).done(function(res){var field=_.find(res[0].data.customFields,function(v){return v.name==targetField.name}),ids=field.value!=null?field.value.split(","):[];self.fire("prevValues.ready",ids)})},"bus beforeInit:last + entitySelected + prevValues.ready":function(evt,initConfig,selectedData,previousValues){var selectedEntity=selectedData.entity,targetField=initConfig.config.customField,entity=initConfig.config.context.entity,store=initConfig.config.context.configurator.getStore(),selected=selectedEntity.id+" "+selectedEntity.entityType.name.toLowerCase();store.save(entity.entityType.name,{id:entity.id,$set:{customFields:[{name:targetField.name,value:_.uniq(previousValues.concat(selected)).join(",")}]},fields:["id","customFields"]}).done(function(res){})}})})
define(["Underscore","tau/core/extension.base"],function(_,ModelBase){return ModelBase.extend({"bus beforeInit":function(evt,initConfig){var configurator=initConfig.config.context.configurator,entity=initConfig.config.context.entity,store=configurator.getStore(),self=this;configurator.getGlobalBus().unbind(this),configurator.getGlobalBus().on("projectsAndUsers.connected",function(data){store.evictProperties(entity.id,entity.entityType.name,["projectMembers"]),self.fire("refresh")},this),store.unbind(this);var after=function(){};store.on({eventName:"afterSave",type:"project",listener:this},after)},"bus beforeInit:last + destroy":function(evt,initConfig){var configurator=initConfig.config.context.configurator;configurator.getGlobalBus().unbind(this),configurator.getStore().unbind(this)}})})
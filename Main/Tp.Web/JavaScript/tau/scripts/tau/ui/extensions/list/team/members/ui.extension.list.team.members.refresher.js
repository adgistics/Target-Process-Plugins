define(["Underscore","tau/core/extension.base"],function(_,ModelBase){return ModelBase.extend({"bus beforeInit":function(evt,initConfig){var configurator=initConfig.config.context.configurator,store=configurator.getStore(),self=this;store.unbind(this),store.on({eventName:"afterSave",type:"team",listener:this,hasChanges:["teamMembers"]},function(){self.fire("refresh")})}})})
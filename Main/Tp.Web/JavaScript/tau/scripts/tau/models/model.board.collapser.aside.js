define(["Underscore","tau/core/model-base"],function(_,BaseModel){var Model=BaseModel.extend({configFieldName:"collapser_aside_collapsed","bus afterInit":function(evt){var configurator=evt.data.config.context.configurator,settingsManager=configurator.getSettingsManager(),configFieldName=this.configFieldName,self=this;settingsManager.get({fields:[configFieldName],callback:function(result){self.fire("dataBind",{isCollapsed:!!result[configFieldName]})}})},"bus afterInit:last+collapser.switched":function(evt){var settingsManager=_.values(evt)[0].data.config.context.configurator.getSettingsManager(),configFieldName=this.configFieldName,self=this;settingsManager.get({fields:[configFieldName],callback:function(result){var set={};set[configFieldName]=!result[configFieldName],settingsManager.set({set:set,callback:function(result){}})}})}});return Model})
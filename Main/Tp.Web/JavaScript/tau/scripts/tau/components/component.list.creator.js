define(["tau/components/component.creator","tau/ui/extensions/baseList/ui.extension.baseList"],function(componentCreator,BaseListExtension){return{create:function(configCreator,componentConfig){return componentConfig.emptyDataMessage=configCreator.message,componentConfig.contentSelector=configCreator.template.options.contentSelector,configCreator.showEmptyMessage!==!1&&(configCreator.extensions=configCreator.extensions||[],configCreator.extensions.push(BaseListExtension)),componentCreator.create(configCreator,componentConfig)}}})
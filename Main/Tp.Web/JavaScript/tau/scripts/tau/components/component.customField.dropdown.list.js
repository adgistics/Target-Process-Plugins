define(["tau/components/component.creator","tau/core/model-base","tau/models/customField/model.customField.dropdown.editable","tau/ui/extensions/stateList/ui.extension.stateList.editable","tau/ui/extensions/bubble/ui.extension.bubble.listResizer","tau/ui/templates/state/ui.template.state.list.dropdown"],function(creator,Model,ModelEditable,EditableExtension,ListExtension,template){return{create:function(config){var creatorConfig={ModelType:Model,extensions:[ModelEditable,EditableExtension,ListExtension],template:template};return creator.create(creatorConfig,config)}}})
define(["Underscore","tau/components/component.creator","tau/models/model.customField","tau/models/model.customField.editable","tau/ui/extensions/customField/ui.extension.customField.required","tau/components/extensions/bubble/extension.bubble.creator.direct","tau/components/extensions/component.creator.extension","tau/components/extensions/customField/extension.customField.multiselect.editable","tau/ui/extensions/customField/ui.extension.customField.editable","tau/ui/templates/customField/ui.template.customField.multiselect"],function(_,creator,Model,ModelEditable,RequireCustomField,PopupExtension,CreatorExtension,RowExtension,EditableExtension,template){return{create:function(config){var creatorConfig={ModelType:Model,extensions:[ModelEditable,RequireCustomField,RowExtension,EditableExtension,CreatorExtension,{type:PopupExtension,config:{popupEditorContainer:[{target:"tr",alignTo:".ui-customfield__value",componentsConfig:{components:[{type:"customField.multiselect.list"}]}}]}}],template:template};return creator.create(creatorConfig,config)}}})
define(["tau/components/component.creator","tau/models/model.property.entityState","tau/models/model.property.entityState.editable","tau/components/extensions/bubble/extension.bubble.creator","tau/components/extensions/property/extension.property.refresher","tau/components/extensions/component.creator.extension","tau/ui/templates/common/ui.template.attributeValue","tau/components/extensions/entityState/extension.entityState.editable"],function(creator,ModelType,EditableModel,BubbleCreator,Refresher,ComponentCreatorExtension,template,EntityStateListEditorContainer){return{create:function(config){var creatorConfig={ModelType:ModelType,template:template,extensions:[EditableModel,BubbleCreator,Refresher,ComponentCreatorExtension,EntityStateListEditorContainer]};return creator.create(creatorConfig,config)}}})
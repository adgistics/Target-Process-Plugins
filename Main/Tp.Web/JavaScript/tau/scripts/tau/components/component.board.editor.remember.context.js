define(["Underscore","tau/components/component.creator","tau/models/board.editor.remember.context/model.board.editor.remember.context","tau/ui/extensions/board.editor.remember.context/ui.extension.board.editor.remember.context","tau/ui/templates/board.editor.remember.context/ui.template.board.editor.remember.context","tau/ui/templates/board.editor.remember.context/ui.template.board.editor.remember.context.data"],function(_,ComponentCreator,Model,Extnsion,Template){return{create:function(config){var creatorConfig={extensions:[Model,Extnsion],template:Template},componentBus=ComponentCreator.create(creatorConfig,config);return componentBus}}})
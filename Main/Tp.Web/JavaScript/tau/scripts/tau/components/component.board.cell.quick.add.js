define(["tau/components/component.creator","tau/models/board.cell.quick.add/model.board.cell.quick.add","tau/ui/extensions/board.cell.quick.add/ui.extension.board.cell.quick.add","tau/components/extensions/bubble/extension.bubble.creator","tau/components/extensions/component.creator.extension","tau/ui/extensions/container/ui.extension.container.childrenEvents","tau/components/extensions/error/extension.errorBar","tau/views/view.compositeControl","tau/ui/templates/board.add/ui.template.board.quick.add","libs/jquery/jquery.placeholder","libs/jquery/jquery.caret"],function(Creator,Model,ExtensionMain,BubbleExtension,CreatorExtension,ChildrenEventsExtension,ErrorExtension,ViewExtension,Template){return{create:function(config){var extensions=[Model,ExtensionMain,BubbleExtension,CreatorExtension,ChildrenEventsExtension,ErrorExtension],creatorConfig={ViewType:ViewExtension,name:"board.quick.add",extensions:extensions,template:Template};return config["queue.bus"]=!0,config.dependencies=["finder.entity"],Creator.create(creatorConfig,config)}}})
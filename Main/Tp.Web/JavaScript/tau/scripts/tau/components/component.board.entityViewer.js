define(["tau/components/component.creator","tau/models/board.entityViewer/model.board.entityViewer","tau/ui/extensions/board.entityViewer/ui.extension.board.entityViewer","tau/components/extensions/error/extension.errorBar"],function(ComponentCreator,ModelMain,ExtensionViewer,ExtensionError){return{create:function(config){config["queue.bus"]=!0;var creatorConfig={"queue.bus":!0,extensions:[ModelMain,ExtensionViewer,ExtensionError],template:{name:"board.entityViewer",engine:"jqote2",markup:'<div style="display:none;"></div>'}};return ComponentCreator.create(creatorConfig,config)}}})
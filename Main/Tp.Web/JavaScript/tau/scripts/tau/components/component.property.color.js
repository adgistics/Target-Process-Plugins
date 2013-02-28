define(["tau/components/component.creator","tau/models/property.simple/model.property.simple","tau/models/model.property.editable","tau/components/extensions/property/extension.property.editable","tau/components/extensions/property/extension.property.refresher","tau/components/extensions/bubble/extension.bubble.creator","tau/components/extensions/component.creator.extension","tau/ui/templates/property/ui.template.property.color"],function(creator,Model,ModelEditable,ExtensionEditable,ExtensionRefresher,ExtensionBubble,ExtensionCreator,Template){return{create:function(config){config=config||{},config.editable=!0,config.bubbleClassName="tau-bubble-color",config.editorComponentConfig={type:"state-list",listType:"static",name:"color",showClearValue:!0,allowToReset:!0,clearValueLabel:"reset",showReset:!1,values:[{id:null,name:'<i  class="tau-icon tau-i-close"></i>',asHtml:!0}].concat(_.map(config.values,function(v){return{id:v,name:v?'<i class="tau-icon tau-icon_type_color" style="background-color:'+v+';"></i>':"",asHtml:!0}})||[])};var creatorConfig={extensions:[Model,ModelEditable,ExtensionEditable,ExtensionRefresher,ExtensionBubble,ExtensionCreator].concat(config.extensions||[]),template:Template};return creator.create(creatorConfig,config)}}})
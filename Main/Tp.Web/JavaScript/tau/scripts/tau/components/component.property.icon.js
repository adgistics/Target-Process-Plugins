define(["tau/components/component.creator","tau/models/property.simple/model.property.simple","tau/models/model.property.editable","tau/components/extensions/property/extension.property.editable","tau/components/extensions/property/extension.property.refresher","tau/components/extensions/bubble/extension.bubble.creator","tau/components/extensions/component.creator.extension","tau/ui/templates/property/ui.template.property.icon"],function(e,t,n,o,a,s,i,r){return{create:function(p){p=p||{},p.editable=!0,p.bubbleClassName="tau-bubble-icon",p.applyBubbleClasses=!1,p.editorComponentConfig={type:"choice",listType:"static",name:"icon",showClearValue:!0,clearValueLabel:"reset",showReset:!1,values:[{id:null,name:'<i class="tau-icon tau-i-close"></i>',asHtml:!0}].concat(_.map(p.values,function(e){return{id:e,name:'<i class="tau-icon tau-icon_type_svg tau-icon_name_'+e+'"></i>',asHtml:!0}})||[])};var l={extensions:[t,n,o,a,s,i].concat(p.extensions||[]),template:r};return e.create(l,p)}}});
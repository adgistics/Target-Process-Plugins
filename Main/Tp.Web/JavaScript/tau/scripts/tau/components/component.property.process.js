define(["Underscore","tau/components/component.creator","tau/core/termProcessor","tau/models/model.property.process","tau/models/model.property.editable","tau/components/extensions/property/extension.property.process.refresher","tau/components/extensions/property/extension.property.editable","tau/components/extensions/property/extension.property.refresher","tau/components/extensions/bubble/extensions.bubble.creator","tau/components/extensions/component.creator.extension","tau/ui/templates/property/ui.template.property"],function(a,b,c,d,e,f,g,h,i,j,k){return{create:function(h){h.propertyName="process",h.showUrl=!1,h.alignElementSelector=".property-text",h.editorComponentConfig={type:"state-list",listType:"process",maxHeight:200,filter:!1,expandable:!1,showEmptyDataMessage:!1,showClearValue:!1,allowToReset:!1,defaultValueLabel:"current",fullModeLabel:"show old",confirmation:"It is strongly recommended to NOT change Process for Projects in progress as some data will be lost (esp. the Custom fields data). Are you sure you want to change process?"},h.extensions=[f];var l=new c(h.context.getTerms()),m=h.editorComponentConfig;m.resetDisabled=h.resetDisabled,m.showEmptyDataMessage&&(m.emptyDataMessage="No "+l.getTerms(h.propertyName).names.toLowerCase()+" found"),m.showClearValue&&(h.clearValueLabel="reset "+l.getTerms(h.propertyName).name.toLowerCase());var n={ModelType:h.Model||d,template:k,extensions:a.concat([h.extensions,i,j,e,g])};return b.create(n,h)}}})
define(["Underscore","tau/components/component.label","tau/models/model.label.relationCount","tau/ui/extensions/label/ui.extension.label.relationCount","tau/ui/extensions/label/ui.extension.label.relationCount.refresher","tau/ui/extensions/label/ui.extension.label.relationCount.observer"],function(e,n,t,o,l,i){return{create:function(a){return a=e.extend(a,{modelType:t,labelExtension:o,extensions:(a.extensions||[]).concat(l,i)}),n.create(a)}}});
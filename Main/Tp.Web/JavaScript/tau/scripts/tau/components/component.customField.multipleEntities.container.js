define(["Underscore","tau/components/component.container","tau/components/extensions/component.creator.extension","tau/components/extensions/bubble/extension.bubble.creator","tau/ui/extensions/customField/ui.extension.customField.multipleEntities.add.trigger","tau/ui/extensions/list/extension.bubble.nodata.event"],function(e,t,i,n,o,s){return{create:function(l){var a={template:{name:"customField.multipleEntities.container",markup:['<div class="tau-container tau-list tau-list__group_flat_true">','<div class="ui-quick-add i-role-add-holder">',"</div>",'<div class="i-role-list-holder">',"</div>","</div>"]},layout:"selectable",extensions:[s],children:[{type:"creator",selector:".i-role-add-holder",template:{name:"customField.multipleEntities.add.trigger",markup:['<span class="ui-link ui-quick-add-link i-role-add">Add Item</span>']},extensions:[i,n,o],customField:l.customField},{type:"customField.multipleEntities",selector:".i-role-list-holder",customField:l.customField}]};return t.create(e.extend(l,a))}}});
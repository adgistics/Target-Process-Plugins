define(["tau/configurations/baseContainable.container.config","tau/models/model.extensions"],function(a,b){var c=a.extend({getTabs:function(){var a=this._super.apply(this,arguments);a[0].items[1].children=[{type:"container",layout:"table",cssClass:"test-case-description",cellsCssClass:["steps","success"],children:[{type:"container",children:[{type:"label",text:"Steps"},{type:"steps"}]},{type:"container",children:[{type:"label",text:"Success"},{type:"success"}]}]}];return a},getActionsAliases:function(){return["-----","Old View","Old Edit","Print","-----","Delete"]},getAdditionalInfoAliases:function(){return["User Story","CreationDate","CompletionDate"]}});return c})
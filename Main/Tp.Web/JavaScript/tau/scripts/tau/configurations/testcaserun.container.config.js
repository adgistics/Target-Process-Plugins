define(["tau/configurations/base.container.config","tau/ui/templates/testStepRunList/ui.template.testStepRunList"],function(e,t){return e.extend({init:function(e){this._super(e),this.registerTab("Description",{selected:!0,label:"description",header:[{type:"label",text:"Description"}],items:[{type:"container",spinnerConfigForLazy:this.getSpinnerConfigForLazy(),children:[{type:"container",lazy:!0,name:"lazyPlaceholder container",children:[{type:"container",name:"description container",cssClass:"ui-sub-control ui-hide-empty-description",children:[{type:"description",editable:!1,placeholder:"&nbsp;"}]},{type:"testStepRunList",template:t},{type:"testcaserun.result.container"}]}]}]})},getTabsAliases:function(){return["Description"]},getActionsAliases:function(){return[]},getAdditionalInfoAliases:function(){return["Test Case","Test Plan Run","Run Result","Run Date"]}})});
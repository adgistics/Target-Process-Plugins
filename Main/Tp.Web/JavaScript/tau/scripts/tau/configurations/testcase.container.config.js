define(["tau/configurations/baseContainable.container.config","tau/models/model.extensions","tau/models/dataProviders/testcase/testcase.model.provider.testcaseruns.items"],function(BaseConfig,modelExtensions,TestCaseRunsItemsDataProvider){var Config=BaseConfig.extend({init:function(appConfig){BaseConfig.prototype.init.call(this,appConfig),this.registerTab("Test Case Runs",{label:"testcaseruns",header:[{type:"label",text:"Runs"}],items:[{type:"list",itemsDataProvider:TestCaseRunsItemsDataProvider,sortable:!1,views:[{rowTemplateName:"list-grid-entity__rowtestcaserun_testcase",type:"grid.entity",emptyMessage:"No items found"}]}],practices:["Test Cases"]})},getTabs:function(){var tabs=this._super.apply(this,arguments);return tabs[0].items[1].children=[{type:"container",layout:"table",cssClass:"test-case-description",cellsCssClass:["steps","success"],children:[{type:"container",children:[{type:"label",text:"Steps"},{type:"steps"}]},{type:"container",children:[{type:"label",text:"Success"},{type:"success"}]}]}],tabs},getTabsAliases:function(){return["Description","Test Case Runs","Track","Relations"]},getActionsAliases:function(){return["Move or Copy","-----","Old View","Old Edit","Print","-----","Delete"]},getAdditionalInfoAliases:function(){return["Project","Business Value","User Story","Owner","CreationDate","Last Status","LastFailureComment","Last Run Date"]}});return Config})
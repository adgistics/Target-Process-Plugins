define(["tau/configurations/baseAssignable.container.config","tau/models/model.extensions","tau/components/extensions/requestsList/extensions.requestList.labelRefresher","tau/components/extensions/entity/extension.requestList.remover"],function(BaseConfig,modelExtensions,RequestRefresher,RequestListRemover){var Config=BaseConfig.extend({init:function(appConfig){this._super(appConfig)},getAdditionalInfoAliases:function(){return["Project","Team","Owner","User Story For Task","CreationDate","CompletionDate"]},getActionsAliases:function(){return["Add Time","Add Impediment","Attach to Request","Convert","-----","Old View","Old Edit","Print","-----","Delete"]},getPanelsAliases:function(){return["Look Switcher","Diagnostic","Progress Bar","Requests","Impediments","Assignments","Additional Info","Custom Fields"]}});return Config})
define(["tau/configurations/baseContainable.container.config"],function(BaseConfig){var Config=BaseConfig.extend({init:function(appConfig){BaseConfig.prototype.init.call(this,appConfig);var entity=appConfig.context.entity;this.registerAdditionalInfoItem("BuildDate",{label:{type:"label",text:"Build Date"},field:{type:"property.buildDate",editable:!0}})},getTabsAliases:function(){return["Description","Track","Relations"]},getActionsAliases:function(){return["Old View","Old Edit","Print","-----","Delete"]},getAdditionalInfoAliases:function(){return["Project","Owner","BuildDate","Release","Iteration"]}});return Config})
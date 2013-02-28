define(["tau/configurations/baseContainable.container.config","tau/models/model.extensions","tau/models/dataProviders/iteration/iteration.model.provider.user_stories_bugs.items","tau/models/dataProviders/iteration/iteration.model.provider.user_stories_bugs.groups","tau/ui/extensions/list/external.refresh.extension","tau/models/dataProviders/release/release.model.provider.bugs.items","tau/models/dataProviders/release/release.model.provider.user_stories.items","tau/ui/extensions/list/request/extension.list.entityState"],function(BaseConfig,modelExtensions,UserStoriesBugsItemsDataProvider,UserStoriesBugsGroupsDataProvider,ExtRefresh,BugsItemsDataProvider,UserStoriesItemsDataProvider,EntityStateListExtension){var Config=BaseConfig.extend({init:function(appConfig){BaseConfig.prototype.init.call(this,appConfig);var entity=appConfig.context.entity,urlBuilder=appConfig.context.configurator.getUrlBuilder();this.registerAction("Add User Story",{label:"Add "+this.getTermName("userStory"),url:urlBuilder.getAddUserStoryForIterationUrl(entity.id)}),this.registerPanel("Progress Bar",{type:"iteration.progressBar"});var self=this;this.registerTab("User Stories",{label:"userStories",header:[{type:"label",text:self.getNames("userStory"),countFieldNames:["userStories"]}],items:[{type:"quick.add",printable:!1,property:"iteration",entityType:"userStory",evictProperties:["userStories","userStories-count"],label:"Add "+self.getNames("UserStory")},{type:"list.editable",externalRefreshEvents:["userStory.items.added"],itemsDataProvider:UserStoriesItemsDataProvider,views:[{type:"grid.entity"}],extensions:[EntityStateListExtension]}]}),this.registerTab("Bugs",{practices:["Bug Tracking"],label:"bugs",header:[{type:"label",text:self.getNames("bug"),countFieldNames:["bugs"]}],items:[{type:"quick.add",printable:!1,property:"iteration",entityType:"bug",practices:["Bug Tracking"],evictProperties:["bugs","bugs-count"],label:"Add "+self.getNames("Bug")},{type:"list.editable",practices:["Bug Tracking"],itemsDataProvider:BugsItemsDataProvider,views:[{type:"grid.entity"}],externalRefreshEvents:["bug.items.added"],extensions:[EntityStateListExtension]}]})},getPanelsAliases:function(){return["Look Switcher","Diagnostic","Progress Bar","Additional Info","Custom Fields"]},getActionsAliases:function(){return["Add User Story","-----","Old View","Old Edit","Print","-----","Delete"]},getTabsAliases:function(){return["Description","User Stories","Bugs","Track","Relations"]},getAdditionalInfoAliases:function(){return["Project","StartDate","FinishDate","Release","Velocity","Assigned Effort"]}});return Config})
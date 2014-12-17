define(["tau/configurations/base.container.config","tau/models/model.extensions","tau/models/dataProviders/iteration/iteration.model.provider.user_stories_bugs.items","tau/models/dataProviders/iteration/iteration.model.provider.user_stories_bugs.groups","tau/ui/extensions/list/external.refresh.extension","tau/models/dataProviders/entity/entity.model.provider.bug.items","tau/models/dataProviders/release/release.model.provider.user_stories.items","tau/ui/extensions/list/request/extension.list.entityState"],function(e,t,i,r,s,n,a,o){var l=e.extend({init:function(t){e.prototype.init.call(this,t);var i=t.context.entity,r=t.context.configurator.getUrlBuilder();this.registerAction("Finish Iteration",{label:"Finish",url:r.getRelativeBoardPageUrl("finish-teamiteration/"+i.id),className:"tau-action-finish_iteration"}),this.registerPanel("Progress Bar",{type:"teamiteration.progressBar"});var s=this;this.registerTab("User Stories",{label:"userStories",header:[{type:"label",text:s.getNames("userStory"),countFieldNames:["userStories"]}],items:[{type:"container",spinnerConfigForLazy:this.getSpinnerConfigForLazy(),children:[{type:"container",lazy:!0,name:"lazyPlaceholder container",children:[{type:"quick.add",printable:!1,property:"teamiteration",entityType:"userStory",evictProperties:["userStories","userStories-count"],label:"Add "+s.getNames("UserStory")},{type:"list.editable",externalRefreshEvents:["userStory.items.added"],itemsDataProvider:a,views:[{type:"grid.entity"}],extensions:[o]}]}]}]}),this.registerTab("Bugs",{practices:["Bug Tracking"],label:"bugs",header:[{type:"label",text:s.getNames("bug"),countFieldNames:["bugs"]}],items:[{type:"container",spinnerConfigForLazy:this.getSpinnerConfigForLazy(),practices:["Bug Tracking"],children:[{type:"container",lazy:!0,name:"lazyPlaceholder container",practices:["Bug Tracking"],children:[{type:"quick.add",printable:!1,property:"teamiteration",entityType:"bug",practices:["Bug Tracking"],evictProperties:["bugs","bugs-count"],label:"Add "+s.getNames("Bug")},{type:"list.editable",practices:["Bug Tracking"],itemsDataProvider:n,views:[{type:"grid.entity"}],externalRefreshEvents:["bug.items.added"],extensions:[o]}]}]}]}),this.registerPanel("Can Be Finished",{type:"iteration.canBeFinished"})
},getPanelsAliases:function(){return["Diagnostic","Progress Bar","Additional Info","Custom Fields","Can Be Finished"]},getActionsAliases:function(){return["Finish Iteration","Print","-----","Delete"]},getTabsAliases:function(){return["Description","User Stories","Bugs","Relations","History"]},getEntityQuickAddOptions:function(){return{items:[{entityType:"userstory",relationName:"userStories"},{entityType:"bug",relationName:"bugs",practices:["Bug Tracking"]}]}},getAdditionalInfoAliases:function(){return["Team","StartDate","FinishDate","Velocity","Assigned Effort"]}});return l});
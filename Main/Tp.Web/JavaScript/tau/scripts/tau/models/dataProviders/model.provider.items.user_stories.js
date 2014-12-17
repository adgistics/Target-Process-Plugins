define(["Underscore","tau/models/dataProviders/model.provider.items.base"],function(t,i){return i.extend({fetch:function(t){this._fetch("userStories","userStory","priority",t)},fetchForGroup:function(i,e){var r=this.config.context,n=r.entity.entityType.name,o=r.entity.id,a=this.config.store,s="userStories",c="userStory",d=this._createDetailCommand(s),f={id:o,nested:!0,fields:[d]};a=a.get(n,f);var m=this,u=function(r){var n=t(r).pluck("data")[0][s];t.map(n,function(t){t.__type=c}),n=t.filter(n,function(t){return t.entityState.name==i.key});var o=m._convertData(n);e(o)};a.done({success:u,scope:m})},_createDetailCommand:function(i){var e={};e[i]=["id","name","numericPriority","tags",{priority:["id","name","importance"]},"effort","effortCompleted","effortToDo","timeSpent","timeRemain","tasks-count","tasks-effort-sum","tasks-effortToDo-sum",{feature:["id"]},{entityState:this.fields.entityStateWithComment},{roleEfforts:["id","effort","effortToDo",{role:["id","name","hasEffort"]}]},{assignments:["id",{role:["id"]},{generalUser:this.fields.generalUser}]}];var r={project:["id"]};return this.config.multiprojects&&r.project.push("abbreviation"),e[i].push(r),this.config.additionalFields&&t.indexOf(this.config.additionalFields,"iteration")>-1&&e[i].push({iteration:["id","name"]}),e},_convertData:function(t){return t=i.prototype._convertData.call(this,t),t=this._calculateEffortToMaximum(t),this._sortByPriority(t)},_convertItem:function(i){var e=this;i.project=i.project||{};var r={id:i.id,name:i.name,__type:i.__type,numericPriority:i.numericPriority,entityState:{id:i.entityState.id,name:i.entityState.name,isInitial:i.entityState.isInitial,isFinal:i.entityState.isFinal,numericPriority:i.entityState.numericPriority},tags:this._processTags(i),priority:{id:i.priority.id,name:i.priority.name,kind:e.importanceProcessor.getKind(i.priority.importance)},effort:this._getEffortData(i),assignments:this._processAssignments(i),projectId:i.project.id,entitiesCount:i["tasks-count"],url:this.config.context.configurator.getUrlBuilder().getNewViewUrl(i.id,i.__type,!0)};
return this.config.multiprojects&&(r.project={id:i.project.id,abbreviation:i.project.abbreviation}),this.config.additionalFields&&t.indexOf(this.config.additionalFields,"iteration")>-1&&(r.iteration={id:i.iteration?i.iteration.id:null,name:i.iteration?i.iteration.name:null}),r}})});
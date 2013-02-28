define(["Underscore","tau/models/dataProviders/model.provider.items.base"],function(_,BaseProvider){return BaseProvider.extend({fetch:function(fnCallback){this._fetch("bugs","bug","severity",fnCallback)},_createDetailCommand:function(collectionType){var detailCommand={};detailCommand[collectionType]=["id","name","numericPriority","tags","effort","effortCompleted","effortToDo","timeSpent","timeRemain",{entityState:this.fields.entityStateWithComment},{roleEfforts:["id","effort","effortToDo",{role:["id","name","isPair","hasEffort"]}]},{owner:["id","firstName","lastName"]},{assignments:["id",{role:["id"]},{generalUser:this.fields.generalUser}]},{severity:["id","name","importance"]}];var projectField={project:["id"]};return this.config.multiprojects&&projectField.project.push("abbreviation"),detailCommand[collectionType].push(projectField),this.config.additionalFields&&_.indexOf(this.config.additionalFields,"iteration")>-1&&detailCommand[collectionType].push({iteration:["id","name"]}),detailCommand},_convertItem:function(data){var self=this;data.project=data.project||{};var item={id:data.id,name:data.name,numericPriority:data.numericPriority,__type:data.__type,entityState:{id:data.entityState.id,name:data.entityState.name,isInitial:data.entityState.isInitial,isFinal:data.entityState.isFinal,numericPriority:data.entityState.numericPriority},tags:this._processTags(data),effort:this._getEffortData(data),assignments:this._processAssignments(data),severity:{id:data.severity.id,name:data.severity.name,kind:self.importanceProcessor.getKind(data.severity.importance)},projectId:data.project.id,entitiesCount:0};return this.config.multiprojects&&(item.project={id:data.project.id,abbreviation:data.project.abbreviation}),this.config.additionalFields&&_.indexOf(this.config.additionalFields,"iteration")>-1&&(item.iteration={id:data.iteration?data.iteration.id:null,name:data.iteration?data.iteration.name:null}),item}})})
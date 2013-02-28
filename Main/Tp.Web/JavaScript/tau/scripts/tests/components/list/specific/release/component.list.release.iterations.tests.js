define(["Underscore","tests/components/list/specific/component.list.spec.base","tau/models/dataProviders/release/release.model.provider.iterations.items","tau/models/dataProviders/release/release.model.provider.iterations.groups","tau/ui/templates/list_/grid.entity/ui.template.list.grid.entity"],function(_,Spec,ItemsProvider,GroupsProvider){var innerRun=function(){var tests=Spec.Testcase.create("[list.release.iterations]",ItemsProvider,GroupsProvider,function(){this.componentConfig={type:"list",itemsDataProvider:this.providers.items,groupsDataProvider:this.providers.groups,groupBy:"iteration.id",views:[{type:"grid.entity",group:{dataIndex:"id"}}]};var types={us:"UserStory",bug:"Bug"},processes={kanban:"Kanban",scrum:"Scrum"},priorities={p1:"Good"},severities={s1:"Good"},projects={p1:{name:"Project1",process:"kanban"},p2:{name:"Project2"}},states={us_open:{name:"Open",nextStates:["us_inprogress","us_done"],entityType:"us",process:"kanban",isInitial:!0},us_inprogress:{name:"In Progress",nextStates:["us_done"],entityType:"us",process:"kanban"},us_done:{name:"Done",nextStates:[],entityType:"us",process:"kanban",isFinal:!0},bug_open:{name:"Open",nextStates:["bug_coded"],entityType:"bug",process:"kanban",isInitial:!0},bug_coded:{name:"Coded",nextStates:["bug_done"],isCommentRequired:!0,entityType:"bug",process:"kanban"},bug_done:{name:"Fixed",nextStates:[],isCommentRequired:!0,entityType:"bug",process:"kanban",isFinal:!0}},releases={r1:{name:"Release",userStories:["us1","us2"],bugs:["bug1","bug2"],iterations:["i1","i2"]}},iterations={i1:{name:"Iter 1",startDate:"12-Dec-2010",endDate:"15-Dec-2010"},i2:{name:"Iter 2",startDate:"18-Dec-2010",endDate:"25-Dec-2010"}},userStories={us1:{name:"US1",entityState:"us_open",priority:"p1",project:"p1",iteration:"i1"},us2:{name:"US2",entityState:"us_open",priority:"p1",project:"p1",iteration:"i2"}},bugs={bug1:{name:"Bug1",entityState:"bug_open",priority:"p1",severity:"s1",project:"p1",iteration:"i1"},bug2:{name:"Bug2",entityState:"bug_done",priority:"p1",severity:"s1",project:"p1"}};this.loadFixtures({entityType:types,projects:projects,entityStates:states,releases:releases,iterations:iterations,userStories:userStories,bugs:bugs,priority:priorities,severity:severities,processes:processes}),this.setProject(this.data.project.p1),this.setEntity(this.data.release.r1)}),test=new Spec.Test;tests.add(new Spec.Test({name:"dnd simple prioritize",test:function(){var $group=this.$el.find("[role=group]:eq(2)");$group.find("[role=title]").click();var $item=$group.find("[role=item]:eq(0)"),$next=$group.find("[role=item]:eq(1)"),itemData=tests.data.userStory.us1,futureNext=tests.data.bug.bug1;test.registerPrioritize(itemData.id,{beforeId:null,afterId:futureNext.id}),test.startMove($item),test.moveAfter($item,$next),test.endMove()}})),tests.add(new Spec.Test({name:"dnd change iteration",test:function(){var $group=this.$el.find("[role=group]:eq(2)");$group.find("[role=title]").click();var $targetGroup=this.$el.find("[role=group]:eq(1)");$targetGroup.find("[role=title]").click();var $targetItem=$targetGroup.find("[role=item]:eq(0)"),$item=$group.find("[role=item]:eq(0)"),itemData=tests.data.userStory.us1;test.registerPrioritize(itemData.id,{beforeId:null,afterId:tests.data.userStory.us2.id}),test.service.registerSaveCommand({config:{id:itemData.id,$set:{release:{id:tests.data.release.r1.id},iteration:{id:tests.data.iteration.i2.id}},fields:["id",{iteration:["id"]}]},returnedData:{id:itemData.id,iteration:tests.data.iteration.i2}}),test.service.registerGetCommand({config:{id:itemData.id,fields:["id",{iteration:["id"]}]},returnedData:{id:itemData.id,iteration:tests.data.iteration.i2}}),test.$el=this.$el,test.checkGroupsAvailability(3,0),test.startMove($item),test.checkGroupsAvailability(3,0),test.moveAfter($item,$targetItem),test.endMove(),test.checkGroupsAvailability(3,0)}})),tests.add(new Spec.Test({name:"dnd change iteration to backlog",test:function(){var $group=this.$el.find("[role=group]:eq(1)"),$targetGroup=this.$el.find("[role=group]:eq(0)");$targetGroup.find("[role=title]").click();var $item=$group.find("[role=item]:eq(0)"),itemData=tests.data.userStory.us2,futureBeforeItemData=tests.data.bug.bug2;test.registerPrioritize(itemData.id,{beforeId:null,afterId:futureBeforeItemData.id}),test.service.registerSaveCommand({config:{id:itemData.id,$set:{release:{id:tests.data.release.r1.id},iteration:null},fields:["id",{iteration:["id"]}]},returnedData:{id:itemData.id,iteration:null}}),test.service.registerGetCommand({config:{id:itemData.id,fields:["id",{iteration:["id","name","isFinal"]}]},returnedData:{id:itemData.id,iteration:null}}),test.$el=this.$el,test.checkGroupsAvailability(3,0),test.startMove($item),test.checkGroupsAvailability(3,0),test.moveAfter($item,$targetGroup),test.endMove(),test.checkGroupsAvailability(3,0)}})),tests.run()};return{run:innerRun}})
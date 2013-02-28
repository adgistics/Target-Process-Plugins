define(["Underscore","tests/components/list/specific/component.list.spec.base","tau/models/dataProviders/testplan/testplan.model.provider.testplanruns.items","tau/models/dataProviders/testplan/testplan.model.provider.testplanruns.groups","tau/ui/templates/list_/grid.entity/ui.template.list.grid.entity"],function(_,Spec,ItemsProvider,GroupsProvider){var innerRun=function(){var tests=Spec.Testcase.create("[list.testplan.testplanruns]",ItemsProvider,GroupsProvider,function(){this.componentConfig={itemsDataProvider:this.providers.items,groupsDataProvider:this.providers.groups,groupBy:"entityState.name",views:[{rowTemplateName:"list-grid-entity__rowtestplanrun",type:"grid.entity",group:{dataIndex:"name"}}]};var types={tpr:"TestPlanRun"},processes={kanban:"Kanban",scrum:"Scrum"},priorities={p1:"Good"},severities={s1:"Good"},projects={p_kanban:{name:"Project Kanban",process:"kanban"},p_scrum:{name:"Project Scrum",process:"scrum"}},releases={r1:"Release1",r2:"R2"},iterations={i1:"Iter1",i2:"Iter2"},builds={b1:"Build1",b2:"Build2"},states={kanban_tpr_new:{name:"New",entityType:"tpr",process:"kanban",nextStates:["kanban_tpr_inprogress"],isInitial:!0},kanban_tpr_inprogress:{name:"In Progress",entityType:"tpr",nextStates:["kanban_tpr_done"],process:"kanban"},kanban_tpr_done:{name:"Done",entityType:"tpr",process:"kanban",isFinal:!0},scrum_tpr_open:{name:"Open",entityType:"tpr",process:"scrum",nextStates:["scrum_tpr_planned"],isInitial:!0},scrum_tpr_planned:{name:"Planned",entityType:"tpr",nextStates:["scrum_tpr_indevelopment","scrum_tpr_closed"],process:"scrum"},scrum_tpr_indevelopment:{name:"In Development",entityType:"tpr",nextStates:["scrum_tpr_intesting"],isCommentRequired:!0,process:"scrum"},scrum_tpr_intesting:{name:"In Testing",entityType:"tpr",nextStates:["scrum_tpr_closed"],process:"scrum"},scrum_tpr_closed:{name:"Closed",entityType:"tpr",process:"scrum",isFinal:!0}},testPlans={tp1:{name:"Test Plan",testPlanRuns:["tpr1","tpr2","tpr3"],project:"p_kanban",process:"kanban"}},testPlanRuns={tpr1:{name:"TPR1",entityState:"kanban_tpr_inprogress",priority:"p1",project:"p_kanban",release:"r1",build:"b2",passedCount:42,failedCount:888,numericPriority:20},tpr2:{name:"TPR2",entityState:"scrum_tpr_planned",priority:"p1",project:"p_scrum",iteration:"i1",notRunCount:666,numericPriority:30},tpr3:{name:"TPR3",entityState:"scrum_tpr_planned",priority:"p1",project:"p_scrum",iteration:"i1",notRunCount:666,numericPriority:10}};this.loadFixtures({entityType:types,projects:projects,entityStates:states,testPlanRuns:testPlanRuns,priority:priorities,severity:severities,processes:processes,testPlans:testPlans,releases:releases,iterations:iterations,builds:builds}),this.setProject(this.data.project.p_kanban),this.setEntity(this.data.testPlan.tp1)});tests.add(new Spec.Test({name:"should render valid markup view",test:function(){var data=this.data,$el=this.$el,groupsConfig=[{title:"New, Open",items:[]},{title:"In Progress",items:["TPR1"]},{title:"Planned",items:["TPR3","TPR2"]},{title:"In Development",items:[]},{title:"In Testing",items:[]},{title:"Done, Closed",items:[]}],$groups=$el.find("[role=group]");equals($groups.length,groupsConfig.length,"Groups amount");for(var g=0;g<$groups.length;g++){var $groupTitle=$groups.eq(g);equals($groupTitle.find("[role=title]").text(),groupsConfig[g].title,"Group title"),equals($groupTitle.find("[role=counter]").text(),groupsConfig[g].items.length,"Group counter")}var $itemsGroups=$el.find("[role=list]");for(var i=0;i<$itemsGroups.length;i++){var $group=$itemsGroups.eq(i),$trs=$group.find("[role=item]");for(var j=0;j<$trs.length;j++){var $cells=$trs.eq(j).find(".tau-list__table__cell"),item=data.groups[i].items[j];equals(_.trim($cells.eq(1).text()),item.id,"ID Data column");var outputName=$cells.eq(1).find(".tau-entitylink").attr("title"),itemName=groupsConfig[i].items[j];equals(outputName,itemName,"Name Data column"),_.forEach(["release","iteration","build"],function(name){var $dataCell=$cells.filter(".tau-list__table__cell-"+name);equals($dataCell.length,1,name+" output"),equals(_.trim($dataCell.text()),item[name]?item[name].name:"",name+" output")});var $statCell=$cells.filter(".tau-list__table__cell-stat");equals($statCell.length,1,"Stat cell"),equals(_.trim($statCell.text()),(item.passedCount||0)+""+(item.failedCount||0)+""+(item.notRunCount||0),"Stat cell");var $assignmentCell=$cells.filter(".tau-list__table__cell-assignments");equals($assignmentCell.length,1,"Assignemtn output");var $assignmentGroups=$assignmentCell.find(".ui-assignment__group");equals($assignmentGroups.length,item.assignments.groups.length,"Assignments items"),_.forEach(item.assignments.groups,function(group,k){var $group=$assignmentGroups.eq(k);equals($group.find(".ui-assignment__group__title").text(),group.role.name,"Group title");var $assignmentUsers=$group.find(".ui-assignment__user");equals($assignmentUsers.length,group.users.length,"Group users length"),_.forEach(group.users,function(user,m){var $user=$assignmentUsers.eq(m),user=group.users[m];equals($user.find("img").attr("src"),"/TP/Avatar.ashx?UserId="+user.id+"&size=24","User avatar"),equals($user.find("img").prop("title"),user.name,"User name")})});var $actionsCell=$cells.filter(".tau-list__table__cell-additionalactions");equals($actionsCell.length,1,"Additional actions cell")}}}}));var test=new Spec.Test;tests.add(new Spec.Test({name:"dnd available states using process",test:function(){var $group=this.$el.find("[role=group]:eq(2)"),$targetGroup=this.$el.find("[role=group]:eq(5)");$targetGroup.find("[role=title]").click();var $item=$group.find("[role=item]:eq(1)"),itemData=tests.data.testPlanRun.tpr2,stateData=tests.data.entityState.scrum_tpr_closed;test.registerPrioritize(itemData.id,{beforeId:null,afterId:null}),test.registerChangeState(itemData,stateData),test.$el=this.$el,test.checkGroupsAvailability(6,0),test.startMove($item),test.checkGroupsAvailability(3,3);var $groups=this.$el.find("[role=group]");ok($groups.eq(3).hasClass("tau-list__group_available_true"),"In Dev available"),ok($groups.eq(5).hasClass("tau-list__group_available_true"),"Done available"),test.moveAfter($item,$targetGroup),test.endMove(),test.checkGroupsAvailability(6,0)}})),tests.add(new Spec.Test({name:"dnd change state use comment",test:function(){var commentText="fuck you",$group=this.$el.find("[role=group]:eq(2)"),$targetGroup=this.$el.find("[role=group]:eq(3)"),$item=$group.find("[role=item]:eq(1)"),itemData=tests.data.testPlanRun.tpr2,stateData=tests.data.entityState.scrum_tpr_indevelopment;test.$el=this.$el,test.checkGroupsAvailability(6,0),test.startMove($item),test.checkGroupsAvailability(3,3),test.moveAfter($item,$targetGroup),test.checkBubble($item),test.cancelBubble($item),$group=this.$el.find("[role=group]:eq(2)"),$targetGroup=this.$el.find("[role=group]:eq(3)"),$item=$group.find("[role=item]:eq(1)"),test.registerComment(itemData,commentText),test.registerPrioritize(itemData.id,{beforeId:null,afterId:null}),test.registerChangeState(itemData,stateData),test.$el=this.$el,test.checkGroupsAvailability(6,0),test.startMove($item),test.checkGroupsAvailability(3,3),test.moveAfter($item,$targetGroup),test.checkBubble($item),test.submitBubble($item,commentText),test.endMove(),test.checkGroupsAvailability(6,0)}})),tests.run()};return{run:innerRun}})
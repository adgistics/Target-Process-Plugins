define(["Underscore","tests/components/list/specific/component.list.spec.base","tau/models/dataProviders/userstory/userstory.model.provider.testcases.items","tau/ui/extensions/list/testcases/extension.list.testcases.actions","tau/configurator","tau/ui/templates/list_/grid.entity.testcase/ui.template.list.grid.entity.testcase"],function(_,Spec,ItemsProvider,ActionsExtension,configurator){var innerRun=function(){var tests=Spec.Testcase.create("[list.userstory.testcases]",ItemsProvider,null,function(){this.componentConfig={itemsDataProvider:this.providers.items,views:[{rowTemplateName:"list-grid-entity__rowtestcase",type:"grid.entity.testcase"}],extensions:[ActionsExtension]};var types={tc:"TestCase"},processes={kanban:"Kanban",scrum:"Scrum"},priorities={p1:"Good"},severities={s1:"Good"},projects={p_kanban:{name:"Project Kanban",process:"kanban"},p_scrum:{name:"Project Scrum",process:"scrum"}},releases={r1:"Release1",r2:"R2"},iterations={i1:"Iter1",i2:"Iter2"},userStories={us1:{name:"US1",testCases:["tc1","tc2","tc3"],project:"p_kanban",process:"kanban"},us2:{name:"US2",testCases:[],project:"p_kanban",process:"kanban"}},testCases={tc1:{name:"TC1",priority:"p1",project:"p_kanban",release:"r1",lastRunDate:"12/12/2012 12:12",lastStatus:!0,steps:"Kill yourself",success:"Go to hell",numericPriority:10},tc2:{name:"TC2",priority:"p1",project:"p_scrum",iteration:"i1",lastRunDate:"1/12/2012 12:12",lastStatus:!1,steps:"Smoke pot",success:"Be happy",numericPriority:30},tc3:{name:"TC3",priority:"p1",project:"p_scrum",iteration:"i1",lastRunDate:"1/1/2012 12:12",lastStatus:!1,steps:"Take drugs",success:"Sell your body",numericPriority:20}};this.loadFixtures({entityType:types,projects:projects,userStories:userStories,testCases:testCases,priority:priorities,severity:severities,processes:processes,releases:releases,iterations:iterations}),this.setProject(this.data.project.p_kanban),this.setEntity(this.data.userStory.us1)});tests.add(new Spec.Test({name:"should render valid markup view",test:function(){var data=this.data,$el=this.$el,groupsConfig=[{items:["TC1","TC3","TC2"]}],$groups=$el.find("[role=group]");equals($groups.length,groupsConfig.length,"Groups amount");var $itemsGroups=$el.find("[role=list]");for(var i=0;i<$itemsGroups.length;i++){var $group=$itemsGroups.eq(i),$trs=$group.find("[role=item]");for(var j=0;j<$trs.length;j++){var $cells=$trs.eq(j).find(".tau-list__table__cell"),item=data.items[j];equals(_.trim($cells.eq(2).text()),item.id,"ID Data column");var outputName=$cells.eq(2).find(".tau-entitylink").attr("title"),itemName=groupsConfig[i].items[j];equals(outputName,itemName,"Name Data column")}}var $row=$el.find("[role=item]:eq(0)");equals($row.find(".tau-list__table__cell-expander").length,1,"Expander columns");var $expander=$row.find("[role=item-expander]");equals($expander.length,1),equals($expander.hasClass("tau-list__itemexpander_state_closed"),!0,"Closed by default");var $addTable=$row.find(".tau-list__table-additional");$expander.click(),equals($expander.hasClass("tau-list__itemexpander_state_open"),!0,"Open by click"),equals($row.find(".tau-list__table__cell-lastrundate").text(),"12-Dec-2012 12:12"),equals($row.find(".tau-list__table__cell-laststatus").text(),"passed"),equals($row.find(".tau-list__table__cell-steps .tau-steps__content").text(),"Kill yourself"),equals($row.find(".tau-list__table__cell-success .tau-success__content").text(),"Go to hell"),equals($row.find("[role=action-pass]").length,1),equals($row.find("[role=action-fail]").length,1),$row=$el.find("[role=item]:eq(1)"),equals($row.find(".tau-list__table__cell-lastrundate").text(),"1-Jan-2012 12:12"),equals($row.find(".tau-list__table__cell-laststatus").text(),"failed")}}));var test=new Spec.Test;tests.add(new Spec.Test({name:"actions pass",test:function(){var data=tests.data,$el=this.$el,$row=$el.find("[role=item]:eq(0)"),item=data.testCase.tc1;$row.find("[role=item-expander]").click(),equals($row.find(".tau-list__table-additional.tau-list__table-additional_state_open").length,1,"Current open"),configurator.getService().registerSaveCommand({config:{id:item.id,$set:{lastStatus:!0,lastFailureComment:null},fields:["id","lastStatus","lastRunDate"]},returnedData:{id:item.id,lastRunDate:"9-Jun-2011 09:22",lastStatus:!0}}),$row.find("[role=action-pass]").click();var $nextRow=$el.find("[role=item]:eq(1)");equals($row.find("[role=item-expander].tau-list__itemexpander_state_closed").length,1,"Current collapsed"),equals($row.find(".tau-list__table-additional.tau-list__table-additional_state_closed").length,1,"Current collapsed"),equals($nextRow.find(".tau-list__table-additional.tau-list__table-additional_state_open").length,1,"Next expanded"),equals($nextRow.find("[role=item-expander].tau-list__itemexpander_state_open").length,1,"Next open"),configurator.getService().verify()}})),tests.add(new Spec.Test({name:"actions fail",test:function(){var data=tests.data,$el=this.$el,$row=$el.find("[role=item]:eq(0)"),item=data.testCase.tc1;$row.find("[role=item-expander]").click(),equals($row.find(".tau-list__table-additional.tau-list__table-additional_state_open").length,1,"Current open"),configurator.getService().registerSaveCommand({config:{id:item.id,$set:{lastStatus:!1,lastFailureComment:null},fields:["id","lastStatus","lastRunDate"]},returnedData:{id:item.id,lastRunDate:"9-Jun-2011 09:22",lastStatus:!1}}),$row.find("[role=action-fail]").click();var $nextRow=$el.find("[role=item]:eq(1)");equals($row.find("[role=item-expander].tau-list__itemexpander_state_closed").length,1,"Current collapsed"),equals($row.find(".tau-list__table-additional.tau-list__table-additional_state_closed").length,1,"Current collapsed"),equals($nextRow.find(".tau-list__table-additional.tau-list__table-additional_state_open").length,1,"Next expanded"),equals($nextRow.find("[role=item-expander].tau-list__itemexpander_state_open").length,1,"Next open"),configurator.getService().verify()}})),tests.add(new Spec.Test({name:"common actions",test:function(){var data=tests.data,$el=this.$el;equals($el.find("[role=item-expander-all]").length,1,"Expander"),equals($el.find("[role=item-collapser-all]").length,1,"Collpaser");var $exp=$el.find("[role=item-expander-all]"),$coll=$el.find("[role=item-collapser-all]"),$groups=$el.find("[role=item]");equals($groups.find(".tau-list__table-additional.tau-list__table-additional_state_closed").length,$groups.length,"All collapsed"),equals($groups.find("[role=item-expander].tau-list__itemexpander_state_closed").length,$groups.length,"All collapsed"),$exp.click(),equals($groups.find(".tau-list__table-additional.tau-list__table-additional_state_open").length,$groups.length,"All open"),equals($groups.find("[role=item-expander].tau-list__itemexpander_state_open").length,$groups.length,"All open"),$coll.click(),equals($groups.find(".tau-list__table-additional.tau-list__table-additional_state_open").length,0,"All closed"),equals($groups.find(".tau-list__table-additional.tau-list__table-additional_state_closed").length,$groups.length,"All closed"),equals($groups.find("[role=item-expander].tau-list__itemexpander_state_closed").length,$groups.length,"All closed")}})),tests.add(new Spec.Test({name:"actions pass with all expanded",test:function(){var data=tests.data;configurator.getService().registerSaveCommand({config:{id:data.testCase.tc1.id,$set:{lastStatus:!0,lastFailureComment:null},fields:["id","lastStatus","lastRunDate"]},returnedData:{id:data.testCase.tc1.id,lastRunDate:"9-Jun-2011 09:22",lastStatus:!0}}),configurator.getService().registerSaveCommand({config:{id:data.testCase.tc3.id,$set:{lastStatus:!1,lastFailureComment:null},fields:["id","lastStatus","lastRunDate"]},returnedData:{id:data.testCase.tc3.id,lastRunDate:"9-Jun-2011 09:22",lastStatus:!1}});var $el=this.$el;$el.find("[role=item-expander-all]").click();var $items=$el.find("[role=item]");$items.eq(0).find("[role=action-pass]").click(),equals($items.eq(0).find(".tau-list__table-additional.tau-list__table-additional_state_closed").length,1,"Current closed"),equals($items.find(".tau-list__table-additional.tau-list__table-additional_state_open").length,2,"Other open"),$items.eq(1).find("[role=action-fail]").click(),equals($items.eq(1).find(".tau-list__table-additional.tau-list__table-additional_state_closed").length,1,"Current closed"),equals($items.find(".tau-list__table-additional.tau-list__table-additional_state_open").length,1,"Other open")}})),tests.add(new Spec.Test({name:"on empty",context:{type:"userStory",id:tests.data.userStory.us2.id},test:function(){var $el=this.$el;equals($el.find("[role=item-expander-all]").length,0,"Not show expand"),equals($el.find("[role=item-collapser-all]").length,0,"Not show expand")}})),tests.add(new Spec.Test({name:"dnd prioritize",context:{type:"userStory",id:tests.data.userStory.us1.id},test:function(){var data=tests.data,$group=this.$el.find("[role=group]:eq(0)"),$item=$group.find("[role=item]:eq(1)"),$targetItem=$group.find("[role=item]:eq(2)"),itemData=data.testCase.tc3;test.registerPrioritize(itemData.id,{beforeId:null,afterId:data.testCase.tc2.id}),test.$el=this.$el,test.checkGroupsAvailability(1,0),test.startMove($item),test.moveAfter($item,$targetItem),test.endMove(),test.checkGroupsAvailability(1,0)}})),tests.run()};return{run:innerRun}})
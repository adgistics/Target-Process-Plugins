define(["Underscore","tests/components/list/specific/component.list.spec.base","tau/models/dataProviders/testplan/testplan.model.provider.testcases.items","tau/ui/extensions/list/testcases/extension.list.testcases.actions","tau/configurator","tau/ui/templates/list_/grid.entity.testcase/ui.template.list.grid.entity.testcase"],function(a,b,c,d,e){var f=function(){var f=b.Testcase.create("[list.testplan.testcases]",c,null,function(){this.componentConfig={itemsDataProvider:this.providers.items,views:[{rowTemplateName:"list-grid-entity__rowtestcase",type:"grid.entity.testcase"}],extensions:[d]};var a={tc:"TestCase"},b={kanban:"Kanban",scrum:"Scrum"},c={p1:"Good"},e={s1:"Good"},f={p_kanban:{name:"Project Kanban",process:"kanban"},p_scrum:{name:"Project Scrum",process:"scrum"}},g={r1:"Release1",r2:"R2"},h={i1:"Iter1",i2:"Iter2"},i={tp1:{name:"TP1",testCases:["tc1","tc2","tc3"],project:"p_kanban",process:"kanban"},tp2:{name:"TP2",testCases:[],project:"p_kanban",process:"kanban"}},j={tc1:{name:"TC1",priority:"p1",project:"p_kanban",release:"r1",lastRunDate:"12/12/2012 12:12",lastStatus:!0,steps:"Kill yourself",success:"Go to hell",numericPriority:10},tc2:{name:"TC2",priority:"p1",project:"p_scrum",iteration:"i1",lastRunDate:"1/12/2012 12:12",lastStatus:!1,steps:"Smoke pot",success:"Be happy",numericPriority:30},tc3:{name:"TC3",priority:"p1",project:"p_scrum",iteration:"i1",lastRunDate:"1/1/2012 12:12",lastStatus:!1,steps:"Take drugs",success:"Sell your body",numericPriority:20}};this.loadFixtures({entityType:a,projects:f,testPlans:i,testCases:j,priority:c,severity:e,processes:b,releases:g,iterations:h}),this.setProject(this.data.project.p_kanban),this.setEntity(this.data.testPlan.tp1)});f.add(new b.Test({name:"should render valid markup view",test:function(){var b=this.data,c=this.$el,d=[{items:["TC1","TC3","TC2"]}],e=c.find("[role=group]");equals(e.length,d.length,"Groups amount");var f=c.find("[role=list]");for(var g=0;g<f.length;g++){var h=f.eq(g),i=h.find("[role=item]");for(var j=0;j<i.length;j++){var k=i.eq(j).find(".tau-list__table__cell"),l=b.items[j];equals(a.trim(k.eq(2).text()),l.id,"ID Data column");var m=k.eq(2).find(".tau-entitylink").attr("title"),n=d[g].items[j];equals(m,n,"Name Data column")}}var o=c.find("[role=item]:eq(0)");equals(o.find(".tau-list__table__cell-expander").length,1,"Expander columns");var p=o.find("[role=item-expander]");equals(p.length,1),equals(p.hasClass("tau-list__itemexpander_state_closed"),!0,"Closed by default");var q=o.find(".tau-list__table-additional");p.click(),equals(p.hasClass("tau-list__itemexpander_state_open"),!0,"Open by click"),equals(o.find(".tau-list__table__cell-lastrundate").text(),"12-Dec-2012 12:12"),equals(o.find(".tau-list__table__cell-laststatus").text(),"passed"),equals(o.find(".tau-list__table__cell-steps .tau-steps__content").text(),"Kill yourself"),equals(o.find(".tau-list__table__cell-success .tau-success__content").text(),"Go to hell"),equals(o.find("[role=action-pass]").length,1),equals(o.find("[role=action-fail]").length,1),o=c.find("[role=item]:eq(1)"),equals(o.find(".tau-list__table__cell-lastrundate").text(),"1-Jan-2012 12:12"),equals(o.find(".tau-list__table__cell-laststatus").text(),"failed")}}));var g=new b.Test;f.add(new b.Test({name:"actions pass",test:function(){var a=f.data,b=this.$el,c=b.find("[role=item]:eq(0)"),d=a.testCase.tc1;c.find("[role=item-expander]").click(),equals(c.find(".tau-list__table-additional.tau-list__table-additional_state_open").length,1,"Current open"),e.getService().registerSaveCommand({config:{id:d.id,$set:{lastStatus:!0,lastFailureComment:null,lastRunDate:"9-Jun-2011 09:22"},fields:["id","lastStatus","lastRunDate"]},returnedData:{id:d.id,lastRunDate:"9-Jun-2011 09:22",lastStatus:!0}}),c.find("[role=action-pass]").click();var g=b.find("[role=item]:eq(1)");equals(c.find("[role=item-expander].tau-list__itemexpander_state_closed").length,1,"Current collapsed"),equals(c.find(".tau-list__table-additional.tau-list__table-additional_state_closed").length,1,"Current collapsed"),equals(g.find(".tau-list__table-additional.tau-list__table-additional_state_open").length,1,"Next expanded"),equals(g.find("[role=item-expander].tau-list__itemexpander_state_open").length,1,"Next open"),e.getService().verify()}})),f.add(new b.Test({name:"actions fail",test:function(){var a=f.data,b=this.$el,c=b.find("[role=item]:eq(0)"),d=a.testCase.tc1;c.find("[role=item-expander]").click(),equals(c.find(".tau-list__table-additional.tau-list__table-additional_state_open").length,1,"Current open"),e.getService().registerSaveCommand({config:{id:d.id,$set:{lastStatus:!1,lastFailureComment:null,lastRunDate:"9-Jun-2011 09:22"},fields:["id","lastStatus","lastRunDate"]},returnedData:{id:d.id,lastRunDate:"9-Jun-2011 09:22",lastStatus:!1}}),c.find("[role=action-fail]").click();var g=b.find("[role=item]:eq(1)");equals(c.find("[role=item-expander].tau-list__itemexpander_state_closed").length,1,"Current collapsed"),equals(c.find(".tau-list__table-additional.tau-list__table-additional_state_closed").length,1,"Current collapsed"),equals(g.find(".tau-list__table-additional.tau-list__table-additional_state_open").length,1,"Next expanded"),equals(g.find("[role=item-expander].tau-list__itemexpander_state_open").length,1,"Next open"),e.getService().verify()}})),f.add(new b.Test({name:"common actions",test:function(){var a=f.data,b=this.$el;equals(b.find("[role=action-add]").length,1,"Show add button"),equals(b.find("[role=item-expander-all]").length,1,"Expander"),equals(b.find("[role=item-collapser-all]").length,1,"Collpaser");var c=b.find("[role=item-expander-all]"),d=b.find("[role=item-collapser-all]"),e=b.find("[role=item]");equals(e.find(".tau-list__table-additional.tau-list__table-additional_state_closed").length,e.length,"All collapsed"),equals(e.find("[role=item-expander].tau-list__itemexpander_state_closed").length,e.length,"All collapsed"),c.click(),equals(e.find(".tau-list__table-additional.tau-list__table-additional_state_open").length,e.length,"All open"),equals(e.find("[role=item-expander].tau-list__itemexpander_state_open").length,e.length,"All open"),d.click(),equals(e.find(".tau-list__table-additional.tau-list__table-additional_state_open").length,0,"All closed"),equals(e.find(".tau-list__table-additional.tau-list__table-additional_state_closed").length,e.length,"All closed"),equals(e.find("[role=item-expander].tau-list__itemexpander_state_closed").length,e.length,"All closed")}})),f.add(new b.Test({name:"actions pass with all expanded",test:function(){var a=f.data;e.getService().registerSaveCommand({config:{id:a.testCase.tc1.id,$set:{lastStatus:!0,lastFailureComment:null,lastRunDate:"9-Jun-2011 09:22"},fields:["id","lastStatus","lastRunDate"]},returnedData:{id:a.testCase.tc1.id,lastRunDate:"9-Jun-2011 09:22",lastStatus:!0}}),e.getService().registerSaveCommand({config:{id:a.testCase.tc3.id,$set:{lastStatus:!1,lastFailureComment:null,lastRunDate:"9-Jun-2011 09:22"},fields:["id","lastStatus","lastRunDate"]},returnedData:{id:a.testCase.tc3.id,lastRunDate:"9-Jun-2011 09:22",lastStatus:!1}});var b=this.$el;b.find("[role=item-expander-all]").click();var c=b.find("[role=item]");c.eq(0).find("[role=action-pass]").click(),equals(c.eq(0).find(".tau-list__table-additional.tau-list__table-additional_state_closed").length,1,"Current closed"),equals(c.find(".tau-list__table-additional.tau-list__table-additional_state_open").length,2,"Other open"),c.eq(1).find("[role=action-fail]").click(),equals(c.eq(1).find(".tau-list__table-additional.tau-list__table-additional_state_closed").length,1,"Current closed"),equals(c.find(".tau-list__table-additional.tau-list__table-additional_state_open").length,1,"Other open")}})),f.add(new b.Test({name:"on empty",context:{type:"testPlan",id:f.data.testPlan.tp2.id},test:function(){var a=this.$el;equals(a.find("[role=action-add]").length,1,"Show add"),equals(a.find("[role=item-expander-all]").length,0,"Not show expand"),equals(a.find("[role=item-collapser-all]").length,0,"Not show expand")}})),f.add(new b.Test({name:"dnd prioritize",context:{type:f.data.testPlan.tp1.__type,id:f.data.testPlan.tp1.id},test:function(){var a=f.data,b=this.$el.find("[role=group]:eq(0)"),c=b.find("[role=item]:eq(1)"),d=b.find("[role=item]:eq(2)"),e=a.testCase.tc3;g.registerPrioritize(e.id,{beforeId:null,afterId:a.testCase.tc2.id}),g.$el=this.$el,g.checkGroupsAvailability(1,0),g.startMove(c),g.moveAfter(c,d),g.endMove(),g.checkGroupsAvailability(1,0)}})),f.run()};return{run:f}})
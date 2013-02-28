define(["jQuery","tests.async/testkit/testkit.component","tau/components/component.board.templates.selector","tests/common/remoteConstants"],function($,TestKit,Component,Constants){var testKit=new TestKit(Component);testKit.registerSetup("fixtures",function(test,next){test.set("fixtures",{});var storage=test.get("configurator").getRestStorage();test.set("boardTemplates.groupName","testboardztemplatez"+ +(new Date)),$.when(storage.data(test.get("boardTemplates.groupName"),undefined,{scope:"Public ",publicData:{name:"Blank",description:"bla bla custom blank",tags:["kanban"]}}),storage.data(test.get("boardTemplates.groupName"),undefined,{scope:"Public",publicData:{name:"Scrum",description:"bla bla custom 2",tags:["boobs","sex"]}}),storage.data(test.get("boardTemplates.groupName"),undefined,{scope:"Public",publicData:{name:"Dummy",description:"not a scrum",tags:["kanban","lesbian"]}}),storage.data(test.get("boardTemplates.groupName"),undefined,{scope:"Public",publicData:{name:"Kill me",description:"with pleasure",tags:["kanban","porn"]}}),storage.data(test.get("boardTemplates.groupName"),undefined,{scope:"Public",publicData:{name:"Fuck",description:"with pleasure",tags:["agile","porn"]}})).done(_.bind(function(res){next()},this))}),testKit.registerSetup("component.initialize",function(test,next){var testData=test.get("data"),componentBus=test.get("componentBus");test.get("configuratorInstance").setLoggedUser({isAdministrator:!0}),componentBus.initialize({context:{configurator:test.get("configuratorInstance")},options:{groupName:test.get("boardTemplates.groupName"),sliceTagsAt:9999}}),next()});var testcase={name:"component.board.templates.selector"};return testcase["should render valid markup"]=testKit.test(function(test){return testKit.flow(test,{"bus afterRender[0]":function(evt,renderData){var $el=renderData.element;test.equals($el.length,1,"Render el");var $items=$el.find(".i-role-item");test.equals($items.length,5,!0,"Render items"),test.done()}})}),testcase["should render and process text filter"]=testKit.test(function(test){return testKit.flow(test,{"bus afterRender[0]":function(evt,renderData){var $el=renderData.element;test.equals($el.length,1,"Render el");var $items=$el.find(".i-role-item");test.equals($items.length,5,!0,"Render items");var $filter=$el.find("[name=name]");test.equals($filter.length,1,"Render filter"),$filter.val("scru"),$filter.trigger("keyup"),test.equals($items.filter(".tau-templates-settings__item_filtered_true").length,2,"some found with kanban"),test.equals($items.filter(".tau-templates-settings__item_filtered_false").length,3,"some not found"),$filter.val(""),$filter.trigger("keyup"),test.equals($items.filter(".tau-templates-settings__item_filtered_true").length,0,"some found with kanban"),test.equals($items.filter(".tau-templates-settings__item_filtered_false").length,0,"some not found"),test.done()}})}),testcase["should render and process tag filter"]=testKit.test(function(test){return testKit.flow(test,{"bus afterRender[0]":function(evt,renderData){var $el=renderData.element;test.equals($el.length,1,"Render el");var $items=$el.find(".i-role-item");test.equals($items.length>0,!0,"Render items");var $tags=$el.find(".i-role-tag");test.equals($tags.length,9,"Render tags in order"),test.equals($tags.eq(0).text(),"All","Render tags"),test.equals($tags.eq(1).text(),"Scrum","Render default tags"),test.equals($tags.eq(2).text(),"Kanban","Render tags"),test.equals($tags.eq(3).text(),"Custom","Render tags"),test.equals($tags.eq(4).text(),"porn","Render tags"),$tags.eq(2).click(),test.equals($items.filter(".tau-templates-settings__item_filtered_true").length,3,"some found with kanban"),test.equals($items.filter(".tau-templates-settings__item_filtered_false").length,2,"some not found"),$tags.eq(0).click(),test.equals($items.filter(".tau-templates-settings__item_filtered_true").length,0,"some found with kanban"),test.equals($items.filter(".tau-templates-settings__item_filtered_false").length,0,"all found"),test.done()}})}),testcase["should allow to delete"]=testKit.test(function(test){var len;return testKit.flow(test,{"bus afterRender[0]":function(evt,renderData){var $el=renderData.element;test.equals($el.length,1,"Render el");var $items=$el.find(".i-role-item");len=$items.length,test.equals(len>1,!0,"Render items");var $item=$items.eq(0),$trigger=$item.find(".i-role-actionremove");test.equals($trigger.length,0,"cant remove first");var $item=$items.eq(1),$trigger=$item.find(".i-role-actionremove");test.equals($trigger.length,1,"Render remove"),test.equals($item.hasClass("tau-template-item_hover"),!1,"no class"),$trigger.click(),test.equals($item.hasClass("tau-template-item_hover"),!0,"class");var $w=$trigger.tauBubble("widget");test.equals($w.length,1,"Render bubble"),test.equals($w!=$trigger,!0,"Render bubble");var $buttons=$w.find("button");test.equals($buttons.length,2,"Render buttons"),test.equals($buttons.eq(0).is(".i-role-actionok"),!0,"button ok"),test.equals($buttons.eq(1).is(".i-role-actioncancel"),!0,"button cancel"),$buttons.eq(1).click(),test.equals($item.hasClass("tau-template-item_hover"),!1,"class"),$trigger.click(),$buttons.eq(0).click()},"bus afterRender[0] + item.remove.completed[0]":function(evt,renderData){var $el=renderData.element;test.equals($el.length,1,"Render el");var $items=$el.find(".i-role-item"),nlen=$items.length;test.equals(nlen,len-1,"items removed"),test.done()}})}),testcase})
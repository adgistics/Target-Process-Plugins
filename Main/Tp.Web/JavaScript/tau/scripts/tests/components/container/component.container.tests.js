define(["tau/components/component.container","tests/components/common/common.setup","tests/components/component.specs","tests/components/component1","tests/components/component2"],function(component,componentSetup,componentSpecs){var innerRun=function(){var setup=componentSetup.create("[component.container][no children]",{},component);componentSpecs.create(setup,{context:{type:"bug",id:1},settings:{cssClass:"listClass"}}).viewShouldFollowContainerComponentLifeCycle().done();var getCommonConfig=function(){return{context:{type:"bug",id:1},settings:{cssClass:"listClass",children:[{path:"tests/components/component1",x:3,y:5},{path:"tests/components/component2",z:9}]}}},viewCommonTests=[{name:'should handle "show/hide" event',test:function(){var $el=this.$el;ok($el.css("display")!=="none","Element is visible initially"),this.component.fire("hide"),ok($el.css("display")==="none","Element is hidden"),this.component.fire("show"),ok($el.css("display")!=="none","Element is visible")}},{name:'should show spinner between "beforeInit" and "afterRender" events',test:function(){var $el=this.$el;ok(!$el.hasClass("ui-spinner"),'Element has no "ui-spinner" css class initially'),this.component.fire("beforeInit"),ok($el.hasClass("ui-spinner"),'The "ui-spinner" css class is attached to element on beforeInit'),this.component.fire("afterRender",{data:{},view:{},element:$el}),ok(!$el.hasClass("ui-spinner"),'The "ui-spinner" css class is removed from element on afterRender')}}],viewListLayoutTests=viewCommonTests.concat([{name:"correct DIV markup",test:function(){var $element=this.$el;ok($element.is("div"),"Component layout"),ok($element.hasClass("listClass"),"css class config for template"),equals($element.children(".component1").length,1,"Component1 layout is added"),equals($element.children(".component2").length,1,"Component2 layout is added")}}]),setup=componentSetup.create("[component.container][with children][list layout]",{},component);componentSpecs.create(setup,getCommonConfig()).viewShouldFollowBasicComponentLifeCycle().viewShouldFollowContainerComponentLifeCycle().viewShouldPassTests(viewListLayoutTests).done();var viewTableLayoutTests=viewCommonTests.concat([{name:"correct TABLE markup",test:function(){var $tabsCollection=this.$el.find("> tbody > tr > td");ok(this.$el.is("table"),"Table layout"),ok(this.$el.hasClass("listClass"),"CSS class is valid"),ok($tabsCollection.eq(0).hasClass("general-info"),"CSS class for first cell is valid"),ok($tabsCollection.eq(0).find(".component1"),"Component 1 is added"),ok($tabsCollection.eq(1).hasClass("additional-info"),"CSS class for the second cell is valid"),ok($tabsCollection.eq(1).find(".component2"),"Component 2 is added")}}]),tableConfig={layout:"table",cellsCssClass:["general-info","additional-info"]},tableSetup=componentSetup.create("[component.container][with children][table layout]",{},component,tableConfig);componentSpecs.create(tableSetup,getCommonConfig()).viewShouldFollowContainerComponentLifeCycle().viewShouldFollowBasicComponentLifeCycle().viewShouldPassTests(viewTableLayoutTests).done()};return{run:innerRun}})
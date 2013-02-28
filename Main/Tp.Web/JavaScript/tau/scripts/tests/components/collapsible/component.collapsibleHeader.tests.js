define(["tau/components/component.collapsibleHeader","tests/components/common/common.setup","tests/components/component.specs","tests/components/component1","tests/components/component2"],function(component,componentSetup,componentSpecs){var innerRun=function(){var getCommonConfig=function(isCollapsed){return{context:{type:"bug",id:1},settings:{collapsed:isCollapsed,children:[{path:"tests/components/component1",x:3,y:5}]}}},commonTests=[{name:"should has child controls",test:function(){var $el=this.$el;ok($el.find(".ui-children-container").find(".component1").length===1,"Child controls are added")}}],viewExpandedTests=commonTests.concat([{name:"should render valid UI",test:function(){var $el=this.$el;ok($el.hasClass("expanded"),"Css class is valid")}},{name:"should collapse on click",test:function(){var $el=this.$el,collapsedEventFired=!1;this.component.on("collapsed",function(){collapsedEventFired=!0}),$el.click(),ok($el.hasClass("collapsed"),'Has "collapsed" css class'),ok(!$el.hasClass("expanded"),'The "expanded" css class is removed'),ok(collapsedEventFired,'The "collapsed" event is fired')}}]),setup=componentSetup.create("[component.collapsibleHeader][expanded]",{},component);componentSpecs.create(setup,getCommonConfig(!1)).viewShouldFollowBasicComponentLifeCycle().viewShouldFollowContainerComponentLifeCycle().viewShouldPassTests(viewExpandedTests).done();var viewCollapsedTests=commonTests.concat([{name:"should render valid UI",test:function(){var $el=this.$el;ok($el.hasClass("collapsed"),"Css class is valid")}},{name:"should expand on click",test:function(){var $el=this.$el,expandedEventFired=!1;this.component.on("expanded",function(){expandedEventFired=!0}),$el.click(),ok($el.hasClass("expanded"),'Has "expanded" css class'),ok(!$el.hasClass("collapsed"),'The "collapsed" css class is removed'),ok(expandedEventFired,'The "expanded" event is fired')}}]),setup=componentSetup.create("[component.collapsibleHeader][collapsed]",{},component);componentSpecs.create(setup,getCommonConfig(!0)).viewShouldFollowBasicComponentLifeCycle().viewShouldFollowContainerComponentLifeCycle().viewShouldPassTests(viewCollapsedTests).done()};return{run:innerRun}})
define(["tau/components/component.tabs","tau/utils/utils.routing","tests/components/common/common.setup","tests/components/component.specs","tests/components/component1","tests/components/component2"],function(component,Routing,componentSetup,componentSpecs){var innerRun=function(){var getCommonConfig=function(){return{context:{type:"bug",id:1},settings:{type:"tabs",tabs:[{header:[{path:"tests/components/component1"}],items:[{path:"tests/components/component2"}]},{selected:!0,header:[{path:"tests/components/component2"}],items:[{path:"tests/components/component1"}]}],additionalHeaders:[{type:"label",text:"Popyachsa"}]}}},viewTests=[{name:"should allow additional headers",test:function(){var $el=this.$el,$tabHeaderItems=$el.find(".tab-item");equals($tabHeaderItems.length,3,"Amount of tab items"),$tabHeaderItems=$tabHeaderItems.eq(2),equals($tabHeaderItems.text(),"Popyachsa","Additional header exists"),equals($tabHeaderItems.hasClass("tab-item"),!0,"Additional header has class"),equals($tabHeaderItems.hasClass("tab-item-right-part"),!0,"Additional header has class"),$tabHeaderItems.click(),equals($tabHeaderItems.hasClass("selected"),!1,"Additional actions is not selected after click")}}],setup=componentSetup.create("[component.tabs.additionalHeaders]",{},component);componentSpecs.create(setup,getCommonConfig()).viewShouldFollowBasicComponentLifeCycle().viewShouldPassTests(viewTests).done()};return{run:innerRun}})
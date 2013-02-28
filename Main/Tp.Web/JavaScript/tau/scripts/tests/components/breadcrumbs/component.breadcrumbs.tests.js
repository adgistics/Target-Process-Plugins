define(["tau/core/tau","tau/components/component.breadcrumbs","tau/service.container","tests/components/component.specs","tests/common/testData","tests/components/common/common.setup","tests/common/modelConfig","tests/common/applicationContext"],function(tau,component,ServiceContainer,componentSpecs,testData,commonSetup,ModelConfig,AppContext){var innerRun=function(){var configurator=new ServiceContainer,viewTests=[{name:"should render valid UI for term",test:function(){var $el=this.$el,$list=this.$el;equal($list.length,0,"Render breadcrumbs area");var $items=$list.find(".ui-breadcrumbs__item");equal($items.length,0,"No breadcrumbs items"),configurator.getHistory().push({title:"Preved",url:"#medved/preved"}),configurator.getHistory().fire("changed"),$list=this.$el,$items=$list.find(".ui-breadcrumbs__item"),equal($items.length,1,"Add breadcrumb"),equal($items.eq(0).text(),"Preved","Render breadcrumb item"),equal($items.eq(0).find("a").attr("href"),"#medved/preved","Render breadcrumb item"),$items.eq(0).click(),configurator.getHistory().stack=[],configurator.getHistory().fire("changed"),$list=this.$el,$items=$list.find(".ui-breadcrumbs__item"),equal($items.length,0,"Return to history start")}}],context=ModelConfig.createByIdAndName(15,"bug");context.configurator=configurator;var ctxCfg={manualContext:!0,context:context},testDataForTitle=testData.getTestDataForTitle();configurator.getStore().register(testDataForTitle);var setup=commonSetup.create("[component.breadcrumbs]",testDataForTitle,component,{context:{configurator:configurator}});componentSpecs.create(setup,ctxCfg).viewShouldFollowDataComponentLifeCycle().viewShouldPassTests(viewTests).done()};return{run:innerRun}})
define(["jQuery","tau/configurator","tests.async/testkit/testkit.component.board","tau/core/external.fake","tau/components/component.board.container","tau/ui/extensions/container/ui.extension.container.childrenEvents","tests/common/remoteConstants"],function($,LEGACY_CONFIGURATOR,TestKit,FakeExternalService,Component,ExtensionChildrenEvents,Constants){var testKit=new TestKit(Component,{name:"MegaBoard",viewMode:"list",zoomLevel:0,min:1,max:20,x:{types:["feature"],filter:""},y:{types:["release"],filter:""},cells:{types:["userStory"],filter:""}});testKit.registerSetup("fixtures",function(test,next){var entityTypes={us:Constants.EntityTypes.USERSTORY,release:Constants.EntityTypes.RELEASE,feature:Constants.EntityTypes.FEATURE},practices={planning:{id:Constants.Practices.PLANNING.id},requirements:{id:Constants.Practices.REQUIREMENTS.id}},processes={scrum:{name:"scrum"+ +(new Date),practices:["planning","requirements"]}},projects={p_scrum:{name:"Project Scrum"+ +(new Date),process:"scrum"}},releases={},features={};for(var r=0;r<4;r++){var releaseName="release"+r;releases[releaseName]={name:"Release_"+r+"_"+ +(new Date),entityType:"release",project:"p_scrum"};var featureName="feature"+r;features[featureName]={name:"Feature_"+r+"_"+ +(new Date),entityType:"feature",project:"p_scrum",release:releaseName}}var userStories={};_(releases).chain().keys().each(function(releaseId){_(features).chain().keys().each(function(featureId){for(var s=0;s<4;s++){var userStoryName=["us",releaseId,featureId,s].join("_");userStories[userStoryName]={name:userStoryName,entityType:"us",project:"p_scrum",release:releaseId,feature:featureId}}})});var fixtures={entityTypes:entityTypes,practices:practices,processes:processes,projects:projects,releases:releases,features:features,userStories:userStories};test.set("fixtures",fixtures),next()}),testKit.registerSetup("componentBus",function(test,next){test.set("componentBus",test.get("componentClass").create({extensions:[ExtensionChildrenEvents]})),next()}),testKit.registerSetup("component.initialize",function(test,next){var configuratorInstance=test.get("configurator"),store=configuratorInstance.getStore();configuratorInstance.setExternalService(new FakeExternalService),configuratorInstance.getClipboardManager().restStorage.sources.splice(0,1);var testData=test.get("data"),projectID=testData.project.p_scrum.id;test.get("real")===!1&&sinon.stub(store.config.proxy.service,"get",function(command){if(command.type=="context")command.callbacks.success({id:command.config.id,acid:"345"});else if(!command.config.id){var collection=_.toArray(testData[command.type]);setTimeout(function(){command.callbacks.success(collection)},0)}}),configuratorInstance.setRequireLoader(function(){}),store.get("context",{projectId:projectID,fields:["acid"]},{success:function(r){var componentBus=test.get("componentBus"),acid=r.data[0].acid,fakeWindow={document:{title:""},location:{hash:"#",href:"http://localhost/targetprocess/RestUI/board.aspx?acid="+acid+"#"}},fakeExternal=new FakeExternalService(fakeWindow);LEGACY_CONFIGURATOR.setWindow(fakeWindow),LEGACY_CONFIGURATOR.setExternalService(fakeExternal),configuratorInstance.setExternalService(fakeExternal),configuratorInstance.setBoardSettingsOptions(test.get("board.definition")),configuratorInstance.getSettingsManager().sources.splice(0,1);var componentConfig={context:{configurator:configuratorInstance,entity:{id:test.get("board.definition").id}}};componentConfig.children=[{type:"board.overview"},{type:"board.plus.list"}],componentBus.on("afterRender",function(e){componentBus.fire("view.dom.ready",{element:e.data.element})}),componentBus.initialize(componentConfig);var boardSettings=configuratorInstance.getBoardSettingsFactory().createInstance(test.get("board.definition"));componentBus.fire("boardSettings.ready",{boardSettings:boardSettings}),next()}}).done()});var testcase={name:"component.board.overview on list"};return testcase["should render valid markup"]=testKit.test(function(test){test.done()}),testcase})
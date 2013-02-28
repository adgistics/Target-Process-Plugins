define(["jQuery","tau/components/component.board.container","tau/configurator","tau/service.container","tau/utils/utils.fixturesLoader.store","tests/common/remoteConstants","libs.tests/Sinon","tau/core/bus","tau/utils/utils.process","tau/libs/boardSettings/factory.board.settings"],function($,Component,globalConfigurator,ServiceContainer,DumpLoader,Constants,sinon,Bus,process,FactoryBoardSettings){var testcase={name:"component.board.container"},real=globalConfigurator.getConfig("real",!1),configurator,uniqBoardSettingsName="testBoardSettings"+ +(new Date),groupName="boardzzz"+ +(new Date);return testcase.setUp=function(next){configurator=new ServiceContainer,configurator.setRestStorageService(function(ajaxConfig){var $scope=ajaxConfig.$scope;if($scope.$group===groupName){var zoomLevel=$scope.$value&&$scope.$value.userData?$scope.$value.userData.zoomLevel:"1",resp={group:{name:groupName,id:2},key:$scope.$key,ownerId:1,scope:"Public",publicData:{},userData:{zoomLevel:zoomLevel},id:1},deferred=$.Deferred();return deferred.resolve(resp),deferred}}),next()},testcase.tearDown=function(next){var external=configurator.getExternal();external.setHashParam(uniqBoardSettingsName,null),configurator.setRestStorageService(null),next()},testcase["render and increase zoom"]=function(test){var compBus=Component.create({}),testBus=new Bus,afterRenderIndex=-1,zoomLevelUpdated=-1,zoomLevelComponent=null,checkCases=[];testBus.checkCase=function(caseName,evt){checkCases.push({eventName:caseName,data:evt.data}),testBus.runCases()},testBus.runCases=function(){checkCases.length&&process.nextTick(function(){var testCase=checkCases.splice(0,1)[0];testBus.fire(testCase.eventName,testCase.data)})},compBus.on("afterRender",function(evt){process.nextTick(function(){testBus.fire("afterRender["+ ++afterRenderIndex+"]",evt.data)})}),compBus.on("componentCreated",function(evt){zoomLevelComponent=evt.data.component}),testBus.on("afterRender[0]",function(evt){var $el=evt.data.element,$zoomEl=$el.find(".tau-zoom-level"),sizeZoomEl=$el.find(".tau-zoom-level").size();test.equals(sizeZoomEl,2,"Zoom level component is added");for(var i=0;i<sizeZoomEl;i++)test.equals($zoomEl.eq(i).slider("value"),1,"Default zoom level value");var environment=configurator.getExternal();test.equals(environment.getHashParam(uniqBoardSettingsName).zoomLevel,null,"ZoomLevel value before change"),testBus.checkCase("increment",{data:{element:$el}})}),testBus.on("increment",function(evt){var environment=configurator.getExternal(),$el=evt.data.element;zoomLevelComponent.on("zoomLevelUpdated",function(evt){evt.removeListener(),test.equals(environment.getHashParam(uniqBoardSettingsName).zoomLevel,2,"ZoomLevel value after increment");var $zl1=$el.find(".tau-zoom-level").eq(1);test.equals($zl1.slider("value"),2,"Second zoom level component is updated to 2"),testBus.checkCase("decrement",{data:{element:$el}})});var $zl0=$el.find(".tau-zoom-level").eq(0);$zl0.slider({value:$zl0.slider("value")+1})}),testBus.on("decrement",function(evt){var environment=configurator.getExternal(),$el=evt.data.element;zoomLevelComponent.on("zoomLevelUpdated",function(evt){evt.removeListener(),test.equals(environment.getHashParam(uniqBoardSettingsName).zoomLevel,1,"ZoomLevel value after decrement");var $zl0=$el.find(".tau-zoom-level").eq(0);test.equals($zl0.slider("value"),1,"First zoom level component is updated to 1"),test.done()});var $zl1=$el.find(".tau-zoom-level").eq(1);$zl1.slider({value:$zl1.slider("value")-1})});var context={entity:{},configurator:configurator};compBus.initialize({context:context,children:[{type:"board.zoomLevel",bindData:!0},{type:"board.zoomLevel",bindData:!0}]});var defaultBoardConfig={id:uniqBoardSettingsName,zoomLevel:1,groupName:groupName},boardSettings=(new FactoryBoardSettings(configurator)).createInstance(defaultBoardConfig);compBus.fire("boardSettings.ready",{boardSettings:boardSettings})},testcase})
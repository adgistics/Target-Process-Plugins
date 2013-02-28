define(["jQuery","tau/configurator","tests.async/testkit/testkit.component.board","tau/core/external.fake","tau/components/component.board.container","tau/ui/extensions/container/ui.extension.container.childrenEvents","tests/common/remoteConstants","libs.tests/jquery.simulate"],function($,LEGACY_CONFIGURATOR,TestKit,FakeExternalService,Component,ExtensionChildrenEvents,Constants){var testKit=new TestKit(Component,{name:"MegaBoard",viewMode:"board",zoomLevel:0,min:1,max:20,x:{types:["feature"],filter:"?It is not None"},y:{types:["release"],filter:"?It is not None"},cells:{types:["userStory"],filter:""}});testKit.registerSetup("store",function(test,next){var spy=null;test.set("store.save.spy",spy),next()}),testKit.registerSetup("fixtures",function(test,next){var entityTypes={us:Constants.EntityTypes.USERSTORY,release:Constants.EntityTypes.RELEASE,feature:Constants.EntityTypes.FEATURE},practices={planning:{id:Constants.Practices.PLANNING.id},requirements:{id:Constants.Practices.REQUIREMENTS.id}},processes={scrum:{name:"scrum"+ +(new Date),practices:["planning","requirements"]}},projects={p_scrum:{name:"Project Scrum"+ +(new Date),process:"scrum"}},releases={},features={};for(var r=0;r<2;r++){var releaseName="release"+r;releases[releaseName]={name:"Release_"+r+"_"+ +(new Date),entityType:"release",project:"p_scrum"};var featureName="feature"+r;features[featureName]={name:"Feature_"+r+"_"+ +(new Date),entityType:"feature",project:"p_scrum",release:releaseName}}var userStories={};_(releases).chain().keys().each(function(releaseId){_(features).chain().keys().each(function(featureId){for(var s=0;s<2;s++){var userStoryName=["us",releaseId,featureId,s].join("_");userStories[userStoryName]={name:userStoryName,entityType:"us",project:"p_scrum",release:releaseId,feature:featureId}}})});var fixtures={entityTypes:entityTypes,practices:practices,processes:processes,projects:projects,releases:releases,features:features,userStories:userStories};test.set("fixtures",fixtures),next()}),testKit.registerSetup("componentBus",function(test,next){test.set("componentBus",test.get("componentClass").create({extensions:[ExtensionChildrenEvents]})),next()}),testKit.registerSetup("component.initialize",function(test,next){var configuratorInstance=test.get("configurator"),store=configuratorInstance.getStore(),testData=test.get("data"),projectID=testData.project.p_scrum.id;test.get("real")===!1?(sinon.stub(store.config.proxy.service,"get",function(command){if(command.type=="context")command.callbacks.success({id:command.config.id,acid:"345"});else if(!command.config.id){var collection=_.toArray(testData[command.type]);setTimeout(function(){command.callbacks.success(collection)},0)}}),test.set("removeSpy",sinon.stub(store.config.proxy.service,"remove",function(command){command.callbacks.success()}))):test.set("removeSpy",sinon.spy(store.config.proxy.service,"remove")),store.get("context",{projectId:projectID,fields:["acid"]},{success:function(r){var componentBus=test.get("componentBus"),definition=test.get("board.definition"),acid=r.data[0].acid,fakeWindow={document:{title:""},location:{hash:"#",href:"http://localhost/targetprocess/RestUI/board.aspx?acid="+acid+"#"}},fakeExternal=new FakeExternalService(fakeWindow);LEGACY_CONFIGURATOR.setWindow(fakeWindow),LEGACY_CONFIGURATOR.setExternalService(fakeExternal),configuratorInstance.setExternalService(fakeExternal),configuratorInstance.setBoardSettingsOptions(definition),configuratorInstance.getSettingsManager().sources.splice(0,1);var componentConfig={context:{configurator:configuratorInstance,definition:test.get("board.definition")}};componentConfig.children=[{type:"board.clipboard"},{type:"board.plus",name:"board_plus"}],test.set("componentConfig",componentConfig),componentBus.on("afterRender",function(e){componentBus.fire("view.dom.ready",{element:e.data.element})}),next()}}).done()});var testcase={name:"component.board.clipboard"},applySelect=function($card){$card.trigger(jQuery.Event("mousedown",{ctrlKey:!0})),$card.trigger(jQuery.Event("mouseup",{ctrlKey:!0}))};return testcase["should render valid markup and simple interaction"]=testKit.test(function(test){var componentBus=test.get("componentBus"),definition=test.get("board.definition"),configuratorInstance=test.get("configurator"),componentConfig=test.get("componentConfig");configuratorInstance.setClipboardManagerOptions({id:"clipboArd"+ +(new Date)});var clipboardManager=configuratorInstance.getClipboardManager(),real=test.get("real");real||clipboardManager.restStorage.sources.splice(0,1),componentBus.initialize(componentConfig);var boardSettings=configuratorInstance.getBoardSettingsFactory().createInstance(test.get("board.definition"));componentBus.fire("boardSettings.ready",{boardSettings:boardSettings}),testKit.flow(test,{"bus view.dom.ready[0]+board_plus.overview.board.ready[0]+board.clipboard.afterRender[0]":function(evt){var $resultEl=_.values(evt)[0].data.element,$boardEl=$resultEl.find("[role=grid]"),$el=$resultEl.find(".tau-boardclipboard");test.equals($boardEl.length,1,"Render board"),test.equals($el.length,1,"Render clipboard");var $items=$el.find(".i-role-card");test.equals($items.length,0,"Render items"),test.equals($el.hasClass("tau-boardclipboard_empty_true"),!0,"spec class when empty");var $collapser=$el.find(".i-role-collapser");test.equals($collapser.length,1,"Collapser");var $cards=$boardEl.find(".i-role-card");test.equals($cards.length>0,!0,"Has cards on board");var $selected=$cards.filter(".tau-selected");test.equals($selected.length,0,"No Selected by clipboard"),applySelect($cards.eq(0)),$items=$el.find(".i-role-card"),test.equals($items.length,1,"Item added!"),test.equals($el.hasClass("tau-boardclipboard_empty_true"),!1,"no spec class when empty"),setTimeout(function(){applySelect($cards.eq(0)),$items=$el.find(".i-role-card"),test.equals($items.length,0,"Item removed"),test.equals($el.hasClass("tau-boardclipboard_empty_true"),!0,"spec class again"),test.done()},100)}})}),testcase["should save and restore from settings"]=testKit.test(function(test){var componentBus=test.get("componentBus"),definition=test.get("board.definition"),configuratorInstance=test.get("configurator"),componentConfig=test.get("componentConfig");configuratorInstance.setSliceFactoryOptions({base64:!1});var clipboardManager=configuratorInstance.getClipboardManager(),real=test.get("real"),testData=test.get("data"),uss=_.toArray(testData.userStory),alreadySelected=[uss[1],uss[5]],toStorage=_.map(alreadySelected,function(item){return{id:item.id,data:{id:item.id,type:"userstory"}}});clipboardManager.restStorage.sources.splice(0,1),clipboardManager.set(toStorage,function(){});var s=clipboardManager._save;clipboardManager._save=function(data,cb){toStorage=_.deepClone(_.values(data)),s.call(this,data,cb)},componentBus.initialize(componentConfig);var boardSettings=configuratorInstance.getBoardSettingsFactory().createInstance(test.get("board.definition"));componentBus.fire("boardSettings.ready",{boardSettings:boardSettings}),testKit.flow(test,{"bus view.dom.ready[0]+board_plus.overview.board.ready[0]":function(evt){var $resultEl=_.values(evt)[0].data.element,$boardEl=$resultEl.find("[role=grid]"),$el=$resultEl.find(".tau-boardclipboard");test.equals($boardEl.length,1,"Render board"),test.equals($el.length,1,"Render clipboard");var $items=$el.find(".i-role-card");test.equals($items.length,2,"Render items already");var $cards=$boardEl.find(".i-role-card");test.equals($cards.length>0,!0,"Has cards on board");var $selected=$cards.filter(".tau-selected");test.equals($selected.length,2,"Selected by clipboard");var $source=$selected.eq(0),$copy=$items.eq(0);test.equals($copy.hasClass("tau-card"),!0,"output as card"),test.equals($copy.hasClass("tau-userstory"),!0,"output as card"),applySelect($cards.eq(0)),$items=$el.find(".i-role-card"),test.equals($items.length,3,"Item added!"),test.equals(toStorage.length,3,"saved to storage"),applySelect($cards.eq(0)),$items=$el.find(".i-role-card"),test.equals($items.length,2,"Item removed"),test.equals(toStorage.length,2,"saved to storage"),test.done()}})}),testcase["should process clear action"]=testKit.test(function(test){var componentBus=test.get("componentBus"),definition=test.get("board.definition"),configuratorInstance=test.get("configurator"),componentConfig=test.get("componentConfig");configuratorInstance.setSliceFactoryOptions({base64:!1});var clipboardManager=configuratorInstance.getClipboardManager(),testData=test.get("data"),uss=_.toArray(testData.userStory),alreadySelected=[uss[1],uss[5]],toStorage=_.map(alreadySelected,function(item){return{id:item.id,data:{id:item.id,type:"userstory"}}});clipboardManager.restStorage.sources.splice(0,1),clipboardManager.set(toStorage,function(){});var s=clipboardManager._save;clipboardManager._save=function(data,cb){toStorage=_.deepClone(_.values(data)),s.call(this,data,cb)},componentBus.initialize(componentConfig);var boardSettings=configuratorInstance.getBoardSettingsFactory().createInstance(test.get("board.definition"));componentBus.fire("boardSettings.ready",{boardSettings:boardSettings}),testKit.flow(test,{"bus view.dom.ready[0]+board_plus.overview.board.ready[0]":function(evt){var $resultEl=_.values(evt)[0].data.element,$boardEl=$resultEl.find("[role=grid]"),$el=$resultEl.find(".tau-boardclipboard");test.equals($boardEl.length,1,"Render board");var $cards=$boardEl.find(".i-role-card");test.equals($cards.length>0,!0,"Has cards on board");var $selected=$cards.filter(".tau-selected");test.equals($selected.length,2,"Selected by clipboard"),test.equals($el.length,1,"Render clipboard");var $items=$el.find(".i-role-card");test.equals($items.length,2,"Render items already");var $clearButton=$el.find("[role=action_clear]");test.equals($clearButton.length,1,"Button to clear"),$clearButton.click(),$items=$el.find(".i-role-card"),test.equals($items.length,0,"Remove all"),test.equals(toStorage.length,0,"Remove all");var $cards=$boardEl.find(".i-role-card"),$selected=$cards.filter(".tau-selected");test.equals($selected.length,0,"Remove selection from board"),applySelect($cards.eq(0)),applySelect($cards.eq(1)),applySelect($cards.eq(3)),$items=$el.find(".i-role-card"),test.equals($items.length,3,"Selected again"),test.equals($items.filter(".tau-boardclipboard__item_selected_true").length,0,"Selected none"),applySelect($items.eq(0)),applySelect($items.eq(2)),test.equals($items.filter(".tau-boardclipboard__item_selected_true").length,2,"Selected"),test.equals(toStorage.length,3,"In storage 3 clipboard"),$clearButton.click(),$items=$el.find(".i-role-card"),test.equals($items.length,1,"Left only one"),test.equals(toStorage.length,1,"Remove two"),test.done()}})}),testcase["should process remove action"]=testKit.test(function(test){var componentBus=test.get("componentBus"),definition=test.get("board.definition"),configuratorInstance=test.get("configurator"),componentConfig=test.get("componentConfig");configuratorInstance.setSliceFactoryOptions({base64:!1});var clipboardManager=configuratorInstance.getClipboardManager(),testData=test.get("data"),uss=_.toArray(testData.userStory),alreadySelected=[uss[1],uss[5]],toStorage=_.map(alreadySelected,function(item){return{id:item.id,data:{id:item.id,type:"userstory"}}});clipboardManager.restStorage.sources.splice(0,1),clipboardManager.set(toStorage,function(){});var s=clipboardManager._save;clipboardManager._save=function(data,cb){toStorage=_.deepClone(_.values(data)),s.call(this,data,cb)},componentBus.initialize(componentConfig);var boardSettings=configuratorInstance.getBoardSettingsFactory().createInstance(test.get("board.definition"));componentBus.fire("boardSettings.ready",{boardSettings:boardSettings}),testKit.flow(test,{"bus view.dom.ready[0]+board_plus.overview.board.ready[0]":function(evt){var $resultEl=_.values(evt)[0].data.element,$boardEl=$resultEl.find("[role=grid]"),$el=$resultEl.find(".tau-boardclipboard");test.equals($boardEl.length,1,"Render board");var $cards=$boardEl.find(".i-role-card");test.equals($cards.length>0,!0,"Has cards on board");var $selected=$cards.filter(".tau-selected");test.equals($selected.length,2,"Selected by clipboard"),test.equals($el.length,1,"Render clipboard");var $items=$el.find(".i-role-card");test.equals($items.length,2,"Render items already");var $clearButton=$el.find("[role=action_remove]");test.equals($clearButton.length,1,"Button to remove"),window.confirm=function(){return!0},$clearButton.click()},"bus view.dom.ready[0]+board.clipboard.cards.readyToRemove.after[0]":function(evt,renderData){var $resultEl=renderData.element,$boardEl=$resultEl.find("[role=grid]"),$el=$resultEl.find(".tau-boardclipboard"),removeSpy=test.get("removeSpy"),$clearButton=$el.find("[role=action_remove]");test.equals($clearButton.length,1,"Button to remove");var $items=$el.find(".i-role-card");test.equals($items.length,0,"Remove all"),test.equals(toStorage.length,0,"Remove all");var $cards=$boardEl.find(".i-role-card"),$selected=$cards.filter(".tau-selected");test.equals($selected.length,0,"Remove selection from board"),test.equals(removeSpy.callCount,2,"Two remove calls to store"),removeSpy.reset(),applySelect($cards.eq(4)),applySelect($cards.eq(5)),applySelect($cards.eq(6)),$items=$el.find(".i-role-card"),test.equals($items.length,3,"Selected again"),test.equals($items.filter(".tau-boardclipboard__item_selected_true").length,0,"Selected none"),applySelect($items.eq(0)),applySelect($items.eq(2)),test.equals($items.filter(".tau-boardclipboard__item_selected_true").length,2,"Selected"),test.equals(toStorage.length,3,"Remove all"),$clearButton.click()},"bus view.dom.ready[0]+board.clipboard.cards.readyToRemove.after[1]":function(evt,renderData){var $resultEl=renderData.element,$boardEl=$resultEl.find("[role=grid]"),$el=$resultEl.find(".tau-boardclipboard"),removeSpy=test.get("removeSpy"),$items=$el.find(".i-role-card");test.equals($items.length,1,"Left only one"),test.equals(toStorage.length,1,"Remove two"),test.equals(removeSpy.callCount,2,"Two remove calls to store"),removeSpy.reset(),test.done()}})}),testcase["should correctly process removing of non-existent entities"]=testKit.test(function(test){var componentBus=test.get("componentBus"),definition=test.get("board.definition"),configuratorInstance=test.get("configurator"),componentConfig=test.get("componentConfig");configuratorInstance.setSliceFactoryOptions({base64:!1});var clipboardManager=configuratorInstance.getClipboardManager(),testData=test.get("data"),uss=_.toArray(testData.userStory),alreadySelected=[uss[1],uss[5]],toStorage=_.map(alreadySelected,function(item){return{id:item.id,data:{id:item.id,type:"userstory"}}});clipboardManager.restStorage.sources.splice(0,1),clipboardManager.set(toStorage,function(){});var s=clipboardManager._save;clipboardManager._save=function(data,cb){toStorage=_.deepClone(_.values(data)),s.call(this,data,cb)},componentBus.initialize(componentConfig);var boardSettings=configuratorInstance.getBoardSettingsFactory().createInstance(test.get("board.definition"));componentBus.fire("boardSettings.ready",{boardSettings:boardSettings}),testKit.flow(test,{"bus view.dom.ready[0]+board_plus.overview.board.ready[0]":function(evt,domReady,overview){var $resultEl=domReady.element,$boardEl=$resultEl.find("[role=grid]"),$clipboardEl=$resultEl.find(".tau-boardclipboard");test.equals($boardEl.length,1,"Render board");var $cards=$boardEl.find(".i-role-card");test.equals($cards.length>0,!0,"Has cards on board");var $selected=$cards.filter(".tau-selected");test.equals($selected.length,2,"Selected by clipboard"),test.equals($clipboardEl.length,1,"Render clipboard");var $items=$clipboardEl.find(".i-role-card");test.equals($items.length,2,"Render items already");var $removeButton=$clipboardEl.find("[role=action_remove]");test.equals($removeButton.length,1,"Button to remove"),window.confirm=function(){return!0};var d=alreadySelected[0];test.get("configurator").getStore().remove(d.entityType.name,{id:d.id}).done(function(r){var removeSpy=test.get("removeSpy");removeSpy.reset(),$removeButton.click()})},"bus view.dom.ready[0]+board.clipboard.cards.readyToRemove.after[0]":function(evt,renderData){var removeSpy=test.get("removeSpy");test.equals(removeSpy.callCount,2,"Two remove calls to store"),removeSpy.reset(),test.get("bus").fire("board.clipboard.error[0]",!1)},"bus view.dom.ready[0] + board.clipboard.error[0]":function(evt,renderData,error){test.ok(!1===error,"there should not be any errors"),test.done()}})}),testcase["should allow dnd"]=testKit.test(function(test){var componentBus=test.get("componentBus"),definition=test.get("board.definition"),configuratorInstance=test.get("configurator"),componentConfig=test.get("componentConfig");configuratorInstance.setSliceFactoryOptions({base64:!1});var clipboardManager=configuratorInstance.getClipboardManager(),testData=test.get("data"),uss=_.toArray(testData.userStory),alreadySelected=[uss[1],uss[5]],toStorage=_.map(alreadySelected,function(item){return{id:item.id,data:{id:item.id,type:"userstory"}}});clipboardManager.restStorage.sources.splice(0,1),clipboardManager.set(toStorage,function(){});var s=clipboardManager._save;clipboardManager._save=function(data,cb){toStorage=_.deepClone(_.values(data)),s.call(this,data,cb)},componentBus.initialize(componentConfig);var boardSettings=configuratorInstance.getBoardSettingsFactory().createInstance(test.get("board.definition"));componentBus.fire("boardSettings.ready",{boardSettings:boardSettings}),testKit.flow(test,{"bus view.dom.ready[0]+board_plus.overview.board.ready[0]":function(evt){var domBodyTarget=$("<div />").css({position:"absolute",top:"-999999px",left:"-999999px"}).appendTo("body"),$resultEl=_.values(evt)[0].data.element;$resultEl.appendTo(domBodyTarget);var $boardEl=$resultEl.find("[role=grid]"),$el=$resultEl.find(".tau-boardclipboard");test.equals($boardEl.length,1,"Render board");var $cards=$boardEl.find(".i-role-card");test.equals($cards.length>0,!0,"Has cards on board");var $selected=$cards.filter(".tau-selected");test.equals($selected.length,2,"Selected by clipboard"),test.equals($el.length,1,"Render clipboard");var $items=$el.find(".i-role-card");test.equals($items.length,2,"Render items already");var $card=$items.eq(0);$card.trigger("mouseenter"),test.ok($card.data("draggable"),"card can be draggable");var $cells=$boardEl.find("[role=cell]"),$endCell=$cells.eq(2),$targetCell=$endCell,$prevCard=$targetCell.find("[role=card]").eq(0),$nextCard=$prevCard.next();test.equals($prevCard.length,1,"has target card"),test.equals($nextCard.length,1,"has target card"),test.get("configurator").getSliceService().reset(),$el.data("tauSortable").dndOptions.start({target:$card},{}),$card.insertAfter($prevCard),$el.data("tauSortable").currentGroup=$endCell,$el.data("tauSortable").dndOptions.stop({target:$card},{})},"bus board_plus.view.card.batch.move.after[0]":function(evt){var spy=test.get("configurator").getSliceService(),dndCalls=_(spy.args).chain().flatten().filter(function(x){return x.url&&x.url.indexOf("/moveAndPrioritizeBatch")>0}).value();test.equals(dndCalls.length,1,"Should perform one call only"),test.done()}})}),testcase})
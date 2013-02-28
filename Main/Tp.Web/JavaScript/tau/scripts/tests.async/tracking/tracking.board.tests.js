define(["Underscore","jQuery","tau/core/event","tau/ui/extensions/board.plus/ui.board.plus.utils","tests.async/testkit/testkit.component.board","tau/components/component.board.plus","tracking/component.tracking"],function(_,$,Event,BoardPlusUtils,TestKit,ComponentBoardPlus,spy){var testDataCfg={boardSize:2,cardsPerCell:23},testKit=new TestKit(ComponentBoardPlus,{viewMode:"board",zoomLevel:1,x:{filter:"?It is not None",types:["release"]},y:{types:["feature"],filter:"?It is not None"}},testDataCfg);testKit.registerSetup("spy.setup",function(test,next){var postValues=[],configValues=[],config={store:{my:{config:{my:!0},api:{init:function(config){configValues.push(config)},post:function(data,bus){postValues.push(data),bus.fire("tracking.data.posted",data)}}}}},componentBus=spy.create(config);test.set("spy.store.posts",postValues),test.set("spy.store.configs",configValues),test.set("spyBus",componentBus),componentBus.fire("track.application.context.ready",{_id:1}),test.set("spy",testKit.extendBusEvents(componentBus)),next()}),testKit.registerTeardown("spyBus.destroy",function(test,next){test.get("spyBus").fire("destroy"),next()}),testKit.setupsOrder=_.union(["spy.setup"],_.without(testKit.setupsOrder,"component.initialize"));var testcase={name:"grid board user tracking"};return testcase["board context/loading statistics"]=testKit.test(function(test){var bus=test.get("spy"),testFlow={bus:bus,"bus track.context.ready":function(evt){var data=evt.data;test.ok(data.user,"user is provided in context"),test.ok(data._id,"id is provided"),test.ok(data.host,"host is provided")},"bus track.statistics":function(evt){var data=evt.data;test.ok(data.loadTime>0,"time is set"),test.equals(data.cardsCount,92,"page is defined"),test.ok(data.page.size.x==2,"x page size is defined"),test.ok(data.page.size.y==2,"y page size is defined"),test.ok(data.page.total.x==1,"x pages is defined"),test.ok(data.page.total.y==1,"y pages is defined"),test.ok(data.board.x),test.ok(data.board.x.filter)},"bus tracking.data.posted[1]":function(evt){var posts=test.get("spy.store.posts"),configs=test.get("spy.store.configs");test.equals(posts.length,4,"4 values posted"),_.each(posts,function(post){var key=_.keys(post)[0],value=post[key];key!="appContext"&&test.ok(value.appContext.id,"have acid for "+key),key!="appContext"&&key!="context"&&(test.ok(value.context.id,"have cid for "+key),test.ok(value.appContext.id,"have acid for "+key))}),test.equals(configs.length,1,"init called only once"),this.bus.fire("catch.all.store.events")},"bus track.context.ready + track.statistics + catch.all.store.events":function(evt){test.done()}};Event.subscribeOn(testFlow),testKit.initializeComponent(test,function(){})}),testcase["board switch mode"]=testKit.test(function(test){var bus=test.get("spy"),testFlow={bus:bus,"bus track.context.ready + track.action":function(evt){test.done()}};Event.subscribeOn(testFlow),testKit.flow(test,{"bus overview.board.ready + boardSettings.ready:last":function(evt,board,bs){var boardSettings=bs.boardSettings;boardSettings.set({set:{viewMode:"view"}})}}),testKit.initializeComponent(test,function(){})}),testcase})
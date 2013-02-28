define(["Underscore","jQuery","tau/utils/utils.routing"],function(_,$,Routing){var innerRun=function(){module("[utils.routing.safe] tests",{setup:function(){}}),test("should register routes",function(){var visited=!1,hash="preved",routing=new Routing({safe:!0,safeParameterName:"route"});routing.reset().register({pattern:"task/{id}",callback:function(req){visited=req.id}}).register({pattern:"bug/{id}",callback:function(req){visited=req.id}}).register("project/{id}",function(req){visited=req.id}).start(),routing.execute("task/126"),equals(visited,!1,"Routing is not executed and processed"),$(window).triggerHandler($.Event("hashchange",{hash:"route=task/123"})),equals(visited,123,"Routing is executed and processed"),$(window).triggerHandler($.Event("hashchange",{hash:"index=1&route=bug/555&preved=medved"})),equals(visited,555,"Routing is executed and processed"),$(window).triggerHandler($.Event("hashchange",{hash:"#route=project/545||{}"})),equals(visited,545,"Routing is executed and processed"),routing.stop(),visited=null,$(window).triggerHandler($.Event("hashchange",{hash:"route=project/577"})),equals(visited,null,"Routing is executed and processed")}),test("should handle routes with state data",function(){var visited=!1,hash="preved",currentState={},routing=new Routing({safe:!0,safeParameterName:"route"});routing.reset().register({pattern:"task/{id}",callback:function(params,state){visited=params.id,currentState=state}}),routing.start(),$(window).triggerHandler($.Event("hashchange",{hash:'route=task/555||{"tab":3}'})),equals(visited,555,"Extract request parameters"),same(currentState,{tab:3},"Extract state parameters"),routing.stop()}),test("should produce routes with state data",function(){var visited=!1,hash="preved",currentState={},routing=new Routing({window:window,encodeBy:function(s){return s},decodeBy:function(s){return s}});routing.reset().register({pattern:"task/{id}",callback:function(params,state){}}),routing.start();var url=routing.generateUrl();equals(url,"","Generate correct url"),$(window).triggerHandler($.Event("hashchange",{hash:"route=task/555"}));var url=routing.generateUrl();equals(url,"route=task/555","Generate correct url"),$(window).triggerHandler($.Event("hashchange",{hash:'route=task/555||{"tab":3}'})),url=routing.generateUrl(),equals(url,'route=task/555||{"tab":3}',"Generate correct url"),routing.stop()})};return{run:innerRun}})
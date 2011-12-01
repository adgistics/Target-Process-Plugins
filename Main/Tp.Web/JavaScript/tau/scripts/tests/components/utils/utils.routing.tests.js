define(["Underscore","jQuery","tau/utils/utils.routing"],function(a,b,c){var d=function(){module("[utils.routing] tests",{setup:function(){}}),test("should register routes",function(){var a=!1,d="preved",e=new c({window:window});e.reset().register({pattern:"task/{id}",callback:function(b){a=b.id}}).register({pattern:"bug/{id}",callback:function(b){a=b.id+1}}).register("project/{id}",function(b){a=b.id+2}).start(),e.execute("#task/126"),equals(a,126,"Routing is executed and processed"),b(window).triggerHandler(b.Event("hashchange",{hash:"task/123"})),equals(a,123,"Routing is executed and processed"),b(window).triggerHandler(b.Event("hashchange",{hash:"bug/555"})),equals(a,556,"Routing is executed and processed"),b(window).triggerHandler(b.Event("hashchange",{hash:"project/555"})),equals(a,557,"Routing is executed and processed"),e.stop(),b(window).triggerHandler(b.Event("hashchange",{hash:"project/556"})),equals(a,557,"Routing is executed and processed")}),test("should handle routes with state data",function(){var a=!1,d="preved",e={},f=new c({window:window});f.reset().register({pattern:"task/{id}",callback:function(b,c){a=b.id,e=c}}),f.start(),b(window).triggerHandler(b.Event("hashchange",{hash:'task/555||{"tab":3}'})),equals(a,555,"Extract request parameters"),same(e,{tab:3},"Extract state parameters"),f.stop()}),test("should produce routes with state data",function(){var a=!1,d="preved",e={},f=new c({window:window});f.reset().register({pattern:"task/{id}",callback:function(a,b){}}),f.start(),b(window).triggerHandler(b.Event("hashchange",{hash:"task/555"}));var g=f.generateUrl();equals(g,"task/555","Generate correct url"),b(window).triggerHandler(b.Event("hashchange",{hash:'task/555||{"tab":3}'})),g=f.generateUrl(),equals(g,'task/555||{"tab":3}',"Generate correct url"),f.stop()}),test("should save referer",function(){var a=!1,d="preved",e={},f=new c({window:window});f.reset().register({pattern:"task/{id}",callback:function(a,b){}}),f.start(),b(window).triggerHandler(b.Event("hashchange",{hash:"task/555"})),equals(f.getReferer().url,"","Init referer is null"),b(window).triggerHandler(b.Event("hashchange",{hash:"task/666"})),equals(f.getReferer().url,"task/555","Have referer"),b(window).triggerHandler(b.Event("hashchange",{hash:'task/666||{"tab":3}'})),equals(f.getReferer().url,"task/555","Have referer"),f.stop(),f=null,f=new c({window:window}),f.reset().register({pattern:"task/{id}",callback:function(a,b){}}),f.start(),equals(f.getReferer().url,"task/555","Have referer"),b(window).triggerHandler(b.Event("hashchange",{hash:"task/888"})),b(window).triggerHandler(b.Event("unload",{})),equals(f.getReferer().url,"task/888","Handle window unload")})};return{run:d}})
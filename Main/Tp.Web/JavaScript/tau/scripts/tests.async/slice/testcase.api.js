define(["tau/slice/api","Underscore","jQuery","tests.async/testkit/testkit.store","tests.async/slice/data","tau/core/tau"],function(Slice,_,$,TestKit,fixtures,utils){var api=function(name,config){this.name=name,this.config=config||{},this.testKit=new TestKit,this.testCases=[];var self=this;this.testKit.registerSetup("fixtures",function(test,next){var fixturesInfo=fixtures(),value=self.config.fixtures?self.config.fixtures():fixturesInfo.data;test.set("metaFixtures",fixturesInfo.meta),test.set("fixtures",value),test.set("store",test.get("configurator").getStore()),next()})};return api.prototype={create:function(config){config.desc=function(description){return"["+this.name+"] "+description},config.deferred=$.Deferred(),this.testCases.push(config)},executeSliceMethod:function(test,sliceConfigOriginal,config){var sliceConfig=_.clone(sliceConfigOriginal);sliceConfig.definition=JSON.parse(JSON.stringify(sliceConfigOriginal.definition));var deferred=config.deferred;sliceConfig.base64="base64"in config?config.base64:!0;var params=config.params;!params&&config.getParams&&(params=config.getParams(test)),test.get("configurator").clearSingles(),config.hasOwnProperty("getDefinition")&&_.extend(sliceConfig.definition,config.getDefinition(test));var slice=new Slice(sliceConfig),$m=$.Deferred();if(!_.isArray(config.method))$m=slice[config.method](params);else{var promises=[];_.each(config.method,function(m){promises.push(slice[m](params))}),$m=$.when.apply(null,promises)}$m.done(function(r){var promise=null;try{arguments.length===1?promise=config.asserts(test,r,slice):promise=config.asserts(test,arguments,slice)}catch(e){test.fail("["+config.name+"] "+e)}promise?promise.done(function(){deferred.resolve()}):deferred.resolve()}).fail(function(r){test.fail(r.data.status+": "+r.data.statusText),deferred.resolve()})},get:function(){var testcase={name:"[slice] api"},self=this;return testcase[this.name]=self.testKit.test(function(test){var one=_.select(self.testCases,function(t){if(t.name[0]==="!")return!0});one.length>0&&(self.testCases=one),$.when.apply(null,_.pluck(self.testCases,"deferred")).done(function(){test.done()}),self.getSliceDefinition(test).done(function(slice){while(self.testCases.length>0){var config=self.testCases.pop();self.executeSliceMethod(test,slice,config)}})}),testcase},getDefinition:function(){var definition={x:{types:["Release"]},y:{types:["Feature"]},cells:{types:["UserStory"]}};return definition},getSliceDefinition:function(test){var deferred=$.Deferred(),data=test.get("data"),projectID=data.project.p_scrum.id,store=test.get("configurator").getStore(),definition=this.getDefinition(),service=null;if(test.get("real")===!1)throw"stubs not used";return store.get("context",{projectId:projectID,fields:["acid"]},{success:function(r){_.extend(definition,{global:{acid:r.data[0].acid}}),deferred.resolve({definition:definition,service:service,store:store})}}).done(),deferred}},api})
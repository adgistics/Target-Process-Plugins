define(["jQuery","tests.async/testkit/testkit.component","tau/components/component.board.context.filter","tau/core/external.fake","tracking/component.tracking","tau/core/event"],function($,TestKit,ComponentBoardContextFilter,ExternalFake,Spy,Event){var checkProjects=function($actualProjects,expectedProjects,test){var actualProjectNames=[];$actualProjects.each(function(){actualProjectNames.push($(this).find("span").text())});var expectedSelectedProjects=[];_.each(expectedProjects,function(project){expectedSelectedProjects.push(project.name)}),actualProjectNames.sort(),expectedSelectedProjects.sort();var difference=_.difference(expectedSelectedProjects,actualProjectNames);test.equal(difference.join(","),"","Projects names"),test.equal($actualProjects.length,expectedProjects.length,"Projects count")},testKit=new TestKit(ComponentBoardContextFilter),getAcidForSelectedProjectsAndTeams=function(config,next){var appContextService=config.configurator.getApplicationContextService();appContextService.getApplicationContext({ids:config.selectedProjectIds,teamIds:config.selectedTeamIds},{success:function(result){next(result.acid)}})},addAcidToExternalHash=function(test,next){var store=test.get("store"),data=test.get("data"),selectedProjectIds=_.pluck(test.get("selectedProjects"),"id"),selectedTeamIds=_.pluck(test.get("selectedTeams"),"id"),configurator=test.get("configurator");getAcidForSelectedProjectsAndTeams({selectedProjectIds:selectedProjectIds,selectedTeamIds:selectedTeamIds,configurator:configurator},function(acid){configurator.setExternalService(new ExternalFake({location:{href:"http://yurchenkova:8088/TargetProcess/restui/board.aspx?acid="+acid+"#",hash:"#"}})),next(!1)})},createProjects=function(test,next){var store=test.get("store");store.get("project").done(function(results){var projectsToCreate=[],createdProjects=results[0].data,countProjectToCreate=Math.max(0,10-createdProjects.length);for(var i=0;i<countProjectToCreate;i++)projectsToCreate.push({name:"Project "+_.uniqueId()+" "+ +(new Date)});countProjectToCreate>0?store.save("project",{$set:projectsToCreate}).done(function(){store.get("project").done(function(results){test.set("projects",results[0].data),next(test)})}):(test.set("projects",results[0].data),next(test))})},createTeams=function(test,next){var store=test.get("store");store.get("team").done(function(results){var teamsToCreate=[],createdTeams=results[0].data,countTeamToCreate=Math.max(0,10-createdTeams.length);for(var i=0;i<countTeamToCreate;i++)teamsToCreate.push({name:"Team "+_.uniqueId()+" "+ +(new Date)});countTeamToCreate>0?store.save("team",{$set:teamsToCreate}).done(function(){store.get("team").done(function(results){test.set("teams",results[0].data),next(test)})}):(test.set("teams",results[0].data),next(test))})},createTeamsAndProjects=function(test,next){createTeams(test,function(){createProjects(test,function(){next()})})};testKit.registerSetup("fixtures",function(test,next){if(test.get("real")==0){test.done();return}var configurator=test.get("configurator"),store=configurator.getStore();test.set("store",store),createProjects(test,function(test){createTeams(test,function(test){next()})})}),testKit.registerSetup("component.initialize",function(test,next){next()});var testCase={name:"component.board.context.filter"},updateSelectedTeamsAndProjects=function(test,$el){$el.click();var $filter=$el.tauBubble("widget"),selectedProjectAndTeamsHash={};_.each(test.get("selectedProjects"),function(project){selectedProjectAndTeamsHash[project.id]=!0}),_.each(test.get("selectedTeams"),function(team){selectedProjectAndTeamsHash[team.id]=!0}),$filter.find(".tau-checkbox input").each(function(){$(this).prop("checked",selectedProjectAndTeamsHash.hasOwnProperty($(this).val()))});var $showButton=$filter.find("[role=action-submit]");$filter.click(),$showButton.click()};return testKit.registerTeardown("spyBus.destroy",function(test,next){test.get("spyBus").fire("destroy"),next()}),testCase["application context events in configuration"]=testKit.test(function(test){var postValues=[],configValues=[],config={store:{my:{config:{my:!0},api:{init:function(config){configValues.push(config)},post:function(data,bus){postValues.push(data),bus.fire("tracking.data.posted",data)}}}}},spyBus=Spy.create(config);test.set("spyBus",spyBus),test.expect(12);var testBus=testKit.extendBusEvents(spyBus),testFlow={bus:testBus,"bus data.track":function(evt,data){test.ok(data.user._id,"user"),test.ok(data.host._id,"host")},"bus track.application.context.ready[0]":function(evt,appContext){test.equals(appContext.teams.length,0,"no teams"),test.equals(appContext.projects.length,1,"project"),test.ok(appContext._id,"contains acid")},"bus track.application.context.ready[1]":function(evt,appContext){test.equals(appContext.teams.length,0),test.ok(appContext._id,"contains acid"),test.equals(appContext.projects.length,1)},"bus track.action[0]":function(evt,action){test.equals(action.name,"show","action  done")},"bus track.action[1]":function(evt,action){test.equals(action.name.indexOf("change context to"),0,"action  done"),test.equals(action.teams.length,0),test.equals(action.projects.length,1)},"bus tracking.data.posted[5]":function(evt){test.done()}};Event.subscribeOn(testFlow),spyBus.fire("track.context.ready",{"board.context":{}}),createTeamsAndProjects(test,function(){var projects=test.get("projects"),selectedProjects=[projects[8]];test.set("selectedProjects",selectedProjects),test.set("selectedTeams",[]),addAcidToExternalHash(test,function(){var componentBus=test.get("componentBus"),configurator=test.get("configurator");componentBus.initialize({context:{configurator:configurator}});var bus=test.get("bus");bus.on("afterRender[0]",function(evt){var element=evt.data.element,projects=test.get("projects");test.set("selectedProjects",[projects[2]]);var configurator=test.get("configurator");updateSelectedTeamsAndProjects(test,element)})})})}),testCase})
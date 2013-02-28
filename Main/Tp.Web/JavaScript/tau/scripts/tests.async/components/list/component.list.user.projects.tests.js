define(["jQuery","tests.async/testkit/testkit.component","tau/components/component.list","tau/models/dataProviders/user/user.model.provider.projects.items","tests/common/remoteConstants"],function($,TestKit,Component,ProjectItemsDataProvider,Constants){var testKit=new TestKit(Component);testKit.registerSetup("fixtures",function(test,next){var entityTypes={user:{id:Constants.EntityTypes.USER.id,name:"user"}},practices={planning:{id:Constants.Practices.PLANNING.id}},processes={scrum:{name:"scream"+parseInt(Math.random()*1e11),practices:["planning"]}},projects={project1:{name:"Project 1"+parseInt(Math.random()*1e11),process:"scrum"},project2:{name:"Project 2"+parseInt(Math.random()*1e11),process:"scrum"},project3:{name:"Project 3"+parseInt(Math.random()*1e11),process:"scrum"},project4:{name:"Project 4"+parseInt(Math.random()*1e11),process:"scrum"}},users={user1:{firstName:"Ivan",lastName:"Pupkin",email:"pupkin"+ +(new Date)+"@example.com",login:"pupkin"+ +(new Date),password:123123,entityType:"user"}},roles={admin:{name:"Admin"+ +(new Date)},qa:{name:"QA"+ +(new Date)}},projectMembers={pm1:{project:"project1",user:"user1",role:"qa"},pm2:{project:"project4",user:"user1",role:"admin"}},fixtures={entityTypes:entityTypes,practices:practices,processes:processes,projects:projects,users:users,roles:roles,projectMembers:projectMembers};test.set("fixtures",fixtures),next()}),testKit.registerSetup("componentBus",function(test,next){var componentConfig={itemsDataProvider:ProjectItemsDataProvider,views:[{type:"grid.entity",emptyMessage:"No projects was assigned",rowTemplateName:"list-grid-entity__rowproject_user"}],context:{configurator:test.get("configurator"),getTimeTrackingPolicies:function(){return[]}}};test.set("componentBus",test.get("componentClass").create(componentConfig)),next()}),testKit.registerSetup("component.initialize",function(test,next){var testData=test.get("data"),componentBus=test.get("componentBus");testData.user.user1.entityType={name:"user"},componentBus.initialize({context:{entity:testData.user.user1,applicationContext:{processes:[testData.process.scrum]},getTerms:function(){return{}},configurator:test.get("configuratorInstance")}}),next()});var testcase={name:"component.list.user.projects"};return testcase["should render valid markup and allow to edit"]=testKit.test(function(test){return testKit.flow(test,{"bus afterRender[0]":function(evt,renderData){var $el=renderData.element;test.equals($el.length,1,"render list");var $items=$el.find("[role=item]");test.equals($items.length,2,"two projects"),test.done()}})}),testcase})
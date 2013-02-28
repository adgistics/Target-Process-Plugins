define(["Underscore","jQuery","tau/core/class","tau/core/tau","tau/components/component.assignmentsList","tests/common/testData","tests/common/testData.Generator","tests/common/service.mock","tau/configurator","tests/components/common/common.setup","tests/components/component.specs"],function(_,$,Class,tau,assignemntsListComponent,testData,TestDataGenerator,ServiceMock,configurator,commonSetup,componentSpecs){function removeSpaces(effort){return effort.replace(/\s/gi,"")}function processUrl(url){if($.browser.msie){var location=document.location;if($.browser.version==="7.0"){if(location.protocol=="file:"){var parts=location.pathname.split("/");return"file:///"+parts[1]+url}return url}}return url}function checkUser($el,user){user=user||{},equal($el.find(".user-avatar-container .user-avatar").attr("src"),processUrl(user.avatar),"User avatar is valid"),equal($el.find(".user-info .user-name").text(),user.name,"User name is valid")}function getRoleEffortText(roleEffort){return[roleEffort.effort,"h",roleEffort.remain,"h"].join("")}function checkGroups($el,group){var $users=$el.find(".user"),users=group.users,$addBtn=$el.find(".add-btn");group.allowAdd?ok(!$addBtn.hasClass("disabled"),group.role.name+" add btn is enabled"):ok($addBtn.hasClass("disabled"),group.role.name+" add btn is disabled"),equal($users.length,users.length,"Count of users is valid"),$users.each(function(i){checkUser($(this),users[i])})}var dataGenerator=new TestDataGenerator;dataGenerator.initDefaultData();var storyList=dataGenerator.getUserStories(),data=dataGenerator.getData(),entity=storyList[3],entityId=entity.id,context={context:{type:"story",id:entityId}},expectedData={effortPoints:"h",assignments:{groups:[{roleEffort:{effort:"20",remain:$.browser.msie?"15.56":"15.55",id:350},role:{id:1,name:"Developer",isPair:!0,__type:"role"},users:[{id:254,name:"John Brown",avatar:"/TP/Avatar.ashx?UserId=254&size=32",assignmentId:250,email:"1123123@eerer.fd",roleId:1},{id:257,name:"Sandra Red",avatar:"/TP/Avatar.ashx?UserId=257&size=32",assignmentId:252,email:"11233123@eerer.fd",roleId:1}],allowAdd:!0},{roleEffort:{effort:"15",remain:"8",id:351},role:{id:4,name:"QA Engineer",isPair:!1,__type:"role"},users:[{id:256,name:"Andrew Gray",avatar:"/TP/Avatar.ashx?UserId=256&size=32",assignmentId:251,email:"11223123@eerer.fd",roleId:4}],allowAdd:!0}]},totalEffort:{effort:"25.11",remain:"98.51"},tasksEffort:{effort:"18.21",remain:"12.21"}},generateBaseViewTest=function(name,data){var baseViewTest=function(){data=data||expectedData;var $el=this.$el,$userList=$el.find(".user-list"),$developerTitle=$userList.find('.role-title:contains("Developer")'),$qaTitle=$userList.find('.role-title:contains("QA")'),developersGroup=data.assignments.groups[0],qasGroup=data.assignments.groups[1],$groups=$userList.children(".group");$groups.each(function(i){checkGroups($(this),data.assignments.groups[i])}),ok($developerTitle.length==1,"Developer role"),ok($groups.first().hasClass("assignments-responsible"),"Developer role responsible"),ok($qaTitle.length==1,"QA Engineer role"),equal(removeSpaces($el.find(".user-list .group").eq(0).find(".role-effort").text()),removeSpaces(getRoleEffortText(developersGroup.roleEffort)),"Developers efforts (effort, remain)"),equal(removeSpaces($el.find(".user-list .group").eq(1).find(".role-effort").text()),removeSpaces(getRoleEffortText(qasGroup.roleEffort)),"QS efforts (effort, remain)"),equal(removeSpaces($el.find(".total-row .effort-cell").text()),getRoleEffortText(data.totalEffort),"Total done,effort"),equal(removeSpaces($el.find(".tasks-row .effort-cell").text()),getRoleEffortText(data.tasksEffort),"Tasks done,effort")},tests=[],test={name:name||"should render valid markup",preSetup:function(){var service=this.service=new ServiceMock;configurator.setService(service)},test:function(){var self=this;_.each(tests,function(value){value.call(self)})},addTest:function(test){return tests.push(test),this}};return test.addTest(baseViewTest),test},innerRun=function(){var viewTests=[generateBaseViewTest()],setup=commonSetup.create("[component.assignmentsList]",data,assignemntsListComponent);componentSpecs.create(setup,context).viewShouldFollowDataComponentLifeCycle().viewShouldPassTests(viewTests).done()};return{run:innerRun,generateBaseViewTest:generateBaseViewTest}})
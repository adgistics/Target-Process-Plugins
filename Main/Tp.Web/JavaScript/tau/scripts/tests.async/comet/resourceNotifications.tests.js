define(["tau/storage/api","Underscore","jQuery","tests.async/testkit/testkit.comet","tp/serverNotifications"],function(Storage,_,$,TestKit,connection){var proxy=connection.get("resource"),testKit=new TestKit;testKit.registerSetup("comet.start",function(test,next){var storage=test.get("configurator").getStore();test.set("storage",storage),connection.start(function(){console.log("setup callback"),next()})}),testKit.registerTeardown("comet.stop",function(test,next){connection.started?connection.stop(function(){console.log("tear down"),next()}):(console.log("Proxy was not started"),next())});var timeout=7e3,ensureIsReal=function(test){return test.get("real")?!0:!1},createProject=function(store,data,callback){store.save("project",{fields:["id","name"],$set:[{name:data.name?data.name:testKit.unique("project")}]}).done(callback)},createRelease=function(store,data,callback){var project=data.project;project||(project={}),createProject(store,project,function(project){store.save("release",{fields:["id","name"],$set:[{name:data.name,project:{id:project[0].data[0].id}}]}).done(callback)})},createUserStory=function(store,data,callback){data.release?createRelease(store,{name:data.release.name},function(release){store.save("userStory",{fields:["id","name","release","tasks"],$set:[{name:data.name,release:{id:release[0].data[0].id},tasks:data.tasks}]}).done(callback)}):store.save("userStory",{fields:["id","name","release","tasks"],$set:[{name:data.name,tasks:data.tasks}]}).done(callback)},testcase={name:"[comet] tests"};return testcase["subscribe, receive notification, unsubscribe"]=testKit.test(function(test){if(!ensureIsReal(test)){test.done();return}var store=test.get("storage"),hitCount=0,inProgress=!0,subscriptions=[{parameters:{type:"UserStory"},callback:function(_){inProgress=!1,hitCount++,proxy.unsubscribe(subscription,function(){createUserStory(store,{name:testKit.unique("N2 ")},function(){setTimeout(function(){test.ok(hitCount==1,"unsubscribed"),test.done()},timeout)})})}}],subscription=proxy.subscribe(subscriptions,function(){test.ok(subscription,"token is present"),createUserStory(store,{name:testKit.unique("us")},function(){setTimeout(function(){inProgress&&(test.ok(!1,"timed out"),test.done())},timeout)})})}),testcase["add user story with release and tasks"]=testKit.test(function(test){if(!ensureIsReal(test)){test.done();return}var usCounter=0,releaseCounter=0,taskCounter=0,completed=function(){return usCounter==1&&releaseCounter==1&&taskCounter==2},usData={name:testKit.unique("us"),release:{name:testKit.unique("release")},tasks:[{name:testKit.unique("task1")},{name:testKit.unique("task2")}]},inProgress=!0;proxy.subscribe([{parameters:{type:"UserStory"},callback:function(event){usCounter++,inProgress=completed(),test.ok(event.type=="Added",'us event type is "Added"'),test.ok(event.data.Name==usData.name,"user story name is set"),inProgress||test.done()}},{parameters:{type:"Task"},callback:function(event){taskCounter++,inProgress=completed(),test.ok(event.type=="Added",'task event type is "Added"'),test.ok(event.data.Name==usData.tasks[0].name||event.data.Name==usData.tasks[1].name,"task name is set"),inProgress||test.done()}},{parameters:{type:"Release"},callback:function(event){releaseCounter++,inProgress=completed(),test.ok(event.type=="Added",'release event type is "Added"'),test.ok(event.data.Name==usData.release.name,"release name is set"),inProgress||test.done()}}],function(){createUserStory(test.get("storage"),usData,function(){setTimeout(function(){inProgress&&(test.ok(!1,"timed out"),test.done())},timeout)})})}),testcase["update user story"]=testKit.test(function(test){if(!ensureIsReal(test)){test.done();return}var usData={name:testKit.unique("us"),release:{name:testKit.unique("release")},tasks:[{name:testKit.unique("task1")},{name:testKit.unique("task2")}]},changedName=testKit.unique("us"),store=test.get("storage"),inProgress=!0;proxy.subscribe([{parameters:{type:"UserStory"},callback:function(event){event.type=="Updated"&&(inProgress=!1,test.ok(!0,'event type is "Updated"'),test.equals(event.data.Name,changedName,"user story updated"),test.done())}}],function(){createUserStory(store,usData,function(userStory){store.save("userStory",{fields:["id","name"],$set:[{id:userStory[0].data[0].id,name:changedName}]}).done(function(){setTimeout(function(){inProgress&&(test.ok(!1,"timed out"),test.done())},timeout)})})})}),testcase["remove user story"]=testKit.test(function(test){if(!ensureIsReal(test)){test.done();return}var usCounter=0,taskCounter=0,completed=function(){return usCounter==1&&taskCounter==2},usData={name:testKit.unique("us"),tasks:[{name:testKit.unique("task1")},{name:testKit.unique("task2")}]},store=test.get("storage"),inProgress=!0;proxy.subscribe([{parameters:{type:"UserStory"},callback:function(event){event.type=="Removed"&&(usCounter++,inProgress=completed(),test.ok(!0,'us event type is "Removed"'),inProgress||test.done())}}],function(){createUserStory(store,usData,function(r){var id=r[0].data[0].id;proxy.subscribe([{parameters:{type:"Task",filter:"UserStory.Id is "+id},callback:function(eventType,data){eventType=="Removed"&&(taskCounter++,inProgress=completed(),test.ok(!0,'task event type is "Removed"'),inProgress||test.done())}}],function(){store.remove("userStory",{id:id}).done(function(){setTimeout(function(){inProgress&&(test.ok(!1,"timed out"),test.done())},timeout)})})})})}),testcase["add task to user story"]=testKit.test(function(test){if(!ensureIsReal(test)){test.done();return}var usData={name:testKit.unique("us")},taskData={name:testKit.unique("task")},store=test.get("storage"),inProgress=!0;createUserStory(store,usData,function(userStory){var id=userStory[0].data[0].id;proxy.subscribe([{parameters:{type:"Task",filter:"UserStory.Id is "+id},callback:function(event){inProgress=!1,test.equals(event.type,"Added","task has been added"),test.equals(event.data.Name,taskData.name,"task name saved"),test.equals(event.data.UserStory.Id,id,"user story id is valid"),test.done()}}],function(){store.save("Task",{fields:["id","name","userStory"],$set:{name:taskData.name,userStory:{id:id}}}).done(function(task){setTimeout(function(){inProgress&&(test.ok(!1,"timed out"),test.done())},timeout)})})})}),testcase["remove task from user story"]=testKit.test(function(test){if(!ensureIsReal(test)){test.done();return}var usData={name:testKit.unique("us"),tasks:[{name:testKit.unique("task")}]},store=test.get("storage"),inProgress=!0;createUserStory(store,usData,function(userStory){var id=userStory[0].data[0].id,taskId=userStory[0].data[0].tasks[0].id;proxy.subscribe([{parameters:{type:"Task",filter:"UserStory.Id is "+id},callback:function(event){inProgress=!1,test.equals(event.type,"Removed","task has been removed"),test.equals(event.data.Name,usData.tasks[0].name,"task name saved"),test.equals(event.data.UserStory.Id,id,"user story id is valid"),test.done()}}],function(){store.remove("Task",{id:taskId}).done(function(task){setTimeout(function(){inProgress&&(test.ok(!1,"timed out"),test.done())},timeout)})})})}),testcase["change user story release"]=testKit.test(function(test){if(!ensureIsReal(test)){test.done();return}var usData={name:testKit.unique("us"),release:{name:testKit.unique("release")}},releaseData={name:testKit.unique("release")},store=test.get("storage"),inProgress=!0;createUserStory(store,usData,function(userStory){var id=userStory[0].data[0].id;createRelease(store,releaseData,function(release){var newReleaseId=release[0].data[0].id;proxy.subscribe([{parameters:{type:"UserStory"},callback:function(event){event.type=="Updated"&&(inProgress=!1,test.equals(event.data.Release.Id,newReleaseId,"user story release changed"),test.done())}}],function(){store.save("userStory",{fields:["id","name","release"],$set:[{id:id,release:{id:newReleaseId}}]}).done(function(){setTimeout(function(){inProgress&&(test.ok(!1,"timed out"),test.done())},timeout)})})})})}),testcase})
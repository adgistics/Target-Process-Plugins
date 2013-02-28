define(["jQuery","tests.async/testkit/testkit.component","tau/components/component.avatar","tau/ui/extensions/container/ui.extension.container.childrenEvents"],function($,TestKit,Component,ExtensionChildrenEvents){var testKit=new TestKit(Component);testKit.registerSetup("componentBus",function(test,next){var componentConfig={context:{configurator:test.get("configurator")},extensions:[ExtensionChildrenEvents],isEdit:!0};test.set("componentBus",test.get("componentClass").create(componentConfig)),next()}),testKit.registerSetup("fixtures",function(test,next){var users={vasya:{login:"vasya"+ +(new Date),firstName:"Vasya",lastName:"Pupkin",email:"vasya"+ +(new Date)+"@example.com",password:123123,isAdministrator:!0,avatarUri:"http://localhost/targetprocess/avatar.ashx?UserId=120&modified=2132&size="}},fixtures={users:users};test.set("fixtures",fixtures),next()}),testKit.registerSetup("component.initialize",function(test,next){var spy=null;test.get("real")==0?(spy=sinon.stub(test.get("configurator").getAvatarService(),"getCropRect",function(userId){var rectCrop=$.Deferred();return rectCrop.resolve({height:767,width:767,x:10,y:23})}),spy=sinon.stub(test.get("configurator").getAvatarService(),"crop",function(url){return $.Deferred().resolve({Id:test.get("data").user.vasya.id,FirstName:"Vasya",LastName:"Pupkin",AvatarUri:"http://localhost/targetprocess/avatar.ashx?UserId=120&modified="+(new Date).getTime()+"&size=",ModifyDate:"/Date(1346330577084+0300)/"})}),spy=sinon.stub(test.get("configurator").getAvatarService(),"remove",function(url){return $.Deferred().resolve({Id:userId,FirstName:"Vasya",LastName:"Pupkin",AvatarUri:"http://localhost/targetprocess/avatar.ashx?UserId=120&modified="+(new Date).getTime()+"&size=",ModifyDate:"/Date(1346330577084+0300)/"})})):(spy=sinon.spy(test.get("configurator").getAvatarService(),"getCropRect"),spy=sinon.spy(test.get("configurator").getAvatarService(),"crop"),spy=sinon.spy(test.get("configurator").getAvatarService(),"remove")),test.set("avatarService.spy",spy);var testData=test.get("data"),componentBus=test.get("componentBus");componentBus.initialize({context:{entity:testData.user.vasya}}),next()});var testcase={name:"component.avatar"};return testcase["should render valid markup and should allow to edit"]=testKit.test(function(test){var user=test.get("data").user.vasya,oldSrc;testKit.flow(test,{"bus afterRender[0]":function(evt,renderData){var $el=renderData.element;oldSrc=$el.find("img").attr("src"),test.equals($el.length,1,"el rendered"),test.get("componentBus").fire("toggleBubble")},"bus afterRender[0]+avatar.editor.afterRender[0]":function(evt,elData,renderData){var $el=renderData.element,$opts=$el.find(".ui-menu__item");test.equals($opts.length,3,"show editors options ");var $cropButton=$opts.filter(".crop-avatar");$cropButton.click();var cropEditor=$el.find(".tau-avatar-crop-container"),$saveEditor=cropEditor.find(".tau-save-crop");$saveEditor.click()},"bus afterRender[1]":function(evt,renderData){var $el=renderData.element,newSrc=$el.find("img").attr("src");test.equals(oldSrc===newSrc,!1,"avatar refreshed after crop"),test.done()}})}),testcase})
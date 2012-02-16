define(["tau/configurator","tests/common/service.mock","tau/components/component.entity","tests/components/common/common.setup","tests/components/component.specs","tests/common/applicationContext","tests/common/testData.Generator","tau/components/component.impedimentListPanel","tau/components/component.impedimentList","tau/components/component.label.impedimentsCount","tau/components/component.diagnostics"],function(a,b,c,d,e,f,g){var h=function(){var h=new g;h.initDefaultData();var i=h.getData(),j=i.selectByType("userStory")[3];a.setGlobalSettingsService({getGlobalSettings:function(a){a.success.call(a.scope,{IsEmailNotificationsEnabled:!1})}});var k={manualContext:!0,context:{entityType:{name:j.__type},id:j.id}},l=new f(k.context);i.push(l),l.processes[0].customFields=[];var m=d.create("[component.entity] user story config",i,c),n=function(){var c=this.service=new b;a.setService(c)},o=[{name:"container element should be rendered to provided element",preSetup:n,test:function(){ok(this.$el.is(".tau-container"),"container element is rendered")}}],p={name:"config container formed correctly",preSetup:n,test:function(){var a=this.EventsDictonary.onConfigContainerCreated;equals(a.length,1,"single event about config container creation is fired");var b=a[0].data;same(b.context.entity.entityType,{name:j.__type},"entity attached correctly"),same(b.context.entity.id,150,"entity attached correctly"),equals(b.context.applicationContext.id,l.id,"app context attached correctly"),equals(b.context.applicationContext.__type,"context","app context attached correctly")}};e.create(m,k).viewShouldFollowBasicComponentLifeCycle(n).viewShouldPassTests(o).on("onConfigContainerCreated",p).done()};return{run:h}})
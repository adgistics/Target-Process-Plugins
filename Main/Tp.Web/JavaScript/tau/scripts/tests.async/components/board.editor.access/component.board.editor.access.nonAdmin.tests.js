define(["tau/core/event","tests.async/components/board.editor.access/component.board.editor.access.base.tests"],function(Event,BaseTest){return BaseTest({generateLoggedUser:function(ctx){return{id:ctx.loggedUser.id,name:"Me",isAdministrator:!1,role:"Developer"}},testcaseName:"should not show public sharing option for non-admin users",testcaseCallback:function(test){var bus=test.get("bus"),testFlow={bus:bus,"bus afterRender[0]":function(evt){var $el=evt.data.element,$widget=$el.find("[role=action-share]");test.equals($widget.size(),2,"Share element is visible"),test.equals($widget.eq(0).val(),"private","Allow set access board in private state"),test.equals($widget.eq(1).val(),"custom","Allow set access board in custom state"),test.done()}};Event.subscribeOn(testFlow)}})})
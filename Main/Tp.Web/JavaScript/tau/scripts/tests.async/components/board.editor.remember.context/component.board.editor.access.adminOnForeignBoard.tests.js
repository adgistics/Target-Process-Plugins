define(["tau/core/event","tests.async/components/board.editor.access/component.board.editor.access.base.tests"],function(Event,BaseTest){return BaseTest({generateLoggedUser:function(ctx){return{id:ctx.loggedUser.id+2,name:"Me",isAdministrator:!0,role:"Developer"}},testcaseName:"should allow share and remove on foreign board for admin users",testcaseCallback:function(test){var bus=test.get("bus"),testFlow={bus:bus,"bus afterRender[0]":function(evt){var $el=evt.data.element,$widget=$el.find("[role=action-share]");test.equals($widget.size(),1,"Share element is visible"),test.equals($widget.attr("type").toLowerCase(),"checkbox","Element is checkbox");var $title=$el.find("[role=action-share-title]");test.equals($title.text(),"Show in menu to all users","Title is correct"),test.done()}};Event.subscribeOn(testFlow)}})})
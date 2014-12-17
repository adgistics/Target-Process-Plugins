define(["jQuery","Underscore","tau/core/extension.base"],function(t,e,s){return s.extend({"bus beforeInit":function(t,e){var s=e.config;this.store=s.store,this.entity=s.context.entity},"bus afterRender":function(e,s){var n=s.element,a=n.find(".i-role-results");a.on("click",".tau-btn",function(e){var s=t(e.target),n=!s.hasClass("tau-checked"),a=n?s.data("result"):null;this._changeState(s,a)}.bind(this)),s.data.isTestPlanRunStateFinal?a.find(".tau-btn").prop("disabled",!0):this._monitorState(a)},_changeState:function(t,e){this.fire("test.case.run.change.state.save",{state:e})},_setState:function(t,e){var s=t.find(".tau-btn.tau-"+this._convertPassedValueToState(e));s.siblings(".tau-btn").removeClass("tau-checked"),s.addClass("tau-checked")},_getState:function(e){var s=t.Deferred();return this.store.get(this.entity.entityType.name,{id:this.entity.id,fields:["passed"]}).done({success:function(t){s.resolveWith(this,[e,t[0].data.passed])},scope:this}),s.promise()},_resetState:function(t){t.find(".tau-btn").removeClass("tau-checked")},_convertPassedValueToState:function(t){return null===t?"skipped":t?"passed":"failed"},_monitorState:function(t){this.store.unbind(this),this.store.on({eventName:"afterSave",type:this.entity.entityType.name,listener:this,hasChanges:["passed|runDate"],filter:{id:this.entity.id}},function(s){var n=s.data.changes,a=n.passed,i=n.runDate;i?e.isUndefined(a)?this._getState(t).then(this._setState):this._setState(t,a):this._resetState(t)}.bind(this))}})});
define(["tau/components/extensions/component.extension.base","tau/components/extensions/property/note.hint.definitions"],function(e,n){return e.extend({"bus afterRender":function(){var e=this.store,t=this.config.context.entity,i=t.entityType.name;e.get(i,{id:t.id,fields:["passed"]}).done({success:function(e){var t=e[0].data;t.passed===!1&&this.bus.fire("note.hint.changed",{newHintDefinition:n.DETAILS_HINT})},scope:this}),e.unbind(this),e.on({eventName:"afterSave",type:i,listener:this,filter:{id:t.id},hasChanges:["passed"]},function(e){var t=e.data.changes;this.bus.fire("note.hint.changed",{newHintDefinition:t.passed===!1?n.DETAILS_HINT:n.DEFAULT_HINT})}.bind(this))}})});
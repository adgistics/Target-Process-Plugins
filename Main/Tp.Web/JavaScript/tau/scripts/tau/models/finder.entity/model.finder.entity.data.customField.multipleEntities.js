define(["Underscore","tau/models/finder.entity/model.finder.entity.data.customField.entity"],function(t,i){return i.extend({"bus afterInit":function(i,e){var s=e.config,n=s.context.configurator.getStore(),a=s.context.entity;n.unbind(this),n.on({eventName:"afterSave",type:a.entityType.name,listener:this,filter:{id:a.id},hasChanges:["customFields"]},t.bind(function(t){var i=this.getCustomFieldByName(t.data.changes.customFields,s.customField.name);if(i){var e=this.getIdsFromCustomFieldValue(i.value);this.fire("updateInitialDsl",{actualIds:e})}},this))},"bus options.ready:last + builder.ready:last + initialDsl.ready:last + updateInitialDsl":function(t,i,e,s,n){i.filter.init_dsl=this.updateInitDslWithIds(s,n.actualIds),this.fire("options.ready",i),e.setParameter("init_dsl",i.filter.init_dsl),this.fire("builder.ready",e),this.fire("search.readyToExecute")},setOptionsInitDslFromCustomFieldValue:function(t,i){var e=t.filter.init_dsl;this.fire("initialDsl.ready",e);var s=this.getIdsFromCustomFieldValue(i);return t.filter.init_dsl=this.updateInitDslWithIds(e,s),t},getIdsFromCustomFieldValue:function(i){var e=[],s=t.compact(t.asString(i).split(","));return e=t.map(s,function(t){return parseInt(t.split(" ")[0],10)})}})});
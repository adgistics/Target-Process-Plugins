define(["tau/components/extensions/component.extension.base"],function(ExtensionBase){return ExtensionBase.extend({init:function(){this._super.apply(this,arguments),this.bus.getGlobalBus().on("requestWasAttachedToEntity",this.onRequestsUpdates,this),this.bus.getGlobalBus().on("requestIsDetachedFromEntity",this.onRequestsUpdates,this),this.bus.getGlobalBus().on("bugWasMarkedAsDuplicate",this.onBugWasMarkedAsDuplicate,this)},destroy:function(){this.bus.getGlobalBus().removeListener("requestWasAttachedToEntity",this.onRequestsUpdates,this),this.bus.getGlobalBus().removeListener("requestIsDetachedFromEntity",this.onRequestsUpdates,this),this.bus.getGlobalBus().removeListener("bugWasMarkedAsDuplicate",this.onBugWasMarkedAsDuplicate,this),this._super.apply(this,arguments)},refreshComponentIfEntityFromCurrentContext:function(evt){this.isEntityInContext(evt)&&this.refresh()},onRequestsUpdates:function(evt){this.refreshComponentIfEntityFromCurrentContext(evt)},onBugWasMarkedAsDuplicate:function(evt){var entityId=this.config.context.entity.id;entityId===evt.data.bugId&&this.refresh()},refresh:function(){this.fire("evictProperty"),this.fire("refresh")}})})
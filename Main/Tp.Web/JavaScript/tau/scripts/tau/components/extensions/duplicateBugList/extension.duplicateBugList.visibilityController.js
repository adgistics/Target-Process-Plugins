define(["jQuery","tau/components/extensions/component.extension.base"],function(jQuery,ExtensionBase){return ExtensionBase.extend({"bus afterRender":function(evtArgs){evtArgs.data.element.hide()},"bus componentsCreated+duplicateBugCountRetrieved":function(evt){var count=evt.duplicateBugCountRetrieved.data.count,components=evt.componentsCreated.data,component=components[0].component;component.fire("sendEventToComponents",{name:"setBadgeText",data:{text:count}})},"bus componentsCreated+duplicateBugRetrieved":function(evt){var items=evt.duplicateBugRetrieved.data.items,components=evt.componentsCreated.data,component=components[1].component;if(component.name=="duplicateBugListPanel inner")return;component.fire("duplicateBugRetrieved",{items:items})},"bus afterRender+duplicateBugCountRetrieved":function(evtArgs){if(evtArgs.duplicateBugCountRetrieved.data.count>0){var element=evtArgs.afterRender.data.element;this.config.disableAnimation?element.show():element.slideDown("slow")}}})})
define(["jQuery","tau/components/extensions/component.extension.base"],function($,ExtensionBase){return ExtensionBase.extend({category:"edit",init:function(){this._super.apply(this,arguments)},"bus beforeComponentsInitialize":function(evtData){var componentsList=this.createComponentList(evtData.data);this.fire("componentsList.ready",componentsList)},"bus afterRender + componentsList.ready":function(e){var $parentElement=e.afterRender.data.element,componentsList=e["componentsList.ready"].data;this.attachListeners(componentsList,$parentElement)},createComponentList:function(data){var componentsList=[];for(var i=1;i<data.length;i+=2)componentsList.push(data[i].component);return componentsList},attachListeners:function(components,$parentElement){if(components)for(var i=0;i<components.length;i++){var ci=components[i];ci.on("beforeChangeProperty",this.createOnBeforeChangePropertyHandler({$el:$parentElement}),this,{index:i}),ci.on("propertyChanged",this.createOnPropertyChangedHandler({$el:$parentElement}),this,{index:i,component:components[i]},1)}},createOnPropertyChangedHandler:function(params){var self=this;return function(evtArgs){var index=evtArgs.listenerData.index,component=evtArgs.listenerData.component;component.on("afterRender",function(e){e.removeListener();var $row=params.$el.find(" > tbody > tr").eq(index).find(">td");self.fire("updateElement",{element:$row})},component)}},createOnBeforeChangePropertyHandler:function(params){var self=this;return function(evtArgs){var index=evtArgs.listenerData.index,$row=params.$el.find(" > tbody > tr").eq(index).find(">td");self.fire("markElementToBeUpdated",{element:$row})}}})})
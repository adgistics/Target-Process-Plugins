define(["Underscore","tau/components/extensions/component.extension.base"],function(_,ExtensionBase){return ExtensionBase.extend({category:"edit","bus componentsCreated":function(e){var btnUpdateComponent=_.find(e.data,function(componentInfo){return componentInfo.component.name=="btnUpdateSettings"});this.fire("update.button.found",btnUpdateComponent.component)},"bus update.button.found":function(evt){evt.data.on("view.button.click",this.onButtonClickHandler,this)},"bus update.button.found:last+event.suspended":function(evt){evt["update.button.found"].data.fire("enable")},"bus update.button.found:last+before_resumeSave":function(evt){evt["update.button.found"].data.fire("disable")},onButtonClickHandler:function(){this.fire("resumeSave")}})})
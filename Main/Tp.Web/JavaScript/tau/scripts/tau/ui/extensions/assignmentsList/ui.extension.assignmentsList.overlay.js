define(["tau/components/extensions/component.extension.base"],function(ExtensionBase){return ExtensionBase.extend({"bus afterRender":function(evt){this.element=evt.data.element;var fn=this.action||function(){};fn.call(this),this.action=function(){}},getWidget:function(){return this.element.parents(".ui-placeholder:first")},showOverlay:function(){this.getWidget().tauOverlay()},hideOverlay:function(){this.getWidget().tauOverlay("hide")},"bus markElementToBeUpdated":function(evtArgs){this.showOverlay()},"bus updateElement":function(evtArgs){this.action=function(){this.hideOverlay()}},"bus markElementToBeDeleted":function(evtArgs){this.showOverlay()},"bus afterAssignmentRemoved":function(evtArgs){this.hideOverlay()},"bus beforeSaveAssignment":function(evtArgs){this.showOverlay()},"bus beforeAddAssignment":function(evtArgs){this.showOverlay()}})})
define(["Underscore","jQuery","tau/components/extensions/component.extension.base"],function(_,$,ExtensionBase){return ExtensionBase.extend({"bus beforeInit":function(evt){var cfg=evt.data.config;this.options={emptyDataMessage:cfg.emptyDataMessage||"No data",contentSelector:cfg.contentSelector||null,emptyElementCssClass:cfg.emptyElementCssClass||"ui-empty-data-msg"}},"bus dataBind+afterRender":function(evtArgs){this.element=evtArgs.afterRender.data.element,evtArgs.dataBind.data.items.length===0&&this._applyToggleNoData(!0)},"bus hideListContent":function(evtArgs){this._applyToggleNoData(!0)},"bus showListContent":function(evtArgs){this._applyToggleNoData(!1)},_applyToggleNoData:function(showMsg){this._toggleNoData(showMsg)},_getVisibilityMethodName:function(show){return show?"show":"hide"},_toggleNoData:function(showMsg){var contentMethod=this._getVisibilityMethodName(!showMsg),messageMethod=this._getVisibilityMethodName(showMsg),$el=this.element,opt=this.options;$el.find(opt.contentSelector)[contentMethod](),this._getNoDataMessageElement($el,opt)[messageMethod]()},_getNoDataMessageElement:function($el,options){var result=$el.find("."+options.emptyElementCssClass);return result.length===0&&(result=$(['<span class="',options.emptyElementCssClass,'">',options.emptyDataMessage,"</span>"].join("")).appendTo($el)),result}})})
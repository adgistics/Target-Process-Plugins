define(["Underscore","jQuery","tau/core/extension.base"],function(_,$,ExtensionBase){return ExtensionBase.extend({"bus initialize":function(){this.fire("activeTab.ready",null)},"bus activeTab.ready > refresh":function(evt,tab){this.fire("activeTab.ready",tab)},"bus $el.ready":function(evt,$el){var self=this,$active=$el.find(".i-role-tabheader.tau-active");$active.length&&this._switchTab($el,$active,!0),$el.on("click",".i-role-tabheader",function(){var $tabheader=self._switchTab($el,$(this));self.fire("activeTab.ready",self._getActiveName($el))})},_switchTab:function($el,$tabheader,force){var $tabheaders=$el.find(".i-role-tabheader"),tab=$tabheader.data("tab");$tabheaders.not($tabheader).each(function(){$el.find(".i-role-tab-"+$(this).data("tab")).removeClass("tau-active")}).removeClass("tau-active");var $tab=$el.find(".i-role-tab-"+tab);return $tab.toggleClass("tau-active",force),$tab.hasClass("tau-active")&&this._applyFocus($tab),$tabheader.toggleClass("tau-active",force),$tabheader},_applyFocus:function($tab){$tab.find("form :submit:first:visible").focus(),$tab.find("form :text:first:visible").focus()},_getActiveName:function($el){return $el.find(".i-role-tabheader.tau-active").data("tab")||null}})})
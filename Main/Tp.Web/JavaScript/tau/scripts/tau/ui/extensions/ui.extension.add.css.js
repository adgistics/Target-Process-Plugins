define(["Underscore","jQuery","tau/components/extensions/component.extension.base"],function(_,$,BaseExtension){return BaseExtension.extend({category:"edit","bus afterRender":function(evt){this.config.hasOwnProperty("cssClass")&&evt.data.element.addClass(this.config.cssClass)}})})
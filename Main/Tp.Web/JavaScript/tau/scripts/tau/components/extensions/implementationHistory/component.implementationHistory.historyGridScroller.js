define(["Underscore","jQuery","tau/components/extensions/component.extension.base"],function(_,$,ComponentExtensionBase){return ComponentExtensionBase.extend({"bus afterRender":function(evt){evt.data.element.find(".tau-historyGrid").mousewheel($.proxy(this,"_onMouseWheel"))},_onMouseWheel:function(evt,delta){var targetElement=evt.currentTarget;if(this._isScrollActive(targetElement)){evt.preventDefault();var $el=$(targetElement),currentScrollOffset=$el.scrollLeft(),newScrollOffset=currentScrollOffset+ -delta*100;$el.scrollLeft(newScrollOffset)}},_isScrollActive:function(element){return element.scrollWidth>element.offsetWidth}})})
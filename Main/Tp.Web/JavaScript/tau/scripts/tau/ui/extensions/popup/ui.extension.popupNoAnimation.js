define(["jQuery","tau/components/extensions/component.extension.base"],function($,ExtensionBase){return ExtensionBase.extend({init:function(config){var self=this;self._super(config);var $body=$("body");self.bodyOverflow=$body.css("overflow"),self.$overlay=$('<div class="ui-popup-overlay"></div>').appendTo($body),self.$container=$('<div class="ui-popup"><div class="close"></div></div>').appendTo($body),self.$closeEl=self.$container.find(".close");var integration=self.getIntegration();integration.cssClass&&self.$container.addClass(integration.cssClass),self.keyboardAttached=!1},getIntegration:function(){var integration=this.config.integration||this.config.options.integration;return integration},"bus deleted":function(){var self=this;this.$container.toggleClass("ui-popup_active_true",!1),this.$overlay.toggleClass("ui-popup-overlay_active_true",!1),self.exit()},"bus application.navigate.entity+contentRendered":function(evt,data){var entityType=data.entity||data.type;entityType!="user"&&this.$container.removeClass("tau-user"),this.$container.addClass("tau-"+entityType)},"bus application.navigate.entity":function(evt,data){this.$container.find(".ui-application-viewport").css("visibility","hidden"),this.$closeEl.hide()},"bus contentRendered":function(evt){var self=this;$("body").css("overflow","hidden"),self.$overlay.toggleClass("ui-popup-overlay_active_true",!0),self.element=evt.data.element,self.element.addClass("ui-popup-content");var $container=self.$container;this.$closeEl.show(),$container.toggleClass("ui-popup_active_true",!0),self.element.appendTo($container),self.element.css("visibility","visible"),self._attachHandlers(),this.keyboardAttached||(this._attachKeyBoardHandling(),this.keyboardAttached=!0)},"bus application.exit":function(){this.$container.toggleClass("ui-popup_active_true",!1),this.$overlay.toggleClass("ui-popup-overlay_active_true",!1),$("body").css("overflow",this.bodyOverflow)},_attachKeyBoardHandling:function(){var keyBoardHandler={handleKeyDown:_.bind(this._onDocumentKeyDown,this)};this.config.context.configurator.getKeyBoardManager().pushHandler(keyBoardHandler)},_onDocumentKeyDown:function(event){event.keyCode==$.ui.keyCode.ESCAPE&&this.exit()},_attachHandlers:function(){if(this._attached)return;this._attached=!0,this._onBodyClickHandler=$.proxy(this._onBodyClick,this),this._onCloseButtonClickHandler=$.proxy(this._onCloseButtonClick,this),$(document).bind("click",this._onBodyClickHandler),this.$container.find(".close").bind("click",this._onCloseButtonClickHandler),this._removeElements=this._removeElementsInnerImpl},_onBodyClick:function(e){if(e.target!=this.$overlay[0])return;this.exit()},_onCloseButtonClick:function(){this.exit()},_detachHandlers:function(){$(document).unbind("click",this._onBodyClickHandler),this.element&&this.element.parents(".ui-popup").unbind("click",this._onElementClickHandler),this.config.context.configurator.getKeyBoardManager().popHandler(),this.$container.find(".close").unbind("click",this._onCloseButtonClickHandler)},_removeElementsInnerImpl:function(){this.$overlay.remove(),this.$container.remove(),$("body").css("overflow",this.bodyOverflow)},_removeElements:$.noop,exit:function(){this.keyboardAttached=!1,this.config.context.configurator.getKeyBoardManager().popHandler();var integration=this.getIntegration();integration.keepAlive?this.fire("application.exit"):this.fire("destroy")},destroy:function(){this._detachHandlers(),this._removeElements(),this._super()}})})
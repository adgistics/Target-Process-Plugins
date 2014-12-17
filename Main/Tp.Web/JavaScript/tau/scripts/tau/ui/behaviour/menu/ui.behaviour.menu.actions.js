define(["Underscore","jQuery","tau/core/tau-widget"],function(e,t,n){n.widget("ui.behaviourMenuActions",{_create:function(){this.init()},init:function(){var e=this,n=this.options.onClick||function(){e.show()},i=t(this.element);this.$element=i,this.$popup=i.find(".ui-menu__popup"),this.$items=this.$element.find(".ui-menu__item-action .drop-down-option"),this.currentIndex=-1,this.options.classActive="drop-down-option_hover",e.isOpened=!1,this.$element.find(".ui-menu__trigger").click(function(e){n(e)}),this._bindEvents()},show:function(){var e=this;e.isOpened=!e.isOpened,e.isOpened?e._mapKeyboard():e._unmapKeyboard()},_bindEvents:function(){var e=this;e.$items.hover(function(){e.$items.not(this).removeClass(e.options.classActive),t(this).addClass(e.options.classActive),e.currentIndex=e.$items.index(this)},function(){t(this).removeClass(e.options.classActive)}),t("body"+this.eventNamespace).click(function(n){t(n.target).closest(".ui-menu__item").hasClass("ui-menu__item-dont-close")||(e.isOpened&&!t(n.target).parents(".tau-bubble").length&&e.close(),t(n.target).parents(".ui-menu:first").length)})},_mapKeyboard:function(){var e=this;this.options.keyboardManager.pushHandler({handleKeyDown:function(n){switch(n.keyCode){case t.ui.keyCode.ESCAPE:n.preventDefault(),e.close();break;case t.ui.keyCode.DOWN:n.preventDefault(),e.currentIndex++,e.currentIndex=e.currentIndex>=e.$items.length?0:e.currentIndex,e.$items.removeClass(e.options.classActive),e.$items.eq(e.currentIndex).addClass(e.options.classActive);break;case t.ui.keyCode.UP:n.preventDefault(),e.currentIndex--,e.currentIndex=e.currentIndex<0?e.$items.length-1:e.currentIndex,e.$items.removeClass(e.options.classActive),e.$items.eq(e.currentIndex).addClass(e.options.classActive);break;case t.ui.keyCode.ENTER:n.preventDefault();var i=e.$items.filter("."+e.options.classActive);i&&i.parent().trigger("click")}}})},_unmapKeyboard:function(){this.options.keyboardManager.popHandler()},close:function(){var e=this;e.isOpened=!1,e._unmapKeyboard()
},destroy:function(){t("body"+this.eventNamespace).off(),self.isOpened&&this._unmapKeyboard()}})});
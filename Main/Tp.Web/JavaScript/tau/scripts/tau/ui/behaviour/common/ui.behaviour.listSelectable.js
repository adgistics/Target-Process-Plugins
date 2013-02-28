define(["Underscore","jQuery"],function(_,$){$.widget("ui.listSelectable",{_create:function(){},_handler:function($items){},enable:function(opts){opts=_.defaults(opts||{},{saveScroll:!1});if(this._enabled)return;this._enabled=!0;var $filter=this.element.parents(".ui-drop-down:first").find(".filter-field-wrapper :text");$filter.length&&$filter.focus();var self=this;this.reset(opts);var nextIndex=function(index){return index++,index>=self._max&&(index=0),index},prevIndex=function(index){return index--,index<0&&(index=self._max-1),index},$items=this.$items,className=this.options.className;this.options.keyboardManager.pushHandler({handleKeyDown:function(evt){var index=self._index;switch(evt.keyCode){case $.ui.keyCode.DOWN:evt.preventDefault(),index=nextIndex(index);break;case $.ui.keyCode.UP:evt.preventDefault(),index=prevIndex(index);break;case $.ui.keyCode.ENTER:evt.preventDefault();if(index<0)return;self.$items.eq(index).trigger("click");break;default:return}self._index=index,self.$items.removeClass(className),index>=0&&self.$items.eq(index).addClass(className),self.$list.animate({scrollTop:self._getOffset(index)},{duration:0})}})},_getOffset:function(num){var $item=this.$items.eq(num);if($item.length==0)return 0;var innerTop=this.$inner.position().top,itemTop=$item.position().top,group=$item.parent("i-group");group.length&&(itemTop+=group.position().top);var offset=-innerTop+itemTop-this.$list.height()/2;return offset},reset:function(opts){opts=_.defaults(opts||{},{saveScroll:!1}),this.$items=this.element.find(this.options.items).filter(":visible");var $list=this.element;this.$list=$list,this.$inner=this.$list.find(this.options.inner||".i-inner"),opts.saveScroll==0&&$list.scrollTop(0);var height=$list.height();this.step=this.$items.eq(0).height()*.5,this._index=-1,this._max=this.$items.length;var className=this.options.className;opts.saveScroll==0&&this.$items.removeClass(className)},disable:function(){if(!this._enabled)return;this._enabled=!1,this.options.keyboardManager.popHandler()},destroy:function(){this.disable()}})})
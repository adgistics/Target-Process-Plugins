define(["Underscore","jQuery","tau/components/extensions/component.extension.base"],function(_,$,BaseExtension){return BaseExtension.extend({category:"edit","bus afterRender":function(evt){var self=this,afterRenderData=evt.data,$element=afterRenderData.element,contentSelector=this.config.imagePreviewContentSelector,$images=$element.find(contentSelector).find("img");if($images.size()>0)var interval=setInterval(function(){$.contains(document.body,$element[0])&&(clearInterval(interval),self.onDOMReady($element))},1e3)},onDOMReady:function($el){var self=this,contentSelector=this.config.imagePreviewContentSelector,$images=$el.find(contentSelector).find("img"),maxWidth=$el.width();for(var i=0,len=$images.size();i<len;i++){var $img=$images.eq(i),naturalWidth=parseInt($img[0].naturalWidth,10);if(naturalWidth>maxWidth){var $box=$('<div class="tau-lightbox-container"></div>'),$link=$('<a rel="lightbox" target=_blank class="tau-lightbox-full-size">View Full Size</a>');$link.attr("href",$img.attr("src")),$link.click($.proxy(self.pushEscapeHandler,self)),$box.append($img.clone()).append($link),$img.replaceWith($box)}}},pushEscapeHandler:function(e){var self=this,km=this.config.context.configurator.getKeyBoardManager();km.pushHandler({handleKeyDown:function(evt){evt.keyCode==$.ui.keyCode.ESCAPE&&_.bind(self.popHandler,self)()}}),$("body").find("#ux-lightbox-overlay").bind("click",_.bind(self.popHandler,self))},popHandler:function(){var self=this;this.config.context.configurator.getKeyBoardManager().popHandler(),$("body").find("#ux-lightbox-overlay").unbind("click",self.popHandler)}})})
define(["jQuery","tau/core/extension.base"],function(n,t){return t.extend({"bus afterRender":function(n,t){var e=t.element,o=e.find(".tau-menu-icon"),i=e.find(".tau-social-share-popup");i.detach(),o.tauBubble({content:i,target:o,alignTo:e,ignoreOverlap:!0,zIndex:999,onPositionConfig:function(n){n.at="left-30 bottom-10"},onArrowPositionConfig:function(n){n.at="center bottom-10"},show:function(){e.addClass("tau-active")},hide:function(){e.removeClass("tau-active")}})},destroy:function(){this.component&&(this.component.fire("destroy"),this.component=null),this._super()}})});
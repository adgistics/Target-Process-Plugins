define(["Underscore","jQuery","tau/core/class","tau/utils/timeline/utils.timeline.relative.position.calculator"],function(i,t,e,s){var n=e.extend({init:function(i,t,e){this._model=i,this._viewMetrics=t,this._$section=e},$section:function(){return this._$section},setPosition:function(){this._prepareSection(this._$section);var t=this._isVisible();if(this._$section.visibility(t),t){var e=this._metrics(),n=s.cutToViewport(e.left,e.width);this._$section.css({left:i.isNull(e.left)?"0":this._toCssPercent(n.left),width:i.isNull(e.width)?"":this._toCssPercent(n.width)})}},_metrics:function(){throw new Error("_metrics is not implemented in SectionBase")},_isVisible:function(){throw new Error("_isVisible is not implemented in SectionBase")},_prepareSection:function(){},_toCssPercent:function(i){return 100*i+"%"},_zeroIfNaN:function(t){return i.isNaN(t)?0:t}});return n});
define(["Underscore","tau/core/class"],function(_,Class){var BaseChart=Class.extend({init:function(config){this.handlers=this.initHandlers(config.handlers||[])},initHandlers:function(handlers){return handlers},_handle:function(eventName,source,dataItem,context){_.chain(this.handlers).map(function(handler){return handler[eventName]}).filter(function(handler){return handler}).each(function(handler){handler.apply(source,[dataItem,context])})},_subscribe:function(items,eventNames,context){var self=this;return _.each(eventNames,function(eventName){items=items.on(eventName,function(d){self._handle(eventName,this,d,context)})}),items}});return BaseChart})
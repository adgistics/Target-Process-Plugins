define(["Underscore","tau/core/class"],function(_,Class){var BusProfiler=Class.extend({init:function(originalBus){var selfProfiler=this;selfProfiler.stream=[],selfProfiler.stopped=!1;var fnSrcFireMethod=originalBus.fire;originalBus.fire=function(){var args=arguments;!selfProfiler.stopped&&selfProfiler.registerEvent(args),fnSrcFireMethod.apply(this,args)}},stop:function(){this.stopped=!0},registerEvent:function(args){var tick=+(new Date),evt={tick:tick,name:args[0],data:args[1]||{}};this.stream.push(evt)},data:function(){return this.stream}});return BusProfiler})
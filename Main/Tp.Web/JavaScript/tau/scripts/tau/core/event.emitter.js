define(["tau/core/class","tau/core/event","tau/core/profile.methods"],function(a,b,c){var d=function(){},e=a.extend({init:function(a){this.bus=a.bus,b.subscribeOn(this)},"bus refresh":function(a){this.lifeCycleCleanUp()},lifeCycleCleanUp:d,on:function(){this.bus.on.apply(this.bus,arguments)},fire:function(){return this.bus.fire.apply(this.bus,arguments)},"bus destroy":function(){this.on=d,this.fire=d,this.destroy()},destroy:function(){var a=this.bus.getGlobalBus();a&&a.removeAllListeners(this),b.unSubscribe(this),delete this.bus}});return window.appIsInDebugMode===!0&&(e.prototype.__profiler=c.accumulate.method),e})
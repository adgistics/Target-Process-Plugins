define(["Underscore","tau/core/class","tau/components/component.creator"],function(e,t,n){var r=t.extend({createAsChild:function(e,t){var n=this.create(t);return e.on("destroy",function(){n.destroy()}),n},getCreatorConfig:function(){throw"SHOULD BE OVERRIDDEN"},create:function(e){e["queue.bus"]=!0;var t=this.getCreatorConfig(e);return n.create(t,e)}});return r.define=function(e){var t=r.extend({getCreatorConfig:e});return new t},r});
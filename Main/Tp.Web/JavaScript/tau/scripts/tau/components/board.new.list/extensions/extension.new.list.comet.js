define(["Underscore","jQuery","tau/core/extension.base"],function(e,r,t){return t.extend({"bus slice.ready":function(e,r){this.fire("comet.parameters",r.slice.getCometParameters())}})});
define(["Underscore","tau/models/finder/model.assignable.search"],function(_,ModelBase){return ModelBase.extend({init:function(config){this._super(config),this.properties.state.filter=function(v){return v?v.dataItem?v.dataItem.entityType.id===9:!0:!0}},getType:function(){return"feature"}})})
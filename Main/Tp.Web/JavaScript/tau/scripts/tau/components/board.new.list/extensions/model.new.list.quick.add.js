define(["Underscore","jQuery","tau/models/quick.add/model.board.quick.add.base"],function(t,e,a){return a.extend({resolveSliceAddData:function(){var t=this.config.options;return e.Deferred().resolve({slice:t.slice,types:t.types,path:t.path,expansionState:t.expansionState,onAfterAdd:t.onAfterAdd,shouldSkipNotification:t.shouldSkipNotification})},getDataItemTemplateParam:function(t){return{path:t.path}},getDoAddParams:function(t,e){var a={path:e.path,expansionState:e.expansionState,type:t.type,values:t.fields};return a},onAfterAddData:function(t,e,a){taus.track({action:"quick add entity",entityType:e.data[0].dataItem.type.toLowerCase(),tags:["newlist"]}),t.shouldSkipNotification(e.data[0])&&(a.skipNotification=!0),this._super(t,e,a),t.onAfterAdd(e)}})});
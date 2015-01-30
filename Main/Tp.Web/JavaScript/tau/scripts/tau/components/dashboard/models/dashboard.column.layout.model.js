define(["require","Underscore","./dashboard.layout.model.base","./dashboard.column.selection.strategy"],function(t){var e=t("Underscore"),n=t("./dashboard.layout.model.base"),i=t("./dashboard.column.selection.strategy"),o=n.extend({init:function(t,n,i){this._super(o.LAYOUT_TYPE_NAME),this._storeLayout(t),this.isEditable=n,this._widgetFactory=i,this._columnSelectionStrategy=null,this.columnCountChanged=e.Callbacks(),this._createColumns()},getLayout:function(){return this._layout},updateLayout:function(t){this._storeLayout(t)&&(this._createColumns(),this._notifyUpdated())},addWidgetFromTemplate:function(t){var e=this._getBestOrCreateColumnForNewWidget();return e.addWidgetFromTemplate(t)},addColumn:function(){var t=o._setDefaultColumnProperties({}),e=this._createColumn([],t,this.columns.length);return this.columns.push(e),this._notifyChanged(),this._notifyColumnCountChanged(),e},removeColumn:function(t){this.columns=e.without(this.columns,t),this._notifyChanged(),this._notifyColumnCountChanged()},setColumnCount:function(t){if(!t||0>t)throw new Error("Column count should be greater than 0");t!=this.columns.length&&this._layoutBuffer(function(){if(t>this.columns.length)e.each(e.range(this.columns.length,t),this.addColumn,this);else{var n=e.take(this.columns,t),i=e.rest(this.columns,t);e.each(i,function(t){var i=e.toArray(t.widgets);e.each(i,function(i){var o=e.min(n,function(t){return t.widgets.length});t.moveWidgetToColumn(i,o,!0)},this),this.removeColumn(t)},this)}})},moveWidget:function(t,e,n){var i=this._findColumn(t),o=this._findColumn(e);i.moveWidget(t,o,e,n)},moveWidgetToColumn:function(t,n,i){var o=this._findColumn(t),s=e.findWhere(this.columns,{instanceId:n});o.moveWidgetToColumn(t,s,i)},setColumnSelectionStrategy:function(t){return t&&e.isFunction(t.selectBestColumnForNewWidget)?void(this._columnSelectionStrategy=t):void console.error("Column selection strategy should be an object with `selectBestColumnForNewWidget` method")},clearColumnSelectionStrategy:function(){this._columnSelectionStrategy=null
},_storeLayout:function(t){return t=o.mergeDefaultLayout(t),e.isEqual(this._layout,t)?!1:(this._layout=t,!0)},_getBestOrCreateColumnForNewWidget:function(){if(!this.columns.length)return this.addColumn();if(!this._columnSelectionStrategy)return this._getDefaultColumnForNewWidget();try{return this._columnSelectionStrategy.selectBestColumnForNewWidget(this.columns)}catch(t){return console.error("Unable to select the best column with custom strategy. Falling back to default one.",t),this._getDefaultColumnForNewWidget()}},_getDefaultColumnForNewWidget:function(){return(new i).selectBestColumnForNewWidget(this.columns)},_createColumns:function(){var t=this.columns||[],n=t.length,i=e.flatMap(t,e.property("widgets"));this.columns=e.map(this._layout.columns,this._createColumn.bind(this,i)),e.each(i,function(t){t.remove()}),this.columns.length!==n&&this._notifyColumnCountChanged()},_createColumn:function(t,n,i){var s=this,u=e.deepClone(n);return{widgets:e.map(u.widgets,s._getOrCreateWidget.bind(s,t)),getDefinition:function(){return e.extend({},u,{widgets:e.invoke(this.widgets,"getDefinition")})},_addWidget:function(t){o._setDefaultWidgetProperties(t);var e=s._createWidget(t);return this.widgets.push(e),s._notifyChanged(),e},addWidgetFromTemplate:function(t){return this._addWidget({templateId:t.templateId,widgetId:e.UUID(),name:t.name,settings:t.settings})},removeWidget:function(t){this.widgets=e.without(this.widgets,t),s._notifyChanged()},insertWidget:function(t,e){this.widgets.splice(e,0,t),s._notifyChanged()},moveWidget:function(t,e,n,i){var o=this._removeWidgetById(t),s=e.findWidgetIndexById(n);i&&s++,e.insertWidget(o,s)},moveWidgetToColumn:function(t,e,n){var i=t.instanceId||t;t=this._removeWidgetById(i);var o=n?e.widgets.length:0;e.insertWidget(t,o)},_removeWidgetById:function(t){var e=this.findWidgetIndexById(t);return this.widgets.splice(e,1)[0]},findWidgetIndexById:function(t){return e.findIndex(this.widgets,e.matches({instanceId:t}))},instanceId:i.toString()}},_findColumn:function(t){return e.find(this.columns,function(e){return e.findWidgetIndexById(t)>=0
},this)},_getOrCreateWidget:function(t,n){if(n.widgetId){var i=e.findIndex(t,e.matches({instanceId:n.widgetId}));if(i>=0){var o=t[i];return t.splice(i,1),o.applyNewDefinition(n),o}}return this._createWidget(n)},_createWidget:function(t){var e=this._widgetFactory.createWidgetModel(t,!this.isEditable);return e.settingsChanged.add(this._notifyChanged.bind(this)),e},_notifyColumnCountChanged:function(){this.columnCountChanged.fire(this)},_notifyChanged:function(){this._layout=e.extend({},this._layout,{columns:e.invoke(this.columns,"getDefinition")}),this._super()},_layoutBuffer:function(t){this.changed.buffer(function(){this.columnCountChanged.buffer(t,this)},this)}});return o.LAYOUT_TYPE_NAME="columns",o.mergeDefaultLayout=function(t){var n=e.defaults(e.deepClone(t||{}),{columns:[]});return e.each(n.columns,o._setDefaultColumnProperties),n},o._setDefaultColumnProperties=function(t){return e.defaults(t,{widgets:[]}),e.each(t.widgets,o._setDefaultWidgetProperties),t},o._setDefaultWidgetProperties=function(t){if(!t.widgetId){var n=e.UUID();console.error('Widget should have an ID. Setting auto-generated ID "'+n+'" for widget',t),t.widgetId=n}return e.defaults(t,{settings:{},name:void 0})},o});
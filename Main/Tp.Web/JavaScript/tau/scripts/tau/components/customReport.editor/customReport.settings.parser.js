define(["require","Underscore","tau/core/class"],function(t){var e=t("Underscore"),r=t("tau/core/class");return r.extend({init:function(t){this._dataSource=t.reportSettings.dataSource,this._report=t.reportSettings.report},canParse:function(){return this.isEmpty()||this._reportCanBeParsed()&&this._dataSourceCanBeParsed()},_reportCanBeParsed:function(){return Boolean(this._report.type&&this._report.x&&this._report.y)},_dataSourceCanBeParsed:function(){return this._dataSource.source&&!e.any(this._dataSource.source.items,function(t){return"time"===t.id.toLowerCase()})},isEmpty:function(){return!this._report.type&&0===this._dataSource.dimensions.length&&0===this._dataSource.source.items.length},getCells:function(){return{types:e.map(this._dataSource.source.items,function(t){return t.id}),filter:""}},getX1:function(){return this._getAxisValue(this._report.x,0)},getX2:function(){return this._getAxisValue(this._report.x,1)},getY1:function(){return this._getAxisValue(this._report.y,0)},getY2:function(){return this._getAxisValue(this._report.y,1)},getColor:function(){return this._findDimensionById(this._report.color)},getSize:function(){return this._findDimensionById(this._report.size)},_findDimensionById:function(t){return e.find(this._dataSource.dimensions,function(e){return e.id===t})},_getAxisValue:function(t,e){if(!t)return"";var r="string"==typeof t?[t]:t;return r.length>e?this._findDimensionById(r[e]):""}})});
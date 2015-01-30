define(["require","tau/core/class","Underscore","jQuery"],function(e){var t=e("tau/core/class"),n=e("Underscore"),o=e("jQuery"),a=t.extend({onCardAdded:function(){},onCardDeleted:function(){},updateCounts:function(){},onCountDelta:function(){},loadData:function(e,t){return e.slice.treeViewCounts(t)},shouldBindData:!0}),r=a.extend({onCardAdded:function(e,t){e.increaseCount(t.card.type)},onCardDeleted:function(e,t){e.decreaseCount(t.card.type)},onCountDelta:function(e,t,n){var o=e.treeModel.parent;o&&(n?o.countsModel.increaseCount(t):o.countsModel.decreaseCount(t))},updateCounts:function(e){e.loadData()},getTypedCounts:function(e){return e}}),u=a.extend({init:function(){this._getCountsForHierarchy=n.debounce(function(e){var t=e.treeModel.getRoot();t.countsModel.loadData().done(function(e){e.data.dataItem.dataItem.data&&t.eventAggregator.totalNodeCountChanged.fire(e.data.dataItem.dataItem.data)})},0)},onCardAdded:function(e){this._getCountsForHierarchy(e)},onCardDeleted:function(e){this._getCountsForHierarchy(e)},onCountDelta:function(){},getTypedCounts:function(e){return n.filter(e,function(e){return e.count>0})}}),d=a.extend({getTypedCounts:function(){return[]},loadData:function(){return o.Deferred().resolve([])},shouldBindData:!1});return{regular:new r,hierarchy:new u,nocount:new d}});
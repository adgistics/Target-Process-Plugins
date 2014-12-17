define(["Underscore","tau/core/class","./card"],function(e,i,t){return i.extend({hierarchy:null,pagingModel:null,init:function(i,t,r,n,s,a,d,o){this.options=i,this.items=t||[],this.cardId=r,this.level=n,this.hierarchyMetaInfo=s||{},this.hierarchy=a,this.isPrioritizable=this.hierarchyMetaInfo.isPrioritizable,this.ordering=this._getDefaultOrdering(),this.pagingModel=d,this.createChildNode=o,this._itemSubscriptions=[],this.nodesAdded=e.Callbacks(),this.duplicateNodesRemoved=e.Callbacks(),this.cardDeleted=e.Callbacks(),this.cardAdded=e.Callbacks(),this.cardUpdated=e.Callbacks(),this.cardMoved=e.Callbacks(),this._initSubscriptions()},_initSubscriptions:function(){var i=function(i){e.each(this._itemSubscriptions,function(e){e(i)})}.bind(this);this.nodesAdded.add(function(t){e.each(t,i)}),this.cardAdded.add(function(e){i(e.nodeModel)})},createCard:function(e){return new t(e)},applyAndObserve:function(i){e.each(this.items,function(e){i(e)}),this._itemSubscriptions.push(i)},getLevelKey:function(){var e=this.hierarchyMetaInfo.parentEntityType;return e?this.level+"_"+e.toLowerCase():this.level.toString()},getCardTypes:function(){return this.hierarchyMetaInfo.cardTypes||[]},isEmpty:function(){return 0===this.items.length||1===this.items.length&&this.items[0].hasNoValueCard()},isCellLevel:function(){return"cells"===this.hierarchyMetaInfo.levelType},isInnerCollectionsLevel:function(){return"innerCollections"===this.hierarchyMetaInfo.levelType},canExpandCard:function(i){var t=this.hierarchyMetaInfo.levelType;if("x"==t||"y"==t)return this.hierarchyMetaInfo.hasNextLevel();if(i){var r=this.hierarchyMetaInfo.findCardTypeByValueType(i);return r&&r.canExpand}return e.any(this.hierarchyMetaInfo.cardTypes,function(e){return e.canExpand})},isShowDetailsDisabled:function(i){return i&&e.contains(this.options.disableDetailsViewForTypes,i.toLowerCase())},removeDuplicatesWith:function(i){var t=e.filter(this.items,function(e){return this._findCardIndex(i,e.card.id)>=0},this);return this.items=e.without(this.items,t),this.duplicateNodesRemoved.fire(t),t
},addNewItems:function(i){this.items=e.union(this.items,i),this.nodesAdded.fire(i)},removeNodeItemByCard:function(e){var i=this.findCardIndex(e);return i>=0?this.items.splice(i,1)[0]:null},findCardIndex:function(e){return this._findCardIndex(this.items,e.id)},_findCardIndex:function(i,t){return e.findIndex(i,function(e){return e.card.id===t})},sortCards:function(){if("Rank"==this.ordering.name){var e="Asc"==this.ordering.direction?-1:1;this.items.sort(function(i,t){return e*(i.card.orderingValue-t.card.orderingValue)})}},deleteCard:function(e){var i=this._tryRemoveCard(e);i&&this.cardDeleted.fire({card:e})},updateCardWith:function(i,t,r){var n=r&&i.orderingValue!==t.orderingValue,s=e.object(e.map(t.getDiff(i),function(e){var r=e.getValue(i);return e.setValue(t,r),[e.propertyName,r]},this));t.entity.isFinal=i.entity.isFinal,this.cardUpdated.fire({card:t,properties:s}),n&&(this.sortCards(),this.cardMoved.fire({card:t,index:this.findCardIndex(t)}))},removeCardFromView:function(e){var i=this._tryRemoveCard(e);i&&this.cardMoved.fire({card:e,index:null})},_tryRemoveCard:function(e){return null!==this.removeNodeItemByCard(e)},setCustomOrdering:function(e){this.ordering=e||this._getDefaultOrdering()},_getDefaultOrdering:function(){return e.defaults(this.hierarchyMetaInfo.ordering||{},{name:"",direction:""})}})});
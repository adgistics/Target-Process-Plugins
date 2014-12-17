define(["Underscore","jQuery","tau/core/class","tau/utils/utils.date","tau/components/board.timeline/view/view.cell.base","tau/components/board.timeline/views/card/view.timeline.card","tau/components/board.timeline/views/view.timeline.cell.tracks","tau/components/board.timeline/views/view.timeline.cell.axisDates"],function(t,e,i,a,n,s,r,d){function c(t){return"cell-view-"+t.dataItem.x+t.dataItem.y}var o=n.extend({init:function(e,i,a,n,s,c,o){this._busEvents=c,this._viewMetricsFactory=o,e.onYAxisUpdated.add(this._updateAxisPlannerPosition,this),this._cellPlanner=new d,this._tracks=new r(s.timelineWidth,this._busEvents),this._debouncedUpdateCardCascade=t.debounce(this._tracks.updateCardCascade.bind(this._tracks),1),this._cardMetricsConverter=new l(i),this._super(e,i,a,n,s)},refresh:function(){this._tracks=new r(this._renderConfig.timelineWidth,this._busEvents),this._super()},_createTimelineCard:function(t,e){t.onPlannedDatesUpdating.add(this._busEvents.hintHide.fire,this._busEvents.hintHide),t.onPlannedDatesUpdated.add(function(){this._busEvents.cardUnselect.fire(e.$dom())},this);var i=this._viewMetricsFactory.create(t);return i.onUpdated.add(this._debouncedUpdateCardCascade,this),new s(t,e,this._cardMetricsConverter,i)},_createCard:function(t){return this._cards[t.id]=this._createTimelineCard(t,this._super(t)),this._cards[t.id]},_createCardFromDom:function(t,e){return this._cards[t.id]=this._createTimelineCard(t,this._super(t,e)),this._cards[t.id]},_createCellContent:function(){t.each(this._cellModel.getVisibleCardModels(),function(t){var e=this._createCard(t);this._addCardToDom(e,{})},this);var e=this._tracks.$content();return this._tracks.setContainer(this._$cell),e},_appendCellContent:function(t,e){this._super(t,e);var i=this._cellModel.getYAxisDataRange();this._$cell.closest(".i-role-cellholder").append(this._cellPlanner.render(i.data?i.data.name:null)),this._updateAxisPlannerPosition(i)},_addCardToDom:function(t,e){this._tracks.addCard(t,e)},_completeUpdateOperation:function(t){return this._tracks.updateCardCascade(),this._super(t)
},_clearCards:function(t){this._super(t),this._tracks.updateCardCascade()},moveCardIn:function(t,e){if(!this._cards[t.data("id")]){t.detach();var i=t.data("data-item");i.data={cardData:t.data("card-data")};var a=this._cellModel.moveCardIn(i),n=new h(this._$cell),s=this._createCardFromDom(a,t),r=new _(s._viewMetrics,n,e.at);this._addCardToDom(s,e),r.edit({pageX:e.at.x}),t.on("drag."+c(this._cellModel),r.edit.bind(r))}},clearCardArtifacts:function(t){var e=t.data("id");this._getCard(e).clearArtifacts(),delete this._cards[e],this._cellModel.moveCardOut(e),t.off("."+c(this._cellModel))},moveCardOut:function(t){this.clearCardArtifacts(t)},unlockAllTrackCards:function(){this._tracks.unlockAllCards()},_updateAxisPlannerPosition:function(e){var i=this._viewMetricsFactory.create({cardData:t.constant(e),onPlannedDatesUpdating:t.Callbacks()});this._cellPlanner.setCoords(i.planned)},createPlaceholderContent:e.noop}),l=i.extend({init:function(t){this._$container=t},toRelative:function(t){return t/this._$container.width()}}),h=i.extend({init:function(t){this._$container=t,this._offset=this._$container.offset(),this._maxOffset={left:t.outerWidth()-3,top:t.outerHeight()}},toRelative:function(t){return Math.min(t-this._offset.left,this._maxOffset.left)/this._$container.width()}}),_=i.extend({init:function(t,e,i){this._viewMetrics=t,this._cardMetricsConverter=e;var a=this._cardMetricsConverter.toRelative(i.x);this._applyEdit(a)},edit:function(t){var e=this._cardMetricsConverter.toRelative(t.pageX);this._applyEdit(e)},_applyEdit:function(t){var e=this._viewMetrics.planned.to-this._viewMetrics.planned.from;this._viewMetrics.applyEdit(t,t+e)}});return o});
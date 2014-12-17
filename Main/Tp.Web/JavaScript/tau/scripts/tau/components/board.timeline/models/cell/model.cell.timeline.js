define(["Underscore","jQuery","tau/components/board.timeline/models/cell/model.cell.base","tau/utils/utils.date","tau/utils/timeline/utils.timeline.date-range","tau/components/board.timeline/models/card/model.timeline.durable-card","tau/components/board.timeline/models/card/model.timeline.fixed-card"],function(e,t,a,n,i,d,s){var r=a.extend({init:function(t,a,n,i){if(!t)throw new Error("definition is not defined");if(!a)throw new Error("dataItem is not defined");if(!n)throw new Error("timelineRangeModel is not defined");this.onYAxisUpdated=e.Callbacks(),this._yAxisModel=i||l,this._yAxisModel.onAxisUpdated.add(this._fireYAxisDataUpdated,this),this.isTimeline=!0,this.timelineRangeModel=n,this.onMovePlannedDates=e.Callbacks(),this._super(t,a)},_createCardModel:function(e){var t=e.fixedDatePlan?new s(e,this.timelineRangeModel):new d(e,this.timelineRangeModel);return t.onPlannedDatesUpdated.add(this.movePlannedDates,this),t},_fireYAxisDataUpdated:function(e){this.onYAxisUpdated.fire(this.processRawCardItem(e.card.data))},getYAxisDataRange:function(){return this.processRawCardItem(this._yAxisModel.getAxisCellItem(this.dataItem.y))},_processFixedSection:function(e){e.fixedDate=o(e.plannedStartDate),this.timelineRangeModel.isInRange(e.fixedDate,e.fixedDate)&&(e.showFixed=!0)},_processActualSection:function(e){e.inProgress=e.inProgress||!e.actualEndDate,e.actualEndDate=o(e.actualEndDate,n.getServerNow(),e.inProgress),e.actualStartDate=o(e.actualStartDate,e.actualEndDate);var t=e.actualStartDateBoundToPlannedStartDate?e.actualStartDate<e.actualEndDate:!0;this.timelineRangeModel.isInRange(e.actualStartDate,e.actualEndDate)&&t&&(e.showActual=!0)},_processPlannedSection:function(e){e.plannedEndDate=o(e.plannedEndDate),e.plannedStartDate=o(e.plannedStartDate),this.timelineRangeModel.isInRange(e.plannedStartDate,e.plannedEndDate)&&(e.showPlanned=!0)},_processForecastSection:function(e){e.forecastStartDate=n.getServerNow(),e.forecastEndDate=o(e.forecastEndDate,n.getServerNow());var t=e.hasActual&&e.hasPlanned&&e.plannedEndDate<e.forecastStartDate;
(t||this.timelineRangeModel.isInRange(e.forecastStartDate,e.forecastEndDate))&&(e.showForecast=!0)},processRawCardItem:function(t){return e.extend(t,{showActual:!1,showPlanned:!1,showForecast:!1,showFixed:!1}),t.fixedDatePlan&&t.plannedStartDate&&this._processFixedSection(t),t.hasActual&&(t.actualStartDate||t.actualEndDate)&&this._processActualSection(t),t.hasPlanned&&t.plannedStartDate&&t.plannedEndDate&&this._processPlannedSection(t),t.forecastEndDate&&this._processForecastSection(t),t.isVisible=t.showFixed||t.showActual||t.showPlanned||t.showForecast,t},extendUnfinishedCardsToNow:function(t){return e.chain(this.getVisibleCardModels()).filter(function(e){return e.isUnfinished()}).each(this._reprocessCardModel,this).tap(function(e){!t&&e.length&&this.onCardsUpdated.fire(e,{suspendAnimation:!0,metricsOnly:!0})}.bind(this)).value()},updateCardsPositions:function(){var t=this.getVisibleCardModels();e.each(this.getCardModels().range(),this._reprocessCardModel,this);var a=this.getVisibleCardModels(),n=e.difference(a,t),i=e.difference(t,a);this.extendUnfinishedCardsToNow(!0),this.onCardsCleared.fire(e.pluck(i,"id")),this.onCardsAdded.fire(n,{suspendAnimation:!0}),this.onCardsUpdated.fire(a,{suspendAnimation:!0,metricsOnly:!0}),this.onYAxisUpdated.fire(this.getYAxisDataRange())},addCard:function(e,t){e=this.processRawCardItem(e);var a=this._createCardModel(e);this._checkIfCardCanBeAdded(a)&&(this._cardModels.insert(a),e.isVisible&&(this.onCardsAdded.fire([a],t),this.extendUnfinishedCardsToNow(!1)))},_reprocessCardModel:function(e){var t=this.processRawCardItem(e.cardData());e.update(t)},getVisibleCardModels:function(){return e.filter(this._cardModels.range(),function(e){return e._cardData.isVisible})},updateCard:function(e,t){e=this.processRawCardItem(e);var a=this._cardModels.get(e.id);a?a.update(e):this._cardModels.insert(this._createCardModel(e)),e.isVisible?(this.onCardsUpdated.fire([this._cardModels.get(e.id)],t),this.extendUnfinishedCardsToNow(!1)):this.onCardsCleared.fire([e.id])
},updateForecasts:function(t){var a=e.chain(t).map(function(t){var a=this._cardModels.get(t.id);if(a){var n=e.extend({},a.cardData(),t.data);return a.update(this.processRawCardItem(n)),a}},this).compact().value();this.onCardsUpdated.fire(a,{suspendAnimation:!0,metricsOnly:!0})},movePlannedDates:function(t){var a=this,n={id:t.id,onError:function(){t.rollbackEdit()},onSuccess:function(){var n=e.pick(this,"plannedStartDate","plannedEndDate");a.updateCard(e.extend({},t.cardData(),n),{suspendAnimation:!0})}},i=t.plannedRange();null!==i.from&&(n.plannedStartDate=this.timelineRangeModel.serializeDate(i.from)),null!==i.to&&(n.plannedEndDate=this.timelineRangeModel.serializeDate(i.to)),this.onMovePlannedDates.fire(n)},_checkIfCardCanBeAdded:function(e){var t=e.cardData();return(this.timelineRangeModel.isInRange(t.actualStartDate,t.actualEndDate)||this.timelineRangeModel.isInRange(t.plannedStartDate,t.plannedEndDate))&&this._super(e)},getMoveParameters:function(e){return e.forEach(function(e){if(this._cardBeingEdited){var t=this._cardBeingEdited.cardData();e.position={plannedStartDate:this.timelineRangeModel.serializeDate(t.plannedStartDate),plannedEndDate:this.timelineRangeModel.serializeDate(t.plannedEndDate)}}}.bind(this)),e},moveCardIn:function(t){var a=this.timelineRangeModel.getCorrespondingDateRange({from:0,to:.3}),n={isVisible:!0,plannedStartDate:a.startDate,plannedEndDate:a.endDate,showPlanned:!0};return this._cardBeingEdited=this._createCardModel(e.extend(n,t)),this._cardBeingEdited},moveCardOut:function(){this._cardBeingEdited=null}}),o=function(t,a,i){return t=i?a:t||a,e.isString(t)?n._convertToServerTime(n.parse(t)):t},l={onAxisUpdated:e.Callbacks(),getAxisCellItem:function(){return{}}};return r});
define(["Underscore","jQuery","tau/components/extensions/component.extension.base"],function(_,$,ComponentExtensionBase){return ComponentExtensionBase.extend({"bus afterRender":function(evt){this._$element=evt.data.element,this._data=evt.data.data,this._render()},_render:function(){this._createFlowIndicators(),this._connectMarkers(),this.fire("stateProgressRendered")},_createFlowIndicators:function(){var $historyItems=this._$element.find(".tau-historyGrid .tau-historyItem");_.each(this._data.historyItems,function(historyItemData,index){this._markProgressStep($historyItems.eq(index),historyItemData)},this)},_getHistoryItemStateIndex:function(historyItemState){return _.indexOf(this._data.entityStates,historyItemState)},_getFlowType:function(historyItemData){var flowType="NORMAL";return historyItemData.state.isFinal?flowType="DONE":this._isUnderImpediment(historyItemData)?flowType="IMPEDIMENT":historyItemData.transitions>1&&(flowType="MULTITRANS"),flowType},_isUnderImpediment:function(historyItem){var underImpediment=_.any(this._getImpedimentRangeList(),function(impedimentRange){return this._isInImpedimentRange(historyItem,impedimentRange)},this);return underImpediment},_getImpedimentRangeList:function(){if(!this._impedimentRangeList){this._impedimentRangeList=[];var allImpediments=this._getAllImpediments();_.each(allImpediments.opened,function(openedImpedimentDate,openedImpedimentId){this._impedimentRangeList.push({start:openedImpedimentDate,end:allImpediments.closed[openedImpedimentId]||Number.POSITIVE_INFINITY})},this),this._impedimentRangeList.sort(function(rangeA,rangeB){return rangeB.end-rangeB.start-(rangeA.end-rangeA.start)})}return this._impedimentRangeList},_getAllImpediments:function(){var allImpediments={opened:{},closed:{}};return _.each(this._data.historyItems,function(item){item.relatedEntities&&(_.each(item.relatedEntities.opened,function(openedEntity){this._isImpediment(openedEntity)&&(allImpediments.opened[openedEntity.id]=item.date)},this),_.each(item.relatedEntities.closed,function(closedEntity){this._isImpediment(closedEntity)&&(allImpediments.closed[closedEntity.id]=item.date)},this))},this),allImpediments},_isImpediment:function(entity){return entity.type.toLowerCase()=="impediment"},_isInImpedimentRange:function(historyItem,impedimentRange){return historyItem.date>=impedimentRange.start&&historyItem.date<=impedimentRange.end},_markProgressStep:function($historyItem,historyItemData){var historyItemStateIndex=this._getHistoryItemStateIndex(historyItemData.state.name),flowType=this._getFlowType(historyItemData),$flowIndicator=this._createFlowIndicator(flowType),dateSpan=historyItemData.state.dateSpan;dateSpan&&!historyItemData.state.isFinal&&$("<span/>").addClass("datespan").text(dateSpan).attr("title",dateSpan+" days in this state").appendTo($flowIndicator),$historyItem.find(".tau-progressSteps .tau-step:nth-child("+(historyItemStateIndex+1)+") .tau-marker").append($flowIndicator)},_createFlowIndicator:function(flowType){var $flow=$("<div/>").addClass("tau-flow");switch(flowType){case"NORMAL":$flow.addClass("tau-normal");break;case"MULTITRANS":$flow.addClass("tau-transitions");break;case"IMPEDIMENT":$flow.addClass("tau-impediment");break;case"DONE":$flow.addClass("tau-done")}return $flow},_connectMarkers:function(){_.each(this._data.historyItems,function(historyItemData,historyItemIndex){var historyItemStateIndex=this._getHistoryItemStateIndex(historyItemData.state.name);this._connect(historyItemIndex,historyItemStateIndex,historyItemIndex-1,"in"),this._connect(historyItemIndex,historyItemStateIndex,historyItemIndex+1,"out")},this)},_connect:function(historyItemIndex,historyItemStateIndex,altHistoryItemIndex,connectionType){var altHistoryItemData=this._data.historyItems[altHistoryItemIndex];if(altHistoryItemData){var altHistoryItemStateIndex=this._getHistoryItemStateIndex(altHistoryItemData.state.name),indexDelta=historyItemStateIndex-altHistoryItemStateIndex;indexDelta>0&&this._$element.find(".tau-historyGrid .tau-historyItem").eq(historyItemIndex).find(".tau-progressSteps .tau-step").filter(function(index){return index>=altHistoryItemStateIndex+1&&index<=historyItemStateIndex}).find(".tau-marker").addClass("tau-"+connectionType)}}})})
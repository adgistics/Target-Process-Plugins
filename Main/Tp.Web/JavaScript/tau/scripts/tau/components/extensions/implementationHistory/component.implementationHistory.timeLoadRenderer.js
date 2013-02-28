define(["Underscore","jQuery","tau/components/extensions/component.extension.base"],function(_,$,ComponentExtensionBase){return ComponentExtensionBase.extend({"bus afterRender":function(evt){this._$element=evt.data.element,this._data=evt.data.data,this._render()},_render:function(){if(this._timeLoadWasReported()){var maxSpentTime=this._calculateMaxSpentTime(),$historyItems=this._$element.find(".tau-historyGrid td.tau-historyItem");_.each(this._data.historyItems,function(historyItem,index){var actualSpentTime=historyItem.spentTime,$timeLoadIndicator=$historyItems.eq(index).find(".tau-date"),relatedSpentTime=this._calculateRelatedRoundedSpentTime(maxSpentTime,actualSpentTime);if(!isNaN(relatedSpentTime)){var title=$timeLoadIndicator.attr("title");$timeLoadIndicator.addClass("tau-timeLoad-"+relatedSpentTime).attr("title",title+" ("+actualSpentTime+" hours)")}},this)}},_timeLoadWasReported:function(){return _.any(this._data.historyItems,function(historyItem){return historyItem.spentTime>0})},_calculateMaxSpentTime:function(){return _.max(this._data.historyItems,function(historyItem){return historyItem.spentTime}).spentTime},_calculateRelatedRoundedSpentTime:function(maxSpentTime,actualSpentTime){var relatedValue=actualSpentTime*100/maxSpentTime,roundedValue=Math.round(relatedValue/10)*10;return roundedValue}})})
define(["Underscore","jQuery"],function(_,$){var setPosition=function(e){var $axisHeader=$(e.delegateTarget),$flyPanel=this;$flyPanel.css("position","absolute"),$flyPanel.appendTo($axisHeader);var dimension=$axisHeader.data("dimension"),padding=2;dimension==="y"?($flyPanel.css("top",$axisHeader.height()-$flyPanel.height()-2*padding),$flyPanel.css("left",padding)):dimension==="x"&&($flyPanel.css("top",padding),$flyPanel.css("left",$axisHeader.width()-$flyPanel.width()-2*padding))};return function(domWrapper,settings){var isActivatedMode=!1,activatedScope,lastScopeCoordinate,sharedState=null,$buttonPanel=settings.$buttonPanel;$buttonPanel.hide();var $button=$buttonPanel.find(".tau-btn"),$target=domWrapper.getAxesHeaders(),predicateAddAction=function(dimension){var location=dimension.toLowerCase();return _.find(settings.items,function(itemData){var dataLocation=itemData.location,matchLocation=dataLocation.toLowerCase()===location;if(matchLocation){var hasAddAction=_.find(itemData.fixed.items,function(item){return item.type==="AddAction"});if(hasAddAction)return!0}return!1})},createEventHandler=function(eventFlag,callback){return function(e){var $node=$(e.delegateTarget),d=$node.data(),action=predicateAddAction(d.dimension);return lastScopeCoordinate=eventFlag+"_"+d.dimension,!isActivatedMode&&action?callback(e,{actionItems:action}):{}}},onClickHandler=function(){if(sharedState){isActivatedMode=!0,activatedScope=lastScopeCoordinate;var o={data:sharedState,deactivate:function(){isActivatedMode=!1,activatedScope!==lastScopeCoordinate&&$buttonPanel.hide()}};settings.onActivate(o)}};$button.click(onClickHandler);var showButtonPanel=_.throttle(function(){if(!sharedState)return;$buttonPanel.show()},500),hideButtonPanel=function(){$buttonPanel.hide()},activatePanel=function(e,obj){return sharedState=obj,setPosition.call($buttonPanel,e),showButtonPanel(),{buttonIsVisible:!0}},deactivatePanel=function(){sharedState=null,hideButtonPanel()},doubleClick=_.debounce(function(event){($(event.target).hasClass("i-role-cellholder")||$(event.target).hasClass("i-role-cell"))&&createEventHandler("enter",activatePanel)(event).buttonIsVisible&&$button.click()},300);$target.on("mouseenter",createEventHandler("enter",activatePanel)),$target.on("mouseleave",createEventHandler("leave",deactivatePanel)),$target.on("dblclick",doubleClick)}})
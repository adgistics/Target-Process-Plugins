define(["Underscore","jQuery","tau/components/extensions/component.extension.base","tau/ui/behaviour/common/ui.behaviour.listSelectable"],function(_,$,ExtensionBase){return ExtensionBase.extend({"bus afterRender":function(evt){var $element=evt.data.element,$list=$element.find("[role=list]"),$listPlaceholder=$element.find("[role=list-placeholder]");this.$list=$list,this.$listPlaceholder=$listPlaceholder,this.first=!0,this.$listPlaceholder.listSelectable({items:"[role=option]",className:"tau-result-list-row_hover",inner:"table",keyboardManager:this.config.context.configurator.getKeyBoardManager()}),this.attachScrollingEvents($listPlaceholder),this.attachSortingEvents($element.find("[role=list-sorting]")),this.setScrollAvailable(!1),this._signUpOnActionsAndSelection($element)},"bus result.ready":function(evt){var index=this.$listPlaceholder.data("listSelectable")._index;this.$listPlaceholder.listSelectable("disable");var self=this,$list=this.$list,result=evt.data.data.result,template=this.config.templateList,$newList=template.get().bind(this.config,result);result.paging.start==0&&($list.empty(),index=-1,result.paging.count==0&&this.$listPlaceholder.toggleClass("tau-finder__result_state_empty",!0)),this.setScrollAvailable(result.paging.hasNext),$newList.find("[role=option]").appendTo($list),this.$listPlaceholder.toggleClass("tau-finder__result_state_loading",!1),result.paging.count>0&&this.$listPlaceholder.toggleClass("tau-finder__result_state_empty",!1),this.$listPlaceholder.listSelectable("enable",{saveScroll:!0}),this.$listPlaceholder.data("listSelectable")._index=index,this.first&&(setTimeout(function(){self.$listPlaceholder.scrollTop(0)},100),this.first=!1)},"bus scroll.reachEnd":function(evt){this.scrollAvailable&&this.bus.fire("search.pagingBound")},setScrollAvailable:function(value){this.scrollAvailable=value},attachScrollingEvents:function($list){var self=this,_handler=function(evt){$list.scrollTop()+$list.innerHeight()>=$list[0].scrollHeight&&self.bus.fire("scroll.reachEnd")};$list.scroll(_handler)},attachSortingEvents:function($header){var $buttons=$header.find("[role=sorting]"),self=this;$header.delegate("[role=sorting]","click",function(){var $button=$(this),dir="desc";$button.hasClass("tau-finder__sorttrigger_dir_"+dir)&&(dir="asc"),$buttons.toggleClass("tau-finder__sorttrigger_dir_desc",!1),$buttons.toggleClass("tau-finder__sorttrigger_dir_asc",!1),$buttons.toggleClass("tau-finder__sorttrigger_state_active",!1),$button.toggleClass("tau-finder__sorttrigger_dir_"+dir,!0),$button.toggleClass("tau-finder__sorttrigger_state_active",!0);var value=$button.val();self.bus.fire("search.orderBound",{value:value,dir:dir})})},_signUpOnActionsAndSelection:function($element){var self=this;$element.delegate("[role=option]","click",function(evt){var $option=$(this),data=$option.data();if(!data)return;if(!data.tmplItem)return;data=data.tmplItem.data;if(!data)return;self.bus.fire("entitySelected",{entity:data})})}})})
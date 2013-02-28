define(["Underscore","jQuery","tau/components/extensions/component.extension.base"],function(_,$,ExtensionBase){return ExtensionBase.extend({name:"extension.list.prioritize",category:"edit","bus afterRender":function(evt){var $el=evt.data.element,self=this;this.$el=$el,$el.addClass("tau-list__sortable__true");var $groups=$el.find("[role=group]");$groups.addClass("tau-list__group_sortable_true");var params={sensitivity:7,speed:12};this.config.context.configurator.getConfig("isPopup",!1)&&(params={sensitivity:20,speed:30}),$groups.addClass("tau-list__group_available_true"),$groups.sortable({scroll:!0,scrollSensitivity:params.sensitivity,scrollSpeed:params.speed,cursor:"move",connectWith:".tau-list__group_available_true[role=group]",items:".tau-list__list [role=item]",dropOnEmpty:!0,handle:"[role=sortable-handler]",forcePlaceholderSize:!0,placeholder:{element:function($el){var $placeholder=$('<li class="tau-list__list__item tau-list__sortable-placeholder ui-sortable-placeholder"></li>');return $placeholder.height(50),$placeholder},update:function(container,p){return}},helper:function(e,$tr){var $helper=$tr;return $helper}});var refreshPositionsOnMouseMove=function(){$(this).data("sortable").refreshPositions()};$el.mousedown(function(){$groups.bind("mousemove",refreshPositionsOnMouseMove)}),$el.mouseup(function(){$groups.unbind("mousemove",refreshPositionsOnMouseMove)}),$groups.bind("sortstart",function(event,ui){self.started=!0;var $item=ui.item,itemData=$item.data("tmplItem").data||{},$group=$(event.currentTarget);$group.addClass("tau-list__group_sortover_true"),self.$group=$group;var groupData=$group.data("tmplItem")?$group.data("tmplItem").data:{};self.fire("prioritize.start",{item:itemData,group:groupData})}),$groups.bind("sortstop",function(event,ui){$groups.addClass("tau-list__group_available_true"),$groups.removeClass("tau-list__group_available_false"),$groups.removeClass("tau-list__group_sortover_true")}),$groups.bind("sortupdate",function(event,ui){if(!self.started)return;self.started=!1;var $row=ui.item,$prev=$row.prev("[role=item]"),$next=$row.next("[role=item]"),itemData=$row.data("tmplItem").data||{},prevData=$prev.length?$prev.data("tmplItem").data:{},nextData=$next.length?$next.data("tmplItem").data:{},$targetGroup=$row.parents("[role=group]:first"),groupData=$targetGroup.data("tmplItem")||null;groupData=groupData?groupData.data:null;var isCollapsed=$targetGroup.hasClass("tau-list__group_collapsed_true");$targetGroup.addClass("i-target");var $prevGroup=$(this),prevGroupData=$prevGroup.data("tmplItem")||null;prevGroupData=prevGroupData?prevGroupData.data:null,self.fire("prioritize.checkAvailability",{$item:$row,$prevGroup:$prevGroup,$targetGroup:$targetGroup,item:itemData,prev:prevData,next:nextData,group:groupData,prevGroup:prevGroupData,isCollapsed:isCollapsed})}),$groups.bind("sortchange",function(event,ui){var $group=$groups.find(".tau-list__sortable-placeholder").parents("[role=group]:first");$group.length==1&&$group.hasClass("tau-list__group_sortover_true")==0&&($groups.removeClass("tau-list__group_sortover_true"),$group.addClass("tau-list__group_sortover_true"))});var _newArrange=function(event,i,a,hardRefresh){a?$(a[0]).find(".tau-list__list").append(this.placeholder[0]):i.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?i.item[0]:i.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var self=this,counter=this.counter;window.setTimeout(function(){counter==self.counter&&self.refreshPositions(!hardRefresh)},0)};$groups.each(function(){var $group=$(this);$group.data("sortable")._rearrange=_newArrange})},"bus prioritize.checkAvailability":function(e){this.bus.fire("prioritize.isAvailable.default",{})},"bus prioritize.checkAvailability+prioritize.isNotAvailable":function(e){this.bus.fire("refresh")},"bus prioritize.checkAvailability+prioritize.isAvailable.default+prioritize.isAvailable.comment":function(e){var data=e["prioritize.checkAvailability"].data;this.fire("positionUpdated",data)},"bus prioritize.updateGroupsAvailability":function(e){var data=e.data,availableGroupsData=data.groups,self=this,$groups=this.$el.find("[role=group]");if($groups.length<=1||$groups.length==availableGroupsData.length){$groups.addClass("tau-list__group_available_true").removeClass("tau-list__group_available_false"),this.$group.sortable("refresh");return}var targetGroups=_.filter($groups.toArray(),function(group){var groupData=$(group).data("tmplItem").data;return _.any(availableGroupsData,function(configGroup){return groupData===configGroup})}),$targetGroups=$(targetGroups);$groups.addClass("tau-list__group_available_false").removeClass("tau-list__group_available_true"),$targetGroups.removeClass("tau-list__group_available_false").addClass("tau-list__group_available_true"),this.$group.sortable("refresh")},"bus beforeUpdate":function(){this.$el.find(".i-target [role=counter]").css("backgroundColor","#ffefd5")},"bus afterUpdate":function(evt){this.$el.find("[role=group]").each(function(){$(this).find("[role=counter]").text($(this).find("[role=item]").length)}),this.$el.find(".i-target [role=counter]").animate({backgroundColor:"#ffffff"},200),this.$el.find(".i-target").removeClass("i-target");var item=evt.data.changedItem,$row=this.$el.find(".i-item-"+item.id),$item=$row.parents("[role=item]:first"),itemData=$item.data("tmplItem").data;_.extend(itemData,item);if(this.$el.find("[role=group]").length>1){var className="tau-list__table__row_isfinalstate_true";itemData.entityState&&$row.toggleClass(className,!!itemData.entityState.isFinal)}}})})
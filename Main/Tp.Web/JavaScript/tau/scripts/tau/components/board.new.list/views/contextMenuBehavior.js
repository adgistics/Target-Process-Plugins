define(["jQuery","Underscore","tau/core/class","tau/ui/extensions/ui.context-menu","tau/ui/extensions/board.plus/card-context-menu/menu-action-open-new-tab","tau/ui/extensions/board.plus/card-context-menu/menu-action-item-delete"],function(t,e,n,o,i,s){return n.extend({cardMenuActionActivatedCssClass:"i-role-permanent-context-menu-action-activated",init:function(t){this.options={bus:t.componentBus,sliceReady:t.modelSettings.listSettings.apiService,configurator:t.configurator,activationCssClass:this.cardMenuActionActivatedCssClass,propertiesToEvict:[]},this.context=t.skeletonView.$el},attach:function(){var t={context:this.context,handlers:{open:new i(this.options),sep1:"---------",del:new s(this.options)},showSelectors:[".tau-board-list-view .i-role-card:not(.tau-axis-card-no-value, .tau-axis-card-no-view, .tau-elems-cell-no-value)"],skipShowSelectors:[".tau-id",".tau-bubble *"],onShow:function(t){t.$menu.addClass("tau-newlist-context-menu")}};this.contextMenu=new o(t)},destroy:function(){this.contextMenu.destroy(),this.contextMenu=null,this.context=null,this.options=null}})});
define(["Underscore","jQuery","tau/core/class","tau/components/board.new.list/extensions/model.new.list.quick.add","tau/components/board.new.list/models/node.modification.strategies"],function(t,e,i,o,n){return i.extend({_optionDefaults:{positionConfig:{collision:"fit flipfit"}},init:function(e,i,o,n){this._bus=e,this._configurator=i,this._eventAggregator=o,this._options=t.defaults(n||{},this._optionDefaults)},createQuickAddComponent:function(t,e){var i=t,n=e.getRoot().getExpansionState(!0),a=this.onAfterAdd.bind(this,e),d={type:"board.cell.quick.add",QuickAddModel:o,options:{slice:e._apiService,path:e.hierarchy.getPath(),types:e.quickAddModel.data.types,expansionState:n,onAfterAdd:a,shouldSkipNotification:this._isContextEntity.bind(this,e)}},r={type:"bubble.container",visible:!0,children:[d],options:{target:i,stackName:"quickAdd",zIndex:1e4,within:i.closest(".i-role-board-body"),dontCloseSelectors:["#ui-datepicker-div"],onShow:function(){i.parent().addClass("tau-quick-add_expand")},onHide:function(){i.parent().removeClass("tau-quick-add_expand"),i.tauBubble("destroy")},onPositionConfig:function(t){var e=i.tauBubble("widget").height()<i.offset().top;return{my:e?"left bottom":"left top",at:e?"left-30 top":"left-30 bottom",of:i,within:t.within,collision:this._options.positionConfig.collision}}.bind(this),onArrowPositionConfig:function(t,e){var o={my:"center top",at:"center bottom",of:i,within:t.within,collision:"fit flipfit"};return"bottom"===e&&(o.my="center bottom",o.at="center top"),o}.bind(this)},componentsConfig:{components:[d]}};this._configurator.getComponentBuilder().createAsChild(r,this._bus).then(function(t){t.fire("initialize",{context:{configurator:this._configurator}}),t.fire("view.dom.ready"),t.fire("$trigger.ready",i)}.bind(this))},onAfterAdd:function(e,i){t.each(i.data,function(t){if(this._isContextEntity(e,t))this._updateContext(t.path,t.dataItem);else{var i=this._getNodeModelByPath(e,t.path);i&&i.nodes&&n.regular.addCard(i,t.dataItem)}},this)},_getNodeModelByPath:function(t,e){var i=t.getRoot();
return i.hierarchy.findNodeByPath(e)},_isContextEntity:function(t,e){var i=this._getNodeModelByPath(t,e.path);if(!i||!i.nodes)return!1;var o=e.dataItem.type;return!i.nodes.isCellLevel()&&("Project"===o||"Team"===o)},_updateContext:function(t,e){var i=this._configurator.getAppStateStore(),o=this._configurator.getApplicationContextService();o.appendToContext(e.type,[e.data.cardData.id],i).then(function(){this._eventAggregator.itemAddedToContext.fire({cardId:e.id,hierarchyPath:t})}.bind(this))}})});
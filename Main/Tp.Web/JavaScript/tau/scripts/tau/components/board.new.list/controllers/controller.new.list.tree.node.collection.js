define(["jQuery","Underscore","tau/core/controller.base","tau/components/board.new.list/controllers/controller.new.list.paging","tau/components/board.new.list/controllers/controller.new.list.editor"],function(e,t,i,n,d){var o=i.extend({init:function(e,t,i,n,d,o,a,s){this._model=e,this._treeModel=i,this._view=t,this._eventAggregator=n,this._editorComponentBuilder=d,this._quickAddComponentBuilder=o,this._configurator=a,this._modelSettings=s,this._initSubscriptions(this._model,this._view)},_initSubscriptions:function(e,i){e.applyAndObserve(function(e){e.nodeCollectionCreated.add(function(){this._addChildCollectionController(e)}.bind(this)),e.modelReset.add(function(){this._view.removeChildTreeNodeView(e.card.id),this._view.updateHeaderExpansionState()}.bind(this))}.bind(this)),e.duplicateNodesRemoved.add(function(e){this._view.removeCardsSilent(e)}.bind(this)),e.nodesAdded.add(function(e){i.appendNodes(e)}),e.cardUpdated.add(function(e){t.each(e.properties,function(t,n){i.updateCardUnit(e.card,n,t)}),i.updateCardFinalState(e.card.id,e.card.entity.isFinal||e.card.entity.isInPast)}),e.cardDeleted.add(function(e){i.removeCard(e.card),this._eventAggregator.cardRemoved.fire(e)}.bind(this)),e.cardMoved.add(function(e){i.moveCard(e.card,e.index)}),e.cardAdded.add(function(t){i.addCard(e,t.card,t.index)}),e.cardAdded.once(function(){i.calculateColumnWidths()}),i.expansionStateToggled.add(this._onExpansionStateToggled.bind(this)),i.collapseAllClicked.add(this._onCollapseAllClicked.bind(this)),i.openCardDetailsClicked.add(this._onOpenCardDetailsClicked.bind(this))},startLifeCycle:function(){return this._view.renderTree().then(this._onNodeExpanded.bind(this,{node:this._treeModel})).then(this._initChildControllers.bind(this)).then(function(){var e=new n(this._view.createPagingView(),this._treeModel,this._configurator);e.startLifeCycle();var t=new d(this._view.createEditorView(),this._treeModel,this._editorComponentBuilder,this._configurator);t.startLifeCycle(),this._view.createCountsView(this._treeModel.countsModel),this._view.createQuickAddView(this._treeModel.quickAddModel),this._view.quickAddView.showQuickAddClicked.add(this._onShowQuickAddClicked.bind(this))
}.bind(this))},_initChildControllers:function(){var i=t.reduce(this._model.items,function(e,t){return t.getIsExpanded()&&e.push(this._addChildCollectionController(t)),e},[],this);return e.when.all(i)},_onOpenCardDetailsClicked:function(e){this._eventAggregator.entityDetailsViewRequested.fire(e)},_onShowQuickAddClicked:function(e){this._quickAddComponentBuilder.createQuickAddComponent(e.target,this._treeModel)},_onExpansionStateToggled:function(e){var t,i,n=this._treeModel.hierarchy.findChildByCardId(e);n.getIsExpanded()?(t=this._collapseNode,i="collapse"):(t=this._expandNode,i="expand"),t.call(this,n),taus.track({action:i,cardType:n.card.type,tags:["newlist"]})},_expandNode:function(e){var i=function(t){t.isLoading||e.loadingStatusChanged.remove(i),this._view.toggleNodeExpansionProgress(e.card.id,t.isLoading)}.bind(this);e.loadingStatusChanged.add(i);var n=t.uniqueId("statistics_newlist_expand");taus.start("statistics_newlist_expand",{},n),this._calculateColumnWidthsWhenNodeIsExpanded(e),e.expand().then(function(){taus.stop(n,{cardType:e.card.type,cardsCount:e.getCardsCount(),levelType:e.parent.hierarchyMetaInfo.levelType})}.bind(this)).then(function(){this._eventAggregator.expansionStateChanged.fire(this._treeModel.getRoot().getExpansionState(!1))}.bind(this))},_calculateColumnWidthsWhenNodeIsExpanded:function(e){e.nodeCollectionCreated.once(function(){var i=t.range(e.level+1,e.hierarchyMetaInfo.totalLevelCount);this._view.skeleton.calculateColumnWidthsForMultipleLevels(i,!0)},this)},_onCollapseAllClicked:function(){var e=t.filter(this._model.items,function(e){return e.getIsExpanded()});t.each(e,this._collapseNode,this),taus.track({action:"collapseAll",tags:["newlist"]})},_collapseNode:function(e){this.removeNode(e),this._modelSettings.listSettings.apiService.treeViewCollapse({$set:{path:e.hierarchy.getPath()}}),this._eventAggregator.expansionStateChanged.fire(this._treeModel.getRoot().getExpansionState(!1))},removeNode:function(e){e.collapse(),e.pagingModel.reset(),this._view.removeChildTreeNodeView(e.card.id),this._view.updateHeaderExpansionState()
},_onNodeExpanded:function(e){e.node.card&&this._view.parentView.setExpandedStateForCardId(e.node.card.id),this._view.parentView&&this._view.parentView.updateHeaderExpansionState()},_addChildCollectionController:function(e){var t=new o(e.nodes,this._view.createTreeView(e.nodes),e,this._eventAggregator,this._editorComponentBuilder,this._quickAddComponentBuilder,this._configurator,this._modelSettings);return t.startLifeCycle()}});return o});
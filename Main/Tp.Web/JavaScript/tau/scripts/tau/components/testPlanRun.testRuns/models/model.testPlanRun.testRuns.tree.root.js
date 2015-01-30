define(["require","Underscore","jQuery","tau/components/board.new.list/models/model.new.list.tree.root","./model.testPlanRun.testRuns.tree.node","tau/components/testPlanRun.testRuns/testPlanRuns.testRuns.data.workflow.wait"],function(t){var e=t("Underscore"),n=t("jQuery"),s=t("tau/components/board.new.list/models/model.new.list.tree.root"),a=t("./model.testPlanRun.testRuns.tree.node"),i=t("tau/components/testPlanRun.testRuns/testPlanRuns.testRuns.data.workflow.wait");return s.extend({init:function(){this._super.apply(this,arguments),this._dataWorkflowWait=new i},executeSubTreeDataWorkflow:function(t){var e=n.Deferred();return this._dataWorkflowWait.then(function(){return this.loadingStatusChanged.fire({isLoading:!0}),n.when(t.call(this,this._apiService)).then(this._handleResponseSubTree.bind(this)).always(function(t){return this.loadingStatusChanged.fire({isLoading:!1}),t}.bind(this)).done(e.resolve.bind(e)).fail(function(t){if(e.reject(t),t)throw t})}.bind(this)),e.promise()},insertSubTree:function(t){return this._handleTreeResponse(t.tree.nodes,t.tree.meta).then(function(){this.pagingModel.setCurrentPage(t.skipped/t.taken),this._updatePagingState(),this.countsModel.loadData(),this.quickAddModel.loadData()}.bind(this))},_handleResponseSubTree:function(t){var n=t.data.subtree;if(n&&!n.isEmpty){var s,a;return e.isEmpty(n.path)?s=this:(s=this.hierarchy.findNodeByPath(n.path),a=s.card?s.card.type:void 0),s.insertSubTree(n,a).then(function(){return this.updateExpansionState(),t}.bind(this))}return t},_getNodeConstructor:function(){return a},_executeTreeDataWorkflow:function(t){return this._dataWorkflowWait.start(),this._super(t).always(this._dataWorkflowWait.stop.bind(this._dataWorkflowWait))}})});
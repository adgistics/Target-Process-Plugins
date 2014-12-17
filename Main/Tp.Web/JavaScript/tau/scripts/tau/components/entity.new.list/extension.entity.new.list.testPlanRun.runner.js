define(["require","Underscore","jQuery","tau/core/extension.base","tau/components/entity.new.list/entity.new.list.integration.facade","./model.entity.new.list.testPlanRun.runner","./view.entity.new.list.testPlanRun.runner"],function(e){var n=e("Underscore"),i=e("jQuery"),t=e("tau/core/extension.base"),s=e("tau/components/entity.new.list/entity.new.list.integration.facade"),r=e("./model.entity.new.list.testPlanRun.runner"),u=e("./view.entity.new.list.testPlanRun.runner");return t.extend({init:function(e){this._super(e),this._config=e,this._uiReady=i.Deferred(),this._sliceApi={},this._runnerModel=this._config.context.registry.runnerModel,this._newListFacade=new s(this._config.newList.model,this._config.newList.view),this._newListRunnerModel=new r(this._newListFacade,this._config.context.entity),this._newListRunnerView=new u(this._newListFacade),this._initSubscriptions()},_initSubscriptions:function(){this._runnerModel.nextRun.add(this._runNext,this),this._runnerModel.nextRun.add(this._newListRunnerModel.runNext,this._newListRunnerModel),this._newListRunnerModel.nextRun.add(this._newListRunnerView.runNext,this._newListRunnerView),this._newListRunnerView.nextViewed.add(this._viewNext,this),this._runnerModel.finished.add(this._runFinished,this)},_runNext:function(){this._shouldBeRefreshed()&&this.fire("refresh")},_viewNext:function(e){this._uiReady.done(this.fire.bind(this,"new.list.open.card.details.view",n.extend(e,{scrollToCard:!0})))},_runFinished:function(){this.fire("new.list.close.card.details.view")},_shouldBeRefreshed:function(){var e=this._sliceApi.currentOrderingConfig;return e&&e.ordering},"bus slice.ready":function(e,n){this._sliceApi=n.slice},"bus overview.board.ready:last + container.show.completed":function(){this._uiReady.resolve()},"bus container.hide.completed":function(){this._uiReady=i.Deferred()},"bus destroy":function(){this._runnerModel.nextRun.remove(this._runNext,this),this._runnerModel.nextRun.remove(this._newListRunnerModel.runNext,this._newListRunnerModel),this._newListRunnerModel.nextRun.remove(this._newListRunnerView.runNext,this._newListRunnerView),this._newListRunnerView.nextViewed.remove(this._viewNext,this),this._runnerModel.finished.remove(this._runFinished,this),this._newListRunnerView.destroy(),this._newListRunnerModel.destroy(),this._newListFacade.destroy()
}})});
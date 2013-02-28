define(["tp/plugins/commandGateway","jQuery"],function(commandGateway,$){function BugsRepository(){this.commandGateway=new commandGateway({pluginName:"Bugzilla"})}return BugsRepository.prototype={store:new Array,getBugs:function(bugs,success){this.commandGateway.execute("GetBugzillaBugs",bugs,$.proxy(this._onGetBugsSuccess(success),this))},_onGetBugsSuccess:function(success){return function(data){this.store=data,success(data)}},getBugInfo:function(bugId){return this._getBugFromStore(bugId)},_getBugFromStore:function(bugId){return $.grep(this.store,function(bug){return bug.TpId===bugId})[0]}},new BugsRepository})
define(["Underscore","tau/core/model-base","tau/core/event"],function(_,ModelBase){var baseModel=ModelBase.extend({category:"store operations","bus commitTransaction":function(evtArgs){var transaction=this.transaction||this.store;delete this.transaction,transaction.done(evtArgs.data)},"bus get":function(evtArgs){var transaction=this.transaction=this.transaction||this.store,data=evtArgs.data||{};this.transaction=transaction.get(data.type,data.query,data.callback)},"bus find":function(evtArgs){var transaction=this.transaction=this.transaction||this.store,data=evtArgs.data||{};this.transaction=transaction.find(data.type,data.query,data.callback)},destroy:function(){this._super.apply(this,arguments),this.destroy=function(){}}});return baseModel})
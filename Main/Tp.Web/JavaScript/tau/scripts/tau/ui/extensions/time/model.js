define(["Underscore","jQuery","tau/core/class","tau/core/event","tau/utils/utils.translation","tau/models/dataprocessor/model.processor.context"],function(t,e,i,n){return n.extend(i.extend({init:function(t,e,i){this.store=t,this.contextService=e,this.entity=i},load:function(){return this._loadTimes()},_loadTimes:function(){var t=e.Deferred();return this.store.get(this.entity.entityType.name,{id:this.entity.id,fields:["spent","remain"]}).done(function(e){this.spent=e[0].data.spent,this.remain=e[0].data.remain,t.resolve(this)}.bind(this)),t},saveTimes:function(t,e){return this.store.saveDef(this.entity.entityType.name,{$set:{id:this.entity.id,spent:t,remain:e}})}}))});
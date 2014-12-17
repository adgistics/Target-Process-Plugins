define(["Underscore","tau/core/class","tau/components/extensions/component.extension.base"],function(e,t,n){var i=t.extend({init:function(e){this.config=e},startListening:function(e){this.started&&this._stop(),this.started=this._start(e)},_start:function(){return!0},stopListening:function(){this.started&&(this._stop(),this.started=!1)},_stop:function(){this.config.store.unbind(this)}}),s=i.extend({_start:function(){return this.config.store.on({type:"relation",eventName:"afterSave",listener:this},this.config.callback),this.config.store.on({type:"relation",eventName:"afterRemove",listener:this},this.config.callback),this.config.globalBus.on("relation.items.added",this.config.callback,this),!0},_stop:function(){this.config.globalBus.removeAllListeners(this),this._super()}}),o=i.extend({_start:function(e){var t=e.entity.id,n=e.entity.entityType.name||"general";return this.config.store.on({type:n,eventName:"afterSave",hasChanges:["impediments"],filter:{id:t},listener:this},this.config.callback),this.config.store.on({type:"impediment",eventName:"afterSave",hasChanges:["assignable"],filter:{assignable:{id:t}},listener:this},this.config.callback),!0}}),a=n.extend({"bus beforeInit":function(t,n){this._fireChanged=e.debounce(function(){this.fire("relations.changed")},100),this.entity=n.config.context.entity,this.notifyDependencyType=n.config.dependencyType?this._getDependencyType(n.config.dependencyType):null,this._relationCreateListener=new s(this._createConfig({globalBus:n.config.context.configurator.getGlobalBus()})),this._impedimentCreateListener=new o(this._createConfig()),this._relationCreateListener.startListening({entity:this.entity}),this._impedimentCreateListener.startListening({entity:this.entity})},_createConfig:function(t){return e.defaults(t||{},{store:this.config.store,callback:this._entityChanged.bind(this)})},_getDependencyType:function(e){return"master"==e?"slave":"master"},_entityChanged:function(e){this._isRequireNotification(e)&&this._fireChanged()},_isRequireNotification:function(e){var t=e.data?e.data.changes||e.data.obj||e.data:null;
return!this.notifyDependencyType||t&&(this._notifyQuickAdd(t)||this._notifyImpedimentCreated(t)||this._notifyRelationCreated(t))},_notifyQuickAdd:function(e){return e.dependencyType&&this.notifyDependencyType==this._getDependencyType(e.dependencyType)},_notifyImpedimentCreated:function(e){return"slave"==this.notifyDependencyType&&e.assignable&&e.assignable.id==this.entity.id},_notifyRelationCreated:function(e){return e&&e[this.notifyDependencyType]&&e[this.notifyDependencyType].id==this.entity.id},"bus afterInit > destroy":function(){this._relationCreateListener.stopListening(),this._impedimentCreateListener.stopListening()}});return a.Listener=i,a});
define(["Underscore","tau/core/extension.base"],function(_,ModelBase){return ModelBase.extend({init:function(c){var ext=this;ext._super.apply(ext,arguments);var configurator=c.context.configurator,ssi=configurator.service("search");ext.refreshTrigger=function(){ext.fire("refresh")},ssi.onSubmit(ext.refreshTrigger),ext.destructor=function(){ssi.offSubmit(ext.refreshTrigger)}},destroy:function(){this.destructor(),this._super.apply(this,arguments)},"bus afterInit":function(e){var self=this,configurator=e.data.config.context.configurator,ssi=configurator.service("search"),params=ssi.params().get();ssi.search(params).done(function(r){self.fire("dataBind",r.data)})}})})
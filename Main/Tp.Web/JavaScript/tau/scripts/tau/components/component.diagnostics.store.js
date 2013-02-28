define(["jQuery","Underscore","tau/configurator","tau/core/bus.reg","tau/components/component.creator","tau/ui/templates/diagnostics/ui.template.diagnostics.store","tau/components/extensions/diagnostics/extension.diagnostics.base"],function($,_,conf,reg,creator,template,ExtBase){return{create:function(config){var ext=ExtBase.extend({_getData:function(){this.startMonitoringWithOutRefresh();var count=0,events=_.values(conf.getProxy().__subscriptions),listeners={};return _.each(events,function(v){if(_.isObject(v)){var inEvents=_.values(v);_.each(inEvents,function(z){if(_.isObject(z)){var values=_(z).values();_.each(values,function(sub){var key=sub.config.eventName+"["+sub.config.type+"]";listeners.hasOwnProperty(key)||(listeners[key]={name:key,items:[]});var name="unknown";sub.config.listener&&sub.config.listener.name&&(name=sub.config.listener.name),sub.config.listener&&sub.config.listener.bus&&sub.config.listener.bus.name&&(name=sub.config.listener.bus.name),listeners[key].items.push({name:name,sub:sub})})}})}}),{data:_.values(listeners)}},_onDetailsClick:function(){var item=$(this).tmplItem().data.sub;console.log(item.callback.toString()),console.log(item)},_signUpOnClick:function(args){$(".tau-store-listener",args.data.element).click(this._onDetailsClick)},"bus elementRefreshedWithData":function(args){this._signUpOnClick(args)},"bus afterRender":function(args){this._signUpOnClick(args)}}),creatorConfig={extensions:[ext],template:template};return creator.create(creatorConfig,config)}}})
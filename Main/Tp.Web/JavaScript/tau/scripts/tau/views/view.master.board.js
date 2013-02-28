define(["Underscore","tau/core/view-base","tau/components/component.board.container","tau/configurations/board.container.config"],function(_,ViewBase,ContainerComponent,PageConfig){return ViewBase.extend({init:function(config){this._super(config)},initialize:function(){},"bus view.dom.ready":function(e){this.container.fire("view.dom.ready",e.data)},"bus beforeInit + boardSettings.ready":function(e,initConfig,bs){var self=this,config=initConfig.config,boardSettings=bs,configurator=initConfig.config.context.configurator,pageConfig=new PageConfig(configurator),containerConfig=_.extend(config,pageConfig.getMasterConfig()),c=self.container=ContainerComponent.create({name:"board page container",layout:containerConfig.layout,template:containerConfig.template,store:config.store,extensions:_.union([],containerConfig.extensions||[]),context:config.context});c.on("afterInit",self["container afterInit"],self),c.on("afterRender",self["container afterRender"],self),c.on("componentsCreated",self["container componentsCreated"],self),c.fire("boardSettings.ready",boardSettings),self.fire("component.ready",c),c.initialize(containerConfig)},"bus component.ready:last > boardSettings.ready":function(e){var component=e["component.ready"].data,boardSettings=e["boardSettings.ready"].data;component.fire("boardSettings.ready",boardSettings)},"container afterInit":function(evt){this.fireAfterInit()},"container componentsCreated":function(evt){this.fire(evt.name,evt.data)},"container afterRender":function(evt){this.fireBeforeRender(),this.element=evt.data.element,this.fireAfterRender()},lifeCycleCleanUp:function(){this.destroyContainer(),this._super()},destroyContainer:function(){if(!this.container)return;this.container.destroy(),this.container=null},destroy:function(){this.destroyContainer(),this._super()}})})
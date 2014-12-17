define(["Underscore","jQuery","tau/core/view-base","tau/components/component.container","tau/configurations/reports.container.config"],function(e,t,n,i,o){return n.extend({init:function(e){this._super(e)},initialize:function(){},"bus beforeInit":function(){var t=this,n=t.config,r=new o(n),s=t.config.context.configurator;s.getTitleManager().setTitle("Report");var a=s.getHistory();setTimeout(e.bind(function(){a.reset(),a.setCurrent({id:0,url:"#reports/"+this.config.reportType,title:r.getReportNameByKey(this.config.reportType)})},this),1);var c=s.getBoardSettingsFactory().createComponentSettings({id:"reports"});t.config.context.componentSettings=c;var f=e.extend(n,r.getConfig()),u=t.container=i.create({name:"board page container",layout:f.layout,template:f.template,extensions:e.union([],f.extensions||[]),context:n.context}),p=function(e){s.setConfig("states",e),u.on("afterInit",t["container afterInit"],t),u.on("afterRender",t["container afterRender"],t),u.on("componentsCreated",t["container componentsCreated"],t),u.initialize(f)};this.processStates().done(function(e){p(e)}),c.unbind({listener:t,callback:t.onStateChanged}),c.bind({fields:["reports"],listener:t,callback:function(e){a.updateCurrent({url:"#reports/"+e.reports,title:r.getReportNameByKey(e.reports)})}})},"container afterInit":function(){this.fireAfterInit()},"container componentsCreated":function(e){this.fire(e.name,e.data)},"container afterRender":function(e){this.fireBeforeRender(),this.element=e.data.element,e.data.element.addClass("tau-page-entity"),this.fireAfterRender()},lifeCycleCleanUp:function(){this.destroyContainer(),this._super()},processStates:function(){var e=this.config.reportType,n=this.config.context.componentSettings,i=t.Deferred();return e?n.set({set:{reports:e},callback:function(e){i.resolve(e)}}):n.get({fields:["reports"],callback:function(e){i.resolve(e)}}),i},destroyContainer:function(){this.container&&(this.container.destroy(),this.container=null)},destroy:function(){this.config.context.componentSettings.unbind({listener:this}),this.destroyContainer(),this._super()
}})});
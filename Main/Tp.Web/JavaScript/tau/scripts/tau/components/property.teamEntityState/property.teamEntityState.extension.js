define(["require","tau/core/extension.base","./property.teamEntityState.service","./property.teamEntityState.model","./property.teamEntityState.controller"],function(t){var e=t("tau/core/extension.base"),r=t("./property.teamEntityState.service"),n=t("./property.teamEntityState.model"),o=t("./property.teamEntityState.controller"),i=e.extend({init:function(t){this._super(t),this._controller=null},"bus beforeInit":function(t,e){var i=e.config.context,a=i.configurator,l=new r(a.getStore(),a.getStore2(),a.service("errorBar")),s=new n(l,i.entity);this._controller=new o(s,this._getWorkflowData(i)),this._controller.initialDataRetrieved.then(this.fire.bind(this,"dataBind"),this.fire.bind(this,"dataBind",null))},_getWorkflowData:function(t){var e=t.getLoggedUser().isAdministrator;return{canSetup:e,url:e?this._getWorkflowSetupUrl(t):null}},_getWorkflowSetupUrl:function(t){return t.configurator.getUrlBuilder().getWorkflowSetupPage(t.getProcessId(),t.entity.entityType.name.toLowerCase())},"bus dataBind + afterRender":function(t,e,r){e&&this._controller.render(r.element[0],e)},destroy:function(){this._controller.destroy(),this._super()}});return i});
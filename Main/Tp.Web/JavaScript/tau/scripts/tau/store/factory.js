define(["app.path","tau/core/class","tau/store/store","tau/store/repository","tau/store/services/service.rest","tau/core/global.bus","tau/rules/core","tau/rules/rule.auto-include-before-save","tau/rules/rule.auto-action-after-save","tau/rules/rule.auto-include-before-remove","tau/target.process.rules.registrator","tau/store/types","tau/store/db","tau/store/types.targetprocess"],function(AppPath,Class,store,Repository,restService,globalBus,RulesEngine,autoIncludeBeforeSaveRule,autoActionAfterSaveRule,autoActionAfterBeforeRemove,rulesRegistrator,tauTypes,Db,types){var instanceDB=null;return Class.extend({rulesDisabled:!1,clearSingles:function(){instanceDB=null,this.rulesEngine&&(this.rulesEngine.destroy&&this.rulesEngine.destroy(),delete this.rulesEngine),delete this.proxy,delete this.service,delete this.store},clear:function(){this.clearSingles(),delete this.initialData,delete this.appPath,delete this.rulesDisabled},setApplicationPath:function(appPath){if(this.appPath===appPath)return;this.appPath=appPath},getApplicationPath:function(){if(!this.appPath){var path=AppPath.get();return path}return this.appPath},setInitialData:function(data){this.initialData=data},setService:function(service){if(this.service===service)return;this.clearSingles(),this.service=service},getService:function(){return this.service||(this.service=new restService({appPath:this.getApplicationPath(),path:this.getRestPath()})),this.service},getRestPath:function(){return this.getApplicationPath()+"/api/v1"},getDb:function(){return instanceDB||(instanceDB=new Db({types:tauTypes.getDictionary()})),instanceDB},setProxy:function(proxy){this.proxy=proxy},getProxy:function(){return this.proxy||(this.proxy=new Repository({db:this.getDb(),service:this.getService()})),this.initialData&&(this.proxy.registerData(this.initialData),delete this.initialData),this.proxy},disableRules:function(){this.rulesDisabled=!0},enableRules:function(){this.rulesDisabled=!1},initRules:function(services){if(this.rulesDisabled===!0)return;this.rulesEngine=new RulesEngine({store:this.store,rules:[],rulesImpl:[autoIncludeBeforeSaveRule,autoActionAfterSaveRule,autoActionAfterBeforeRemove]}),rulesRegistrator.registerRules(this.rulesEngine,services)},getStore:function(config){return config=config||{},this.store||(config.proxy=this.getProxy(),_.defaults(config,{eventEmitter:globalBus.get()}),this.store=new store(config),this.initRules(config.services)),this.store},setStore:function(store){this.store=store}})})
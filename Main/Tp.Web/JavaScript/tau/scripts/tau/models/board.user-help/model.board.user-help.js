define(["Underscore","jQuery","tau/core/extension.base","app.path"],function(e,t,r,i){return r.extend({"bus afterInit":function(r,n){var o=n.config.context.configurator,c=o.getHelpScenarioService(),s=c.getScenarios(),a=t.Deferred();o.getApplicationContextService().getApplicationContext({projectIds:e.compact(e.pluck(s,"requiredProject")),teamIds:[]},{success:a.resolve}),a.done(e.bind(function(r){var n=i.get().toLowerCase().replace("http://","").replace("https://",""),a=e.filter(s,function(e){return c.checkScenarioPrerequisites(r,e)});this.fire("dataBind",{flows:a,queryString:t.param({host:n,userId:o.getLoggedUser().id,sid:taus.sid,origin:"User guide popup"})})},this))}})});
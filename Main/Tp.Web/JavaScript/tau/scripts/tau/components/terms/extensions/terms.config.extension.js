define(["require","tau/core/extension.base","tau/core/injector","jsx!./../views/terms.list.item.view","tau/services/service.terms.api","tau/components/terms/models/terms.model","tau/core/termProcessor"],function(e){var r=e("tau/core/extension.base"),s=e("tau/core/injector"),t=e("jsx!./../views/terms.list.item.view"),o=e("tau/services/service.terms.api"),i=e("tau/components/terms/models/terms.model"),c=e("tau/core/termProcessor");return r.extend({"bus afterInit":function(e,r){var n=r.config,m=n.context.configurator,a=new s,u=new o({configurator:m}),d=new c,v=new i(u,n.processId),f={model:v,serviceScope:a,processId:n.processId};a.register("termsBus",this.bus),a.register("termProcessor",d),a.register("termsListItem",a.createModule(t)),this.fire("terms.config.ready",f)}})});
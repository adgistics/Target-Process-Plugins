define(["Underscore","jQuery","tau/core/extension.base"],function(e,n,t){return t.extend({"bus afterInit:last + afterRender:last + public.relationsReady.filtered":function(t,i,r,a){var o=e.map(a[i.config.dependencyType],function(e){return e.relation.id});r.element.find("tr").each(function(){var t=n(this),i=parseInt(t.data("relation-id")),r=e.contains(o,i);r?t.show():t.hide()})},"bus public.relationsReady":function(){this.fire("refresh")}})});
define(["Underscore","jQuery","tau/core/class"],function(t,n,e){return e.extend({init:function(t){this._configurator=t.configurator},showEntityViewSilent:function(t){return this._showEntityView("cardDataToShowSilent.ready",t)},showEntityView:function(t){return this._showEntityView("cardDataToShow.ready",t)},_showEntityView:function(t,e){var i=n.Deferred();return this._configurator.getComponentBusRegistry().getByName("entityViewer").done(function(n){i.always(function(){n.unbind(i)}),n.on("application.error",i.reject,i),n.on("application.contentRendered",i.resolve,i),n.fire(t,e)}.bind(this)),i}})});
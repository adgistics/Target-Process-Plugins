define(["Underscore","jQuery","tau/core/extension.base","tau/ui/extensions/card.viewer.progress.indicators"],function(e,t,i,a){return i.extend({init:function(e){this.progressIndicators=new a,this._super(e)},"bus configurator.ready":function(e,t){var i=this;t.getComponentBusRegistry().getByName("entityViewer").done(function(e){i.fire("viewerBus.ready",e)})},"bus viewerBus.ready + $el.ready + configurator.ready:last":function(i,a,r,n){a.on("application.error",e.bind(function(e){this.fire("view.cardDetails.lastResult",{type:"error",data:e.data})},this)),a.on("application.contentRendered",e.bind(function(e){this.fire("view.cardDetails.lastResult",{type:"loaded",data:e.data})},this)),r.on("dblclick",".i-role-card",e.bind(function(e){var i=t(e.currentTarget),r=i.data();taus.track({action:"clipboard view card",tags:["clipboard","view card",r.entityType]}),n.getBoardCacheService().setData(r.cardData),this.progressIndicators.show(i,{hover:!0}),a.fire("cardDataToShowSilent.ready",r)},this)),r.on("mousedown",".tau-id",function(e){e.stopPropagation()})},"bus view.cardDetails.lastResult":function(){this.progressIndicators.hideAll()}})});
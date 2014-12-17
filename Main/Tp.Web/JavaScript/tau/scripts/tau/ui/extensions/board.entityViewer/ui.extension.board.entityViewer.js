define(["Underscore","jQuery","tau/core/extension.base","tau/configurations/const.page.entity.actions"],function(e,t,a,r){return a.extend({"bus configurator.ready":function(t,a){var r=this,n=a.getRequireLoader();n(["all.components"],function(){n(["tau/components/component.application"],function(t){var n=a.createChild();n._id=e.uniqueId("board_entityViewer_"),n.isBoardEdition=!0,r.fire("appData.ready",{component:t,configurator:n})})})},"bus afterRender":function(){var e=t("body");e.tauProgressIndicator(),this.fire("$progressIndicator.ready",e)},"bus appData.ready":function(e,t){var a=t.configurator,r=t.component;a.getHashService().setFakeWindow();var n=this,o={name:"viewer",context:{configurator:a},options:{applicationId:"boardEntityViewerPopup",integration:{showInCoverView:!0,keepAlive:!0},routing:{silent:!0,executeOnStart:!1},comet:{enabled:!0}}},i=r.create(o);i.on("application.error",function(e){n.fire("error",e.data),n.fire("application.error",e.data)}),i.on("contentRendered",function(e){n.fire("application.contentRendered",e.data)}),i.initialize(o),n.fire("appBus.ready",i)},"bus appData.ready:last + appBus.ready:last + cardDataToShowSilent.ready":function(e,t,a,n){this.showCard(t,a,n,r.SILENT)},"bus appData.ready:last + appBus.ready:last + cardDataToShow.ready":function(e,t,a,r){this.showCard(t,a,r)},"bus appBus.error":function(e,t){this.fire("error",t)},"bus appBus.ready + destroy":function(e,t){t.destroy()},showCard:function(e,t,a,r){var n=e.configurator;return a.entityId&&a.entityType?(this.cleanupStore(n),t.fire("history.reset"),void t.fire("application.navigate.entity",{id:a.entityId,entity:a.entityType,action:r})):void console.error("bad data for viewer",a)},cleanupStore:function(e){e.getStore().evictData()}})});
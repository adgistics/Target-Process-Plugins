define(["require","tau/core/extension.base","libs/react/react-ex","jsx!./../views/board.menu.view"],function(e){var n=e("tau/core/extension.base"),i=e("libs/react/react-ex"),r=e("jsx!./../views/board.menu.view");return n.extend({"bus afterInit":function(){this.fire("dataBind")},"bus board.menu.config.ready":function(e,n){var t=i.resolveClass(n.serviceScope,r,{model:n.model,viewMenuSections:n.model.viewMenuSections}),o=i.renderComponent(t,n.element);this.fire("_board.menu.main.view",o)}})});
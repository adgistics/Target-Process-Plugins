define(["require","tau/core/class","tau/ui/templates/board.page/ui.template.board.page.container","tau/ui/templates/board.plus/ui.template.boardplus.container","tau/ui/extensions/board.page/ui.extension.board.page.collapser","tau/ui/extensions/board.container/ui.extension.board.container.editMode","tau/ui/extensions/board.container/ui.extension.board.container.viewMode","tau/ui/extensions/board.container/ui.extension.board.container.clearSelection","tau/components/board.changelog/extensions/ui.extension.board.changelog.checker","tau/components/extensions/error/extension.errorBar","tau/ui/extensions/ui.extension.board.listeners","tau/components/component.board.main.menu","tau/components/component.container","tau/components/component.global.context.control","tau/components/component.board.clear.sample.data","tau/components/component.board.collapser.aside","tau/components/component.board.general.quick.add","tau/components/component.board.clipboard","tau/components/component.board.entityViewer","tau/components/component.board.toolbar","tau/components/component.board.editor.container","tau/components/component.board.plus.container","tau/components/component.board.plus","tau/components/component.board.plus.list","tau/components/component.board.new.list","tau/components/component.board.plus.timeline","tau/components/component.side.menu.switcher","tau/components/component.board.menu"],function(e){var o=e("tau/core/class"),n=e("tau/ui/templates/board.page/ui.template.board.page.container"),t=e("tau/ui/templates/board.plus/ui.template.boardplus.container"),a=e("tau/ui/extensions/board.page/ui.extension.board.page.collapser"),r=e("tau/ui/extensions/board.container/ui.extension.board.container.editMode"),i=e("tau/ui/extensions/board.container/ui.extension.board.container.viewMode"),s=e("tau/ui/extensions/board.container/ui.extension.board.container.clearSelection"),c=e("tau/components/board.changelog/extensions/ui.extension.board.changelog.checker"),p=e("tau/components/extensions/error/extension.errorBar"),d=e("tau/ui/extensions/ui.extension.board.listeners");
return e("tau/components/component.board.main.menu"),e("tau/components/component.container"),e("tau/components/component.global.context.control"),e("tau/components/component.board.clear.sample.data"),e("tau/components/component.board.collapser.aside"),e("tau/components/component.board.general.quick.add"),e("tau/components/component.board.clipboard"),e("tau/components/component.board.entityViewer"),e("tau/components/component.board.toolbar"),e("tau/components/component.board.editor.container"),e("tau/components/component.board.plus.container"),e("tau/components/component.board.plus"),e("tau/components/component.board.plus.list"),e("tau/components/component.board.new.list"),e("tau/components/component.board.plus.timeline"),e("tau/components/component.side.menu.switcher"),e("tau/components/component.board.menu"),o.extend({init:function(e){this.configurator=e},getMasterConfig:function(){var e={layout:"selectable",template:n,extensions:[a,s],children:[{name:"board main menu",type:"board.main.menu",selector:"[role=header]"},{type:"container",selector:"[role=header]",useAnimation:!1,extensions:[c,p]},{type:"global.context.control",selector:"[role=header]"},{type:"board.clear.sample.data",name:"board.clear.sample.data",selector:"[role=header]"},{type:"board.collapser.aside",name:"board.collapser.aside",selector:"[role=aside]"},{name:"board general quick add",type:"board.general.quick.add",selector:"[role=aside]"},{type:"board.clipboard",selector:"[role=main]",options:{refreshTimeout:300}},{type:"board.entityViewer",name:"entityViewer",selector:"[role=main]"}]};return e.children=e.children.concat(this._getAsideMenuComponents()),e},getPageBoardConfig:function(){return{type:"board.container",selector:"[role=main]",layout:"list",template:t,extensions:[r,d],children:[{type:"board.toolbar",label:"board_toolbar",min:1,max:6,defaultValue:3,extensions:[i]},{type:"board.editor.container",layout:"selectable",label:"board_editor_container",visible:!1,spinner:!1,useAnimation:!1},{type:"board.plus.container",spinner:!1,children:[{name:"board_plus",viewMode:"board",type:"board.plus",options:{dragndrop:{containmentRefreshTimeout:400}}},{name:"board_plus",viewMode:"list",type:"board.plus.list",options:{dragndrop:{containmentRefreshTimeout:400}}},{name:"newlist",viewMode:"newlist",type:"board.new.list",options:{dragndrop:{containmentRefreshTimeout:400}}},{name:"board_plus",viewMode:"timeline",type:"board.plus.timeline",options:{dragndrop:{containmentRefreshTimeout:400}}}]}]}
},_getAsideMenuComponents:function(){var e,o=this.configurator.getFeaturesService();return e=o.isEnabled("process.setup")&&this.configurator.getLoggedUser().isAdministrator?"side.menu.switcher":"board.menu",{type:e,selector:"[role=aside]"}}})});
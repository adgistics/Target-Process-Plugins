define(["tau/components/component.creator","tau/models/model.menu.actions","tau/models/model.menu.testPlanRun","tau/models/model.menu.testPlanRun.union","tau/components/extensions/menu/extension.menu.actions","tau/components/extensions/error/extension.errorBar","tau/ui/templates/menu/ui.template.menu.actions"],function(a,b,c,d,e,f,g){return{create:function(h){h.eventNamesCommon={dataBind:"dataBind.common"},h.eventNamesSpecial={dataBind:"dataBind.special"};var i={extensions:[b,c,d,e,f],template:h.template||g};return a.create(i,h)}}})
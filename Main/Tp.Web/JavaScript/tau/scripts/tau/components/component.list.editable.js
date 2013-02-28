define(["Underscore","tau/components/component.list","tau/ui/templates/list_/grid.entity/ui.template.list.grid.entity","tau/ui/extensions/list/extension.list.editable.progress","tau/views/view.compositeControl"],function(_,ComponentListFactory,listGridEntityTemplate,ExtensionEditableProgress,ViewCompositeControl){return{create:function(config){return config=_(config).defaults({ViewType:ViewCompositeControl,template:config.template||listGridEntityTemplate,extensions:[],dependencies:["title","property.severity","property.priority","property.relationType","property.entityState","assignmentsList","property.effort","entity.actions","progressBar.small","property.release","property.responsible","property.iteration","property.build","property.build.testPlanRun","property.lastStatus","property.lastRunDate.list","property.status.testCaseRun","property.endDate","property.endDate.list","property.role","property.role.modern","steps","success","menu.testPlanRun"]}),config.extensions.push(ExtensionEditableProgress),ComponentListFactory.create(config)}}})
define(["tau/components/component.property","tau/ui/templates/property/ui.template.property.modern"],function(Component,Template){return{create:function(config){return config.propertyName="role",config.editable=config.context.getLoggedUser().isAdministrator,config.displayField="name",config.valueField="id",config.alignElementSelector=".i-role-property",config.showUrl=!1,config.targetElementSelector=".i-role-property",config.stackName="role",config.applyBubbleClasses=!1,config.editorComponentConfig={type:"state-list",listType:"role",expandable:!0,showEmptyDataMessage:!0,defaultValueLabel:"current",fullModeLabel:"show all"},config.template=Template,Component.create(config)}}})
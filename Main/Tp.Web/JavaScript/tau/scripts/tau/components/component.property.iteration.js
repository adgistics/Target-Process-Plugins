define(["tau/components/component.property"],function(PropertyComponent){return{create:function(config){return config.propertyName="iteration",config.showUrl=!0,config.alignElementSelector=".property-text",config.editorComponentConfig={type:"state-list",listType:"iteration",maxHeight:200,filter:!0,expandable:!0,showEmptyDataMessage:!0,clearValueLabel:"backlog",defaultValueLabel:"current",fullModeLabel:"show old"},PropertyComponent.create(config)}}})
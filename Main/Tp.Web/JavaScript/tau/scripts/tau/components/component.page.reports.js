define(["tau/components/component.page.base","tau/views/view.page.reports"],function(BaseCreator,ViewType){return{create:function(componentContext){var componentConfig={name:"reports page component",turnOffErrorEmiter:!0,extensions:[],ViewType:ViewType};return BaseCreator.create(componentConfig,componentContext)}}})
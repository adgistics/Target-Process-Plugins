define(["tau/components/component.property.date"],function(creator){return{create:function(config){return config=_.clone(config||{}),config.propertyName="lastRunDate",config.editable=!1,config.format="datetime",creator.create(config)}}})
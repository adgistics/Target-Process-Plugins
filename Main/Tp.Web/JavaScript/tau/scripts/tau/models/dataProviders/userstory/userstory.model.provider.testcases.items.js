define(["Underscore","tau/models/dataProviders/model.provider.items.base","tau/utils/utils.date","tau/configurator"],function(a,b,c,d){return b.extend({fetch:function(a){this._fetch("testCases","testCase","priority",a)},_convertData:function(b){return b=this._super(b),a.sortBy(b,function(a){var b=a.numericPriority||0;return b})},_createDetailCommand:function(a){var b={};return b[a]=["id","name","tags","lastStatus","lastRunDate","steps","success","numericPriority"],b},_convertItem:function(a){var b=this,e=d.getApplicationPath(),f={id:a.id,__type:a.__type,name:a.name,tags:[],lastStatus:a.lastStatus?"passed":"failed",lastRunDate:c.format.datetime.short(a.lastRunDate),steps:a.steps,success:a.success,numericPriority:a.numericPriority};return f}})})
define(["Underscore","tau/models/finder/model.assignable.search"],function(_,ModelBase){return ModelBase.extend({init:function(config){var self=this;self._super(config),delete self.properties.release,delete self.properties.iteration,delete self.properties.state,delete self.properties.priority;var idStatement=function($query,propertyName,value){var v=_(self.properties.type.autoCompleteValues).select(function(v){return v.name.indexOf(value.toLowerCase())>=0});$query.hasOwnProperty(propertyName)||($query[propertyName]={id:{$in:[0]}}),_.each(v,function(r){$query[propertyName].id.$in.push(r.id)})};self.properties.type={name:"entityType",autoCompletable:!0,statement:idStatement,autoCompleteValues:[{id:2,name:self.terms.resolve("release")},{id:3,name:self.terms.resolve("iteration")},{id:4,name:self.terms.resolve("story")},{id:5,name:self.terms.resolve("task")},{id:8,name:self.terms.resolve("bug")},{id:9,name:self.terms.resolve("feature")},{id:11,name:self.terms.resolve("build")},{id:12,name:self.terms.resolve("test case")},{id:13,name:self.terms.resolve("test plan")},{id:14,name:self.terms.resolve("test run")},{id:16,name:self.terms.resolve("impediment")},{id:17,name:self.terms.resolve("request")},{id:21,name:self.terms.resolve("solution")}]}},getInitialQueryConfig:function(){return{$skip:0,$limit:20,$query:{}}},getInitialQueryString:function(){return""},getType:function(){return"general"}})})
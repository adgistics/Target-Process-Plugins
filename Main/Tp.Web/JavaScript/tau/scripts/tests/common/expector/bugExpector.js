define([],function(){function bugExpector(testContext){this.testContext=testContext}return bugExpector.prototype={update:function(filter,data,callbackData){var store=this.testContext.store,updateStub=function(criteria,data,callbacks){return callbacks.success.call(callbacks.scope,callbackData),store};this.testContext.Bug.expects().update(Like.is(filter),Like.is(data),TypeOf.isA(Object)).andStub(updateStub)},findOne:function(filter,callbackData){var store=this.testContext.store,findOne=function(criteria,callbacks){return callbacks.success.call(callbacks.scope,callbackData),store};this.testContext.Bug.expects().findOne(Like.is(filter),TypeOf.isA(Object)).andStub(findOne)},get:function(filter,callbackData){var store=this.testContext.store,innerGet=function(criteria,callbacks){return callbacks.success.call(callbacks.scope,callbackData),store};this.testContext.Bug.expects().get(Like.is(filter),TypeOf.isA(Object)).andStub(innerGet)}},bugExpector})
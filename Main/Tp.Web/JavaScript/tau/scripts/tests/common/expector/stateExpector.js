define(function(){function a(a){this.testContext=a}a.prototype={find:function(a,b){var c=this.testContext.store,d=function(a,d){d.success.call(d.scope,b);return c};this.testContext.states.expects().find(Like.is(a),TypeOf.isA(Object)).andStub(d)}};return a})
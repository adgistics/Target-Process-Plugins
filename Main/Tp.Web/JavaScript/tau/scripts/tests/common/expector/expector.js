define(["tests/common/expector/assignmentsExpector","tests/common/expector/bugExpector","tests/common/expector/stateExpector","tests/common/expector/storeExpector"],function(assignmentsExpector,bugExpector,stateExpector,storeExpector){function expector(testContext){this.testContext=testContext}return expector.prototype={bug:function(){return this.bugExpector||(this.bugExpector=new bugExpector(this.testContext)),this.bugExpector},bugs:function(){return this.bugExpector||(this.bugExpector=new bugExpector(this.testContext)),this.bugExpector},assignment:function(){return this.assignmentExpector||(this.assignmentExpector=new assignmentsExpector(this.testContext)),this.assignmentExpector},state:function(){return this.stateExpector||(this.stateExpector=new stateExpector(this.testContext)),this.stateExpector},store:function(){return this.storeExpector||(this.storeExpector=new storeExpector(this.testContext)),this.storeExpector}},expector})
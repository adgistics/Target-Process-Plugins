define(["jQuery","tau/components/component.property.iteration","tests/components/component.specs","tests/common/testData.Generator","tests/common/service.mock","tau/configurator","tests/components/common/common.setup"],function($,ComponentIteration,componentSpecs,TestDataGenerator,ServiceMock,configurator,commonSetup){var innerRun=function(){var testDataGenerator=new TestDataGenerator;testDataGenerator.initDefaultData();var data=testDataGenerator.getData(),projects=testDataGenerator.getProjects(),bugData=testDataGenerator.getBugs()[0],iterations=testDataGenerator.getIterations(),context={manualContext:!0,context:{entity:{entityType:{name:bugData.__type},id:bugData.id},applicationContext:{selectedProjects:[projects[0]],culture:{name:"en-US",timePattern:"g:i A",shortDateFormat:"M/d/yyyy",longDateFormat:"dddd, MMMM dd, yyyy",decimalSeparator:".",__type:"culture"},processes:testDataGenerator.getProcesses()}}},iteration=bugData.iteration,newIteration=iterations[4],setup=commonSetup.create("[component.iteration]",data,ComponentIteration,context),viewTests=[{name:"should render valid markup",test:function(){var $el=this.$el;equal($el.find(".property-text span").text(),iteration.name,"Release name"),equal($el.find("a").attr("href"),["#iteration",iteration.id].join("/"),"Iteration id")}},{name:"should change iteration",preSetup:function(){var service=this.service=new ServiceMock;configurator.setService(service)},test:function(){var $el=this.$el,$trigger=$el.find(".tau-property__value");$trigger.click();var bubbleList=$(".tau-bubble");equal(bubbleList.size(),1,"Count of bubbles");var newReleaseElement=bubbleList.eq(0).find('.drop-down-option:contains("'+newIteration.name+'")');this.service.registerSaveCommand({config:{$set:{iteration:{id:newIteration.id}},fields:["id",{release:["id","name"]}],id:bugData.id},returnedData:{id:bugData.id,iteration:{id:newIteration.id,name:newIteration.name}}}),equal(bubbleList.find(".action-link.clear").text(),"backlog","Backlog button is  available"),newReleaseElement.click(),equal(this.$el.find(".property-text span").text(),newIteration.name,"Release was changed"),this.service.verify()}}];componentSpecs.create(setup,context).viewShouldFollowBasicComponentLifeCycle().viewShouldPassTests(viewTests).done();var emptyBugData=testDataGenerator.getBugs()[1],emptyContext={manualContext:!0,context:{entity:{entityType:{name:emptyBugData.__type},id:emptyBugData.id},applicationContext:{selectedProjects:[projects[0]],culture:{name:"en-US",timePattern:"g:i A",shortDateFormat:"M/d/yyyy",longDateFormat:"dddd, MMMM dd, yyyy",decimalSeparator:".",__type:"culture"},processes:testDataGenerator.getProcesses()}}};testDataGenerator.clear(),testDataGenerator.initDefaultData(),testDataGenerator.removeBugsFromIteration();var dataForEmptyIteration=testDataGenerator.getData(),emptyIteration=commonSetup.create("[component.iteration] empty",dataForEmptyIteration,ComponentIteration,emptyContext);componentSpecs.create(emptyIteration,emptyContext).viewShouldFollowBasicComponentLifeCycle().viewShouldPassTests([{name:"should render valid markup for empty iteration",test:function(){var $el=this.$el;equal($el.find(".property-text").text(),"","Iteration name"),$el.find(".property-text").click();var bubbleList=$(".tau-bubble");equal(bubbleList.find(".action-link.clear").size(),0,"Backlog button is not available")}}]).done(),testDataGenerator.clear(),testDataGenerator.initDefaultData(),testDataGenerator.removeReleases(),testDataGenerator.removeBugsFromIteration(),testDataGenerator.removeIterations(),data=testDataGenerator.getData();var noIterationsSetup=commonSetup.create("[component.iteration] not iterations",data,ComponentIteration,emptyContext);componentSpecs.create(noIterationsSetup,emptyContext).viewShouldFollowBasicComponentLifeCycle().viewShouldPassTests([{name:"should show no releases found",test:function(){var $el=this.$el.find(".property-text");$el.click();var bubbleList=$(".tau-bubble");equal(bubbleList.find(".empty-message").text(),"No iterations found","Empty message is valid")}}]).done()};return{run:innerRun}})
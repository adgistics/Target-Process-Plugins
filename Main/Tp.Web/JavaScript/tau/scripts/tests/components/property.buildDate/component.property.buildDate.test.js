define(["jQuery","tau/configurator","tests/common/testCase","tests/common/componentConfigCreator","tau/components/component.property.buildDate","tests/common/testData.Generator"],function($,configurator,TestCase,ComponentConfigCreator,Component,TestDataGenerator){var innerRun=function(){var testDataGenerator=new TestDataGenerator;testDataGenerator.initDefaultData();var data=testDataGenerator.getData(),projects=testDataGenerator.getProjects(),entityData=testDataGenerator.getBuilds()[0],configCreator=new ComponentConfigCreator;configCreator.setEntityIDAndType(entityData.id,entityData.__type),configCreator.setSelectedProjects([data.selectByType("project")[0]]),configCreator.setProcesses(data.selectByType("process"));var config=configCreator.getConfig(),testCase=new TestCase("[component.property.buildDate]");config.editable=!0,testCase.initModule({componentConfig:config,data:data},Component),testCase.test("should render valid markup",function(){var $el=this.element}),testCase.test("should should change completionDate",function(){})};return{run:innerRun}})
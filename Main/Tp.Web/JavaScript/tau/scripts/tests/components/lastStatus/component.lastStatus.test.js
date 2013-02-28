define(["Underscore","jQuery","tau/configurator","tests/common/testCase","tests/common/componentConfigCreator","tau/components/component.property.lastStatus","tests/common/testData.Generator"],function(_,$,configurator,TestCase,ComponentConfigCreator,Component,TestDataGenerator){var innerRun=function(){var testDataGenerator=new TestDataGenerator;testDataGenerator.initDefaultData();var data=testDataGenerator.getData(),successTestCaseData=testDataGenerator.getTestCases()[0],failTestCaseData=testDataGenerator.getTestCases()[1],notRunTestCaseData=testDataGenerator.getTestCases()[2],configCreator=new ComponentConfigCreator;configCreator.setEntityIDAndType(successTestCaseData.id,successTestCaseData.__type);var selectedProjects=[data.selectByType("project")[0]];configCreator.setSelectedProjects(selectedProjects);var process=data.selectByType("process");configCreator.setProcesses(process);var passedConfig=configCreator.getConfig();configCreator=new ComponentConfigCreator,configCreator.setEntityIDAndType(failTestCaseData.id,failTestCaseData.__type),configCreator.setSelectedProjects(selectedProjects),configCreator.setProcesses(process);var failConfig=configCreator.getConfig();configCreator=new ComponentConfigCreator,configCreator.setEntityIDAndType(notRunTestCaseData.id,notRunTestCaseData.__type),configCreator.setSelectedProjects(selectedProjects),configCreator.setProcesses(process);var notRunConfig=configCreator.getConfig(),testCase=new TestCase("[component.lastStatus]");testCase.initModule({componentConfig:failConfig,data:data},Component),testCase.test("should render valid markup for success test case",function(){var $el=this.element;ok($el.find(".ui-status").hasClass("red"),"Has red class"),equal($el.find(".ui-status").text().trim(),"Failed","Passed")}),testCase.initModule({componentConfig:passedConfig,data:data},Component),testCase.test("should render valid markup for failed test case",function(){var $el=this.element;ok($el.find(".ui-status").hasClass("green"),"Has green class"),equal($el.find(".ui-status").text().trim(),"Passed","Passed")}),testCase.initModule({componentConfig:notRunConfig,data:data},Component),testCase.test("should render valid markup for not run test case",function(){var $el=this.element;ok(!$el.find(".ui-status").hasClass("green"),"Has not green class"),ok(!$el.find(".ui-status").hasClass("red"),"Has not red class"),equal($el.find(".ui-status").text().trim(),"","Not text")});var newConfig=_.clone(passedConfig)};return{run:innerRun}})
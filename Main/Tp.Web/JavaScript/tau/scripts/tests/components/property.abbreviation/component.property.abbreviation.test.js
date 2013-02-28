define(["jQuery","tau/configurator","tests/common/testCase","tests/common/componentConfigCreator","tau/components/component.property.abbreviation","tests/common/testData.Generator"],function($,configurator,TestCase,ComponentConfigCreator,Component,TestDataGenerator){var innerRun=function(){var testDataGenerator=new TestDataGenerator;testDataGenerator.initDefaultData();var data=testDataGenerator.getData(),projects=testDataGenerator.getProjects(),entityData=projects[1],configCreator=new ComponentConfigCreator;configCreator.setEntityIDAndType(entityData.id,entityData.__type),configCreator.setSelectedProjects([data.selectByType("project")[0]]),configCreator.setProcesses(data.selectByType("process"));var config=configCreator.getConfig(),testCase=new TestCase("[component.property.abbreviation]");config.editable=!0,testCase.initModule({componentConfig:config,data:data},Component),testCase.test("should render valid markup",function(){var $el=this.element;equal($el.find(".property-text").text(),"XZ","Project abbr")}),testCase.test("should allow change",function(){var $el=this.element,$valEl=$el.find(".property-text");$valEl.click(),this.serviceMock.registerSaveCommand({config:{$set:{abbreviation:"FCK"},fields:["id","abbreviation"],id:entityData.id},returnedData:{id:entityData.id,abbreviation:"FCK"}}),$valEl.focus(),$valEl.text("FCK"),$valEl.blur();var $el=this.element;equal($el.find(".property-text").text(),"FCK","Changed");var $valEl=$el.find(".property-text");ok($valEl.hasClass("ui-validationerror")==0,"Validation"),$valEl.click(),$valEl.focus(),$valEl.text("PIKACHU"),$valEl.blur(),ok($valEl.hasClass("ui-validationerror"),"Validation")})};return{run:innerRun}})
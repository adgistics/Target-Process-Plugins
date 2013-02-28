function checkImpediment($el,requestData){var $idElement=$el.find(".tau-linkentity_type_icon");equal($idElement.text(),requestData.id.toString(),"Id is valid");var $anchor=$idElement;equal($anchor.attr("href"),"#impediment/"+requestData.id,"url is valid"),equal($el.find(".name").text(),requestData.name,"Name is valid"),equal($el.find(".state").text(),requestData.entityState.name,"Name is valid")}define(["Underscore","jQuery","tau/components/component.impedimentList","tests/common/testData.Generator","tests/common/componentConfigCreator","tests/common/testCase"],function(_,$,component,TestDataGenerator,ComponentConfigCreator,TestCase){var innerRun=function(){var testDataGenerator=new TestDataGenerator;testDataGenerator.initDefaultData();var data=testDataGenerator.getData(),bugData=testDataGenerator.getBugs()[0],loggedUser=testDataGenerator.getUsers()[0],impediments=testDataGenerator.getImpediments(),configCreator=new ComponentConfigCreator;configCreator.setEntityIDAndType(bugData.id,bugData.__type),configCreator.setSelectedProjects([data.selectByType("project")[0]]),configCreator.setProcesses(data.selectByType("process")),configCreator.setLoggedUser(loggedUser);var config=configCreator.getConfig(),testCase=new TestCase("[component.impedimentList]");testCase.initModule({componentConfig:config,data:data,loggedUser:loggedUser},component),testCase.test("should render valid markup",function(){var $el=this.element,$impediments=$el.find("table.base-info-list tbody > tr");equal($impediments.size(),3,"Count of impediments"),checkImpediment($impediments.eq(0),_.extend(_.clone(impediments[0]),{entityState:{name:"Planned"}})),checkImpediment($impediments.eq(1),_.extend(_.clone(impediments[1]),{entityState:{name:"Open"}})),checkImpediment($impediments.eq(2),_.extend(_.clone(impediments[2]),{entityState:{name:"Planned"}}))})};return{run:innerRun}})
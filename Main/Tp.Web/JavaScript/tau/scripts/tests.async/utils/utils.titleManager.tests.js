define(["tau/utils/utils.titleManager"],function(TitleManager){var testcase={name:"utils.titleManager"};return testcase["should set title"]=function(test){var testWindow={document:{title:"Default"}},manager=new TitleManager({window:testWindow});manager.setTitle("preved"),test.equals(testWindow.document.title,"preved Default","set title"),manager.restoreDefault(),test.equals(testWindow.document.title,"Default","restore title");var manager=new TitleManager({window:testWindow,delimiter:" :: "});manager.setTitle("preved"),test.equals(testWindow.document.title,"preved :: Default","set title"),manager.restoreDefault(),test.equals(testWindow.document.title,"Default","restore title"),test.done()},testcase})
define(["Underscore","jQuery","tau/core/event.queued","tau/ui/extensions/board.plus/ui.board.plus.utils","tests.async/testkit/testkit.component.board","tau/components/component.board.plus"],function(_,$,Event,BoardPlusUtils,TestKit,ComponentBoardPlus){var definition={x:{types:["Release"],filter:"?It is not None"},cells:{types:["UserStory"]}},testKit=new TestKit(ComponentBoardPlus,definition),testcase={name:"component.board.plus.xonly"};return testcase["should render skeleton with X axis only"]=testKit.test(function(test){var bus=test.get("bus");test.expect(411);var testFlow={bus:bus,"bus view.skeleton.built[0]+model.sliceInfo.retrieved":function(evt){var $skeleton=evt["view.skeleton.built[0]"].data.element,sliceInfo=evt["model.sliceInfo.retrieved"].data,$gridView=$skeleton.find(".tau-board-grid-view");test.ok($gridView.hasClass("tau-no-rows"),"Has class no-rows"),test.ok(!$gridView.hasClass("tau-no-cols"),"Has no class no-cols"),test.equals($skeleton.find("[role=header]").size(),1,"One board header");var $rowsHeader=$skeleton.find(".tau-rows-header");test.equals($rowsHeader.size(),0,"No rows header");var $colsHeader=$skeleton.find(".tau-cols-header");test.equals($colsHeader.size(),1,"No cols header");var $grid=$skeleton.find("[role=grid]");test.ok($grid.hasClass("tau-grid"),"grid css class");var $cell=$grid.find("[role=cell]"),actualCellsSize=$cell.size(),registeredData=test.get("data"),expectedCellsSize=_(registeredData.release).keys().length;test.equals(actualCellsSize,expectedCellsSize,"cells count in board");var releases=_(registeredData.release).values();for(var i=0;i<actualCellsSize;i++){var r=releases[i],cellDataItem=_(sliceInfo.marksX).detect(function(mx){return mx.dynamic.items[0].data.id==r.id}),cellId=cellDataItem.dynamic.items[0].id,expectedCellData={x:cellId,y:null},$filteredCell=$cell.filter("#x"+cellId+"-ynull-");test.equals($filteredCell.size(),1,"Filtered cell is found"),test.same($filteredCell.data(),expectedCellData,"Cell data")}},"bus view.skeleton.built[0]:last+model.sliceInfo.retrieved:last+view.cell.skeleton.built":function(evt){var evtBoardSkeleton=evt["view.skeleton.built[0]"].data,evtCellSkeleton=evt["view.cell.skeleton.built"].data,sliceInfo=evt["model.sliceInfo.retrieved"].data,$skeletonCell=evtCellSkeleton.element,cellId=$skeletonCell.attr("id"),$cellInSkeleton=evtBoardSkeleton.element.find("#"+cellId);test.equals($cellInSkeleton[0],$skeletonCell[0],"Cell is built-in into main skeleton");var cellData=$skeletonCell.data();if(!cellData.hasOwnProperty("x")||!cellData.hasOwnProperty("y"))return;var registeredData=test.get("data"),releaseData=_(sliceInfo.marksX).detect(function(mx){return mx.dynamic.items[0].id==cellData.x}),cellReleaseId=releaseData.dynamic.items[0].data.id,cellStories=_(registeredData.userStory).values();cellStories=_(cellStories).select(function(c){return c.release.id==cellReleaseId});var expectedCardsCount=cellStories.length,$cards=$skeletonCell.find("[role=card]");test.equals($cards.size(),expectedCardsCount,expectedCardsCount+" cards on the board");for(var i=0;i<cellStories.length;i++){var us=cellStories[i],type=us.entityType.name,cardId=BoardPlusUtils.getCardIds({type:type,id:us.id})[0],$card=$skeletonCell.find("#"+cardId),$cardId=$card.find(".tau-id");test.equal($cardId.text(),us.id,"Card id "+us.id),test.equal($cardId.attr("href").indexOf("#"+type.toLowerCase()+"/"+us.id)>=0,!0,"Card id reference "+us.id),test.equal($cardId.attr("href").indexOf("TpView.aspx?acid=")>=0,!0,"Card id reference "+us.id),test.equal($card.find(".tau-name").text(),us.name,"Card name "+us.name);var cardData=$card.data();cardData.entityType=cardData.entityType.toLowerCase(),test.equal(cardData.entityId,us.id,"Card data"),test.equal(cardData.entityType,type.toLowerCase(),"Card data")}},"bus view.skeleton.built[0]+model.sliceInfo.retrieved:last+view.cell.skeleton.built[7]":function(evt){test.done()}};Event.subscribeOn(testFlow)}),testcase})
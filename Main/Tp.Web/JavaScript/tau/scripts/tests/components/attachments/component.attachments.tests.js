define(["tau/core/class","tau/core/tau","tau/components/component.attachments","tau/components/component.attachmentsPreview","tests/common/testData","tests/components/common/common.setup","tests/components/component.specs"],function(Class,tau,attachmentComponent,attachmentsPreviewComponent,testData,commonSetup,componentSpecs){var innerRun=function(){function checkActionPanelAttached(selection,index){for(var i=0;i<selection.length;i++){var item=selection.eq(i),actionsPanel=item.find(".ui-actions").find(".ui-actions-panel"),isVisible=actionsPanel.css("display")!=="none";i===index?ok(isVisible,"Action panel is visible on "+i+" element"):ok(!isVisible,"Action panel is hidden on "+i+" element")}}function checkActionPanelDetached(selection){for(var i=0;i<selection.length;i++){var item=selection.eq(i),actionsPanel=item.find(".ui-actions").find(".ui-actions-panel"),isVisible=actionsPanel.css("display")!=="none";ok(!isVisible,"Action panel is hidden on "+i+" element")}}function checkAttachment($el,attachmentData){equal($el.find(".preview img").attr("src"),attachmentData.thumbnailUri,"thumbnailUrl is valid is valid"),equal($el.find(".name").text(),attachmentData.name,"Name is valid"),equal($el.find(".owner").text(),"by "+attachmentData.ownerName,"Owner is valid"),equal($el.find(".date").text(),"on "+attachmentData.date,"Date is valid"),equal($el.find(".toolbar a.download").attr("href"),attachmentData.uri,"URL to download attachment is valid")}var data=testData.getDataForAttachments(),bug=data[0],context={context:{type:"bug",id:bug.id}},previewContext={context:{type:"bug",id:bug.id}},expectedCmdArray=[Similar.to({name:"get",type:"bug",config:Like.is({id:bug.id,fields:["id",Similar.to({attachments:["id","date","name","mimeType","uri","thumbnailUri",Similar.to({owner:["id","firstName","lastName"]})]})]})})],expectedData={items:[{id:550,name:"Attachment1",mimeType:"image/jpg",ownerName:"John Brown",date:"12-Apr-2011",thumbnailUri:"#../../images/thumbnail_1.jpg",uri:"#../../images/1.jpg"},{id:551,name:"Attachment3",mimeType:"application/msword",ownerName:"Tod Black",date:"9-Jun-2011",thumbnailUri:"#../../images/thumbnail_2.jpg",uri:"#../../images/2.doc"},{id:552,name:"Attachment3",mimeType:"image/jpg",ownerName:"Andrew Gray",date:"9-Jun-2011",thumbnailUri:"#../../images/thumbnail_3.jpg",uri:"#../../images/3.jpg"},{id:553,name:"Attachment4",mimeType:"image/jpg",ownerName:"Andrew Gray",date:"9-Jun-2011",thumbnailUri:"#../../images/thumbnail_4.jpg",uri:"#../../images/4.jpg"}]},viewTests=[{name:"should render valid markup",test:function(){var $el=this.$el,$attachments=$el.find(".ui-attachments-content > .ui-attach"),items=this.data.items;equal($attachments.length,items.length,"Count of root comments is valid");for(var i=0;i<items.length;i++)checkAttachment($attachments.eq(0),items[0])}},{name:"should render confirmation overlay on delete action",test:function(){var $el=this.$el,$attachment=$el.find(".ui-attachments-content .ui-attach").first(),$deleteTrigger=$attachment.find(".toolbar .delete");$deleteTrigger.click(),$deleteTrigger.click(),$deleteTrigger.click();var $confirmationOverlays=$el.find(".confirmation");equal($confirmationOverlays.size(),1,"Confirmation is rendered correctly")}}],setup=commonSetup.create("[component.attachments]",data,attachmentComponent);componentSpecs.create(setup,context).viewShouldFollowDataComponentLifeCycle().modelShouldReturnData(expectedData,[expectedCmdArray,{_operation:"on",command:Similar.to({eventName:"afterRemove",type:"attachment"})}]).viewShouldPassTests(viewTests).done()};return{run:innerRun}})
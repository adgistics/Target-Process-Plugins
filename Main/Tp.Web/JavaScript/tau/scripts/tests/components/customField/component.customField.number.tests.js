define(["jQuery","tests/common/testkit","tau/components/component.customField.number"],function(a,b,c){var d=function(){var a=new b("[component.customField.number]",c),d={us1:{name:"US1",customFields:[{name:"NumberOfBeast",type:"Number",value:666}]}},e=a.loadFixtures({userStories:d});return a.setData(e),a.setEntity(e.userStory.us1),a.selectDefaultProject(),a.appContext.processes[0].customFields=[{name:"NumberOfBeast",type:"Number",required:!1,listed:!1,value:null}],a.addTest({name:"should render valid markup",test:function(){var a=this.$el;equals(a.find(".ui-customfield__label").text().trim(),"NumberOfBeast","Name is valid"),equals(a.find(".ui-customfield__value").text(),666,"Correct process and output")}}),a.addTest({name:"should allow to edit",test:function(){var b=this.$el,c=e.userStory.us1;a.getService().registerSaveCommand({config:{$set:{customFields:[{name:"NumberOfBeast",type:"Number",value:777}]},fields:["id","customFields"],id:c.id},returnedData:{id:c.id,customFields:[{name:"NumberOfBeast",type:"Number",value:"777"}]}}),ok(b.hasClass("ui-customfield_editable_true"),"Editable highlighting is applied");var d=this.$el.find(".ui-customfield__value"),f=d.text();d.click(),equals(d.attr("contenteditable"),"true","Generate editor"),d.focus(),d.text("777"),d.blur(),equals(d.text(),"777","Save value")}}),a.addTest({name:"validation",test:function(){var b=e.userStory.us1,c=this.$el.find(".ui-customfield__value").text();this.$el.find(".ui-customfield__value").click(),equals(this.$el.find(".ui-customfield__value").attr("contenteditable"),"true","Generate editor"),this.$el.find(".ui-customfield__value").focus(),this.$el.find(".ui-customfield__value").text("preved"),this.$el.find(".ui-customfield__value").blur(),ok(this.$el.find(".ui-customfield__value").hasClass("ui-validationerror"),"Validate with error"),ok(this.$el.find(".ui-customfield__value").attr("title")!=0,"Validated with error"),a.getService().registerSaveCommand({config:{$set:{customFields:[{name:"NumberOfBeast",type:"Number",value:123}]},fields:["id","customFields"],id:b.id},returnedData:{id:b.id,customFields:[{name:"NumberOfBeast",type:"Number",value:"123"}]}}),this.$el.find(".ui-customfield__value").click(),this.$el.find(".ui-customfield__value").focus(),this.$el.find(".ui-customfield__value").text("  123  "),this.$el.find(".ui-customfield__value").blur(),equals(this.$el.find(".ui-customfield__value").text(),"123","Sanitize value"),equals(this.$el.find(".ui-customfield__value").hasClass("ui-validationerror"),!1,"Validate sanitized value"),ok(_.isEmpty(this.$el.find(".ui-customfield__value").attr("title")),"Validate sanitized value")}}),a.addTest({name:"spec validation",test:function(){var b=this.$el,c=e.userStory.us1,d=this.$el.find(".ui-customfield__value"),f=d.text();d.click(),a.getService().registerSaveCommand({config:{$set:{customFields:[{name:"NumberOfBeast",type:"Number",value:null}]},fields:["id","customFields"],id:c.id},returnedData:{id:c.id,customFields:[{name:"NumberOfBeast",type:"Number",value:null}]}}),this.$el.find(".ui-customfield__value").focus(),this.$el.find(".ui-customfield__value").text(""),this.$el.find(".ui-customfield__value").blur(),d.click(),equals(this.$el.find(".ui-customfield__value").text(),"","Sanitize empty value"),equals(this.$el.find(".ui-customfield__value").hasClass("ui-validationerror"),!1,"Validate empty value"),ok(_.isEmpty(this.$el.find(".ui-customfield__value").attr("title")),"Validate empty value");var d=this.$el.find(".ui-customfield__value"),f=d.text();d.click(),a.getService().registerSaveCommand({config:{$set:{customFields:[{name:"NumberOfBeast",type:"Number",value:0x7048860ddf79}]},fields:["id","customFields"],id:c.id},returnedData:{id:c.id,customFields:[{name:"NumberOfBeast",type:"Number",value:0x7048860ddf79}]}}),this.$el.find(".ui-customfield__value").focus(),this.$el.find(".ui-customfield__value").text("123456789012345"),this.$el.find(".ui-customfield__value").blur(),equals(this.$el.find(".ui-customfield__value").text(),"123456789012345","Process large numbers"),equals(this.$el.find(".ui-customfield__value").hasClass("ui-validationerror"),!1,"Process large numbers")}}),a.run({customField:{type:"Number",name:"NumberOfBeast"}})};return{run:d}})
define(["Underscore","tests/common/service.mock","tau/configurator","tau/models/dataprocessor/model.processor.context","tau/components/component.list","tests/common/testData","tests/common/applicationContext","tests/components/common/common.setup","tests/components/component.specs","tests/common/checker","tau/models/dataProviders/model.provider.items.user_stories","tau/models/dataProviders/model.provider.groups.user_stories","tau/ui/templates/list_/grid.entity/ui.template.list.grid.entity"],function(a,b,c,d,e,f,g,h,i,j,k,l){var m=function(){function q(a,b,c){var d={id:b,nested:!0,fields:["id"]},e={};e[c]=["id","name","numericPriority","tags",Similar.to({priority:["id","name"]}),"effort","effortCompleted","effortToDo","timeSpent","timeRemain",Similar.to({entityState:["id","name","isInitial","isFinal","numericPriority"]}),Similar.to({roleEfforts:["id",Like.is({role:["id","name"]})]}),Similar.to({assignments:["id",Like.is({role:["id"]}),Similar.to({generalUser:["id","firstName","lastName"]})]})],d.fields.push(Similar.to(e));var f=Similar.to({name:"get",type:a,config:Similar.to(d)});return f}var j=new g,l=f.registerTestDataForUserStoriesListModel(),m=f.getStatesForProcess(),n=l.userStories,o=l.data,p={context:{type:"feature",id:15}},r={groups:[],items:[{id:1,name:"US1",__type:"userStory",numericPriority:1,entityState:{id:1,name:"Open",isInitial:!0,isFinal:!1},tags:["us1","epic"],priority:{id:1,name:"Low"},effort:{estimated:56,spent:8,remain:48,total:56,percentComplete:14,percentFromMaximum:100,timeSpent:9,timeRemain:41,unit:{name:"Hour",shortName:"h"}},assignments:{groups:[{role:{id:1,name:"Dev."},users:[{id:1,name:"Vasili I.",assignmentId:309,avatarUrl:"/TP/Avatar.ashx?UserId=1&size=24"},{id:2,name:"Ivan V.",assignmentId:310,avatarUrl:"/TP/Avatar.ashx?UserId=2&size=24"}]}]}},{id:2,name:"US2",__type:"userStory",numericPriority:2,entityState:{id:24,name:"Closed",isInitial:!1,isFinal:!0},tags:[],priority:{id:1,name:"Low"},effort:{estimated:12,spent:6,remain:6,total:12,percentComplete:50,percentFromMaximum:21,timeSpent:3,timeRemain:18,unit:{name:"Hour",shortName:"h"}},assignments:{groups:[{role:{id:1,name:"Dev."},users:[{id:1,name:"Vasili I.",assignmentId:309,avatarUrl:"/TP/Avatar.ashx?UserId=1&size=24"},{id:2,name:"Ivan V.",assignmentId:310,avatarUrl:"/TP/Avatar.ashx?UserId=2&size=24"}]}]}},{id:3,name:"US3",__type:"userStory",numericPriority:3,entityState:{id:23,name:"In Progress",isInitial:!1,isFinal:!1},tags:["us3","wow"],priority:{id:1,name:"Low"},effort:{estimated:16,spent:8,remain:8,total:16,percentComplete:50,percentFromMaximum:29,timeSpent:5,timeRemain:7,unit:{name:"Hour",shortName:"h"}},assignments:{groups:[{role:{id:1,name:"Dev."},users:[]}]}}],config:{views:[{type:"grid.entity"}],currentView:{type:"grid.entity"}}},s=q("feature",15,"userStories"),t=function(){var a=this.service=new b;c.setService(a),c.getProxy().markRecordSetAsCompleteLoaded("priority")},u=[{name:"should render valid markup view",preSetup:t,test:function(){var c=this.data,d=this.$el,e=d.find("[role=group]");equals(e.length,1,"Groups amount");for(var f=0;f<e.length;f++){var g=e.eq(f),h=g.find("[role=item]");for(var i=0;i<h.length;i++){var j=h.eq(i).find("td"),k=c.items[i];equals(j.length,8,"Amount of row cells"),equals(j.eq(1).text(),k.id,"ID Data column");var l=j.eq(2).find("span").eq(0);equals(l.text(),k.name,"Name Data column");if(k.tags.length){var m=j.eq(2).find("span").eq(1);equals(m.text(),k.tags[0],"Tag Data column")}equals(j.eq(3).text().trim(),k.priority.name.toString(),"Priority Data column"),equals(j.eq(4).find(".entity-effort").text(),k.effort.estimated+k.effort.unit.shortName,"Estimated Effort Data column"),ok(j.eq(5).find(".ui-progressbar__progress").attr("style").match(new RegExp("width:\\s*"+k.effort.percentFromMaximum+"%")),"Column progress width"),ok(j.eq(5).find(".ui-progressbar__progress__indicator").attr("style").match(new RegExp("width:\\s*"+k.effort.percentComplete+"%")),"Column progress width"),equals(j.eq(6).find(".ui-assignment__group").length,k.assignments.groups.length,"Assignments items");var n=j.eq(6).find(".ui-assignment__group");a.forEach(k.assignments.groups,function(b,c){var d=n.eq(c);equals(d.find(".ui-assignment__group__title").text(),b.role.name,"Group title");var e=d.find(".ui-assignment__user");equals(e.length,b.users.length,"Group users length"),a.forEach(b.users,function(a,c){var d=e.eq(c),a=b.users[c];equals(d.find("img").attr("src"),"/TP/Avatar.ashx?UserId="+a.id+"&size=24","User avatar"),equals(d.find("img").prop("title"),a.name,"User name")})})}}}}],v={context:{applicationContext:j},itemsDataProvider:k,views:[{type:"grid.entity"}]};d(v.context);var w=h.create("[component.list][user_stories_flat]",[o,m],e,v);i.create(w,p).viewShouldFollowDataComponentLifeCycle(t).viewShouldPassTests(u).done()};return{run:m}})
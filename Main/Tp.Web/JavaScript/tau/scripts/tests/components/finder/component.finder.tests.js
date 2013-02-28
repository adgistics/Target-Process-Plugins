define(["Underscore","libs/jquery/jquery","tests/components/utils/dispatcher","tau/models/finder/model.entity.finder","tau/core/bus","tau/models/finder/model.assignable.search","tau/ui/extensions/finder/ui.extension.finder.list","tau/ui/extensions/finder/ui.extension.finder.simpleSearch"],function(_,$,dispatcherUtils,MainModel,Bus,BaseSearch,List,VisualSearch){var innerRun=function(){module("[component.finder] extensions",{setup:function(){this.bus=new Bus({name:"my super bus"})},teardown:function(){delete this.bus}}),test("dataBind is fired right after initializing",function(){var model=new MainModel({bus:this.bus}),events=["dataBind","requireSearchConfig"],dispatcher=dispatcherUtils.createDispatcher(this.bus,events);this.bus.fire("beforeInit"),dispatcherUtils.verifyLifeCycle(events,dispatcher,"main model of finder"),equals(dispatcher.args.dataBind.data.items.length,0,"empty items is sent")}),test("requestingData on searchConfigFormed",function(){var model=new MainModel({bus:this.bus}),events=["partialDataRequest"],dispatcher=dispatcherUtils.createDispatcher(this.bus,events);this.bus.fire("searchConfigFormed",{type:"assignable",config:{$query:{id:45}},properties:[{name:"id"}]}),dispatcherUtils.verifyLifeCycle(events,dispatcher,"main model of finder"),equals(dispatcher.args.partialDataRequest.type,"assignable","type is passed"),equals(dispatcher.args.partialDataRequest.config.$query.id,45,"config is passed"),equals(dispatcher.args.partialDataRequest.config.fields.length,4,"config fields is passed")}),test("requestingData on newSearchQuery",function(){var model=new MainModel({bus:this.bus}),events=["partialDataRequest"],dispatcher=dispatcherUtils.createDispatcher(this.bus,events);this.bus.fire("newSearchQuery",{type:"assignable",config:{$query:{id:45}},properties:[{name:"id"}]}),dispatcherUtils.verifyLifeCycle(events,dispatcher,"main model of finder"),equals(dispatcher.args.partialDataRequest.type,"assignable","type is passed"),equals(dispatcher.args.partialDataRequest.config.$query.id,45,"config is passed"),equals(dispatcher.args.partialDataRequest.config.fields.length,4,"config fields is passed")}),test("events on loadMore: next pageAvailable",function(){var model=new MainModel({bus:this.bus}),events=["partialDataRequest"],dispatcher=dispatcherUtils.createDispatcher(this.bus,events);this.bus.fire("nextPageCommandFormed",{type:"sad",config:{}}),this.bus.fire("loadMore",{}),dispatcherUtils.verifyLifeCycle(events,dispatcher,"main model of finder")}),test("events on commandExecuted: next pageAvailable",function(){var model=new MainModel({bus:this.bus}),events=["dataLoaded","nextPageCommandFormed"],dispatcher=dispatcherUtils.createDispatcher(this.bus,events),object={data:[1]};object.data.isNextPageAvailable=function(){return!0},object.data.getNextPageCommand=function(){return{id:"cmdNextPage"}},this.bus.fire("dataRequestCompleted",object),dispatcherUtils.verifyLifeCycle(events,dispatcher,"main model of finder"),equals(dispatcher.args.dataLoaded.data.items[0],1),equals(dispatcher.args.nextPageCommandFormed.id,"cmdNextPage","config is passed")}),test("events on commandExecuted: next is not pageAvailable",function(){var model=new MainModel({bus:this.bus}),events=["dataLoaded","nextPageIsNotAvailable"],dispatcher=dispatcherUtils.createDispatcher(this.bus,events),object={data:[1]};object.data.isNextPageAvailable=function(){return!1},object.data.getNextPageCommand=function(){return{id:"cmdNextPage"}},this.bus.fire("dataRequestCompleted",object),dispatcherUtils.verifyLifeCycle(events,dispatcher,"main model of finder"),equals(dispatcher.args.dataLoaded.data.items[0],1),ok(_.isUndefined(dispatcher.nextPageCommandFormed))}),test("base search functionality",function(){var model=new BaseSearch({bus:this.bus}),events=["searchConfigFormed"],dispatcher=dispatcherUtils.createDispatcher(this.bus,events);this.bus.fire("requireSearchConfig",{project:{id:49,name:"My Project"}}),dispatcherUtils.verifyLifeCycle(events,dispatcher,"base search"),ok(_(dispatcher.args.searchConfigFormed.properties).keys().length>0),equals(dispatcher.args.searchConfigFormed.type,"assignable"),equals(dispatcher.args.searchConfigFormed.searchQuery,""),included(dispatcher.args.searchConfigFormed.config.$query,{})}),test("base search: auto complete request simple property",function(){var model=new BaseSearch({bus:this.bus}),events=["dataRequest"],dispatcher=dispatcherUtils.createDispatcher(this.bus,events),args={};this.bus.fire("autoCompleteRequest",{property:"name",term:"asd asd",callback:function(evt){args=evt}}),ok(_(dispatcher.args.dataRequest).isUndefined())}),test("base search: auto complete category",function(){var model=new BaseSearch({bus:this.bus}),args={},config={property:"iteration",term:"",callback:function(evt){args=evt}},data=[{id:1,name:"It 1",release:{id:8,name:"r 1"},project:{id:1,name:"p 1"}},{id:2,name:"It 2",release:{id:8,name:"r 1"},project:{id:1,name:"p 1"}},{id:3,name:"It 1",release:{id:8,name:"r 2"},project:{id:1,name:"p 2"}}];this.bus.fire("autoComplete",{data:data,config:config}),equals(args.length,4),equals(args[0].label,"Backlog")}),test("base search: auto complete",function(){var model=new BaseSearch({bus:this.bus}),args={},config={property:"iteration",term:"",callback:function(evt){args=evt}},data=[{id:1,name:"It 1",release:{id:8,name:"r 1"},project:{id:1,name:"p 1"}},{id:2,name:"It 2",release:{id:8,name:"r 1"},project:{id:1,name:"p 1"}},{id:3,name:"It 1",release:{id:8,name:"r 1"},project:{id:1,name:"p 1"}}];this.bus.fire("autoComplete",{data:data,config:config}),equals(args[0].label,"Backlog"),equals(args.length,3)}),test("base search: auto complete filtering by term",function(){var model=new BaseSearch({bus:this.bus}),args={},config={property:"iteration",term:"1",callback:function(evt){args=evt}},data=[{id:1,name:"It 1",release:{id:8,name:"r 1"},project:{id:1,name:"p 1"}},{id:2,name:"It 2",release:{id:8,name:"r 1"},project:{id:1,name:"p 1"}},{id:3,name:"It 1",release:{id:8,name:"r 1"},project:{id:1,name:"p 2"}}];this.bus.fire("autoComplete",{data:data,config:config}),equals(args.length,2)}),test("base search: process auto complete request",function(){var model=new BaseSearch({bus:this.bus}),events=["dataRequest"],dispatcher=dispatcherUtils.createDispatcher(this.bus,events),args={};this.bus.fire("autoCompleteRequest",{property:"iteration",term:"Asd",callback:function(evt){args=evt}}),dispatcherUtils.verifyLifeCycle(events,dispatcher,"base search");var request=dispatcher.args.dataRequest;equals(request.type,"iteration"),same(request.config.fields,["id","name",{project:["id","abbreviation"]}])}),test("empty: forming query",function(){var model=new BaseSearch({bus:this.bus}),events=["newSearchQuery"],dispatcher=dispatcherUtils.createDispatcher(this.bus,events);this.bus.fire("search",{}),dispatcherUtils.verifyLifeCycle(events,dispatcher,"base search");var request=dispatcher.args.newSearchQuery;equals(request.type,"assignable","type is passed"),same(request.config.$query,{},"query is passed")}),test("forming query",function(){var model=new BaseSearch({bus:this.bus}),events=["newSearchQuery"],dispatcher=dispatcherUtils.createDispatcher(this.bus,events),searchCollection=[{property:"project",value:"Project 1"},{property:"project",value:"Project 2"},{property:"iteration",value:"Super Puper"},{property:"release",value:"Backlog"},{property:"state",value:"All uncompleted"},{property:"id",value:"15"},{property:"id",value:"45"},{property:"id",value:"NaNa"},{property:"name",value:"sdfsdf"},{property:"name",value:"aaaa"},{property:"description",value:"bb"},{property:"tag",value:"fdsf sdjfk"}];this.bus.fire("search",{collection:searchCollection}),dispatcherUtils.verifyLifeCycle(events,dispatcher,"base search");var request=dispatcher.args.newSearchQuery;equals(request.type,"assignable","type is passed"),same(request.config.$query.project,{name:{$in:["Project 1","Project 2"]}},"query is passed"),same(request.config.$query.iteration,{name:{$in:["Super Puper"]}},"query is passed"),same(request.config.$query.release,null,"query is passed"),same(request.config.$query.entityState,{isFinal:0},"query is passed"),same(request.config.$query.id,{$in:[0,15,45]},"query is passed"),same(request.config.$query.name,{$contains:"aaaa"},"query is passed"),same(request.config.$query.description,{$contains:"bb"},"query is passed"),same(request.config.$query.tags,{$contains:"fdsf sdjfk"},"query is passed")}),test("forming query text",function(){var model=new BaseSearch({bus:this.bus}),events=["newSearchQuery"],dispatcher=dispatcherUtils.createDispatcher(this.bus,events),searchCollection=[{property:"text",value:"All uncompleted"}];this.bus.fire("search",{collection:searchCollection}),dispatcherUtils.verifyLifeCycle(events,dispatcher,"base search");var request=dispatcher.args.newSearchQuery;equals(request.type,"assignable","type is passed"),same(request.config.$query.name,{$contains:"All uncompleted"},"query is passed")}),test("forming query states",function(){var model=new BaseSearch({bus:this.bus}),events=["newSearchQuery"],dispatcher=dispatcherUtils.createDispatcher(this.bus,events),searchCollection=[{property:"state",value:"All uncompleted"},{property:"state",value:"Open"}];this.bus.fire("search",{collection:searchCollection}),dispatcherUtils.verifyLifeCycle(events,dispatcher,"base search");var request=dispatcher.args.newSearchQuery;equals(request.type,"assignable","type is passed"),same(request.config.$query.entityState,{isFinal:0},"query is passed")}),test("initial data appending",function(){var ext=new List({bus:this.bus}),dispatcher=dispatcherUtils.createDispatcher(this.bus,[]),table=['<div class="ui-resultList">','    <table cellspacing="0" cellpadding="4" class="ui-table">',"        <tbody>","        </tbody>","    </table>","</div>"].join(""),element=$("<div />").append(table);this.bus.fire("afterRender",{element:element});var data={items:[{__type:"userStory",id:1,entityState:{name:"Open"},project:{name:"My Project"}}]};this.bus.fire("dataLoaded",{data:data}),ok($("table>tbody>tr",element).length===1)}),test("clean list on new search",function(){var ext=new List({bus:this.bus}),dispatcher=dispatcherUtils.createDispatcher(this.bus,[]),table=['<div class="ui-resultList">','    <table cellspacing="0" cellpadding="4" class="ui-table tau-result-list">',"        <tbody>","        </tbody>","    </table>","</div>"].join(""),element=$("<div />").append(table);this.bus.fire("loadMore",{element:element});var data={items:[{__type:"userStory",id:1,entityState:{name:"Open"},project:{name:"My Project"}}]};this.bus.fire("dataLoaded",{data:data}),equals($("table>tbody>tr",element).length,1),this.bus.fire("search",{element:element}),equals($("table>tbody>tr",element).length,0)}),test("additional data appending",function(){var ext=new List({bus:this.bus}),dispatcher=dispatcherUtils.createDispatcher(this.bus,[]),table=['<div class="ui-resultList">','    <table cellspacing="0" cellpadding="4" class="ui-table">',"        <tbody>","        </tbody>","    </table>","</div>"].join(""),element=$("<div />").append(table);this.bus.fire("loadMore",{element:element});var data={items:[{__type:"userStory",id:1,entityState:{name:"Open"},project:{name:"My Project"}}]};this.bus.fire("dataLoaded",{data:data}),equals($("table>tbody>tr",element).length,1)}),test("entity selected and actions",function(){var action={id:"action",name:"action",fn:function(){this.bus.fire("action",{entity:null})}},ext=new List({bus:this.bus,actions:[action]}),dispatcher=dispatcherUtils.createDispatcher(this.bus,["action","entitySelected"]),table=[,'<div class="ui-drop-down drop-down-actions tau-finder-actions">',"<span class='action-link tau-finder-action' id='action'>${name}</span>","</div>",'<div class="ui-resultList">','    <table cellspacing="0" cellpadding="4" class="ui-table">',"        <tbody>","        </tbody>","    </table>","</div>"].join(""),element=$("<div />").append(table);this.bus.fire("afterRender",{element:element}),this.bus.fire("loadMore",{element:element});var data={items:[{__type:"userStory",id:1,entityState:{name:"Open"},project:{name:"My Project"}}]};this.bus.fire("dataLoaded",{data:data}),$("table>tbody>tr>td:first",element).click(),equals(dispatcher.args.entitySelected.entity.id,1),$("#action",element).data({tmplItem:{data:action}}).click(),equals(dispatcher.args.action.entity,null)})};return{run:innerRun}})
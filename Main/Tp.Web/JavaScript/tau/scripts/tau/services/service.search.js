define(["jQuery","Underscore","tau/core/termProcessor","tau/core/class","tau/utils/utils.date"],function($,_,TermProcessor,Class,dateUtils){var strategies={comment:function(item){item.entityType={name:"comment"};var tp=new TermProcessor;return item.general.entityType.term=tp.getTerms(item.general.entityType.name).name,item}},itemAdapter=function(item){var t=item.__type.toLowerCase(),preProcessing=strategies[t]||_.fixedPoint;item=preProcessing(item);var tp=new TermProcessor;return item.entityType.term=tp.getTerms(item.entityType.name).name,item.nameExt=item.nameExt||item.name,item.descExt=item.descExt||item.description||"",item.tags=item.tags?item.tags.split(", "):[],item.createDate=dateUtils.parse(item.createDate),item},Service=Class.extend({init:function(config){var x=this;x.defaultParams={searchString:"",entityTypeId:null,entityStateIds:[],pageSize:10,pageNo:0},x.storage=config.storage,x._params=config.storage,x.configurator=config.configurator,x.$clearCallbacks=$.Callbacks(),x.$dClear=$.Deferred(),x.$dClear.progress(x.$clearCallbacks.fire),x.$submitCallbacks=$.Callbacks(),x.$dSubmit=$.Deferred(),x.$dSubmit.progress(x.$submitCallbacks.fire),x.$searchCallbacks=$.Callbacks(),x.$dSearch=$.Deferred(),x.$dSearch.progress(x.$searchCallbacks.fire)},onClear:function(callback){this.$clearCallbacks.add(callback)},offClear:function(callback){this.$clearCallbacks.remove(callback)},onSubmit:function(callback){this.$submitCallbacks.add(callback)},offSubmit:function(callback){this.$submitCallbacks.remove(callback)},onSearch:function(callback){this.$searchCallbacks.add(callback)},offSearch:function(callback){this.$searchCallbacks.remove(callback)},params:function(){var service=this;return{get:function(key){return arguments.length?service._params[key]:service._params},set:function(key,val){var keys=[];if(_.isString(key))keys=[key],service._params[key]=val;else{if(!_.isObject(key))throw new Error("Unsupported argument [key]");keys=_.keys(key),service._params=_.extend(service._params,key)}var isPageNoParameter=keys.length===1&&keys[0]==="pageNo";return isPageNoParameter||(service._params.pageNo=0),this},submit:function(){var params=service._params;service.$dSubmit.notify(params)},clear:function(){service._params=_.clone(service.defaultParams),service.$dClear.notify(service._params)}}},getSearchDomain:function(){var x=this,configurator=this.configurator;return x.$d||(x.$d=$.Deferred(),configurator.getStore().get("entityType",{fields:["id","name"],$query:{isSearchable:1},list:!0}).done(function(r){var tp=new TermProcessor,entityTypes=_(r[0].data).chain().filter(function(x){return x.name.toLowerCase()!=="solution"}).map(function(x){return x.term=tp.getTerms(x.name).name,x}).value();x.$d.resolve({entityTypes:entityTypes})})),x.$d},extractPluralIDs:function(str){var isIDs=!1,parts=str.split(",");if(parts.length>1){var IDs=[];isIDs=_(parts).every(function(p){var token=_.trim(p),isDigit=/^\d+$/.test(token);return isDigit&&IDs.push(parseInt(token)),isDigit})}return isIDs?IDs:null},search:function(params){var self=this,configurator=this.configurator;return _.defaults(params,self.defaultParams),{done:function(callback){var $defer;_.isFunction(callback)?($defer=$.Deferred(),$defer.always(callback)):$defer=callback,$defer.always(self.$dSearch.notify);var root=configurator.getApplicationPath(),store=configurator.getStore(),acidStore=configurator.getAppStateStore(),ctxService=configurator.getApplicationContextService(),searchIDs=function(ctx){var projectIds=_.filter(ctx.selectedProjectIds,function(n){return n!=="null"}),plgn="{AppPath}/api/v1/Plugins.asmx/Searcher/Commands/Search".replace(/{AppPath}/g,root),post=JSON.stringify({Command:"Search",Plugin:"Searcher",ProjectIds:projectIds,SearchString:params.searchString,EntityTypeId:params.entityTypeId,EntityStateIds:params.entityStateIds,PageSize:params.pageSize,Page:params.pageNo});return $.ajax({url:plgn,type:"POST",data:post,dataType:"json"})},fetchDetailsByIDs=function(r){var rData={info:{pageNo:params.pageNo,pageSize:params.pageSize,total:r.Total},items:[]},$r=$.Deferred();if(rData.info.total>0){var assignableIds=r.AssignableIds,testCaseIds=r.TestCaseIds,generalIds=r.GeneralIds,commentIds=r.CommentIds,configurator=self.configurator,storeChain=configurator.getStore();if(assignableIds.length){var $assignableQuery={fields:["id","name","description","tags","createDate",{entityType:["id","name"]},{entityState:["id","name","isFinal"]},{project:["id","name"]},{team:["id","name"]}],$query:{id:{$in:assignableIds}}};storeChain=storeChain.find("assignable",$assignableQuery)}if(testCaseIds.length){var $testCaseQuery={fields:["id","name","description","steps","success","tags","createDate",{entityType:["id","name"]},{project:["id","name"]}],$query:{id:{$in:testCaseIds}}};storeChain=storeChain.find("testcase",$testCaseQuery)}if(generalIds.length){var $generalQuery={fields:["id","name","description","tags","createDate",{entityType:["id","name"]},{project:["id","name"]}],$query:{id:{$in:generalIds}}};storeChain=storeChain.find("general",$generalQuery)}if(commentIds.length){var $commentQuery={fields:["id","description","createDate",{general:["id","name",{entityType:["id","name"]}]}],$query:{id:{$in:commentIds}}};storeChain=storeChain.find("comment",$commentQuery)}storeChain.done({success:function(r){var resultItems=[];_.each(r,function(x){resultItems=resultItems.concat(x.data)}),rData.items=_.sortBy(resultItems,function(e){return-1*e.id}),$r.resolve(rData)},failure:function(r){$r.reject(r)}})}else $r.resolve(rData);return $r},handleSearchResult=function(chained){chained.fail(function(r){$defer.reject({data:{error:!0,response:r}})}).done(function(r){var ss=_.trim(params.searchString),keywords=_.without(ss?ss.split(/\s|\?|\*|\+|-|:|'|"/g):[],"");$defer.resolve({data:{keywords:keywords,info:r.info,items:_.map(r.items,itemAdapter)}})})},pluralIds=self.extractPluralIDs(params.searchString);pluralIds?store.get("general",{fields:["id",{entityType:["name"]}],$query:{id:{$in:pluralIds}}}).done(function(r){var adapter=_(r[0].data).chain().filter(function(d){return _.contains(pluralIds,d.id)&&d.hasOwnProperty("entityType")}).reduce(function(memo,d){var typeName=d.entityType.name,memoKey=typeName+"Ids";if(!memo.hasOwnProperty(memoKey)){var ref=store.typeMetaInfo(typeName);memoKey=_.titleize(ref.parent)+"Ids"}return memo.hasOwnProperty(memoKey)&&(memo[memoKey].push(d.id),++memo.Total),memo},{AssignableIds:[],CommentIds:[],GeneralIds:[],TestCaseIds:[],Total:0}).value();handleSearchResult(fetchDetailsByIDs(adapter))}):params.isAllProjects?store.get("project",{fields:["id"],$query:{isActive:1},list:!0}).done(function(r){var projects=r[0].data;handleSearchResult(searchIDs({selectedProjectIds:_(projects).pluck("id")}).pipe(fetchDetailsByIDs))}):acidStore.get({fields:["acid"],callback:function(r){ctxService.getApplicationContext({acid:r.acid},{success:function(r){handleSearchResult(searchIDs(r).pipe(fetchDetailsByIDs))}})}})}}}});return Service})
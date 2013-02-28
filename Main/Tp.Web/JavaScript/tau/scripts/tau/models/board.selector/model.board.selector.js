define(["Underscore","tau/core/extension.base","tau/core/bus"],function(_,BaseModel,Class){var bsService=Class.extend({init:function(bus){this.id=null,this.boardSettings=null,this.bus=bus,this.bus.unbind(this),this.bus.on("boardSettings.ready",function(evt){var boardSettings=evt.data.boardSettings,id=boardSettings.settings.id;id&&this.id&&id!=this.id?(this.id=id,this.boardSettings=boardSettings,this.fire("changed",{entity:{id:id,type:"board"},boardSettings:boardSettings})):(this.id=id,this.boardSettings=boardSettings,this.fire("ready",{entity:{id:id,type:"board"},boardSettings:boardSettings}))},this)},reset:function(){this.id=null,this.boardSettings=null},getCurrent:function(cb){cb({entity:{id:this.id,type:"board"},boardSettings:this.boardSettings})}}),Model=BaseModel.extend({resetLifecycle:!0,init:function(config){this._super(config),this.bsService=new bsService(this.bus),this.bsService.on("ready",function(data){this.fire("bsServiceData.ready",data)},this)},"bus refresh":function(){this.bsService.unbind(this)},"bus bsServiceData.ready:last + beforeInit":function(evt,bs,initConfig){var configurator=initConfig.config.context.configurator;this.bsService.unbind(this),this.bsService.on("changed",function(evt,data){this.fire("_boardSettings.ready",data.boardSettings),this.fire("currentBoard.changed",data.entity)},this),this.bsService.getCurrent(_.bind(function(data){var boardSettings=data.boardSettings;this.fire("_boardSettings.ready",data.boardSettings);var groupName=boardSettings.getGroupName();this.fire("storageConfig.ready",{groupName:groupName}),this.fire("currentBoard.ready",data.entity)},this)),this.fire("configurator.ready",configurator)},"bus configurator.ready":function(evt,configurator){var fire=_.bind(this.fire,this),storage=configurator.getRestStorage();storage.removeAllListeners(this),storage.on("afterRemove",function(data){this.fire("board.removed",{id:data.data.$key})},this)},"bus board.removed > currentBoard.changed":function(){this.fire("refresh")},"bus _boardSettings.ready":function(evt,boardSettings){var fire=_.bind(this.fire,this);boardSettings.unbind({listener:this}),boardSettings.bind({fields:["name","isShared","viewMode","acid"],listener:this,callback:function(res){setTimeout(function(){fire("refresh")},1e3)}})},getTeams:function(store){var deferred=$.Deferred();return store.get("team",{fields:["id","name","icon"]}).done(function(result){deferred.resolve(result[0].data)}),deferred},getProjects:function(store){var deferred=$.Deferred();return store.get("project",{fields:["id","name","color","isActive"]}).done(function(result){var projects=_.filter(result[0].data,function(v){return v.isActive});deferred.resolve(projects)}),deferred},getBoardsByUser:function(storage,storageConfig,userId){return storage.select(storageConfig.groupName,{$where:"(ownerId == "+userId+' or publicData.isShared == "true")',$fields:["key","ownerId","publicData.name","publicData.isShared","publicData.customSharedData","publicData.createdAt","userData.menuIsVisible AS userMenuIsVisible","userData.menuNumericPriority AS userMenuNumericPriority","publicData.menuIsVisible","publicData.menuNumericPriority","publicData.viewMode","publicData.acid","userData.viewMode AS userViewMode"],$limit:{start:0,max:10}}).pipe(function(data){return data.data})},"bus configurator.ready + storageConfig.ready":function(evt,configurator,storageConfig){var loggedUserId=configurator.getLoggedUser().id,storage=configurator.getRestStorage(),store=configurator.getStore();$.when(this.getProjects(store),this.getTeams(store),this.getBoardsByUser(storage,storageConfig,loggedUserId)).done(function(projects,teams,boards){var projectIds=_.pluck(projects,"id"),teamIds=_.pluck(teams,"id");boards=_.filter(boards,function(board){if(board.ownerId===loggedUserId)return!0;if(!board.isShared)return!0;if(!board.customSharedData||!board.customSharedData.isActive)return!0;var boardHasProjects=_.intersection(board.customSharedData.projectIds,projectIds).length>0,boardHasTeams=_.intersection(board.customSharedData.teamIds,teamIds).length>0;return boardHasProjects||boardHasTeams}),this.fire("boards.ready",boards)}.bind(this))},"bus currentBoard.ready > boards.ready":function(evt,current,boards){var fire=_.bind(this.fire,this),items=_(boards).chain().map(function(v,k){var key=v.key,item={key:key,ownerId:v.ownerId,name:v.name||key,isShared:v.isShared===!0,acid:v.acid||"",menuIsVisible:_.isUndefined(v.userMenuIsVisible)?v.menuIsVisible:v.userMenuIsVisible,priority:v.userMenuNumericPriority||v.menuNumericPriority||999999,viewMode:v.userViewMode||v.viewMode||"board"};return item.isActive=item.key==current.id,item.menuNumericPriority=item.priority,item}).sortBy(function(v){return v.priority}).value(),grouped=_.groupBy(items,function(v){return v.menuIsVisible?"menu":"more"}),groupMore=grouped.more||[];current=_.find(groupMore,function(v){return v.isActive});var itemsMore=grouped.more||[],data={items:grouped.menu||[],itemsMore:itemsMore,currentItem:current};fire("dataBind",data)}});return Model})
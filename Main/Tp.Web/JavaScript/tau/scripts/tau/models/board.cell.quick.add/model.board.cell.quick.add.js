define(["Underscore","jQuery","tau/core/model-base"],function(_,$,BaseModel){return BaseModel.extend({handleGetDataItemTemplate:function(coordinate,entityType,slice,loadedDataItemsTemplates,types,counters,viewMode){var coordinateAndType={$set:_.extend(_.clone(coordinate),{dataItemType:entityType.name})},self=this,action;switch(viewMode){case"board":action="dataTemplate";break;case"list":action="listDataTemplate";break;case"axis":action="axisDataTemplate";break;default:action="dataTemplate"}slice[action](coordinateAndType).done(function(result){var templateData=result.data;loadedDataItemsTemplates[entityType.name]={template:templateData,entityType:entityType},counters.push(entityType),counters.length==types.length&&(self.fire("model.dataItems.template.ready",{types:loadedDataItemsTemplates}),self.fire("dataBind",{types:loadedDataItemsTemplates,entityTypes:types}))})},onInit:function(conf){var deferred=$.Deferred();if(this.config.options&&this.config.options.slice&&this.config.options.addAction&&this.config.options.addAction.data.types&&this.config.options.action)deferred.resolve({slice:this.config.options.slice,types:this.config.options.addAction.data.types,action:this.config.options.action,viewMode:this.config.options.viewMode});else{var acidDeferred=$.Deferred();conf.context.configurator.getAppStateStore().get({fields:["acid"],callback:function(data){acidDeferred.resolve(data.acid)}}),acidDeferred.done(function(acid){var definition={};definition.global={acid:acid},definition.cells={types:["feature","userstory","task","bug","request","testcase","impediment","release","iteration","teamiteration"]};var slice=conf.context.configurator.getSliceFactory().create({definition:definition});slice.listModeActionsV2().done(function(response){var showAddButtonData={};return showAddButtonData.action=response.data.items[0],_.isEmpty(showAddButtonData.action)?(deferred.reject(),!1):(_.each(showAddButtonData,function(action){var addAction=_.find(action.fixed.items,function(item){return item.type=="AddAction"});addAction&&(showAddButtonData.addAction=addAction)}),deferred.resolve({slice:slice,types:showAddButtonData.addAction.data.types,action:showAddButtonData.action,viewMode:"list"}),!0)})})}deferred.done(_.bind(function(data){this.prepareTemplateData(data,conf),this.fire("settings.ready",data)},this)).fail(_.bind(function(){this.fire("dataBind",{isEmpty:!0})},this))},prepareTemplateData:function(data,conf){var slice=data.slice,types=data.types,loadedDataItemsTemplates={},counters=[],action=data.action,coordinate,viewMode=data.viewMode;viewMode==="axis"?coordinate={location:action.location}:coordinate={x:action.x||undefined,y:action.y||undefined};for(var i=0;i<types.length;i++){var entityType=types[i];this.handleGetDataItemTemplate(coordinate,entityType,slice,loadedDataItemsTemplates,types,counters,viewMode)}var getContext=_.bind(function(event){this.fire("culture.ready",event.culture)},this);conf.context.configurator.applicationContextService.getApplicationContext({acid:slice.config.definition.global.acid},{success:getContext})},"bus dataBind:last + model.add.item + settings.ready:last":function(evt,dataItems,addItemData,settings){var action=settings.action,slice=settings.slice,actionSlice,viewMode=settings.viewMode;switch(viewMode){case"board":actionSlice="addData";break;case"list":actionSlice="listAddData";break;case"axis":actionSlice="axisAddData";break;default:actionSlice="addData"}var nameType=_.find(dataItems.entityTypes,function(item){return item.name==addItemData.type}),oldAcid=slice.config.definition.global.acid,typeName=addItemData.type.toLowerCase();if(typeName=="project"||typeName=="team")slice.config.definition.global.acid=null;var params={type:addItemData.type,values:addItemData.fields};viewMode==="axis"?params.location=action.location:(params.x=action.x,params.y=action.y);var differed=slice[actionSlice]({$set:params}),configurator=this.config.context.configurator;differed.always(_.bind(function(acid){acid&&!slice.config.definition.global.acid&&(configurator.getStore().evictCollection(typeName),configurator.getApplicationContextService().refreshChoice(),slice.config.definition.global.acid=acid)},this,oldAcid)).done(_.bind(function(result){this.fire("model.data.item.did.add",{message:result.data[0],nameType:nameType})},this)).fail(_.bind(function(result){return this.fire("model.data.item.did.fail.add",result.data.responseText),!1},this))}})})
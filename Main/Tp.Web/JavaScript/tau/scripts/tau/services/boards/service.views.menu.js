define(["require","Underscore","tau/core/class","./service.boards.api","./service.views.groups.api","app.path","tau/utils/utils.api","./service.views.menu.utils","tau/components/board.menu/models/board.menu.section.collection"],function(e){var i=e("Underscore"),t=e("tau/core/class"),r=e("./service.boards.api"),n=e("./service.views.groups.api"),a=e("app.path"),s=e("tau/utils/utils.api"),o=e("./service.views.menu.utils"),u=e("tau/components/board.menu/models/board.menu.section.collection");return t.extend({boardsApi:null,groupsApi:null,init:function(e,t){this.viewsMenuUrlService=t,this._clientId=i.uniqueId("viewmenu/"+ +new Date+"/"+i.UUID());var a={clientId:this._clientId};this.boardsApi=new r(e,a),this.groupsApi=new n(e,a),this._noCacheStorage=new o.NoCacheStorageApiFacade(e)},getViewsMenuClientId:function(){return this._clientId},getBoardsForUser:function(e){var i={url:a.get()+"/api/boards/v1/visibleForUser/"+e,dataType:"json",type:"GET",$scope:{}};return this._noCacheStorage.makeServiceCall(i)},getApiForType:function(e){switch(e){case"group":return this.groupsApi;case"board":return this.boardsApi;default:throw new Error("Unknown menu item type")}},getViewsMenuForUser:function(){var e={url:a.get()+"/api/views/v1",dataType:"json",type:"GET",$scope:{}};return this.viewsMenuUrlService.acidInitialized.then(function(){return this._noCacheStorage.makeServiceCall(e)}.bind(this)).then(function(e){return u.createFromMenuStructure(e.data.items,this.viewsMenuUrlService)}.bind(this))},removeAllBoards:function(){var e=s.createDeleteAjaxCommandConfig({url:a.get()+"/api/boards/v1/?deleteAll=true",$scope:{}});return this._noCacheStorage.makeServiceCall(e)},removeAllViewMenuItems:function(){var e=s.createDeleteAjaxCommandConfig({url:a.get()+"/api/views/v1/unsafeDeleteAllItems",$scope:{}});return this._noCacheStorage.makeServiceCall(e).then(this.clearViewsMenuCache.bind(this))},clearViewsMenuCache:function(){i.invoke([this.boardsApi,this.groupsApi],"clearViewMenuItemCollectionCache")
}})});
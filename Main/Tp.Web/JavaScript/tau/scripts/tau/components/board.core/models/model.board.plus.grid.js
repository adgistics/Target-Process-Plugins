define(["Underscore","jQuery","tau/components/board.core/models/model.board.plus"],function(e,t,i){var n=i.extend({getViewMode:function(){return"board"},boardSettingsSilentSet:function(t){this.getBoardSettings().get({fields:["page","focus"],callback:function(i){var n=i.page||{},o=i.focus||{},a={page:n,focus:o};e.extend(n,t.page),e.extend(o,t.focus),this.getBoardSettings().set({set:a,isSilent:!0})}.bind(this)})},onGetSliceInfo:function(i){var n=e.deepClone(i.config.definition),o=this.requestSize(i),a=this.requestMarks("x",n,i),s=this.requestMarks("y",n,i);t.when(a,s).done(function(t,i){var a={viewMode:this.getViewMode(),definition:n,zoomLevel:n.zoomLevel||3};a.cardSize=this._zoomToSize(a),a.titleX=t.title,a.titleY=i.title;var s=this.publishSliceInfoEvent(a,t,i);o.done(function(t){e.each(["x","y"],function(e){s[e].isFocus&&(t[e]=s[e].onPage)}),this.publishBoardPagingSettingsEvent(t,s)}.bind(this))}.bind(this))},requestSize:function(i){var n=t.Deferred(),o=function(t){var i=t?t.data:{x:0,y:0};n.resolve(e.deepClone(i))};return i.size().done(o).fail(o),n},_getPageMoveStrategies:function(e){return{page:e,up:function(){this.page.y--},down:function(){this.page.y++},left:function(){this.page.x--},right:function(){this.page.x++}}},moveToPage:function(e,t,i){var n=this._getPageMoveStrategies(e);n[t](),i.boardSettings.set({set:{page:e}})},setPage:function(e,t){e.set({set:{page:t}})},requestMarks:function(i,n,o){var a=function(){this.publishCacheInvalidated(i)}.bind(this),s=this,r=t.Deferred(),u=n.page,c=function(e,t,n){var o={},a=t?s.getAxisPagingObject(i,e.items,u):s.getAxisNullPagingObject();a.isNull=!t,a.isFocus=!!n,o[i]=a,o["marks"+i.toUpperCase()]=a.data,o.title=e.metaInfo?e.metaInfo.name:null,r.resolve(o)}.bind(this),g=function(){var e=s.getSlicePagingArgs(i,u);return n.focus[i].length>0&&(e={id:{$in:n.focus[i]}},u[i]=0),o[i](e,a).fail(function(){c({items:[]},!1,!1)})},f=function(t,a){var r=!o.isUndefinedAxis(i);if(a&&t&&t.items){var d={};e.each(t.items,function(t){e.each(n.focus[i],function(e){e.toLowerCase()==t[i].toLowerCase()&&(d[e.toLowerCase()]=t)
})}),t.items=e.values(d),t.items.length&&(u.size[i]=t.items.length)}var l=t.items&&0!==t.items.length,h=u[i]>0||a;if(r&&!l&&h){var v={page:{},focus:{}};return u[i]=0,v.page[i]=0,a&&(v.focus[i]=[],n.focus[i]=[]),g().done(function(e){f(e.data)}),s.boardSettingsSilentSet(v),!1}c(t,r,a)};return g().done(function(e){var t=!1;e&&e.command&&e.command.config&&(t=e.command.config.hasOwnProperty("id")),f(e.data,t)}),r},publishSliceInfoEvent:function(t,i,n){e.extend(t,i),e.extend(t,n);var o={up:t.y.hasPrev,down:t.y.hasNext,left:t.x.hasPrev,right:t.x.hasNext};return t=e.extend(t,{availableDirections:o,page:{x:t.x.currentPage,y:t.y.currentPage}}),t.x.title=t.titleX,t.y.title=t.titleY,this.onSliceInfoRetrieved.fire(t),t},publishCacheInvalidated:function(e){this.onCacheInvalidated.fire(e)},publishBoardPagingSettingsEvent:function(t,i){var n=this;e.each(["x","y"],function(e){if(t[e]){var o=i[e];o.total=t[e],o.totalPages=n.getPagesCountForAxis(t[e],o.maxOnPage)}}),this.onBoardPagingSettingsRetrieved.fire(i)}});return n});
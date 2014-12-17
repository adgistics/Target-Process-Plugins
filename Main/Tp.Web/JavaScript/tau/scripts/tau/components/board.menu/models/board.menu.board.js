define(["require","Underscore","tau/core/class","./../board.menu.config","tau/services/service.board.access"],function(t){var a=t("Underscore"),e=t("tau/core/class"),i=t("./../board.menu.config"),r=t("tau/services/service.board.access");return e.extend({init:function(t,e){this._urlService=t,this.boardUpdated=a.Callbacks(),this._applyBoardData(e),this.edit=!1},updateBoardData:function(t){this._applyBoardData(t),this.boardUpdated.fire(this)},getUpdatedBoardData:function(t){var e=a.extend(a.deepClone(this.storedBoardData||{}),t);return a.defaults(e,{isFavorite:!1})},getCanChangeGroup:function(t){return r.isEditable(this.storedBoardData,t)},getIsPrivate:function(){return!this.isShared},getIsCustomShared:function(){return this.isShared&&this.customSharedData&&this.customSharedData.isActive},applyGlobalAcid:function(){this._updateLink(),this.boardUpdated.fire(this)},_applyBoardData:function(t){var e=this.getUpdatedBoardData(t);this.storedBoardData=e;var r=a.pick(e,i.watchedBoardSettingsFields);r.boardId=e.key||e.id,r.name=r.name||r.boardId,a.extend(this,r),this._updateLink()},_updateLink:function(){this.link=this._urlService.getBoardUrl(this.storedBoardData)}})});
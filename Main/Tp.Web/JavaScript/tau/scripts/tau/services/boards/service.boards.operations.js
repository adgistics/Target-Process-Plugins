define(["require","tau/core/class","Underscore","jQuery","tau/utils/utils.serverErrorTranslator","template!tau/components/board.menu/templates/board.menu.undelete.template"],function(e){var r=e("tau/core/class"),t=e("Underscore"),i=e("jQuery"),o=e("tau/utils/utils.serverErrorTranslator"),n=e("template!tau/components/board.menu/templates/board.menu.undelete.template"),a="current";return r.extend({init:function(e,r,t,i,o,n,a){this._bus=e,this._errorBarService=r,this._configurator=t,this._viewsMenuService=i,this._urlBuilder=o,this._routing=n,this._history=a},createBoardAndRedirect:function(){var e=this._configurator.getBoardDefinitionFactory();return e.createBoard().done(function(e){this._bus.fire("add.board",{board:{id:e.id}}),this._configurator.setConfig("tmpBoardIsJustAdded",!0),this.redirectToBoard(e.id)}.bind(this))},createViewGroup:function(){var e=this._configurator.getBoardDefinitionFactory();return e.createViewGroup().done(function(e){this._bus.fire("add.board.group",{boardGroup:{id:e.key}})}.bind(this))},removeBoard:function(e,r){var t=r||this._getCurrentAcid();return this._viewsMenuService.boardsApi.getViewMenuItem(e).then(function(r){return i.when(r.data,this._viewsMenuService.boardsApi.removeViewMenuItem(e))}.bind(this)).fail(function(e){this._errorBarService.fire("error",o.translateXhrError(e))}.bind(this)).then(function(r){this._bus.fire("remove.board",{board:{id:e}}),this._history.exclude(e),this._showUndeleteMessage(r,t)}.bind(this))},removeBoardAndRedirect:function(e,r,t,i){t=t||a;var o=this.removeBoard(e,r);return this.redirectToBoard(t,i),o},_showUndeleteMessage:function(e,r){var t=n.render(e);t.on("click",".i-role-undo",function(){var t=e.key||e.id;this._viewsMenuService.boardsApi.restoreViewMenuItem(t,e).done(function(){this.redirectToBoard(t,r)}.bind(this))}.bind(this)),this._errorBarService.fire("notification",{id:"board.removed",className:"tau-system-message-success",$node:t,delay:1e4,disableAutoClose:!1})},_getCurrentAcid:function(){return this._configurator.getAppStateStore().settings.acid
},redirectToBoard:function(e,r){var t=this._urlBuilder.getRelativeBoardUrl(e,r);this._routing.redirect(t)},redirectToDefaultBoard:function(){this.redirectToBoard(a)},getNextBoardAfterDeleted:function(e,r){var i=t.chain(e).filter(function(e){return e.key!==r}).groupBy(function(e){return!!e.menuIsVisible}).value(),o=i[!0]||[];return o.length||(o=i[!1]||[]),o[0]}})});
define(["jQuery","Underscore","tau/core/extension.base","tp/mashups","tau/ui/templates/board.main.menu/ui.template.board.system-diagnostics","tau/ui/templates/board.main.menu/ui.template.board.system-diagnostics.full-report","app.path","tau/models/board.customize.units/board.customize.cards.builderSelector","tau/services/customize/service.customize.card.layout.factory","tau/models/board.customize.units/const.card.sizes"],function(t,e,i,s,n,r,o,a,d,c){return i.extend({init:function(t){this._super(t),this.initialized=!1},"bus afterRender:last + initialize:last + boardSettings.ready":function(t,e,i,s){this._configurator=i.context.configurator,this.diagnostics=this._configurator.getDiagnosticsService(),this._window=this._configurator.getWindow(),this._$systemInfo=e.element.find(".tau-system-info"),this._layoutFactory=new d(this._configurator,s.boardSettings),this.initialized||(this._$systemInfo.find(".i-role-diagnostic").click(this._collectDiagnosticData.bind(this)),this.initialized=!0),this._boardSettings=s.boardSettings.settings,this.fire("system.diagnostics.report.initialized")},_collectDiagnosticData:function(){var i=n.render(),s=i.find(".i-role-see-full-report"),o=function(e){s.click(function(){e.find(".i-role-report-body").show(),t(this).hide(),t(".i-role-diagnostics-description").hide()})};o(i);var a=i.find(".i-role-loader");a.show();var d=i.find(".i-role-report-body"),c=t.when(this.diagnostics.networkLatency(),this.diagnostics.networkSpeed(),this._urlContext(),this._boardDefinition(),this.diagnostics.serverUsage(),this._cardsSettings());c.then(function(t,n,o,c,l,u){var h=this._configurator.getLoggedUser(),p={id:h.id,name:h.name,email:h.email,isAdministrator:h.isAdministrator||!1,isObserver:h.isObserver||!1},g={name:this._window.location.host,edition:this._window.tauSystemInfo.edition},f={location:this._window.location.href,timestamp:t.timestamp,age:this._window.tauServerInfo.created,now:new Date},m={latency:t.latency,speed:n.speed},b="context"===o.__type?{processes:o.processes.length,projects:o.projectIdsAvailable.length,selectedProjects:o.selectedProjects.length,teams:o.teamIdsAvailable.length,selectedTeams:o.selectedTeams.length}:"Couldn't get context",_=this.diagnostics.get("board"),y={boardDefinition:c.data,cardsData:u?this._adaptCardsData(u):null,timing:_?{network:_.server,processing:_.client}:null},w={page:f,network:m,context:b,board:y,os:this._window.tauSystemInfo.os,serverUsage:e.isEmpty(l)?null:l,mashups:this._listInstalledMashups(),browser:this.diagnostics.browser(),user:p,account:g,layout:this._pageTypeInfo(),errors:this._getErrors()},v=r.render(w);
d.html(v);var S=i.find(".i-role-send-button");S.removeAttr("disabled").click({data:w,popup:i},this._sendReport.bind(this)),a.hide(),s.show(),this.fire("system.diagnostics.report.rendered",{element:i})}.bind(this)),this._renderReport(i)},_getErrors:function(){var t=this._window.getJavascriptErrors?this._window.getJavascriptErrors():[];return e.chain(t.reverse()).groupBy(function(t){var e=new Date(Date.parse(t.timestamp));return new Date(e.getFullYear(),e.getMonth(),e.getDate())}).map(function(t,e){return{date:new Date(e),errors:t}}).value()},_adaptCardsData:function(t){var i=new a,s=function(t){return e.map(e.keys(t),function(e){return{typeName:e,data:i.build(e,t[e])}})};return t.length?e.flatMap(t,function(t){return s(t)}):s(t)},_cardsSettings:function(){var e=[],i=function(t,i){t.length>0&&e.push(this._layoutFactory.getCardLayoutsByTypesAndSize(t,i))}.bind(this);return"newlist"===this._boardSettings.viewMode?(i(this._boardSettings.cells.types,"list"),i(this._boardSettings.x.types,"list"),i(this._boardSettings.y.types,"list")):i(this._boardSettings.cells.types,c.zoomToSize(this._boardSettings.zoomLevel)),t.when.apply(this,e)},_sendReport:function(t){var e=t.data.popup,i=e.find(".i-role-comment"),s=e.find(".i-role-send-button"),n=t.data.data;n.comment=i.val(),s.text("Sending..."),this.diagnostics.sendReport(n).done(function(){s.text("Sent").attr("disabled","disabled"),i.attr("disabled","disabled"),this.fire("notification",{$node:"<h3>Report sent successfully</h3>"}),this.fire("system.diagnostics.report.sent")}.bind(this)).fail(function(){s.text("Send report"),this.fire("error",{$node:"<h3>There was an error sending report</h3>"}),this.fire("system.diagnostics.report.failed")}.bind(this))},_renderReport:function(t){t.tauPopup({className:"ui-popup_gray",hideOnEscape:!0,popupContent:t}),t.tauPopup("show")},_listInstalledMashups:function(){var t=s.prototype.getRegisteredMashups();return e.map(t,function(t,e){var i=s.prototype.getFolderPathFromKey(e),n=i.split("/");return n[n.length-2]
})},_urlContext:function(){var t=this._configurator.getAppStateStore().settings.acid;return this._configurator.getApplicationContextService().getApplicationContext({acid:t})},_boardDefinition:function(){var e=/(?:=board\/(\d+))/.exec(location.hash),i=e&&e[1];return i?this._configurator.getBoardDefinitionFactory().boardService.getBoardData(i):t.Deferred().resolve({data:null})},_pageTypeInfo:function(){if("none"===this._boardSettings.id)return{pageType:"Entity"};var e=t("body").find(".i-role-board-body"),i={board:"Board",list:"Details",timeline:"Timeline",newlist:"List"};return{viewMode:this._boardSettings.viewMode,pageType:i[this._boardSettings.viewMode],cards:e.find(".i-role-card").length}}})});
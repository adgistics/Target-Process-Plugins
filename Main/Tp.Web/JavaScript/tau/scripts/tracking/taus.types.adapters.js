define(["Underscore"],function(t){var e="@timing",n="--exclude-board-context-flag",i={tick:function(){return(new Date).getTime()},getInfoFromTypes:function(e){if(!e)return"empty";var n=[],i=e.types?e.types:e;return t.isArray(i)&&(n=t.map(i,function(e){return t.isString(e)?e:e.type})),0===n.length?"empty":n.join(",")},getFilter:function(t){return t?t.filter?t.filter:"":""},getBoardContext:function(e){if(!e)return{};var n=this.getInfoFromTypes(e.cells).split(",");1===n.length&&"empty"==n[0]&&(n=[]),n=t.sortBy(n);var i=e.user||{};return{x:{type:this.getInfoFromTypes(e.x),filter:this.getFilter(e.x)},y:{type:this.getInfoFromTypes(e.y),filter:this.getFilter(e.y)},mode:e.viewMode||null,zoomLevel:e.zoomLevel||null,user_cardFilter:i.cardFilter||"",cards:{types:n,filter:this.getFilter(e.cells)},cardSettings:e.cardSettings}},makePlainCleanObject:function(e,n,i,r){var a=this;if(e=e||{},!(t.isUndefined(n)||t.isNull(n)||t.isEmpty(n))){var o=t.isArray(n);if(!t.isObject(n)&&!o)return void(e[i]=n);if(o)return e[i]=[],t.each(n,function(t){t&&e[i].push(a.makePlainCleanObject({},t,"",r))}),e;for(var s=t.keys(n),c=i?i+"_":"",d=0;d<s.length;d++){var l=s[d];t.indexOf(r,l)>=0||a.makePlainCleanObject(e,n[l],c+l,r)}return e}}},r=function(e,n){var i=n?t.pick(n,"mode","zoomLevel","x","y","cards","user_cardFilter"):null;if(i&&"timeline"===(i.mode||"").toLocaleLowerCase()){var r=t.pick(n,"timelineGlobalDateRange","timelineLocalDateRange","timelineSettings");t.extend(i,r)}return t.extend(e,{"@board-context":i})},a={"--app-context-core":function(t){var e,n,i,r;return t.host&&(e=t.host.toLowerCase().replace("http://","").replace("https://","")),t.user&&(n=[e,"user",t.user.id].join("/")),t.path&&(i=t.path),t.acid&&(r=t.acid),this.cntx={appContext:{id:[e,r].join("/"),host:e,version:t.version,acid:r},host:{id:e},user:{id:n},path:i},this.cntx},"--app-context-teams-projects":function(e){var n=function(t){return"null"===t?-1:t};return{_id:this.cntx.appContext.id,host:{id:this.cntx.host.id},teams:e.teams?t.map(e.teams,n):[],projects:e.projects?t.map(e.projects,n):[]}
},"--add-last-view-entity-context":function(t){return t["@view-context"]=this.viewEntityContext||null,t},"--save-last-view-entity-context":function(t){return this.viewEntityContext={id:t.id,type:t.type,sid:+new Date},a["--add-last-view-entity-context"].call(this,t)},"view-entity":function(t){var e=t.tags||[];return e.push("view entity"),t.tags=e,a["--add-last-view-entity-context"].call(this,t)},"to-timing":function(n){var i={};return i[e]=n.t1-n.t0,t.extend(t.omit(n,"t0","t1"),i)},action:function(t){if(t.action=t.action||t.name,!t.action)throw"stats: [action | name] property must be provided for action message";return t},"action.id.sid":function(t){return t._id&&(t._id+="/"+this.sid),t},"--exclude-board-context":function(t){return t[n]=!0,t},"--update-board-context":function(e){return this.boardContext&&t.extend(this.boardContext,e.changes),e},"open-board-action":function(e){var n=e.boardSettings,r=e.definition,o=i.getBoardContext(r),s=t.extend({},n,o);this.boardContext=s;var c=t.extend({action:"open board",tags:["board","open board"],contextBoard:n.acid&&n.acid.length>0?!0:!1},s);c.boardName=c.name||"Unknown board",delete c.cards;var d=o.cards.types.join(",");return d||(d="no cards"),c.name=['open board "',c.boardName,'" ',"[",o.x.type,"/",o.y.type," with cards ",d,"]"].join(""),a["--exclude-board-context"](c)},"slice-request-completed":function(n){var r=function(t){return!n.hasOwnProperty(t)};if(t.any(["command","response",e],r))throw"Invalid argument's properties for [slice-request-completed] adapter";var o=n.command||{},s=n[e],c=n.response||{},d=t.defaults({},o,{config:{$skip:0,$take:0}}),l=parseInt(c.getResponseHeader("X-Stopwatch")),u=c.getResponseHeader("X-Sql-Stopwatch"),p=parseInt(c.getResponseHeader("X-Count")),f=(c.responseText||"").length,m={method:d.method,page:{skip:d.config.$skip,take:d.config.$take},totalTime:s,netTime:s-l,serverTime:l,contentSize:f};return t.keys(o.config||{}).length>0&&(m.params=d.config),isNaN(p)||(m.countOfEntities=p),u&&(m.serverSqlTimes=u.split(";")),i.makePlainCleanObject(m,n.request.definition,"",["global"]),a["--exclude-board-context"](m)
},"slice-detailed-error":function(e){var n=t.extend({place:"slice",board:i.getBoardContext(e.definition)},t.omit(e,"definition"));return a["--exclude-board-context"](n)},"header-menu-click":function(e){var n=e.tags||[],i=n[0]||"click",r=n[1]||"header menu click";return t.extend(e,{action:r,name:r,tags:["board","click","page header","page header item"],area:"page header",event:i})},"--save-statistics_newlist_cardLoad":function(t){return this.latest_statistics_newlist_cardLoad=t,t},"--restore-statistics_newlist_cardLoad":function(){var t=this.latest_statistics_newlist_cardLoad;return delete this.latest_statistics_newlist_cardLoad,t},"--cast-statistics_newlist_cardLoad-to-statistics":function(t){return t.board=t["@board-context"],delete t["@board-context"],t.loadTime=t["@timing"],delete t["@timing"],t},"--global--":function(e){return e[n]||r(e,this.boardContext),delete e[n],t.extend({},e,this.cntx)}};return a});
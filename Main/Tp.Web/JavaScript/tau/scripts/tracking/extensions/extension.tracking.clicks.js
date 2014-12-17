define(["./extension.tracking.base","Underscore","jQuery"],function(t,a,e){return t.extend({track:function(t,e,r){t||(t="body"),r=r||"click",e=e||{},a.defaults(e,{tags:[]});var n=function(t){e.tags.indexOf(t.toLowerCase())<0&&e.tags.push(t)};n("board"),n(r),e.area&&n(e.area);var i={selector:t,data:e,event:r};return this.clickMap[t]=i,{name:function(t){return e.name=t,n(t),this},nameSelector:function(t){return i.nameSelector=t,this},nameTemplate:function(t){return i.nameTemplate=t,this},tag:function(){return a.each(arguments,function(t){n(t)}),this},event:function(t){return i.event=t,n(t),this},area:function(t){return e.area=t,n(t),this}}},trackArea:function(t,a){var e=this;return function(r){var n=t+(r?" "+r:"");return e.track(n,{area:a})}},trackMainMenu:function(){this.track(".tau-user-submenu .tau-menu-item").area("page header menu").tag("context menu");var t=this.trackArea(".tau-teams-projects-manager","project/team selection");t("button"),this.track(".tau-social-share-popup .tau-share-link").area("social sharing").tag("share targetprocess")},trackGettingStarted:function(){this.track(".tau-getting-started .rhino-btn,.tau-getting-started .rhino-bullet").area("getting started popup").tag("getting started")},trackQuickAdd:function(){var t=this.trackArea(".tau-quick-add-dialog","quick add popup");t("button").tag("quick add popup")},trackBoard:function(){this.track(".tau-board-settings-header.i-role-tabheaders").area("board settings").tag("select setting tab").nameTemplate("select [<%= name%>] tab"),this.track(".tau-cellholder .tau-add").area("board").tag("quick add").name("quick add in cell")},trackSidebar:function(){this.track(".tau-pane-collapser").area("sidebar").name("boards menu collapse (expand)"),this.track(".tau-boardselector__headermenu__item").nameTemplate("customize board menu -> <%= name%>").area("sidebar").tag("boards menu header")},startTracking:function(){var t=this,r=function(t){return t?t:null},n=function(t){var a=r(t.text())||r(t.attr("title"))||r(t.data("title"))||r(t.data("label"))||r(t.attr("role"))||"";
return a.toLowerCase()},i=function(t,a){var r;return t.nameSelector?(r=e(t.nameSelector,this).text(),r&&t.data.name&&(r=t.data.name+" "+r),r):(r=t.data.name||n(a)||n(e(this)),r.replace(/[\t\n;]/g,""))},c=function(r){try{var n=e(r.target),c=r.data,u=i.call(this,c,n);if(!u)return;c.nameTemplate&&(u=a.template(c.nameTemplate)({name:u}));var s=a.defaults({name:u,event:c.event},c.data);t.fire("track.action",s)}catch(o){}},u=e("body");a.each(this.clickMap,function(t){u.on(t.event,t.selector,t,c)})},init:function(t){var e=this;e._super(t),t=t||{},t.disableClicksTracking!==!0&&(a.defaults(t,{clickMap:{}}),e.clickMap=t.clickMap,e.trackSidebar(),e.trackMainMenu(),e.trackGettingStarted(),e.trackBoard(),e.trackQuickAdd(),e.startTracking())}})});
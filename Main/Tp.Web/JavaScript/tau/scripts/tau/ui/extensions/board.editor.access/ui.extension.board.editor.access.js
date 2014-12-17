define(["jQuery","Underscore","tau/components/extensions/component.extension.base"],function(e,t,i){return i.extend({getProjectsAndTeams:function(e){function i(e){return parseInt(e.value,10)}return t.map(e.find(".i-role-list :checked"),i)},"bus afterRender + configurator.ready":function(t,i,a){var o=i.data,s=i.element,n=s.find(".i-role-popupcontent"),r=n.find(".i-role-section-teams"),d=n.find(".i-role-section-projects");this.toggleCustomSharedPanel(s,!o.access.customSharedData.isActive),s.on("change","[role=action-share]",function(t){this.handlers[e(t.target).val()].bind(this)(s)}.bind(this));var c=s.find("[role=action-bord-access-notify]");this.getProjectsAndTeams(d).length<1&&this.getProjectsAndTeams(r).length<1&&c.prop("disabled",!0),s.on("click",".i-role-popupcontent :checkbox",function(t){var i=this.getProjectsAndTeams(r),a=this.getProjectsAndTeams(d);e(t.target).is(":checked")?c.prop("disabled",!1):i.length<1&&a.length<1&&c.prop("disabled",!0),this.fireCustomSharedData(!0,!0,i,a)}.bind(this)),this.fire("$el.ready",n),this.fire("$teamSection.ready",r),this.fire("$projectSection.ready",d),this.fire("$sections.ready",n.find(".tau-teams, .tau-projects"));var h=a.getSliceFactory().create({});c.on("click",function(){c.prop("disabled",!0);var e=this.getProjectsAndTeams(r),t=this.getProjectsAndTeams(d),i=a.getUrlBuilder().getBoardPageRelativePath()+a.getUrlBuilder().getRelativeBoardUrl(o.boardId,o.boardAcid);h.notifyBoardAccess({$set:{teamIds:e,projectIds:t,boardUrl:i,boardName:o.boardName}}).done(function(){this.fire("notification",{message:"People will be notified that you've shared a View with them.",delay:3e3})}.bind(this)).fail(function(e){this.fire("error",{message:e.data.responseText.Message,delay:3e3})}.bind(this))}.bind(this))},fireCustomSharedData:function(e,t,i,a){this.fire("form.submitted",{isShared:e,customSharedData:{isActive:t,teamIds:i||[],projectIds:a||[]}})},handlers:{"public":function(e){this.toggleCustomSharedPanel(e,!0),this.fireCustomSharedData(!0,!1)
},"private":function(e){this.toggleCustomSharedPanel(e,!0),this.fireCustomSharedData(!1,!1)},custom:function(e){this.toggleCustomSharedPanel(e,!1),this.fireCustomSharedData(!0,!0)}},toggleCustomSharedPanel:function(e,t){var i=e.find(".i-role-popupcontent");i.toggleClass("tau-disabled",t),i.find("input,button:not([role=action-bord-access-notify])").prop("disabled",t),t&&i.find(":checkbox").prop("checked",!1)}})});
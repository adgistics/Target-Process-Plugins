define(["Underscore","jQuery","tau/core/extension.base"],function(e,t,i){return i.extend({ANY_TEAM_OR_PROJECT:"Any",NO_TEAM_OR_PROJECT:"None","bus afterRender":function(e,t){this.fire("$el.ready",t.element)},"bus configurator.ready:last + $el.ready":function(e,i,r){var s=this,a=r.find(".i-role-action-submit");this.fire("$submitButton.ready",a),a.on("click",function(){s.fire("filter.submitted")}),this.fire("$teamSection.ready",r.find(".tau-teams")),this.fire("$projectSection.ready",r.find(".tau-projects")),this.fire("$sections.ready",r.find(".tau-teams, .tau-projects")),this.fire("$assignSection.ready",r.find(".tau-teams-projects-updater")),r.on("click",".i-role-selecttrigger",function(e){var i=t(e.currentTarget).data(),r="team"==i.entityType?[i.entityId]:[s.ANY_TEAM_OR_PROJECT],a="project"==i.entityType?[i.entityId]:[s.ANY_TEAM_OR_PROJECT];s.fire("model.setFilter",{selectedTeamsIds:r,selectedProjectsIds:a})});var o=r.find(".i-role-process-submit");1===r.find(".tau-projects .i-role-list .i-role-project").length&&o.hide(),o.on("click",function(){this.showSetupProcess(i,r)}.bind(this))},"bus $el.ready:last + filter.submitted":function(e,t){this.fire("model.setFilter",this.getCurrentState(t))},"bus $el.ready + $submitButton.ready":function(e,t,i){t.on("change",":checkbox",function(){i.hasClass("tau-teams-projects-submit_highlighted_true")||i.animateWithCss({cssClassName:"tau-teams-projects-submit_highlighted_true"})})},"bus configurator.ready:last + $teamSection.ready:last + team.add.success":function(e,t,i,r){var s=i.find(":checkbox[value="+r.id+"]").length;s||(this._addToList(i,t.getTemplateFactory().get("board.context.selector.teams.list"),r),i.removeClass("tau-managed-category_isempty_true"),this.fire("team.add.completed"))},"bus configurator.ready:last + $projectSection.ready:last + project.saved":function(e,t,i,r){var s=t.getTemplateFactory().get("board.context.selector.projects.list"),a=i.find(":checkbox[value="+r.id+"]").closest("li");if(0===a.length)this._addToList(i,s,r),i.removeClass("tau-managed-category_isempty_true"),this.fire("project.add.completed");
else{var o=a.closest(".i-role-program",i);o.length&&this.fire("program.save",{id:o.find(".i-role-select-program :checkbox").val()}),!r.program&&o.length&&this._moveInList(i,s,r)}},"bus $el.ready+project.add.completed":function(e,t){var i=t.find(".i-role-process-submit");i.is(":visible")||i.show()},showSetupProcess:function(i,r){var s=r.find(".tau-projects .i-role-list .i-role-project :checked"),a=r.find(".tau-projects .i-role-list .i-role-project :checkbox"),o=s.length>1&&s.length===a.length,n=1===s.length&&s[0].value===this.NO_TEAM_OR_PROJECT,c=!s.length||o||n?a:s,l=e.find(c,function(e){return e.value!==this.NO_TEAM_OR_PROJECT},this);if(l){var d=t(l).data("processId");d&&i.getTp2Service().showEditProcessPopup(i,d)}},getCurrentState:function(e){var t={},i=this,r=function(){return this.value==i.NO_TEAM_OR_PROJECT?i.NO_TEAM_OR_PROJECT:parseInt(this.value,10)},s=e.find(".tau-teams .i-role-list :checked"),a=e.find(".tau-teams .i-role-list :checkbox");return t.selectedTeamsIds=!s.length||s.length>1&&s.length==a.length?[this.ANY_TEAM_OR_PROJECT]:s.map(r).toArray(),s=e.find(".tau-projects .i-role-list .i-role-project :checked"),a=e.find(".tau-projects .i-role-list .i-role-project :checkbox"),t.selectedProjectsIds=!s.length||s.length>1&&s.length==a.length?[this.ANY_TEAM_OR_PROJECT]:s.map(r).toArray(),t},_addToList:function(t,i,r){r.selected=!0;var s=i.bind({},r),a=t.find(".i-role-list"),o=a.find(".i-role-item:first");o.length?o.after(s):a.append(s),a.parent().scrollTo(0,{duration:500}),s.addClass("tau-added"),e.delay(function(){s.removeClass("tau-added")},1500)},_moveInList:function(e,t,i){var r=t.bind({},i),s=e.find(".i-role-list");i.selected?r.insertAt(s,1):r.appendTo(s)}})});
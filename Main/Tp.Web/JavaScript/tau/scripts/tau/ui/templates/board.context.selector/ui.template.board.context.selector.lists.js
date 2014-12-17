define(["tau/core/templates-factory","template!ui.template.board.context.selector.projects.list-with-programs","tau/ui/templates/board.context.selector/ui.template.board.context.selector.teams.list"],function(t){var e={name:"board.context.selector.lists",engine:"jqote2",markup:['<div class="tau-teams-projects-manager i-role-popupcontent">',"<% var filterLimit = 1; %>","<% var hideSearch = this.showSearch === true ? false : (this.teams.length < filterLimit && this.projects.length < filterLimit); %>",'<section class="tau-teams-projects-search" <% if (hideSearch){ %>style="display:none"<% } %> >','<span class="tau-inline-group tau-search">','<input name="filter" type="text" placeholder="Search Projects and Teams" class="tau-in-text">','<button class="tau-btn tau-search" type="button"></button>',"</span>","</section>",'<section class="tau-managed-category <% if (this.teams.length == (this.canAddTeams === false ? 0 : 1)){ %>tau-managed-category_isempty_true tau-no-team<% } %> tau-teams i-role-section-teams">',"<header>",'<label class="tau-checkbox tau-extension-board-tooltip i-role-select-all-item" data-title="Select all teams">','<input <%if (this.checkedAllTeam) {%>checked<%}%> type="checkbox" value="">','<i class="tau-checkbox__icon"></i>','<span class="tau-checkbox-label">Teams</span>',"</label>","<% if (this.canAddTeams !== false) { %>",'<button class="tau-add i-role-formtrigger" type="button">New team</button>',"<% } %>","</header>",'<ul class="tau-category-items-selector i-role-list">','<%= fn.sub("board.context.selector.teams.list", this.teams) %>',"</ul>","<% if (this.canAddTeams !== false) { %>",'<div class="tau-no-message">','<div class="tau-img"></div>',"<p>Team is a group of people working together toward a common vision. Teams can work on projects.</p>",'<div class="tau-btn-wrap"><button class="tau-btn tau-success i-role-formtrigger" type="button">Create team</button></div>',"</div>","<% } %>",'<div class="tau-managed-category__message tau-managed-category__message_not-found" data-text-nofound="No such team found" data-text-noitems="No available teams"></div>','<div class="tau-managed-category__message tau-managed-category__message_isempty">You need to have some teams for custom sharing.</div>',"</section>",'<section class="tau-managed-category <% if (this.projects.length == (this.canAddProjects === false ? 0 : 1)){ %>tau-managed-category_isempty_true tau-no-project<% } %> tau-projects i-role-section-projects">',"<header>",'<label class="tau-checkbox tau-extension-board-tooltip i-role-select-all-item" data-title="Select all projects">','<input <%if (this.checkedAllProject) {%>checked<%}%> type="checkbox">','<i class="tau-checkbox__icon"></i>','<span class="tau-checkbox-label">Projects</span>',"</label>","<% if (this.canAddProjects !== false) { %>",'<button class="tau-add i-role-formtrigger" type="button">New project</button>',"<% } %>","</header>",'<ul class="tau-category-items-selector i-role-list">','<%= fn.sub("board.context.selector.projects.list-with-programs", this.projects) %>',"</ul>","<% if (this.canAddProjects !== false) { %>",'<div class="tau-no-message">','<div class="tau-img"></div>',"<p>You usually need a project to deliver results. Projects hold all the work that needs to be done.</p>",'<div class="tau-btn-wrap"><button class="tau-btn tau-success i-role-formtrigger" type="submit">Create project</button></div>',"</div>","<% } %>",'<div class="tau-managed-category__message tau-managed-category__message_not-found" data-text-nofound="No such project found" data-text-noitems="No available projects"></div>','<div class="tau-managed-category__message tau-managed-category__message_isempty">You need to have some projects for custom sharing.</div>',"</section>","<% if (this.isEmailNotificationsEnabled){ %>",'<section class="tau-board-send-notification">','<button class="tau-btn tau-board-send-notification-submit i-role-action-bord-access-notify" role="action-bord-access-notify" type="button">Send Notification</button>',"</section>","<% } %>",'<section class="tau-teams-projects-updater <% if (this.teams.length > 1 || this.projects.length > 1){ %> tau-teams-projects-updater_state_enabled<% } %>">','<button class="tau-btn tau-primary tau-teams-projects-submit i-role-action-submit" role="action-submit" type="button">','<%= (this.submitLabel || "Show") %>',"</section>","</div>"]};
return t.register(e)});
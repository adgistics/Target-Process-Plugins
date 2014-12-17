define(["tau/core/templates-factory"],function(e){var t={name:"finder.project.add.form",engine:"jqote2",markup:['<form class="tau-new-item_active_false i-role-form">','<div class="tau-new-entity-form">','<div class="tau-new-entity-info">','<span class="tau-select-team-icon">','<i class="tau-icon tau-icon_type_color tau-icon_name_default i-role-currenticon" data-value="default"></i>',"</span>",'<input name="name" type="text" placeholder="Enter project name here"  class="tau-in-text tau-new-entity-name">','<select name="color" style="display:none;">','<option value=""></option>',"<% _.each(this.colors, function(item){ %>",'<option value="<%= item %>"><%= item %></option>',"<% }); %>","</select>","</div>",'<ul class="tau-teams-icon-list i-role-richselect">','<li><i class="tau-icon tau-i-close i-role-option" data-value=""></i></li>',"<% _.each(this.colors, function(item){ %>",'<li><i class="tau-icon tau-icon_type_color i-role-option" style="background-color:<%= item %>;" data-value="<%= item %>"></i></li>',"<% }); %>","</ul>",'<div class="tau-new-entity-process">','<label><div class="tau-note">Select process</div>','<select class="tau-select" name="process">',"<% _.each(this.processes, function(item){ %>",'<option <% if (item.isDefault){ %>selected<% } %> value="<%= item.id %>"><%! item.name %></option>',"<% }); %>","</select></label>","</div>","<% if (this.programs && this.programs.length) { %>",'<div class="tau-new-entity-program">','<label><div class="tau-note">Select program</div>','<select class="tau-select" name="program">',"<% _.each(this.programs, function(program) { %>",'<option <% if (program.isDefault) { %>selected<% } %> value="<%= program.id %>"><%! program.name %></option>',"<% }); %>","</select></label>","</div>","<% } %>",'<div class="tau-invite-widget">','<div class="tau-note">Invite people</div>','<textarea name="users" placeholder="Start typing name(s) or email(s) to assign people to a project" />','<div class="tau-invite-footer">','<button class="tau-btn tau-success" type="submit">Create project</button>','<button class="tau-btn" type="reset">Cancel</button>',"</div>","</div>","</div>","</form>"]};
return e.register(t)});
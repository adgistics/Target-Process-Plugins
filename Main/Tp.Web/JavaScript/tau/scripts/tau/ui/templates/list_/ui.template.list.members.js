define(["tau/core/templates-factory"],function(t){var e={name:"list.members",engine:"jqote2",markup:['<div class="tau-teamView">','<% var name = this.config&&this.config.currentView.name||"team";%>','<% var isProject = name === "project";%>',"<% if (this.items.length){ %>",'<table class="tau-table">',"<colgroup>",'<col class="tau-teamView-people">','<col class="tau-teamView-role">','<col class="tau-teamView-activity">','<col class="tau-teamView-assignments">',"<%if(isProject){%>",'<col class="tau-teamView-startDate">','<col class="tau-teamView-endDate">',"<%}%>",'<col class="tau-teamView-actions tau-nonprintable">',"</colgroup>","<thead>","<tr>","<th>People</th>","<th>Role</th>","<th>Activity</th>","<th>Assignments</th>","<%if(isProject){%>","<th>Start Date</th>","<th>End Date</th>","<%}%>",'<th class="tau-nonprintable"></th>',"</tr>","</thead>","<tbody>","<% _.forEach(this.items, function(item){ %>",'<tr class="<% if (!item.user.isActive){ %>tau-inactive-tr<% } %> i-role-item" role="item" data-entity-id="<%= item.id %>">',"<td>",'<div class="tau-user-info">','<a href="<%= item.user.url %>">','<img width="20" height="20" alt="" class="tau-avatar" src="<%= item.user.avatarUri %>20">',"</a>",'<div class="tau-user-personal-data">','<div class="tau-name"><a href="<%= item.user.url %>"><%! item.user.name %></a></div>','<div class="tau-email"><a href="<%= item.user.url %>"><%! item.user.email %></a></div>',"</div>","</div>","</td>","<td>","<div>",'<span runas="property.role.modern" data-context:general:id="<%= item.id %>" data-context:general:entity-type:name="<%=name%>Member">',"<%! item.role.name %>","</span>","</div>","<% if (item.user.isAdministrator){ %>",'<span class="tau-user-system-role">admin</span>',"<% } %>","<% if (!item.user.isActive){ %>",'<span class="tau-user-system-role tau-user-system-role-inactive">inactive</span>',"<% } %>","</td>",'<td title="Activity sparkline provides an overview of progress over the last 16 weeks. The numbers shown are: a maximum of assignments done/added at any given week out of those 16, and done/added in the current calendar week (on the right).">',"<svg class=\"tau-sparkline tau-sparkline-user i-role-sparkline\" data-source='<%= JSON.stringify(item.allSparkline) %>'></svg>","</td>","<td>",'<div class="tau-user-assignments">','<span title="open tasks"><i class="tau-entity-icon tau-entity-icon--task"><%= fn.term("task", "iconSmall") %></i><b><%= item.user.tasksCount %></b></span>','<span title="open bugs"><i class="tau-entity-icon tau-entity-icon--bug"><%= fn.term("bug", "iconSmall") %></i><b><%= item.user.bugsCount %></b></span>','<span title="open user stories"><i class="tau-entity-icon tau-entity-icon--userstory"><%= fn.term("userStory", "iconSmall") %></i><b><%= item.user.userStoriesCount %></b></span>',"</div>","</td>","<%if(isProject){%>","<td>",'<div class="tau-user-startDate">','<div runas="property.startDate.projectMember" data-context:general:id="<%= item.id %>" data-context:general:entity-type:name="<%=name%>Member">',"</div>","</div>","</td>","<td>",'<div class="tau-user-endDate">','<div runas="property.endDate.projectMember" data-context:general:id="<%= item.id %>" data-context:general:entity-type:name="<%=name%>Member">',"</div>","</div>","</td>","<%}%>",'<td class="tau-nonprintable"><button type="button" class="tau-btn tau-attention" role="action-detach">Unassign</button></td>',"</tr>","<% },this); %>","</tbody>","</table>","<% }else{ %>",'<div class="tau-message">There are no people in this <%=name%></div>',"<% }  %>","</div>"]};
return t.register(e)});
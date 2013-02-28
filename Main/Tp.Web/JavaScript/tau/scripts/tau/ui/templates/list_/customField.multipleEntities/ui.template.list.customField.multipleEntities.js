define(["tau/core/templates-factory","tau/utils/utils.date"],function(templates,dateUtils){var config={name:"list.customField.multipleEntities",engine:"jqote2",customFunctions:{dateToString:function(dateStr){return dateUtils.format.date.short(dateUtils.convertToTimezone(dateStr))}},markup:['<div class="tau-container tau-list tau-list__group_flat_true">','<div class="ui-quick-add"><span class="ui-link ui-quick-add-link i-role-action-attach">Add Item</span></div>',"<% if (this.items.length == 0){ %>",'<div class="tau-list__empty-message">No items.</div>',"<% } else { %>",'<table class="tau-list__table tau-list__list" role="list"><tbody>',"<% _.forEach(this.items, function(item){ %>","<% _.forEach(item.items, function(row){ %>",'<tr class="i-item-<%= row.id %> tau-list__table__row" role="item">','<td class="tau-list__table__cell tau-list__table__cell-id tau-list__list__item" >','<a href="#<%= row.__type.toLowerCase()%>/<%= row.id %>"><em class="ui-type-icon ui-type-icon-<%= row.__type.toLowerCase()%>"><%= row.id %></em></a>',"</td>",'<td class="tau-list__table__cell tau-list__table__cell-name tau-list__table__cell-padding  tau-list__list__item" width="30%"><%= row.name %></td>','<td class="tau-list__table__cell tau-list__table__cell-name  tau-list__list__item"><%= row.project ? row.project.abbreviation : "" %></td>','<td class="tau-list__table__cell tau-list__list__item"><%= (row.lastStatus !== undefined) ? (row.lastStatus ? "Passed" : "Failed") : (row.entityState ? row.entityState.name : "") %></td>','<td class="tau-list__table__cell tau-list__table__cell-name  tau-list__list__item"><%= row.release ? row.release.name : "" %></td>','<td class="tau-list__table__cell tau-list__table__cell-name  tau-list__list__item"><%= row.iteration ? row.iteration.name : "" %></td>','<td class="tau-list__table__cell tau-list__list__item"><%= row.buildDate ? fn.dateToString(row.buildDate) : fn.dateToString(row.startDate) %></td>','<td class="tau-list__table__cell tau-list__list__item"><%= fn.dateToString(row.endDate) %></td>','<td class="tau-list__table__cell tau-list__list__item">',"<% if (row.assignments && row.assignments.length) { _.forEach(row.assignments, function(assignment){ %>",'<span class="ui-assignment__group__users">','<span class="ui-assignment__user user tau-avatar_<%= assignment.generalUser.id %> tau-bubble-target" userid="<%= assignment.generalUser.id %>">','<img class="user-name ui-link" title="<%= assignment.generalUser.firstName %> <%= assignment.generalUser.lastName %>" alt="<%= assignment.generalUser.firstName %> <%= assignment.generalUser.lastName %>" style="width:24px; height:24px;" src="<%= assignment.generalUser.avatarUri %>32">',"</span>","</span>","<% }); } %>","</td>",'<td class="tau-list__table__cell tau-list__table__cell-remove tau-list__list__item">','<a class="button small i-role-action-detach" data-entity-type="<%= row.__type.toLowerCase() %>" data-entity-id="<%= row.id %>">Remove</a>',"</td>",'<td width="1"></td>',"</tr>","<% }); %>","<% }); %>","</tbody></table>","<% }  %>","</div>"]};return templates.register(config)})
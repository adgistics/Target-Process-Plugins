define(["tau/core/templates-factory"],function(templates){var config={name:"board.editor.axisTypes",engine:"jqote2",markup:["<% var UIID = _.UUID();  %>","<% _.forEach(this.grouped, function(group){ %>",'<% if (group.name != "default") { %>','<option value="<%! group.name + UIID %>" disabled="">----- <%! group.name %> -----</option>',"<% } %>","<% _.forEach(group.items, function(item){ %>","<% if (item.isAvailable){ %>",'<option value="<%= item.id %>" ',"<% if (item.isSelected){ %>","selected ","<% } %> ",">","<%! item.name %>","</option>","<% } %> ","<% }); %>","<% }); %>"]};return templates.register(config)})
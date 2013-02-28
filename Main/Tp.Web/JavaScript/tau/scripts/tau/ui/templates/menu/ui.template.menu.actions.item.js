define(["tau/core/templates-factory"],function(templates){var config={name:"menu.actions.item",engine:"jqote2",markup:["<% if (this.url) { %>",'<div class="ui-menu__item ui-menu__item-action ui-menu__item-action-link <%= this.className %>">','<a class="drop-down-option" href="<%= this.url %>">',"<%= this.label %>","</a>","</div>","<% } else if (this.label) { %>",'<div class="ui-menu__item ui-menu__item-action <%= this.className %> <%= this.alias? "i-role-action-"+this.alias.toLowerCase():"" %> " data-id="<%= this.id||"" %>" data-name="<%= this.name||"" %>" data-alias="<%= this.alias %>">',"<% if (this.icon){ %>",'<span class="drop-down-option">','<i class="tau-entity-icon <%= this.className %>"><%= this.icon %></i>',"<%= this.label %>","</span>","<% } else { %>",'<span class="drop-down-option">',"<%= this.label %>","</span>","<% } %>","</div>","<% } else { %>",'<div class="ui-menu__item-separator">-----</div>',"<% } %>"]};return templates.register(config)})
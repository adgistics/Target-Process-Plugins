define(["tau/core/templates-factory"],function(templates){var config={name:"board.selector.item",engine:"jqote2",markup:['<li class="tau-boardselector__item tau-boardselector__item_type_<%= this.viewMode %> i-role-item',"<% if (this.isActive){ %> tau-boardselector__item_active_true<% } %> ","<% if (this.isShared){ %> tau-boardselector__item_access_public <% } else { %> tau-boardselector__item_access_private <% } %> ",'" ','data-id="<%= this.key %>" data-acid="<%= this.acid %>" data-menu-numeric-priority="<%= this.menuNumericPriority %>" >','<a class="tau-boardselector__link" href="#page=board/<%= this.key %>" data-id="<%= this.key %>" data-acid="<%= this.acid %>"><span><%! this.name %></span></a>',"</li>"],dependencies:[]};return templates.register(config)})
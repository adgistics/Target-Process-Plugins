define(["tau/core/templates-factory"],function(templates){var config={name:"boardplus.card.tags",engine:"jqote2",markup:["<% for (var i = 0, c = this.tags.length; i < c; i++){ %>",'<span class="tau-tag"><%= tags[i] %></span>',"<% } %>"]};return templates.register(config)})
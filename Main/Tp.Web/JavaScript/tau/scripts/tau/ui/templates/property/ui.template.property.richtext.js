define(["tau/core/templates-factory"],function(e){var i={name:"property.richtext",engine:"jqote2",markup:['<div class="ui-description tau-clientinput <% if (!this.value){ %>ui-field_empty_true<% } %>">','<div class="ui-description__inner i-role-property" data-placeholder="<%= this.placeholder %>">',"<%= fn.sanitize(this.value) %>","</div>","</div>"]};return e.register(i)});
define(["tau/core/templates-factory"],function(templates){var config={name:"buttonGroup",engine:"jqote2",markup:["<% for(var i=0; i<this.items.length; i++){%>",'<button data-id="<%= this.items[i].id %>" data-name="<%= this.items[i].name%>"','class="i-role-selector tau-btn tau-<%=this.items[i].name.toLowerCase()%> <%= (this.items[i].isSelected ? "tau-checked" : "")%>">',"<%= this.items[i].label %>","</button>","<%}%>"]};return templates.register(config)})
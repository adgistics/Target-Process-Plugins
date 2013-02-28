define(["Underscore","tau/core/templates-factory","tau/utils/utils.date"],function(_,templates,UtilsDate){var config={name:"boardplus.card.customFields",engine:"jqote2",customFunctions:{formatDate:function(date){var date=UtilsDate.parse(date);return date.toString("MMM yyyy")},isDate:function(value){return _.isDate(UtilsDate.parse(value))}},markup:[['<span class="tau-customField"><%=this.name%>: ','<%if (this.type === "Date"){ %>',"<%=fn.formatDate(this.value)%>","<%}%>","<% else {%>","<%= this.value%>","<%}%>","</span>"].join("")]};return templates.register(config)})
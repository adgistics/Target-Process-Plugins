define(["tau/core/templates-factory"],function(t){var a={name:"board.editor.customize.editor.list.unit",engine:"jqote2",markup:['<div data-rank="<%=this.unit.settings.metaData.rank%>" class="tau-canvas-board-unit-cell">','<div class="tau-board-unit-label">',"<%! fn.replaceTermTags(this.unit.settings.metaData.header)%>","<% this.unit.settings.metaData.typesNames.forEach(function(type, index) {%>","<% if(this.unit.settings.metaData.showTypes) {%>",' <span class="tau-entity tau-text_type_<%= type.typeId%>"><%= type.short%></span>',"<%}%>","<%}, this);%>","</div>",'<div class="tau-board-unit-wrap">','<%= fn.sub(this.unit.getTemplateName("card"), [{settings:this.unit.settings,data:this.unit.sampleData,configurator:this.configurator}])%>',"</div>","</div>"]};return t.register(a)});
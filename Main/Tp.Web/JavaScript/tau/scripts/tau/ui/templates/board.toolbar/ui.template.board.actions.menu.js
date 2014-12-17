define(["tau/nls/translator","tau/core/templates-factory"],function(t,a){var s={name:"actions-button-menu",engine:"jqote2",markup:['<div class="actions-menu-items i-role-bubble-holder">','<div class="tau-board-actions-item"><span class="options-button"></span>','<button role="action-toggle-editor" class="tau-btn tau-btn-settings tau-board-settings-toggle" type="button">'+t("Set up View")+"</button>",'<div class="tau-txt">'+t("Go to View settings.")+"</div>","</div>",'<div class="tau-board-actions-item"><span class="clone-board-button"></span><div class="tau-txt">Make a copy of this View.</div></div>',"<% if (this.boardTemplatesEnabled) { %>",'<div class="tau-board-actions-item"><span class="save-template-button"></span><div class="tau-txt">This View will appear in the Templates tab as a new template.</div></div>',"<% } %>",'<div class="tau-board-actions-item"><span class="tau-csv"></span><div class="tau-txt">Export all the cards from this View to a .CSV file</div></div>',"<% if (this.model.isEditable) { %>",'<div class="tau-board-actions-item"><span class="remove-board-button"></span><div class="tau-txt">Only this View as a configurable view will be removed. The data will remain safe.</div></div>',"<% } %>","<% if (this.model.isPrintable) { %>",'<div class="tau-board-actions-item"><span class="print-board-button"></span><div class="tau-txt">Print all visible cards from this View</div></div>',"<% } %>","<% if (this.model.canSetupStates) { %>",'<div class="tau-board-actions-item"><span class="setup-states-button"></span><div class="tau-txt">Configure workflow for selected projects</div></div>',"<% } %>","</div>"]};return a.register(s)});
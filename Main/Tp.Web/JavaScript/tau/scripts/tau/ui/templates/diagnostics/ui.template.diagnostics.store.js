define(["tau/core/templates-factory","tau/ui/templates/diagnostics/ui.template.diagnostics.storeListeners.details"],function(templates){var config={name:"diagnostics.storeListeners",markup:['<div class="tau-diagnostics-storeListeners">',,"<table>",'{{each data}}<tr class="tau-diagnostics-row"><td>${items.length}</td><td>${name}</td><td>{{tmpl(items) "diagnostics.storeListeners.details"}}</td></tr>{{/each}}',"</table>","</div>"],dependencies:["diagnostics.storeListeners.details"]};return templates.register(config)})
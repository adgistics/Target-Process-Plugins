define(["tau/core/templates-factory"],function(a){var b={name:"property-last-status",markup:["<div>",'   <div class="ui-status {{if value === true}}ui-status_type_passed green{{/if}}{{if value === false}}ui-status_type_failed red{{/if}}{{if value === null}}ui-status_type_na grey{{/if}}">',"   {{if value === true}}","       Passed","   {{/if}}","   {{if value === false}}","       Failed","   {{/if}}","</div>","</div>"].join("")};return a.register(b)})
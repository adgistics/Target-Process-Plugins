define(["tau/core/templates-factory"],function(templates){var config={name:"attachments-preview-attachment-thumbnail",markup:["<li>",'   <img class="ui-attach-thumbnail{{if selected}} selected{{/if}}" src="${thumbnailUri}"   />',"</li>"].join("")};return templates.register(config)})
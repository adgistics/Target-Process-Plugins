define(["tau/core/templates-factory"],function(templates){var config={name:"list-item-assignments-user",markup:['<b class="assigned-user">${name}</b>',"{{if $data !== $item.last}}&nbsp;|&nbsp;{{/if}}"].join("")};return templates.register(config)})
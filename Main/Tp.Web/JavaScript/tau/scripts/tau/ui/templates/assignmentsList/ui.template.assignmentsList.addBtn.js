define(["tau/core/templates-factory"],function(templates){var config={name:"assignments-add-btn",markup:['<button class="add-btn',"{{if allowAdd == false}}"," disabled","{{/if}}",'" type="button"><div>AddAssignment</div></button>'].join(""),dependencies:[]};return templates.register(config)})
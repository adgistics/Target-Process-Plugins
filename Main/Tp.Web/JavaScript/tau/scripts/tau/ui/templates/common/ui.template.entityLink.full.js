define(["tau/core/templates-factory"],function(t){var e={name:"entity-link-full",markup:['<a href="${url}" class="tau-linkentity tau-linkentity_type_full">','<em class="tau-entity-icon tau-entity-icon--${__type.toLowerCase()} tau-linkentity__icon">${id}</em>','<span class="tau-linkentity__inner">',"{{if text}}${text}{{else}}${name}{{/if}}","</span>","</a>"],dependencies:[]};return t.register(e)});
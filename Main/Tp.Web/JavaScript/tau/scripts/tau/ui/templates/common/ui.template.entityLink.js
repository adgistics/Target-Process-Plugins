define(["tau/core/templates-factory","tau/ui/tags/ui.tag.term"],function(e,t){var a={tags:[t],name:"entity-link",markup:['<a href="${url}" class="ui-link-entity">','<em class="tau-entity-icon tau-entity-icon--${__type.toLowerCase()}">${id}</em>',"</a>&nbsp;&nbsp;"],dependencies:[]};return e.register(a)});
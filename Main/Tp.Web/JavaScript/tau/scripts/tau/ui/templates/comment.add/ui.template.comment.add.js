define(["tau/core/templates-factory","template!tau/ui/templates/comment.add/ui.template.comment.mention.hint"],function(t){var e={name:"comment.add",engine:"jqote2",markup:['<div class="ui-comment-new">','<div class="ui-comment-heading">','<img class="ui-comment-avatar" src="<%= this.avatar %>" title="<%! this.fullName %>" />',"</div>",'<div class="ui-comment-editor-placeholder tau-clientinput">','<div class="ui-comment-text"></div>','<%= fn.sub("comment.mention.hint", {}) %>',"</div>","</div>"]};return t.register(e)});
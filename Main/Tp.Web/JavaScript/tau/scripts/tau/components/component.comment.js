define(["tau/components/component.creator","tau/components/extensions/component.creator.extension","tau/ui/extensions/comments/ui.extension.comment.editable","tau/models/model.comment.editable","tau/ui/extensions/comments/ui.extension.comment.practices.notification","tau/ui/templates/comments/ui.template.comments.comment"],function(a,b,c,d,e,f){return{create:function(g){var h={extensions:[d,c,e,b],template:f};return a.create(h,g)}}})
define(["tau/components/component.creator","tau/models/model.avatar","tau/ui/extensions/avatar/ui.extension.avatar.editor","tau/components/extensions/error/extension.errorBar","tau/ui/templates/avatar/ui.template.avatar.editor"],function(creator,ModelAvatar,ExtensionAvatarEditor,ErrorExtension,template){return{create:function(config){var creatorConfig={name:"avatar.editor",extensions:[ModelAvatar,ExtensionAvatarEditor,ErrorExtension],template:template};return config["queue.bus"]=!0,creator.create(creatorConfig,config)}}})
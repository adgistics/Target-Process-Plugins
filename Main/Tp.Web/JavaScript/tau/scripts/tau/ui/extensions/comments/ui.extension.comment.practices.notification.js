define(["Underscore","jQuery","tau/components/extensions/component.extension.base","tau/ui/templates/comment.add/ui.template.comment.notifications"],function(e,t,n,o){var i=n.extend({category:"edit","bus editorSave":function(){if(this.globalSettings.IsEmailNotificationsEnabled){var e=this;e.config.store.on({eventName:"beforeSave",type:"comment",listener:e},function(t){var n=t.data;e.beforeSaveComment(n)})}},"bus $editorHolder.ready":function(e,t){var n={config:this.config};this.globalSettings=n.config.context.applicationContext.globalSettings||{};var i=n.config.context.configurator,a=n.config.context.entity,s=a.entityType.name.toLowerCase();if(this.globalSettings.IsEmailNotificationsEnabled){var c=i.getTemplateFactory().get(o.name).bind({},{owner:!0,assigned:!0,requesters:"request"==s,team:"request"!==s});c.prependTo(t.find(".ui-richeditor__controls")),this.placeHolder=c}},"bus destroy":function(){this.config.store.unbind(this),this._super.apply(this,arguments)},beforeSaveComment:function(e){var n=this.placeHolder.find('input[type="checkbox"]'),o={};n.each(function(e,n){var i=t(n);i.prop("checked")&&(o[i.val()]=!0)}),e.cmd["comment-practices-notification-opts"]=o}});return i});
define(["jQuery","tau/core/extension.base.stateful"],function($,ExtensionBase){return ExtensionBase.extend({"bus boardSettings.ready:last + afterRender":function(evt){var self=this,configurator=this.config.context.configurator,boardSettings=evt["boardSettings.ready"].data.boardSettings,$el=evt.afterRender.data.element;$el.delegate("[role=action-remove]","click",function(){if(!confirm($(this).data("confirmMessage")))return;var storage=configurator.getRestStorage(),id=boardSettings.settings.id;storage.remove(boardSettings.getGroupName(),{$key:id}).done(function(){self.fire("remove.board",{board:{id:id}}),configurator.getHistory().exclude(id);var prev=configurator.getHistory().pop(),prevId="current";configurator.getRouting().redirect(configurator.getUrlBuilder().getRelativeBoardUrl(prevId))})})}})})
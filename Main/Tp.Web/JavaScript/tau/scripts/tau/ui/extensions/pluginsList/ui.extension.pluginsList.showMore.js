define(["Underscore","jQuery","tau/components/extensions/component.extension.base"],function(_,$,ExtensionBase){var pluginsListShowMore=ExtensionBase.extend({"bus dataBind+afterRender":function(evtArgs){this.element=evtArgs.afterRender.data.element,this.dataToBind=evtArgs.dataBind.data,_(this.element.find(".plugin-block")).each(function(element){var pluginBlock=$(element),profilesMoreCount=pluginBlock.tmplItem().data.profilesMore.length;if(profilesMoreCount>0){var moreProfilesElement=pluginBlock.find(".tau-profiles-more"),moreLink=pluginBlock.find(".tau-profiles-moreLink");moreLink.show(),moreLink.click([moreLink,moreProfilesElement],$.proxy(this.onShowMoreClick,{profilesMoreCount:profilesMoreCount}))}},this)},onShowMoreClick:function(evt){evt.preventDefault();var moreLink=evt.data[0].find(".more-link"),moreProfilesElement=evt.data[1];moreProfilesElement.is(":visible")?moreLink.text(["Show more (",this.profilesMoreCount,")"].join("")):moreLink.text("Show less"),moreProfilesElement.animate({opacity:"toggle",height:"toggle"},"slow")}});return pluginsListShowMore})
define(["Underscore","tau/components/extensions/component.extension.base"],function(_,ExtensionBase){return ExtensionBase.extend({"bus action.add":function(evt){var entity=evt.data.entity,configurator=this.config.context.configurator;configurator.getRouting().redirect(configurator.getUrlBuilder().getAddTestCaseForTestPlanRunUrl(entity.id))}})})
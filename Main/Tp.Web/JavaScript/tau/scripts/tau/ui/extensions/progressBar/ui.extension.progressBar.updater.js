define(["tau/components/extensions/component.extension.base","tau/ui/behaviour/overlay/ui.behaviour.overlay"],function(ExtensionBase){var progressBarUpdater=ExtensionBase.extend({"bus afterRender":function(evt){this.$el=evt.data.element,this.config.context.getTimeTrackingPolicies().disableSpentRemain&&this.$el.find(".ui-progressbar__data").hide()},"bus roleEffortChanged":function(){this.fire("refresh")},"bus remainTimeChanged":function(){this.fire("refresh")},"bus beforeChanges":function(evt){this.$el.tauOverlay()},"bus applyChanges":function(evt){this.$el.tauOverlay("hide"),this.fire("refresh")}});return progressBarUpdater})
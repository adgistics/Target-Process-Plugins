define(["Underscore","tau/core/component-base","tau/views/view.container","tau/components/extensions/component.creator.extension","tau/ui/extensions/layout/ui.extension.layout","tau/ui/extensions/collapsibleHeader/ui.extension.collapsibleHeader","tau/ui/templates/collapsibleHeader/ui.template.collapsibleHeader"],function(_,ComponentType,ViewType,ComponentCreatorExtension,LayoutExtension,CollapsibleHeaderExtension,template){return{create:function(config){return config=config||{},_.defaults(config,{template:template,cssClass:"ui-collapsible-header",childrenContainerSelector:".ui-children-container"}),(new ComponentType(config)).attach(ComponentCreatorExtension).attach(LayoutExtension).attach(CollapsibleHeaderExtension).attach(ViewType).bus}}})
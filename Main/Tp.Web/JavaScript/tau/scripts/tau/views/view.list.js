define(["tau/core/view-base"],function(ViewBase){return ViewBase.extend({name:"view.list","bus initialize":function(evt){var viewConfig=this.config.views[0];viewConfig.type=viewConfig.type||"grid";var listTemplateName=["tau/ui/templates/list_/",viewConfig.type,"/ui.template.list.",viewConfig.type].join(""),self=this;require([listTemplateName],function(listTemplate){self.config.template=listTemplate,self.startLifeCycle(evt)})}})})
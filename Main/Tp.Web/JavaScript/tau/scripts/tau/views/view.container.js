define(["Underscore","jQuery","tau/core/view-base","tau/core/event-dispatcher","tau/ui/templates/container/ui.template.container.list","tau/ui/templates/container/ui.template.container.table"],function(a,b,c,d){var e=c.extend({init:function(a){this._loaded=!1,this._super(a)},completeInitializationWithoutChildren:function(){var a=this;a.fire("afterInit"),a._fireChildrenRendered({children:[],childrenEvtArgs:[]})},setDefaultConfig:function(){var b=this;b._super(),a.defaults(b.config,{template:{name:"container."+(b.config.layout||"list")}})},"bus componentCreated":function(a){var b=a.data.component;this.fire("childComponentCreated",b),this.children.push(b)},_fireChildrenRendered:function(a){this.fire("internalChildrenRendered",a)},"bus afterInit+internalChildrenRendered":function(b){var c=this._getRenderConfig();this.fireBeforeRender({data:c}),this.doRender(c);var d=b.internalChildrenRendered.data;a.extend(d,{config:this.config}),this.fire("childrenRendered",d),this.fireAfterRender({data:c})},initializeComponents:function(b){var c=this;c.dispatcher=new d(c.children);var e=["afterInit"],f=function(a){c.fire(a.eventName)};a(e).each(function(a){c.dispatcher.listen(a,f)}),c.dispatcher.listen("afterRender",function(a){var b=a.argsArr,d={children:c.children,childrenEvtArgs:b};c._fireChildrenRendered(d)});var g=a(b.data).pluck("config");a(c.children).each(function(a,b){a.fire("initialize",g[b])})},"bus componentsCreated":function(a){this.fire("beforeComponentsInitialize",a.data),this.initializeComponents(a),this.fire("afterComponentsInitialize",a.data)},lifeCycleCleanUp:function(){this.destroyChildren()},"bus refresh":function(a){this.startLifeCycle()},startLifeCycle:function(b){var c=this;c.setDefaultConfig(),a.extend(c.config,(b||{}).data),c.fire("beforeInit",{config:c.config});var d=c.config.children;c.children=[];var e=a.size(d)>0&&c.config.visible;if(e){var f=c.config.children,g=c.config.context||{};this.fire("createComponents",{components:f,context:g})}else c.completeInitializationWithoutChildren()},"bus initialize":function(a){this.startLifeCycle(a)},hideElement:function(){if(this._loaded&&!b.fx.off){this.element.slideUp(200);return}this._super()},showElement:function(){if(!b.fx.off){this.element.slideDown(200);return}this._super()},"bus show":function(){this._super(),this._loaded||this.fire("initialize",{})},_getRenderConfig:function(){var a=this.config;return a.visible&&(this._loaded=!0),a},destroyChildren:function(){var a=null;if(this.children&&this.children.length)while(a=this.children.pop())a.destroy();this.children=null},destroy:function(){this.dispatcher=null,this.destroyChildren(),this._super()}});return e})
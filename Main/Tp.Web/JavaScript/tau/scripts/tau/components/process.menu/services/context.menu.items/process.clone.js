define(["require","tau/core/class","Underscore"],function(e){var n=e("tau/core/class"),t=e("Underscore");return n.extend({init:function(){this.onTrigger=t.Callbacks()},getMenuItemClassName:t.constant("i-role-menu-action-clone"),getContent:t.constant("Clone"),getTooltipText:t.constant("Clone this Process"),actionHandler:function(e){taus.track({action:"clone process from menu",tags:["processMenu"]}),this.onTrigger.fire(e.process),e.destroyBubble()}})});
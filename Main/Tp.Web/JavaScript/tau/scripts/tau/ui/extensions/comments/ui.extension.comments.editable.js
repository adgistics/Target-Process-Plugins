define(["Underscore","jQuery","tau/components/extensions/component.extension.base"],function(e,t,n){var i=n.extend({category:"edit",destroy:function(){var e=this;e.destroyDynamicComponents(),e._super()},destroyDynamicComponents:function(){var e=this;e.commentListComponent&&(e.commentListComponent.destroy(),delete e.commentListComponent)},"bus dataBind+afterRender":function(e){var t=this;t.destroyDynamicComponents();var n={comments:e.dataBind.data.items},i=this.element=e.afterRender.data.element,o=".ui-all-comments",m=i.find(o),s={components:{type:"commentList"},context:this.config.context};t.createComponents(s,function(e){t.commentListComponent=e[0].component;var i={element:m,data:n,config:s};t.commentListComponent.fire("applyTo",i)})},getGUIDSelector:function(e){return"guid-comment-"+e},getCommentIdClass:function(e){return"comment-id-"+e},"bus prepareUpdate":function(e){var n=e.data.cmd,i=null,o=n.config.$set.parentId,m=".ui-all-comments"+(o?" ."+this.getCommentIdClass(o)+" .ui-comments":""),s=this.getGUIDSelector(n.guid);if(n.config.id){var a=this.getCommentIdClass(n.config.id);i=this.element.find(".ui-all-comments ."+a)}else i=t("<div class='ui-comment "+s+"'><div class='ui-comment-body'>Adding new comment. Please wait...</div></div>").appendTo(this.element.find(m));this.fire("markElementToBeUpdated",{element:i})},"bus applyUpdate":function(e){var t=this,n=e.data.cmd,i=n.guid,o=this.getCommentIdClass(e.data.id);if(!n.config.id){var m=this.getGUIDSelector(i),s=this.element.find(".ui-all-comments").find("."+m);s.addClass(o).removeClass(m)}this.on("afterRender",function(e){e.removeListener();var n=e.data.element,i=n.find("."+o+" > .ui-comment-body");t.fire("updateElement",{element:i})}),this.fire("refresh")},"bus prepareRemove":function(e){var t=e.data.cmd,n=this.getCommentIdClass(t.config.id),i=this.element.find(".ui-all-comments ."+n);this.fire("markElementToBeDeleted",{element:i})},"bus applyRemove":function(e){var t=this,n=e.data.cmd,i=this.getCommentIdClass(n.config.id),o=this.element.find(".ui-all-comments ."+i);
this.fire("deleteElement",{element:o,callback:function(){t.fire("refresh")}})}});return i});
define(["Underscore","jQuery","tau/core/extension.base"],function(e,t,i){return i.extend({"bus popupResize":function(e,t){this.fire("$outerBubbled.ready",t)},"bus $outerBubbled.ready + childrenBuses.ready":function(t,i,n){var o=e.bind(this.fire,this,"adjustPosition");e.forEach(n,function(e){e.fire("$outerBubbled.ready",i),e.on("adjustPosition",o)})},findBusByName:function(t,i){return e.find(t,function(e){return e.name==i})},"bus childrenBuses.ready:last + child.shown":function(e,t,i){this.findBusByName(t,i).fire("$outerBubbled.shown")},"bus childrenBuses.ready:last + child.hidden":function(e,t,i){this.findBusByName(t,i).fire("$outerBubbled.hidden")},showFinder:function(i){var n=20;t.when(i.$selector.finish().slideUp(n),i.$holder.finish().slideDown(n),i.$relatedQuickAdd.finish().addClass("tau-within-entity-lookup",n)).done(e.bind(function(){this.fire("child.shown",i.$holder.data("name")),this.fire("adjustPosition")},this))},hideFinder:function(i,n){var o=100;t.when(i.$holder.finish().slideUp(o),i.$selector.finish().slideDown(o),i.$relatedQuickAdd.finish().removeClass("tau-within-entity-lookup",o)).done(e.bind(function(){this.fire("child.hidden",i.$holder.data("name")),n&&i.$selector.addClass("focus").focus(),this.fire("adjustPosition")},this))},selectEntity:function(e,t,i){var n=i.entity;e.$input.data("value",n).val(n.id).change();var o=e.$field.find(".tau-linkentity__icon");if(o.length&&this.showEntityType(n)){var s=o.attr("class");s=s.replace(/tau-entity-icon--\S+/gi,"tau-entity-icon--"+n.entityType.name.toLowerCase()),o.attr("class",s).text(n.id).show()}e.$field.find(".tau-linkentity__inner").text(this.getEntityRenderInfo(n)).removeClass("tau-linkentity__inner_placeholder"),e.alwaysVisible||this.hideFinder(e,!0)},getEntityRenderInfo:function(e){return"user"===e.entityType.name?e.fullName:e.name},showEntityType:function(e){return"user"!==e.entityType.name&&e.entityType},getFinderControls:function(e){var t=e.closest(".tau-field"),i=t.find(".tau-userStorySelector"),n=t.find(".i-role-related-quick-add");
return{$input:e,$field:t,$selector:i,$holder:t.find(".tau-userStorySelector__control"),$relatedQuickAdd:n,alwaysVisible:i.hasClass("hidden")}},"bus applyFinder":function(i,n){var o=this.getFinderControls(n),s=null,d=e.bind(this.hideFinder,this,o),r=e.bind(this.showFinder,this,o),u=e.bind(this.selectEntity,this,o),a=e.bind(this._selectEntityFromItem,this,o),l=n.data("entityuniquename");this.on(l+".entitySelected",u),this.on(l+".add.entity.request",function(){d(),o.$relatedQuickAdd.click()}.bind(this)),this.on("relatedQuickAdd."+l+".added",a),o.alwaysVisible?r():(o.$selector.on({click:function(){r()},keydown:function(e){var i=t.ui.keyCode;(e.keyCode==i.DOWN||e.keyCode==i.UP)&&r()},focus:function(){o.$selector.hasClass("focus")||r()},focusout:function(){o.$selector.removeClass("focus")}}),o.$holder.on({keydown:function(e){e.keyCode==t.ui.keyCode.ESCAPE&&(d(!0),e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation())},focusin:function(){clearTimeout(s)},focusout:function(e){t(e.relatedTarget).is("select.tau-select")&&o.$holder.closest(".i-role-bubble").is(".i-orientation_bottom")||t(e.target).is(".tau-lookup-block .i-role-bubble input.tau-in-text")||(clearTimeout(s),s=setTimeout(d,300))}}),o.$holder.on({mousedown:function(){o.$holder.focus(10)}},".i-role-bubble"))},_selectEntityFromItem:function(e,t,i){var n=this._getEntityFromItem(i);return this.selectEntity(e,t,{entity:n})},_getEntityFromItem:function(e){var t={entityType:{name:e.type},id:e.id,name:e.name};return t}})});
define(["jQuery","tau/core/extension.base"],function($,ExtensionBase){return ExtensionBase.extend({"bus $items.ready":function(evt,$items){var self=this;$items.each(function(){var $item=$(this),$trigger=$item.find(".i-role-actionremove"),id=$trigger.parents(".i-role-item:first").data("id"),$bubbled=$trigger.tauBubble({template:['<div class="tau-bubble tau-warning-bubble">','<div class="tau-bubble__arrow"  role="arrow"></div>','<div class="tau-bubble__inner tau-container"  role="content"></div>',"</div>"].join(""),content:["<h3>Do you really want to delete this template?</h3>",'<div class="tau-buttons">','<button class="tau-btn tau-danger i-role-actionok">Delete</button>','<button class="tau-btn i-role-actioncancel">Cancel</button>',"</div>"].join(""),onPositionConfig:function(conf){return conf.my="center top",conf.at="center bottom",conf.offset="-70 0",conf},onHide:function(){$item.toggleClass("tau-template-item_hover",!1)},onShow:function(){$item.toggleClass("tau-template-item_hover",!0);var $w=$bubbled.tauBubble("widget");$w.unbind("click"),$w.one("click",".i-role-actioncancel",function(){$bubbled.tauBubble("hide")}),$w.one("click",".i-role-actionok",function(){$bubbled.tauBubble("hide"),self.fire("item.remove",id)})},zIndex:130})})},"bus $el.ready:last + item.remove.completed":function(evt,$el,id){$el.find(".i-role-item[data-id="+id+"]").remove(),$el.find("form.i-role-filterform").submit()}})})
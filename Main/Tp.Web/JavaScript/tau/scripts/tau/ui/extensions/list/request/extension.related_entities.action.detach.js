define(["tau/components/extensions/component.extension.base"],function(ExtensionBase){return ExtensionBase.extend({"bus afterRender":function(evt){var $el=evt.data.element,store=this.config.store,entity=this.config.context.entity,bus=this.bus;$el.delegate("[role=action-detach]","click",function(e){var $item=$(e.target).parents("[role=item]:first"),relatedData=$item.data("tmplItem").data;store.removeFromList(relatedData.__type,{id:relatedData.id,$set:{relatedRequests:{id:entity.id}}}).done({success:function(){store.save("request",{id:entity.id,$set:{relatedEntities:[]}}).done(),store.evictProperties(entity.id,entity.entityType.name,["relatedEntities","relatedEntities-count"]),bus.fire("refresh")}})})}})})
define(["Underscore","tau/core/model.editable.base"],function(a,b){var c=b.extend({name:"model.list.editable",category:"edit","bus dataBind":function(){this.bus.fire("permissionsReady",{editable:!0,deletable:!0})},"bus positionUpdated":function(b){var c=b.data,d=this,e=c.item,f=this.config.store,g=[];c.isCollapsed==0&&g.push(function(a){var b=new d.config.itemsDataProvider(d.config);b.changePriority(c.item,c.prev,c.next,function(b){a(null,b)})}),c.group&&g.push(function(a){var b=new d.config.groupsDataProvider(d.config);b.moveToGroup(c.item,c.group,c.prevGroup,function(b){a(null,b)})}),c.isCollapsed==1?(d.fire("beforeUpdate"),d.fire("showOverlay"),a.parallel(g,function(){d.fire("refresh")})):(d.fire("beforeUpdate"),a.parallel(g,function(b,c){var e={};a.forEach(c,function(b){b&&a.extend(e,b.changed||{})}),d.fire("afterUpdate",{changedItem:e})}))}});return c})
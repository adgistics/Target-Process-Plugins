define(["Underscore","jQuery","tau/models/quick.add/model.quick.add.base","tau/core/termProcessor","tau/configurations/converters/converter.context","tau/services/service.entity-navigation"],function(e,t,i,n,a,s){return i.extend({doAdd:function(t,i,n){var a=t.config.context.configurator,s=t.config.context.entity,o=t.config.options,r=i[n.type];"release"==s.entityType.name&&"iteration"==r.entityType.name.toLowerCase()&&n.fields.push({id:"release",value:s.id});var d=e.extend({entityType:n.type,values:n.fields},r.coordinates);r.slice[r.saveAction]({$set:d}).done(e.bind(function(t){var i=t.data,d=e.find(o.items,function(e){return e.entityType.toLowerCase()==i.type.toLowerCase()}),y=a.getStore().typeMetaInfo(d.relationName).resource;if(y){var c={id:s.id,__type:s.entityType.name};c[y]=[e.extend(e.omit(i,"entityType","type"),{__type:i.type})],a.getStore().registerWithEvents(c);var p=i.type,l=p.charAt(0).toLowerCase()+p.substring(1);a.getGlobalBus().fire(l+".items.added",{entity:{id:i.id},"evict-data":{entityId:s.id,entityType:s.entityType.name,evictProperties:[y]}})}var m={message:{dataItem:i},nameType:r.entityType};m.message.dataItem.data={cardData:m.message.dataItem},m.openAfter=n.openAfter,this.fire("model.data.item.did.add",m)},this)).fail(e.bind(function(e){return this.fire("model.data.item.did.fail.add",e.data.responseText),!1},this))},"bus beforeInit:last + dataBind:last + model.add.item":function(e,t,i,n){this.preProcessFields(n.fields).done(this.doAdd.bind(this,t,i.types,n))},onInit:function(t){this._super(t);var i=t.options||{},n=t.context.entity,s=t.context.applicationContext.acid,o=t.context,r=this.config.context.configurator;t.useGlobalEntityViewer||this.fire("viewerBus.ready",this.bus);var d=t.context.applicationContext.culture;this.fire("culture.ready",d),i=e.defaults(i,{items:[]}),i.items=a.convert(i.items,e.pluck(o.getPractices(),"name"),o.getEdition()),0===i.items.length?this.fire("dataBind",{isEmpty:!0,types:[],entityTypes:[]}):this.getTemplates(r,n,s,i).done(this.initTemplates.bind(this,t,n))
},initTemplates:function(t,i,a){var s=new n(t.context.getTerms()),o={};e.each(a,function(t,n){t.entityType={name:t.entityType,title:s.resolve(t.entityType,t.entityTypeTitle)},0===n&&(t.entityType.active=!0),"release"==i.entityType.name&&"iteration"==t.entityType.name.toLowerCase()&&(t.template.items=e.reject(t.template.items,function(e){return"release"==e.id.toLowerCase()})),o[t.entityType.name]=t});var r=e.pluck(o,"entityType");this.fire("model.dataItems.template.ready",{types:o}),this.fire("dataBind",{types:o,entityTypes:r,mainEntity:i,constants:this.getTemplateConstants()})},"bus cardDataToShow.ready":function(e,t){var i=this.config.context.configurator,n=i.service("navigator");(new s).navigateToEntityView(n,t.entityId,t.entityType)},getTemplates:function(t,i,n,a){var s=e.map(a.items,function(e){return e.entityType}),o={global:{acid:n},entityType:i.entityType.name,entityId:i.id,templateTypesFilter:s},r=t.getSliceFactory().create({definition:o});return r.viewDataTemplates().then(function(t){return e.map(t.data.items,function(e){return{templateAction:"viewDataTemplate",saveAction:"viewAddData",entityType:e.availableResource.name,entityTypeTitle:e.availableResource.title,slice:r,template:e.fieldTemplates}})})}})});
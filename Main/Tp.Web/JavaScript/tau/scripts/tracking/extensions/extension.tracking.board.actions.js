define(["Underscore","./extension.tracking.base","libs/json2"],function(a,e){return e.extend({bs_id:0,"global boardSettings.ready":function(a,e){var t=e.boardSettings;this.bs_id!==t.__objectId&&(this.bs_id=t.__objectId,this.boardSettings&&this.boardSettings.onChange.remove(this.trackBoardSettingsDiff),this.boardSettings=t,this.boardSettings.onChange.remove(this.trackBoardSettingsDiff).add(this.trackBoardSettingsDiff))},"global add.board":function(e,t){this.fire("track.action",a.extend({name:"add board"},t))},"global remove.board":function(e,t){this.fire("track.action",a.extend({name:"remove board"},t))},"global help.flow.action":function(a,e){var t={name:e.name,area:"help flow",tags:["help flow","help"]};e.tags&&(t.tags=t.tags.concat(e.tags)),e.progress&&(t.progress=e.progress),this.fire("track.action",t)},"global quick.add.popup.rendered":function(){this.fire("track.action",{name:"show quick add popup",tags:["board","quick add"]})},"global relatedQuickAdd.afterShow":function(){this.fire("track.action",{name:"show related quick add popup",tags:["board","quick add"]})},"global paging.cell.show.more":function(){this.fire("track.action",{name:"show more cards",tags:["board","show more"]})},"global board.configurator.ready:last + model.data.item.did.add":function(a,e,t){if(t.message&&t.message.dataItem&&t.message.dataItem.type&&t.message.dataItem.data){var i=t.message.dataItem.data.cardData,o=i.type.toLowerCase();this.fire("track.action",{action:"entity added",name:o+" #"+i.id+" added using quick add",type:o,tags:["add "+o,"add card","board"]})}},"global error":function(e,t){var i="---",o="";if(t)if(a.isString(t))i=t;else if(t.message)i=t.message+(t.details||"");else if(t.$node){var s=t.$node.text&&t.$node.text();s=s||"unknown issue: unknown $node",i=s}else try{o=a.keys(t).join(" / "),i="unknown issue: "+JSON.stringify(t)}catch(r){i=["unknown issue: ","fail during global error stringification","(",r.message,").","Object keys:","[",o,"]"].join("")}else i="unknown issue: unspecified global error";
this.fire("track.error",{message:i})},"global model.data.item.did.fail.add":function(a,e){e.Message&&(this.fire("track.error",{name:"quick add error",message:e.Message}),this.fire("track.action",{name:"quick add error",tags:["error","board","quick add"],message:e.Message}))},"global view.card.batch.move.completed":function(e,t){var i=[],o={};a.each(t,function(a){if(a.data){var e=a.data("entity-type");i.push({type:e,id:a.data("entity-id")}),o[e]||(o[e]=0),o[e]++}}),this.fire("track.action",{action:"move cards",name:i.length+" card(s) moved "+JSON.stringify(o),cards:i,tags:["board","business action","move cards"]})},"global board.template.selected":function(a,e){e=e||{name:"not defined"},this.fire("track.action",{action:"apply template",name:"apply template ["+e.name+"]",template:e,tags:["board","templates","customize","settings"]})},trackBoardSettingsDiff:function(e){if(e){var t=[],i={};a.each(e,function(a,e){var o=e;"isdraft"!==o.toLowerCase()&&(o="user"===e?"user filter":"edit"===e?"switch "+(a?"on":"off")+" board edit mode":"name"==e?"boardName":e,i[o]=a,t.push(o))}),t.length>0&&taus.track({"@":["--update-board-context"],action:"customize board",name:"change board settings ["+t.join(",")+"]",tags:["customize","board"].concat(t),changes:i})}}})});
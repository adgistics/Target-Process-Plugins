define(["Underscore","tau/components/extensions/error/extension.errorBar","tau/components/component.creator","tau/components/component.board.plus.base","tau/components/board.timeline/view/view.timeline.registry","tau/ui/extensions/timeline/ui.extension.timeline.view","tau/components/board.timeline/models/model.timeline.slice.comet","tau/ui/extensions/timeline/ui.extension.timeline.operations","tau/components/board.timeline/models/model.timeline.date-range","tau/components/board.core/models/model.board.plus.timeline","tau/components/board.timeline/models/timeline.model.board.cell.freezable","tau/components/board.timeline/models/model.timeline.cells.registry","tau/components/board.timeline/models/model.timeline.axes.registry","tau/ui/extensions/timeline/ui.extension.timeline.layout","tau/ui/extensions/board.plus/ui.extension.board.plus.dom.updater.board","tau/models/timeline/model.timeline.dragndrop","tau/ui/extensions/timeline/ui.extension.timeline.dragndrop","tau/ui/extensions/timeline/ui.extension.timeline.selection.board","tau/ui/extensions/board.plus/ui.extension.board.plus.scrollManager","tau/ui/extensions/timeline/ui.timeline.scrollManager","tau/ui/extensions/board.plus/ui.extension.board.plus.scroll","tau/ui/extensions/timeline/ui.extension.timeline.sync-scroll","tau/ui/extensions/timeline/ui.extension.timeline","tau/ui/extensions/board.plus/ui.extension.board.plus.hints.timeline","tau/ui/extensions/board.plus/ui.extension.board.plus.hintsHeader","tau/ui/extensions/board.plus/ui.extension.board.plus.cardsSparklines","tau/models/board.plus/model.board.collapse","tau/models/board.plus/model.board.collapse.timeline.empty","tau/ui/extensions/board.plus/ui.extension.board.plus.collapse","tau/ui/extensions/board.plus/ui.extension.board.plus.focus","tau/ui/extensions/board.plus/ui.extension.board.plus.paging","tau/ui/extensions/timeline/ui.extension.timeline.full-counts","tau/ui/extensions/board.plus/ui.extension.board.plus.cardsViewer.board","tau/models/board.plus/model.board.plus.quick.add.axes","tau/ui/extensions/board.plus/ui.extension.board.plus.quick.add.axes","tau/models/board.plus/nodata/nodata-strategies","tau/models/board.plus/model.board.nodata","tau/ui/extensions/board.plus/ui.extension.board.plus.empty.data","tau/ui/extensions/board.plus/ui.extension.board.plus.progress","tau/ui/extensions/board.plus/ui.extension.board.plus.cards-lazy-loading.timeline.customized","tau/ui/extensions/board.plus/ui.extension.board.plus.quick.add.cells","tau/models/board.plus/model.board.plus.quick.add.cells","tau/components/board.timeline/bus.timeline.event.aggregator","tau/ui/extensions/timeline/ui.extension.timeline.hide.empty.lanes"],function(e,i,n,t,o,s,a,u,l,r,d,m,p,x,b,c,g,y,w,f,T,v,h,k,q,M,z,S,V,B,C,D,E,F,H,U,_,j,A,G,I,J,K,L){return{create:function(e){var i=e.context.configurator.getFeaturesService(),n=new l,T=new m(n),z=new p,N=new r(n),O=new K,P=new o(n,O);
d=d.extend({generateDefaultContent:function(e){var i=this._super(e);return e.isTimeline&&i.fixed.items.push({id:"timeline",type:"timeline"}),i}});var Q={ViewType:s,extensions:[{extType:d,args:[T,z]},{extType:c,args:[T]},{extType:g,args:[P]},b,x,y,{extType:w,args:[new f]},v,G,{extType:h,args:[N,{cellModel:T,axesModel:z,view:P},O]},k,q,M,S,V,B,C,E,{extType:_,args:[U.timeline]},{extType:j,args:["Set up your timeline View"]},{extType:u,args:[T,z]},A,I,J,F,H,L].concat(e.extensions||[])};return Q.extensions.push(D),i.isEnabled("comet.notifications")&&Q.extensions.push({extType:a,args:[e.context.configurator,"slice-timeline"]}),t.create(Q,e)}}});
define(["tau/components/component.creator","tau/models/board.context.selector/model.board.context.selector.data","tau/ui/extensions/board.context.selector/ui.extension.board.context.selector.main","tau/ui/extensions/board.context.selector/ui.extension.board.context.selector.filter","tau/ui/extensions/board.context.selector/ui.extension.board.context.selector.selection","tau/ui/extensions/board.context.selector/ui.extension.board.context.selector.viewer","tau/components/context.selector/views/view.context.selector"],function(e,t,o,n,c,s,r){return{create:function(i){var a={queuedBus:!0,ViewType:r,extensions:[t,o,n,c,s].concat(i.extensions||[])};return e.create(a,i)}}});
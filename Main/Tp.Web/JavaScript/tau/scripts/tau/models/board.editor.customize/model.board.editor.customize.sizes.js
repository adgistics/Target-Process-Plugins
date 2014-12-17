define(["Underscore","tau/core/model-base","tau/models/board.customize.units/const.card.sizes"],function(e,t,i){return t.extend({normalizeZoom:function(e){return i.zoomToSize(e)||e},"bus afterInit + configurator.ready":function(){this.model=null,this.lastViewModeNotList="board",this.currentViewMove=null,this.model=null},updateLayout:function(e){this.fire("refreshData",{items:e.items})},init:function(e){this._super(e),this.timeoutId=null},renderLayout:function(e){this.fire("dataBind",{items:e.items})},updateSettings:function(e){var t=this.normalizeZoom(e.zoomLevel),i=this.createModel(t,e.viewMode);this.model?i.size!==this.model.size&&(this.updateLayout(i),this.model=i,this.fire("public.listSizes.changed",i)):(this.renderLayout(i),this.model=i,this.fire("public.listSizes.changed",i))},"bus configurator.ready + boardSettings.ready:last":function(e,t,i){var s=i.boardSettings,o=function(){s.get({fields:["zoomLevel","viewMode"],callback:function(e){"newlist"!==e.viewMode&&(this.lastViewModeNotList=e.viewMode),this.currentViewMove=e.viewMode,this.currentZoomLevel=e.zoomLevel,this.updateSettings(e)}.bind(this)})}.bind(this);o(),s.unbind({listener:this}),s.bind({fields:["zoomLevel","viewMode"],listener:this,callback:o})},createModel:function(t,s){var o={xs:" - only basic info, just one line. Could be a card name or ID.",s:" - a bit more info fits in here: two lines e.g. a card name + avatars of assigned people.",m:" - still more info: three lines. Could be a card name + tags + avatars and time spent.",l:" - this size is for the detailed info. Unlimited lines.",xl:" - a maxi stretch fit. That is how a card looks in the list-like mode."},n=e.reject(i,function(e){return"list"===e}),a=e.map(n,function(e){return{description:o[e],name:e.toUpperCase(),role:"size",data:e,classes:"tau-board-layout-elements-list__item_card-"+e,isActive:"newlist"!==s&&e===t,isDisabled:!1}},this),l=[].concat(a);return l.push({description:" - displays maximum info in minimum space. Unlimited nested lists are allowed.",name:"List",role:"view",data:"newlist",classes:"tau-board-layout-elements-list__item_list-view",isActive:"newlist"===s,isDisabled:!1}),"newlist"===s&&(t="list"),{items:l,size:t,viewMode:s}
},"bus size.changed.ui + boardSettings.ready:last":function(t,s,o){var n=o.boardSettings,a=i.sizeToZoom(s),l={zoomLevel:a},d=this.currentViewMove;"newlist"===this.currentViewMove&&(l.viewMode=this.lastViewModeNotList,d=this.lastViewModeNotList),this.updateSettings({zoomLevel:a,viewMode:d}),(a||0===a)&&(clearTimeout(this.timeoutId),this.timeoutId=e.delay(function(){n.set({set:l})},300))},"bus view.changed.ui + boardSettings.ready:last":function(t,i,s){var o=s.boardSettings;this.updateSettings({zoomLevel:this.currentZoomLevel,viewMode:i}),clearTimeout(this.timeoutId),this.timeoutId=e.delay(function(){o.set({set:{viewMode:i}})},300)}})});
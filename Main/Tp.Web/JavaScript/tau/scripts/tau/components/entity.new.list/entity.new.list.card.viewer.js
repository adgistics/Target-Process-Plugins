define(["require","Underscore","jQuery","tau/core/class","tau/components/entity.new.list/const.entity.new.list.selectors","tau/ui/templates/entity.new.list/template.entity.new.list.card.viewer"],function(t){var e=t("Underscore"),i=t("jQuery"),r=t("tau/core/class"),n=t("tau/components/entity.new.list/const.entity.new.list.selectors"),s=t("tau/ui/templates/entity.new.list/template.entity.new.list.card.viewer");return r.extend({CURRENT_NULL:{$trigger:i(),$card:i(),cardData:{},component:{destroy:i.noop}},classMap:{ICON_DETAILS_CLOSE:"tau-icon_name_newwindow-close",CARD_DETAILS_TRIGGER:"i-role-details-trigger",EDITABLE_CELL:"tau-elems-cell_unit-editable"},WIDGET_DATA_ID:"ui-tauCoverView",init:function(t,i){this._componentFactory=t,this._keyBoardManager=i,this._current=this.CURRENT_NULL,this.opened=e.Callbacks(),this.closed=e.Callbacks()},isShown:function(t){return this._current.cardData.id===t.id&&t.entityType===t.entityType},show:function(t){var e=this._$getWidget(t.$list),i=this._createComponent(t.cardData,e);t.scrollToCard&&this._scrollToCard(t.$list,t.$card,e),this._setCurrent(t,i),e.show(this._current.$trigger)},hide:function(){this._$widget&&this._$widget.hide()},destroy:function(){this._$widget&&(this._$widget.widget().remove(),this._$widget.destroy(),this._$widget=null),this.opened.removeAll(),this.closed.removeAll()},_scrollToCard:function(t,e){t.scrollParent().scrollTo(e,500,{offset:{top:-Math.round(i(window).height()/2-e.height())}})},_$getWidget:function(t){if(!this._$widget){var e=t.closest(n.APP_PAGE_ENTITY);this._$widget=this._$createWidget(e)}return this._$widget},_$createWidget:function(t){var e=s.render();return e.tauCoverView({contentHolderSelector:n.PAGE_ENTITY,arrow:{$appendTo:t,positionConfig:{my:"left center",at:"right-12 center"}},autoHide:{onEscape:!0,onOutsideAction:!0,doNotHideSelectors:[n.CARD_DETAILS_TRIGGER,n.POPUP_SYSTEM_VIEW,n.CK_EDITOR,n.CK_EDITOR_DIALOG,n.CK_EDITOR_BKG_COVER]},show:this.opened.fire.bind(this.opened),hide:this._onWidgetHide.bind(this),keyBoardManager:this._keyBoardManager}),e.insertAfter(t),e.data(this.WIDGET_DATA_ID)
},_onWidgetHide:function(){this.closed.fire(),this._releaseCurrent()},_createComponent:function(t,e){var i=this._componentFactory.create(t);return i.on("afterRender",function(t,i){e.setContent(i.element)},this),i},_setCurrent:function(t,e){this._releaseCurrent();var i=t.$card.find(n.CARD_DETAILS_TRIGGER_ICON);this._current={cardData:t.cardData,$card:t.$card,$trigger:i,component:e},this._current.originalTriggerTitle=this._current.$trigger.attr("title"),this._current.$trigger.attr("title","Click to close"),this._current.$card.addClass(this.classMap.ICON_DETAILS_CLOSE)},_releaseCurrent:function(){this._current.$trigger.attr("title",this._current.originalTriggerTitle),this._current.$card.removeClass(this.classMap.ICON_DETAILS_CLOSE),this._current.component.destroy(),this._current=this.CURRENT_NULL}})});
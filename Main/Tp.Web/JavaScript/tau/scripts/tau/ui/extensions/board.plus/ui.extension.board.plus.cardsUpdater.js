define(["Underscore","jQuery","tau/core/event.emitter"],function(_,$,EventEmitter){var getCssClassByZoomLevel=function(zoomLevel){return"zoom-level-"+zoomLevel};return EventEmitter.extend({"bus view.skeleton.built":function(){this.fire("view.cards.update.complete")},"bus view.skeleton.built:last + model.zoomLevelChanged":function(evt){var $skeleton=evt["view.skeleton.built"].data.element,$board=$skeleton.children(),currentZoom=$board.data("zoomLevel"),newZoom=evt["model.zoomLevelChanged"].data.zoomLevel;currentZoom!=newZoom&&!$skeleton.hasClass("tau-board-becomes-old")&&($board.data("zoomLevel",newZoom),$board.removeClass(getCssClassByZoomLevel(currentZoom)),$board.addClass(getCssClassByZoomLevel(newZoom)))}})})
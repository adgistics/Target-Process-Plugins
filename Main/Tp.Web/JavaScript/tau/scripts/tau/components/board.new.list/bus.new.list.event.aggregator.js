define(["Underscore","tau/core/class"],function(e,a){return a.extend({init:function(){this.acidRetrieved=e.Callbacks(),this.boardSettingsRetrieved=e.Callbacks(),this.definitionReady=e.Callbacks(),this.sliceServiceCreated=e.Callbacks(),this.sliceInfoRetrieved=e.Callbacks(),this.skeletonBuilt=e.Callbacks(),this.cellModelLoaded=e.Callbacks(),this.hasDataInSliceChanged=e.Callbacks(),this.treeRendered=e.Callbacks(),this.cardRemoved=e.Callbacks(),this.itemAddedToContext=e.Callbacks(),this.entityDetailsViewRequested=e.Callbacks(),this.expansionStateChanged=e.Callbacks()}})});
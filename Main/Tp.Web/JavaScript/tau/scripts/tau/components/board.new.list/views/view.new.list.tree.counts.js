define(["Underscore","jQuery","tau/core/class","tau/ui/ui.templateFactory"],function(t,e,r,i){return r.extend({init:function(t,e,r){this.treeView=t,this.treeModel=r,this.countsModel=e,this.termProcessor=i.getTermProcessor(),this.treeModel.applyAndObserve(function(t){t.countsModel.dataLoaded.add(this.refreshCount.bind(this,t.countsModel))}.bind(this)),this.treeModel.cardUpdated.add(this._onCardUpdated.bind(this))},_onCardUpdated:function(t){var e=this.treeModel.hierarchy.findChildByCardId(t.card.id);this.refreshCount(e.countsModel)},_getTitle:function(e){var r;return e.data&&e.data.types&&(r=t.map(e.data.types,function(t){var e=this._getTypePluralizedName(t.type);return(""===e?t.typeName:e)+": "+t.count},this).join(" / ")),r},refreshCount:function(t){var e=this._getTitle(t),r=t.getAllCount(),i=this._getCounter(t.treeModel.card);i.text(r),i[0].title=e,i.toggleClass("tau-counter-hidden",!r)},_getCounter:function(t){var e=this.treeView.findChildCardById(t.id);return e.find(".tau-counter").first()},_getTypePluralizedName:function(t){return this.termProcessor.getTerm(t,"names")},destroy:function(){}})});
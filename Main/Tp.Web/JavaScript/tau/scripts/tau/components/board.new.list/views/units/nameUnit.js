define(["tau/components/board.new.list/views/units/unit"],function(t){var e=t.extend({MIN_UNIT_WIDTH:300,LEVEL_INDENTATION:25,COLLAPSER_WIDTH:15,init:function(t,e,n){this._super(t,e,n),this.$container=n},setupWidth:function(t,e){var n,i=this.getHeaderWidth(),r=this.getContentWidth(),s=Math.max(this.minWidth,this.MIN_UNIT_WIDTH,i);if(s>r)n=s;else{var a=t.width(),o=a-e;n=o>r?r:Math.max(o,s)}return this.setupForcedWidth(n)},setupForcedWidth:function(t){return{selector:this.generateCssSelector(),calculated:this.adjustNameColumnWidthForLevel(t)}},adjustNameColumnWidthForLevel:function(t){return t-e.getLevelIndentation(this.layoutKey,this.$container)}});return e.getLevelIndentation=function(t,n){if("0"===t)return 0;var i=n.find(".tau-list-caption .tau-elems-table-level-"+t+" .tau-list-collapser-cell"),r=i.length?0:e.prototype.COLLAPSER_WIDTH,s=t.indexOf("_"),a=s>0?t.substring(0,s):t,o=parseInt(a,10);return o*e.prototype.LEVEL_INDENTATION-r},e});
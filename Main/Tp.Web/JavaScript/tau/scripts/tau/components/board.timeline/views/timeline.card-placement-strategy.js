define(["Underscore","tau/core/class"],function(t,i){var n=i.extend({_minimumCardWidth:3,init:function(t){this._tracks=[],this._minWidthInPercent=this._minimumCardWidth/t,this._lockedCards=[]},lockCard:function(t){this._lockedCards.push(t)},unlockCard:function(i){this._lockedCards=t.without(this._lockedCards,i)},unlockAllCards:function(){this._lockedCards=[]},updatePositions:function(){var i=this._tracks;this._tracks=t.map(i,function(i,n){return{index:n,cards:t.intersection(i.cards,this._lockedCards)}},this);var n={tracksChanges:[],inTrackChanges:[]};return i.forEach(function(i){var r=t.difference(i.cards,this._lockedCards);t.each(r,function(t){var r=this.addCard(t);(i.index!==r.track||i.cards.indexOf(t)!==r.index)&&n.tracksChanges.push({cardId:t.id,position:r})},this)},this),0===this._lockedCards.length?n.tracksChanges:(i.forEach(function(i){var r=t.intersection(i.cards,this._lockedCards);t.each(r,function(t){var r=i.cards.indexOf(t),a=this._tracks[i.index].cards,e=a.indexOf(t);if(e!==r){var s,c,d;for(e>r?(s=0,c=a.length,d=1):(s=a.length-1,c=-1,d=-1);s!==c;){if(s!==e){var o=a[s].id,h={track:i.index,index:s};n.inTrackChanges.push({cardId:o,position:h})}s+=d}}},this)},this),n.tracksChanges.concat(n.inTrackChanges))},removeCard:function(i){this._tracks.forEach(function(n){n.cards=t.filter(n.cards,function(t){return t.id!==i})})},_getEffectiveCardPosition:function(t){return t._effectiveCardPosition=t._effectiveCardPosition||this._calculateEffectiveCardPosition(t),t._effectiveCardPosition},_calculateEffectiveCardPosition:function(i){var n=i.metrics(),r=i.cardData(),a=[n.actual.from,n.planned.from],e=n.planned.showAsFixed?2:1,s=[Math.max(n.actual.to,n.actual.from+this._minWidthInPercent),Math.max(n.planned.to,n.planned.from+this._minWidthInPercent*e)];return(r.showActual||(r.hasActual||r.hasPlanned)&&r.showForecast)&&(a.push(n.forecast.from),s.push(Math.max(n.forecast.to,n.forecast.from+this._minWidthInPercent))),{from:t.min(a,function(i){return t.isNaN(i)?1/0:i}),to:t.max(s,function(i){return t.isNaN(i)?-1/0:i
})}},_doesNotIntersect:function(t,i){var n=this._getEffectiveCardPosition(t),r=this._getEffectiveCardPosition(i),a=1e-10;return n.from+a>r.to||n.to<r.from+a},_findTrackFor:function(i){return t.find(this._tracks,function(n){return t.every(n.cards,this._doesNotIntersect.bind(this,i),this)},this)},_getTrack:function(t){return this._tracks[t]},addCard:function(i,n){return t.isUndefined(n)?this._addCard(i,this._findTrackFor(i)):(this.lockCard(i),this._addCard(i,this._getTrack(n)))},_addCard:function(t,i){return i||(i={cards:[],index:this._tracks.length},this._tracks.push(i)),i.cards.push(t),i.cards.sort(function(t,i){return this._getEffectiveCardPosition(t).from-this._getEffectiveCardPosition(i).from}.bind(this)),{track:i.index,index:i.cards.indexOf(t)}},getMinWidthInPercent:function(){return this._minWidthInPercent}});return n});
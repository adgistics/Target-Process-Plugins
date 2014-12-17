define(["tau/core/class","jQuery","Underscore"],function(e,t,a){var i={NoCache:"NoCache",Static:"Static",Dynamic:"Dynamic",Today:"Today"};return e.extend({init:function(e){this.name=e,this.cache={}},_getCacheEntry:function(e,t){var a=this.cache[e];return a&&a[t]},_setCacheEntry:function(e,t,a){this.cache[e]||(this.cache[e]={}),this.cache[e][t]=a},evict:function(e,t){t?this._setCacheEntry(e,this._getCacheKey(t),void 0):this.cache[e]={}},process:function(e){function t(){s(null).fail(u).done(function(t){JSON.stringify(t.data)===JSON.stringify(d.value.data)?d.timestamp=new Date:(this._sendStatistics(r,{invalidated:!0}),this._setCacheEntry(e.namespace,o,void 0),h())}.bind(this))}function n(){c=s(null),c.fail(u).done(function(t){var n=t.data.metaInfo&&t.data.metaInfo.cacheType||i.NoCache;if(n!=i.NoCache){var c=a.clone(t);c.data=a.deepClone(t.data),this._setCacheEntry(e.namespace,o,{value:c,timestamp:new Date,type:n})}}.bind(this))}var c,s=e.resolver,h=e.invalidatedCallback,r=e.statInfo,o=this._getCacheKey(e.key),d=this._getCacheEntry(e.namespace,o),l=this._getCacheActions(d);this._sendStatistics(r,l);var u=function(){this._setCacheEntry(e.namespace,o,void 0)}.bind(this);if(l.cacheHit){var f=a.deepClone(d.value);c=s(f),l.needInvalidate&&t.call(this)}else n.call(this);return c},_getCacheKey:function(e){return a.map(e,function(e){return a.isArray(e)?this._getCacheKey.call(this,e):a.isObject(e)?JSON.stringify(e):e}.bind(this)).join("_")},_getCacheActions:function(e){var t,a;if(e){var n=e.type;switch(n){case i.Static:t=!0,a=!1;break;case i.Today:var c=e.timestamp;t=c.getDate()==(new Date).getDate(),a=!1;break;case i.Dynamic:t=!0,a=!0;break;default:t=!1,a=!1}}else t=!1,a=!1;return{cacheHit:t,needInvalidate:a}},_sendStatistics:function(e,t){var i=a.clone(e);a.extend(i,t),taus.track("cache."+this.name,i)}})});
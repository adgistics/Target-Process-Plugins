define(["require","tau/core/class","jQuery"],function(i){var t=i("tau/core/class"),n=i("jQuery");return t.extend({init:function(){this._pendingActions=[],this._wait=n.Callbacks("once memory unique")},start:function(){this._stopped=!1,this._wait.remove(this._pendingActions),this._wait=n.Callbacks("once memory unique"),this._wait.add(this._pendingActions)},stop:function(){this._stopped=!0,this._wait.fire(),this._wait.remove(this._pendingActions),this._pendingActions=[]},then:function(i){this._stopped||this._pendingActions.push(i),this._wait.add(i)}})});
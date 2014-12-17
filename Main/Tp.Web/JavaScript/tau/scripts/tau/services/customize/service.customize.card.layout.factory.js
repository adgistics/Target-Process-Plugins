define(["jQuery","Underscore","tau/core/class","tau/models/board.customize.units/board.customize.units.settings.default","tau/models/board.customize.units/const.card.sizes"],function(t,n,e,i,r){return e.extend({name:"board",sizes:r,defaultSettings:i,init:function(t,n){this.configurator=t,this.boardSettings=n,this.unitProviders=[t.getUnitsRegistry(),t.getCustomFieldsUnitsFactory()]},getLayoutFactory:function(){return this.boardSettings.get({fields:["cells","cardSettings","zoomLevel"]}).then(n.bind(function(t){return this.createFactory(t)},this))},patch:function(t){return t&&t.impediment&&n.each(t.impediment,function(t){n.each(t,function(t){n.each(t,function(t){"assignments_big_2"==t.id&&(t.id="responsible_person")})})}),t},createFactory:function(t){var e=this.patch(t.cardSettings),i=this._zoomToSize(t.zoomLevel);return n.bind(function(t,n,e,i){return this.getLayout(t,e,i||n)},this,e,i)},getLayout:function(t,e,i){var r=n.chain(n.isArray(e)?e:[e]).compact().map(function(t){return t.toLowerCase()}).value(),o=this.findSettings(t,r,[i]),u=n.object(n.map(o,function(t,e){return[e,n.find(t,function(t,n){return n===i})||[]]}));return n.isArray(e)?u:u[r[0]]},getCardLayoutByType:function(t){return this.getCardLayoutByTypeAndSize(t)},getCardLayoutsByTypesAndSize:function(t,n){return this.getLayoutFactory().then(function(e){return e(t,n)})},getCardLayoutByTypeAndSize:function(t,n){return this.getCardLayoutsByTypesAndSize([t],n).then(function(n){return n[t]})},getSavedSetting:function(t,n,e,i,r){return t&&t[i]&&t[i][r]},findSettings:function(t,e,i){var r=this,o=this.defaultSettings;return n.object(n.map(e,function(u){return u=u.toLowerCase(),[u,n.object(n.map(i,function(a){var s=r.getSavedSetting(t,e,i,u,a),c=!1;return s||(s=o.get(a,u),c=!0),s=n.map(s,function(t){return t=n.map(t,function(t){return n.extend({unit:r.findUnitById(t.id)},t)}),t=n.filter(t,function(t){return t.unit})}),s.isDefault=c,[a,s]}))]}))},_zoomToSize:function(t){return r.zoomToSize(t)},findUnitById:function(t){return n.chain(this.unitProviders).map(function(n){return n.getUnitById(t)
}).compact().first().value()}})});
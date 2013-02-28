define(["Underscore","tau/core/class"],function(_,Class){var ClipboardManager=Class.extend({init:function(restStorage,options){var self=this;self.restStorage=restStorage,self.options=_.defaults(options||{},{}),self._cache={}},set:function(data,cb){this._cache={},this.add(data,cb)},add:function(data,cb){var self=this,sanitized=this._sanitize(data),len=_.values(self._cache).length;_.forEach(sanitized,function(item){var key=self._createKey(item);self._cache[key]=item}),_.values(self._cache).length!=len&&this._save(self._cache,cb)},remove:function(data,cb){var self=this,len=_.values(self._cache).length,sanitized=this._sanitize(data);_.forEach(sanitized,function(item){var key=self._createKey(item);delete self._cache[key]}),_.values(self._cache).length!=len&&this._save(self._cache,cb)},removeAll:function(cb){self._cache={},this._save([],cb)},getAll:function(cb){var self=this;this._get(function(err,cards){_.forEach(cards,function(card){self._cache[self._createKey(card)]=card}),cb(err,cards)})},unbind:function(ctx){this.restStorage.unbind({listener:ctx})},bind:function(ctx,cb){this.restStorage.bind({listener:ctx,fields:["items"],callback:function(res){cb&&cb(null,res.items||[])}})},_save:function(set,cb){this.restStorage.set({set:{items:_.values(set)},callback:function(res){cb&&cb(null,res.items)}})},_get:function(cb){this.restStorage.get({fields:["items"],callback:function(res){cb&&cb(null,res.items||[])}})},_sanitize:function(item){var self=this,s=function(item){return item=_.deepClone(item||{}),item=_.pick(item,"id","data"),item._id=self._createKey(item),item.data=_.defaults(item.data||{},{id:"",type:""}),item.data.type=item.data.type.toLowerCase(),item};return _.map(_.isArray(item)?item:[item],s)},_createKey:function(item){return"_"+item.data.type+"_"+item.id+"_"}});return ClipboardManager})
define(["Underscore","tau/models/dataProviders/model.provider.groups.base"],function(_,Class){return Class.extend({fetch:function(key,items,fnCallback){return this._fetchState(key,["testplanrun"],fnCallback)}})})
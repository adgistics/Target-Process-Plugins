define(["Underscore","jQuery","tau/core/class"],function(_,$,Class){var noop=function(){},createAccumulatorCallback=function(sourceKeys,callback){var accumulator=new Array(sourceKeys.length);return function(e){var cmdId=e.uid,data=e.data;accumulator[cmdId]=data,sourceKeys=_(sourceKeys).without(cmdId),sourceKeys.length===0&&callback(accumulator)}};return Class.extend({init:function(settingsConfig,sources){var self=this;self.settings=_.defaults(settingsConfig,{cache:!0}),self.sources=sources,self.callbacksMap=[],self.responses=[],self.fieldsRetrieved=[],self.commonCallback=_.bind(function(e,sourceIndex){var bs=this,data=e.data,cmd=e.cmd||{},diff=bs.mergeChanges(data,sourceIndex);diff!==null&&bs.applyCallback(diff,cmd.isSilent)},self)},getGroupName:function(){return this.settings.groupName},applyCallback:function(diff,isSilent){var keys=_(diff).keys(),callbacksMap=_.clone(this.callbacksMap);for(var i=0;i<callbacksMap.length;i++){var command=callbacksMap[i];this.matchCommandCallback(keys,command)&&!command.isDeleted&&(!isSilent||command.skipSilentCallsFiltering)&&command.callback.apply(command.listener,[diff])}},matchCommandCallback:function(keys,cmd){var intersection=_.intersection(keys,cmd.fields);return intersection.length>0},each:function(iterator,emptyCallback){if(this.sources.length)_(this.sources).each(iterator);else{var callback=emptyCallback||noop;callback()}},mergeChanges:function(dataUpdate,index){var self=this,settings=self.settings,fields=_(dataUpdate).keys(),diff=null;for(var i=0;i<fields.length;i++){var fieldName=fields[i];self.markFieldsRetrieved(fieldName),_.isEqual(settings[fieldName],dataUpdate[fieldName])||(diff=diff||{},_.isNumber(index)?((self.responses[index]=self.responses[index]||[])[fieldName]=_.cloneDeep(dataUpdate[fieldName]),diff[fieldName]=settings[fieldName]=self.getField(fieldName)):diff[fieldName]=settings[fieldName]=_.cloneDeep(dataUpdate[fieldName]))}return diff},getField:function(fieldName){var fieldValue;return _.each(this.responses,function(response){!_.isNull(response[fieldName])&&!_.isUndefined(response[fieldName])&&!_.isNaN(response[fieldName])&&(fieldValue=response[fieldName])}),fieldValue},markFieldsRetrieved:function(fieldNameOrFields){fieldNameOrFields=_.isString(fieldNameOrFields)?[fieldNameOrFields]:fieldNameOrFields,this.fieldsRetrieved=_.union(this.fieldsRetrieved,fieldNameOrFields)},selectNotRetrievedFields:function(requestedFields){return this.settings.cache?_.difference(requestedFields,this.fieldsRetrieved):requestedFields},get:function(cmd){var self=this;_(cmd).defaults({callback:noop});var settings=self.settings,result={},sources=self.sources,sourceKeys=_.range(sources.length),fields=self.selectNotRetrievedFields(cmd.fields),accumulatorCallback=function(responses){self.markFieldsRetrieved(fields),_(responses).each(function(r,i){self.responses[i]=_.extend(self.responses[i]||{},r);for(var i=0;i<fields.length;i++){var fieldName=fields[i],fieldValue=r[fieldName]!==null?r[fieldName]:settings[fieldName];!_.isNaN(fieldValue)&&!_.isNull(fieldValue)&&!_.isUndefined(fieldValue)&&(result[fieldName]=fieldValue)}}),_(settings).extend(result);var clone={};$.extend(!0,clone,settings),cmd.callback(clone)};if(fields.length===0)accumulatorCallback([]);else{var commonAccumulatorCallback=createAccumulatorCallback(sourceKeys,accumulatorCallback,cmd);self.each(function(s,index){s.get({uid:index,fields:fields,callback:commonAccumulatorCallback})},function(){accumulatorCallback([])})}},set:function(cmd){var self=this,cmdSet=_.cloneDeep(cmd.set);_(cmd).defaults({callback:noop});var sources=self.sources,sourceKeys=_.range(sources.length),accumulatorCallback=function(responses){},commonCallback=createAccumulatorCallback(sourceKeys,accumulatorCallback);self.each(function(s,index){s.set({uid:index,set:cmdSet,callback:function(e){commonCallback.call(this,e,index)}})},function(){accumulatorCallback([])}),self.commonCallback({data:cmdSet,cmd:cmd}),cmd.callback(self.settings)},setDef:function(cmd){var cmdSet=_.cloneDeep(cmd.set),sources=this.sources;return $.when.apply(null,_.map(sources,function(source){var $def=$.Deferred();return source.set({uid:0,set:cmdSet,callback:$def.resolve}),$def})).done(_.bind(function(){this.commonCallback({data:cmdSet,cmd:cmd})},this))},registerSubscription:function(cmd){var self=this;return self.callbacksMap.push(cmd),this.commonCallback},unregisterSubscription:function(listener){var self=this;if(self.callbacksMap.length==0)return;self.callbacksMap=_.reject(self.callbacksMap,function(callback){var rejected=listener===callback.listener;return rejected&&(callback.isDeleted=!0),rejected})},bind:function(cmd){var self=this,commonCallback=self.registerSubscription(cmd);self.each(function(s,index){s.bind({uid:index,fields:cmd.fields,listener:cmd.listener,callback:function(e){commonCallback.call(this,e,index)}})})},unbind:function(cmd){var self=this;self.each(function(s){s.unbind({listener:cmd.listener})}),self.unregisterSubscription(cmd.listener)},dispose:function(){var self=this;self.each(function(s,index){s.unbind({listener:self})}),self.callbacksMap=[]}})})
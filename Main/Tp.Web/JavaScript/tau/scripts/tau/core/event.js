define(["Underscore"],function(_){var getEventDescription=function(evtName){var evt={},parts=evtName.split(":");return evt.name=parts[0],parts.length>1&&(evt.rule=parts[1]),evt},extractData=function(evt){var args=[];return evt.name?args=[evt.data]:args=_.pluck(_.values(evt),"data"),args},Event=function(){};return Event.implementOn=function(targetObject){var eventProto=Event.prototype;for(var prop in eventProto)targetObject[prop]==undefined&&(targetObject[prop]=eventProto[prop]);return targetObject},Event.signUpOnEvents=function(eventNameParts,targetObject,fnName,property,priority,ordered){var dictionary={},eventNames=[],evtDescriptors={},handler=function(evtArg){if(ordered){var index=eventNameParts.indexOf(evtArg.name);for(var j=0;j<index;j++){var eventNamePart=eventNameParts[j].replace(":last","");if(!dictionary.hasOwnProperty(eventNamePart))return}}dictionary[evtArg.name]=evtArg;if(_(dictionary).keys().length===eventNames.length){var data={};for(var i=0,l=eventNames.length;i<l;i++){var descriptor=evtDescriptors[eventNames[i]];data[descriptor.name]=dictionary[descriptor.name];if(descriptor.rule==="last")continue;delete dictionary[descriptor.name]}data=[data].concat(extractData(data)),targetObject[fnName].apply(targetObject,data)}};for(var i=0,l=eventNameParts.length;i<l;i++){var evtDescription=getEventDescription(eventNameParts[i]),evtName=evtDescription.name;evtDescriptors[evtName]=evtDescription,eventNames.push(evtName),property.on(evtName,handler,targetObject,null,priority)}},Event.subscribeOn=function(targetObject){var _targetObject=_(targetObject);_.forEach(_targetObject.keys(),function(propertyName){var property=targetObject[propertyName];if(!property)return;if(_.isFunction(property.on)){var functionNames=_(targetObject).functionsExt();for(var i=0,len=functionNames.length;i<len;i++){var fnName=functionNames[i],fnNameForProcessing=fnName.replace(/\s*\+\s*/g,"+").replace(/\s*>\s*/g,">"),parts=fnNameForProcessing.split(/\s+/),eventNameParts=parts[1],field=parts[0],priority;if(parts.length<2)continue;parts.length>2&&!isNaN(parts[2])&&(priority=parts[2]);var eventNamePartsConcatArr=eventNameParts.split("+"),eventNamePartsOrderArr=eventNameParts.split(">");if(eventNamePartsConcatArr.length>1&&eventNamePartsOrderArr.length>1)throw"+ and > can not be used for now together";field==propertyName&&(eventNamePartsConcatArr.length>1?Event.signUpOnEvents(eventNamePartsConcatArr,targetObject,fnName,property,priority,!1):eventNamePartsOrderArr.length>1?Event.signUpOnEvents(eventNamePartsOrderArr,targetObject,fnName,property,priority,!0):property.on(eventNameParts,targetObject[fnName],targetObject,null,priority))}}})},Event.unSubscribe=function(targetObject){var _targetObject=_(targetObject);_.each(_targetObject.keys(),function(propertyName){var propertyObject=targetObject[propertyName];propertyObject&&_.isFunction(propertyObject.removeAllListeners)&&propertyObject.removeAllListeners(targetObject)})},Event.prototype=function(){var getPrivate=function(obj){var _=obj.getPrivate&&obj.getPrivate()||obj._||(obj._={});return _.events||(_.events={})},EventEntry=function(eventName){this.name=eventName,this.listeners=[]};EventEntry.prototype={},EventEntry.prototype.getListenerIndex=function(listenerFunction,scope){for(var i=0,listeners=this.listeners;i<listeners.length;i++)if(listeners[i].fn==listenerFunction&&(listeners[i].scopeObj===scope||!listeners[i].scopeObj&&(arguments.length==1||!scope)))return i;return-1};var proto={once:function(eventName,listenerFunction,scopeObj,listenerData,priority){var rl=_.bind(function(f){this.removeListener(eventName,f,scopeObj)},this),listenerFunctionOnce=function(){listenerFunction.apply(this,_.toArray(arguments)),rl(listenerFunctionOnce)};this.on(eventName,listenerFunctionOnce,scopeObj,listenerData,priority)},on:function(eventName,listenerFunction,scopeObj,listenerData,priority){if(_.isString(eventName)&&eventName.indexOf("+")>0){var seq=eventName.split("+");Event.signUpOnEvents(seq,this,listenerFunction,this,priority);return}if(_.isArray(eventName)){var callee=arguments.callee,self=this;_.each(eventName,function(name){callee.call(self,name,listenerFunction,scopeObj,listenerData,priority)});return}var events=getPrivate(this),event=events[eventName]||(events[eventName]=new EventEntry(eventName));if(event.getListenerIndex(listenerFunction,scopeObj)<0){var listeners=event.listeners;scopeObj||(scopeObj=this),isNaN(priority)&&(priority=10);var me=this,listenerFirer=function(caller,publisherData,stopFn,cancelFn,mutex){var ev={name:eventName,sender:this,date:new Date,caller:caller,data:publisherData,listenerData:listenerData,stop:stopFn,cancel:cancelFn,suspendMain:function(){mutex&&mutex.lock()},cancelMain:function(){mutex&&mutex.cancel()},resumeMain:function(){mutex&&mutex.unlock()},removeListener:function(){me.removeListener(eventName,listenerFunction,scopeObj)}},args=[ev].concat(extractData(ev));return listenerFunction.apply(scopeObj,args),ev.data};listenerFirer.fn=listenerFunction,listenerFirer.scopeObj=scopeObj,listenerFirer.priority=priority;for(var i=listeners.length-1;i>=0;i--)if(listeners[i].priority<=priority){listeners.splice(i+1,0,listenerFirer);return}listeners.unshift(listenerFirer)}return this},fire:function(){var stopped=!1,stopEvent=function(){stopped=!0},canceled=!1,cancelEvent=function(){canceled=!0};return function(eventName,data,caller,mutex){var event=getPrivate(this)[eventName],previousStopped=stopped,previousCancelled=canceled;stopped=canceled=!1;if(event){var listeners=event.listeners;if(listeners.length){listeners=listeners.slice(0);for(var i=0;i<listeners.length;i++){var retData=listeners[i].call(this,caller,data,stopEvent,cancelEvent,mutex);typeof retData!="undefined"&&(data=retData);if(stopped||canceled)break}}}var ret=canceled||(typeof data=="undefined"?!1:data);return stopped=previousStopped,canceled=previousCancelled,ret}}(),fireOnce:function(eventName,data,editor){var ret=this.fire(eventName,data,editor);return delete getPrivate(this)[eventName],ret},removeListener:function(eventName,listenerFunction,scopeObj){var event=getPrivate(this)[eventName];if(event){var index=event.getListenerIndex(listenerFunction,scopeObj);index>=0&&event.listeners.splice(index,1)}},removeAllListeners:function(scope){var events=getPrivate(this);for(var key in events)if(events[key].listeners)if(!scope)delete events[key].listeners,delete events[key];else{var listeners=events[key].listeners,validListeners=[];for(var i=0;i<listeners.length;i++)listeners[i].scopeObj!=scope&&validListeners.push(listeners[i]);events[key].listeners=validListeners}},hasListeners:function(eventName){var event=getPrivate(this)[eventName];return event&&event.listeners.length>0},getListeners:function(){var events=getPrivate(this),listeners=[];for(var key in events){var items=events[key].listeners;if(items&&items.length>0){var listenerDetails=[];for(var i=0;i<items.length;i++){var item=items[i],listener={name:"unknown",item:item};item.scopeObj&&item.scopeObj.bus&&item.scopeObj.bus.name?listener.name=item.scopeObj.bus.name:item.scopeObj&&item.scopeObj.name&&(listener.name=item.scopeObj.name),listenerDetails.push(listener)}listeners.push({name:key,items:items,count:items.length,listeners:listenerDetails})}}return listeners},getListenersCount:function(){var events=getPrivate(this),listenersCount=0;for(var key in events)events[key].listeners&&(listenersCount+=events[key].listeners.length);return listenersCount}};return proto.addEventListener=proto.on,proto.unbind=proto.removeAllListeners,proto}(),Event})
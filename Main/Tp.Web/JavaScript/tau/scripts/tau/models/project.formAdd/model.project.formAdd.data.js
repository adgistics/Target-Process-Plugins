define(["Underscore","jQuery","tau/core/extension.base","tau/configurations/project.colors","tau/core/templates-factory"],function(e,t,n,r,i){var o=function(e){return e.name.toUpperCase()};return n.extend({"bus beforeInit":function(e,t){var n=t.config.context.configurator;this.fire("configurator.ready",n)},"bus configurator.ready:last + beforeInit":function(t,n){var r=n.getStore(),i=e.bind(this.fire,this);this._getRequiredData(r).then(function(e){i("dataBind",e)}),r.unbind(this),r.on({type:"team",eventName:"afterSave",listener:this},function(t){e.isEmpty(t.data.changes)||i("refresh")})},_getRequiredData:function(n){var i=t.Deferred(),o={colors:r},a=[this._getTeams.bind(this,n),this._getProcesses.bind(this,n),this._getPrograms.bind(this,n)];return e.parallel(a,function(e,t){var n=t[0],r=t[1],a=t[2];o.teams=n,o.processes=r,o.programs=a,i.resolve(o)}),i},_getTeams:function(t,n){t.get("teams",{fields:["id","name","icon"]}).done(function(t){var r=e.sortBy(t[0].data,o);e.each(r,function(e){e.tooltip=""}),n(!1,r)})},_getProcesses:function(t,n){t.get("process",{fields:["id","name","isDefault"]}).done(function(t){var r=e.sortBy(t[0].data,o);n(!1,r)})},_getPrograms:function(t,n){var r=i.termProcessor.getTerm("Program","name"),a={id:-1,name:"No "+r};t.get("program",{fields:["id","name"]}).done(function(t){var r=e.sortBy(t[0].data,o);r.unshift(a),n(!1,r)}.bind(this))}})});
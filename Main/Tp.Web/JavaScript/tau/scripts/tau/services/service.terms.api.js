define(["Underscore","jQuery","tau/core/class"],function(t,e,r){return r.extend({init:function(t){this._configurator=t.configurator},getTermsByProcessId:function(t){return e.ajax({url:this._getCallUrl(),data:{processId:t},dataType:"json",type:"GET"})},saveTerms:function(t){return e.ajax({url:this._getCallUrl(),type:"POST",dataType:"json",contentType:"application/json",data:JSON.stringify(t)})},resetToDefaultByProcessId:function(t){return this.saveTerms({processId:t})},_getCallUrl:function(){return this._configurator.getApplicationPath()+"/terms/"}})});
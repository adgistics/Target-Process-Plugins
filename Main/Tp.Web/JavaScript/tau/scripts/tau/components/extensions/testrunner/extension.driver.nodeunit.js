define(["jQuery","Underscore","tau/components/extensions/component.extension.base","libs.tests/nodeunit/nodeunit","libs/underscore/underscore.string","libs/parseUri","tau/configurator","tau/utils/utils.storage"],function(e,t,n,r,i,s,u,f){return n.extend({"bus afterInit":function(n){e.fx.off=!0;var r=t.compact(n.data.config.files),i=s(document.location.href).queryKey;t.forEach(i,function(e,t){i[t]=decodeURIComponent(e)});var l=t.deepClone(i),o={file:"",filter:"",data:"remote",view:"list",shuffle:!1,failOnFirst:!1,noTryCatch:!1,execution:"serial"};i.apply?(t.defaults(i,o),delete i.apply,f.set("testrunner.nodeunit",i)):i.reset?(delete i.reset,i=o,f.set("testrunner.nodeunit",i)):i.reset_filters&&(delete i.reset_filters,i.file="",i.filter="",f.set("testrunner.nodeunit",i)),i=t.defaults(i,f.get("testrunner.nodeunit")||o),l.file&&!l.filter&&(i.filter=""),i.filter=i.filter.replace(/\+/g," "),i.file=i.file.replace(/\+/g," "),u.setConfig("real","remote"==i.data),i.bus=this.bus,i.file&&(r=t.filter(r,function(e){return 0==e.search(i.file)}));var a=this;require(r,function(){var e=[];t.each(arguments,function(n,i){var s=t.flatten([n]);t.each(s,function(n){n.file=r[i]||"",n.name=n.name||t.camelCase(n.file),n.id="module_"+t.uniqueId(),e.push(n)})}),a.runModules(e,i)})},runModules:function(e,n){if(n.filter){var i=t.filter(e,function(e){return t.includes(e.name,n.filter)});0===i.length&&(i=t.filter(e,function(e){return t.startsWith(n.filter,e.name)})),e=i}this.fire("dataBind",{modules:e,options:n,useragent:navigator.userAgent,href:window.location.href}),r.run(e,n)}})});
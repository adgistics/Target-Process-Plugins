require(["all.components"],function(a){require(["jQuery","tau/configurator","tau/components/component.application"],function(a,b,c){b.clearSingles(),b.setApplicationPath(window.appHostAndPath);var d=c.create();d.on("afterRender",function(a){a.data.element.appendTo(".demo-container")});try{d.initialize()}catch(e){}}),require.onError=function(a){console.log("File wasn't loaded:"+a.message)}})
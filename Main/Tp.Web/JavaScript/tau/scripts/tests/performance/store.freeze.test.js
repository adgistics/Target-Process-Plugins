define(["jQuery","tau/configurator","tests/performance/list.datapoint"],function(a,b,c){function d(){a('<span>Items count: </span><input type="text" id="itemsCount" value="100" />').appendTo("#toolbarContainer"),a("<button>Run</button>").click(h(!0)).appendTo("#toolbarContainer"),a('<table id="result" border="1" cellpadding="1" cellspacing="1" width="30%"><thead><th>#</th><th>Prepare</th><th>Register</th><th>store.get.done cycle</th><th>Unfreeze callbacks cycle</th></thead></table>').appendTo("#resultsContainer")}function e(a){var c=b.getStore().config.proxy;c.registerData(a,!0)}function f(b,c){for(var d=0;d<c;d++){var e=d+1,f={id:e,fields:["id","name","effort","effortCompleted","effortToDo","numericPriority","tags","timeRemain","timeSpent",{entityState:["id","name","isInitial","isFinal"]},{priority:["id","name","importance"]},{owner:["id","firstName","lastName"]},{project:["id"]}]};b.get("task",f).done({success:a.proxy(a.noop,this)})}}function g(a){var d=[];d.push(+(new Date));var g=c.prepareTestData(a);d.push(+(new Date)),e(g),console.log(g),d.push(+(new Date));var h=b.getStore(),i=h.freeze();return f(h,a),d.push(+(new Date)),i.unfreeze(),d.push(+(new Date)),{points:d}}function h(c){return function(){var d=a("#itemsCount").val();c&&b.clear();var e=g(d),f=e.points;a("<tr></tr>").append("<td>0</td>").append("<td>"+(f[1]-f[0])+"</td>").append("<td>"+(f[2]-f[1])+"</td>").append("<td>"+(f[3]-f[2])+"</td>").append("<td>"+(f[4]-f[3])+"</td>").appendTo("#result")}}return{run:d}})
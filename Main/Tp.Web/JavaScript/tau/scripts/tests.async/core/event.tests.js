define(["tau/core/event2"],function(Event){var testEventFlow=function(test,listenTo,flow){var event=new Event;event.on(listenTo,function(){test.set("n",_.rest(arguments).join(":"))}),test.set("n",undefined),_.forEach(flow,function(f){event.fire(f[0],f[1]),test.equals(test.get("n"),f[2],f[3])})},testcase={name:"event","processing basic single":function(test){testEventFlow(test,"e1",[["e1","c1","c1","single event applies listener"],["e1","c2","c2","single event applies listener"],["e2","c3","c2","single event applies listener"]]),testEventFlow(test,"e1:last",[["e1","c1","c1","single event with :last"],["e1","c2","c2","single event with :last"],["e1:last","c3","c2"]]),test.done()},"processing basic combinations plus":function(test){testEventFlow(test,"e1+e2",[["e1","c1",undefined],["e1","c2",undefined],["e2","c3","c2:c3","When two event"],["e2","c4","c2:c3"],["e1","c5","c5:c4","+ order is not important"]]),testEventFlow(test,"e1 + e2 + e3",[["e1","c1",undefined],["e1","c2",undefined],["e3","c3",undefined],["e2","c4","c2:c4:c3"],["e2","c5","c2:c4:c3"],["e1","c6","c2:c4:c3"],["e3","c7","c6:c5:c7"]]),testEventFlow(test," e1 \n+ e2 	+ e3 ",[["e1","c1",undefined],["e1","c2",undefined],["e3","c3",undefined],["e2","c4","c2:c4:c3"],["e2","c5","c2:c4:c3"],["e1","c6","c2:c4:c3"],["e3","c7","c6:c5:c7"]]),test.done()},"processing basic combinations order":function(test){testEventFlow(test,"e1 > e2",[["e2","c1",undefined],["e1","c2",undefined],["e2","c3","c2:c3","When two event"],["e2","c4","c2:c3"],["e1","c5","c2:c3","> order is important"]]),testEventFlow(test,"e1 > e2 > e3",[["e3","c1",undefined],["e2","c2",undefined],["e1","c3",undefined],["e2","c4",undefined],["e3","c5","c3:c4:c5"],["e2","c6","c3:c4:c5"],["e1","c7","c3:c4:c5"],["e2","c8","c3:c4:c5"],["e2","c9","c3:c4:c5"],["e3","c10","c7:c9:c10"]]),test.done()},"processing special combinations":function(test){testEventFlow(test,"e1:last + e2",[["e2","c1",undefined],["e1","c2","c2:c1",":last can applies only once at the beginning"],["e2","c3","c2:c3"],["e2","c4","c2:c4","not :last apply every call"],["e1","c5","c2:c4"],["e1","c6","c2:c4"],["e2","c7","c6:c7"],["e2","c8","c6:c8"]]),testEventFlow(test,"e2 + e1:last",[["e2","c1",undefined,"order does not matter"],["e1","c2","c1:c2",":last can applies only once at the beginning"],["e2","c3","c3:c2"],["e2","c4","c4:c2","not :last apply every call"],["e1","c5","c4:c2"],["e1","c6","c4:c2"],["e2","c7","c7:c6"],["e2","c8","c8:c6"]]),testEventFlow(test,"e1:last + e2:last + e3",[["e2","c1",undefined],["e3","c2",undefined],["e1","c3","c3:c1:c2"],["e1","c4","c3:c1:c2"],["e2","c5","c3:c1:c2"],["e3","c6","c4:c5:c6"]]),testEventFlow(test,"e1:last + e2:last",[["e1","c1",undefined,"Same as + but apply on each event"],["e1","c2",undefined],["e2","c3","c2:c3"],["e2","c4","c2:c4"],["e1","c5","c5:c4"],["e1","c6","c6:c4"]]),testEventFlow(test,"e1:last + e2",[["e2","c1",undefined,"Same as + but apply on each event"],["e1","c2","c2:c1"],["e2","c3","c2:c3"],["e2","c4","c2:c4"],["e1","c5","c2:c4"],["e1","c6","c2:c4"],["e2","c7","c6:c7"]]),testEventFlow(test,"e1:last > e2",[["e2","c1",undefined,"As prev, but order matter"],["e1","c2",undefined],["e2","c3","c2:c3"],["e2","c4","c2:c4"],["e1","c5","c2:c4"],["e1","c6","c2:c4"],["e2","c7","c6:c7"]]);var event=new Event;try{event.on("e1 > e2 + e1",function(){}),test.fail("Should not pass")}catch(e){test.ok("Not implemented")}test.done()}};return testcase})
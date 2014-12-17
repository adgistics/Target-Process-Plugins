define(["Underscore"],function(e){return{times:function(e){return[{id:"leadTime",name:"Lead Time",label:"Lead Time, days",isDefault:"leadTime"===e.scale,filter:"True"},{id:"cycleTime",name:"Cycle Time",label:"Cycle Time, days",isDefault:"cycleTime"===e.scale,filter:"StartDate is not none"}]},filter:function(e,a){return void 0!==e.filter?e.filter:a},assignables:function(e){var a=[{id:"feature",name:"Feature"},{id:"userstory",name:"User Story"},{id:"task",name:"Task"},{id:"bug",name:"Bug"},{id:"request",name:"Request"}];return this.applyDefaultValues(e,a)},generals:function(e){var a=[{id:"feature",name:"Feature"},{id:"userstory",name:"User Story"},{id:"task",name:"Task"},{id:"bug",name:"Bug"},{id:"request",name:"Request"},{id:"testcase",name:"Test Case"},{id:"testplan",name:"Test Plan"},{id:"testplanrun",name:"Test Plan Run"},{id:"impediment",name:"Impediment"},{id:"team",name:"Team"},{id:"project",name:"Project"},{id:"release",name:"Release"},{id:"iteration",name:"Iteration"},{id:"teamiteration",name:"Team Iteration"},{id:"build",name:"Build"}];return this.applyDefaultValues(e,a)},tp2generals:function(e){var a=[{id:"feature",name:"Feature"},{id:"userstory",name:"User Story"},{id:"task",name:"Task"},{id:"bug",name:"Bug"},{id:"request",name:"Request"},{id:"testcase",name:"Test Case"},{id:"testplan",name:"Test Plan"},{id:"testplanrun",name:"Test Plan Run"},{id:"impediment",name:"Impediment"},{id:"project",name:"Project"},{id:"iteration",name:"Iteration"},{id:"build",name:"Build"}];return this.applyDefaultValues(e,a)},applyDefaultValues:function(a,t){var i="string"==typeof a.entities?JSON.parse(a.entities):a.entities;return e.each(t,function(a){a.isDefault=e.contains(i,a.id)}),t}}});
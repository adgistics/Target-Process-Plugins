define(["Underscore","libs/d3/d3","tp/reports/chart.scales"],function(n,a,r){function e(){}return e.prototype={get:function(n,e,i){var t=a.scale.linear().range([i.margin,i.width-i.margin]).domain([0,a.max(n,function(n){return n.values.length})]);t.label=e.mapping.x.label;var l=a.max(n,function(n){return a.max(n.values,function(n){return n.y})});l=a.min([1.2*l,1]);var g=a.scale.linear().range([i.height-i.margin,i.margin]).domain([0,l]);g.label=e.mapping.y.label;var u=a.scale.linear().range([i.height-i.margin,i.margin]).domain([0,1]),o=function(n){return t(n)-t(0)},m=function(n){return g.range()[0]-g(n)};return{x:t,y:g,fill:r.type(),probability:u,width:o,height:m,axisMargin:20}}},e.xMax=200,e});
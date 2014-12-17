define(["jQuery","libs/d3/d3"],function(t,a){var e=function(){};return e.prototype={render:function(e,r){var n=this,i=e.createGroup("marker"),l=i.append("rect").attr("class","lineChartPointYCoordinateRect").attr("x",0).attr("width",e.margin).attr("height",20).attr("rx",5).attr("ry",5).style("display","none"),o=i.append("text").attr("class","lineChartPointYCoordinate").attr("x",e.margin/2).attr("y",0).attr("width",e.margin).attr("height",e.margin).style("display","none"),s=o.append("tspan").attr("dy",0),c=i.append("line").attr("class","lineChartPointYLine").attr("x1",e.x(0)).style("display","none"),y=function(t,a){l.attr("y",e.y(r.getYValue(t))-l.attr("height")/2).style("display",null),o.attr("y",e.y(r.getYValue(t))+5).style("display",null),s.text(Math.round(r.getYValue(t))),a>0&&c.attr("x2",e.x(a)-7).attr("y1",e.y(r.getYValue(t))).attr("y2",e.y(r.getYValue(t))).style("display",null)},d=function(){o.style("display","none"),c.style("display","none"),l.style("display","none")},p=function(t){t.attr("stroke-width",5)},h=function(t){t.attr("stroke-width",3)};e.createGroup("chart").selectAll("line.lineChart").data(r.data).enter().append("g").attr("class",function(t,a){return"item"+a}).each(function(r,i){if(null!=r.total){{var l=a.select(this),o=l.append("circle").attr("cx",e.x(i+.5)).attr("cy",e.y((r.total.remained+r.total.remainedForNextDay)/2)).attr("r",1).attr("stroke","#3BCAFF").attr("stroke-width",1),s=l.append("line").attr("class","lineChart").attr("x1",e.x(i)).attr("y1",e.y(r.total.remained)).attr("x2",e.x(i+1)).attr("y2",e.y(r.total.remainedForNextDay)).attr("stroke","#3BCAFF").attr("stroke-width",3);l.append("circle").attr("class","lineChartPoint").attr("cx",e.x(i)).attr("cy",e.y(r.total.remained)).attr("r",4)}r.last&&l.append("circle").attr("class","lineChartPoint").attr("cx",e.x(i+1)).attr("cy",e.y(r.total.remainedForNextDay)).attr("r",4);var c=l.append("rect").attr("x",e.x(i)).attr("y",e.y(e.yAxis.max)).attr("class","lineChartPointHover").attr("width",e.xCellSize).attr("height",e.y(0)-e.y(e.yAxis.max)).attr("opacity",0).on("mouseover",function(){a.select(this).attr("opacity",.1),y(r,i),p(s)
}).on("mouseout",function(){a.select(this).classed("lineChartPointHoverSelected")||a.select(this).attr("opacity",0),d(),h(s)});t(c[0]).click(function(a){t(n).trigger("click",{name:"lineChart",$pointer:t(o[0]),data:r,index:i,$rect:t(this),origin:a})})}})},fadeOut:function(t){a.select(t).attr("opacity",.1),a.select(t).attr("class","lineChartPointHoverSelected")},fadeIn:function(t){a.select(t).attr("class","lineChartPointHover"),a.select(t).attr("opacity",0)}},e});
function transitionGroup(){function b(){d3.select(this).transition().duration(500).attr("y",function(a){return h-y2(a)}).attr("height",y2)}var a=d3.selectAll("#chart");a.select("#group").attr("class","first active"),a.select("#stack").attr("class","last"),a.selectAll("g.layer rect").transition().duration(500).delay(function(a,b){return b%m*10}).attr("x",function(a,b){return x({x:.9*~~(b/m)/n})}).attr("width",x({x:.9/n})).each("end",b)}function transitionStack(){function b(){d3.select(this).transition().duration(500).attr("x",0).attr("width",x({x:.9}))}var a=d3.select("#chart");a.select("#group").attr("class","first"),a.select("#stack").attr("class","last active"),a.selectAll("g.layer rect").transition().duration(500).delay(function(a,b){return b%m*10}).attr("y",y1).attr("height",function(a){return y0(a)-y1(a)}).each("end",b)}var n=4,m=64,data=d3.layout.stack()(stream_layers(n,m,.1)),color=d3.interpolateRgb("#aad","#556"),p=20,w=960,h=499.5-p,mx=m,my=d3.max(data,function(a){return d3.max(a,function(a){return a.y0+a.y})}),mz=d3.max(data,function(a){return d3.max(a,function(a){return a.y})}),x=function(a){return a.x*w/mx},y0=function(a){return h-a.y0*h/my},y1=function(a){return h-(a.y+a.y0)*h/my},y2=function(a){return a.y*h/mz},vis=d3.select("#chart").append("svg").attr("width",w).attr("height",h+p),layers=vis.selectAll("g.layer").data(data).enter().append("g").style("fill",function(a,b){return color(b/(n-1))}).attr("class","layer"),bars=layers.selectAll("g.bar").data(function(a){return a}).enter().append("g").attr("class","bar").attr("transform",function(a){return"translate("+x(a)+",0)"});bars.append("rect").attr("width",x({x:.9})).attr("x",0).attr("y",h).attr("height",0).transition().delay(function(a,b){return b*10}).attr("y",y1).attr("height",function(a){return y0(a)-y1(a)});var labels=vis.selectAll("text.label").data(data[0]).enter().append("text").attr("class","label").attr("x",x).attr("y",h+6).attr("dx",x({x:.45})).attr("dy",".71em").attr("text-anchor","middle").text(function(a,b){return b});vis.append("line").attr("x1",0).attr("x2",w-x({x:.1})).attr("y1",h).attr("y2",h)
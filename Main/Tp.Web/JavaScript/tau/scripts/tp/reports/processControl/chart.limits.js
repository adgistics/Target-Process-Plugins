define(["libs/jstat/jstat.extensions","libs/d3/d3","Underscore","tp/reports/chart.behaviour","tp/reports/processControl/chart.axes.format"],function(jStat,d3,_,BaseChart,format){return BaseChart.extend({getData:function(data,context){var limitsData=[];for(var i=0;i<context.scales.stroke.domain().length;i++){var entityData=data.filter(function(item){return item.stroke==context.scales.stroke.domain()[i]}).map(function(item){return item.y});if(entityData.length>0){var entityType=context.scales.stroke.range()[i],jstatData=jStat(entityData),median=jstatData.median(),error=Math.sqrt(jstatData.meansqerr());_.chain([this.getControlLimitData(median,error,entityType,context),this.getWarningLimitData(median,error,entityType,context),this.getMedianData(median,entityType,context)]).filter(function(limit){return limit.y>context.scales.y.range()[1]}).each(function(limit){limitsData.push(limit)})}}return this.adjustLabelsPlacement(limitsData)},getControlLimitData:function(median,error,entityType,context){var value=median+error*3,y=context.scales.y(value);return error==0&&(y-=2),{id:entityType+"control",value:value,text:"Control limit: ","class":"control",entityType:entityType,description:"Indicates the threshold at which the process is statistically 'unlikely' (3 standard errors from the median).",y:y}},getWarningLimitData:function(median,error,entityType,context){var value=median+error*2,y=context.scales.y(value);return error==0&&(y-=1),{id:entityType+"warning",value:median+error*2,text:"Warning limit: ","class":"warning",entityType:entityType,description:"Indicates the dangerous threshold. All the items above this line are suspicious (2 standard errors from the median).",y:y}},getMedianData:function(median,entityType,context){return{id:entityType+"median",value:median,text:"Median: ","class":"median",entityType:entityType,description:'Typical lead or cycle time. The "middle" value in the list of all values.',y:context.scales.y(median)}},adjustLabelsPlacement:function(data){var distance=18,closeEnough=function(item1,item2,steps){return Math.abs(item1-item2)<=distance*steps},limitsData=_.chain(data).sortBy(function(item){return item.y}).value();return _.each(limitsData,function(item,index,all){var closestItems=_.filter(all,function(x,ix){return closeEnough(x.y,item.y,Math.abs(index-ix))}),count=closestItems.length,mid=jStat(closestItems.map(function(x){return x.y})).mean();_.each(closestItems,function(x,index){x.y=mid+(index-count/2)*distance+10})}),limitsData},data:function(data,context){d3.select(context.placeholder).classed("limits",!0);var limitsData=this.getData(data,context),items=d3.select(context.placeholder).selectAll("line.limit").data(limitsData,function(d){return d.id});items.enter().append("line"),items.exit().remove(),items.attr("class",function(d){return"limit "+d.class+" "+d.entityType}).transition().attr("x1",context.scales.x.range()[0]-context.scales.axisMargin).attr("y1",function(d){return context.scales.y(d.value)}).attr("x2",context.scales.x.range()[1]).attr("y2",function(d){return context.scales.y(d.value)});var labels=d3.select(context.placeholder).selectAll("text.limit.limitLabel").data(limitsData,function(d){return d.id});labels.enter().append("text"),labels.exit().remove(),labels.attr("class",function(d){return"limit limitLabel "+d.entityType}).transition().text(function(d){return d.text+format.timerange("d","h","min")(d.value)}).attr("x",context.scales.x.range()[1]+context.plot.margin/4).attr("y",function(d){return d.y}).attr("dy",".35em"),this._subscribe(labels,["mouseover","mouseout"],context)}})})
define({name:"Features Cycle Time trend",description:"How Features average Cycle Time changes every month",type:"line",classNames:["line1-feature","line1-decrease"],tags:["Kanban","Cycle time"],reportSettings:{dataSource:{source:{filter:"?EndDate >= Today - 365(days)",items:[{id:"Feature"}]},dimensions:[{id:"cycleTime",model:"avg(cycleTime)"},{id:"entityType",model:"entityType.name"},{id:"endDate",model:"Month(endDate)"}]},report:{x:"endDate",y:"cycleTime",color:"entityType",dimensions:{endDate:{type:"order",scale:"period"},cycleTime:{type:"measure",scale:"linear"},entityType:{type:"category",scale:"ordinal"}},guide:[{x:{label:"End Date by month",tickPeriod:"month"},y:{label:"Cycle Time in days"}}]}}});
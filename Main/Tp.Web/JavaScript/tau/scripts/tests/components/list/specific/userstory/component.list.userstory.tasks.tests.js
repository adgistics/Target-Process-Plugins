define(["Underscore","tests/components/list/specific/component.list.spec.base","tau/models/dataProviders/userstory/userstory.model.provider.tasks.items"],function(_,a,b){var c=function(){var c=a.Testcase.create("[list.userstory.tasks]",b,null,function(){this.componentConfig={itemsDataProvider:this.providers.items,views:[{type:"grid.entity"}]};var a={task:"Task"},b={kanban:"Kanban",scrum:"Scrum"},c={p1:"Good"},d={s1:"Good"},e={p_kanban:{name:"Project Kanban",process:"kanban"},p_scrum:{name:"Project Scrum",process:"scrum"}},f={r1:"Release1",r2:"R2"},g={i1:"Iter1",i2:"Iter2"},h={task_open:{name:"Open",nextStates:["task_inprogress","task_done"],entityType:"task",process:"kanban",isInitial:!0},task_inprogress:{name:"In Progress",nextStates:["task_done"],entityType:"task",process:"kanban"},task_done:{name:"Done",nextStates:[],entityType:"task",process:"kanban",isFinal:!0}},i={us1:{name:"US1",tasks:["t1","t2","t3"],project:"p_kanban",process:"kanban"},us2:{name:"US2",tasks:[],project:"p_kanban",process:"kanban"}},j={t1:{name:"Task1",priority:"p1",project:"p_kanban",release:"r1",entityState:"task_open",numericPriority:10},t2:{name:"Task2",priority:"p1",project:"p_scrum",iteration:"i1",entityState:"task_open",numericPriority:30},t3:{name:"Task3",priority:"p1",project:"p_scrum",iteration:"i1",entityState:"task_open",numericPriority:20}};this.loadFixtures({entityType:a,projects:e,userStories:i,tasks:j,priority:c,severity:d,processes:b,releases:f,iterations:g,entityStates:h}),this.setProject(this.data.project.p_kanban),this.setEntity(this.data.userStory.us1)});c.add(new a.Test({name:"should render valid markup view",test:function(){var a=this.data,b=this.$el,c=[{items:["Task1","Task3","Task2"]}],d=b.find("[role=group]");equals(d.length,c.length,"Groups amount");var e=b.find("[role=list]");for(var f=0;f<e.length;f++){var g=e.eq(f),h=g.find("[role=item]");for(var i=0;i<h.length;i++){var j=h.eq(i).find(".tau-list__table__cell"),k=a.items[i];equals(_.trim(j.eq(1).text()),k.id,"ID Data column");var l=_.trim(j.eq(2).text()),m=c[f].items[i];equals(l,m,"Name Data column")}}}})),c.run()};return{run:c}})
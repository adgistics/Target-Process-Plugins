define(["jQuery","tests/common/testkit","tau/components/component.property.owner.project"],function(a,b,c){var d=function(){var d=new b("[component.property.owner.project]",c),e={p1:{name:"Project",owner:"gu1"}},f={gu1:{id:777,firstName:"Ron",lastName:"Jeremy",role:"admin"}},g={u1:{id:777,firstName:"Ron",lastName:"Jeremy",role:"admin",isActive:!0},u2:{firstName:"Sasha",lastName:"Grey",role:"developer",isActive:!0},u3:{firstName:"Max",lastName:"Hardcore",role:"developer",isActive:!0},u4:{firstName:"Bree",lastName:"Olson",role:"qa",isActive:!0},u5:{firstName:"Jenna",lastName:"Jameson",role:"developer",isActive:!0}},h={admin:"Admin",developer:"Developer",qa:"QA"},i=d.loadFixtures({generalUsers:f,users:g,projects:e,roles:h});return d.setData(i),d.setEntity(i.project.p1),d.selectProject(i.project.p1),d.loginAs(i.user.u2),d.addTest({name:"should render valid markup",test:function(){var a=this.$el;equal(a.find(".user-avatar-container .user-avatar").length,1,"Avatar src"),equal(a.find(".user-info .user-name").text(),"Ron Jeremy","User name")}}),d.addTest({name:"should change owner",test:function(){var b=this.$el,c=b.find(".user-info .user-name");c.click();var e=a(".tau-bubble");equal(e.size(),1,"Count of bubbles");var f=e.eq(0).find('.user-name:contains("Bree Olson")');equals(f.length,1,"Has option");var g=i.user.u4,h=i.project.p1;d.getService().registerSaveCommand({config:{$set:{owner:{id:g.id}},fields:["id",{owner:["id","firstName","lastName"]}],id:h.id},returnedData:{id:h.id,owner:g}}),f.click(),equal(this.$el.find(".user-info .user-name").text(),"Bree Olson","Owner was changed"),d.getService().verify()}}),d.run()};return{run:d}})
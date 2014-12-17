define(["Underscore","tau/core/extension.base","tau/libs/inviter/inviter"],function(e,r,t){return r.extend({"bus configurator.ready:last + project.add.ready":function(r,a,o){var s=this,i=a.getStore(),n={name:e.trim(o.name),color:e.trim(e.asString(o.color))||null,process:{id:o.process}};o.program&&"-1"!=o.program&&(n.program={id:o.program}),i.save("project",{failureGlobal:!1,$set:n},{success:function(e){s.fire("project.saved",e.data)},failure:function(e){s.fire("project.add.failure",e.data.response.Message)}}).done();var c=new t(a);c.invite(o.members).done(function(e){s.fire("projectMembers.saved",e)})},"bus configurator.ready:last + project.add.ready + project.saved + projectMembers.saved":function(r,t,a,o,s){var i=this,n=t.getStore(),c=e.compact(e.pluck(s,"success")),d=e.compact(e.pluck(s,"failure"));if(d.length){var u="Can't assign users.";this.fire("project.add.nonFatalFailure",u)}c=e.filter(c,function(e){return e!=t.getLoggedUser().id});var p={projectMembers:e.map(c,function(e){return{user:{id:e}}})};n.save("project",{id:o.id,$set:p,fields:["id","name","color",{projectMembers:[{user:["id","firstName","lastName","avatarUri"]},{role:["id","name"]}]}]}).done(function(e){i.fire("projectMembers.connected",e[0].data)})},"bus project.saved + projectMembers.saved + projectMembers.connected":function(e,r,t,a){this.fire("project.add.success",a)}})});
define(["Underscore","tau/core/model-base"],function(_,EditableBase){return EditableBase.extend({"bus registerStoreRequest":function(){var entity=this.config.context.entity,store=this.config.store,self=this;store.get(entity.entityType.name,{id:entity.id,fields:[{project:["id",{projectMembers:[{user:["id","firstName","lastName","email","isActive","deleteDate"]},{role:["id","name"]}]}]},{team:["id",{teamMembers:[{user:["id","firstName","lastName","email","isActive","deleteDate"]},{role:["id","name"]}]}]}]}).done({success:function(results){results[0].data.project=results[0].data.project||{},_.defaults(results[0].data.project,{projectMembers:[]}),results[0].data.team=results[0].data.team||{},_.defaults(results[0].data.team,{teamMembers:[]});var members=results[0].data.project.projectMembers.concat(results[0].data.team.teamMembers||[]);members=_.uniq(members,!1,function(u){return u.user.id}),self.fire("members.provided",members)}}),store.get(entity.entityType.name,{id:entity.id,fields:[{requesters:["id","firstName","lastName","email","isActive","deleteDate","kind"]}]}).done({success:function(results){var requesters=results[0].data.requesters;self.fire("requesters.provided",requesters)}})},"bus members.provided+requesters.provided":function(evt){var members=evt["members.provided"].data,requesters=evt["requesters.provided"].data,ids=_.pluck(requesters,"id");members=_.reject(members,function(member){return _.indexOf(ids,member.user.id)>-1}),_.forEach(requesters,function(user){members.unshift({role:{id:0,name:"Requesters"},user:user})}),members=_.filter(members,function(member){return member.user.deleteDate===null});var roles=[];_.forEach(members,function(member){var role=member.role;role&&roles.push(role),member.username=_.trim([member.firstName,member.lastName].join(" "))||member.email}),roles=_.uniq(roles,!1,function(item){return item.id}),this.fire("projectMembersReady",members),this.fire("projectRolesReady",roles)}})})
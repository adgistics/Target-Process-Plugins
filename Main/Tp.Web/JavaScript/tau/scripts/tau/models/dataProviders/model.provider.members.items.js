define(["Underscore","jQuery","tau/models/dataProviders/model.provider.items.base"],function(e,t,i){return i.extend({sparklineLength:16,fetchStrategy:{project:{collectionName:"projectMembers",typeName:"projectMember"},team:{collectionName:"teamMembers",typeName:"teamMember"}},fetch:function(e){var t=(this.config.context.entity.entityType.name||"").toLowerCase(),i=this.fetchStrategy[t];if(!i)throw new Error("Unknown fetch strategy");this._fetch(i.collectionName,i.typeName,null,e)},_createDetailCommand:function(e){var t={};return t[e]=["id",{user:["id","firstName","lastName","email","avatarUri","IsAdministrator","isActive","bug-count","userStorie-count"]},{role:["id","name"]}],t},_fetch:function(e,i,r,a){var n=this,s=this.config.context.entity,o=s.entityType.name,l=this.config.context.configurator;t.ajax({url:l.getApplicationPath()+"/api/v2/"+i+"?select={"+["id",'"'+i+'" as __type',"new("+["User.id","User.firstName","User.lastName","User.email","User.avatarUri","User.isActive","User.isAdministrator",'User.Assignables.Count(entityType.Name == "Bug" AND entityState.IsFinal != true AND '+o+".id = "+s.id+") as bugsCount",'User.Assignables.Count(entityType.Name == "Task" AND entityState.IsFinal != true AND '+o+".id = "+s.id+") as tasksCount",'User.Assignables.Count(entityType.Name == "UserStory" AND entityState.IsFinal != true AND '+o+".id = "+s.id+") as userStoriesCount","User.Assignables.Where("+o+".id = "+s.id+").Sparkline("+this.sparklineLength+") as allSparkline"].join(",")+") as user","new("+["Role.id","Role.name"].join(",")+") as role "].join(",")+"}&where=("+o+".id=="+s.id+")&take=1000"}).done(function(e){a(n._convertData(e.items))}).fail(function(){a(n._convertData([]))})},_convertItem:function(t){t.user.name=e.trim(e.asString(t.user.firstName)+" "+e.asString(t.user.lastName))||"",t.user.url=this.config.context.configurator.getUrlBuilder().getNewViewUrl(t.user.id,"user",!0);var i=this.config.context.configurator,r={id:t.id,__type:t.__type,user:t.user,role:t.role,appPath:i.getApplicationPath(),doneSparkline:t.user.doneSparkline,allSparkline:t.user.allSparkline};
return i.getStore().register(r),r}})});
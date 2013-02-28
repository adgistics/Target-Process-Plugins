define(["Underscore","tau/core/model.editable.base"],function(_,ModelBase){var UserSettingsModel=ModelBase.extend({onInit:function(){var config=this.config,userId=config.context.entity.id,self=this,loggedUser=config.context.applicationContext.loggedUser,isAdminOrLoggedUser=loggedUser.isAdministrator||loggedUser.id===userId;this.store.get("user",{id:userId,fields:["login","email","weeklyAvailableHours","isActive","isObserver","isAdministrator","activeDirectoryName"]}).done(function(result){self.fire("dataBind",_.extend(_.clone(result[0].data),{allowToEditAdmin:loggedUser.id!=userId&&loggedUser.isAdministrator,allowToEditObserver:loggedUser.isAdministrator,allowToEdit:isAdminOrLoggedUser}))})},"bus model.save":function(evt,data){var userId=this.config.context.entity.id,self=this;this.store.save("user",{id:userId,$set:_.extend(data,{id:userId})}).done(function(result){self.fire("refresh"),self.fire("model.data.changed",data)})}});return UserSettingsModel})
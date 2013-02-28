define(["jQuery"],function($){function userRepository(config){this._create(config)}return userRepository.prototype={_create:function(config){this._restService=config.restService},getUsers:function(success){var service=this._restService,handle=function(data){var activeUsers=$.grep(data.Items,function(user){return user.IsActive}),mappingUsers=$(activeUsers).map(function(){return{Id:this.Id,Name:this.FirstName+" "+this.LastName,Role:this.Role.Name,Email:this.Email,Login:this.Login,Avatar:service.getAvatarUrl(this.Id)}});success(mappingUsers)};service.getUsers(handle)}},userRepository})
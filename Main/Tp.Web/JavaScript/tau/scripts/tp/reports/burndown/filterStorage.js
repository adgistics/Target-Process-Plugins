define(["tau/storage/api"],function(StorageApi){function FilterStorage(config){this.api=new StorageApi,this.groupName=config.groupName,this.key="setting"}return FilterStorage.prototype={savePlannableFilter:function(filter){this.api.data(this.groupName,this.key,{scope:"Public",userData:filter})},findPlannableFilter:function(success){this.api.select(this.groupName,{$fields:["userData.includeWeekends","userData.showBugs","userData.isInPoints","userData.burnDownType","userData.plannableId"]}).done(function(r){var data=null;r.data.length>0&&r.data[0].burnDownType&&(data=r.data[0],data.burnDownType=data.burnDownType.toLowerCase()),success(data)})}},FilterStorage})
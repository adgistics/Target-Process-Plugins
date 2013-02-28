define(["Underscore","tau/models/dataProviders/model.provider.groups.base","tau/utils/utils.date"],function(_,Class,dateUtils){return Class.extend({fetch:function(key,items,fnCallback){return this._fetchReleases(key,items,fnCallback)},_fetchReleases:function(key,entityTypes,fnCallback){var ctx=this.config.context,entityTypeName=ctx.entity.entityType.name,entityId=ctx.entity.id,store=this.config.store,self=this,command={id:entityId,nested:!0,fields:[{releases:["id","name","startDate","endDate"]}]};store.get("project",command).done({success:function(data){var releases=_(data).pluck("data")[0].releases;releases=_.sortBy(releases,function(item){return-1*dateUtils.parse(item.startDate)});var groups=[];_.forEach(releases,function(item){groups.push(self._processRelease(item))}),_.forEach(groups,function(group){group.items=[]}),fnCallback(groups)}})},_processRelease:function(item){var startDate=dateUtils.parse(item.startDate).clearTime(),endDate=dateUtils.parse(item.endDate).clearTime(),collapsed=!0,isCurrent=!1;dateUtils.Date.today().between(startDate,endDate)&&(collapsed=!1,isCurrent=!0);var dateFormat="d MMM",title=dateUtils.formatAs(dateUtils.convertToTimezone(startDate),dateFormat)+" / "+dateUtils.formatAs(dateUtils.convertToTimezone(endDate),dateFormat);title=title+" ("+Math.floor((endDate.getTime()-startDate.getTime())/1e3/60/60/24+1)+" days)",isCurrent&&(title+=" (current)");var release={key:item.id,title:item.name,subtitle:title,collapsed:collapsed,realGroup:item};return release}})})
define(["Underscore","tau/utils/utils.htmlConverter","tau/utils/utils.date"],function(t,e,r){var n=function(t){this.configurator=t};return n.prototype={destroy:function(){this.context=null},convertDTO:function(t){var n=this,i="DELETED"===t.description,o=r.convertToTimezone(t.createDate),a={id:t.id,parentId:t.parentId,owner:t.owner,avatar:[t.owner.avatarUri,"32"].join(""),name:n.getName(t.owner),fullName:n.getFullName(t.owner),description:e.fromSourceToHtml(t.description),age:this.getAge(o),createDate:r.format.datetime.short(o),comments:[],deleted:i,isRequester:t.owner.kind&&"requester"===t.owner.kind.toString().toLowerCase()};return this.configurator&&this.configurator.getLoggedUser().id==t.owner.id&&(a.isOwnerComment=!0),a.actions={edit:!i,reply:i,"delete":i},a},getName:function(e){var r=e.firstName||"",n=e.lastName||"",i="";return(r.length>0||n.length>0)&&(i=[r," ",t.trim(n).substring(0,1),"."].join("")),i},getFullName:function(e){var r=e.firstName||"",n=e.lastName||"";return t.trim([t.trim(r)," ",t.trim(n)].join(""))},getAge:function(t){if(!t)return"Draft";var e=r.getAge(t,this.configurator.getCurrentDate());return e.isZero?"Just added":e.toString()}},n});
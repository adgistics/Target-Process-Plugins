define(["tau/components/extensions/component.extension.base","tau/configurator","tau/utils/utils.urlBuilder","tau/utils/utils.redirect"],function(a,b,c,d){return a.extend({"bus split":function(a){var b=a.data.generalID;this.split(b)},split:function(a){var e=this,f=b.getActionsService();f.splitUserStory(a,function(b){var e=b.d,f=c.getSplitForUserStoryUrl(a,e);(new d).redirect(f)},function(a){e.fire("error",{message:"Split operation is failed due to server error"})})}})})
define(["tau/components/extensions/component.extension.base","tau/configurator","tau/core/templates-factory"],function(a,b,c){var d=0;return a.extend({"bus attachToRequest":function(a){var b=a.data.generalID;this.attachToRequest(b)},attachToRequest:function(a){Ext.WindowMgr.zseed=99999;var c=this,d=this.config.context.getProjectId(),e=[];for(var f=0;f<_projectContext.length;f++)e.push(_projectContext[f].id);var g=b.getActionsService();g.getProjectIds(function(b){var e=Ext.create({xtype:"lookupgenerallistitemgrid",listeners:{lookupactionlinkclick:{fn:function(b,d,e,h,i,j){f.close(),f.destroy();var k=function(b){c.fire("requestWasAttachedToEntity",{entity:{id:a}},{project:{id:h.json.GeneralID}})},l=function(a){};g.attachGeneralToRequest(a,h.json.GeneralID,k,l)},scope:this}},showReleaseIteration:!1,showEntityType:!1,excludeEntityId:0,showProjects:!0,entityTypeIds:[17],showState:!1,projectIds:b.d,projectId:d,appendItems:[]}),f=showModalPopupForComponent(e,{width:680,height:500,title:"Attach to Request"})})}})})
define(["tau/components/extensions/component.extension.base"],function(ExtensionBase){var popupId=0;return ExtensionBase.extend({"bus attachToRequest":function(evt){var generalID=evt.data.generalID;this.attachToRequest(generalID)},attachToRequest:function(generalID){Ext.WindowMgr.zseed=99999;var self=this,projectID=this.config.context.getProjectId(),projectIds=[];for(var i=0;i<_projectContext.length;i++)projectIds.push(_projectContext[i].id);var actionsService=this.config.context.configurator.getActionsService();actionsService.getProjectIds(function(result){var lookup=Ext.create({xtype:"lookupgenerallistitemgrid",listeners:{lookupactionlinkclick:{fn:function(e,el,grid,record,row,cell){wnd.close(),wnd.destroy();var success=function(data){self.fire("requestWasAttachedToEntity",{entity:{id:generalID}},{project:{id:record.json.GeneralID}})},error=function(data){};actionsService.attachGeneralToRequest(generalID,record.json.GeneralID,success,error)},scope:this}},showReleaseIteration:!1,showEntityType:!1,excludeEntityId:0,showProjects:!0,entityTypeIds:[17],showState:!1,projectIds:result.d,projectId:projectID,appendItems:[]}),wnd=showModalPopupForComponent(lookup,{width:680,height:500,title:"Attach to Request"})})}})})
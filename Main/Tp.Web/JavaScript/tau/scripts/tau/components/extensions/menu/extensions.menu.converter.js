define(["tau/components/extensions/component.extension.base","tau/configurator","tau/core/templates-factory","tau/ui/templates/actions/ui.template.convert"],function(a,b,c){var d=46,e=0;return a.extend({"bus convertEntity":function(a){var b=a.data.projectID,c=a.data.generalID;this.convert(c,b)},convert:function(a,f){var g=this.config.context.entity.id,h=this.bus.getGlobalBus(),i=b.getActionsService();Ext.WindowMgr.zseed=99999;var j=this,k=[],l=function(g){function n(){var a=h.find("#entityType").val();h.find("textarea").unbind("keypress"),h.find("textarea").unbind("keyup"),h.find("#pnlLookupUserStory").css("display",a==d?"block":"none"),a==0?h.find(".convert-btn").attr("disabled","disabled"):a==d?(h.find("textarea").bind("keypress ",function(a){a.keyCode==13&&(a.stopPropagation(),a.preventDefault())}),h.find("textarea").bind("keyup",m),h.find("textarea").bind("change",m),m()):h.find(".convert-btn").removeAttr("disabled")}e++;var h=c.get("convert").bind(j.config,{types:g.d}).appendTo("body"),l="convertEntityPanel"+e;h=h.find("#convertEntityPanel").prop("id",l);var m=function(){h.find("textarea").val().length==0?h.find(".convert-btn").attr("disabled","disabled"):h.find(".convert-btn").removeAttr("disabled")};$create(Tp.Atlas.Extenders.Lookup.GeneralLookupBehavior,{TargetControl:h.find("#txtGeneralsLookup")[0],clearLink:h.find("#lnkClear")[0],entityTypeIDs:[4],excludeEntityID:a,findLink:h.find("#lnkFind")[0],generalElement:h.find("#hdnGeneralID")[0],id:"lkpUserStories",projectID:f,projectIDs:k,showEntityTypeFilter:!1,showProjectFilter:!0,showReleaseIterationFilter:!0,onFindDelegate:function(){h.find(".convert-btn").removeAttr("disabled")},showStateFilter:!1},null,null),h.find(".convert-btn").click(function(){var c=h.find("#entityType").val();o.hide(),j.fire("showProgress",{text:"Converting..."});var e={generalId:a},f=function(c){o.close(),j.fire("hideProgress");var d=c.d,e=d.EntityTypeName.split("."),f=e[e.length-1],g={entity:{id:d.GeneralID},entityType:{name:f}};j.fire("generalWasConverted",g),b.getHistory().exclude(a),b.getRouting().redirect("#"+f.toLowerCase()+"/"+d.GeneralID),window._criticalTauChanges=!0},g=function(a){o.close(),j.fire("hideProgress");var b=jQuery.parseJSON(a.responseText)||{Message:"Server is not available"},c=b.Message;j.fire("error",{message:c})};if(c==d){var k=h.find("#hdnGeneralID").val();if(!k){j.fire("error",{message:"Parent user story is not specified"});return}i.convertGeneralToTask(a,k,f,g)}else e.entityTypeId=c,i.convertGeneralToType(a,c,f,g)}),h.find("#entityType").change(function(){n()}),n();var o=showModalPopup(l,{title:"Convert",width:600,height:220})};i.getProjectIds(function(b){k=b.d,i.generalCanConvertTo(a,l)})}})})
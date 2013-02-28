define(["jQuery","Underscore","tau/components/extensions/component.extension.base"],function($,_,ExtensionBase){return ExtensionBase.extend({"bus afterRender":function(evt,renderData){var dataBind=renderData.data,$el=renderData.element,$filter=$el.find(".i-role-popupcontent"),$sectionTeams=$filter.find(".i-role-section-teams"),$sectionProjects=$filter.find(".i-role-section-projects");this.toggleCustomSharedPanel($el,!dataBind.access.customSharedData.isActive),$el.on("change","[role=action-share]",function(e){this.handlers[$(e.target).val()].bind(this)($el)}.bind(this)),$el.on("click",".i-role-popupcontent :checkbox",function(){function intValue(input){return parseInt(input.value,10)}var teamIds=_.map($sectionTeams.find(".i-role-list :checked"),intValue),projectIds=_.map($sectionProjects.find(".i-role-list :checked"),intValue);this.fireCustomSharedData(!0,!0,teamIds,projectIds)}.bind(this)),this.fire("$popup.ready",$filter),this.fire("$teamSection.ready",$sectionTeams),this.fire("$projectSection.ready",$sectionProjects),this.fire("$sections.ready",$filter.find(".tau-teams, .tau-projects"))},fireCustomSharedData:function(isShared,isActive,teamIds,projectIds){this.fire("form.submitted",{isShared:isShared,customSharedData:{isActive:isActive,teamIds:teamIds||[],projectIds:projectIds||[]}})},handlers:{"public":function($renderElement){this.toggleCustomSharedPanel($renderElement,!0),this.fireCustomSharedData(!0,!1)},"private":function($renderElement){this.toggleCustomSharedPanel($renderElement,!0),this.fireCustomSharedData(!1,!1)},custom:function($renderElement){this.toggleCustomSharedPanel($renderElement,!1),this.fireCustomSharedData(!0,!0)}},toggleCustomSharedPanel:function($renderElement,disabled){var $filter=$renderElement.find(".i-role-popupcontent");$filter.toggleClass("tau-disabled",disabled),$filter.find("input,button").prop("disabled",disabled),disabled&&$filter.find(":checkbox").prop("checked",!1)}})})
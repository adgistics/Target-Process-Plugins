define(["require","Underscore","jQuery","tau/core/class","tau/storage/app.state.store.seriailzer","tau/services/service.hash","tau/configurations/const.page.entity.actions"],function(t){var e=t("Underscore"),r=t("jQuery"),i=t("tau/core/class"),n=t("tau/storage/app.state.store.seriailzer"),a=t("tau/services/service.hash"),s=t("tau/configurations/const.page.entity.actions");return i.extend({init:function(t){this.applicationPath=t.getApplicationPath(),this.currentAcid=t.getCurrentAcid(),this.configurator=t,this.stateManager=t.getStateManager(),this.stateManager.get({id:"appConfig",fields:["acid"],callback:e.bind(function(t){t.acid&&(this.currentAcid=t.acid)},this)}),this.stateManager.bind({paramId:"appConfig",fieldName:"acid",listener:this,callback:e.bind(function(t){t.value&&(this.currentAcid=t.value)},this)}),this.pages={view:"/RestUI/TpView.aspx"}},getApplicationPath:function(){return this.applicationPath},getCurrentAcid:function(){return this.currentAcid},getHashBuilder:function(){var t=new a(this.configurator);return t.setFakeWindow(),{append:function(r){return e.forEach(r,function(e,r){t.setHashParam(r,e)}),this},build:function(){var e="#"+t.getHash();return t.destroy(),e}}},getAddImpedimentUrl:function(t){return this.getApplicationPath()+"/Project/Tracking/Impediment/Edit.aspx?AssignableID="+t},getAddTimeUrl:function(t){return this.getApplicationPath()+"/Project/Tracking/Time/Edit.aspx?AssignableID="+t},getAddTaskForUserStoryUrl:function(t){return this.getApplicationPath()+"/Project/Planning/Task/Edit.aspx?UserStoryID="+t},getAddTaskForRequestUrl:function(t){return this.getApplicationPath()+"/Project/Planning/Task/Edit.aspx?RequestID="+t},getSplitForUserStoryUrl:function(t,e){return this.getApplicationPath()+"/Project/Planning/UserStory/Split.aspx?UserStoryID="+t+"&SplittedStoryID="+e},getAddBugForUserStoryUrl:function(t){return this.getApplicationPath()+"/Project/QA/Bug/Edit.aspx?UserStoryID="+t},getAddBugForRequestUrl:function(t){return this.getApplicationPath()+"/Project/QA/Bug/Edit.aspx?RequestID="+t
},getAddTestCaseForUserStoryUrl:function(t){return this.getApplicationPath()+"/Project/QA/TestCase/Edit.aspx?UserStoryID="+t},getAssignTestCasesForTestPlanUrl:function(t){return this.getApplicationPath()+"/Project/QA/TestPlan/AssignTestCases.aspx?TestPlanID="+t},getAddTestRunForTestPlanUrl:function(t){return this.getApplicationPath()+"/Project/QA/TestPlanRun/Edit.aspx?TestPlanID="+t},getAddUserStoryForRequestUrl:function(t){return this.getApplicationPath()+"/Project/Planning/UserStory/Edit.aspx?RequestID="+t},getAddUserStoryForFeatureUrl:function(t){return this.getApplicationPath()+"/Project/Planning/UserStory/Edit.aspx?FeatureID="+t},getAddUserStoryForIterationUrl:function(t){return this.getApplicationPath()+"/Project/Planning/UserStory/Edit.aspx?IterationID="+t},getAddFeatureForRequestUrl:function(t){return this.getApplicationPath()+"/Project/Planning/Feature/Edit.aspx?RequestID="+t},getAddTestCaseForTestPlanRunUrl:function(t){return this.getApplicationPath()+"/Project/QA/TestPlan/AssignTestCases.aspx?TestPlanID="+t},getAddIterationForReleaseUrl:function(t){return this.getApplicationPath()+"/Project/Planning/Iteration/Edit.aspx?ReleaseID="+t},getBoardPageRelativePath:function(){return"restui/board.aspx"},getPrintUrlRelative:function(t,e){return"RestUI/Print.aspx?acid="+this.getCurrentAcid()+"#"+e.toLowerCase()+"/"+t+"/"+s.PRINT},getNewViewUrl:function(t,e,r){return this.getRelativeBoardPageUrl(e.toLowerCase()+"/"+t,r===!0?void 0:r)},getNewViewUrlWithAction:function(t,e,r,i){return this.getRelativeBoardPageUrl(e.toLowerCase()+"/"+t+"/"+i,r===!0?void 0:r)},getDashboardUrl:function(){return this.getRelativeBoardPageUrl("board/current")},getShortViewUrl:function(t){return this.getApplicationPath()+"/entity/"+t.id},getEditUrl:function(t,r){var i=this.getApplicationPath()+"/",n=r.toLowerCase();return"project"==n?i+="EditProject.aspx?ProjectID="+t:"program"==n?i+="EditProgram.aspx?ProgramID="+t:(i+="Project/",i+=e.indexOf(["bug","testplan","testcase","testplanrun"],n)>-1?"QA/":e.indexOf(["impediment"],n)>-1?"Tracking/":e.indexOf(["request"],n)>-1?"HelpDesk/":"time"===n?"Tracking/":"Planning/",i+=r+"/Edit.aspx?"+r+"ID="+t),i
},getAvatarUrl:function(t,e){return this.getApplicationPath()+"/Avatar.ashx?UserId="+t+"&size="+e},getLogoutUrl:function(){return this.getApplicationPath()+"/login.aspx?logout=true"},getUserUrl:function(t,e){var r="/User/View.aspx?UserID=";return e&&"Requester"==e&&(r="/User/Requester/View.aspx?RequesterID="),[this.getApplicationPath(),r,t].join("")},getRelativeBoardPageUrl:function(t,r){var i=e.clone(this.configurator.getAppStateStore().settings);null==r?r=i:e.isString(r)&&(i.acid=r,r=i);var a=this.getHashBuilder();return a.append({page:t}),a.append(n.extractSharedState(r)),a.build()},getRelativeBoardUrl:function(t,e){return this.getRelativeBoardPageUrl("board/"+t,e)},getRelativeLastBoardUrl:function(t){return this.getRelativeBoardUrl("last",t)},getAdminProcessEdit:function(t){return this.getApplicationPath()+"/Admin/EditProcess.aspx?acid="+this.getCurrentAcid()+"&ProcessID="+t+"&rmnav=1"},getAdminPracticesEdit:function(t){return this.getAdminProcessEdit(t)+"&hideleftmenu=1&nomashups"},getAdminAdminDelegateEdit:function(t){return this.getApplicationPath()+"/Admin/AdminDelegate.aspx?acid="+this.getCurrentAcid()+"&ProcessID="+t+"&rmnav=1&hideleftmenu=1&nomashups"},getAdminCustomFieldsEdit:function(t){return this.getApplicationPath()+"/Admin/CustomFields.aspx?acid="+this.getCurrentAcid()+"&ProcessID="+t+"&rmnav=1&hideleftmenu=1&nomashups"},getAdminWorkflowEdit:function(t){return this.getApplicationPath()+"/Admin/Workflow.aspx?acid="+this.getCurrentAcid()+"&ProcessID="+t+"&rmnav=1&hideleftmenu=1&nomashups"},getProcessSetupPage:function(t,e){return this.getRelativeBoardPageUrl("process-setup/"+t+"/"+e)},getWorkflowSetupPage:function(t,e){return this.getRelativeBoardPageUrl("process-setup/"+t+"/workflows/"+e)},_build:function(t){var e=t.path,i=r.param(t.params);return i&&(e=e+"?"+i),t.hash&&(e=e+"#"+t.hash),e},destroy:function(){this.stateManager.unbind(this)}})});
define([],function(){function n(a){return _.isUndefined(a)||_.isNull(a)?null:(a.checkPractice=m,a.isPracticeAvailable=m,a.getTimeTrackingPolicies=b,a.getEffortPoint=c,a.getTerms=d,a.getCustomFields=e,a.getPractices=f,a.getEdition=h,a.getProject=g,a.getProjectId=l,a.getProcess=i,a.getLoggedUser=j,a.getProcessId=k,a)}var a=function(a,b){var c=null,d=a.processes[0].practices;for(var e=0;e<d.length;e++)d[e].name.toLowerCase()===b.toLowerCase()&&(c=d[e]);return c},b=function(){var b=a(this.applicationContext,"Time Tracking"),c=!b;return{disableSpentRemain:c}},c=function(b){var c=a(this.applicationContext,"Planning")||{},d=c.effortPoints;b=b||this.entity.entityType.name.toLowerCase();if(b==="task"||b==="request")d="Hour";var e=d.toLowerCase()==="point"?"pt":"h";return{name:d,shortName:e}},d=function(){var a=this.applicationContext;return a&&a.processes&&a.processes.length>0?a.processes[0].terms:[]},e=function(){var a=this.applicationContext;return a&&a.processes&&a.processes.length>0?a.processes[0].customFields:[]},f=function(){var a=this.applicationContext;return a&&a.processes&&a.processes.length>0?a.processes[0].practices:[]},g=function(){var a=this.applicationContext;return a&&a.selectedProjects&&a.selectedProjects.length>0?a.selectedProjects[0]:null},h=function(){var a=this.applicationContext;return a&&a.edition?a.edition:null},i=function(){var a=this.applicationContext;return a&&a.processes&&a.processes.length>0?a.processes[0]:null},j=function(){var a=this.applicationContext;return a&&a.loggedUser?a.loggedUser:null},k=function(){var a=this.applicationContext,b=this.getProcess();return b?b.id:null},l=function(){var a=this.applicationContext,b=this.getProject();return b?b.id:null},m=function(b){return null!==a(this.applicationContext,b)};return n})
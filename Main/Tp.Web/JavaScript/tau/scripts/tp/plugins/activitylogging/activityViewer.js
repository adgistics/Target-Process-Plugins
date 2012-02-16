define(["tp/plugins/activityLogging/activityTemplate","tp/plugins/activityLogging/activityRepository","tp/plugins/profileNameSource","libs/jquery/jquery","libs/jquery/jquery"],function(a,b,c,d){function e(a){this._create(a)}return e.prototype={activityTemplate:null,recordTemplate:null,placeHolder:null,errorMessageContainer:null,interval:1e4,requestInProgress:!1,capacity:5e3,intervalId:null,activityType:{All:0,Errors:10},filter:{DateRange:{StartDate:null,EndDate:null},Type:0},rendered:!1,_create:function(d){this.placeHolder=d.placeHolder,this.repository=new b,this.activityTemplate=a.activityTemplate,this.recordTemplate=a.recordTemplate,this.controlTemplate=a.controlTemplate,this.profileNameSource=c},render:function(){if(!this._isEditMode())return;this.rendered||(this.renderLogContainer(),this._initializeFilter()),this.renderActivityLog()},renderLogContainer:function(){var a=d.tmpl(this.activityTemplate,{});a.find("#linkMoreActivity").click(d.proxy(this._showMore,this)),a.find("#linkShowErrors").click(d.proxy(this._showErrors,this)),a.find("#linkShowAll").click(d.proxy(this._showAll,this)),a.find("#linkClear").click(d.proxy(this._clearActivityLog,this)),a.appendTo(this.placeHolder.find(".controls-widgets"));var b=d(this.controlTemplate);b.find(".hideLog, .showLog").click(function(c){c.preventDefault(),b.find(".hideLog").toggle(),b.find(".showLog").toggle(),a.slideToggle("fast")}),b.appendTo(this.placeHolder.find(".additional-controls")),this.intervalId||(this.intervalId=window.setInterval(d.proxy(this._getLatestActivityLog,this),this.interval)),d(".collapsable-activity").live("click",this._toggle),this.rendered=!0},renderActivityLog:function(){this.filter.Type===this.activityType.Errors?this._showErrors():this._showAll()},_initializeFilter:function(){var a=(new Tp.URL(location.href)).getArgumentValue("Type"),b=this._getActivityType(a);typeof b!="undefined"&&b!==null&&(this.filter.Type=b)},_getLatestActivityLog:function(){if(!this.requestInProgress){var a={DateRange:{StartDate:this.filter.DateRange.StartDate},Type:this.filter.Type};this._getActivityLog(a,this._onGetLatestActivityLogSuccess)}},_getActivityLog:function(a,b){this.requestInProgress=!0,this.repository.getActivityLog(this.profileNameSource.getProfileName(),a,d.proxy(function(a){this.requestInProgress=!1,this.placeHolder.find(".lastSyncDate").text((new Date).toString("HH:mm:ss")).parent().show(),d.proxy(b,this)(a)},this),d.proxy(function(a){this.requestInProgress=!1,d.proxy(this._processError,this)(a)},this))},_showMore:function(){this._getPreloader().show();var a={DateRange:{EndDate:this.filter.DateRange.EndDate},Type:this.filter.Type};this._getActivityLog(a,this._onGetActivityLogSuccess())},_showErrors:function(){var a={DateRange:{EndDate:null},Type:this.activityType.Errors};this._changeActivityType(a,d.proxy(function(){this.placeHolder.find("#linkShowAll").show(),this.placeHolder.find("#linkShowErrors").hide(),this.placeHolder.find("div.log").html(""),this.filter.DateRange.StartDate=null,this.filter.DateRange.EndDate=null,this.filter.Type=this.activityType.Errors},this))},_showAll:function(){var a={DateRange:{EndDate:null},Type:this.activityType.All};this._changeActivityType(a,d.proxy(function(){this.placeHolder.find("#linkShowAll").hide(),this.placeHolder.find("#linkShowErrors").show(),this.placeHolder.find("div.log").html(""),this.filter.DateRange.StartDate=null,this.filter.DateRange.EndDate=null,this.filter.Type=this.activityType.All},this))},_changeActivityType:function(a,b){this._getPreloader().show(),this._getActivityLog(a,this._onGetActivityLogSuccess(b))},_clearActivityLog:function(){this._getPreloader().show();var a={Type:this.filter.Type};this.repository.clearActivityLog(this.profileNameSource.getProfileName(),a,d.proxy(this._onClearActivityLogSuccess,this),d.proxy(this._processError,this))},_onGetActivityLogSuccess:function(a){return function(b){this._getPreloader().hide(),a&&a();if(!b.Records||!b.Records.length||b.Type!==this.filter.Type){this.placeHolder.find("#linkMoreActivity").hide();return}this.placeHolder.find("#linkMoreActivity").show(),b.Records&&b.Records.length?(this.filter.DateRange.EndDate=b.Records[b.Records.length-1].DateTime,this.filter.DateRange.StartDate===null&&(this.filter.DateRange.StartDate=b.Records[0].DateTime)):this.placeHolder.find("#linkMoreActivity").hide();var c=d.tmpl(this.recordTemplate,b);this.placeHolder.find("div.log").append(c)}},_onGetLatestActivityLogSuccess:function(a){this._getPreloader().hide();if(!a.Records||!a.Records.length||a.Type!==this.filter.Type)return;a.Records&&a.Records.length&&(this.filter.DateRange.StartDate=a.Records[0].DateTime);var b=d.tmpl(this.recordTemplate,a);this.placeHolder.find("div.log").prepend(b),this._rollOverSize()},_rollOverSize:function(){var a=this.placeHolder.find("div.log>div");for(var b=this.capacity;b<a.length;b++)d(a[b]).remove()},_onClearActivityLogSuccess:function(a){this._getPreloader().hide(),this.filter.DateRange.StartDate=null,this.filter.DateRange.EndDate=null,this.placeHolder.find("div.log").html(""),this.placeHolder.find("#linkMoreActivity").hide()},_processError:function(a){this._getPreloader().hide()},_isEditMode:function(){return this.profileNameSource.getProfileName()!=null},_getActivityType:function(a){var b=this.activityType[a];return b!==null?b:this.activityType.All},_getPreloader:function(){return this.placeHolder.find("span.preloader")},_toggle:function(){d(this).toggleClass("collapsed").toggleClass("expanded"),d(this).next().slideToggle("fast")}},e})
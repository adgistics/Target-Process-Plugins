define(["app.path","tp/plugins/activityLogging/activityTemplate","tp/plugins/activityLogging/activityRepository","tp/plugins/profileNameSource","jQuery"],function(t,e,i,r,o){function l(t){this._create(t)}return l.prototype={activityTemplate:null,recordTemplate:null,placeHolder:null,errorMessageContainer:null,interval:1e4,requestInProgress:!1,capacity:5e3,intervalId:null,activityType:{All:0,Errors:10},filter:{DateRange:{StartDate:null,EndDate:null},Type:0},rendered:!1,_create:function(t){this.placeHolder=t.placeHolder,this.repository=new i,this.activityTemplate=e.activityTemplate,this.recordTemplate=e.recordTemplate,this.controlTemplate=e.controlTemplate,this.profileNameSource=r},render:function(){this._isEditMode()&&(this.rendered||(this.renderLogContainer(),this._initializeFilter()),this.renderActivityLog())},renderLogContainer:function(){var t=o.tmpl(this.activityTemplate,{});t.find("#linkMoreActivity").click(o.proxy(this._showMore,this)),t.find("#linkShowErrors").click(o.proxy(this._showErrors,this)),t.find("#linkShowAll").click(o.proxy(this._showAll,this)),t.find("#linkClear").click(o.proxy(this._clearActivityLog,this)),t.appendTo(this.placeHolder.find(".controls-widgets"));var e=o(this.controlTemplate);e.find(".hideLog, .showLog").click(function(i){i.preventDefault(),e.find(".hideLog").toggle(),e.find(".showLog").toggle(),t.slideToggle("fast")}),e.appendTo(this.placeHolder.find(".additional-controls")),this.intervalId||(this.intervalId=window.setInterval(o.proxy(this._getLatestActivityLog,this),this.interval)),t.on("click",".collapsable-activity",this._toggle),this.rendered=!0},renderActivityLog:function(){this.filter.Type===this.activityType.Errors?this._showErrors():this._showAll()},_initializeFilter:function(){var e=new t.tp.URL(location.href).getArgumentValue("Type"),i=this._getActivityType(e);"undefined"!=typeof i&&null!==i&&(this.filter.Type=i)},_getLatestActivityLog:function(){if(!this.requestInProgress){var t={DateRange:{StartDate:this.filter.DateRange.StartDate},Type:this.filter.Type};
this._getActivityLog(t,this._onGetLatestActivityLogSuccess)}},_getActivityLog:function(t,e){this.requestInProgress=!0,this.repository.getActivityLog(this.profileNameSource.getProfileName(),t,o.proxy(function(t){this.requestInProgress=!1,this.placeHolder.find(".lastSyncDate").text((new Date).toString("HH:mm:ss")).parent().show(),o.proxy(e,this)(t)},this),o.proxy(function(t){this.requestInProgress=!1,o.proxy(this._processError,this)(t)},this))},_showMore:function(){this._getPreloader().show();var t={DateRange:{EndDate:this.filter.DateRange.EndDate},Type:this.filter.Type};this._getActivityLog(t,this._onGetActivityLogSuccess())},_showErrors:function(){var t={DateRange:{EndDate:null},Type:this.activityType.Errors};this._changeActivityType(t,o.proxy(function(){this.placeHolder.find("#linkShowAll").show(),this.placeHolder.find("#linkShowErrors").hide(),this.placeHolder.find("div.log").html(""),this.filter.DateRange.StartDate=null,this.filter.DateRange.EndDate=null,this.filter.Type=this.activityType.Errors},this))},_showAll:function(){var t={DateRange:{EndDate:null},Type:this.activityType.All};this._changeActivityType(t,o.proxy(function(){this.placeHolder.find("#linkShowAll").hide(),this.placeHolder.find("#linkShowErrors").show(),this.placeHolder.find("div.log").html(""),this.filter.DateRange.StartDate=null,this.filter.DateRange.EndDate=null,this.filter.Type=this.activityType.All},this))},_changeActivityType:function(t,e){this._getPreloader().show(),this._getActivityLog(t,this._onGetActivityLogSuccess(e))},_clearActivityLog:function(){this._getPreloader().show();var t={Type:this.filter.Type};this.repository.clearActivityLog(this.profileNameSource.getProfileName(),t,o.proxy(this._onClearActivityLogSuccess,this),o.proxy(this._processError,this))},_onGetActivityLogSuccess:function(t){return function(e){if(this._getPreloader().hide(),t&&t(),!e.Records||!e.Records.length||e.Type!==this.filter.Type)return void this.placeHolder.find("#linkMoreActivity").hide();this.placeHolder.find("#linkMoreActivity").show(),e.Records&&e.Records.length?(this.filter.DateRange.EndDate=e.Records[e.Records.length-1].DateTime,null===this.filter.DateRange.StartDate&&(this.filter.DateRange.StartDate=e.Records[0].DateTime)):this.placeHolder.find("#linkMoreActivity").hide();
var i=o.tmpl(this.recordTemplate,e);this.placeHolder.find("div.log").append(i)}},_onGetLatestActivityLogSuccess:function(t){if(this._getPreloader().hide(),t.Records&&t.Records.length&&t.Type===this.filter.Type){t.Records&&t.Records.length&&(this.filter.DateRange.StartDate=t.Records[0].DateTime);var e=o.tmpl(this.recordTemplate,t);this.placeHolder.find("div.log").prepend(e),this._rollOverSize()}},_rollOverSize:function(){for(var t=this.placeHolder.find("div.log>div"),e=this.capacity;e<t.length;e++)o(t[e]).remove()},_onClearActivityLogSuccess:function(){this._getPreloader().hide(),this.filter.DateRange.StartDate=null,this.filter.DateRange.EndDate=null,this.placeHolder.find("div.log").html(""),this.placeHolder.find("#linkMoreActivity").hide()},_processError:function(){this._getPreloader().hide()},_isEditMode:function(){return null!=this.profileNameSource.getProfileName()},_getActivityType:function(t){var e=this.activityType[t];return null!==e?e:this.activityType.All},_getPreloader:function(){return this.placeHolder.find("span.preloader")},_toggle:function(){var t=o(this);t.toggleClass("collapsed").toggleClass("expanded"),t.next().slideToggle("fast")}},l});
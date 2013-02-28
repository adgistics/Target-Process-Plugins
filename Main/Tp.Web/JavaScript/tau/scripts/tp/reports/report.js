define(["jQuery","tp/reports/plot","tp/reports/burndown/summaryPopup"],function($,Plot){function Report(config){this._ctor(config)}return Report.prototype={template:'<div class="burnDownReport _burnDownReport">\n    <span class="tableTitle">Burn Down</span>\n    <div>\n        <div id="report-filter">\n        </div>\n    </div>\n    <div id="report-chart" class="tau-chart-plot">    \n    </div>\n</div>',_ctor:function(config){this.filter=config.filter,this.name=config.name,this.placeholder=$(config.placeholder),this.dataProvider=config.dataProvider,this.plot=new Plot({charts:config.charts,height:config.height,margin:50}),this.contextProvider=config.contextProvider,this.navigator=config.navigator,$(config.charts).on("click",$.proxy(this._chartClick,this))},render:function(){this.contextProvider.onReady($.proxy(function(){var br=$.browser;if(!(!br.msie||br.version.substr(0,1)!="8"&&br.version.substr(0,1)!="7")){this.placeholder.html('<div class="_empty empty chart-filter">This report is not supported in IE8 and older. Please, use IE9+ or any other browser.</div>'),$(this).trigger("rendered");return}this.placeholder.html($.tmpl(this.template,{name:this.name})),$(this).trigger("afterInit"),this.plot.placeholder=this.placeholder.find("#report-chart"),this.filter.initialize({placeholder:this.placeholder.find("#report-filter"),update:$.proxy(this._renderChart,this),dataProvider:this.dataProvider,contextProvider:this.contextProvider})},this))},_renderChart:function(){var loading=!0;loading&&this._showLoader(),this.dataProvider.initialize(this.filter.getData(),$.proxy(function(){loading=!1,this.placeholder.find("#report-chart").removeClass("loader"),this.plot.render(this.dataProvider),$(this).trigger("afterRender")},this))},_showLoader:function(){this.placeholder.find("#report-chart").addClass("loader")},_chartClick:function(e,evtData){var self=this,d=evtData.data,$pointer=evtData.$pointer,$rect=evtData.$rect,termProcessor=this.contextProvider.getTermProcessorForCurrentProject(),navigator=this.navigator;if(d.effort){if($rect.data("summaryPopup")&&$rect.summaryPopup("popup").is(":visible")==1){evtData.origin.stopPropagation();return}this.dataProvider.getDetails(d,function(data){$rect.summaryPopup({alignTo:$pointer,termProcessor:termProcessor,index:i,data:data,show:function(){e.target.fadeOut(evtData.rect)},hide:function(){e.target.fadeIn(evtData.rect)},navigate:function(data){navigator.navigate(data)}}).summaryPopup("show"),$(self).trigger("details.afterRender",[$rect.summaryPopup("popup")])})}}},Report})
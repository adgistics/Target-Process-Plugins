define(["jQuery","tau/ui/behaviour/common/ui.behaviour.progressIndicator","tp/popup"],function($,ProgressIndicator){function DiffPopup(){this._ctor()}return DiffPopup.prototype={placeholder:$(['<div class="_viewDiffPopup viewDiffPopup">','<div class="diffHeader">','<div class="_legend legend">','<span class="lineAdded">line added</span>&nbsp;&nbsp;','<span class="lineUpdated">line changed</span>&nbsp;&nbsp;','<span class="lineDeleted">line deleted</span>',"</div>",'<div class="revisionsContainer">','<div class="revisionContainer right">','<div class="_rightRevision revision"></div>',"</div>",'<div class="revisionContainer left">','<div class="_leftRevision revision"></div>',"</div>","</div>","</div>",'<div class="diffContainer _diffContainer">','<div class="_rightContainer sourceContainer right">',"<pre>",'<div class="_rightPan"></div>',"</pre>","</div>",'<div class="_leftContainer sourceContainer left">',"<pre>",'<div class="_leftPan"></div>',"</pre>","</div>",'<div style="clear:both;"></div>',"</div>",'<div class="scrollers">','<div class="_rightScroller rightScroller right">','<div class="_scrollerInternals scrollerInternals"></div>',"</div>",'<div class="_leftScroller leftScroller left">','<div class="_scrollerInternals scrollerInternals"></div>',"</div>","</div>","</div>"].join("")),lineTemplate:'<div {{if line.Action}}class="line${actions[line.Action]}"{{/if}}>${line.LineNumber}  ${line.Line}</div>',actions:{0:"None",10:"Added",20:"Updated",30:"Deleted"},_ctor:function(){this.emptyText="No data to display";var syncFromLeftToRight=$.proxy(this._getSyncFunction("left","right"),this),syncFromRightToLeft=$.proxy(this._getSyncFunction("right","left"),this),that=this,resizeScrollersHandler=$.proxy(function(){that._processScroller("right"),that._processScroller("left")},this);this.popup=this.placeholder.popup({autoOpen:!1,zIndex:2e4,minWidth:300,open:function(){that._processScroller("right").bind("scroll",syncFromRightToLeft),that._processScroller("left").bind("scroll",syncFromLeftToRight),$(window).bind("resize",resizeScrollersHandler)},close:function(){that.placeholder.find("._rightScroller").unbind("scroll",syncFromRightToLeft),that.placeholder.find("._leftScroller").unbind("scroll",syncFromLeftToRight),$(window).unbind("resize",resizeScrollersHandler)},resize:function(){resizeScrollersHandler()}}),this.placeholder.parent().addClass("vcsDiff")},_getSyncFunction:function(from,to){var that=this;return function(){var scroller=that.placeholder.find("._"+from+"Scroller");that.placeholder.find("._"+to+"Scroller").scrollLeft(scroller.scrollLeft()),that.placeholder.find("._"+to+"Container").scrollLeft(scroller.scrollLeft()),that.placeholder.find("._"+from+"Container").scrollLeft(scroller.scrollLeft())}},_processScroller:function(side){var panWidth=$("._"+side+"Pan").width(),container=this.placeholder.find("._"+side+"Container"),containerWidth=container.width(),scroller=this.placeholder.find("._"+side+"Scroller"),diffContainer=this.placeholder.find("._diffContainer");return container.height()<diffContainer.height()?(container.height(diffContainer.height()),scroller.css("right",0)):(container.css("height","auto"),scroller.css("right","17px")),scroller.find("._scrollerInternals").width(panWidth),scroller.width(containerWidth),containerWidth<panWidth?scroller.show():scroller.hide(),scroller},view:function(thirdPartyRevisionId,data,path){var title="Changed file: "+path,ph=this.placeholder;ph.removeClass("_refreshing"),ProgressIndicator.get(ph).hide(),ph.find("._leftRevision").text("Revision "+data.LeftPanRevisionId),ph.find("._rightRevision").text("Revision "+data.RightPanRevisionId),this._processPan(ph.find("._leftPan").html(""),data.LeftPan),this._processPan(ph.find("._rightPan").html(""),data.RightPan),this.popup.popup("option","title",title),this.popup.popup("open")},loading:function(){this.placeholder.addClass("_refreshing"),ProgressIndicator.get(this.placeholder).show(),this.popup.popup("option","title",""),this.popup.popup("open")},_processPan:function(container,lines){for(var i=0;i<lines.length;i++){var line=lines[i];line.LineNumber=this._normalizeLineNumber(line.LineNumber),line.Line=line.Line.replace(/\t/g,"&#9;")||"&nbsp;",container.append($.tmpl(this.lineTemplate,{line:line,actions:this.actions}))}},_normalizeLineNumber:function(lineNumber){var number=lineNumber;if(number<0)return"     ";var result=new String(number+1);while(result.length<5)result=" "+result;return result}},new DiffPopup})
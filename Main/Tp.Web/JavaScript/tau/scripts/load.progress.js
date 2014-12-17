!function(){var i={animationOptions:{progressbar:{enabled:!0,activityFakeRunWidthOffset:50},logo:{enabled:!0,lineFullRunOpacity:1,linesInGroupDelay:500}},transitionOptions:{overlayFadeoutDuration:500,progressbar:{property:"width",defaultDuration:3e3,shortDuration:500,easing:"ease"}},activities:[{name:"libs",text:"Loading common libraries…"},{name:"all.components",text:"Loading application components…"},{name:"user.mashups",text:"Loading mashups…"},{name:"app.init",text:"Initializing application…"}],init:function(){return this.renderedActivities={},this.els=this._getElements(),this.progressbarSizes=this._getProgressbarSizes(),this.activitiesMap=this._getProcessedActivities(),this},_getElements:function(){var i=document.querySelector(".i-role-tp-load-progress-overlay"),t=i.querySelector(".i-role-load-progress-bar"),e=i.querySelector(".i-role-load-progress-bar-marker"),s=i.querySelector(".tau-load-progress-logo-content__wrap").querySelector("svg"),n=s.querySelectorAll("line"),r=i.querySelector(".i-role-load-activity-text");return{overlay:i,progressBar:t,marker:e,logo:s,logoLines:n,activityText:r}},_getProgressbarSizes:function(){var i=parseInt(getComputedStyle(this.els.progressBar).width,10),t=Math.floor(i/this.activities.length),e={totalWidth:i,activityWidth:t,currentWidth:0};return e},_getProcessedActivities:function(){var i={},t=this.els.logoLines,e=this.activities,s=this._getGroupedLines(t,e);return this.activities.forEach(function(t,e){var n=t.name;t.index=e,t.displayedLinesCount=0,t.lines=s[e],i[n]=t}),i},_getGroupedLines:function(i,t){var e=Math.floor(i.length/t.length),s=Array.prototype.slice.call(i,i.length-e),n=Array.prototype.slice.call(i,0);n.length=n.length-e;for(var r=[],a=0;a<t.length-1;a++){r[a]||(r[a]=[]);for(var o=0;e>o;o++){var h=Math.floor(Math.random()*n.length),l=n.splice(h,1),c=l[0];r[a].push(c)}}return r.push(s),r},_getTransitionStyle:function(i){var t=i.property+" "+i.duration+"ms "+i.easing;return t},activity:function(i){return this._isKnownActivity(i)?(this._setActivityText(this.activitiesMap[i].text),this.animationOptions.logo.enabled&&this._startLogoAnimation(i),this.animationOptions.progressbar.enabled&&this._startProgressbarAnimation(i),this):void 0
},_isKnownActivity:function(i){return!!this.activitiesMap[i]},_startLogoAnimation:function(i){var t=this._getLogoAnimationDelay(i);this._showActivityLines({activityName:i,delay:t})},_startProgressbarAnimation:function(i){var t=this._getProgressbarAnimationDelay(i),e=this.transitionOptions.progressbar.defaultDuration;this._advanceMarker({duration:e,width:this._getNewMarkerWidth({isFakeRun:!0}),delay:t})},_getLogoAnimationDelay:function(i){var t=0,e=this.activitiesMap[i],s=e.index,n=this.activities[s-1];if(n){var r=n.lastDisplayedLineTime||n.activityLinesProcessedTime,a=n.displayedLinesCount,o=this.animationOptions.logo.linesInGroupDelay,h=n.lines.length-a,l=r?Date.now()-r:o,c=l>o?0:l;t=h*o+c}return t},_getProgressbarAnimationDelay:function(){var i=this.isProgressbarFinishingCurrentActivity?this.transitionOptions.progressbar.shortDuration:0;return i},_showActivityLines:function(i){{var t=i.delay||0,e=this.activitiesMap[i.activityName],s=e.lines;this.transitionOptions}e.activityLinesProcessedTime=Date.now(),s.forEach(function(i,s){var n=this.animationOptions.logo.linesInGroupDelay*s;this._showActivityLine({activity:e,line:i,delay:t+n})},this)},_showActivityLine:function(i){var t=i.activity,e=i.line,s=i.delay;setTimeout(function(){t.lastDisplayedLineTime=Date.now(),t.displayedLinesCount++,e.setAttribute("class","")},s)},_getNewMarkerWidth:function(i){var t=i.isFakeRun,e=this.progressbarSizes.activityWidth,s=this.animationOptions.progressbar.activityFakeRunWidthOffset,n=t?e-s:s,r=this.progressbarSizes.currentWidth+n;return r},_advanceMarker:function(i){var t=this._getTransitionStyle({property:this.transitionOptions.progressbar.property,duration:i.duration,easing:this.transitionOptions.progressbar.easing});this.progressbarSizes.currentWidth=i.width,this._updateMarker(this.progressbarSizes.currentWidth,t,i.delay)},_updateMarker:function(i,t,e){setTimeout(function(){this.progressbarSizes.animatedToWidth&&this.progressbarSizes.animatedToWidth>i||(this.els.marker.style.transition=t,this.els.marker.style.width=i+"px",this.progressbarSizes.animatedToWidth=i)
}.bind(this),e)},_setActivityText:function(i){this.els.activityText.innerHTML=i||""},activityEnd:function(i){return this._isKnownActivity(i)?(this._setActivityText(),this.animationOptions.progressbar.enabled&&this._finishProgressbarAnimation(i),this):void 0},_finishProgressbarAnimation:function(){var i=this._getNewMarkerWidth({isFakeRun:!1});this.isProgressbarFinishingCurrentActivity=!0,setTimeout(function(){this.isProgressbarFinishingCurrentActivity=!1}.bind(this),this.transitionOptions.progressbar.shortDuration),this._advanceMarker({duration:this.transitionOptions.progressbar.shortDuration,width:i,delay:0})},remove:function(){this._finishAllAnimations(),$(this.els.overlay).animate({opacity:"0"},this.transitionOptions.overlayFadeoutDuration,function(){i.els.overlay.parentNode.removeChild(i.els.overlay),i.destroy()})},_finishAllAnimations:function(){this._showAllRemainingActivitiesLines()},_showAllRemainingActivitiesLines:function(){this.activities.forEach(function(i){if(i.lines.length!=i.displayedLinesCount){var t=i.lines.slice(i.displayedLinesCount);t.forEach(function(t){this._showActivityLine({line:t,activity:i,delay:0})},this)}},this)},destroy:function(){delete window.tauLoadProgress},_getRandomInt:function(i,t){return Math.floor(Math.random()*(t-i+1))+i}};window.tauLoadProgress=i.init()}();
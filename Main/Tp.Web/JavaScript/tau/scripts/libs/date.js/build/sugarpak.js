!function(){var t=Date,e=t.prototype,n=t.CultureInfo,s=Number.prototype;e._orient=1,e._nth=null,e._is=!1,e._same=!1,e._isSecond=!1,s._dateElement="day",e.next=function(){return this._orient=1,this},t.next=function(){return t.today().next()},e.last=e.prev=e.previous=function(){return this._orient=-1,this},t.last=t.prev=t.previous=function(){return t.today().last()},e.is=function(){return this._is=!0,this},e.same=function(){return this._same=!0,this._isSecond=!1,this},e.today=function(){return this.same().day()},e.weekday=function(){return this._is?(this._is=!1,!this.is().sat()&&!this.is().sun()):!1},e.at=function(e){return"string"==typeof e?t.parse(this.toString("d")+" "+e):this.set(e)},s.fromNow=s.after=function(t){var e={};return e[this._dateElement]=this,(t?t.clone():new Date).add(e)},s.ago=s.before=function(t){var e={};return e[this._dateElement]=-1*this,(t?t.clone():new Date).add(e)};var i,r="sunday monday tuesday wednesday thursday friday saturday".split(/\s/),o="january february march april may june july august september october november december".split(/\s/),u="Millisecond Second Minute Hour Day Week Month Year".split(/\s/),a="Milliseconds Seconds Minutes Hours Date Week Month FullYear".split(/\s/),h="final first second third fourth fifth".split(/\s/);e.toObject=function(){for(var t={},e=0;e<u.length;e++)t[u[e].toLowerCase()]=this["get"+a[e]]();return t},t.fromObject=function(t){return t.week=null,Date.today().set(t)};for(var c=function(e){return function(){if(this._is)return this._is=!1,this.getDay()==e;if(null!==this._nth){this._isSecond&&this.addSeconds(-1*this._orient),this._isSecond=!1;var n=this._nth;this._nth=null;var s=this.clone().moveToLastDayOfMonth();if(this.moveToNthOccurrence(e,n),this>s)throw new RangeError(t.getDayName(e)+" does not occur "+n+" times in the month of "+t.getMonthName(s.getMonth())+" "+s.getFullYear()+".");return this}return this.moveToDayOfWeek(e,this._orient)}},f=function(e){return function(){var s=t.today(),i=e-s.getDay();return 0===e&&1===n.firstDayOfWeek&&0!==s.getDay()&&(i+=7),s.addDays(i)
}},d=0;d<r.length;d++)t[r[d].toUpperCase()]=t[r[d].toUpperCase().substring(0,3)]=d,t[r[d]]=t[r[d].substring(0,3)]=f(d),e[r[d]]=e[r[d].substring(0,3)]=c(d);for(var l=function(t){return function(){return this._is?(this._is=!1,this.getMonth()===t):this.moveToMonth(t,this._orient)}},_=function(e){return function(){return t.today().set({month:e,day:1})}},y=0;y<o.length;y++)t[o[y].toUpperCase()]=t[o[y].toUpperCase().substring(0,3)]=y,t[o[y]]=t[o[y].substring(0,3)]=_(y),e[o[y]]=e[o[y].substring(0,3)]=l(y);for(var m=function(t){return function(){if(this._isSecond)return this._isSecond=!1,this;if(this._same){this._same=this._is=!1;for(var e=this.toObject(),n=(arguments[0]||new Date).toObject(),s="",i=t.toLowerCase(),r=u.length-1;r>-1;r--){if(s=u[r].toLowerCase(),e[s]!=n[s])return!1;if(i==s)break}return!0}return"s"!=t.substring(t.length-1)&&(t+="s"),this["add"+t](this._orient)}},g=function(t){return function(){return this._dateElement=t,this}},p=0;p<u.length;p++)i=u[p].toLowerCase(),e[i]=e[i+"s"]=m(u[p]),s[i]=s[i+"s"]=g(i);e._ss=m("Second");for(var v=function(t){return function(e){return this._same?this._ss(arguments[0]):e||0===e?this.moveToNthOccurrence(e,t):(this._nth=t,2!==t||void 0!==e&&null!==e?this:(this._isSecond=!0,this.addSeconds(this._orient)))}},b=0;b<h.length;b++)e[h[b]]=v(0===b?-1:b)}();
define([],function(){TimeSpan=function(s,t){this.days=0,this.hours=0,this.minutes=0,this.seconds=0,this.milliseconds=0;var e=0>s?-1:1;return this.milliseconds=Math.abs(s),t=t||Math.floor,this.days=t(this.milliseconds/864e5)*e,this.milliseconds=this.milliseconds%864e5,this.hours=t(this.milliseconds/36e5)*e,this.milliseconds=this.milliseconds%36e5,this.minutes=t(this.milliseconds/6e4)*e,this.milliseconds=this.milliseconds%6e4,this.seconds=t(this.milliseconds/1e3)*e,this.milliseconds=this.milliseconds%1e3,this.milliseconds=this.milliseconds*e,this},TimeSpan.prototype.compare=function(s){var t,e=new Date(1970,1,1,this.hours(),this.minutes(),this.seconds());return t=null===s?new Date(1970,1,1,0,0,0):new Date(1970,1,1,s.hours(),s.minutes(),s.seconds()),e>t?1:t>e?-1:0},TimeSpan.prototype.add=function(s){return null===s?this:this.addSeconds(s.getTotalMilliseconds()/1e3)},TimeSpan.prototype.subtract=function(s){return null===s?this:this.addSeconds(-s.getTotalMilliseconds()/1e3)},TimeSpan.prototype.addDays=function(s){return new TimeSpan(this.getTotalMilliseconds()+24*s*60*60*1e3)},TimeSpan.prototype.addHours=function(s){return new TimeSpan(this.getTotalMilliseconds()+60*s*60*1e3)},TimeSpan.prototype.addMinutes=function(s){return new TimeSpan(this.getTotalMilliseconds()+60*s*1e3)},TimeSpan.prototype.addSeconds=function(s){return new TimeSpan(this.getTotalMilliseconds()+1e3*s)},TimeSpan.prototype.addMilliseconds=function(s){return new TimeSpan(this.getTotalMilliseconds()+s)},TimeSpan.prototype.getTotalMilliseconds=function(){return 864e5*this.days()+36e5*this.hours()+6e4*this.minutes()+1e3*this.seconds()},TimeSpan.prototype.get12HourHour=function(){return(h=this.hours()%12)?h:12},TimeSpan.prototype.getDesignator=function(){return this.hours()<12?Date.CultureInfo.amDesignator:Date.CultureInfo.pmDesignator},TimeSpan.prototype.toString=function(s){function t(s){return s.toString().length<2?"0"+s:s}var e=this;return s?s.replace(/d|dd|HH|H|hh|h|mm|m|ss|s|tt|t/g,function(s){switch(s){case"d":return e.days();
case"dd":return t(e.days());case"H":return e.hours();case"HH":return t(e.hours());case"h":return e.get12HourHour();case"hh":return t(e.get12HourHour());case"m":return e.minutes();case"mm":return t(e.minutes());case"s":return e.seconds();case"ss":return t(e.seconds());case"t":return(this.hours()<12?Date.CultureInfo.amDesignator:Date.CultureInfo.pmDesignator).substring(0,1);case"tt":return this.hours()<12?Date.CultureInfo.amDesignator:Date.CultureInfo.pmDesignator}}):this._toString()};var s=function(s,t,e){this.years=0,this.months=0,this.days=0,this.hours=0,this.minutes=0,this.seconds=0,this.milliseconds=0;var i=s.clone(),n=t.clone(),o=i.clone(),r=i>n?-1:1;if(this.years=n.getFullYear()-i.getFullYear(),o.addYears(this.years),1==r?o>n&&0!==this.years&&this.years--:n>o&&0!==this.years&&this.years++,i.addYears(this.years),1==r)for(;n>i&&i.clone().addDays(i.getDaysInMonth())<=n;)i.addMonths(1),this.months++;else for(;i>n&&i.clone().addDays(-i.getDaysInMonth())>=n;)i.addMonths(-1),this.months--;var a=n-i;if(0!==a){var h=new TimeSpan(a,e);this.days=h.days,this.hours=h.hours,this.minutes=h.minutes,this.seconds=h.seconds,this.milliseconds=h.milliseconds}return this.months>=1&&this.months<11&&this.days>14&&(this.months+=1),this.years>=1&&this.months>5&&(this.years+=1),this};return{TimePeriod:s,TimeSpan:TimeSpan}});
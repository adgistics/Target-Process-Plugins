define(["libs/jstat/jstat"],function(jStat){jStat.extend({medsumsqerr:function(arr){var mean=jStat.median(arr),sum=0,i=arr.length,tmp;while(--i>=0)tmp=arr[i]-mean,sum+=tmp*tmp;return sum},medsqerr:function(arr){return jStat.medsumsqerr(arr)/arr.length}});var isFunction=jStat.utils.isFunction;return function(funcs){for(var i=0;i<funcs.length;i++)(function(passfunc){jStat.fn[passfunc]=function(fullbool,func){var arr=[],i=0,tmpthis=this;isFunction(fullbool)&&(func=fullbool,fullbool=!1);if(func)return setTimeout(function(){func.call(tmpthis,jStat.fn[passfunc].call(tmpthis,fullbool))},15),this;if(this.length>1){tmpthis=fullbool===!0?this:this.transpose();for(;i<tmpthis.length;i++)arr[i]=jStat[passfunc](tmpthis[i]);return fullbool===!0?jStat[passfunc](jStat.utils.toVector(arr)):arr}return jStat[passfunc](this[0],fullbool)}})(funcs[i])}("medsumsqerr medsqerr".split(" ")),jStat})
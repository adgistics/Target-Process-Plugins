define(["Underscore","jQuery","tau/core/class"],function(n,t,i){var o=i.extend({init:function(t){this.config=n.defaults(t,{window:window})},_parseUrl:function(n){n&&"#"==n[0]&&(n=n.slice(1));var t=n;try{t=decodeURIComponent(t)}catch(i){}var o={url:t.split("||")[0],source:"#"+n};return o},setUrl:function(n){this.config.window.location.hash=n},getUrl:function(){return this._parseUrl(this.config.window.location.hash)}});return o});
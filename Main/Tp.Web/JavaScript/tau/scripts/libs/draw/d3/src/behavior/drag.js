d3.behavior.drag=function(){function c(){this.on("mousedown.drag",d).on("touchstart.drag",d)}function d(){function j(){var a=c.parentNode,b=d3.event.changedTouches;return b?d3.touches(a,b)[0]:d3.mouse(a)}function k(){if(!c.parentNode)return l();var a=j(),b=a[0]-g[0],e=a[1]-g[1];h|=b|e,g=a,d3_eventCancel(),d({type:"drag",x:a[0]+f[0],y:a[1]+f[1],dx:b,dy:e})}function l(){d({type:"dragend"}),h&&(d3_eventCancel(),d3.event.target===e&&i.on("click.drag",m,!0)),i.on("mousemove.drag",null).on("touchmove.drag",null).on("mouseup.drag",null).on("touchend.drag",null)}function m(){d3_eventCancel(),i.on("click.drag",null)}var c=this,d=a.of(c,arguments),e=d3.event.target,f,g=j(),h=0,i=d3.select(window).on("mousemove.drag",k).on("touchmove.drag",k).on("mouseup.drag",l,!0).on("touchend.drag",l,!0);b?(f=b.apply(c,arguments),f=[f.x-g[0],f.y-g[1]]):f=[0,0],d({type:"dragstart"})}var a=d3_eventDispatch(c,"drag","dragstart","dragend"),b=null;return c.origin=function(a){return arguments.length?(b=a,c):b},d3.rebind(c,a,"on")}
function d3_ease_clamp(a){return function(b){return b<=0?0:b>=1?1:a(b)}}function d3_ease_reverse(a){return function(b){return 1-a(1-b)}}function d3_ease_reflect(a){return function(b){return.5*(b<.5?a(2*b):2-a(2-2*b))}}function d3_ease_identity(a){return a}function d3_ease_poly(a){return function(b){return Math.pow(b,a)}}function d3_ease_sin(a){return 1-Math.cos(a*Math.PI/2)}function d3_ease_exp(a){return Math.pow(2,10*(a-1))}function d3_ease_circle(a){return 1-Math.sqrt(1-a*a)}function d3_ease_elastic(a,b){var c;return arguments.length<2&&(b=.45),arguments.length<1?(a=1,c=b/4):c=b/(2*Math.PI)*Math.asin(1/a),function(d){return 1+a*Math.pow(2,10*-d)*Math.sin((d-c)*2*Math.PI/b)}}function d3_ease_back(a){return a||(a=1.70158),function(b){return b*b*((a+1)*b-a)}}function d3_ease_bounce(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375}var d3_ease_quad=d3_ease_poly(2),d3_ease_cubic=d3_ease_poly(3),d3_ease_default=function(){return d3_ease_identity},d3_ease=d3.map({linear:d3_ease_default,poly:d3_ease_poly,quad:function(){return d3_ease_quad},cubic:function(){return d3_ease_cubic},sin:function(){return d3_ease_sin},exp:function(){return d3_ease_exp},circle:function(){return d3_ease_circle},elastic:d3_ease_elastic,back:d3_ease_back,bounce:function(){return d3_ease_bounce}}),d3_ease_mode=d3.map({"in":d3_ease_identity,out:d3_ease_reverse,"in-out":d3_ease_reflect,"out-in":function(a){return d3_ease_reflect(d3_ease_reverse(a))}});d3.ease=function(a){var b=a.indexOf("-"),c=b>=0?a.substring(0,b):a,d=b>=0?a.substring(b+1):"in";return c=d3_ease.get(c)||d3_ease_default,d=d3_ease_mode.get(d)||d3_ease_identity,d3_ease_clamp(d(c.apply(null,Array.prototype.slice.call(arguments,1))))}
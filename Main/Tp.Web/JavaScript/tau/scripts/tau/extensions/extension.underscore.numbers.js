define(["libs/underscore"],function(a){"use strict";var r={parseFloatLocal:function(r,e){return parseFloat(a.asString(r).replace(e.decimalSeparator,"."))},outFloatLocal:function(r,e){return a.asString(r).replace(".",e.decimalSeparator)}};a.mixin(r)});
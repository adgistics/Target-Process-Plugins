define(["Underscore","tau/core/component-base","./extensions/extension.tracking.board.statistics","./extensions/extension.tracking.application.context","./extensions/extension.tracking.board.actions","./extensions/extension.tracking.clicks","./extensions/extension.tracking.user.host","./extensions/extension.tracking.store.v2","./extensions/extension.tracking.rest","./extensions/extension.tracking.browser.actions"],function(e,n,t,s,i,o,c,a,r,x){return{create:function(p){var u=e.compact([{type:t},{type:o},{type:c},{type:s},{type:i},{type:a},{type:r},{type:x}]),g={name:"tracking component","queue.bus":!0},k=new n(e.extend(g,p||{}));return e.each(u,function(e){k.attach(e.type,e.config)}),k.bus}}});
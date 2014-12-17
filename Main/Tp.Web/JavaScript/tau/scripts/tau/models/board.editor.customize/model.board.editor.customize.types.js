define(["Underscore","jQuery","tau/core/extension.base"],function(e,t,i){var n=i.extend({"bus beforeInit + boardSettings.ready:last":function(t,i,n){var r=n.boardSettings,s=i.config.context.configurator,a=e.bind(function(){this.fire("refresh")},this);r.unbind({listener:this});var c=["cells","y","x"];r.bind({fields:c,listener:this,callback:a});var d=function(e){return e&&e.types||[]};r.get({fields:c,callback:e.bind(function(t){this.getEmptySpace(s).done(e.bind(function(e){var i={cells:d(t.cells),x:d(t.x),y:d(t.y)};this.fire("dataBind",this.getViewModel(i,e,s.getUnitsRegistry().units))},this))},this)}),s.acidStore.unbind({listener:this}),s.acidStore.bind({fields:["acid"],listener:this,callback:a})},"bus beforeInit:last + boardSettings.ready:last + destroy":function(e,t,i){i.boardSettings.unbind({listener:this}),t.config.context.configurator.acidStore.unbind({listener:this})},getEmptySpace:function(i){var n=t.Deferred();return i.acidStore.get({fields:["acid"],callback:e.bind(function(t){var r={global:{acid:t.acid}};i.getSliceFactory().create({definition:r}).space().then(e.bind(function(e){return this.emptySpace={cells:e.data.cells.items,axes:e.data.axes.items},this.emptySpace},this)).done(function(e){n.resolve(e)})},this)}),n},getViewModel:function(t,i,n){function r(t,i){return e.chain(t).filter(function(t){return e.contains(i,t.id)}).map(function(e,t){return{id:e.id,name:e.name,"default":!t}}).value()}var s=function(t,i){return e.reduce(t,function(t,n){return t&&e.find(i,function(t){return e.contains(t.types,n.id)})},!0)},a=r(i.cells,t.cells),c=r(i.axes,t.y),d=r(i.axes,t.x),l={cells:!0};return d.isDisabled=!s(d,n),c.isDisabled=!s(c,n),{cells:a,y:c,x:d,defaultChecked:l}}});return n});
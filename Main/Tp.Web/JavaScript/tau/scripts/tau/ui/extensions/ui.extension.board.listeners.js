define(["jQuery","tau/core/extension.base"],function(e,n){return n.extend({init:function(e){this._super(e),this.configurator=e.context.configurator,this.configurator.registerService("currentBoard",{$element:null})},"bus childComponentCreated":function(e,n){"board.plus.container"===n.name&&(n.on("childComponentCreated",function(e){e.data.on("model.sliceInfo.retrieved",function(e,n){this.configurator.service("currentBoard").sliceInfo=n},this)},this),n.on("afterRender",function(e){this.configurator.service("currentBoard").$element=e.data.element},this))}})});
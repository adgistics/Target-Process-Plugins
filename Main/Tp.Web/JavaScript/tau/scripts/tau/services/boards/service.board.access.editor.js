define(["require","tau/core/class","tau/components/component.board.editor.access"],function(e){var t=e("tau/core/class"),o=e("tau/components/component.board.editor.access");return t.extend({componentConfig:{type:"board.editor.access",visible:!1,layout:"replaceable",label:"access_popup",selector:".i-role-access-popup"},init:function(e){this._configurator=e},show:function(e,t,n,a){var i=o.create(this.componentConfig,!0);i.on("afterRender",function(e,t){var o=$('<div class="tau-access-settings-buttons-block"><button class="tau-btn tau-settings-close">Done</button></div>');o.on("click",function(){n.tauPopup("hide")}),o.appendTo($(t.element)),n.tauPopup({className:"ui-access-popup i-role-access-popup",hideOnEscape:!0}),n.tauPopup("setContent",t.element),i.fire("show"),n.tauPopup("show"),n.on("taupopuphide",function(){i.fire("destroy")})}),i.fire("initialize",{context:{configurator:this._configurator,viewMenuId:e,viewMenuType:t}}),i.fire("boardSettings.ready",{boardSettings:a}),i.fire("elementInsertedToContainer")}})});
define(["tau/components/component.creator","tau/ui/extensions/tp-settings/ui.extension.tp-settings","tau/components/extensions/bubble/extension.bubble.creator","tau/components/extensions/component.creator.extension"],function(e,t,n,s){return{create:function(i){var o={name:"board.tp-settings",engine:"jqote2",markup:['<div class="tau-menu-item tau-menu-item-settings">','    <a class="tau-icon-settings i-role-settings"></a>',"</div>"]},a={template:o,extensions:[t,n,s]},u=e.create(a,i);return u.fire("dataBind",{}),u}}});
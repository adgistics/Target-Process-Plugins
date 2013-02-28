define(["jQuery","tau/components/extensions/component.extension.base","tau/ui/extensions/board.plus/ui.board.plus.utils","Underscore"],function($,ExtensionBase,boardUtils,_){return ExtensionBase.extend({"bus boardSettings.ready:last + afterRender":function(evt){var boardSettings=_.values(evt)[0].data.boardSettings,$el=_.values(evt)[1].data.element,$focusAction=$el.find("[role=action-focus]"),$unfocusAction=$el.find("[role=action-unfocus]"),toggleHighlight=function(btn,highlight){btn.removeClass("tau-btn-active-highlight"),highlight&&btn.addClass("tau-btn-active-highlight")},cb=function(){boardSettings.get({fields:["focus","selectedMarks"],callback:function(res){var selected=_.defaults(res.selectedMarks||{},{x:[],y:[]}),hasSelected=!!selected.x.length||!!selected.y.length;$focusAction.prop("disabled",!hasSelected),toggleHighlight($focusAction,hasSelected);var focused=_.defaults(res.focus||{},{x:[],y:[]}),hasFocused=!!focused.x.length||!!focused.y.length;$unfocusAction.prop("disabled",!hasFocused),toggleHighlight($unfocusAction,hasFocused)}})};boardSettings.unbind({listener:this}),boardSettings.bind({fields:["focus","selectedMarks"],skipSilentCallsFiltering:!0,listener:this,callback:cb}),boardSettings.get({fields:["focus","selectedMarks"],callback:cb});var reaction=function(doFocus){boardSettings.get({fields:["focus","selectedMarks"],callback:function(res){var focus=res.focus||{x:[],y:[]},selectedMarks=res.selectedMarks||{x:[],y:[]};doFocus?(selectedMarks.x.length>0&&(focus.x=selectedMarks.x),selectedMarks.y.length>0&&(focus.y=selectedMarks.y)):focus={x:[],y:[]},boardSettings.set({set:{focus:focus,selectedMarks:{x:[],y:[]}}})}})};$focusAction.on("click",function(){var r=reaction(!0);return $(this).blur(),r}),$unfocusAction.on("click",function(){var r=reaction(!1);return $(this).blur(),r})}})})
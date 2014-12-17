define(["jQuery","Underscore","tau/core/extension.base","tau/ui/templates/board.editor/ui.template.board.editor.autocomplete.item"],function(e,t,n,i){function o(e,t){null!=e&&(e.type==t?e.stopImmediatePropagation():o(e.originalEvent,t))}return n.extend({"bus configurator.ready:last + view.dom.ready:last + $form.ready":function(n,a,c,u){var l=u.find(".i-role-filter-control :text"),r=t.bind(this.fire,this);l.on("focus",function(){r("preloading.execute")}),u.delegate(".i-role-clear","click",function(){var t=e(this).parent().find(":text");t.val("")}),l.bind("click keydown keyup",function(){var t=e(this),n=t.val().length>0;t.parent().toggleClass("tau-boardsettings__filter_empty_false",n)}),l.each(function(){var n=e(this);e.ui.ie&&n.bind("keyup",function(){e(this).data("selectionEnd",this.selectionEnd)}),n.bind("keydown",function(t){switch(t.keyCode){case e.ui.keyCode.TAB:e(this).data("ui-autocomplete").menu.active&&t.preventDefault();break;case e.ui.keyCode.SPACE:t.ctrlKey&&(t.preventDefault(),e(this).autocomplete("search"));break;case e.ui.keyCode.ESCAPE:e(this).data("ui-autocomplete").menu.element.is(":visible")&&(e(this).autocomplete("close"),t.preventDefault(),t.stopPropagation())}}).bind("clear",function(){e(this).autocomplete("close")}).autocomplete({minLength:0,position:{my:"left top",at:"left bottom",collision:"flip"},source:function(t,n){r("filter.autocomplete.resolve",{$input:e(this.element),request:t,next:n})},change:function(){e(this).trigger("_change")},focus:function(){return!1},select:function(n,i){var a=e(this),c=i.item,u=a.val(),l=c.Source.slice(0,c.Position.Value);l+=c.LangValue;var s=l,d=l.length;return l+=u.slice(a[0].selectionEnd>0?a[0].selectionEnd:a.data("selectionEnd")||0),a.val(l),a[0].focus(),a[0].setSelectionRange(d,d),a.data("selectionEnd",d),t.contains(["ObjectAttribute","ObjectsCollectionAttribute","Method"],c.SuggestionType)&&setTimeout(function(){a.autocomplete("search",s)},100),r("filter.autocomplete.preload",{value:l,$input:a}),n.stopPropagation(),o(n,"keydown"),!1
}});var c=a.getTemplateFactory().get(i.name),u=n.data("ui-autocomplete");u._change=function(e){this._trigger("change",e,{item:this.selectedItem})},u._renderItem=function(e,t){return c.bind({},t).data("ui-autocomplete-item",t).appendTo(e)},u._renderMenu=function(t,n){e(t).addClass("tau-autocomplete__menu drop-down-list").css({maxHeight:.4*e(window).height(),zIndex:this.element.zIndex()+10});var i=this;e.each(n,function(e,n){i._renderItem(t,n)})}})}})});
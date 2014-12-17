define(["Underscore","jQuery","template!tau/ui/templates/board.context.selector/ui.template.board.context.selector.lists.program","template!tau/ui/templates/board.context.selector/ui.template.board.context.selector.program","tau/core/view-base"],function(e,r,t,o,n){var i=n.extend({init:function(e){this._super(e),this.config.template=t},"bus program.saved":function(e,r){this.onProgramSaved(r)},"bus program.removed":function(e,r){this.onProgramRemoved(r)},onProgramRemoved:function(e){var r=this._$programById(e.id);r.replaceWith(r.find(".i-role-item")),r.remove()},onProgramSaved:function(e){e.projects.forEach(function(e){r(this.element).find("#content_filter_project_"+e.id).closest("li").remove()},this),this._$programById(e.id).length?this._updateProgram(e):this._addProgram(e)},_$programById:function(e){return r(".i-role-program",this.element).filter(function(){return r(".i-role-select-program :checkbox",this).val()==e})},_$renderProgram:function(e){var r=o.render(e);return this._onProgramAdded(r),r},_addProgram:function(t){var o=r(this.element).find(".tau-projects .i-role-list"),n=this._$renderProgram(t).insertAt(o,1).addClass("tau-added");e.delay(function(){n.removeClass("tau-added")},1500),this.element.find(".tau-projects").removeClass("tau-managed-category_isempty_true")},_updateProgram:function(e){this._$programById(e.id).replaceWith(this._$renderProgram(e))},doRender:function(r,t,o){if(o)throw new Error("Template parameter is forbidden in ContextSelectorView.doRender");var n=e.deepClone(r);n.isShowButtonVisible=1<r.projects.length||1<r.teams.length,this._super(n,t,o),this._afterRender()},bindTemplate:function(e,r){return this._rejectComments(this._super(e,r))},_rejectComments:function(e){return e.filter("*")},_afterRender:function(){var e=this.element.find(".tau-projects");e.on("synccheckboxes",function(){e.find(".i-role-program").syncedCheckbox("syncUp")}),this._onProgramAdded(e.find(".i-role-program"))},_onProgramAdded:function(e){e.syncedCheckbox({sourceSelector:".i-role-select-program :checkbox",targetSelector:".i-role-item :checkbox"})
}});return i});
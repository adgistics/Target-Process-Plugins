define(["Underscore","jQuery","tau/ui/extensions/stateList/ui.extension.stateList.editable"],function(a,b,c){var d=c.extend({"bus dataBind+afterRender":function(c){this._super(c);var d=c.afterRender.data.element;this.$el=d,this.field=this.config.data,this._updateSave();var e=d.find("[role=action-save]"),f=this;e.click(function(c){var e=d.find("[role=option].tau-option_selected_true"),g=[];a.forEach(e,function(a){g.push(b(a).tmplItem().data.id)}),f._updateState(g)});var g=d.find("[role=action-cancel]");g.click(function(a){f.fire("close")})},"bus blur":function(){this.bus.fire("close")},onItemSelected:function(a){var c=b(a.target);c.toggleClass("tau-option_selected_true"),this._updateSave()},_updateSave:function(){if(this.field.required==1){var a=this.$el.find("[role=option].tau-option_selected_true"),b=this.$el.find("[role=action-save]");a.length?(b.removeClass("disable"),b.removeAttr("disable")):(b.addClass("disable"),b.attr("disable","disable"))}}});return d})
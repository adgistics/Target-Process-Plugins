define(["Underscore","jQuery","tau/components/extensions/component.extension.base","tau/extensions/extension.underscore","tau/ui/behaviour/common/ui.behaviour.editableText"],function(a,b,c){return c.extend({category:"edit",$widget:null,fieldData:null,"bus permissionsReady+afterRender":function(a){var b=this,c=a.afterRender.data.data,d=a.permissionsReady.data;if(d.editable){var e=a.afterRender.data.element,f=e.find(".ui-customfield__value");b.$widget=f,f.editableText({mask:"^[0-9]*$",restoreText:!1,onSave:function(a){b.bus.fire("save",{customFields:[{name:c.name,type:c.type,value:a}]})}}),e.behaviourCustomFieldRow({onActivate:function(){f.editableText("activate"),f.focus()}}),e.addClass("ui-customfield_editable_true")}},"bus validate":function(){this.$widget.editableText("resetValidationErrors")},"bus afterValidate":function(a){this.$widget.editableText("setValue",a.data.validation.instance.value)},"bus validationFailed":function(a){this.$widget.editableText("setValidationErrors",a.data.validation.errors[0].description)}})})
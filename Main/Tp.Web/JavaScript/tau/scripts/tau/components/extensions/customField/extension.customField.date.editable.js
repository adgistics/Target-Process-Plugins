define(["Underscore","jQuery","tau/components/extensions/component.extension.base","tau/utils/utils.date","tau/ui/behaviour/date/ui.behaviour.dateEditor","tau/ui/behaviour/customField/ui.behaviour.customField.row"],function(_,$,Class,dateUtils){return Class.extend({category:"edit","bus permissionsReady+afterRender":function(eventData){var self=this,fieldData=eventData.afterRender.data.data,permissions=eventData.permissionsReady.data;if(permissions.editable){var $row=eventData.afterRender.data.element,$widget=$row.find(".ui-customfield__value");$widget.addClass("editableText"),this.$widget=$widget,$.datepicker.parseDate=function(format,value,settings){return dateUtils.parse(value)},$.datepicker.formatDate=function(format,date,settings){return dateUtils.formatAs(date,format)};var dateFormat=dateUtils.getFormatData().date.short;$widget.dateEditor({dateFormat:dateFormat,keyboardManager:this.config.context.configurator.getKeyBoardManager(),onSave:function(date){self.bus.fire("save",{customFields:[{name:fieldData.name,type:fieldData.type,value:date}]})}}),$row.behaviourCustomFieldRow({onActivate:function(){$widget.dateEditor("activate"),$widget.focus()}}),$row.addClass("ui-customfield_editable_true")}},"bus validate":function(){this.$widget.dateEditor("resetValidationErrors")},"bus afterValidate":function(evt){this.$widget.dateEditor("setValue",evt.data.validation.instance.value)},"bus validationFailed":function(evt){this.$widget.dateEditor("setValidationErrors",evt.data.validation.errors[0].description)}})})
define(["./ui.extension.customField.editable"],function(ExtensionBase){var extension=ExtensionBase.extend({"bus preRefreshRow + allow.close.editor":function(evt){this._markElementAsUpdate()},"bus preRefreshRow":function(evt){},"bus allow.close.editor > afterSave":function(evt){this._refreshElement()},"bus refreshRow":function(evt){}});return extension})
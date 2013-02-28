define(["Underscore","jQuery","tau/components/extensions/component.extension.base","tau/ui/behaviour/common/ui.behaviour.richeditor"],function(_,$,ExtensionBase){return ExtensionBase.extend({category:"edit",init:function(){this._super.apply(this,arguments),this.fire("editMode",!1)},"bus afterRender + prepareChanges + allow.close.editor":function(e,afterRender){this.fire("markElementToBeUpdated",{element:afterRender.element})},"bus editMode:last + applyChanges":function(e,editMode){var self=this;if(editMode)return;this.bus.on("afterRender",function(e){var $element=e.data.element;e.removeListener(),self.fire("updateElement",{element:$element})}),self.fire("refresh")},"bus changeText":function(evt){var self=this,saveData={};saveData[self.config.fieldName]=evt.data,self.fire("save",saveData)},"bus permissionsReady+afterRender":function(e,permissions,afterRender){var self=this,$element=afterRender.element;if(permissions.editable){var flagSavedByAutoSave=!1,flagBeforeSaveIsCalled=!1,editableTitle=$element.find(".ui-description__inner").richeditor({text:$element.tmplItem().data.html,placeholder:{text:"Double-click to add description...",className:"ui-description__inner_empty_true"},onCreateEditor:function(value){self.fire("editor.ready",value)},onStopEdit:function(value){self.fire("editMode",!1),self.fire("stop.editing",value),flagSavedByAutoSave&&self.fire("refresh")},onStartEdit:function(value){self.fire("editMode",!0),self.fire("start.editing",value)},onSave:function(text){flagBeforeSaveIsCalled||(flagSavedByAutoSave=!0),self.fire("changeText",text)},onBeforeSaveWithClose:function(text){flagBeforeSaveIsCalled=!0,editableTitle.addClass("data-saving"),self.fire("editMode",!1),self.fire("allow.close.editor")},settings:{fitImgWidth:!1,toolbar:[["Cut","Copy","Paste","PasteText","PasteFromWord","-","Bold","Italic","Underline","Strike","-","Subscript","Superscript"],["NumberedList","BulletedList","-","Outdent","Indent"],["JustifyLeft","JustifyCenter","JustifyRight"],["Link","Unlink","Anchor"],["Image","Table","HorizontalRule","SpecialChar"],["Source","Format","Font","FontSize"],["Replace","-","RemoveFormat","TextColor","BGColor","-","Templates"],["Maximize"]],height:this.config.richEditorHeight||450,maxHeight:this.config.richEditorHeight||8e3}});editableTitle.bind("richeditorbeforeapply",function(evt,ui){var toolbar=[],currentWidth=0,width=$element.width(),settings=$(evt.target).richeditor("getSettings");_.each(settings.toolbar,function(items){var additionalValue=items.length*28+20;currentWidth+additionalValue>width&&(currentWidth=0,toolbar.push("/")),toolbar.push(items),currentWidth+=additionalValue}),settings.toolbar=toolbar,$(evt.target).richeditor("setSettings",settings)})}}})})
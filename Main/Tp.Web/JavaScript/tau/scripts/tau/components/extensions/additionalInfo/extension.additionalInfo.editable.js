define(["jQuery","tau/components/extensions/component.extension.base"],function($,ExtensionBase){return ExtensionBase.extend({category:"edit",editableIndexes:null,init:function(){this._super.apply(this,arguments),this.onRowClickProxy=$.proxy(this.onRowClick,this)},"bus beforeComponentsInitialize":function(evtData){this.editableIndexes=[],this.createComponentList(evtData.data),this.attachListeners()},"bus afterRender":function(evtArgs){this.$el=evtArgs.data.element,this.addEditableBehaviour()},"bus refresh":function(){this.clearComponent()},createComponentList:function(data){this.components=[];for(var i=1;i<data.length;i+=2)this.components.push(data[i].component)},addEditableBehaviour:function(){for(var i=0;i<this.editableIndexes.length;i++)this.doEditableRow(this.editableIndexes[i])},attachListeners:function(){var components=this.components;if(components)for(var i=0;i<components.length;i++)components[i].on("permissionsReady",this.onPermissionsReady,this,{index:i})},removeListeners:function(){var components=this.components;if(components)for(var i=0;i<components.length;i++)components[i].removeListener("permissionsReady",this.onPermissionsReady,this)},onRowClick:function(ev){var $target=$(ev.target);if($target.is("a")==1||$target.parent().is("a")==1)return!0;ev.stopPropagation(),ev.data.component.fire("edit")},doEditableRow:function(index){var $row=this.$el.find(" > tbody > tr").eq(index),proxy=this.onRowClickProxy;$row.unbind("click",proxy),$row.bind("click",{component:this.components[index]},proxy),$row.addClass("ui-additionalinfo_editable_true")},onPermissionsReady:function(evtArgs){if(evtArgs.data.editable){var index=evtArgs.listenerData.index;this.$el?this.doEditableRow(index):this.editableIndexes.push(index)}},clearComponent:function(){this.removeListeners(),delete this.components,delete this.editableIndexes,delete this.$el},destroy:function(){this.clearComponent(),this._super()}})})
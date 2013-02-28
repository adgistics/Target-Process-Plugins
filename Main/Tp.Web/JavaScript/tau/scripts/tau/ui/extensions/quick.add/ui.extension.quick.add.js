define(["jQuery","Underscore","tau/core/extension.base.stateful","tau/ui/templates/quick.add/ui.template.quick.add.content","tau/ui/templates/quick.add/ui.template.quick.add.line","tau/ui/behaviour/common/ui.behaviour.editableText"],function($,_,ExtensionBase,templateContent,templateLine){return ExtensionBase.extend({"bus beforeInit":function(){var self=this;self.fire("dataBind",{label:this.config.label,entityType:this.config.entityType})},_attachKeyBoardHandling:function(){var self=this,keyBoardHandler={handleKeyDown:function(){}};this.config.context.configurator.getKeyBoardManager().pushHandler(keyBoardHandler)},_getEntityId:function(){return this.config.context.entity.id},_getEntityType:function(){return this.config.context.entity.entityType.name},"bus close":function(){var self=this;this.config.context.configurator.getKeyBoardManager().popHandler();if(!self.itemsAdded)return;self.config.store.evictProperties(self._getEntityId(),this._getEntityType(),self.config.evictProperties),setTimeout(function(){self.bus.fire(self.config.entityType+".items.added",self.config.context)},1)},_appendAddLine:function($content){var self=this,$existingAddLine=$(".ui-quick-add-new-item",$content);if($existingAddLine.length>0){setTimeout(function(){$existingAddLine.click()},1);return}var $line=templateLine.get().bind({},{entityType:self.config.entityType});$content.find(".quick-add-lines").append($line);var $input=$(".quick-add-input",$line);$input.editableText({restoreText:!0,resetOnBlur:!0,onSave:function(text){if(!text||!_.trim(text))return;text.length>255&&(text=text.substring(0,254)),text=text.replace(/\s+/gi," ");var store=self.config.store;if($input.hasClass("ui-quick-add-saving"))return;$input.removeClass("ui-quick-add-new-item").addClass("ui-quick-add-saving");var $set={name:text};self.config.additionalFieldsSet&&_.extend($set,self.config.additionalFieldsSet),$set[self.config.property]={id:self._getEntityId()};var relation={};relation[self.config.property]=["id"];var fields=["id","name",relation],cmd={$set:$set,fields:fields};$line.data("item-id")&&(cmd.id=$line.data("item-id"));var onStoreSave=function(r){$line.data("item-id",r.data.id),$line.addClass("ui-quick-add-item-saved"),$input.removeClass("ui-quick-add-saving").text(r.data.name),self.itemsAdded=!0;var message=$(".ui-quick-add-item-saved",$content).length+" item(s) saved";$(".ui-quick-add-stats",$content).text(message)},quickAdd=function(project,team){var addRefs=store.config.proxy.types[self.config.entityType].refs;project&&addRefs.project&&(cmd.$set.project={id:project.id}),team&&addRefs.team&&(cmd.$set.team={id:team.id}),self.config.onBeforeAdd&&self.config.onBeforeAdd(cmd),store.save(self.config.entityType,cmd,{success:function(r){onStoreSave(r)}}).done()};$(".ui-quick-add-stats",$content).text("saving...");var refs=store.config.proxy.types[self._getEntityType()].refs,fields=[{project:["id"]}];refs.team&&fields.push({team:["id"]}),store.get(self._getEntityType(),{id:self._getEntityId(),fields:fields},{success:function(r){quickAdd(r.data.project,r.data.team)}}).done(),self._appendAddLine($content)}}),$input.data("textEditor").onEscape=function(event){event.preventDefault(),this._cancelEdit(),this.$element.blur()},setTimeout(function(){$input.click()},1)},"bus displayQuickAdd":function(evt){var data=evt.data,self=this;self.itemsAdded=!1;var $content=data.popup.find(".tau-bubble__inner");if($content.find(".ui-quick-add-content").length==0){var $contentElements=templateContent.get().bind({},{});$content.append($contentElements)}data.api.adjustPosition(),$content.find(".quick-add-lines").html(""),$content.find(".ui-quick-add-stats").text(""),$content.find(".button-box").click(function(){data.api.hide()}),this._appendAddLine($content),self._attachKeyBoardHandling()},"bus afterRender":function(args){var self=this,$element=args.data.element,$addLink=$(".ui-quick-add-link",$element).tauBubble({onPositionConfig:function(c){return c.offset="-20 0",c}});$addLink.bind("show",function(e,data){self.bus.fire("displayQuickAdd",data)}),$addLink.bind("close",function(e,data){data.event&&(data.event.preventDefault(),data.event.stopPropagation()),self.bus.fire("close",data)})}})})
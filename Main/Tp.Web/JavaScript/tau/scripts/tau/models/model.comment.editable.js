define(["Underscore","tau/core/model.editable.base","tau/models/dataprocessor/model.processor.comment"],function(_,ModelBase,CommentProcessor){var EditableCommentModel=ModelBase.extend({name:"Editable Comments","bus applyTo":function(evt){var data=this.bindedData=evt.data.data;this.authorizate(data)},authorizate:function(data){var deleted=this.bindedData.deleted,permissions={editable:!deleted,deletable:!0};this.fire("permissionsReady",permissions)},_convertDTO:function(serverData){var config=this.config,parentCommentId=config.parentCommentId,converter=new CommentProcessor(config.context),commentDTO=converter.convertDTO(_.extend({},serverData));return commentDTO.parentId=parentCommentId,commentDTO},"bus afterInit":function(evtArgs){var self=this,loggedUser=self.config.context.getLoggedUser();this.config=evtArgs.data.config,this.config.store.get("user",{id:loggedUser.id,fields:["id","firstName","lastName","kind","avatarUri"]}).done($.proxy(function(args){var serverData={id:null,description:"",owner:args[0].data},draftComment=self._convertDTO(serverData);self.bindedData=draftComment,self.fire("dataBind",draftComment)},this))},_fireUpdate:function(commentId,$set){var self=this;$set.general={id:self.config.context.entity.id},self.fire("save",{id:commentId,typeName:"comment",$set:$set,$include:["id","description","createDate","parentId",{owner:["id","firstName","lastName","kind","avatarUri"]}]})},"bus saveComment":function(evt){var self=this,$set=evt.data,commentId=this.bindedData.id;self._fireUpdate(commentId,$set)},"bus replyToComment":function(evt){var self=this,$set=evt.data;self._fireUpdate(null,$set)},"bus deleteComment":function(){var comment=this.bindedData,commentId=comment.id;comment.comments&&comment.comments.length>0?this._fireUpdate(commentId,{description:"DELETED"}):this.fire("remove",{id:commentId,typeName:"comment"})}});return EditableCommentModel})
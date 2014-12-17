define(["Underscore","tau/core/model.editable.base","tau/models/dataprocessor/model.processor.comment"],function(e,t,i){var n=t.extend({name:"Editable Comments","bus applyTo":function(e){var t=this.bindedData=e.data.data;this.authorizate(t)},authorizate:function(){var e=this.bindedData.deleted,t={editable:!e,deletable:!0};this.fire("permissionsReady",t)},_convertDTO:function(t){var n=this.config,a=n.parentCommentId,d=new i(n.context.configurator),o=d.convertDTO(e.extend({},t));return o.parentId=a,o},"bus afterInit":function(t,i){this.config=i.config;var n=i.config.context.configurator,a=n.getLoggedUser(),d=n.getStore();d.get("user",{id:a.id,fields:["id","firstName","email","lastName","kind","avatarUri"]}).done(e.bind(function(e){var t={id:null,description:"",owner:e[0].data},i=this._convertDTO(t);this.bindedData=i,this.fire("dataBind",i)},this))},_fireUpdate:function(e,t){e||(t.owner={id:this.config.context.configurator.getLoggedUser().id}),t.general={id:this.config.context.entity.id},this.fire("save",{id:e,typeName:"comment",$set:t,$include:["id","description","createDate","parentId",{owner:["id","firstName","lastName","kind","avatarUri"]}]})},"bus saveComment":function(e){var t=this,i=e.data,n=this.bindedData.id;t._fireUpdate(n,i)},"bus replyToComment":function(e){var t=this,i=e.data;t._fireUpdate(null,i)},"bus deleteComment":function(){var e=this.bindedData,t=e.id;e.comments&&e.comments.length>0?this._fireUpdate(t,{description:"DELETED"}):this.fire("remove",{id:t,typeName:"comment"})}});return n});
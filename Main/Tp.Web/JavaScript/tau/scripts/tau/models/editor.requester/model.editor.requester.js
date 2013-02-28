define(["Underscore","tau/core/model-base","libs/amanda/amanda"],function(_,ModelBase,Validation){var model=ModelBase.extend({"bus afterInit":function(){this.fire("dataBind",{}),this.validation=new Validation({singleError:!1});var store=this.config.store,serverEmailValidator=function(property,value,validator,propertyValidators,callback){if(!validator||!value)return callback();store.find("requester",{$query:{email:value,deleteDate:null}}).done({success:function(results){results[0].data.length==1?callback("uniqueEmail"):callback()}})};this.validation.validators.uniqueEmail=serverEmailValidator,_.extend(this.validation.messages,{required:function(property,propertyValue,validator){var titles={firstName:"First Name",lastName:"Last Name",email:"email"};return"Please enter "+titles[property]},uniqueEmail:"Requester with the same email already exists",format:"Please enter valid {{validator}}"})},"bus form.parametersBound":function(evt){var data=evt.data,store=this.config.store,schema={type:"object",properties:{firstName:{required:!0,type:"string"},lastName:{required:!0,type:"string"},email:{required:!0,type:"string",format:"email",uniqueEmail:!0}}},self=this;this.validation.validate(data.parameters,schema,function(errors){errors?self.fire("form.validationFailed",{errors:errors}):self.fire("form.validationPassed",{data:data.parameters})})},"bus form.validationPassed":function(evt){var data=evt.data.data,store=this.config.store,self=this,entity=this.config.context.entity;store.save("Requester",{$set:{email:data.email,login:data.email,firstName:data.firstName,lastName:data.lastName},fields:["id"]}).done({success:function(results){var generalUser=results[0].data;store.save(entity.entityType.name,{id:entity.id,$set:{requesters:[{id:generalUser.id}]},fields:["id"]}).done({success:function(result){}})}})}});return model})
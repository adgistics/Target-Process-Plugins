define(["Underscore","tau/models/model.customField.editable"],function(_,ModelBase){var model=ModelBase.extend({"bus beforeInit":function(evt){this.store=evt.data.config.store;if(this.config.data){var curValue=this.config.data.value,choices=[];_.map(this.config.data.options,function(item){curValue!==item&&choices.push({id:item,name:item})});var nullableValue=curValue?!this.config.data.required:!1;this.fire("dataBind",{states:choices,nullableValue:nullableValue})}},"bus updateState":function(evt){var val=null;evt.data&&evt.data.id&&(val=evt.data.id);var $set={customFields:[{name:this.config.data.name,type:this.config.data.type,value:val}]};this.fire("save",$set)}});return model})
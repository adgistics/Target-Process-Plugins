define(["Underscore","tau/models/assignment/model.property.assignUser.editable.base"],function(_,EditableBase){return EditableBase.extend({assignTo:function(userId){var cmd={type:this.config.context.entity.entityType.name,$set:{owner:{id:userId}},$include:[{owner:["id","firstName","lastName","email"]}]};this.fire("save",cmd)}})})
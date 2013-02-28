define(["Underscore","tau/components/component.creator","tau/models/model.assignmentsList","tau/models/model.assignmentsList.editable","tau/models/userList/extension.model.unassignAction","tau/models/userList/extension.model.showMore","tau/components/extensions/assignmentsList/extension.assignmentsList.editable","tau/components/extensions/component.creator.extension","tau/components/extensions/bubble/extension.bubble.creator.direct","tau/models/assignment/model.assignment.editable","tau/models/assignment/model.add.assignment.editable","tau/ui/templates/assignmentsList/ui.template.assignmentsList"],function(_,creator,ModelType,ModelEditableType,ModelUnassignAction,ModelShowMore,ExtinsionAssignmentsListEditable,ComponentCreatorExtension,PopupCreatorExtension,ModelUserListEditable,ModelAddAssignmentEditable,template){return{create:function(config){var creatorConfig={extensions:_.concat([ModelType,ComponentCreatorExtension,ModelEditableType,ExtinsionAssignmentsListEditable,{type:PopupCreatorExtension,config:{popupEditorContainer:[{target:".user-list .user",alignTo:".user-name",componentsConfig:{components:[{type:"userList",extensions:[ModelUserListEditable,ModelUnassignAction,ModelShowMore]}]}},{target:".owner-cell .user-name",componentsConfig:{components:[{type:"userList",extensions:[ModelShowMore]}]}},{target:".add-btn:not(.disabled)",targetCssClass:"ui-link",componentsConfig:{components:[{type:"userList",extensions:[ModelAddAssignmentEditable,ModelShowMore]}]}}]}},config.extensions]),template:config.template||template};return creator.create(creatorConfig,config)}}})
define(["Underscore","tau/components/component.collapsible","tau/components/extensions/duplicateBugList/extension.duplicateBugList.visibilityController","tau/models/model.duplicateBugCountCalculator","tau/models/model.duplicateBugRetriever","tau/models/model.extensions","tau/models/assignmentsList/extension.model.store.operations","tau/ui/extensions/ui.extensions.onMarkAsDuplicate","tau/core/termProcessor"],function(_,ComponentCollapsible,VisibilityController,DuplicateBugCountCalculator,DuplicateBugRetriever,modelExtensions,StoreOperations,MarkAsDuplicateRefresher,TermProcessor){return{create:function(config){var tp=new TermProcessor(config.context.getTerms());return config=config||{},_.extend(config,{collapsed:!0,header:[{type:"label",text:tp.getTerms("Bug").name+" Duplicates",quantityCssClass:config.quantityCssClass||"ui-gray-quantity"}],items:[{type:"duplicateBugList"}],extensions:[DuplicateBugRetriever,StoreOperations,MarkAsDuplicateRefresher]}),ComponentCollapsible.create(config)}}})
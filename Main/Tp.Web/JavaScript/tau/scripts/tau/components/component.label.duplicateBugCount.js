define(["Underscore","tau/components/component.label","tau/components/extensions/duplicateBugList/extension.duplicateBugList.count.label.setter","tau/models/model.duplicateBugCountCalculator","tau/models/model.duplicateBugRetriever","tau/models/model.extensions","tau/models/assignmentsList/extension.model.store.operations","tau/core/termProcessor"],function(a,b,c,d,e,f,g,h){return{create:function(f){var i=f.context.applicationContext.processes[0].terms,j=new h(i);return f=f||{},a.extend(f,{text:"Duplicate "+j.getTerms("Bug").names,quantityCssClass:f.quantityCssClass||"ui-gray-quantity",extensions:[c,d,g,e]}),b.create(f)}}})
define(["require","Underscore","tau/components/component.entity.new.list","tau/components/testPlanRun.testRuns/models/model.testPlanRun.testRuns.tree.root","tau/components/testPlanRun.testRuns/extensions/extension.testPlanRun.testRuns.runner","tau/components/board.new.list/models/counts.strategies","tau/components/testHierarchy/extension.testHierarchy.count.change.broadcaster"],function(e){var t=e("Underscore"),n=e("tau/components/component.entity.new.list"),r=e("tau/components/testPlanRun.testRuns/models/model.testPlanRun.testRuns.tree.root"),s=e("tau/components/testPlanRun.testRuns/extensions/extension.testPlanRun.testRuns.runner"),a=e("tau/components/board.new.list/models/counts.strategies"),o=e("tau/components/testHierarchy/extension.testHierarchy.count.change.broadcaster");return{create:function(e){return e=t.extend(e,{entityIdProvider:e.helper.valueOrDefault({enabledIf:{feature:"qa.area.hierarchy"},value:function(e){return e.entityType.name.toLowerCase()+":"+e.id},"default":null}),treeViewEndPoint:"TestPlanRunTestRuns",definition:{cells:{types:e.helper.valueOrDefault({enabledIf:{feature:"qa.area.hierarchy"},value:["testplanrun","testcaserun"],"default":["testcaserun"]})},cardSettings:{list_testcaserun:{list:[[{id:"testitemrun_name",order:0},{id:"tcr_id",order:1},{id:"tcrtpr_last_status",order:2},{id:"bugs",order:3},{id:"entity_assignments",order:4},{id:"tcr_last_executor",order:5},{id:"tcr_run_daterange",order:6},{id:"entity_state",order:7},{id:"business_value_long",order:8},{id:"testcase_id",order:9}]]},list_testplanrun_testcaserun:{list:[[{id:"testitemrun_name",order:0},{id:"general_entity_id",order:1},{id:"tcrtpr_last_status",order:2},{id:"bugs",order:3},{id:"entity_assignments",order:4},{id:"tcr_last_executor",order:5},{id:"tcr_run_daterange",order:6},{id:"entity_state",order:7},{id:"business_value_long",order:8},{id:"testcase_id",order:9}]]}}},listOptions:{disableDetailsViewForTypes:["testplanrun"],TreeRootModel:r,countsStrategy:a.hierarchy}}),e.extensions=(e.extensions||[]).concat([s,o]),n.create(e)
}}});
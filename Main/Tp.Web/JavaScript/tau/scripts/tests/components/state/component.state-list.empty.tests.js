define(["Underscore","tau/components/component.state-list","tests/components/common/common.setup","tests/components/component.specs","tests/common/modelConfig","tests/common/testData"],function(a,b,c,d,e,f){var g=function(){var g=f.getTestDataForState(),h=f.getStatesForProcess(),i=[g,h],j={manualContext:!0,context:e.bug(g.id)};j.context.assignable=g;var k=a.extend(a.clone(g)),l=h.entityStates[4];k.entityState.nextStates=l.nextStates;var m=[{name:"should render valid markup for empty",test:function(){var a=this.$el;equals(a.find(".drop-down-list").text(),"No items found","empty placeholder has text")}}],n=c.create("[component.state.empty]",i,b,{listType:"entityState",emptyDataMessage:"No items found"});i[0].entityState.nextStates=[],i[1].entityStates=[],d.create(n,j).viewShouldPassTests(m).done()};return{run:g}})
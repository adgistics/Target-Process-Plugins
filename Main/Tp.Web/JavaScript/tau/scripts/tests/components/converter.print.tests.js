define(["Underscore","tau/configurations/converters/converter.print"],function(_,converter){var innerRun=function(){module("[converter.print] tests",{setup:function(){this.config={children:[{type:"tabs"},{type:"tabs",tabs:[{type:"description"}]},{type:"tabs",tabs:[{header:[{type:"label",text:"Test tab"}],items:[{type:"description"}]},{printable:!1,header:[{type:"label",text:"Editable components 0"}],items:[{type:"implementationHistory"}]},{header:[{type:"label",text:"Test tab 2"}],items:[{type:"description"}]},{printable:!1,header:[{type:"label",text:"Editable components 1"}],items:[{type:"implementationHistory"}]},{printable:!1,header:[{type:"label",text:"Editable components 2"}],items:[{type:"implementationHistory"}]}]},{type:"collapsible"},{type:"collapsible",items:[]},{type:"collapsible",header:[{type:"label",text:"Test collapsible"}],items:[{type:"description"}]},{type:"label",items:[]}]}},teardown:function(){delete this.config}}),test("should disable extensions",function(){var config=converter.convert(this.config),items=config.children;ok(_.indexOf(items[0].disabledExtensionCategories,"edit")>=0,"edit extensions are disabled")}),test("should convert type tabs to container",function(){var config=converter.convert(this.config),items=config.children,tabs=items[0].children;equals(items[0].type,"container","Tabs type converts to container"),equals(tabs.length,0,"Tab has children"),tabs=items[1].children,equals(tabs.length,1,"Tab has children"),tabs=items[2].children,equals(tabs.length,2,"Tab has children"),equals(tabs[0].children[0].text,"Test tab","Tab header converts to label"),equals(tabs[0].children[1].type,"description","Tab items convert to children")}),test("should convert type collapsible to container",function(){var config=converter.convert(this.config),items=config.children;equals(items[3].type,"container","Collapsible type converts to container"),equals(items[4].children.length,0,"Collapsible type has children"),equals(items[5].children.length,2,"Collapsible type has children"),equals(items[5].children[0].text,"Test collapsible","Collapsible header converts to label")}),test("should save other types",function(){var config=converter.convert(this.config),items=config.children;equals(items[6].type,"label","Save other types")}),test("should exclude components marked with printable=false",function(){var config=converter.convert(this.config),items=config.children,node=items[2];equals(node.children.length,2,"Marked non-printable components are removed");var child1=node.children[0];equals(child1.type,"container","Marked non-printable components are removed"),equals(child1.children.length,2,"Label child component"),equals(child1.children[0].type,"label","expected label component"),equals(child1.children[0].text,"Test tab","expected text"),equals(child1.children[1].type,"description","expected description component");var child2=node.children[1];equals(child2.type,"container","Marked non-printable components are removed"),equals(child2.children.length,2,"Label child component"),equals(child2.children[0].type,"label","expected label component"),equals(child2.children[0].text,"Test tab 2","expected text"),equals(child2.children[1].type,"description","expected description component")})};return{run:innerRun}})
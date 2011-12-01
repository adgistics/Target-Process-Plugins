define(["Underscore","jQuery","tau/core/tau","tau/components/component.tags","tests/common/testData","tests/components/common/common.setup","tests/components/component.specs"],function(a,b,c,d,e,f,g){var h=function(){function m(a){return function(b){b.mockRepository(this);var c=a.length;for(var d=0;d<c;d++){var e=a[d],f=e.command,g=e.stub||this.repository.execute.tauCreateDelegate(this.repository);g._test=this,this.repositoryMock.expects().execute(f).andStub(g)}}}var c=e.tags,h={context:{type:c.__type,id:c.id}},i={tags:["tag1","tag2","tag3"]},j=[Similar.to({name:"get",type:"bug",config:Similar.to({id:c.id,fields:["id","tags"]})})],k=function(a,b){var c=b.children(".ui-tags__editor");c.find("a:first").trigger("click"),c.find(":text").val(a),c.find(".ui-tags__editor__button-submit").trigger("click")},l=function(a){return a.children(".ui-tags__tag")},n=function(a){return m([{command:j},{command:[Similar.to({name:"save",type:"bug",config:Similar.to({id:c.id,$set:Similar.to({tags:a.join(",")})})})],stub:function(a){arguments.callee._test.executeStub&&arguments.callee._test.executeStub(a)}}])},o=[{name:"should render valid markup",test:function(){var a=this.$el,c=a.children(".ui-tags__tag");equal(c.length,i.tags.length,"Elements count is valid");for(var d=0,e=c.length;d<e;d++)equal(b.trim(c.eq(d).find("span:eq(0)").text()),i.tags[d],"Tag test is valid")}},{name:"should render valid markup (for empty tags)",preSetup:function(b){var d=a.clone(c);d.tags="",this.data=d,b.setInitialData({testData:d})},test:function(){var a=this.$el,b=a.children(".ui-tags__tag");equal(b.length,0,"Elements count is valid")}},{name:"should allow to remove tag",preSetup:function(a){n(["tag2","tag3"]).call(this,a)},test:function(){var a=this.$el,b=l(a);b.first().find("[class*=delete]").trigger("click"),b=l(this.$el),equal(b.length,i.tags.length-1,"Tag is deleted")}},{name:"should allow to add tag",preSetup:function(a){n(["tag1","tag2","tag3","porn"]).call(this,a)},test:function(){var a="porn",b=this.$el,c=b.find(".ui-tags__editor");equal(c.length,1,"Have possibility to add tag"),k(a,b);var d=l(b);equal(d.filter(".ui-tags__tag-new").length,1,"New tags have special class"),equal(d.length,i.tags.length+1,"Tag is added"),equal(d.last().find("span").text(),a,"Tag is added")}},{name:"should allow to add tag when list empty",preSetup:function(b){var d=a.clone(c);d.tags="",this.data=d,b.setInitialData({testData:d}),n(["porn"]).call(this,b)},test:function(){var a="porn",b=this.$el,c=b.find(".ui-tags__editor");equal(c.length,1,"Have possibility to add tag"),k(a,b);var d=l(b);equal(d.length,1,"Tag is added"),equal(d.last().find("span").text(),a,"Tag is added")}},{name:"should allow to add several tags by comma and trim them",preSetup:function(a){n(["tag1","tag2","tag3","porn","sex","lesbian"]).call(this,a)},test:function(){var a="porn, sex,  lesbian, ",b=this.$el;k(a,b);var c=l(b);equal(c.filter(".ui-tags__tag-new").length,3,"New tags have special class"),equal(c.length,i.tags.length+3,"Tags is added"),equal(c.last().find("span").text(),"lesbian","Tag is added")}},{name:"should allow to add tags with html and show it as text",preSetup:function(a){n(["tag1","tag2","tag3","<h1>porn</h1>"]).call(this,a)},test:function(){var a="<h1>porn</h1>",b=this.$el;k(a,b);var c=l(b);equal(c.last().find("span").text(),a,"Tag is added")}},{name:"should not duplicate tags",preSetup:function(a){n(["tag1","tag2","tag3"]).call(this,a)},test:function(){var a="tag1, tag2",b=this.$el;k(a,b);var c=l(b);equal(c.filter(".ui-tags__tag-updated").length,2,"Duplicate tags have special class"),equal(c.length,i.tags.length,"Tags are not added")}},{name:"should allow to use key buttons",preSetup:function(a){n(["tag1","tag2","tag3","amateur"]).call(this,a)},test:function(){var a="porn",c=this.$el,d=c.find(".ui-tags__editor");equal(d.length,1,"Have possibility to add tag"),d.find("a:first").trigger("click"),d.find(":text").val(a);var e=b.Event("keydown",{keyCode:27,which:27});d.find(":text").trigger(e);var f=l(c);equal(f.filter(".ui-tags__tag-new").length,0,"Not new tags on esc"),equal(f.length,i.tags.length,"Not new tags on esc"),a="amateur",d.find("a:first").trigger("click"),d.find(":text").val(a),e=b.Event("keydown",{keyCode:13,which:13}),d.find(":text").trigger(e),f=l(c),equal(f.filter(".ui-tags__tag-new").length,1,"New tags on enter"),equal(f.length,i.tags.length+1,"Tag is added"),equal(f.last().find("span").text(),a,"Tag is added")}}],p=f.create("[component.tags]",c,d);g.create(p,h).viewShouldFollowDataComponentLifeCycle().modelShouldReturnData(i,[j]).viewShouldPassTests(o).done()};return{run:h}})
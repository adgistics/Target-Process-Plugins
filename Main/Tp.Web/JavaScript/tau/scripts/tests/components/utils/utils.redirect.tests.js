define(["tau/utils/utils.redirect"],function(Redirect){var currentUrl=null;Redirect.prototype._redirect=function(url){currentUrl=url};var context={entity:{entityType:{name:"bug"},id:15}},innerRun=function(){module("[utils.redirect] tests",{setup:function(){this.mockControl=new MockControl,this.windowMock=this.mockControl.createMock({open:function(){}}),this.redirect=new Redirect(this.windowMock,"/TP")}}),test("should convert relative path",function(){this.redirect.redirect("/FAQ/Page_1",null,context),equals(currentUrl,"/TP/FAQ/Page_1","Redirect to url"),this.redirect.redirect("FAQ/Page_1"),equals(currentUrl,"/TP/FAQ/Page_1","Redirect to url")}),test("should convert hash path",function(){this.redirect.redirect("#preved/medved"),equals(currentUrl,"#preved/medved","Redirect to url with hash")}),test("should convert urls with templates",function(){this.redirect.redirect("http://somewhere.com/App/SubApp/${entity.id}/${entity.entityType.name}",null,context),equals(currentUrl,"http://somewhere.com/App/SubApp/15/bug","Redirect to url")}),test("should be able to open new window",function(){this.windowMock.expects().open("http://google.com","google",TypeOf.isA(String)).andStub(function(){return{location:{}}}),this.redirect.redirect("http://google.com","google"),this.mockControl.verify()})};return{run:innerRun}})
define(["jQuery","tau/components/extensions/component.extension.base"],function($,a){return a.extend({"bus afterRender+boardSettings.ready":function(a){var b=this,c=a.afterRender.data.element,d=a["boardSettings.ready"].data.boardSettings,e=$('<button class="tau-btn">List</button>').click(function(){d.set({set:{viewMode:"list"}})}),f=$('<button class="tau-btn">Board</button>').click(function(){d.set({set:{viewMode:"board"}})}),g=$('<span class="tau-btn-group" style="float:right;margin:0.5em 0;"></span>');g.append(e).append(f),c.find(".tau-board-header").append(g)}})})
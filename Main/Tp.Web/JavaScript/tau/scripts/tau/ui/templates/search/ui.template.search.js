define(["Underscore","jQuery","app.path","tau/core/templates-factory","tau/utils/utils.date"],function(e,t,a,i,s){var n={name:"search",engine:"jqote2",customFunctions:{oldSearchUrl:function(e){return a.get()+"/Search/Search.aspx?SearchString="+e},esc:function(t){return e.escape(t)},generatePagingItems:function(t,a,i){for(var s=[],n=e.max([t-i,0]),r=e.min([t+i,a-1]),d=0;a>d;d++)0===d||d===a-1?s.push({index:d,text:d+1}):d>=n&&r>=d?s.push({index:d,text:d+1}):(d===n-1||d===r+1)&&s.push({index:d,text:"..."});return s},formatDate:function(e){var t=s.getAge(e,new Date),a=t.isZero?"Just added":t.toString(),i=s.format.date.short(s.convertToTimezone(e));return i+" ("+a+")"},highlight:function(e,t){function a(e,t){var i=0;if(e.nodeType==Node.TEXT_NODE){var s=e.data.toUpperCase().indexOf(t);if(s>=0){var n=document.createElement("span");n.className="tau-search-txt";var r=e.splitText(s),d=(r.splitText(t.length),r.cloneNode(!0));n.appendChild(d),r.parentNode.replaceChild(n,r),i=1}}else if(1==e.nodeType&&e.childNodes&&!/(script|style)/i.test(e.tagName))for(var o=0;o<e.childNodes.length;++o)o+=a(e.childNodes[o],t);return i}return e.each(function(){a(this,t.toUpperCase())})},nodeCutOffIterator:function(t,a){if(t){var i=t.textContent.replace(/\s+/g," "),s=i.length,n=[" ","[","]","{","}","(",")","/","\\",",",".",":",";","?","!","&","+","-","*"];if(s>2*a){var r=e.indexOfAnyChar(i,n,a);r=-1===r?a:r;var d=i.substring(0,r),o=s-a,c=e.indexOfAnyChar(i,n,o);c=-1===c?o:c;var l=i.substring(c,s);t.textContent=d+" ... "+l}}return t},iterateTokenThruKeywords:function(t,a){var i={token:a,matches:[]},s=a.toLocaleLowerCase();i.matches=e(t).reduce(function(e,t){var a=t.toLocaleLowerCase(),i=0;do if(i=s.indexOf(a,i),-1!==i){var n=i,r=n+a.length;e.push({a:n,z:r}),i=r}while(-1!==i);return e},i.matches);for(var n=e(i.matches).sortBy(function(e){return e.a}),r=[];n.length;){for(var d=n.shift();n.length&&d.z>=n[0].a;)n[0].z>d.z&&(d.z=n[0].z),n.shift();r.push(d)}return i.matches=r,i},format:function(a,i,s){var n=this;
if(a=t("<div>"+(a||"")+"</div>").text(),a=t.trim(a).replace(/</g,"&lt;").replace(/>/g,"&gt;"),0===a.length)return"";var r,d=a.split(" "),o=e(d).chain().map(e.bind(n.iterateTokenThruKeywords,n,i)).reduce(function(e,t){for(var a=t.token,i=[],s=0,n=0;n<t.matches.length;n++){var r=t.matches[n];i.push(a.substring(s,r.a)),i.push('<span class="tau-search-txt">'),i.push(a.substring(r.a,r.z)),i.push("</span>"),s=r.z}return i.push(a.substring(s)),e.push(i.join("")),e},[]).value(),c=t("<div>"+o.join(" ")+"</div>");if(s){r=t("<div></div>");var l=n.nodeCutOffIterator,u=0,h=0;c.contents().each(function(e,a){var i,s=a.nodeType==Node.TEXT_NODE;if(s)i=l(a,30),h+=i.textContent.length;else{var n=t(a).text();h+=n.length,i=a}h>315?!s&&++u:r.append(i)}),u>0&&r.append('... <strong class="more-matches">+ '+u+" more match"+(u>1?"es":"")+".</strong>")}else r=c;return r.html()}},markup:["<% if (this.error) { %>",'<div class="tau-search-results">','<div class="tau-items">','<div class="tau-search-item tau-search-error">','<div class="tau-search-content">','<div class="tau-body"><%= this.response.responseText %></div>',"</div>","</div>",'<div class="tau-search-item">','<div class="tau-search-content">','<div class="tau-body">',"Something&apos;s wrong with the search. ","Try again or ",'<a class="tau-popup-link" href="<%= fn.oldSearchUrl(this.srcParams.searchString) %>">switch to the old search</a>',"</div>","</div>","</div>","</div>","</div>","<% } else { %>",'<div class="tau-search-results">','<div class="tau-items">',"<% if (this.info.indexProgress < 100) { %>",'<div class="tau-search-item tau-search-notification">','<div class="tau-search-content">','<div class="tau-body">Search results might be incomplete at this point. Indexing is still in progress...</div>',"</div>","</div>","<% } %>","<% var keywords = this.keywords; %>","<% if (this.items.length === 0) { %>",'<div class="tau-search-item">','<div class="tau-search-content">','<div class="tau-body">Nothing found</div>',"</div>","</div>","<% } %>","<% _.forEach(this.items, function(d) { %>","<% var entityType = d.entityType.name.toLowerCase(); %>",'<% var isComment = (entityType === "comment"); %>','<div class="tau-search-item">','<div class="tau-search-content">','<div class="tau-header">','<span class="tau-entity-icon tau-entity-icon--<%= d.entityType.name.toLowerCase() %>"><%= d.entityType.term %></span>',"<% if (isComment) { %>",'<span class="tau-entity-icon tau-entity-icon--<%= d.general.entityType.name.toLowerCase() %>"><%= d.general.entityType.term %></span>','<a href="<%= d.url %>" class="tau-entity-id">#<%= d.general.id %></a>',"<% } else { %>",'<a href="<%= d.url %>" class="tau-entity-id">#<%= d.id %></a>','<span class="tau-entity-filter"><%= fn.format(d.tags.join(" "), keywords, false) %></span>',"<% } %>","</div>",'<div class="tau-body">',"<% if (isComment) { %>",'<h3><a href="<%= d.url %>"><%= fn.esc(d.general.name) %></a></h3>',"<% } else { %>",'<h3><a href="<%= d.url %>"><%= fn.format(fn.esc(d.nameExt), keywords, false) %></a></h3>',"<% } %>","<p><%= fn.format(d.descExt, keywords, true) %></p>","</div>","</div>",'<div class="tau-search-info">',"<% if (d.entityState) { %>",'<div class="tau-line<% if (d.entityState.isFinal) { %> tau-done-entity<% } %>">','<div class="tau-caption">State</div>','<div class="tau-txt"><%= d.entityState.name %></div>',"</div>","<% } %>",'<div class="tau-line">','<div class="tau-caption">Сreated</div>','<div class="tau-txt"><%= fn.formatDate(d.createDate) %></div>',"</div>","<% if (d.project) { %>",'<div class="tau-line">','<div class="tau-caption">Project</div>','<div class="tau-txt"><%= d.project.name %></div>',"</div>","<% } %>","<% if (d.team) { %>",'<div class="tau-line">','<div class="tau-caption">Team</div>','<div class="tau-txt">','<span><%= d.team.name %></span><% if (d.team.icon) { %><i class="tau-icon tau-icon_type_svg tau-icon_name_<%! d.team.icon %>"></i><% } %>',"</div>","</div>","<% } %>","</div>","</div>","<% }); %>","</div>","<% var pagesCount = Math.ceil(this.info.total / this.info.pageSize); %>","<% if (pagesCount > 1) { %>",'<div class="tau-paging i-role-paging-container">','<div class="tau-links">','<a href="" class="tau-prev<% if (this.info.pageNo == 0) { %> tau-disabled<% } %> i-role-paging-prev">Previous <%= this.info.pageSize %></a>','<a href="" class="tau-next<% if (this.info.pageNo == (pagesCount - 1)) { %> tau-disabled<% } %> i-role-paging-next">Next <%= this.info.pageSize %></a>',"</div>",'<ul class="i-role-paging-pageno">',"<% var pagingItems = fn.generatePagingItems(this.info.pageNo, pagesCount, 5); %>","<% for (var i = 0; i < pagingItems.length; i++) { %>","<% var item = pagingItems[i]; %>","<% if (item.index == this.info.pageNo) { %>",'<li class="active"><span><%= item.text %></span></li>',"<% } else { %>",'<li><a href="" data-page="<%= item.index %>"><%= item.text %></a></li>',"<% } %>","<% } %>","</ul>","</div>","<% } %>","</div>","<% } %>"]};
return i.register(n)});
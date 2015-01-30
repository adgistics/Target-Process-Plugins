ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,o=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc.tag",regex:"\\bTODO\\b"},{defaultToken:"comment.doc"}]}};n.inherits(o,r),o.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},o.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=o}),ace.define("ace/mode/jsx_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),r=e("../lib/lang"),o=e("./doc_comment_highlight_rules").DocCommentHighlightRules,i=e("./text_highlight_rules").TextHighlightRules,a=function(){var e=r.arrayToMap("break|do|instanceof|typeof|case|else|new|var|catch|finally|return|void|continue|for|switch|default|while|function|this|if|throw|delete|in|try|class|extends|super|import|from|into|implements|interface|static|mixin|override|abstract|final|number|int|string|boolean|variant|log|assert".split("|")),t=r.arrayToMap("null|true|false|NaN|Infinity|__FILE__|__LINE__|undefined".split("|")),n=r.arrayToMap("debugger|with|const|export|let|private|public|yield|protected|extern|native|as|operator|__fake__|__readonly__".split("|")),i="[a-zA-Z_][a-zA-Z0-9_]*\\b";this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},o.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string.regexp",regex:"[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:["storage.type","text","entity.name.function"],regex:"(function)(\\s+)("+i+")"},{token:function(r){return"this"==r?"variable.language":"function"==r?"storage.type":e.hasOwnProperty(r)||n.hasOwnProperty(r)?"keyword":t.hasOwnProperty(r)?"constant.language":/^_?[A-Z][a-zA-Z0-9_]*$/.test(r)?"language.support.class":"identifier"
},regex:i},{token:"keyword.operator",regex:"!|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({<]"},{token:"paren.rparen",regex:"[\\])}>]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",regex:".+"}]},this.embedRules(o,"doc-",[o.getEndRule("start")])};n.inherits(a,i),t.JsxHighlightRules=a}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){"use strict";var n=e("../range").Range,r=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var r=e.getLine(t),o=r.match(/^(\s*\})/);if(!o)return 0;var i=o[1].length,a=e.findMatchingBracket({row:t,column:i});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new n(t,0,t,i-1),s)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(r.prototype),t.MatchingBraceOutdent=r}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t){"use strict";var n,r=e("../../lib/oop"),o=e("../behaviour").Behaviour,i=e("../../token_iterator").TokenIterator,a=e("../../lib/lang"),s=["text","paren.rparen","punctuation.operator"],u=["text","paren.rparen","punctuation.operator","comment"],c={},l=function(e){var t=-1;return e.multiSelect&&(t=e.selection.id,c.rangeCount!=e.multiSelect.rangeCount&&(c={rangeCount:e.multiSelect.rangeCount})),c[t]?n=c[t]:void(n=c[t]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""})},g=function(){this.add("braces","insertion",function(e,t,r,o,i){var s=r.getCursorPosition(),u=o.doc.getLine(s.row);if("{"==i){l(r);
var c=r.getSelectionRange(),d=o.doc.getTextRange(c);if(""!==d&&"{"!==d&&r.getWrapBehavioursEnabled())return{text:"{"+d+"}",selection:!1};if(g.isSaneInsertion(r,o))return/[\]\}\)]/.test(u[s.column])||r.inMultiSelectMode?(g.recordAutoInsert(r,o,"}"),{text:"{}",selection:[1,1]}):(g.recordMaybeInsert(r,o,"{"),{text:"{",selection:[1,1]})}else if("}"==i){l(r);var h=u.substring(s.column,s.column+1);if("}"==h){var m=o.$findOpeningBracket("}",{column:s.column+1,row:s.row});if(null!==m&&g.isAutoInsertedClosing(s,u,i))return g.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==i||"\r\n"==i){l(r);var f="";g.isMaybeInsertedClosing(s,u)&&(f=a.stringRepeat("}",n.maybeInsertedBrackets),g.clearMaybeInsertedClosing());var h=u.substring(s.column,s.column+1);if("}"===h){var p=o.findMatchingBracket({row:s.row,column:s.column+1},"}");if(!p)return null;var b=this.$getIndent(o.getLine(p.row))}else{if(!f)return void g.clearMaybeInsertedClosing();var b=this.$getIndent(u)}var x=b+o.getTabString();return{text:"\n"+x+"\n"+b+f,selection:[1,x.length,1,x.length]}}g.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,r,o,i){var a=o.doc.getTextRange(i);if(!i.isMultiLine()&&"{"==a){l(r);var s=o.doc.getLine(i.start.row),u=s.substring(i.end.column,i.end.column+1);if("}"==u)return i.end.column++,i;n.maybeInsertedBrackets--}}),this.add("parens","insertion",function(e,t,n,r,o){if("("==o){l(n);var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"("+a+")",selection:!1};if(g.isSaneInsertion(n,r))return g.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(")"==o){l(n);var s=n.getCursorPosition(),u=r.doc.getLine(s.row),c=u.substring(s.column,s.column+1);if(")"==c){var d=r.$findOpeningBracket(")",{column:s.column+1,row:s.row});if(null!==d&&g.isAutoInsertedClosing(s,u,o))return g.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"("==i){l(n);
var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if(")"==s)return o.end.column++,o}}),this.add("brackets","insertion",function(e,t,n,r,o){if("["==o){l(n);var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"["+a+"]",selection:!1};if(g.isSaneInsertion(n,r))return g.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if("]"==o){l(n);var s=n.getCursorPosition(),u=r.doc.getLine(s.row),c=u.substring(s.column,s.column+1);if("]"==c){var d=r.$findOpeningBracket("]",{column:s.column+1,row:s.row});if(null!==d&&g.isAutoInsertedClosing(s,u,o))return g.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"["==i){l(n);var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if("]"==s)return o.end.column++,o}}),this.add("string_dquotes","insertion",function(e,t,n,r,o){if('"'==o||"'"==o){l(n);var i=o,a=n.getSelectionRange(),s=r.doc.getTextRange(a);if(""!==s&&"'"!==s&&'"'!=s&&n.getWrapBehavioursEnabled())return{text:i+s+i,selection:!1};var u=n.getCursorPosition(),c=r.doc.getLine(u.row),d=c.substring(u.column-1,u.column);if("\\"==d)return null;for(var h,m=r.getTokens(a.start.row),f=0,p=-1,b=0;b<m.length&&(h=m[b],"string"==h.type?p=-1:0>p&&(p=h.value.indexOf(i)),!(h.value.length+f>a.start.column));b++)f+=m[b].value.length;if(!h||0>p&&"comment"!==h.type&&("string"!==h.type||a.start.column!==h.value.length+f-1&&h.value.lastIndexOf(i)===h.value.length-1)){if(!g.isSaneInsertion(n,r))return;return{text:i+i,selection:[1,1]}}if(h&&"string"===h.type){var x=c.substring(u.column,u.column+1);if(x==i)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==i||"'"==i)){l(n);var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if(s==i)return o.end.column++,o}})};g.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new i(t,n.row,n.column);
if(!this.$matchTokenType(r.getCurrentToken()||"text",s)){var o=new i(t,n.row,n.column+1);if(!this.$matchTokenType(o.getCurrentToken()||"text",s))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",u)},g.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},g.recordAutoInsert=function(e,t,r){var o=e.getCursorPosition(),i=t.doc.getLine(o.row);this.isAutoInsertedClosing(o,i,n.autoInsertedLineEnd[0])||(n.autoInsertedBrackets=0),n.autoInsertedRow=o.row,n.autoInsertedLineEnd=r+i.substr(o.column),n.autoInsertedBrackets++},g.recordMaybeInsert=function(e,t,r){var o=e.getCursorPosition(),i=t.doc.getLine(o.row);this.isMaybeInsertedClosing(o,i)||(n.maybeInsertedBrackets=0),n.maybeInsertedRow=o.row,n.maybeInsertedLineStart=i.substr(0,o.column)+r,n.maybeInsertedLineEnd=i.substr(o.column),n.maybeInsertedBrackets++},g.isAutoInsertedClosing=function(e,t,r){return n.autoInsertedBrackets>0&&e.row===n.autoInsertedRow&&r===n.autoInsertedLineEnd[0]&&t.substr(e.column)===n.autoInsertedLineEnd},g.isMaybeInsertedClosing=function(e,t){return n.maybeInsertedBrackets>0&&e.row===n.maybeInsertedRow&&t.substr(e.column)===n.maybeInsertedLineEnd&&t.substr(0,e.column)==n.maybeInsertedLineStart},g.popAutoInsertedClosing=function(){n.autoInsertedLineEnd=n.autoInsertedLineEnd.substr(1),n.autoInsertedBrackets--},g.clearMaybeInsertedClosing=function(){n&&(n.maybeInsertedBrackets=0,n.maybeInsertedRow=-1)},r.inherits(g,o),t.CstyleBehaviour=g}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){"use strict";var n=e("../../lib/oop"),r=e("../../range").Range,o=e("./fold_mode").FoldMode,i=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};n.inherits(i,o),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(e,t,n,r){var o=e.getLine(n),i=o.match(this.foldingStartMarker);
if(i){var a=i.index;if(i[1])return this.openingBracketBlock(e,i[1],n,a);var s=e.getCommentFoldRange(n,a+i[0].length,1);return s&&!s.isMultiLine()&&(r?s=this.getSectionRange(e,n):"all"!=t&&(s=null)),s}if("markbegin"!==t){var i=o.match(this.foldingStopMarker);if(i){var a=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],n,a):e.getCommentFoldRange(n,a,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),o=n.search(/\S/),i=t,a=n.length;t+=1;for(var s=t,u=e.getLength();++t<u;){n=e.getLine(t);var c=n.search(/\S/);if(-1!==c){if(o>c)break;var l=this.getFoldWidgetRange(e,"all",t);if(l){if(l.start.row<=i)break;if(l.isMultiLine())t=l.end.row;else if(o==c)break}s=t}}return new r(i,a,s,e.getLine(s).length)}}.call(i.prototype)}),ace.define("ace/mode/jsx",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/jsx_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t){"use strict";function n(){this.HighlightRules=i,this.$outdent=new a,this.$behaviour=new s,this.foldingRules=new u}var r=e("../lib/oop"),o=e("./text").Mode,i=e("./jsx_highlight_rules").JsxHighlightRules,a=e("./matching_brace_outdent").MatchingBraceOutdent,s=e("./behaviour/cstyle").CstyleBehaviour,u=e("./folding/cstyle").FoldMode;r.inherits(n,o),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),o=this.getTokenizer().getLineTokens(t,e),i=o.tokens;if(i.length&&"comment"==i[i.length-1].type)return r;if("start"==e){var a=t.match(/^.*[\{\(\[]\s*$/);a&&(r+=n)}return r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.$id="ace/mode/jsx"}.call(n.prototype),t.Mode=n});
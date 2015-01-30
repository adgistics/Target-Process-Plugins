ace.define("ace/ext/elastic_tabstops_lite",["require","exports","module","ace/editor","ace/config"],function(t,e){"use strict";var s=function(t){this.$editor=t;var e=this,s=[],i=!1;this.onAfterExec=function(){i=!1,e.processRows(s),s=[]},this.onExec=function(){i=!0},this.onChange=function(t){var e=t.data.range;i&&(-1==s.indexOf(e.start.row)&&s.push(e.start.row),e.end.row!=e.start.row&&s.push(e.end.row))}};(function(){this.processRows=function(t){this.$inChange=!0;for(var e=[],s=0,i=t.length;i>s;s++){var o=t[s];if(!(e.indexOf(o)>-1))for(var n=this.$findCellWidthsForBlock(o),r=this.$setBlockCellWidthsToMax(n.cellWidths),h=n.firstRow,a=0,c=r.length;c>a;a++){var l=r[a];e.push(h),this.$adjustRow(h,l),h++}}this.$inChange=!1},this.$findCellWidthsForBlock=function(t){for(var e,s=[],i=t;i>=0&&(e=this.$cellWidthsForRow(i),0!=e.length);)s.unshift(e),i--;var o=i+1;i=t;for(var n=this.$editor.session.getLength();n-1>i&&(i++,e=this.$cellWidthsForRow(i),0!=e.length);)s.push(e);return{cellWidths:s,firstRow:o}},this.$cellWidthsForRow=function(t){for(var e=this.$selectionColumnsForRow(t),s=[-1].concat(this.$tabsForRow(t)),i=s.map(function(){return 0}).slice(1),o=this.$editor.session.getLine(t),n=0,r=s.length-1;r>n;n++){var h=s[n]+1,a=s[n+1],c=this.$rightmostSelectionInCell(e,a),l=o.substring(h,a);i[n]=Math.max(l.replace(/\s+$/g,"").length,c-h)}return i},this.$selectionColumnsForRow=function(t){var e=[],s=this.$editor.getCursorPosition();return this.$editor.session.getSelection().isEmpty()&&t==s.row&&e.push(s.column),e},this.$setBlockCellWidthsToMax=function(t){for(var e,s,i,o=!0,n=this.$izip_longest(t),r=0,h=n.length;h>r;r++){var a=n[r];if(a.push){a.push(0/0);for(var c=0,l=a.length;l>c;c++){var u=a[c];if(o&&(e=c,i=0,o=!1),isNaN(u)){s=c;for(var f=e;s>f;f++)t[f][r]=i;o=!0}i=Math.max(i,u)}}else console.error(a)}return t},this.$rightmostSelectionInCell=function(t,e){var s=0;if(t.length){for(var i=[],o=0,n=t.length;n>o;o++)i.push(t[o]<=e?o:0);s=Math.max.apply(Math,i)}return s},this.$tabsForRow=function(t){for(var e,s=[],i=this.$editor.session.getLine(t),o=/\t/g;null!=(e=o.exec(i));)s.push(e.index);
return s},this.$adjustRow=function(t,e){var s=this.$tabsForRow(t);if(0!=s.length)for(var i=0,o=-1,n=this.$izip(e,s),r=0,h=n.length;h>r;r++){var a=n[r][0],c=n[r][1];o+=1+a,c+=i;var l=o-c;if(0!=l){var u=this.$editor.session.getLine(t).substr(0,c),f=u.replace(/\s*$/g,""),g=u.length-f.length;l>0&&(this.$editor.session.getDocument().insertInLine({row:t,column:c+1},Array(l+1).join(" ")+"	"),this.$editor.session.getDocument().removeInLine(t,c,c+1),i+=l),0>l&&g>=-l&&(this.$editor.session.getDocument().removeInLine(t,c+l,c),i+=l)}}},this.$izip_longest=function(t){if(!t[0])return[];for(var e=t[0].length,s=t.length,i=1;s>i;i++){var o=t[i].length;o>e&&(e=o)}for(var n=[],r=0;e>r;r++){for(var h=[],i=0;s>i;i++)h.push(""===t[i][r]?0/0:t[i][r]);n.push(h)}return n},this.$izip=function(t,e){for(var s=t.length>=e.length?e.length:t.length,i=[],o=0;s>o;o++){var n=[t[o],e[o]];i.push(n)}return i}}).call(s.prototype),e.ElasticTabstopsLite=s;var i=t("../editor").Editor;t("../config").defineOptions(i.prototype,"editor",{useElasticTabstops:{set:function(t){t?(this.elasticTabstops||(this.elasticTabstops=new s(this)),this.commands.on("afterExec",this.elasticTabstops.onAfterExec),this.commands.on("exec",this.elasticTabstops.onExec),this.on("change",this.elasticTabstops.onChange)):this.elasticTabstops&&(this.commands.removeListener("afterExec",this.elasticTabstops.onAfterExec),this.commands.removeListener("exec",this.elasticTabstops.onExec),this.removeListener("change",this.elasticTabstops.onChange))}}})}),function(){ace.require(["ace/ext/elastic_tabstops_lite"],function(){})}();
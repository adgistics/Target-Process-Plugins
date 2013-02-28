CodeMirror.braceRangeFinder=function(cm,line){var lineText=cm.getLine(line),startChar=lineText.lastIndexOf("{");if(startChar<0||lineText.lastIndexOf("}")>startChar)return;var tokenType=cm.getTokenAt({line:line,ch:startChar}).className,count=1,lastLine=cm.lineCount(),end;e:for(var i=line+1;i<lastLine;++i){var text=cm.getLine(i),pos=0;for(;;){var nextOpen=text.indexOf("{",pos),nextClose=text.indexOf("}",pos);nextOpen<0&&(nextOpen=text.length),nextClose<0&&(nextClose=text.length),pos=Math.min(nextOpen,nextClose);if(pos==text.length)break;if(cm.getTokenAt({line:i,ch:pos+1}).className==tokenType)if(pos==nextOpen)++count;else if(!--count){end=i;break e}++pos}}if(end==null||end==line+1)return;return end},CodeMirror.newFoldFunction=function(rangeFinder,markText){function isFolded(cm,n){for(var i=0;i<folded.length;++i){var start=cm.lineInfo(folded[i].start);if(!start)folded.splice(i--,1);else if(start.line==n)return{pos:i,start:start.line,end:start.line+folded[i].size}}}var folded=[];return markText==null&&(markText='<span style="color:#600">&#x25bc;</span>%N%'),function(cm,line){cm.operation(function(){var known=isFolded(cm,line);if(known){folded.splice(known.pos,1),cm.clearMarker(known.start);var stack=[];for(var i=known.start;i<known.end;++i){stack.length||cm.showLine(i),i==stack[0]&&stack.shift();var overlap=isFolded(cm,i);overlap&&stack.unshift(overlap.end-1)}}else{var end=rangeFinder(cm,line);if(end==null)return;for(var i=line+1;i<end;++i)cm.hideLine(i);var first=cm.setMarker(line,markText);folded.push({start:first,size:end-line})}})}}
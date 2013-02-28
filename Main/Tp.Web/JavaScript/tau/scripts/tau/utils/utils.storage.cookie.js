define(["libs/base64/base64"],function(base64){var Encode=function(jsonString){var code=base64.encode(jsonString);return code="#"+code,code},Decode=function(code){var str=code;return code.charAt(0)==="#"&&(code=code.substring(1),str=base64.decode(code)),str},BackwardCompatibilityKey=function(key){return"$"+key},CookiesStorage={set:function(key,value,expiredAt){var k=BackwardCompatibilityKey(key),date=new Date;date.setTime(date.getTime()+31536e6),expiredAt=expiredAt||date.toGMTString();var jsonString=JSON.stringify(value);jsonString=Encode(jsonString);var data=[k+"="+jsonString,"expires="+expiredAt,"path=/"].join("; ");document.cookie=data},get:function(key){var k=BackwardCompatibilityKey(key);k+="=";var val,parts=document.cookie.split(";");for(var i=0;i<parts.length;i++){var kv=parts[i];while(kv.charAt(0)===" ")kv=kv.substring(1,kv.length);kv.indexOf(k)===0&&(val=kv.substring(k.length,kv.length),val=Decode(val),val=JSON.parse(val))}return val},remove:function(key){return CookiesStorage.set(key,"",-1)}};return CookiesStorage})
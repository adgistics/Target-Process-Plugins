define(["Underscore","jQuery","tau/configurator","tau/utils/utils.textConverter"],function(a,b,c,d){var e=function(){module("[utils.textConverter]"),test("should convert source text to html save newline, additional spaces",function(){var b=new d,c="preved\nmedved",e="preved<br />\nmedved",f=b.convert(c);equals(a.trim(f),a.trim(e),"Should convert"),c="preved\r\nmedved",e="preved<br />\r\nmedved";var f=b.convert(c);equals(a.trim(f),a.trim(e),"Should convert"),c="pr<b>e</b>ved\r\nmedved",e="pr<b>e</b>ved<br />\r\nmedved";var f=b.convert(c);equals(a.trim(f),a.trim(e),"Should convert"),c="pr<b>e</b>ved\r\nmedved",e="pr&lt;b&gt;e&lt;/b&gt;ved<br />\r\nmedved";var f=b.convert(c,!0);equals(a.trim(f),a.trim(e),"Should convert")})};return{run:e}})
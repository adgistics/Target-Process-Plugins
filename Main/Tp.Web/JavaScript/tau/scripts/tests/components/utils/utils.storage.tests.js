define(["Underscore","jQuery","tau/utils/utils.storage","tau/utils/utils.storage.cookie"],function(_,$,store,storeCookie){var innerRun=function(){module("[utils.storage] tests"),test("should save data",function(){store.set("preved","medved"),equals(store.get("preved"),"medved","storage saves"),store.set("preved","medvedus"),equals(store.get("preved"),"medvedus","storage saves"),store.set("data",{abra:"cadabra",sim:"salabim"}),equals(store.get("data").abra,"cadabra","storage saves"),equals(store.get("preved"),"medvedus","storage saves"),equals(store.get("sick"),undefined,"storage get")}),test("should remove data",function(){store.set("preved","medved"),equals(store.get("preved"),"medved","storage saves"),store.remove("preved"),ok(!store.get("preved"),"storage removes")}),module("[utils.storage.cookie] tests"),test("should save and remove data",function(){var T1="preved";storeCookie.set(T1,"medved"),equals(storeCookie.get(T1),"medved","storage saves"),storeCookie.set(T1,"medvedus"),equals(storeCookie.get(T1),"medvedus","storage saves");var T2="data";storeCookie.set(T2,{abra:"cadabra",sim:"salabim"}),equals(storeCookie.get(T2).abra,"cadabra","storage saves"),equals(storeCookie.get(T2).sim,"salabim","storage saves"),equals(storeCookie.get(T1),"medvedus","storage saves"),storeCookie.remove(T1),ok(!storeCookie.get(T1),"storage removes"),storeCookie.remove(T2),ok(!storeCookie.get(T2),"storage removes"),equals(storeCookie.get("sick"),undefined,"storage get")})};return{run:innerRun}})
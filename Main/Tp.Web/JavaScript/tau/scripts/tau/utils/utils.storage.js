define(["tau/utils/utils.storage.cookie"],function(storageCookie){var hasStorage=typeof window.localStorage!="undefined"&&window.localStorage!==null&&!!window.localStorage.getItem&&!!window.localStorage.setItem,_localStorage={set:function(key,value){return localStorage.setItem(key,JSON.stringify(value)),!0},get:function(key){var v=localStorage.getItem(key);if(v)try{v=JSON.parse(v)}catch(e){}return v},remove:function(key){return localStorage.removeItem(key)}};return hasStorage?_localStorage:storageCookie})
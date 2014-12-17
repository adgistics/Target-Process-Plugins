define(["require","tau/core/class","Underscore","jQuery","libs/pluralize","tau/store/reservedWords.targetprocess.generated"],function(e){var s=e("tau/core/class"),r=e("Underscore"),t=e("jQuery"),i=e("libs/pluralize"),a=e("tau/store/reservedWords.targetprocess.generated"),n="This term is reserved by Targetprocess, please, use some other.",u="This term already exists, please, use some other.",l="%, ., ), ( and % characters can't be used for custom Terms. Please, use some others.";return s.extend({init:function(e,s){this._termsService=e,this._processId=s,this._viewData={isValid:!0}},getTerms:function(){return this._loadTerms().then(function(e){return r.extend(this._viewData,e),this._viewData.isLoading=!1,this._processDataForView(this._viewData)}.bind(this))},_processDataForView:function(e){var s=!0,t=["epic","build","impediment"];return r.each(e.terms,function(e){var i=""===e.single||e.single===e.defaultSingle,a=""===e.plural||e.plural===e.defaultPlural;e.isDefault=i&&a,s=e.isDefault&&s,e.isSpacer=r.contains(t,e.entityKind.toLowerCase())}),e.isDefault=s,e},_loadTerms:function(){return this._termsService.getTermsByProcessId(this._processId)},resetTermsToDefault:function(){return r.each(this._viewData.terms,function(e){e.single=e.defaultSingle,e.plural=e.defaultPlural}),this._resetTerms(this._viewData),this._viewData.isChanged=!1,this._processDataForView(this._viewData)},_isPluralizing:function(e,s){var r=e.single,t=r&&/^[a-z\s]+$/i.test(r)||""===r;return t&&i(s.single)==s.plural},_prepareWord:function(e){return r.trim(e).toLowerCase().replace(/\s/gi,"")},_validate:function(e,s,t,i){var o=!0,c=this._prepareWord,d=c(e[s]);if(""===d)return this._clearViewData(i);var h=r.capitalize(s),v=i.terms[t]["default"+h],_=r.without(a,c(v)),f={},m=function(){return i.errorMessage="",f.errorMessage&&(i.terms[t]["isInvalid"+h]=!0,o=!1,i.errorMessage=f.errorMessage),i.isValid=o,i};if(/[\(\)\.%]/.test(d))return f={errorMessage:l},m();if(r.contains(_,d))return f={errorMessage:n},m();var g=[{defaultSingle:n},{single:u},{defaultPlural:n},{plural:u}];
return r.each(i.terms,function(e,i){f=r.reduce(g,function(a,n){var u=r.keys(n)[0];return d===c(e[u])?u!==s&&u!=="default"+r.capitalize(s)||i!==t?{errorMessage:n[u]}:a:a},f)}),m()},_clearViewData:function(e){return r.each(e.terms,function(e){e.isInvalidSingle=!1,e.isInvalidPlural=!1}),e.isValid=!0,e.errorMessage="",e.successMessage="",e},updateTerms:function(e){var s=r.keys(e)[0],t=r.values(e)[0],a=r.keys(t)[0],n=0;r.each(this._viewData.terms,function(e,r){e.entityKind==s&&(n=r)}),t[a]=t[a].replace(/^\s+/,"");var u=this._viewData.terms[n];return this._isPluralizing(t,u)&&(t.plural=i(t.single)),r.extend(u,t),this._clearViewData(this._viewData),this._viewData=this._validate(t,a,n,this._viewData),this._viewData.isChanged=!0,this._processDataForView(this._viewData)},saveTerms:function(){return this._viewData.isValid?this._saveTerms(this._viewData).then(function(e){var s=r.extend(this._viewData,{terms:e.terms,isChanged:!1,successMessage:"Terms saved."});return this._processDataForView(s)}.bind(this)):t.Deferred().reject({clientValidation:this._viewData.errorMessage})},_saveTerms:function(e){return this._termsService.saveTerms(r.pick(e,"terms","processId"))},_resetTerms:function(){this._clearViewData(this._viewData),this._termsService.resetToDefaultByProcessId(this._processId)}})});
define(["Underscore","i18n!tau/nls/tokens"],function(_,tokens){var gettext=function(t){var r=tokens.hasOwnProperty(t)?tokens[t]:t;return r=_.isFunction(r)?r():r,r};return gettext.gettext=gettext,gettext})
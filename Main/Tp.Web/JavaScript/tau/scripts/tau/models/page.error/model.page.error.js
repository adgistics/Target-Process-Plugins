define(["Underscore","tau/core/extension.base"],function(e,r){return r.extend({"bus beforeInit":function(e,r){var t=r.config.request[0]||{message:"You were redirected to the error page but no error was caught"};r.config.context.configurator.getTitleManager().set(t.message),this.fire("dataBind",{err:t})}})});
define(["require","tau/components/component.creator","./settings.menu/process.setup.link/extension.process.setup.link","template!./settings.menu/process.setup.link/template.process.setup.link"],function(e){var t=e("tau/components/component.creator"),s=e("./settings.menu/process.setup.link/extension.process.setup.link"),n=e("template!./settings.menu/process.setup.link/template.process.setup.link");return{create:function(e){var r=t.create({template:n,extensions:[s]},e),o=e.context.configurator.getUrlBuilder(),p=o.getRelativeBoardPageUrl("process-setup");return r.fire("dataBind",{url:p}),r}}});
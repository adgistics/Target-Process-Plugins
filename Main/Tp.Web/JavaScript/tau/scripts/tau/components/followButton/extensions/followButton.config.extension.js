define(["require","tau/core/extension.base","./../models/followButton.model"],function(e){var o=e("tau/core/extension.base"),t=e("./../models/followButton.model");return o.extend({"bus afterInit":function(e,o){var n=o.config.context,r=n.configurator,i=r.getLoggedUser().id,f=n.entity,u=new t(r,i,f),l={model:u,configurator:r};this.fire("followButton.config.ready",l)}})});
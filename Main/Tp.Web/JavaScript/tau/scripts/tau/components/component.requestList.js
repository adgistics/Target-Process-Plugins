define(["tau/components/component.list.baseInfo","tau/components/extensions/requestsList/extension.requestList.refresher","tau/components/extensions/requestsList/extension.requestList.actions.detach"],function(componentListEntity,RequestListRefresher,RequestListActionDetach){return{create:function(config){var creatorConfig={extensions:[RequestListRefresher,RequestListActionDetach]};return config.typeName="request",config.propertyName="requests",componentListEntity.create(config,creatorConfig)}}})
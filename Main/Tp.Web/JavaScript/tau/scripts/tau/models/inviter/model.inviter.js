define(["Underscore","tau/core/extension.base"],function(_,ModelBase){var model=ModelBase.extend({"bus beforeInit + activeTab.ready":function(evt,initData,activeTab){this.fire("dataBind",{activeTab:activeTab})}});return model})
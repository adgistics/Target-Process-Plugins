define(["Underscore","tau/components/component.creator","tau/core/templates-factory"],function(_,creator,templates){return{create:function(config){var templateConfig={name:"relations-label",markup:['<div class="tau-relations-item tau-relations-this-entity">','    <div class="tau-entity-caption">',"        <h2>This entity (#${entity.id})</h2>","    </div>",'    <div class="tau-pointer"></div>',"</div>"]},template=templates.register(templateConfig),componentConfig={template:template},component=creator.create(componentConfig,config);return component.on("afterInit",function(e){component.fire("dataBind",{entity:config.context.entity})}),component}}})
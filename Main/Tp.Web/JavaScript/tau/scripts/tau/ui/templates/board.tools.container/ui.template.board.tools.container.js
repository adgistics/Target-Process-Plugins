define(["tau/core/templates-factory"],function(templates){var config={name:"board.tools.container",engine:"jqote2",markup:['<div class="tau-boardtools">','<div class="tau-inline-group tau-boardtools__buttonsholder i-role-tabheaders">','<button class="tau-btn tau-boardtools__switcher i-role-tabheader" data-label="overviews">Board Map</button>','<button class="tau-btn tau-boardtools__switcher i-role-tabheader" data-label="legend">Legend</button>',"</div>",'<div class="i-role-tab" role="overviews"   data-label="overviews"></div>','<div class="i-role-tab" role="legend"      data-label="legend"></div>',"</div>"],dependencies:[]};return templates.register(config)})
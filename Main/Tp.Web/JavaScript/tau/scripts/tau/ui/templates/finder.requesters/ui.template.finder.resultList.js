define(["tau/core/templates-factory","tau/ui/templates/finder.requesters/ui.template.finder.resultList.row"],function(templates){var config={name:"finder-requesters-resultList",markup:['<table class="tau-finder__table">',"<thead>",'<tr role="list-sorting">','<th class="tau-finder__cell tau-finder__cell-name">','<button type="button" class="tau-finder__sorttrigger" role="sorting" value="firstName">Name</button>',"</th>",'<th class="tau-finder__cell tau-finder__cell-email">','<button type="button" class="tau-finder__sorttrigger" role="sorting" value="email">Email</button>',"</th>",'<th class="tau-finder__cell tau-finder__cell-login">','<button type="button" class="tau-finder__sorttrigger" role="sorting" value="login">Login</button>',"</th>","</tr>","</tbody>","</table>",'<div class="ui-resultList tau-finder__result tau-finder__result_state_loading" role="list-placeholder">','<div class="tau-no-results  tau-finder__result__empty">No requesters found.</div>','<table class="tau-finder__table">','<tbody role="list">',"{{if items}}",'{{tmpl(items) "finder-requesters-resultList-row"}}',"{{/if}}","</tbody>","</table>",'<div class="tau-resultList-load-more tau-finder__result__loader">loading users...</div>',"</div>"],dependencies:["finder-requesters-resultList-row"]};return templates.register(config)})
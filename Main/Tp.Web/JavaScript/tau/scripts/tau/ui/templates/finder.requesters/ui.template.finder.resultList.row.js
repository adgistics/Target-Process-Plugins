define(["tau/core/templates-factory"],function(templates){var config={name:"finder-requesters-resultList-row",markup:['<tr class="tau-result-list-row" role="option">','<td class="tau-finder__cell tau-finder__cell-name">',"{{if firstName || lastName}}","${firstName} ${lastName}","{{else}}","${email}","{{/if}}","</td>",'<td class="tau-finder__cell tau-finder__cell-email">${email}</td>','<td class="tau-finder__cell tau-finder__cell-login">${login}</td>',"</tr>"]};return templates.register(config)})
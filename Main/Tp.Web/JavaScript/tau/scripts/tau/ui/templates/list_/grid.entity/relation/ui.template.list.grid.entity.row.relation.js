define(["tau/core/templates-factory"],function(t){var e={name:"list.grid.entity.row.relation",markup:['<tr class="i-item-${id}{{if entityState && entityState.isFinal}} tau-list__table__row_isfinalstate_true{{/if}}" data-relation-id="${relation.id}">','<td class="tau-relation-type">','<span runas="property.relationType" data-context:general:id="${relation.id}" data-context:general:entity-type:name="${relation.__type}">${relation.relationType.name}</span>',"</td>",'<td class="tau-entity-id">','<a href="${url}">${id}</a>',"</td>",'<td class="tau-entity-type">','<i class="tau-entity-icon tau-entity-icon--${entityType.name.toLowerCase()}">',"${entityType.term}","</i>","</td>",'<td class="tau-entity-name">${name}</td>','<td class="tau-entity-field tau-entity-project">',"{{if project}}",'<span class="tau-icon_type_color" style="background-color: ${project.color || "transparent"}">${project.abbreviation}</span>',"{{/if}}","</td>",'<td class="tau-entity-field tau-entity-state">',"{{if entityState}}",'<div runas="property.entityState" data-context:general:id="${id}" data-context:general:entity-type:name="${__type}">${entityState.name}</div>',"{{else}}","{{if hasLastStatus}}",'<div runas="property.lastStatus" data-context:general:id="${id}" data-context:general:entity-type:name="${__type}">${lastStatus}</div>',"{{/if}}","{{/if}}","</td>",'<td class="tau-entity-field"><span>${release || ""}</span></td>','<td class="tau-entity-field"><span>${iteration || ""}</span></td>','<td class="tau-action">','<button class="tau-btn tau-attention i-role-remove" type="button" data-relation-id="${relation.id}">Remove</button>',"</td>","</tr>"]};return t.register(e)});
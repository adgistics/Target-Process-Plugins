define(["tau/core/templates-factory","tau/ui/tags/ui.tag.term","tau/ui/templates/list_/grid.entity/ui.template.list.grid.entity.group","tau/ui/templates/list_/grid.entity/ui.template.list.grid.entity.row","tau/ui/templates/list_/grid.entity/testplan/ui.template.list.grid.entity.row.testplanrun","tau/ui/templates/list_/grid.entity/testplanrun/ui.template.list.grid.entity.row.testcaserun","tau/ui/templates/list_/grid.entity/userstory/ui.template.list.grid.entity.row.testcase","tau/ui/templates/list_/ui.template.list.comment"],function(t,e){var i={tags:[e],name:"list-grid-entity-testcase",markup:['<div class="tau-list tau-list-testcases">',"   {{if isEmpty === true}}",'<table class="tau-list__table tau-list__table-header">',"<tbody>",'<tr class="tau-list__table__row">','<td class="tau-list__table__cell tau-list__table__cell-header">',"</td>","</tr>","</tbody>","</table>",'      <div class="tau-list__empty-message">${config.currentView.emptyMessage}</div>',"   {{else}}",'     <div class="tau-list__content">',"       {{if groups && groups.length}}",'          {{tmpl(groups) "list-grid-entity__group"}}',"       {{/if}}","       {{if items && items.length}}",'           <div class="tau-list__group tau-list__group_flat_true"  role="group">','<table class="tau-list__table tau-list__table-header">',"<tbody>",'<tr class="tau-list__table__row">','<td class="tau-list__table__cell tau-list__table__cell-dragdrop"></td>','<td class="tau-list__table__cell tau-list__table__cell-expander tau-list__table__cell-header-expander" >','<div class="tau-list__itemexpander tau-list__itemexpander_state_closed"  role="item-expander-all">','<div class="tau-list__itemexpander__indicator "></div>',"</div>",'<div class="tau-list__itemexpander tau-list__itemexpander_state_open"  role="item-collapser-all">','<div class="tau-list__itemexpander__indicator "></div>',"</div>","</td>",'<td class="tau-list__table__cell tau-list__table__cell-header">',"</td>","</tr>","</tbody>","</table>",'               <ul class="tau-list__list"  role="list">',"                   {{tmpl(items) $item.data.config.currentView.rowTemplateName }}","               </ul>","           </div>","       {{/if}}","     </div>","   {{/if}}",'   <div class="tau-list__comment-holder">','          {{tmpl({}) "list-grid__comment"}}',"   </div>","</div>"],dependencies:["list-grid-entity__group","list-grid-entity__row","list-grid-entity__rowtestplanrun","list-grid-entity__rowtestcaserun","list-grid-entity__rowtestcase","list-grid__comment"]};
return t.register(i)});
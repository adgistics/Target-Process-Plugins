define(["tau/core/templates-factory"],function(templates){var config={name:"customField-checkbox",markup:['<div class="ui-customfield ui-customfield-checkbox">',"   <table>","   <tbody>","   <tr>",'       <td class="ui-customfield__label">${name}</td>','       <td class="ui_custom_field_value_container"><div class="ui-customfield__value ui-customfield__value_{{if value}}checked{{else}}unchecked{{/if}}">&nbsp;</div></td>',"   </tr>","   </tbody>","   </table>","</div>"]};return templates.register(config)})
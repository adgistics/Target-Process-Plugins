define(["tau/core/templates-factory","tau/ui/templates/common/ui.template.userName"],function(a){return a.register({name:"user",markup:["<table class='user' userId='${id}'><tr>","<td class='user-avatar-container'>","{{if avatar}}<img src='${avatar}' class='user-avatar'/>{{/if}}","</td>","<td class='user-info'>","   {{tmpl 'user-name'}}","{{if role}}","<span class='user-role'>${role.name}</span>","{{/if}}","</td>","</tr></table>"].join(""),dependencies:["user-name"]})})
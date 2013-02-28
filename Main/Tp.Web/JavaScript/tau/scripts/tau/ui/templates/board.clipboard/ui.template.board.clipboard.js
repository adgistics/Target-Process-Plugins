define(["tau/ui/templates/board.plus/ui.template.boardplus.card.skeleton"],function(){var config={name:"board.clipboard",engine:"jqote2",dependencies:["boardplus.card.skeleton"],markup:['<div class="tau-boardclipboard',"<% if (this.cards.length == 0){ %> tau-boardclipboard_empty_true<% } %>"," zoom-level-3 i-view_grid",'">','<div class="tau-boardclipboard__toolbar">','<h3 class="tau-boardclipboard__title"><span role="counter" class="tau-boardclipboard__quantity">',"<%= this.cards.length %>","</span>Selected items</h3>",'<div class="tau-boardclipboard__buttonsgroup tau-boardclipboard__buttonsgroup-third tau-inline-group">','<button class="i-role-collapser tau-v-collapser tau-boardclipboard__collapser" role="collapser"></button>',"</div>",'<div class="tau-boardclipboard__buttonsgroup tau-boardclipboard__buttonsgroup-second tau-inline-group">','<button class="tau-btn tau-boardclipboard__action-clear" role="action_clear" data-label-clearall="Clear All" data-label-clearselected="Clear Selected"></button>',"</div>",'<div class="tau-boardclipboard__buttonsgroup tau-boardclipboard__buttonsgroup-first tau-inline-group">','<button class="tau-btn tau-boardclipboard__action-remove" role="action_remove" data-label-removeall="Delete All" data-label-removeselected="Delete Selected" data-confirmation="Are you sure?" ></button>',"</div>","</div>",'<div role="holder" class="tau-boardclipboard__holder" id="clipboard_holder_<%= _.uniqueId() %>" >',"<% _.forEach(this.cards, function(data){ %>",'<%= fn.sub("boardplus.card.skeleton", data) %>',"<% }); %>","</div>","</div>"]};return config})
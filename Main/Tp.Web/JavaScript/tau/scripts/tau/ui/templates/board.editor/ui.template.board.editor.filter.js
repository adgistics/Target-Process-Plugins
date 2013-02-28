define(["tau/core/templates-factory","tau/ui/templates/board.editor/ui.template.board.editor.filterHelp"],function(templates){var config={name:"board.editor.filter",engine:"jqote2",markup:['<div class="tau-boardsettings__filter i-role-filter-control">','<button class="tau-btn i-role-filter-toggle" type="button">Filter ','<span class="tau-boardsettings__status tau-boardsettings__status_on">on </span>','<span class="tau-boardsettings__status tau-boardsettings__status_off">off</span></button>','<div class="i-role-filter">','<input type="text" name="<%= this.name %>_filter" placeholder="type ? for advanced filter"',' class="i-role-filter-input tau-boardsettings__filter__input tau-in-text tau-x-large tau-filter" value="<%! this.filter %>" ',"/>",'<button type="button" tabindex="-1" class="tau-boardsettings__filter__action tau-boardsettings__filter__action-help <%= this.name %>_help_button i-role-help"></button>','<div role="tooltip-content">','<%= fn.sub("board.editor.filterHelp", this) %>',"</div>","</div>","</div>"],dependencies:[]};return templates.register(config)})
define(["Underscore","jQuery","tau/core/class"],function(e,t,i){return i.extend({init:function(e){this.configurator=e.configurator,this.$el=e.$el,this.outputTemplate=e.outputTemplate.get(),this.optionTemplate=e.optionTemplate.get(),this.callback=e.callback,this.placeholderText=e.placeholderText,this.selectedFilter=null,this.bubbleClass=e.bubbleClass},setFilterOptions:function(t){this.filterOptions=t,this.selectedFilter&&!e.findWhere(this.filterOptions,{id:this.selectedFilter.id})&&this._setSelectedFilter(null),this._renderSelectedFilter()},_renderOptionsList:function(){var i=this.optionTemplate;return e.reduce(this.filterOptions,e.bind(function(e,t){return e.append(i.bind({},this._getTemplateData(t,!0)))},this),t('<div class="drop-down-list tau-filter-drop-down-list"></div>'))},_getTemplateData:function(e,t){return{context:{isOption:t},value:e}},_renderBubble:function(){var e=this._renderOptionsList();this.$bubbled.tauBubble("option","content",e),this._attachList(e)},_attachList:function(t){var i={items:".drop-down-option",className:"drop-down-option_hover",keyboardManager:this.configurator.getKeyBoardManager(),onSelect:e.bind(this._applySelectedOption,this)};t.listSelectable(i).listSelectable("enable")},_attachBubble:function(t){t.tauBubble({className:this.bubbleClass,onPositionConfig:function(e){return e.my="center top",e.at="center bottom",e},onShow:e.bind(this._renderBubble,this)}),this.$bubbled=t},_renderSelectedFilter:function(){if(this.$el.empty(),this.selectedFilter){this.$el.append(this.outputTemplate.bind({},this._getTemplateData(this.selectedFilter,!1)));var i=t('<span class="tau-clear-filter i-role-reset" />');i.click(e.bind(function(){this._setSelectedFilter(null),this._renderSelectedFilter()},this)),this.$el.children().append(i)}else{var l=t('<span class="tau-filter-placeholder i-role-trigger"></span>');l.text(this.placeholderText),this.$el.append(l)}this._attachBubble(this.$el.find(".i-role-trigger"))},_applySelectedOption:function(t){var i=t.data("option-id");
this._setSelectedFilter(e.findWhere(this.filterOptions,{id:i})),this._renderSelectedFilter()},_setSelectedFilter:function(t){this.selectedFilter=t,e.defer(this.callback,t)}})});
define(["libs/jquery/jquery"],function(jQuery){(function($,pluginName){if(pluginName in $.fn)throw new Error('The "'+pluginName+'" jQuery plugin is already defined.');var show=function($el){$el.css("visibility","visible")},hide=function($el){$el.css("visibility","hidden")},iterator=function(options){var $input=$(this);if(!$input.is('input[type="text"]'))return $(this);options=$.extend({cssClass:"",template:'<button type="button" tabindex="-1"></button>',onAttach:function($input,$button){var $wrapper=$('<span class="tau-resetable-input"></span>');$wrapper.insertBefore($input),$input.detach(),$wrapper.append($input).append($button)}},options);var $reseter=$(options.template).addClass(options.cssClass);hide($reseter),options.onAttach($input,$reseter),$input.addClass("i-role-resetable-target"),$reseter.addClass("i-role-resetable-trigger");var timeout=null,toggleButton=function(){$input.val()?show($reseter):hide($reseter)},onActivate=function(){clearTimeout(timeout),timeout=setTimeout(toggleButton,0)},onDeactivate=function(){clearTimeout(timeout),hide($reseter)},$parent=$input.parent(),$selector=".i-role-resetable-target,.i-role-resetable-trigger",handlers={mouseenter:onActivate,mouseleave:onDeactivate},initSubscription=function(){$parent.on(handlers,$selector)},resetSubscription=function(){$parent.off(handlers,$selector),$parent.on(handlers,$selector)},removeSubscription=function(){$parent.off(handlers,$selector)},onFocus=function(){onActivate(),removeSubscription()},onBlur=function(){onDeactivate(),resetSubscription()};return $input.on({keydown:onActivate,input:onActivate,focus:onFocus,blur:onBlur}),initSubscription(),$reseter.on("mousedown",function(evt){if(evt.which!=1)return;return hide($(this)),$input.val("").focus().trigger($.Event("keydown",{keyCode:8})).trigger($.Event("keyup",{keyCode:8})).trigger($.Event("keypress",{keyCode:8})).trigger("input").trigger("clear"),evt.preventDefault(),!1}),$(this)};$.fn[pluginName]=function(options){return $.browser.msie||this.each(function(){iterator.call(this,options)}),this}})(jQuery,"tauResetableInput")})
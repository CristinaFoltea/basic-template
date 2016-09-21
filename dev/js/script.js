"use strict";

(function($, window, document){


	var _bindInViewLogic = function(){

		if(!window.initModules || !window.initModules.length) return false;

		var initModules = window.initModules,
				$win = $(window);

		var curScroll, modPos, threshold;

		threshold = -150;

		var _checkScroll = function(){
			curScroll = $win.scrollTop() + $win.height() + threshold;
			_.each(initModules, function(module){
				modPos = module.$moduleEl.offset().top;
				if(modPos < curScroll) module.$moduleEl.addClass('js-in-view');
				else module.$moduleEl.removeClass('js-in-view');
			});
		}

		$win.on('scroll', _.throttle(_checkScroll, 25));

		_checkScroll();

	};



	//------------

	/* Handling modules in this manner to keep events and DOM modifications
	scoped to each particular instance of a given module.

	This will help avoid wierd errors down the line if there are
	two of the same module on the page. */

	var Module = function(element, moduleDef){
		var _this = this;
		for(var property in moduleDef){
			this[property] = moduleDef[property];
		}
		this.$moduleEl = element;
		this.$ = function(el){ return _this.$moduleEl.find(el) };
		this.$els = {};
		for(var prop in this.els){
			this.$els[prop] = this.$(this.els[prop]);
		}
		this.init();
	}

	window.defineModule = function(moduleDef){
		var addedModules = window.addedModules = window.addedModules || [];
		addedModules.push(moduleDef);
	}

	//------------


	$(document).ready(function(){
		var initModules = window.initModules = window.initModules || [];
		var addedModules = window.addedModules;
		if(addedModules && addedModules.length){
			for(var i=0; i < window.addedModules.length; i++){
				$(addedModules[i].el).each(function(){
					initModules.push(new Module($(this), addedModules[i]));
				});
			}
		}
		_bindInViewLogic();
	});



})(jQuery, window, document);

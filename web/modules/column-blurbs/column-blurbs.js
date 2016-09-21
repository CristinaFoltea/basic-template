"use strict";
(function($, window, document){
  //Empty JS still needed to initialize this module into the initModules array.
	var _helper = {};
	window.defineModule({
		el: '.column-blurbs',
		els:{
			itemCont: '.column-blurbs__items',
			items: '.column-blurbs__item'
		},
		init: function(){
			this.countItems();
		},
		countItems: function(){
			var count = this.$els.items.length;
			if(!count) return;
			this.$els.itemCont.attr('data-count', count);
		}
	});
})(jQuery, window, document);

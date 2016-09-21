"use strict";
(function($, window, document){

	var _config = {
		columns: 3
	};

	var _helper = {};

	window.defineModule({
		el: '.image-grid',
		els: {
			itemCont: '.image-grid__items',
			items: '.image-grid__item'
		},

		init: function(){
			this.recolumn();
		},
		recolumn: function(){
			if(!this.$els.items.length) return false;
			var iCnt, cols;
			var _this = this;
			var rows = _.chunk(this.$els.items, _config.columns);
			this.$els.items.remove();
			_.each(rows, function(row){
				var $newRow = $('<div class="image-grid__item-row" data-count="'+ row.length +'"></div>').appendTo(_this.$els.itemCont);
				$newRow = $('<div class="image-grid__row-container"></div>').appendTo($newRow);
				_.each(row, function(item){
					$newRow.append(item);
				});
			});

		}
	});
})(jQuery, window, document);

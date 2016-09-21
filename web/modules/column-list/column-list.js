"use strict";
(function($, window, document){

	var _config = {
		columns: 3
	};
	var _helper = {

	};

	window.defineModule({
		el: '.column-list',
		els: {
			itemCont: '.column-list__items',
			items: '.column-list__item'
		},
		init: function(){
			this.recolumn();
		},
		recolumn: function(){
			var pCol, iCnt, cols;
			var _this = this;
			this.$els.itemCont = $('<div class="column-list__items"></div>').insertBefore(this.$els.itemCont);
			this.$('ul').remove();
			iCnt = this.$els.items.length;
			if(!iCnt) return false;
			pCol = Math.ceil(iCnt / _config.columns);
			var cols = _.chunk(this.$els.items, pCol);
			this.$els.items.remove();
			_.each(cols, function(col){
				var $newColumn = $('<ul class="column-list__item-column"></ul>').appendTo(_this.$els.itemCont);
				_.each(col, function(link){
					$newColumn.append(link);
				});
			});
		}
	});

})(jQuery, window, document);

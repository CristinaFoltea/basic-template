"use strict";
(function($, window, document){

	var _config = {
		columns: 4
	};

	var _helper = {};

	window.defineModule({
		el: '.footer',
		els: {
			linkCont: '.footer__links',
			links: '.footer__link'
		},
		init: function(){
			this.recolumn();
		},
		recolumn: function(){
			var pCol, lCnt, cols;
			var _this = this;
			lCnt = this.$els.links.length;
			if(!lCnt) return false;
			pCol = Math.ceil(lCnt / _config.columns);
			var cols = _.chunk(this.$els.links, pCol);
			this.$els.links.remove();
			_.each(cols, function(col){
				var $newColumn = $('<div class="footer__link-column"></div>').appendTo(_this.$els.linkCont);
				_.each(col, function(link){
					$newColumn.append(link);
				});
			});

		}
	});

})(jQuery, window, document);

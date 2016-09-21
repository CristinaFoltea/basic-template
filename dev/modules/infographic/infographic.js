"use strict";
(function($, window, document){

	var _helper = {
		splitBlurbs: function(){

			var blurbCount = this.$els.blurbs.length,
					$secondHalf = this.$els.blurbs.splice((Math.ceil(blurbCount/2)), (blurbCount - 1));

			this.$els.newBlurbs = $('<ul class="infographic__blurbs--right"></li>')
				.append($secondHalf)
				.insertAfter(this.$els.blurbList);

		},
		handleMobile: function(){
			if(this.$els.images.length < 2) return false;
			this.$els.imageOne = this.$els.imageOne || this.$els.images.eq(0);
			this.$els.imageTwo = this.$els.imageTwo || this.$els.images.eq(1);
			if($(window).width() < 620 && !this.hasMobiled){
				this.$els.imageContTwo = $('<div class="infographic__image-container"></div>').appendTo(this.$els.mainCont);
				this.$els.imageTwo
					.detach()
					.appendTo(this.$els.imageContTwo);
				this.hasMobiled = true;
			}
			else if($(window).width() >= 620 && this.hasMobiled) {
				this.$els.imageTwo
					.detach()
					.appendTo(this.$els.imageCont);
				this.$els.imageContTwo.remove();
				this.hasMobiled = false;
			}
		}
	};

	window.defineModule({
		el: '.infographic',
		els:{
			mainCont: '.infographic__main-container',
			blurbList: '.infographic__blurbs',
			blurbs: '.infographic__blurb',
			imageCont: '.infographic__image-container',
			images: '.infographic__image'
		},

		init: function(){
			_helper.splitBlurbs.call(this);
			_helper.handleMobile.call(this);
			this.bindEvents();
		},

		bindEvents: function(){
			var _this = this;
			$(window).on('resize', _.debounce(function(){
				_helper.handleMobile.call(_this);
			}, 100));
		}

	});

})(jQuery, window, document);

"use strict";
(function($, window, document){

	var _helper = {

    setAspect: function(){

      var $win = $(window),
          ratio = $win.height() / $win.width();

      ratio = Math.min(ratio, 0.75);
      this.$els.aspect.css({'padding-bottom': ratio * 100 + '%'});

    },

    slideTo: function(index){

      if(index === this.currentSlide || this.isSliding) return false;

      var dir;
      if(index < this.currentSlide) dir = 'prev';
      else dir = 'next';

      if(index >= this.slideCount) index = 0;
      else if(index < 0) index = this.slideCount - 1;

      var $currentSlide = this.$els.slides.eq(this.currentSlide),
          $newSlide = this.$els.slides.eq(index),
          _this = this;

      $newSlide.on('transitionend webkitTransitionEnd oTransitionEnd', function(){

        setTimeout(function(){
          $currentSlide
            .removeClass('js-active');
          $newSlide
            .removeClass('js-slide-next')
            .removeClass('js-slide-prev')
        }, 100);

        _this.isSliding = false;
        _this.currentSlide = index;

        $newSlide.off('transitionend webkitTransitionEnd oTransitionEnd');
      });

      $newSlide.addClass('js-slide-' + dir);
      setTimeout(function(){$newSlide.addClass('js-active');}, 50);

      this.isSliding = true;

    },

    scrollDown: function(){
      $('body').animate({scrollTop: this.$moduleEl.height()}, '500', 'swing');
    }

	};

	window.defineModule({

		el: '.slide-hero',
    els: {
      aspect: '.slide-hero__aspect',
      view: '.slide-hero__view',
      slides: 'li.slide-hero__slide',
      paddles: '.slide-hero__paddle'
    },

		init: function(){
      this.slideCount = this.$els.slides.length;
      this.calcSizes();
      this.bindEvents();
      this.initFirstSlide();
      this.startAutoSlide();
    },

    calcSizes: function(){
      _helper.setAspect.call(this);
    },

    initFirstSlide: function(){
      this.currentSlide = 0;
      this.$els.slides.eq(this.currentSlide).addClass('js-active');
    },

    startAutoSlide: function(){
      var autoSlide = this.$moduleEl.attr('data-autoslide');
      if(!autoSlide) return false;
      autoSlide = parseInt(autoSlide, 10);
      var _this = this;
      this.autoSlide = setInterval(function(){
        _helper.slideTo.call(_this, _this.currentSlide + 1);
      }, autoSlide);
    },

    bindEvents: function(){

      var _this = this,
          $win = $(window);

      $win.on('resize', _.debounce(function(){
        _this.calcSizes();
      }, 100));

      this.$els.paddles.on('mousedown touchstart', function(e){
        var dir = $(e.currentTarget).attr('data-direction');
        switch(dir){
          case 'left': _helper.slideTo.call(_this, _this.currentSlide - 1); break;
          case 'right': _helper.slideTo.call(_this, _this.currentSlide + 1); break;
          case 'down': _helper.scrollDown.call(_this); break;
        }
        if(_this.autoSlide) clearInterval(_this.autoSlide);
      });

    }
	});

})(jQuery, window, document);

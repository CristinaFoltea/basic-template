"use strict";
(function($, window, document){

	var _helper = {
		showSubmenu: function($el){
			if(this.isSliding) return false;
			var _this = this;
			$el.addClass('js-active');
			this.$els.mobileHeader.find('span').text($el.children('a').eq(0).text());
			this.$els.mobileMenu.addClass('js-secondary');
			this.isSliding = true;
			this.$els.mobileMenuWrapper.on('transitionend webkitTransitionEnd oTransitionEnd', function(){
				_this.isSliding = false;
				_this.$els.mobileMenuWrapper.off('transitionend webkitTransitionEnd oTransitionEnd');
			});
		},
		backToMain: function(){
			if(this.isSliding) return false;
			var _this = this;
			this.isSliding = true;
			this.$els.mobileMenuWrapper.on('transitionend webkitTransitionEnd oTransitionEnd', function(){
				_this.$els.mobile_priLinks.children('.js-active')
					.removeClass('js-active');
				_this.$els.mobileMenuWrapper.off('transitionend webkitTransitionEnd oTransitionEnd');
				_this.isSliding = false;
			});
			this.$els.mobileMenu.removeClass('js-secondary');
			this.$els.mobileHeader.find('span').text('Menu');
		},
    morphClassesToMobile: function(){
			var _this = this;

      //kinda a cluster... but this will back backend integration very easy
      this.$els.mobile_priLinks = this.$els.mobileMenu.find('.navigation__pri-links'),
      this.$els.mobile_priLink = this.$els.mobileMenu.find('.navigation__pri-link'),
      this.$els.mobile_secLinks = this.$els.mobileMenu.find('.navigation__sec-links'),
      this.$els.mobile_secLink = this.$els.mobileMenu.find('.navigation__sec-link'),
      this.$els.mobile_extLinks = this.$els.mobileMenu.find('.navigation__ext-links'),
      this.$els.mobile_extLink = this.$els.mobileMenu.find('.navigation__ext-link');

      this.$els.mobile_priLinks.addClass('navigation__pri-links--mobile').removeClass('navigation__pri-links');
      this.$els.mobile_priLink.addClass('navigation__pri-link--mobile').removeClass('navigation__pri-link');
      this.$els.mobile_secLinks.addClass('navigation__sec-links--mobile').removeClass('navigation__sec-links');
      this.$els.mobile_secLink.addClass('navigation__sec-link--mobile').removeClass('navigation__sec-link');
      this.$els.mobile_extLinks.addClass('navigation__ext-links--mobile').removeClass('navigation__ext-links');
      this.$els.mobile_extLink.addClass('navigation__ext-link--mobile').removeClass('navigation__ext-link');

      var socialEls = [];
			var priName, priHref;
      this.$els.mobile_priLink.each(function(){
        if($(this).find('.navigation__sec-links--mobile').length > 0){
					$(this).addClass('js-has-children');
					priName = $(this).children('a').html();
					priHref = $(this).children('a').attr('href');
					$(this).find('.navigation__sec-links--mobile')
						.prepend('<li class="navigation__sec-link--mobile"><a href="'+priHref+'">'+priName+' Home</a></li>')
				}
        if($(this).find('[data-social]').length > 0){
          socialEls.push($(this).find('[data-social]').clone());
          $(this).remove();
        }
      });

      this.$els.mobile_socLinks = $('<ul class="navigation__social-links--mobile"></ul>');

      _.each(socialEls, function(socEl){
        socEl = $('<li class="navigation__social-link--mobile"></li>').append(socEl);
        _this.$els.mobile_socLinks.append(socEl);
      });

      this.$els.mobile_extLinks.after(this.$els.mobile_socLinks);

      this.$els.mobile_priLinks.find('.navigation__seperate').remove();

    },
    toggleMobileMenuDisplay: function(){
      $('html').toggleClass('js-show-mobile-menu');
    },
    closeMenu: function(){
      $('html').removeClass('js-show-mobile-menu');
    }
	};

	window.defineModule({

		el: '.navigation',

    els:{
      mobileToggle: '.navigation__mobile-toggle',
      primary: '.navigation__pri-links',
      extra: '.navigation__ext-links'
    },

		init: function(){
      this.generateMobileMenu();
      this.bindEvents();
		},

    generateMobileMenu: function(){

      var $body = $('body'),
          $page = $('.page-wrapper');

      this.$els.mobileMenu = $('<div class="navigation--mobile"></div>');
			this.$els.mobileMenuWrapper = $('<div class="navigation__wrapper--mobile"></div>')
			this.$els.mobileMenuWrapper
        .append(this.$els.primary.clone())
        .append(this.$els.extra.clone());

			this.$els.mobileHeader = $('<div class="navigation__header--mobile"><span>Menu</span></div>');
			this.$els.mobileNav = $('<div class="navigation__header-nav--mobile"></div>');
			this.$els.mobileHeader
				.append(this.$els.mobileNav);

			this.$els.mobileMenu
				.append(this.$els.mobileHeader)
				.append(this.$els.mobileMenuWrapper);

      _helper.morphClassesToMobile.call(this);

      $body.prepend(this.$els.mobileMenu);

    },

    bindEvents: function(){
      var _this = this;
      this.$els.mobileToggle.on('mousedown touchstart', function(e){
        _helper.toggleMobileMenuDisplay.call(_this);
      });
			this.$els.mobile_priLink.filter('.js-has-children').on('click', function(e){
				e.preventDefault();
				_helper.showSubmenu.call(_this, $(e.currentTarget));
			});
			this.$els.mobileNav.on('mousedown touchstart', function(e){
				_helper.backToMain.call(_this);
			});
			$(window).on('resize', _.debounce(function(e){
				_helper.closeMenu.call(_this);
			}, 100));
    }

	});

})(jQuery, window, document);

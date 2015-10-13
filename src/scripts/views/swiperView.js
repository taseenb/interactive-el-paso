define( function ( require ) {

  'use strict';

  var _ = require( 'underscore' );
  var swiperTpl = require( 'text!tpl/swiper.html' );

  var View = function ( el ) {

    this.$el = $( el );
    this.el = this.$el[0];

    this.initialize();

  };

  View.prototype = {

    initialize: function () {

      App.mediator.subscribe( 'resize', this.onResize.bind( this ) );

    },

    render: function () {

      var html = _.template( swiperTpl )( {
        copy: App.data.copy,
        items: App.data.items
      } );
      this.$el.html( html );

      this.swiper = new Swiper( this.$el.find( '.swiper-container' ), {
        // Optional parameters
        //direction: 'vertical',
        //loop: true, //

        spaceBetween: 50,

        // If we need pagination
        //pagination: '.swiper-pagination',

        // Navigation arrows
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',

        // And if we need scrollbar
        //scrollbar: '.swiper-scrollbar'
      } );


      this.setupElements();
      this.setupEvents();

      // set sizes
      setTimeout( function () {
        this.onResize();
      }.bind( this ), 250 );


    },

    goto: function ( id, speed ) {

      //console.log( 'showin item ' + id );

      if ( this.imagesLoaded ) {

        $( 'body' ).scrollTop( 0 );
        var duration = speed || 0;
        this.swiper.slideTo( id, duration );

      } else {

        this.onResize();

      }

    },

    setupElements: function () {

      this.$slides = this.$el.find( '.swiper-slide' );

      this.$mobileNav = this.$el.find( '.mobile-nav' );
      this.$prevNextArrows = this.$mobileNav.find( '.arrow' );

      this.$slideH1 = this.$slides.find( 'h1' ).first();
      this.$detailsWrapper = this.$slides.find( '.details-wrapper' ).first();
      this.$animImage = this.$detailsWrapper.find( '.anim-img' ).first();

      //console.log( this.$animImage );

    },

    setupEvents: function () {

      var event = App.isTouch ? 'touchstart' : 'click';
      this.$el.on( event, '.back-to-list', this.backToList.bind( this ) );

      // Update image size on load
      this.$animImage.on( 'load', function ( e ) {

        this.onResize();
        console.log( e );

        this.imagesLoaded = true;

      }.bind( this ) );

    },

    backToList: function ( e ) {

      e.preventDefault();
      App.mainView.show( 'list' );

    },

    onShow: function () {

    },

    onHide: function () {

    },

    onResize: function ( e ) {

      //console.log( e.width, e.height );


      var titleHeight = this.$slideH1.outerHeight( true );
      var animHeight = this.$animImage.outerHeight( true );

      if ( animHeight > 0 ) {
        this.$prevNextArrows.removeClass( 'hidden' );
      }

      this.$mobileNav.css( 'top', titleHeight + ~~(animHeight / 2) + 'px' );


      if ( this.swiper ) {
        this.swiper.update();
      }

    }

  };

  return View;

} );
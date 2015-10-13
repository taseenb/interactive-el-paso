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

    render: function ( id ) {

      this.requestedId = id; //App.swiperLoop ? id : id - 1;

      console.log( this.requestedId );

      var html = _.template( swiperTpl )( {
        copy: App.data.copy,
        items: App.data.items,
        optimizedFolder: App.isPhone ? 'opt/' : '' // load optimized gifs if this is a phone
      } );
      this.$el.html( html );

      this.swiper = new Swiper( this.$el.find( '.swiper-container' ), {
        // Optional parameters
        //direction: 'vertical',
        //loop: true, //

        spaceBetween: 50,

        loop: App.swiperLoop,

        // If we need pagination
        //pagination: '.swiper-pagination',

        // Navigation arrows
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',

        onSlideChangeEnd: function ( swiper ) {
          App.currentItem = swiper.activeIndex;
        }

        // And if we need scrollbar
        //scrollbar: '.swiper-scrollbar'
      } );

      App.slidesCount = this.swiper.slides.length;

      console.log( this.swiper.activeIndex );


      this.setupElements();
      this.setupEvents();

      // set sizes
      setTimeout( function () {
        this.onResize();
      }.bind( this ), 0 );


    },

    goto: function ( id, speed ) {

      //console.log( 'showin item ' + id );

      if ( this.imagesLoaded ) {

        $( 'body' ).scrollTop( 0 );
        var duration = speed || 0;
        this.swiper.slideTo( id, duration );

        console.log( 'showin item ' + id );

      }

      //else {
      //
      //  this.onResize();
      //
      //}

    },

    setupElements: function () {

      this.$slides = this.$el.find( '.swiper-slide' );

      this.$mobileNav = this.$el.find( '.mobile-nav' );
      this.$prevNextArrows = this.$mobileNav.find( '.arrow' );

      this.$slideH1 = this.$slides.find( 'h1' ).first();
      this.$detailsWrapper = this.$slides.find( '.details-wrapper' );
      this.$animImage = this.$detailsWrapper.find( '.anim-img' ).eq( this.requestedId );

      //console.log( this.$animImage );

    },

    setupEvents: function () {

      var event = App.isTouch ? 'touchstart' : 'click';
      this.$el.on( event, '.back-to-list', this.backToList.bind( this ) );

      // Update image size on load
      this.$animImage.on( 'load', function ( e ) {

        this.imagesLoaded = true;

        this.goto( this.requestedId, 0 );

        App.mainView.show( 'swiper' );

        this.swiper.onResize();

        this.onResize();

        console.log( e );

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

      //if ( this.imagesLoaded ) {

      var animHeight = this.$animImage.outerHeight( true );
      var titleHeight = this.$slideH1.outerHeight( true );

      if ( animHeight > 0 ) {
        this.$prevNextArrows.removeClass( 'hidden' );
      }

      this.$mobileNav.css( 'top', titleHeight + ~~(animHeight / 2) + 'px' );

      //}

      //if ( this.swiper ) {
      //  this.swiper.update();
      //}

    }

  };

  return View;

} );
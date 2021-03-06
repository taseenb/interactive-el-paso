define( function ( require ) {

  'use strict';

  var _ = require( 'underscore' );
  var listTpl = require( 'text!tpl/list.html' );

  // Views
  var SwiperView = require( 'views/swiperView.js' );


  var View = function ( el ) {

    this.$el = $( el );
    this.el = this.$el[0];

    this.initialize();
  };

  View.prototype = {

    initialize: function () {

      App.mediator.subscribe( 'resize', this.onResize.bind( this ) );

      App.currentItem = 0;

    },

    render: function () {

      var html = _.template( listTpl )( {
        copy: App.data.copy,
        items: App.data.items,
        rollOver: App.isTouch ? '' : 'roll-over',
        isTouch: App.isTouch
      } );
      this.$el.html( html );

      this.preloadImages();

      this.setupElements();
      this.setupEvents();

    },

    preloadImages: function () {

      // Preload list images
      var $imageEl = this.$el.find( '.normal' );
      var imagesCount = $imageEl.length;
      var loaded = 0;

      $imageEl.each( function ( i, el ) {

        //var image = new Image();
        var src = $( el ).data( 'src' );

        el.onload = function () { // always fires the event.
          loaded += 1;
          console.log( 'image ' + src + ' loaded!' );

          if ( imagesCount === loaded ) {
            console.log( 'ALL IMAGES LOADED' );
            this.onResize();
          }
        }.bind( this );

        el.onerror = function () {
          loaded += 1;
          console.log( 'error loading image ' + src );

          if ( imagesCount === loaded ) {
            console.log( 'ALL IMAGES LOADED' );
            this.onResize();
          }
        }.bind( this );

        el.src = src;
        //image.src = src;

        //$( image ).appendTo( $imageEl.eq( i ).parent() ).addClass( 'normal' );

      }.bind( this ) );

    },

    setupElements: function () {

    },

    setupEvents: function () {

      this.$el.on( 'click', '.open-item', this.openItem.bind( this ) );

    },

    openItem: function ( e ) {

      e.preventDefault();

      if ( !App.swiperView ) {
        // Create swiper view with the requested id
        App.swiperView = new SwiperView( '#swiper' );
        App.swiperView.render();
      }

      var id = parseInt( $( e.target ).closest( '.item' ).data( 'id' ) );

      // since the loop feature on the swiper changes all the indexes we have to get the requested id + 1
      if ( App.swiperLoop ) {
        id = id + 1 > App.slidesCount ? 1 : id + 1;
      }

      App.listClick = true;

      App.swiperView.goto( id );
      App.mainView.show( 'swiper' );
      window.scrollTo( 0, 0 );
      App.currentItem = id;

      // Google Analytics
      var name = App.data.items[id - 1].name;

      window.ga( 'send', {
        'hitType': 'event',          // Required.
        'eventCategory': 'view ingredients',   // Required.
        'eventAction': 'click',  // Required.
        'eventLabel': 'menu - ' + name
      } );


      App.mainView.scrollToTop();

    },

    onShow: function () {

    },

    onHide: function () {

    },

    onResize: function ( e ) {

      // console.log(e.width, e.height);

      iframeMessenger.resize( App.mainView.$el.outerHeight( true ) ); //

    }

  };

  return View;

} );
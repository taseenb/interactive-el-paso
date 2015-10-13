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

      this.currentItem = 0;

    },

    render: function () {

      var html = _.template( listTpl )( {
        copy: App.data.copy,
        items: App.data.items,
        rollOver: App.isTouch ? '' : 'roll-over',
        isTouch: App.isTouch
      } );
      this.$el.html( html );

      this.setupElements();
      this.setupEvents();

    },

    setupElements: function () {

    },

    setupEvents: function () {

      this.$el.on( 'click', '.open-item', this.openItem.bind( this ) );

    },

    openItem: function ( e ) {

      e.preventDefault();

      var id = parseInt( $( e.target ).closest( '.item' ).data( 'id' ) );

      if ( !App.swiperView ) {
        // Create swiper view
        App.swiperView = new SwiperView( '#swiper' );
        App.swiperView.render();
      }

      if ( this.currentItem !== id ) {
        App.swiperView.goto( id );
        App.mainView.show( 'swiper' );
      } else {
        App.mainView.show( 'swiper' );
      }

      window.scrollTo( 0, 0 );

      this.currentItem = id;

    },

    onShow: function() {

    },

    onHide: function() {

    },

    onResize: function ( e ) {

      // console.log(e.width, e.height);

    }

  };

  return View;

} );
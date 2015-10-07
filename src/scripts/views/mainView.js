define( function ( require ) {

  'use strict';

  var _ = require( 'underscore' );
  var headerTpl = require( 'text!tpl/header.html' );
  var contentTpl = require( 'text!tpl/content.html' );
  var footerTpl = require( 'text!tpl/footer.html' );

  // Views
  var ListView = require( 'views/listView.js' );


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

      var html = '';
      html += _.template( headerTpl )({
        copy: App.data.copy
      });
      html += _.template( contentTpl )();
      html += _.template( footerTpl )();
      this.$el.html( html );

      this.setupElements();
      this.setupEvents();

      // Create list view
      App.listView = new ListView( '#list' );
      App.listView.render();
    },

    setupElements: function () {

    },

    setupEvents: function () {

      // var event = App.isTouch ? 'touchstart' : 'click';
      // this.$el.on( event, this.onClick.bind( this ) );

    },

    show: function ( view ) {

      if (view === 'list') {
        App.listView.show();
        App.swiperView.hide();
      } else if (view === 'swiper' ) {
        App.swiperView.show();
        App.listView.hide();
      }

    },

    onResize: function ( e ) {
      // console.log(e.width, e.height);

    }

  };

  return View;

} );
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

    },

    render: function () {

      var html = '';
      html += _.template( headerTpl )( {
        copy: App.data.copy
      } );
      html += _.template( contentTpl )({
        copy: App.data.copy
      });
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

      if ( view === 'list' ) {
        this.showView(App.listView);
        this.hideView(App.swiperView);
      } else if ( view === 'swiper' ) {
        this.showView(App.swiperView);
        this.hideView(App.listView);
      }

    },

    showView: function ( view ) {

      view.$el.removeClass('hidden');
      view.onShow();

    },

    hideView: function ( view ) {

      view.$el.addClass('hidden');
      view.onHide();

    }

  };

  return View;

} );
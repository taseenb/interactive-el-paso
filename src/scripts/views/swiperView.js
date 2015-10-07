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

      var html = _.template( swiperTpl )();
      this.$el.html( html );

      this.setupElements();
      this.setupEvents();

    },

    goto: function ( id ) {

      console.log( 'showin item ' + id );

    },

    show: function () {
      this.$el.show();
    },

    hide: function () {
      this.$el.hide();
    },

    setupElements: function () {

    },

    setupEvents: function () {

      var event = App.isTouch ? 'touchstart' : 'click';
      this.$el.on( event, '.back-to-list', this.backToList.bind( this ) );

    },

    backToList: function(e) {

      e.preventDefault();
      App.mainView.show( 'list' );

    },

    onResize: function ( e ) {

      // console.log(e.width, e.height);

    }

  };

  return View;

} );
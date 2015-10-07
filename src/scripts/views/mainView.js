define( function ( require ) {

  'use strict';

  var _ = require( 'underscore' );
  var contentTpl = require( 'text!tpl/content.html' );

  var View = function ( el ) {

    this.$el = $( el );
    this.el = this.$el[0];

    this.initialize();
  };

  View.prototype = {

    initialize: function () {

//      App.mediator.subscribe( 'resize', this.onResize.bind( this ) );
//      App.mediator.subscribe( 'accelerometer', this.onAccelerometer.bind( this ) );
//      App.mediator.subscribe( 'scroll', this.onScroll.bind( this ) );

    },

    render: function () {
      var html = _.template( contentTpl )();
      this.$el.html( html );

      this.setupElements();
      this.setupEvents();

    },

    setupElements: function () {

    },

    setupEvents: function () {
//      var event = App.isTouch ? 'touchstart' : 'click';
//      this.$el.on( event, this.onClick.bind( this ) );
    },

    onClick: function () {
      console.log( 'click' );
    },

    onResize: function ( e ) {
      // console.log(e.width, e.height);
    },

    onScroll: function ( e ) {
      // console.log( e.scrollLeft, e.scrollTop );
    },

    onAccelerometer: function ( e ) {

      var x = Math.abs( e.x );
      var y = Math.abs( e.y );
      var z = Math.abs( e.z );

      console.log( x, y, z );
      // this.$debug.html( 'x: ' + x.toFixed( 2 ) + '<br>y: ' + y.toFixed( 2 ) + '<br>z: ' + z.toFixed( 2 ) );

    }

  };

  return View;

} );
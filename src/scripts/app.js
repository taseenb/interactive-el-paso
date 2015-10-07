define( function ( require ) {

  'use strict';

  var Mediator = require( 'mediator-js' );

  // Create App global
  window.App = window.App || {};

  // Helper
  var getDevicePixelRatio = require( 'vendors/getDevicePixelRatio' );
  App.devicePixelRatio = getDevicePixelRatio();
  //  console.log( 'devicePixelRatio', App.devicePixelRatio );

  // Touch
  App.isTouch = $( 'html' ).hasClass( 'touch' );
  //  console.log( 'touch', App.isTouch );

  // Global Events - pub/sub
  App.mediator = new Mediator();
  require( 'resize' );
  require( 'scroll' );
  //  require( 'accelerometer' );

  // Main view
  var MainView = require( 'views/mainView.js' );
  var mainView = new MainView( '#main' );
  mainView.render();

} );
define( function ( require ) {

  'use strict';

  var Mediator = require( 'mediator-js' );

  // Create App global
  window.App = window.App || {};

  // Touch
  App.isTouch = $( 'html' ).hasClass( 'touch' );
  //  console.log( 'touch', App.isTouch );

  // Global Events - pub/sub
  App.mediator = new Mediator();

  // Resize event
  var resizeEvent = require( 'resize' );
  resizeEvent.initialize();

  // Import Swiper
  App.swiper = require( 'swiper' );

  // Get data and start main view
  $.ajax( {
    url: 'data/data.js',
    dataType: 'jsonp',
    jsonpCallback: 'callback',
    success: function ( data ) {
      App.data = data;

      console.log( data );
      //console.log( App.width, App.height );

      // Main view
      var MainView = require( 'views/mainView.js' );
      App.mainView = new MainView( '#main' );
      App.mainView.render();
    }
  } );


} );
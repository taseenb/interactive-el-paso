define( function ( require ) {

  'use strict';

  // Create App global
  window.App = window.App || {};


  // ##################################################
  // #
  // Swiper Options
  // #
  // ##################################################
  // #
  App.swiperLoop = true;
  // #
  // ##################################################


  // Device
  App.isTouch = $( 'html' ).hasClass( 'touch' );
  App.isPhone = App.isTouch && (App.width < 481 || App.height < 481);


  // Global Events - pub/sub
  var Mediator = require( 'mediator-js' );
  App.mediator = new Mediator();


  // Resize event
  var resizeEvent = require( 'resize' );
  resizeEvent.initialize()


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
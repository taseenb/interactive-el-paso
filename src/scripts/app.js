define( function ( require ) {

  'use strict';

  var DEBUG = false;

  $( function () {

    // Create App global
    window.App = window.App || {};

    // Support
    App.supportTransitions = !$( 'html' ).hasClass( 'no-csstransitions' );

    // Disable console.log on IE 9
    if ( !App.supportTransitions || DEBUG === false ) {
      window.console = {
        log: function () {
        }
      };
    }


    // ##################################################
    // #
    // Swiper Options
    // #
    // ##################################################
    // #
    App.swiperLoop = App.supportTransitions ? true : false;
    // #
    // ##################################################


    // Global Events - pub/sub
    var Mediator = require( 'mediator-js' );
    App.mediator = new Mediator();


    // Resize event
    var resizeEvent = require( 'resize' );
    resizeEvent.initialize();


    // Device
    App.isTouch = $( 'html' ).hasClass( 'touch' );
    App.isPhone = App.isTouch && (App.width < 481 || App.height < 481);


    // Import Swiper
    App.swiper = require( 'swiper' );


    // Analytics
    require( 'analytics' );


    // Get data and start main view
    $.ajax( {
      url: 'data/data.js',
      dataType: 'jsonp',
      jsonpCallback: 'callback',
      cache: false,
      type: 'GET',
      success: function ( data ) {
        App.data = data;

        //console.log( data );
        //console.log( App.width, App.height );

        // Main view
        var MainView = require( 'views/mainView.js' );
        App.mainView = new MainView( '#main' );
        App.mainView.render();
      }
    } );


  } );


} );
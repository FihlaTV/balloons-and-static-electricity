// Copyright 2013-2015, University of Colorado Boulder

/**
 * main view class for the simulation
 *
 * @author Vasily Shakhov (Mlearner)
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var ControlPanel = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/ControlPanel' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SweaterNode = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/SweaterNode' );
  var WallNode = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/WallNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Cursor = require( 'SCENERY/accessibility/reader/Cursor' );
  var ReaderDisplayNode = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/accessibility/ReaderDisplayNode' );
  var Reader = require( 'SCENERY/accessibility/reader/Reader' );
  var Node = require( 'SCENERY/nodes/Node' );
  var BalloonNode = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/BalloonNode' );
  var TetherNode = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/TetherNode' );
  var BalloonsAndStaticElectricityQueryParameters = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/BalloonsAndStaticElectricityQueryParameters' );
  var SceneSummaryNode = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/accessibility/SceneSummaryNode' );
  var PlayAreaNode = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/PlayAreaNode' );
  var BalloonsAndStaticElectricityAudio = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/BalloonsAndStaticElectricityAudio' );
  var BASEA11yStrings = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/BASEA11yStrings' );
  var balloonsAndStaticElectricity = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloonsAndStaticElectricity' );
  var Vector2 = require( 'DOT/Vector2' );
  var AlertQueue = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/accessibility/AlertQueue' );
  var AriaHerald = require( 'SCENERY_PHET/accessibility/AriaHerald' );  

  // strings
  var balloonsAndStaticElectricityTitleString = require( 'string!BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity.title' );

  // images
  var balloonGreen = require( 'image!BALLOONS_AND_STATIC_ELECTRICITY/balloon-green.png' );
  var balloonYellow = require( 'image!BALLOONS_AND_STATIC_ELECTRICITY/balloon-yellow.png' );

  // constants
  var BALLOON_TIE_POINT_HEIGHT = 14; // empirically determined

  /**
   * @constructor
   * @param {BalloonsAndStaticElectricityModel} model
   * @param {Tandem} tandem
   */
  function BalloonsAndStaticElectricityView( model, tandem ) {

    var self = this;

    ScreenView.call( this, {
      layoutBounds: new Bounds2( 0, 0, 768, 504 ),
      accessibleContent: null
    } );

    this.alertQueue = new AlertQueue();

    // @public - for now, we are testing whether accessible content can be contained in an article
    this.articleContainerNode = new Node( {
      tagName: 'article'
    } );
    this.addChild( this.articleContainerNode );

    var accessibleHeaderNode = new Node( {
      tagName: 'header',
      labelTagName: 'h1',
      accessibleLabel: balloonsAndStaticElectricityTitleString,
      accessibleDescriptionTagName: 'p'
    } );
    this.articleContainerNode.addChild( accessibleHeaderNode );

    var sceneSummaryNode = new SceneSummaryNode( model, tandem.createTandem( 'sceneSummaryNode' ) );
    this.articleContainerNode.addChild( sceneSummaryNode );

    // add sonification if enabled
    if ( BalloonsAndStaticElectricityQueryParameters.sonification ) {
      this.audioView = new BalloonsAndStaticElectricityAudio( model, tandem.createTandem( 'audioView' ) );
    }

    // create a parent container for all things in the 'play area' to structure the accessibility DOM into sections
    var playAreaContainerNode = new Node( {
      parentContainerTagName: 'section',
      tagName: 'div',
      accessibleLabel: BASEA11yStrings.playAreaLabelString,
      labelTagName: 'h2'
    } );
    this.articleContainerNode.addChild( playAreaContainerNode );

    var sweaterNode = new SweaterNode( model, tandem.createTandem( 'sweaterNode' ) );
    playAreaContainerNode.addChild( sweaterNode );

    var wall = new WallNode( model, tandem.createTandem( 'wall' ) );
    playAreaContainerNode.addChild( wall );

    //Show black to the right side of the wall so it doesn't look like empty space over there
    this.articleContainerNode.addChild( new Rectangle(
      model.wall.x + wall.wallNode.width,
      0,
      1000,
      1000,
      { fill: 'black', tandem: tandem.createTandem( 'spaceToRightOfWall' ) }
    ) );

    //Add black to the left of the screen to match the black region to the right of the wall
    var maxX = this.layoutBounds.maxX - model.wall.x - wall.wallNode.width;
    this.articleContainerNode.addChild( new Rectangle(
      maxX - 1000,
      0,
      1000,
      1000,
      { fill: 'black', tandem: tandem.createTandem( 'spaceToLeftOfWall' ) }
    ) );

    var controlPanel = new ControlPanel( model, this.layoutBounds, tandem.createTandem( 'controlPanel' ) );

    var balloonsNode = new Node( { tandem: tandem.createTandem( 'balloonsNode' ) } ); // TODO: Why this container?
    this.yellowBalloonNode = new BalloonNode(
      400,
      200,
      model.yellowBalloon,
      balloonYellow,
      model,
      'yellow',
      tandem.createTandem( 'yellowBalloonNode' )
    );

    this.alertQueue.utteranceEmitter.addListener( function( utterance ) {
      AriaHerald.announceAssertive( utterance );
    } );

    // when the position changes, add an update to the queue
    model.yellowBalloon.locationProperty.link( function() {

      if ( model.yellowBalloon.onSweater() && !model.yellowBalloon.isDraggedProperty.get() ) {
        self.alertQueue.addFunction( {
          condition: function() { return true; }, 
          utterance: 'Balloon is stuck to sweater!',
          type: 'STUCK'
        } );
      }
      if ( model.yellowBalloon.touchingWall() ) {
        self.alertQueue.addFunction( {
          condition: function() { return true; }, 
          utterance: 'Balloon touching wall!',
          type: 'TOUCHING_WALL'
        } );
      }
      if ( model.yellowBalloon.touchingWall() && model.yellowBalloon.chargeProperty.get() < 0 ) {
        self.alertQueue.addFunction( {
          condition: function() { return true; }, 
          utterance: 'Balloon stuck to wall!',
          type: 'STUCK_TO_WALL'
        } );
      }
      else {
        self.alertQueue.addFunction( {
          condition: function() { return true; }, 
          utterance: 'Balloon position changed!',
          type: 'MOVED'
        } );
      }
    } );

    model.yellowBalloon.chargeProperty.link( function() {
      self.alertQueue.addFunction( {
        condition: function() { return true; }, 
        utterance: 'Balloon charge increased!',
        type: 'CHARGE'
      } );
    } );

    var tetherAnchorPoint = new Vector2(
      model.yellowBalloon.locationProperty.get().x + 30, // a bit to the side of directly below the starting position
      this.layoutBounds.height + 50 // slightly below bottom of frame, amount was empirically determined
    );
    this.yellowBalloonTetherNode = new TetherNode(
      model.yellowBalloon,
      tetherAnchorPoint,
      new Vector2( this.yellowBalloonNode.width / 2, this.yellowBalloonNode.height - BALLOON_TIE_POINT_HEIGHT ),
      tandem.createTandem( 'yellowBalloonTetherNode' )
    );
    this.greenBalloonNode = new BalloonNode(
      500,
      200,
      model.greenBalloon,
      balloonGreen,
      model,
      'green',
      tandem.createTandem( 'greenBalloonNode' )
    );
    this.greenBalloonTetherNode = new TetherNode(
      model.greenBalloon,
      tetherAnchorPoint,
      new Vector2( this.greenBalloonNode.width / 2, this.greenBalloonNode.height - BALLOON_TIE_POINT_HEIGHT ),
      tandem.createTandem( 'greenBalloonTetherNode' )
    );
    balloonsNode.children = [
      this.greenBalloonTetherNode,
      this.greenBalloonNode,
      this.yellowBalloonTetherNode,
      this.yellowBalloonNode
    ];
    playAreaContainerNode.addChild( balloonsNode );

    // Only show the selected balloon(s)
    model.greenBalloon.isVisibleProperty.link( function( isVisible ) {
      self.greenBalloonNode.visible = isVisible;
      self.greenBalloonTetherNode.visible = isVisible;
    } );

    this.articleContainerNode.addChild( controlPanel );

    //A black rectangle that vertically 'extends' the navbar from joist, see #54
    this.articleContainerNode.addChild( new Rectangle( 0, 0, 3000, this.layoutBounds.height, {
      fill: 'black',
      x: -1000,
      y: this.layoutBounds.height,
      pickable: false,
      tandem: tandem.createTandem( 'navBarExtension' )
    } ) );

    // set the accessible order: sweater, balloons wall
    playAreaContainerNode.accessibleOrder = [ accessibleHeaderNode, sweaterNode, balloonsNode, wall ];

    // visualise regions of the play area
    if ( phet.chipper.queryParameters.dev ) {
      this.articleContainerNode.addChild( new PlayAreaNode( model, tandem.createTandem( 'playAreaNode' ) ) );
    }

    // enable the prototype screen reader
    if ( BalloonsAndStaticElectricityQueryParameters.reader ) {
      var cursor = new Cursor( document.body );
      var readerDisplayBounds = new Bounds2( 10, 0, this.layoutBounds.width - 20, 50 );

      var reader = new Reader( cursor );
      var display = new ReaderDisplayNode( reader, readerDisplayBounds );
      this.articleContainerNode.addChild( display );
    }
  }

  balloonsAndStaticElectricity.register( 'BalloonsAndStaticElectricityView', BalloonsAndStaticElectricityView );

  inherit( ScreenView, BalloonsAndStaticElectricityView, {

    /**
     * Step the view.  For acccessibility, we want to step the 'AudioView' and the the keyboard drag handlers.
     * @param number} dt description
     * @public
     */
    step: function( dt ) {
      this.greenBalloonNode.step( dt );
      this.yellowBalloonNode.step( dt );

      // step the audio
      this.audioView && this.audioView.step( dt );
    }
  } );

  return BalloonsAndStaticElectricityView;
} );

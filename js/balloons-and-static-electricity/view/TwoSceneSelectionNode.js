// Copyright 2016, University of Colorado Boulder

/**
 * Creates a scene selection switch for two scenes.  The visual is styled similar to radio
 * buttons, but clicking anywhere within the bounds of the the switch will change the value,
 * which makes the interaction different from a radio group.
 *
 * Therefore, this is a single button styled like two buttons.  It uses custom input listeners
 * because the typical sun button model would have modeled and styled these as two separate
 * buttons.
 * 
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var balloonsAndStaticElectricity = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloonsAndStaticElectricity' );
  var AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var HBox = require ( 'SCENERY/nodes/HBox' );
  var DownUpListener = require( 'SCENERY/input/DownUpListener' );
  var Property = require( 'AXON/Property' );
  var ButtonListener = require( 'SCENERY/input/ButtonListener' );
  var HighlightListener = require( 'SCENERY_PHET/input/HighlightListener' );
  var ButtonModel = require( 'SUN/buttons/ButtonModel' );
  var RectangularButtonView = require( 'SUN/buttons/RectangularButtonView' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Color = require( 'SCENERY/util/Color' );
  var ColorConstants = require( 'SUN/ColorConstants' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );

  // constants
  var DEFAULT_FILL = new Color( 'white' );
  var DISABLED_OPACITY = 0.3;

  /**
   *
   * @constructor
   */
  function TwoSceneSelectionNode( property, valueA, valueB, nodeA, nodeB, options ) {

    options = _.extend( {

      // LayoutBox options
      spacing: 10,
      orientation: 'horizontal',
      align: 'center',

      // whether or not these buttons are enabled
      enabledProperty: new Property( true ),

      // The fill for the rectangle behind the radio buttons.  Default color is bluish color, as in the other button library.
      baseColor: DEFAULT_FILL,
      pressedColor: DEFAULT_FILL.colorUtilsDarker( 0.4 ),
      disabledBaseColor: ColorConstants.LIGHT_GRAY,

      // Opacity can be set separately for the buttons and button content.
      selectedButtonOpacity: 1,
      deselectedButtonOpacity: 0.6,
      selectedContentOpacity: 1,
      deselectedContentOpacity: 0.6,
      overButtonOpacity: 0.8,
      overContentOpacity: 0.8,
      disabledOpacity: 0.3,

      selectedStroke: 'black',
      deselectedStroke: new Color( 50, 50, 50 ),
      selectedLineWidth: 1.5,
      deselectedLineWidth: 1,

      // These margins are *within* each button, relative to the
      // largest of the two icons
      buttonContentXMargin: 5,
      buttonContentYMargin: 5,

      cornerRadius: 4,

      // TouchArea expansion
      touchAreaXDilation: 0,
      touchAreaYDilation: 0,

      // MouseArea expansion
      mouseAreaXDilation: 0,
      mouseAreaYDilation: 0,

    }, options );

    // @private
    this.enabledProperty = options.enabledProperty;

    // place the nodes in an align group so that the two buttons will have identical sizing
    var buttonAlignGroup = new AlignGroup();
    var aBox = buttonAlignGroup.createBox( nodeA );
    var bBox = buttonAlignGroup.createBox( nodeB );

    // use a path so that the linewidth can be updated
    var xMargin = options.buttonContentXMargin;
    var yMargin = options.buttonContentYMargin;
    var cornerRadius = options.cornerRadius;

    // aBox.bounds === bBox.bounds since we are using AlignGroup
    var rectShape = Shape.roundRect( -xMargin, -yMargin, aBox.width + 2 * xMargin, aBox.height + 2 * yMargin, cornerRadius, cornerRadius );
    var aButton = new Path( rectShape ); 
    var bButton = new Path( rectShape ); 
    aButton.addChild( aBox );
    bButton.addChild( bBox );

    LayoutBox.call( this, {
      spacing: options.spacing,
      orientation: options.orientation,
      align: options.align,

      children: [ aButton, bButton ],
      cursor: 'pointer',
      resize: false
    } );

    // sets the styles of the buttons after an interaction, inculding the
    // stroke, opacity, lineWidith, and fill, depending on wheter or not the button is enabled
    var self = this;
    var setStyles = function( enabled ) {

      var selectedButton;
      var deselectedButton;
      var selectedContent;
      var deselectedContent;

      if ( property.get() === valueA ) {
        selectedButton = aButton;
        deselectedButton = bButton;
        selectedContent = nodeA;
        deselectedContent = nodeB;
      }
      else {
        selectedButton = bButton;
        deselectedButton = aButton;
        selectedContent = nodeB;
        deselectedContent = nodeA;
      }

      selectedButton.stroke = options.selectedStroke;
      deselectedButton.stroke = options.deselectedStroke;

      selectedButton.opacity = options.selectedButtonOpacity;
      deselectedButton.opacity = options.deselectedButtonOpacity;

      selectedContent.opacity = options.selectedContentOpacity;
      deselectedContent.opacity = options.deselectedContentOpacity;

      selectedButton.lineWidth = options.selectedLineWidth;
      deselectedButton.lineWidth = options.deselectedLineWidth;

      if ( !enabled ) {
        self.opacity = options.disabledOpacity;

        selectedButton.fill = options.baseColor;
        deselectedButton.fill = options.baseColor;
      }
      else {
        selectedButton.fill = options.baseColor;
        deselectedButton.fill = options.baseColor;
      }
    }
    setStyles( this.enabledProperty.get() );

    // listener that makes this node behave like a button
    var downUpListener = new DownUpListener( {
      up: function( event ) {
        var newValue = property.get() === valueA ? valueB : valueA;
        property.set( newValue );
        setStyles( self.enabledProperty.get() );
      },
      down: function( event ) {
        var otherButton = property.get() === valueA ? bButton : aButton;
        otherButton.fill = options.pressedColor;
      }
    } );

    // listener that highlights the unselected button when mouse is over local bounds
    var highlightListener = new HighlightListener( function( target, highlight ) {
      var otherButton = property.get() === valueA ? bButton : aButton;
      var otherContent = property.get() === valueA ? nodeB : nodeA;

      var buttonOpacity = highlight ? options.overButtonOpacity : options.deselectedButtonOpacity;
      var contentOpacity = highlight ? options.overContentOpacity : options.deselectedContentOpacity;

      otherButton.opacity = buttonOpacity;
      otherContent.opacity = contentOpacity;
    } );

    // add listeners, to be disposed
    this.addInputListener( downUpListener );
    this.addInputListener( highlightListener );
    this.enabledProperty.link( setStyles );

    // set mouse and touch areas
    this.mouseArea = this.bounds.dilatedXY( options.mouseAreaXDilation, options.mouseAreaYDilation );
    this.touchArea = this.bounds.dilatedXY( options.touchAreaXDilation, options.touchAreaYDilation );

    // @private - for garbage collection
    this.disposeTwoSceneSelectionNode = function() {
      this.removeInputListener( downUpListener );
      this.removeInputListener( highlightListener );
      this.enabledProperty.unlink( setStyles );
    }

  }

  balloonsAndStaticElectricity.register( 'TwoSceneSelectionNode', TwoSceneSelectionNode );

  return inherit( LayoutBox, TwoSceneSelectionNode, {

    /**
     * Make eligible for garbage collection.
     * @public
     */
    dispose: function() {
      this.disposeTwoSceneSelectionNode();
    },

    /**
     * Set enabled/disabled for interaction
     * @param {boolean} value
     */
    setEnabled: function( value ) {
      assert && assert( typeof value === 'boolean', 'TwoSceneSelectionNode.enabled must be a boolean value' );
      this.enabledProperty.set( value );
    },
    set enabled( value ) { this.setEnabled( value ); },

    /**
     * Get enabled/disabled value.
     * @return {boolean}
     */
    getEnabled: function() {
      return this.enabledProperty.get();
    },
    get enabled() { return this.getEnabled(); }

  } );
} );
// Copyright 2017, University of Colorado Boulder

/**
 * A view type that observes the WallModel and builds descriptions which can be read by assistive technology.
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var balloonsAndStaticElectricity = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloonsAndStaticElectricity' );
  var BalloonsAndStaticElectricityDescriber = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/BalloonsAndStaticElectricityDescriber' );
  var BASEA11yStrings = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/BASEA11yStrings' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Range = require( 'DOT/Range' );

  // strings
  var wallDescriptionPatternString = BASEA11yStrings.wallDescriptionPatternString;
  var wallLocationString = BASEA11yStrings.wallLocationString;
  var wallNoNetChargeString = BASEA11yStrings.wallNoNetChargeString;
  var aLittleBitString = BASEA11yStrings.aLittleBitString;
  var aLotString = BASEA11yStrings.aLotString;
  var quiteALotString = BASEA11yStrings.quiteALotString;
  var inducedChargePatternString = BASEA11yStrings.inducedChargePatternString;
  var greenBalloonLabelString = BASEA11yStrings.greenBalloonLabelString;
  var yellowBalloonLabelString = BASEA11yStrings.yellowBalloonLabelString;
  var wallTwoBalloonInducedChargePatternString = BASEA11yStrings.wallTwoBalloonInducedChargePatternString;
  var wallChargeWithoutInducedPatternString = BASEA11yStrings.wallChargeWithoutInducedPatternString;
  var wallChargeWithInducedPatternString = BASEA11yStrings.wallChargeWithInducedPatternString;
  var noChargesShownString = BASEA11yStrings.noChargesShownString;
  var manyChargePairsString = BASEA11yStrings.manyChargePairsString;

  // constants
  var INDUCED_CHARGE_DESCRIPTION_MAP = {
    A_LITTLE_BIT: {
      range: new Range( 0, 10 ),
      description: aLittleBitString
    },
    A_LOT: {
      range: new Range( 10, 20 ),
      description: aLotString
    },
    QUITE_A_LOT: {
      range: new Range( 20, Number.MAX_VALUE ),
      description: quiteALotString
    }
  };


  // constants
  function WallDescriber( model, showChargesProperty ) {

    // @private {WallModel}
    this.model = model;

    // @private showChargesProperty
    this.showChargesProperty = showChargesProperty;
  }

  balloonsAndStaticElectricity.register( 'WallDescriber', WallDescriber );

  return inherit( Object, WallDescriber, {

    /**
     * Get the full description for the wall including its location, net charge, and induced charge.  This is used
     * as the general description for the wall which an AT user can read at any time with the virtual cursor.
     * The content is dependent on the view representation of charges (model.showchargesProperty).
     * 
     * @public
     * @param  {BalloonModel} yellowBalloon
     * @param  {BalloonModel} greenBalloon
     * @return {string}
     */
    getWallDescription: function( yellowBalloon, greenBalloon ) {

      // get the description for induced charge from each balloon, only added to description if all charges shown
      var inducedChargeString;
      var yellowBalloonInducedChargeString;
      var greenBalloonInducedChargeString;
      if ( this.model.isVisibleProperty.get() && this.showChargesProperty.get() === 'all' ) {
        if ( yellowBalloon.inducingCharge ) {
          yellowBalloonInducedChargeString = this.getInducedChargeDescription( yellowBalloon, yellowBalloonLabelString );
          inducedChargeString = yellowBalloonInducedChargeString;
        }
        if ( greenBalloon.inducingCharge && greenBalloon.isVisibleProperty.get() ) {
          greenBalloonInducedChargeString = this.getInducedChargeDescription( greenBalloon, greenBalloonLabelString );
        }
      }

      // assemble the induced charge description depending on if one or both balloons are inducing charge
      if ( yellowBalloonInducedChargeString && greenBalloonInducedChargeString ) {
        inducedChargeString = StringUtils.fillIn( wallTwoBalloonInducedChargePatternString, {
          yellowBalloon: yellowBalloonInducedChargeString,
          greenBalloon: greenBalloonInducedChargeString
        } );
      }
      else if ( yellowBalloonInducedChargeString ) {
        inducedChargeString = yellowBalloonInducedChargeString;
      }
      else if ( greenBalloonInducedChargeString ) {
        inducedChargeString = greenBalloonInducedChargeString;
      }

      // get the description for what charges are currently shown
      var shownChargesString = ( this.showChargesProperty.get() === 'diff' ) ? noChargesShownString : manyChargePairsString;

      // if there is an induced charge, include it in the full charge description
      var wallChargeString;
      if ( inducedChargeString ) {
        wallChargeString = StringUtils.fillIn( wallChargeWithInducedPatternString, {
          netCharge: wallNoNetChargeString,
          shownCharges: shownChargesString,
          inducedCharge: inducedChargeString
        } );
      }
      else {
        wallChargeString = StringUtils.fillIn( wallChargeWithoutInducedPatternString, {
          netCharge: wallNoNetChargeString,
          shownCharges: shownChargesString
        } );
      }

      // assemble the whole description
      var description = StringUtils.fillIn( wallDescriptionPatternString, {
        location: wallLocationString, 
        charge: wallChargeString
      } );

      console.log( description );
      
    },

    /**
     * Get an induced charge description for a balloon, based on the positions of charges in the wall.  We find the
     * closest charge to the balloon, and determine how far it has been displaced from its initial position.
     *
     * @private
     * @param  {Balloon} balloon
     * @returns {string}
     */
    getInducedChargeAmountDescription: function( balloon ) {

      var amountDescription;
      var descriptionKeys = Object.keys( INDUCED_CHARGE_DESCRIPTION_MAP );
      for ( var j = 0; j < descriptionKeys.length; j++ ) {
        var value = INDUCED_CHARGE_DESCRIPTION_MAP[ descriptionKeys[ j ] ];
        if ( value.range.contains( balloon.closestChargeInWall.getDisplacement() ) ) {
          amountDescription = value.description;
        }
      }
      return amountDescription;
    },

    /**
     * Get the induced charge description for the wall.  The description contains the location of the displaced
     * charges, which balloon is inducing charge, and a relative description of how much induced charge there
     * is.
     *
     * @param  {BalloonModel} balloon
     * @param  {string} balloonLabel
     * @return {string}
     */
    getInducedChargeDescription: function( balloon, balloonLabel ) {

      // get the variable parts of the description to place in the pattern
      var closestCharge = balloon.closestChargeInWall;
      var location = closestCharge.locationProperty.get();
      var isVisible = this.model.isVisibleProperty.get();
      var chargeLocationString = BalloonsAndStaticElectricityDescriber.getLocationDescription( location, isVisible );
      var inducedChargeAmount = this.getInducedChargeAmountDescription( balloon );

      return StringUtils.fillIn( inducedChargePatternString, {
        wallLocation: chargeLocationString,
        balloon: balloonLabel,
        inductionAmount: inducedChargeAmount
      } ); 
    }
  } );
} );

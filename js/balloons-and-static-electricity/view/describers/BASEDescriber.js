// Copyright 2017, University of Colorado Boulder

/**
 * Manages descriptions for the entire simulation Balloons and Static Electricity.  Has functions that put together
 * strings for descriptions that are used throughout several view types.
 * 
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var balloonsAndStaticElectricity = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloonsAndStaticElectricity' );
  var BASEA11yStrings = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/BASEA11yStrings' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PlayAreaMap = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/model/PlayAreaMap' );
  var Range = require( 'DOT/Range' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  // play area grid strings
  var leftShoulderOfSweaterString = BASEA11yStrings.leftShoulderOfSweaterString.value;
  var leftArmOfSweaterString = BASEA11yStrings.leftArmOfSweaterString.value;
  var bottomLeftEdgeOfSweaterString = BASEA11yStrings.bottomLeftEdgeOfSweaterString.value;

  var upperLeftSideOfSweaterString = BASEA11yStrings.upperLeftSideOfSweaterString.value;
  var leftSideOfSweaterString = BASEA11yStrings.leftSideOfSweaterString.value;
  var lowerLeftSideOfSweaterString = BASEA11yStrings.lowerLeftSideOfSweaterString.value;

  var upperRightSideOfSweaterString = BASEA11yStrings.upperRightSideOfSweaterString.value;
  var rightSideOfSweaterString = BASEA11yStrings.rightSideOfSweaterString.value;
  var lowerRightSideOfSweater = BASEA11yStrings.lowerRightSideOfSweater.value;

  var rightShoulderOfSweaterString = BASEA11yStrings.rightShoulderOfSweaterString.value;
  var rightArmOfSweaterString = BASEA11yStrings.rightArmOfSweaterString.value;
  var lowerRightArmOfSweaterString = BASEA11yStrings.lowerRightArmOfSweaterString.value;

  var upperLeftSideOfPlayAreaString = BASEA11yStrings.upperLeftSideOfPlayAreaString.value;
  var leftSideOfPlayAreaString = BASEA11yStrings.leftSideOfPlayAreaString.value;
  var lowerLeftSideOfPlayAreaString = BASEA11yStrings.lowerLeftSideOfPlayAreaString.value;

  var upperCenterOfPlayAreaString = BASEA11yStrings.upperCenterOfPlayAreaString.value;
  var centerOfPlayAreaString = BASEA11yStrings.centerOfPlayAreaString.value;
  var lowerCenterOfPlayAreaString = BASEA11yStrings.lowerCenterOfPlayAreaString.value;

  var upperRightSideOfPlayAreaString = BASEA11yStrings.upperRightSideOfPlayAreaString.value;
  var rightSideOfPlayAreaString = BASEA11yStrings.rightSideOfPlayAreaString.value;
  var lowerRightSideOfPlayAreaString = BASEA11yStrings.lowerRightSideOfPlayAreaString.value;

  var upperWallString = BASEA11yStrings.upperWallString.value;
  var wallString = BASEA11yStrings.wallString.value;
  var lowerWallString = BASEA11yStrings.lowerWallString.value;

  var upperRightEdgeOfPlayAreaString = BASEA11yStrings.upperRightEdgeOfPlayAreaString.value;
  var rightEdgeOfPlayAreaString = BASEA11yStrings.rightEdgeOfPlayAreaString.value;
  var lowerRightEdgeOfPlayAreaString = BASEA11yStrings.lowerRightEdgeOfPlayAreaString.value;

  // charge strings
  var noString = BASEA11yStrings.noString.value;
  var zeroString = BASEA11yStrings.zeroString.value;
  var aFewString = BASEA11yStrings.aFewString.value;
  var severalString = BASEA11yStrings.severalString.value;
  var manyString = BASEA11yStrings.manyString.value;
  var negativeString = BASEA11yStrings.negativeString.value;

  var eachBalloonString = BASEA11yStrings.eachBalloonString.value;
  var balloonNetChargePatternStringWithLabel = BASEA11yStrings.balloonNetChargePatternStringWithLabel.value;

  var landmarkNearSweaterString = BASEA11yStrings.landmarkNearSweaterString.value;
  var landmarkLeftEdgeString = BASEA11yStrings.landmarkLeftEdgeString.value;
  var landmarkNearUpperWallString = BASEA11yStrings.landmarkNearUpperWallString.value;
  var landmarkNearWallString = BASEA11yStrings.landmarkNearWallString.value;
  var landmarkNearLowerWallString = BASEA11yStrings.landmarkNearLowerWallString.value;
  var landmarkVeryCloseToUpperWallString = BASEA11yStrings.landmarkVeryCloseToUpperWallString.value;
  var landmarkVeryCloseToLowerWallString = BASEA11yStrings.landmarkVeryCloseToLowerWallString.value;
  var landmarkVeryCloseToWallString = BASEA11yStrings.landmarkVeryCloseToWallString.value;
  var landmarkVeryCloseToRightEdgeString = BASEA11yStrings.landmarkVeryCloseToRightEdgeString.value;
  var landmarkVeryCloseToUpperRightEdgeString = BASEA11yStrings.landmarkVeryCloseToUpperRightEdgeString.value;
  var landmarkVeryCloseToLowerRightEdgeString = BASEA11yStrings.landmarkVeryCloseToLowerRightEdgeString.value;
  var landmarkVeryCloseToSweaterString = BASEA11yStrings.landmarkVeryCloseToSweaterString.value;
  var landmarkNearUpperRightEdgeString = BASEA11yStrings.landmarkNearUpperRightEdgeString.value;
  var landmarkNearRightEdgeString = BASEA11yStrings.landmarkNearRightEdgeString.value;
  var landmarkNearLowerRightEdgeString = BASEA11yStrings.landmarkNearLowerRightEdgeString.value;
  var landmarkAtCenterPlayAreaString = BASEA11yStrings.landmarkAtCenterPlayAreaString.value;
  var landmarkAtUpperCenterPlayAreaString = BASEA11yStrings.landmarkAtUpperCenterPlayAreaString.value;
  var landmarkAtLowerCenterPlayAreaString = BASEA11yStrings.landmarkAtLowerCenterPlayAreaString.value;

  var upString = BASEA11yStrings.upString.value;
  var leftString = BASEA11yStrings.leftString.value;
  var downString = BASEA11yStrings.downString.value;
  var rightString = BASEA11yStrings.rightString.value;
  var upAndToTheRightString = BASEA11yStrings.upAndToTheRightString.value;
  var upAndToTheLeftString = BASEA11yStrings.upAndToTheLeftString.value;
  var downAndToTheRightString = BASEA11yStrings.downAndToTheRightString.value;
  var downAndToTheLeftString = BASEA11yStrings.downAndToTheLeftString.value;

  // charge strings
  var summaryNeutralChargesPatternString = BASEA11yStrings.summaryNeutralChargesPatternString.value;
  var showingNoChargesString = BASEA11yStrings.showingNoChargesString.value;

  // constants
  var LOCATION_DESCRIPTION_MAP = {
    AT_LEFT_EDGE: {
      UPPER_PLAY_AREA: landmarkLeftEdgeString,
      CENTER_PLAY_AREA: landmarkLeftEdgeString,
      LOWER_PLAY_AREA: landmarkLeftEdgeString
    },
    LEFT_ARM: {
      UPPER_PLAY_AREA: leftShoulderOfSweaterString,
      CENTER_PLAY_AREA: leftArmOfSweaterString,
      LOWER_PLAY_AREA: bottomLeftEdgeOfSweaterString
    },
    LEFT_SIDE_OF_SWEATER: {
      UPPER_PLAY_AREA: upperLeftSideOfSweaterString,
      CENTER_PLAY_AREA: leftSideOfSweaterString,
      LOWER_PLAY_AREA: lowerLeftSideOfSweaterString
    },
    RIGHT_SIDE_OF_SWEATER: {
      UPPER_PLAY_AREA: upperRightSideOfSweaterString,
      CENTER_PLAY_AREA: rightSideOfSweaterString,
      LOWER_PLAY_AREA: lowerRightSideOfSweater
    },
    RIGHT_ARM: {
      UPPER_PLAY_AREA: rightShoulderOfSweaterString,
      CENTER_PLAY_AREA: rightArmOfSweaterString,
      LOWER_PLAY_AREA: lowerRightArmOfSweaterString
    },
    AT_VERY_CLOSE_TO_SWEATER: {
      UPPER_PLAY_AREA: landmarkVeryCloseToSweaterString,
      CENTER_PLAY_AREA: landmarkVeryCloseToSweaterString,
      LOWER_PLAY_AREA: landmarkVeryCloseToSweaterString      
    },
    AT_NEAR_SWEATER: {
      UPPER_PLAY_AREA: landmarkNearSweaterString,
      CENTER_PLAY_AREA: landmarkNearSweaterString,
      LOWER_PLAY_AREA: landmarkNearSweaterString 
    },
    LEFT_PLAY_AREA: {
      UPPER_PLAY_AREA: upperLeftSideOfPlayAreaString,
      CENTER_PLAY_AREA: leftSideOfPlayAreaString,
      LOWER_PLAY_AREA: lowerLeftSideOfPlayAreaString
    },
    AT_CENTER_PLAY_AREA: {
      UPPER_PLAY_AREA: landmarkAtUpperCenterPlayAreaString,
      CENTER_PLAY_AREA: landmarkAtCenterPlayAreaString,
      LOWER_PLAY_AREA: landmarkAtLowerCenterPlayAreaString
    },
    CENTER_PLAY_AREA: {
      UPPER_PLAY_AREA: upperCenterOfPlayAreaString,
      CENTER_PLAY_AREA: centerOfPlayAreaString,
      LOWER_PLAY_AREA: lowerCenterOfPlayAreaString
    },
    RIGHT_PLAY_AREA: {
      UPPER_PLAY_AREA: upperRightSideOfPlayAreaString,
      CENTER_PLAY_AREA: rightSideOfPlayAreaString,
      LOWER_PLAY_AREA: lowerRightSideOfPlayAreaString
    },
    AT_NEAR_WALL: {
      UPPER_PLAY_AREA: landmarkNearUpperWallString,
      CENTER_PLAY_AREA: landmarkNearWallString,
      LOWER_PLAY_AREA: landmarkNearLowerWallString
    },
    AT_VERY_CLOSE_TO_WALL: {
      UPPER_PLAY_AREA: landmarkVeryCloseToUpperWallString,
      CENTER_PLAY_AREA: landmarkVeryCloseToWallString,
      LOWER_PLAY_AREA: landmarkVeryCloseToLowerWallString,
    },
    AT_WALL: {
      UPPER_PLAY_AREA: upperWallString,
      CENTER_PLAY_AREA: wallString,
      LOWER_PLAY_AREA: lowerWallString
    },
    WALL: {
      UPPER_PLAY_AREA: upperWallString,
      CENTER_PLAY_AREA: wallString,
      LOWER_PLAY_AREA: lowerWallString
    },
    AT_NEAR_RIGHT_EDGE: {
      UPPER_PLAY_AREA: landmarkNearUpperRightEdgeString,
      CENTER_PLAY_AREA: landmarkNearRightEdgeString,
      LOWER_PLAY_AREA: landmarkNearLowerRightEdgeString
    },
    AT_VERY_CLOSE_TO_RIGHT_EDGE: {
      UPPER_PLAY_AREA: landmarkVeryCloseToUpperRightEdgeString,
      CENTER_PLAY_AREA: landmarkVeryCloseToRightEdgeString,
      LOWER_PLAY_AREA: landmarkVeryCloseToLowerRightEdgeString
    },
    RIGHT_EDGE: {
      UPPER_PLAY_AREA: upperRightEdgeOfPlayAreaString,
      CENTER_PLAY_AREA: rightEdgeOfPlayAreaString,
      LOWER_PLAY_AREA: lowerRightEdgeOfPlayAreaString
    },
    AT_RIGHT_EDGE: {
      UPPER_PLAY_AREA: upperRightEdgeOfPlayAreaString,
      CENTER_PLAY_AREA: rightEdgeOfPlayAreaString,
      LOWER_PLAY_AREA: lowerRightEdgeOfPlayAreaString
    }
  };

  // constants - ranges to describe relative charges in various objects
  var RELATIVE_CHARGE_DESCRIPTION_MAP = {
    NO_MORE_RANGE: {
      range: new Range( 0, 0 ),
      description: noString
    },
    A_FEW_RANGE: {
      range: new Range( 1, 15 ),
      description: aFewString
    },
    SEVERAL_RANGE: {
      range: new Range( 15, 40 ),
      description: severalString
    },
    MANY_RANGE: {
      range: new Range( 40, 57 ),
      description: manyString
    }
  };

  // maps  direction to a description string
  var DIRECTION_MAP = {
    UP: upString,
    DOWN: downString,
    LEFT: leftString,
    RIGHT: rightString,
    UP_RIGHT: upAndToTheRightString,
    UP_LEFT: upAndToTheLeftString,
    DOWN_RIGHT: downAndToTheRightString,
    DOWN_LEFT: downAndToTheLeftString
  };

  function BASEDescriber() {
    // TODO: Does this really need a type? Or can it be a static Object?
  }

  balloonsAndStaticElectricity.register( 'BASEDescriber', BASEDescriber );

  return inherit( Object, BASEDescriber, {}, {

    /**
     * Get the location description for the balloon. This is not a full description, but a short
     * descsription. Regions are defined in PlayAreaMap.  This will get called very often and needs to be quick.
     * 
     * @param {Vector2} location - location of the balloon, relative to its center
     * @return {string}
     */
    getLocationDescription: function( location, wallVisible ) {

      var landmarks = PlayAreaMap.LANDMARK_RANGES;
      var columns = PlayAreaMap.COLUMN_RANGES;
      var locations = PlayAreaMap.X_LOCATIONS;
      var rows = PlayAreaMap.ROW_RANGES;

      // loop through keys manually to prevent a many closures from being created during object iteration in 'for in'
      // loops
      var columnsKeys = Object.keys( columns );
      var rowKeys = Object.keys( rows );
      var landmarkKeys = Object.keys( landmarks );
      var locationKeys = Object.keys( locations );

      var i;
      var currentLocation;
      var currentLandmark;
      var currentColumn;
      var currentRow;

      // critical x locations take priority, start there
      for ( i = 0; i < locationKeys.length; i++ ) {
        if ( location.x === locations[ locationKeys[ i ] ] ) {
          currentLocation = locationKeys[ i ];
        }
      }

      for ( i = 0; i < landmarkKeys.length; i++ ) {
        if ( landmarks[ landmarkKeys[ i ] ].contains( location.x ) ) {
          currentLandmark = landmarkKeys[ i ];
        }
      }

      // landmark takes priority - only find column if we couldn't find landmark
      if ( !currentLandmark ) {
        for ( i = 0; i < columnsKeys.length; i++ ) {
          if ( columns[ columnsKeys[ i ] ].contains( location.x ) ) {
            currentColumn = columnsKeys[ i ];
          }
        }
      }
      for ( i = 0; i < rowKeys.length; i++ ) {
        if ( rows[ rowKeys[ i ] ].contains( location.y ) ) {
          currentRow = rowKeys[ i ];
        }
      }

      // use location, column, or landmark, whichever was found, prioritizing location
      currentColumn = currentLocation || currentLandmark || currentColumn;
      assert && assert( currentColumn && currentRow, 'item should be in a row or column of the play area' );

      // the wall and the right edge of the play area overlap, so if the wall is visible, chose that description
      // TODO: probably a better way to do this
      if ( wallVisible && ( currentColumn === 'RIGHT_EDGE' || currentColumn === 'AT_RIGHT_EDGE' ) ) {
        currentColumn = 'WALL';
      }
      if ( !wallVisible && BASEDescriber.inWallColumn( currentColumn ) ) {
        currentColumn = 'RIGHT_PLAY_AREA';
      }

      return LOCATION_DESCRIPTION_MAP[ currentColumn ][ currentRow ];
    },

    /**
     * Returns whether or not the column is in one of the 'wall' columns, could  be at, near, or very close to wall.
     * @private
     *
     * @param {string} column - one of keys in LOCATION_DESCRIPTION_MAP
     * @return {boolean}
     */
    inWallColumn: function( column ) {
      return ( column === 'AT_WALL' || column === 'AT_NEAR_WALL' || column === 'WALL' || column === 'AT_VERY_CLOSE_TO_WALL' );
    },

    /**
     * Get a fragment that describes the relative charge for an objet, like 'a few' or 'several', to be used in 
     * string patterns
     * 
     * @param  {number} charge
     * @return {string}
     */
    getRelativeChargeDescription: function( charge ) {

      // the description is mapped to the absolute value of charge
      var absCharge = Math.abs( charge );

      var keys = Object.keys( RELATIVE_CHARGE_DESCRIPTION_MAP );

      var description;

      for ( var i = 0; i < keys.length; i++ ) {
        var value = RELATIVE_CHARGE_DESCRIPTION_MAP[ keys[ i ] ];
        if ( value.range.contains( absCharge ) ) {
          description = value.description;
          break;
        }
      }

      assert && assert( description, 'no relative description found for charge value, check value or entries in description map' );
      return description;
    },

    /**
     * For a given charge, get the described range. Useful for comparing ranges before and after
     * a charge pickup. Descriptions are generated relative to the absolute value of the charge.
     * 
     * @param  {number} charge
     * @return {Range}
     */
    getDescribedChargeRange: function( charge ) {

      var describedCharge = Math.abs( charge );
      var keys = Object.keys( RELATIVE_CHARGE_DESCRIPTION_MAP );

      var range;
      for ( var i = 0; i < keys.length; i++ ) {
        var value = RELATIVE_CHARGE_DESCRIPTION_MAP[ keys[ i ] ];
        if ( value.range.contains( describedCharge ) ) {
          range = value.range;
          break;
        }
      }

      assert && assert( range, 'no charge range found for charge ' + charge );
      return range;
    },

    /**
     * Get a direction description from one of BalloonDirectionEnum. Something like down', or 'up and to the left'.
     * @public
     *
     * @param {string} direction - one of BalloonDirectionEnum
     * @return {string}
     */
    getDirectionDescription: function( direction )  {
      return DIRECTION_MAP[ direction ];
    },

    /**
     * Get a description of the net charge for each balloon, including the label 'Each balloon'. Will return something
     * like
     * "Each balloon has negative net charge." or
     * "Each balloon has zero net charge."
     *
     * @return {string}
     */
    getNetChargeDescriptionWithLabel: function( charge ) {
      var chargeAmountString = charge < 0 ? negativeString : zeroString;
      return StringUtils.fillIn( balloonNetChargePatternStringWithLabel, {
        chargeAmount: chargeAmountString,
        balloon: eachBalloonString
      } );
    },

    /**
     * Get a description for the charges shown when the object is neutral. When neutral, the object will either be
     * showing no charges, or showing "{{many}} pairs of negative and positive charges". Will return something like
     *
     * "no charges shown" or
     * "showing many pairs of positive and negative charges"
     *
     * @param {string} chargesShown
     * @param {number} numberOfCharges
     * @return {string}
     */
    getNeutralChargesShownDescription: function( chargesShown, numberOfCharges ) {
      var description;

      var relativeCharge = BASEDescriber.getRelativeChargeDescription( numberOfCharges );
      if ( chargesShown === 'all' )  {
        description = StringUtils.fillIn( summaryNeutralChargesPatternString, {
          amount: relativeCharge
        } );
      }
      else {
        description = showingNoChargesString;
      }

      return description;
    },

    RELATIVE_CHARGE_DESCRIPTION_MAP: RELATIVE_CHARGE_DESCRIPTION_MAP
  } );
} );

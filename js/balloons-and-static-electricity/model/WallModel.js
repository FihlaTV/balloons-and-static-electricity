// Copyright 2013-2019, University of Colorado Boulder

/**
 * Model of a wall. Wall have electrons which can change position under force from balloons.
 *
 * @author Vasily Shakhov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const BalloonModel = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/model/BalloonModel' );
  const balloonsAndStaticElectricity = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloonsAndStaticElectricity' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MovablePointChargeModel = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/model/MovablePointChargeModel' );
  const PointChargeModel = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/model/PointChargeModel' );
  const Utils = require( 'DOT/Utils' );
  const Vector2 = require( 'DOT/Vector2' );
  const Bounds2 = require( 'DOT/Bounds2' );

  // constants
  // when charge displacement is larger than this, there is an appreciable induced charge
  const FORCE_MAGNITUDE_THRESHOLD = 2;

  /**
   * @constructor
   * @param {number} x
   * @param {number} width
   * @param {number} height
   * @param {Balloon} yellowBalloon
   * @param {Balloon} greenBalloon
   * @param {Tandem} tandem
   */
  function WallModel( x, width, height, yellowBalloon, greenBalloon, tandem ) {

    //------------------------------------------------
    // Properties of the model.  All user settings belong in the model, whether or not they are part of the physical model
    this.isVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'isVisibleProperty' )
    } );

    // @public (read-only)
    this.y = 0; // the top position of the wall
    this.x = x; // the left position of the wall
    this.numX = 3; // number of columns with charges
    this.numY = 18; // number of rows with charges
    this.width = width;
    this.height = height;

    // @public {Bounds2} bounds containing the wall
    this.bounds = new Bounds2( this.x, this.y, this.x + width, this.y + height );

    // @private {number} - scaling factors for calculating positions for induced charge
    this.dx = Utils.roundSymmetric( width / this.numX + 2 );
    this.dy = height / this.numY;

    // @private {array.<PointChargeModel>}
    this.plusCharges = [];
    const plusChargesTandemGroup = tandem.createGroupTandem( 'plusCharges' );

    // @private {array.<MovablePointChargeModel>}
    this.minusCharges = [];
    const minusChargesTandemGroup = tandem.createGroupTandem( 'minusCharges' );

    for ( let i = 0; i < this.numX; i++ ) {
      for ( let k = 0; k < this.numY; k++ ) {

        //plus
        const position = this.calculatePosition( i, k );
        const plusCharge = new PointChargeModel( x + position[ 0 ], position[ 1 ], plusChargesTandemGroup.createNextTandem(), false );
        this.plusCharges.push( plusCharge );

        //minus
        const minusCharge = new MovablePointChargeModel(
          x + position[ 0 ] - PointChargeModel.RADIUS,
          position[ 1 ] - PointChargeModel.RADIUS,
          minusChargesTandemGroup.createNextTandem(),
          false
        );
        this.minusCharges.push( minusCharge );
      }
    }

    const self = this;
    const updateChargePositions = function() {

      // value for k for calculating forces, chosen so that motion of the balloon looks like Java version
      const k = 10000;

      // calculate force from Balloon to each charge in the wall, we subtract by the PointChargeModel radius
      // to make the force look correct because each charge is minus charge is shifted down by that much initially
      self.minusCharges.forEach( function( entry ) {
        const ch = entry;
        let dv1 = new Vector2( 0, 0 );
        let dv2 = new Vector2( 0, 0 );

        const defaultPosition = ch.positionProperty.initialValue;
        if ( yellowBalloon.isVisibleProperty.get() ) {
          dv1 = BalloonModel.getForce(
            defaultPosition,
            yellowBalloon.getChargeCenter().minusXY( 0, 2 * PointChargeModel.RADIUS ),
            k * PointChargeModel.CHARGE * yellowBalloon.chargeProperty.get(),
            2.35
          );
        }
        if ( greenBalloon.isVisibleProperty.get() ) {
          dv2 = BalloonModel.getForce(
            defaultPosition,
            greenBalloon.getChargeCenter().minusXY( 0, 2 * PointChargeModel.RADIUS ),
            k * PointChargeModel.CHARGE * greenBalloon.chargeProperty.get(),
            2.35
          );
        }
        entry.positionProperty.set(
          new Vector2( defaultPosition.x + dv1.x + dv2.x, defaultPosition.y + dv1.y + dv2.y )
        );
      } );
    };
    yellowBalloon.positionProperty.link( updateChargePositions );
    greenBalloon.positionProperty.link( updateChargePositions );
    yellowBalloon.isVisibleProperty.link( updateChargePositions );
    greenBalloon.isVisibleProperty.link( updateChargePositions );
    yellowBalloon.chargeProperty.link( updateChargePositions );
    greenBalloon.chargeProperty.link( updateChargePositions );

    // if a balloon was stuck to the wall and visible when the wall becomes invisible, we need to
    // notify that the balloon was released by reseting the timer
    const balloons = [ yellowBalloon, greenBalloon ];
    this.isVisibleProperty.link( function( isVisible ) {
      if ( !isVisible ) {
        for ( let i = 0; i < balloons.length; i++ ) {
          const balloon = balloons[ i ];
          if ( balloon.isVisibleProperty.get() && balloon.rightAtWallPosition() && balloon.isCharged() ) {
            balloon.timeSinceRelease = 0;
          }
        }
      }
    } );
  }

  balloonsAndStaticElectricity.register( 'WallModel', WallModel );

  return inherit( Object, WallModel, {

    // Reset the entire model
    reset: function() {

      //Reset the properties in this model
      this.isVisibleProperty.reset();
      this.minusCharges.forEach( function( entry ) {
        entry.reset();
      } );
    },

    /**
     * Function that will place charges on wall's grid.
     *
     * @param {number} i - column number
     * @param {number} k - row number
     *
     * @returns {Array.<number>} - an array containing the x and y values for the charge
     */
    calculatePosition: function( i, k ) {
      const y0 = i % 2 === 0 ? this.dy / 2 : 1;
      return [ i * this.dx + PointChargeModel.RADIUS + 1, k * this.dy + y0 ];
    },

    /**
     * Get the minus charge that is the closest in the wall to the balloon, relative to the charge's initial
     * position.
     *
     * @returns {MovablePointChargeModel}
     */
    getClosestChargeToBalloon: function( balloon ) {
      const minusCharges = this.minusCharges;

      // get the minus charge that is closest to the balloon
      let closestCharge = null;
      let chargeDistance = Number.POSITIVE_INFINITY;
      const balloonChargeCenter = balloon.getChargeCenter();

      for ( let i = 0; i < minusCharges.length; i++ ) {
        var charge = minusCharges[ i ];
        const newChargeDistance = charge.positionProperty.initialValue.distance( balloonChargeCenter );

        if ( newChargeDistance < chargeDistance ) {
          chargeDistance = newChargeDistance;
          closestCharge = charge;
        }
      }
      assert && assert( charge, 'Unable to find charge closest to balloon' );

      return closestCharge;
    },

    /**
     * Return whether or not the force applied to this charge indicates that charge is being induced. Determined by
     * inspection.
     * @public
     *
     * @param {Vector2} force - force applied on this charge
     * @returns {boolean}
     */
    forceIndicatesInducedCharge: function( force ) {
      return force.magnitude > FORCE_MAGNITUDE_THRESHOLD;
    }
  } );
} );

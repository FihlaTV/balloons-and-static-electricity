// Copyright 2017-2019, University of Colorado Boulder

/**
 * A single point change, which has a location.  These charges are meant to move dynamically, and
 * include an observable location.  If the charge does not need to move, use PointChargeModel.
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const balloonsAndStaticElectricity = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloonsAndStaticElectricity' );
  const inherit = require( 'PHET_CORE/inherit' );
  const PointChargeModel = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/model/PointChargeModel' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );

  /**
   * @constructor
   * @param {number} x
   * @param {number} y
   * @param {Tandem} tandem
   * @param {boolean} phetioState
   */
  function MovablePointChargeModel( x, y, tandem, phetioState ) {

    PointChargeModel.call( this, x, y, tandem, phetioState );

    // @public {Vector2} - location of the point charge
    this.locationProperty = new Vector2Property( this.location, {
      tandem: tandem.createTandem( 'locationProperty' ),
      phetioState: phetioState,
      useDeepEquality: true
    } );
  }

  balloonsAndStaticElectricity.register( 'MovablePointChargeModel', MovablePointChargeModel );

  inherit( PointChargeModel, MovablePointChargeModel, {

    /**
     * Reset the point charge.
     *
     * @override
     */
    reset: function() {
      PointChargeModel.prototype.reset.call( this );
      this.locationProperty.reset();
    },

    /**
     * Get the displacement of the charge from its initial position. Useful as a measure of the induced charge.
     *
     * @returns {Vector2}
     */
    getDisplacement: function() {
      var initialPosition = this.locationProperty.initialValue;
      var displacement = this.locationProperty.get().distance( initialPosition );

      return displacement;
    },

    /**
     * Get the center of the charge.
     *
     * @returns {Vector2}
     * @override
     */
    getCenter: function() {
      return new Vector2( this.locationProperty.get().x + this.radius, this.locationProperty.get().y + this.radius );
    }
  } );

  return MovablePointChargeModel;
} );

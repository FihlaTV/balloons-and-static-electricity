// Copyright 2013-2015, University of Colorado Boulder

/**
 * Point charge model. Each charge have location.
 * @author Vasily Shakhov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var balloonsAndStaticElectricity = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloonsAndStaticElectricity' );

  function PointChargeModel( x, y ) {

    //------------------------------------------------
    // Model Properties
    
    // @public {Vector2} - location of the point charge
    this.locationProperty = new Property ( new Vector2( 0, 0 ) );

    // @public (read-only)
    this.defaultLocation = new Vector2( x, y );
    this.reset();

    // @public - whether or not the charge has been moved from sweater to balloon
    this.moved = false;
  }

  PointChargeModel.radius = 8;

  //1,754 = 100/57 - to get relevant to original java model, where we have 100 sweater's charges (in this model only 57 )
  PointChargeModel.charge = -1.754;

  balloonsAndStaticElectricity.register( 'PointChargeModel', PointChargeModel );

  inherit( Object, PointChargeModel, {
    reset: function() {
      this.locationProperty.set( this.defaultLocation.copy() );
      this.moved = false;
    },
    getCenter: function() {
      return new Vector2( this.locationProperty.get().x + this.radius, this.locationProperty.get().y + this.radius );
    }
  } );

  return PointChargeModel;
} );

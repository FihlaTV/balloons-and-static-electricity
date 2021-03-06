// Copyright 2018-2019, University of Colorado Boulder

/**
 * Tests for screen summary descriptions for balloons-and-static-electricity. These descriptions are invisible, but
 * available for screen reader users.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BASEModel = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/model/BASEModel' );
  const BASEView = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/BASEView' );
  const PlayAreaMap = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/model/PlayAreaMap' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Vector2 = require( 'DOT/Vector2' );
  const WallDescriber = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/describers/WallDescriber' );
  const WallNode = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/WallNode' );

  QUnit.module( 'WallDescriberTests' );

  // create model and view for testing
  const model = new BASEModel( 768, 504, Tandem.ROOT.createTandem( 'model' ) );
  const view = new BASEView( model, Tandem.ROOT.createTandem( 'view' ) );

  QUnit.test( 'WallDescriber tests', function( assert ) {

    // create a view
    const wallNode = new WallNode( model, view.layoutBounds, Tandem.ROOT.createTandem( 'wallNode' ) );

    // on page load
    let actualDescription = wallNode.descriptionContent;
    let expectedDescription = 'At right edge of Play Area. Has zero net charge, many pairs of negative and positive charges.';
    assert.equal( actualDescription, expectedDescription );

    // yellow balloon neutral at wall, all charges shown
    model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
    actualDescription = wallNode.descriptionContent;
    expectedDescription = 'At right edge of Play Area. Has zero net charge, many pairs of negative and positive charges.';
    assert.equal( actualDescription, expectedDescription );

    // yellow balloon inducing charge in upper wall, all charges shown
    model.yellowBalloon.chargeProperty.set( -10 );
    model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP + 1 ) );
    WallDescriber.getWallChargeDescription( model.yellowBalloon, model.greenBalloon, model.balloonsAdjacentProperty.get(), model.wall.isVisibleProperty.get(), 'all' );
    actualDescription = wallNode.descriptionContent;
    expectedDescription = 'At right edge of Play Area. Has zero net charge, many pairs of negative and positive charges. '  +
                          'Negative charges in upper wall move away from Yellow Balloon a little bit. Positive charges do not move.';
    assert.equal( actualDescription, expectedDescription );


    // both balloons inducing a charge in upper wall
    model.greenBalloon.chargeProperty.set( -10 );
    model.greenBalloon.isVisibleProperty.set( true );
    model.greenBalloon.setCenter( model.yellowBalloon.getCenter() );
    actualDescription = wallNode.descriptionContent;
    expectedDescription = 'At right edge of Play Area. Has zero net charge, many pairs of negative and positive charges. '  +
                          'Negative charges in upper wall move away from balloons a lot. Positive charges do not move.';
    assert.equal( actualDescription, expectedDescription );

    // both balloons inducing charge in upper wall, no charges shown
    model.showChargesProperty.set( 'none' );
    actualDescription = wallNode.descriptionContent;
    expectedDescription = 'At right edge of Play Area.';
    assert.equal( actualDescription, expectedDescription );

    // both balloons inducing charge in upper wall, charge differences shown
    model.showChargesProperty.set( 'diff' );
    actualDescription = wallNode.descriptionContent;
    expectedDescription = 'At right edge of Play Area. Has zero net charge, showing no charges.';
    assert.equal( actualDescription, expectedDescription );
  } );
} );
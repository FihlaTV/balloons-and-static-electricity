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
  const BASEConstants = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/BASEConstants' );
  const BASEModel = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/model/BASEModel' );
  const SweaterNode = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/SweaterNode' );
  const Tandem = require( 'TANDEM/Tandem' );

  QUnit.module( 'SweaterDescriberTests' );

  // create model and view for testing
  const model = new BASEModel( 768, 504, Tandem.ROOT.createTandem( 'model' ) );

  // create a wallNode for testing
  const sweaterNode = new SweaterNode( model, Tandem.ROOT.createTandem( 'sweaterNode' ) );
  
  QUnit.test( 'SweaterDescriber tests', function( assert ) {

    // on load
    let actualDescription = sweaterNode.descriptionContent;
    let expectedDescription = 'At left edge of Play Area. Has zero net charge, no more positive charges than negative charges.';
    assert.equal( actualDescription, expectedDescription );

    // all charges shown, several positive charges
    model.sweater.chargeProperty.set( 30 );
    actualDescription = sweaterNode.descriptionContent;
    expectedDescription = 'At left edge of Play Area. Has positive net charge, several more positive charges than negative charges.';
    assert.equal( actualDescription, expectedDescription );

    // all charges shown, no more negative charges
    model.sweater.chargeProperty.set( BASEConstants.MAX_BALLOON_CHARGE );
    actualDescription = sweaterNode.descriptionContent;
    expectedDescription = 'At left edge of Play Area. Has positive net charge, no more negative charges, only positive charges.';
    assert.equal( actualDescription, expectedDescription );

    // no charges shown
    model.showChargesProperty.set( 'none' );
    actualDescription = sweaterNode.descriptionContent;
    expectedDescription = 'At left edge of Play Area.';
    assert.equal( actualDescription, expectedDescription );

    // neutral sweater, showing charge differences
    model.reset();
    model.showChargesProperty.set( 'diff' );
    actualDescription = sweaterNode.descriptionContent;
    expectedDescription = 'At left edge of Play Area. Has zero net charge, showing no charges.';
    assert.equal( actualDescription, expectedDescription );

    // several more positive charges than negative charges, showing charge differences
    model.sweater.chargeProperty.set( 30 );
    actualDescription = sweaterNode.descriptionContent;
    expectedDescription = 'At left edge of Play Area. Has positive net charge, showing several positive charges.';
    assert.equal( actualDescription, expectedDescription );

    // all negative charges removed, showing charge differences
    model.sweater.chargeProperty.set( BASEConstants.MAX_BALLOON_CHARGE );
    actualDescription = sweaterNode.descriptionContent;
    expectedDescription = 'At left edge of Play Area. Has positive net charge, showing all positive charges.';
    assert.equal( actualDescription, expectedDescription );
  } );
} );
// Copyright 2015, University of Colorado Boulder

/**
 * An accessible switch node.  The type has a child ABSwitch, but extends AccessibleNode for accessibility
 * behavior.  AccessibleNode could be added to Node, and that would be unecessary.
 *
 * @author: Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var AccessibleNode = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/accessibility/AccessibleNode' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var balloonsAndStaticElectricity = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloonsAndStaticElectricity' );

  /**
   * Constructor.
   *
   * @param {number} x
   * @param {number} y
   * @param {BalloonModel} model
   * @param {Image} imgsrc
   * @param {BalloonsAndStaticElectricityModel} globalModel
   * @param {object} options
   * @constructor
   **/
  function AccessibleABSwitchNode( property, valueA, labelA, valueB, labelB, options ) {

    var self = this;

    options = _.extend( {
      type: 'input',
      inputType: 'checkbox',
      parentContainerType: 'div', // container for this dom element and peer elements
      label: '', // TODO: contain in a literal <label> element,
      useLabelElement: true,
      description: '', // ???
      events: [
        {
          eventName: 'click',
          eventFunction: function( event ) {
            // toggle the value on click event
            var pressed = property.value === valueA ? valueB : valueA;
            property.set( pressed );

            // toggle the aria-checked value, checked when valueB selected
            self.setAttribute( 'aria-checked', pressed === valueB );
          }
        }
      ],
      ariaRole: 'switch',
      ariaAttributes: [
        {
          attribute: 'aria-checked',
          value: false
        }
      ]

    }, options );

    var switchNode = new ABSwitch( property, valueA, labelA, valueB, labelB, options );

    var peerBounds = switchNode.bounds;

    // create the accesssible content
    AccessibleNode.call( this, peerBounds, options );

    // add the view element as a child
    this.addChild( switchNode );

  }

  balloonsAndStaticElectricity.register( 'AccessibleABSwitchNode', AccessibleABSwitchNode );

  return inherit( AccessibleNode, AccessibleABSwitchNode );

} );

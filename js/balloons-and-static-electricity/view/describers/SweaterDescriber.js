// Copyright 2017-2019, University of Colorado Boulder

/**
 * A view type that presents the accessibility descriptions for the Sweater.
 *
 * @author Jesse Greenberg
 */

define( require => {
  'use strict';

  // modules
  const BalloonDirectionEnum = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/model/BalloonDirectionEnum' );
  const BalloonModel = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/model/BalloonModel' );
  const balloonsAndStaticElectricity = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloonsAndStaticElectricity' );
  const BASEA11yStrings = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/BASEA11yStrings' );
  const BASEConstants = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/BASEConstants' );
  const BASEDescriber = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/describers/BASEDescriber' );
  const inherit = require( 'PHET_CORE/inherit' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  const sweaterPositionString = BASEA11yStrings.sweaterPosition.value;
  const zeroString = BASEA11yStrings.zero.value;
  const manyString = BASEA11yStrings.many.value;
  const allString = BASEA11yStrings.all.value;
  const positiveString = BASEA11yStrings.positive.value;
  const sweaterDescriptionPatternString = BASEA11yStrings.sweaterDescriptionPattern.value;
  const sweaterRelativeChargeAllPatternString = BASEA11yStrings.sweaterRelativeChargeAllPattern.value;
  const sweaterRelativeChargeDifferencesPatternString = BASEA11yStrings.sweaterRelativeChargeDifferencesPattern.value;
  const sweaterNoMoreChargesString = BASEA11yStrings.sweaterNoMoreCharges.value;
  const sweaterNetChargePatternString = BASEA11yStrings.sweaterNetChargePattern.value;
  const sweaterChargePatternString = BASEA11yStrings.sweaterChargePattern.value;
  const showingNoChargesString = BASEA11yStrings.showingNoCharges.value;
  const sweaterHasRelativeChargePatternString = BASEA11yStrings.sweaterHasRelativeChargePattern.value;
  const sweaterHasNetChargeShowingPatternString = BASEA11yStrings.sweaterHasNetChargeShowingPattern.value;
  const moreChargesPatternString = BASEA11yStrings.moreChargesPattern.value;
  const moreChargesFurtherPatternString = BASEA11yStrings.moreChargesFurtherPattern.value;
  const morePairsOfChargesString = BASEA11yStrings.morePairsOfCharges.value;
  const sweaterLabelString = BASEA11yStrings.sweaterLabel.value;
  const moreHiddenPairsOfChargesString = BASEA11yStrings.moreHiddenPairsOfCharges.value;
  const positiveNetChargeString = BASEA11yStrings.positiveNetCharge.value;
  const neutralNetChargeString = BASEA11yStrings.neutralNetCharge.value;
  const summaryObjectHasChargePatternString = BASEA11yStrings.summaryObjectHasChargePattern.value;
  const sweaterRelativeChargePatternString = BASEA11yStrings.sweaterRelativeChargePattern.value;
  const summaryObjectChargePatternString = BASEA11yStrings.summaryObjectChargePattern.value;
  const summaryNeutralChargesPatternString = BASEA11yStrings.summaryNeutralChargesPattern.value;
  const sweaterShowingPatternString = BASEA11yStrings.sweaterShowingPattern.value;
  const showingAllPositiveChargesString = BASEA11yStrings.showingAllPositiveCharges.value;
  const singleStatementPatternString = BASEA11yStrings.singleStatementPattern.value;

  /**
   * Manages all descriptions relating to the sweater.
   *
   * @param {BASEModel} model
   * @param {Sweater} sweaterModel
   */
  function SweaterDescriber( model, sweaterModel ) {
    this.model = model;
    this.sweaterModel = sweaterModel;
  }

  balloonsAndStaticElectricity.register( 'SweaterDescriber', SweaterDescriber );

  return inherit( Object, SweaterDescriber, {

    /**
     * Get the descrition of the sweater, which includes its position in the play area, its net charge, and its
     * relative proportion of positive and negative charges.  Will be dependent on what charges are visible.
     * "At left edge of Play Area. Has positive net charge, a few more positive charges than negative charges." or
     * "At left edge of Play Area. Has positive net charge, showing all positive charges." or
     * "At left edge of Play Area. Has positive net charge, no more negative charges, only positive charges." or
     * "At left edge of Play Area. Has positive net charge, several more positive charges than negative charges."
     *
     * @param {Property.<string>} showCharges
     * @returns {string}
     */
    getSweaterDescription: function( showCharges ) {

      // if we are not showing any charges, just return a description for the position
      if ( showCharges === 'none' ) {
        return sweaterPositionString;
      }

      // relative charge like "no" or "several"
      const sweaterCharge = this.sweaterModel.chargeProperty.get();
      const relativeChargeString = BASEDescriber.getRelativeChargeDescription( sweaterCharge );

      // assemble net charge string, like "Has zero net charge"
      const netChargeString = StringUtils.fillIn( sweaterNetChargePatternString, {
        netCharge: sweaterCharge > 0 ? positiveString : zeroString
      } );

      let chargeString;
      if ( showCharges === 'all' ) {

        // special case - if sweater is totally out of charges, say "no more negative charges, only positive charges""
        if ( sweaterCharge === BASEConstants.MAX_BALLOON_CHARGE ) {
          chargeString = sweaterNoMoreChargesString;
        }
        else {
          chargeString = StringUtils.fillIn( sweaterRelativeChargeAllPatternString, {
            charge: relativeChargeString
          } );
        }
      }
      else {

        if ( sweaterCharge === 0 ) {

          // special case - if sweater has neutral charge, just say "showing no charges"
          chargeString = showingNoChargesString;
        }
        else if ( sweaterCharge === BASEConstants.MAX_BALLOON_CHARGE ) {

          // special case - if sweater is out of  charges, say "showing all positive charges"
          chargeString = showingAllPositiveChargesString;
        }
        else {
          chargeString = StringUtils.fillIn( sweaterRelativeChargeDifferencesPatternString, {
            charge: relativeChargeString
          } );
        }
      }

      // description for charge
      chargeString = StringUtils.fillIn( sweaterChargePatternString, {
        netCharge: netChargeString,
        relativeCharge: chargeString
      } );

      // full description,  without punctuation
      const description = StringUtils.fillIn( sweaterDescriptionPatternString, {
        position: sweaterPositionString,
        charge: chargeString
      } );

      return StringUtils.fillIn( singleStatementPatternString, {
        statement: description
      } );
    }
  }, {

    /**
     * Get a description of the relative charge of the sweater, including the label. Dependent on
     * what charges are visible in the view. This will form a full sentence. Will produce something like
     *
     * "Sweater has several more positive charges than negative charges." or
     * "Sweater has positive net charge, showing several positive charges." or
     * "Sweater has no more negative charges, only positive charges."
     *
     * @param  {number} charge
     * @param  {string} shownCharges
     * @returns {string}
     */
    getRelativeChargeDescriptionWithLabel: function( charge, shownCharges ) {
      let description;

      // the relative charge on the sweater, something like 'several' or 'many'
      const absCharge = Math.abs( charge );
      const relative = SweaterDescriber.getRelativeChargeDescription( absCharge );

      if ( shownCharges === 'all' ) {
        if ( absCharge === BASEConstants.MAX_BALLOON_CHARGE ) {

          // if no more charges remaining on sweater, special description like "no more negative charges, only positive"
          description = StringUtils.fillIn( sweaterHasRelativeChargePatternString, {
            relativeCharge: sweaterNoMoreChargesString
          } );
        }
        else {

          // else something like "Sweater has several more positive charges than negative charges"
          const relativeChargeString = StringUtils.fillIn( sweaterRelativeChargeAllPatternString, {
            charge: relative
          } );

          description = StringUtils.fillIn( sweaterHasRelativeChargePatternString, {
            relativeCharge: relativeChargeString
          } );
        }
      }
      else if ( shownCharges === 'diff' ) {
        const showingString = StringUtils.fillIn( sweaterRelativeChargeDifferencesPatternString, {
          charge: relative
        } );

        description = StringUtils.fillIn( sweaterHasNetChargeShowingPatternString, {
          showing: showingString
        } );
      }

      return description;
    },

    /**
     * Get the relative charge on the sweater.  Usually just returns the relative description
     * from BASEDescriber, but if all charges are gone, the sweater uses a special
     * word to indicate this.
     *
     * @param {number} charge
     * @returns {string}
     */
    getRelativeChargeDescription: function( charge ) {

      if ( charge === BASEConstants.MAX_BALLOON_CHARGE ) {
        return allString;
      }
      else {
        return BASEDescriber.getRelativeChargeDescription( charge );
      }
    },

    /**
     * Get an alert describing the sweater when it runs out of charges.  Dependent on the
     * charge visibility.
     *
     * @param  {string} shownCharges
     * @returns {string}
     */
    getNoMoreChargesAlert: function( charge, shownCharges ) {
      let alert;
      if ( shownCharges === 'all' ) {
        alert = StringUtils.fillIn( sweaterHasRelativeChargePatternString, {
          relativeCharge: sweaterNoMoreChargesString
        } );
      }
      else if ( shownCharges === 'diff' ) {
        alert = SweaterDescriber.getRelativeChargeDescriptionWithLabel( charge, shownCharges );
      }

      return alert;
    },

    /**
     * Get a description of the net charge of the sweater, will return either
     * "Sweater has positive net charge." or
     * "Sweater has neutral net charge."
     *
     * @param {number} sweaterCharge
     * @returns {string}
     */
    getNetChargeDescription: function( sweaterCharge ) {
      const relativeChargeString = ( sweaterCharge === 0 ) ? neutralNetChargeString : positiveNetChargeString;
      return StringUtils.fillIn( sweaterHasRelativeChargePatternString, {
        relativeCharge: relativeChargeString
      } );
    },

    /**
     * Get a description that includes information about where additional charges are on the sweater. This is
     * dependent on charge visibility setting. Will return something like
     * "More pairs of charges up and to the left". or
     * "More pairs of hidden charges down".
     * @public
     *
     * @param {BalloonModel} balloon
     * @param {string} shownCharges
     * @returns {string}
     */
    getMoreChargesDescription: function( balloon, sweaterCharge, sweaterCharges, shownCharges ) {
      assert && assert( sweaterCharge < BASEConstants.MAX_BALLOON_CHARGE, 'no more charges on sweater' );
      assert && assert( shownCharges !== 'none', 'this description should not be used when no charges are shown' );

      // get the next charge to describe
      let charge;
      for ( let i = 0; i < sweaterCharges.length; i++ ) {
        charge = sweaterCharges[ i ];
        if ( !charge.movedProperty.get() ) {
          break;
        }
      }

      // get the description of the direction to the closest charge
      const direction = BalloonModel.getDirection( charge.position, balloon.getCenter() );
      const directionDescription = BASEDescriber.getDirectionDescription( direction );

      const patternString = BalloonDirectionEnum.isRelativeDirection( direction ) ? moreChargesFurtherPatternString : moreChargesPatternString;

      let moreChargesString;
      if ( shownCharges === 'all' ) {
        moreChargesString = morePairsOfChargesString;
      }
      else if ( shownCharges === 'diff' ) {
        moreChargesString = moreHiddenPairsOfChargesString;
      }

      return StringUtils.fillIn( patternString, {
        moreCharges: moreChargesString,
        direction: directionDescription
      } );
    },

    /**
     * Get a description of the sweater's charge for the screen summary. Will return something like
     * "Sweater has positive net charge, a few more positive charges than negative charges."
     * "Sweater has positive net charge, showing a few positive charges."
     * "Sweater has zero net charge, many pairs of positive and negative charges."
     * "Sweater has zero net charge, showing no charges."
     *
     * @returns {string}
     */
    getSummaryChargeDescription: function( chargesShown, charge ) {

      // description of the sweater object, like "Sweater has zero net charge"
      const chargeSignString = charge > 0 ? positiveString : zeroString;
      const sweaterObjectString = StringUtils.fillIn( summaryObjectHasChargePatternString, {
        object: sweaterLabelString,
        charge: chargeSignString
      } );

      // description of the charges shown, like 'a few more positive charges than negative charges'
      let chargeString;
      const relativeChargeString = BASEDescriber.getRelativeChargeDescription( charge );
      if ( chargesShown === 'all' ) {
        chargeString = ( charge === 0 ) ?
                       StringUtils.fillIn( summaryNeutralChargesPatternString, { amount: manyString } ) :
                       StringUtils.fillIn( sweaterRelativeChargePatternString, { charge: relativeChargeString } );
      }
      else if ( chargesShown === 'diff' ) {
        chargeString = ( charge === 0 ) ?
                       showingNoChargesString :
                       chargeString = StringUtils.fillIn( sweaterShowingPatternString, { charge: relativeChargeString } );
      }

      return StringUtils.fillIn( summaryObjectChargePatternString, {
        object: sweaterObjectString,
        charge: chargeString
      } );
    }
  } );
} );

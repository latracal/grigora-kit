<?php
/**
 * Return a complete css for specific countdown block.
 *
 * @package grigora-kit
 */

if ( ! function_exists( 'ga_generate_css_countdown' ) ) {
	/**
	 * Return a complete css for specific countdown block.
	 *
	 * @param array $attributes Block Attributes.
	 */
	function ga_generate_css_countdown( $attributes ) {
		if ( isset( $attributes['id'] ) ) {

				$css = '.block-id-' . $attributes['id'] . ' {';
				$css = $css . 'display: flex;';

			if ( isset( $attributes['align'] ) ) {
				$css = $css . sprintf( 'justify-content: %s;', $attributes['align'] );
			}
			if ( isset( $attributes['layoutPadding'] ) ) {
				if ( isset( $attributes['layoutPadding']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['layoutPadding']['left'] );
				}
				if ( isset( $attributes['layoutPadding']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['layoutPadding']['right'] );
				}
				if ( isset( $attributes['layoutPadding']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['layoutPadding']['top'] );
				}
				if ( isset( $attributes['layoutPadding']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['layoutPadding']['bottom'] );
				}
			}
			if ( isset( $attributes['layoutMargin'] ) ) {
				if ( isset( $attributes['layoutMargin']['left'] ) ) {
					$css = $css . sprintf( 'margin-left: %s;', $attributes['layoutMargin']['left'] );
				}
				if ( isset( $attributes['layoutMargin']['right'] ) ) {
					$css = $css . sprintf( 'margin-right: %s;', $attributes['layoutMargin']['right'] );
				}
				if ( isset( $attributes['layoutMargin']['top'] ) ) {
					$css = $css . sprintf( 'margin-top: %s;', $attributes['layoutMargin']['top'] );
				}
				if ( isset( $attributes['layoutMargin']['bottom'] ) ) {
					$css = $css . sprintf( 'margin-bottom: %s;', $attributes['layoutMargin']['bottom'] );
				}
			}

				$css = $css . '}';

			$css = $css . '.block-id-' . $attributes['id'] . ' .days, .block-id-' . $attributes['id'] . ' .hours, .block-id-' . $attributes['id'] . ' .minutes, .block-id-' . $attributes['id'] . ' .seconds, .block-id-' . $attributes['id'] . ' .prefix, .block-id-' . $attributes['id'] . ' .suffix, .block-id-' . $attributes['id'] . ' .divider {';

			if ( isset( $attributes['typoSize'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSize'] );
			}
			if ( isset( $attributes['typoWeight'] ) ) {
				$css = $css . sprintf( 'font-weight: %s;', $attributes['typoWeight'] );
			}
			if ( isset( $attributes['typoTransform'] ) ) {
				$css = $css . sprintf( 'text-transform: %s;', $attributes['typoTransform'] );
			}
			if ( isset( $attributes['typoStyle'] ) ) {
				$css = $css . sprintf( 'font-style: %s;', $attributes['typoStyle'] );
			}
				$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoLineHeight'] ) && ( 'normal' !== $attributes['typoLineHeight'] ) ) ? $attributes['typoLineHeight'] . 'px' : 'normal' );
				$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoLetterSpacing'] ) && ( 'normal' !== $attributes['typoLetterSpacing'] ) ) ? $attributes['typoLetterSpacing'] . 'px' : 'normal' );
				$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoWordSpacing'] ) && ( 'normal' !== $attributes['typoWordSpacing'] ) ) ? $attributes['typoWordSpacing'] . 'px' : 'normal' );

			// Number Style starts here.

			if ( isset( $attributes['effectNColorNumber'] ) && $attributes['effectNColorNumber'] ) {
				$css = $css . sprintf( 'color: %s;', $attributes['effectNColorNumber'] );
			}
			if ( isset( $attributes['textShadowHorizontalNumber'] ) ||
					isset( $attributes['textShadowVerticalNumber'] ) ||
					isset( $attributes['textShadowBlurNumber'] ) ||
					isset( $attributes['textShadowColorNumber'] )
				) {
				$css = $css . sprintf(
					'text-shadow: %s %s %s %s;',
					( isset( $attributes['textShadowHorizontalNumber'] ) ? $attributes['textShadowHorizontalNumber'] : '0px' ),
					( isset( $attributes['textShadowVerticalNumber'] ) ? $attributes['textShadowVerticalNumber'] : '0px' ),
					( isset( $attributes['textShadowBlurNumber'] ) ? $attributes['textShadowBlurNumber'] : '0px' ),
					( isset( $attributes['textShadowColorNumber'] ) ? $attributes['textShadowColorNumber'] : '#000' )
				);
			}

				$css = $css . '}';

				// Label Style starts here.
				$css = $css . '.block-id-' . $attributes['id'] . ' .label, .block-id-' . $attributes['id'] . ' .completed{ ';

			if ( isset( $attributes['typoLSize'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoLSize'] );
			}
			if ( isset( $attributes['typoLWeight'] ) ) {
				$css = $css . sprintf( 'font-weight: %s;', $attributes['typoLWeight'] );
			}
			if ( isset( $attributes['typoLTransform'] ) ) {
				$css = $css . sprintf( 'text-transform: %s;', $attributes['typoLTransform'] );
			}
			if ( isset( $attributes['typoLStyle'] ) ) {
				$css = $css . sprintf( 'font-style: %s;', $attributes['typoLStyle'] );
			}
					$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoLLineHeight'] ) && ( 'normal' !== $attributes['typoLLineHeight'] ) ) ? $attributes['typoLLineHeight'] . 'px' : 'normal' );
					$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoLLetterSpacing'] ) && ( 'normal' !== $attributes['typoLLetterSpacing'] ) ) ? $attributes['typoLLetterSpacing'] . 'px' : 'normal' );
					$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoLWordSpacing'] ) && ( 'normal' !== $attributes['typoLWordSpacing'] ) ) ? $attributes['typoLWordSpacing'] . 'px' : 'normal' );

			if ( isset( $attributes['effectNColorLabel'] ) && $attributes['effectNColorLabel'] ) {
				$css = $css . sprintf( 'color: %s;', $attributes['effectNColorLabel'] );
			}
			if ( isset( $attributes['textShadowHorizontalLabel'] ) ||
						isset( $attributes['textShadowVerticalLabel'] ) ||
						isset( $attributes['textShadowBlurLabel'] ) ||
						isset( $attributes['textShadowColorLabel'] )
					) {
				$css = $css . sprintf(
					'text-shadow: %s %s %s %s;',
					( isset( $attributes['textShadowHorizontalLabel'] ) ? $attributes['textShadowHorizontalLabel'] : '0px' ),
					( isset( $attributes['textShadowVerticalLabel'] ) ? $attributes['textShadowVerticalLabel'] : '0px' ),
					( isset( $attributes['textShadowBlurLabel'] ) ? $attributes['textShadowBlurLabel'] : '0px' ),
					( isset( $attributes['textShadowColorLabel'] ) ? $attributes['textShadowColorLabel'] : '#000' )
				);
			}

				$css = $css . '}';

				$css = $css . '.block-id-' . $attributes['id'] . ' span {';

			if ( isset( $attributes['typoDecoration'] ) ) {
				$css = $css . sprintf( 'text-decoration: %s;', $attributes['typoDecoration'] );
			}
				$css = $css . sprintf(
					'transform: %s %s %s %s %s %s %s %s %s;',
					( isset( $attributes['effectNPerspective'] ) && $attributes['effectNPerspective'] ) ? "perspective({$attributes['effectNPerspective']})" : '',
					( isset( $attributes['effectNRotateX'] ) && $attributes['effectNRotateX'] ) ? "rotateX({$attributes['effectNRotateX']})" : '',
					( isset( $attributes['effectNRotateY'] ) && $attributes['effectNRotateY'] ) ? "rotateY({$attributes['effectNRotateY']})" : '',
					( isset( $attributes['effectNRotateZ'] ) && $attributes['effectNRotateZ'] ) ? "rotateZ({$attributes['effectNRotateZ']})" : '',
					( isset( $attributes['effectNSkewX'] ) && $attributes['effectNSkewX'] ) ? "skewX({$attributes['effectNSkewX']})" : '',
					( isset( $attributes['effectNSkewY'] ) && $attributes['effectNSkewY'] ) ? "skewY({$attributes['effectNSkewY']})" : '',
					( isset( $attributes['effectNOffsetX'] ) ) ? "translateX({$attributes['effectNOffsetX']})" : '',
					( isset( $attributes['effectNOffsetY'] ) ) ? "translateY({$attributes['effectNOffsetY']})" : '',
					( isset( $attributes['effectNScale'] ) ) ? "scale({$attributes['effectNScale']})" : '',
				);
				$css = $css . '}';

				// Tablet CSS.
				$css = $css . ' @media (min-width: 768px) and (max-width: 1024px) {';
				$css = $css . '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['alignTablet'] ) ) {
				$css = $css . sprintf( 'justify-content: %s;', $attributes['alignTablet'] );
			}
			if ( isset( $attributes['layoutPaddingTablet'] ) ) {
				if ( isset( $attributes['layoutPaddingTablet']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['layoutPaddingTablet']['left'] );
				}
				if ( isset( $attributes['layoutPaddingTablet']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['layoutPaddingTablet']['right'] );
				}
				if ( isset( $attributes['layoutPaddingTablet']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['layoutPaddingTablet']['top'] );
				}
				if ( isset( $attributes['layoutPaddingTablet']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['layoutPaddingTablet']['bottom'] );
				}
			}
			if ( isset( $attributes['layoutMarginTablet'] ) ) {
				if ( isset( $attributes['layoutMarginTablet']['left'] ) ) {
					$css = $css . sprintf( 'margin-left: %s;', $attributes['layoutMarginTablet']['left'] );
				}
				if ( isset( $attributes['layoutMarginTablet']['right'] ) ) {
					$css = $css . sprintf( 'margin-right: %s;', $attributes['layoutMarginTablet']['right'] );
				}
				if ( isset( $attributes['layoutMarginTablet']['top'] ) ) {
					$css = $css . sprintf( 'margin-top: %s;', $attributes['layoutMarginTablet']['top'] );
				}
				if ( isset( $attributes['layoutMarginTablet']['bottom'] ) ) {
					$css = $css . sprintf( 'margin-bottom: %s;', $attributes['layoutMarginTablet']['bottom'] );
				}
			}
				$css = $css . '}';
				$css = $css . '.block-id-' . $attributes['id'] . ' .days, .block-id-' . $attributes['id'] . ' .hours, .block-id-' . $attributes['id'] . ' .minutes, .block-id-' . $attributes['id'] . ' .seconds, .block-id-' . $attributes['id'] . ' .prefix, .block-id-' . $attributes['id'] . ' .suffix, .block-id-' . $attributes['id'] . ' .divider {';
			if ( isset( $attributes['typoSizeTablet'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSizeTablet'] );
			}
				$css = $css . '}';
				$css = $css . '.block-id-' . $attributes['id'] . ' .label, .block-id-' . $attributes['id'] . ' .completed{ ';
			if ( isset( $attributes['typoLSizeTablet'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoLSizeTablet'] );
			}
				$css = $css . '}';
				$css = $css . '}';

				// Mobile CSS.
				$css     = $css . ' @media (max-width: 767px) {';
					$css = $css . '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['alignMobile'] ) ) {
				$css = $css . sprintf( 'justify-content: %s;', $attributes['alignMobile'] );
			}
			if ( isset( $attributes['layoutPaddingMobile'] ) ) {
				if ( isset( $attributes['layoutPaddingMobile']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['layoutPaddingMobile']['left'] );
				}
				if ( isset( $attributes['layoutPaddingMobile']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['layoutPaddingMobile']['right'] );
				}
				if ( isset( $attributes['layoutPaddingMobile']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['layoutPaddingMobile']['top'] );
				}
				if ( isset( $attributes['layoutPaddingMobile']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['layoutPaddingMobile']['bottom'] );
				}
			}
			if ( isset( $attributes['layoutMarginMobile'] ) ) {
				if ( isset( $attributes['layoutMarginMobile']['left'] ) ) {
					$css = $css . sprintf( 'margin-left: %s;', $attributes['layoutMarginMobile']['left'] );
				}
				if ( isset( $attributes['layoutMarginMobile']['right'] ) ) {
					$css = $css . sprintf( 'margin-right: %s;', $attributes['layoutMarginMobile']['right'] );
				}
				if ( isset( $attributes['layoutMarginMobile']['top'] ) ) {
					$css = $css . sprintf( 'margin-top: %s;', $attributes['layoutMarginMobile']['top'] );
				}
				if ( isset( $attributes['layoutMarginMobile']['bottom'] ) ) {
					$css = $css . sprintf( 'margin-bottom: %s;', $attributes['layoutMarginMobile']['bottom'] );
				}
			}
					$css = $css . '}';
					$css = $css . '.block-id-' . $attributes['id'] . ' .days, .block-id-' . $attributes['id'] . ' .hours, .block-id-' . $attributes['id'] . ' .minutes, .block-id-' . $attributes['id'] . ' .seconds, .block-id-' . $attributes['id'] . ' .prefix, .block-id-' . $attributes['id'] . ' .suffix, .block-id-' . $attributes['id'] . ' .divider {';
			if ( isset( $attributes['typoSizeMobile'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSizeMobile'] );
			}
					$css = $css . '}';
					$css = $css . '.block-id-' . $attributes['id'] . ' .label, .block-id-' . $attributes['id'] . ' .completed{ ';
			if ( isset( $attributes['typoLSizeMobile'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoLSizeMobile'] );
			}
					$css = $css . '}';
					$css = $css . '}';

			return $css;
		}
		return '';
	}
}

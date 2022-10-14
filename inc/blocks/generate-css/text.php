<?php
/**
 * Generate Text CSS.
 *
 * @package grigora-kit
 */

if ( ! function_exists( 'ga_generate_css_text' ) ) {
	/**
	 * Generate Text CSS.
	 *
	 * @param array $attributes Block Attributes.
	 */
	function ga_generate_css_text( $attributes ) {
		$css = '.block-id-' . $attributes['id'] . '{';
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
		if ( isset( $attributes['typoDecoration'] ) ) {
			$css = $css . sprintf( 'text-decoration: %s;', $attributes['typoDecoration'] );
		}
		$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoLineHeight'] ) && ( 'normal' !== $attributes['typoLineHeight'] ) ) ? $attributes['typoLineHeight'] . 'px' : 'normal' );
		$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoLetterSpacing'] ) && ( 'normal' !== $attributes['typoLetterSpacing'] ) ) ? $attributes['typoLetterSpacing'] . 'px' : 'normal' );
		$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoWordSpacing'] ) && ( 'normal' !== $attributes['typoWordSpacing'] ) ) ? $attributes['typoWordSpacing'] . 'px' : 'normal' );
		if ( isset( $attributes['typoFontFamily'] ) && isset( $attributes['typoFontFamily'] ) ) {
			$css = $css . sprintf( 'font-family: %s;', $attributes['typoFontFamily'] );
		}
		if ( isset( $attributes['layoutColumns'] ) && isset( $attributes['layoutColumns'] ) ) {
			$css = $css . sprintf( 'column-count: %s;', $attributes['layoutColumns'] );
		}
		if ( isset( $attributes['layoutColumnsGap'] ) && isset( $attributes['layoutColumnsGap'] ) ) {
			$css = $css . sprintf( 'column-gap: %spx;', $attributes['layoutColumnsGap'] );
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
		if ( isset( $attributes['textColor'] ) && $attributes['textColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['textColor'] );
		}
		if ( isset( $attributes['textGradient'] ) && $attributes['textGradient'] ) {
			$css = $css . sprintf( 'background-image: %s;-webkit-background-clip: text;-webkit-text-fill-color: transparent;', $attributes['textGradient'] );
		}
		$css = $css . sprintf( 'transition: %s;', ( isset( $attributes['transitionColorTime'] ) && $attributes['transitionColorTime'] ) ? $attributes['transitionColorTime'] . 's' : '0.2s' );
		if ( ( isset( $attributes['textShadowHorizontal'] ) && '0px' !== $attributes['textShadowHorizontal'] ) ||
			( isset( $attributes['textShadowVertical'] ) && '0px' !== $attributes['textShadowVertical'] ) ||
			( isset( $attributes['textShadowBlur'] ) && '0px' !== $attributes['textShadowBlur'] )
		) {
			$css = $css . sprintf(
				'filter: drop-shadow(%s %s %s %s);',
				isset( $attributes['textShadowHorizontal'] ) ? $attributes['textShadowHorizontal'] : '0px',
				isset( $attributes['textShadowVertical'] ) ? $attributes['textShadowVertical'] : '0px',
				isset( $attributes['textShadowBlur'] ) ? $attributes['textShadowBlur'] : '0px',
				isset( $attributes['textShadowColor'] ) ? $attributes['textShadowColor'] : '#000'
			);
		}
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . '.animateOnce {';
		if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
			$css = $css . sprintf(
				'animation: %s %s %s;',
				$attributes['entranceAnimation'],
				( isset( $attributes['entranceAnimationTime'] ) && $attributes['entranceAnimationTime'] ) ? $attributes['entranceAnimationTime'] . 's' : '1s',
				( isset( $attributes['entranceAnimationDelay'] ) && $attributes['entranceAnimationDelay'] ) ? $attributes['entranceAnimationDelay'] . 'ms' : ''
			);
		}
		$css = $css . '}';
		if ( isset( $attributes['textHColor'] ) && $attributes['textHColor'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . sprintf( ':hover {%s}', ( isset( $attributes['textColor'] ) && $attributes['textColor'] ) ? sprintf( 'color: %s;', $attributes['textHColor'] ) : sprintf( '-webkit-text-fill-color: %s;', $attributes['textHColor'] ) );
		}
		if ( isset( $attributes['textHGradient'] ) && $attributes['textHGradient'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ' {' . sprintf( 'background-image: %s;-webkit-background-clip: text;', $attributes['textHGradient'] ) . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ':hover {color: transparent;}';
		}

		$css = $css . '.block-id-' . $attributes['id'] . ':hover {';
		if ( ( isset( $attributes['textShadowHHorizontal'] ) && $attributes['textShadowHHorizontal'] ) ||
			( isset( $attributes['textShadowHVertical'] ) && $attributes['textShadowHVertical'] ) ||
			( isset( $attributes['textShadowHBlur'] ) && $attributes['textShadowHBlur'] )
		) {
			$css = $css . sprintf(
				'filter: drop-shadow(%s %s %s %s);',
				( isset( $attributes['textShadowHHorizontal'] ) && $attributes['textShadowHHorizontal'] ) ? $attributes['textShadowHHorizontal'] : ( ( isset( $attributes['textShadowHorizontal'] ) && $attributes['textShadowHorizontal'] ) ? $attributes['textShadowHorizontal'] : '0px' ),
				( isset( $attributes['textShadowHVertical'] ) && $attributes['textShadowHVertical'] ) ? $attributes['textShadowHVertical'] : ( ( isset( $attributes['textShadowVertical'] ) && $attributes['textShadowVertical'] ) ? $attributes['textShadowVertical'] : '0px' ),
				( isset( $attributes['textShadowHBlur'] ) && $attributes['textShadowHBlur'] ) ? $attributes['textShadowHBlur'] : ( ( isset( $attributes['textShadowBlur'] ) && $attributes['textShadowBlur'] ) ? $attributes['textShadowBlur'] : '0px' ),
				isset( $attributes['textShadowHColor'] ) ? $attributes['textShadowHColor'] : '#000'
			);
		}
		$css = $css . '}';

		// Tablet CSS.
		$css = $css . ' @media (min-width: 768px) and (max-width: 1024px) {';
		$css = $css . '.block-id-' . $attributes['id'] . '{';
		if ( isset( $attributes['typoSizeTablet'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSizeTablet'] );
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
		$css = $css . '}';
		$css = $css . '}';

		// Mobile CSS.
		$css = $css . ' @media (max-width: 767px) {';
		$css = $css . '.block-id-' . $attributes['id'] . '{';
		if ( isset( $attributes['typoSizeMobile'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSizeMobile'] );
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
		$css = $css . '}';
		$css = $css . '}';

		return $css;
	}
}

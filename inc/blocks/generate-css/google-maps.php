<?php
/**
 * Generate CSS for Google maps.
 *
 * @package grigora-kit
 */

if ( ! function_exists( 'ga_generate_css_google_maps' ) ) {
	/**
	 * Generate CSS for Google maps.
	 *
	 * @param array $attributes Block Attributes.
	 */
	function ga_generate_css_google_maps( $attributes ) {

		if ( isset( $attributes['id'] ) ) {
			$css = '';
			$css = '.block-id-' . $attributes['id'] . ' {';
			if ( isset( $attributes['align'] ) && $attributes['align'] ) {
				$css = $css . sprintf( 'align-items: %s;', $attributes['align'] );
			}
			if ( isset( $attributes['layoutPadding'] ) ) {
				if ( isset( $attributes['layoutPadding']['left'] ) && $attributes['layoutPadding']['left'] ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['layoutPadding']['left'] );
				}
				if ( isset( $attributes['layoutPadding']['right'] ) && $attributes['layoutPadding']['right'] ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['layoutPadding']['right'] );
				}
				if ( isset( $attributes['layoutPadding']['top'] ) && $attributes['layoutPadding']['top'] ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['layoutPadding']['top'] );
				}
				if ( isset( $attributes['layoutPadding']['bottom'] ) && $attributes['layoutPadding']['bottom'] ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['layoutPadding']['bottom'] );
				}
			}
			if ( isset( $attributes['layoutMargin'] ) ) {
				if ( isset( $attributes['layoutMargin']['left'] ) && $attributes['layoutMargin']['left'] ) {
					$css = $css . sprintf( 'margin-left: %s;', $attributes['layoutMargin']['left'] );
				}
				if ( isset( $attributes['layoutMargin']['right'] ) && $attributes['layoutMargin']['right'] ) {
					$css = $css . sprintf( 'margin-right: %s;', $attributes['layoutMargin']['right'] );
				}
				if ( isset( $attributes['layoutMargin']['top'] ) && $attributes['layoutMargin']['top'] ) {
					$css = $css . sprintf( 'margin-top: %s;', $attributes['layoutMargin']['top'] );
				}
				if ( isset( $attributes['layoutMargin']['bottom'] ) && $attributes['layoutMargin']['bottom'] ) {
					$css = $css . sprintf( 'margin-bottom: %s;', $attributes['layoutMargin']['bottom'] );
				}
			}

			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ' iframe{';
			if ( isset( $attributes['height'] ) ) {
				$css = $css . sprintf( 'height: %s;', $attributes['height'] );
			}
			if ( isset( $attributes['maxWidth'] ) ) {
				$css = $css . sprintf( 'max-width: %s;', $attributes['maxWidth'] );
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

			// Tablet CSS.
			$css = $css . ' @media (min-width: 768px) and (max-width: 1024px) {';
			$css = $css . '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['alignTablet'] ) ) {
				$css = $css . sprintf( 'align-items: %s;', $attributes['alignTablet'] );
			}
			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ' iframe{';
			if ( isset( $attributes['heightTablet'] ) ) {
				$css = $css . sprintf( 'height: %s;', $attributes['heightTablet'] );
			}
			if ( isset( $attributes['maxWidthTablet'] ) ) {
				$css = $css . sprintf( 'max-width: %s;', $attributes['maxWidthTablet'] );
			}
			$css = $css . '}';
			$css = $css . '}';

			// Mobile CSS.
			$css = $css . ' @media (max-width: 767px) {';
			$css = $css . '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['alignMobile'] ) ) {
				$css = $css . sprintf( 'align-items: %s;', $attributes['alignMobile'] );
			}
			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ' iframe{';
			if ( isset( $attributes['heightMobile'] ) ) {
				$css = $css . sprintf( 'height: %s;', $attributes['heightMobile'] );
			}
			if ( isset( $attributes['maxWidthMobile'] ) ) {
				$css = $css . sprintf( 'max-width: %s;', $attributes['maxWidthMobile'] );
			}
			$css = $css . '}';
			$css = $css . '}';

			return $css;
		}
		return '';
	}
}


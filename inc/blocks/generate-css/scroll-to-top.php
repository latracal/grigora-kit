<?php

/**
 * Generate Group CSS for Scroll To Top
 */
if ( ! function_exists( 'ga_generate_css_scroll_to_top' ) ) {

	function ga_generate_css_scroll_to_top( $attributes ) {
		$css = '.block-id-' . $attributes['id'] . '{';
		if ( isset( $attributes['position'] ) && $attributes['position'] ) {
				$css = $css . sprintf( 'position: %s !important;', $attributes['position'] );
		}
		if ( isset( $attributes['positionCoord']['left'] ) && $attributes['positionCoord']['left'] ) {
			$css = $css . sprintf( 'left: %s;', $attributes['positionCoord']['left'] );
		}
		if ( isset( $attributes['positionCoord']['top'] ) && $attributes['positionCoord']['top'] ) {
			$css = $css . sprintf( 'top: %s;', $attributes['positionCoord']['top'] );
		}
		if ( isset( $attributes['positionCoord']['right'] ) && $attributes['positionCoord']['right'] ) {
			$css = $css . sprintf( 'right: %s;', $attributes['positionCoord']['right'] );
		}
		if ( isset( $attributes['positionCoord']['bottom'] ) && $attributes['positionCoord']['bottom'] ) {
			$css = $css . sprintf( 'bottom: %s;', $attributes['positionCoord']['bottom'] );
		}
		if ( isset( $attributes['zindex'] ) && $attributes['zindex'] ) {
			$css = $css . sprintf( 'z-index: %s;', $attributes['zindex'] );
		}
		if ( isset( $attributes['transitionTime'] ) && $attributes['transitionTime'] ) {
			$css = $css . sprintf( 'transition: %ss;', $attributes['transitionTime'] );
		}
		if ( isset( $attributes['iconPadding'] ) ) {
			if ( isset( $attributes['iconPadding']['left'] ) ) {
				$css = $css . sprintf( 'padding-left: %s;', $attributes['iconPadding']['left'] );
			}
			if ( isset( $attributes['iconPadding']['right'] ) ) {
				$css = $css . sprintf( 'padding-right: %s;', $attributes['iconPadding']['right'] );
			}
			if ( isset( $attributes['iconPadding']['top'] ) ) {
				$css = $css . sprintf( 'padding-top: %s;', $attributes['iconPadding']['top'] );
			}
			if ( isset( $attributes['iconPadding']['bottom'] ) ) {
				$css = $css . sprintf( 'padding-bottom: %s;', $attributes['iconPadding']['bottom'] );
			}
		}
		if ( isset( $attributes['iconMargin'] ) ) {
			if ( isset( $attributes['iconMargin']['left'] ) ) {
				$css = $css . sprintf( 'margin-left: %s;', $attributes['iconMargin']['left'] );
			}
			if ( isset( $attributes['iconMargin']['right'] ) ) {
				$css = $css . sprintf( 'margin-right: %s;', $attributes['iconMargin']['right'] );
			}
			if ( isset( $attributes['iconMargin']['top'] ) ) {
				$css = $css . sprintf( 'margin-top: %s;', $attributes['iconMargin']['top'] );
			}
			if ( isset( $attributes['iconMargin']['bottom'] ) ) {
				$css = $css . sprintf( 'margin-bottom: %s;', $attributes['iconMargin']['bottom'] );
			}
		}
		if ( isset( $attributes['effectNBorderRadius'] ) ) {
			if ( isset( $attributes['effectNBorderRadius']['topRight'] ) ) {
				$css = $css . sprintf( 'border-top-right-radius: %s;', $attributes['effectNBorderRadius']['topRight'] );
			}
			if ( isset( $attributes['effectNBorderRadius']['topLeft'] ) ) {
				$css = $css . sprintf( 'border-top-left-radius: %s;', $attributes['effectNBorderRadius']['topLeft'] );
			}
			if ( isset( $attributes['effectNBorderRadius']['bottomRight'] ) ) {
				$css = $css . sprintf( 'border-bottom-right-radius: %s;', $attributes['effectNBorderRadius']['bottomRight'] );
			}
			if ( isset( $attributes['effectNBorderRadius']['bottomLeft'] ) ) {
				$css = $css . sprintf( 'border-bottom-left-radius: %s;', $attributes['effectNBorderRadius']['bottomLeft'] );
			}
		}
		$css = $css . sprintf(
			'box-shadow: %s %s %s %s %s;',
			( isset( $attributes['effectNShadowHO'] ) ) ? $attributes['effectNShadowHO'] : '0px',
			( isset( $attributes['effectNShadowVO'] ) ) ? $attributes['effectNShadowVO'] : '0px',
			( isset( $attributes['effectNShadowBlur'] ) ) ? $attributes['effectNShadowBlur'] : '0px',
			( isset( $attributes['effectNShadowSpread'] ) ) ? $attributes['effectNShadowSpread'] : '0px',
			( isset( $attributes['effectNShadowColor'] ) ) ? $attributes['effectNShadowColor'] : '#000',
		);
		if ( isset( $attributes['backgroundNormalColor'] ) && $attributes['backgroundNormalColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['backgroundNormalColor'] );
		}
		if ( isset( $attributes['transitionTime'] ) && $attributes['transitionTime'] ) {
			$css = $css . sprintf( 'transition: %s;', $attributes['transitionTime'] );
		}
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' svg{';
		if ( isset( $attributes['iconSize'] ) && $attributes['iconSize'] ) {
			$css = $css . sprintf( 'height: %s; width: %s;', $attributes['iconSize'], $attributes['iconSize'] );
		}
		if ( isset( $attributes['iconNormalColor'] ) && $attributes['iconNormalColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['iconNormalColor'] );
		}
		$css = $css . '}';
		if ( isset( $attributes['backgroundHoverColor'] ) && $attributes['backgroundHoverColor'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ':hover{';
			$css = $css . sprintf( 'background-color: %s;', $attributes['backgroundHoverColor'] );
			$css = $css . '}';
		}
		if ( isset( $attributes['iconHoverColor'] ) && $attributes['iconHoverColor'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ':hover svg{';
			$css = $css . sprintf( 'color: %s;', $attributes['iconHoverColor'] );
			$css = $css . '}';
		}
		return $css;
	}
}

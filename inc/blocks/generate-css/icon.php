<?php
/**
 * Return a complete css for specific icon block.
 *
 * @package grigora-kit
 */

if ( ! function_exists( 'ga_generate_css_icon' ) ) {
	/**
	 * Return a complete css for specific icon block.
	 *
	 * @param array $attributes Block Attributes.
	 */
	function ga_generate_css_icon( $attributes ) {
		if ( isset( $attributes['id'] ) ) {

			$css = '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['iconPadding'] ) && isset( $attributes['iconPadding']['left'] ) ) {
				$css = $css . sprintf( 'padding-left: %s;', $attributes['iconPadding']['left'] );
			}
			if ( isset( $attributes['iconPadding'] ) && isset( $attributes['iconPadding']['right'] ) ) {
				$css = $css . sprintf( 'padding-right: %s;', $attributes['iconPadding']['right'] );
			}
			if ( isset( $attributes['iconPadding'] ) && isset( $attributes['iconPadding']['top'] ) ) {
				$css = $css . sprintf( 'padding-top: %s;', $attributes['iconPadding']['top'] );
			}
			if ( isset( $attributes['iconPadding'] ) && isset( $attributes['iconPadding']['bottom'] ) ) {
				$css = $css . sprintf( 'padding-bottom: %s;', $attributes['iconPadding']['bottom'] );
			}
			if ( isset( $attributes['iconMargin'] ) && isset( $attributes['iconMargin']['left'] ) ) {
				$css = $css . sprintf( 'margin-left: %s;', $attributes['iconMargin']['left'] );
			}
			if ( isset( $attributes['iconMargin'] ) && isset( $attributes['iconMargin']['right'] ) ) {
				$css = $css . sprintf( 'margin-right: %s;', $attributes['iconMargin']['right'] );
			}
			if ( isset( $attributes['iconMargin'] ) && isset( $attributes['iconMargin']['top'] ) ) {
				$css = $css . sprintf( 'margin-top: %s;', $attributes['iconMargin']['top'] );
			}
			if ( isset( $attributes['iconMargin'] ) && isset( $attributes['iconMargin']['bottom'] ) ) {
				$css = $css . sprintf( 'margin-bottom: %s;', $attributes['iconMargin']['bottom'] );
			}
			if ( isset( $attributes['align'] ) ) {
				$css = $css . sprintf( 'justify-content: %s;', $attributes['align'] );
			}
			$css = $css . '}';
			if ( isset( $attributes['icon'] ) && $attributes['icon'] && 'none' !== $attributes['icon'] ) {

				if ( isset( $attributes['url'] ) && $attributes['url'] ) {
					$css = $css . '.block-id-' . $attributes['id'] . ' a, .block-id-' . $attributes['id'] . ' svg {';
				} else {
					$css = $css . '.block-id-' . $attributes['id'] . ' svg{';
				}

				if ( isset( $attributes['iconSize'] ) ) {
					$css = $css . sprintf( 'width: %s;', $attributes['iconSize'] );
					$css = $css . sprintf( 'height: %s;', $attributes['iconSize'] );
				}
				if ( isset( $attributes['iconColorFlag'] ) && $attributes['iconColorFlag'] ) {
					if ( isset( $attributes['iconNormalColor'] ) ) {
						$css = $css . sprintf( 'color: %s;', $attributes['iconNormalColor'] );
					}
				}
				$css = $css . '}';
				$css = $css . '.block-id-' . $attributes['id'] . ':hover svg{';
				if ( isset( $attributes['iconColorFlag'] ) && $attributes['iconColorFlag'] ) {
					if ( isset( $attributes['iconHoverColor'] ) ) {
						$css = $css . sprintf( 'color: %s;', $attributes['iconHoverColor'] );
					}
				}
				$css = $css . '}';
			}
			return $css;
		}
		return '';
	}
}

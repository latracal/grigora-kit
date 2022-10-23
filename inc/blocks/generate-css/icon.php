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
			if ( ((isset( $attributes['icon'] ) && $attributes['icon'] && 'none' !== $attributes['icon']) || 
				(isset($attributes['hasCustomIcon']) && $attributes['hasCustomIcon'] && isset($attributes['customIcon']) && $attributes['customIcon'])) ) {

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

			// Tablet CSS.
			$css = $css . ' @media (min-width: 768px) and (max-width: 1024px) {';
			$css = $css . '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['iconPaddingTablet'] ) ) {
				if ( isset( $attributes['iconPaddingTablet']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['iconPaddingTablet']['left'] );
				}
				if ( isset( $attributes['iconPaddingTablet']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['iconPaddingTablet']['right'] );
				}
				if ( isset( $attributes['iconPaddingTablet']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['iconPaddingTablet']['top'] );
				}
				if ( isset( $attributes['iconPaddingTablet']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['iconPaddingTablet']['bottom'] );
				}
			}
			if ( isset( $attributes['iconMarginTablet'] ) ) {
				if ( isset( $attributes['iconMarginTablet']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['iconMarginTablet']['left'] );
				}
				if ( isset( $attributes['iconMarginTablet']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['iconMarginTablet']['right'] );
				}
				if ( isset( $attributes['iconMarginTablet']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['iconMarginTablet']['top'] );
				}
				if ( isset( $attributes['iconMarginTablet']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['iconMarginTablet']['bottom'] );
				}
			}
			$css = $css . '}';
			if ( isset( $attributes['url'] ) && $attributes['url'] ) {
				$css = $css . '.block-id-' . $attributes['id'] . ' a, .block-id-' . $attributes['id'] . ' svg {';
			} else {
				$css = $css . '.block-id-' . $attributes['id'] . ' svg{';
			}

			if ( isset( $attributes['iconSizeTablet'] ) ) {
				$css = $css . sprintf( 'width: %s;', $attributes['iconSizeTablet'] );
				$css = $css . sprintf( 'height: %s;', $attributes['iconSizeTablet'] );
			}
			$css = $css . '}';
			$css = $css . '}';

			// Mobile CSS.
			$css = $css . ' @media (max-width: 767px) {';
			$css = $css . '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['iconPaddingMobile'] ) ) {
				if ( isset( $attributes['iconPaddingMobile']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['iconPaddingMobile']['left'] );
				}
				if ( isset( $attributes['iconPaddingMobile']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['iconPaddingMobile']['right'] );
				}
				if ( isset( $attributes['iconPaddingMobile']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['iconPaddingMobile']['top'] );
				}
				if ( isset( $attributes['iconPaddingMobile']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['iconPaddingMobile']['bottom'] );
				}
			}
			if ( isset( $attributes['iconMarginMobile'] ) ) {
				if ( isset( $attributes['iconMarginMobile']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['iconMarginMobile']['left'] );
				}
				if ( isset( $attributes['iconMarginMobile']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['iconMarginMobile']['right'] );
				}
				if ( isset( $attributes['iconMarginMobile']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['iconMarginMobile']['top'] );
				}
				if ( isset( $attributes['iconMarginMobile']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['iconMarginMobile']['bottom'] );
				}
			}
			$css = $css . '}';
			if ( isset( $attributes['url'] ) && $attributes['url'] ) {
				$css = $css . '.block-id-' . $attributes['id'] . ' a, .block-id-' . $attributes['id'] . ' svg {';
			} else {
				$css = $css . '.block-id-' . $attributes['id'] . ' svg{';
			}

			if ( isset( $attributes['iconSizeMobile'] ) ) {
				$css = $css . sprintf( 'width: %s;', $attributes['iconSizeMobile'] );
				$css = $css . sprintf( 'height: %s;', $attributes['iconSizeMobile'] );
			}
			$css = $css . '}';
			$css = $css . '}';

			return $css;
		}
		return '';
	}
}

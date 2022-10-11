<?php
/**
 * Return a complete css for specific post grid 2 block.
 *
 * @package grigora-kit
 */

if ( ! function_exists( 'ga_generate_css_post_grid_2' ) ) {
	/**
	 * Return a complete css for specific post grid 2 block.
	 *
	 * @param array $attributes Block Attributes.
	 */
	function ga_generate_css_post_grid_2( $attributes ) {
		$css = '.block-id-' . $attributes['id'] . ' .big-style, ';
		$css = $css . '.block-id-' . $attributes['id'] . ' .small-style {';
		if ( ( isset( $attributes['transitionColorTime'] ) ) ) {
			$css = $css . sprintf( 'transition: %s;', $attributes['transitionColorTime'] . 's' );
		}
		if ( isset( $attributes['imageBorderRadius'] ) ) {
			if ( isset( $attributes['imageBorderRadius']['topRight'] ) ) {
				$css = $css . sprintf( 'border-top-right-radius: %s;', $attributes['imageBorderRadius']['topRight'] );
			}
			if ( isset( $attributes['imageBorderRadius']['topLeft'] ) ) {
				$css = $css . sprintf( 'border-top-left-radius: %s;', $attributes['imageBorderRadius']['topLeft'] );
			}
			if ( isset( $attributes['imageBorderRadius']['bottomRight'] ) ) {
				$css = $css . sprintf( 'border-bottom-right-radius: %s;', $attributes['imageBorderRadius']['bottomRight'] );
			}
			if ( isset( $attributes['imageBorderRadius']['bottomLeft'] ) ) {
				$css = $css . sprintf( 'border-bottom-left-radius: %s;', $attributes['imageBorderRadius']['bottomLeft'] );
			}
		}
			$css = $css . sprintf(
				'box-shadow: %s %s %s %s %s;',
				( isset( $attributes['effectNShadowHO'] ) ) ? $attributes['effectNShadowHO'] : '1px',
				( isset( $attributes['effectNShadowVO'] ) ) ? $attributes['effectNShadowVO'] : '7px',
				( isset( $attributes['effectNShadowBlur'] ) ) ? $attributes['effectNShadowBlur'] : '14px',
				( isset( $attributes['effectNShadowSpread'] ) ) ? $attributes['effectNShadowSpread'] : '-5px',
				( isset( $attributes['effectNShadowColor'] ) ) ? $attributes['effectNShadowColor'] : '#00000033',
			);
		$css     = $css . '}';
		if ( isset( $attributes['elementsList'] ) && $attributes['elementsList']['elements'] ) {
			$array   = $attributes['elementsList']['elements'];
			$css     = $css . '.block-id-' . $attributes['id'] . ' .category-style {';
				$css = $css . 'order: ' . array_search( 'Category', $array, true ) . ';';
			$css     = $css . '}';
			$css     = $css . '.block-id-' . $attributes['id'] . ' .title-container {';
				$css = $css . 'order: ' . array_search( 'Title', $array, true ) . ';';
			$css     = $css . '}';
			$css     = $css . '.block-id-' . $attributes['id'] . ' .excerpt-style {';
				$css = $css . 'order: ' . array_search( 'Excerpt', $array, true ) . ';';
			$css     = $css . '}';
			$css     = $css . '.block-id-' . $attributes['id'] . ' .meta-style {';
				$css = $css . 'order: ' . array_search( 'Meta', $array, true ) . ';';
			$css     = $css . '}';
		}
		$css     = $css . '.block-id-' . $attributes['id'] . ' .first-style {';
			$css = $css . sprintf(
				'gap: %s;',
				( isset( $attributes['gap'] ) ) ? $attributes['gap'] . 'px' : ''
			);
			$css = $css . sprintf(
				'height: %s;',
				( isset( $attributes['contHeight'] ) ) ? $attributes['contHeight'] . 'px' : ''
			);
			$css = $css . sprintf(
				'text-align: %s;',
				( isset( $attributes['align'] ) ) ? $attributes['align'] : 'start'
			);
		$css     = $css . '}';
		$css     = $css . '.block-id-' . $attributes['id'] . ' .middle-style {';
			$css = $css . sprintf(
				'gap: %s;',
				( isset( $attributes['gap'] ) ) ? $attributes['gap'] . 'px' : ''
			);
		$css     = $css . '}';
		$css     = $css . '.block-id-' . $attributes['id'] . ' .second-style {';
			$css = $css . sprintf(
				'gap: %s;',
				( isset( $attributes['gap'] ) ) ? $attributes['gap'] . 'px' : ''
			);
		$css     = $css . '}';
		$css     = $css . '.block-id-' . $attributes['id'] . ' .meta-style {';
			$css = $css . sprintf(
				'justify-content: %s;',
				( isset( $attributes['align'] ) ) ? $attributes['align'] : 'start'
			);
		$css     = $css . '}';
		$css     = $css . '.block-id-' . $attributes['id'] . ' .img-style {';
		if ( isset( $attributes['cssFilters'] ) ) {
			$css = $css . sprintf(
				'filter: blur(%spx) brightness(%s) contrast(%s) saturate(%s) hue-rotate(%sdeg);',
				isset( $attributes['cssFilters']['blur'] ) ? $attributes['cssFilters']['blur'] : '0',
				isset( $attributes['cssFilters']['brightness'] ) ? $attributes['cssFilters']['brightness'] . '%' : '100%',
				isset( $attributes['cssFilters']['contrast'] ) ? $attributes['cssFilters']['contrast'] . '%' : '100%',
				isset( $attributes['cssFilters']['saturation'] ) ? $attributes['cssFilters']['saturation'] . '%' : '100%',
				isset( $attributes['cssFilters']['hue'] ) ? $attributes['cssFilters']['hue'] : '0'
			);
		}
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' .overlay-style {';
		if ( isset( $attributes['overlayColor'] ) && $attributes['overlayColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['overlayColor'] );
		}
		if ( isset( $attributes['overlayGradient'] ) && $attributes['overlayGradient'] ) {
			$css = $css . sprintf( 'background: %s;', $attributes['overlayGradient'] );
		}
		if ( ( isset( $attributes['overlayColor'] ) && $attributes['overlayColor'] ) || ( isset( $attributes['overlayGradient'] ) && $attributes['overlayGradient'] ) ) {
			$css = $css . sprintf(
				'opacity: calc(%s / 100);',
				( isset( $attributes['overlayOpacity'] ) ) ? $attributes['overlayOpacity'] : '40'
			);
		}
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' .excerpt-style {';
		if ( isset( $attributes['contentTypoSize'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['contentTypoSize'] );
		}
		if ( isset( $attributes['contentTypoWeight'] ) ) {
			$css = $css . sprintf( 'font-weight: %s;', $attributes['contentTypoWeight'] );
		}
		if ( isset( $attributes['contentTypoTransform'] ) ) {
			$css = $css . sprintf( 'text-transform: %s;', $attributes['contentTypoTransform'] );
		}
		if ( isset( $attributes['contentTypoStyle'] ) ) {
			$css = $css . sprintf( 'font-style: %s;', $attributes['contentTypoStyle'] );
		}
		if ( isset( $attributes['contentTypoDecoration'] ) ) {
			$css = $css . sprintf( 'text-decoration: %s;', $attributes['contentTypoDecoration'] );
		}
			$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['contentTypoLineHeight'] ) && ( 'normal' !== $attributes['contentTypoLineHeight'] ) ) ? $attributes['contentTypoLineHeight'] . 'px' : 'normal' );
			$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['contentTypoLetterSpacing'] ) && ( 'normal' !== $attributes['contentTypoLetterSpacing'] ) ) ? $attributes['contentTypoLetterSpacing'] . 'px' : 'normal' );
			$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['contentTypoWordSpacing'] ) && ( 'normal' !== $attributes['contentTypoWordSpacing'] ) ) ? $attributes['contentTypoWordSpacing'] . 'px' : 'normal' );
		if ( isset( $attributes['contentTypoFontFamily'] ) && isset( $attributes['contentTypoFontFamily'] ) ) {
			$css = $css . sprintf( 'font-family: %s;', $attributes['contentTypoFontFamily'] );
		}
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' .titleB-style {';
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
		if ( isset( $attributes['titleBTypoSize'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['titleBTypoSize'] );
		}
		if ( isset( $attributes['titleBTypoWeight'] ) ) {
			$css = $css . sprintf( 'font-weight: %s;', $attributes['titleBTypoWeight'] );
		}
		if ( isset( $attributes['titleBTypoTransform'] ) ) {
			$css = $css . sprintf( 'text-transform: %s;', $attributes['titleBTypoTransform'] );
		}
		if ( isset( $attributes['titleBTypoStyle'] ) ) {
			$css = $css . sprintf( 'font-style: %s;', $attributes['titleBTypoStyle'] );
		}
		if ( isset( $attributes['titleBTypoDecoration'] ) ) {
			$css = $css . sprintf( 'text-decoration: %s;', $attributes['titleBTypoDecoration'] );
		}
			$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['titleBTypoLineHeight'] ) && ( 'normal' !== $attributes['titleBTypoLineHeight'] ) ) ? $attributes['titleBTypoLineHeight'] . 'px' : 'normal' );
			$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['titleBTypoLetterSpacing'] ) && ( 'normal' !== $attributes['titleBTypoLetterSpacing'] ) ) ? $attributes['titleBTypoLetterSpacing'] . 'px' : 'normal' );
			$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['titleBTypoWordSpacing'] ) && ( 'normal' !== $attributes['titleBTypoWordSpacing'] ) ) ? $attributes['titleBTypoWordSpacing'] . 'px' : 'normal' );
		if ( isset( $attributes['titleBTypoFontFamily'] ) && isset( $attributes['titleBTypoFontFamily'] ) ) {
			$css = $css . sprintf( 'font-family: %s;', $attributes['titleBTypoFontFamily'] );
		}
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' .titleS-style {';
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
		if ( isset( $attributes['titleSTypoSize'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['titleSTypoSize'] );
		}
		if ( isset( $attributes['titleSTypoWeight'] ) ) {
			$css = $css . sprintf( 'font-weight: %s;', $attributes['titleSTypoWeight'] );
		}
		if ( isset( $attributes['titleSTypoTransform'] ) ) {
			$css = $css . sprintf( 'text-transform: %s;', $attributes['titleSTypoTransform'] );
		}
		if ( isset( $attributes['titleSTypoStyle'] ) ) {
			$css = $css . sprintf( 'font-style: %s;', $attributes['titleSTypoStyle'] );
		}
		if ( isset( $attributes['titleSTypoDecoration'] ) ) {
			$css = $css . sprintf( 'text-decoration: %s;', $attributes['titleSTypoDecoration'] );
		}
			$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['titleSTypoLineHeight'] ) && ( 'normal' !== $attributes['titleSTypoLineHeight'] ) ) ? $attributes['titleSTypoLineHeight'] . 'px' : 'normal' );
			$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['titleSTypoLetterSpacing'] ) && ( 'normal' !== $attributes['titleSTypoLetterSpacing'] ) ) ? $attributes['titleSTypoLetterSpacing'] . 'px' : 'normal' );
			$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['titleSTypoWordSpacing'] ) && ( 'normal' !== $attributes['titleSTypoWordSpacing'] ) ) ? $attributes['titleSTypoWordSpacing'] . 'px' : 'normal' );
		if ( isset( $attributes['titleSTypoFontFamily'] ) && isset( $attributes['titleSTypoFontFamily'] ) ) {
			$css = $css . sprintf( 'font-family: %s;', $attributes['titleSTypoFontFamily'] );
		}
		$css = $css . '}';
		if ( isset( $attributes['titleTextHColor'] ) && $attributes['titleTextHColor'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ':hover .title-style {';
			$css = $css . sprintf( 'color: %s;', $attributes['titleTextHColor'] );
			$css = $css . '}';
		}
		if ( isset( $attributes['bgHColor'] ) && $attributes['bgHColor'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ':hover .title-style {';
			$css = $css . sprintf( 'background-color: %s;', $attributes['bgHColor'] );
			$css = $css . '}';
		}
		$css = $css . '.block-id-' . $attributes['id'] . ' .category-style {';
		if ( isset( $attributes['categoryTextColor'] ) && $attributes['categoryTextColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['categoryTextColor'] );
		}
		if ( isset( $attributes['bgCatColor'] ) && $attributes['bgCatColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['bgCatColor'] );
		}
		if ( isset( $attributes['catBorderRadius'] ) ) {
			if ( isset( $attributes['catBorderRadius']['topRight'] ) ) {
				$css = $css . sprintf( 'border-top-right-radius: %s;', $attributes['catBorderRadius']['topRight'] );
			}
			if ( isset( $attributes['catBorderRadius']['topLeft'] ) ) {
				$css = $css . sprintf( 'border-top-left-radius: %s;', $attributes['catBorderRadius']['topLeft'] );
			}
			if ( isset( $attributes['catBorderRadius']['bottomRight'] ) ) {
				$css = $css . sprintf( 'border-bottom-right-radius: %s;', $attributes['catBorderRadius']['bottomRight'] );
			}
			if ( isset( $attributes['catBorderRadius']['bottomLeft'] ) ) {
				$css = $css . sprintf( 'border-bottom-left-radius: %s;', $attributes['catBorderRadius']['bottomLeft'] );
			}
		}
		if ( isset( $attributes['layoutCatPadding'] ) ) {
			if ( isset( $attributes['layoutCatPadding']['left'] ) ) {
				$css = $css . sprintf( 'padding-left: %s;', $attributes['layoutCatPadding']['left'] );
			}
			if ( isset( $attributes['layoutCatPadding']['right'] ) ) {
				$css = $css . sprintf( 'padding-right: %s;', $attributes['layoutCatPadding']['right'] );
			}
			if ( isset( $attributes['layoutCatPadding']['top'] ) ) {
				$css = $css . sprintf( 'padding-top: %s;', $attributes['layoutCatPadding']['top'] );
			}
			if ( isset( $attributes['layoutCatPadding']['bottom'] ) ) {
				$css = $css . sprintf( 'padding-bottom: %s;', $attributes['layoutCatPadding']['bottom'] );
			}
		}
		$css     = $css . '}';
		$css     = $css . '.block-id-' . $attributes['id'] . ' .cat-container {';
			$css = $css . sprintf(
				'text-align: %s;',
				( isset( $attributes['align'] ) ) ? $attributes['align'] : 'start'
			);
		$css     = $css . '}';
		// category hover.
		$css = $css . '.block-id-' . $attributes['id'] . ' .category-style:hover {';
		if ( isset( $attributes['categoryTextHColor'] ) && $attributes['categoryTextHColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['categoryTextHColor'] );
		}
		if ( isset( $attributes['bgHCatColor'] ) && $attributes['bgHCatColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['bgHCatColor'] );
		}
		$css = $css . '}';
		// image hover.
		$css = $css . '.block-id-' . $attributes['id'] . ' .big-style:hover .img-style, ';
		$css = $css . '.block-id-' . $attributes['id'] . ' .small-style:hover .img-style {';
		if ( isset( $attributes['hoverAnimation'] ) && $attributes['hoverAnimation'] && 'none' !== $attributes['hoverAnimation'] ) {
			if ( 'zoomIn' === $attributes['hoverAnimation'] ) {
				$css = $css . 'transform: scale(1.1);';
			} elseif ( 'zoomOut' === $attributes['hoverAnimation'] ) {
				$css = $css . 'transform: scale(1.3);';
			} elseif ( 'opacity' === $attributes['hoverAnimation'] ) {
				$css = $css . 'opacity: 0.7;';
			} elseif ( 'rotateLeft' === $attributes['hoverAnimation'] ) {
				$css = $css . 'transform: rotate(-5deg) scale(1.2);';
			} elseif ( 'rotateRight' === $attributes['hoverAnimation'] ) {
				$css = $css . 'transform: rotate(5deg) scale(1.2);';
			} elseif ( 'slideLeft' === $attributes['hoverAnimation'] ) {
				$css = $css . 'transform: translateX(8%) scale(1.2);';
			} elseif ( 'slideRight' === $attributes['hoverAnimation'] ) {
				$css = $css . 'transform: translateX(-8%) scale(1.2);';
			}
		}
		if ( isset( $attributes['cssHFilters'] ) ) {
			$css = $css . sprintf(
				'filter: blur(%spx) brightness(%s) contrast(%s) saturate(%s) hue-rotate(%sdeg);',
				isset( $attributes['cssHFilters']['blur'] ) ? $attributes['cssHFilters']['blur'] : '0',
				isset( $attributes['cssHFilters']['brightness'] ) ? $attributes['cssHFilters']['brightness'] . '%' : '100%',
				isset( $attributes['cssHFilters']['contrast'] ) ? $attributes['cssHFilters']['contrast'] . '%' : '100%',
				isset( $attributes['cssHFilters']['saturation'] ) ? $attributes['cssHFilters']['saturation'] . '%' : '100%',
				isset( $attributes['cssHFilters']['hue'] ) ? $attributes['cssHFilters']['hue'] : '0'
			);
		}
		$css = $css . '}';
		// box-shadow hover.
		$css = $css . '.block-id-' . $attributes['id'] . ' .big-style:hover {';
		if (
				( isset( $attributes['effectHShadowHO'] ) && $attributes['effectHShadowHO'] ) ||
				( isset( $attributes['effectHShadowVO'] ) && $attributes['effectHShadowVO'] ) ||
				( isset( $attributes['effectHShadowBlur'] ) && $attributes['effectHShadowBlur'] ) ||
				( isset( $attributes['effectHShadowSpread'] ) && $attributes['effectHShadowSpread'] )
			) {
			$css = $css . sprintf(
				'box-shadow: %s %s %s %s %s;',
				( isset( $attributes['effectHShadowHO'] ) && $attributes['effectHShadowHO'] ) ? $attributes['effectHShadowHO'] : ( ( isset( $attributes['effectNShadowHO'] ) && $attributes['effectNShadowHO'] ) ? $attributes['effectNShadowHO'] : '0px' ),
				( isset( $attributes['effectHShadowVO'] ) && $attributes['effectHShadowVO'] ) ? $attributes['effectHShadowVO'] : ( ( isset( $attributes['effectNShadowVO'] ) && $attributes['effectNShadowVO'] ) ? $attributes['effectNShadowVO'] : '0px' ),
				( isset( $attributes['effectHShadowBlur'] ) && $attributes['effectHShadowBlur'] ) ? $attributes['effectHShadowBlur'] : ( ( isset( $attributes['effectNShadowBlur'] ) && $attributes['effectNShadowBlur'] ) ? $attributes['effectNShadowBlur'] : '0px' ),
				( isset( $attributes['effectHShadowSpread'] ) && $attributes['effectHShadowSpread'] ) ? $attributes['effectHShadowSpread'] : ( ( isset( $attributes['effectNShadowSpread'] ) && $attributes['effectNShadowSpread'] ) ? $attributes['effectNShadowSpread'] : '0px' ),
				( isset( $attributes['effectHShadowColor'] ) ) ? $attributes['effectHShadowColor'] : '#000',
			);
		}
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' .small-style:hover {';
		if (
				( isset( $attributes['effectHShadowHO'] ) && $attributes['effectHShadowHO'] ) ||
				( isset( $attributes['effectHShadowVO'] ) && $attributes['effectHShadowVO'] ) ||
				( isset( $attributes['effectHShadowBlur'] ) && $attributes['effectHShadowBlur'] ) ||
				( isset( $attributes['effectHShadowSpread'] ) && $attributes['effectHShadowSpread'] )
			) {
			$css = $css . sprintf(
				'box-shadow: %s %s %s %s %s;',
				( isset( $attributes['effectHShadowHO'] ) && $attributes['effectHShadowHO'] ) ? $attributes['effectHShadowHO'] : ( ( isset( $attributes['effectNShadowHO'] ) && $attributes['effectNShadowHO'] ) ? $attributes['effectNShadowHO'] : '0px' ),
				( isset( $attributes['effectHShadowVO'] ) && $attributes['effectHShadowVO'] ) ? $attributes['effectHShadowVO'] : ( ( isset( $attributes['effectNShadowVO'] ) && $attributes['effectNShadowVO'] ) ? $attributes['effectNShadowVO'] : '0px' ),
				( isset( $attributes['effectHShadowBlur'] ) && $attributes['effectHShadowBlur'] ) ? $attributes['effectHShadowBlur'] : ( ( isset( $attributes['effectNShadowBlur'] ) && $attributes['effectNShadowBlur'] ) ? $attributes['effectNShadowBlur'] : '0px' ),
				( isset( $attributes['effectHShadowSpread'] ) && $attributes['effectHShadowSpread'] ) ? $attributes['effectHShadowSpread'] : ( ( isset( $attributes['effectNShadowSpread'] ) && $attributes['effectNShadowSpread'] ) ? $attributes['effectNShadowSpread'] : '0px' ),
				( isset( $attributes['effectHShadowColor'] ) ) ? $attributes['effectHShadowColor'] : '#000',
			);
		}
		$css = $css . '}';
		// title hover.
		$css = $css . '.block-id-' . $attributes['id'] . ' .big-style:hover .title-style, ';
		$css = $css . '.block-id-' . $attributes['id'] . ' .small-style:hover .title-style {';
		if ( isset( $attributes['titleTextHColor'] ) && $attributes['titleTextHColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['titleTextHColor'] );
		}
		if ( isset( $attributes['bgHColor'] ) && $attributes['bgHColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['bgHColor'] );
		}
		$css = $css . '}';
		return $css;
	}
}

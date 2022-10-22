<?php
/**
 * Return a complete css for specific post grid 5 block.
 *
 * @package grigora-kit
 */

if ( ! function_exists( 'ga_generate_css_post_grid_5' ) ) {
	/**
	 * Return a complete css for specific post grid 5 block.
	 *
	 * @param array $attributes Block Attributes.
	 */
	function ga_generate_css_post_grid_5( $attributes ) {
		$css = '.block-id-' . $attributes['id'] . ' .block-style {';
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
		if ( ( isset( $attributes['transitionShadowTime'] ) ) ) {
			$css = $css . sprintf( 'transition: %s;', $attributes['transitionShadowTime'] . 's' );
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
			$css     = $css . '.block-id-' . $attributes['id'] . ' .cat-container {';
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
		$css     = $css . '.block-id-' . $attributes['id'] . ' .meta-style {';
			$css = $css . sprintf(
				'justify-content: %s;',
				( isset( $attributes['align'] ) ) ? $attributes['align'] : 'start'
			);
		$css     = $css . '}';
		$css     = $css . '.block-id-' . $attributes['id'] . ' .img-style {';
		if ( ( isset( $attributes['transitionImageTime'] ) ) ) {
			$css = $css . sprintf( 'transition: %s;', $attributes['transitionImageTime'] . 's' );
		}
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
		$css = $css . '.block-id-' . $attributes['id'] . ' .title-style {';
		if ( ( isset( $attributes['transitionColorTime'] ) ) && ( isset( $attributes['transitionColorTime'] ) ) ) {
			$css = $css . sprintf( 'transition: color %s, background-color %s;', $attributes['transitionColorTime'] . 's', $attributes['transitionColorTime'] . 's' );
		} elseif ( ( isset( $attributes['transitionColorTime'] ) ) ) {
			$css = $css . sprintf( 'transition: color %s;', $attributes['transitionColorTime'] . 's' );
		} elseif ( ( isset( $attributes['transitionColorTime'] ) ) ) {
			$css = $css . sprintf( 'transition: background-color %s;', $attributes['transitionColorTime'] . 's' );
		}
		if ( isset( $attributes['titleTextColor'] ) && $attributes['titleTextColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['titleTextColor'] );
		}
		if ( isset( $attributes['bgColor'] ) && $attributes['bgColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['bgColor'] );
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
		$css = $css . '.block-id-' . $attributes['id'] . ' .spanTitle-style {';
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
		if ( isset( $attributes['titleTypoSize'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['titleTypoSize'] );
		}
		if ( isset( $attributes['titleTypoWeight'] ) ) {
			$css = $css . sprintf( 'font-weight: %s;', $attributes['titleTypoWeight'] );
		}
		if ( isset( $attributes['titleTypoTransform'] ) ) {
			$css = $css . sprintf( 'text-transform: %s;', $attributes['titleTypoTransform'] );
		}
		if ( isset( $attributes['titleTypoStyle'] ) ) {
			$css = $css . sprintf( 'font-style: %s;', $attributes['titleTypoStyle'] );
		}
		if ( isset( $attributes['titleTypoDecoration'] ) ) {
			$css = $css . sprintf( 'text-decoration: %s;', $attributes['titleTypoDecoration'] );
		}
			$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['titleTypoLineHeight'] ) && ( 'normal' !== $attributes['titleTypoLineHeight'] ) ) ? $attributes['titleTypoLineHeight'] . 'px' : 'normal' );
			$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['titleTypoLetterSpacing'] ) && ( 'normal' !== $attributes['titleTypoLetterSpacing'] ) ) ? $attributes['titleTypoLetterSpacing'] . 'px' : 'normal' );
			$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['titleTypoWordSpacing'] ) && ( 'normal' !== $attributes['titleTypoWordSpacing'] ) ) ? $attributes['titleTypoWordSpacing'] . 'px' : 'normal' );
		if ( isset( $attributes['titleTypoFontFamily'] ) && isset( $attributes['titleTypoFontFamily'] ) ) {
			$css = $css . sprintf( 'font-family: %s;', $attributes['titleTypoFontFamily'] );
		}
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' .category-style {';
		if ( ( isset( $attributes['transitionCatColorTime'] ) ) && ( isset( $attributes['transitionCatColorTime'] ) ) ) {
			$css = $css . sprintf( 'transition: color %s, background-color %s;', $attributes['transitionCatColorTime'] . 's', $attributes['transitionCatColorTime'] . 's' );
		} elseif ( ( isset( $attributes['transitionCatColorTime'] ) ) ) {
			$css = $css . sprintf( 'transition: color %s;', $attributes['transitionCatColorTime'] . 's' );
		} elseif ( ( isset( $attributes['transitionCatColorTime'] ) ) ) {
			$css = $css . sprintf( 'transition: background-color %s;', $attributes['transitionCatColorTime'] . 's' );
		}
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
		$css     = $css . '.block-id-' . $attributes['id'] . ' .category-style {';
		if ( isset( $attributes['catTypoSize'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['catTypoSize'] );
		}
		if ( isset( $attributes['catTypoWeight'] ) ) {
			$css = $css . sprintf( 'font-weight: %s;', $attributes['catTypoWeight'] );
		}
		if ( isset( $attributes['catTypoTransform'] ) ) {
			$css = $css . sprintf( 'text-transform: %s;', $attributes['catTypoTransform'] );
		}
		if ( isset( $attributes['catTypoStyle'] ) ) {
			$css = $css . sprintf( 'font-style: %s;', $attributes['catTypoStyle'] );
		}
		if ( isset( $attributes['catTypoDecoration'] ) ) {
			$css = $css . sprintf( 'text-decoration: %s;', $attributes['catTypoDecoration'] );
		}
			$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['catTypoLineHeight'] ) && ( 'normal' !== $attributes['catTypoLineHeight'] ) ) ? $attributes['catTypoLineHeight'] . 'px' : 'normal' );
			$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['catTypoLetterSpacing'] ) && ( 'normal' !== $attributes['catTypoLetterSpacing'] ) ) ? $attributes['catTypoLetterSpacing'] . 'px' : 'normal' );
			$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['catTypoWordSpacing'] ) && ( 'normal' !== $attributes['catTypoWordSpacing'] ) ) ? $attributes['catTypoWordSpacing'] . 'px' : 'normal' );
		if ( isset( $attributes['catTypoFontFamily'] ) && isset( $attributes['catTypoFontFamily'] ) ) {
			$css = $css . sprintf( 'font-family: %s;', $attributes['catTypoFontFamily'] );
		}
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' .meta-field-container svg{';
		if ( isset( $attributes['metaTypoSize'] ) ) {
			$css = $css . sprintf( 'width: %spx;', $attributes['metaTypoSize'] );
			$css = $css . sprintf( 'height: %spx;', $attributes['metaTypoSize'] );
		}
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' .meta-field-container {';
		if ( isset( $attributes['metaTypoSize'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['metaTypoSize'] );
		}
		if ( isset( $attributes['metaTypoWeight'] ) ) {
			$css = $css . sprintf( 'font-weight: %s;', $attributes['metaTypoWeight'] );
		}
		if ( isset( $attributes['metaTypoTransform'] ) ) {
			$css = $css . sprintf( 'text-transform: %s;', $attributes['metaTypoTransform'] );
		}
		if ( isset( $attributes['metaTypoStyle'] ) ) {
			$css = $css . sprintf( 'font-style: %s;', $attributes['metaTypoStyle'] );
		}
		if ( isset( $attributes['metaTypoDecoration'] ) ) {
			$css = $css . sprintf( 'text-decoration: %s;', $attributes['metaTypoDecoration'] );
		}
			$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['metaTypoLineHeight'] ) && ( 'normal' !== $attributes['metaTypoLineHeight'] ) ) ? $attributes['metaTypoLineHeight'] . 'px' : 'normal' );
			$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['metaTypoLetterSpacing'] ) && ( 'normal' !== $attributes['metaTypoLetterSpacing'] ) ) ? $attributes['metaTypoLetterSpacing'] . 'px' : 'normal' );
			$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['metaTypoWordSpacing'] ) && ( 'normal' !== $attributes['metaTypoWordSpacing'] ) ) ? $attributes['metaTypoWordSpacing'] . 'px' : 'normal' );
		if ( isset( $attributes['metaTypoFontFamily'] ) && isset( $attributes['metaTypoFontFamily'] ) ) {
			$css = $css . sprintf( 'font-family: %s;', $attributes['metaTypoFontFamily'] );
		}
		$css = $css . '}';
		// category hover.
		$css = $css . '.block-id-' . $attributes['id'] . ' .category-style:hover {';
		if ( isset( $attributes['categoryTextHColor'] ) && $attributes['categoryTextHColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['categoryTextHColor'] );
		}
		if ( isset( $attributes['bgHCatColor'] ) && $attributes['bgHCatColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['bgHCatColor'] );
		}
		$css = $css . '}';
		// box-shadow hover.
		$css = $css . '.block-id-' . $attributes['id'] . ' .block-style:hover {';
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
		// image hover.
		$css = $css . '.block-id-' . $attributes['id'] . ' .block-style:hover .img-style {';
		if ( isset( $attributes['hoverAnimation'] ) && $attributes['hoverAnimation'] ) {
			if ( 'zoomIn' === $attributes['hoverAnimation'] ) {
				$css = $css . 'scale: 1;';
			} elseif ( 'zoomOut' === $attributes['hoverAnimation'] ) {
				$css = $css . 'scale: 1.4;';
			} elseif ( 'opacity' === $attributes['hoverAnimation'] ) {
				$css = $css . 'opacity: 0.7;';
			} elseif ( 'rotateLeft' === $attributes['hoverAnimation'] ) {
				$css = $css . 'transform: rotate(-5deg);';
			} elseif ( 'rotateRight' === $attributes['hoverAnimation'] ) {
				$css = $css . 'transform: rotate(5deg);';
			} elseif ( 'slideLeft' === $attributes['hoverAnimation'] ) {
				$css = $css . 'transform: translateX(-8%);';
			} elseif ( 'slideRight' === $attributes['hoverAnimation'] ) {
				$css = $css . 'transform: translateX(8%);';
			} elseif ( 'none' === $attributes['hoverAnimation'] ) {
				$css = $css . 'scale: 1.2;';
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
		// title hover.
		$css = $css . '.block-id-' . $attributes['id'] . ' .block-style:hover .title-style {';
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

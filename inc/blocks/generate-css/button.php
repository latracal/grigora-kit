<?php

/**
 * Return a complete css for specific button block.
 */
if ( ! function_exists( 'ga_generate_css_button' ) ) {

	function ga_generate_css_button( $attributes ) {
		if ( isset( $attributes['id'] ) ) {
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
			$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoLineHeight'] ) && ( $attributes['typoLineHeight'] != 'normal' ) ) ? $attributes['typoLineHeight'] . 'px' : 'normal' );
			$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoLetterSpacing'] ) && ( $attributes['typoLetterSpacing'] != 'normal' ) ) ? $attributes['typoLetterSpacing'] . 'px' : 'normal' );
			$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoWordSpacing'] ) && ( $attributes['typoWordSpacing'] != 'normal' ) ) ? $attributes['typoWordSpacing'] . 'px' : 'normal' );
			if ( isset( $attributes['typoFontFamily'] ) && isset( $attributes['typoFontFamily'] ) ) {
				$css = $css . sprintf( 'font-family: %s;', $attributes['typoFontFamily'] );
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
			if ( ( isset( $attributes['textShadowHorizontal'] ) && $attributes['textShadowHorizontal'] != '0px' ) ||
				( isset( $attributes['textShadowVertical'] ) && $attributes['textShadowVertical'] != '0px' ) ||
				( isset( $attributes['textShadowBlur'] ) && $attributes['textShadowBlur'] != '0px' )
			) {
				$css = $css . sprintf(
					'text-shadow: %s %s %s %s;',
					( isset( $attributes['textShadowHorizontal'] ) ? $attributes['textShadowHorizontal'] : '0px' ),
					( isset( $attributes['textShadowVertical'] ) ? $attributes['textShadowVertical'] : '0px' ),
					( isset( $attributes['textShadowBlur'] ) ? $attributes['textShadowBlur'] : '0px' ),
					( isset( $attributes['textShadowColor'] ) ? $attributes['textShadowColor'] : '#000' )
				);
			}
			if ( isset( $attributes['layoutVerticalAlign'] ) ) {
				$css = $css . sprintf( 'align-self: %s;', $attributes['layoutVerticalAlign'] );
			}
			if ( isset( $attributes['layoutPosition'] ) ) {
				$css = $css . sprintf( 'position: %s;', $attributes['layoutPosition'] );
			}
			if ( isset( $attributes['effectNColor'] ) ) {
				$css = $css . sprintf( 'color: %s;', $attributes['effectNColor'] );
			}
			if ( isset( $attributes['effectNBFlag'] ) && $attributes['effectNBFlag'] ) {
				$css = $css . sprintf( 'background-image: %s;', ( isset( $attributes['effectNBGradient'] ) ? $attributes['effectNBGradient'] : 'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)' ) );
			}
			if ( isset( $attributes['effectNBColor'] ) ) {
				$css = $css . sprintf( 'background-color: %s;', $attributes['effectNBColor'] );
			}
			if ( isset( $attributes['effectNBorder'] ) ) {
				if ( isset( $attributes['effectNBorder']['left'] ) ) {
					$css = $css . sprintf(
						'border-left: %s %s %s;',
						( isset( $attributes['effectNBorder']['left']['width'] ) ) ? $attributes['effectNBorder']['left']['width'] : '',
						( isset( $attributes['effectNBorder']['left']['style'] ) ) ? $attributes['effectNBorder']['left']['style'] : '',
						( isset( $attributes['effectNBorder']['left']['color'] ) ) ? $attributes['effectNBorder']['left']['color'] : ''
					);
				}
				if ( isset( $attributes['effectNBorder']['right'] ) ) {
					$css = $css . sprintf(
						'border-right: %s %s %s;',
						( isset( $attributes['effectNBorder']['right']['width'] ) ) ? $attributes['effectNBorder']['right']['width'] : '',
						( isset( $attributes['effectNBorder']['right']['style'] ) ) ? $attributes['effectNBorder']['right']['style'] : '',
						( isset( $attributes['effectNBorder']['right']['color'] ) ) ? $attributes['effectNBorder']['right']['color'] : ''
					);
				}
				if ( isset( $attributes['effectNBorder']['top'] ) ) {
					$css = $css . sprintf(
						'border-top: %s %s %s;',
						( isset( $attributes['effectNBorder']['top']['width'] ) ) ? $attributes['effectNBorder']['top']['width'] : '',
						( isset( $attributes['effectNBorder']['top']['style'] ) ) ? $attributes['effectNBorder']['top']['style'] : '',
						( isset( $attributes['effectNBorder']['top']['color'] ) ) ? $attributes['effectNBorder']['top']['color'] : ''
					);
				}
				if ( isset( $attributes['effectNBorder']['bottom'] ) ) {
					$css = $css . sprintf(
						'border-bottom: %s %s %s;',
						( isset( $attributes['effectNBorder']['bottom']['width'] ) ) ? $attributes['effectNBorder']['bottom']['width'] : '',
						( isset( $attributes['effectNBorder']['bottom']['style'] ) ) ? $attributes['effectNBorder']['bottom']['style'] : '',
						( isset( $attributes['effectNBorder']['bottom']['color'] ) ) ? $attributes['effectNBorder']['bottom']['color'] : ''
					);
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
			$css = $css . sprintf(
				'box-shadow: %s %s %s %s %s;',
				( isset( $attributes['effectNShadowHO'] ) ) ? $attributes['effectNShadowHO'] : '0px',
				( isset( $attributes['effectNShadowVO'] ) ) ? $attributes['effectNShadowVO'] : '0px',
				( isset( $attributes['effectNShadowBlur'] ) ) ? $attributes['effectNShadowBlur'] : '0px',
				( isset( $attributes['effectNShadowSpread'] ) ) ? $attributes['effectNShadowSpread'] : '0px',
				( isset( $attributes['effectNShadowColor'] ) ) ? $attributes['effectNShadowColor'] : '#000',
			);
			$css = $css . sprintf( 'transition: %ss;', ( isset( $attributes['transitionTime'] ) ) ? $attributes['transitionTime'] : '1' );
			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . '.animateOnce {';
			if ( isset( $attributes['entranceAnimation'] ) && $attributes['entranceAnimation'] != 'none' ) {
				$css = $css . sprintf(
					'animation: %s %s %s;',
					$attributes['entranceAnimation'],
					( isset( $attributes['entranceAnimationTime'] ) && $attributes['entranceAnimationTime'] ) ? $attributes['entranceAnimationTime'] . 's' : '1s',
					( isset( $attributes['entranceAnimationDelay'] ) && $attributes['entranceAnimationDelay'] ) ? $attributes['entranceAnimationDelay'] . 'ms' : ''
				);
			}
			$css = $css . '}';
			if ( isset( $attributes['icon'] ) && $attributes['icon'] ) {
				$css = $css . '.block-id-' . $attributes['id'] . ' .grigora-svg-icon {';
				if ( isset( $attributes['iconColorFlag'] ) && $attributes['iconColorFlag'] && isset( $attributes['iconNormalColor'] ) ) {
					$css = $css . sprintf( 'color: %s;', $attributes['iconNormalColor'] );
				}
				if ( isset( $attributes['iconPadding'] ) && isset( $attributes['iconPadding']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['iconPadding']['left'] );
				} else {
					$css = $css . sprintf( 'padding-left: 5px;' );
				}
				if ( isset( $attributes['iconPadding'] ) && isset( $attributes['iconPadding']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['iconPadding']['right'] );
				} else {
					$css = $css . sprintf( 'padding-right: 5px;' );
				}
				if ( isset( $attributes['iconPadding'] ) && isset( $attributes['iconPadding']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['iconPadding']['top'] );
				} else {
					$css = $css . sprintf( 'padding-top: 0px;' );
				}
				if ( isset( $attributes['iconPadding'] ) && isset( $attributes['iconPadding']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['iconPadding']['bottom'] );
				} else {
					$css = $css . sprintf( 'padding-bottom: 0px;' );
				}
				$css = $css . '}';
				$css = $css . '.block-id-' . $attributes['id'] . ':hover .grigora-svg-icon {';
				if ( isset( $attributes['iconColorFlag'] ) && $attributes['iconColorFlag'] && isset( $attributes['iconHoverColor'] ) && $attributes['iconHoverColor'] ) {
					$css = $css . sprintf( 'color: %s;', $attributes['iconHoverColor'] );
				}
				$css = $css . '}';
				$css = $css . '.block-id-' . $attributes['id'] . ' .grigora-svg-icon svg {';
				if ( isset( $attributes['iconSize'] ) ) {
					$css = $css . sprintf( 'width: %s;', $attributes['iconSize'] );
					$css = $css . sprintf( 'height: %s;', $attributes['iconSize'] );
				} else {
					$css = $css . sprintf( 'width: 26px;' );
					$css = $css . sprintf( 'height: 26px;' );
				}
				$css = $css . '}';
			}

			$css = $css . '.block-id-' . $attributes['id'] . ':hover{';
			if ( isset( $attributes['effectHColor'] ) && $attributes['effectHColor'] ) {
				$css = $css . sprintf( 'color: %s;', $attributes['effectHColor'] );
			} else {
				$css = $css . sprintf( 'color: #ffffff;' );
			}
			if ( isset( $attributes['effectNBFlag'] ) && ! $attributes['effectNBFlag'] && isset( $attributes['effectHBColor'] ) && $attributes['effectHBColor'] ) {
				$css = $css . sprintf( 'background-color: %s;', $attributes['effectHBColor'] );
			}
			if ( ! isset( $attributes['effectNBFlag'] ) && isset( $attributes['effectHBColor'] ) && $attributes['effectHBColor'] ) {
				$css = $css . sprintf( 'background-color: %s;', $attributes['effectHBColor'] );
			}
			if ( isset( $attributes['effectHAnimation'] ) && $attributes['effectHAnimation'] != 'none' ) {
				$css = $css . sprintf( 'animation: %s %ss;', $attributes['effectHAnimation'], ( isset( $attributes['hoverAnimationTime'] ) ) ? $attributes['hoverAnimationTime'] : '1' );
			}
			if ( isset( $attributes['effectHBorder'] ) ) {
				if ( isset( $attributes['effectHBorder']['left'] ) ) {
					$css = $css . sprintf(
						'border-left: %s %s %s;',
						( isset( $attributes['effectHBorder']['left']['width'] ) ) ? $attributes['effectHBorder']['left']['width'] : '',
						( isset( $attributes['effectHBorder']['left']['style'] ) ) ? $attributes['effectHBorder']['left']['style'] : '',
						( isset( $attributes['effectHBorder']['left']['color'] ) ) ? $attributes['effectHBorder']['left']['color'] : ''
					);
				}
				if ( isset( $attributes['effectHBorder']['right'] ) ) {
					$css = $css . sprintf(
						'border-right: %s %s %s;',
						( isset( $attributes['effectHBorder']['right']['width'] ) ) ? $attributes['effectHBorder']['right']['width'] : '',
						( isset( $attributes['effectHBorder']['right']['style'] ) ) ? $attributes['effectHBorder']['right']['style'] : '',
						( isset( $attributes['effectHBorder']['right']['color'] ) ) ? $attributes['effectHBorder']['right']['color'] : ''
					);
				}
				if ( isset( $attributes['effectHBorder']['top'] ) ) {
					$css = $css . sprintf(
						'border-top: %s %s %s;',
						( isset( $attributes['effectHBorder']['top']['width'] ) ) ? $attributes['effectHBorder']['top']['width'] : '',
						( isset( $attributes['effectHBorder']['top']['style'] ) ) ? $attributes['effectHBorder']['top']['style'] : '',
						( isset( $attributes['effectHBorder']['top']['color'] ) ) ? $attributes['effectHBorder']['top']['color'] : ''
					);
				}
				if ( isset( $attributes['effectHBorder']['bottom'] ) ) {
					$css = $css . sprintf(
						'border-bottom: %s %s %s;',
						( isset( $attributes['effectHBorder']['bottom']['width'] ) ) ? $attributes['effectHBorder']['bottom']['width'] : '',
						( isset( $attributes['effectHBorder']['bottom']['style'] ) ) ? $attributes['effectHBorder']['bottom']['style'] : '',
						( isset( $attributes['effectHBorder']['bottom']['color'] ) ) ? $attributes['effectHBorder']['bottom']['color'] : ''
					);
				}
			}
			if ( isset( $attributes['effectHBorderRadius'] ) ) {
				if ( isset( $attributes['effectHBorderRadius']['topRight'] ) ) {
					$css = $css . sprintf( 'border-top-right-radius: %s;', $attributes['effectHBorderRadius']['topRight'] );
				}
				if ( isset( $attributes['effectHBorderRadius']['topLeft'] ) ) {
					$css = $css . sprintf( 'border-top-left-radius: %s;', $attributes['effectHBorderRadius']['topLeft'] );
				}
				if ( isset( $attributes['effectHBorderRadius']['bottomRight'] ) ) {
					$css = $css . sprintf( 'border-bottom-right-radius: %s;', $attributes['effectHBorderRadius']['bottomRight'] );
				}
				if ( isset( $attributes['effectHBorderRadius']['bottomLeft'] ) ) {
					$css = $css . sprintf( 'border-bottom-left-radius: %s;', $attributes['effectHBorderRadius']['bottomLeft'] );
				}
			}
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
			if ( ( isset( $attributes['effectHPerspective'] ) && $attributes['effectHPerspective'] ) ||
					( isset( $attributes['effectHRotateX'] ) && $attributes['effectHRotateX'] ) ||
					( isset( $attributes['effectHRotateY'] ) && $attributes['effectHRotateY'] ) ||
					( isset( $attributes['effectHRotateZ'] ) && $attributes['effectHRotateZ'] ) ||
					( isset( $attributes['effectHSkewX'] ) && $attributes['effectHSkewX'] ) ||
					( isset( $attributes['effectHSkewY'] ) && $attributes['effectHSkewY'] ) ||
					( isset( $attributes['effectHOffsetX'] ) && $attributes['effectHOffsetX'] ) ||
					( isset( $attributes['effectHOffsetY'] ) && $attributes['effectHOffsetY'] ) ||
					( isset( $attributes['effectHScale'] ) && $attributes['effectHScale'] )
				) {

				$css = $css . sprintf(
					'transform: %s %s %s %s %s %s %s %s %s;',
					( isset( $attributes['effectHPerspective'] ) && $attributes['effectHPerspective'] ) ? "perspective({$attributes['effectHPerspective']})" : ( ( isset( $attributes['effectNPerspective'] ) && $attributes['effectNPerspective'] ) ? "perspective({$attributes['effectNPerspective']})" : '' ),
					( isset( $attributes['effectHRotateX'] ) && $attributes['effectHRotateX'] ) ? "rotateX({$attributes['effectHRotateX']})" : ( ( isset( $attributes['effectNRotateX'] ) && $attributes['effectNRotateX'] ) ? "rotateX({$attributes['effectNRotateX']})" : '' ),
					( isset( $attributes['effectHRotateY'] ) && $attributes['effectHRotateY'] ) ? "rotateY({$attributes['effectHRotateY']})" : ( ( isset( $attributes['effectNRotateY'] ) && $attributes['effectNRotateY'] ) ? "rotateY({$attributes['effectNRotateY']})" : '' ),
					( isset( $attributes['effectHRotateZ'] ) && $attributes['effectHRotateZ'] ) ? "rotateZ({$attributes['effectHRotateZ']})" : ( ( isset( $attributes['effectNRotateZ'] ) && $attributes['effectNRotateZ'] ) ? "rotateZ({$attributes['effectNRotateZ']})" : '' ),
					( isset( $attributes['effectHSkewX'] ) && $attributes['effectHSkewX'] ) ? "skewX({$attributes['effectHSkewX']})" : ( ( isset( $attributes['effectNSkewX'] ) && $attributes['effectNSkewX'] ) ? "skewX({$attributes['effectNSkewX']})" : '' ),
					( isset( $attributes['effectHSkewY'] ) && $attributes['effectHSkewY'] ) ? "skewY({$attributes['effectHSkewY']})" : ( ( isset( $attributes['effectNSkewY'] ) && $attributes['effectNSkewY'] ) ? "skewY({$attributes['effectNSkewY']})" : '' ),
					( isset( $attributes['effectHOffsetX'] ) && $attributes['effectHOffsetX'] ) ? "translateX({$attributes['effectHOffsetX']})" : ( ( isset( $attributes['effectNOffsetX'] ) && $attributes['effectNOffsetX'] ) ? "translateX({$attributes['effectNOffsetX']})" : '' ),
					( isset( $attributes['effectHOffsetY'] ) && $attributes['effectHOffsetY'] ) ? "translateY({$attributes['effectHOffsetY']})" : ( ( isset( $attributes['effectNOffsetY'] ) && $attributes['effectNOffsetY'] ) ? "translateY({$attributes['effectNOffsetY']})" : '' ),
					( isset( $attributes['effectHScale'] ) ) ? "scale({$attributes['effectHScale']})" : ( ( isset( $attributes['effectNScale'] ) && $attributes['effectNScale'] ) ? "scale({$attributes['effectNScale']})" : '' ),
				);
			}
				$css = $css . '}';
			if ( isset( $attributes['effectNBFlag'] ) && $attributes['effectNBFlag'] ) {
				$css = $css . '.block-id-' . $attributes['id'] . '::before { ' . sprintf( 'background-image: %s;', ( isset( $attributes['effectHBGradient'] ) && $attributes['effectHBGradient'] ? $attributes['effectHBGradient'] : '' ) ) . '}';
			}
			return $css;
		}
		return '';
	}
}

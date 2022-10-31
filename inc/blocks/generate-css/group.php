<?php
/**
 * Generate Group CSS for Group.
 *
 * @package grigora-kit
 */

if ( ! function_exists( 'ga_generate_css_group' ) ) {
	/**
	 * Generate Group CSS for Group.
	 *
	 * @param array $attributes Block Attributes.
	 */
	function ga_generate_css_group( $attributes ) {
		if ( ! isset( $attributes['id'] ) ) {
			return '';
		}
		$css = '.block-id-' . $attributes['id'] . '{';
		if ( isset( $attributes['overflow'] ) && $attributes['overflow'] ) {
			$css = $css . sprintf( 'overflow: %s;', $attributes['overflow'] );
		}
		if ( isset( $attributes['verticalAlignment'] ) ) {
			if ( 'top' === $attributes['verticalAlignment'] ) {
				$css = $css . 'display: flex; align-items: flex-start;';
			}
			if ( 'center' === $attributes['verticalAlignment'] ) {
				$css = $css . 'display: flex; align-items: center;';
			}
			if ( 'bottom' === $attributes['verticalAlignment'] ) {
				$css = $css . 'display: flex; align-items: flex-end;';
			}
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
		if ( isset( $attributes['structureMaxWidth'] ) && $attributes['structureMaxWidth'] && isset( $attributes['groupAlign'] ) ) {
			if ( 'left' === $attributes['groupAlign'] ) {
				$css = $css . 'margin-left: 0 !important; margin-right: auto !important;';
			} elseif ( 'center' === $attributes['groupAlign'] ) {
				$css = $css . 'margin-left: auto !important; margin-right: auto !important;';
			} elseif ( 'right' === $attributes['groupAlign'] ) {
				$css = $css . 'margin-left: auto !important; margin-right: 0 !important;';
			}
		}
		if ( isset( $attributes['align'] ) && $attributes['align'] ) {
			if ( isset( $attributes['verticalAlignment'] ) && $attributes['verticalAlignment'] ) {
				$css = $css . sprintf( 'justify-content: %s;', $attributes['align'] );
			} else {
				$css = $css . sprintf( 'text-align: %s;', $attributes['align'] );
			}
		}
		if ( isset( $attributes['textNColor'] ) && $attributes['textNColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['textNColor'] );
		}
		if ( isset( $attributes['structureMaxWidth'] ) && $attributes['structureMaxWidth'] ) {
			$css = $css . sprintf( 'max-width: %s;', $attributes['structureMaxWidth'] );
		}
		if ( isset( $attributes['structureMinHeight'] ) && $attributes['structureMinHeight'] ) {
			$css = $css . sprintf( 'min-height: %s;', $attributes['structureMinHeight'] );
		}
		$css = $css . sprintf( 'transition: %ss;', isset( $attributes['transitionTime'] ) ? $attributes['transitionTime'] : 1 );
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
		if ( ! ( ( isset( $attributes['backgroundFixed'] ) && $attributes['backgroundFixed'] ) ||
			( isset( $attributes['backgroundOFixed'] ) && $attributes['backgroundOFixed'] ) )
		) {
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
		}
		if (
			( isset( $attributes['effectNShadowHO'] ) && '0px' !== $attributes['effectNShadowHO'] ) ||
			( isset( $attributes['effectNShadowVO'] ) && '0px' !== $attributes['effectNShadowVO'] ) ||
			( isset( $attributes['effectNShadowBlur'] ) && '0px' !== $attributes['effectNShadowBlur'] ) ||
			( isset( $attributes['effectNShadowSpread'] ) && '0px' !== $attributes['effectNShadowSpread'] ) ||
			( isset( $attributes['effectNShadowColor'] ) && '#000' !== $attributes['effectNShadowColor'] )
		) {
			$css = $css . sprintf(
				'box-shadow: %s %s %s %s %s;',
				( isset( $attributes['effectNShadowHO'] ) ) ? $attributes['effectNShadowHO'] : '0px',
				( isset( $attributes['effectNShadowVO'] ) ) ? $attributes['effectNShadowVO'] : '0px',
				( isset( $attributes['effectNShadowBlur'] ) ) ? $attributes['effectNShadowBlur'] : '0px',
				( isset( $attributes['effectNShadowSpread'] ) ) ? $attributes['effectNShadowSpread'] : '0px',
				( isset( $attributes['effectNShadowColor'] ) ) ? $attributes['effectNShadowColor'] : '#000',
			);
		}
		$css = $css . '}';
		if ( isset( $attributes['layoutGap'] ) && $attributes['layoutGap'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ' .inner-content > * + * {';
			$css = $css . sprintf( 'margin-block-start: %s;', $attributes['layoutGap'] );
			$css = $css . '}';
		}
		if ( isset( $attributes['linkNColor'] ) && $attributes['linkNColor'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ' a {';
			$css = $css . sprintf( 'color: %s;', $attributes['linkNColor'] );
			$css = $css . '}';
		}
		if ( isset( $attributes['textHColor'] ) && $attributes['textHColor'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ':hover {';
			$css = $css . sprintf( 'color: %s;', $attributes['textHColor'] );
			$css = $css . '}';
		}
		if ( isset( $attributes['linkHColor'] ) && $attributes['linkHColor'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ':hover a {';
			$css = $css . sprintf( 'color: %s;', $attributes['linkHColor'] );
			$css = $css . '}';
		}
			$css = $css . '.block-id-' . $attributes['id'] . ':hover{';
		if ( isset( $attributes['effectNBFlag'] ) && ! $attributes['effectNBFlag'] && isset( $attributes['effectHBColor'] ) ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['effectHBColor'] );
		}
		if ( ! isset( $attributes['effectNBFlag'] ) && isset( $attributes['effectHBColor'] ) ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['effectHBColor'] );
		}
		if ( isset( $attributes['effectHAnimation'] ) && 'none' !== $attributes['effectHAnimation'] ) {
			$css = $css . sprintf( 'animation: %s %ss;', $attributes['effectHAnimation'], ( isset( $attributes['effectHAnimationTime'] ) ) ? $attributes['effectHAnimationTime'] : '1' );
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
		if ( ! ( ( isset( $attributes['backgroundFixed'] ) && $attributes['backgroundFixed'] ) ||
				( isset( $attributes['backgroundOFixed'] ) && $attributes['backgroundOFixed'] ) )
			) {
			if (
			( isset( $attributes['effectHPerspective'] ) && $attributes['effectHPerspective'] ) ||
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

		if ( isset( $attributes['backgroundNMode'] ) && $attributes['backgroundNMode'] ) {
			if ( 'color' === $attributes['backgroundNMode'] && isset( $attributes['backgroundNColor'] ) && $attributes['backgroundNColor'] ) {
				$css = $css . '.block-id-' . $attributes['id'] . ' > .background-color {background-color: ' . $attributes['backgroundNColor'] . ';}';
			}
			if ( 'gradient' === $attributes['backgroundNMode'] ) {
				$css = $css . '.block-id-' . $attributes['id'] . sprintf(
					' > .background-color {background-image: %s; background-attachment: %s;}',
					( isset( $attributes['backgroundNGradient'] ) && $attributes['backgroundNGradient'] ) ? $attributes['backgroundNGradient'] : 'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)',
					( isset( $attributes['backgroundFixed'] ) && $attributes['backgroundFixed'] ) ? 'fixed' : '',
				);
			}
			if ( 'images' === $attributes['backgroundNMode'] ) {
				if ( isset( $attributes['images'] ) && count( $attributes['images'] ) > 1 ) {
					$css           = $css . '.block-id-' . $attributes['id'] . ' > .grigora-group-slideshow li span {';
					$css           = $css . sprintf(
						'background-attachment: %s;',
						isset( $attributes['backgroundFixed'] ) && $attributes['backgroundFixed'] ? 'fixed' : ''
					);
					$css           = $css . '-webkit-backface-visibility: hidden;';
					$animation_str = sprintf(
						'imageAnimation-%s %ss linear %s 0s %s',
						$attributes['id'],
						isset( $attributes['imageDuration'] ) ? count( $attributes['images'] ) * $attributes['imageDuration'] : count( $attributes['images'] ) * 5,
						isset( $attributes['imageLoop'] ) ? ( $attributes['imageLoop'] ? 'infinite' : '1' ) : 'infinite',
						isset( $attributes['imageLoop'] ) ? ( $attributes['imageLoop'] ? '' : 'forwards' ) : '',
					);
					$css           = $css . '-webkit-animation: ' . $animation_str . ';';
					$css           = $css . '-moz-animation: ' . $animation_str . ';';
					$css           = $css . '-o-animation: ' . $animation_str . ';';
					$css           = $css . '-ms-animation: ' . $animation_str . ';';
					$css           = $css . 'animation: ' . $animation_str . ';';
					if ( isset( $attributes['imageTransition'] ) ) {
						if ( 'fade' === $attributes['imageTransition'] ) {
							$css = $css . 'opacity: 0;';
						} else {
							$css = $css . 'opacity: 1;';
						}
						if ( 'slideright' === $attributes['imageTransition'] ) {
							$css = $css . 'transform: translateX(-100%);';
						}
						if ( 'slideleft' === $attributes['imageTransition'] ) {
							$css = $css . 'transform: translateX(100%);';
						}
						if ( 'slideup' === $attributes['imageTransition'] ) {
							$css = $css . 'transform: translateY(100%);';
						}
						if ( 'slidedown' === $attributes['imageTransition'] ) {
							$css = $css . 'transform: translateY(-100%);';
						}
					} else {
						$css = $css . 'opacity: 0;';
					}
					$css = $css . '}';

					foreach ( $attributes['images'] as $key => $value ) {
						$css       = $css . ' .block-id-' . $attributes['id'] . ' > .grigora-group-slideshow li:nth-child(' . ( $key + 1 ) . ') span {';
						$css       = $css . sprintf(
							'background-position: %s %s;',
							( isset( $attributes['imageFocus']['x'] ) && $attributes['imageFocus']['x'] ) ? $attributes['imageFocus']['x'] * 100 . '%' : '50%',
							( isset( $attributes['imageFocus']['y'] ) && $attributes['imageFocus']['y'] ) ? $attributes['imageFocus']['y'] * 100 . '%' : '50%',
						);
							$css   = $css . sprintf(
								'background-image: url(%s);',
								isset( $value['url'] ) ? $value['url'] : ''
							);
							$delay = $key * ( isset( $attributes['imageDuration'] ) ? $attributes['imageDuration'] : 5 ) . 's';
							$css   = $css . '-webkit-animation-delay: ' . $delay . ';';
							$css   = $css . '-moz-animation-delay: ' . $delay . ';';
							$css   = $css . '-o-animation-delay: ' . $delay . ';';
							$css   = $css . '-ms-animation-delay: ' . $delay . ';';
							$css   = $css . 'animation-delay: ' . $delay . ';';
						$css       = $css . '} ';
					}

					$image_transition          = ( isset( $attributes['imageTransition'] ) ? $attributes['imageTransition'] : 'fade' );
					$image_transition_duration = ( isset( $attributes['imageTransitionDuration'] ) ? $attributes['imageTransitionDuration'] : 0.5 );
					$image_duration            = ( isset( $attributes['imageDuration'] ) ? $attributes['imageDuration'] : 5 );
					$image_loop                = isset( $attributes['imageLoop'] ) ? $attributes['imageLoop'] : true;

					$css = $css . '@keyframes imageAnimation-' . $attributes['id'] . ' {';
					if ( 'fade' === $image_transition ) {
						$css = $css . '0% { opacity: 0; }';
					} elseif ( 'slideright' === $image_transition ) {
						$css = $css . '0% { transform: translateX(-100%); }';
					} elseif ( 'slideleft' === $image_transition ) {
						$css = $css . '0% { transform: translateX(100%); }';
					} elseif ( 'slideup' === $image_transition ) {
						$css = $css . '0% { transform: translateY(100%); }';
					} elseif ( 'slidedown' === $image_transition ) {
						$css = $css . '0% { transform: translateY(-100%); }';
					}
					$css = $css . number_format( $image_transition_duration * 100 / ( count( $attributes['images'] ) * $image_duration ), 2, '.', '' ) . '% {';
					if ( 'fade' === $image_transition ) {
						$css = $css . 'opacity: 1;';
					} elseif ( 'slideright' === $image_transition ) {
						$css = $css . 'transform: translateX(0%);';
					} elseif ( 'slideleft' === $image_transition ) {
						$css = $css . 'transform: translateX(0%);';
					} elseif ( 'slideup' === $image_transition ) {
						$css = $css . 'transform: translateY(0%);';
					} elseif ( 'slidedown' === $image_transition ) {
						$css = $css . 'transform: translateY(0%);';
					}
					$css = $css . '} ';
					$css = $css . number_format( ( $image_transition_duration + $image_duration ) * 100 / ( count( $attributes['images'] ) * $image_duration ), 2, '.', '' ) . '% {';
					if ( 'fade' === $image_transition ) {
						$css = $css . 'opacity: 1;';
					} elseif ( 'slideright' === $image_transition ) {
						$css = $css . 'transform: translateX(0%);';
					} elseif ( 'slideleft' === $image_transition ) {
						$css = $css . 'transform: translateX(0%);';
					} elseif ( 'slideup' === $image_transition ) {
						$css = $css . 'transform: translateY(0%);';
					} elseif ( 'slidedown' === $image_transition ) {
						$css = $css . 'transform: translateY(0%);';
					}
					$css = $css . '} ';
					$css = $css . number_format( ( $image_transition_duration * 2 + $image_duration ) * 100 / ( count( $attributes['images'] ) * $image_duration ), 2, '.', '' ) . '% {';
					if ( 'fade' === $image_transition ) {
						if ( $image_loop ) {
							$css = $css . 'opacity: 0;';
						} else {
							$css = $css . 'opacity: 1;';
						}
					} elseif ( 'slideright' === $image_transition ) {
						if ( $image_loop ) {
							$css = $css . 'transform: translateX(100%);';
						} else {
							$css = $css . 'transform: translateX(0%);';
						}
					} elseif ( 'slideleft' === $image_transition ) {
						if ( $image_loop ) {
							$css = $css . 'transform: translateX(-100%);';
						} else {
							$css = $css . 'transform: translateX(0%);';
						}
					} elseif ( 'slideup' === $image_transition ) {
						if ( $image_loop ) {
							$css = $css . 'transform: translateY(-100%);';
						} else {
							$css = $css . 'transform: translateY(0%);';
						}
					} elseif ( 'slidedown' === $image_transition ) {
						if ( $image_loop ) {
							$css = $css . 'transform: translateY(100%);';
						} else {
							$css = $css . 'transform: translateY(0%);';
						}
					}
					$css = $css . '} ';
					$css = $css . '100% {';
					if ( 'fade' === $image_transition ) {
						if ( $image_loop ) {
							$css = $css . 'opacity: 0;';
						} else {
							$css = $css . 'opacity: 1;';
						}
					} elseif ( 'slideright' === $image_transition ) {
						if ( $image_loop ) {
							$css = $css . 'transform: translateX(100%);';
						} else {
							$css = $css . 'transform: translateX(0%);';
						}
					} elseif ( 'slideleft' === $image_transition ) {
						if ( $image_loop ) {
							$css = $css . 'transform: translateX(-100%);';
						} else {
							$css = $css . 'transform: translateX(0%);';
						}
					} elseif ( 'slideup' === $image_transition ) {
						if ( $image_loop ) {
							$css = $css . 'transform: translateY(-100%);';
						} else {
							$css = $css . 'transform: translateY(0%);';
						}
					} elseif ( 'slidedown' === $image_transition ) {
						if ( $image_loop ) {
							$css = $css . 'transform: translateY(100%);';
						} else {
							$css = $css . 'transform: translateY(0%);';
						}
					}
					$css = $css . '} ';
					$css = $css . '} ';
				} elseif ( isset( $attributes['images'] ) && 1 === count( $attributes['images'] ) ) {
					$css = $css . '.block-id-' . $attributes['id'] . ' > .grigora-group-slideshow li:nth-child(1) span {';
					$css = $css . sprintf(
						'background-position: %s %s;',
						( isset( $attributes['imageFocus']['x'] ) && $attributes['imageFocus']['x'] ) ? $attributes['imageFocus']['x'] * 100 . '%' : '50%',
						( isset( $attributes['imageFocus']['y'] ) && $attributes['imageFocus']['y'] ) ? $attributes['imageFocus']['y'] * 100 . '%' : '50%',
					);
					$css = $css . sprintf(
						'background-image: url(%s);',
						isset( $attributes['images'][0]['url'] ) ? $attributes['images'][0]['url'] : ''
					);
					$css = $css . sprintf(
						'background-attachment: %s;',
						isset( $attributes['backgroundFixed'] ) && $attributes['backgroundFixed'] ? 'fixed' : ''
					);
					$css = $css . '}';

				}
			}
		}

		if ( isset( $attributes['backgroundHMode'] ) && $attributes['backgroundHMode'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ' > .background-hover-color { opacity: 0;';
			$css = $css . sprintf(
				'transition: %ss; background-attachment: %s;',
				isset( $attributes['backgroundHTransitionTime'] ) && $attributes['backgroundHTransitionTime'] ? $attributes['backgroundHTransitionTime'] : '1',
				isset( $attributes['backgroundFixed'] ) && $attributes['backgroundFixed'] ? 'fixed' : ''
			);
			if ( 'color' === $attributes['backgroundHMode'] && isset( $attributes['backgroundHColor'] ) && $attributes['backgroundHColor'] ) {
				$css = $css . 'background-color: ' . $attributes['backgroundHColor'] . ';';
			}
			if ( 'gradient' === $attributes['backgroundHMode'] ) {
				$css = $css . sprintf(
					'background-image: %s;',
					( isset( $attributes['backgroundHGradient'] ) && $attributes['backgroundHGradient'] ) ? $attributes['backgroundHGradient'] : 'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)'
				);
			}
			if ( 'image' === $attributes['backgroundHMode'] ) {
				$css = $css . sprintf(
					'background-image: url(%s);',
					( isset( $attributes['imageH']['url'] ) && $attributes['imageH']['url'] ) ? $attributes['imageH']['url'] : ''
				);
				$css = $css . sprintf(
					'background-position: %s %s;',
					( isset( $attributes['imageHFocus']['x'] ) && $attributes['imageHFocus']['x'] ) ? $attributes['imageHFocus']['x'] * 100 . '%' : '50%',
					( isset( $attributes['imageHFocus']['y'] ) && $attributes['imageHFocus']['y'] ) ? $attributes['imageHFocus']['y'] * 100 . '%' : '50%',
				);
			}
			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ':hover > .background-hover-color {opacity:1;}';
		}
			$css = $css . '.block-id-' . $attributes['id'] . ' > .background-overlay {';
			$css = $css . sprintf( 'transition: %ss;', isset( $attributes['backgroundOHTransitionTime'] ) && $attributes['backgroundOHTransitionTime'] ? $attributes['backgroundOHTransitionTime'] : '1' );
			$css = $css . '}';

		if ( isset( $attributes['backgroundOMode'] ) && $attributes['backgroundOMode'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ' > .background-overlay {';
			$css = $css . sprintf( 'background-attachment: %s;', isset( $attributes['backgroundOFixed'] ) && $attributes['backgroundOFixed'] ? 'fixed' : '' );
			if ( 'color' === $attributes['backgroundOMode'] ) {
				$css = $css . sprintf(
					'background-color: %s;',
					isset( $attributes['backgroundOColor'] ) && $attributes['backgroundOColor'] ? $attributes['backgroundOColor'] : '#fff'
				);
			}
			if ( 'gradient' === $attributes['backgroundOMode'] ) {
				$css = $css . sprintf(
					'background-image: %s;',
					( isset( $attributes['backgroundOGradient'] ) && $attributes['backgroundOGradient'] ) ? $attributes['backgroundOGradient'] : 'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)'
				);
			}
			if ( 'image' === $attributes['backgroundOMode'] ) {
				$css = $css . sprintf(
					'background-image: url(%s);',
					( isset( $attributes['imageO']['url'] ) && $attributes['imageO']['url'] ) ? $attributes['imageO']['url'] : ''
				);
			}
			if ( isset( $attributes['backgroundOCSS'] ) ) {
				$css = $css . sprintf(
					'filter: %s %s %s %s %s;',
					isset( $attributes['backgroundOCSS']['blur'] ) && $attributes['backgroundOCSS']['blur'] ? 'blur(' . $attributes['backgroundOCSS']['blur'] . 'px)' : '',
					isset( $attributes['backgroundOCSS']['brightness'] ) && $attributes['backgroundOCSS']['brightness'] ? 'brightness(' . $attributes['backgroundOCSS']['brightness'] . '%)' : '',
					isset( $attributes['backgroundOCSS']['contrast'] ) && $attributes['backgroundOCSS']['contrast'] ? 'contrast(' . $attributes['backgroundOCSS']['contrast'] . '%)' : '',
					isset( $attributes['backgroundOCSS']['saturation'] ) && $attributes['backgroundOCSS']['saturation'] ? 'saturate(' . $attributes['backgroundOCSS']['saturation'] . '%)' : '',
					isset( $attributes['backgroundOCSS']['hue'] ) && $attributes['backgroundOCSS']['hue'] ? 'hue-rotate(' . $attributes['backgroundOCSS']['hue'] . 'deg)' : ''
				);
				$css = $css . sprintf( 'opacity: %s;', isset( $attributes['backgroundOOpacity'] ) ? $attributes['backgroundOOpacity'] : '0.5' );
			}
			$css = $css . '}';
		}

		if ( isset( $attributes['backgroundOHMode'] ) && $attributes['backgroundOHMode'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ':hover > .background-overlay {';
			if ( 'color' === $attributes['backgroundOHMode'] && isset( $attributes['backgroundOHColor'] ) && $attributes['backgroundOHColor'] ) {
				$css = $css . 'background-color: ' . $attributes['backgroundOHColor'] . ';';
			}
			if ( 'gradient' === $attributes['backgroundOHMode'] ) {
				$css = $css . sprintf(
					'background-image: %s;',
					( isset( $attributes['backgroundOHGradient'] ) && $attributes['backgroundOHGradient'] ) ? $attributes['backgroundOHGradient'] : 'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)'
				);
			}
			if ( 'image' === $attributes['backgroundOHMode'] ) {
				$css = $css . sprintf(
					'background-image: %s;',
					( isset( $attributes['imageOH']['url'] ) && $attributes['imageOH']['url'] ) ? $attributes['imageOH']['url'] : ''
				);
			}
			if ( isset( $attributes['backgroundOHCSS'] ) ) {
				$css = $css . sprintf(
					'filter: %s %s %s %s %s;',
					isset( $attributes['backgroundOHCSS']['blur'] ) && $attributes['backgroundOHCSS']['blur'] ? 'blur(' . $attributes['backgroundOHCSS']['blur'] . 'px)' : '',
					isset( $attributes['backgroundOHCSS']['brightness'] ) && $attributes['backgroundOHCSS']['brightness'] ? 'brightness(' . $attributes['backgroundOHCSS']['brightness'] . '%)' : '',
					isset( $attributes['backgroundOHCSS']['contrast'] ) && $attributes['backgroundOHCSS']['contrast'] ? 'contrast(' . $attributes['backgroundOHCSS']['contrast'] . '%)' : '',
					isset( $attributes['backgroundOHCSS']['saturation'] ) && $attributes['backgroundOHCSS']['saturation'] ? 'saturate(' . $attributes['backgroundOHCSS']['saturation'] . '%)' : '',
					isset( $attributes['backgroundOHCSS']['hue'] ) && $attributes['backgroundOHCSS']['hue'] ? 'hue-rotate(' . $attributes['backgroundOHCSS']['hue'] . 'deg)' : ''
				);
				$css = $css . sprintf( 'opacity: %s;', isset( $attributes['backgroundOHOpacity'] ) ? $attributes['backgroundOHOpacity'] : '0.5' );
			}
			$css = $css . '}';
		}

		// Tablet CSS.
		$css = $css . ' @media (min-width: 768px) and (max-width: 1024px) {';
		$css = $css . '.block-id-' . $attributes['id'] . '{';
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
		if ( isset( $attributes['structureMaxWidthTablet'] ) && $attributes['structureMaxWidthTablet'] ) {
			$css = $css . sprintf( 'max-width: %s;', $attributes['structureMaxWidthTablet'] );
		}
		if ( isset( $attributes['structureMinHeightTablet'] ) && $attributes['structureMinHeightTablet'] ) {
			$css = $css . sprintf( 'min-height: %s;', $attributes['structureMinHeightTablet'] );
		}
		$css = $css . '}';
		if ( isset( $attributes['layoutGapTablet'] ) && $attributes['layoutGapTablet'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ' .inner-content > * + * {';
			$css = $css . sprintf( 'margin-block-start: %s;', $attributes['layoutGapTablet'] );
			$css = $css . '}';
		}
		$css = $css . '}';

		// Mobile CSS.
		$css     = $css . ' @media (max-width: 767px) {';
			$css = $css . '.block-id-' . $attributes['id'] . '{';
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
		if ( isset( $attributes['structureMaxWidthMobile'] ) && $attributes['structureMaxWidthMobile'] ) {
			$css = $css . sprintf( 'max-width: %s;', $attributes['structureMaxWidthMobile'] );
		}
		if ( isset( $attributes['structureMinHeightMobile'] ) && $attributes['structureMinHeightMobile'] ) {
			$css = $css . sprintf( 'min-height: %s;', $attributes['structureMinHeightMobile'] );
		}
			$css = $css . '}';
		if ( isset( $attributes['layoutGapMobile'] ) && $attributes['layoutGapMobile'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ' .inner-content > * + * {';
			$css = $css . sprintf( 'margin-block-start: %s;', $attributes['layoutGapMobile'] );
			$css = $css . '}';
		}
			$css = $css . '}';

			return $css;
	}
}


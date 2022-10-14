<?php
/**
 * Generate CSS for Star Rating.
 *
 * @package grigora-kit
 */

if ( ! function_exists( 'ga_generate_css_star_rating' ) ) {
	/**
	 * Generate CSS for Star Rating.
	 *
	 * @param array $attributes Block Attributes.
	 */
	function ga_generate_css_star_rating( $attributes ) {
		$css = '.block-id-' . $attributes['id'] . '{';
		if ( isset( $attributes['align'] ) && $attributes['align'] ) {
				$css = $css . sprintf( 'justify-content: %s;', $attributes['align'] );
		}
		$css = $css . sprintf( 'transition: %ss;', isset( $attributes['transitionTime'] ) ? $attributes['transitionTime'] : 1 );
		if ( isset( $attributes['iconSpacing'] ) && $attributes['iconSpacing'] ) {
			$css = $css . sprintf( 'gap: %spx;', $attributes['iconSpacing'] );
		}
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' svg{';
		if ( isset( $attributes['iconSize'] ) && $attributes['iconSize'] ) {
			$css = $css . sprintf( 'height: %spx; width: %spx;', $attributes['iconSize'], $attributes['iconSize'] );
		}
		if ( isset( $attributes['iconInactiveColor'] ) && $attributes['iconInactiveColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['iconInactiveColor'] );
		}
		$css = $css . sprintf(
			'transform: %s %s %s %s %s %s %s %s;',
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
		$css = $css . '.block-id-' . $attributes['id'] . ' svg:hover{';
		if ( ( isset( $attributes['effectHRotateX'] ) && $attributes['effectHRotateX'] ) ||
			( isset( $attributes['effectHRotateY'] ) && $attributes['effectHRotateY'] ) ||
			( isset( $attributes['effectHRotateZ'] ) && $attributes['effectHRotateZ'] ) ||
			( isset( $attributes['effectHSkewX'] ) && $attributes['effectHSkewX'] ) ||
			( isset( $attributes['effectHSkewY'] ) && $attributes['effectHSkewY'] ) ||
			( isset( $attributes['effectHOffsetX'] ) && $attributes['effectHOffsetX'] ) ||
			( isset( $attributes['effectHOffsetY'] ) && $attributes['effectHOffsetY'] ) ||
			( isset( $attributes['effectHScale'] ) && $attributes['effectHScale'] )
		) {

			$css = $css . sprintf(
				'transform: %s %s %s %s %s %s %s %s;',
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
		$css = $css . '.block-id-' . $attributes['id'] . ' .active svg{';
		if ( isset( $attributes['iconActiveColor'] ) && $attributes['iconActiveColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['iconActiveColor'] );
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
		if ( isset( $attributes['alignTablet'] ) && $attributes['alignTablet'] ) {
			$css = $css . sprintf( 'justify-content: %s;', $attributes['alignTablet'] );
		}
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' svg{';
		if ( isset( $attributes['iconSizeTablet'] ) && $attributes['iconSizeTablet'] ) {
			$css = $css . sprintf( 'height: %spx; width: %spx;', $attributes['iconSizeTablet'], $attributes['iconSizeTablet'] );
		}
		$css = $css . '}';
		$css = $css . '}';

		// Mobile CSS.
		$css = $css . ' @media (max-width: 767px) {';
		$css = $css . '.block-id-' . $attributes['id'] . '{';
		if ( isset( $attributes['alignMobile'] ) && $attributes['alignMobile'] ) {
			$css = $css . sprintf( 'justify-content: %s;', $attributes['alignMobile'] );
		}
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' svg{';
		if ( isset( $attributes['iconSizeMobile'] ) && $attributes['iconSizeMobile'] ) {
			$css = $css . sprintf( 'height: %spx; width: %spx;', $attributes['iconSizeMobile'], $attributes['iconSizeMobile'] );
		}
		$css = $css . '}';
		$css = $css . '}';

		return $css;
	}
}

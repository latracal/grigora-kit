<?php


/**
 * Return a complete css for specific number counter block.
 */
if ( ! function_exists( 'ga_generate_css_number_counter' ) ) {

	function ga_generate_css_number_counter( $attributes ) {
		if ( isset( $attributes['id'] ) ) {
				$css = '.block-id-' . $attributes['id'] . ' {';
			if ( isset( $attributes['align'] ) && $attributes['align'] ) {
				$css = $css . sprintf( 'text-align: %s;', $attributes['align'] );
			}
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
				$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoLineHeight'] ) && ( $attributes['typoLineHeight'] != 'normal' ) ) ? $attributes['typoLineHeight'] . 'px' : 'normal' );
				$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoLetterSpacing'] ) && ( $attributes['typoLetterSpacing'] != 'normal' ) ) ? $attributes['typoLetterSpacing'] . 'px' : 'normal' );
				$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoWordSpacing'] ) && ( $attributes['typoWordSpacing'] != 'normal' ) ) ? $attributes['typoWordSpacing'] . 'px' : 'normal' );
			if ( isset( $attributes['effectNColor'] ) && $attributes['effectNColor'] ) {
				$css = $css . sprintf( 'color: %s;', $attributes['effectNColor'] );
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
				$css = $css . '}';

				$css = $css . '.block-id-' . $attributes['id'] . ' span {';

			if ( isset( $attributes['typoDecoration'] ) ) {
				$css = $css . sprintf( 'text-decoration: %s;', $attributes['typoDecoration'] );
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

				$css = $css . '}';
			return $css;
		}
		return '';
	}
}

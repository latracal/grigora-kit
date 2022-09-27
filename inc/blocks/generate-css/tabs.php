<?php


/**
 * CSS for tabs block.
 */
if ( ! function_exists( 'ga_generate_css_tabs' ) ) {
	function ga_generate_css_tabs( $attributes ) {

		if ( isset( $attributes['id'] ) ) {
			$css = '';
			$css = '.block-id-' . $attributes['id'] . ' {';
			if ( isset( $attributes['contentGap'] ) && $attributes['contentGap'] ) {
				$css = $css . sprintf( 'row-gap: %spx;', $attributes['contentGap'] );
			}
			$css = $css . '}';

			$css = $css . '.block-id-' . $attributes['id'] . ' .tab-contents .grigora-kit-inner-tab {display: none;}';
			$css = $css . '.block-id-' . $attributes['id'] . sprintf(
				' .tab-contents .grigora-kit-inner-tab:nth-child(%s) {display: block;}',
				isset( $attributes['activeTab'] ) ? $attributes['activeTab'] + 1 : 1
			);

			$css = $css . '.block-id-' . $attributes['id'] . '.animateOnce {';
			if ( isset( $attributes['entranceAnimation'] ) && $attributes['entranceAnimation'] != 'none' ) {
				$css = $css . sprintf( 'animation: %s %s;', $attributes['entranceAnimation'], ( isset( $attributes['entranceAnimationTime'] ) && $attributes['entranceAnimationTime'] ) ? $attributes['entranceAnimationTime'] . 's' : '1s' );
			}
			$css = $css . '}';

			$css = $css . '.block-id-' . $attributes['id'] . ' .title-subtitle{';

			if ( isset( $attributes['padding'] ) ) {
				if ( isset( $attributes['padding']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['padding']['left'] );
				}
				if ( isset( $attributes['padding']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['padding']['right'] );
				}
				if ( isset( $attributes['padding']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['padding']['top'] );
				}
				if ( isset( $attributes['padding']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['padding']['bottom'] );
				}
			}

			if ( isset( $attributes['margin'] ) ) {
				if ( isset( $attributes['margin']['left'] ) ) {
					$css = $css . sprintf( 'margin-left: %s;', $attributes['margin']['left'] );
				}
				if ( isset( $attributes['margin']['right'] ) ) {
					$css = $css . sprintf( 'margin-right: %s;', $attributes['margin']['right'] );
				}
				if ( isset( $attributes['margin']['top'] ) ) {
					$css = $css . sprintf( 'margin-top: %s;', $attributes['margin']['top'] );
				}
				if ( isset( $attributes['margin']['bottom'] ) ) {
					$css = $css . sprintf( 'margin-bottom: %s;', $attributes['margin']['bottom'] );
				}
			}

			if ( isset( $attributes['border'] ) ) {
				if ( isset( $attributes['border']['left'] ) ) {
					$css = $css . sprintf( 'border-left: %s;', $attributes['border']['left'] );
				}
				if ( isset( $attributes['border']['right'] ) ) {
					$css = $css . sprintf( 'border-right: %s;', $attributes['border']['right'] );
				}
				if ( isset( $attributes['border']['bottom'] ) ) {
					$css = $css . sprintf( 'border-bottom: %s;', $attributes['border']['bottom'] );
				}
				if ( isset( $attributes['border']['top'] ) ) {
					$css = $css . sprintf( 'border-top: %s;', $attributes['border']['top'] );
				}
			}

			if ( isset( $attributes['borderStyle'] ) ) {
				$css = $css . sprintf( 'border-style: %s;', $attributes['borderStyle'] );
			}

			if ( isset( $attributes['titleColor'] ) ) {
				$css = $css . sprintf( 'color: %s;', $attributes['titleColor'] );
			}

			if ( isset( $attributes['bgColor'] ) ) {
				$css = $css . sprintf( 'background-color: %s;', $attributes['bgColor'] );
			}

			if ( isset( $attributes['titleBorderColor'] ) ) {
				$css = $css . sprintf( 'border-color: %s;', $attributes['titleBorderColor'] );
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

			$css = $css . '}';

			$css = $css . '.block-id-' . $attributes['id'] . ' .tab-titles{';
			if ( isset( $attributes['align'] ) && $attributes['align'] ) {
				$css = $css . sprintf( 'justify-content: %s;', $attributes['align'] );
			}
			if ( isset( $attributes['tabGap'] ) ) {
				$css = $css . sprintf( 'column-gap: %spx;', $attributes['tabGap'] );
			}
			$css = $css . '}';

			$css = $css . '.block-id-' . $attributes['id'] . ' .title-subtitle:hover{';

			if ( isset( $attributes['titleHoverColor'] ) ) {
				$css = $css . sprintf( 'color: %s;', $attributes['titleHoverColor'] );
			}

			if ( isset( $attributes['titleBorderHoverColor'] ) ) {
				$css = $css . sprintf( 'border-color: %s;', $attributes['titleBorderHoverColor'] );
			}

			if ( isset( $attributes['bgTitleHoverColor'] ) ) {
				$css = $css . sprintf( 'background-color: %s;', $attributes['bgTitleHoverColor'] );
			}

			$css = $css . '}';

			$css = $css . '.block-id-' . $attributes['id'] . ' .tab-active .title-subtitle{';
			if ( isset( $attributes['activeColor'] ) ) {
				$css = $css . sprintf( 'color: %s;', $attributes['activeColor'] );
			}
			if ( isset( $attributes['titleBorderActiveColor'] ) ) {
				$css = $css . sprintf( 'border-color: %s;', $attributes['titleBorderActiveColor'] );
			}
			if ( isset( $attributes['bgTitleActiveColor'] ) ) {
				$css = $css . sprintf( 'background-color: %s;', $attributes['bgTitleActiveColor'] );
			}

			$css = $css . '}';

			$css = $css . '.block-id-' . $attributes['id'] . ' .tab-contents{';

			if ( isset( $attributes['maxWidth'] ) ) {
				$css = $css . sprintf( 'max-width: %s;', $attributes['maxWidth'] );
			}

			if ( isset( $attributes['minHeight'] ) ) {
				$css = $css . sprintf( 'min-height: %s;', $attributes['minHeight'] );
			}

			if ( isset( $attributes['contentPadding'] ) ) {
				if ( isset( $attributes['contentPadding']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['contentPadding']['left'] );
				}
				if ( isset( $attributes['contentPadding']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['contentPadding']['right'] );
				}
				if ( isset( $attributes['contentPadding']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['contentPadding']['bottom'] );
				}
				if ( isset( $attributes['contentPadding']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['contentPadding']['top'] );
				}
			}

			if ( isset( $attributes['contentMargin'] ) ) {
				if ( isset( $attributes['contentMargin']['left'] ) ) {
					$css = $css . sprintf( 'margin-left: %s;', $attributes['contentMargin']['left'] );
				}
				if ( isset( $attributes['contentMargin']['right'] ) ) {
					$css = $css . sprintf( 'margin-right: %s;', $attributes['contentMargin']['right'] );
				}
				if ( isset( $attributes['contentMargin']['bottom'] ) ) {
					$css = $css . sprintf( 'margin-bottom: %s;', $attributes['contentMargin']['bottom'] );
				}
				if ( isset( $attributes['contentMargin']['top'] ) ) {
					$css = $css . sprintf( 'margin-top: %s;', $attributes['contentMargin']['top'] );
				}
			}

			if ( isset( $attributes['borderContent'] ) ) {
				if ( isset( $attributes['borderContent']['left'] ) ) {
					$css = $css . sprintf( 'border-left: %s;', $attributes['borderContent']['left'] );
				}
				if ( isset( $attributes['borderContent']['right'] ) ) {
					$css = $css . sprintf( 'border-right: %s;', $attributes['borderContent']['right'] );
				}
				if ( isset( $attributes['borderContent']['bottom'] ) ) {
					$css = $css . sprintf( 'border-bottom: %s;', $attributes['borderContent']['bottom'] );
				}
				if ( isset( $attributes['borderContent']['top'] ) ) {
					$css = $css . sprintf( 'border-top: %s;', $attributes['borderContent']['top'] );
				}
			}

			if ( isset( $attributes['borderContentStyle'] ) ) {
				$css = $css . sprintf( 'border-style: %s;', $attributes['borderContentStyle'] );
			}

			if ( isset( $attributes['contentBgColor'] ) ) {
				$css = $css . sprintf( 'background-color: %s;', $attributes['contentBgColor'] );
			}
			if ( isset( $attributes['contentBorderColor'] ) ) {
				$css = $css . sprintf( 'border-color: %s;', $attributes['contentBorderColor'] );
			}
			$css = $css . '}';

			$css = $css . '.block-id-' . $attributes['id'] . ' .title-class{';
			if ( isset( $attributes['typoTSize'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoTSize'] );
			}
			if ( isset( $attributes['typoTWeight'] ) ) {
				$css = $css . sprintf( 'font-weight: %s;', $attributes['typoTWeight'] );
			}
			if ( isset( $attributes['typoTTransform'] ) ) {
				$css = $css . sprintf( 'text-transform: %s;', $attributes['typoTTransform'] );
			}

				$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoTLineHeight'] ) && ( $attributes['typoTLineHeight'] != 'normal' ) ) ? $attributes['typoTLineHeight'] . 'px' : 'normal' );
				$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoTLetterSpacing'] ) && ( $attributes['typoTLetterSpacing'] != 'normal' ) ) ? $attributes['typoTLetterSpacing'] . 'px' : 'normal' );
				$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoTWordSpacing'] ) && ( $attributes['typoTWordSpacing'] != 'normal' ) ) ? $attributes['typoTWordSpacing'] . 'px' : 'normal' );
			$css     = $css . '}';

			$css = $css . '.block-id-' . $attributes['id'] . ' .subtitle-class{';
			if ( isset( $attributes['typoSTSize'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSTSize'] );
			}
			if ( isset( $attributes['typoSTWeight'] ) ) {
				$css = $css . sprintf( 'font-weight: %s;', $attributes['typoSTWeight'] );
			}
			if ( isset( $attributes['typoSTTransform'] ) ) {
				$css = $css . sprintf( 'text-transform: %s;', $attributes['typoSTTransform'] );
			}

				$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoSTLineHeight'] ) && ( $attributes['typoSTLineHeight'] != 'normal' ) ) ? $attributes['typoSTLineHeight'] . 'px' : 'normal' );
				$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoSTLetterSpacing'] ) && ( $attributes['typoSTLetterSpacing'] != 'normal' ) ) ? $attributes['typoSTLetterSpacing'] . 'px' : 'normal' );
				$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoSTWordSpacing'] ) && ( $attributes['typoSTWordSpacing'] != 'normal' ) ) ? $attributes['typoSTWordSpacing'] . 'px' : 'normal' );

			$css = $css . '}';
			return $css;

		} else {
			return '';
		}

	}
}

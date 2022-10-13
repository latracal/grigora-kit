<?php
/**
 * CSS for tabs block.
 *
 * @package grigora-kit
 */

if ( ! function_exists( 'ga_generate_css_tabs' ) ) {
	/**
	 * Generate CSS for tabs block.
	 *
	 * @param array $attributes Attributes of the block.
	 */
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
			if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
				$css = $css . sprintf(
					'animation: %s %s %s;',
					$attributes['entranceAnimation'],
					( isset( $attributes['entranceAnimationTime'] ) && $attributes['entranceAnimationTime'] ) ? $attributes['entranceAnimationTime'] . 's' : '1s',
					( isset( $attributes['entranceAnimationDelay'] ) && $attributes['entranceAnimationDelay'] ) ? $attributes['entranceAnimationDelay'] . 'ms' : ''
				);
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

			if ( isset( $attributes['borderTitle'] ) ) {
				if ( isset( $attributes['borderTitle']['left'] ) ) {
					$css = $css . sprintf( 'border-left: %s;', $attributes['borderTitle']['left'] );
				}
				if ( isset( $attributes['borderTitle']['right'] ) ) {
					$css = $css . sprintf( 'border-right: %s;', $attributes['borderTitle']['right'] );
				}
				if ( isset( $attributes['borderTitle']['bottom'] ) ) {
					$css = $css . sprintf( 'border-bottom: %s;', $attributes['borderTitle']['bottom'] );
				}
				if ( isset( $attributes['borderTitle']['top'] ) ) {
					$css = $css . sprintf( 'border-top: %s;', $attributes['borderTitle']['top'] );
				}
			}

			$css = $css . sprintf( 'border-style: %s;', isset( $attributes['borderStyle'] ) ? $attributes['borderStyle'] : 'solid' );

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
			if ( isset( $attributes['effectCBorderRadius'] ) ) {
				if ( isset( $attributes['effectCBorderRadius']['topRight'] ) ) {
					$css = $css . sprintf( 'border-top-right-radius: %s;', $attributes['effectCBorderRadius']['topRight'] );
				}
				if ( isset( $attributes['effectCBorderRadius']['topLeft'] ) ) {
					$css = $css . sprintf( 'border-top-left-radius: %s;', $attributes['effectCBorderRadius']['topLeft'] );
				}
				if ( isset( $attributes['effectCBorderRadius']['bottomRight'] ) ) {
					$css = $css . sprintf( 'border-bottom-right-radius: %s;', $attributes['effectCBorderRadius']['bottomRight'] );
				}
				if ( isset( $attributes['effectCBorderRadius']['bottomLeft'] ) ) {
					$css = $css . sprintf( 'border-bottom-left-radius: %s;', $attributes['effectCBorderRadius']['bottomLeft'] );
				}
			}

			$css = $css . sprintf( 'border-style: %s;', isset( $attributes['borderContentStyle'] ) ? $attributes['borderContentStyle'] : 'solid' );

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
			if ( isset( $attributes['typoTStyle'] ) ) {
				$css = $css . sprintf( 'font-style: %s;', $attributes['typoTStyle'] );
			}
			if ( isset( $attributes['typoTDecoration'] ) ) {
				$css = $css . sprintf( 'text-decoration: %s;', $attributes['typoTDecoration'] );
			}

			$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoTLineHeight'] ) && ( 'normal' !== $attributes['typoTLineHeight'] ) ) ? $attributes['typoTLineHeight'] . 'px' : 'normal' );
			$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoTLetterSpacing'] ) && ( 'normal' !== $attributes['typoTLetterSpacing'] ) ) ? $attributes['typoTLetterSpacing'] . 'px' : 'normal' );
			$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoTWordSpacing'] ) && ( 'normal' !== $attributes['typoTWordSpacing'] ) ) ? $attributes['typoTWordSpacing'] . 'px' : 'normal' );
			$css = $css . '}';

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
			if ( isset( $attributes['typoSTStyle'] ) ) {
				$css = $css . sprintf( 'font-style: %s;', $attributes['typoSTStyle'] );
			}
			if ( isset( $attributes['typoSTDecoration'] ) ) {
				$css = $css . sprintf( 'text-decoration: %s;', $attributes['typoSTDecoration'] );
			}

			$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoSTLineHeight'] ) && ( 'normal' !== $attributes['typoSTLineHeight'] ) ) ? $attributes['typoSTLineHeight'] . 'px' : 'normal' );
			$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoSTLetterSpacing'] ) && ( 'normal' !== $attributes['typoSTLetterSpacing'] ) ) ? $attributes['typoSTLetterSpacing'] . 'px' : 'normal' );
			$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoSTWordSpacing'] ) && ( 'normal' !== $attributes['typoSTWordSpacing'] ) ) ? $attributes['typoSTWordSpacing'] . 'px' : 'normal' );

			$css = $css . '}';

			// Tablet CSS.
			$css = $css . ' @media (min-width: 768px) and (max-width: 1024px) {';
			$css = $css . '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['contentGapTablet'] ) && $attributes['contentGapTablet'] ) {
				$css = $css . sprintf( 'row-gap: %spx;', $attributes['contentGapTablet'] );
			}
			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ' .title-subtitle{';
			if ( isset( $attributes['paddingTablet'] ) ) {
				if ( isset( $attributes['paddingTablet']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['paddingTablet']['left'] );
				}
				if ( isset( $attributes['paddingTablet']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['paddingTablet']['right'] );
				}
				if ( isset( $attributes['paddingTablet']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['paddingTablet']['top'] );
				}
				if ( isset( $attributes['paddingTablet']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['paddingTablet']['bottom'] );
				}
			}
			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ' .title-class{';
			if ( isset( $attributes['typoTSizeTablet'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoTSizeTablet'] );
			}
			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ' .subtitle-class{';
			if ( isset( $attributes['typoSTSizeTablet'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSTSizeTablet'] );
			}
			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ' .tab-titles{';
			if ( isset( $attributes['alignTablet'] ) && $attributes['alignTablet'] ) {
				$css = $css . sprintf( 'justify-content: %s;', $attributes['alignTablet'] );
			}
			if ( isset( $attributes['tabGapTablet'] ) ) {
				$css = $css . sprintf( 'column-gap: %spx;', $attributes['tabGapTablet'] );
			}
			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ' .tab-contents{';
			if ( isset( $attributes['contentPaddingTablet'] ) ) {
				if ( isset( $attributes['contentPaddingTablet']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['contentPaddingTablet']['left'] );
				}
				if ( isset( $attributes['contentPaddingTablet']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['contentPaddingTablet']['right'] );
				}
				if ( isset( $attributes['contentPaddingTablet']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['contentPaddingTablet']['top'] );
				}
				if ( isset( $attributes['contentPaddingTablet']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['contentPaddingTablet']['bottom'] );
				}
			}
			$css = $css . '}';
			$css = $css . '}';

			// Mobile CSS.
			$css = $css . ' @media (max-width: 767px) {';
			$css = $css . '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['contentGapMobile'] ) && $attributes['contentGapMobile'] ) {
				$css = $css . sprintf( 'row-gap: %spx;', $attributes['contentGapMobile'] );
			}
			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ' .title-subtitle{';
			if ( isset( $attributes['paddingMobile'] ) ) {
				if ( isset( $attributes['paddingMobile']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['paddingMobile']['left'] );
				}
				if ( isset( $attributes['paddingMobile']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['paddingMobile']['right'] );
				}
				if ( isset( $attributes['paddingMobile']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['paddingMobile']['top'] );
				}
				if ( isset( $attributes['paddingMobile']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['paddingMobile']['bottom'] );
				}
			}
			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ' .title-class{';
			if ( isset( $attributes['typoTSizeMobile'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoTSizeMobile'] );
			}
			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ' .subtitle-class{';
			if ( isset( $attributes['typoSTSizeMobile'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSTSizeMobile'] );
			}
			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ' .tab-titles{';
			if ( isset( $attributes['alignMobile'] ) && $attributes['alignMobile'] ) {
				$css = $css . sprintf( 'justify-content: %s;', $attributes['alignMobile'] );
			}
			if ( isset( $attributes['tabGapMobile'] ) ) {
				$css = $css . sprintf( 'column-gap: %spx;', $attributes['tabGapMobile'] );
			}
			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ' .tab-contents{';
			if ( isset( $attributes['contentPaddingMobile'] ) ) {
				if ( isset( $attributes['contentPaddingMobile']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['contentPaddingMobile']['left'] );
				}
				if ( isset( $attributes['contentPaddingMobile']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['contentPaddingMobile']['right'] );
				}
				if ( isset( $attributes['contentPaddingMobile']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['contentPaddingMobile']['top'] );
				}
				if ( isset( $attributes['contentPaddingMobile']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['contentPaddingMobile']['bottom'] );
				}
			}
			$css = $css . '}';
			$css = $css . '}';

			return $css;

		}
		return '';

	}
}

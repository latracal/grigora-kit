<?php
/**
 * Dynamic CSS for Custom Blocks.
 *
 * @package grigora-kit
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // For security.
}

require_once grigora_kit_get_path( 'inc/wptt-webfont-loader.php' );

require_once grigora_kit_get_path( 'inc/blocks/generate-css/button.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/icon.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/number-counter.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/countdown.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/google-maps.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/group.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/text.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/star-rating.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/scroll-to-top.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/post-title.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/post-excerpt.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/post-taxonomy.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/post-author.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/tabs.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/post-grid-1.php' );

if ( ! function_exists( 'ga_enqueue_animations' ) ) {
	/**
	 * Animations Dependencies Enqueue.
	 *
	 * @param boolean $entrance To decide whether to enqueue entrance animations.
	 */
	function ga_enqueue_animations( $entrance = false ) {
		$ver       = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$extension = GRIGORA_KIT_DEBUG ? '.css' : '.min.css';
		$extjs     = GRIGORA_KIT_DEBUG ? '.js' : '.min.js';
		wp_enqueue_style( 'grigora-animations', GRIGORA_KIT_URL . 'assets/css/animations' . $extension, [], $ver );
		wp_add_inline_style( 'grigora-animations', '.has-entrance-animation{ visibility: hidden; animation-name: none !important; } .animation-delayed{visibility: hidden;}' );
		if ( $entrance ) {
			wp_enqueue_script( 'grigora-animations', GRIGORA_KIT_URL . 'assets/js/animate' . $extjs, [], $ver, false );
		}
	}
}

if ( ! function_exists( 'ga_enqueue_number_control' ) ) {
	/**
	 * Number Control JS Dependencies Enqueue.
	 */
	function ga_enqueue_number_control() {
		$ver   = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$extjs = GRIGORA_KIT_DEBUG ? '.js' : '.min.js';
		wp_enqueue_script( 'grigora-countup', GRIGORA_KIT_URL . 'assets/js/number-counter' . $extjs, [], $ver, false );
	}
}

if ( ! function_exists( 'ga_enqueue_tabs_control' ) ) {
	/**
	 * Tabs Dependencies Enqueue.
	 */
	function ga_enqueue_tabs_control() {
		$ver   = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$extjs = GRIGORA_KIT_DEBUG ? '.js' : '.min.js';
		wp_enqueue_script( 'grigora-tabs', GRIGORA_KIT_URL . 'assets/js/tabs' . $extjs, [], $ver, false );
	}
}

if ( ! function_exists( 'ga_enqueue_countdown_control' ) ) {
	/**
	 * Countdown JS Dependencies Enqueue.
	 */
	function ga_enqueue_countdown_control() {
		$ver   = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$extjs = GRIGORA_KIT_DEBUG ? '.js' : '.min.js';
		wp_enqueue_script( 'grigora-countdown', GRIGORA_KIT_URL . 'assets/js/countdown' . $extjs, [], $ver, false );
	}
}

if ( ! function_exists( 'ga_enqueue_scroll_to_top_control' ) ) {
	/**
	 * Scroll to Top Control JS Dependencies Enqueue.
	 */
	function ga_enqueue_scroll_to_top_control() {
		$ver   = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$extjs = GRIGORA_KIT_DEBUG ? '.js' : '.min.js';
		wp_enqueue_script( 'grigora-scroll-to-top', GRIGORA_KIT_URL . 'assets/js/scroll-to-top' . $extjs, [], $ver, true );
	}
}

if ( ! function_exists( 'grigora_render_inline_styles' ) ) {
	/**
	 * Render Inline CSS to Specific Style ID.
	 *
	 * @param string $style_id ID of style.
	 * @param string $style    CSS in String.
	 */
	function grigora_render_inline_styles( $style_id, $style ) {
		if ( ! is_admin() ) {
			if ( wp_script_is( $style_id ) ) {
				wp_add_inline_style( $style_id, $style );
			} else {
				$ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
				wp_register_style( $style_id, false, array(), $ver, 'all' );
				wp_enqueue_style( $style_id );
				wp_add_inline_style( $style_id, $style );
			}
		}
	}
}

$grigora_kit_gfonts = array();

if ( ! function_exists( 'ga_enqueue_gfont' ) ) {
	/**
	 * Add Font to global array.
	 *
	 * @param string $gfont Google Font to enqueue.
	 */
	function ga_enqueue_gfont( $gfont ) {
		global $grigora_kit_gfonts;
		if ( ! in_array( $gfont, $grigora_kit_gfonts, true ) ) {
			array_push( $grigora_kit_gfonts, $gfont );
		}
	}
}

if ( ! function_exists( 'grigora_button_css' ) ) {
	/**
	 * Handle Button CSS.
	 *
	 * @param Block $block Handle Block Render.
	 */
	function grigora_button_css( $block ) {
		if ( isset( $block['attrs'] ) ) {
			if ( isset( $block['attrs']['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_button( $block['attrs'] );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $block['attrs']['typoFontFamily'] ) && $block['attrs']['typoFontFamily'] ) {
					ga_enqueue_gfont( $block['attrs']['typoFontFamily'] );
				}
				if ( isset( $block['attrs']['entranceAnimation'] ) && 'none' !== $block['attrs']['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				if ( isset( $block['attrs']['effectHAnimation'] ) && 'none' !== $block['attrs']['effectHAnimation'] ) {
					ga_enqueue_animations( false );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-button', $css );
				}
			}
		}
	}
}

if ( ! function_exists( 'grigora_group_css' ) ) {
	/**
	 * Handle Group CSS.
	 *
	 * @param Block $block Handle Group Render.
	 */
	function grigora_group_css( $block ) {
		if ( isset( $block['attrs'] ) ) {
			if ( isset( $block['attrs']['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_group( $block['attrs'] );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $block['attrs']['entranceAnimation'] ) && 'none' !== $block['attrs']['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				if ( isset( $block['attrs']['effectHAnimation'] ) && 'none' !== $block['attrs']['effectHAnimation'] ) {
					ga_enqueue_animations( false );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-group', $css );
				}
			}
		}
	}
}

if ( ! function_exists( 'grigora_tabs_css' ) ) {
	/**
	 * Handle Tabs CSS.
	 *
	 * @param Block $block Tabs Block.
	 */
	function grigora_tabs_css( $block ) {
		if ( isset( $block['attrs'] ) ) {
			if ( isset( $block['attrs']['id'] ) ) {
				ga_enqueue_tabs_control();
				if ( isset( $block['attrs']['entranceAnimation'] ) && 'none' !== $block['attrs']['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				$css = ga_generate_css_tabs( $block['attrs'] );
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-tabs', $css );
				}
			}
		}
	}
}

if ( ! function_exists( 'grigora_icon_css' ) ) {
	/**
	 * Handle Icons CSS.
	 *
	 * @param Block $block Icons Block.
	 */
	function grigora_icon_css( $block ) {
		if ( isset( $block['attrs'] ) ) {
			if ( isset( $block['attrs']['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_icon( $block['attrs'] );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-icon', $css );
				}
			}
		}
	}
}

if ( ! function_exists( 'grigora_number_counter_css' ) ) {
	/**
	 * Handle Number Counter CSS.
	 *
	 * @param Block $block Number Counter Block.
	 */
	function grigora_number_counter_css( $block ) {
		if ( isset( $block['attrs'] ) ) {
			if ( isset( $block['attrs']['id'] ) ) {
				ga_enqueue_number_control();
				$css      = '';
				$css_part = ga_generate_css_number_counter( $block['attrs'] );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-number-counter', $css );
				}
			}
		}
	}
}

if ( ! function_exists( 'grigora_countdown_css' ) ) {
	/**
	 * Handle Countdown CSS.
	 *
	 * @param Block $block Countdown Block.
	 */
	function grigora_countdown_css( $block ) {
		if ( isset( $block['attrs'] ) ) {
			if ( isset( $block['attrs']['id'] ) ) {
				ga_enqueue_countdown_control();
				$css = ga_generate_css_countdown( $block['attrs'] );
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-countdown', $css );
				}
			}
		}
	}
}

if ( ! function_exists( 'grigora_google_maps_css' ) ) {
	/**
	 * Handle Google Maps CSS.
	 *
	 * @param Block $block Google Maps Block.
	 */
	function grigora_google_maps_css( $block ) {
		if ( isset( $block['attrs'] ) ) {
			if ( isset( $block['attrs']['id'] ) ) {
				$css = ga_generate_css_google_maps( $block['attrs'] );
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-google-maps', $css );
				}
			}
		}
	}
}

if ( ! function_exists( 'grigora_text_css' ) ) {
	/**
	 * Handle Text CSS.
	 *
	 * @param Block $block Text Block.
	 */
	function grigora_text_css( $block ) {
		if ( isset( $block['attrs'] ) ) {
			if ( isset( $block['attrs']['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_text( $block['attrs'] );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $block['attrs']['typoFontFamily'] ) && $block['attrs']['typoFontFamily'] ) {
					ga_enqueue_gfont( $block['attrs']['typoFontFamily'] );
				}
				if ( isset( $block['attrs']['entranceAnimation'] ) && 'none' !== $block['attrs']['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-text', $css );
				}
			}
		}
	}
}

if ( ! function_exists( 'grigora_star_rating_css' ) ) {
	/**
	 * Handle Star Rating CSS.
	 *
	 * @param Block $block Star Rating Block.
	 */
	function grigora_star_rating_css( $block ) {
		if ( isset( $block['attrs'] ) ) {
			if ( isset( $block['attrs']['id'] ) ) {
				if ( isset( $block['attrs']['entranceAnimation'] ) && 'none' !== $block['attrs']['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				$css = ga_generate_css_star_rating( $block['attrs'] );
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-star-rating', $css );
				}
			}
		}
	}
}

if ( ! function_exists( 'grigora_scroll_to_top_css' ) ) {
	/**
	 * Handle Scroll To Top CSS.
	 *
	 * @param Block $block Scroll To Top Block.
	 */
	function grigora_scroll_to_top_css( $block ) {
		if ( isset( $block['attrs'] ) ) {
			if ( isset( $block['attrs']['id'] ) ) {
				ga_enqueue_scroll_to_top_control();
				$css      = '';
				$css_part = ga_generate_css_scroll_to_top( $block['attrs'] );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-scroll-to-top', $css );
				}
			}
		}
	}
}

if ( ! function_exists( 'grigora_post_title_css' ) ) {
	/**
	 * Handle Post Title CSS.
	 *
	 * @param Block $block Post Title Block.
	 */
	function grigora_post_title_css( $block ) {
		if ( isset( $block['attrs'] ) ) {
			if ( isset( $block['attrs']['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_post_title( $block['attrs'] );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $block['attrs']['typoFontFamily'] ) && $block['attrs']['typoFontFamily'] ) {
					ga_enqueue_gfont( $block['attrs']['typoFontFamily'] );
				}
				if ( isset( $block['attrs']['entranceAnimation'] ) && 'none' !== $block['attrs']['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-post-title', $css );
				}
			}
		}
	}
}

if ( ! function_exists( 'grigora_post_excerpt_css' ) ) {
	/**
	 * Handle Post Excerpt CSS.
	 *
	 * @param Block $block Post Title Block.
	 */
	function grigora_post_excerpt_css( $block ) {
		if ( isset( $block['attrs'] ) ) {
			if ( isset( $block['attrs']['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_post_excerpt( $block['attrs'] );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $block['attrs']['typoFontFamily'] ) && $block['attrs']['typoFontFamily'] ) {
					ga_enqueue_gfont( $block['attrs']['typoFontFamily'] );
				}
				if ( isset( $block['attrs']['entranceAnimation'] ) && 'none' !== $block['attrs']['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-post-excerpt', $css );
				}
			}
		}
	}
}

if ( ! function_exists( 'grigora_post_taxonomy_css' ) ) {
	/**
	 * Handle Post Taxonomy CSS.
	 *
	 * @param Block $block Post Taxonomy Block.
	 */
	function grigora_post_taxonomy_css( $block ) {
		if ( isset( $block['attrs'] ) ) {
			if ( isset( $block['attrs']['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_post_taxonomy( $block['attrs'] );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $block['attrs']['typoFontFamily'] ) && $block['attrs']['typoFontFamily'] ) {
					ga_enqueue_gfont( $block['attrs']['typoFontFamily'] );
				}
				if ( isset( $block['attrs']['typoLFontFamily'] ) && $block['attrs']['typoLFontFamily'] ) {
					ga_enqueue_gfont( $block['attrs']['typoLFontFamily'] );
				}
				if ( isset( $block['attrs']['entranceAnimation'] ) && 'none' !== $block['attrs']['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-post-taxonomy', $css );
				}
			}
		}
	}
}

if ( ! function_exists( 'grigora_post_author_css' ) ) {
	/**
	 * Handle Post Author CSS.
	 *
	 * @param Block $block Post Author Block.
	 */
	function grigora_post_author_css( $block ) {
		if ( isset( $block['attrs'] ) ) {
			if ( isset( $block['attrs']['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_post_author( $block['attrs'] );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $block['attrs']['typoFontFamily'] ) && $block['attrs']['typoFontFamily'] ) {
					ga_enqueue_gfont( $block['attrs']['typoFontFamily'] );
				}
				if ( isset( $block['attrs']['entranceAnimation'] ) && 'none' !== $block['attrs']['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-post-author', $css );
				}
			}
		}
	}
}

/**
 * Handle Post Grid 1 CSS.
 */
if ( ! function_exists( 'grigora_post_grid_1_css' ) ) {
	function grigora_post_grid_1_css( $block ) {
		if ( isset( $block['attrs'] ) ) {
			if ( isset( $block['attrs']['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_post_grid_1( $block['attrs'] );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $block['attrs']['title1TypoFontFamily'] ) && $block['attrs']['title1TypoFontFamily'] ) {
					ga_enqueue_gfont( $block['attrs']['title1TypoFontFamily'] );
				}
				if ( isset( $block['attrs']['title234TypoFontFamily'] ) && $block['attrs']['title234TypoFontFamily'] ) {
					ga_enqueue_gfont( $block['attrs']['title234TypoFontFamily'] );
				}
				if ( isset( $block['attrs']['contentTypoFontFamily'] ) && $block['attrs']['contentTypoFontFamily'] ) {
					ga_enqueue_gfont( $block['attrs']['contentTypoFontFamily'] );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-post-grid-1', $css );
				}
			}
		}
	}
}

if ( ! function_exists( 'grigora_conditional_block_assets' ) ) {
	/**
	 * Generate inline CSS conditionally on block render trigger.
	 *
	 * @param Block_Content $block_content Content of Block.
	 * @param Block         $block         Block Object.
	 */
	function grigora_conditional_block_assets( $block_content, $block ) {
		if ( 'grigora-kit/button' === $block['blockName'] ) {
			grigora_button_css( $block );
		} elseif ( 'grigora-kit/icon' === $block['blockName'] ) {
			grigora_icon_css( $block );
		} elseif ( 'grigora-kit/number-counter' === $block['blockName'] ) {
			grigora_number_counter_css( $block );
		} elseif ( 'grigora-kit/countdown' === $block['blockName'] ) {
			grigora_countdown_css( $block );
		} elseif ( 'grigora-kit/google-maps' === $block['blockName'] ) {
			grigora_google_maps_css( $block );
		} elseif ( 'grigora-kit/group' === $block['blockName'] ) {
			grigora_group_css( $block );
		} elseif ( 'grigora-kit/text' === $block['blockName'] ) {
			grigora_text_css( $block );
		} elseif ( 'grigora-kit/star-rating' === $block['blockName'] ) {
			grigora_star_rating_css( $block );
		} elseif ( 'grigora-kit/scroll-to-top' === $block['blockName'] ) {
			grigora_scroll_to_top_css( $block );
		} elseif ( 'grigora-kit/post-title' === $block['blockName'] ) {
			grigora_post_title_css( $block );
		} elseif ( 'grigora-kit/post-excerpt' === $block['blockName'] ) {
			grigora_post_excerpt_css( $block );
		} elseif ( 'grigora-kit/post-taxonomy' === $block['blockName'] ) {
			grigora_post_taxonomy_css( $block );
		} elseif ( 'grigora-kit/post-author' === $block['blockName'] ) {
			grigora_post_author_css( $block );
		} elseif ( 'grigora-kit/tabs' === $block['blockName'] ) {
			grigora_tabs_css( $block );
		} elseif ( $block['blockName'] === 'grigora-kit/post-grid-1' ) {
			grigora_post_grid_1_css( $block );
		}
		return $block_content;

	}
}

if ( ! function_exists( 'grigora_kit_enqueue_gfonts' ) ) {
	/**
	 * Enqueue Google Fonts if present.
	 */
	function grigora_kit_enqueue_gfonts() {
		global $grigora_kit_gfonts;

		if ( $grigora_kit_gfonts ) {
			$ver          = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
			$font_request = 'https://fonts.googleapis.com/css?family=';
			foreach ( $grigora_kit_gfonts as $gfont ) {
				$font_request = $font_request . $gfont . '|';
			}
			$font_request = $font_request . '&display=fallback';
			wp_enqueue_style(
				'grigora-kit-webfonts',
				wptt_get_webfont_url( esc_url_raw( $font_request ) ),
				array(),
				$ver
			);
		}
	}
}

add_filter( 'render_block', 'grigora_conditional_block_assets', 10, 2 );
add_action( 'wp_enqueue_scripts', 'grigora_kit_enqueue_gfonts' );

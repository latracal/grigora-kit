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
require_once grigora_kit_get_path( 'inc/blocks/generate-css/post-grid-2.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/post-grid-3.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/post-grid-4.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/post-grid-5.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/post-grid-6.php' );

// Global Variable to store fonts.
$grigora_kit_gfonts = array();

// Global Variable to view processed blocks css.
$grigora_kit_blocks_css_processed = array();

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
		wp_add_inline_style( 'grigora-animations', '.has-entrance-animation{ visibility: hidden; animation-name: none !important; } .animation-delayed{visibility: hidden;} .grigora-kit-page{overflow-x: hidden;}' );
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
	function grigora_render_inline_styles( $style_id, $style, $unique_id = '' ) {
		global $grigora_kit_blocks_css_processed;
		if ( ! is_admin() ) {
			if ( ! wp_style_is( $style_id, 'enqueued' ) ) {
				grigora_kit_blocks_enqueue_style( $style_id );
			}
			if( wp_style_is( $style_id, 'enqueued' ) && !( isset( $grigora_kit_blocks_css_processed[$unique_id] ) && $grigora_kit_blocks_css_processed[$unique_id] )){
				wp_add_inline_style( $style_id, $style );
				$grigora_kit_blocks_css_processed[$unique_id] = true;
			}
			// Render inline style if Block is outside content & inline css is not rendered in head.
			if ( wp_style_is( $style_id, 'done' ) && ! doing_filter( 'the_content' ) && !( isset( $grigora_kit_blocks_css_processed['grigora-kit-' . $unique_id] ) && $grigora_kit_blocks_css_processed['grigora-kit-' . $unique_id] ) ) {
				wp_register_style( 'grigora-kit-' . $unique_id, false );
				wp_enqueue_style( 'grigora-kit-' . $unique_id );
				wp_add_inline_style( 'grigora-kit-' . $unique_id , $style );
				wp_print_styles( 'grigora-kit-' . $unique_id );
				$grigora_kit_blocks_css_processed[ 'grigora-kit-' . $unique_id ] = true;
			}
		}
	}
}


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

if ( ! function_exists( 'grigora_kit_blocks_enqueue_style' ) ) {
	function grigora_kit_blocks_enqueue_style( $style ) {
		wp_enqueue_style( $style );
	}
}


if ( ! function_exists( 'grigora_button_css' ) ) {
	/**
	 * Handle Button CSS.
	 *
	 * @param Block $block Handle Block Render.
	 */
	function grigora_button_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-button', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-button' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_button( $attributes );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $attributes['typoFontFamily'] ) && $attributes['typoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['typoFontFamily'] );
				}
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				if ( isset( $attributes['effectHAnimation'] ) && 'none' !== $attributes['effectHAnimation'] ) {
					ga_enqueue_animations( false );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-button', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_group_css' ) ) {
	/**
	 * Handle Group CSS.
	 *
	 * @param Block $block Handle Group Render.
	 */
	function grigora_group_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-group', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-group' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_group( $attributes );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				if ( isset( $attributes['effectHAnimation'] ) && 'none' !== $attributes['effectHAnimation'] ) {
					ga_enqueue_animations( false );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-group', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_tabs_css' ) ) {
	/**
	 * Handle Tabs CSS.
	 *
	 * @param Block $block Tabs Block.
	 */
	function grigora_tabs_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-tabs', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-tabs' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				ga_enqueue_tabs_control();
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				$css = ga_generate_css_tabs( $attributes );
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-tabs', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_icon_css' ) ) {
	/**
	 * Handle Icons CSS.
	 *
	 * @param Block $block Icons Block.
	 */
	function grigora_icon_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-icon', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-icon' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_icon( $attributes );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-icon', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_number_counter_css' ) ) {
	/**
	 * Handle Number Counter CSS.
	 *
	 * @param Block $block Number Counter Block.
	 */
	function grigora_number_counter_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-number-counter', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-number-counter' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				ga_enqueue_number_control();
				$css      = '';
				$css_part = ga_generate_css_number_counter( $attributes );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-number-counter', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_countdown_css' ) ) {
	/**
	 * Handle Countdown CSS.
	 *
	 * @param Block $block Countdown Block.
	 */
	function grigora_countdown_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-countdown', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-countdown' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				ga_enqueue_countdown_control();
				$css = ga_generate_css_countdown( $attributes );
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-countdown', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_google_maps_css' ) ) {
	/**
	 * Handle Google Maps CSS.
	 *
	 * @param Block $block Google Maps Block.
	 */
	function grigora_google_maps_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-google-maps', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-google-maps' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css = ga_generate_css_google_maps( $attributes );
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-google-maps', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_text_css' ) ) {
	/**
	 * Handle Text CSS.
	 *
	 * @param Block $block Text Block.
	 */
	function grigora_text_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-text', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-text' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_text( $attributes );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $attributes['typoFontFamily'] ) && $attributes['typoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['typoFontFamily'] );
				}
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-text', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_star_rating_css' ) ) {
	/**
	 * Handle Star Rating CSS.
	 *
	 * @param Block $block Star Rating Block.
	 */
	function grigora_star_rating_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-star-rating', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-star-rating' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				$css = ga_generate_css_star_rating( $attributes );
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-star-rating', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_scroll_to_top_css' ) ) {
	/**
	 * Handle Scroll To Top CSS.
	 *
	 * @param Block $block Scroll To Top Block.
	 */
	function grigora_scroll_to_top_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-scroll-to-top', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-scroll-to-top' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				ga_enqueue_scroll_to_top_control();
				$css      = '';
				$css_part = ga_generate_css_scroll_to_top( $attributes );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-scroll-to-top', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_post_title_css' ) ) {
	/**
	 * Handle Post Title CSS.
	 *
	 * @param Block $block Post Title Block.
	 */
	function grigora_post_title_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-title', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-post-title' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_post_title( $attributes );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $attributes['typoFontFamily'] ) && $attributes['typoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['typoFontFamily'] );
				}
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-post-title', $css, $attributes['id'] );
				}
			}
		}
		if( $render ){
			return render_block_grigora_kit_post_title( $attributes, $content, $block ) ;
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_post_excerpt_css' ) ) {
	/**
	 * Handle Post Excerpt CSS.
	 *
	 * @param Block $block Post Title Block.
	 */
	function grigora_post_excerpt_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-excerpt', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-post-excerpt' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_post_excerpt( $attributes );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $attributes['typoFontFamily'] ) && $attributes['typoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['typoFontFamily'] );
				}
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-post-excerpt', $css, $attributes['id'] );
				}
			}
		}
		if( $render ){
			return render_block_grigora_kit_post_excerpt( $attributes, $content, $block );
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_post_taxonomy_css' ) ) {
	/**
	 * Handle Post Taxonomy CSS.
	 *
	 * @param Block $block Post Taxonomy Block.
	 */
	function grigora_post_taxonomy_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-taxonomy', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-post-taxonomy' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_post_taxonomy( $attributes );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $attributes['typoFontFamily'] ) && $attributes['typoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['typoFontFamily'] );
				}
				if ( isset( $attributes['typoLFontFamily'] ) && $attributes['typoLFontFamily'] ) {
					ga_enqueue_gfont( $attributes['typoLFontFamily'] );
				}
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-post-taxonomy', $css, $attributes['id'] );
				}
			}
		}
		if( $render ){
			return render_block_grigora_kit_post_taxonomy( $attributes, $content, $block );
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_post_author_css' ) ) {
	/**
	 * Handle Post Author CSS.
	 *
	 * @param Block $block Post Author Block.
	 */
	function grigora_post_author_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-author', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-post-author' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_post_author( $attributes );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $attributes['typoFontFamily'] ) && $attributes['typoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['typoFontFamily'] );
				}
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					ga_enqueue_animations( true );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-post-author', $css, $attributes['id'] );
				}
			}
		}
		if( $render ){
			return render_block_grigora_kit_post_author( $attributes, $content, $block );
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_post_grid_1_css' ) ) {
	/**
	 * Handle Post Grid 1 CSS.
	 *
	 * @param Block $block Post Grid 1 Block.
	 */
	function grigora_post_grid_1_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-grid-1', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-post-grid-1' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_post_grid_1( $attributes );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $attributes['title1TypoFontFamily'] ) && $attributes['title1TypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['title1TypoFontFamily'] );
				}
				if ( isset( $attributes['title234TypoFontFamily'] ) && $attributes['title234TypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['title234TypoFontFamily'] );
				}
				if ( isset( $attributes['contentTypoFontFamily'] ) && $attributes['contentTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['contentTypoFontFamily'] );
				}
				if ( isset( $attributes['catTypoFontFamily'] ) && $attributes['catTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['catTypoFontFamily'] );
				}
				if ( isset( $attributes['metaTypoFontFamily'] ) && $attributes['metaTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['metaTypoFontFamily'] );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-post-grid-1', $css, $attributes['id'] );
				}
			}
		}
		if( $render ){
			return render_block_grigora_kit_post_grid_1( $attributes, $content, $block );
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_post_grid_2_css' ) ) {
	/**
	 * Handle Post Grid 2 CSS.
	 *
	 * @param Block $block Post Grid 2 Block.
	 */
	function grigora_post_grid_2_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-grid-2', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-post-grid-2' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_post_grid_2( $attributes );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $attributes['titleBTypoFontFamily'] ) && $attributes['titleBTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['titleBTypoFontFamily'] );
				}
				if ( isset( $attributes['titleSTypoFontFamily'] ) && $attributes['titleSTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['titleSTypoFontFamily'] );
				}
				if ( isset( $attributes['contentTypoFontFamily'] ) && $attributes['contentTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['contentTypoFontFamily'] );
				}
				if ( isset( $attributes['catTypoFontFamily'] ) && $attributes['catTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['catTypoFontFamily'] );
				}
				if ( isset( $attributes['metaTypoFontFamily'] ) && $attributes['metaTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['metaTypoFontFamily'] );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-post-grid-2', $css, $attributes['id'] );
				}
			}
		}
		if( $render ){
			return render_block_grigora_kit_post_grid_2( $attributes, $content, $block );
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_post_grid_3_css' ) ) {
	/**
	 * Handle Post Grid 3 CSS.
	 *
	 * @param Block $block Post Grid 3 Block.
	 */
	function grigora_post_grid_3_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-grid-3', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-post-grid-3' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_post_grid_3( $attributes );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $attributes['titleTypoFontFamily'] ) && $attributes['titleTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['titleTypoFontFamily'] );
				}
				if ( isset( $attributes['contentTypoFontFamily'] ) && $attributes['contentTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['contentTypoFontFamily'] );
				}
				if ( isset( $attributes['catTypoFontFamily'] ) && $attributes['catTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['catTypoFontFamily'] );
				}
				if ( isset( $attributes['metaTypoFontFamily'] ) && $attributes['metaTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['metaTypoFontFamily'] );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-post-grid-3', $css, $attributes['id'] );
				}
			}
		}
		if( $render ){
			return render_block_grigora_kit_post_grid_3( $attributes, $content, $block );
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_post_grid_4_css' ) ) {
	/**
	 * Handle Post Grid 4 CSS.
	 *
	 * @param Block $block Post Grid 4 Block.
	 */
	function grigora_post_grid_4_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-grid-4', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-post-grid-4' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_post_grid_4( $attributes );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $attributes['titleTypoFontFamily'] ) && $attributes['titleTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['titleTypoFontFamily'] );
				}
				if ( isset( $attributes['contentTypoFontFamily'] ) && $attributes['contentTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['contentTypoFontFamily'] );
				}
				if ( isset( $attributes['catTypoFontFamily'] ) && $attributes['catTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['catTypoFontFamily'] );
				}
				if ( isset( $attributes['metaTypoFontFamily'] ) && $attributes['metaTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['metaTypoFontFamily'] );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-post-grid-4', $css, $attributes['id'] );
				}
			}
		}
		if( $render ){
			return render_block_grigora_kit_post_grid_4( $attributes, $content, $block );
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_post_grid_5_css' ) ) {
	/**
	 * Handle Post Grid 3 CSS.
	 *
	 * @param Block $block Post Grid 5 Block.
	 */
	function grigora_post_grid_5_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-grid-5', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-post-grid-5' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_post_grid_5( $attributes );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $attributes['titleTypoFontFamily'] ) && $attributes['titleTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['titleTypoFontFamily'] );
				}
				if ( isset( $attributes['contentTypoFontFamily'] ) && $attributes['contentTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['contentTypoFontFamily'] );
				}
				if ( isset( $attributes['catTypoFontFamily'] ) && $attributes['catTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['catTypoFontFamily'] );
				}
				if ( isset( $attributes['metaTypoFontFamily'] ) && $attributes['metaTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['metaTypoFontFamily'] );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-post-grid-5', $css, $attributes['id'] );
				}
			}
		}
		if( $render ){
			return render_block_grigora_kit_post_grid_5( $attributes, $content, $block );
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_post_grid_6_css' ) ) {
	/**
	 * Handle Post Grid 6 CSS.
	 *
	 * @param Block $block Post Grid 6 Block.
	 */
	function grigora_post_grid_6_css( $attributes, $content = '', $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-grid-6', 'enqueued' ) ) {
			grigora_kit_blocks_enqueue_style( 'grigora-kit-post-grid-6' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css      = '';
				$css_part = ga_generate_css_post_grid_6( $attributes );
				if ( $css_part ) {
					$css = $css . $css_part;
				}
				if ( isset( $attributes['title1TypoFontFamily'] ) && $attributes['title1TypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['title1TypoFontFamily'] );
				}
				if ( isset( $attributes['title234TypoFontFamily'] ) && $attributes['title234TypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['title234TypoFontFamily'] );
				}
				if ( isset( $attributes['contentTypoFontFamily'] ) && $attributes['contentTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['contentTypoFontFamily'] );
				}
				if ( isset( $attributes['catTypoFontFamily'] ) && $attributes['catTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['catTypoFontFamily'] );
				}
				if ( isset( $attributes['metaTypoFontFamily'] ) && $attributes['metaTypoFontFamily'] ) {
					ga_enqueue_gfont( $attributes['metaTypoFontFamily'] );
				}
				if ( $css ) {
					grigora_render_inline_styles( 'grigora-kit-post-grid-6', $css, $attributes['id'] );
				}
			}
		}
		if( $render ){
			return render_block_grigora_kit_post_grid_6( $attributes, $content, $block );
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_conditional_block_assets' ) ) {
	/**
	 * Generate inline CSS conditionally on block render trigger.
	 * Used to render CSS in head for classic themes.
	 *
	 * @param Block_Content $block_content Content of Block.
	 * @param Block         $block         Block Object.
	 */
	function grigora_conditional_block_assets() {
		if ( function_exists( 'has_blocks' ) && has_blocks( get_the_ID() ) ) {
			global $post;
			if ( ! is_object( $post ) ) {
				return;
			}
			if ( ! method_exists( $post, 'post_content' ) ) {
				$blocks = parse_blocks( $post->post_content );
				if ( ! is_array( $blocks ) || empty( $blocks ) ) {
					return;
				}
				$blocks = _flatten_blocks( $blocks );
				foreach ( $blocks as $key => $block ) {
					if ( 'grigora-kit/button' === $block['blockName'] ) {
						grigora_button_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/icon' === $block['blockName'] ) {
						grigora_icon_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/number-counter' === $block['blockName'] ) {
						grigora_number_counter_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/countdown' === $block['blockName'] ) {
						grigora_countdown_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/google-maps' === $block['blockName'] ) {
						grigora_google_maps_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/group' === $block['blockName'] ) {
						grigora_group_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/text' === $block['blockName'] ) {
						grigora_text_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/star-rating' === $block['blockName'] ) {
						grigora_star_rating_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/scroll-to-top' === $block['blockName'] ) {
						grigora_scroll_to_top_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-title' === $block['blockName'] ) {
						grigora_post_title_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-excerpt' === $block['blockName'] ) {
						grigora_post_excerpt_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-taxonomy' === $block['blockName'] ) {
						grigora_post_taxonomy_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-author' === $block['blockName'] ) {
						grigora_post_author_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/tabs' === $block['blockName'] ) {
						grigora_tabs_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-grid-1' === $block['blockName'] ) {
						grigora_post_grid_1_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-grid-2' === $block['blockName'] ) {
						grigora_post_grid_2_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-grid-3' === $block['blockName'] ) {
						grigora_post_grid_3_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-grid-4' === $block['blockName'] ) {
						grigora_post_grid_4_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-grid-5' === $block['blockName'] ) {
						grigora_post_grid_5_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-grid-6' === $block['blockName'] ) {
						grigora_post_grid_6_css( $block['attrs'], '', $block, false );
					}
				}
			}
		}
		grigora_kit_enqueue_gfonts();
		
		// return $block_content;

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

add_action( 'wp_enqueue_scripts', 'grigora_conditional_block_assets', 50 );
// add_filter( 'render_block', 'grigora_conditional_block_assets', 10, 2 );
// add_action( 'wp_enqueue_scripts', 'grigora_kit_enqueue_gfonts', 40 );

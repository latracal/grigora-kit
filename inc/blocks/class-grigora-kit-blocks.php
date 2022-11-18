<?php
/**
 * Blocks
 *
 * @package grigora-kit
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // For security.
}

 // Renderers.
require_once grigora_kit_get_path( 'inc/blocks/renderers/post-author.php' );
require_once grigora_kit_get_path( 'inc/blocks/renderers/post-excerpt.php' );
require_once grigora_kit_get_path( 'inc/blocks/renderers/post-taxonomy.php' );
require_once grigora_kit_get_path( 'inc/blocks/renderers/post-title.php' );
require_once grigora_kit_get_path( 'inc/blocks/renderers/post-grid-1.php' );
require_once grigora_kit_get_path( 'inc/blocks/renderers/post-grid-2.php' );
require_once grigora_kit_get_path( 'inc/blocks/renderers/post-grid-3.php' );
require_once grigora_kit_get_path( 'inc/blocks/renderers/post-grid-4.php' );
require_once grigora_kit_get_path( 'inc/blocks/renderers/post-grid-5.php' );
require_once grigora_kit_get_path( 'inc/blocks/renderers/post-grid-6.php' );

class Grigora_Kit_Blocks {

	/**
	 * Instance.
	 */
	private static $instance;

	// Variable to store fonts.
	public $gfonts = array();

	// Variable to view processed blocks css.
	public $blocks_css_processed = array();

	public function __construct() {
		add_filter( 'block_categories_all', array( $this, 'block_category_all' ), 10, 2 );
		add_action( 'init', array( $this, 'register_blocks' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'conditional_block_assets' ), 50 );
	}

	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

		/**
		 * Register Grigora Kit Blocks Categories.
		 *
		 * @param array $categories           Array of existing categories.
		 * @param array $block_editor_context Block Editor Content.
		 */
	public function block_category_all( $categories, $block_editor_context ) {
		return array_merge(
			array(
				array(
					'slug'  => 'grigora-kit',
					'title' => __( 'Grigora Kit', 'grigora-kit' ),
				),
				array(
					'slug'  => 'grigora-kit-post-grid',
					'title' => __( 'Grigora Kit - Post Grid', 'grigora-kit' ),
				),
				array(
					'slug'  => 'grigora-kit-query',
					'title' => __( 'Grigora Kit - Query', 'grigora-kit' ),
				),
			),
			$categories
		);
	}

		/**
		 * Register Grigora Kit Blocks.
		 */
	public function register_blocks() {

		$ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$ext = GRIGORA_KIT_DEBUG ? '.css' : '.min.css';

		// Register style for blocks.
		wp_register_style( 'grigora-kit-button', GRIGORA_KIT_URL . 'assets/css/blocks/button/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-number-counter', GRIGORA_KIT_URL . 'assets/css/blocks/number-counter/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-countdown', GRIGORA_KIT_URL . 'assets/css/blocks/countdown/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-google-maps', GRIGORA_KIT_URL . 'assets/css/blocks/google-maps/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-icon', GRIGORA_KIT_URL . 'assets/css/blocks/icon/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-group', GRIGORA_KIT_URL . 'assets/css/blocks/group/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-text', GRIGORA_KIT_URL . 'assets/css/blocks/text/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-star-rating', GRIGORA_KIT_URL . 'assets/css/blocks/star-rating/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-scroll-to-top', GRIGORA_KIT_URL . 'assets/css/blocks/scroll-to-top/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-post-title', GRIGORA_KIT_URL . 'assets/css/blocks/post-title/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-post-excerpt', GRIGORA_KIT_URL . 'assets/css/blocks/post-excerpt/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-post-taxonomy', GRIGORA_KIT_URL . 'assets/css/blocks/post-taxonomy/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-post-author', GRIGORA_KIT_URL . 'assets/css/blocks/post-author/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-tabs', GRIGORA_KIT_URL . 'assets/css/blocks/tabs/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-post-grid-1', GRIGORA_KIT_URL . 'assets/css/blocks/post-grid-1/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-post-grid-2', GRIGORA_KIT_URL . 'assets/css/blocks/post-grid-2/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-post-grid-3', GRIGORA_KIT_URL . 'assets/css/blocks/post-grid-3/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-post-grid-4', GRIGORA_KIT_URL . 'assets/css/blocks/post-grid-4/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-post-grid-5', GRIGORA_KIT_URL . 'assets/css/blocks/post-grid-5/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-post-grid-6', GRIGORA_KIT_URL . 'assets/css/blocks/post-grid-6/style' . $ext, array(), $ver );

		// Register blocks.
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/button/block.json',
			array(
				'render_callback' => array( $this, 'render_button_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/number-counter/block.json',
			array(
				'render_callback' => array( $this, 'render_number_counter_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/countdown/block.json',
			array(
				'render_callback' => array( $this, 'render_countdown_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/google-maps/block.json',
			array(
				'render_callback' => array( $this, 'render_google_maps_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/icon/block.json',
			array(
				'render_callback' => array( $this, 'render_icon_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/group/block.json',
			array(
				'render_callback' => array( $this, 'render_group_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/text/block.json',
			array(
				'render_callback' => array( $this, 'render_text_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/star-rating/block.json',
			array(
				'render_callback' => array( $this, 'render_star_rating_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/scroll-to-top/block.json',
			array(
				'render_callback' => array( $this, 'render_scroll_to_top_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/post-title/block.json',
			array(
				'render_callback' => array( $this, 'render_post_title_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/post-excerpt/block.json',
			array(
				'render_callback' => array( $this, 'render_post_excerpt_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/post-taxonomy/block.json',
			array(
				'render_callback' => array( $this, 'render_post_taxonomy_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/post-author/block.json',
			array(
				'render_callback' => array( $this, 'render_post_author_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/tabs/block.json',
			array(
				'render_callback' => array( $this, 'render_tabs_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/tabs/inner-tab/block.json',
			array()
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/post-grid-1/block.json',
			array(
				'render_callback' => array( $this, 'render_post_grid_1_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/post-grid-2/block.json',
			array(
				'render_callback' => array( $this, 'render_post_grid_2_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/post-grid-3/block.json',
			array(
				'render_callback' => array( $this, 'render_post_grid_3_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/post-grid-4/block.json',
			array(
				'render_callback' => array( $this, 'render_post_grid_4_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/post-grid-5/block.json',
			array(
				'render_callback' => array( $this, 'render_post_grid_5_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/post-grid-6/block.json',
			array(
				'render_callback' => array( $this, 'render_post_grid_6_css' ),
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);

	}



	/**
	 * Animations Dependencies Enqueue.
	 *
	 * @param boolean $entrance To decide whether to enqueue entrance animations.
	 */
	public function enqueue_animations( $entrance = false ) {
		$ver       = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$extension = GRIGORA_KIT_DEBUG ? '.css' : '.min.css';
		$extjs     = GRIGORA_KIT_DEBUG ? '.js' : '.min.js';
		wp_enqueue_style( 'grigora-animations', GRIGORA_KIT_URL . 'assets/css/animations' . $extension, [], $ver );
		wp_add_inline_style( 'grigora-animations', '.has-entrance-animation{ visibility: hidden; animation-name: none !important; } .animation-delayed{visibility: hidden;} .grigora-kit-page{overflow-x: hidden;}' );
		if ( $entrance ) {
			wp_enqueue_script( 'grigora-animations', GRIGORA_KIT_URL . 'assets/js/animate' . $extjs, [], $ver, false );
		}
	}
	/**
	 * Number Control JS Dependencies Enqueue.
	 */
	public function enqueue_number_control() {
		$ver   = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$extjs = GRIGORA_KIT_DEBUG ? '.js' : '.min.js';
		wp_enqueue_script( 'grigora-countup', GRIGORA_KIT_URL . 'assets/js/number-counter' . $extjs, [], $ver, false );
	}

	/**
	 * Tabs Dependencies Enqueue.
	 */
	public function enqueue_tabs_control() {
		$ver   = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$extjs = GRIGORA_KIT_DEBUG ? '.js' : '.min.js';
		wp_enqueue_script( 'grigora-tabs', GRIGORA_KIT_URL . 'assets/js/tabs' . $extjs, [], $ver, false );
	}

	/**
	 * Countdown JS Dependencies Enqueue.
	 */
	public function enqueue_countdown_control() {
		$ver   = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$extjs = GRIGORA_KIT_DEBUG ? '.js' : '.min.js';
		wp_enqueue_script( 'grigora-countdown', GRIGORA_KIT_URL . 'assets/js/countdown' . $extjs, [], $ver, false );
	}

	/**
	 * Scroll to Top Control JS Dependencies Enqueue.
	 */
	public function enqueue_scroll_to_top_control() {
		$ver   = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$extjs = GRIGORA_KIT_DEBUG ? '.js' : '.min.js';
		wp_enqueue_script( 'grigora-scroll-to-top', GRIGORA_KIT_URL . 'assets/js/scroll-to-top' . $extjs, [], $ver, true );
	}

	/**
	 * Render Inline CSS to Specific Style ID.
	 *
	 * @param string $style_id  ID of style.
	 * @param string $style     CSS in String.
	 * @param string $unique_id Unique ID of the block.
	 */
	public function render_inline_styles( $style_id, $style, $unique_id = '' ) {
		if ( ! is_admin() ) {
			if ( ! wp_style_is( $style_id, 'enqueued' ) ) {
				$this->enqueue_style( $style_id );
			}
			if ( wp_style_is( $style_id, 'enqueued' ) && ! ( isset( $this->blocks_css_processed[ $unique_id ] ) && $this->blocks_css_processed[ $unique_id ] ) ) {
				wp_add_inline_style( $style_id, $style );
				$this->blocks_css_processed[ $unique_id ] = true;
			}
			// Render inline style if Block is outside content & inline css is not rendered in head.
			if ( wp_style_is( $style_id, 'done' ) && ! doing_filter( 'the_content' ) && ! ( isset( $this->blocks_css_processed[ 'grigora-kit-' . $unique_id ] ) && $this->blocks_css_processed[ 'grigora-kit-' . $unique_id ] ) ) {
				wp_register_style( 'grigora-kit-' . $unique_id, false );
				wp_enqueue_style( 'grigora-kit-' . $unique_id );
				wp_add_inline_style( 'grigora-kit-' . $unique_id, $style );
				wp_print_styles( 'grigora-kit-' . $unique_id );
				$this->blocks_css_processed[ 'grigora-kit-' . $unique_id ] = true;
			}
		}
	}

	/**
	 * Add Font to global array.
	 *
	 * @param string $gfont Google Font to enqueue.
	 */
	public function register_gfont( $gfont ) {
		if ( ! in_array( $gfont, $this->gfonts, true ) ) {
			array_push( $this->gfonts, $gfont );
		}
	}

	/**
	 * Enqueue requested style.
	 *
	 * @param string $style Style ID to enqueue.
	 */
	public function enqueue_style( $style ) {
		wp_enqueue_style( $style );
	}

	/**
	 * Handle Button CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_button_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-button', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-button' );
		}
		if ( $attributes ) {
			if ( isset( $attributes['id'] ) ) {
				$css = $this->generate_css_button( $attributes );
				if ( isset( $attributes['typoFontFamily'] ) && $attributes['typoFontFamily'] ) {
					$this->register_gfont( $attributes['typoFontFamily'] );
				}
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					$this->enqueue_animations( true );
				}
				if ( isset( $attributes['effectHAnimation'] ) && 'none' !== $attributes['effectHAnimation'] ) {
					$this->enqueue_animations( false );
				}
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-button', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}

	/**
	 * Handle Group CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_group_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-group', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-group' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css = $this->generate_css_group( $attributes );
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					$this->enqueue_animations( true );
				}
				if ( isset( $attributes['effectHAnimation'] ) && 'none' !== $attributes['effectHAnimation'] ) {
					$this->enqueue_animations( false );
				}
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-group', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}

	/**
	 * Handle Tabs CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_tabs_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-tabs', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-tabs' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$this->enqueue_tabs_control();
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					$this->enqueue_animations( true );
				}
				$css = $this->generate_css_tabs( $attributes );
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-tabs', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}

	/**
	 * Handle Icons CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_icon_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-icon', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-icon' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css = $this->generate_css_icon( $attributes );
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-icon', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}

	/**
	 * Handle Number Counter CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_number_counter_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-number-counter', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-number-counter' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$this->enqueue_number_control();
				$css = $this->generate_css_number_counter( $attributes );
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-number-counter', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}

	/**
	 * Handle Countdown CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_countdown_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-countdown', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-countdown' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$this->enqueue_countdown_control();
				$css = $this->generate_css_countdown( $attributes );
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-countdown', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}

	/**
	 * Handle Google Maps CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_google_maps_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-google-maps', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-google-maps' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css = $this->generate_css_google_maps( $attributes );
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-google-maps', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}

	/**
	 * Handle Text CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_text_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-text', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-text' );
		}
		if ( $attributes ) {
			if ( isset( $attributes['id'] ) ) {
				$css = $this->generate_css_text( $attributes );
				if ( isset( $attributes['typoFontFamily'] ) && $attributes['typoFontFamily'] ) {
					$this->register_gfont( $attributes['typoFontFamily'] );
				}
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					$this->enqueue_animations( true );
				}
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-text', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}

	/**
	 * Handle Star Rating CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_star_rating_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-star-rating', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-star-rating' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					$this->enqueue_animations( true );
				}
				$css = $this->generate_css_star_rating( $attributes );
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-star-rating', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}

	/**
	 * Handle Scroll To Top CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_scroll_to_top_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-scroll-to-top', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-scroll-to-top' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$this->enqueue_scroll_to_top_control();
				$css = $this->generate_css_scroll_to_top( $attributes );
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-scroll-to-top', $css, $attributes['id'] );
				}
			}
		}
		return $content;
	}

	/**
	 * Handle Post Title CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_post_title_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-title', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-post-title' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css = $this->generate_css_post_title( $attributes );
				if ( isset( $attributes['typoFontFamily'] ) && $attributes['typoFontFamily'] ) {
					$this->register_gfont( $attributes['typoFontFamily'] );
				}
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					$this->enqueue_animations( true );
				}
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-post-title', $css, $attributes['id'] );
				}
			}
		}
		if ( $render ) {
			return render_block_grigora_kit_post_title( $attributes, $content, $block );
		}
		return $content;
	}

	/**
	 * Handle Post Excerpt CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_post_excerpt_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-excerpt', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-post-excerpt' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css = $this->generate_css_post_excerpt( $attributes );
				if ( isset( $attributes['typoFontFamily'] ) && $attributes['typoFontFamily'] ) {
					$this->register_gfont( $attributes['typoFontFamily'] );
				}
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					$this->enqueue_animations( true );
				}
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-post-excerpt', $css, $attributes['id'] );
				}
			}
		}
		if ( $render ) {
			return render_block_grigora_kit_post_excerpt( $attributes, $content, $block );
		}
		return $content;
	}

	/**
	 * Handle Post Taxonomy CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_post_taxonomy_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-taxonomy', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-post-taxonomy' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css = $this->generate_css_post_taxonomy( $attributes );
				if ( isset( $attributes['typoFontFamily'] ) && $attributes['typoFontFamily'] ) {
					$this->register_gfont( $attributes['typoFontFamily'] );
				}
				if ( isset( $attributes['typoLFontFamily'] ) && $attributes['typoLFontFamily'] ) {
					$this->register_gfont( $attributes['typoLFontFamily'] );
				}
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					$this->enqueue_animations( true );
				}
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-post-taxonomy', $css, $attributes['id'] );
				}
			}
		}
		if ( $render ) {
			return render_block_grigora_kit_post_taxonomy( $attributes, $content, $block );
		}
		return $content;
	}

	/**
	 * Handle Post Author CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_post_author_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-author', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-post-author' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css = $this->generate_css_post_author( $attributes );
				if ( isset( $attributes['typoFontFamily'] ) && $attributes['typoFontFamily'] ) {
					$this->register_gfont( $attributes['typoFontFamily'] );
				}
				if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
					$this->enqueue_animations( true );
				}
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-post-author', $css, $attributes['id'] );
				}
			}
		}
		if ( $render ) {
			return render_block_grigora_kit_post_author( $attributes, $content, $block );
		}
		return $content;
	}

	/**
	 * Handle Post Grid 1 CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_post_grid_1_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-grid-1', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-post-grid-1' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css = $this->generate_css_post_grid_1( $attributes );
				if ( isset( $attributes['title1TypoFontFamily'] ) && $attributes['title1TypoFontFamily'] ) {
					$this->register_gfont( $attributes['title1TypoFontFamily'] );
				}
				if ( isset( $attributes['title234TypoFontFamily'] ) && $attributes['title234TypoFontFamily'] ) {
					$this->register_gfont( $attributes['title234TypoFontFamily'] );
				}
				if ( isset( $attributes['contentTypoFontFamily'] ) && $attributes['contentTypoFontFamily'] ) {
					$this->register_gfont( $attributes['contentTypoFontFamily'] );
				}
				if ( isset( $attributes['catTypoFontFamily'] ) && $attributes['catTypoFontFamily'] ) {
					$this->register_gfont( $attributes['catTypoFontFamily'] );
				}
				if ( isset( $attributes['metaTypoFontFamily'] ) && $attributes['metaTypoFontFamily'] ) {
					$this->register_gfont( $attributes['metaTypoFontFamily'] );
				}
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-post-grid-1', $css, $attributes['id'] );
				}
			}
		}
		if ( $render ) {
			return render_block_grigora_kit_post_grid_1( $attributes, $content, $block );
		}
		return $content;
	}

	/**
	 * Handle Post Grid 2 CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_post_grid_2_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-grid-2', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-post-grid-2' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css = $this->generate_css_post_grid_2( $attributes );
				if ( isset( $attributes['titleBTypoFontFamily'] ) && $attributes['titleBTypoFontFamily'] ) {
					$this->register_gfont( $attributes['titleBTypoFontFamily'] );
				}
				if ( isset( $attributes['titleSTypoFontFamily'] ) && $attributes['titleSTypoFontFamily'] ) {
					$this->register_gfont( $attributes['titleSTypoFontFamily'] );
				}
				if ( isset( $attributes['contentTypoFontFamily'] ) && $attributes['contentTypoFontFamily'] ) {
					$this->register_gfont( $attributes['contentTypoFontFamily'] );
				}
				if ( isset( $attributes['catTypoFontFamily'] ) && $attributes['catTypoFontFamily'] ) {
					$this->register_gfont( $attributes['catTypoFontFamily'] );
				}
				if ( isset( $attributes['metaTypoFontFamily'] ) && $attributes['metaTypoFontFamily'] ) {
					$this->register_gfont( $attributes['metaTypoFontFamily'] );
				}
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-post-grid-2', $css, $attributes['id'] );
				}
			}
		}
		if ( $render ) {
			return render_block_grigora_kit_post_grid_2( $attributes, $content, $block );
		}
		return $content;
	}
	/**
	 * Handle Post Grid 3 CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_post_grid_3_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-grid-3', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-post-grid-3' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css = $this->generate_css_post_grid_3( $attributes );
				if ( isset( $attributes['titleTypoFontFamily'] ) && $attributes['titleTypoFontFamily'] ) {
					$this->register_gfont( $attributes['titleTypoFontFamily'] );
				}
				if ( isset( $attributes['contentTypoFontFamily'] ) && $attributes['contentTypoFontFamily'] ) {
					$this->register_gfont( $attributes['contentTypoFontFamily'] );
				}
				if ( isset( $attributes['catTypoFontFamily'] ) && $attributes['catTypoFontFamily'] ) {
					$this->register_gfont( $attributes['catTypoFontFamily'] );
				}
				if ( isset( $attributes['metaTypoFontFamily'] ) && $attributes['metaTypoFontFamily'] ) {
					$this->register_gfont( $attributes['metaTypoFontFamily'] );
				}
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-post-grid-3', $css, $attributes['id'] );
				}
			}
		}
		if ( $render ) {
			return render_block_grigora_kit_post_grid_3( $attributes, $content, $block );
		}
		return $content;
	}

	/**
	 * Handle Post Grid 4 CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_post_grid_4_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-grid-4', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-post-grid-4' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css = $this->generate_css_post_grid_4( $attributes );
				if ( isset( $attributes['titleTypoFontFamily'] ) && $attributes['titleTypoFontFamily'] ) {
					$this->register_gfont( $attributes['titleTypoFontFamily'] );
				}
				if ( isset( $attributes['contentTypoFontFamily'] ) && $attributes['contentTypoFontFamily'] ) {
					$this->register_gfont( $attributes['contentTypoFontFamily'] );
				}
				if ( isset( $attributes['catTypoFontFamily'] ) && $attributes['catTypoFontFamily'] ) {
					$this->register_gfont( $attributes['catTypoFontFamily'] );
				}
				if ( isset( $attributes['metaTypoFontFamily'] ) && $attributes['metaTypoFontFamily'] ) {
					$this->register_gfont( $attributes['metaTypoFontFamily'] );
				}
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-post-grid-4', $css, $attributes['id'] );
				}
			}
		}
		if ( $render ) {
			return render_block_grigora_kit_post_grid_4( $attributes, $content, $block );
		}
		return $content;
	}

	/**
	 * Handle Post Grid 3 CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_post_grid_5_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-grid-5', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-post-grid-5' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css = $this->generate_css_post_grid_5( $attributes );
				if ( isset( $attributes['titleTypoFontFamily'] ) && $attributes['titleTypoFontFamily'] ) {
					$this->register_gfont( $attributes['titleTypoFontFamily'] );
				}
				if ( isset( $attributes['contentTypoFontFamily'] ) && $attributes['contentTypoFontFamily'] ) {
					$this->register_gfont( $attributes['contentTypoFontFamily'] );
				}
				if ( isset( $attributes['catTypoFontFamily'] ) && $attributes['catTypoFontFamily'] ) {
					$this->register_gfont( $attributes['catTypoFontFamily'] );
				}
				if ( isset( $attributes['metaTypoFontFamily'] ) && $attributes['metaTypoFontFamily'] ) {
					$this->register_gfont( $attributes['metaTypoFontFamily'] );
				}
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-post-grid-5', $css, $attributes['id'] );
				}
			}
		}
		if ( $render ) {
			return render_block_grigora_kit_post_grid_5( $attributes, $content, $block );
		}
		return $content;
	}

	/**
	 * Handle Post Grid 6 CSS.
	 *
	 * @param array   $attributes Array of attributes.
	 * @param string  $content    Block Content.
	 * @param Block   $block      Block Object.
	 * @param boolean $render     Execute renderer.
	 */
	public function render_post_grid_6_css( $attributes, $content, $block, $render = true ) {
		if ( ! wp_style_is( 'grigora-kit-post-grid-6', 'enqueued' ) ) {
			$this->enqueue_style( 'grigora-kit-post-grid-6' );
		}
		if ( isset( $attributes ) ) {
			if ( isset( $attributes['id'] ) ) {
				$css = $this->generate_css_post_grid_6( $attributes );
				if ( isset( $attributes['title1TypoFontFamily'] ) && $attributes['title1TypoFontFamily'] ) {
					$this->register_gfont( $attributes['title1TypoFontFamily'] );
				}
				if ( isset( $attributes['title234TypoFontFamily'] ) && $attributes['title234TypoFontFamily'] ) {
					$this->register_gfont( $attributes['title234TypoFontFamily'] );
				}
				if ( isset( $attributes['contentTypoFontFamily'] ) && $attributes['contentTypoFontFamily'] ) {
					$this->register_gfont( $attributes['contentTypoFontFamily'] );
				}
				if ( isset( $attributes['catTypoFontFamily'] ) && $attributes['catTypoFontFamily'] ) {
					$this->register_gfont( $attributes['catTypoFontFamily'] );
				}
				if ( isset( $attributes['metaTypoFontFamily'] ) && $attributes['metaTypoFontFamily'] ) {
					$this->register_gfont( $attributes['metaTypoFontFamily'] );
				}
				if ( $css ) {
					$this->render_inline_styles( 'grigora-kit-post-grid-6', $css, $attributes['id'] );
				}
			}
		}
		if ( $render ) {
			return render_block_grigora_kit_post_grid_6( $attributes, $content, $block );
		}
		return $content;
	}

		/**
		 * Generate inline CSS conditionally on block render trigger.
		 * Used to render CSS in head for classic themes.
		 */
	public function conditional_block_assets() {
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
						$this->render_button_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/icon' === $block['blockName'] ) {
						$this->render_icon_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/number-counter' === $block['blockName'] ) {
						$this->render_number_counter_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/countdown' === $block['blockName'] ) {
						$this->render_countdown_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/google-maps' === $block['blockName'] ) {
						$this->render_google_maps_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/group' === $block['blockName'] ) {
						$this->render_group_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/text' === $block['blockName'] ) {
						$this->render_text_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/star-rating' === $block['blockName'] ) {
						$this->render_star_rating_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/scroll-to-top' === $block['blockName'] ) {
						$this->render_scroll_to_top_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-title' === $block['blockName'] ) {
						$this->render_post_title_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-excerpt' === $block['blockName'] ) {
						$this->render_post_excerpt_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-taxonomy' === $block['blockName'] ) {
						$this->render_post_taxonomy_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-author' === $block['blockName'] ) {
						$this->render_post_author_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/tabs' === $block['blockName'] ) {
						$this->render_tabs_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-grid-1' === $block['blockName'] ) {
						$this->render_post_grid_1_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-grid-2' === $block['blockName'] ) {
						$this->render_post_grid_2_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-grid-3' === $block['blockName'] ) {
						$this->render_post_grid_3_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-grid-4' === $block['blockName'] ) {
						$this->render_post_grid_4_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-grid-5' === $block['blockName'] ) {
						$this->render_post_grid_5_css( $block['attrs'], '', $block, false );
					} elseif ( 'grigora-kit/post-grid-6' === $block['blockName'] ) {
						$this->render_post_grid_6_css( $block['attrs'], '', $block, false );
					}
				}
			}
		}
		$this->enqueue_gfonts();
	}

		/**
		 * Enqueue Google Fonts if present.
		 */
	public function enqueue_gfonts() {

		if ( $this->gfonts ) {
			$ver          = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
			$font_request = 'https://fonts.googleapis.com/css?family=';
			foreach ( $this->gfonts as $gfont ) {
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


	/**
	 * Return a complete css for specific button block.
	 *
	 * @param array $attributes Block Attributes.
	 */
	public function generate_css_button( $attributes ) {
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
			$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoLineHeight'] ) && ( 'normal' !== $attributes['typoLineHeight'] ) ) ? $attributes['typoLineHeight'] . 'px' : 'normal' );
			$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoLetterSpacing'] ) && ( 'normal' !== $attributes['typoLetterSpacing'] ) ) ? $attributes['typoLetterSpacing'] . 'px' : 'normal' );
			$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoWordSpacing'] ) && ( 'normal' !== $attributes['typoWordSpacing'] ) ) ? $attributes['typoWordSpacing'] . 'px' : 'normal' );
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
			if ( ( isset( $attributes['textShadowHorizontal'] ) && '0px' !== $attributes['textShadowHorizontal'] ) ||
				( isset( $attributes['textShadowVertical'] ) && '0px' !== $attributes['textShadowVertical'] ) ||
				( isset( $attributes['textShadowBlur'] ) && '0px' !== $attributes['textShadowBlur'] )
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
			if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
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
				if ( isset( $attributes['iconPadding'] ) ) {
					if ( isset( $attributes['iconPadding']['left'] ) ) {
						$css = $css . sprintf( 'padding-left: %s;', $attributes['iconPadding']['left'] );
					}
					if ( isset( $attributes['iconPadding']['right'] ) ) {
						$css = $css . sprintf( 'padding-right: %s;', $attributes['iconPadding']['right'] );
					}
					if ( isset( $attributes['iconPadding']['top'] ) ) {
						$css = $css . sprintf( 'padding-top: %s;', $attributes['iconPadding']['top'] );
					}
					if ( isset( $attributes['iconPadding']['bottom'] ) ) {
						$css = $css . sprintf( 'padding-bottom: %s;', $attributes['iconPadding']['bottom'] );
					}
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
			if ( isset( $attributes['effectHAnimation'] ) && 'none' !== $attributes['effectHAnimation'] ) {
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
				$css = $css . '.block-id-' . $attributes['id'] . '::before { ' . sprintf( 'transition: %ss;', ( isset( $attributes['transitionTime'] ) ) ? $attributes['transitionTime'] : '1' ) . sprintf( 'background-image: %s;', ( isset( $attributes['effectHBGradient'] ) && $attributes['effectHBGradient'] ? $attributes['effectHBGradient'] : '' ) ) . '}';
			}

				// Tablet CSS.
				$css = $css . ' @media (min-width: 768px) and (max-width: 1024px) {';
				$css = $css . '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['typoSizeTablet'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSizeTablet'] );
			}
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
				$css = $css . '}';
				$css = $css . '.block-id-' . $attributes['id'] . ' .grigora-svg-icon {';
			if ( isset( $attributes['iconPaddingTablet'] ) ) {
				if ( isset( $attributes['iconPaddingTablet']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['iconPaddingTablet']['left'] );
				}
				if ( isset( $attributes['iconPaddingTablet']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['iconPaddingTablet']['right'] );
				}
				if ( isset( $attributes['iconPaddingTablet']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['iconPaddingTablet']['top'] );
				}
				if ( isset( $attributes['iconPaddingTablet']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['iconPaddingTablet']['bottom'] );
				}
			}
				$css = $css . '}';
				$css = $css . '.block-id-' . $attributes['id'] . ' .grigora-svg-icon svg {';
			if ( isset( $attributes['iconSizeTablet'] ) ) {
				$css = $css . sprintf( 'width: %s;', $attributes['iconSizeTablet'] );
				$css = $css . sprintf( 'height: %s;', $attributes['iconSizeTablet'] );
			}
				$css = $css . '}';
				$css = $css . '}';

				// Mobile CSS.
				$css = $css . ' @media (max-width: 767px) {';
				$css = $css . '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['typoSizeMobile'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSizeMobile'] );
			}
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
				$css = $css . '}';
				$css = $css . '.block-id-' . $attributes['id'] . ' .grigora-svg-icon {';
			if ( isset( $attributes['iconPaddingMobile'] ) ) {
				if ( isset( $attributes['iconPaddingMobile']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['iconPaddingMobile']['left'] );
				}
				if ( isset( $attributes['iconPaddingMobile']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['iconPaddingMobile']['right'] );
				}
				if ( isset( $attributes['iconPaddingMobile']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['iconPaddingMobile']['top'] );
				}
				if ( isset( $attributes['iconPaddingMobile']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['iconPaddingMobile']['bottom'] );
				}
			}
				$css = $css . '}';
				$css = $css . '.block-id-' . $attributes['id'] . ' .grigora-svg-icon svg {';
			if ( isset( $attributes['iconSizeMobile'] ) ) {
				$css = $css . sprintf( 'width: %s;', $attributes['iconSizeMobile'] );
				$css = $css . sprintf( 'height: %s;', $attributes['iconSizeMobile'] );
			}
				$css = $css . '}';
				$css = $css . '}';
			return $css;
		}
		return '';
	}

	/**
	 * Return a complete css for specific countdown block.
	 *
	 * @param array $attributes Block Attributes.
	 */
	public function generate_css_countdown( $attributes ) {
		if ( isset( $attributes['id'] ) ) {

				$css = '.block-id-' . $attributes['id'] . ' {';
				$css = $css . 'display: flex;';

			if ( isset( $attributes['align'] ) ) {
				$css = $css . sprintf( 'justify-content: %s;', $attributes['align'] );
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

				$css = $css . '}';

			$css = $css . '.block-id-' . $attributes['id'] . ' .days, .block-id-' . $attributes['id'] . ' .hours, .block-id-' . $attributes['id'] . ' .minutes, .block-id-' . $attributes['id'] . ' .seconds, .block-id-' . $attributes['id'] . ' .prefix, .block-id-' . $attributes['id'] . ' .suffix, .block-id-' . $attributes['id'] . ' .divider {';

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
				$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoLineHeight'] ) && ( 'normal' !== $attributes['typoLineHeight'] ) ) ? $attributes['typoLineHeight'] . 'px' : 'normal' );
				$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoLetterSpacing'] ) && ( 'normal' !== $attributes['typoLetterSpacing'] ) ) ? $attributes['typoLetterSpacing'] . 'px' : 'normal' );
				$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoWordSpacing'] ) && ( 'normal' !== $attributes['typoWordSpacing'] ) ) ? $attributes['typoWordSpacing'] . 'px' : 'normal' );

			// Number Style starts here.

			if ( isset( $attributes['effectNColorNumber'] ) && $attributes['effectNColorNumber'] ) {
				$css = $css . sprintf( 'color: %s;', $attributes['effectNColorNumber'] );
			}
			if ( isset( $attributes['textShadowHorizontalNumber'] ) ||
					isset( $attributes['textShadowVerticalNumber'] ) ||
					isset( $attributes['textShadowBlurNumber'] ) ||
					isset( $attributes['textShadowColorNumber'] )
				) {
				$css = $css . sprintf(
					'text-shadow: %s %s %s %s;',
					( isset( $attributes['textShadowHorizontalNumber'] ) ? $attributes['textShadowHorizontalNumber'] : '0px' ),
					( isset( $attributes['textShadowVerticalNumber'] ) ? $attributes['textShadowVerticalNumber'] : '0px' ),
					( isset( $attributes['textShadowBlurNumber'] ) ? $attributes['textShadowBlurNumber'] : '0px' ),
					( isset( $attributes['textShadowColorNumber'] ) ? $attributes['textShadowColorNumber'] : '#000' )
				);
			}

				$css = $css . '}';

				// Label Style starts here.
				$css = $css . '.block-id-' . $attributes['id'] . ' .label, .block-id-' . $attributes['id'] . ' .completed{ ';

			if ( isset( $attributes['typoLSize'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoLSize'] );
			}
			if ( isset( $attributes['typoLWeight'] ) ) {
				$css = $css . sprintf( 'font-weight: %s;', $attributes['typoLWeight'] );
			}
			if ( isset( $attributes['typoLTransform'] ) ) {
				$css = $css . sprintf( 'text-transform: %s;', $attributes['typoLTransform'] );
			}
			if ( isset( $attributes['typoLStyle'] ) ) {
				$css = $css . sprintf( 'font-style: %s;', $attributes['typoLStyle'] );
			}
					$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoLLineHeight'] ) && ( 'normal' !== $attributes['typoLLineHeight'] ) ) ? $attributes['typoLLineHeight'] . 'px' : 'normal' );
					$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoLLetterSpacing'] ) && ( 'normal' !== $attributes['typoLLetterSpacing'] ) ) ? $attributes['typoLLetterSpacing'] . 'px' : 'normal' );
					$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoLWordSpacing'] ) && ( 'normal' !== $attributes['typoLWordSpacing'] ) ) ? $attributes['typoLWordSpacing'] . 'px' : 'normal' );

			if ( isset( $attributes['effectNColorLabel'] ) && $attributes['effectNColorLabel'] ) {
				$css = $css . sprintf( 'color: %s;', $attributes['effectNColorLabel'] );
			}
			if ( isset( $attributes['textShadowHorizontalLabel'] ) ||
						isset( $attributes['textShadowVerticalLabel'] ) ||
						isset( $attributes['textShadowBlurLabel'] ) ||
						isset( $attributes['textShadowColorLabel'] )
					) {
				$css = $css . sprintf(
					'text-shadow: %s %s %s %s;',
					( isset( $attributes['textShadowHorizontalLabel'] ) ? $attributes['textShadowHorizontalLabel'] : '0px' ),
					( isset( $attributes['textShadowVerticalLabel'] ) ? $attributes['textShadowVerticalLabel'] : '0px' ),
					( isset( $attributes['textShadowBlurLabel'] ) ? $attributes['textShadowBlurLabel'] : '0px' ),
					( isset( $attributes['textShadowColorLabel'] ) ? $attributes['textShadowColorLabel'] : '#000' )
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

				// Tablet CSS.
				$css = $css . ' @media (min-width: 768px) and (max-width: 1024px) {';
				$css = $css . '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['alignTablet'] ) ) {
				$css = $css . sprintf( 'justify-content: %s;', $attributes['alignTablet'] );
			}
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
				$css = $css . '}';
				$css = $css . '.block-id-' . $attributes['id'] . ' .days, .block-id-' . $attributes['id'] . ' .hours, .block-id-' . $attributes['id'] . ' .minutes, .block-id-' . $attributes['id'] . ' .seconds, .block-id-' . $attributes['id'] . ' .prefix, .block-id-' . $attributes['id'] . ' .suffix, .block-id-' . $attributes['id'] . ' .divider {';
			if ( isset( $attributes['typoSizeTablet'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSizeTablet'] );
			}
				$css = $css . '}';
				$css = $css . '.block-id-' . $attributes['id'] . ' .label, .block-id-' . $attributes['id'] . ' .completed{ ';
			if ( isset( $attributes['typoLSizeTablet'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoLSizeTablet'] );
			}
				$css = $css . '}';
				$css = $css . '}';

				// Mobile CSS.
				$css     = $css . ' @media (max-width: 767px) {';
					$css = $css . '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['alignMobile'] ) ) {
				$css = $css . sprintf( 'justify-content: %s;', $attributes['alignMobile'] );
			}
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
					$css = $css . '}';
					$css = $css . '.block-id-' . $attributes['id'] . ' .days, .block-id-' . $attributes['id'] . ' .hours, .block-id-' . $attributes['id'] . ' .minutes, .block-id-' . $attributes['id'] . ' .seconds, .block-id-' . $attributes['id'] . ' .prefix, .block-id-' . $attributes['id'] . ' .suffix, .block-id-' . $attributes['id'] . ' .divider {';
			if ( isset( $attributes['typoSizeMobile'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSizeMobile'] );
			}
					$css = $css . '}';
					$css = $css . '.block-id-' . $attributes['id'] . ' .label, .block-id-' . $attributes['id'] . ' .completed{ ';
			if ( isset( $attributes['typoLSizeMobile'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoLSizeMobile'] );
			}
					$css = $css . '}';
					$css = $css . '}';

			return $css;
		}
		return '';
	}

	/**
	 * Generate CSS for Google maps.
	 *
	 * @param array $attributes Block Attributes.
	 */
	public function generate_css_google_maps( $attributes ) {

		if ( isset( $attributes['id'] ) ) {
			$css = '';
			$css = '.block-id-' . $attributes['id'] . ' {';
			if ( isset( $attributes['align'] ) && $attributes['align'] ) {
				$css = $css . sprintf( 'align-items: %s;', $attributes['align'] );
			}
			if ( isset( $attributes['layoutPadding'] ) ) {
				if ( isset( $attributes['layoutPadding']['left'] ) && $attributes['layoutPadding']['left'] ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['layoutPadding']['left'] );
				}
				if ( isset( $attributes['layoutPadding']['right'] ) && $attributes['layoutPadding']['right'] ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['layoutPadding']['right'] );
				}
				if ( isset( $attributes['layoutPadding']['top'] ) && $attributes['layoutPadding']['top'] ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['layoutPadding']['top'] );
				}
				if ( isset( $attributes['layoutPadding']['bottom'] ) && $attributes['layoutPadding']['bottom'] ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['layoutPadding']['bottom'] );
				}
			}
			if ( isset( $attributes['layoutMargin'] ) ) {
				if ( isset( $attributes['layoutMargin']['left'] ) && $attributes['layoutMargin']['left'] ) {
					$css = $css . sprintf( 'margin-left: %s;', $attributes['layoutMargin']['left'] );
				}
				if ( isset( $attributes['layoutMargin']['right'] ) && $attributes['layoutMargin']['right'] ) {
					$css = $css . sprintf( 'margin-right: %s;', $attributes['layoutMargin']['right'] );
				}
				if ( isset( $attributes['layoutMargin']['top'] ) && $attributes['layoutMargin']['top'] ) {
					$css = $css . sprintf( 'margin-top: %s;', $attributes['layoutMargin']['top'] );
				}
				if ( isset( $attributes['layoutMargin']['bottom'] ) && $attributes['layoutMargin']['bottom'] ) {
					$css = $css . sprintf( 'margin-bottom: %s;', $attributes['layoutMargin']['bottom'] );
				}
			}

			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ' iframe{';
			if ( isset( $attributes['height'] ) ) {
				$css = $css . sprintf( 'height: %s;', $attributes['height'] );
			}
			if ( isset( $attributes['maxWidth'] ) ) {
				$css = $css . sprintf( 'max-width: %s;', $attributes['maxWidth'] );
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
			if ( isset( $attributes['alignTablet'] ) ) {
				$css = $css . sprintf( 'align-items: %s;', $attributes['alignTablet'] );
			}
			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ' iframe{';
			if ( isset( $attributes['heightTablet'] ) ) {
				$css = $css . sprintf( 'height: %s;', $attributes['heightTablet'] );
			}
			if ( isset( $attributes['maxWidthTablet'] ) ) {
				$css = $css . sprintf( 'max-width: %s;', $attributes['maxWidthTablet'] );
			}
			$css = $css . '}';
			$css = $css . '}';

			// Mobile CSS.
			$css = $css . ' @media (max-width: 767px) {';
			$css = $css . '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['alignMobile'] ) ) {
				$css = $css . sprintf( 'align-items: %s;', $attributes['alignMobile'] );
			}
			$css = $css . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ' iframe{';
			if ( isset( $attributes['heightMobile'] ) ) {
				$css = $css . sprintf( 'height: %s;', $attributes['heightMobile'] );
			}
			if ( isset( $attributes['maxWidthMobile'] ) ) {
				$css = $css . sprintf( 'max-width: %s;', $attributes['maxWidthMobile'] );
			}
			$css = $css . '}';
			$css = $css . '}';

			return $css;
		}
		return '';
	}

	/**
	 * Generate Group CSS for Group.
	 *
	 * @param array $attributes Block Attributes.
	 */
	public function generate_css_group( $attributes ) {
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

	/**
	 * Return a complete css for specific icon block.
	 *
	 * @param array $attributes Block Attributes.
	 */
	public function generate_css_icon( $attributes ) {
		if ( isset( $attributes['id'] ) ) {

			$css = '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['iconPadding'] ) && isset( $attributes['iconPadding']['left'] ) ) {
				$css = $css . sprintf( 'padding-left: %s;', $attributes['iconPadding']['left'] );
			}
			if ( isset( $attributes['iconPadding'] ) && isset( $attributes['iconPadding']['right'] ) ) {
				$css = $css . sprintf( 'padding-right: %s;', $attributes['iconPadding']['right'] );
			}
			if ( isset( $attributes['iconPadding'] ) && isset( $attributes['iconPadding']['top'] ) ) {
				$css = $css . sprintf( 'padding-top: %s;', $attributes['iconPadding']['top'] );
			}
			if ( isset( $attributes['iconPadding'] ) && isset( $attributes['iconPadding']['bottom'] ) ) {
				$css = $css . sprintf( 'padding-bottom: %s;', $attributes['iconPadding']['bottom'] );
			}
			if ( isset( $attributes['iconMargin'] ) && isset( $attributes['iconMargin']['left'] ) ) {
				$css = $css . sprintf( 'margin-left: %s;', $attributes['iconMargin']['left'] );
			}
			if ( isset( $attributes['iconMargin'] ) && isset( $attributes['iconMargin']['right'] ) ) {
				$css = $css . sprintf( 'margin-right: %s;', $attributes['iconMargin']['right'] );
			}
			if ( isset( $attributes['iconMargin'] ) && isset( $attributes['iconMargin']['top'] ) ) {
				$css = $css . sprintf( 'margin-top: %s;', $attributes['iconMargin']['top'] );
			}
			if ( isset( $attributes['iconMargin'] ) && isset( $attributes['iconMargin']['bottom'] ) ) {
				$css = $css . sprintf( 'margin-bottom: %s;', $attributes['iconMargin']['bottom'] );
			}
			if ( isset( $attributes['align'] ) ) {
				$css = $css . sprintf( 'justify-content: %s;', $attributes['align'] );
			}
			$css = $css . '}';
			if ( ( ( isset( $attributes['icon'] ) && $attributes['icon'] && 'none' !== $attributes['icon'] ) ||
				( isset( $attributes['hasCustomIcon'] ) && $attributes['hasCustomIcon'] && isset( $attributes['customIcon'] ) && $attributes['customIcon'] ) ) ) {

				if ( isset( $attributes['url'] ) && $attributes['url'] ) {
					$css = $css . '.block-id-' . $attributes['id'] . ' a, .block-id-' . $attributes['id'] . ' svg {';
				} else {
					$css = $css . '.block-id-' . $attributes['id'] . ' svg{';
				}

				if ( isset( $attributes['iconSize'] ) ) {
					$css = $css . sprintf( 'width: %s;', $attributes['iconSize'] );
					$css = $css . sprintf( 'height: %s;', $attributes['iconSize'] );
				}
				if ( isset( $attributes['iconColorFlag'] ) && $attributes['iconColorFlag'] ) {
					if ( isset( $attributes['iconNormalColor'] ) ) {
						$css = $css . sprintf( 'color: %s;', $attributes['iconNormalColor'] );
					}
				}
				$css = $css . '}';
				if ( ( isset( $attributes['iconColorFlag'] ) && $attributes['iconColorFlag'] ) &&
					( isset( $attributes['iconHoverColor'] ) && $attributes['iconHoverColor'] )
				) {
					$css = $css . '.block-id-' . $attributes['id'] . ':hover svg{';
					$css = $css . sprintf( 'color: %s;', $attributes['iconHoverColor'] );
					$css = $css . '}';
				}
			}

			// Tablet CSS.
			$css = $css . ' @media (min-width: 768px) and (max-width: 1024px) {';
			$css = $css . '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['iconPaddingTablet'] ) ) {
				if ( isset( $attributes['iconPaddingTablet']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['iconPaddingTablet']['left'] );
				}
				if ( isset( $attributes['iconPaddingTablet']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['iconPaddingTablet']['right'] );
				}
				if ( isset( $attributes['iconPaddingTablet']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['iconPaddingTablet']['top'] );
				}
				if ( isset( $attributes['iconPaddingTablet']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['iconPaddingTablet']['bottom'] );
				}
			}
			if ( isset( $attributes['iconMarginTablet'] ) ) {
				if ( isset( $attributes['iconMarginTablet']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['iconMarginTablet']['left'] );
				}
				if ( isset( $attributes['iconMarginTablet']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['iconMarginTablet']['right'] );
				}
				if ( isset( $attributes['iconMarginTablet']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['iconMarginTablet']['top'] );
				}
				if ( isset( $attributes['iconMarginTablet']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['iconMarginTablet']['bottom'] );
				}
			}
			$css = $css . '}';
			if ( isset( $attributes['url'] ) && $attributes['url'] ) {
				$css = $css . '.block-id-' . $attributes['id'] . ' a, .block-id-' . $attributes['id'] . ' svg {';
			} else {
				$css = $css . '.block-id-' . $attributes['id'] . ' svg{';
			}

			if ( isset( $attributes['iconSizeTablet'] ) ) {
				$css = $css . sprintf( 'width: %s;', $attributes['iconSizeTablet'] );
				$css = $css . sprintf( 'height: %s;', $attributes['iconSizeTablet'] );
			}
			$css = $css . '}';
			$css = $css . '}';

			// Mobile CSS.
			$css = $css . ' @media (max-width: 767px) {';
			$css = $css . '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['iconPaddingMobile'] ) ) {
				if ( isset( $attributes['iconPaddingMobile']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['iconPaddingMobile']['left'] );
				}
				if ( isset( $attributes['iconPaddingMobile']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['iconPaddingMobile']['right'] );
				}
				if ( isset( $attributes['iconPaddingMobile']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['iconPaddingMobile']['top'] );
				}
				if ( isset( $attributes['iconPaddingMobile']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['iconPaddingMobile']['bottom'] );
				}
			}
			if ( isset( $attributes['iconMarginMobile'] ) ) {
				if ( isset( $attributes['iconMarginMobile']['left'] ) ) {
					$css = $css . sprintf( 'padding-left: %s;', $attributes['iconMarginMobile']['left'] );
				}
				if ( isset( $attributes['iconMarginMobile']['right'] ) ) {
					$css = $css . sprintf( 'padding-right: %s;', $attributes['iconMarginMobile']['right'] );
				}
				if ( isset( $attributes['iconMarginMobile']['top'] ) ) {
					$css = $css . sprintf( 'padding-top: %s;', $attributes['iconMarginMobile']['top'] );
				}
				if ( isset( $attributes['iconMarginMobile']['bottom'] ) ) {
					$css = $css . sprintf( 'padding-bottom: %s;', $attributes['iconMarginMobile']['bottom'] );
				}
			}
			$css = $css . '}';
			if ( isset( $attributes['url'] ) && $attributes['url'] ) {
				$css = $css . '.block-id-' . $attributes['id'] . ' a, .block-id-' . $attributes['id'] . ' svg {';
			} else {
				$css = $css . '.block-id-' . $attributes['id'] . ' svg{';
			}

			if ( isset( $attributes['iconSizeMobile'] ) ) {
				$css = $css . sprintf( 'width: %s;', $attributes['iconSizeMobile'] );
				$css = $css . sprintf( 'height: %s;', $attributes['iconSizeMobile'] );
			}
			$css = $css . '}';
			$css = $css . '}';

			return $css;
		}
		return '';
	}

		/**
		 * Return a complete css for specific number counter block.
		 *
		 * @param array $attributes Block Attributes.
		 */
	public function generate_css_number_counter( $attributes ) {
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
				$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoLineHeight'] ) && ( 'normal' !== $attributes['typoLineHeight'] ) ) ? $attributes['typoLineHeight'] . 'px' : 'normal' );
				$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoLetterSpacing'] ) && ( 'normal' !== $attributes['typoLetterSpacing'] ) ) ? $attributes['typoLetterSpacing'] . 'px' : 'normal' );
				$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoWordSpacing'] ) && ( 'normal' !== $attributes['typoWordSpacing'] ) ) ? $attributes['typoWordSpacing'] . 'px' : 'normal' );
			if ( isset( $attributes['effectNColor'] ) && $attributes['effectNColor'] ) {
				$css = $css . sprintf( 'color: %s;', $attributes['effectNColor'] );
			}
			if ( ( isset( $attributes['textShadowHorizontal'] ) && '0px' !== $attributes['textShadowHorizontal'] ) ||
					( isset( $attributes['textShadowVertical'] ) && '0px' !== $attributes['textShadowVertical'] ) ||
					( isset( $attributes['textShadowBlur'] ) && '0px' !== $attributes['textShadowBlur'] )
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

			// Tablet CSS.
			$css = $css . ' @media (min-width: 768px) and (max-width: 1024px) {';
			$css = $css . '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['typoSizeTablet'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSizeTablet'] );
			}
			$css = $css . '}';
			$css = $css . '}';

			// Mobile CSS.
			$css     = $css . ' @media (max-width: 767px) {';
				$css = $css . '.block-id-' . $attributes['id'] . '{';
			if ( isset( $attributes['typoSizeMobile'] ) ) {
				$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSizeMobile'] );
			}
				$css = $css . '}';
				$css = $css . '}';

			return $css;
		}
		return '';
	}

	/**
	 * Generate Post Author CSS.
	 *
	 * @param array $attributes Block Attributes.
	 */
	public function generate_css_post_author( $attributes ) {
		$css = '.block-id-' . $attributes['id'] . '{';
		if ( isset( $attributes['layout'] ) ) {
			$css = $css . sprintf( 'flex-direction: %s;', $attributes['layout'] );
		}
		if ( isset( $attributes['layout'] ) && 'column' === $attributes['layout'] && isset( $attributes['align'] ) ) {
			$css = $css . sprintf( 'align-items: %s;', $attributes['align'] );
		}
		if ( isset( $attributes['imageGap'] ) ) {
			$css = $css . sprintf( 'gap: %spx;', $attributes['imageGap'] );
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
		$css = $css . sprintf( 'transition: %s;', ( isset( $attributes['transitionColorTime'] ) && $attributes['transitionTime'] ) ? $attributes['transitionTime'] . 's' : '0.2s' );
		if ( isset( $attributes['backColor'] ) && $attributes['backColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['backColor'] );
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
		$css = $css . '}';

		$css = $css . '.block-id-' . $attributes['id'] . ' .grigora-kit-post-author__avatar {';
		if ( isset( $attributes['layout'] ) && 'column' !== $attributes['layout'] ) {
			$css = $css . sprintf( 'align-self: %s;', isset( $attributes['imageVerticalAlign'] ) ? $attributes['imageVerticalAlign'] : 'center' );
		}
		if ( isset( $attributes['width'] ) ) {
			$css = $css . sprintf( 'width: %spx;', $attributes['imageVerticalAlign'] );
		}
		$css = $css . '}';

		$css = $css . '.block-id-' . $attributes['id'] . ' .grigora-kit-post-author__avatar img {';
		if ( isset( $attributes['imageBorderRadius'] ) ) {
			$css = $css . sprintf( 'border-radius: %spx;', $attributes['imageBorderRadius'] );
		}
		if ( isset( $attributes['width'] ) ) {
			$css = $css . sprintf( 'width: %spx;', $attributes['imageVerticalAlign'] );
		}
		if ( isset( $attributes['imageBorderFlag'] ) && $attributes['imageBorderFlag'] ) {
			if ( isset( $attributes['imageBorder'] ) ) {
				if ( isset( $attributes['imageBorder']['left'] ) ) {
					$css = $css . sprintf(
						'border-left: %s %s %s;',
						( isset( $attributes['imageBorder']['left']['width'] ) ) ? $attributes['imageBorder']['left']['width'] : '',
						( isset( $attributes['imageBorder']['left']['style'] ) ) ? $attributes['imageBorder']['left']['style'] : '',
						( isset( $attributes['imageBorder']['left']['color'] ) ) ? $attributes['imageBorder']['left']['color'] : ''
					);
				}
				if ( isset( $attributes['imageBorder']['right'] ) ) {
					$css = $css . sprintf(
						'border-right: %s %s %s;',
						( isset( $attributes['imageBorder']['right']['width'] ) ) ? $attributes['imageBorder']['right']['width'] : '',
						( isset( $attributes['imageBorder']['right']['style'] ) ) ? $attributes['imageBorder']['right']['style'] : '',
						( isset( $attributes['imageBorder']['right']['color'] ) ) ? $attributes['imageBorder']['right']['color'] : ''
					);
				}
				if ( isset( $attributes['imageBorder']['top'] ) ) {
					$css = $css . sprintf(
						'border-top: %s %s %s;',
						( isset( $attributes['imageBorder']['top']['width'] ) ) ? $attributes['imageBorder']['top']['width'] : '',
						( isset( $attributes['imageBorder']['top']['style'] ) ) ? $attributes['imageBorder']['top']['style'] : '',
						( isset( $attributes['imageBorder']['top']['color'] ) ) ? $attributes['imageBorder']['top']['color'] : ''
					);
				}
				if ( isset( $attributes['imageBorder']['bottom'] ) ) {
					$css = $css . sprintf(
						'border-bottom: %s %s %s;',
						( isset( $attributes['imageBorder']['bottom']['width'] ) ) ? $attributes['imageBorder']['bottom']['width'] : '',
						( isset( $attributes['imageBorder']['bottom']['style'] ) ) ? $attributes['imageBorder']['bottom']['style'] : '',
						( isset( $attributes['imageBorder']['bottom']['color'] ) ) ? $attributes['imageBorder']['bottom']['color'] : ''
					);
				}
			}
		}
		$css = $css . '}';

		$css = $css . '.block-id-' . $attributes['id'] . ':hover {';
		if ( isset( $attributes['backHColor'] ) && $attributes['backHColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['backHColor'] );
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

		$css = $css . '.block-id-' . $attributes['id'] . ' .grigora-kit-post-author__content {';
		if ( isset( $attributes['align'] ) && $attributes['align'] ) {
			$css = $css . sprintf( 'align-items: %s; text-align: %s;', $attributes['align'], $attributes['align'] );
		}
		$css = $css . '}';

		$css = $css . '.block-id-' . $attributes['id'] . ' .grigora-kit-post-author__name {';
		$css = $css . sprintf( 'transition: %s;', ( isset( $attributes['stylesTransitionTime'] ) && $attributes['stylesTransitionTime'] ) ? $attributes['stylesTransitionTime'] . 's' : '0.2s' );
		if ( isset( $attributes['nameColor'] ) && $attributes['nameColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['nameColor'] );
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
		if ( isset( $attributes['typoDecoration'] ) ) {
			$css = $css . sprintf( 'text-decoration: %s;', $attributes['typoDecoration'] );
		}
		$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoLineHeight'] ) && ( 'normal' !== $attributes['typoLineHeight'] ) ) ? $attributes['typoLineHeight'] . 'px' : 'normal' );
		$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoLetterSpacing'] ) && ( 'normal' !== $attributes['typoLetterSpacing'] ) ) ? $attributes['typoLetterSpacing'] . 'px' : 'normal' );
		$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoWordSpacing'] ) && ( 'normal' !== $attributes['typoWordSpacing'] ) ) ? $attributes['typoWordSpacing'] . 'px' : 'normal' );
		if ( isset( $attributes['typoFontFamily'] ) && isset( $attributes['typoFontFamily'] ) ) {
			$css = $css . sprintf( 'font-family: %s;', $attributes['typoFontFamily'] );
		}
		$css = $css . '}';

		$css = $css . '.block-id-' . $attributes['id'] . ' .grigora-kit-post-author__name:hover {';
		if ( isset( $attributes['nameHColor'] ) && $attributes['nameHColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['nameHColor'] );
		}
		$css = $css . '}';

		$css = $css . '.block-id-' . $attributes['id'] . ' .grigora-kit-post-author__bio {';
		$css = $css . sprintf( 'transition: %s;', ( isset( $attributes['stylesTransitionTime'] ) && $attributes['stylesTransitionTime'] ) ? $attributes['stylesTransitionTime'] . 's' : '0.2s' );
		if ( isset( $attributes['bioColor'] ) && $attributes['bioColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['bioColor'] );
		}
		if ( isset( $attributes['typoBSize'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['typoBSize'] );
		}
		if ( isset( $attributes['typoBWeight'] ) ) {
			$css = $css . sprintf( 'font-weight: %s;', $attributes['typoBWeight'] );
		}
		if ( isset( $attributes['typoBTransform'] ) ) {
			$css = $css . sprintf( 'text-transform: %s;', $attributes['typoBTransform'] );
		}
		if ( isset( $attributes['typoBStyle'] ) ) {
			$css = $css . sprintf( 'font-style: %s;', $attributes['typoBStyle'] );
		}
		if ( isset( $attributes['typoBDecoration'] ) ) {
			$css = $css . sprintf( 'text-decoration: %s;', $attributes['typoBDecoration'] );
		}
		$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoBLineHeight'] ) && ( 'normal' !== $attributes['typoBLineHeight'] ) ) ? $attributes['typoBLineHeight'] . 'px' : 'normal' );
		$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoBLetterSpacing'] ) && ( 'normal' !== $attributes['typoBLetterSpacing'] ) ) ? $attributes['typoBLetterSpacing'] . 'px' : 'normal' );
		$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoBWordSpacing'] ) && ( 'normal' !== $attributes['typoBWordSpacing'] ) ) ? $attributes['typoBWordSpacing'] . 'px' : 'normal' );
		if ( isset( $attributes['typoBFontFamily'] ) && isset( $attributes['typoBFontFamily'] ) ) {
			$css = $css . sprintf( 'font-family: %s;', $attributes['typoBFontFamily'] );
		}
		$css = $css . '}';

		$css = $css . '.block-id-' . $attributes['id'] . ' .grigora-kit-post-author__bio:hover {';
		if ( isset( $attributes['bioHColor'] ) && $attributes['bioHColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['bioHColor'] );
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

		return $css;
	}

		/**
		 * Generate Post Excerpt CSS.
		 *
		 * @param array $attributes Block Attributes.
		 */
	public function generate_css_post_excerpt( $attributes ) {
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
		$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoLineHeight'] ) && ( 'normal' !== $attributes['typoLineHeight'] ) ) ? $attributes['typoLineHeight'] . 'px' : 'normal' );
		$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoLetterSpacing'] ) && ( 'normal' !== $attributes['typoLetterSpacing'] ) ) ? $attributes['typoLetterSpacing'] . 'px' : 'normal' );
		$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoWordSpacing'] ) && ( 'normal' !== $attributes['typoWordSpacing'] ) ) ? $attributes['typoWordSpacing'] . 'px' : 'normal' );
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
		if ( isset( $attributes['textColor'] ) && $attributes['textColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['textColor'] );
		}
		if ( isset( $attributes['textGradient'] ) && $attributes['textGradient'] ) {
			$css = $css . sprintf( 'background-image: %s;-webkit-background-clip: text;-webkit-text-fill-color: transparent;', $attributes['textGradient'] );
		}
		$css = $css . sprintf( 'transition: %s;', ( isset( $attributes['transitionColorTime'] ) && $attributes['transitionColorTime'] ) ? $attributes['transitionColorTime'] . 's' : '0.2s' );
		if ( ( isset( $attributes['textShadowHorizontal'] ) && '0px' !== $attributes['textShadowHorizontal'] ) ||
			( isset( $attributes['textShadowVertical'] ) && '0px' !== $attributes['textShadowVertical'] ) ||
			( isset( $attributes['textShadowBlur'] ) && '0px' !== $attributes['textShadowBlur'] )
		) {
			$css = $css . sprintf(
				'filter: drop-shadow(%s %s %s %s);',
				isset( $attributes['textShadowHorizontal'] ) ? $attributes['textShadowHorizontal'] : '0px',
				isset( $attributes['textShadowVertical'] ) ? $attributes['textShadowVertical'] : '0px',
				isset( $attributes['textShadowBlur'] ) ? $attributes['textShadowBlur'] : '0px',
				isset( $attributes['textShadowColor'] ) ? $attributes['textShadowColor'] : '#000'
			);
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
		if ( isset( $attributes['backColor'] ) && $attributes['backColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['backColor'] );
		}
		if ( isset( $attributes['backGradient'] ) && $attributes['backGradient'] ) {
			$css = $css . sprintf( 'background-image: %s;', $attributes['backGradient'] );
		}
		if ( ( isset( $attributes['textShadowHorizontal'] ) && '0px' !== $attributes['textShadowHorizontal'] ) ||
			( isset( $attributes['textShadowVertical'] ) && '0px' !== $attributes['textShadowVertical'] ) ||
			( isset( $attributes['textShadowBlur'] ) && '0px' !== $attributes['textShadowBlur'] )
		) {
			$css = $css . sprintf(
				'filter: drop-shadow(%s %s %s %s);',
				isset( $attributes['textShadowHorizontal'] ) ? $attributes['textShadowHorizontal'] : '0px',
				isset( $attributes['textShadowVertical'] ) ? $attributes['textShadowVertical'] : '0px',
				isset( $attributes['textShadowBlur'] ) ? $attributes['textShadowBlur'] : '0px',
				isset( $attributes['textShadowColor'] ) ? $attributes['textShadowColor'] : '#000'
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
		if ( isset( $attributes['textHColor'] ) && $attributes['textHColor'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . sprintf( ':hover {%s}', ( isset( $attributes['textGradient'] ) && $attributes['textGradient'] ) ? sprintf( '-webkit-text-fill-color: %s;', $attributes['textHColor'] ) : sprintf( 'color: %s;', $attributes['textHColor'] ) );
		}
		if ( isset( $attributes['textHGradient'] ) && $attributes['textHGradient'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ' {' . sprintf( 'background-image: %s;-webkit-background-clip: text;', $attributes['textHGradient'] ) . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ':hover {color: transparent;}';
		}
		$css = $css . '.block-id-' . $attributes['id'] . ':hover {';
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
		if ( ( isset( $attributes['textShadowHHorizontal'] ) && $attributes['textShadowHHorizontal'] ) ||
			( isset( $attributes['textShadowHVertical'] ) && $attributes['textShadowHVertical'] ) ||
			( isset( $attributes['textShadowHBlur'] ) && $attributes['textShadowHBlur'] )
		) {
			$css = $css . sprintf(
				'filter: drop-shadow(%s %s %s %s);',
				( isset( $attributes['textShadowHHorizontal'] ) && $attributes['textShadowHHorizontal'] ) ? $attributes['textShadowHHorizontal'] : ( ( isset( $attributes['textShadowHorizontal'] ) && $attributes['textShadowHorizontal'] ) ? $attributes['textShadowHorizontal'] : '0px' ),
				( isset( $attributes['textShadowHVertical'] ) && $attributes['textShadowHVertical'] ) ? $attributes['textShadowHVertical'] : ( ( isset( $attributes['textShadowVertical'] ) && $attributes['textShadowVertical'] ) ? $attributes['textShadowVertical'] : '0px' ),
				( isset( $attributes['textShadowHBlur'] ) && $attributes['textShadowHBlur'] ) ? $attributes['textShadowHBlur'] : ( ( isset( $attributes['textShadowBlur'] ) && $attributes['textShadowBlur'] ) ? $attributes['textShadowBlur'] : '0px' ),
				isset( $attributes['textShadowHColor'] ) ? $attributes['textShadowHColor'] : '#000'
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

		// Tablet CSS.
		$css = $css . ' @media (min-width: 768px) and (max-width: 1024px) {';
		$css = $css . '.block-id-' . $attributes['id'] . '{';
		if ( isset( $attributes['typoSizeTablet'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSizeTablet'] );
		}
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
		$css = $css . '}';
		$css = $css . '}';

		// Mobile CSS.
		$css = $css . ' @media (max-width: 767px) {';
		$css = $css . '.block-id-' . $attributes['id'] . '{';
		if ( isset( $attributes['typoSizeMobile'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSizeMobile'] );
		}
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
		$css = $css . '}';
		$css = $css . '}';

		return $css;
	}

	/**
	 * Return a complete css for specific post grid 1 block.
	 *
	 * @param array $attributes Block Attributes.
	 */
	public function generate_css_post_grid_1( $attributes ) {
		$css = '.block-id-' . $attributes['id'] . ' .first-block-style, ';
		$css = $css . '.block-id-' . $attributes['id'] . ' .second-block-style, ';
		$css = $css . '.block-id-' . $attributes['id'] . ' .third-fourth-block-style {';
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
		$css = $css . '}';
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
		$css     = $css . '.block-id-' . $attributes['id'] . ' .middle-style {';
			$css = $css . sprintf(
				'gap: %s;',
				( isset( $attributes['gap'] ) ) ? $attributes['gap'] . 'px' : ''
			);
		$css     = $css . '}';
		$css     = $css . '.block-id-' . $attributes['id'] . ' .last-style {';
			$css = $css . sprintf(
				'gap: %s;',
				( isset( $attributes['gap'] ) ) ? $attributes['gap'] . 'px' : ''
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
		if ( ( isset( $attributes['transitionColorTime'] ) ) ) {
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
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' .overlay-style {';
		if ( isset( $attributes['overlayColor'] ) && $attributes['overlayColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['overlayColor'] );
		}
		if ( isset( $attributes['overlayGradient'] ) && $attributes['overlayGradient'] ) {
			$css = $css . sprintf( 'background: %s;', $attributes['overlayGradient'] );
		}
		if ( isset( $attributes['overlayOpacity'] ) ) {
			$css = $css . sprintf(
				'opacity: calc(%s / 100);',
				$attributes['overlayOpacity']
			);
		}
		$css     = $css . '}';
		$css     = $css . '.block-id-' . $attributes['id'] . ' .cat-container {';
			$css = $css . sprintf(
				'text-align: %s;',
				( isset( $attributes['align'] ) ) ? $attributes['align'] : 'start'
			);
		$css     = $css . '}';
		$css     = $css . '.block-id-' . $attributes['id'] . ' .excerpt-style {';
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
		$css = $css . '.block-id-' . $attributes['id'] . ' .title1-style {';
		if ( isset( $attributes['title1TypoSize'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['title1TypoSize'] );
		}
		if ( isset( $attributes['title1TypoWeight'] ) ) {
			$css = $css . sprintf( 'font-weight: %s;', $attributes['title1TypoWeight'] );
		}
		if ( isset( $attributes['title1TypoTransform'] ) ) {
			$css = $css . sprintf( 'text-transform: %s;', $attributes['title1TypoTransform'] );
		}
		if ( isset( $attributes['title1TypoStyle'] ) ) {
			$css = $css . sprintf( 'font-style: %s;', $attributes['title1TypoStyle'] );
		}
		if ( isset( $attributes['title1TypoDecoration'] ) ) {
			$css = $css . sprintf( 'text-decoration: %s;', $attributes['title1TypoDecoration'] );
		}
			$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['title1TypoLineHeight'] ) && ( 'normal' !== $attributes['title1TypoLineHeight'] ) ) ? $attributes['title1TypoLineHeight'] . 'px' : 'normal' );
			$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['title1TypoLetterSpacing'] ) && ( 'normal' !== $attributes['title1TypoLetterSpacing'] ) ) ? $attributes['title1TypoLetterSpacing'] . 'px' : 'normal' );
			$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['title1TypoWordSpacing'] ) && ( 'normal' !== $attributes['title1TypoWordSpacing'] ) ) ? $attributes['title1TypoWordSpacing'] . 'px' : 'normal' );
		if ( isset( $attributes['title1TypoFontFamily'] ) && isset( $attributes['title1TypoFontFamily'] ) ) {
			$css = $css . sprintf( 'font-family: %s;', $attributes['title1TypoFontFamily'] );
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
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' .title234-style {';
		if ( isset( $attributes['title234TypoSize'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['title234TypoSize'] );
		}
		if ( isset( $attributes['title234TypoWeight'] ) ) {
			$css = $css . sprintf( 'font-weight: %s;', $attributes['title234TypoWeight'] );
		}
		if ( isset( $attributes['title234TypoTransform'] ) ) {
			$css = $css . sprintf( 'text-transform: %s;', $attributes['title234TypoTransform'] );
		}
		if ( isset( $attributes['title234TypoStyle'] ) ) {
			$css = $css . sprintf( 'font-style: %s;', $attributes['title234TypoStyle'] );
		}
		if ( isset( $attributes['title234TypoDecoration'] ) ) {
			$css = $css . sprintf( 'text-decoration: %s;', $attributes['title234TypoDecoration'] );
		}
			$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['title234TypoLineHeight'] ) && ( 'normal' !== $attributes['title234TypoLineHeight'] ) ) ? $attributes['title234TypoLineHeight'] . 'px' : 'normal' );
			$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['title234TypoLetterSpacing'] ) && ( 'normal' !== $attributes['title234TypoLetterSpacing'] ) ) ? $attributes['title234TypoLetterSpacing'] . 'px' : 'normal' );
			$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['title234TypoWordSpacing'] ) && ( 'normal' !== $attributes['title234TypoWordSpacing'] ) ) ? $attributes['title234TypoWordSpacing'] . 'px' : 'normal' );
		if ( isset( $attributes['title234TypoFontFamily'] ) && isset( $attributes['title234TypoFontFamily'] ) ) {
			$css = $css . sprintf( 'font-family: %s;', $attributes['title234TypoFontFamily'] );
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
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' .category-style {';
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
		// title hover.
		$css = $css . '.block-id-' . $attributes['id'] . ' .first-block-style:hover .title-style, ';
		$css = $css . '.block-id-' . $attributes['id'] . ' .second-block-style:hover .title-style, ';
		$css = $css . '.block-id-' . $attributes['id'] . ' .third-fourth-block-style:hover .title-style {';
		if ( isset( $attributes['titleTextHColor'] ) && $attributes['titleTextHColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['titleTextHColor'] );
		}
		if ( isset( $attributes['bgHColor'] ) && $attributes['bgHColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['bgHColor'] );
		}
		$css = $css . '}';
		// img-hover.
		$css = $css . '.block-id-' . $attributes['id'] . ' .first-block-style:hover .img-style, ';
		$css = $css . '.block-id-' . $attributes['id'] . ' .second-block-style:hover .img-style, ';
		$css = $css . '.block-id-' . $attributes['id'] . ' .third-fourth-block-style:hover .img-style {';
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
		// box-shadow hover.
		$css = $css . '.block-id-' . $attributes['id'] . ' .second-block-style:hover {';
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
		$css = $css . '.block-id-' . $attributes['id'] . ' .first-block-style:hover {';
		if ( ( isset( $attributes['transitionShadowTime'] ) ) ) {
			$css = $css . sprintf( 'transition: %s;', $attributes['transitionShadowTime'] . 's' );
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
		$css = $css . '.block-id-' . $attributes['id'] . ' .third-fourth-block-style:hover {';
		if ( ( isset( $attributes['transitionShadowTime'] ) ) ) {
			$css = $css . sprintf( 'transition: %s;', $attributes['transitionShadowTime'] . 's' );
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
		return $css;
	}

		/**
		 * Return a complete css for specific post grid 2 block.
		 *
		 * @param array $attributes Block Attributes.
		 */
	public function generate_css_post_grid_2( $attributes ) {
		$css = '.block-id-' . $attributes['id'] . ' .big-style, ';
		$css = $css . '.block-id-' . $attributes['id'] . ' .small-style {';
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
		$css = $css . '.block-id-' . $attributes['id'] . ' .overlay-style {';
		if ( isset( $attributes['overlayColor'] ) && $attributes['overlayColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['overlayColor'] );
		}
		if ( isset( $attributes['overlayGradient'] ) && $attributes['overlayGradient'] ) {
			$css = $css . sprintf( 'background: %s;', $attributes['overlayGradient'] );
		}
		if ( isset( $attributes['overlayOpacity'] ) ) {
			$css = $css . sprintf(
				'opacity: calc(%s / 100);',
				$attributes['overlayOpacity']
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
		// image hover.
		$css = $css . '.block-id-' . $attributes['id'] . ' .big-style:hover .img-style, ';
		$css = $css . '.block-id-' . $attributes['id'] . ' .small-style:hover .img-style {';
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

		/**
		 * Return a complete css for specific post grid 3 block.
		 *
		 * @param array $attributes Block Attributes.
		 */
	public function generate_css_post_grid_3( $attributes ) {
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
		if ( isset( $attributes['overlayOpacity'] ) ) {
			$css = $css . sprintf(
				'opacity: calc(%s / 100);',
				$attributes['overlayOpacity']
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

		/**
		 * Return a complete css for specific post grid 4 block.
		 *
		 * @param array $attributes Block Attributes.
		 */
	public function generate_css_post_grid_4( $attributes ) {
		$posts   = isset( $attributes['posts'] ) && $attributes['posts'] ? $attributes['posts'] : 6;
		$columns = isset( $attributes['columns'] ) && $attributes['columns'] ? $attributes['columns'] : 3;
		$gap     = isset( $attributes['gap'] ) && $attributes['gap'] ? $attributes['gap'] : 5;
		$css     = '.block-id-' . $attributes['id'] . ' .block-style {';
			$css = $css . sprintf(
				'text-align: %s;',
				( isset( $attributes['align'] ) ) ? $attributes['align'] : 'start'
			);
		if ( ( isset( $attributes['columns'] ) ) ) {
			$temp = ( $columns - 1 ) * $gap;
			$css  = $css . sprintf( 'width: calc((100% - %spx) / %s);', $temp, $attributes['columns'] );
		}
		if ( ( isset( $attributes['contHeight'] ) ) ) {
			$rows = ( ceil( ( $posts / $columns ) ) - 1 ) * $gap;
			$css  = $css . sprintf( 'height: calc(%s - %s);', $attributes['contHeight'] . 'px', $rows . 'px' );
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
		$css = $css . '}';
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
		$css     = $css . '.block-id-' . $attributes['id'] . ' .main-style {';
			$css = $css . sprintf(
				'gap: %s;',
				( isset( $attributes['gap'] ) ) ? $attributes['gap'] . 'px' : ''
			);
		$css     = $css . '}';
		$css     = $css . '.block-id-' . $attributes['id'] . ' .column-style {';
		if ( ( isset( $attributes['gap'] ) ) ) {
			$css = $css . sprintf( 'gap: %s;', $attributes['gap'] . 'px' );
		}
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
		if ( isset( $attributes['overlayOpacity'] ) ) {
			$css = $css . sprintf(
				'opacity: calc(%s / 100);',
				$attributes['overlayOpacity']
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

		/**
		 * Return a complete css for specific post grid 5 block.
		 *
		 * @param array $attributes Block Attributes.
		 */
	public function generate_css_post_grid_5( $attributes ) {
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
		if ( isset( $attributes['overlayOpacity'] ) ) {
			$css = $css . sprintf(
				'opacity: calc(%s / 100);',
				$attributes['overlayOpacity']
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

		/**
		 * Return a complete css for specific post grid 6 block.
		 *
		 * @param array $attributes Block Attributes.
		 */
	public function generate_css_post_grid_6( $attributes ) {
		$css = '.block-id-' . $attributes['id'] . ' .first-block-style, ';
		$css = $css . '.block-id-' . $attributes['id'] . ' .second-block-style, ';
		$css = $css . '.block-id-' . $attributes['id'] . ' .third-fourth-block-style {';
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
		$css = $css . '}';
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
		$css     = $css . '.block-id-' . $attributes['id'] . ' .middle-style {';
			$css = $css . sprintf(
				'gap: %s;',
				( isset( $attributes['gap'] ) ) ? $attributes['gap'] . 'px' : ''
			);
		$css     = $css . '}';
		$css     = $css . '.block-id-' . $attributes['id'] . ' .last-style {';
			$css = $css . sprintf(
				'gap: %s;',
				( isset( $attributes['gap'] ) ) ? $attributes['gap'] . 'px' : ''
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
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' .overlay-style {';
		if ( isset( $attributes['overlayColor'] ) && $attributes['overlayColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['overlayColor'] );
		}
		if ( isset( $attributes['overlayGradient'] ) && $attributes['overlayGradient'] ) {
			$css = $css . sprintf( 'background: %s;', $attributes['overlayGradient'] );
		}
		if ( isset( $attributes['overlayOpacity'] ) ) {
			$css = $css . sprintf(
				'opacity: calc(%s / 100);',
				$attributes['overlayOpacity']
			);
		}
		$css     = $css . '}';
		$css     = $css . '.block-id-' . $attributes['id'] . ' .cat-container {';
			$css = $css . sprintf(
				'text-align: %s;',
				( isset( $attributes['align'] ) ) ? $attributes['align'] : 'start'
			);
		$css     = $css . '}';
		$css     = $css . '.block-id-' . $attributes['id'] . ' .excerpt-style {';
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
		$css = $css . '.block-id-' . $attributes['id'] . ' .title1-style {';
		if ( isset( $attributes['title1TypoSize'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['title1TypoSize'] );
		}
		if ( isset( $attributes['title1TypoWeight'] ) ) {
			$css = $css . sprintf( 'font-weight: %s;', $attributes['title1TypoWeight'] );
		}
		if ( isset( $attributes['title1TypoTransform'] ) ) {
			$css = $css . sprintf( 'text-transform: %s;', $attributes['title1TypoTransform'] );
		}
		if ( isset( $attributes['title1TypoStyle'] ) ) {
			$css = $css . sprintf( 'font-style: %s;', $attributes['title1TypoStyle'] );
		}
		if ( isset( $attributes['title1TypoDecoration'] ) ) {
			$css = $css . sprintf( 'text-decoration: %s;', $attributes['title1TypoDecoration'] );
		}
			$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['title1TypoLineHeight'] ) && ( 'normal' !== $attributes['title1TypoLineHeight'] ) ) ? $attributes['title1TypoLineHeight'] . 'px' : 'normal' );
			$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['title1TypoLetterSpacing'] ) && ( 'normal' !== $attributes['title1TypoLetterSpacing'] ) ) ? $attributes['title1TypoLetterSpacing'] . 'px' : 'normal' );
			$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['title1TypoWordSpacing'] ) && ( 'normal' !== $attributes['title1TypoWordSpacing'] ) ) ? $attributes['title1TypoWordSpacing'] . 'px' : 'normal' );
		if ( isset( $attributes['title1TypoFontFamily'] ) && isset( $attributes['title1TypoFontFamily'] ) ) {
			$css = $css . sprintf( 'font-family: %s;', $attributes['title1TypoFontFamily'] );
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
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' .title234-style {';
		if ( isset( $attributes['title234TypoSize'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['title234TypoSize'] );
		}
		if ( isset( $attributes['title234TypoWeight'] ) ) {
			$css = $css . sprintf( 'font-weight: %s;', $attributes['title234TypoWeight'] );
		}
		if ( isset( $attributes['title234TypoTransform'] ) ) {
			$css = $css . sprintf( 'text-transform: %s;', $attributes['title234TypoTransform'] );
		}
		if ( isset( $attributes['title234TypoStyle'] ) ) {
			$css = $css . sprintf( 'font-style: %s;', $attributes['title234TypoStyle'] );
		}
		if ( isset( $attributes['title234TypoDecoration'] ) ) {
			$css = $css . sprintf( 'text-decoration: %s;', $attributes['title234TypoDecoration'] );
		}
			$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['title234TypoLineHeight'] ) && ( 'normal' !== $attributes['title234TypoLineHeight'] ) ) ? $attributes['title234TypoLineHeight'] . 'px' : 'normal' );
			$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['title234TypoLetterSpacing'] ) && ( 'normal' !== $attributes['title234TypoLetterSpacing'] ) ) ? $attributes['title234TypoLetterSpacing'] . 'px' : 'normal' );
			$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['title234TypoWordSpacing'] ) && ( 'normal' !== $attributes['title234TypoWordSpacing'] ) ) ? $attributes['title234TypoWordSpacing'] . 'px' : 'normal' );
		if ( isset( $attributes['title234TypoFontFamily'] ) && isset( $attributes['title234TypoFontFamily'] ) ) {
			$css = $css . sprintf( 'font-family: %s;', $attributes['title234TypoFontFamily'] );
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
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' .category-style {';
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
		// title hover.
		$css = $css . '.block-id-' . $attributes['id'] . ' .first-block-style:hover .title-style, ';
		$css = $css . '.block-id-' . $attributes['id'] . ' .second-block-style:hover .title-style, ';
		$css = $css . '.block-id-' . $attributes['id'] . ' .third-fourth-block-style:hover .title-style {';
		if ( isset( $attributes['titleTextHColor'] ) && $attributes['titleTextHColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['titleTextHColor'] );
		}
		if ( isset( $attributes['bgHColor'] ) && $attributes['bgHColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['bgHColor'] );
		}
		$css = $css . '}';
		// img-hover.
		$css = $css . '.block-id-' . $attributes['id'] . ' .first-block-style:hover .img-style, ';
		$css = $css . '.block-id-' . $attributes['id'] . ' .second-block-style:hover .img-style, ';
		$css = $css . '.block-id-' . $attributes['id'] . ' .third-fourth-block-style:hover .img-style {';
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
		// box-shadow hover.
		$css = $css . '.block-id-' . $attributes['id'] . ' .second-block-style:hover {';
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
		$css = $css . '.block-id-' . $attributes['id'] . ' .first-block-style:hover {';
		if ( ( isset( $attributes['transitionShadowTime'] ) ) ) {
			$css = $css . sprintf( 'transition: %s;', $attributes['transitionShadowTime'] . 's' );
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
		$css = $css . '.block-id-' . $attributes['id'] . ' .third-fourth-block-style:hover {';
		if ( ( isset( $attributes['transitionShadowTime'] ) ) ) {
			$css = $css . sprintf( 'transition: %s;', $attributes['transitionShadowTime'] . 's' );
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
		return $css;
	}

		/**
		 * Generate Post Taxonomy CSS.
		 *
		 * @param array $attributes Block Attributes.
		 */
	public function generate_css_post_taxonomy( $attributes ) {
		$css = '.block-id-' . $attributes['id'] . '{';
		if ( isset( $attributes['gapHorizontal'] ) ) {
			$css = $css . sprintf( 'column-gap: %spx;', $attributes['gapHorizontal'] );
		}
		if ( isset( $attributes['gapVertical'] ) ) {
			$css = $css . sprintf( 'row-gap: %spx;', $attributes['gapVertical'] );
		}
		$css = $css . '}';

		$css = $css . '.block-id-' . $attributes['id'] . ' .taxonomy-background, .block-id-' . $attributes['id'] . ' .grigora-kit-post-taxonomy__separator {';
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
		$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoLineHeight'] ) && ( 'normal' !== $attributes['typoLineHeight'] ) ) ? $attributes['typoLineHeight'] . 'px' : 'normal' );
		$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoLetterSpacing'] ) && ( 'normal' !== $attributes['typoLetterSpacing'] ) ) ? $attributes['typoLetterSpacing'] . 'px' : 'normal' );
		$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoWordSpacing'] ) && ( 'normal' !== $attributes['typoWordSpacing'] ) ) ? $attributes['typoWordSpacing'] . 'px' : 'normal' );
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
		$css = $css . sprintf( 'transition: %s;', ( isset( $attributes['transitionColorTime'] ) && $attributes['transitionColorTime'] ) ? $attributes['transitionColorTime'] . 's' : '0.2s' );
		$css = $css . '}';

		$css = $css . '.block-id-' . $attributes['id'] . ' .taxonomy-background {';
		if ( isset( $attributes['backColor'] ) && $attributes['backColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['backColor'] );
		}
		if ( isset( $attributes['backGradient'] ) && $attributes['backGradient'] ) {
			$css = $css . sprintf( 'background-image: %s;', $attributes['backGradient'] );
		}
		$css = $css . '}';

		$css = $css . '.block-id-' . $attributes['id'] . ' .taxonomy-background .taxonomy-background-span {';
		$css = $css . sprintf( 'transition: %s;', ( isset( $attributes['transitionColorTime'] ) && $attributes['transitionColorTime'] ) ? $attributes['transitionColorTime'] . 's' : '0.2s' );
		if ( isset( $attributes['textColor'] ) && $attributes['textColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['textColor'] );
		}
		$css = $css . '}';

		$css = $css . '.block-id-' . $attributes['id'] . ' .taxonomy-background:hover {';
		if ( isset( $attributes['backHColor'] ) && $attributes['backHColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['backHColor'] );
		}
		$css = $css . '}';

		$css = $css . '.block-id-' . $attributes['id'] . ' .taxonomy-background:hover .taxonomy-background-span {';
		if ( isset( $attributes['textHColor'] ) && $attributes['textHColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['textHColor'] );
		}
		$css = $css . '}';

		$css = $css . '.block-id-' . $attributes['id'] . ' .taxonomy-background::before {';
		$css = $css . sprintf( 'transition: %s;', ( isset( $attributes['transitionColorTime'] ) && $attributes['transitionColorTime'] ) ? $attributes['transitionColorTime'] . 's' : '0.2s' );
		if ( isset( $attributes['backHGradient'] ) && $attributes['backHGradient'] ) {
			$css = $css . sprintf( 'background: %s;', $attributes['backHGradient'] );
		}
		$css = $css . '}';

		$css = $css . '.block-id-' . $attributes['id'] . ' .grigora-kit-post-taxonomy__prefix {';
		if ( isset( $attributes['typoLSize'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['typoLSize'] );
		}
		if ( isset( $attributes['typoLWeight'] ) ) {
			$css = $css . sprintf( 'font-weight: %s;', $attributes['typoLWeight'] );
		}
		if ( isset( $attributes['typoLTransform'] ) ) {
			$css = $css . sprintf( 'text-transform: %s;', $attributes['typoLTransform'] );
		}
		if ( isset( $attributes['typoLStyle'] ) ) {
			$css = $css . sprintf( 'font-style: %s;', $attributes['typoLStyle'] );
		}
		if ( isset( $attributes['typoLDecoration'] ) ) {
			$css = $css . sprintf( 'text-decoration: %s;', $attributes['typoLDecoration'] );
		}
			$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoLLineHeight'] ) && ( 'normal' !== $attributes['typoLLineHeight'] ) ) ? $attributes['typoLLineHeight'] . 'px' : 'normal' );
			$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoLLetterSpacing'] ) && ( 'normal' !== $attributes['typoLLetterSpacing'] ) ) ? $attributes['typoLLetterSpacing'] . 'px' : 'normal' );
			$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoLWordSpacing'] ) && ( 'normal' !== $attributes['typoLWordSpacing'] ) ) ? $attributes['typoLWordSpacing'] . 'px' : 'normal' );
		if ( isset( $attributes['typoLFontFamily'] ) && isset( $attributes['typoLFontFamily'] ) ) {
			$css = $css . sprintf( 'font-family: %s;', $attributes['typoLFontFamily'] );
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
			$css = $css . sprintf( 'transition: %s;', ( isset( $attributes['transitionPrefixColorTime'] ) && $attributes['transitionPrefixColorTime'] ) ? $attributes['transitionPrefixColorTime'] . 's' : '0.2s' );
		if ( isset( $attributes['prefixTextColor'] ) && $attributes['prefixTextColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['prefixTextColor'] );
		}
		if ( isset( $attributes['prefixBackColor'] ) && $attributes['prefixBackColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['prefixBackColor'] );
		}
		if ( isset( $attributes['prefixBackGradient'] ) && $attributes['prefixBackGradient'] ) {
			$css = $css . sprintf( 'background-image: %s;', $attributes['prefixBackGradient'] );
		}
		$css = $css . '}';

		$css = $css . '.block-id-' . $attributes['id'] . ' .grigora-kit-post-taxonomy__prefix:hover {';
		if ( isset( $attributes['prefixBackHColor'] ) && $attributes['prefixBackHColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['prefixBackHColor'] );
		}
		if ( isset( $attributes['prefixTextHColor'] ) && $attributes['prefixTextHColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['prefixTextHColor'] );
		}
		$css = $css . '}';

		$css     = $css . '.block-id-' . $attributes['id'] . ' .grigora-kit-post-taxonomy__prefix::before {';
			$css = $css . sprintf( 'transition: %s;', ( isset( $attributes['transitionPrefixColorTime'] ) && $attributes['transitionPrefixColorTime'] ) ? $attributes['transitionPrefixColorTime'] . 's' : '0.2s' );
		if ( isset( $attributes['prefixBackHGradient'] ) && $attributes['prefixBackHGradient'] ) {
			$css = $css . sprintf( 'background: %s;', $attributes['prefixBackHGradien'] );
		}
		$css = $css . '}';

		if ( ( isset( $attributes['prefix'] ) && $attributes['prefix'] ) && ( isset( $attributes['prefixEffects'] ) && $attributes['prefixEffects'] ) ) {
			$css = $css . '.block-id-' . $attributes['id'] . ' .taxonomy-background, .block-id-' . $attributes['id'] . ' .grigora-kit-post-taxonomy__prefix {';
		} else {
			$css = $css . '.block-id-' . $attributes['id'] . ' .taxonomy-background {';
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
		if ( ( isset( $attributes['textShadowHorizontal'] ) && '0px' !== $attributes['textShadowHorizontal'] ) ||
			( isset( $attributes['textShadowVertical'] ) && '0px' !== $attributes['textShadowVertical'] ) ||
			( isset( $attributes['textShadowBlur'] ) && '0px' !== $attributes['textShadowBlur'] )
		) {
			$css = $css . sprintf(
				'text-shadow: %s %s %s %s;',
				isset( $attributes['textShadowHorizontal'] ) ? $attributes['textShadowHorizontal'] : '0px',
				isset( $attributes['textShadowVertical'] ) ? $attributes['textShadowVertical'] : '0px',
				isset( $attributes['textShadowBlur'] ) ? $attributes['textShadowBlur'] : '0px',
				isset( $attributes['textShadowColor'] ) ? $attributes['textShadowColor'] : '#000'
			);
		}
		$css = $css . '}';

		if ( ( isset( $attributes['prefix'] ) && $attributes['prefix'] ) && ( isset( $attributes['prefixEffects'] ) && $attributes['prefixEffects'] ) ) {
			$css = $css . '.block-id-' . $attributes['id'] . ' .taxonomy-background:hover, .block-id-' . $attributes['id'] . ' .grigora-kit-post-taxonomy__prefix:hover {';
		} else {
			$css = $css . '.block-id-' . $attributes['id'] . ' .taxonomy-background:hover {';
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
		if ( ( isset( $attributes['textShadowHHorizontal'] ) && $attributes['textShadowHHorizontal'] ) ||
			( isset( $attributes['textShadowHVertical'] ) && $attributes['textShadowHVertical'] ) ||
			( isset( $attributes['textShadowHBlur'] ) && $attributes['textShadowHBlur'] )
		) {
			$css = $css . sprintf(
				'text-shadow:%s %s %s %s;',
				( isset( $attributes['textShadowHHorizontal'] ) && $attributes['textShadowHHorizontal'] ) ? $attributes['textShadowHHorizontal'] : ( ( isset( $attributes['textShadowHorizontal'] ) && $attributes['textShadowHorizontal'] ) ? $attributes['textShadowHorizontal'] : '0px' ),
				( isset( $attributes['textShadowHVertical'] ) && $attributes['textShadowHVertical'] ) ? $attributes['textShadowHVertical'] : ( ( isset( $attributes['textShadowVertical'] ) && $attributes['textShadowVertical'] ) ? $attributes['textShadowVertical'] : '0px' ),
				( isset( $attributes['textShadowHBlur'] ) && $attributes['textShadowHBlur'] ) ? $attributes['textShadowHBlur'] : ( ( isset( $attributes['textShadowBlur'] ) && $attributes['textShadowBlur'] ) ? $attributes['textShadowBlur'] : '0px' ),
				isset( $attributes['textShadowHColor'] ) ? $attributes['textShadowHColor'] : '#000'
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

		return $css;
	}

		/**
		 * Generate Post Title CSS.
		 *
		 * @param array $attributes Block Attributes.
		 */
	public function generate_css_post_title( $attributes ) {
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
		$css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoLineHeight'] ) && ( 'normal' !== $attributes['typoLineHeight'] ) ) ? $attributes['typoLineHeight'] . 'px' : 'normal' );
		$css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoLetterSpacing'] ) && ( 'normal' !== $attributes['typoLetterSpacing'] ) ) ? $attributes['typoLetterSpacing'] . 'px' : 'normal' );
		$css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoWordSpacing'] ) && ( 'normal' !== $attributes['typoWordSpacing'] ) ) ? $attributes['typoWordSpacing'] . 'px' : 'normal' );
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
		if ( isset( $attributes['textColor'] ) && $attributes['textColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['textColor'] );
		}
		if ( isset( $attributes['textGradient'] ) && $attributes['textGradient'] ) {
			$css = $css . sprintf( 'background-image: %s;-webkit-background-clip: text;-webkit-text-fill-color: transparent;', $attributes['textGradient'] );
		}
		$css = $css . sprintf( 'transition: %s;', ( isset( $attributes['transitionColorTime'] ) && $attributes['transitionColorTime'] ) ? $attributes['transitionColorTime'] . 's' : '0.2s' );
		if ( ( isset( $attributes['textShadowHorizontal'] ) && '0px' !== $attributes['textShadowHorizontal'] ) ||
			( isset( $attributes['textShadowVertical'] ) && '0px' !== $attributes['textShadowVertical'] ) ||
			( isset( $attributes['textShadowBlur'] ) && '0px' !== $attributes['textShadowBlur'] )
		) {
			$css = $css . sprintf(
				'filter: drop-shadow(%s %s %s %s);',
				isset( $attributes['textShadowHorizontal'] ) ? $attributes['textShadowHorizontal'] : '0px',
				isset( $attributes['textShadowVertical'] ) ? $attributes['textShadowVertical'] : '0px',
				isset( $attributes['textShadowBlur'] ) ? $attributes['textShadowBlur'] : '0px',
				isset( $attributes['textShadowColor'] ) ? $attributes['textShadowColor'] : '#000'
			);
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
		if ( isset( $attributes['backColor'] ) && $attributes['backColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['backColor'] );
		}
		if ( isset( $attributes['backGradient'] ) && $attributes['backGradient'] ) {
			$css = $css . sprintf( 'background-image: %s;', $attributes['backGradient'] );
		}
		if ( ( isset( $attributes['textShadowHorizontal'] ) && '0px' !== $attributes['textShadowHorizontal'] ) ||
			( isset( $attributes['textShadowVertical'] ) && '0px' !== $attributes['textShadowVertical'] ) ||
			( isset( $attributes['textShadowBlur'] ) && '0px' !== $attributes['textShadowBlur'] )
		) {
			$css = $css . sprintf(
				'filter: drop-shadow(%s %s %s %s);',
				isset( $attributes['textShadowHorizontal'] ) ? $attributes['textShadowHorizontal'] : '0px',
				isset( $attributes['textShadowVertical'] ) ? $attributes['textShadowVertical'] : '0px',
				isset( $attributes['textShadowBlur'] ) ? $attributes['textShadowBlur'] : '0px',
				isset( $attributes['textShadowColor'] ) ? $attributes['textShadowColor'] : '#000'
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
		if ( isset( $attributes['textHColor'] ) && $attributes['textHColor'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . sprintf( ':hover {%s}', ( isset( $attributes['textGradient'] ) && $attributes['textGradient'] ) ? sprintf( '-webkit-text-fill-color: %s;', $attributes['textHColor'] ) : sprintf( 'color: %s;', $attributes['textHColor'] ) );
		}
		if ( isset( $attributes['textHGradient'] ) && $attributes['textHGradient'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ' {' . sprintf( 'background-image: %s;-webkit-background-clip: text;', $attributes['textHGradient'] ) . '}';
			$css = $css . '.block-id-' . $attributes['id'] . ':hover {color: transparent;}';
		}
		$css = $css . '.block-id-' . $attributes['id'] . ':hover {';
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
		if ( ( isset( $attributes['textShadowHHorizontal'] ) && $attributes['textShadowHHorizontal'] ) ||
			( isset( $attributes['textShadowHVertical'] ) && $attributes['textShadowHVertical'] ) ||
			( isset( $attributes['textShadowHBlur'] ) && $attributes['textShadowHBlur'] )
		) {
			$css = $css . sprintf(
				'filter: drop-shadow(%s %s %s %s);',
				( isset( $attributes['textShadowHHorizontal'] ) && $attributes['textShadowHHorizontal'] ) ? $attributes['textShadowHHorizontal'] : ( ( isset( $attributes['textShadowHorizontal'] ) && $attributes['textShadowHorizontal'] ) ? $attributes['textShadowHorizontal'] : '0px' ),
				( isset( $attributes['textShadowHVertical'] ) && $attributes['textShadowHVertical'] ) ? $attributes['textShadowHVertical'] : ( ( isset( $attributes['textShadowVertical'] ) && $attributes['textShadowVertical'] ) ? $attributes['textShadowVertical'] : '0px' ),
				( isset( $attributes['textShadowHBlur'] ) && $attributes['textShadowHBlur'] ) ? $attributes['textShadowHBlur'] : ( ( isset( $attributes['textShadowBlur'] ) && $attributes['textShadowBlur'] ) ? $attributes['textShadowBlur'] : '0px' ),
				isset( $attributes['textShadowHColor'] ) ? $attributes['textShadowHColor'] : '#000'
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

		// Tablet CSS.
		$css = $css . ' @media (min-width: 768px) and (max-width: 1024px) {';
		$css = $css . '.block-id-' . $attributes['id'] . '{';
		if ( isset( $attributes['typoSizeTablet'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSizeTablet'] );
		}
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
		$css = $css . '}';
		$css = $css . '}';

		// Mobile CSS.
		$css = $css . ' @media (max-width: 767px) {';
		$css = $css . '.block-id-' . $attributes['id'] . '{';
		if ( isset( $attributes['typoSizeMobile'] ) ) {
			$css = $css . sprintf( 'font-size: %spx;', $attributes['typoSizeMobile'] );
		}
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
		$css = $css . '}';
		$css = $css . '}';

		return $css;
	}

		/**
		 * Generate Group CSS for Scroll To Top
		 *
		 * @param array $attributes Block Attributes.
		 */
	public function generate_css_scroll_to_top( $attributes ) {
		$css = '.block-id-' . $attributes['id'] . '{';
		if ( isset( $attributes['position'] ) && $attributes['position'] ) {
				$css = $css . sprintf( 'position: %s !important;', $attributes['position'] );
		}
		if ( isset( $attributes['positionCoord']['left'] ) && $attributes['positionCoord']['left'] ) {
			$css = $css . sprintf( 'left: %s;', $attributes['positionCoord']['left'] );
		}
		if ( isset( $attributes['positionCoord']['top'] ) && $attributes['positionCoord']['top'] ) {
			$css = $css . sprintf( 'top: %s;', $attributes['positionCoord']['top'] );
		}
		if ( isset( $attributes['positionCoord']['right'] ) && $attributes['positionCoord']['right'] ) {
			$css = $css . sprintf( 'right: %s;', $attributes['positionCoord']['right'] );
		}
		if ( isset( $attributes['positionCoord']['bottom'] ) && $attributes['positionCoord']['bottom'] ) {
			$css = $css . sprintf( 'bottom: %s;', $attributes['positionCoord']['bottom'] );
		}
		if ( isset( $attributes['zindex'] ) && $attributes['zindex'] ) {
			$css = $css . sprintf( 'z-index: %s;', $attributes['zindex'] );
		}
		if ( isset( $attributes['transitionTime'] ) && $attributes['transitionTime'] ) {
			$css = $css . sprintf( 'transition: %ss;', $attributes['transitionTime'] );
		}
		if ( isset( $attributes['iconPadding'] ) ) {
			if ( isset( $attributes['iconPadding']['left'] ) ) {
				$css = $css . sprintf( 'padding-left: %s;', $attributes['iconPadding']['left'] );
			}
			if ( isset( $attributes['iconPadding']['right'] ) ) {
				$css = $css . sprintf( 'padding-right: %s;', $attributes['iconPadding']['right'] );
			}
			if ( isset( $attributes['iconPadding']['top'] ) ) {
				$css = $css . sprintf( 'padding-top: %s;', $attributes['iconPadding']['top'] );
			}
			if ( isset( $attributes['iconPadding']['bottom'] ) ) {
				$css = $css . sprintf( 'padding-bottom: %s;', $attributes['iconPadding']['bottom'] );
			}
		}
		if ( isset( $attributes['iconMargin'] ) ) {
			if ( isset( $attributes['iconMargin']['left'] ) ) {
				$css = $css . sprintf( 'margin-left: %s;', $attributes['iconMargin']['left'] );
			}
			if ( isset( $attributes['iconMargin']['right'] ) ) {
				$css = $css . sprintf( 'margin-right: %s;', $attributes['iconMargin']['right'] );
			}
			if ( isset( $attributes['iconMargin']['top'] ) ) {
				$css = $css . sprintf( 'margin-top: %s;', $attributes['iconMargin']['top'] );
			}
			if ( isset( $attributes['iconMargin']['bottom'] ) ) {
				$css = $css . sprintf( 'margin-bottom: %s;', $attributes['iconMargin']['bottom'] );
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
			'box-shadow: %s %s %s %s %s;',
			( isset( $attributes['effectNShadowHO'] ) ) ? $attributes['effectNShadowHO'] : '0px',
			( isset( $attributes['effectNShadowVO'] ) ) ? $attributes['effectNShadowVO'] : '0px',
			( isset( $attributes['effectNShadowBlur'] ) ) ? $attributes['effectNShadowBlur'] : '0px',
			( isset( $attributes['effectNShadowSpread'] ) ) ? $attributes['effectNShadowSpread'] : '0px',
			( isset( $attributes['effectNShadowColor'] ) ) ? $attributes['effectNShadowColor'] : '#000',
		);
		if ( isset( $attributes['backgroundNormalColor'] ) && $attributes['backgroundNormalColor'] ) {
			$css = $css . sprintf( 'background-color: %s;', $attributes['backgroundNormalColor'] );
		}
		if ( isset( $attributes['transitionTime'] ) && $attributes['transitionTime'] ) {
			$css = $css . sprintf( 'transition: %s;', $attributes['transitionTime'] );
		}
		$css = $css . '}';
		$css = $css . '.block-id-' . $attributes['id'] . ' svg{';
		if ( isset( $attributes['iconSize'] ) && $attributes['iconSize'] ) {
			$css = $css . sprintf( 'height: %s; width: %s;', $attributes['iconSize'], $attributes['iconSize'] );
		}
		if ( isset( $attributes['iconNormalColor'] ) && $attributes['iconNormalColor'] ) {
			$css = $css . sprintf( 'color: %s;', $attributes['iconNormalColor'] );
		}
		$css = $css . '}';
		if ( isset( $attributes['backgroundHoverColor'] ) && $attributes['backgroundHoverColor'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ':hover{';
			$css = $css . sprintf( 'background-color: %s;', $attributes['backgroundHoverColor'] );
			$css = $css . '}';
		}
		if ( isset( $attributes['iconHoverColor'] ) && $attributes['iconHoverColor'] ) {
			$css = $css . '.block-id-' . $attributes['id'] . ':hover svg{';
			$css = $css . sprintf( 'color: %s;', $attributes['iconHoverColor'] );
			$css = $css . '}';
		}
		return $css;
	}

		/**
		 * Generate CSS for Star Rating.
		 *
		 * @param array $attributes Block Attributes.
		 */
	public function generate_css_star_rating( $attributes ) {
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

		/**
		 * Generate CSS for tabs block.
		 *
		 * @param array $attributes Attributes of the block.
		 */
	public function generate_css_tabs( $attributes ) {

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

	/**
	 * Generate Text CSS.
	 *
	 * @param array $attributes Block Attributes.
	 */
	public function generate_css_text( $attributes ) {
		$id                     = $attributes['id'];
		$typoSize               = isset( $attributes['typoSize'] ) ? $attributes['typoSize'] : '';
		$typoWeight             = isset( $attributes['typoWeight'] ) ? $attributes['typoWeight'] : '';
		$typoTransform          = isset( $attributes['typoTransform'] ) ? $attributes['typoTransform'] : '';
		$typoStyle              = isset( $attributes['typoStyle'] ) ? $attributes['typoStyle'] : '';
		$typoDecoration         = isset( $attributes['typoDecoration'] ) ? $attributes['typoDecoration'] : '';
		$typoLineHeight         = isset( $attributes['typoLineHeight'] ) ? $attributes['typoLineHeight'] : 'normal';
		$typoLetterSpacing      = isset( $attributes['typoLetterSpacing'] ) ? $attributes['typoLetterSpacing'] : 'normal';
		$typoWordSpacing        = isset( $attributes['typoWordSpacing'] ) ? $attributes['typoWordSpacing'] : 'normal';
		$typoFontFamily         = isset( $attributes['typoFontFamily'] ) ? $attributes['typoFontFamily'] : '';
		$layoutColumns          = isset( $attributes['layoutColumns'] ) ? $attributes['layoutColumns'] : '';
		$layoutColumnsGap       = isset( $attributes['layoutColumnsGap'] ) ? $attributes['layoutColumnsGap'] : '';
		$layoutPadding          = isset( $attributes['layoutPadding'] ) ? $attributes['layoutPadding'] : array();
		$layoutMargin           = isset( $attributes['layoutMargin'] ) ? $attributes['layoutMargin'] : array();
		$textColor              = isset( $attributes['textColor'] ) ? $attributes['textColor'] : '';
		$textHColor             = isset( $attributes['textHColor'] ) ? $attributes['textHColor'] : '';
		$textGradient           = isset( $attributes['textGradient'] ) ? $attributes['textGradient'] : '';
		$textHGradient          = isset( $attributes['textHGradient'] ) ? $attributes['textHGradient'] : '';
		$transitionColorTime    = isset( $attributes['transitionColorTime'] ) ? $attributes['transitionColorTime'] : '';
		$textShadowHorizontal   = isset( $attributes['textShadowHorizontal'] ) ? $attributes['textShadowHorizontal'] : '0px';
		$textShadowVertical     = isset( $attributes['textShadowVertical'] ) ? $attributes['textShadowVertical'] : '0px';
		$textShadowBlur         = isset( $attributes['textShadowBlur'] ) ? $attributes['textShadowBlur'] : '0px';
		$textShadowColor        = isset( $attributes['textShadowColor'] ) ? $attributes['textShadowColor'] : '#000';
		$textShadowHHorizontal  = isset( $attributes['textShadowHHorizontal'] ) ? $attributes['textShadowHHorizontal'] : '';
		$textShadowHVertical    = isset( $attributes['textShadowHVertical'] ) ? $attributes['textShadowHVertical'] : '';
		$textShadowHBlur        = isset( $attributes['textShadowHBlur'] ) ? $attributes['textShadowHBlur'] : '';
		$textShadowHColor       = isset( $attributes['textShadowHColor'] ) ? $attributes['textShadowHColor'] : '';
		$entranceAnimation      = isset( $attributes['entranceAnimation'] ) ? $attributes['entranceAnimation'] : 'none';
		$entranceAnimationTime  = isset( $attributes['entranceAnimationTime'] ) ? $attributes['entranceAnimationTime'] : '1';
		$entranceAnimationDelay = isset( $attributes['entranceAnimationDelay'] ) ? $attributes['entranceAnimationDelay'] : '';

		$typoSizeTablet      = isset( $attributes['typoSizeTablet'] ) ? $attributes['typoSizeTablet'] : '';
		$layoutPaddingTablet = isset( $attributes['layoutPaddingTablet'] ) ? $attributes['layoutPaddingTablet'] : array();

		$typoSizeMobile      = isset( $attributes['typoSizeMobile'] ) ? $attributes['typoSizeMobile'] : '';
		$layoutPaddingMobile = isset( $attributes['layoutPaddingMobile'] ) ? $attributes['layoutPaddingMobile'] : array();

		$css = '.block-id-' . $id . '{';
		if ( $typoSize ) {
			$css = $css . sprintf( 'font-size: %spx;', $typoSize );
		}
		if ( $typoWeight ) {
			$css = $css . sprintf( 'font-weight: %s;', $typoWeight );
		}
		if ( $typoTransform ) {
			$css = $css . sprintf( 'text-transform: %s;', $typoTransform );
		}
		if ( $typoStyle ) {
			$css = $css . sprintf( 'font-style: %s;', $typoStyle );
		}
		if ( $typoDecoration ) {
			$css = $css . sprintf( 'text-decoration: %s;', $typoDecoration );
		}
		$css = $css . sprintf( 'line-height: %s;', ( 'normal' !== $typoLineHeight ) ? $typoLineHeight . 'px' : 'normal' );
		$css = $css . sprintf( 'letter-spacing: %s;', ( 'normal' !== $typoLetterSpacing ) ? $typoLetterSpacing . 'px' : 'normal' );
		$css = $css . sprintf( 'word-spacing: %s;', ( 'normal' !== $typoWordSpacing ) ? $typoWordSpacing . 'px' : 'normal' );
		if ( $typoFontFamily ) {
			$css = $css . sprintf( 'font-family: %s;', $typoFontFamily );
		}
		if ( $layoutColumns ) {
			$css = $css . sprintf( 'column-count: %s;', $layoutColumns );
		}
		if ( $layoutColumnsGap ) {
			$css = $css . sprintf( 'column-gap: %spx;', $layoutColumnsGap );
		}
		if ( isset( $layoutPadding['left'] ) ) {
			$css = $css . sprintf( 'padding-left: %s;', $layoutPadding['left'] );
		}
		if ( isset( $layoutPadding['right'] ) ) {
			$css = $css . sprintf( 'padding-right: %s;', $layoutPadding['right'] );
		}
		if ( isset( $layoutPadding['top'] ) ) {
			$css = $css . sprintf( 'padding-top: %s;', $layoutPadding['top'] );
		}
		if ( isset( $layoutPadding['bottom'] ) ) {
			$css = $css . sprintf( 'padding-bottom: %s;', $layoutPadding['bottom'] );
		}
		if ( isset( $layoutMargin['left'] ) ) {
			$css = $css . sprintf( 'margin-left: %s;', $layoutMargin['left'] );
		}
		if ( isset( $layoutMargin['right'] ) ) {
			$css = $css . sprintf( 'margin-right: %s;', $layoutMargin['right'] );
		}
		if ( isset( $layoutMargin['top'] ) ) {
			$css = $css . sprintf( 'margin-top: %s;', $layoutMargin['top'] );
		}
		if ( isset( $layoutMargin['bottom'] ) ) {
			$css = $css . sprintf( 'margin-bottom: %s;', $layoutMargin['bottom'] );
		}
		if ( $textColor ) {
			$css = $css . sprintf( 'color: %s;', $textColor );
		}
		if ( $textGradient ) {
			$css = $css . sprintf( 'background-image: %s;-webkit-background-clip: text;-webkit-text-fill-color: transparent;', $textGradient );
		}
		$css = $css . sprintf( 'transition: %s;', ( $transitionColorTime ) ? $transitionColorTime . 's' : '0.2s' );
		if ( '0px' !== $textShadowHorizontal ||
			'0px' !== $textShadowVertical ||
			'0px' !== $textShadowBlur
		) {
			$css = $css . sprintf( 'filter: drop-shadow(%s %s %s %s);', $textShadowHorizontal, $textShadowVertical, $textShadowBlur, $textShadowColor );
		}
		$css = $css . '}';
		$css = $css . '.block-id-' . $id . '.animateOnce {';
		if ( 'none' !== $entranceAnimation ) {
			$css = $css . sprintf( 'animation: %s %s %s;', $entranceAnimation, $entranceAnimationTime . 's', $entranceAnimationDelay . 'ms' );
		}
		$css = $css . '}';
		if ( $textHColor ) {
			$css = $css . '.block-id-' . $id . sprintf( ':hover {%s}', $textColor ? sprintf( 'color: %s;', $textHColor ) : sprintf( '-webkit-text-fill-color: %s;', $textHColor ) );
		}
		if ( $textHGradient ) {
			$css = $css . '.block-id-' . $id . ' {' . sprintf( 'background-image: %s;-webkit-background-clip: text;', $textHGradient ) . '}';
			$css = $css . '.block-id-' . $id . ':hover {color: transparent;}';
		}

		$css = $css . '.block-id-' . $id . ':hover {';
		if ( $textShadowHHorizontal || $textShadowHHorizontal || $textShadowHBlur ) {
			$css = $css . sprintf(
				'filter: drop-shadow(%s %s %s %s);',
				$textShadowHHorizontal ? $textShadowHHorizontal : $textShadowHorizontal,
				$textShadowHVertical ? $textShadowHVertical : $textShadowVertical,
				$textShadowHBlur ? $textShadowHBlur : $textShadowBlur,
				$textShadowHColor ? $textShadowHColor : $textShadowColor
			);
		}
		$css = $css . '}';

		// Tablet CSS.
		$css = $css . ' @media (min-width: 768px) and (max-width: 1024px) {';
		$css = $css . '.block-id-' . $id . '{';
		if ( $typoSizeTablet ) {
			$css = $css . sprintf( 'font-size: %spx;', $typoSizeTablet );
		}
		if ( isset( $layoutPaddingTablet['left'] ) ) {
			$css = $css . sprintf( 'padding-left: %s;', $layoutPaddingTablet['left'] );
		}
		if ( isset( $layoutPaddingTablet['right'] ) ) {
			$css = $css . sprintf( 'padding-right: %s;', $layoutPaddingTablet['right'] );
		}
		if ( isset( $layoutPaddingTablet['top'] ) ) {
			$css = $css . sprintf( 'padding-top: %s;', $layoutPaddingTablet['top'] );
		}
		if ( isset( $layoutPaddingTablet['bottom'] ) ) {
			$css = $css . sprintf( 'padding-bottom: %s;', $layoutPaddingTablet['bottom'] );
		}
		$css = $css . '}';
		$css = $css . '}';

		// Mobile CSS.
		$css = $css . ' @media (max-width: 767px) {';
		$css = $css . '.block-id-' . $id . '{';
		if ( $typoSizeMobile ) {
			$css = $css . sprintf( 'font-size: %spx;', $typoSizeMobile );
		}
		if ( isset( $layoutPaddingMobile['left'] ) ) {
			$css = $css . sprintf( 'padding-left: %s;', $layoutPaddingMobile['left'] );
		}
		if ( isset( $layoutPaddingMobile['right'] ) ) {
			$css = $css . sprintf( 'padding-right: %s;', $layoutPaddingMobile['right'] );
		}
		if ( isset( $layoutPaddingMobile['top'] ) ) {
			$css = $css . sprintf( 'padding-top: %s;', $layoutPaddingMobile['top'] );
		}
		if ( isset( $layoutPaddingMobile['bottom'] ) ) {
			$css = $css . sprintf( 'padding-bottom: %s;', $layoutPaddingMobile['bottom'] );
		}
		$css = $css . '}';
		$css = $css . '}';

		return $css;
	}

}

Grigora_Kit_Blocks::get_instance();

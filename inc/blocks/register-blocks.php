<?php
/**
 * Register Blocks.
 *
 * @package grigora-kit
 */

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

if ( ! function_exists( 'grigora_kit_block_category_all' ) ) {
	/**
	 * Register Grigora Kit Blocks Categories.
	 *
	 * @param array $categories           Array of existing categories.
	 * @param array $block_editor_context Block Editor Content.
	 */
	function grigora_kit_block_category_all( $categories, $block_editor_context ) {
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
}

if ( ! function_exists( 'grigora_kit_block_init' ) ) {
	/**
	 * Register Grigora Kit Blocks.
	 */
	function grigora_kit_block_init() {

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
				'render_callback' => 'grigora_button_css',
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
				'render_callback' => 'grigora_number_counter_css',
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
				'render_callback' => 'grigora_countdown_css',
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
				'render_callback' => 'grigora_google_maps_css',
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
				'render_callback' => 'grigora_icon_css',
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
				'render_callback' => 'grigora_group_css',
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
				'render_callback' => 'grigora_text_css',
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
				'render_callback' => 'grigora_star_rating_css',
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
				'render_callback' => 'grigora_scroll_to_top_css',
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
				'render_callback' => 'grigora_post_title_css',
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
				'render_callback' => 'grigora_post_excerpt_css',
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
				'render_callback' => 'grigora_post_taxonomy_css',
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
				'render_callback' => 'grigora_post_author_css',
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
				'render_callback' => 'grigora_tabs_css',
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
				'render_callback' => 'grigora_post_grid_1_css',
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
				'render_callback' => 'grigora_post_grid_2_css',
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
				'render_callback' => 'grigora_post_grid_3_css',
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
				'render_callback' => 'grigora_post_grid_4_css',
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
				'render_callback' => 'grigora_post_grid_5_css',
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
				'render_callback' => 'grigora_post_grid_6_css',
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);

	}
}



if ( ! function_exists( 'grigora_enqueue_blocks_via_js' ) ) {
	/**
	 * Enqueue Block Editor Assets.
	 */
	function grigora_enqueue_blocks_via_js() {

		// Blocks JS.
		$assets_file = GRIGORA_KIT_PATH . 'build/index.asset.php';
		$assets_file = file_exists( $assets_file ) ? require $assets_file : false;

		wp_enqueue_script(
			'grigora-kit-blocks',
			GRIGORA_KIT_URL . 'build/index.js',
			$assets_file['dependencies'],
			$assets_file['version'],
			true
		);
		wp_localize_script(
			'grigora-kit-blocks',
			'grigora_kit_blocks_config',
			array(
				'current_screen' => get_current_screen()->id,
			)
		);

		// Editor CSS.
		$ver       = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$extension = GRIGORA_KIT_DEBUG ? '.css' : '.min.css';
		wp_enqueue_style( 'grigora-kit-blocks-editor', GRIGORA_KIT_URL . 'assets/css/blocks/editor' . $extension, [], $ver );
		wp_enqueue_style( 'grigora-kit-blocks-editor-style', GRIGORA_KIT_URL . 'assets/css/blocks/style' . $extension, [], $ver );
	}
}

if ( ! function_exists( 'grigora_get_featured_image' ) ) {
	/**
	 * Get featured image from Media ID.
	 *
	 * @param array  $object     Default Param.
	 * @param string $field_name Default Param.
	 * @param string $request    Default Param.
	 */
	function grigora_get_featured_image( $object, $field_name, $request ) {
		$default_sizes   = array( 'thumbnail', 'medium', 'medium_large', 'large' );
		$featured_images = array();

		if ( ! isset( $object['featured_media'] ) ) {
			return $featured_images;
		}

		foreach ( $default_sizes as $key => $size ) {
			$featured_images[ $size ] = wp_get_attachment_image_src(
				$object['featured_media'],
				$size,
				false
			);
		}

		return $featured_images;
	}
}

if ( ! function_exists( 'grigora_modify_rest_response' ) ) {
	/**
	 * Modify the default Rest API.
	 */
	function grigora_modify_rest_response() {
		$post_types = get_post_types(
			array(
				'public'       => true,
				'show_in_rest' => true,
			),
			'objects'
		);

		foreach ( $post_types as $key => $post_type ) {
			register_rest_field(
				$post_type->name,
				'featured_image',
				array(
					'get_callback'    => 'grigora_get_featured_image',
					'update_callback' => null,
					'schema'          => null,
				)
			);
		}
	}
}

add_filter( 'block_categories_all', 'grigora_kit_block_category_all', 10, 2 );
add_action( 'init', 'grigora_kit_block_init' );
add_action( 'rest_api_init', 'grigora_modify_rest_response' );
add_action( 'enqueue_block_editor_assets', 'grigora_enqueue_blocks_via_js' );

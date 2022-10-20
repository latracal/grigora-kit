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
		wp_register_style( 'grigora-kit-forms', GRIGORA_KIT_URL . 'assets/css/blocks/forms/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-form-email', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-email/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-form-text', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-text/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-form-textarea', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-textarea/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-form-checkbox', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-checkbox/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-form-select', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-select/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-form-radio', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-radio/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-form-hidden', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-hidden/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-form-submit', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-submit/style' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-form-date', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-date/style' . $ext, array(), $ver );

		// Register editor style for blocks.
		wp_register_style( 'grigora-kit-editor-button', GRIGORA_KIT_URL . 'assets/css/blocks/button/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-number-counter', GRIGORA_KIT_URL . 'assets/css/blocks/number-counter/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-countdown', GRIGORA_KIT_URL . 'assets/css/blocks/countdown/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-google-maps', GRIGORA_KIT_URL . 'assets/css/blocks/google-maps/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-icon', GRIGORA_KIT_URL . 'assets/css/blocks/icon/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-group', GRIGORA_KIT_URL . 'assets/css/blocks/group/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-text', GRIGORA_KIT_URL . 'assets/css/blocks/text/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-star-rating', GRIGORA_KIT_URL . 'assets/css/blocks/star-rating/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-scroll-to-top', GRIGORA_KIT_URL . 'assets/css/blocks/scroll-to-top/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-post-title', GRIGORA_KIT_URL . 'assets/css/blocks/post-title/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-post-excerpt', GRIGORA_KIT_URL . 'assets/css/blocks/post-excerpt/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-post-taxonomy', GRIGORA_KIT_URL . 'assets/css/blocks/post-taxonomy/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-post-author', GRIGORA_KIT_URL . 'assets/css/blocks/post-author/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-tabs', GRIGORA_KIT_URL . 'assets/css/blocks/tabs/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-post-grid-1', GRIGORA_KIT_URL . 'assets/css/blocks/post-grid-1/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-post-grid-2', GRIGORA_KIT_URL . 'assets/css/blocks/post-grid-2/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-post-grid-3', GRIGORA_KIT_URL . 'assets/css/blocks/post-grid-3/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-post-grid-4', GRIGORA_KIT_URL . 'assets/css/blocks/post-grid-4/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-post-grid-5', GRIGORA_KIT_URL . 'assets/css/blocks/post-grid-5/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-post-grid-6', GRIGORA_KIT_URL . 'assets/css/blocks/post-grid-6/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-forms', GRIGORA_KIT_URL . 'assets/css/blocks/forms/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-form-email', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-email/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-form-text', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-text/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-form-textarea', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-textarea/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-form-checkbox', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-checkbox/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-form-select', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-select/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-form-radio', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-radio/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-form-hidden', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-hidden/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-form-submit', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-submit/editor' . $ext, array(), $ver );
		wp_register_style( 'grigora-kit-editor-form-date', GRIGORA_KIT_URL . 'assets/css/blocks/forms/form-date/editor' . $ext, array(), $ver );

		// Register blocks.
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/button/block.json',
			array(
				'style'        => 'grigora-kit-button',
				'editor_style' => 'grigora-kit-editor-button',
				'supports'     => array(
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
				'style'        => 'grigora-kit-number-counter',
				'editor_style' => 'grigora-kit-editor-number-counter',
				'supports'     => array(
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
				'style'        => 'grigora-kit-countdown',
				'editor_style' => 'grigora-kit-editor-countdown',
				'supports'     => array(
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
				'style'        => 'grigora-kit-google-maps',
				'editor_style' => 'grigora-kit-editor-google-maps',
				'supports'     => array(
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
				'style'        => 'grigora-kit-icon',
				'editor_style' => 'grigora-kit-editor-icon',
				'supports'     => array(
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
				'style'        => 'grigora-kit-group',
				'editor_style' => 'grigora-kit-editor-group',
				'supports'     => array(
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
				'style'        => 'grigora-kit-text',
				'editor_style' => 'grigora-kit-editor-text',
				'supports'     => array(
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
				'style'        => 'grigora-kit-star-rating',
				'editor_style' => 'grigora-kit-editor-star-rating',
				'supports'     => array(
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
				'style'        => 'grigora-kit-scroll-to-top',
				'editor_style' => 'grigora-kit-editor-scroll-to-top',
				'supports'     => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/post-title/block.json',
			array(
				'style'           => 'grigora-kit-post-title',
				'editor_style'    => 'grigora-kit-editor-post-title',
				'render_callback' => 'render_block_grigora_kit_post_title',
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
				'style'           => 'grigora-kit-post-excerpt',
				'editor_style'    => 'grigora-kit-editor-post-excerpt',
				'render_callback' => 'render_block_grigora_kit_post_excerpt',
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
				'style'           => 'grigora-kit-post-taxonomy',
				'editor_style'    => 'grigora-kit-editor-post-taxonomy',
				'render_callback' => 'render_block_grigora_kit_post_taxonomy',
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
				'style'           => 'grigora-kit-post-author',
				'editor_style'    => 'grigora-kit-editor-post-author',
				'render_callback' => 'render_block_grigora_kit_post_author',
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
				'style'        => 'grigora-kit-tabs',
				'editor_style' => 'grigora-kit-editor-tabs',
				'supports'     => array(
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
				'style'           => 'grigora-kit-post-grid-1',
				'editor_style'    => 'grigora-kit-editor-post-grid-1',
				'render_callback' => 'render_block_grigora_kit_post_grid_1',
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
				'style'           => 'grigora-kit-post-grid-2',
				'editor_style'    => 'grigora-kit-editor-post-grid-2',
				'render_callback' => 'render_block_grigora_kit_post_grid_2',
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
				'style'           => 'grigora-kit-post-grid-3',
				'editor_style'    => 'grigora-kit-editor-post-grid-3',
				'render_callback' => 'render_block_grigora_kit_post_grid_3',
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
				'style'           => 'grigora-kit-post-grid-4',
				'editor_style'    => 'grigora-kit-editor-post-grid-4',
				'render_callback' => 'render_block_grigora_kit_post_grid_4',
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
				'style'           => 'grigora-kit-post-grid-5',
				'editor_style'    => 'grigora-kit-editor-post-grid-5',
				'render_callback' => 'render_block_grigora_kit_post_grid_5',
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
				'style'           => 'grigora-kit-post-grid-6',
				'editor_style'    => 'grigora-kit-editor-post-grid-6',
				'render_callback' => 'render_block_grigora_kit_post_grid_6',
				'supports'        => array(
					'grigoraMotion'     => true,
					'grigoraSticky'     => true,
					'grigoraResponsive' => true,
					'grigoraPosition'   => true,
				),
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/forms/form-email/block.json',
			array(
				'style'           => 'grigora-kit-form-email',
				'editor_style'    => 'grigora-kit-editor-form-email',
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/forms/form-text/block.json',
			array(
				'style'           => 'grigora-kit-form-text',
				'editor_style'    => 'grigora-kit-editor-form-text',
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/forms/form-textarea/block.json',
			array(
				'style'           => 'grigora-kit-form-textarea',
				'editor_style'    => 'grigora-kit-editor-form-textarea',
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/forms/form-checkbox/block.json',
			array(
				'style'           => 'grigora-kit-form-checkbox',
				'editor_style'    => 'grigora-kit-editor-form-checkbox',
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/forms/form-select/block.json',
			array(
				'style'           => 'grigora-kit-form-select',
				'editor_style'    => 'grigora-kit-editor-form-select',
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/forms/form-radio/block.json',
			array(
				'style'           => 'grigora-kit-form-radio',
				'editor_style'    => 'grigora-kit-editor-form-radio',
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/forms/form-hidden/block.json',
			array(
				'style'           => 'grigora-kit-form-hidden',
				'editor_style'    => 'grigora-kit-editor-form-hidden',
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/forms/form-submit/block.json',
			array(
				'style'           => 'grigora-kit-form-submit',
				'editor_style'    => 'grigora-kit-editor-form-submit',
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/forms/form-date/block.json',
			array(
				'style'           => 'grigora-kit-form-date',
				'editor_style'    => 'grigora-kit-editor-form-date',
			)
		);
		register_block_type(
			GRIGORA_KIT_PATH . '/build/blocks/forms/block.json',
			array(
				'style'           => 'grigora-kit-forms',
				'editor_style'    => 'grigora-kit-editor-forms',
				'render_callback' => 'render_block_grigora_kit_forms',
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

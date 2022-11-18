<?php
/**
 * Blocks Module.
 *
 * @package grigora-kit
 */

require_once grigora_kit_get_path( 'inc/wptt-webfont-loader.php' );
require_once grigora_kit_get_path( 'inc/blocks/class-grigora-kit-blocks.php' );
require_once grigora_kit_get_path( 'inc/blocks/block-supports.php' );

if ( ! function_exists( 'grigora_kit_blocks_editor_styles' ) ) {
	/**
	 * Grigora Blocks Editor CSS.
	 */
	function grigora_kit_blocks_editor_styles() {
		$ver       = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$extension = GRIGORA_KIT_DEBUG ? '.css' : '.min.css';
		$extjs     = GRIGORA_KIT_DEBUG ? '.js' : '.min.js';

		wp_enqueue_style( 'grigora-kit-blocks-editor-styles', GRIGORA_KIT_URL . 'assets/css/editor' . $extension, [], $ver );
		wp_enqueue_script( 'grigora-animation-on-scroll', GRIGORA_KIT_URL . 'assets/js/animate' . $extjs, [], $ver, false );
		wp_enqueue_script( 'grigora-category', GRIGORA_KIT_URL . 'assets/js/category-icon' . $extjs, [ 'wp-blocks', 'wp-element', 'wp-components' ], $ver, false );
		wp_enqueue_script( 'grigora-motion-animations', GRIGORA_KIT_URL . 'assets/js/motion-animations-editor' . $extjs, [], $ver, false );
		wp_localize_script(
			'grigora-motion-animations',
			'motion_animation_constants',
			array(
				'current_screen' => get_current_screen()->id,
			)
		);
	}
}

if ( ! function_exists( 'grigora_kit_common_styles' ) ) {
	/**
	 * Grigora Blocks Common CSS.
	 */
	function grigora_kit_common_styles() {
		$ver       = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$extension = GRIGORA_KIT_DEBUG ? '.css' : '.min.css';
		$extjs     = GRIGORA_KIT_DEBUG ? '.js' : '.min.js';

		wp_enqueue_style( 'grigora-kit-common-styles', GRIGORA_KIT_URL . 'assets/css/common' . $extension, [], $ver );
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
			'grigora_kit_blocks_params',
			array(
				'current_screen' => get_current_screen()->id,
				'svg_icon' => GRIGORA_KIT_URL . 'assets/images/logo.svg',
				'ajax_url' => admin_url( 'admin-ajax.php' ),
			)
		);

		// Editor CSS.
		$ver       = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$extension = GRIGORA_KIT_DEBUG ? '.css' : '.min.css';
		wp_enqueue_style( 'grigora-kit-blocks-editor', GRIGORA_KIT_URL . 'assets/css/blocks/editor' . $extension, [], $ver );
		wp_enqueue_style( 'grigora-kit-blocks-editor-style', GRIGORA_KIT_URL . 'assets/css/blocks/style' . $extension, [], $ver );
	}
}

add_action( 'enqueue_block_editor_assets', 'grigora_enqueue_blocks_via_js' );
add_action( 'enqueue_block_editor_assets', 'grigora_kit_blocks_editor_styles' );
add_action( 'wp_enqueue_scripts', 'grigora_kit_common_styles' );

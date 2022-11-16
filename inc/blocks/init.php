<?php
/**
 * Blocks Module.
 *
 * @package grigora-kit
 */

require_once grigora_kit_get_path( 'inc/blocks/register-blocks.php' );
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

add_action( 'enqueue_block_editor_assets', 'grigora_kit_blocks_editor_styles' );
add_action( 'wp_enqueue_scripts', 'grigora_kit_common_styles' );

require_once grigora_kit_get_path( 'inc/blocks/css-frontend.php' );

if ( ! function_exists( 'grigora_get_patterns_meta_data' ) ) {
	function grigora_get_patterns_meta_data() {
		$url = 'https://wpgrigora.com/wp-content/patterns-meta.json?version=' . time();
		$response = wp_remote_get(
			$url,
			array(
				'timeout'   => 60,
				'sslverify' => false,
			)
		);
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			wp_send_json_error(
				array()
			);
		}
		$response = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( $response ) {
			wp_send_json_success(
				$response
			);
		}
		else{
			wp_send_json_error(
				array()
			);
		}
	}
}

if ( ! function_exists( 'grigora_get_pattern_data' ) ) {
	function grigora_get_pattern_data() {

		$id = $_POST['id'];

		$url = 'https://wpgrigora.com/wp-json/grigora/v1/pattern/' . $id . '?version=' . time();
		$response = wp_remote_get(
			$url,
			array(
				'timeout'   => 60,
				'sslverify' => false,
			)
		);
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			wp_send_json_error(
				array('Invalid Response Code from Server.')
			);
		}
		$response = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( $response ) {
			wp_send_json_success(
				$response
			);
		}
		else{
			wp_send_json_error(
				array('Unable to parse body.')
			);
		}
	}
}

add_action( 'wp_ajax_grigora_get_patterns_meta_data', 'grigora_get_patterns_meta_data' );
add_action( 'wp_ajax_nopriv_grigora_get_patterns_meta_data', 'grigora_get_patterns_meta_data' );
add_action( 'wp_ajax_grigora_get_pattern_data', 'grigora_get_pattern_data' );
add_action( 'wp_ajax_nopriv_grigora_get_pattern_data', 'grigora_get_pattern_data' );
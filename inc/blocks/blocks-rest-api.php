<?php
/**
 * Modify Rest API.
 *
 * @package grigora-kit
 */


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

add_action( 'rest_api_init', 'grigora_modify_rest_response' );

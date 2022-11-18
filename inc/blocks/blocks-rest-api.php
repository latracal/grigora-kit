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

add_action( 'rest_api_init', 'grigora_modify_rest_response' );

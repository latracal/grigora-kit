<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // For security.
}


if ( ! function_exists( 'grigora_get_patterns_meta_data' ) ) {
	function grigora_get_patterns_meta_data() {
		$url      = 'https://wpgrigora.com/wp-content/patterns-meta.json?version=' . time();
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
		} else {
			wp_send_json_error(
				array()
			);
		}
	}
}

if ( ! function_exists( 'grigora_get_pattern_data' ) ) {
	function grigora_get_pattern_data() {

		$id = $_POST['id'];

		$url      = 'https://wpgrigora.com/wp-json/grigora/v1/pattern/' . $id . '?version=' . time();
		$response = wp_remote_get(
			$url,
			array(
				'timeout'   => 60,
				'sslverify' => false,
			)
		);
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			wp_send_json_error(
				array( 'Invalid Response Code from Server.' )
			);
		}
		$response = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( $response ) {
			wp_send_json_success(
				$response
			);
		} else {
			wp_send_json_error(
				array( 'Unable to parse body.' )
			);
		}
	}
}

add_action( 'wp_ajax_grigora_get_patterns_meta_data', 'grigora_get_patterns_meta_data' );
add_action( 'wp_ajax_nopriv_grigora_get_patterns_meta_data', 'grigora_get_patterns_meta_data' );
add_action( 'wp_ajax_grigora_get_pattern_data', 'grigora_get_pattern_data' );
add_action( 'wp_ajax_nopriv_grigora_get_pattern_data', 'grigora_get_pattern_data' );

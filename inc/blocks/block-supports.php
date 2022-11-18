<?php
/**
 * All Block Supports PHP Actions.
 *
 * @package grigora-kit
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // For security.
}

if ( ! function_exists( 'grigora_enqueue_motion_animations' ) ) {
	/**
	 * Motion Animations Dependencies Enqueue.
	 */
	function grigora_enqueue_motion_animations() {
		$ver       = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$extension = GRIGORA_KIT_DEBUG ? '.css' : '.min.css';
		$extjs     = GRIGORA_KIT_DEBUG ? '.js' : '.min.js';
		wp_enqueue_script( 'grigora-motion-animations', GRIGORA_KIT_URL . 'assets/js/motion-animations' . $extjs, [], $ver, false );
	}
}

if ( ! function_exists( 'grigora_enqueue_sticky' ) ) {
	/**
	 * Sticky Dependencies Enqueue.
	 */
	function grigora_enqueue_sticky() {
		$ver       = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$extension = GRIGORA_KIT_DEBUG ? '.css' : '.min.css';
		$extjs     = GRIGORA_KIT_DEBUG ? '.js' : '.min.js';
		wp_enqueue_script( 'grigora-sticky', GRIGORA_KIT_URL . 'assets/js/sticky' . $extjs, [], $ver, false );
	}
}

if ( ! function_exists( 'grigora_kit_block_supports_handle' ) ) {
	/**
	 * Block Support for All the Hooks.
	 *
	 * @param Block_Content $block_content Content of Block.
	 * @param Block         $block         Block Object.
	 */
	function grigora_kit_block_supports_handle( $block_content, $block ) {

		$block_type            = WP_Block_Type_Registry::get_instance()->get_registered( $block['blockName'] );
		$support_layout_ma     = block_has_support( $block_type, array( 'grigoraMotion' ), false );
		$support_layout_sticky = block_has_support( $block_type, array( 'grigoraSticky' ), false );

		if ( $support_layout_ma ) {
			if ( isset( $block['attrs']['motionanimation_mouse'] ) && $block['attrs']['motionanimation_mouse'] && isset( $block['attrs']['motionanimation_mouse_data'] ) && $block['attrs']['motionanimation_mouse_data'] ) {
				grigora_enqueue_motion_animations();
			} elseif ( isset( $block['attrs']['motionanimation_scroll'] ) && $block['attrs']['motionanimation_scroll'] && isset( $block['attrs']['motionanimation_scroll_data'] ) && $block['attrs']['motionanimation_scroll_data'] ) {
				grigora_enqueue_motion_animations();
			}
		}

		if ( $support_layout_sticky ) {
			if ( isset( $block['attrs']['sticky'] ) && 'none' !== $block['attrs']['sticky'] ) {
				grigora_enqueue_sticky();
			}
		}

		return $block_content;
	}
}

add_filter( 'render_block', 'grigora_kit_block_supports_handle', 10, 2 );

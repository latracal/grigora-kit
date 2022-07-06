<?php


function grigora_kit_block_category_all( $categories, $block_editor_context ) {
	return array_merge(
		array(
			array(
				'slug'  => 'grigora-kit',
				'title' => __( 'Grigora Kit', 'grigora-kit' ),
			),
		),
		$categories
	);
}

add_filter( 'block_categories_all', 'grigora_kit_block_category_all', 10, 2 );

/**
 * Register Grigora Kit Blocks.
 */
if(!function_exists("grigora_kit_block_init")){
	function grigora_kit_block_init() {
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/button' );

		// experimental blocks
		if( GRIGORA_KIT_DEBUG ){
			register_block_type( GRIGORA_KIT_PATH . '/build/blocks/number-counter' );
		}
	}
}

add_action( 'init', 'grigora_kit_block_init' );
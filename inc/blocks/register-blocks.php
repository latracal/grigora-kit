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
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/button/block.json' );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/number-counter/block.json' );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/icon/block.json' );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/group/block.json' );
		
		// experimental blocks
		if( GRIGORA_KIT_DEBUG ){
		}
	}
}

add_action( 'init', 'grigora_kit_block_init' );


function enqueue_grigora_blocks_via_js(){

	$assets_file = GENERATEBLOCKS_DIR . 'build/index.asset.php';
	$assets_file = file_exists( $assets_file ) ? require $assets_file : false;

	wp_enqueue_script(
		'grigora-kit-blocks',
		GRIGORA_KIT_URL . 'build/index.js',
		$assets_file['dependencies'],
		$assets_file['version'],
		true
	);
}

add_action( 'enqueue_block_editor_assets', 'enqueue_grigora_blocks_via_js' );
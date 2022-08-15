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

		$ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
        $ext = GRIGORA_KIT_DEBUG ? ".css" : ".min.css";

		// register style for blocks
		wp_register_style( "grigora-kit-button", GRIGORA_KIT_URL . "assets/css/blocks/button/style" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-number-counter", GRIGORA_KIT_URL . "assets/css/blocks/number-counter/style" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-icon", GRIGORA_KIT_URL . "assets/css/blocks/icon/style" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-group", GRIGORA_KIT_URL . "assets/css/blocks/group/style" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-text", GRIGORA_KIT_URL . "assets/css/blocks/text/style" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-star-rating", GRIGORA_KIT_URL . "assets/css/blocks/star-rating/style" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-deep", GRIGORA_KIT_URL . "assets/css/blocks/deep/style" . $ext, array(), $ver);

		// register editor style for blocks
		wp_register_style( "grigora-kit-editor-button", GRIGORA_KIT_URL . "assets/css/blocks/button/editor" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-editor-number-counter", GRIGORA_KIT_URL . "assets/css/blocks/number-counter/editor" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-editor-icon", GRIGORA_KIT_URL . "assets/css/blocks/icon/editor" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-editor-group", GRIGORA_KIT_URL . "assets/css/blocks/group/editor" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-editor-text", GRIGORA_KIT_URL . "assets/css/blocks/text/editor" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-editor-star-rating", GRIGORA_KIT_URL . "assets/css/blocks/star-rating/editor" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-editor-deep", GRIGORA_KIT_URL . "assets/css/blocks/deep/editor" . $ext, array(), $ver);

		// register blocks
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/button/block.json', array(
			'style'         => 'grigora-kit-button',
			'editor_style'  =>  'grigora-kit-editor-button',
		) );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/number-counter/block.json', array(
			'style'         => 'grigora-kit-number-counter',
			'editor_style'  =>  'grigora-kit-editor-number-counter',
		) );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/countdown/block.json', array(
			'style'         => 'grigora-kit-countdown',
			'editor_style'  =>  'grigora-kit-editor-countdown',
		) );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/icon/block.json', array(
			'style'         => 'grigora-kit-icon',
			'editor_style'  =>  'grigora-kit-editor-icon',
		) );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/group/block.json', array(
			'style'         => 'grigora-kit-group',
			'editor_style'  =>  'grigora-kit-editor-group',
		) );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/text/block.json', array(
			'style'         => 'grigora-kit-text',
			'editor_style'  =>  'grigora-kit-editor-text',
		) );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/star-rating/block.json', array(
			'style'         => 'grigora-kit-star-rating',
			'editor_style'  =>  'grigora-kit-editor-star-rating',
		) );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/deep/block.json', array(
			'style'         => 'grigora-kit-deep',
			'editor_style'  =>  'grigora-kit-editor-deep',
		) );
		
		// experimental blocks
		if( GRIGORA_KIT_DEBUG ){
		}
	}
}

add_action( 'init', 'grigora_kit_block_init' );

if(!function_exists("grigora_enqueue_blocks_via_js")){
	function grigora_enqueue_blocks_via_js(){
	
		$assets_file = GRIGORA_KIT_PATH . 'build/index.asset.php';
		$assets_file = file_exists( $assets_file ) ? require $assets_file : false;
	
		wp_enqueue_script(
			'grigora-kit-blocks',
			GRIGORA_KIT_URL . 'build/index.js',
			$assets_file['dependencies'],
			$assets_file['version'],
			true
		);
	}
}

add_action( 'enqueue_block_editor_assets', 'grigora_enqueue_blocks_via_js' );
<?php



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
<?php

require_once grigora_kit_get_path( 'inc/blocks/register-blocks.php' );
require_once grigora_kit_get_path( 'inc/blocks/block-supports.php' );

/**
 * Grigora Blocks Editor CSS.
 */
if(!function_exists("grigora_kit_blocks_editor_styles")){
    function grigora_kit_blocks_editor_styles() {
        $ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
        $extension = GRIGORA_KIT_DEBUG ? ".css" : ".min.css";
        $extjs = GRIGORA_KIT_DEBUG ? ".js" : ".min.js";

        wp_enqueue_style('grigora-kit-blocks-editor-styles', GRIGORA_KIT_URL . "assets/css/editor" . $extension, [], $ver );
        wp_enqueue_script( 'grigora-animation-on-scroll', GRIGORA_KIT_URL . "assets/js/animate" . $extjs , [], $ver );
        wp_enqueue_script( 'grigora-category', GRIGORA_KIT_URL . "assets/js/category-icon" . $extjs , ['wp-blocks', 'wp-element', 'wp-components'], $ver );
        // wp_enqueue_script( 'grigora-motion-animations', GRIGORA_KIT_URL . "assets/js/motion-animations-editor" . $extjs , [], $ver );
    }
}

add_action( 'enqueue_block_editor_assets', 'grigora_kit_blocks_editor_styles' );

require_once grigora_kit_get_path( 'inc/blocks/css-frontend.php' );
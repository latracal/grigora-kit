<?php

require_once grigora_kit_get_path( 'inc/blocks/register-blocks.php' );

/**
 * Main CSS File for Grigora Blocks.
 */
if(!function_exists("grigora_kit_blocks_main_assets")){
    function grigora_kit_blocks_main_assets() {
        $ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
        $extension = GRIGORA_KIT_DEBUG ? ".css" : ".min.css";
        wp_enqueue_style( 'grigora-kit-blocks', GRIGORA_KIT_URL . "assets/css/main" . $extension, [], $ver );
    }
}

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
        wp_enqueue_script( 'grigora-category', GRIGORA_KIT_URL . "assets/js/category-icon" . $extjs , [], $ver );
    }
}

add_action( 'enqueue_block_editor_assets', 'grigora_kit_blocks_editor_styles' );
add_action( 'wp_enqueue_scripts', 'grigora_kit_blocks_main_assets' );

require_once grigora_kit_get_path( 'inc/blocks/css-frontend.php' );
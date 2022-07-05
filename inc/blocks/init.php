<?php

require_once grigora_kit_get_path( 'inc/blocks/register-blocks.php' );

if(!function_exists("grigora_kit_blocks_main_assets")){
    function grigora_kit_blocks_main_assets() {
        $ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
        $extension = GRIGORA_KIT_DEBUG ? ".css" : ".min.css";
        wp_enqueue_style( 'grigora-kit-blocks', GRIGORA_KIT_URL . "assets/css/main" . $extension, [], $ver );
    }
}

if(!function_exists("grigora_kit_blocks_editor_styles")){
    function grigora_kit_blocks_editor_styles() {
        $ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
        $extension = GRIGORA_KIT_DEBUG ? ".css" : ".min.css";
        wp_enqueue_style('grigora-kit-blocks-editor-styles', GRIGORA_KIT_URL . "assets/css/editor" . $extension, [], $ver );
        wp_enqueue_script( 'grigora-animation-on-scroll', GRIGORA_KIT_URL . "js/animate.js" , [], $ver );
    }
}

add_action( 'enqueue_block_editor_assets', 'grigora_kit_blocks_editor_styles' );
add_action( 'wp_enqueue_scripts', 'grigora_kit_blocks_main_assets' );

require_once grigora_kit_get_path( 'inc/blocks/css-frontend.php' );
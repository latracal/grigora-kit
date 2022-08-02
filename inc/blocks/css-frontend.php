<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // For security
}

require_once grigora_kit_get_path( 'inc/wptt-webfont-loader.php' );

require_once grigora_kit_get_path( 'inc/blocks/generate-css/button.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/icon.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/number-counter.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/group.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/text.php' );


/**
 * Animations Dependencies Enqueue.
 */
if(!function_exists("ga_enqueue_animations")){
    function ga_enqueue_animations( $entrance = false ){
        $ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
        $extension = GRIGORA_KIT_DEBUG ? ".css" : ".min.css";
        $extjs = GRIGORA_KIT_DEBUG ? ".js" : ".min.js";
        wp_enqueue_style( 'grigora-animations', GRIGORA_KIT_URL . "assets/css/animations" . $extension, [], $ver );
        wp_add_inline_style( 'grigora-animations', '.has-entrance-animation{ visibility: hidden; animation-name: none !important; }' );
        if( $entrance ){
            wp_enqueue_script( 'grigora-animations', GRIGORA_KIT_URL . "assets/js/animate" . $extjs , [], $ver );
        }
    }
}

/**
 * Number Control JS Dependencies Enqueue.
 */
if(!function_exists("ga_enqueue_number_control")){
    function ga_enqueue_number_control(){
        $ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
        $extjs = GRIGORA_KIT_DEBUG ? ".js" : ".min.js";
        wp_enqueue_script( 'grigora-countup', GRIGORA_KIT_URL . "assets/js/number-counter" . $extjs , [], $ver );
    }
}

/**
 * Render Inline CSS to Specific Style ID.
 */
if(!function_exists("grigora_render_inline_styles")){
    function grigora_render_inline_styles($style_id, $style){
        if ( ! is_admin() ) {
            if(wp_script_is($style_id)){
                wp_add_inline_style( $style_id, $style );
            }
            else{
                wp_register_style( $style_id, false );
                wp_enqueue_style( $style_id );
                wp_add_inline_style( $style_id, $style );
            }
        }
    }
}

$grigora_kit_gfonts = array();

/**
 * Add Font to global array.
 */
if(!function_exists("ga_enqueue_gfont")){
    function ga_enqueue_gfont($gfont){
        global $grigora_kit_gfonts;
        if( !in_array($gfont, $grigora_kit_gfonts) ){
            array_push($grigora_kit_gfonts, $gfont);
        }
    }
}

/**
 * Handle Button CSS.
 */
if(!function_exists("grigora_button_css")){
    function grigora_button_css($block){
        if( isset( $block['attrs'] ) ){
            if( isset( $block['attrs']['id'] ) ){
                $css = "";
                $css_part = ga_generate_css_button( $block['attrs'] );
                if( $css_part ){
                    $css = $css . $css_part;             
                }
                if( isset( $block['attrs']['typoFontFamily']) && $block['attrs']['typoFontFamily'] ){
                    ga_enqueue_gfont($block['attrs']['typoFontFamily']);
                }
                if( isset( $block['attrs']['entranceAnimation']) && $block['attrs']['entranceAnimation'] !== 'none' ){
                    ga_enqueue_animations( true );
                }
                if( isset( $block['attrs']['effectHAnimation']) && $block['attrs']['effectHAnimation'] !== 'none' ){
                    ga_enqueue_animations( false );
                }
                if($css){
                    grigora_render_inline_styles("grigora-kit-button", $css);
                }
            }
        }
    }
}

/**
 * Handle Group CSS.
 */
if(!function_exists("grigora_group_css")){
    function grigora_group_css($block){
        if( isset( $block['attrs'] ) ){
            if( isset( $block['attrs']['id'] ) ){
                $css = "";
                $css_part = ga_generate_css_group( $block['attrs'] );
                if( $css_part ){
                    $css = $css . $css_part;             
                }
                if( isset( $block['attrs']['entranceAnimation']) && $block['attrs']['entranceAnimation'] !== 'none' ){
                    ga_enqueue_animations( true );
                }
                if( isset( $block['attrs']['effectHAnimation']) && $block['attrs']['effectHAnimation'] !== 'none' ){
                    ga_enqueue_animations( false );
                }
                if($css){
                    grigora_render_inline_styles("grigora-kit-group", $css);
                }
            }
        }
    }
}

/**
 * Handle Icon Block CSS.
 */
if(!function_exists("grigora_icon_css")){
    function grigora_icon_css($block){
        if( isset( $block['attrs'] ) ){
            if( isset( $block['attrs']['id'] ) ){
                $css = "";
                $css_part = ga_generate_css_icon( $block['attrs'] );
                if( $css_part ){
                    $css = $css . $css_part;             
                }
                if($css){
                    grigora_render_inline_styles("grigora-kit-icon", $css);
                }
            }
        }
    }
}

/**
 * Handle Number Counter Block CSS.
 */
if(!function_exists("grigora_number_counter_css")){
    function grigora_number_counter_css($block){
        if( isset( $block['attrs'] ) ){
            if( isset( $block['attrs']['id'] ) ){
                ga_enqueue_number_control();
                $css = "";
                $css_part = ga_generate_css_number_counter( $block['attrs'] );
                if( $css_part ){
                    $css = $css . $css_part;             
                }
                if($css){
                    grigora_render_inline_styles("grigora-kit-number-counter", $css);
                }
            }
        }
    }
}

/**
 * Handle Text CSS.
 */
if(!function_exists("grigora_text_css")){
    function grigora_text_css($block){
        if( isset( $block['attrs'] ) ){
            if( isset( $block['attrs']['id'] ) ){
                $css = "";
                $css_part = ga_generate_css_text( $block['attrs'] );
                if( $css_part ){
                    $css = $css . $css_part;             
                }
                if( isset( $block['attrs']['typoFontFamily']) && $block['attrs']['typoFontFamily'] ){
                    ga_enqueue_gfont($block['attrs']['typoFontFamily']);
                }
                if( isset( $block['attrs']['entranceAnimation']) && $block['attrs']['entranceAnimation'] !== 'none' ){
                    ga_enqueue_animations( true );
                }
                if($css){
                    grigora_render_inline_styles("grigora-kit-text", $css);
                }
            }
        }
    }
}

/**
 * Generate inline CSS conditionally on block render trigger.
 */
if(!function_exists("grigora_conditional_block_assets")){
    function grigora_conditional_block_assets( $block_content, $block ) {
        if ( $block['blockName'] === 'grigora-kit/button' ) {
            grigora_button_css($block);
        }
        else if( $block['blockName'] === 'grigora-kit/icon' ){
            grigora_icon_css($block);
        }
        else if( $block['blockName'] === 'grigora-kit/number-counter' ){
            grigora_number_counter_css($block);
        }
        else if( $block['blockName'] === 'grigora-kit/group' ){
            grigora_group_css($block);
        }
        else if( $block['blockName'] === 'grigora-kit/text' ){
            grigora_text_css($block);
        }
        return $block_content;
    
    }
}

/**
 * Enqueue Google Fonts if present.
 */
if(!function_exists("grigora_kit_enqueue_gfonts")){
    function grigora_kit_enqueue_gfonts() {
        global $grigora_kit_gfonts;

        if($grigora_kit_gfonts){
            $ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
            $font_request = 'https://fonts.googleapis.com/css?family=';
            foreach ($grigora_kit_gfonts as $gfont) {
                $font_request = $font_request . $gfont . '|';
            }
            $font_request = $font_request.'&display=fallback';
            wp_enqueue_style(
                'grigora-kit-webfonts',
                wptt_get_webfont_url( esc_url_raw( $font_request) ),
                array(),
                $ver
            );
        }
    }
}

add_filter( 'render_block', 'grigora_conditional_block_assets', 10, 2 );
add_action( 'wp_enqueue_scripts', 'grigora_kit_enqueue_gfonts' );
<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // For security
}

require_once grigora_kit_get_path( 'inc/blocks/generate-css/button.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/icon.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/number-counter.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/group.php' );


/**
 * Animations Dependencies Enqueue.
 */
if(!function_exists("ga_enqueue_animations")){
    function ga_enqueue_animations( $entrance = false ){
        $ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
        $extension = GRIGORA_KIT_DEBUG ? ".css" : ".min.css";
        wp_enqueue_style( 'grigora-animations', GRIGORA_KIT_URL . "assets/css/animations" . $extension, [], $ver );
        if( $entrance ){
            wp_enqueue_script( 'grigora-animations', GRIGORA_KIT_URL . "js/animate.js" , [], $ver );
        }
    }
}

/**
 * Number Control JS Dependencies Enqueue.
 */
if(!function_exists("ga_enqueue_number_control")){
    function ga_enqueue_number_control(){
        $ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
        wp_enqueue_script( 'grigora-countup', GRIGORA_KIT_URL . "js/number-counter.js" , [], $ver );
    }
}

/**
 * Render Inline CSS to Specific Style ID.
 */
if(!function_exists("grigora_render_inline_styles")){
    function grigora_render_inline_styles($style_id, $style){
        if ( ! is_admin() ) {
            wp_register_style( $style_id, false );
            wp_enqueue_style( $style_id );
            wp_add_inline_style( $style_id, $style );
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
                if( isset( $block['attrs']['entranceAnimation']) && $block['attrs']['entranceAnimation'] !== 'none' ){
                    ga_enqueue_animations( true );
                }
                if( isset( $block['attrs']['effectHAnimation']) && $block['attrs']['effectHAnimation'] !== 'none' ){
                    ga_enqueue_animations( false );
                }
                if($css){
                    grigora_render_inline_styles("grigora-button-" . $block['attrs']['id'], $css);
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
                    grigora_render_inline_styles("grigora-group-" . $block['attrs']['id'], $css);
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
                    grigora_render_inline_styles("grigora-icon-" . $block['attrs']['id'], $css);
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
                    grigora_render_inline_styles("grigora-number_counter-" . $block['attrs']['id'], $css);
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
        return $block_content;
    
    }
}

add_filter( 'render_block', 'grigora_conditional_block_assets', 10, 2 );

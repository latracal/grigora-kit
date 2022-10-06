<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // For security
}

require_once grigora_kit_get_path( 'inc/wptt-webfont-loader.php' );

require_once grigora_kit_get_path( 'inc/blocks/generate-css/button.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/icon.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/number-counter.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/countdown.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/group.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/text.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/star-rating.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/scroll-to-top.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/post-title.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/post-excerpt.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/post-taxonomy.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/post-author.php' );
require_once grigora_kit_get_path( 'inc/blocks/generate-css/notice.php' );


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



if(!function_exists("ga_enqueue_countdown_control")){
    function ga_enqueue_countdown_control(){
        $ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
        $extjs = GRIGORA_KIT_DEBUG ? ".js" : ".min.js";
        wp_enqueue_script( 'grigora-countdown', GRIGORA_KIT_URL . "assets/js/countdown" . $extjs , [], $ver );
    }
}


/**
 * Scroll to Top Control JS Dependencies Enqueue.
 */
if(!function_exists("ga_enqueue_scroll_to_top_control")){
    function ga_enqueue_scroll_to_top_control(){
        $ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
        $extjs = GRIGORA_KIT_DEBUG ? ".js" : ".min.js";
        wp_enqueue_script( 'grigora-countup', GRIGORA_KIT_URL . "assets/js/scroll-to-top" . $extjs , [], $ver, true );
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
 * Handle Countdown Block CSS.
 */
if(!function_exists("grigora_countdown_css")){
    function grigora_countdown_css($block){
        if( isset( $block['attrs'] ) ){
            if( isset( $block['attrs']['id'] ) ){
                ga_enqueue_countdown_control();
                $css = ga_generate_css_countdown( $block['attrs'] );
                if($css){
                    grigora_render_inline_styles("grigora-kit-countdown", $css);
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
 * Handle Star Rating CSS.
 */
if(!function_exists("grigora_star_rating_css")){
    function grigora_star_rating_css($block){
        if( isset( $block['attrs'] ) ){
            if( isset( $block['attrs']['id'] ) ){
                if( isset( $block['attrs']['entranceAnimation']) && $block['attrs']['entranceAnimation'] !== 'none' ){
                    ga_enqueue_animations( true );
                }
                $css = ga_generate_css_star_rating( $block['attrs'] );
                if($css){
                    grigora_render_inline_styles("grigora-kit-star-rating", $css);
                }
            }
        }
    }
}

/**
 * Handle Scroll To Top CSS.
 */
if(!function_exists("grigora_scroll_to_top_css")){
    function grigora_scroll_to_top_css($block){
        if( isset( $block['attrs'] ) ){
            if( isset( $block['attrs']['id'] ) ){
                ga_enqueue_scroll_to_top_control();
                $css = "";
                $css_part = ga_generate_css_scroll_to_top( $block['attrs'] );
                if( $css_part ){
                    $css = $css . $css_part;             
                }
                if($css){
                    grigora_render_inline_styles("grigora-kit-scroll-to-top", $css);
                }
            }
        }
    }
}

/**
 * Handle Post Title CSS.
 */
if(!function_exists("grigora_post_title_css")){
    function grigora_post_title_css($block){
        if( isset( $block['attrs'] ) ){
            if( isset( $block['attrs']['id'] ) ){
                $css = "";
                $css_part = ga_generate_css_post_title( $block['attrs'] );
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
                    grigora_render_inline_styles("grigora-kit-post-title", $css);
                }
            }
        }
    }
}

/**
 * Handle Post Excerpt CSS.
 */
if(!function_exists("grigora_post_excerpt_css")){
    function grigora_post_excerpt_css($block){
        if( isset( $block['attrs'] ) ){
            if( isset( $block['attrs']['id'] ) ){
                $css = "";
                $css_part = ga_generate_css_post_excerpt( $block['attrs'] );
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
                    grigora_render_inline_styles("grigora-kit-post-excerpt", $css);
                }
            }
        }
    }
}

/**
 * Handle Post Taxonomy CSS.
 */
if(!function_exists("grigora_post_taxonomy_css")){
    function grigora_post_taxonomy_css($block){
        if( isset( $block['attrs'] ) ){
            if( isset( $block['attrs']['id'] ) ){
                $css = "";
                $css_part = ga_generate_css_post_taxonomy( $block['attrs'] );
                if( $css_part ){
                    $css = $css . $css_part;             
                }
                if( isset( $block['attrs']['typoFontFamily']) && $block['attrs']['typoFontFamily'] ){
                    ga_enqueue_gfont($block['attrs']['typoFontFamily']);
                }
                if( isset( $block['attrs']['typoLFontFamily']) && $block['attrs']['typoLFontFamily'] ){
                    ga_enqueue_gfont($block['attrs']['typoLFontFamily']);
                }
                if( isset( $block['attrs']['entranceAnimation']) && $block['attrs']['entranceAnimation'] !== 'none' ){
                    ga_enqueue_animations( true );
                }
                if($css){
                    grigora_render_inline_styles("grigora-kit-post-taxonomy", $css);
                }
            }
        }
    }
}

/**
 * Handle Post Author CSS.
 */
if(!function_exists("grigora_post_author_css")){
    function grigora_post_author_css($block){
        if( isset( $block['attrs'] ) ){
            if( isset( $block['attrs']['id'] ) ){
                $css = "";
                $css_part = ga_generate_css_post_author( $block['attrs'] );
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
                    grigora_render_inline_styles("grigora-kit-post-author", $css);
                }
            }
        }
    }
}

/**
 * Handle Notice CSS.
 */
if(!function_exists("grigora_notice_css")){
    function grigora_notice_css($block){
        if( isset( $block['attrs'] ) ){
            if( isset( $block['attrs']['id'] ) ){
                $css = "";
                $css_part = ga_generate_css_notice( $block['attrs'] );
                if( $css_part ){
                    $css = $css . $css_part;             
                }
                if( isset( $block['attrs']['titleTypoFontFamily']) && $block['attrs']['titleTypoFontFamily'] ){
                    ga_enqueue_gfont($block['attrs']['titleTypoFontFamily']);
                }
                if( isset( $block['attrs']['contentTypoFontFamily']) && $block['attrs']['contentTypoFontFamily'] ){
                    ga_enqueue_gfont($block['attrs']['contentTypoFontFamily']);
                }
                if( isset( $block['attrs']['entranceAnimation']) && $block['attrs']['entranceAnimation'] !== 'none' ){
                    ga_enqueue_animations( true );
                }
                if($css){
                    grigora_render_inline_styles("grigora-kit-notice", $css);
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
        else if( $block['blockName'] === 'grigora-kit/countdown' ){
            grigora_countdown_css($block);
        }
        else if( $block['blockName'] === 'grigora-kit/group' ){
            grigora_group_css($block);
        }
        else if( $block['blockName'] === 'grigora-kit/text' ){
            grigora_text_css($block);
        }
        else if( $block['blockName'] === 'grigora-kit/star-rating' ){
            grigora_star_rating_css($block);
        }
        else if( $block['blockName'] === 'grigora-kit/scroll-to-top' ){
            grigora_scroll_to_top_css($block);
        }
        else if( $block['blockName'] === 'grigora-kit/post-title' ){
            grigora_post_title_css($block);
        }
        else if( $block['blockName'] === 'grigora-kit/post-excerpt' ){
            grigora_post_title_css($block);
        }
        else if( $block['blockName'] === 'grigora-kit/post-taxonomy' ){
            grigora_post_taxonomy_css($block);
        }
        else if( $block['blockName'] === 'grigora-kit/post-author' ){
            grigora_post_author_css($block);
        }
        else if( $block['blockName'] === 'grigora-kit/notice' ){
            grigora_notice_css($block);
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
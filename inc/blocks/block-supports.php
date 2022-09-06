<?php

/**
 * Motion Animations Dependencies Enqueue.
 */
if(!function_exists("grigora_enqueue_motion_animations")){
    function grigora_enqueue_motion_animations(){
        $ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
        $extension = GRIGORA_KIT_DEBUG ? ".css" : ".min.css";
        $extjs = GRIGORA_KIT_DEBUG ? ".js" : ".min.js";
        wp_enqueue_script( 'grigora-motion-animations', GRIGORA_KIT_URL . "assets/js/motion-animations" . $extjs , [], $ver );
    }
}

/**
 * Block Support for Motion Animation
 */
if(!function_exists("grigora_motion_animation_support")){
    function grigora_motion_animation_support( $block_content, $block ) {

        $block_type     = WP_Block_Type_Registry::get_instance()->get_registered( $block['blockName'] );
        $support_layout = block_has_support( $block_type, array( 'grigoraMotion' ), false );
    
        if ( ! $support_layout ) {
            return $block_content;
        }

        if( isset($block['attrs']['motionanimation_mouse']) && $block['attrs']['motionanimation_mouse'] && isset($block['attrs']['motionanimation_mouse_data']) && $block['attrs']['motionanimation_mouse_data'] ){
            grigora_enqueue_motion_animations();
        }
        else if( isset($block['attrs']['motionanimation_scroll']) && $block['attrs']['motionanimation_scroll'] && isset($block['attrs']['motionanimation_scroll_data']) && $block['attrs']['motionanimation_scroll_data'] ){
            grigora_enqueue_motion_animations();
        }

        return $block_content;
    
    }
}

add_filter( 'render_block', 'grigora_motion_animation_support', 10, 2 );

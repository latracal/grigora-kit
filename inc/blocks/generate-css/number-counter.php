<?php


/**
 * Return a complete css for specific number counter block.
 */
if(!function_exists("ga_generate_css_number_counter")){
    function ga_generate_css_number_counter( $attributes ){
        if( isset($attributes['id']) ){

            $css = ".block-id-".$attributes['id'] . "{";

            $css = $css . "}";

            return $css;
        }
        return "";
    }
}
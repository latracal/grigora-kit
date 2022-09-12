<?php


if(!function_exists("ga_generate_css_google_maps")){
    function ga_generate_css_google_maps( $attributes ){
        
        if( isset($attributes['id']) ){
            $css = "";
            $css = ".block-id-".$attributes['id'] . " {";
            if( isset($attributes['align']) && $attributes['align']){
                $css = $css . sprintf("align-items: %s;", $attributes['align']);
            }
            if( isset($attributes['layoutPadding']) ){
                if( isset($attributes['layoutPadding']['left']) && $attributes['layoutPadding']['left'] ){
                    $css = $css . sprintf("padding-left: %s;", $attributes['layoutPadding']['left']);
                }
                if( isset($attributes['layoutPadding']['right']) && $attributes['layoutPadding']['right'] ){
                    $css = $css . sprintf("padding-right: %s;", $attributes['layoutPadding']['right']);
                }
                if( isset($attributes['layoutPadding']['top']) && $attributes['layoutPadding']['top'] ){
                    $css = $css . sprintf("padding-top: %s;", $attributes['layoutPadding']['top']);
                }
                if( isset($attributes['layoutPadding']['bottom']) && $attributes['layoutPadding']['bottom'] ){
                    $css = $css . sprintf("padding-bottom: %s;", $attributes['layoutPadding']['bottom']);
                }
            }
            if( isset($attributes['layoutMargin']) ){
                if( isset($attributes['layoutMargin']['left']) && $attributes['layoutMargin']['left'] ){
                    $css = $css . sprintf("margin-left: %s;", $attributes['layoutMargin']['left']);
                }
                if( isset($attributes['layoutMargin']['right']) && $attributes['layoutMargin']['right'] ){
                    $css = $css . sprintf("margin-right: %s;", $attributes['layoutMargin']['right']);
                }
                if( isset($attributes['layoutMargin']['top']) && $attributes['layoutMargin']['top'] ){
                    $css = $css . sprintf("margin-top: %s;", $attributes['layoutMargin']['top']);
                }
                if( isset($attributes['layoutMargin']['bottom']) && $attributes['layoutMargin']['bottom'] ){
                    $css = $css . sprintf("margin-bottom: %s;", $attributes['layoutMargin']['bottom']);
                }
            }

            $css = $css . "}";

            $css = $css . ".block-id-".$attributes['id'] . ".animateOnce {";
                if( isset($attributes['entranceAnimation']) && $attributes['entranceAnimation'] != 'none' ){
                    $css = $css . sprintf("animation: %s %s;", $attributes['entranceAnimation'], (isset($attributes["entranceAnimationTime"]) && $attributes["entranceAnimationTime"]) ? $attributes["entranceAnimationTime"] . "s" : "1s" );
                }
            $css = $css . "}";
            return $css;
        }
        return "";
    }
    
}


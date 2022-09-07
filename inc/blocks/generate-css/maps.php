<?php


if(!function_exists("ga_generate_css_maps")){
    function ga_generate_css_maps( $attributes ){
        // $css = ""
        // if( isset($attributes['id']) ){
        //     echo "<script>console.log('". $attributes['id'] ."')</script>";
        //     $css = ".block-id-".$attributes['id'] . " {";
        //     $css = $css . "display: flex;";
        //     if( isset($attributes['align'])){
        //         $css = $css . sprintf("justify-content: %s;", $attributes['align']);
        //     }
        //     if($attributes['layoutPadding']){
        //         $css = $css . sprintf("padding-left: %s;", $attributes['layoutPadding']['left']);
        //         $css = $css . sprintf("padding-right: %s;", $attributes['layoutPadding']['right']);
        //         $css = $css . sprintf("padding-top: %s;", $attributes['layoutPadding']['top']);
        //         $css = $css . sprintf("padding-bottom: %s;", $attributes['layoutPadding']['bottom']);
        //     }

        //     if($attributes['layoutMargin']){
        //         $css = $css . sprintf("margin-left: %s;", $attributes['layoutMargin']['left']);
        //         $css = $css . sprintf("margin-right: %s;", $attributes['layoutMargin']['right']);
        //         $css = $css . sprintf("margin-top: %s;", $attributes['layoutMargin']['top']);
        //         $css = $css . sprintf("margin-bottom: %s;", $attributes['layoutMargin']['bottom']);
        //     }

        //     if($attributes['height']){
        //         $css = $css . sprintf("height: %s;", $attributes['height']);
        //     }

        //     if($attributes['maxWidth']){
        //         $css = $css . sprintf("max-width: %s;", $attributes['maxWidth']);
        //     }

        //     $css = $css . "}";

        //     if( isset($attributes['entranceAnimation'] && isset($attributes['entranceAnimationTime'])))
        //     {
        //         $css = $css . ".block-id-".$attributes['id'] . ".animateOnce {";
        //         $css = $css . sprintf("animation: %s %s;", $attributes['entranceAnimation'], $attributes['entranceAnimationTime']);
        //         $css = $css . "}";
        //     }
        // }
        // return $css;
    }
    return "";
}


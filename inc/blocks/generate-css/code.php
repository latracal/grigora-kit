<?php

if ( ! function_exists( 'ga_generate_css_code' ) ) {
    
    function ga_generate_css_code( $attributes ) {
        if ( isset( $attributes['id'] ) ) {
            $css = '.block-id-' . $attributes['id'] . ' .code-block-container{';
            if ( isset( $attributes['fontSize'] ) ) {
                $css = $css . 'font-size:' . $attributes['fontSize'] . 'px;';
            }
            if( isset( $attributes['wrapCode'] ) ) {
                $css = $css . 'overflow-x:' . $attributes['wrapCode'] ? 'hidden;' : 'auto;' ;
            }
            if ( isset( $attributes['containerMaxHeight'] ) ) {
                $css = $css . 'max-height:' . $attributes['containerMaxHeight'] . ';';
            }
            if ( isset( $attributes['containerWidth'] ) ) {
                $css = $css . 'width:' . $attributes['containerWidth'] . ';';
            }
            $css = $css . '}';

            $css = $css . '.block-id-' . $attributes['id'] . ' .code-block-container .code-block{';
            if ( isset( $attributes['wrapCode'] ) ) {
                $css = $css . 'overflow-wrap:' . $attributes['wrapCode'] ? 'break-word;' : 'normal;';
            }
            $css = $css . '}';
            // echo sprintf("<script>console.log( `%s` );</script>", $css);
            return $css;
        }

        else {
            return "";
        }
    }
}

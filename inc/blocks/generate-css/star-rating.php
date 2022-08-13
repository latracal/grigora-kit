<?php

/**
 * Generate Group CSS for Star Rating.
 */
if(!function_exists("ga_generate_css_star_rating")){
    function ga_generate_css_star_rating( $attributes ){
        $css = ".block-id-".$attributes['id'] . "{";
        if( isset($attributes['align']) && $attributes['align'] ){
                $css = $css . sprintf( "justify-content: %s;", $attributes['align'] );
        }
        $css = $css . sprintf("transition: %ss;", isset($attributes['transitionTime']) ? $attributes['transitionTime'] : 1);
        if( isset($attributes['iconSpacing']) && $attributes['iconSpacing'] ){
            $css = $css . sprintf( "gap: %spx;", $attributes['iconSpacing'] );
        }
        $css = $css . "}";
        $css = $css . ".block-id-".$attributes['id'] . " svg{";
        if( isset($attributes['iconSize']) && $attributes['iconSize'] ){
            $css = $css . sprintf( "height: %spx; width: %spx;", $attributes['iconSize'], $attributes['iconSize'] );
        }
        if( isset($attributes['iconInactiveColor']) && $attributes['iconInactiveColor'] ){
            $css = $css . sprintf( "color: %s;", $attributes['iconInactiveColor'] );
        }
        $css = $css . sprintf("transform: rotateX(%s) rotateY(%s) rotateZ(%s) skewX(%s) skewY(%s) translateX(%s) translateY(%s) scale(%s);",
            (isset($attributes['effectNRotateX']) && $attributes['effectNRotateX']) ? $attributes['effectNRotateX'] : '0deg',
            (isset($attributes['effectNRotateY']) && $attributes['effectNRotateY']) ? $attributes['effectNRotateY'] : '0deg',
            (isset($attributes['effectNRotateZ']) && $attributes['effectNRotateZ']) ? $attributes['effectNRotateZ'] : '0deg',
            (isset($attributes['effectNSkewX']) && $attributes['effectNSkewX']) ? $attributes['effectNSkewX'] : '0deg',
            (isset($attributes['effectNSkewY']) && $attributes['effectNSkewY']) ? $attributes['effectNSkewY'] : '0deg',
            (isset($attributes['effectNOffsetX'])) ? $attributes['effectNOffsetX'] : '0',
            (isset($attributes['effectNOffsetY'])) ? $attributes['effectNOffsetY'] : '0',
            (isset($attributes['effectNScale'])) ? $attributes['effectNScale'] : '1',
        );
        $css = $css . "}";
        $css = $css . ".block-id-".$attributes['id'] . " svg:hover{";
        $css = $css . sprintf("transform: rotateX(%s) rotateY(%s) rotateZ(%s) skewX(%s) skewY(%s) translateX(%s) translateY(%s) scale(%s);",
            (isset($attributes['effectHRotateX']) && $attributes['effectHRotateX']) ? $attributes['effectHRotateX'] : '0deg',
            (isset($attributes['effectHRotateY']) && $attributes['effectHRotateY']) ? $attributes['effectHRotateY'] : '0deg',
            (isset($attributes['effectHRotateZ']) && $attributes['effectHRotateZ']) ? $attributes['effectHRotateZ'] : '0deg',
            (isset($attributes['effectHSkewX']) && $attributes['effectHSkewX']) ? $attributes['effectHSkewX'] : '0deg',
            (isset($attributes['effectHSkewY']) && $attributes['effectHSkewY']) ? $attributes['effectHSkewY'] : '0deg',
            (isset($attributes['effectHOffsetX'])) ? $attributes['effectHOffsetX'] : '0',
            (isset($attributes['effectHOffsetY'])) ? $attributes['effectHOffsetY'] : '0',
            (isset($attributes['effectHScale'])) ? $attributes['effectHScale'] : '1',
        );
        $css = $css . "}";
        $css = $css . ".block-id-".$attributes['id'] . " .active svg{";
            if( isset($attributes['iconActiveColor']) && $attributes['iconActiveColor'] ){
                $css = $css . sprintf( "color: %s;", $attributes['iconActiveColor'] );
            }
        $css = $css . "}";
        return $css;
    }
}

<?php

/**
 * Generate Text CSS.
 */
if(!function_exists("ga_generate_css_faq")){
    function ga_generate_css_faq( $attributes ){
        $css = ".block-id-".$attributes['id'] . "{";
        if( isset($attributes['typoSize']) ){
            $css = $css . sprintf("font-size: %spx;", $attributes['typoSize']);
        }
        if( isset($attributes['typoWeight']) ){
            $css = $css . sprintf("font-weight: %s;", $attributes['typoWeight']);
        }
        if( isset($attributes['typoTransform']) ){
            $css = $css . sprintf("text-transform: %s;", $attributes['typoTransform']);
        }
        if( isset($attributes['typoStyle']) ){
            $css = $css . sprintf("font-style: %s;", $attributes['typoStyle']);
        }
        if( isset($attributes['typoDecoration']) ){
            $css = $css . sprintf("text-decoration: %s;", $attributes['typoDecoration']);
        }
        $css = $css . sprintf("line-height: %s;", ( isset($attributes['typoLineHeight']) && ($attributes['typoLineHeight'] != "normal")) ? $attributes['typoLineHeight'] . "px" : 'normal');
        $css = $css . sprintf("letter-spacing: %s;", ( isset($attributes['typoLetterSpacing']) && ($attributes['typoLetterSpacing'] != "normal")) ? $attributes['typoLetterSpacing'] . "px" : 'normal');
        $css = $css . sprintf("word-spacing: %s;", ( isset($attributes['typoWordSpacing']) && ($attributes['typoWordSpacing'] != "normal")) ? $attributes['typoWordSpacing'] . "px" : 'normal');
        if( isset($attributes['typoFontFamily']) && isset($attributes['typoFontFamily']) ){
            $css = $css . sprintf("font-family: %s;", $attributes['typoFontFamily']);
        }
        if( isset($attributes['layoutColumns']) && isset($attributes['layoutColumns']) ){
            $css = $css . sprintf("column-count: %s;", $attributes['layoutColumns']);
        }
        if( isset($attributes['layoutColumnsGap']) && isset($attributes['layoutColumnsGap']) ){
            $css = $css . sprintf("column-gap: %spx;", $attributes['layoutColumnsGap']);
        }
        if( isset($attributes['layoutPadding']) ){
            if( isset($attributes['layoutPadding']['left']) ){
                $css = $css . sprintf("padding-left: %s;", $attributes['layoutPadding']['left']);
            }
            if( isset($attributes['layoutPadding']['right']) ){
                $css = $css . sprintf("padding-right: %s;", $attributes['layoutPadding']['right']);
            }
            if( isset($attributes['layoutPadding']['top']) ){
                $css = $css . sprintf("padding-top: %s;", $attributes['layoutPadding']['top']);
            }
            if( isset($attributes['layoutPadding']['bottom']) ){
                $css = $css . sprintf("padding-bottom: %s;", $attributes['layoutPadding']['bottom']);
            }
        }
        if( isset($attributes['layoutMargin']) ){
            if( isset($attributes['layoutMargin']['left']) ){
                $css = $css . sprintf("margin-left: %s;", $attributes['layoutMargin']['left']);
            }
            if( isset($attributes['layoutMargin']['right']) ){
                $css = $css . sprintf("margin-right: %s;", $attributes['layoutMargin']['right']);
            }
            if( isset($attributes['layoutMargin']['top']) ){
                $css = $css . sprintf("margin-top: %s;", $attributes['layoutMargin']['top']);
            }
            if( isset($attributes['layoutMargin']['bottom']) ){
                $css = $css . sprintf("margin-bottom: %s;", $attributes['layoutMargin']['bottom']);
            }
        }
        if( isset($attributes['textColor']) && $attributes['textColor'] ){
            $css = $css . sprintf("color: %s;", $attributes['textColor']);
        }
        if( isset($attributes['textGradient']) && $attributes['textGradient'] ){
            $css = $css . sprintf("background-image: %s;-webkit-background-clip: text;-webkit-text-fill-color: transparent;", $attributes['textGradient']);
        }
        $css = $css . sprintf("transition: %s;", (isset($attributes['transitionColorTime']) && $attributes['transitionColorTime']) ? $attributes['transitionColorTime'] . "s" : '0.2s');
        if( 
            (isset($attributes['textShadowHorizontal']) && $attributes['textShadowHorizontal'] != "0px") ||
            (isset($attributes['textShadowVertical']) && $attributes['textShadowVertical'] != "0px") ||
            (isset($attributes['textShadowBlur']) && $attributes['textShadowBlur'] != "0px")
        ){
            $css = $css . sprintf("filter: drop-shadow(%s %s %s %s);", 
            isset($attributes['textShadowHorizontal']) ? $attributes['textShadowHorizontal'] : "0px",
            isset($attributes['textShadowVertical']) ? $attributes['textShadowVertical'] : "0px",
            isset($attributes['textShadowBlur']) ? $attributes['textShadowBlur'] : "0px",
            isset($attributes['textShadowColor']) ? $attributes['textShadowColor'] : "#000");
        }
        $css = $css . "}";
        $css = $css . ".block-id-".$attributes['id'] . ".animateOnce {";
        if( isset($attributes['entranceAnimation']) && $attributes['entranceAnimation'] != 'none' ){
            $css = $css . sprintf("animation: %s %s;", $attributes['entranceAnimation'], (isset($attributes["transitionTime"]) && $attributes["transitionTime"]) ? $attributes["transitionTime"] : "1s" );
        }
        $css = $css . "}";
        if( isset($attributes['textHColor']) && $attributes['textHColor'] ){
            $css = $css . ".block-id-".$attributes['id'] . sprintf(":hover {%s}",(isset($attributes["textColor"]) && $attributes["textColor"]) ? sprintf("color: %s;", $attributes["textHColor"]) : sprintf("-webkit-text-fill-color: %s;", $attributes["textHColor"]));
        }
        if( isset($attributes['textHGradient']) && $attributes['textHGradient'] ){
            $css = $css . ".block-id-".$attributes['id'] . " {" . sprintf("background-image: %s;-webkit-background-clip: text;", $attributes["textHGradient"]) . "}";
            $css = $css . ".block-id-".$attributes['id'] . ":hover {" . "color: transparent;" . "}";
        }
        if( 
            (isset($attributes['textShadowHHorizontal']) && $attributes['textShadowHHorizontal'] != "0px") ||
            (isset($attributes['textShadowHVertical']) && $attributes['textShadowHVertical'] != "0px") ||
            (isset($attributes['textShadowHBlur']) && $attributes['textShadowHBlur'] != "0px")
        ){
            $css = $css . sprintf(".block-id-%s:hover{filter: drop-shadow(%s %s %s %s);}", 
            $attributes['id'],
            isset($attributes['textShadowHHorizontal']) ? $attributes['textShadowHHorizontal'] : "0px",
            isset($attributes['textShadowHVertical']) ? $attributes['textShadowHVertical'] : "0px",
            isset($attributes['textShadowHBlur']) ? $attributes['textShadowHBlur'] : "0px",
            isset($attributes['textShadowHColor']) ? $attributes['textShadowHColor'] : "#000");
        }
        return $css;
    }
}
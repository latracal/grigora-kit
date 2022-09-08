<?php

/**
 * Generate Notice CSS.
 */

if(!function_exists("ga_generate_css_notice")){
    function ga_generate_css_notice( $attributes ){
        //  block-styling
        $css = ".block-id-".$attributes['id'] . " {";
        if( isset($attributes['boxBackgroundColor']) ){
            $css = $css . sprintf("background-color: %s;", $attributes['boxBackgroundColor']);
        }
        if( isset($attributes['effectNBorder']) ){
            if( isset($attributes['effectNBorder']['left']) ){
                $css = $css . sprintf("border-left: %s %s %s;", 
                    (isset($attributes['effectNBorder']['left']['width'])) ? $attributes['effectNBorder']['left']['width'] : '',
                    (isset($attributes['effectNBorder']['left']['style'])) ? $attributes['effectNBorder']['left']['style'] : '',
                    (isset($attributes['effectNBorder']['left']['color'])) ? $attributes['effectNBorder']['left']['color'] : ''
                );
            }
            if( isset($attributes['effectNBorder']['right']) ){
                $css = $css . sprintf("border-right: %s %s %s;", 
                (isset($attributes['effectNBorder']['right']['width'])) ? $attributes['effectNBorder']['right']['width'] : '',
                (isset($attributes['effectNBorder']['right']['style'])) ? $attributes['effectNBorder']['right']['style'] : '',
                (isset($attributes['effectNBorder']['right']['color'])) ? $attributes['effectNBorder']['right']['color'] : ''
            );
            }
            if( isset($attributes['effectNBorder']['top']) ){
                $css = $css . sprintf("border-top: %s %s %s;", 
                (isset($attributes['effectNBorder']['top']['width'])) ? $attributes['effectNBorder']['top']['width'] : '',
                (isset($attributes['effectNBorder']['top']['style'])) ? $attributes['effectNBorder']['top']['style'] : '',
                (isset($attributes['effectNBorder']['top']['color'])) ? $attributes['effectNBorder']['top']['color'] : ''
            );
            }
            if( isset($attributes['effectNBorder']['bottom']) ){
                $css = $css . sprintf("border-bottom: %s %s %s;", 
                (isset($attributes['effectNBorder']['bottom']['width'])) ? $attributes['effectNBorder']['bottom']['width'] : '',
                (isset($attributes['effectNBorder']['bottom']['style'])) ? $attributes['effectNBorder']['bottom']['style'] : '',
                (isset($attributes['effectNBorder']['bottom']['color'])) ? $attributes['effectNBorder']['bottom']['color'] : ''
            );
            }
        }
        if( isset($attributes['effectNBorderRadius']) ){
            if( isset($attributes['effectNBorderRadius']['topRight']) ){
                $css = $css . sprintf("border-top-right-radius: %s;", $attributes['effectNBorderRadius']['topRight']);
            }
            if( isset($attributes['effectNBorderRadius']['topLeft']) ){
                $css = $css . sprintf("border-top-left-radius: %s;", $attributes['effectNBorderRadius']['topLeft']);
            }
            if( isset($attributes['effectNBorderRadius']['bottomRight']) ){
                $css = $css . sprintf("border-bottom-right-radius: %s;", $attributes['effectNBorderRadius']['bottomRight']);
            }
            if( isset($attributes['effectNBorderRadius']['bottomLeft']) ){
                $css = $css . sprintf("border-bottom-left-radius: %s;", $attributes['effectNBorderRadius']['bottomLeft']);
            }
        }
        $css = $css . sprintf("box-shadow: %s %s %s %s %s;",
        (isset($attributes['effectNShadowHO'])) ? $attributes['effectNShadowHO'] : '0px',
        (isset($attributes['effectNShadowVO'])) ? $attributes['effectNShadowVO'] : '0px',
        (isset($attributes['effectNShadowBlur'])) ? $attributes['effectNShadowBlur'] : '0px',
        (isset($attributes['effectNShadowSpread'])) ? $attributes['effectNShadowSpread'] : '0px',
        (isset($attributes['effectNShadowColor'])) ? $attributes['effectNShadowColor'] : '#000',
        );
        $css = $css . "}";
        if( isset($attributes['boxBackgroundHColor']) && $attributes['boxBackgroundHColor'] != '' ){
            $css = $css . ".block-id-".$attributes['id'] . ":hover {";
            $css = $css . sprintf("background-color: %s;", $attributes['boxBackgroundHColor']);
            $css = $css . "}";
        }
        if( isset($attributes['entranceAnimation']) && $attributes['entranceAnimation'] != 'none' ){
            $css = $css . ".block-id-".$attributes['id'] . ".animateOnce {";
            $css = $css . sprintf("animation: %s %s;", $attributes['entranceAnimation'], (isset($attributes["transitionAnimationTime"]) && $attributes["transitionAnimationTime"]) ? $attributes["transitionAnimationTime"] . "s" : "1s" );
            $css = $css . "}";
        }
        $css = $css . ".block-id-".$attributes['id'] . ":hover {";
        if( isset($attributes['effectHBorder']) ){
            if( isset($attributes['effectHBorder']['left']) ){
                $css = $css . sprintf("border-left: %s %s %s;", 
                    (isset($attributes['effectHBorder']['left']['width'])) ? $attributes['effectHBorder']['left']['width'] : '',
                    (isset($attributes['effectHBorder']['left']['style'])) ? $attributes['effectHBorder']['left']['style'] : '',
                    (isset($attributes['effectHBorder']['left']['color'])) ? $attributes['effectHBorder']['left']['color'] : ''
                );
            }
            if( isset($attributes['effectHBorder']['right']) ){
                $css = $css . sprintf("border-right: %s %s %s;", 
                (isset($attributes['effectHBorder']['right']['width'])) ? $attributes['effectHBorder']['right']['width'] : '',
                (isset($attributes['effectHBorder']['right']['style'])) ? $attributes['effectHBorder']['right']['style'] : '',
                (isset($attributes['effectHBorder']['right']['color'])) ? $attributes['effectHBorder']['right']['color'] : ''
            );
            }
            if( isset($attributes['effectHBorder']['top']) ){
                $css = $css . sprintf("border-top: %s %s %s;", 
                (isset($attributes['effectHBorder']['top']['width'])) ? $attributes['effectHBorder']['top']['width'] : '',
                (isset($attributes['effectHBorder']['top']['style'])) ? $attributes['effectHBorder']['top']['style'] : '',
                (isset($attributes['effectHBorder']['top']['color'])) ? $attributes['effectHBorder']['top']['color'] : ''
            );
            }
            if( isset($attributes['effectHBorder']['bottom']) ){
                $css = $css . sprintf("border-bottom: %s %s %s;", 
                (isset($attributes['effectHBorder']['bottom']['width'])) ? $attributes['effectHBorder']['bottom']['width'] : '',
                (isset($attributes['effectHBorder']['bottom']['style'])) ? $attributes['effectHBorder']['bottom']['style'] : '',
                (isset($attributes['effectHBorder']['bottom']['color'])) ? $attributes['effectHBorder']['bottom']['color'] : ''
            );
            }
        }
        if( isset($attributes['effectHBorderRadius']) ){
            if( isset($attributes['effectHBorderRadius']['topRight']) ){
                $css = $css . sprintf("border-top-right-radius: %s;", $attributes['effectHBorderRadius']['topRight']);
            }
            if( isset($attributes['effectHBorderRadius']['topLeft']) ){
                $css = $css . sprintf("border-top-left-radius: %s;", $attributes['effectHBorderRadius']['topLeft']);
            }
            if( isset($attributes['effectHBorderRadius']['bottomRight']) ){
                $css = $css . sprintf("border-bottom-right-radius: %s;", $attributes['effectHBorderRadius']['bottomRight']);
            }
            if( isset($attributes['effectHBorderRadius']['bottomLeft']) ){
                $css = $css . sprintf("border-bottom-left-radius: %s;", $attributes['effectHBorderRadius']['bottomLeft']);
            }
        }
        if(
            (isset($attributes['effectHShadowHO']) && $attributes['effectHShadowHO']) ||
            (isset($attributes['effectHShadowVO']) && $attributes['effectHShadowVO']) ||
            (isset($attributes['effectHShadowBlur']) && $attributes['effectHShadowBlur']) ||
            (isset($attributes['effectHShadowSpread']) && $attributes['effectHShadowSpread'])
        ){
            $css = $css . sprintf("box-shadow: %s %s %s %s %s;",
                (isset($attributes['effectHShadowHO']) && $attributes['effectHShadowHO']) ? $attributes['effectHShadowHO'] : ((isset($attributes['effectNShadowHO']) && $attributes['effectNShadowHO']) ? $attributes['effectNShadowHO'] : '0px'),
                (isset($attributes['effectHShadowVO']) && $attributes['effectHShadowVO']) ? $attributes['effectHShadowVO'] : ((isset($attributes['effectNShadowVO']) && $attributes['effectNShadowVO']) ? $attributes['effectNShadowVO'] : '0px'),
                (isset($attributes['effectHShadowBlur']) && $attributes['effectHShadowBlur']) ? $attributes['effectHShadowBlur'] : ((isset($attributes['effectNShadowBlur']) && $attributes['effectNShadowBlur']) ? $attributes['effectNShadowBlur'] : '0px'),
                (isset($attributes['effectHShadowSpread']) && $attributes['effectHShadowSpread']) ? $attributes['effectHShadowSpread'] : ((isset($attributes['effectNShadowSpread']) && $attributes['effectNShadowSpread']) ? $attributes['effectNShadowSpread'] : '0px'),
                (isset($attributes['effectHShadowColor'])) ? $attributes['effectHShadowColor'] : '#000',
            );
        }
        $css = $css . "}";

        // icon-styling
        $css = $css . ".block-id-".$attributes['id'] . " .icon-container {";
        if( isset($attributes['iconPadding']) ){
            if( isset($attributes['iconPadding']['top']) ){
                $css = $css . sprintf("padding-top: %s;", $attributes['iconPadding']['top']);
            }
            if( isset($attributes['iconPadding']['bottom']) ){
                $css = $css . sprintf("padding-bottom: %s;", $attributes['iconPadding']['bottom']);
            }
            if( isset($attributes['iconPadding']['top']) ){
                $css = $css . sprintf("padding-top: %s;", $attributes['iconPadding']['top']);
            }
            if( isset($attributes['iconPadding']['bottom']) ){
                $css = $css . sprintf("padding-bottom: %s;", $attributes['iconPadding']['bottom']);
            }
        }
        if( isset($attributes['iconMargin']) ){
            if( isset($attributes['iconMargin']['top']) ){
                $css = $css . sprintf("margin-top: %s;", $attributes['iconMargin']['top']);
            }
            if( isset($attributes['iconMargin']['bottom']) ){
                $css = $css . sprintf("margin-bottom: %s;", $attributes['iconMargin']['bottom']);
            }
            if( isset($attributes['iconMargin']['top']) ){
                $css = $css . sprintf("margin-top: %s;", $attributes['iconMargin']['top']);
            }
            if( isset($attributes['iconMargin']['bottom']) ){
                $css = $css . sprintf("margin-bottom: %s;", $attributes['iconMargin']['bottom']);
            }
        }
        if( isset($attributes['align'])){
            $css = $css . sprintf("justify-content: %s;", $attributes['align']);
        }
        $css = $css . "}";
        if( isset($attributes['icon'] && $attributes['icon'] && $attributes['icon'] != 'none')){
            $css = $css . ".block-id-".$attributes['id'] . " .icon-container svg {";
            if( isset($attributes['iconSize'])){
                $css = $css . sprintf("width: %s;", $attributes['iconSize']);
                $css = $css . sprintf("height: %s;", $attributes['iconSize']);
            }
            if( isset($attributes['iconColorFlag']) ){
                if($attributes['iconColorFlag']) {
                    if( isset($attributes['iconNormalColor'])){
                        $css = $css . sprintf("color: %s;", $attributes['iconNormalColor']);
                    }
                } else {
                    if( isset($attributes['effectNBorder']['left']['color'] && $attributes['effectNBorder']['left']['color']) ){
                        $css = $css . sprintf("color: %s;", $attributes['effectNBorder']['left']['color']);
                    }
                }
            }
            $css = $css . "}";
            $css = $css . ".block-id-".$attributes['id'] . ":hover .icon-container svg {";
            if( isset($attributes['iconColorFlag']) ){
                if($attributes['iconColorFlag']) {
                    if( isset($attributes['iconHoverColor'])){
                        $css = $css . sprintf("color: %s;", $attributes['iconHoverColor']);
                    }
                } else {
                    if( isset($attributes['effectHBorder']['left']['color'] && $attributes['effectHBorder']['left']['color']) ){
                        $css = $css . sprintf("color: %s;", $attributes['effectHBorder']['left']['color']);
                    }
                }
            }
            $css = $css . "}";
        }

        // title-styling
        $css = $css . ".block-id-".$attributes['id'] . " .notice-title-style {";
        if( isset($attributes['align'])){
            $css = $css . sprintf("text-align: %s;", $attributes['align']);
        }
        if( isset($attributes['titleTypoSize']) ){
            $css = $css . sprintf("font-size: %spx;", $attributes['titleTypoSize']);
        }
        if( isset($attributes['titleTypoWeight']) ){
            $css = $css . sprintf("font-weight: %s;", $attributes['titleTypoWeight']);
        }
        if( isset($attributes['titleTypoTransform']) ){
            $css = $css . sprintf("text-transform: %s;", $attributes['titleTypoTransform']);
        }
        if( isset($attributes['titleTypoStyle']) ){
            $css = $css . sprintf("font-style: %s;", $attributes['titleTypoStyle']);
        }
        if( isset($attributes['titleTypoDecoration']) ){
            $css = $css . sprintf("text-decoration: %s;", $attributes['titleTypoDecoration']);
        }
        if( isset($attributes['titleMinWidth']) ){
            $css = $css . sprintf("min-width: %s;", $attributes['titleMinWidth']);
        }
        $css = $css . sprintf("line-height: %s;", ( isset($attributes['titleTypoLineHeight']) && ($attributes['titleTypoLineHeight'] != "normal")) ? $attributes['titleTypoLineHeight'] . "px" : 'normal');
        $css = $css . sprintf("letter-spacing: %s;", ( isset($attributes['titleTypoLetterSpacing']) && ($attributes['titleTypoLetterSpacing'] != "normal")) ? $attributes['titleTypoLetterSpacing'] . "px" : 'normal');
        $css = $css . sprintf("word-spacing: %s;", ( isset($attributes['titleTypoWordSpacing']) && ($attributes['titleTypoWordSpacing'] != "normal")) ? $attributes['titleTypoWordSpacing'] . "px" : 'normal');
        if( isset($attributes['titleTypoFontFamily']) && isset($attributes['titleTypoFontFamily']) ){
            $css = $css . sprintf("font-family: %s;", $attributes['titleTypoFontFamily']);
        }
        if( isset($attributes['titleLayoutPadding']) ){
            if( isset($attributes['titleLayoutPadding']['left']) ){
                $css = $css . sprintf("padding-left: %s;", $attributes['titleLayoutPadding']['left']);
            }
            if( isset($attributes['titleLayoutPadding']['right']) ){
                $css = $css . sprintf("padding-right: %s;", $attributes['titleLayoutPadding']['right']);
            }
            if( isset($attributes['titleLayoutPadding']['top']) ){
                $css = $css . sprintf("padding-top: %s;", $attributes['titleLayoutPadding']['top']);
            }
            if( isset($attributes['titleLayoutPadding']['bottom']) ){
                $css = $css . sprintf("padding-bottom: %s;", $attributes['titleLayoutPadding']['bottom']);
            }
        }
        if( isset($attributes['titleTextColor']) && $attributes['titleTextColor'] ){
            $css = $css . sprintf("color: %s;", $attributes['titleTextColor']);
        }
        $css = $css . sprintf("transition: %s;", (isset($attributes['transitionColorTime']) && $attributes['transitionColorTime']) ? $attributes['transitionColorTime'] . "s" : '0.2s');
        if( 
            (isset($attributes['textShadowHorizontal']) && $attributes['textShadowHorizontal'] != "0px") ||
            (isset($attributes['textShadowVertical']) && $attributes['textShadowVertical'] != "0px") ||
            (isset($attributes['textShadowBlur']) && $attributes['textShadowBlur'] != "0px")
        ){
            $css = $css . sprintf(" text-shadow: %s %s %s %s;", 
            isset($attributes['textShadowHorizontal']) ? $attributes['textShadowHorizontal'] : "0px",
            isset($attributes['textShadowVertical']) ? $attributes['textShadowVertical'] : "0px",
            isset($attributes['textShadowBlur']) ? $attributes['textShadowBlur'] : "0px",
            isset($attributes['textShadowColor']) ? $attributes['textShadowColor'] : "#000");
        }
        $css = $css . "}";
        if( isset($attributes['titleTextHColor']) && $attributes['titleTextHColor'] ){
            $css = $css . ".block-id-".$attributes['id'] . sprintf(":hover .notice-title-style {%s}", sprintf("color: %s;", $attributes["titleTextHColor"]));
        }
        $css = $css . ".block-id-".$attributes['id'] . ":hover notice-title-style {";
        if( 
            (isset($attributes['textShadowHHorizontal']) && $attributes['textShadowHHorizontal'] ) ||
            (isset($attributes['textShadowHVertical']) && $attributes['textShadowHVertical'] ) ||
            (isset($attributes['textShadowHBlur']) && $attributes['textShadowHBlur'])
        ){
            $css = $css . sprintf(" text-shadow: %s %s %s %s;", 
            (isset($attributes['textShadowHHorizontal']) && $attributes['textShadowHHorizontal'] ) ? $attributes['textShadowHHorizontal'] : ((isset($attributes['textShadowHorizontal']) && $attributes['textShadowHorizontal']) ? $attributes['textShadowHorizontal'] : '0px'),
            (isset($attributes['textShadowHVertical']) && $attributes['textShadowHVertical']) ? $attributes['textShadowHVertical'] : ((isset($attributes['textShadowVertical']) && $attributes['textShadowVertical']) ? $attributes['textShadowVertical'] : '0px'),
            (isset($attributes['textShadowHBlur']) && $attributes['textShadowHBlur']) ? $attributes['textShadowHBlur'] : ((isset($attributes['textShadowBlur']) && $attributes['textShadowBlur']) ? $attributes['textShadowBlur'] : '0px'),
            isset($attributes['textShadowHColor']) ? $attributes['textShadowHColor'] : "#000");
        }
        $css = $css . "}";

        // content-styling
        $css = $css . ".block-id-".$attributes['id'] . " .notice-content-style {";
        if( isset($attributes['align'])){
            $css = $css . sprintf("text-align: %s;", $attributes['align']);
        }
        if( isset($attributes['contentTypoSize']) ){
            $css = $css . sprintf("font-size: %spx;", $attributes['contentTypoSize']);
        }
        if( isset($attributes['contentTypoWeight']) ){
            $css = $css . sprintf("font-weight: %s;", $attributes['contentTypoWeight']);
        }
        if( isset($attributes['contentTypoTransform']) ){
            $css = $css . sprintf("text-transform: %s;", $attributes['contentTypoTransform']);
        }
        if( isset($attributes['contentTypoStyle']) ){
            $css = $css . sprintf("font-style: %s;", $attributes['contentTypoStyle']);
        }
        if( isset($attributes['contentTypoDecoration']) ){
            $css = $css . sprintf("text-decoration: %s;", $attributes['contentTypoDecoration']);
        }
        $css = $css . sprintf("line-height: %s;", ( isset($attributes['contentTypoLineHeight']) && ($attributes['contentTypoLineHeight'] != "normal")) ? $attributes['contentTypoLineHeight'] . "px" : 'normal');
        $css = $css . sprintf("letter-spacing: %s;", ( isset($attributes['contentTypoLetterSpacing']) && ($attributes['contentTypoLetterSpacing'] != "normal")) ? $attributes['contentTypoLetterSpacing'] . "px" : 'normal');
        $css = $css . sprintf("word-spacing: %s;", ( isset($attributes['contentTypoWordSpacing']) && ($attributes['contentTypoWordSpacing'] != "normal")) ? $attributes['contentTypoWordSpacing'] . "px" : 'normal');
        if( isset($attributes['contentTypoFontFamily']) && isset($attributes['contentTypoFontFamily']) ){
            $css = $css . sprintf("font-family: %s;", $attributes['contentTypoFontFamily']);
        }
        if( isset($attributes['contentLayoutPadding']) ){
            if( isset($attributes['contentLayoutPadding']['left']) ){
                $css = $css . sprintf("padding-left: %s;", $attributes['contentLayoutPadding']['left']);
            }
            if( isset($attributes['contentLayoutPadding']['right']) ){
                $css = $css . sprintf("padding-right: %s;", $attributes['contentLayoutPadding']['right']);
            }
            if( isset($attributes['contentLayoutPadding']['top']) ){
                $css = $css . sprintf("padding-top: %s;", $attributes['contentLayoutPadding']['top']);
            }
            if( isset($attributes['contentLayoutPadding']['bottom']) ){
                $css = $css . sprintf("padding-bottom: %s;", $attributes['contentLayoutPadding']['bottom']);
            }
        }
        if( isset($attributes['contentTextColor']) && $attributes['contentTextColor'] ){
            $css = $css . sprintf("color: %s;", $attributes['contentTextColor']);
        }
        $css = $css . sprintf("transition: %s;", (isset($attributes['transitionColorTime']) && $attributes['transitionColorTime']) ? $attributes['transitionColorTime'] . "s" : '0.2s');
        if( 
            (isset($attributes['textShadowHorizontal']) && $attributes['textShadowHorizontal'] != "0px") ||
            (isset($attributes['textShadowVertical']) && $attributes['textShadowVertical'] != "0px") ||
            (isset($attributes['textShadowBlur']) && $attributes['textShadowBlur'] != "0px")
        ){
            $css = $css . sprintf(" text-shadow: %s %s %s %s;", 
            isset($attributes['textShadowHorizontal']) ? $attributes['textShadowHorizontal'] : "0px",
            isset($attributes['textShadowVertical']) ? $attributes['textShadowVertical'] : "0px",
            isset($attributes['textShadowBlur']) ? $attributes['textShadowBlur'] : "0px",
            isset($attributes['textShadowColor']) ? $attributes['textShadowColor'] : "#000");
        }
        $css = $css . "}";
        if( isset($attributes['contentTextHColor']) && $attributes['contentTextHColor'] ){
            $css = $css . ".block-id-".$attributes['id'] . sprintf(":hover .notice-content-style {%s}", sprintf("color: %s;", $attributes["contentTextHColor"]));
        }
        $css = $css . ".block-id-".$attributes['id'] . ":hover notice-content-style {";
        if( 
            (isset($attributes['textShadowHHorizontal']) && $attributes['textShadowHHorizontal'] ) ||
            (isset($attributes['textShadowHVertical']) && $attributes['textShadowHVertical'] ) ||
            (isset($attributes['textShadowHBlur']) && $attributes['textShadowHBlur'])
        ){
            $css = $css . sprintf("text-shadow: %s %s %s %s;", 
            (isset($attributes['textShadowHHorizontal']) && $attributes['textShadowHHorizontal'] ) ? $attributes['textShadowHHorizontal'] : ((isset($attributes['textShadowHorizontal']) && $attributes['textShadowHorizontal']) ? $attributes['textShadowHorizontal'] : '0px'),
            (isset($attributes['textShadowHVertical']) && $attributes['textShadowHVertical']) ? $attributes['textShadowHVertical'] : ((isset($attributes['textShadowVertical']) && $attributes['textShadowVertical']) ? $attributes['textShadowVertical'] : '0px'),
            (isset($attributes['textShadowHBlur']) && $attributes['textShadowHBlur']) ? $attributes['textShadowHBlur'] : ((isset($attributes['textShadowBlur']) && $attributes['textShadowBlur']) ? $attributes['textShadowBlur'] : '0px'),
            isset($attributes['textShadowHColor']) ? $attributes['textShadowHColor'] : "#000");
        }
        $css = $css . "}";

        // dismiss-icon-styling
        $css = $css . ".block-id-".$attributes['id'] . " .dismiss-icon-container {";
        if( isset($attributes['titleLayoutPadding']) ){
            if( isset($attributes['titleLayoutPadding']['top']) ){
                $css = $css . sprintf("padding-top: %s;", $attributes['titleLayoutPadding']['top']);
            }
            if( isset($attributes['titleLayoutPadding']['bottom']) ){
                $css = $css . sprintf("padding-bottom: %s;", $attributes['titleLayoutPadding']['bottom']);
            }
        }
        $css = $css . "}";

        return $css;
    }
}
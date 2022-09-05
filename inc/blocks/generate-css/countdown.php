<?php


/**
 * Return a complete css for specific countdown block.
 */
if(!function_exists("ga_generate_css_countdown")){
    function ga_generate_css_countdown( $attributes ){
        if( isset($attributes['id']) ){
                $css = ".block-id-".$attributes['id'] . " {";
                $css = $css . "display: flex;";

                if( isset($attributes['align'])){
                    $css = $css . sprintf("justify-content: %s;", $attributes['align']);
                }

                $css = $css . "}";

                $css = $css . ".block-id-".$attributes['id'] . " .days, " . ".block-id-".$attributes['id'] . " .hours, " . ".block-id-".$attributes['id'] . " .minutes, " . ".block-id-".$attributes['id'] . " .seconds, " . ".block-id-".$attributes['id'] . " .prefix, " . ".block-id-".$attributes['id'] . " .suffix, " . ".block-id-".$attributes['id'] . " .divider {";

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
                $css = $css . sprintf("line-height: %s;", ( isset($attributes['typoLineHeight']) && ($attributes['typoLineHeight'] != "normal")) ? $attributes['typoLineHeight'] . "px" : 'normal');
                $css = $css . sprintf("letter-spacing: %s;", ( isset($attributes['typoLetterSpacing']) && ($attributes['typoLetterSpacing'] != "normal")) ? $attributes['typoLetterSpacing'] . "px" : 'normal');
                $css = $css . sprintf("word-spacing: %s;", ( isset($attributes['typoWordSpacing']) && ($attributes['typoWordSpacing'] != "normal")) ? $attributes['typoWordSpacing'] . "px" : 'normal');
                
                // Number Style starts here
                
                if( isset($attributes['effectNColorNumber']) && $attributes['effectNColorNumber'] ){
                    $css = $css . sprintf("color: %s;", $attributes['effectNColorNumber']);
                }
                if( 
                    isset($attributes['textShadowHorizontalNumber']) ||
                    isset($attributes['textShadowVerticalNumber']) ||
                    isset($attributes['textShadowBlurNumber']) ||
                    isset($attributes['textShadowColorNumber'])
                ){
                    $css = $css . sprintf("text-shadow: %s %s %s %s;",
                    (isset($attributes['textShadowHorizontalNumber']) ? $attributes['textShadowHorizontalNumber'] : "0px" ),
                    (isset($attributes['textShadowVerticalNumber']) ? $attributes['textShadowVerticalNumber'] : "0px" ),
                    (isset($attributes['textShadowBlurNumber']) ? $attributes['textShadowBlurNumber'] : "0px" ),
                    (isset($attributes['textShadowColorNumber']) ? $attributes['textShadowColorNumber'] : "#000" ));
                }

                $css = $css . "}";

                // Label Style starts here
                $css =  $css . ".block-id-".$attributes['id'] . " .label, " . ".block-id-".$attributes['id'] . " .completed{ ";

                    if( isset($attributes['typoLSize']) ){
                        $css = $css . sprintf("font-size: %spx;", $attributes['typoLSize']);
                    }
                    if( isset($attributes['typoLWeight']) ){
                        $css = $css . sprintf("font-weight: %s;", $attributes['typoLWeight']);
                    }
                    if( isset($attributes['typoLTransform']) ){
                        $css = $css . sprintf("text-transform: %s;", $attributes['typoLTransform']);
                    }
                    if( isset($attributes['typoLStyle']) ){
                        $css = $css . sprintf("font-style: %s;", $attributes['typoLStyle']);
                    }
                    $css = $css . sprintf("line-height: %s;", ( isset($attributes['typoLLineHeight']) && ($attributes['typoLLineHeight'] != "normal")) ? $attributes['typoLLineHeight'] . "px" : 'normal');
                    $css = $css . sprintf("letter-spacing: %s;", ( isset($attributes['typoLLetterSpacing']) && ($attributes['typoLLetterSpacing'] != "normal")) ? $attributes['typoLLetterSpacing'] . "px" : 'normal');
                    $css = $css . sprintf("word-spacing: %s;", ( isset($attributes['typoLWordSpacing']) && ($attributes['typoLWordSpacing'] != "normal")) ? $attributes['typoLWordSpacing'] . "px" : 'normal');
                    
                    if( isset($attributes['effectNColorLabel']) && $attributes['effectNColorLabel'] ){
                        $css = $css . sprintf("color: %s;", $attributes['effectNColorLabel']);
                    }
                    if( 
                        isset($attributes['textShadowHorizontalLabel']) ||
                        isset($attributes['textShadowVerticalLabel']) ||
                        isset($attributes['textShadowBlurLabel']) ||
                        isset($attributes['textShadowColorLabel'])
                    ){
                        $css = $css . sprintf("text-shadow: %s %s %s %s;",
                        (isset($attributes['textShadowHorizontalLabel']) ? $attributes['textShadowHorizontalLabel'] : "0px" ),
                        (isset($attributes['textShadowVerticalLabel']) ? $attributes['textShadowVerticalLabel'] : "0px" ),
                        (isset($attributes['textShadowBlurLabel']) ? $attributes['textShadowBlurLabel'] : "0px" ),
                        (isset($attributes['textShadowColorLabel']) ? $attributes['textShadowColorLabel'] : "#000" ));
                    }

                $css = $css . "}";

                $css = $css . ".block-id-".$attributes['id'] . " span {";
                
                if( isset($attributes['typoDecoration']) ){
                    $css = $css . sprintf("text-decoration: %s;", $attributes['typoDecoration']);
                }
                $css = $css . sprintf("transform: %s %s %s %s %s %s %s %s;",
                (isset($attributes['effectNRotateX']) && $attributes['effectNRotateX']) ? "rotateX({$attributes['effectNRotateX']})" : '',
                (isset($attributes['effectNRotateY']) && $attributes['effectNRotateY']) ? "rotateY({$attributes['effectNRotateY']})" : '',
                (isset($attributes['effectNRotateZ']) && $attributes['effectNRotateZ']) ? "rotateZ({$attributes['effectNRotateZ']})" : '',
                (isset($attributes['effectNSkewX']) && $attributes['effectNSkewX']) ? "skewX({$attributes['effectNSkewX']})" : '',
                (isset($attributes['effectNSkewY']) && $attributes['effectNSkewY']) ? "skewY({$attributes['effectNSkewY']})" : '',
                (isset($attributes['effectNOffsetX'])) ? "translateX({$attributes['effectNOffsetX']})" : '',
                (isset($attributes['effectNOffsetY'])) ? "translateY({$attributes['effectNOffsetY']})" : '',
                (isset($attributes['effectNScale'])) ? "scale({$attributes['effectNScale']})" : '',
                );
                $css = $css . "}";
            
            return $css;
        }
        return "";
    }
}
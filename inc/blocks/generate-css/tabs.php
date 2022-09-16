<?php


/**
 * Return a complete css for specific countdown block.
 */
if(!function_exists("ga_generate_css_tabs")){
    function ga_generate_css_tabs( $attributes ){
        
        if( isset($attributes['id']) ){
           $css = "";
           $css = ".block-id-".$attributes['id'] . " {";
            if(isset($attributes['contentGap'])){
                $css = $css . sprintf("row-gap: %spx;", $attributes['contentGap']);
            }
            $css = $css . "}";

            $css = $css . ".block-id-".$attributes['id'] . " .tab-contents .grigora-kit-inner-tab {display: none;}";

            //Add current Tab later

            $css = $css . ".block-id-".$attributes['id'] . ".animateOnce {";
                if( isset($attributes['entranceAnimation']) && $attributes['entranceAnimation'] != 'none' ){
                    $css = $css . sprintf("animation: %s %s;", $attributes['entranceAnimation'], (isset($attributes["entranceAnimationTime"]) && $attributes["entranceAnimationTime"]) ? $attributes["entranceAnimationTime"] . "s" : "1s" );
                }
            $css = $css . "}";

            $css = $css . ".block-id-".$attributes['id'] . " .content-container{";

                if(isset($attributes['maxWidth'])){
                    $css = $css . sprintf("max-width: %s;", $attributes['maxWidth']);
                }

                if(isset($attributes['minHeight'])){
                    $css = $css . sprintf("min-height: %s;", $attributes['minHeight']);
                }

            $css = $css . "}";

            $css = $css . "block-id-".$attributes['id'] . " .title-subtitle{";
            if(isset($attributes['typoTSize'])){
                $css = $css . sprintf("font-size: %spx;", $attributes['typoTSize']);
            }
            if(isset($attributes['typoTWeight'])){
                $css = $css . sprintf("font-weight: %s;", $attributes['typoTWeight']);
            }
            if(isset($attributes['typoTTransform'])){
                $css = $css . sprintf("text-transform: %s;", $attributes['typoTTransform']);
            }

            $css = $css . sprintf("line-height: %s;", ( isset($attributes['typoTLineHeight']) && ($attributes['typoTLineHeight'] != "normal")) ? $attributes['typoTLineHeight'] . "px" : 'normal');
            $css = $css . sprintf("letter-spacing: %s;", ( isset($attributes['typoTLetterSpacing']) && ($attributes['typoTLetterSpacing'] != "normal")) ? $attributes['typoTLetterSpacing'] . "px" : 'normal');
            $css = $css . sprintf("word-spacing: %s;", ( isset($attributes['typoTWordSpacing']) && ($attributes['typoTWordSpacing'] != "normal")) ? $attributes['typoTWordSpacing'] . "px" : 'normal');

            if(isset($attributes['padding'])){
                $css = $css . sprintf("padding-left: %s;", $attributes['padding']['left']);
                $css = $css . sprintf("padding-right: %s;", $attributes['padding']['right']);
                $css = $css . sprintf("padding-bottom: %s;", $attributes['padding']['bottom']);
                $css = $css . sprintf("padding-top: %s;", $attributes['padding']['top']);
            }

            if(isset($attributes['margin'])){
                $css = $css . sprintf("margin-left: %s;", $attributes['margin']['left']);
                $css = $css . sprintf("margin-right: %s;", $attributes['margin']['right']);
                $css = $css . sprintf("margin-bottom: %s;", $attributes['margin']['bottom']);
                $css = $css . sprintf("margin-top: %s;", $attributes['margin']['top']);
            }

            if(isset($attributes['border'])){
                $css = $css . sprintf("border-left: %s;", $attributes['border']['left']);
                $css = $css . sprintf("border-right: %s;", $attributes['border']['right']);
                $css = $css . sprintf("border-bottom: %s;", $attributes['border']['bottom']);
                $css = $css . sprintf("border-top: %s;", $attributes['border']['top']);
            }

            if(isset($attributes['borderStyle'])){
                $css = $css . sprintf("border-style: %s;", $attributes['borderStyle']);
            }
            
            if(isset($attributes['titleColor'])){
                $css = $css . sprintf("color: %s;", $attributes['titleColor']);
            }

            if(isset($attributes['bgColor'])){
                $css = $css . sprintf("background-color: %s;", $attributes['bgColor']);
            }

            if(isset($attributes['titleBorderColor'])){
                $css = $css . sprintf("border-color: %s;", $attributes['titleBorderColor']);
            }

            if(isset($attributes['effectNBorderRadius'])){
                $css = $css . sprintf("border-top-right-radius: %s;", $attributes['effectNBorderRadius']['topRight']);
                $css = $css . sprintf("border-top-left-radius: %s;", $attributes['effectNBorderRadius']['topLeft']);
                $css = $css . sprintf("border-bottom-right-radius: %s;", $attributes['effectNBorderRadius']['bottomRight']);
                $css = $css . sprintf("border-bottom-left-radius: %s;", $attributes['effectNBorderRadius']['bottomLeft']);
            }

            $css = $css . "}";

            $css = $css . ".block-id-".$attributes['id'] . " .tab-titles{";
            if(isset($attributes['tabGap'])){
                $css = $css . sprintf("column-gap: %spx;", $attributes['tabGap']);
            }
            $css = $css . "}";

            $css = $css . ".title-subtitle:hover{";

            if(isset($attributes['titleHoverColor'])){
                $css = $css . sprintf("color: %s;", $attributes['titleHoverColor']);
            }
            if(isset($attributes['titleBorderColor'])){
                $css = $css . sprintf("border-color: %s;", $attributes['titleBorderColor']);
            }
            if(isset($attributes['bgTitleHoverColor'])){
                $css = $css . sprintf("background-color: %s;", $attributes['bgTitleHoverColor']);
            }

            $css = $css . "}";

            $css = $css .  ".block-id-".$attributes['id'] . ".tab-active .title-subtitle{";
            if(isset($attributes['activeColor'])){
                $css = $css . sprintf("color: %s;", $attributes['activeColor']);
            }
            if(isset($attributes['titleBorderColor'])){
                $css = $css . sprintf("border-color: %s;", $attributes['titleBorderColor']);
            }
            if(isset($attributes['activeBgColor'])){
                $css = $css . sprintf("background-color: %s;", $attributes['bgTitleActiveColor']);
            }

            $css = $css . "}";
            

            
            
        
            return $css;
        
        }


            

        



        

        else{
            return "";
        }

    }
}
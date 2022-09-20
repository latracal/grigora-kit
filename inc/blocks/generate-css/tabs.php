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

            $css = $css . ".block-id-".$attributes['id'] . " .title-subtitle{";

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

            else{
                $css = $css . "border-left: 1px;"
                . "border-right: 1px;"
                . "border-bottom: 1px;"
                . "border-top: 1px;";
                
            }

            if(isset($attributes['borderStyle'])){
                $css = $css . sprintf("border-style: %s;", $attributes['borderStyle']);
            }

            else{
                $css = $css . "border-style: solid;";
            }
            
            if(isset($attributes['titleColor'])){
                $css = $css . sprintf("color: %s;", $attributes['titleColor']);
            }

            else{
                $css = $css . sprintf("color: %s;", "#000");
            }

            if(isset($attributes['bgColor'])){
                $css = $css . sprintf("background-color: %s;", $attributes['bgColor']);
            }

            else{
                $css = $css . sprintf("background-color: %s;", "#fff");
            }

            if(isset($attributes['titleBorderColor'])){
                $css = $css . sprintf("border-color: %s;", $attributes['titleBorderColor']);
            }

            else{
                $css = $css . sprintf("border-color: %s;", "#000");
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

            $css = $css . ".block-id-".$attributes['id'] . " .title-subtitle:hover{";
            if(isset($attributes['titleHoverColor'])){
                
                $css = $css . sprintf("color: %s;", $attributes['titleHoverColor']);
            }
            else{
                $css = $css . sprintf("color: %s;", "#000");
            }

            
            if(isset($attributes['titleBorderColor'])){
                $css = $css . sprintf("border-color: %s;", $attributes['titleBorderColor']);
            }

            else{
                $css = $css . sprintf("border-color: %s;", "#000");
            }


            if(isset($attributes['bgTitleHoverColor'])){
                $css = $css . sprintf("background-color: %s;", $attributes['bgTitleHoverColor']);
                // echo sprintf("<script>console.log( `This is from %s` );</script>", $css);
                // echo sprintf("<script>console.log( `This is from %s` );</script>", $attributes['bgTitleHoverColor']);
            }

            else{
                $css = $css . sprintf("background-color: %s;", "#787878");
            }

            $css = $css . "}";

            $css = $css .  ".block-id-".$attributes['id'] . " .tab-active .title-subtitle{";
            if(isset($attributes['activeColor'])){
                $css = $css . sprintf("color: %s;", $attributes['activeColor']);
            }
            else{
                $css = $css . sprintf("color: %s;", "#ffffff");
            }
            if(isset($attributes['titleBorderColor'])){
                $css = $css . sprintf("border-color: %s;", $attributes['titleBorderColor']);
            }
            else{
                $css = $css . sprintf("border-color: %s;", "#000");
            }
            if(isset($attributes['activeBgColor'])){
                $css = $css . sprintf("background-color: %s;", $attributes['bgTitleActiveColor']);
            }
            else{
                $css = $css . sprintf("background-color: %s;", "#2E8B57");
            }

            $css = $css . "}";

            $css = $css .  ".block-id-".$attributes['id'] . " .content-container:hover{";
                if(isset($attributes['contentHoverColor'])){
                    $css = $css . sprintf("color: %s;", $attributes['contentHoverColor']);
                }
                if(isset($attributes['contentBorderColor'])){
                    $css = $css . sprintf("border-color: %s;", $attributes['contentBorderColor']);
                }
            
            $css = $css . "}";
            

            $css = $css .  ".block-id-".$attributes['id'] . " .content-container{";

            if(isset($attributes['maxWidth'])){
                $css = $css . sprintf("max-width: %s;", $attributes['maxWidth']);
            }

            if(isset($attributes['minHeight'])){
                $css = $css . sprintf("min-height: %s;", $attributes['minHeight']);
            }
                
            if(isset($attributes['contentPadding'])){
                $css = $css . sprintf("padding-left: %s;", $attributes['contentPadding']['left']);
                $css = $css . sprintf("padding-right: %s;", $attributes['contentPadding']['right']);
                $css = $css . sprintf("padding-bottom: %s;", $attributes['contentPadding']['bottom']);
                $css = $css . sprintf("padding-top: %s;", $attributes['contentPadding']['top']);
            }

            if(isset($attributes['contentMargin'])){
                $css = $css . sprintf("margin-left: %s;", $attributes['contentMargin']['left']);
                $css = $css . sprintf("margin-right: %s;", $attributes['contentMargin']['right']);
                $css = $css . sprintf("margin-bottom: %s;", $attributes['contentMargin']['bottom']);
                $css = $css . sprintf("margin-top: %s;", $attributes['contentMargin']['top']);
            }

            if(isset($attributes['borderContent'])){
                $css = $css . sprintf("border-left: %s;", $attributes['borderContent']['left']);
                $css = $css . sprintf("border-right: %s;", $attributes['borderContent']['right']);
                $css = $css . sprintf("border-bottom: %s;", $attributes['borderContent']['bottom']);
                $css = $css . sprintf("border-top: %s;", $attributes['borderContent']['top']);
            }

            if(isset($attributes['borderContentStyle'])){
                $css = $css . sprintf("border-style: %s;", $attributes['borderContentStyle']);
            }

            if(isset($attributes['contentColor'])){
                $css = $css . sprintf("color: %s;", $attributes['contentColor']);
            }

            else{
                $css = $css . sprintf("color: %s;", "#000");
            }

            if(isset($attributes['contentBgColor'])){
                $css = $css . sprintf("background-color: %s;", $attributes['contentBgColor']);
            }

            else{
                $css = $css . sprintf("background-color: %s;", "#fff");
            }

            $css = $css . "}";
        
            $css = $css . ".block-id-".$attributes['id'] . " .title-class{";
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
            $css = $css . "}";

            $css = $css . ".block-id-".$attributes['id'] . " .subtitle-class{";
                if(isset($attributes['typoSTSize'])){
                    $css = $css . sprintf("font-size: %spx;", $attributes['typoSTSize']);
                }
                if(isset($attributes['typoSTWeight'])){
                    $css = $css . sprintf("font-weight: %s;", $attributes['typoSTWeight']);
                }
                if(isset($attributes['typoSTTransform'])){
                    $css = $css . sprintf("text-transform: %s;", $attributes['typoSTTransform']);
                }
    
                $css = $css . sprintf("line-height: %s;", ( isset($attributes['typoSTLineHeight']) && ($attributes['typoSTLineHeight'] != "normal")) ? $attributes['typoSTLineHeight'] . "px" : 'normal');
                $css = $css . sprintf("letter-spacing: %s;", ( isset($attributes['typoSTLetterSpacing']) && ($attributes['typoSTLetterSpacing'] != "normal")) ? $attributes['typoSTLetterSpacing'] . "px" : 'normal');
                $css = $css . sprintf("word-spacing: %s;", ( isset($attributes['typoSTWordSpacing']) && ($attributes['typoSTWordSpacing'] != "normal")) ? $attributes['typoSTWordSpacing'] . "px" : 'normal');

            $css = $css . "}";

        $css = $css . "}";

        


            
            //console.log(css)

        
            return $css;
        
        }


            

        



        

        else{
            return "";
        }

    }
}
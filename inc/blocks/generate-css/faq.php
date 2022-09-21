<?php

/**
 * Generate Text CSS.
 */
if(!function_exists("ga_generate_css_faq")){
    function ga_generate_css_faq( $attributes ){


        
        $css = "";
        if( isset($attributes['id']) ){
            
        $css = ".block-id-".$attributes['id'] . "{";
        if( isset($attributes['entranceAnimation']) ){
            if ($attributes['entranceAnimation'] != "none"){
                $css = $css . sprintf(".block-id-".$attributes['id'] . ".animateOnce {");
                $css = $css . sprintf("animation: %s %ss;", $attributes['entranceAnimation'], (isset($attributes['transitionTime'])) ? $attributes['transitionTime'] : '1');
                $css = $css . sprintf("}");
               
            }
        }
        $css = $css . "}";


        $css = $css . ".block-id-".$attributes['id'] . " .faq-block {";

            
            if( isset($attributes['effectNBorder']['left']) ){
                $css = $css . sprintf("border-left: %s %s %s;", $attributes['effectNBorder']['left']['width'], $attributes['effectNBorder']['left']['style'], $attributes['effectNBorder']['left']['color']);
            }
            
            if( isset($attributes['effectNBorder']['right']) ){
                $css = $css . sprintf("border-right: %s %s %s;", $attributes['effectNBorder']['right']['width'], $attributes['effectNBorder']['right']['style'], $attributes['effectNBorder']['right']['color']);
            }
            
            if( isset($attributes['effectNBorder']['top']) ){
                $css = $css . sprintf("border-top: %s %s %s;", $attributes['effectNBorder']['top']['width'], $attributes['effectNBorder']['top']['style'], $attributes['effectNBorder']['top']['color']);
            }
           
            if( isset($attributes['effectNBorder']['bottom']) ){
                $css = $css . sprintf("border-bottom: %s %s %s;", $attributes['effectNBorder']['bottom']['width'], $attributes['effectNBorder']['bottom']['style'], $attributes['effectNBorder']['bottom']['color']);
            }
            
                
            
            
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
            
            

            if( isset($attributes['spaceBwContainer'])){
                $css = $css . sprintf("margin-bottom: %s;", $attributes['spaceBwContainer']);
            }
            

            if( isset($attributes['effectNShadowHO']) && isset($attributes['effectNShadowVO']) && isset($attributes['effectNShadowBlur']) && isset($attributes['effectNShadowSpread']) && isset($attributes['effectNShadowColor'])){
                $css = $css . sprintf("box-shadow: %s %s %s %s %s;", $attributes['effectNShadowHO'], $attributes['effectNShadowVO'], $attributes['effectNShadowBlur'], $attributes['effectNShadowSpread'], $attributes['effectNShadowColor']);
            }
        
        $css = $css . "}";

        $css = $css . ".block-id-".$attributes['id'] . " .faq-head {
                ";
            if( isset($attributes['titleBgColor']) ){
                $css = $css . sprintf("background-color: %s;", $attributes['titleBgColor']);
                
            }

        
        $css = $css . "}";
            
        $css = $css . ".block-id-".$attributes['id'] . " .hide-button {";
            if( isset($attributes['iconColor']) ){
                $css = $css . sprintf("color: %s;", $attributes['iconColor']);
            }

            if(isset($attributes['iconAlign'])){
                $css = $css . sprintf("order: %s;", $attributes['iconAlign']);
            }
            
        $css = $css . "}";

        $css = $css . ".block-id-".$attributes['id'] . " .hide-button.active {";
            if( isset($attributes['iconActiveColor']) ){
                $css = $css . sprintf("color: %s;", $attributes['iconActiveColor']);
            }

            if(isset($attributes['iconAlign'])){
                $css = $css . sprintf("order: %s;", $attributes['iconAlign']);
            }
    
        $css = $css . "}";

        $css = $css . ".block-id-".$attributes['id'] . " .faq-question-container {  ";
            
            if( isset($attributes['titleColor']) ){
                $css = $css . sprintf("color: %s;", $attributes['titleColor']);
            }
        $css = $css . "}";

        $css = $css . ".block-id-".$attributes['id'] . " .faq-question-container.active {  ";
            
            if( isset($attributes['titleActiveColor']) ){
                $css = $css . sprintf("color: %s;", $attributes['titleActiveColor']);
            }
        $css = $css . "}";

        $css = $css . ".block-id-".$attributes['id'] . " .faq-question-container:hover {  ";
            
            if( isset($attributes['titleHoverColor']) ){
                $css = $css . sprintf("color: %s;", $attributes['titleColor']);
            }
            
        $css = $css . "}";

        $css = $css . ".block-id-".$attributes['id'] . " .faq-question-container.active:hover {  ";
            
            if( isset($attributes['titleHoverColor']) ){
                $css = $css . sprintf("color: %s;", $attributes['titleColor']);
            }
        $css = $css . "}";


        

        $css = $css . ".block-id-".$attributes['id'] . " .faq-question{
            margin: 0;";
            if( isset($attributes['titleTypoSize']) ){
                $css = $css . sprintf("font-size: %s;", $attributes['titleTypoSize'] . 'px');
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
            
            if( isset($attributes['titleTypoLineHeight']) ){
                $css = $css . sprintf("line-height: %s;", ($attributes['titleTypoLineHeight'] != 'normal' ) ? $attributes['titleTypoLineHeight'] . 'px' : 'normal');
            }

            if( isset($attributes['titleTypoLetterSpacing']) ){
                $css = $css . sprintf("letter-spacing: %s;", ($attributes['titleTypoLetterSpacing'] != 'normal' ) ? $attributes['titleTypoLetterSpacing'] . 'px' : 'normal');
            }
            
            if( isset($attributes['titleTypoWordSpacing']) ){
                $css = $css . sprintf("word-spacing: %s;", ($attributes['titleTypoWordSpacing'] != 'normal' ) ? $attributes['titleTypoWordSpacing'] . 'px' : 'normal');
            }
            
            if( isset($attributes['titleTypoFontFamily']) ){
                $css = $css . sprintf("font-family: %s;", $attributes['titleTypoFontFamily'] ? $attributes['titleTypoFontFamily'] : '');
            }

            if ( isset($attributes['titlePadding']) ) {
                $css = $css . sprintf("padding-left: %s;", $attributes['titlePadding']['left']);
                $css = $css . sprintf("padding-right: %s;", $attributes['titlePadding']['right']);
                $css = $css . sprintf("padding-top: %s;", $attributes['titlePadding']['top']);
                $css = $css . sprintf("padding-bottom: %s;", $attributes['titlePadding']['bottom']);
            }


        $css = $css . "}";

        $css = $css . ".block-id-".$attributes['id'] . " .faq-answer{
            ";
            if( isset($attributes['contentColor']) ){
                
                $css = $css . sprintf("color: %s;", $attributes['contentColor']);
            }
            
            if( isset($attributes['contentBgColor']) ){
                
                $css = $css . sprintf("background-color: %s;", $attributes['contentBgColor']);
            }
           

            if( isset($attributes['contentTypoSize']) ){
                $css = $css . sprintf("font-size: %s;", $attributes['contentTypoSize'] . 'px');
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
            
            if( isset($attributes['contentTypoLineHeight']) ){
                $css = $css . sprintf("line-height: %s;", ($attributes['contentTypoLineHeight'] != 'normal' ) ? $attributes['contentTypoLineHeight'] . 'px' : 'normal');
            }

            if( isset($attributes['contentTypoLetterSpacing']) ){
                $css = $css . sprintf("letter-spacing: %s;", ($attributes['contentTypoLetterSpacing'] != 'normal' ) ? $attributes['contentTypoLetterSpacing'] . 'px' : 'normal');
            }
            
            if( isset($attributes['contentTypoWordSpacing']) ){
                $css = $css . sprintf("word-spacing: %s;", ($attributes['contentTypoWordSpacing'] != 'normal' ) ? $attributes['contentTypoWordSpacing'] . 'px' : 'normal');
            }
            
            if( isset($attributes['contentTypoFontFamily']) ){
                $css = $css . sprintf("font-family: %s;", $attributes['contentTypoFontFamily'] ? $attributes['contentTypoFontFamily'] : '');
            }

            if ( isset($attributes['contentPadding']) ) {
                $css = $css . sprintf("padding-left: %s;", $attributes['contentPadding']['left']);
                $css = $css . sprintf("padding-right: %s;", $attributes['contentPadding']['right']);
                $css = $css . sprintf("padding-top: %s;", $attributes['contentPadding']['top']);
                $css = $css . sprintf("padding-bottom: %s;", $attributes['contentPadding']['bottom']);
            }

        $css = $css . "}";
        
        // echo sprintf("<script>console.log( `%s` );</script>", $css);
    }
        return $css;
    }
}
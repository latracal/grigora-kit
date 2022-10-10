<?php

/**
 * Generate Post Grid 1 CSS.
 */

if(!function_exists("ga_generate_css_post_grid_1")){
    function ga_generate_css_post_grid_1( $attributes ){
        $css = ".block-id-". $attributes['id'] . " .first-block-style, ";
        $css = $css . ".block-id-". $attributes['id'] . " .second-block-style, ";
        $css = $css . ".block-id-". $attributes['id'] . " .third-fourth-block-style {";
            if((isset($attributes['transitionColorTime']))) {
                $css = $css . sprintf("transition: %s;", $attributes['transitionColorTime'] . "s" );
            }
            $css = $css . sprintf("box-shadow: %s %s %s %s %s;",
                (isset($attributes['effectNShadowHO'])) ? $attributes['effectNShadowHO'] : '1px',
                (isset($attributes['effectNShadowVO'])) ? $attributes['effectNShadowVO'] : '7px',
                (isset($attributes['effectNShadowBlur'])) ? $attributes['effectNShadowBlur'] : '14px',
                (isset($attributes['effectNShadowSpread'])) ? $attributes['effectNShadowSpread'] : '-5px',
                (isset($attributes['effectNShadowColor'])) ? $attributes['effectNShadowColor'] : '#00000033',
            );
            if( isset($attributes['imageBorderRadius']) ){
                if( isset($attributes['imageBorderRadius']['topRight']) ){
                    $css = $css . sprintf("border-top-right-radius: %s;", $attributes['imageBorderRadius']['topRight']);
                }
                if( isset($attributes['imageBorderRadius']['topLeft']) ){
                    $css = $css . sprintf("border-top-left-radius: %s;", $attributes['imageBorderRadius']['topLeft']);
                }
                if( isset($attributes['imageBorderRadius']['bottomRight']) ){
                    $css = $css . sprintf("border-bottom-right-radius: %s;", $attributes['imageBorderRadius']['bottomRight']);
                }
                if( isset($attributes['imageBorderRadius']['bottomLeft']) ){
                    $css = $css . sprintf("border-bottom-left-radius: %s;", $attributes['imageBorderRadius']['bottomLeft']);
                }
            }
        $css = $css . "}";
        if(isset($attributes['elementsList']) && $attributes['elementsList']['elements']) {
            $array = $attributes['elementsList']['elements'];
            $css = $css . ".block-id-". $attributes['id'] . " .category-style {";
                $css = $css . "order: " . array_search('Category', $array) . ";";
            $css = $css . "}";
            $css = $css . ".block-id-". $attributes['id'] . " .title-container {";
                $css = $css . "order: " . array_search('Title', $array) . ";";
            $css = $css . "}";
            $css = $css . ".block-id-". $attributes['id'] . " .excerpt-style {";
                $css = $css . "order: " . array_search('Excerpt', $array) . ";";
            $css = $css . "}";
            $css = $css . ".block-id-". $attributes['id'] . " .meta-style {";
                $css = $css . "order: " . array_search('Meta', $array) . ";";
            $css = $css . "}";
        }
        $css = $css . ".block-id-". $attributes['id'] . " .first-style {";
            $css = $css . sprintf("gap: %s;", 
                (isset($attributes['gap'])) ? $attributes['gap'] . "px" : ''
            );
            $css = $css . sprintf("height: %s;", 
                (isset($attributes['contHeight'])) ? $attributes['contHeight'] . "px" : ''
            );
            $css = $css . sprintf("text-align: %s;", 
                (isset($attributes['align'])) ? $attributes['align'] : 'start'
            );
        $css = $css . "}";
        $css = $css . ".block-id-". $attributes['id'] . " .meta-style {";
            $css = $css . sprintf("justify-content: %s;", 
                (isset($attributes['align'])) ? $attributes['align'] : 'start'
            );
        $css = $css . "}";
        $css = $css . ".block-id-". $attributes['id'] . " .middle-style {";
            $css = $css . sprintf("gap: %s;", 
                (isset($attributes['gap'])) ? $attributes['gap'] . "px" : ''
            );
        $css = $css . "}";
        $css = $css . ".block-id-". $attributes['id'] . " .last-style {";
            $css = $css . sprintf("gap: %s;", 
                (isset($attributes['gap'])) ? $attributes['gap'] . "px" : ''
            );
        $css = $css . "}";
        $css = $css . ".block-id-". $attributes['id'] . " .img-style {";
            if( isset($attributes["cssFilters"]) ){
                $css = $css . sprintf("filter: blur(%spx) brightness(%s) contrast(%s) saturate(%s) hue-rotate(%sdeg);",
                isset($attributes["cssFilters"]["blur"]) ? $attributes["cssFilters"]["blur"] : "0",
                isset($attributes["cssFilters"]["brightness"]) ? $attributes["cssFilters"]["brightness"] . "%" : "100%",
                isset($attributes["cssFilters"]["contrast"]) ? $attributes["cssFilters"]["contrast"] . "%" : "100%",
                isset($attributes["cssFilters"]["saturation"]) ? $attributes["cssFilters"]["saturation"] . "%" : "100%",
                isset($attributes["cssFilters"]["hue"]) ? $attributes["cssFilters"]["hue"] : "0"
                );
            }
        $css = $css . "}";
        $css = $css . ".block-id-". $attributes['id'] . " .title-style {";
            if( isset($attributes['titleTextColor']) && $attributes['titleTextColor'] ) {
                $css = $css . sprintf("color: %s;", $attributes['titleTextColor']);
            }
            if( isset($attributes['bgColor']) && $attributes['bgColor'] ) {
                $css = $css . sprintf("background-color: %s;", $attributes['bgColor']);
            }
        $css = $css . "}";
        $css = $css . ".block-id-". $attributes['id'] . " .category-style {";
            if( isset($attributes['categoryTextColor']) && $attributes['categoryTextColor'] ) {
                $css = $css . sprintf("color: %s;", $attributes['categoryTextColor']);
            }
            if( isset($attributes['bgCatColor']) && $attributes['bgCatColor'] ) {
                $css = $css . sprintf("background-color: %s;", $attributes['bgCatColor']);
            }
            if( isset($attributes['catBorderRadius']) ){
                if( isset($attributes['catBorderRadius']['topRight']) ){
                    $css = $css . sprintf("border-top-right-radius: %s;", $attributes['catBorderRadius']['topRight']);
                }
                if( isset($attributes['catBorderRadius']['topLeft']) ){
                    $css = $css . sprintf("border-top-left-radius: %s;", $attributes['catBorderRadius']['topLeft']);
                }
                if( isset($attributes['catBorderRadius']['bottomRight']) ){
                    $css = $css . sprintf("border-bottom-right-radius: %s;", $attributes['catBorderRadius']['bottomRight']);
                }
                if( isset($attributes['catBorderRadius']['bottomLeft']) ){
                    $css = $css . sprintf("border-bottom-left-radius: %s;", $attributes['catBorderRadius']['bottomLeft']);
                }
            }
            if( isset($attributes['layoutCatPadding']) ){
                if( isset($attributes['layoutCatPadding']['left']) ){
                    $css = $css . sprintf("padding-left: %s;", $attributes['layoutCatPadding']['left']);
                }
                if( isset($attributes['layoutCatPadding']['right']) ){
                    $css = $css . sprintf("padding-right: %s;", $attributes['layoutCatPadding']['right']);
                }
                if( isset($attributes['layoutCatPadding']['top']) ){
                    $css = $css . sprintf("padding-top: %s;", $attributes['layoutCatPadding']['top']);
                }
                if( isset($attributes['layoutCatPadding']['bottom']) ){
                    $css = $css . sprintf("padding-bottom: %s;", $attributes['layoutCatPadding']['bottom']);
                }
            }
        $css = $css . "}";
        $css = $css . ".block-id-". $attributes['id'] . " .overlay-style {";
            if( isset($attributes['overlayColor']) && $attributes['overlayColor'] ) {
                $css = $css . sprintf("background-color: %s;", $attributes['overlayColor']);
            }
            if( isset($attributes['overlayGradient']) && $attributes['overlayGradient'] ) {
                $css = $css . sprintf("background: %s;", $attributes['overlayGradient']);
            }
            if( (isset($attributes['overlayColor']) && $attributes['overlayColor']) || (isset($attributes['overlayGradient']) && $attributes['overlayGradient']) ) {
                $css = $css . sprintf("opacity: calc(%s / 100);", 
                    (isset($attributes['overlayOpacity'])) ? $attributes['overlayOpacity'] : '40'
                );
            }
        $css = $css . "}";
        $css = $css . ".block-id-". $attributes['id'] . " .cat-container {";
            $css = $css . sprintf("text-align: %s;", 
                (isset($attributes['align'])) ? $attributes['align'] : 'start'
            );
        $css = $css . "}";
        $css = $css . ".block-id-". $attributes['id'] . " .excerpt-style {";
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
        $css = $css . "}";  
        $css = $css . ".block-id-".$attributes['id'] . " .title1-style {";
            if( isset($attributes['title1TypoSize']) ){
                $css = $css . sprintf("font-size: %spx;", $attributes['title1TypoSize']);
            }
            if( isset($attributes['title1TypoWeight']) ){
                $css = $css . sprintf("font-weight: %s;", $attributes['title1TypoWeight']);
            }
            if( isset($attributes['title1TypoTransform']) ){
                $css = $css . sprintf("text-transform: %s;", $attributes['title1TypoTransform']);
            }
            if( isset($attributes['title1TypoStyle']) ){
                $css = $css . sprintf("font-style: %s;", $attributes['title1TypoStyle']);
            }
            if( isset($attributes['title1TypoDecoration']) ){
                $css = $css . sprintf("text-decoration: %s;", $attributes['title1TypoDecoration']);
            }
            $css = $css . sprintf("line-height: %s;", ( isset($attributes['title1TypoLineHeight']) && ($attributes['title1TypoLineHeight'] != "normal")) ? $attributes['title1TypoLineHeight'] . "px" : 'normal');
            $css = $css . sprintf("letter-spacing: %s;", ( isset($attributes['title1TypoLetterSpacing']) && ($attributes['title1TypoLetterSpacing'] != "normal")) ? $attributes['title1TypoLetterSpacing'] . "px" : 'normal');
            $css = $css . sprintf("word-spacing: %s;", ( isset($attributes['title1TypoWordSpacing']) && ($attributes['title1TypoWordSpacing'] != "normal")) ? $attributes['title1TypoWordSpacing'] . "px" : 'normal');
            if( isset($attributes['title1TypoFontFamily']) && isset($attributes['title1TypoFontFamily']) ){
                $css = $css . sprintf("font-family: %s;", $attributes['title1TypoFontFamily']);
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
        $css = $css . "}";  
        $css = $css . ".block-id-".$attributes['id'] . " .title234-style {";
            if( isset($attributes['title234TypoSize']) ){
                $css = $css . sprintf("font-size: %spx;", $attributes['title234TypoSize']);
            }
            if( isset($attributes['title234TypoWeight']) ){
                $css = $css . sprintf("font-weight: %s;", $attributes['title234TypoWeight']);
            }
            if( isset($attributes['title234TypoTransform']) ){
                $css = $css . sprintf("text-transform: %s;", $attributes['title234TypoTransform']);
            }
            if( isset($attributes['title234TypoStyle']) ){
                $css = $css . sprintf("font-style: %s;", $attributes['title234TypoStyle']);
            }
            if( isset($attributes['title234TypoDecoration']) ){
                $css = $css . sprintf("text-decoration: %s;", $attributes['title234TypoDecoration']);
            }
            $css = $css . sprintf("line-height: %s;", ( isset($attributes['title234TypoLineHeight']) && ($attributes['title234TypoLineHeight'] != "normal")) ? $attributes['title234TypoLineHeight'] . "px" : 'normal');
            $css = $css . sprintf("letter-spacing: %s;", ( isset($attributes['title234TypoLetterSpacing']) && ($attributes['title234TypoLetterSpacing'] != "normal")) ? $attributes['title234TypoLetterSpacing'] . "px" : 'normal');
            $css = $css . sprintf("word-spacing: %s;", ( isset($attributes['title234TypoWordSpacing']) && ($attributes['title234TypoWordSpacing'] != "normal")) ? $attributes['title234TypoWordSpacing'] . "px" : 'normal');
            if( isset($attributes['title234TypoFontFamily']) && isset($attributes['title234TypoFontFamily']) ){
                $css = $css . sprintf("font-family: %s;", $attributes['title234TypoFontFamily']);
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
        $css = $css . "}";  
        // category hover
        $css = $css . ".block-id-". $attributes['id'] . " .category-style:hover {";
            if( isset($attributes['categoryTextHColor']) && $attributes['categoryTextHColor'] ) {
                $css = $css . sprintf("color: %s;", $attributes['categoryTextHColor']);
            }
            if( isset($attributes['bgHCatColor']) && $attributes['bgHCatColor'] ) {
                $css = $css . sprintf("background-color: %s;", $attributes['bgHCatColor']);
            }
        $css = $css . "}";
        // title hover
        $css = $css . ".block-id-". $attributes['id'] . " .first-block-style:hover .title-style, ";
        $css = $css . ".block-id-". $attributes['id'] . " .second-block-style:hover .title-style, ";
        $css = $css . ".block-id-". $attributes['id'] . " .third-fourth-block-style:hover .title-style {";
            if( isset($attributes['titleTextHColor']) && $attributes['titleTextHColor'] ) {
                $css = $css . sprintf("color: %s;", $attributes['titleTextHColor']);
            }
            if( isset($attributes['bgHColor']) && $attributes['bgHColor'] ) {
                $css = $css . sprintf("background-color: %s;", $attributes['bgHColor']);
            }
        $css = $css . "}";  
        //img-hover
        $css = $css . ".block-id-". $attributes['id'] . " .first-block-style:hover .img-style, ";
        $css = $css . ".block-id-". $attributes['id'] . " .second-block-style:hover .img-style, ";
        $css = $css . ".block-id-". $attributes['id'] . " .third-fourth-block-style:hover .img-style {";
            if( isset($attributes['hoverAnimation']) && $attributes['hoverAnimation'] && $attributes['hoverAnimation'] != 'none' ){
                if( $attributes['hoverAnimation'] == 'zoomIn' ) {
                    $css = $css . "transform: scale(1.1);";
                } elseif( $attributes['hoverAnimation'] == 'zoomOut' ) {
                    $css = $css . "transform: scale(1.3);";
                } elseif( $attributes['hoverAnimation'] == 'opacity' ) {
                    $css = $css . "opacity: 0.7;";
                } elseif( $attributes['hoverAnimation'] == 'rotateLeft' ) {
                    $css = $css . "transform: rotate(-5deg) scale(1.2);";
                } elseif( $attributes['hoverAnimation'] == 'rotateRight' ) {
                    $css = $css . "transform: rotate(5deg) scale(1.2);";
                } elseif( $attributes['hoverAnimation'] == 'slideLeft' ) {
                    $css = $css . "transform: translateX(8%) scale(1.2);";
                } elseif( $attributes['hoverAnimation'] == 'slideRight' ) {
                    $css = $css . "transform: translateX(-8%) scale(1.2);";
                }
            }
            if( isset($attributes["cssHFilters"]) ){
                $css = $css . sprintf("filter: blur(%spx) brightness(%s) contrast(%s) saturate(%s) hue-rotate(%sdeg);",
                isset($attributes["cssHFilters"]["blur"]) ? $attributes["cssHFilters"]["blur"] : "0",
                isset($attributes["cssHFilters"]["brightness"]) ? $attributes["cssHFilters"]["brightness"] . "%" : "100%",
                isset($attributes["cssHFilters"]["contrast"]) ? $attributes["cssHFilters"]["contrast"] . "%" : "100%",
                isset($attributes["cssHFilters"]["saturation"]) ? $attributes["cssHFilters"]["saturation"] . "%" : "100%",
                isset($attributes["cssHFilters"]["hue"]) ? $attributes["cssHFilters"]["hue"] : "0"
                );
            }
        $css = $css . "}";
        //box-shadow hover
        $css = $css . ".block-id-". $attributes['id'] . " .second-block-style:hover {";
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
        $css = $css . ".block-id-". $attributes['id'] . " .first-block-style:hover {";
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
        $css = $css . ".block-id-". $attributes['id'] . " .third-fourth-block-style:hover {";
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
        return $css;
    }
}

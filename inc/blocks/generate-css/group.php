<?php

/**
 * Generate Group CSS for Group.
 */
if(!function_exists("ga_generate_css_group")){
    function ga_generate_css_group( $attributes ){
        $css = ".block-id-".$attributes['id'] . "{";
            if( isset($attributes['verticalAlignment']) ){
            if( $attributes['verticalAlignment'] == "top" ){
                $css = $css . "display: flex; align-items: flex-start;";
            }
            if( $attributes['verticalAlignment'] == "center" ){
                $css = $css . "display: flex; align-items: center;";
            }
            if( $attributes['verticalAlignment'] == "bottom" ){
                $css = $css . "display: flex; align-items: flex-end;";
            }
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
        if( isset($attributes['align']) && $attributes['align'] ){
            if( isset($attributes['verticalAlignment']) && $attributes['verticalAlignment'] ){
                $css = $css . sprintf( "justify-content: %s;", $attributes['align'] );
            }
            else{
                $css = $css . sprintf( "text-align: %s;", $attributes['align'] );
            }
        }
        if( isset($attributes['textNColor']) && $attributes['textNColor'] ){
            $css = $css . sprintf("color: %s;", $attributes['textNColor']);
        }
        if( isset($attributes['structureMaxWidth']) && $attributes['structureMaxWidth'] ){
            $css = $css . sprintf("max-width: %s;", $attributes['structureMaxWidth']);
        }
        if( isset($attributes['structureMinHeight']) && $attributes['structureMinHeight'] ){
            $css = $css . sprintf("min-height: %s;", $attributes['structureMinHeight']);
        }
        $css = $css . sprintf("transition: %ss;", isset($attributes['transitionTime']) ? $attributes['transitionTime'] : 1);
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
        if( 
            ( isset($attributes['backgroundFixed']) && $attributes['backgroundFixed'] ) || 
            ( isset($attributes['backgroundOFixed']) && $attributes['backgroundOFixed'] )
         ){;}
         else{
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
        }
        $css = $css . sprintf("box-shadow: %s %s %s %s %s;",
            (isset($attributes['effectNShadowHO'])) ? $attributes['effectNShadowHO'] : '0px',
            (isset($attributes['effectNShadowVO'])) ? $attributes['effectNShadowVO'] : '0px',
            (isset($attributes['effectNShadowBlur'])) ? $attributes['effectNShadowBlur'] : '0px',
            (isset($attributes['effectNShadowSpread'])) ? $attributes['effectNShadowSpread'] : '0px',
            (isset($attributes['effectNShadowColor'])) ? $attributes['effectNShadowColor'] : '#000',
        );
        $css = $css . "}";
        if( isset($attributes["layoutGap"]) && $attributes["layoutGap"] ){
            $css = $css . ".block-id-".$attributes['id'] . " .inner-content > * + * {";
            $css = $css . sprintf("margin-block-start: %s;", $attributes["layoutGap"]);
            $css = $css . "}";
        }
        if( isset($attributes['linkNColor']) && $attributes['linkNColor'] ){
            $css = $css . ".block-id-".$attributes['id'] . " a {";
            $css = $css . sprintf("color: %s;", $attributes['linkNColor']);
            $css = $css . "}";
        }
        if( isset($attributes['textHColor']) && $attributes['textHColor'] ){
            $css = $css . ".block-id-".$attributes['id'] . ":hover {";
            $css = $css . sprintf("color: %s;", $attributes['textHColor']);
            $css = $css . "}";
        }
        if( isset($attributes['linkHColor']) && $attributes['linkHColor'] ){
            $css = $css . ".block-id-".$attributes['id'] . ":hover a {";
            $css = $css . sprintf("color: %s;", $attributes['linkHColor']);
            $css = $css . "}";
        }
        if( isset($attributes['hoverEffect']) && $attributes['hoverEffect'] ){
            $css = $css . ".block-id-" . $attributes['id'] . ":hover{";
            if( isset($attributes['effectNBFlag']) && !$attributes['effectNBFlag'] && isset($attributes['effectHBColor']) ){
                $css = $css . sprintf("background-color: %s;", $attributes['effectHBColor']);
            }
            if( !isset($attributes['effectNBFlag']) && isset($attributes['effectHBColor']) ){
                $css = $css . sprintf("background-color: %s;", $attributes['effectHBColor']);
            }
            if( isset($attributes['effectHAnimation']) && $attributes['effectHAnimation'] != 'none' ){
                $css = $css . sprintf("animation: %s %ss;", $attributes['effectHAnimation'], (isset($attributes['transitionTime'])) ? $attributes['transitionTime'] : '1');
            }
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
                ( isset($attributes['backgroundFixed']) && $attributes['backgroundFixed'] ) || 
                ( isset($attributes['backgroundOFixed']) && $attributes['backgroundOFixed'] )
             ){;}
             else{
                 $css = $css . sprintf("transform: rotateX(%s) rotateY(%s) rotateZ(%s) skewX(%s) skewY(%s) translateX(%s) translateY(%s) scale(%s);",
                         (isset($attributes['effectHRotateX'])) ? $attributes['effectHRotateX'] : '0deg',
                         (isset($attributes['effectHRotateY'])) ? $attributes['effectHRotateY'] : '0deg',
                         (isset($attributes['effectHRotateZ'])) ? $attributes['effectHRotateZ'] : '0deg',
                         (isset($attributes['effectHSkewX']) && $attributes['effectHSkewX']) ? $attributes['effectHSkewX'] : '0deg',
                         (isset($attributes['effectHSkewY']) && $attributes['effectHSkewY']) ? $attributes['effectHSkewY'] : '0deg',
                         (isset($attributes['effectHOffsetX'])) ? $attributes['effectHOffsetX'] : '0',
                         (isset($attributes['effectHOffsetY'])) ? $attributes['effectHOffsetY'] : '0',
                         (isset($attributes['effectHScale'])) ? $attributes['effectHScale'] : '1',
                 );
             }
            $css = $css . sprintf("box-shadow: %s %s %s %s %s;",
                (isset($attributes['effectHShadowHO'])) ? $attributes['effectHShadowHO'] : '0px',
                (isset($attributes['effectHShadowVO'])) ? $attributes['effectHShadowVO'] : '0px',
                (isset($attributes['effectHShadowBlur'])) ? $attributes['effectHShadowBlur'] : '0px',
                (isset($attributes['effectHShadowSpread'])) ? $attributes['effectHShadowSpread'] : '0px',
                (isset($attributes['effectHShadowColor'])) ? $attributes['effectHShadowColor'] : '#000',
            );
            $css = $css . "}";

        }

        $css = $css . ".block-id-".$attributes['id'] . ".animateOnce {";
            if( isset($attributes['entranceAnimation']) && $attributes['entranceAnimation'] != 'none' ){
                $css = $css . "animation: " . $attributes['entranceAnimation'] . " 1s";
            }
        $css = $css . "}";

        if( isset($attributes['backgroundNMode']) && $attributes['backgroundNMode'] ){
            if( $attributes['backgroundNMode'] == "color" && isset($attributes['backgroundNColor']) && $attributes['backgroundNColor'] ){
                $css = $css . ".block-id-".$attributes['id'] . " .background-color {background-color: ".$attributes['backgroundNColor'].";}";
            }
            if( $attributes['backgroundNMode'] == "gradient" ){
                $css = $css . ".block-id-".$attributes['id'] . sprintf(" .background-color {background-image: %s; background-attachment: %s;}", 
                (isset($attributes['backgroundNGradient']) && $attributes['backgroundNGradient']) ? $attributes['backgroundNGradient'] : 'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)',
                (isset($attributes['backgroundFixed']) && $attributes['backgroundFixed']) ? 'fixed' : '',
            );
            }
            if( $attributes['backgroundNMode'] == "images" ){
                if( isset($attributes['images']) && count($attributes['images']) > 1 ){
                    $css = $css . ".block-id-".$attributes['id'] . " .grigora-group-slideshow li span {";
                    $css = $css . sprintf( "background-attachment: %s;", 
                        isset($attributes["backgroundFixed"]) && $attributes["backgroundFixed"] ? "fixed" : ""
                    );
                    $css = $css . "-webkit-backface-visibility: hidden;";
                    $animation_str = sprintf("imageAnimation-%s %ss linear %s 0s %s",
                    $attributes['id'],
                    isset($attributes["imageDuration"]) ? count($attributes["images"])*$attributes["imageDuration"] : count($attributes["images"])*5,
                    isset($attributes["imageLoop"]) ? ($attributes["imageLoop"] ? "infinite" : "1") : "infinite",
                    isset($attributes["imageLoop"]) ? ($attributes["imageLoop"] ? "" : "forwards") : "",
                    );
                    $css = $css . "-webkit-animation: " . $animation_str . ";";
                    $css = $css . "-moz-animation: " . $animation_str . ";";
                    $css = $css . "-o-animation: " . $animation_str . ";";
                    $css = $css . "-ms-animation: " . $animation_str . ";";
                    $css = $css . "animation: " . $animation_str . ";";
                    if(isset($attributes["imageTransition"])){
                        if($attributes["imageTransition"] == "fade"){
                            $css = $css . "opacity: 0;";
                        }
                        else{
                            $css = $css . "opacity: 1;";
                        }
                        if($attributes["imageTransition"] == "slideright"){
                            $css = $css . "transform: translateX(-100%);";
                        }
                        if($attributes["imageTransition"] == "slideleft"){
                            $css = $css . "transform: translateX(100%);";
                        }
                        if($attributes["imageTransition"] == "slideup"){
                            $css = $css . "transform: translateY(100%);";
                        }
                        if($attributes["imageTransition"] == "slidedown"){
                            $css = $css . "transform: translateY(-100%);";
                        }
                    }
                    else{
                        $css = $css . "opacity: 0;";
                    }
                    $css = $css . "}";

                    foreach($attributes["images"] as $key => $value){
                        $css = $css .  " .block-id-".$attributes['id'] . " .grigora-group-slideshow li:nth-child(" . ($key + 1) . ") span {";
                            $css = $css . sprintf("background-position: %s %s;", 
                            (isset($attributes['imageFocus']["x"]) && $attributes['imageFocus']["x"]) ? $attributes['imageFocus']['x']*100 . "%" : '50%',
                            (isset($attributes['imageFocus']["y"]) && $attributes['imageFocus']["y"]) ? $attributes['imageFocus']['y']*100 . "%" : '50%',
                            );
                            $css = $css . sprintf("background-image: url(%s);", 
                            isset($value["url"]) ? $value["url"] : ""
                            );
                            $delay = $key * (isset($attributes["imageDuration"]) ? $attributes["imageDuration"] : 5) . "s";
                            $css = $css . "-webkit-animation-delay: " . $delay . ";";
                            $css = $css . "-moz-animation-delay: " . $delay . ";";
                            $css = $css . "-o-animation-delay: " . $delay . ";";
                            $css = $css . "-ms-animation-delay: " . $delay . ";";
                            $css = $css . "animation-delay: " . $delay . ";";
                        $css = $css .  "} ";
                    }

                    $imageTransition = (isset($attributes["imageTransition"]) ? $attributes["imageTransition"] : "fade");
                    $imageTransitionDuration = (isset($attributes["imageTransitionDuration"]) ? $attributes["imageTransitionDuration"] : 0.5);
                    $imageDuration = (isset($attributes["imageDuration"]) ? $attributes["imageDuration"] : 5);
                    $imageLoop = isset($attributes["imageLoop"]) ? $attributes["imageLoop"] : true;

                    $css = $css . "@keyframes imageAnimation-" . $attributes['id'] . " {";
                    if($imageTransition == "fade"){
                        $css = $css . "0% { opacity: 0; }";
                    }
                    else if($imageTransition == "slideright"){
                        $css = $css . "0% { transform: translateX(-100%); }";
                    }
                    else if($imageTransition == "slideleft"){
                        $css = $css . "0% { transform: translateX(100%); }";
                    }
                    else if($imageTransition == "slideup"){
                        $css = $css . "0% { transform: translateY(100%); }";
                    }
                    else if($imageTransition == "slidedown"){
                        $css = $css . "0% { transform: translateY(-100%); }";
                    }
                    $css = $css . number_format($imageTransitionDuration*100/(count($attributes["images"])*$imageDuration), 2, '.', '') . "% {";
                        if($imageTransition == "fade"){
                            $css = $css . "opacity: 1;";
                        }
                        else if($imageTransition == "slideright"){
                            $css = $css . "transform: translateX(0%);";
                        }
                        else if($imageTransition == "slideleft"){
                            $css = $css . "transform: translateX(0%);";
                        }
                        else if($imageTransition == "slideup"){
                            $css = $css . "transform: translateY(0%);";
                        }
                        else if($imageTransition == "slidedown"){
                            $css = $css . "transform: translateY(0%);";
                        }
                    $css = $css .  "} ";
                    $css = $css . number_format(($imageTransitionDuration + $imageDuration)*100/(count($attributes["images"])*$imageDuration), 2, '.', '') . "% {";
                        if($imageTransition == "fade"){
                            $css = $css . "opacity: 1;";
                        }
                        else if($imageTransition == "slideright"){
                            $css = $css . "transform: translateX(0%);";
                        }
                        else if($imageTransition == "slideleft"){
                            $css = $css . "transform: translateX(0%);";
                        }
                        else if($imageTransition == "slideup"){
                            $css = $css . "transform: translateY(0%);";
                        }
                        else if($imageTransition == "slidedown"){
                            $css = $css . "transform: translateY(0%);";
                        }
                    $css = $css .  "} ";
                    $css = $css . number_format(($imageTransitionDuration*2 + $imageDuration)*100/(count($attributes["images"])*$imageDuration), 2, '.', '') . "% {";
                        if($imageTransition == "fade"){
                            if($imageLoop){
                                $css = $css . "opacity: 0;";
                            }
                            else{
                                $css = $css . "opacity: 1;";
                            }
                        }
                        else if($imageTransition == "slideright"){
                            if($imageLoop){
                                $css = $css . "transform: translateX(100%);";
                            }
                            else{
                                $css = $css . "transform: translateX(0%);";
                            }
                        }
                        else if($imageTransition == "slideleft"){
                            if($imageLoop){
                                $css = $css . "transform: translateX(-100%);";
                            }
                            else{
                                $css = $css . "transform: translateX(0%);";
                            }
                        }
                        else if($imageTransition == "slideup"){
                            if($imageLoop){
                                $css = $css . "transform: translateY(-100%);";
                            }
                            else{
                                $css = $css . "transform: translateY(0%);";
                            }
                        }
                        else if($imageTransition == "slidedown"){
                            if($imageLoop){
                                $css = $css . "transform: translateY(100%);";
                            }
                            else{
                                $css = $css . "transform: translateY(0%);";
                            }
                        }
                    $css = $css .  "} ";
                    $css = $css . "100% {";
                        if($imageTransition == "fade"){
                            if($imageLoop){
                                $css = $css . "opacity: 0;";
                            }
                            else{
                                $css = $css . "opacity: 1;";
                            }
                        }
                        else if($imageTransition == "slideright"){
                            if($imageLoop){
                                $css = $css . "transform: translateX(100%);";
                            }
                            else{
                                $css = $css . "transform: translateX(0%);";
                            }
                        }
                        else if($imageTransition == "slideleft"){
                            if($imageLoop){
                                $css = $css . "transform: translateX(-100%);";
                            }
                            else{
                                $css = $css . "transform: translateX(0%);";
                            }
                        }
                        else if($imageTransition == "slideup"){
                            if($imageLoop){
                                $css = $css . "transform: translateY(-100%);";
                            }
                            else{
                                $css = $css . "transform: translateY(0%);";
                            }
                        }
                        else if($imageTransition == "slidedown"){
                            if($imageLoop){
                                $css = $css . "transform: translateY(100%);";
                            }
                            else{
                                $css = $css . "transform: translateY(0%);";
                            }
                        }
                    $css = $css .  "} ";
                    $css = $css .  "} ";
                }
                else if(isset($attributes['images']) && count($attributes['images']) == 1){
                    $css = $css . ".block-id-".$attributes['id'] . " .grigora-group-slideshow li:nth-child(1) span {";
                    $css = $css . sprintf("background-position: %s %s;", 
                    (isset($attributes['imageFocus']["x"]) && $attributes['imageFocus']["x"]) ? $attributes['imageFocus']['x']*100 . "%" : '50%',
                    (isset($attributes['imageFocus']["y"]) && $attributes['imageFocus']["y"]) ? $attributes['imageFocus']['y']*100 . "%" : '50%',
                    );
                    $css = $css . sprintf("background-image: url(%s);", 
                            isset($attributes["images"][0]["url"]) ? $attributes["images"][0]["url"] : ""
                            );
                    $css = $css . sprintf( "background-attachment: %s;", 
                            isset($attributes["backgroundFixed"]) && $attributes["backgroundFixed"] ? "fixed" : ""
                        );
                    $css = $css . "}";

                }
            }
        }

        if( isset($attributes['backgroundHMode']) && $attributes['backgroundHMode'] ){
            $css = $css . ".block-id-".$attributes['id'] . " .background-hover-color { opacity: 0;";
            $css = $css . sprintf( "transition: %ss; background-attachment: %s;", 
                        isset($attributes["backgroundHTransitionTime"]) && $attributes["backgroundHTransitionTime"] ? $attributes["backgroundHTransitionTime"] : "1", 
                        isset($attributes["backgroundFixed"]) && $attributes["backgroundFixed"] ? "fixed" : ""
            );
            if( $attributes['backgroundHMode'] == "color" && isset($attributes['backgroundHColor']) && $attributes['backgroundHColor'] ){
                $css = $css . "background-color: ".$attributes['backgroundHColor'].";";
            }
            if( $attributes['backgroundHMode'] == "gradient" ){
                $css = $css . sprintf("background-image: %s;", 
                (isset($attributes['backgroundHGradient']) && $attributes['backgroundHGradient']) ? $attributes['backgroundHGradient'] : 'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)');
            }
            if( $attributes['backgroundHMode'] == "image" ){
                $css = $css . sprintf("background-image: url(%s);", 
                (isset($attributes['imageH']["url"]) && $attributes['imageH']["url"]) ? $attributes['imageH']['url'] : ''
                );
                $css = $css . sprintf("background-position: %s %s;", 
                (isset($attributes['imageHFocus']["x"]) && $attributes['imageHFocus']["x"]) ? $attributes['imageHFocus']['x']*100 . "%" : '50%',
                (isset($attributes['imageHFocus']["y"]) && $attributes['imageHFocus']["y"]) ? $attributes['imageHFocus']['y']*100 . "%" : '50%',
                );
            }
            $css = $css . "}";
            $css = $css . ".block-id-".$attributes['id'] . ":hover .background-hover-color {opacity:1;}";
        }

        if( isset($attributes['backgroundOMode']) && $attributes['backgroundOMode'] ){
            $css = $css . ".block-id-".$attributes['id'] . " .background-overlay {";
            $css = $css . sprintf( "transition: %ss; background-attachment: %s;", 
                        isset($attributes["backgroundOHTransitionTime"]) && $attributes["backgroundOHTransitionTime"] ? $attributes["backgroundOHTransitionTime"] : "1", 
                        isset($attributes["backgroundOFixed"]) && $attributes["backgroundOFixed"] ? "fixed" : ""
            );
            if( $attributes['backgroundOMode'] == "color" ){
                $css = $css . sprintf("background-color: %s;",
                isset($attributes['backgroundOColor']) && $attributes['backgroundOColor'] ? $attributes['backgroundOColor'] : "#fff"
            );
            }
            if( $attributes['backgroundOMode'] == "gradient" ){
                $css = $css . sprintf("background-image: %s;", 
                (isset($attributes['backgroundOGradient']) && $attributes['backgroundOGradient']) ? $attributes['backgroundOGradient'] : 'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)');
            }
            if( $attributes['backgroundOMode'] == "image" ){
                $css = $css . sprintf("background-image: url(%s);", 
                (isset($attributes['imageO']["url"]) && $attributes['imageO']["url"]) ? $attributes['imageO']['url'] : ''
                );
            }
            if( isset($attributes["backgroundOCSS"]) ){
                $css = $css . sprintf("filter: blur(%spx) brightness(%s) contrast(%s) saturate(%s) hue-rotate(%sdeg);",
                isset($attributes["backgroundOCSS"]["blur"]) ? $attributes["backgroundOCSS"]["blur"] : "0",
                isset($attributes["backgroundOCSS"]["brightness"]) ? $attributes["backgroundOCSS"]["brightness"] . "%" : "100%",
                isset($attributes["backgroundOCSS"]["contrast"]) ? $attributes["backgroundOCSS"]["contrast"] . "%" : "100%",
                isset($attributes["backgroundOCSS"]["saturation"]) ? $attributes["backgroundOCSS"]["saturation"] . "%" : "100%",
                isset($attributes["backgroundOCSS"]["hue"]) ? $attributes["backgroundOCSS"]["hue"] : "0"
            );
            $css = $css . sprintf( "opacity: %s;", isset($attributes["backgroundOOpacity"]) ? $attributes["backgroundOOpacity"] : "0.5" );
            }
            $css = $css . "}";
        }

        if( isset($attributes['backgroundOHMode']) && $attributes['backgroundOHMode'] ){
            $css = $css . ".block-id-".$attributes['id'] . ":hover .background-overlay {";
            if( $attributes['backgroundOHMode'] == "color" && isset($attributes['backgroundOHColor']) && $attributes['backgroundOHColor'] ){
                $css = $css . "background-color: ".$attributes['backgroundOHColor'].";";
            }
            if( $attributes['backgroundOHMode'] == "gradient" ){
                $css = $css . sprintf("background-image: %s;", 
                (isset($attributes['backgroundOHGradient']) && $attributes['backgroundOHGradient']) ? $attributes['backgroundOHGradient'] : 'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)');
            }
            if( $attributes['backgroundOHMode'] == "image" ){
                $css = $css . sprintf("background-image: %s;", 
                (isset($attributes['imageOH']["url"]) && $attributes['imageOH']["url"]) ? $attributes['imageOH']['url'] : ''
                );
            }
            if( isset($attributes["backgroundOHCSS"]) ){
                $css = $css . sprintf("filter: blur(%spx) brightness(%s) contrast(%s) saturate(%s) hue-rotate(%sdeg);",
                isset($attributes["backgroundOHCSS"]["blur"]) ? $attributes["backgroundOHCSS"]["blur"] : "0",
                isset($attributes["backgroundOHCSS"]["brightness"]) ? $attributes["backgroundOHCSS"]["brightness"] . "%" : "100%",
                isset($attributes["backgroundOHCSS"]["contrast"]) ? $attributes["backgroundOHCSS"]["contrast"] . "%" : "100%",
                isset($attributes["backgroundOHCSS"]["saturation"]) ? $attributes["backgroundOHCSS"]["saturation"] . "%" : "100%",
                isset($attributes["backgroundOHCSS"]["hue"]) ? $attributes["backgroundOHCSS"]["hue"] : "0",
            );
            $css = $css . sprintf( "opacity: %s;", isset($attributes["backgroundOHOpacity"]) ? $attributes["backgroundOHOpacity"] : "0.5" );
            }
            $css = $css . "}";
        }


        
        return $css;
    }
}

/**
 * Return a complete css for specific group block.
 */
if(!function_exists("ga_generate_css_group")){
    function ga_generate_css_group( $attributes ){
        if( isset($attributes['id']) ){
            $css = ga_generate_css_group($attributes);
            return $css;
        }
        return "";
    }
}
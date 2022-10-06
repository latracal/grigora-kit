<?php

if ( ! function_exists( 'ga_generate_css_social_share' ) ) {

    function ga_generate_css_social_share( $attributes ) {

        
        
        if(isset( $attributes['id'] )){
            
            $css = '.block-id-' . $attributes['id'] . ' {';
                if ( isset( $attributes['borderContainer'] ) ) {
                    if ( isset( $attributes['borderContainer']['left'] ) ) {
                        $css = $css . sprintf(
                            'border-left: %s %s %s;',
                            ( isset( $attributes['borderContainer']['left']['width'] ) ) ? $attributes['borderContainer']['left']['width'] : '',
                            ( isset( $attributes['borderContainer']['left']['style'] ) ) ? $attributes['borderContainer']['left']['style'] : '',
                            ( isset( $attributes['borderContainer']['left']['color'] ) ) ? $attributes['borderContainer']['left']['color'] : ''
                        );
                    }
                    if ( isset( $attributes['borderContainer']['right'] ) ) {
                        $css = $css . sprintf(
                            'border-right: %s %s %s;',
                            ( isset( $attributes['borderContainer']['right']['width'] ) ) ? $attributes['borderContainer']['right']['width'] : '',
                            ( isset( $attributes['borderContainer']['right']['style'] ) ) ? $attributes['borderContainer']['right']['style'] : '',
                            ( isset( $attributes['borderContainer']['right']['color'] ) ) ? $attributes['borderContainer']['right']['color'] : ''
                        );
                    }
                    if ( isset( $attributes['borderContainer']['top'] ) ) {
                        $css = $css . sprintf(
                            'border-top: %s %s %s;',
                            ( isset( $attributes['borderContainer']['top']['width'] ) ) ? $attributes['borderContainer']['top']['width'] : '',
                            ( isset( $attributes['borderContainer']['top']['style'] ) ) ? $attributes['borderContainer']['top']['style'] : '',
                            ( isset( $attributes['borderContainer']['top']['color'] ) ) ? $attributes['borderContainer']['top']['color'] : ''
                        );
                    }
                    if ( isset( $attributes['borderContainer']['bottom'] ) ) {
                        $css = $css . sprintf(
                            'border-bottom: %s %s %s;',
                            ( isset( $attributes['borderContainer']['bottom']['width'] ) ) ? $attributes['borderContainer']['bottom']['width'] : '',
                            ( isset( $attributes['borderContainer']['bottom']['style'] ) ) ? $attributes['borderContainer']['bottom']['style'] : '',
                            ( isset( $attributes['borderContainer']['bottom']['color'] ) ) ? $attributes['borderContainer']['bottom']['color'] : ''
                        );
                    }
                }

                if ( isset( $attributes['borderRadius'] ) ) {
                    if ( isset( $attributes['borderRadius']['topRight'] ) ) {
                        $css = $css . sprintf( 'border-top-right-radius: %s;', $attributes['borderRadius']['topRight'] );
                    }
                    if ( isset( $attributes['borderRadius']['topLeft'] ) ) {
                        $css = $css . sprintf( 'border-top-left-radius: %s;', $attributes['borderRadius']['topLeft'] );
                    }
                    if ( isset( $attributes['borderRadius']['bottomRight'] ) ) {
                        $css = $css . sprintf( 'border-bottom-right-radius: %s;', $attributes['borderRadius']['bottomRight'] );
                    }
                    if ( isset( $attributes['borderRadius']['bottomLeft'] ) ) {
                        $css = $css . sprintf( 'border-bottom-left-radius: %s;', $attributes['borderRadius']['bottomLeft'] );
                    }
                }

                if(isset($attributes['iconsGap'])){
                    $css = $css . sprintf( 'column-gap: %s;', $attributes['iconsGap'] . 'px' );
                }

                if(isset($attributes['alignHorizontal'])){
                    $css = $css . sprintf( 'flex-direction: %s;', $attributes['alignHorizontal'] ? 'row' : 'column' );
                    if ( $attributes['alignHorizontal'] == false && isset($attributes['iconsGap'])) {
                        $css = $css . sprintf( 'row-gap: %s;', $attributes['iconsGap'] . 'px' );
                    }
                }


                if(isset($attributes['align'])){
                    $css = $css . sprintf( 'justify-content: %s;', $attributes['align'] );
                }
                

            $css = $css . '}';


            $css = $css . '.block-id-' . $attributes['id'] . ' .icon-item-container svg{';
                if(isset($attributes['iconSize'])){
                    $css = $css . sprintf( 'height: %s;', $attributes['iconSize'] . 'px' );
                    $css = $css . sprintf( 'width: %s;', $attributes['iconSize'] . 'px' );
                }

            $css = $css . '}';

            

            $css = $css . '.block-id-' . $attributes['id'] . ' .icon-item-container {';
                if(isset($attributes['iconsWidth'])){
                    $css = $css . sprintf( 'width: %s;', $attributes['iconsWidth'] . 'px' );
                }

                if(isset($attributes['iconTextGap'])){
                    $css = $css . sprintf( 'column-gap: %s;', $attributes['iconTextGap'] . 'px' );
                }

                if ( isset( $attributes['iconPadding'] ) ) {
                    if ( isset( $attributes['iconPadding']['left'] ) ) {
                        $css = $css . sprintf( 'padding-left: %s;', $attributes['iconPadding']['left'] );
                    }
                    if ( isset( $attributes['iconPadding']['right'] ) ) {
                        $css = $css . sprintf( 'padding-right: %s;', $attributes['iconPadding']['right'] );
                    }
                    if ( isset( $attributes['iconPadding']['bottom'] ) ) {
                        $css = $css . sprintf( 'padding-bottom: %s;', $attributes['iconPadding']['bottom'] );
                    }
                    if ( isset( $attributes['iconPadding']['top'] ) ) {
                        $css = $css . sprintf( 'padding-top: %s;', $attributes['iconPadding']['top'] );
                    }
                }

                if ( isset( $attributes['iconBorder'] ) ) {
                    if ( isset( $attributes['iconBorder']['left'] ) ) {
                        $css = $css . sprintf(
                            'border-left: %s %s %s;',
                            ( isset( $attributes['iconBorder']['left']['width'] ) ) ? $attributes['iconBorder']['left']['width'] : '',
                            ( isset( $attributes['iconBorder']['left']['style'] ) ) ? $attributes['iconBorder']['left']['style'] : '',
                            ( isset( $attributes['iconBorder']['left']['color'] ) ) ? $attributes['iconBorder']['left']['color'] : ''
                        );
                    }
                    if ( isset( $attributes['iconBorder']['right'] ) ) {
                        $css = $css . sprintf(
                            'border-right: %s %s %s;',
                            ( isset( $attributes['iconBorder']['right']['width'] ) ) ? $attributes['iconBorder']['right']['width'] : '',
                            ( isset( $attributes['iconBorder']['right']['style'] ) ) ? $attributes['iconBorder']['right']['style'] : '',
                            ( isset( $attributes['iconBorder']['right']['color'] ) ) ? $attributes['iconBorder']['right']['color'] : ''
                        );
                    }
                    if ( isset( $attributes['iconBorder']['top'] ) ) {
                        $css = $css . sprintf(
                            'border-top: %s %s %s;',
                            ( isset( $attributes['iconBorder']['top']['width'] ) ) ? $attributes['iconBorder']['top']['width'] : '',
                            ( isset( $attributes['iconBorder']['top']['style'] ) ) ? $attributes['iconBorder']['top']['style'] : '',
                            ( isset( $attributes['iconBorder']['top']['color'] ) ) ? $attributes['iconBorder']['top']['color'] : ''
                        );
                    }
                    if ( isset( $attributes['iconBorder']['bottom'] ) ) {
                        $css = $css . sprintf(
                            'border-bottom: %s %s %s;',
                            ( isset( $attributes['iconBorder']['bottom']['width'] ) ) ? $attributes['iconBorder']['bottom']['width'] : '',
                            ( isset( $attributes['iconBorder']['bottom']['style'] ) ) ? $attributes['iconBorder']['bottom']['style'] : '',
                            ( isset( $attributes['iconBorder']['bottom']['color'] ) ) ? $attributes['iconBorder']['bottom']['color'] : ''
                        );
                    }
                }
    
                if ( isset( $attributes['iconBorderRadius'] ) ) {
                    if ( isset( $attributes['iconBorderRadius']['topRight'] ) ) {
                        $css = $css . sprintf( 'border-top-right-radius: %s;', $attributes['iconBorderRadius']['topRight'] );
                    }
                    if ( isset( $attributes['iconBorderRadius']['topLeft'] ) ) {
                        $css = $css . sprintf( 'border-top-left-radius: %s;', $attributes['iconBorderRadius']['topLeft'] );
                    }
                    if ( isset( $attributes['iconBorderRadius']['bottomRight'] ) ) {
                        $css = $css . sprintf( 'border-bottom-right-radius: %s;', $attributes['iconBorderRadius']['bottomRight'] );
                    }
                    if ( isset( $attributes['iconBorderRadius']['bottomLeft'] ) ) {
                        $css = $css . sprintf( 'border-bottom-left-radius: %s;', $attributes['iconBorderRadius']['bottomLeft'] );
                    }
                }
    

            $css = $css . '}';


            $css = $css . '.block-id-' . $attributes['id'] . ' .share-text {';

                if ( isset( $attributes['typoSize'] ) ) {
                    $css = $css . sprintf( 'font-size: %spx;', $attributes['typoSize'] );
                }
                if ( isset( $attributes['typoWeight'] ) ) {
                    $css = $css . sprintf( 'font-weight: %s;', $attributes['typoWeight'] );
                }
                if ( isset( $attributes['typoTransform'] ) ) {
                    $css = $css . sprintf( 'text-transform: %s;', $attributes['typoTransform'] );
                }
                if ( isset( $attributes['typoStyle'] ) ) {
                    $css = $css . sprintf( 'font-style: %s;', $attributes['typoStyle'] );
                }
                if ( isset( $attributes['typoDecoration'] ) ) {
                    $css = $css . sprintf( 'text-decoration: %s;', $attributes['typoDecoration'] );
                }
    
                $css = $css . sprintf( 'line-height: %s;', ( isset( $attributes['typoLineHeight'] ) && ( 'normal' !== $attributes['typoLineHeight'] ) ) ? $attributes['typoLineHeight'] . 'px' : 'normal' );
                $css = $css . sprintf( 'letter-spacing: %s;', ( isset( $attributes['typoLetterSpacing'] ) && ( 'normal' !== $attributes['typoLetterSpacing'] ) ) ? $attributes['typoLetterSpacing'] . 'px' : 'normal' );
                $css = $css . sprintf( 'word-spacing: %s;', ( isset( $attributes['typoWordSpacing'] ) && ( 'normal' !== $attributes['typoWordSpacing'] ) ) ? $attributes['typoWordSpacing'] . 'px' : 'normal' );

            $css = $css . '}';


            

            return $css;
            
        }
        else{
            return(
                ""
            );
        }
    }

}
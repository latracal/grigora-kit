<?php

if ( ! function_exists( 'ga_generate_css_roadmap' ) ) {

    function ga_generate_css_roadmap( $attributes ) {

        if ( isset( $attributes['id'] ) ) {

            $css = '';

            $css = $css . '.block-id-' . $attributes['id'] . ' .wrapper .row {';
            if ( isset( $attributes['gapItems'] ) ) {
                $css = $css . sprintf( 'margin-bottom: %s;', $attributes['gapItems'] . 'px' );
            }
            $css = $css . '}';


            $css = $css . '.block-id-' . $attributes['id'] . ' .wrapper .row section .card-container {';

                if ( isset( $attributes['effectBorder'] ) ) {
                    if ( isset( $attributes['effectBorder']['left'] ) ) {
                        $css = $css . sprintf(
                            'border-left: %s %s %s;',
                            ( isset( $attributes['effectBorder']['left']['width'] ) ) ? $attributes['effectBorder']['left']['width'] : '',
                            ( isset( $attributes['effectBorder']['left']['style'] ) ) ? $attributes['effectBorder']['left']['style'] : '',
                            ( isset( $attributes['effectBorder']['left']['color'] ) ) ? $attributes['effectBorder']['left']['color'] : ''
                        );
                    }
                    if ( isset( $attributes['effectBorder']['right'] ) ) {
                        $css = $css . sprintf(
                            'border-right: %s %s %s;',
                            ( isset( $attributes['effectBorder']['right']['width'] ) ) ? $attributes['effectBorder']['right']['width'] : '',
                            ( isset( $attributes['effectBorder']['right']['style'] ) ) ? $attributes['effectBorder']['right']['style'] : '',
                            ( isset( $attributes['effectBorder']['right']['color'] ) ) ? $attributes['effectBorder']['right']['color'] : ''
                        );
                    }
                    if ( isset( $attributes['effectBorder']['top'] ) ) {
                        $css = $css . sprintf(
                            'border-top: %s %s %s;',
                            ( isset( $attributes['effectBorder']['top']['width'] ) ) ? $attributes['effectBorder']['top']['width'] : '',
                            ( isset( $attributes['effectBorder']['top']['style'] ) ) ? $attributes['effectBorder']['top']['style'] : '',
                            ( isset( $attributes['effectBorder']['top']['color'] ) ) ? $attributes['effectBorder']['top']['color'] : ''
                        );
                    }
                    if ( isset( $attributes['effectBorder']['bottom'] ) ) {
                        $css = $css . sprintf(
                            'border-bottom: %s %s %s;',
                            ( isset( $attributes['effectBorder']['bottom']['width'] ) ) ? $attributes['effectBorder']['bottom']['width'] : '',
                            ( isset( $attributes['effectBorder']['bottom']['style'] ) ) ? $attributes['effectBorder']['bottom']['style'] : '',
                            ( isset( $attributes['effectBorder']['bottom']['color'] ) ) ? $attributes['effectBorder']['bottom']['color'] : ''
                        );
                    }
                }
                if ( isset( $attributes['effectBorderRadius'] ) ) {
                    if ( isset( $attributes['effectBorderRadius']['topRight'] ) ) {
                        $css = $css . sprintf( 'border-top-right-radius: %s;', $attributes['effectBorderRadius']['topRight'] );
                    }
                    if ( isset( $attributes['effectBorderRadius']['topLeft'] ) ) {
                        $css = $css . sprintf( 'border-top-left-radius: %s;', $attributes['effectBorderRadius']['topLeft'] );
                    }
                    if ( isset( $attributes['effectBorderRadius']['bottomRight'] ) ) {
                        $css = $css . sprintf( 'border-bottom-right-radius: %s;', $attributes['effectBorderRadius']['bottomRight'] );
                    }
                    if ( isset( $attributes['effectBorderRadius']['bottomLeft'] ) ) {
                        $css = $css . sprintf( 'border-bottom-left-radius: %s;', $attributes['effectBorderRadius']['bottomLeft'] );
                    }

            $css = $css . '}';

            $css = $css . '.block-id-' . $attributes['id'] . ' .wrapper .row .card-content:hover {';
            if ( isset( $attributes['bgHoverColor'] ) ) {
                $css = $css . sprintf( 'background-color: %s;', $attributes['bgHoverColor'] );
            }
            $css = $css . '}';

            $css = $css . '.block-id-' . $attributes['id'] . ' .wrapper .row .card-content {';

            if ( isset( $attributes['bgColor'] ) ) {
                $css = $css . sprintf( 'background-color: %s;', $attributes['bgColor'] );
            }
            
            if ( isset($attributes['layoutPadding']) ) {
                if ( isset($attributes['layoutPadding']['left']) ) {
                    $css = $css . sprintf("padding-left: %s;", $attributes['layoutPadding']['left']);
                }
                if ( isset($attributes['layoutPadding']['right']) ) {
                    $css = $css . sprintf("padding-right: %s;", $attributes['layoutPadding']['right']);
                }
                if ( isset($attributes['layoutPadding']['top']) ) {
                    $css = $css . sprintf("padding-top: %s;", $attributes['layoutPadding']['top']);
                }
                if ( isset($attributes['layoutPadding']['bottom']) ) {
                    $css = $css . sprintf("padding-bottom: %s;", $attributes['layoutPadding']['bottom']);
                }
            }

            }

            $css = $css . '}';

            $css = $css . '.block-id-' . $attributes['id'] . ' .wrapper .row .card-contentimg:hover {';
            if ( isset( $attributes['bgHoverColor'] ) ) {
                $css = $css . sprintf( 'background-color: %s;', $attributes['bgHoverColor'] );
            }
            $css = $css . '}';

            $css = $css . '.block-id-' . $attributes['id'] . ' .wrapper .row .card-contentimg {';

            if ( isset( $attributes['bgColor'] ) ) {
                $css = $css . sprintf( 'background-color: %s;', $attributes['bgColor'] );
            }
            
            if ( isset($attributes['layoutPadding']) ) {
                if ( isset($attributes['layoutPadding']['left']) ) {
                    $css = $css . sprintf("padding-left: %s;", $attributes['layoutPadding']['left']);
                }
                if ( isset($attributes['layoutPadding']['right']) ) {
                    $css = $css . sprintf("padding-right: %s;", $attributes['layoutPadding']['right']);
                }
                if ( isset($attributes['layoutPadding']['top']) ) {
                    $css = $css . sprintf("padding-top: %s;", $attributes['layoutPadding']['top']);
                }
                if ( isset($attributes['layoutPadding']['bottom']) ) {
                    $css = $css . sprintf("padding-bottom: %s;", $attributes['layoutPadding']['bottom']);
                }
            }

            
            $css = $css . '}';



            $css = $css . '.block-id-' . $attributes['id'] . ' .wrapper .row.row-1.right section .card-container, ' . '.block-id-' . $attributes['id'] . ' .wrapper .row.row-1 section .card-container{ ';
            
            if (isset($attributes['gapItemMarker'])){
                $css = $css . sprintf("margin-right: %s;", $attributes['gapItemMarker'] . 'px');
            }

            $css = $css . '}';

            $css = $css . '.block-id-' . $attributes['id'] . ' .wrapper .row.row-2.left section .card-container,' . '.block-id-' . $attributes['id'] . ' .wrapper .row.row-2 section .card-container{ ';
            
            if (isset($attributes['gapItemMarker'])){
                $css = $css . sprintf("margin-left: %s;", $attributes['gapItemMarker'] . 'px');
            }

            $css = $css . '}';



            $css = $css . '.block-id-' . $attributes['id'] . ' .row section .icon svg, ' . '.block-id-' . $attributes['id'] . ' .wrapper .scroll-icon svg {';
                if ( isset( $attributes['iconBgSize'] ) ) {
                    $css = $css .  sprintf( 'height: %s;', (string)((int)$attributes['iconBgSize'] - 16) . 'px' );
                    $css = $css . sprintf( 'width: %s;', (string)((int)$attributes['iconBgSize'] - 16) . 'px' );
                }

                if ( isset( $attributes['iconColor'] ) ) {
                    $css = $css . sprintf( 'color: %s;', $attributes['iconColor'] );
                }
            $css = $css . '}';

            $css = $css . '.block-id-' . $attributes['id'] . ' .row section .icon, ' . '.block-id-' . $attributes['id'] . ' .wrapper .scroll-icon {';
                if ( isset( $attributes['iconBgSize'] ) ) {
                    $css = $css . sprintf( 'height: %s;', $attributes['iconBgSize'] . 'px' );
                    $css = $css . sprintf( 'width: %s;', $attributes['iconBgSize'] . 'px' );
                }

                if ( isset( $attributes['iconBgColor'] ) ) {
                    $css = $css . sprintf( 'background-color: %s;', $attributes['iconBgColor'] );
                }
            $css = $css . '}';

            if ( isset( $attributes['iconBgSize'] ) ) {

                $css = $css . '.block-id-' . $attributes['id'] . ' .row-1 section .icon{';
                $css = $css . sprintf( 'top: %s;', (string)( 15 - ((int)$attributes['iconBgSize'] - 40)/2) . 'px' );
                $css = $css . sprintf( 'right: %s;', (string)( -60 - ((int)$attributes['iconBgSize'] - 40)/2) . 'px' );
                $css = $css . '}';

                $css = $css . '.block-id-' . $attributes['id'] . ' .row-2 section .icon{';
                $css = $css . sprintf( 'top: %s;', (string)( 15 - ((int)$attributes['iconBgSize'] - 40)/2) . 'px' );
                $css = $css . sprintf( 'left: %s;', (string)( -60 - ((int)$attributes['iconBgSize'] - 40)/2) . 'px' );
                $css = $css . '}';

                
                
            }


            $css = $css . '.block-id-' . $attributes['id'] . ' .row section .icon, ' . '.block-id-' . $attributes['id'] .  ' .center-line .scroll-icon{';
                $css = $css . sprintf( 'box-shadow: 0 0 0 %s %s, inset 0 2px 0 rgba(0,0,0,0.08), 0 3px 0 4px rgba(0,0,0,0.05);', isset($attributes['iconBorderWidth']) ? ($attributes['iconBorderWidth'] . 'px'): '4px', isset($attributes['iconBorderColor']) ? $attributes['iconBorderColor'] : '#fff' );
            $css = $css . '}';

            $css = $css . '.block-id-' . $attributes['id'] . " .wrapper .center-line, " . '.block-id-' . $attributes['id'] . " .wrapper .center-line.left, " . '.block-id-' . $attributes['id'] . " .wrapper .center-line.right{ ";
                if( isset($attributes['connectorColor']) ) {
                    $css = $css . sprintf( 'background: %s;', $attributes['connectorColor'] );
                }

                if( isset($attributes['connectorThickness']) ) {
                    $css = $css . sprintf( 'width: %s;', $attributes['connectorThickness'] . 'px' );
                }

            $css = $css . '}';

            $css = $css . '.block-id-' . $attributes['id'] . ' .row section .details .title:hover{';
                if ( isset( $attributes['headingHoverColor'] ) ) {
                    $css = $css . sprintf( 'color: %s;', $attributes['headingHoverColor'] );
                }
            $css = $css . '}';

            $css = $css . '.block-id-' . $attributes['id'] . ' .row section .details .title{';

                if ( isset( $attributes['headingColor'] ) ) {
                    $css = $css . sprintf( 'color: %s;', $attributes['headingColor'] );
                }

                if( isset($attributes['typoHSize']) ){
                    $css = $css . sprintf("font-size: %s;", $attributes['typoHSize'] . 'px');
                }
                if( isset($attributes['typoHWeight']) ){
                    $css = $css . sprintf("font-weight: %s;", $attributes['typoHWeight']);
                }
                if( isset($attributes['typoHTransform']) ){
                    $css = $css . sprintf("text-transform: %s;", $attributes['typoHTransform']);
                }
    
                if( isset($attributes['typoHStyle']) ){
                    $css = $css . sprintf("font-style: %s;", $attributes['typoHStyle']);
                }
    
                if( isset($attributes['typoHDecoration']) ){
                    $css = $css . sprintf("text-decoration: %s;", $attributes['typoHDecoration']);
                }
                
                if( isset($attributes['typoHLineHeight']) ){
                    $css = $css . sprintf("line-height: %s;", ($attributes['typoHLineHeight'] != 'normal' ) ? $attributes['typoHLineHeight'] . 'px' : 'normal');
                }
    
                if( isset($attributes['typoHLetterSpacing']) ){
                    $css = $css . sprintf("letter-spacing: %s;", ($attributes['typoHLetterSpacing'] != 'normal' ) ? $attributes['typoHLetterSpacing'] . 'px' : 'normal');
                }
                
                if( isset($attributes['typoHWordSpacing']) ){
                    $css = $css . sprintf("word-spacing: %s;", ($attributes['typoHWordSpacing'] != 'normal' ) ? $attributes['typoHWordSpacing'] . 'px' : 'normal');
                }

            $css = $css . '}';

            $css = $css . '.block-id-' . $attributes['id'] . ' .row section .content:hover{';
                if ( isset( $attributes['contentHoverColor'] ) ) {
                    $css = $css . sprintf( 'color: %s;', $attributes['contentHoverColor'] );
                }
            $css = $css . '}';


            $css = $css . '.block-id-' . $attributes['id'] . ' .row section .content{';
                if ( isset( $attributes['contentColor'] ) ) {
                    $css = $css . sprintf( 'color: %s;', $attributes['contentColor'] );
                }

                if( isset($attributes['typoCSize']) ){
                    $css = $css . sprintf("font-size: %s;", $attributes['typoCSize'] . 'px');
                }
                if( isset($attributes['typoCWeight']) ){
                    $css = $css . sprintf("font-weight: %s;", $attributes['typoCWeight']);
                }
                if( isset($attributes['typoCTransform']) ){
                    $css = $css . sprintf("text-transform: %s;", $attributes['typoCTransform']);
                }
    
                if( isset($attributes['typoCStyle']) ){
                    $css = $css . sprintf("font-style: %s;", $attributes['typoCStyle']);
                }
    
                if( isset($attributes['typoCDecoration']) ){
                    $css = $css . sprintf("text-decoration: %s;", $attributes['typoCDecoration']);
                }
                
                if( isset($attributes['typoCLineHeight']) ){
                    $css = $css . sprintf("line-height: %s;", ($attributes['typoCLineHeight'] != 'normal' ) ? $attributes['typoCLineHeight'] . 'px' : 'normal');
                }
    
                if( isset($attributes['typoCLetterSpacing']) ){
                    $css = $css . sprintf("letter-spacing: %s;", ($attributes['typoCLetterSpacing'] != 'normal' ) ? $attributes['typoCLetterSpacing'] . 'px' : 'normal');
                }
                
                if( isset($attributes['typoCWordSpacing']) ){
                    $css = $css . sprintf("word-spacing: %s;", ($attributes['typoCWordSpacing'] != 'normal' ) ? $attributes['typoCWordSpacing'] . 'px' : 'normal');
                }

            $css = $css . '}';


            $css = $css . '.block-id-' . $attributes['id'] . ' .row section .author, ' . '.block-id-' . $attributes['id'] . ' .row section .date{';

                if ( isset( $attributes['contentColor'] ) ) {
                    $css = $css . sprintf( 'color: %s;', $attributes['contentColor'] );
                }

            $css = $css . '}';

            $css = $css . '.block-id-' . $attributes['id'] . ' .row section .author:hover, ' . '.block-id-' . $attributes['id'] . ' .row section .date:hover{';

                if ( isset( $attributes['contentHoverColor'] ) ) {
                    $css = $css . sprintf( 'color: %s;', $attributes['contentHoverColor'] );
                }

            $css = $css . '}';



            $css = $css . '.block-id-' . $attributes['id'] . ' .row section .details, ' . ' .block-id-' . $attributes['id'] . ' .row section .bottom{';
                if ( isset( $attributes['textAlign'] ) ) {
                    $css = $css . sprintf( 'flex-direction: %s;', $attributes['textAlign'] == 'rtl' ? 'row-reverse' : 'row' );
                }
            $css = $css . '}';

            $css = $css . '.block-id-' . $attributes['id'] . ' .wrapper section .image-container:hover{';
                if ( isset( $attributes['bgHoverColor'] ) ) {
                    $css = $css . sprintf( 'background-color: %s;', $attributes['bgHoverColor'] );
                }
            $css = $css . '}';

            $css = $css . '.block-id-' . $attributes['id'] . ' .wrapper section .image-container{';

                if ( isset( $attributes['bgColor'] ) ) {
                    $css = $css . sprintf( 'background-color: %s;', $attributes['bgColor'] );
                }
             
                if ( isset($attributes['imagePadding']) ) {
                    if ( isset($attributes['imagePadding']['left']) )
                    {
                        $css = $css . sprintf("padding-left: %s;", $attributes['imagePadding']['left']);
                    }
                    if ( isset($attributes['imagePadding']['right']) )
                    {
                        $css = $css . sprintf("padding-right: %s;", $attributes['imagePadding']['right']);
                    }
                    if ( isset($attributes['imagePadding']['top']) )
                    {
                        $css = $css . sprintf("padding-top: %s;", $attributes['imagePadding']['top']);
                    }
                    if ( isset($attributes['imagePadding']['bottom']) )
                    {
                        $css = $css . sprintf("padding-bottom: %s;", $attributes['imagePadding']['bottom']);
                    }
                }

                
    
            $css = $css . '}';

            $css = $css . '.block-id-' . $attributes['id'] . ' .wrapper section img{';
                if ( isset( $attributes['imageHeight'] ) ) {
                    $css = $css . sprintf( 'height: %s;', $attributes['imageHeight'] . 'px' );
                }
            
            $css = $css . '}';
                

            return $css;
        }

        else{
            return "";
        }

    }


}
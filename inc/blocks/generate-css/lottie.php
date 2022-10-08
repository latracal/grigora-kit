<?php


if ( ! function_exists( 'ga_generate_css_lottie' ) ) {
	
	function ga_generate_css_lottie( $attributes ) {
        if ( isset( $attributes['id'] ) ) {
            $css = '.block-id-' . $attributes['id'] . ' {';
                if ( isset( $attributes['align'] ) ) {
                    $css .= 'justify-content: ' . $attributes['align'];
                }
                $css .= '}';
            return $css;
    }
    else{
        return '';
    }
}

}
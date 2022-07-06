<?php

// Exit if accessed directly.
 if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get image meta.
 */
if(!function_exists("grigora_st_image_meta")){
    function grigora_st_image_meta($id){
        if(empty($id)){
            return false;
        }
        return array(
            "id" => $id,
            "url" => wp_get_attachment_url( $id )
        );
    }
}

/**
 * Helper to download image.
 */
if(!function_exists("grigora_st_download_image")){
    function grigora_st_download_image($url){

        require_once( ABSPATH . 'wp-admin/includes/media.php' );
        require_once( ABSPATH . 'wp-admin/includes/file.php' );
        require_once( ABSPATH . 'wp-admin/includes/image.php' );

        if(empty($url) || !is_string($url)){
            return false;
        }

        preg_match( '/[^\?]+\.(gif|heic|jpeg|jpg|png|svg|webp|doc|docx|key|odt|pdf|ppt|pptx|ppsx|pps|xls|xlsx|mp3|m4a|ogg|wav|avi|mpg|mp4|m4v|mov|ogv|vtt|wmv|3gp|3g2)\b/i', $url, $file_name );
        $file_name = basename( $file_name[0] );
        $temp_image = download_url( $url );

        if ( is_wp_error( $temp_image ) ) {
            return false;
        }

        $image_id = media_handle_sideload( array(
            "name" => $file_name,
            "tmp_name" => $temp_image
        ), 0 );

        if ( is_wp_error( $image_id ) ) {
            unlink( $temp_image );
            return false;
        }

        return grigora_st_image_meta($image_id);
    }
}
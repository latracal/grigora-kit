<?php

/**
 * Get if template or template part post exists in database
 * Credits: https://wordpress.org/plugins/design-import-export/
*/
if(!function_exists("grigora_template_post_exists")){
    function grigora_template_post_exists( $post_name = '', $post_type = '', $theme_slug = '' ) {

        global $wpdb;
    
        if ( $post_name === '' ) {
            $todo = array( 'post_id' => 0, 'action' => 'nowt' );
        } else {
            if ( $post_type === 'wp_template' || $post_type === 'wp_template_part' ) {
    
                $post_id_update = 0;
    
                $template_posts = $wpdb->get_results( "SELECT ID FROM $wpdb->posts WHERE post_name = '" . $post_name . "' AND post_type = '" . $post_type . "'" );
    
                if ( $template_posts ) {
                    foreach ( $template_posts as $template_post ) {
                        $post_id = $template_post->ID;
                        $terms = get_the_terms( $post_id, 'wp_theme' );
                        if ( $terms && $terms[0]->slug === $theme_slug ) {
                            $post_id_update = $post_id;
                            break;
                        }
                    }
                    if ( $post_id_update ) {
                        $todo = array( 'post_id' => $post_id_update, 'action' => 'update' );
                    } else {
                        $todo = array( 'post_id' => 0, 'action' => 'insert' );
                    }
                } else {
                    $todo = array( 'post_id' => 0, 'action' => 'insert' );
                }
    
            } elseif ( $post_type === 'wp_global_styles' ) {
    
                $post_id = $wpdb->get_row( "SELECT ID FROM $wpdb->posts WHERE post_name = '" . $post_name . "' AND post_type = '" . $post_type . "'" );
                if ( $post_id ) {
                    $todo = array( 'post_id' => $post_id->ID, 'action' => 'update' );
                } else {
                    $todo = array( 'post_id' => 0, 'action' => 'insert' );
                }
    
            } else {
                $todo = array( 'post_id' => 0, 'action' => 'nowt' );
            }	
        }
    
        return $todo;
    
    }
}


/**
 * Fix template and template part slugs (post_name).
 */
if(!function_exists("grigora_templates_slug_fix")){
    function grigora_templates_slug_fix( $post_id, $slug ) {
        global $wpdb;
        $wpdb->update( $wpdb->prefix . 'posts', array( 'post_name' => $slug ), array( 'ID' => $post_id ), '%s', '%d' );
    }
}

/**
 * Get Filesystem
*/

if(!function_exists("get_filesystem")){
    function get_filesystem() {
        global $wp_filesystem;
    
        // If the filesystem has not been instantiated yet, do it here.
        if ( ! $wp_filesystem ) {
            if ( ! function_exists( 'WP_Filesystem' ) ) {
                require_once wp_normalize_path( ABSPATH . '/wp-admin/includes/file.php' );
            }
            WP_Filesystem();
        }
        return $wp_filesystem;
    }
}

/**
 * Get Base Path
*/
if(!function_exists("get_base_path")){
    function get_base_path(){
        return get_filesystem()->wp_content_dir();
    }
}

/**
 * Get Base Path
*/
if(!function_exists("get_plugin_dir_full")){
    function get_plugin_dir_full(){
        return get_base_path()."plugins/grigora-starter-templates/";
    }
}

/**
 * Get Active Theme Slug
*/
if(!function_exists("get_theme_slug")){
    function get_theme_slug(){
        return get_stylesheet();
    }
}


/**
 * Replace image links
 *
 * @since  1.0.0
 * 
 */
if(!function_exists("grigora_st_image_links_replace")){
    function grigora_st_image_links_replace($content, $images, $imageslocal){
        if(empty($content) || empty($images) || empty($imageslocal)){
            return $content;
        }
        foreach($images as $image){
            $grigoraimageid = $image["id"];
            $localimage = $imageslocal[$grigoraimageid];
            if(!$localimage){
                $content = str_replace("{grigoraimageurl" . $grigoraimageid . "}", "" , $content);
            }
            else{
                $content = str_replace("{grigoraimageurl" . $grigoraimageid . "}", $localimage["url"], $content);
            }
            
        }
        return $content;
    }
}

/**
 * Replace image links
 *
 * @since  1.0.0
 * 
 */
if(!function_exists("grigora_st_theme_slug_replace")){
    function grigora_st_theme_slug_replace($content){
        if(empty($content)){
            return $content;
        }
        $content = str_replace("{themeslug}", get_theme_slug(), $content);
        return $content;
    }
}

/**
 * Import Template
 *
 * @since  1.0.0
 * 
 */


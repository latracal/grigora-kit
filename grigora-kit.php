<?php
/**
 * Plugin Name: Grigora's Kit For Website Building
 * Description: Your only requirement to create a beautiful website. Import from many prebuilt templates, or build with scratch from blocks.
 * Version: 1.1.0
 * Author: Latracal Solutions
 * Author URI: https://latracal.com/
 * License: GPLv2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: grigora-kit
 * 
 * @package Grigora Kit
 */

 // Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define constants
define( 'GRIGORA_KIT_VERSION', '1.1.0' );
define( 'GRIGORA_KIT_DEBUG', true );
define( 'GRIGORA_KIT_URL', plugin_dir_url( __FILE__ ) );
define( 'GRIGORA_KIT_PATH', plugin_dir_path( __FILE__ ) );

// For debugging
if( GRIGORA_KIT_DEBUG ){
	@ini_set( 'display_errors', 1 );
}

require  GRIGORA_KIT_PATH . 'inc/persist-admin-notices-dismissal/persist-admin-notices-dismissal.php';

/**
 * Get path helper function
 */
if(!function_exists("grigora_kit_get_path")){
    function grigora_kit_get_path( $arg="" ){
        return GRIGORA_KIT_PATH . $arg;
    }
}

// notice
add_action( 'admin_init', array( 'PAnD', 'init' ) );

// init
require_once GRIGORA_KIT_PATH . 'inc/init.php';



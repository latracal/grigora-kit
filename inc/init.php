<?php
/**
 * Add all menu pages and import the modules.
 *
 * @package grigora-kit
 */

require_once grigora_kit_get_path( 'inc/helpers.php' );
require_once grigora_kit_get_path( 'inc/dashboard.php' );

if ( ! function_exists( 'grigora_kit_admin_menu' ) ) {

	/**
	 * Register Menu of the plugin.
	 */
	function grigora_kit_admin_menu() {
		add_menu_page(
			__( "Grigora's Kit", 'grigora-kit' ),
			__( "Grigora's Kit", 'grigora-kit' ),
			'manage_options',
			'grigora-kit',
			'grigora_kit_dashboard',
			grigora_kit_get_svg(),
			31
		);
		add_submenu_page(
			'grigora-kit',
			__( 'Dashboard', 'grigora-kit' ),
			__( 'Dashboard', 'grigora-kit' ),
			'manage_options',
			'grigora-kit',
			'grigora_kit_dashboard'
		);
	}
}

add_action( 'admin_menu', 'grigora_kit_admin_menu' );

// -------------- Starter Templates ---------------------------------
if ( ! function_exists( 'grigora_kit_admin_notice_missing_block_theme' ) ) {
	/**
	 * Show notice if the block theme is not installed
	 */
	function grigora_kit_admin_notice_missing_block_theme() {
		if ( ! PAnD::is_admin_notice_active( 'notice-missingbt-2' ) ) {
			return;
		}
		?>
		<div data-dismissible="notice-missingbt-2" class="notice notice-warning is-dismissible">
			<p><strong><?php echo esc_html__( 'Grigora Kit: Starter Templates', 'grigora-kit' ); ?></strong> <?php echo esc_html__( 'requires a Block Theme to be active.', 'grigora-kit' ); ?> <a href="<?php echo esc_url( admin_url( 'theme-install.php?theme=grigora-blocks' ) ); ?>"><button class="button button-primary " ><?php echo esc_html__( 'Install', 'grigora-kit' ); ?></button></a></p>
		</div>
		<?php
	}
}

/**
 * Only load the module if block theme is installed.
 */
if ( grigora_get_setting( 'starter_tempalates', false ) ) {
	if ( wp_is_block_theme() ) {
		require_once grigora_kit_get_path( 'inc/starter-templates/init.php' );
	} else {
		add_action( 'admin_notices', 'grigora_kit_admin_notice_missing_block_theme' );
	}
}
// -------------- Starter Templates ---------------------------------


// -------------- Blocks --------------------------------------------
if ( grigora_get_setting( 'advanced_blocks', false ) ) {
	require_once grigora_kit_get_path( 'inc/blocks/init.php' );
}
// -------------- Blocks --------------------------------------------



// -------------- Table of Content ----------------------------------
if ( grigora_get_setting( 'table_of_content', false ) ) {
	require_once grigora_kit_get_path( 'inc/table-of-contents/init.php' );
}
// -------------- Table of Content ----------------------------------

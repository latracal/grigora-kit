<?php

/**
 * Dashboard HTML.
 */
if(!function_exists("grigora_kit_dashboard")){
    function grigora_kit_dashboard() {
        ?>
        <div class="grigora-dashboard">
            <div class="header">
                <div class="branding">
                    <div class="logo">
                        <img src="<?php echo esc_url( GRIGORA_KIT_URL . "assets/images/logo.png" ) ?>" />
                    </div>
                    <h1 class="title"><?php echo __( "Grigora's Kit", 'grigora-kit' ); ?></h1>
                </div>
            </div>
            <form method="post" action="<?php echo admin_url( 'admin-post.php' ); ?>">
            <input type="hidden" name="action" value="grigora_kit_update_settings">
            <?php wp_nonce_field( 'grigora_kit_update_settings', 'grigora_kit_update_settings' ); ?>
            <div class="settings">
                <h2 class="settings-title">
                    <?php echo __( "Modules", 'grigora-kit' ); ?>
                </h2>
                
                <div class="settings-list">
                    <ul class="settings-list__ul">
                        <li class="single-setting">
                            <div class="setting-header">
                                <?php echo __( "Starter Templates (for Block Themes)", 'grigora-kit' ); ?>
                                <div class="status-toggle">
                                <a href="#" id="toggle_starter_tempalates">
                                    <input type="checkbox" id="starter_tempalates" name="starter_tempalates" class="check" <?php checked( grigora_get_setting("starter_tempalates") ); ?>>
                                    <label for="starter_tempalates" class="checktoggle"><?php echo __( "Starter Templates", 'grigora-kit' ); ?></label>
                                </a>
                                </div>
                            </div>
                            <div class="setting-info">
                                <?php if( !wp_is_block_theme() ){ ?>
                                    <div class="warning-text">
                                    <strong><?php echo __( "Warning: Requires Block Theme To Be Installed.", 'grigora-kit' ); ?></strong>
                                    </div>
                                <?php } ?>
                                <?php if( wp_is_block_theme() && grigora_get_setting("starter_tempalates")){ ?>
                                    <div class="normal-text">
                                    <strong><?php echo __( "Location: Grigora's Kit", 'grigora-kit' ); ?> » <a href="<?php echo admin_url('admin.php?page=grigora-kit-templates'); ?>"><?php echo __( "Starter Templates", 'grigora-kit' ); ?></a></strong>
                                    </div>
                                <?php } ?>
                                <?php echo __( "Create awesome-looking websites with few clicks. This module allows you to preview, edit and import the templates. These templates are well optimized by experts to keep your Pagespeed Insights green. Moreover, these templates are built using Wordpress's Full Site Editing, allowing you to customize them easily.", 'grigora-kit' ); ?>
                            </div>
                        </li>
                        <li class="single-setting">
                            <div class="setting-header">
                                <?php echo __( "Blocks", 'grigora-kit' ); ?>
                                <div class="status-toggle">
                                <a href="#" id="toggle_blocks">
                                    <input type="checkbox" id="advanced_blocks" name="advanced_blocks" class="check" <?php checked( grigora_get_setting("advanced_blocks") ); ?>>
                                    <label for="advanced_blocks" class="checktoggle"><?php echo __( "Starter Templates", 'grigora-kit' ); ?></label>
                                </a>
                                </div>
                            </div>
                            <div class="setting-info">
                                <?php echo __( "Create a website with custom blocks. The blocks have Typography Controls, Layout Controls, Hover Effects, On Scroll Animations, and Spacing Controls. Each of the block loads CSS dynamically, making them superfast.", 'grigora-kit' ); ?>
                            </div>
                        </li>
                    </ul>
                </div>
                <button class="cta-btn"><?php echo __( "Save", 'grigora-kit' ); ?></button>
            </div>
            </form>
            <div class="closure-text">
                <p><i><?php echo __( "Nothing's ever complete, so bear with us while we keep iterating towards a better future.", 'grigora-kit' ); ?></i></p>
                <p><i><?php echo sprintf(
                    '%s? <a href="https://wpgrigora.com/contact-us/" target="_blank">%s</a>',
                    __( "Have suggestions", 'grigora-kit' ),
                    __( "Contact Here", 'grigora-kit' )); ?></i></p>
            </div>
        </div>
        <?php
    }
}

/**
 * Dashboard Assets.
 */
if (!function_exists("grigora_kit_dashboard_assets")){
    function grigora_kit_dashboard_assets( $hook ){
        if($hook != "toplevel_page_grigora-kit"){
            return;
        }
        $ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
        $ext = GRIGORA_KIT_DEBUG ? ".css" : ".min.css";
        wp_enqueue_style( 'grigora-admin-dashboard', GRIGORA_KIT_URL . '/assets/css/dashboard' . $ext, null, $ver );
        wp_enqueue_script( 'grigora-admin-dashboard', GRIGORA_KIT_URL. 'js/dashboard.js', array(), $ver, true);
    }
}

/**
 * Update Dashboard Settings.
 */
if(!function_exists("grigora_kit_update_settings")){
    function grigora_kit_update_settings(){
        if(
            isset($_POST["grigora_kit_update_settings"])
        ){
            if ( ! wp_verify_nonce( $_POST["grigora_kit_update_settings"], 'grigora_kit_update_settings' ) ) {
                wp_die( __( 'The link you followed has expired.', 'grigora-kit' ) ); 
            } else {
                if(isset($_POST["starter_tempalates"]) && $_POST["starter_tempalates"] === "on"){
                    grigora_set_setting("starter_tempalates", true);
                }
                else{
                    grigora_set_setting("starter_tempalates", false);
                }
                if(isset($_POST["advanced_blocks"]) && $_POST["advanced_blocks"] === "on"){
                    grigora_set_setting("advanced_blocks", true);
                }
                else{
                    grigora_set_setting("advanced_blocks", false);
                }
                wp_redirect(admin_url('admin.php?page=grigora-kit'));
            }
        }
    }
}

add_action( 'admin_post_grigora_kit_update_settings', 'grigora_kit_update_settings' );
add_action( 'admin_enqueue_scripts', 'grigora_kit_dashboard_assets' );

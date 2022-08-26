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
                    <h1 class="title"><?php echo esc_html( __( "Grigora's Kit", 'grigora-kit' )); ?></h1>
                </div>
            </div>
            <form method="post" action="<?php echo admin_url( 'admin-post.php' ); ?>">
            <input type="hidden" name="action" value="grigora_kit_update_settings">
            <?php wp_nonce_field( 'grigora_kit_update_settings', 'grigora_kit_update_settings' ); ?>
            <div class="settings">
                <div class="main-content">
                <h2 class="settings-title">
                    <?php echo esc_html__( "Modules", 'grigora-kit' ); ?>
                </h2>
                <div class="settings-list">
                    <ul class="settings-list__ul">
                        <li class="single-setting">
                            <div class="setting-header">
                                <?php echo esc_html__( "Starter Templates (for Block Themes)", 'grigora-kit' ); ?>
                                <div class="status-toggle">
                                <a href="#" id="toggle_starter_tempalates">
                                    <input type="checkbox" id="starter_tempalates" name="starter_tempalates" class="check" <?php checked( grigora_get_setting("starter_tempalates", false) ); ?>>
                                    <label for="starter_tempalates" class="checktoggle"><?php echo esc_html__( "Starter Templates", 'grigora-kit' ); ?></label>
                                </a>
                                </div>
                            </div>
                            <div class="setting-info">
                                <?php if( !wp_is_block_theme() ){ ?>
                                    <div class="warning-text">
                                    <strong><?php echo esc_html__( "Warning: Requires Block Theme To Be Installed.", 'grigora-kit' ); ?></strong>
                                    </div>
                                <?php } ?>
                                <?php if( wp_is_block_theme() && grigora_get_setting("starter_tempalates", false)){ ?>
                                    <div class="normal-text">
                                    <strong><?php echo esc_html__( "Location: Grigora's Kit", 'grigora-kit' ); ?> » <a href="<?php echo admin_url('admin.php?page=grigora-kit-templates'); ?>"><?php echo esc_html__( "Starter Templates", 'grigora-kit' ); ?></a></strong>
                                    </div>
                                <?php } ?>
                                <?php echo esc_html__( "Create awesome-looking websites with few clicks. This module allows you to preview, edit and import the templates. These templates are well optimized by experts to keep your Pagespeed Insights green. Moreover, these templates are built using Wordpress's Full Site Editing, allowing you to customize them easily.", 'grigora-kit' ); ?>
                            </div>
                        </li>
                        <li class="single-setting">
                            <div class="setting-header">
                                <?php echo esc_html__( "Blocks", 'grigora-kit' ); ?>
                                <div class="status-toggle">
                                <a href="#" id="toggle_blocks">
                                    <input type="checkbox" id="advanced_blocks" name="advanced_blocks" class="check" <?php checked( grigora_get_setting("advanced_blocks", false) ); ?>>
                                    <label for="advanced_blocks" class="checktoggle"><?php echo esc_html__( "Starter Templates", 'grigora-kit' ); ?></label>
                                </a>
                                </div>
                            </div>
                            <div class="setting-info">
                                <?php echo esc_html__( "Create a website with custom blocks. The blocks have Typography Controls, Layout Controls, Hover Effects, On Scroll Animations, and Spacing Controls. Each of the block loads CSS dynamically, making them superfast.", 'grigora-kit' ); ?>
                            </div>
                        </li>
                        <li class="single-setting">
                            <div class="setting-header">
                                <?php echo __( "Table of Contents", 'grigora-kit' ); ?>
                                <div class="status-toggle">
                                <a href="#" id="toggle_toc">
                                    <input type="checkbox" id="table_of_content" name="table_of_content" class="check" <?php checked( grigora_get_setting("table_of_content", false) ); ?>>
                                    <label for="table_of_content" class="checktoggle"><?php echo __( "Table of Content", 'grigora-kit' ); ?></label>
                                </a>
                                </div>
                            </div>
                            <div class="setting-info">
                                <?php echo __( "Add a table of content in your posts/pages. Better to provide a jump navigation links for your readers.", 'grigora-kit' ); ?>
                            </div>
                        </li>
                    </ul>
                </div>
                <button class="cta-btn"><?php echo esc_html__( "Save", 'grigora-kit' ); ?></button>
                </div>
                <div class="sidebar">
                    <div class="docs">
                    <h2><?php echo esc_html__( "Documentation", 'grigora-kit' ); ?></h2>
                    <p><?php echo esc_html__( "Learn everything about Grigora Kit in detail with these detailed guides.", 'grigora-kit' ); ?></p>
                    <p><a href="https://docs.wpgrigora.com/" target="_blank"><?php echo esc_html__( "Browse Now", 'grigora-kit' ); ?></a></p>
                    </div>
                    <div class="support">
                    <h2><?php echo esc_html__( "Support", 'grigora-kit' ); ?></h2>
                    <p><?php echo esc_html__( "Immediate, self-paced guidance powered by our Support team.", 'grigora-kit' ); ?></p>
                    <p><a href="https://wordpress.org/support/plugin/grigora-kit/" target="_blank"><?php echo esc_html__( "Get Support", 'grigora-kit' ); ?></a></p>
                    </div>
                    <div class="social">
                    <h2><?php echo esc_html__( "Grigora Community", 'grigora-kit' ); ?></h2>
                    <p><?php echo esc_html__( "A perfect place to ask your questions and help others as well. Share your website created with Grigora and motivate others!", 'grigora-kit' ); ?></p>
                    <p><a href="https://www.facebook.com/groups/grigoracommunity" target="_blank"><?php echo esc_html__( "Join Our Facebook Group", 'grigora-kit' ); ?></a></p>
                    </div>
                </div>
                </div>
                </form>
                <div class="closure-text">
                    <p><i><?php echo esc_html__( "Nothing's ever complete, so bear with us while we keep iterating towards a better future.", 'grigora-kit' ); ?></i></p>
                    <p><i><?php echo sprintf(
                        '%s? <a href="https://wpgrigora.com/contact-us/" target="_blank">%s</a>',
                        esc_html__( "Have suggestions", 'grigora-kit' ),
                        esc_html__( "Contact Here", 'grigora-kit' )); ?></i></p>
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
        $extjs = GRIGORA_KIT_DEBUG ? ".js" : ".min.js";
        wp_enqueue_style( 'grigora-admin-dashboard', GRIGORA_KIT_URL . '/assets/css/dashboard' . $ext, null, $ver );
        wp_enqueue_script( 'grigora-admin-dashboard', GRIGORA_KIT_URL. '/assets/js/dashboard' . $extjs, array(), $ver, true);
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
                // sanitizion not required here due to fixed values update in db
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
                if(isset($_POST["table_of_content"]) && $_POST["table_of_content"] === "on"){
                    grigora_set_setting("table_of_content", true);
                }
                else{
                    grigora_set_setting("table_of_content", false);
                }
                wp_redirect(admin_url('admin.php?page=grigora-kit'));
            }
        }
    }
}

add_action( 'admin_post_grigora_kit_update_settings', 'grigora_kit_update_settings' );
add_action( 'admin_enqueue_scripts', 'grigora_kit_dashboard_assets' );

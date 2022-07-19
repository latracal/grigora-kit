<?php

/**
 * Starter Templates Page CSS.
 */
if (!function_exists("grigora_st_admin_enqueue")){
    function grigora_st_admin_enqueue( $hook ){
        if($hook != "grigoras-kit_page_grigora-kit-templates"){
            return;
        }
        $ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
        $ext = GRIGORA_KIT_DEBUG ? ".css" : ".min.css";
        wp_enqueue_style( 'grigora-admin-css', GRIGORA_KIT_URL . '/assets/css/grigora-st' . $ext, null, $ver );
    }
}

/**
 * Image Picker.
 */
if (!function_exists("load_wp_media_files")){
    function load_wp_media_files( $hook ) {
        if($hook != "grigoras-kit_page_grigora-kit-templates"){
            return;
        }
        // Enqueue WordPress media scripts
        wp_enqueue_media();
        // Enqueue custom script that will interact with wp.media
        wp_enqueue_script( 'grigora_st-script', GRIGORA_KIT_URL. 'js/image-picker-wp.js', array('jquery'), '0.1' );
    }
}

/**
 * is Json check.
 */
if (!function_exists("isJson")){
    function isJson( $string ){
        json_decode( $string );
        return json_last_error() === JSON_ERROR_NONE;
    }
}

/**
 * Js which runs the ajax functions to install demo.
 */
if (!function_exists("grigora_st_admin_js")){
    function grigora_st_admin_js( $hook ) {
        if($hook != "grigoras-kit_page_grigora-kit-templates"){
            return;
        }

        $ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
    
        $assets = array();
        $content = array();
        $template_info = array();
        $required_plugins = array();
    
        $json = grigora_st_get_template_meta();
        $json = json_decode($json, true);

        if($json){
            foreach ($json as $name => $template_meta) {
                $temp_array = array();
                if (array_key_exists('sitelogowidth',$json[$name])){
                    $content[$name . 'sitelogowidth'] = $template_meta['sitelogowidth'];
                }
                if (array_key_exists('site_title',$json[$name])){
                    $content[$name . 'sitetitle'] = $template_meta['site_title'];
                }
                if (array_key_exists('site_tagline',$json[$name])){
                    $content[$name . 'sitetagline'] = $template_meta['site_tagline'];
                }
                if (array_key_exists('logo',$json[$name])){
                    $content[$name . 'logo'] = $template_meta['logo'];
                }
                foreach($template_meta['files'] as $files){
                    foreach ($files as $file){
                        if (!is_numeric($file)){
                            array_push($temp_array, $file);
                        }
                    }
                }
                $assets[$name] = $temp_array;
            }
        
            foreach($json as $name => $template_meta){
                if (array_key_exists( 'style', $json[$name] )){
                    if (is_array( $json[$name]["style"] )){
                        $values = $json[$name]["style"];
                        $values_array = $values["settings"]["color"]["palette"]["theme"];
                        $temp_array2 = array();
                        for ($z = 0; $z < sizeof($values_array); $z++){
                            $temp_obj = $values_array[$z];
                            $temp_string = $name;
                            $temp_string .= $temp_obj["slug"];
                            $temp_array2[$temp_string] = $temp_obj["color"];
                        }
                        $template_info[$name] = $temp_array2;
                    }
                    else  {
                        $values = json_decode($json[$name]["style"],true);
                        if ($values != null){
                            $values_array = $values["settings"]["color"]["palette"]["theme"];
                            $temp_array2 = array();
                            for ($z = 0; $z < sizeof($values_array); $z++){
                                $temp_obj = $values_array[$z];
                                $temp_string = $name;
                                $temp_string .= $temp_obj["slug"];
                                $temp_array2[$temp_string] = $temp_obj["color"];
                            }
                            $template_info[$name] = $temp_array2;
                        }
                    }
                }
            }

            foreach ($json as $name => $template_meta) {
                if(isset($template_meta["requirements"])){
                    $required_plugins[$name] = $template_meta["requirements"];
                }
                else{
                    $required_plugins[$name] = array();
                }
            }
        }

    
        wp_enqueue_script( 'grigora_st-admin', GRIGORA_KIT_URL. 'js/admin.js', array('jquery', 'wp-util', 'updates', 'masonry', 'imagesloaded'), $ver, true);
        wp_localize_script('grigora_st-admin', 'import_demo_vars', array(
            'url' => admin_url('admin-ajax.php'),
            '_nonce' => wp_create_nonce('grigora-st'),
            'assets' => $assets,
            'content' => $content,
            'template_info' => $template_info,
            'required_plugins' => $required_plugins,
            'debug' => GRIGORA_KIT_DEBUG
        ));
    }
}


add_action( 'admin_enqueue_scripts', 'grigora_st_admin_enqueue' );
add_action( 'admin_enqueue_scripts', 'grigora_st_admin_js' );
add_action( 'admin_enqueue_scripts', 'load_wp_media_files' );

require_once grigora_kit_get_path( 'inc/starter-templates/ajax-helpers.php' );
require_once grigora_kit_get_path( 'inc/starter-templates/download-images.php' );

/**
 * Get Active Theme Slug
*/
if(!function_exists("get_theme_slug")){
    function get_theme_slug(){
        return get_stylesheet();
    }
}

/**
 * Add Starter Templates Submenu.
 */
if(!function_exists("grigora_kit_starter_templates_submenu")){
    function grigora_kit_starter_templates_submenu() {
        add_submenu_page(
            'grigora-kit',
            __( 'Starter Templates', 'grigora-kit' ),
            __( 'Starter Templates', 'grigora-kit' ),
            'manage_options',
            'grigora-kit-templates',
            'grigora_templates_page'
        );
    }
}

add_action('admin_menu', 'grigora_kit_starter_templates_submenu');

/**
 * Starter Templates Page.
 */
if(!function_exists("grigora_templates_page")){
    function grigora_templates_page() {

        if ( !current_user_can( 'manage_options' ) ) {
            wp_die( __( 'You do not have sufficient permissions to access this page.' , 'grigora-kit') );
        }
        echo '<div class="admin-container">';
        settings_errors();
        ?>

<div class="grigora-settings">
    <div class="tab-content">
        <?php render_templates_html("grigora-templates");?>
    </div>
</div>
<?php
    }
}


if(!function_exists("render_templates_html")){
    function render_templates_html() {

        $json = grigora_st_get_template_meta();
        $json = json_decode($json, true);
        $unique_categories = array();
        foreach ($json as $template => $template_meta) {
            foreach($template_meta['category'] as $category){
                if(!in_array($category, $unique_categories)){
                    array_push($unique_categories, $category);
                }
            }
        }
        echo '<h1>' . esc_html( __( "Starter Templates", 'grigora-kit' )) . '</h1>';
        echo '<div class="template-search">';
        echo '<form action="' . home_url("/wp-admin/admin-post.php") . '" method="post" id="demo-import-form">';

        // hidden inuput containing assets to download for each templates
        echo '<input id="assets_to_download" type="hidden" name="action" value="">';

        echo '<input id="grigora_template_import" type="hidden" name="action" value="grigora_template_import">';
        echo '<input id="grigora_site_name" type="hidden" name="action" class="form-site-name" value="site name">';
        echo '<input id="grigora_site_tagline" type="hidden" name="action" class="form-site-tagline" value="site tagline">';
        echo '<input id="grigora_site_logo" type="hidden" name="action" class="form-site-logo" value="site logo">';
        echo '<input id="grigora_site_logosize" type="hidden" name="action" class="form-site-logosize" value="site logosize">';
        echo '<input id="form_color_background" type="hidden" name="action" class="form-color-background" value="black">';
        echo '<input id="form_color_canvas" type="hidden" name="action" class="form-color-canvas" value="black">';
        echo '<input id="form_color_foreground" type="hidden" name="action" class="form-color-foreground" value="black">';
        echo '<input id="form_color_primary" type="hidden" name="action" class="form-color-primary" value="black">';
        echo '<input id="form_color_secondary" type="hidden" name="action" class="form-color-secondary" value="black">';
        echo '<input id="form_color_button" type="hidden" name="action" class="form-color-button" value="black">';
        echo '<input id="form_color_button_text" type="hidden" name="action" class="form-color-buttontext" value="black">';
        echo '<input id="form_typo_single" type="hidden" name="action" class="form-typo" value="serif">';
        echo '<input id="form_typo_size" type="hidden" name="action" class="form-typosize" value="16">';
        echo '<input id="form_container_width" type="hidden" name="action" class="form-containerwidth" value="1200">';
        echo '<input id="form_blockgap" type="hidden" name="action" class="form-blockgap" value="2">';
        echo '<input id="form_sidebar" type="hidden" name="action" class="form-sidebar" value="right">';
        echo '<input id="form_installtheme_grigora" type="hidden" name="action" class="form-installgrigora" value="1">';
        echo '<input id="form_download_image_grigora" type="hidden" name="action" class="form-downloadimage" value="1">';
        echo '<input id="form_include_plugins_grigora" type="hidden" name="action" class="form-includeplugins" value="1">';
        echo '<input id="form-template" type="hidden" name="template" class="form-template" value="default">';
        wp_nonce_field( 'grigora_template_import', '_grigora_template_import' );
        echo '</form>';
        echo '<input type="search" name="search" id="grigora-templates-input" placeholder="' . esc_html( __( "Search...", 'grigora-kit' )) . '">';
        echo '<select id="grigora-templates-select">';
        echo '<option value="All">' . esc_html( __( "All", 'grigora-kit' )).'</option>';
        foreach ($unique_categories as $category) {
            echo '<option value="' . esc_attr( $category ) . '">' . esc_html( $category ) . '</option>';
        }
        echo '</select>';
        echo '</div>';
        echo '<div class="grigora-templates">';
        echo '<div class="demo_modal">';

        echo '
            <div class="installing-demo-preloader" style="display: none;">
                <div class="body hero-animate">
                    <span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                    <div class="base">
                        <span></span>
                        <div class="face"></div>
                    </div>
                </div>
                <div class="longfazers">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div id="progress">
                        <span id="progress-value"></span>
                    </div>
                </div>
                <h1 class="installing-demo-preloader-heading"></h1>

                <div class="installing-demo-preloader-success-screen" style="display: none;">
                    <div class="content">
                    <div class="heading-wrapper">
                    ' .  esc_html( __( "Congratulations", 'grigora-kit' ) ) . '
                    </div>
                    <div class="heading-wrapper-sub">
                    ' .  __( "Your Website is Ready", 'grigora-kit' ). '
                    </div>
                    <div class="install-proloader-success-screen-btn-wrapper">
                        <a href="'. get_home_url() .'">
                            <button class="install-proloader-success-screen-btn">
                                ' .  esc_html( __( "Finish", 'grigora-kit' ) ). '
                                <div class="go-forward-svg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                                </svg>
                                </div>
                            </button>
                        </a>
                    </div>
                    </div>
                </div>

                <div class="installing-demo-preloader-failed-screen" style="display: none;">
                    <div class="heading-div">
                        ' . esc_html( __( "Build Failed", 'grigora-kit' ) ) . ' 😔
                    </div>
                    <div class="error-code-box"></div>
                    <div class="install-proloader-failed-screen-btn-wrapper">
                        <button class="install-proloader-failed-screen-btn">
                        <div class="go-back-svg">
                            <svg style="color: white" xmlns="http://www.w3.org/2000/svg" width="116" height="86" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" fill="white"></path> </svg>
                        </div>
                            ' .  esc_html( __( "Go Back", 'grigora-kit' ) ). '
                        </button>
                    </div>
                </div>

            </div>';

        echo '
            <div class="collapse-open-sidebar" style="background: transparent;">
                <button class="collapse-open-sidebar-btn" style="border: none;">
                    <span class="collapse-close-btn dashicons dashicons-admin-collapse"></span>
                </button>
            </div>';

        echo '<div class="modal-iframe-div">';
        echo '
        <div class="main-panel-wrap" style="position:fixed;">

        <div class="cross-sideicons">
                <div class="cross-sideicons-close-btn close">
                    <svg class="close" height="14px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="14px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/></svg>
                </div>
                <div>
                    
                </div>
                <div>
                    
                </div>
                <div></div>
        </div>

        <div class="device-selector-btns">
            <div class="is-selected device-selector-desktop-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-laptop" viewBox="0 0 16 16">
                <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z"/>
                </svg>
            </div>
            <div class="device-selector-tablet-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tablet-landscape" viewBox="0 0 16 16">
                <path d="M1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4zm-1 8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8z"/>
                <path d="M14 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"/>
                </svg>
            </div>
            <div class="device-selector-mobile-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tablet" viewBox="0 0 16 16">
                <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
            </div>
        </div>

        <div class="home-archives-post-btns">
            <div class="is-selected home-archives-post-btn-home-btn">
                ' .  esc_html( __( "Home", 'grigora-kit' ) ). '
            </div>
            <div class="home-archives-post-btn-archives-btn">
                ' .  esc_html( __( "Archives", 'grigora-kit' ) ). '
            </div>
            <div class="home-archives-post-btn-post-btn">
                ' .  esc_html( __( "Post", 'grigora-kit' ) ). '
            </div>
        </div>

        <div class="panel-toggle-class">
            <button id="my-btnn">
            </button>
            <button id="panel-toggle-class-collapse-btn" class="panel-toggle" style="position: relative; bottom: 1px; left: 32px;">
            ' .  esc_html(__("Collapse" , 'grigora-kit') ) . '
            </button>
        </div>

        <div class="panel-wrap">

        <div class="panel one">
        <h3>' .  esc_html( __("General" , 'grigora-kit') ) . '</h3>
        <p>' .  esc_html( __("Site Name:" , 'grigora-kit') ) . '</p>
        <input type="text" id="site-name" name="site-name"><br>
        <p>' .  esc_html( __("Site Tagline:" , 'grigora-kit') ) . '</p>
        <input type="text" id="site-tagline" name="site-tagline"><br>
        <p class="logo-symbol">' .  esc_html( __("Logo:" , 'grigora-kit') ) . '</p>
        <div class="img-input-box">
        
        ';
        $image_id = get_option( 'grigora_st_logo_id' );
        echo '<div class="logo-div" style="margin: 5px 10px; padding: 11px 40px;">';
        if( intval( $image_id ) > 0 ) {
            echo wp_get_attachment_image( $image_id, 'medium', false, array( 'id' => 'grigora_st-preview-image' ) );
        } else {
            // Some default image
            echo '<img name="grigora_st_preview_image" id="grigora_st-preview-image" src="" onerror="this.style.display=`none`" />';
        }
        echo '</div>';
        echo '
        <input type="hidden" name="grigora_st_image_id" id="grigora_st_image_id" value="' . esc_attr( $image_id ) . '" class="regular-text" />

        <div>
            <input type="button" class="button-primary" value="' . esc_attr__( 'Select a image', 'grigora-kit' ) . '" id="grigora_st_media_manager"/>
        </div>
        
        </div>';

        echo '<br> 

        <p>' .  esc_html__("Logo Size:" , 'grigora-kit') . '<br>  </p>
        <div>
            <input name="site-logosize" type="range" min="30" max="1000" value="120" class="site-logosize" id="site-logosize" oninput="this.nextElementSibling.value = this.value">
            <input name="site-logosize-output" min="30" max="1000" class="site-logosize-output" oninput="this.previousElementSibling.value = this.value" type="number" value="120"/>
        </div>

        <div class="continue-btn-container">
            <div id="btn-continue-step-1" class="continue-btn-step-1">
            ' .  esc_html__("Skip" , 'grigora-kit') . '
            </div>
        </div>


        </div>

        <div class="panel two">
        <h3>' .  esc_html__("Colors" , 'grigora-kit') . '</h3>

        <p>' .  esc_html__("Default color preset:" , 'grigora-kit') . '</p>
        <div class="main-color-preset-default">
        <div class="main-color-preset-default-single-color"></div>
        <div class="main-color-preset-default-single-color"></div>
        <div class="main-color-preset-default-single-color"></div>
        <div class="main-color-preset-default-single-color"></div>
        <div class="main-color-preset-default-single-color"></div>
        <div class="main-color-preset-default-single-color"></div>
        <div class="main-color-preset-default-single-color"></div>
        </div>

        <p>' .  esc_html__("Select from the color presets below:" , 'grigora-kit') . '</p>
        <div class="color-pal-collection">
        <div class="color-pal">
        <div class="color-pal-default">
        <div class="single-color" style="background-color: #fff;"></div>
        <div class="single-color" style="background-color: #F5F5F5;"></div>
        <div class="single-color" style="background-color: #444444;"></div>
        <div class="single-color" style="background-color: #ffbd03;"></div>
        <div class="single-color" style="background-color: #ffbd03;"></div>
        <div class="single-color" style="background-color: #ffbd03;"></div>
        <div class="single-color" style="background-color: #fff;"></div>
        </div>
        <div class="color-pal-default" style="opacity: 0.7;">
        <div class="single-color" style="background-color: #fff;"></div>
        <div class="single-color" style="background-color: #F5F5F5;"></div>
        <div class="single-color" style="background-color: #444444;"></div>
        <div class="single-color" style="background-color: #dd7973;"></div>
        <div class="single-color" style="background-color: #dd7973;"></div>
        <div class="single-color" style="background-color: #dd7973;"></div>
        <div class="single-color" style="background-color: #fff;"></div>
        </div>
        <div class="color-pal-default" style="opacity: 0.7;">
        <div class="single-color" style="background-color: #fff;"></div>
        <div class="single-color" style="background-color: #F5F5F5;"></div>
        <div class="single-color" style="background-color: #444444;"></div>
        <div class="single-color" style="background-color: #5adbb5;"></div>
        <div class="single-color" style="background-color: #5adbb5;"></div>
        <div class="single-color" style="background-color: #5adbb5;"></div>
        <div class="single-color" style="background-color: #fff;"></div>
        </div>
        <div class="color-pal-default" style="opacity: 0.7;">
        <div class="single-color" style="background-color: #fff;"></div>
        <div class="single-color" style="background-color: #F5F5F5;"></div>
        <div class="single-color" style="background-color: #444444;"></div>
        <div class="single-color" style="background-color: #5dbea3;"></div>
        <div class="single-color" style="background-color: #5dbea3;"></div>
        <div class="single-color" style="background-color: #5dbea3;"></div>
        <div class="single-color" style="background-color: #fff;"></div>
        </div>
        <div class="color-pal-default" style="opacity: 0.7;">
        <div class="single-color" style="background-color: #fff;"></div>
        <div class="single-color" style="background-color: #F5F5F5;"></div>
        <div class="single-color" style="background-color: #444444;"></div>
        <div class="single-color" style="background-color: #55c2da;"></div>
        <div class="single-color" style="background-color: #55c2da;"></div>
        <div class="single-color" style="background-color: #55c2da;"></div>
        <div class="single-color" style="background-color: #fff;"></div>
        </div>
        <div class="color-pal-default" style="opacity: 0.7;">
        <div class="single-color" style="background-color: #fff;"></div>
        <div class="single-color" style="background-color: #F5F5F5;"></div>
        <div class="single-color" style="background-color: #444444;"></div>
        <div class="single-color" style="background-color: #8B02E7;"></div>
        <div class="single-color" style="background-color: #8B02E7;"></div>
        <div class="single-color" style="background-color: #8B02E7;"></div>
        <div class="single-color" style="background-color: #fff;"></div>
        </div>
        </div>
        </div>
        <p class="advance-para" id="advance-para-btn">
        ' .  esc_html__("Advanced:" , 'grigora-kit') . '

            <svg id="svg-up-down-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="svg-advance-para-icon bi bi-chevron-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>

        </p>
        <div class="color-pal-custom" style="display: none;">
            <div class="my-color color-background">
                <div class="color-slug">' .  esc_html__("Background" , 'grigora-kit') . '</div>
                <div class="color-picker"><div class="single-color" style="background-color: red;"><input type="hidden" id="hex1" /><input type="color" id="color1" value="#fff"/></div></div>
            </div>
            <div class="my-color color-canvas">
                <div class="color-slug">' .  esc_html__("Canvas" , 'grigora-kit') . '</div>
                <div class="color-picker"><div class="single-color" style="background-color: red;"><input type="hidden" id="hex2" /><input type="color" id="color2" /></div></div>
            </div>
            <div class="my-color color-foreground">
                <div class="color-slug">' .  esc_html__("Foreground" , 'grigora-kit') . '</div>
                <div class="color-picker"><div class="single-color" style="background-color: red;"><input type="hidden" id="hex3" /><input type="color" id="color3" /></div></div>
            </div>
            <div class="my-color color-primary">
                <div class="color-slug">' .  esc_html__("Primary" , 'grigora-kit') . '</div>
                <div class="color-picker"><div class="single-color" style="background-color: red;"><input type="hidden" id="hex4" /><input type="color" id="color4" /></div></div>
            </div>
            <div class="my-color color-secondary">
                <div class="color-slug">' .  esc_html__("Secondary" , 'grigora-kit') . '</div>
                <div class="color-picker"><div class="single-color" style="background-color: red;"><input type="hidden" id="hex5" /><input type="color" id="color5" /></div></div>
            </div>
            <div class="my-color color-button">
                <div class="color-slug">' .  esc_html__("Button" , 'grigora-kit') . '</div>
                <div class="color-picker"><div class="single-color" style="background-color: red;"><input type="hidden" id="hex6" /><input type="color" id="color6" /></div></div>
            </div>
            <div class="my-color color-buttontext">
                <div class="color-slug">' .  esc_html__("Button Text" , 'grigora-kit') . '</div>
                <div class="color-picker"><div class="single-color" style="background-color: red;"><input type="hidden" id="hex7" /><input type="color" id="color7" /></div></div>
                </div>
            </div>
            <div class="skip-back-btns">
                <div>
                    <div class="back-btn-step-2">' .  esc_html__("Back" , 'grigora-kit') . '</div>
                </div>
                <div>
                    <div class="continue-btn-step-2">' .  esc_html__("Skip" , 'grigora-kit') . '</div>
                </div>
            </div>
        </div>

        <div class="panel three">
            <h3>' .  esc_html__("Typography" , 'grigora-kit') . '</h3>
            <p>' .  esc_html__("Select fonts:" , 'grigora-kit') . '</p>
            <div class="fonts-collection">
                <div class="fonts-btns">
                    <div class="fonts-btns-single">
                        <span style="font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif">Aa</span>
                    </div>
                    <div class="fonts-btns-single">
                        <span style="font-family: Serif;">Aa</span>
                    </div>
                    <div class="fonts-btns-single">
                        <span style="font-family: Monospace;">Aa</span>
                    </div>
                </div>
            </div>
            <p>' .  esc_html__("Select base font size:" , 'grigora-kit') . '</p>
            <div>
                <input name="site-base-font-size" type="range" min="10" max="20" value="14" class="site-logosize" oninput="this.nextElementSibling.value = this.value">
                <input name="site-base-font-size-output" min="10" max="20" class="site-logosize-output" oninput="this.previousElementSibling.value = this.value" type="number" value="14"/>
            </div>
            <div class="skip-back-btns">
                <div>
                    <div class="back-btn-step-3">' .  esc_html__("Back" , 'grigora-kit') . '</div>
                </div>
                <div>
                    <div class="continue-btn-step-3">' .  esc_html__("Skip" , 'grigora-kit') . '</div>
                </div>
            </div>
        </div>

        <div class="panel four">
            <h3>' .  esc_html__("Layout" , 'grigora-kit') . '</h3>
            <p>' .  esc_html__("Container width:" , 'grigora-kit') . '</p>
            <div>
                <input name="site-container-width" type="range" min="800" max="1900" value="1200" class="site-logosize" id="site-logosize" oninput="this.nextElementSibling.value = this.value">
                <input name="site-container-width-output" min="800" max="1900" class="site-logosize-output" oninput="this.previousElementSibling.value = this.value" type="number" value="1200"/>
            </div>
            <p>' .  esc_html__( "Block Gap: ", 'grigora-kit' ). '</p>
            <div>
                <input name="site-block-gap" type="range" min="0" max="3" step="0.25" value="2" class="site-blockgap" id="site-blockgap" oninput="this.nextElementSibling.value = this.value">
                <input name="site-block-gap-output" min="0" max="3" class="site-logosize-output" oninput="this.previousElementSibling.value = this.value" type="number" value="2"/>
            </div>
            <div style="display:none;">
            <p>' .  esc_html__("Sidebar: " , 'grigora-kit') . '</p>
            <select class="site-sidebar-select" name="site-sidebar" id="site-sidebar">
                <option value="left">' .  esc_html__( "Left", 'grigora-kit' ). '</option>
                <option value="right">' .  esc_html__( "Right", 'grigora-kit' ). '</option>
                <option value="none">' .  esc_html__( "None", 'grigora-kit' ). '</option>
            </select>
            </div>
            <div class="skip-back-btns">
                <div>
                    <div class="back-btn-step-4">' .  esc_html__("Back" , 'grigora-kit') . '</div>
                </div>
                <div>
                    <div class="continue-btn-step-4">' .  esc_html__("Skip" , 'grigora-kit') . '</div>
                </div>
            </div>
        </div>

        <div class="panel five">
            <h3>' .  esc_html__("Finishing Up" , 'grigora-kit') . '</h3>
            <div>
                <input type="checkbox" id="site-installtheme" name="site-installtheme" value="grigora-blocks" checked>
                <label for="site-installtheme">' .  esc_html__("Install Grigora Blocks Theme" , 'grigora-kit') . '</label>
            </div>
            <div>
                <input type="checkbox" id="site-includemedia" name="site-includemedia" value="yes" checked>
                <label for="site-includemedia">' .  esc_html__("Include Assets" , 'grigora-kit') . '</label><br>
            </div>
            <div>
                <input type="checkbox" id="site-includeplugins" name="site-includeplugins" value="yes" checked>
                <label for="site-includeplugins">' .  esc_html__("Include Plugins" , 'grigora-kit') . '</label><br>
            </div>
            <div class="install-demo-consent">
            ' . sprintf("%s<a href='https://wpgrigora.com/terms-and-conditions/' target='_blank'>%s</a>%s<a href='https://wpgrigora.com/privacy-policy/' target='_blank'>%s</a>.", 
                        esc_html__("By clicking Install, you agree to our ", "grigora-kit"),
                        esc_html__("Terms", "grigora-kit"),
                        esc_html__(" and that you have read our ", "grigora-kit"),
                        esc_html__("Policy Policy", "grigora-kit")) . '
            </div>
            <div class="skip-back-btns">
                <div>
                    <div class="back-btn-step-5">' .  esc_html__("Back" , 'grigora-kit') . '</div>
                </div>
                <div>
                    <div id="install-demo-btn" class="continue-btn-step-5">' . esc_html__("Install" , 'grigora-kit')  .  '</div>
                </div>
            </div>
        </div>

        </div>
        </div>
        ';

        echo '<div style="display: none; background: url('. get_home_url() . '/wp-admin/images/spinner-2x.gif) no-repeat center;" class="preloader" id="" ></div>';

        echo '<iframe name="iframename" id="my-iframe-div" src="" title="Title" class="modal-iframe"></iframe>';
        echo '</div>';
        echo '</div>';
        echo '<div class="confirm-modal">';
        echo '<div class="confirm-modal-content">';
        echo '<div class="background">';      
        echo '<p>' . esc_html( __( "Please go through the following points before installing a demo: ", 'grigora-kit' )).'</p>';
        echo '<ol>
        <li>
        ' . esc_html( __( "New Demo install will remove all your current template related changes.", 'grigora-kit' )).'
        </li>
        <li>
        ' . esc_html( __( "It will reset all the global styles for your website.", 'grigora-kit' )).'
        </li>
        <li>
        '.esc_html( __( "The demo templates text is non translated. Do not expect it to translate to your Wordpress Site Language.", 'grigora-kit' )).'
        </li>
        <li>
        '.esc_html( __( "Demo Templates will install their palette of color styles. It can take up to a few seconds to reflect these colors on the website.", 'grigora-kit')) . "<br />" . 
        esc_html( __( "Ensure you don't have a caching plugin active while installing demo templates; otherwise, color changes may not be reflected.", 'grigora-kit' )).'
        </li>
        </ol>';
        echo '<p>'.esc_html( __( "Are you sure?", 'grigora-kit' )).'</p>';
        echo '<div class="confirm-btn">';
        echo '<p class="close-btn">'.esc_html( __( "Cancel", 'grigora-kit' )).'</p>';
        echo '<button type="submit" value="Submit" form="demo-import-form" class="c-btn">'.esc_html( __( "Yes", 'grigora-kit' )).'</button>';
        echo '</div>';
        echo '</div>';
        echo '</div>';
        echo '</div>'; 
    
        foreach ($json as $template => $template_meta) {
            echo '<div style="z-index: 2;" class="grigora-templates-single"
            data-name="' . esc_attr( $template_meta['name'] ) . '" 
            data-category=\'' . esc_attr( json_encode($template_meta['category']) ) . '\' 
            >';
            echo '<div class="grigora-screenshot">';
            if( $template_meta["local_image"] ){
                echo '<img src="' . esc_url( GRIGORA_KIT_URL . '/assets/images/starter-templates/' . $template_meta['screenshot']) . '" alt="' . esc_attr( $template_meta['name'] ) .'" width="300" height="300">';
            }
            else{
                echo '<img src="' . esc_url($template_meta['screenshot']) . '" alt="' . esc_attr( $template_meta['name'] ) . '" width="300" height="300">';
            }
            echo '</div>';
            echo '<div class="grigora-template-name">';
            echo esc_html($template_meta['name']);
            echo '</div>';
            echo '<div class="demo-overlay"
                data-name="'. esc_attr($template_meta['name']).'" 
                data-slug="'.esc_attr( $template_meta['slug']).'" 
                data-demo_url="'.esc_url($template_meta['demo_url']).'" 
                data-description="'.esc_attr($template_meta['description']).'" 
                >';
            echo '<button class="view-btn"  
            data-name="'.esc_attr($template_meta['name']).'" 
            data-slug="'.esc_attr($template_meta['slug']).'" 
            data-description="'.esc_attr($template_meta['description']).'" 
            >Import</button>';
            echo '</div>';
            echo '</div>';
        }        
    
        echo '</div>';
        
        echo '<p class="coming-soon">'.esc_html( __( "More Templates Coming Soon ", 'grigora-kit' )).'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="16" height="16" viewBox="0 0 256 256" xml:space="preserve">
        <defs>
        </defs>
        <g transform="translate(128 128) scale(0.72 0.72)" style="">
            <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)" >
            <path d="M 7.486 13.502 c 9.982 -9.982 26.165 -9.982 36.147 0 L 45 14.869 l 0 0 c 6.895 22.882 6.259 47.092 0 72.294 L 26.927 69.089 c 0 0 0 0 0 0 l -19.44 -19.44 C -2.495 39.667 -2.495 23.484 7.486 13.502 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(214,73,62); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
            <path d="M 82.514 13.502 c -9.982 -9.982 -26.165 -9.982 -36.147 0 L 45 14.869 l 0 0 v 72.294 l 18.073 -18.073 c 0 0 0 0 0 0 l 19.44 -19.44 C 92.495 39.667 92.495 23.484 82.514 13.502 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(214,73,62); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        </g>
        </g>
        </svg></p>
        <div class="starter-templates-footer">
        <div class="consent-info">
        ' . sprintf("%s <a href=\"https://wpgrigora.com/\" target='_blank'>wpgrigora.com</a>", esc_html__( "This page is loaded from", 'grigora-kit' )) . '
        </div>
        <div class="refresh-data-btn-wrapper">
        <form action="' . admin_url("admin-post.php") . '" method="post">
        <input id="grigora_template_meta_transient_reset" type="hidden" name="action" value="grigora_template_meta_transient_reset">
        '. wp_nonce_field( 'grigora_template_meta_transient_reset', 'grigora_template_meta_transient_reset' ) .'
        <button class="button-secondary align-center">' .  esc_html__( "Refresh Data", 'grigora-kit' ). '</button>
        </form>
        </div>
        </div>';
    }
}

/**
 * Get updated templates meta from option.
 */
if(!function_exists("grigora_st_get_template_meta")){
    function grigora_st_get_template_meta(){
        $meta = get_option("grigora_st_templates_meta", false);
        if($meta){
            return $meta;
        }
        else{
            return "{}";
        }
    
    }
}

/**
 * Update transient to dynamically fetch templates meta every 3 day.
 */
if(!function_exists("grigora_st_update_transient_meta")){
    function grigora_st_update_transient_meta(){
        if ( get_transient( 'grigora_st_templates_meta_updated_flag' ) ){
            return;
        }

        $url = "https://wpgrigora.com/wp-content/templates-meta.json";

        $response = wp_remote_get(
            $url,
            array(
                'timeout' => 60,
                'sslverify' => false
            )
        );

        if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
            return false;
        }
        $response = json_decode( wp_remote_retrieve_body( $response ), true );
        if( $response ){
            set_transient(
                'grigora_st_templates_meta_updated_flag',
                1,
                ( 60 * 60 * 12 * 3 )
            );
            update_option("grigora_st_templates_meta", json_encode($response) );
            return;
        }

        return false;
    
    }
}

add_action( 'admin_init', 'grigora_st_update_transient_meta' );

add_action( 'admin_post_grigora_template_meta_transient_reset', 'grigora_template_meta_transient_reset' );

/**
 * Refresh templates meta by deleting the transient.
 */
if(!function_exists("grigora_template_meta_transient_reset")){
    function grigora_template_meta_transient_reset() {
        if(
            isset($_POST["grigora_template_meta_transient_reset"])
        ){
            if ( ! wp_verify_nonce( $_POST["grigora_template_meta_transient_reset"], 'grigora_template_meta_transient_reset' ) ) {
                wp_die( __( 'The link you followed has expired.', 'grigora-kit' ) ); 
            } else {
                
                delete_transient( "grigora_st_templates_meta_updated_flag" );
                        
                wp_redirect(admin_url('admin.php?page=grigora-kit-templates'));
            }
        }
        else{
            wp_die( __( 'Fill the form.', 'grigora-kit' ) ); 
        }
    }
}
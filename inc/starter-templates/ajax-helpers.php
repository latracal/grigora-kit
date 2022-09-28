<?php
/**
 * Ajax Functions to Import Templates.
 *
 * @package grigora-kit
 */

if ( ! function_exists( 'grigora_st_plugin_exists' ) ) {
	/**
	 * Helper to check if plugin exists.
	 *
	 * @param string $slug Plugin Slug.
	 */
	function grigora_st_plugin_exists( $slug ) {
		$slug        = sanitize_key( wp_unslash( $slug ) );
		$all_plugins = get_plugins();
		foreach ( $all_plugins as $path => $plugin ) {
			if ( $plugin['TextDomain'] === $slug ) {
				return true;
			}
		}
		return false;
	}
}

if ( ! function_exists( 'grigora_st_plugin_path' ) ) {
	/**
	 * Helper to get specified plugin path.
	 *
	 * @param string $slug Plugin Slug.
	 */
	function grigora_st_plugin_path( $slug ) {
		$slug        = sanitize_key( wp_unslash( $slug ) );
		$all_plugins = get_plugins();
		foreach ( $all_plugins as $path => $plugin ) {
			if ( $plugin['TextDomain'] === $slug ) {
				return $path;
			}
		}
		return '';
	}
}

if ( ! function_exists( 'grigora_st_get_files' ) ) {
	/**
	 * Function to get all assets.
	 */
	function grigora_st_get_files() {
		check_ajax_referer( 'grigora-st', '_nonce' );
		// Checking if data is received or not.
		if ( isset( $_POST['data'] ) && isset( $_POST['notskip'] ) ) {

			// Sanitization.
			$file    = esc_url_raw( $_POST['data'] );
			$notskip = rest_sanitize_boolean( $_POST['notskip'] );

			// Not skip is variable used to specify where we have to do this step or not.
			if ( false === $notskip ) {
				wp_send_json_success(
					array(
						'success' => true,
						'message' => __( 'Asset Not Imported', 'grigora-kit' ),
						'data'    => false,
					)
				);
			}
			$meta_value = grigora_st_download_image( $file );
			wp_send_json_success(
				array(
					'success' => true,
					'message' => __( 'Asset Imported', 'grigora-kit' ),
					'data'    => $meta_value,
				)
			);
		} else {
			wp_send_json_error( __( 'Missing fields.', 'grigora-kit' ) );
		}
	}
}

if ( ! function_exists( 'grigora_st_get_image' ) ) {
	/**
	 * Ajax action to refresh the user image in Starter Templates.
	 */
	function grigora_st_get_image() {
		if ( isset( $_GET['id'] ) ) {
			$image = wp_get_attachment_image( filter_input( INPUT_GET, 'id', FILTER_VALIDATE_INT ), 'medium', false, array( 'id' => 'grigora_st-preview-image' ) );
			$data  = array(
				'image' => $image,
			);
			wp_send_json_success( $data );
		} else {
			wp_send_json_error( __( 'Missing fields.', 'grigora-kit' ) );
		}
	}
}

if ( ! function_exists( 'grigora_st_activate_theme' ) ) {
	/**
	 * AJAX to activate theme.
	 */
	function grigora_st_activate_theme() {
		check_ajax_referer( 'grigora-st', '_nonce' );
		if ( isset( $_POST['theme'] ) && isset( $_POST['notskip'] ) ) {

			// Sanitization.
			$theme   = sanitize_key( $_POST['theme'] );
			$notskip = rest_sanitize_boolean( $_POST['notskip'] );

			if ( false === $notskip ) {
				wp_send_json_success(
					array(
						'success' => true,
					)
				);
			}
			if ( ! current_user_can( 'customize' ) ) {
				wp_send_json_error( __( 'Not allowed.', 'grigora-kit' ) );
			}

			switch_theme( $theme );
			wp_send_json_success(
				array(
					'success' => true,
					'message' => __( 'Grigora Blocks Activated', 'grigora-kit' ),
				)
			);
		} else {
			wp_send_json_error( __( 'Missing fields.', 'grigora-kit' ) );
		}
	}
}

if ( ! function_exists( 'grigora_st_check_theme' ) ) {
	/**
	 * AJAX to check current theme is matching or not.
	 */
	function grigora_st_check_theme() {
		check_ajax_referer( 'grigora-st', '_nonce' );
		$theme = 'grigora-blocks';
		// It is checking if the theme matches or not.
		$current_theme = wp_get_theme()->get( 'TextDomain' );
		if ( ! strcmp( $current_theme, $theme ) ) {
			wp_send_json_error( __( 'Theme is not matching', 'grigora-kit' ) );
		}
		wp_send_json_success(
			array(
				'success' => true,
				'message' => __( 'Grigora Blocks Checked', 'grigora-kit' ),
			)
		);
	}
}

if ( ! function_exists( 'grigora_st_activate_plugin' ) ) {
	/**
	 * Activate Plugin.
	 */
	function grigora_st_activate_plugin() {
		check_ajax_referer( 'grigora-st', '_nonce' );
		if ( isset( $_POST['notskip'] ) ) {

			// Sanitization.
			$notskip = rest_sanitize_boolean( $_POST['notskip'] );

			if ( false === $notskip ) {
				wp_send_json_success(
					array(
						'success' => true,
					)
				);
			}
		}

		// Sanitization.
		$clean_slug = sanitize_key( wp_unslash( $_POST['slug'] ) );

		require_once ABSPATH . '/wp-admin/includes/plugin.php';
		$plugin_status = array();
		if ( grigora_st_plugin_exists( $clean_slug ) ) {
			$result = activate_plugin( grigora_st_plugin_path( $clean_slug ) );
			if ( is_wp_error( $result ) ) {
				array_push( $plugin_status, "Can't activate" );
			} else {
				array_push( $plugin_status, true );
			}
		} else {
			array_push( $plugin_status, 'Invalid plugin' );
		}
		wp_send_json_success(
			array(
				'success'  => true,
				'message'  => __( 'Activated required plugin', 'grigora-kit' ),
				'response' => $plugin_status,
			)
		);

	}
}

if ( ! function_exists( 'grigora_st_install_theme' ) ) {
	/**
	 * Install Theme.
	 */
	function grigora_st_install_theme() {
		check_ajax_referer( 'grigora-st', '_nonce' );

		// Sanitization.
		$notskip = rest_sanitize_boolean( $_POST['notskip'] );
		$slug    = sanitize_key( wp_unslash( $_POST['slug'] ) );

		if ( false === $notskip ) {
			wp_send_json_success(
				array(
					'success' => true,
				)
			);
		}
		if ( empty( $slug ) ) {
			wp_send_json_success(
				array(
					'success' => true,
					'message' => __( 'No theme specified, using current theme', 'grigora-kit' ),
				)
			);
		}

		if ( wp_get_theme( $slug )->exists() ) {
			wp_send_json_success(
				array(
					'success' => true,
					'message' => __( 'Theme already installed.', 'grigora-kit' ),
				)
			);
		}

		$status = array(
			'install' => 'theme',
			'slug'    => $slug,
		);

		if ( ! current_user_can( 'install_themes' ) ) {
			wp_send_json_error( __( 'Sorry, you are not allowed to install themes on this site.', 'grigora-kit' ) );
		}

		require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
		include_once ABSPATH . 'wp-admin/includes/theme.php';

		$api = themes_api(
			'theme_information',
			array(
				'slug'   => $slug,
				'fields' => array( 'sections' => false ),
			)
		);

		if ( is_wp_error( $api ) ) {
			wp_send_json_error( $api->get_error_message() );
		}

		$skin     = new WP_Ajax_Upgrader_Skin();
		$upgrader = new Theme_Upgrader( $skin );
		$result   = $upgrader->install( $api->download_link );

		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			$status['debug'] = $skin->get_upgrade_messages();
		}

		if ( is_wp_error( $result ) ) {
			$status['errorCode']    = $result->get_error_code();
			$status['errorMessage'] = $result->get_error_message();
			wp_send_json_error( $status );
		} elseif ( is_wp_error( $skin->result ) ) {
			$status['errorCode']    = $skin->result->get_error_code();
			$status['errorMessage'] = $skin->result->get_error_message();
			wp_send_json_error( $status );
		} elseif ( $skin->get_errors()->has_errors() ) {
			$status['errorMessage'] = $skin->get_error_messages();
			wp_send_json_error( $skin->get_error_message() );
		} elseif ( is_null( $result ) ) {
			global $wp_filesystem;

			$status['errorCode']    = 'unable_to_connect_to_filesystem';
			$status['errorMessage'] = __( 'Unable to connect to the filesystem. Please confirm your credentials.', 'grigora-kit' );

			// Pass through the error from WP_Filesystem if one was raised.
			if ( $wp_filesystem instanceof WP_Filesystem_Base && is_wp_error( $wp_filesystem->errors ) && $wp_filesystem->errors->has_errors() ) {
				$status['errorMessage'] = esc_html( $wp_filesystem->errors->get_error_message() );
			}
			wp_send_json_error( $status );
		}

		$status['themeName'] = wp_get_theme( $slug )->get( 'Name' );

		if ( ! is_multisite() && current_user_can( 'edit_theme_options' ) && current_user_can( 'customize' ) ) {
			$status['customizeUrl'] = add_query_arg(
				array(
					'return' => rawurlencode( network_admin_url( 'theme-install.php', 'relative' ) ),
				),
				wp_customize_url( $slug )
			);
		}
		wp_send_json_success(
			array(
				'success' => true,
				'message' => __( 'Grigora Blocks Installed', 'grigora-kit' ),
				'data'    => $status,
			)
		);
	}
}

if ( ! function_exists( 'grigora_st_install_plugin' ) ) {
	/**
	 * Install Plugin.
	 */
	function grigora_st_install_plugin() {
		check_ajax_referer( 'grigora-st', '_nonce' );

		// Sanitization.
		$notskip = rest_sanitize_boolean( $_POST['notskip'] );

		if ( false === $notskip ) {
			wp_send_json_success(
				array(
					'success' => true,
				)
			);
		}

		$statuses = array();

		$slug = sanitize_key( wp_unslash( $_POST['slug'] ) );
		if( in_array( $slug, array( 'grigora-kitblocks' ), true ) ){
			array_push( $statuses, false );
			wp_send_json_success(
				array(
					'success' => true,
					'message' => __( 'Already Installed', 'grigora-kit' ),
					'data'    => $statuses,
				)
			);
		}

		if ( grigora_st_plugin_exists( $slug ) ) {
			array_push( $statuses, false );
			wp_send_json_success(
				array(
					'success' => true,
					'message' => __( 'Installed Required Plugin', 'grigora-kit' ),
					'data'    => $statuses,
				)
			);
			return;
		}

		$status = array(
			'install' => 'plugin',
			'slug'    => $slug,
		);

		if ( ! current_user_can( 'install_plugins' ) ) {
			wp_send_json_error( __( 'Sorry, you are not allowed to install plugins on this site.', 'grigora-kit' ) );
		}

		require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
		include_once ABSPATH . 'wp-admin/includes/plugin-install.php';

		$api = plugins_api(
			'plugin_information',
			array(
				'slug'   => sanitize_key( wp_unslash( $slug ) ),
				'fields' => array(
					'sections' => false,
				),
			)
		);

		if ( is_wp_error( $api ) ) {
			array_push( $statuses, false );
		}

		$status['pluginName'] = property_exists($api, 'name') ? $api->name : '';

		$skin     = new WP_Ajax_Upgrader_Skin();
		$upgrader = new Plugin_Upgrader( $skin );
		$result   = $upgrader->install( property_exists($api, 'download_link') ? $api->download_link : '' );

		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			$status['debug'] = $skin->get_upgrade_messages();
		}

		if ( is_wp_error( $result ) ) {
			$status['errorCode']    = $result->get_error_code();
			$status['errorMessage'] = $result->get_error_message();
		} elseif ( is_wp_error( $skin->result ) ) {
			$status['errorCode']    = $skin->result->get_error_code();
			$status['errorMessage'] = $skin->result->get_error_message();
		} elseif ( $skin->get_errors()->has_errors() ) {
			$status['errorMessage'] = $skin->get_error_messages();
		} elseif ( is_null( $result ) ) {
			global $wp_filesystem;

			$status['errorCode']    = 'unable_to_connect_to_filesystem';
			$status['errorMessage'] = __( 'Unable to connect to the filesystem. Please confirm your credentials.', 'grigora-kit' );

			// Pass through the error from WP_Filesystem if one was raised.
			if ( $wp_filesystem instanceof WP_Filesystem_Base && is_wp_error( $wp_filesystem->errors ) && $wp_filesystem->errors->has_errors() ) {
				$status['errorMessage'] = esc_html( $wp_filesystem->errors->get_error_message() );
			}
		}
		array_push( $statuses, $status );

		wp_send_json_success(
			array(
				'success' => true,
				'message' => __( 'Installed Required Plugin', 'grigora-kit' ),
				'data'    => $statuses,
			)
		);
	}
}

if ( ! function_exists( 'grigora_ste_image_meta' ) ) {
	/**
	 * Helper to get attachment url.
	 *
	 * @param int $id Media ID.
	 */
	function grigora_ste_image_meta( $id ) {
		if ( empty( $id ) ) {
			return false;
		}
		return array(
			'id'  => $id,
			'url' => wp_get_attachment_url( $id ),
		);
	}
}

if ( ! function_exists( 'grigora_ste_download_image' ) ) {
	/**
	 * Helper to download image from URL.
	 *
	 * @param string $url Image URL.
	 */
	function grigora_ste_download_image( $url ) {

		require_once ABSPATH . 'wp-admin/includes/media.php';
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';

		if ( empty( $url ) || ! is_string( $url ) ) {
			return false;
		}

		preg_match( '/[^\?]+\.(jpe?g|jpe|png|webp)\b/i', $url, $file_name );
		$file_name  = basename( $file_name[0] );
		$temp_image = download_url( $url );

		if ( is_wp_error( $temp_image ) ) {
			return false;
		}

		$image_id = media_handle_sideload(
			array(
				'name'     => $file_name,
				'tmp_name' => $temp_image,
			),
			0
		);

		if ( is_wp_error( $image_id ) ) {
			unlink( $temp_image );
			return false;
		}

		return grigora_ste_image_meta( $image_id );
	}
}

if ( ! function_exists( 'grigora_ste_createslug' ) ) {
	/**
	 * Create Slug from String.
	 *
	 * @param string $str       String to convert.
	 * @param string $delimiter Delimiter Character String.
	 */
	function grigora_ste_createslug( $str, $delimiter = '-' ) {
		$slug = strtolower( trim( preg_replace( '/[\s-]+/', $delimiter, preg_replace( '/[^A-Za-z0-9-]+/', $delimiter, preg_replace( '/[&]/', 'and', preg_replace( '/[\']/', '', iconv( 'UTF-8', 'ASCII//TRANSLIT', $str ) ) ) ) ), $delimiter ) );
		return $slug;
	}
}

if ( ! function_exists( 'grigora_ste_image_links_replace' ) ) {
	/**
	 * Replace Starter Templates Image Links with Downloaded URLs.
	 *
	 * @param string $content     Content String.
	 * @param array  $images      Images URL.
	 * @param array  $imageslocal Local Image Url.
	 */
	function grigora_ste_image_links_replace( $content, $images, $imageslocal ) {
		if ( empty( $content ) || empty( $images ) || empty( $imageslocal ) ) {
			return $content;
		}
		foreach ( $images as $image ) {
			$grigoraimageid = $image['id'];
			$localimage     = isset( $imageslocal[ $grigoraimageid ] ) ? $imageslocal[ $grigoraimageid ] : '';
			if ( ! $localimage ) {
				$content = str_replace( '{grigoraimageurl' . $grigoraimageid . '}', '', $content );
			} else {
				$content = str_replace( '{grigoraimageurl' . $grigoraimageid . '}', $localimage, $content );
			}
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_ste_theme_slug_replace' ) ) {
	/**
	 * Replace Theme slug in Starter Templates.
	 *
	 * @param string $content Content String.
	 */
	function grigora_ste_theme_slug_replace( $content ) {
		if ( empty( $content ) ) {
			return $content;
		}
		$content = str_replace( '{themeslug}', get_theme_slug(), $content );
		return $content;
	}
}

if ( ! function_exists( 'grigora_ste_theme_sitelogowidth_replace' ) ) {
	/**
	 * Replace Site Logo Width in Starter Templates.
	 *
	 * @param string $content       Content String.
	 * @param string $sitelogowidth Site Logo Width.
	 */
	function grigora_ste_theme_sitelogowidth_replace( $content, $sitelogowidth ) {
		if ( $sitelogowidth ) {
			$content = str_replace( '"{grigorasitelogowidth}"', $sitelogowidth, $content );
			return $content;
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_ste_wpforms_replace' ) ) {
	/**
	 * Replace WPForms in Starter Templates.
	 *
	 * @param string $content        Content String.
	 * @param array  $wpforms_id_map WP Forms Data.
	 */
	function grigora_ste_wpforms_replace( $content, $wpforms_id_map ) {
		if ( empty( $wpforms_id_map ) ) {
			return $content;
		}
		foreach ( $wpforms_id_map as $old => $new ) {
			$content = str_replace( '{grigorawpform' . $old . '}', $new, $content );
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_ste_page_links_replace' ) ) {
	/**
	 * Replace Page Links in Starter Templates.
	 *
	 * @param string $content   Content String.
	 * @param array  $pagelinks Links Data.
	 */
	function grigora_ste_page_links_replace( $content, $pagelinks ) {
		foreach ( $pagelinks as $id => $url ) {
			$content = str_replace( '{grigorapageurl' . $id . '}', $url, $content );
		}
		return $content;
	}
}

if ( ! function_exists( 'grigora_ste_template_post_exists' ) ) {
	/**
	 * Check if specified template exists in database.
	 * Credits: FSE Design Import/Export.
	 *
	 * @param string $post_name  Post Name String.
	 * @param string $post_type  Post Type.
	 * @param string $theme_slug Theme Slug.
	 */
	function grigora_ste_template_post_exists( $post_name = '', $post_type = '', $theme_slug = '' ) {

		global $wpdb;

		if ( '' === $post_name ) {
			$todo = array(
				'post_id' => 0,
				'action'  => 'nowt',
			);
		} else {
			if ( 'wp_template' === $post_type || 'wp_template_part' === $post_type ) {

				$post_id_update = 0;

				$template_posts = $wpdb->get_results( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_name = %s AND post_type = %s", $post_name, $post_type ) );

				if ( $template_posts ) {
					foreach ( $template_posts as $template_post ) {
						$post_id = $template_post->ID;
						$terms   = get_the_terms( $post_id, 'wp_theme' );
						if ( $terms && $terms[0]->slug === $theme_slug ) {
							$post_id_update = $post_id;
							break;
						}
					}
					if ( $post_id_update ) {
						$todo = array(
							'post_id' => $post_id_update,
							'action'  => 'update',
						);
					} else {
						$todo = array(
							'post_id' => 0,
							'action'  => 'insert',
						);
					}
				} else {
					$todo = array(
						'post_id' => 0,
						'action'  => 'insert',
					);
				}
			} elseif ( 'wp_global_styles' === $post_type ) {

				$post_id = $wpdb->get_row( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_name = %s AND post_type = %s", $post_name, $post_type ) );
				if ( $post_id ) {
					$todo = array(
						'post_id' => $post_id->ID,
						'action'  => 'update',
					);
				} else {
					$todo = array(
						'post_id' => 0,
						'action'  => 'insert',
					);
				}
			} else {
				$todo = array(
					'post_id' => 0,
					'action'  => 'nowt',
				);
			}
		}

		return $todo;

	}
}

if ( ! function_exists( 'grigora_ste_templates_slug_fix' ) ) {
	/**
	 * Fix templates slug in db.
	 * Credits: FSE Design Import/Export.
	 *
	 * @param string $post_id Post ID.
	 * @param string $slug    Slug to fix.
	 */
	function grigora_ste_templates_slug_fix( $post_id, $slug ) {
		global $wpdb;
		$wpdb->update( $wpdb->prefix . 'posts', array( 'post_name' => $slug ), array( 'ID' => $post_id ), '%s', '%d' );
	}
}

if ( ! function_exists( 'grigora_st_get_current_template_meta' ) ) {
	/**
	 * Get Current Templates Meta.
	 *
	 * @param string $meta_url Meta URL.
	 */
	function grigora_st_get_current_template_meta( $meta_url ) {
		if ( ! $meta_url ) {
			return false;
		}
		$response = wp_remote_get(
			$meta_url,
			array(
				'timeout'   => 60,
				'sslverify' => false,
			)
		);
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			return false;
		}
		$response = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( $response ) {
			return $response;
		}
		return false;
	}
}

if ( ! function_exists( 'grigora_st_import_demo' ) ) {
	/**
	 * Main import Demo Logic.
	 */
	function grigora_st_import_demo() {
		check_ajax_referer( 'grigora-st', '_nonce' );
		if ( isset( $_POST['template'] ) ) {

			/**
			 * Data of known templates which are compatible with Grigora Blocks.
			*/
			$templates_json = array(
				'templates' => array(
					'404'                                  => array(
						'name' => '404',
					),
					'archive'                              => array(
						'name' => 'Archive',
					),
					'blank'                                => array(
						'name' => 'Blank',
					),
					'index'                                => array(
						'name' => 'Index',
					),
					'home'                                 => array(
						'name' => 'Home',
					),
					'front-page'                           => array(
						'name' => 'Front Page',
					),
					'no-sidebar-fullwidth-page-template'   => array(
						'name' => 'No Sidebar Page - Full Width',
					),
					'no-sidebar-page-template'             => array(
						'name' => 'No Sidebar Page',
					),
					'no-sidebar-post-template'             => array(
						'name' => 'No Sidebar Post',
					),
					'no-sidebar-widewidth-page-template'   => array(
						'name' => 'No Sidebar Page - Wide Width',
					),
					'no-sidebar-widewidth-n-back-template' => array(
						'name' => 'No Sidebar No Background - Wide Width',
					),
					'no-sidebar-widewidth-post-template'   => array(
						'name' => 'No Sidebar Post - Wide Width',
					),
					'no-title-template'                    => array(
						'name' => 'No title',
					),
					'page'                                 => array(
						'name' => 'Page',
					),
					'search'                               => array(
						'name' => 'Search',
					),
					'single'                               => array(
						'name' => 'Single',
					),
				),
				'parts'     => array(
					'header'             => array(
						'title' => 'Header',
						'area'  => 'header',
					),
					'transparent-header' => array(
						'title' => 'Transparent Header',
						'area'  => 'header',
					),
					'sidebar'            => array(
						'title' => 'Sidebar',
						'area'  => 'sidebar',
					),
					'footer'             => array(
						'title' => 'Footer',
						'area'  => 'footer',
					),
					'footer-1'           => array(
						'title' => 'Footer-1',
						'area'  => 'footer',
					),
					'footer-2'           => array(
						'title' => 'Footer-2',
						'area'  => 'footer',
					),
					'footer-3'           => array(
						'title' => 'Footer-3',
						'area'  => 'footer',
					),
					'footer-4'           => array(
						'title' => 'Footer-4',
						'area'  => 'footer',
					),
					'footer-5'           => array(
						'title' => 'Footer-5',
						'area'  => 'footer',
					),
					'footer-6'           => array(
						'title' => 'Footer-6',
						'area'  => 'footer',
					),
					'footer-7'           => array(
						'title' => 'Footer-7',
						'area'  => 'footer',
					),
				),
			);

			// Sanitization of post data.
			$template          = $_POST['template'];
			$downloaded_files  = isset( $_POST['downloaded_files_data'] ) ? $_POST['downloaded_files_data'] : array();
			$site_logo         = ( isset( $_POST['site_logo'] ) && $_POST['site_logo'] ) ? esc_url_raw( wp_unslash( $_POST['site_logo'] ) ) : '';
			$site_logowidth    = ( isset( $_POST['site_logosize'] ) && $_POST['site_logosize'] ) ? absint( $_POST['site_logosize'] ) :
							( ( isset( $json['sitelogowidth'] ) && $json['sitelogowidth'] ) ? absint( $json['sitelogowidth'] ) : 40 );
			$site_name         = ( isset( $_POST['site_name'] ) && $_POST['site_name'] ) ? sanitize_text_field( $_POST['site_name'] ) :
							( ( isset( $json['site_title'] ) && $json['site_title'] ) ? sanitize_text_field( $json['site_title'] ) : '' );
			$site_tagline      = ( isset( $_POST['site_tagline'] ) && $_POST['site_tagline'] ) ? sanitize_text_field( $_POST['site_tagline'] ) :
							( ( isset( $json['site_tagline'] ) && $json['site_tagline'] ) ? sanitize_text_field( $json['site_tagline'] ) : '' );
			$color_background  = ( isset( $_POST['color_background'] ) && $_POST['color_background'] ) ? grigora_sanitize_color( $_POST['color_background'] ) : '';
			$color_canavas     = ( isset( $_POST['color_canavas'] ) && $_POST['color_canavas'] ) ? grigora_sanitize_color( $_POST['color_canavas'] ) : '';
			$color_foreground  = ( isset( $_POST['color_foreground'] ) && $_POST['color_foreground'] ) ? grigora_sanitize_color( $_POST['color_foreground'] ) : '';
			$color_primary     = ( isset( $_POST['color_primary'] ) && $_POST['color_primary'] ) ? grigora_sanitize_color( $_POST['color_primary'] ) : '';
			$color_secondary   = ( isset( $_POST['color_secondary'] ) && $_POST['color_secondary'] ) ? grigora_sanitize_color( $_POST['color_secondary'] ) : '';
			$color_button      = ( isset( $_POST['color_button'] ) && $_POST['color_button'] ) ? grigora_sanitize_color( $_POST['color_button'] ) : '';
			$color_button_text = ( isset( $_POST['color_button_text'] ) && $_POST['color_button_text'] ) ? grigora_sanitize_color( $_POST['color_button_text'] ) : '';
			$font_family       = ( isset( $_POST['font_family'] ) && $_POST['font_family'] ) ? sanitize_text_field( $_POST['font_family'] ) : '';
			$font_size         = ( isset( $_POST['font_size'] ) && $_POST['font_size'] ) ? floatval( $_POST['font_size'] ) : '';
			$container_width   = ( isset( $_POST['container_width'] ) && $_POST['container_width'] ) ? floatval( $_POST['container_width'] ) : '';
			$block_gap         = ( isset( $_POST['block_gap'] ) && $_POST['block_gap'] ) ? floatval( $_POST['block_gap'] ) : '';

			$toclear = array();

			$json = grigora_st_get_template_meta();
			$json = json_decode( $json, true );

			if ( ! isset( $json[ $template ] ) ) {
				wp_send_json_error( __( 'Template not in JSON.', 'grigora-kit' ) );
				return;
			}
			$json = $json[ $template ];

			// Get current meta from remote.
			if ( isset( $json['json_url'] ) ) {
				$new_json = grigora_st_get_current_template_meta( rtrim( $json['json_url'], '/' ) . '?version=' . time() );
				if ( $new_json ) {
					$json = $new_json;
				} else {
					wp_send_json_error( __( 'Template Block Markup not found.', 'grigora-kit' ) );
				}
			}

			// Site logo.
			if ( $site_logo ) {
				$website_logo = grigora_ste_download_image( $site_logo );
				if ( $website_logo ) {
					update_option( 'site_logo', $website_logo['id'] );
				}
			} else {
				if ( array_key_exists( 'logo', $json ) ) {
					$site_logo    = esc_url_raw( wp_unslash( $json['logo'] ) );
					$website_logo = grigora_ste_download_image( $site_logo );
					if ( $website_logo ) {
						update_option( 'site_logo', $website_logo['id'] );
					}
				}
			}

			// Site title.
			if ( $site_name ) {
				update_option( 'blogname', $site_name );
			}

			// Site Tagline.
			if ( $site_tagline ) {
				update_option( 'blogdescription', $site_tagline );
			}

			// Wpforms.
			$wpforms_id_map = array();

			// Import wpforms requirement.
			if ( in_array( 'wpforms-lite', $json['requirements'], true ) ) {

				if ( array_key_exists( 'wpforms-lite', $json['requirements_data'] ) ) {
					foreach ( $json['requirements_data']['wpforms-lite'] as $wpformid => $wpform ) {
						$args        = array(
							'post_title'     => $wpform['title'],
							'post_content'   => $wpform['content'],
							'comment_status' => 'closed',
							'ping_status'    => 'closed',
							'post_name'      => grigora_ste_createslug( $wpform['title'] ),
							'post_status'    => 'publish',
							'post_type'      => 'wpforms',
						);
						$new_post_id = wp_insert_post( wp_slash( $args ), true );
						if ( $new_post_id ) {
							$wpforms_id_map[ $wpformid ] = $new_post_id;
						}
					}
				}
			}

			// Grigora kit blocks requirement.
			if ( in_array( 'grigora-kit/blocks', $json['requirements'], true ) ) {
				grigora_set_setting( 'advanced_blocks', true );
			}

			// Site options.
			if ( array_key_exists( 'site_options', $json ) ) {
				foreach ( $json['site_options'] as $site_option => $site_option_value ) {
					update_option( $site_option, $site_option_value );
				}
			}

			// Import query posts.
			if ( $json['query_posts'] ) {
				foreach ( $json['query_posts'] as $query_post_key => $query_post ) {
					$args        = array(
						'post_title'     => $query_post['post_title'],
						'post_content'   => $query_post['post_content'],
						'comment_status' => $query_post['comment_status'],
						'ping_status'    => $query_post['ping_status'],
						'post_name'      => $query_post['post_name'],
						'post_status'    => 'publish',
						'post_type'      => $query_post['post_type'],
					);
					$new_post_id = wp_insert_post( wp_slash( $args ), true );
					if ( $new_post_id ) {
						if ( isset( $query_post['thumbnail'] ) && $query_post['thumbnail'] ) {
							$thumbnail_id = grigora_ste_download_image( $query_post['thumbnail'] );
							if ( $thumbnail_id ) {
								set_post_thumbnail( $new_post_id, $thumbnail_id['id'] );
							}
						}
					}
				}
			}

			$new_page_links = array();
			// Importing pages.
			$new_files = $json['exportpages'];
			foreach ( $new_files as $slug => $new_file ) {
				$contents = $new_file["content"];
				$contents = grigora_ste_image_links_replace( $contents, $json['files'], $downloaded_files );

				$contents = grigora_ste_theme_slug_replace( $contents );
				$contents = grigora_ste_theme_sitelogowidth_replace( $contents, $site_logowidth );
				$contents = grigora_ste_wpforms_replace( $contents, $wpforms_id_map );
				$contents = _inject_theme_attribute_in_block_template_content( $contents );

				$args        = array(
					'post_title'   => $new_file['post_title'],
					'post_content' => $contents,
					'post_name'    => $new_file['slug'],
					'post_status'  => 'publish',
					'post_type'    => 'page',
				);
				$new_post_id = wp_insert_post( wp_slash( $args ), true );
				if ( $new_post_id ) {
					if ( isset( $new_file['thumbnail'] ) && $new_file['thumbnail'] ) {
						$thumbnail_id = grigora_ste_download_image( $new_file['thumbnail'] );
						if ( $thumbnail_id ) {
							set_post_thumbnail( $new_post_id, $thumbnail_id['id'] );
						}
					}
				}

				if ( $new_post_id ) {
					if ( isset( $new_file['post_template'] ) && $new_file['post_template'] ) {
						update_post_meta( $new_post_id, '_wp_page_template', $new_file['post_template'] );
					}
				}

				if ( $new_post_id ) {
					$new_page_links[ $new_file['id'] ] = get_page_link( $new_post_id );
				}
			}
			// Importing templates.
			$new_files = $json['templates'];
			foreach ( $new_files as $slug => $new_file ) {
				$slug     = str_replace( '.html', '', $slug );
				$contents = $new_file;
				$contents = grigora_ste_image_links_replace( $contents, $json['files'], $downloaded_files );
				$contents = grigora_ste_theme_slug_replace( $contents );
				$contents = grigora_ste_theme_sitelogowidth_replace( $contents, $site_logowidth );
				$contents = grigora_ste_wpforms_replace( $contents, $wpforms_id_map );
				$contents = grigora_ste_page_links_replace( $contents, $new_page_links );
				$contents = _inject_theme_attribute_in_block_template_content( $contents );
				// Construct terms for the post template.
				$terms             = array();
				$terms['wp_theme'] = get_theme_slug();

				$post_exist = grigora_ste_template_post_exists( $slug, 'wp_template', get_theme_slug() );
				if ( $post_exist['post_id'] && 'update' === $post_exist['action'] ) {
					$update_post_args = array(
						'ID'           => $post_exist['post_id'],
						'post_content' => $contents,
					);
					$update_post_id   = wp_update_post( wp_slash( $update_post_args ), true );
				} elseif ( 'insert' === $post_exist['action'] ) {
					$insert_post_args = array(
						'post_title'     => ( isset( $templates_json['templates'][ $slug ]['name'] ) ? $templates_json['templates'][ $slug ]['name'] : $slug ),
						'post_content'   => $contents,
						'comment_status' => 'closed',
						'ping_status'    => 'closed',
						'post_name'      => $slug,
						'post_status'    => 'publish',
						'post_type'      => 'wp_template',
						'tax_input'      => $terms,
					);
					$new_post_id      = wp_insert_post( wp_slash( $insert_post_args ), true );
					if ( $new_post_id ) {
						grigora_ste_templates_slug_fix( $new_post_id, $slug );
					}
				}
			}

			// Importing template parts.
			$new_files = $json['parts'];
			foreach ( $new_files as $slug => $new_file ) {
				$slug     = str_replace( '.html', '', $slug );
				$contents = $new_file;
				$contents = grigora_ste_image_links_replace( $contents, $json['files'], $downloaded_files );
				$contents = grigora_ste_theme_slug_replace( $contents );
				$contents = grigora_ste_wpforms_replace( $contents, $wpforms_id_map );
				$contents = grigora_ste_page_links_replace( $contents, $new_page_links );
				$contents = grigora_ste_theme_sitelogowidth_replace( $contents, $site_logowidth );
				$contents = _inject_theme_attribute_in_block_template_content( $contents );

				// Construct terms for the post template parts.
				$terms             = array();
				$terms['wp_theme'] = get_theme_slug();
				if ( isset( $templates_json['parts'][ $slug ]['area'] ) ) {
					$terms['wp_template_part_area'] = $templates_json['parts'][ $slug ]['area'];
				}

				$post_exist = grigora_ste_template_post_exists( $slug, 'wp_template_part', get_theme_slug() );
				if ( $post_exist['post_id'] && 'update' === $post_exist['action'] ) {
					$update_post_args = array(
						'ID'           => $post_exist['post_id'],
						'post_content' => $contents,
					);
					$update_post_id   = wp_update_post( wp_slash( $update_post_args ), true );
				} elseif ( 'insert' === $post_exist['action'] ) {
					$insert_post_args = array(
						'post_title'     => ( isset( $templates_json['parts'][ $slug ]['title'] ) ? $templates_json['parts'][ $slug ]['title'] : $slug ),
						'post_content'   => $contents,
						'comment_status' => 'closed',
						'ping_status'    => 'closed',
						'post_name'      => $slug,
						'post_status'    => 'publish',
						'post_type'      => 'wp_template_part',
						'tax_input'      => $terms,
					);

					$new_post_id = wp_insert_post( wp_slash( $insert_post_args ), true );
					if ( $new_post_id ) {
						grigora_ste_templates_slug_fix( $new_post_id, $slug );
					}
				}
			}

			// Importing styles.
			$name = 'wp-global-styles-' . get_theme_slug();
			$slug = 'wp-global-styles-' . get_theme_slug();
			// Getting content from the demo templates.
			$contents = $json['style'];

			// Parse styles json and edit the data dynamically.
			$template_styles = json_decode( $contents, true );
			if ( isset( $template_styles['settings']['color']['palette']['theme'] ) ) {
				if (
					$color_background &&
					isset( $template_styles['settings']['color']['palette']['theme'][0]['color'] )
				) {
					$template_styles['settings']['color']['palette']['theme'][0]['color'] = $color_background;
				}
				if (
					$color_canavas &&
					isset( $template_styles['settings']['color']['palette']['theme'][1]['color'] )
				) {
					$template_styles['settings']['color']['palette']['theme'][1]['color'] = $color_canavas;
				}
				if (
					$color_foreground &&
					isset( $template_styles['settings']['color']['palette']['theme'][2]['color'] )
				) {
					$template_styles['settings']['color']['palette']['theme'][2]['color'] = $color_foreground;
				}
				if (
					$color_primary &&
					isset( $template_styles['settings']['color']['palette']['theme'][3]['color'] )
				) {
					$template_styles['settings']['color']['palette']['theme'][3]['color'] = $color_primary;
				}
				if (
					$color_secondary &&
					isset( $template_styles['settings']['color']['palette']['theme'][4]['color'] )
				) {
					$template_styles['settings']['color']['palette']['theme'][4]['color'] = $color_secondary;
				}
				if (
					$color_button &&
					isset( $template_styles['settings']['color']['palette']['theme'][5]['color'] )
				) {
					$template_styles['settings']['color']['palette']['theme'][5]['color'] = $color_button;
				}
				if (
					$color_button_text &&
					isset( $template_styles['settings']['color']['palette']['theme'][6]['color'] )
				) {
					$template_styles['settings']['color']['palette']['theme'][6]['color'] = $color_button_text;
				}
			}
			// Font family.
			if (
				$font_family
			) {
				if ( ! isset( $template_styles['styles'] ) ) {
					$template_styles['styles'] = array();
				}
				if ( ! isset( $template_styles['styles']['typography'] ) ) {
					$template_styles['styles']['typography'] = array();
				}
				$template_styles['styles']['typography']['fontFamily'] = 'var:preset|font-family|' . $font_family;
			}
			// Font size.
			if (
				$font_size
			) {
				if ( ! isset( $template_styles['styles'] ) ) {
					$template_styles['styles'] = array();
				}
				if ( ! isset( $template_styles['styles']['typography'] ) ) {
					$template_styles['styles']['typography'] = array();
				}
				$template_styles['styles']['typography']['fontSize'] = $font_size . 'px';
			}
			// Container width.
			if (
				$container_width
			) {
				if ( ! isset( $template_styles['settings'] ) ) {
					$template_styles['settings'] = array();
				}
				if ( ! isset( $template_styles['settings']['layout'] ) ) {
					$template_styles['settings']['layout'] = array();
				}
				$template_styles['settings']['layout']['contentSize'] = '768px';
				$template_styles['settings']['layout']['wideSize']    = $container_width . 'px';
			}
			// Block gap.
			if (
				$block_gap
			) {
				if ( ! isset( $template_styles['styles'] ) ) {
					$template_styles['styles'] = array();
				}
				if ( ! isset( $template_styles['styles']['spacing'] ) ) {
					$template_styles['styles']['spacing'] = array();
				}
				$template_styles['styles']['spacing']['blockGap'] = $block_gap . 'rem';
			}

			$contents = wp_json_encode( $template_styles );

			// Construct terms for the post template parts.
			$terms             = array();
			$terms['wp_theme'] = get_theme_slug();

			$post_exist = grigora_ste_template_post_exists( $slug, 'wp_global_styles', get_theme_slug() );
			if ( $post_exist['post_id'] && 'update' === $post_exist['action'] ) {
				$update_post_args = array(
					'ID'           => $post_exist['post_id'],
					'post_content' => $contents,
				);
				$update_post_id   = wp_update_post( wp_slash( $update_post_args ), true );
			} elseif ( 'insert' === $post_exist['action'] ) {
				$insert_post_args = array(
					'post_title'     => 'Custom Styles',
					'post_content'   => $contents,
					'comment_status' => 'closed',
					'ping_status'    => 'closed',
					'post_name'      => $slug,
					'post_status'    => 'publish',
					'post_type'      => 'wp_global_styles',
					'tax_input'      => $terms,
				);

				$new_post_id = wp_insert_post( wp_slash( $insert_post_args ), true );
				if ( $new_post_id ) {
					grigora_ste_templates_slug_fix( $new_post_id, $slug );
				}
			}

			wp_send_json_success(
				array(
					'success' => true,
					'message' => __( 'Imported Template', 'grigora-kit' ),
				)
			);
		}
		wp_send_json_error( __( 'Incorrect template slug.', 'grigora-kit' ) );
	}
}

// Register Ajax functions.
add_action( 'wp_ajax_grigora_st_get_files', 'grigora_st_get_files' );
add_action( 'wp_ajax_grigora_st_get_image', 'grigora_st_get_image' );
add_action( 'wp_ajax_grigora_st_activate_theme', 'grigora_st_activate_theme' );
add_action( 'wp_ajax_grigora_st_check_theme', 'grigora_st_check_theme' );
add_action( 'wp_ajax_grigora_st_activate_plugin', 'grigora_st_activate_plugin' );
add_action( 'wp_ajax_grigora_st_install_theme', 'grigora_st_install_theme' );
add_action( 'wp_ajax_grigora_st_install_plugin', 'grigora_st_install_plugin' );
add_action( 'wp_ajax_grigora_st_import_demo', 'grigora_st_import_demo' );

require_once grigora_kit_get_path( 'inc/starter-templates/download-images.php' );

<?php
/**
 * Table of Content Module.
 *
 * @package grigora-kit
 */

require_once grigora_kit_get_path( 'inc/table-of-contents/class-grigora-toc-metabox.php' );

if ( ! function_exists( 'grigora_get_toc' ) ) {

	/**
	 * Get Table of Content.
	 *
	 * @param string $content Post Content.
	 *
	 * @return String
	 */
	function grigora_get_toc( $content ) {
		$headings = grigora_get_headings( $content );
		if ( 0 < count( $headings ) ) {
			ob_start();
			echo "<div class='grigora-table-of-contents'>";
			echo "<p><span class='grigora-toc-headline'>" . esc_html( grigora_get_setting( 'toc_headertext', __( 'Table of Contents', 'grigora-kit' ) ) ) . ' </span>';
			if ( grigora_get_setting( 'toc_showhide', true ) ) {
				echo "[<span class='toggle-toc custom-setting' title='collapse'>" . esc_html( grigora_get_setting( 'toc_hidetext', __( 'hide', 'grigora-kit' ) ) ) . '</span>]';
			}
			echo '</p>';
			echo "<div class='heading'>";
			echo wp_kses(
				grigora_toc_print( $headings, 0 ),
				array(
					'ol' => array(),
					'ul' => array(),
					'li' => array(),
					'a'  => array(
						'href' => array(),
					),
				)
			);
			echo '</div>';
			echo '</div>';
			return ob_get_clean();
		}
		return '';
	}
}

if ( ! function_exists( 'grigora_toc_get_post_types' ) ) {

	/**
	 * Get post types.
	 */
	function grigora_toc_get_post_types() {
		$exclude    = array( 'attachment', 'revision', 'nav_menu_item', 'safecss', 'custom_css', 'oembed_cache' );
		$post_types = get_post_types( array(), 'objects' );
		$types      = array();
		foreach ( $post_types as $post ) {
			if ( in_array( $post->name, $exclude, true ) ) {
				continue;
			}
			$types[ $post->name ] = $post->label;
		}
		return $types;
	}
}



if ( ! function_exists( 'grigora_single_heading' ) ) {

	/**
	 * Parse single heading.
	 *
	 * @param array $heading Array of parsed heading.
	 * @param array $flags   Array of flag.
	 */
	function grigora_single_heading( $heading, $flags ) {

		if ( isset( $heading['tag'] ) && count( $flags ) > 4 ) {
			if ( ( '2' === $heading['tag'] && $flags[0] ) ||
				( '3' === $heading['tag'] && $flags[1] ) ||
				( '4' === $heading['tag'] && $flags[2] ) ||
				( '5' === $heading['tag'] && $flags[3] ) ||
				( '6' === $heading['tag'] && $flags[4] ) ) {
				return '<li><a href=#' . str_replace( ' ', '_', $heading['name'] ) . '>' . $heading['name'] . '</a></li>';
			}
			return '';
		}
		return '';

	}
}


if ( ! function_exists( 'grigora_toc_print' ) ) {

	/**
	 * Parse TOC List.
	 *
	 * @param array   $tags All the tags.
	 * @param integer $depth Current Depth of tags.
	 */
	function grigora_toc_print( $tags, $depth ) {
		$flags = array(
			grigora_get_setting( 'toc_h2', 1 ),
			grigora_get_setting( 'toc_h3', 1 ),
			grigora_get_setting( 'toc_h4', 1 ),
			grigora_get_setting( 'toc_h5', 1 ),
			grigora_get_setting( 'toc_h6', 1 ),
		);

		$lowest_depth = 6;
		foreach ( $tags as $key => $tag ) {
			if ( isset( $tag['tag'] ) && $lowest_depth > (int) $tag['tag'] ) {
				$lowest_depth = (int) $tag['tag'];
			}
		}

		$r          = '<ol>';
		$depth      = $lowest_depth;
		$depth_save = $lowest_depth;
		foreach ( $tags as $key => $tag ) {
			if ( isset( $tag['tag'] ) ) {
				$tag_tag_integer = (int) $tag['tag'];
				if ( $tag_tag_integer === $depth ) {
					$r = $r . grigora_single_heading( $tag, $flags );
				} elseif ( $tag_tag_integer > $depth ) {
					$r     = $r . str_repeat( '<li><ol>', $tag_tag_integer - $depth ) . grigora_single_heading( $tag, $flags );
					$depth = $tag_tag_integer;
				} else {
					$r     = $r . str_repeat( '</ol></li>', $depth - $tag_tag_integer ) . grigora_single_heading( $tag, $flags );
					$depth = $tag_tag_integer;
				}
			}
		}
		$r = $r . str_repeat( '</ol>', $depth - $depth_save + 1 );
		return $r;
	}
}


if ( ! function_exists( 'grigora_get_headings' ) ) {

	/**
	 * Get headings from content.
	 *
	 * @param string $content Content String.
	 */
	function grigora_get_headings( $content ) {
		$headings = array();
		preg_match_all( '/<h([1-6])(.*)>(.*)<\/h[1-6]>/', $content, $matches );

		if ( isset( $matches[1] ) && isset( $matches[2] ) && isset( $matches[3] ) ) {
			$matches_count = count( $matches[1] );
			for ( $i = 0; $i < $matches_count; $i++ ) {
				if ( isset( $matches[2][ $i ] ) && isset( $matches[3][ $i ] ) ) {
					$headings[ $i ]['tag'] = $matches[1][ $i ];

					$att_string = $matches[2][ $i ];
					preg_match( '/id="([^"]*)"/', $att_string, $id_matches );

					if ( isset( $id_matches[1] ) ) {
						$headings[ $i ]['id'] = $id_matches[1];
					}

					$att_string = $matches[2][ $i ];

					preg_match_all( '/class="([^"]*)"/', $att_string, $class_matches );

					if ( isset( $class_matches[1] ) ) {
						$class_matches_count = count( $class_matches[1] );
						for ( $j = 0; $j < $class_matches_count; $j++ ) {
							$headings[ $i ]['classes'][] = $class_matches[1][ $j ];
						}
					}

					$headings[ $i ]['name'] = $matches[3][ $i ];
				}
			}
		}
		return $headings;
	}
}


if ( ! function_exists( 'grigora_headingwraps' ) ) {

	/**
	 * Wrap headings into id tags for jumplinks to work.
	 *
	 * @param array $matches All the heading regex matches.
	 */
	function grigora_headingwraps( $matches ) {

		$headings = array();

		if ( count( $matches ) > 2 ) {
			foreach ( $matches[2] as $key => $heading ) {
				if ( isset( $matches[1][ $key ] ) && isset( $matches[3][ $key ] ) ) {
					$h = '<h' . $matches[1][ $key ] . ' ';
					$h = $h . ' ' . $heading . ' ';
					$h = $h . '>';
					$h = $h . "<span class='grigora-toc-span' id='" . str_replace( ' ', '_', $matches[3][ $key ] ) . "'></span>";
					$h = $h . $matches[3][ $key ];
					$h = $h . "<span class='grigora-toc-span-end' ></span>";
					$h = $h . '</h' . $matches[1][ $key ] . '>';
					array_push( $headings, $h );
				}
			}
			return $headings;
		}
		return $headings;
	}
}

if ( ! function_exists( 'grigora_toc_check_allowed' ) ) {

	/**
	 * Check if we are allowed to insert Table of Contents.
	 *
	 * @param bool $filter_check Check for filters.
	 */
	function grigora_toc_check_allowed( $filter_check = false ) {
		$curr_post = get_post();
		global $wp_current_filter;

		// If page doesnt have post instance.
		if ( empty( $curr_post ) || ! $curr_post instanceof WP_Post ) {
			return false;
		}

		// Frontpage check.
		if ( is_front_page() ) {
			return false;
		}

		// Archive, Search or Feed check.
		if ( is_feed() || is_search() || is_archive() ) {
			return false;
		}

		// Do not include TOC in excerpt, init, or wp_head. Do not perform this test in enqueue assets.
		if ( ! $filter_check && in_array( $wp_current_filter[0], array( 'get_the_excerpt', 'init', 'wp_head' ), true ) ) {
			return false;
		}

		// Called from not enabled post types.
		if ( ! in_array( get_post_type(), grigora_get_setting( 'toc_enableon', array( 'post' ) ), true ) ) {
			return false;
		}

		// Check if disabled for specific post.
		if ( get_post_meta( $curr_post->ID, '_grigora-toc-disable', true ) ) {
			return false;
		}

		return true;
	}
}


if ( ! function_exists( 'grigora_add_table_of_content' ) ) {

	/**
	 * The content hook function to add toc.
	 *
	 * @param array $content Post content.
	 */
	function grigora_add_table_of_content( $content ) {
		// Check if we should add TOC.

		if ( ! grigora_toc_check_allowed() ) {
			return $content;
		}

		// Main logic to add TOC.
		$location = grigora_get_setting( 'toc_location', 'firstheading' );

		$result = preg_match_all( '/<h([1-6])(.*)>(.*)<\/h[1-6]>/', $content, $matches );

		$headingwrapped = grigora_headingwraps( $matches );
		$matches_count  = count( $matches[1] );

		if ( 1 < $matches_count && 'firstheading' === $location && isset( $matches[0][0] ) ) {
			$start   = strpos( $content, $matches[0][0] );
			$content = substr_replace( $content, grigora_get_toc( $content ), $start, 0 );
			foreach ( $headingwrapped as $key => $headingrep ) {
				if ( isset( $matches[0][ $key ] ) ) {
					$content = str_replace( $matches[0][ $key ], $headingrep, $content );
				}
			}
			return $content;
		} elseif ( 'top' === $location ) {
			$new_content      = '';
			$paragraphs       = explode( '</p>', $content );
			$paragraphs_count = count( $paragraphs );
			for ( $i = 0; $i < $paragraphs_count; $i++ ) {
				if ( 0 === $i ) {
					$new_content .= grigora_get_toc( $content );
				}
				$new_content .= $paragraphs[ $i ] . '</p>';
			}
			foreach ( $headingwrapped as $key => $headingrep ) {
				if ( isset( $matches[0][ $key ] ) ) {
					$new_content = str_replace( $matches[0][ $key ], $headingrep, $new_content );
				}
			}
			return $new_content;
		} else {
			$new_content      = '';
			$paragraphs       = explode( '</p>', $content );
			$paragraphs_count = count( $paragraphs );
			for ( $i = 0; $i < $paragraphs_count; $i++ ) {
				if ( 1 === $i ) {
					$new_content .= grigora_get_toc( $content );
				}
				$new_content .= $paragraphs[ $i ] . '</p>';
			}
			foreach ( $headingwrapped as $key => $headingrep ) {
				if ( isset( $matches[0][ $key ] ) ) {
					$new_content = str_replace( $matches[0][ $key ], $headingrep, $new_content );
				}
			}
			return $new_content;
		}
	}
}



if ( ! function_exists( 'grigora_kit_starter_toc_submenu' ) ) {

	/**
	 * Add Table of Contents Submenu.
	 */
	function grigora_kit_starter_toc_submenu() {
		add_submenu_page(
			'grigora-kit',
			esc_html__( 'Table of Contents', 'grigora-kit' ),
			esc_html__( 'Table of Contents', 'grigora-kit' ),
			'manage_options',
			'grigora-kit-toc',
			'grigora_toc_page'
		);
	}
}



if ( ! function_exists( 'grigora_toc_page' ) ) {

	/**
	 * TOC Admin Page.
	 */
	function grigora_toc_page() {

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You do not have sufficient permissions to access this page.', 'grigora-kit' ) );
		}
		echo '<div class="admin-container">';
		settings_errors();
		?>
		<div class="grigora-dashboard">
			<div class="header">
				<div class="branding">
					<div class="logo">
						<img src="<?php echo esc_url( GRIGORA_KIT_URL . 'assets/images/logo.png' ); ?>" />
					</div>
					<h1 class="title"><?php echo esc_html__( 'Table of Contents', 'grigora-kit' ); ?></h1>
				</div>
			</div>
			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<input type="hidden" name="action" value="grigora_kit_update_toc_settings">
			<?php wp_nonce_field( 'grigora_kit_update_toc_settings', 'grigora_kit_update_toc_settings' ); ?>
			<div class="settings">
				<h3 class="settings-title">
					<?php echo esc_html__( 'General', 'grigora-kit' ); ?>
				</h3>
				<div class="settings-list">
					<div class="settings-list__section">
					<div class="single-setting">
						<label for="location"><?php echo esc_html__( 'Location', 'grigora-kit' ); ?></label>
						<select name="location" id="location">
						<option value="firstheading" <?php selected( grigora_get_setting( 'toc_location', 'firstheading' ), 'firstheading' ); ?>><?php echo esc_html__( 'Before First Heading', 'grigora-kit' ); ?></option>
						<option value="top" <?php selected( grigora_get_setting( 'toc_location', 'top' ), 'top' ); ?>><?php echo esc_html__( 'Top', 'grigora-kit' ); ?></option>
						<option value="firstpara" <?php selected( grigora_get_setting( 'toc_location', 'firstpara' ), 'firstpara' ); ?>><?php echo esc_html__( 'After First Paragraph', 'grigora-kit' ); ?></option>
						</select>
					</div>
					<div class="single-setting">
						<label><?php echo esc_html__( 'Enable on', 'grigora-kit' ); ?></label>
						<div class="support-sec">
						<?php
							$enableon = grigora_get_setting( 'toc_enableon', array( 'post' ) );
						foreach ( grigora_toc_get_post_types() as $post_type => $label ) {
							echo '<div class="inside-css">';
							echo '<input type="checkbox" id="enableon[' . esc_attr( $post_type ) . ']" name="enableon[' . esc_attr( $post_type ) . ']" value="' . esc_attr( $post_type ) . '" ' . checked( true, in_array( $post_type, $enableon, true ), false ) . ' >';
							echo '<label for="enableon[' . esc_attr( $post_type ) . ']">' . esc_html( $label ) . '</label>';
							echo '</div>';
						}
						?>
						</div>
					</div>
					<div class="single-setting">
						<label for="headertext"><?php echo esc_html__( 'Header Text', 'grigora-kit' ); ?></label>
						<input type="text" id="headertext" name="headertext" value="<?php echo esc_attr( grigora_get_setting( 'toc_headertext', __( 'Table of Contents', 'grigora-kit' ) ) ); ?>">
					</div>
					<div class="single-setting">
						<label for="showhide"><?php echo esc_html__( 'Allow users to show/hide table', 'grigora-kit' ); ?></label>
						<input type="checkbox" id="showhide" name="showhide" value="showhide" <?php checked( grigora_get_setting( 'toc_showhide', true ) ); ?>>
					</div>
					<div class="single-setting">
						<label for="showtext"><?php echo esc_html__( 'Show Text', 'grigora-kit' ); ?></label>
						<input type="text" id="showtext" name="showtext" value="<?php echo esc_attr( grigora_get_setting( 'toc_showtext', __( 'show', 'grigora-kit' ) ) ); ?>">
					</div>
					<div class="single-setting">
						<label for="hidetext"><?php echo esc_html__( 'Hide Text', 'grigora-kit' ); ?></label>
						<input type="text" id="hidetext" name="hidetext" value="<?php echo esc_attr( grigora_get_setting( 'toc_hidetext', __( 'hide', 'grigora-kit' ) ) ); ?>">
					</div>
					<div class="single-setting">
						<label for="h2"><?php echo esc_html__( 'Include H2', 'grigora-kit' ); ?></label>
						<input type="checkbox" id="h2" name="h2" value="h2" <?php checked( grigora_get_setting( 'toc_h2', true ) ); ?>>
					</div>
					<div class="single-setting">
						<label for="h3"><?php echo esc_html__( 'Include H3', 'grigora-kit' ); ?></label>
						<input type="checkbox" id="h3" name="h3" value="h3" <?php checked( grigora_get_setting( 'toc_h3', true ) ); ?>>
					</div>
					<div class="single-setting">
						<label for="h4"><?php echo esc_html__( 'Include H4', 'grigora-kit' ); ?></label>
						<input type="checkbox" id="h4" name="h4" value="h4" <?php checked( grigora_get_setting( 'toc_h4', true ) ); ?>>
					</div>
					<div class="single-setting">
						<label for="h5"><?php echo esc_html__( 'Include H5', 'grigora-kit' ); ?></label>
						<input type="checkbox" id="h5" name="h5" value="h5" <?php checked( grigora_get_setting( 'toc_h5', true ) ); ?>>
					</div>
					<div class="single-setting">
						<label for="h6"><?php echo esc_html__( 'Include H6', 'grigora-kit' ); ?></label>
						<input type="checkbox" id="h6" name="h6" value="h6" <?php checked( grigora_get_setting( 'toc_h6', true ) ); ?>>
					</div>
					</div>
				</div>
				<h3 class="settings-title">
					<?php echo esc_html__( 'Colors', 'grigora-kit' ); ?>
				</h3>
				<div class="settings-list">
					<div class="settings-list__section">
						<div class="single-setting">
							<label for="background"><?php echo esc_html__( 'Background', 'grigora-kit' ); ?></label>
							<input type="color" id="background" name="background" value="<?php echo esc_attr( grigora_get_setting( 'toc_background', '#ffffff' ) ); ?>">
						</div>
						<div class="single-setting">
							<label for="border"><?php echo esc_html__( 'Border', 'grigora-kit' ); ?></label>
							<input type="color" id="border" name="border" value="<?php echo esc_attr( grigora_get_setting( 'toc_border', '#aaaaaa' ) ); ?>">
						</div>
						<div class="single-setting">
							<label for="title"><?php echo esc_html__( 'Title', 'grigora-kit' ); ?></label>
							<input type="color" id="title" name="title" value="<?php echo esc_attr( grigora_get_setting( 'toc_title', '#444444' ) ); ?>">
						</div>
						<div class="single-setting">
							<label for="links"><?php echo esc_html__( 'Links', 'grigora-kit' ); ?></label>
							<input type="color" id="links" name="links" value="<?php echo esc_attr( grigora_get_setting( 'toc_links', '#0170b9' ) ); ?>">
						</div>
						<div class="single-setting">
							<label for="linkshover"><?php echo esc_html__( 'Links Hover', 'grigora-kit' ); ?></label>
							<input type="color" id="linkshover" name="linkshover" value="<?php echo esc_attr( grigora_get_setting( 'toc_linkshover', '#0170b9' ) ); ?>">
						</div>
						<div class="single-setting">
							<label for="linksvisited"><?php echo esc_html__( 'Links Visited', 'grigora-kit' ); ?></label>
							<input type="color" id="linksvisited" name="linksvisited" value="<?php echo esc_attr( grigora_get_setting( 'toc_linksvisited', '#0170b9' ) ); ?>">
						</div>
						<div class="single-setting">
							<label for="toggletext"><?php echo esc_html__( 'Hide/Show Text', 'grigora-kit' ); ?></label>
							<input type="color" id="toggletext" name="toggletext" value="<?php echo esc_attr( grigora_get_setting( 'toc_toggletext', '#0170b9' ) ); ?>">
						</div>
					</div>
				</div>
				<button class="cta-btn"><?php echo esc_html__( 'Save', 'grigora-kit' ); ?></button>
			</div>
			</form>
		</div>
		<?php
	}
}


if ( ! function_exists( 'grigora_toc_assets' ) ) {

	/**
	 * TOC Assets.
	 */
	function grigora_toc_assets() {
		if ( ! is_admin() && grigora_toc_check_allowed( true ) ) {
			$ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
			// Inline CSS.
			$css = '.grigora-table-of-contents {padding: 1rem;border: 1px solid ' . grigora_get_setting( 'toc_border', '#aaaaaa' ) . ';border-radius: 5px;background-color: ' . grigora_get_setting( 'toc_background', '#ffffff' ) . ';margin-bottom: 1rem;} .grigora-table-of-contents p {margin-bottom: 0;}.grigora-table-of-contents ol {margin-left:1rem;margin-bottom: 0;}.grigora-table-of-contents .grigora-toc-headline {font-weight: 700; color: ' . grigora_get_setting( 'toc_title', '#444444' ) . '}.grigora-table-of-contents .toggle-toc {cursor: pointer;color: ' . grigora_get_setting( 'toc_toggletext', '#0170b9' ) . ';}.grigora-table-of-contents .heading {margin-top: 0.5rem;}.grigora-table-of-contents a {text-decoration: none; color: ' . grigora_get_setting( 'toc_links', '#0170b9' ) . '}.grigora-table-of-contents a:hover {text-decoration: none; color: ' . grigora_get_setting( 'toc_linkshover', '#0170b9' ) . '}.grigora-table-of-contents a:visited {text-decoration: none; color: ' . grigora_get_setting( 'toc_linksvisited', '#0170b9' ) . '}';
			wp_register_style( 'grigora-toc', false, array(), $ver );
			wp_enqueue_style( 'grigora-toc' );
			wp_add_inline_style( 'grigora-toc', $css );

			// Inline JS.
			if ( grigora_get_setting( 'toc_showhide', true ) ) {
				$js = "const tocToggle = document.querySelector('.toggle-toc');
				const heading = document.querySelector('.heading');
				if (tocToggle) {
					tocToggle.addEventListener('click', function () {
						if (!heading.style.display) {
							heading.style.display = 'none';
							document.querySelector('.toggle-toc').innerHTML = grigora_toc_constants.show_text;
						}
						else if (heading.style.display === 'none'){
							heading.style.display = 'block';
							document.querySelector('.toggle-toc').innerHTML = grigora_toc_constants.hide_text;
						}
						else {
							heading.style.display = 'none';
							document.querySelector('.toggle-toc').innerHTML = grigora_toc_constants.show_text;
						}
					});
				}";
				wp_register_script( 'grigora-toc', '', array(), $ver, true );
				wp_enqueue_script( 'grigora-toc' );
				wp_add_inline_script( 'grigora-toc', $js );
				wp_localize_script(
					'grigora-toc',
					'grigora_toc_constants',
					array(
						'show_text' => esc_html( grigora_get_setting( 'toc_showtext', __( 'show', 'grigora-kit' ) ) ),
						'hide_text' => esc_html( grigora_get_setting( 'toc_hidetext', __( 'hide', 'grigora-kit' ) ) ),
					)
				);
			}
		}
	}
}


if ( ! function_exists( 'grigora_kit_toc_admin_assets' ) ) {

	/**
	 * Admin Assets.
	 *
	 * @param string $hook String of current page.
	 */
	function grigora_kit_toc_admin_assets( $hook ) {
		if ( 'grigoras-kit_page_grigora-kit-toc' !== $hook ) {
			return;
		}
		$ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
		$ext = GRIGORA_KIT_DEBUG ? '.css' : '.min.css';
		wp_enqueue_style( 'grigora-admin-dashboard', GRIGORA_KIT_URL . '/assets/css/toc-admin' . $ext, null, $ver );
	}
}


if ( ! function_exists( 'grigora_kit_update_toc_settings' ) ) {

	/**
	 * Update Dashboard Settings.
	 */
	function grigora_kit_update_toc_settings() {
		if (
			isset( $_POST['grigora_kit_update_toc_settings'] )
		) {
			if ( ! wp_verify_nonce( $_POST['grigora_kit_update_toc_settings'], 'grigora_kit_update_toc_settings' ) ) {
				wp_die( esc_html__( 'The link you followed has expired.', 'grigora-kit' ) );
			} else {
				// Sanitization.
				$location     = ( isset( $_POST['location'] ) && in_array( $_POST['location'], array( 'firstheading', 'top', 'firstpara' ), true ) ? $_POST['location'] : 'firstheading' );
				$enableon     = ( isset( $_POST['enableon'] ) ? $_POST['enableon'] : array() );
				$headertext   = ( isset( $_POST['headertext'] ) ? sanitize_text_field( $_POST['headertext'] ) : '' );
				$showhide     = ( isset( $_POST['showhide'] ) ? true : false );
				$showtext     = ( isset( $_POST['showtext'] ) ? sanitize_text_field( $_POST['showtext'] ) : '' );
				$hidetext     = ( isset( $_POST['hidetext'] ) ? sanitize_text_field( $_POST['hidetext'] ) : '' );
				$h2           = ( isset( $_POST['h2'] ) ? true : false );
				$h3           = ( isset( $_POST['h3'] ) ? true : false );
				$h4           = ( isset( $_POST['h4'] ) ? true : false );
				$h5           = ( isset( $_POST['h5'] ) ? true : false );
				$h6           = ( isset( $_POST['h6'] ) ? true : false );
				$background   = ( isset( $_POST['background'] ) && grigora_sanitize_color( $_POST['background'] ) ? grigora_sanitize_color( $_POST['background'] ) : '#ffffff' );
				$border       = ( isset( $_POST['border'] ) && grigora_sanitize_color( $_POST['border'] ) ? grigora_sanitize_color( $_POST['border'] ) : '#aaaaaa' );
				$title        = ( isset( $_POST['title'] ) && grigora_sanitize_color( $_POST['title'] ) ? grigora_sanitize_color( $_POST['title'] ) : '#444444' );
				$links        = ( isset( $_POST['links'] ) && grigora_sanitize_color( $_POST['links'] ) ? grigora_sanitize_color( $_POST['links'] ) : '#0170b9' );
				$linkshover   = ( isset( $_POST['linkshover'] ) && grigora_sanitize_color( $_POST['linkshover'] ) ? grigora_sanitize_color( $_POST['linkshover'] ) : '#0170b9' );
				$linksvisited = ( isset( $_POST['linksvisited'] ) && grigora_sanitize_color( $_POST['linksvisited'] ) ? grigora_sanitize_color( $_POST['linksvisited'] ) : '#0170b9' );
				$toggletext   = ( isset( $_POST['toggletext'] ) && grigora_sanitize_color( $_POST['toggletext'] ) ? grigora_sanitize_color( $_POST['toggletext'] ) : '#0170b9' );

				// Update Settings.
				grigora_set_setting( 'toc_location', $location );
				grigora_set_setting( 'toc_enableon', array_keys( $enableon ) );
				grigora_set_setting( 'toc_headertext', $headertext );
				grigora_set_setting( 'toc_showhide', $showhide );
				grigora_set_setting( 'toc_showtext', $showtext );
				grigora_set_setting( 'toc_hidetext', $hidetext );
				grigora_set_setting( 'toc_h2', $h2 );
				grigora_set_setting( 'toc_h3', $h3 );
				grigora_set_setting( 'toc_h4', $h4 );
				grigora_set_setting( 'toc_h5', $h5 );
				grigora_set_setting( 'toc_h6', $h6 );
				grigora_set_setting( 'toc_background', $background );
				grigora_set_setting( 'toc_border', $border );
				grigora_set_setting( 'toc_title', $title );
				grigora_set_setting( 'toc_links', $links );
				grigora_set_setting( 'toc_linkshover', $linkshover );
				grigora_set_setting( 'toc_linksvisited', $linksvisited );
				grigora_set_setting( 'toc_toggletext', $toggletext );

				// Redirect to Page.
				wp_safe_redirect( admin_url( 'admin.php?page=grigora-kit-toc' ) );
				exit;
			}
		}
	}
}

add_filter( 'the_content', 'grigora_add_table_of_content' );
add_action( 'admin_menu', 'grigora_kit_starter_toc_submenu' );
add_action( 'admin_post_grigora_kit_update_toc_settings', 'grigora_kit_update_toc_settings' );
add_action( 'wp_enqueue_scripts', 'grigora_toc_assets' );
add_action( 'admin_enqueue_scripts', 'grigora_kit_toc_admin_assets' );

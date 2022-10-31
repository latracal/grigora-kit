<?php
/**
 * Table of Content Metabox.
 *
 * @package grigora-kit
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // For security.
}

if ( ! class_exists( 'GrigoraTOCMetabox' ) ) {

	/**
	 * Class to add metabox in post.
	 */
	final class GrigoraTOCMetabox {

		/**
		 * Setup.
		 *
		 * @access public
		 * @since  1.0
		 */
		public function __construct() {
			$this->hooks();
		}

		/**
		 * Hooks assign.
		 *
		 * @access private
		 * @since  1.0
		 */
		private function hooks() {
			add_action( 'init', array( $this, 'register_metaboxes' ), 99 );
		}

		/**
		 * Add meta box to the screen
		 *
		 * @access public
		 * @since  1.0
		 */
		public function grigora_metabox() {
			add_meta_box(
				'grigora-metabox',
				esc_html__( 'Grigora Table of Contents Options', 'grigora-kit' ),
				array( $this, 'display_metabox' ),
				null,
				'side'
			);
		}

		/**
		 * Register metaboxes in allowed pages
		 *
		 * @access public
		 * @since  1.0
		 */
		public function register_metaboxes() {
			foreach ( get_post_types() as $type ) {
				if ( in_array( $type, grigora_get_setting( 'toc_enableon', array( 'post' ) ), true ) ) {
					add_action( "add_meta_boxes_$type", array( $this, 'grigora_metabox' ) );
					add_action( "save_post_$type", array( $this, 'save' ), 10, 3 );
				}
			}
		}

		/**
		 * Metabox renderer
		 *
		 * @access public
		 * @since  1.0
		 *
		 * @param WP_Post_Object $post Post Object.
		 * @param array          $atts Attributes.
		 */
		public function display_metabox( $post, $atts ) {

			wp_nonce_field( 'grigora_toc_meta_nonce', '_grigora_toc_meta_nonce' );
			if ( get_post_meta( $post->ID, '_grigora-toc-disable', true ) ) {
				$toc_disabled = get_post_meta( $post->ID, '_grigora-toc-disable', true );
			} else {
				$toc_disabled = false;
			}
			?>
			<table class="form-table grigora-table">
				<tbody>
					<tr>
						<th scope="row"><label
								for="layout-container"><?php echo esc_html( __( 'Disable TOC', 'grigora-kit' ) ); ?></label></th>
						<td>
							<?php
							if ( in_array( get_post_type( $post ), grigora_get_setting( 'toc_enableon', array( 'post' ) ), true ) ) {
								// Disable TOC.
								$args    = array(
									'id'      => 'disable-toc',
									'desc'    => esc_html__( 'Disable Table of Contents', 'grigora-kit' ),
									'default' => $toc_disabled,
								);
								$checked = $toc_disabled ? checked( 1, $toc_disabled, false ) : '';
								echo '<input type="checkbox" id="grigora-toc-settings[' . esc_attr( $args['id'] ) . ']" name="grigora-toc-settings[' . esc_attr( $args['id'] ) . ']" value="1" ' . esc_html( $checked ) . '/>';
							}
							?>
						</td>
					</tr>
				</tbody>
			</table>

			<?php
		}

		/**
		 * On save action
		 *
		 * @access public
		 * @since  1.0
		 *
		 * @param integer $post_id Post ID.
		 * @param Post    $post    Post.
		 * @param Update  $update  Update.
		 */
		public function save( $post_id, $post, $update ) {
			if ( current_user_can( 'edit_post', $post_id ) &&
				isset( $_REQUEST['_grigora_toc_meta_nonce'] ) &&
				wp_verify_nonce( $_REQUEST['_grigora_toc_meta_nonce'], 'grigora_toc_meta_nonce' )
			) {
				if ( isset( $_REQUEST['grigora-toc-settings']['disable-toc'] ) && $_REQUEST['grigora-toc-settings']['disable-toc'] ) {
					update_post_meta( $post_id, '_grigora-toc-disable', $_REQUEST['grigora-toc-settings']['disable-toc'] );
				} else {
					update_post_meta( $post_id, '_grigora-toc-disable', false );
				}
			}

		}
	}

	new GrigoraTOCMetabox();
}

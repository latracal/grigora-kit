<?php
/**
 * Renderer function for post title
 *
 * @package grigora-kit
 */

if ( ! function_exists( 'render_block_grigora_kit_post_title' ) ) {
	/**
	 * Render Post Title Block.
	 *
	 * @param array $attributes Attributes Array.
	 * @param array $content    Content.
	 * @param array $block      Block.
	 */
	function render_block_grigora_kit_post_title( $attributes, $content, $block ) {
		if ( ! isset( $block->context['postId'] ) ) {
			return '';
		}

		$post_ID = $block->context['postId'];
		$title   = get_the_title();

		if ( ! $title ) {
			return '';
		}

		$tag_name               = 'h2';
		$align_class_name       = empty( $attributes['align'] ) ? '' : "grigora-post-title-align-{$attributes['align']}";
		$aligntablet_class_name = empty( $attributes['alignTablet'] ) ? '' : "grigora-post-title-tablet-align-{$attributes['alignTablet']}";
		$alignmobile_class_name = empty( $attributes['alignMobile'] ) ? '' : "grigora-post-title-mobile-align-{$attributes['alignMobile']}";
		$block_id_class_name    = empty( $attributes['id'] ) ? '' : "block-id-{$attributes['id']}";
		$animateonce_class_name = ( empty( $attributes['entranceAnimation'] ) || 'none' === $attributes['entranceAnimation'] ) ? '' : 'has-entrance-animation animateOnce';

		$total_classes = 'grigora-kit-post-title ' . $align_class_name . ' ' . $aligntablet_class_name . ' ' . $alignmobile_class_name . ' ' . $block_id_class_name . ' ' . $animateonce_class_name;
		$link_target   = isset( $attributes['linkTarget'] ) ? $attributes['linkTarget'] : '_self';

		if ( isset( $attributes['StructureTag'] ) ) {
			$tag_name = $attributes['StructureTag'];
		}

		if ( isset( $attributes['linkPost'] ) && $attributes['linkPost'] ) {
			$rel   = ! empty( $attributes['rel'] ) ? 'rel="' . esc_attr( $attributes['rel'] ) . '"' : '';
			$title = sprintf( '<a href="%1$s" target="%2$s" %3$s>%4$s</a>', get_the_permalink( $post_ID ), esc_attr( $link_target ), $rel, $title );
		}
		$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $total_classes ) );

		return sprintf(
			'<%1$s %2$s %3$s>%4$s</%1$s>',
			$tag_name,
			$wrapper_attributes,
			( isset( $attributes['entranceAnimationDelay'] ) && $attributes['entranceAnimationDelay'] ) ? sprintf( ' data-animation-delay="%1$s"', $attributes['entranceAnimationDelay'] ) : '',
			$title
		);
	}
}

<?php
/**
 * Renderer function for post excerpt
 *
 * @package grigora-kit
 */

if ( ! function_exists( 'render_block_grigora_kit_post_excerpt' ) ) {
	/**
	 * Render Post Excerpt Block.
	 *
	 * @param array $attributes Attributes Array.
	 * @param array $content    Content.
	 * @param array $block      Block.
	 */
	function render_block_grigora_kit_post_excerpt( $attributes, $content, $block ) {
		if ( ! isset( $block->context['postId'] ) ) {
			return '';
		}

		$post_ID = $block->context['postId'];
		$excerpt = get_the_excerpt();

		if ( ! $excerpt ) {
			return '';
		}

		$default_length = apply_filters( 'excerpt_length', 55 );
		$default_suffix = apply_filters( 'excerpt_more', '…' );
		$excerpt_length = false;
		$excerpt_suffix = false;

		if ( isset( $attributes['excerptLength'] ) ) {
			$excerpt_length = $attributes['excerptLength'];
		}
		if ( isset( $attributes['suffix'] ) ) {
			$excerpt_suffix = $attributes['suffix'];
		}

		// Format excerpt.
		// Trim.
		$excerpt = trim( $excerpt );
		if ( $excerpt_length ) {
			$excerpt = implode( ' ', array_slice( explode( ' ', $excerpt ), 0, $excerpt_length ) );

		} else {
			$excerpt = implode( ' ', array_slice( explode( ' ', $excerpt ), 0, $default_length ) );

		}

		// Suffix.
		if ( $excerpt ) {
			if ( grigora_string_ends_with( strtolower( $excerpt ), strtolower( $default_suffix ) ) ) {
				if ( $excerpt_suffix ) {
					$excerpt = substr( $excerpt, 0, -strlen( $default_suffix ) ) . $excerpt_suffix;
				} else {
					$excerpt = substr( $excerpt, 0, -strlen( $default_suffix ) ) . $default_suffix;
				}
			}

			if ( $excerpt_suffix ) {
				if ( ! grigora_string_ends_with( strtolower( $excerpt ), strtolower( $excerpt_suffix ) ) ) {
					$excerpt = $excerpt . $excerpt_suffix;
				}
			} else {
				if ( ! grigora_string_ends_with( strtolower( $excerpt ), strtolower( $default_suffix ) ) ) {
					$excerpt = $excerpt . $default_suffix;
				}
			}
		}

		$tag_name               = 'p';
		$align_class_name       = empty( $attributes['align'] ) ? '' : "grigora-post-excerpt-align-{$attributes['align']}";
		$aligntablet_class_name = empty( $attributes['alignTablet'] ) ? '' : "grigora-post-excerpt-tablet-align-{$attributes['alignTablet']}";
		$alignmobile_class_name = empty( $attributes['alignMobile'] ) ? '' : "grigora-post-excerpt-mobile-align-{$attributes['alignMobile']}";
		$block_id_class_name    = empty( $attributes['id'] ) ? '' : "block-id-{$attributes['id']}";
		$animateonce_class_name = ( empty( $attributes['entranceAnimation'] ) || 'none' === $attributes['entranceAnimation'] ) ? '' : 'has-entrance-animation animateOnce';

		$total_classes = 'grigora-kit-post-excerpt ' . $align_class_name . ' ' . $aligntablet_class_name . ' ' . $alignmobile_class_name . ' ' . $block_id_class_name . ' ' . $animateonce_class_name;
		$link_target   = isset( $attributes['linkTarget'] ) ? $attributes['linkTarget'] : '_self';

		if ( isset( $attributes['StructureTag'] ) ) {
			$tag_name = $attributes['StructureTag'];
		}

		if ( isset( $attributes['linkPost'] ) && $attributes['linkPost'] ) {
			$rel     = ! empty( $attributes['rel'] ) ? 'rel="' . esc_attr( $attributes['rel'] ) . '"' : '';
			$excerpt = sprintf( '<a href="%1$s" target="%2$s" %3$s>%4$s</a>', get_the_permalink( $post_ID ), esc_attr( $link_target ), $rel, $excerpt );
		}
		$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $total_classes ) );

		return sprintf(
			'<%1$s %2$s %3$s>%4$s</%1$s>',
			$tag_name,
			$wrapper_attributes,
			( isset( $attributes['entranceAnimationDelay'] ) && $attributes['entranceAnimationDelay'] ) ? sprintf( ' data-animation-delay="%1$s"', $attributes['entranceAnimationDelay'] ) : '',
			$excerpt
		);
	}
}

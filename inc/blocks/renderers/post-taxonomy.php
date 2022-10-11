<?php
/**
 * Renderer function for post taxonomy
 *
 * @package grigora-kit
 */

if ( ! function_exists( 'grigora_get_the_term_list' ) ) {
	/**
	 * Render the terms.
	 *
	 * @param integer $post_id     Attributes Array.
	 * @param string  $taxonomy    Identifier of taxonomy.
	 * @param string  $before      Before Element.
	 * @param string  $sep         Seperator in Tags.
	 * @param string  $after       After Element.
	 * @param string  $link_target Link Target.
	 * @param string  $rel         Rel tag of link.
	 */
	function grigora_get_the_term_list( $post_id, $taxonomy, $before = '', $sep = '', $after = '', $link_target = '_self', $rel = '' ) {
		$terms = get_the_terms( $post_id, $taxonomy );

		if ( is_wp_error( $terms ) ) {
			return $terms;
		}

		if ( empty( $terms ) ) {
			return false;
		}

		$links = array();

		foreach ( $terms as $term ) {
			$link = get_term_link( $term, $taxonomy );
			if ( is_wp_error( $link ) ) {
				return $link;
			}
			$links[] = '<a class="taxonomy-background" href="' . esc_url( $link ) . '" rel="tag ' . $rel . '" target="' . $link_target . '"><span class="taxonomy-background-span">' . $term->name . '</span></a>';
		}

		/**
		 * Filters the term links for a given taxonomy.
		 *
		 * The dynamic portion of the hook name, `$taxonomy`, refers
		 * to the taxonomy slug.
		 *
		 * Possible hook names include:
		 *
		 *  - `term_links-category`
		 *  - `term_links-post_tag`
		 *  - `term_links-post_format`
		 *
		 * @since 2.5.0
		 *
		 * @param string[] $links An array of term links.
		 */
		$term_links = apply_filters( "term_links-{$taxonomy}", $links );  // phpcs:ignore WordPress.NamingConventions.ValidHookName.UseUnderscores

		return $before . implode( $sep, $term_links ) . $after;
	}
}

if ( ! function_exists( 'render_block_grigora_kit_post_taxonomy' ) ) {
	/**
	 * Render Post Taxonomy Block.
	 *
	 * @param array $attributes Attributes Array.
	 * @param array $content    Content.
	 * @param array $block      Block.
	 */
	function render_block_grigora_kit_post_taxonomy( $attributes, $content, $block ) {
		if ( ! isset( $block->context['postId'] ) || ! isset( $attributes['term'] ) ) {
			return '';
		}

		if ( ! is_taxonomy_viewable( $attributes['term'] ) ) {
			return '';
		}

		$post_terms = get_the_terms( $block->context['postId'], $attributes['term'] );
		if ( is_wp_error( $post_terms ) || empty( $post_terms ) ) {
			return '';
		}

		$link_target = isset( $attributes['linkTarget'] ) ? esc_attr( $attributes['linkTarget'] ) : '_self';
		$rel         = ! empty( $attributes['rel'] ) ? esc_attr( $attributes['rel'] ) : '';

		$classes = 'taxonomy-' . $attributes['term'] . ' grigora-kit-post-taxonomy';
		if ( isset( $attributes['align'] ) ) {
			$classes .= ' grigora-post-taxonomy-align-' . $attributes['align'];
		}
		if ( isset( $attributes['id'] ) ) {
			$classes .= ' block-id-' . $attributes['id'];
		}
		if ( isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ) {
			$classes .= ' has-entrance-animation animateOnce';
		}
		if ( ! isset( $attributes['randomBackColor'] ) || ( isset( $attributes['randomBackColor'] ) && $attributes['randomBackColor'] ) ) {
			$classes .= ' has-dynamic-colors';
		}

		$separator = empty( $attributes['separator'] ) ? '' : $attributes['separator'];
		if ( $separator ) {
			$separator = sprintf( '<span className="grigora-kit-post-taxonomy__separator">%1$s</span>', esc_html( $separator ) );
		}

		$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $classes ) );

		$prefix = sprintf( '<div %1$s %2$s>', $wrapper_attributes, ( isset( $attributes['entranceAnimationDelay'] ) && $attributes['entranceAnimationDelay'] ) ? sprintf( ' data-animation-delay="%1$s"', $attributes['entranceAnimationDelay'] ) : '' );

		if ( isset( $attributes['prefix'] ) && $attributes['prefix'] ) {
			$prefix .= '<span class="grigora-kit-post-taxonomy__prefix">' . esc_html( $attributes['prefix'] ) . '</span>';
		}

		$suffix = '</div>';

		return grigora_get_the_term_list(
			$block->context['postId'],
			$attributes['term'],
			wp_kses_post( $prefix ),
			'<span class="wp-block-post-terms__separator">' . $separator . '</span>',
			wp_kses_post( $suffix ),
			$link_target,
			$rel
		);
	}
}

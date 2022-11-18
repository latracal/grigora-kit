<?php
/**
 * Renderer function for post author
 *
 * @package grigora-kit
 */

if ( ! function_exists( 'render_block_grigora_kit_post_author' ) ) {
	/**
	 * Render Post Author Block.
	 *
	 * @param array $attributes Attributes Array.
	 * @param array $content    Content.
	 * @param array $block      Block.
	 */
	function render_block_grigora_kit_post_author( $attributes, $content, $block ) {
		if ( ! isset( $block->context['postId'] ) ) {
			if ( isset( $attributes['author'] ) && -1 !== $attributes['author'] ) {
				$author_id = $attributes['author'];
			} else {
				$author_id = get_query_var( 'author' );
			}
		} else {
			if ( isset( $attributes['author'] ) && -1 !== $attributes['author'] ) {
				$author_id = $attributes['author'];
			} else {
				$author_id = get_post_field( 'post_author', $block->context['postId'] );
			}
		}

		if ( empty( $author_id ) ) {
			return '';
		}

		$avatar = isset( $attributes['showAvatar'] ) && ! $attributes['showAvatar'] ? null :
		get_avatar(
			$author_id,
			isset( $attributes['imageSize'] ) ? $attributes['imageSize'] : 96
		);

		$classes = array_merge(
			array( 'grigora-kit-post-author' ),
			isset( $attributes['id'] ) ? array( 'block-id-' . $attributes['id'] ) : array(),
			isset( $attributes['entranceAnimation'] ) && 'none' !== $attributes['entranceAnimation'] ? array( 'has-entrance-animation animateOnce' ) : array(),
		);

		$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => implode( ' ', $classes ) ) );

		$authorname = ( isset( $attributes['showName'] ) && ! $attributes['showName'] ? '' :
			sprintf(
				'<%1$s class="grigora-kit-post-author__name">%2$s%3$s%4$s</%5$s>',
				isset( $attributes['NameTag'] ) ? $attributes['NameTag'] : 'h3',
				isset( $attributes['nameLink'] ) ? ( 'none' !== $attributes['nameLink'] ? '' : ( 'website' === $attributes['nameLink'] ? '<a href="' . get_the_author_meta( 'url', $author_id ) . '" target="_blank" >' : '<a href="' . get_author_posts_url( $author_id ) . '" target="_blank" >' ) ) : '',
				get_the_author_meta( 'display_name', $author_id ),
				isset( $attributes['nameLink'] ) ? ( 'none' !== $attributes['nameLink'] ? '' : '</a>' ) : '',
				isset( $attributes['NameTag'] ) ? $attributes['NameTag'] : 'h3',
			) );

		return sprintf( '<div %1$s %2$s>', $wrapper_attributes, ( isset( $attributes['entranceAnimationDelay'] ) && $attributes['entranceAnimationDelay'] ) ? sprintf( 'data-animation-delay="%1$s"', $attributes['entranceAnimationDelay'] ) : '' ) .
		( $avatar ? '<div class="grigora-kit-post-author__avatar">' . $avatar . '</div>' : '' ) .
		'<div class="grigora-kit-post-author__content">' .
		$authorname .
		( isset( $attributes['showBio'] ) && ! $attributes['showBio'] ? '' : '<p class="grigora-kit-post-author__bio">' . get_the_author_meta( 'user_description', $author_id ) . '</p>' ) .
		'</div>' .
		'</div>';
	}
}

<?php
/**
 * Renderer function for post grid 4
 *
 * @package grigora-kit
 */

if ( ! function_exists( 'render_block_grigora_kit_post_grid_4' ) ) {
	/**
	 * Render Post Grid 4.
	 *
	 * @param array $attributes Attributes Array.
	 * @param array $content    Content.
	 * @param array $block      Block.
	 */
	function render_block_grigora_kit_post_grid_4( $attributes, $content, $block ) {
		$post_type        = isset( $attributes['post_type'] ) && $attributes['post_type'] ? $attributes['post_type'] : 'post';
		$posts            = isset( $attributes['posts'] ) && $attributes['posts'] ? $attributes['posts'] : 6;
		$columns          = isset( $attributes['columns'] ) && $attributes['columns'] ? $attributes['columns'] : 3;
		$offset           = isset( $attributes['offset'] ) && $attributes['offset'] ? $attributes['offset'] : 0;
		$order            = isset( $attributes['order'] ) && $attributes['order'] ? $attributes['order'] : 'ASC';
		$orderby          = isset( $attributes['orderby'] ) && $attributes['orderby'] ? $attributes['orderby'] : 'ID';
		$search           = isset( $attributes['search'] ) && $attributes['search'] ? $attributes['search'] : '';
		$author           = isset( $attributes['author'] ) && $attributes['author'] ? $attributes['author'] : [];
		$author_exclude   = isset( $attributes['excludeAuthor'] ) && $attributes['excludeAuthor'] ? $attributes['excludeAuthor'] : [];
		$taxonomy         = isset( $attributes['selectedTaxOption'] ) && $attributes['selectedTaxOption'] ? $attributes['selectedTaxOption'] : array();
		$taxonomy_exclude = isset( $attributes['selectedExcludeTaxOption'] ) && $attributes['selectedExcludeTaxOption'] ? $attributes['selectedExcludeTaxOption'] : array();
		$include          = isset( $attributes['includePost'] ) && $attributes['includePost'] ? $attributes['includePost'] : [];
		$exclude          = isset( $attributes['excludePost'] ) && $attributes['excludePost'] ? $attributes['excludePost'] : [];
		$after            = isset( $attributes['afterDate'] ) && $attributes['afterDate'] ? $attributes['afterDate'] : '';
		$before           = isset( $attributes['beforeDate'] ) && $attributes['beforeDate'] ? $attributes['beforeDate'] : '';

		$author         = array_map( 'grigora_extract_value_array', $author );
		$author_exclude = array_map( 'grigora_extract_value_array', $author_exclude );
		$include        = array_map( 'grigora_extract_value_array', $include );
		$exclude        = array_map( 'grigora_extract_value_array', $exclude );

		$data = grigora_kit_query_results( $post_type, $posts, $offset, $order, $orderby, $search, $author, $author_exclude, $taxonomy, $taxonomy_exclude, $include, $exclude, $after, $before );

		$classes = array_merge(
			array( 'grigora-kit-post-grid-4' ),
			isset( $attributes['id'] ) ? array( 'block-id-' . $attributes['id'] ) : array(),
		);

		$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => implode( ' ', $classes ) ) );

		$data_length  = count( $data );
		$posts_length = min( $data_length, $posts );

		if ( count( $data ) === $posts_length ) {
			$rows     = ceil( $posts_length / $columns );
			$last_row = $posts_length % $columns ? $posts_length % $columns : $columns;

			$title_max_length   = isset( $attributes['maxLength'] ) && $attributes['maxLength'] ? $attributes['maxLength'] : 10;
			$content_max_length = isset( $attributes['contentMaxLength'] ) && $attributes['contentMaxLength'] ? $attributes['contentMaxLength'] : 10;

			$author_icon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-person-circle\" viewBox=\"0 0 16 16\">\n  <path d=\"M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z\"/>\n  <path fill-rule=\"evenodd\" d=\"M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z\"/>\n</svg>";
			$date_icon   = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-calendar\" viewBox=\"0 0 16 16\">\n  <path d=\"M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z\"/>\n</svg>";

			$category_toggle = isset( $attributes['categoryToggle'] ) ? $attributes['categoryToggle'] : false;
			$category_link   = isset( $attributes['categoryLink'] ) ? $attributes['categoryLink'] : false;
			$excerpt_toggle  = isset( $attributes['excerptToggle'] ) ? $attributes['excerptToggle'] : false;
			$author_toggle   = isset( $attributes['authorToggle'] ) ? $attributes['authorToggle'] : false;
			$date_toggle     = isset( $attributes['dateToggle'] ) ? $attributes['dateToggle'] : false;

			$main = '<div class="main-style">';

			for ( $row = 0; $row < $rows; $row++ ) {
				$count = (int) ( $rows - 1 ) !== $row ? $columns : $last_row;
				$main  = $main . '<div class="column-container column-style">';
				for ( $col = 0; $col < $count; $col++ ) {
					$index = ( $columns * $row ) + $col;
					$image = get_the_post_thumbnail_url( $data[ $index ]->ID );
					$main  = $main . sprintf(
						'<%1$s class="block-style">%2$s%3$s%4$s%5$s%6$s%7$s%8$s%9$s</%10$s>',
						isset( $attributes['ContentTag'] ) ? $attributes['ContentTag'] : 'div',
						(
							( '<a class="a-container" target="' ) . ( isset( $attributes['newTab'] ) ? ( $attributes['newTab'] ? '_blank' : '_self' ) : '_self' ) .
							( '" href="' ) . get_permalink( $data[ $index ]->ID ) . ( '">' ) . ( '</a>' )
						),
						$image ? ( sprintf( '<img src=%1$s class="img-style"/>', $image ) ) : '',
						( '<div class="overlay-style"></div>' ),
						( '<div class="content-style">' ),
						(
							( $category_toggle ?
								(
									( '<div class="cat-container"> <a class="category-style" target="' ) . ( isset( $attributes['newTab'] ) ? ( $attributes['newTab'] ? '_blank' : '_self' ) : '_self' ) .
									( '" href="' ) . ( $category_link ? get_category_link( get_the_category( $data[ $index ]->ID )[0]->term_id ) : get_permalink( $data[ $index ]->ID ) ) . ( '">' ) . ( get_the_category( $data[ $index ]->ID )[0]->name ) . ( '</a> </div>' )
								)
								: ' '
							) .
							sprintf(
								'<%1$s class="title-container spanTitle-style">%2$s</%3$s>',
								isset( $attributes['TitleTag'] ) ? $attributes['TitleTag'] : 'h3',
								( sprintf( '<span class="title-style"> %1$s </span>', grigora_text_trimmer( $data[ $index ]->post_title, $title_max_length ) ) ),
								isset( $attributes['TitleTag'] ) ? $attributes['TitleTag'] : 'h3'
							)
						),
						( $excerpt_toggle ? ( sprintf( '<p class="excerpt-style"> %1$s </p>', grigora_text_trimmer( get_the_excerpt( $data[ $index ]->ID ), $content_max_length ) ) ) : ' ' ),
						(
							sprintf(
								'<span class="meta-style"> %1$s %2$s </span>',
								( $author_toggle ?
									sprintf(
										'<span class="meta-field-container"> %1$s %2$s </span>',
										$author_icon,
										get_the_author_meta( 'display_name', $data[ $index ]->post_author )
									) : ' '
								),
								( $date_toggle ?
									sprintf(
										'<span class="meta-field-container"> %1$s %2$s </span>',
										$date_icon,
										str_split( $data[ $index ]->post_date, 10 )[0]
									) : ' '
								)
							)
						),
						( '</div>' ),
						isset( $attributes['ContentTag'] ) ? $attributes['ContentTag'] : 'div'
					);
				}
				$main = $main . '</div>';
			}

			$main = $main . '</div>';

			return sprintf( '<div %1$s>', $wrapper_attributes ) .
				$main .
			'</div>';
		} else {
			return '';
		}
	}
}

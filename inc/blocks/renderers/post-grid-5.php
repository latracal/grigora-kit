<?php
/**
 * Renderer function for post grid 5
 *
 * @package grigora-kit
 */

if ( ! function_exists( 'render_block_grigora_kit_post_grid_5' ) ) {
	/**
	 * Render Post Grid 5.
	 *
	 * @param array $attributes Attributes Array.
	 * @param array $content    Content.
	 * @param array $block      Block.
	 */
	function render_block_grigora_kit_post_grid_5( $attributes, $content, $block ) {
		$post_type        = isset( $attributes['post_type'] ) && $attributes['post_type'] ? $attributes['post_type'] : 'post';
		$per_page         = 4;
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

		$data = grigora_kit_query_results( $post_type, $per_page, $offset, $order, $orderby, $search, $author, $author_exclude, $taxonomy, $taxonomy_exclude, $include, $exclude, $after, $before );

		$classes = array_merge(
			array( 'grigora-kit-post-grid-5' ),
			isset( $attributes['id'] ) ? array( 'block-id-' . $attributes['id'] ) : array(),
		);

		$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => implode( ' ', $classes ) ) );

		if ( count( $data ) === 4 ) {
			$category_toggle = isset( $attributes['categoryToggle'] ) ? $attributes['categoryToggle'] : false;
			$category_link   = isset( $attributes['categoryLink'] ) ? $attributes['categoryLink'] : false;
			$excerpt_toggle  = isset( $attributes['excerptToggle'] ) ? $attributes['excerptToggle'] : false;
			$author_toggle   = isset( $attributes['authorToggle'] ) ? $attributes['authorToggle'] : false;
			$date_toggle     = isset( $attributes['dateToggle'] ) ? $attributes['dateToggle'] : false;

			$title_max_length = isset( $attributes['maxLength'] ) && $attributes['maxLength'] ? $attributes['maxLength'] : 10;

			$content_max_length = isset( $attributes['contentMaxLength'] ) && $attributes['contentMaxLength'] ? $attributes['contentMaxLength'] : 10;

			$author_icon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-person-circle\" viewBox=\"0 0 16 16\">\n  <path d=\"M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z\"/>\n  <path fill-rule=\"evenodd\" d=\"M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z\"/>\n</svg>";
			$date_icon   = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-calendar\" viewBox=\"0 0 16 16\">\n  <path d=\"M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z\"/>\n</svg>";

			$image       = get_the_post_thumbnail_url( $data[0]->ID );
			$first_block = sprintf(
				'<%1$s class="block1 block-style">%2$s%3$s%4$s%5$s%6$s%7$s%8$s%9$s</%10$s>',
				isset( $attributes['ContentTag'] ) ? $attributes['ContentTag'] : 'div',
				(
					( '<a class="a-container" target="' ) . ( isset( $attributes['newTab'] ) ? ( $attributes['newTab'] ? '_blank' : '_self' ) : '_self' ) .
					( '" href="' ) . get_permalink( $data[0]->ID ) . ( '">' ) . ( '</a>' )
				),
				$image ? ( sprintf( '<img src=%1$s class="img-style"/>', $image ) ) : '',
				( '<div class="overlay-style"></div>' ),
				( '<div class="content-container">' ),
				(
					( $category_toggle ?
						(
							( '<div class="cat-container"> <a class="category-style" target="' ) . ( isset( $attributes['newTab'] ) ? ( $attributes['newTab'] ? '_blank' : '_self' ) : '_self' ) .
							( '" href="' ) . ( $category_link ? get_category_link( get_the_category( $data[0]->ID )[0]->term_id ) : get_permalink( $data[0]->ID ) ) . ( '">' ) . ( get_the_category( $data[0]->ID )[0]->name ) . ( '</a> </div>' )
						)
						: ' '
					) .
					sprintf(
						'<%1$s class="title-container spanTitle-style">%2$s</%3$s>',
						isset( $attributes['TitleTag'] ) ? $attributes['TitleTag'] : 'h3',
						( sprintf( '<span class="title-style"> %1$s </span>', grigora_text_trimmer( $data[0]->post_title, $title_max_length ) ) ),
						isset( $attributes['TitleTag'] ) ? $attributes['TitleTag'] : 'h3'
					)
				),
				( $excerpt_toggle ? ( sprintf( '<p class="excerpt-style"> %1$s </p>', grigora_text_trimmer( get_the_excerpt( $data[0]->ID ), $content_max_length ) ) ) : ' ' ),
				(
					sprintf(
						'<span class="meta-style"> %1$s %2$s </span>',
						( $author_toggle ?
							sprintf(
								'<span class="meta-field-container"> %1$s %2$s </span>',
								$author_icon,
								get_the_author_meta( 'display_name', $data[0]->post_author )
							) : ' '
						),
						( $date_toggle ?
							sprintf(
								'<span class="meta-field-container"> %1$s %2$s </span>',
								$date_icon,
								str_split( $data[0]->post_date, 10 )[0]
							) : ' '
						)
					)
				),
				( '</div>' ),
				isset( $attributes['ContentTag'] ) ? $attributes['ContentTag'] : 'div'
			);

			$image        = get_the_post_thumbnail_url( $data[1]->ID );
			$second_block = sprintf(
				'<%1$s class="block234 block-style">%2$s%3$s%4$s%5$s%6$s%7$s%8$s%9$s</%10$s>',
				isset( $attributes['ContentTag'] ) ? $attributes['ContentTag'] : 'div',
				(
					( '<a class="a-container" target="' ) . ( isset( $attributes['newTab'] ) ? ( $attributes['newTab'] ? '_blank' : '_self' ) : '_self' ) .
					( '" href="' ) . get_permalink( $data[1]->ID ) . ( '">' ) . ( '</a>' )
				),
				$image ? ( sprintf( '<img src=%1$s class="img-style"/>', $image ) ) : '',
				( '<div class="overlay-style"></div>' ),
				( '<div class="content-container">' ),
				(
					( $category_toggle ?
						(
							( '<div class="cat-container"> <a class="category-style" target="' ) . ( isset( $attributes['newTab'] ) ? ( $attributes['newTab'] ? '_blank' : '_self' ) : '_self' ) .
							( '" href="' ) . ( $category_link ? get_category_link( get_the_category( $data[1]->ID )[0]->term_id ) : get_permalink( $data[1]->ID ) ) . ( '">' ) . ( get_the_category( $data[1]->ID )[0]->name ) . ( '</a> </div>' )
						)
						: ' '
					) .
					sprintf(
						'<%1$s class="title-container spanTitle-style">%2$s</%3$s>',
						isset( $attributes['TitleTag'] ) ? $attributes['TitleTag'] : 'h3',
						( sprintf( '<span class="title-style"> %1$s </span>', grigora_text_trimmer( $data[1]->post_title, $title_max_length ) ) ),
						isset( $attributes['TitleTag'] ) ? $attributes['TitleTag'] : 'h3'
					)
				),
				( $excerpt_toggle ? ( sprintf( '<p class="excerpt-style"> %1$s </p>', grigora_text_trimmer( get_the_excerpt( $data[1]->ID ), $content_max_length ) ) ) : ' ' ),
				(
					sprintf(
						'<span class="meta-style"> %1$s %2$s </span>',
						( $author_toggle ?
							sprintf(
								'<span class="meta-field-container"> %1$s %2$s </span>',
								$author_icon,
								get_the_author_meta( 'display_name', $data[1]->post_author )
							) : ' '
						),
						( $date_toggle ?
							sprintf(
								'<span class="meta-field-container"> %1$s %2$s </span>',
								$date_icon,
								str_split( $data[1]->post_date, 10 )[0]
							) : ' '
						)
					)
				),
				( '</div>' ),
				isset( $attributes['ContentTag'] ) ? $attributes['ContentTag'] : 'div'
			);

			$image       = get_the_post_thumbnail_url( $data[2]->ID );
			$third_block = sprintf(
				'<%1$s class="block234 block-style">%2$s%3$s%4$s%5$s%6$s%7$s%8$s%9$s</%10$s>',
				isset( $attributes['ContentTag'] ) ? $attributes['ContentTag'] : 'div',
				(
					( '<a class="a-container" target="' ) . ( isset( $attributes['newTab'] ) ? ( $attributes['newTab'] ? '_blank' : '_self' ) : '_self' ) .
					( '" href="' ) . get_permalink( $data[2]->ID ) . ( '">' ) . ( '</a>' )
				),
				$image ? ( sprintf( '<img src=%1$s class="img-style"/>', $image ) ) : '',
				( '<div class="overlay-style"></div>' ),
				( '<div class="content-container">' ),
				(
					( $category_toggle ?
						(
							( '<div class="cat-container"> <a class="category-style" target="' ) . ( isset( $attributes['newTab'] ) ? ( $attributes['newTab'] ? '_blank' : '_self' ) : '_self' ) .
							( '" href="' ) . ( $category_link ? get_category_link( get_the_category( $data[2]->ID )[0]->term_id ) : get_permalink( $data[2]->ID ) ) . ( '">' ) . ( get_the_category( $data[2]->ID )[0]->name ) . ( '</a> </div>' )
						)
						: ' '
					) .
					sprintf(
						'<%1$s class="title-container spanTitle-style">%2$s</%3$s>',
						isset( $attributes['TitleTag'] ) ? $attributes['TitleTag'] : 'h3',
						( sprintf( '<span class="title-style"> %1$s </span>', grigora_text_trimmer( $data[2]->post_title, $title_max_length ) ) ),
						isset( $attributes['TitleTag'] ) ? $attributes['TitleTag'] : 'h3'
					)
				),
				( $excerpt_toggle ? ( sprintf( '<p class="excerpt-style"> %1$s </p>', grigora_text_trimmer( get_the_excerpt( $data[2]->ID ), $content_max_length ) ) ) : ' ' ),
				(
					sprintf(
						'<span class="meta-style"> %1$s %2$s </span>',
						( $author_toggle ?
							sprintf(
								'<span class="meta-field-container"> %1$s %2$s </span>',
								$author_icon,
								get_the_author_meta( 'display_name', $data[2]->post_author )
							) : ' '
						),
						( $date_toggle ?
							sprintf(
								'<span class="meta-field-container"> %1$s %2$s </span>',
								$date_icon,
								str_split( $data[2]->post_date, 10 )[0]
							) : ' '
						)
					)
				),
				( '</div>' ),
				isset( $attributes['ContentTag'] ) ? $attributes['ContentTag'] : 'div'
			);

			$image       = get_the_post_thumbnail_url( $data[3]->ID );
			$fourth_block = sprintf(
				'<%1$s class="block234 block-style">%2$s%3$s%4$s%5$s%6$s%7$s%8$s%9$s</%10$s>',
				isset( $attributes['ContentTag'] ) ? $attributes['ContentTag'] : 'div',
				(
					( '<a class="a-container" target="' ) . ( isset( $attributes['newTab'] ) ? ( $attributes['newTab'] ? '_blank' : '_self' ) : '_self' ) .
					( '" href="' ) . get_permalink( $data[3]->ID ) . ( '">' ) . ( '</a>' )
				),
				$image ? ( sprintf( '<img src=%1$s class="img-style"/>', $image ) ) : '',
				( '<div class="overlay-style"></div>' ),
				( '<div class="content-container">' ),
				(
					( $category_toggle ?
						(
							( '<div class="cat-container"> <a class="category-style" target="' ) . ( isset( $attributes['newTab'] ) ? ( $attributes['newTab'] ? '_blank' : '_self' ) : '_self' ) .
							( '" href="' ) . ( $category_link ? get_category_link( get_the_category( $data[3]->ID )[0]->term_id ) : get_permalink( $data[3]->ID ) ) . ( '">' ) . ( get_the_category( $data[3]->ID )[0]->name ) . ( '</a> </div>' )
						)
						: ' '
					) .
					sprintf(
						'<%1$s class="title-container spanTitle-style">%2$s</%3$s>',
						isset( $attributes['TitleTag'] ) ? $attributes['TitleTag'] : 'h3',
						( sprintf( '<span class="title-style"> %1$s </span>', grigora_text_trimmer( $data[3]->post_title, $title_max_length ) ) ),
						isset( $attributes['TitleTag'] ) ? $attributes['TitleTag'] : 'h3'
					)
				),
				( $excerpt_toggle ? ( sprintf( '<p class="excerpt-style"> %1$s </p>', grigora_text_trimmer( get_the_excerpt( $data[2]->ID ), $content_max_length ) ) ) : ' ' ),
				(
					sprintf(
						'<span class="meta-style"> %1$s %2$s </span>',
						( $author_toggle ?
							sprintf(
								'<span class="meta-field-container"> %1$s %2$s </span>',
								$author_icon,
								get_the_author_meta( 'display_name', $data[3]->post_author )
							) : ' '
						),
						( $date_toggle ?
							sprintf(
								'<span class="meta-field-container"> %1$s %2$s </span>',
								$date_icon,
								str_split( $data[3]->post_date, 10 )[0]
							) : ' '
						)
					)
				),
				( '</div>' ),
				isset( $attributes['ContentTag'] ) ? $attributes['ContentTag'] : 'div'
			);

			return sprintf( '<div %1$s>', $wrapper_attributes ) .
				'<div class="first-style">' .
					$first_block .
					'<div class="second-style">' .
						$second_block .
						$third_block .
						$fourth_block .
					'</div>' .
				'</div>' .
			'</div>';
		} else {
			return '';
		}
	}
}

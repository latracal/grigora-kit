<?php


function grigora_kit_block_category_all( $categories, $block_editor_context ) {
	return array_merge(
		array(
			array(
				'slug'  => 'grigora-kit',
				'title' => __( 'Grigora Kit', 'grigora-kit' ),
			),
			array(
				'slug'  => 'grigora-kit-query',
				'title' => __( 'Grigora Kit - Query', 'grigora-kit' ),
			),
		),
		$categories
	);
}

add_filter( 'block_categories_all', 'grigora_kit_block_category_all', 10, 2 );

if(!function_exists("render_block_grigora_kit_post_title")){
	function render_block_grigora_kit_post_title( $attributes, $content, $block ) {
		if ( ! isset( $block->context['postId'] ) ) {
			return '';
		}
	
		$post_ID = $block->context['postId'];
		$title   = get_the_title();
	
		if ( ! $title ) {
			return '';
		}
	
		$tag_name         = 'h2';
		$align_class_name = empty( $attributes['align'] ) ? '' : "grigora-post-title-align-{$attributes['align']}";
		$block_id_class_name = empty( $attributes['id'] ) ? '' : "block-id-{$attributes['id']}";
		$animateonce_class_name = ( empty( $attributes['entranceAnimation'] ) || $attributes['entranceAnimation'] === "none" ) ? '' : "has-entrance-animation animateOnce";

		$total_classes = "grigora-kit-post-title" . " " . $align_class_name . " " . $block_id_class_name . " " . $animateonce_class_name;
		$link_target = isset( $attributes['linkTarget'] ) ? $attributes["linkTarget"] : "_self";

		if ( isset( $attributes['StructureTag'] ) ) {
			$tag_name = $attributes['StructureTag'];
		}
	
		if ( isset( $attributes['linkPost'] ) && $attributes['linkPost'] ) {
			$rel   = ! empty( $attributes['rel'] ) ? 'rel="' . esc_attr( $attributes['rel'] ) . '"' : '';
			$title = sprintf( '<a href="%1$s" target="%2$s" %3$s>%4$s</a>', get_the_permalink( $post_ID ), esc_attr( $link_target ), $rel, $title );
		}
		$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $total_classes ) );
	
		return sprintf(
			'<%1$s %2$s>%3$s</%1$s>',
			$tag_name,
			$wrapper_attributes,
			$title
		);
	}
}

if(!function_exists("grigora_string_endsWith")){
	function grigora_string_endsWith( $haystack, $needle ) {
		$length = strlen( $needle );
		if( !$length ) {
			return true;
		}
		return substr( $haystack, -$length ) === $needle;
	}
}

if(!function_exists("render_block_grigora_kit_post_excerpt")){
	function render_block_grigora_kit_post_excerpt( $attributes, $content, $block ) {
		if ( ! isset( $block->context['postId'] ) ) {
			return '';
		}
	
		$post_ID = $block->context['postId'];
		$excerpt   = get_the_excerpt();
	
		if ( ! $excerpt ) {
			return '';
		}

		$default_length = apply_filters( "excerpt_length", 55 );
		$default_suffix = apply_filters( "excerpt_more", "…" );
		$excerpt_length = false;
		$excerpt_suffix = false;

		if(isset( $attributes['excerptLength'] )){
			$excerpt_length = $attributes['excerptLength'];
		}
		if(isset( $attributes['suffix'] )){
			$excerpt_suffix = $attributes['suffix'];
		}

		// format excerpt
		// trim
		$excerpt = trim($excerpt);
		if($excerpt_length){
			$excerpt = implode(' ', array_slice(explode(' ', $excerpt), 0, $excerpt_length));;
		}
		else{
			$excerpt = implode(' ', array_slice(explode(' ', $excerpt), 0, $default_length));;
		}

		// suffix
		if( $excerpt ){
			if(grigora_string_endsWith( strtolower($excerpt), strtolower($default_suffix) )){
				if( $excerpt_suffix ){
					$excerpt = substr($excerpt, 0, -strlen($default_suffix)) . $excerpt_suffix;
				}
				else{
					$excerpt = substr($excerpt, 0, -strlen($default_suffix)) . $default_suffix;
				}
			}

			if( $excerpt_suffix ){
				if( !grigora_string_endsWith( strtolower($excerpt), strtolower($excerpt_suffix) )){
					$excerpt = $excerpt . $excerpt_suffix;
				}
			}
			else{
				if( !grigora_string_endsWith( strtolower($excerpt), strtolower($default_suffix) )){
					$excerpt = $excerpt . $default_suffix;
				}
			}
		}
	
		$tag_name         = 'p';
		$align_class_name = empty( $attributes['align'] ) ? '' : "grigora-post-excerpt-align-{$attributes['align']}";
		$block_id_class_name = empty( $attributes['id'] ) ? '' : "block-id-{$attributes['id']}";
		$animateonce_class_name = ( empty( $attributes['entranceAnimation'] ) || $attributes['entranceAnimation'] === "none" ) ? '' : "has-entrance-animation animateOnce";

		$total_classes = "grigora-kit-post-excerpt" . " " . $align_class_name . " " . $block_id_class_name . " " . $animateonce_class_name;
		$link_target = isset( $attributes['linkTarget'] ) ? $attributes["linkTarget"] : "_self";

		if ( isset( $attributes['StructureTag'] ) ) {
			$tag_name = $attributes['StructureTag'];
		}
	
		if ( isset( $attributes['linkPost'] ) && $attributes['linkPost'] ) {
			$rel   = ! empty( $attributes['rel'] ) ? 'rel="' . esc_attr( $attributes['rel'] ) . '"' : '';
			$excerpt = sprintf( '<a href="%1$s" target="%2$s" %3$s>%4$s</a>', get_the_permalink( $post_ID ), esc_attr( $link_target ), $rel, $excerpt );
		}
		$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $total_classes ) );
	
		return sprintf(
			'<%1$s %2$s>%3$s</%1$s>',
			$tag_name,
			$wrapper_attributes,
			$excerpt
		);
	}
}

if(!function_exists("grigora_get_the_term_list")){
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
			$links[] = '<a class="taxonomy-background" href="' . esc_url( $link ) . '" rel="tag ' . $rel . '" target="' . $link_target . '">' . '<span class="taxonomy-background-span">' . $term->name . '</span>' . '</a>';
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

if(!function_exists("render_block_grigora_kit_post_taxonomy")){
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

		$link_target = isset( $attributes['linkTarget'] ) ? esc_attr( $attributes["linkTarget"])  : "_self";
		$rel   = ! empty( $attributes['rel'] ) ? esc_attr( $attributes['rel'] ) : '';

		$classes = 'taxonomy-' . $attributes['term'] . " grigora-kit-post-taxonomy";
		if ( isset( $attributes['align'] ) ) {
			$classes .= ' grigora-post-taxonomy-align-' . $attributes['align'];
		}
		if ( isset( $attributes['id'] ) ) {
			$classes .= ' block-id-' . $attributes['id'];
		}
		if ( isset( $attributes['entranceAnimation'] ) && $attributes['entranceAnimation'] != 'none' ) {
			$classes .= ' animateOnce';
		}
		if ( !isset( $attributes['randomBackColor'] ) || (isset( $attributes['randomBackColor'] ) && $attributes['randomBackColor'] )) {
			$classes .= ' has-dynamic-colors';
		}
		
		
		$separator = empty( $attributes['separator'] ) ? '' : $attributes['separator'];
		if( $separator ){
			$separator = sprintf( '<span className="grigora-kit-post-taxonomy__separator">%1$s</span>', esc_html( $separator ) );
		}
		
		$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $classes ) );
		
		$prefix = "<div $wrapper_attributes>";
		if ( isset( $attributes['prefix'] ) && $attributes['prefix'] ) {
			$prefix .= '<span class="grigora-kit-post-taxonomy__prefix">' . esc_html( $attributes['prefix'] ) . '</span>';
		}
		
		$suffix = '</div>';
		
		
		// return "here";
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

/**
 * Register Grigora Kit Blocks.
 */
if(!function_exists("grigora_kit_block_init")){
	function grigora_kit_block_init() {

		$ver = GRIGORA_KIT_DEBUG ? time() : GRIGORA_KIT_VERSION;
        $ext = GRIGORA_KIT_DEBUG ? ".css" : ".min.css";

		// register style for blocks
		wp_register_style( "grigora-kit-button", GRIGORA_KIT_URL . "assets/css/blocks/button/style" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-number-counter", GRIGORA_KIT_URL . "assets/css/blocks/number-counter/style" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-countdown", GRIGORA_KIT_URL . "assets/css/blocks/countdown/style" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-icon", GRIGORA_KIT_URL . "assets/css/blocks/icon/style" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-group", GRIGORA_KIT_URL . "assets/css/blocks/group/style" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-text", GRIGORA_KIT_URL . "assets/css/blocks/text/style" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-star-rating", GRIGORA_KIT_URL . "assets/css/blocks/star-rating/style" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-scroll-to-top", GRIGORA_KIT_URL . "assets/css/blocks/scroll-to-top/style" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-post-title", GRIGORA_KIT_URL . "assets/css/blocks/post-title/style" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-post-excerpt", GRIGORA_KIT_URL . "assets/css/blocks/post-excerpt/style" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-post-taxonomy", GRIGORA_KIT_URL . "assets/css/blocks/post-taxonomy/style" . $ext, array(), $ver);

		// register editor style for blocks
		wp_register_style( "grigora-kit-editor-button", GRIGORA_KIT_URL . "assets/css/blocks/button/editor" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-editor-number-counter", GRIGORA_KIT_URL . "assets/css/blocks/number-counter/editor" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-editor-countdown", GRIGORA_KIT_URL . "assets/css/blocks/countdown/editor" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-editor-icon", GRIGORA_KIT_URL . "assets/css/blocks/icon/editor" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-editor-group", GRIGORA_KIT_URL . "assets/css/blocks/group/editor" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-editor-text", GRIGORA_KIT_URL . "assets/css/blocks/text/editor" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-editor-star-rating", GRIGORA_KIT_URL . "assets/css/blocks/star-rating/editor" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-editor-scroll-to-top", GRIGORA_KIT_URL . "assets/css/blocks/scroll-to-top/editor" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-editor-post-title", GRIGORA_KIT_URL . "assets/css/blocks/post-title/editor" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-editor-post-excerpt", GRIGORA_KIT_URL . "assets/css/blocks/post-excerpt/editor" . $ext, array(), $ver);
		wp_register_style( "grigora-kit-editor-post-taxonomy", GRIGORA_KIT_URL . "assets/css/blocks/post-taxonomy/editor" . $ext, array(), $ver);

		// register blocks
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/button/block.json', array(
			'style'         => 'grigora-kit-button',
			'editor_style'  =>  'grigora-kit-editor-button',
		) );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/number-counter/block.json', array(
			'style'         => 'grigora-kit-number-counter',
			'editor_style'  =>  'grigora-kit-editor-number-counter',
		) );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/countdown/block.json', array(
			'style'         => 'grigora-kit-countdown',
			'editor_style'  =>  'grigora-kit-editor-countdown',
		) );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/icon/block.json', array(
			'style'         => 'grigora-kit-icon',
			'editor_style'  =>  'grigora-kit-editor-icon',
		) );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/group/block.json', array(
			'style'         => 'grigora-kit-group',
			'editor_style'  =>  'grigora-kit-editor-group',
		) );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/text/block.json', array(
			'style'         => 'grigora-kit-text',
			'editor_style'  =>  'grigora-kit-editor-text',
		) );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/star-rating/block.json', array(
			'style'         => 'grigora-kit-star-rating',
			'editor_style'  =>  'grigora-kit-editor-star-rating',
		) );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/scroll-to-top/block.json', array(
			'style'         => 'grigora-kit-scroll-to-top',
			'editor_style'  =>  'grigora-kit-editor-scroll-to-top',
		) );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/post-title/block.json', array(
			'style'         => 'grigora-kit-post-title',
			'editor_style'  =>  'grigora-kit-editor-post-title',
			'render_callback' => 'render_block_grigora_kit_post_title',
		) );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/post-excerpt/block.json', array(
			'style'         => 'grigora-kit-post-excerpt',
			'editor_style'  =>  'grigora-kit-editor-post-excerpt',
			'render_callback' => 'render_block_grigora_kit_post_excerpt',
		) );
		register_block_type( GRIGORA_KIT_PATH . '/build/blocks/post-taxonomy/block.json', array(
			'style'         => 'grigora-kit-post-taxonomy',
			'editor_style'  =>  'grigora-kit-editor-post-taxonomy',
			'render_callback' => 'render_block_grigora_kit_post_taxonomy',
		) );
		
		// experimental blocks
		if( GRIGORA_KIT_DEBUG ){
		}
	}
}

add_action( 'init', 'grigora_kit_block_init' );

if(!function_exists("grigora_enqueue_blocks_via_js")){
	function grigora_enqueue_blocks_via_js(){
	
		$assets_file = GRIGORA_KIT_PATH . 'build/index.asset.php';
		$assets_file = file_exists( $assets_file ) ? require $assets_file : false;
	
		wp_enqueue_script(
			'grigora-kit-blocks',
			GRIGORA_KIT_URL . 'build/index.js',
			$assets_file['dependencies'],
			$assets_file['version'],
			true
		);
	}
}

add_action( 'enqueue_block_editor_assets', 'grigora_enqueue_blocks_via_js' );
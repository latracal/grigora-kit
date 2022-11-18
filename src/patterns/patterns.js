import { __ } from '@wordpress/i18n';
import { render, unmountComponentAtNode } from '@wordpress/element';
import { useState, useEffect } from '@wordpress/element';
import { Path, SVG, TextControl, Popover, Button } from '@wordpress/components';
import { openModal, closeModal } from './modal';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { compose } from '@wordpress/compose';
import { useSelect, withSelect, withDispatch } from '@wordpress/data';
import { parse } from '@wordpress/blocks';

function GrigoraPatterns( props ) {
	const { insertBlocks, removeBlock } = props;

	const [ category, setCategory ] = useState( 'All' );
	const [ loading, setLoading ] = useState( true );
	const [ patterns, setPatterns ] = useState( [] );
	const [ categories, setCategories ] = useState( [
		{ name: 'All', count: 0, active: true },
	] );
	const [ importing, setImporting ] = useState( false );

	function get_cache( key ) {
		if ( key in localStorage ) {
			try {
				return JSON.parse( localStorage.getItem( key ) );
			} catch ( e ) {
				return false;
			}
		}
		return false;
	}

	function set_cache( key, value ) {
		localStorage.setItem( key, JSON.stringify( value ) );
	}

	function parse_categories( data ) {
		data = Object.values( data );
		var arrayLength = data.length;
		var temp_cat = {};
		var all_count = 0;
		for ( var i = 0; i < arrayLength; i++ ) {
			all_count += 1;
			if ( data[ i ].tags ) {
				var arrayLength2 = data[ i ].tags.length;
				for ( var j = 0; j < arrayLength2; j++ ) {
					if ( data[ i ] ) {
						temp_cat[ data[ i ].tags[ j ] ] =
							temp_cat[ data[ i ].tags[ j ] ] + 1 || 1;
					}
				}
			}
		}
		var temp_cat = Object.keys( temp_cat ).map( ( key ) => {
			return { name: key, count: temp_cat[ key ] };
		} );
		temp_cat.unshift( { name: 'All', count: all_count, active: true } );
		return temp_cat;
	}

	useEffect( () => {
		var formData = new FormData();
		formData.append( 'action', 'grigora_get_patterns_meta_data' );
		var cache = get_cache( 'grigora_get_patterns_meta_data' );
		if ( cache ) {
			setPatterns( cache );
			setCategories( parse_categories( cache ) );
			setLoading( false );
		} else {
			fetch( grigora_kit_blocks_params.ajax_url, {
				method: 'POST',
				body: formData,
			} )
				.then( ( response ) => response.json() )
				.then( ( data ) => {
					if ( data.success ) {
						set_cache(
							'grigora_get_patterns_meta_data',
							data.data
						);
						setPatterns( data.data );
						setLoading( false );
					} else {
					}
				} );
		}
	}, [] );

	function cancelImportAnimations() {
		var eles = document.querySelectorAll( '.patterns .select-pattern' );
		Array.from( eles ).forEach( ( element ) => {
			element.classList.remove( 'active' );
		} );
	}

	const insertPatternInBlockEditor = ( data ) => {
		insertBlocks( parse( data ) );
		closeModal();
	};

	const importPattern = ( id ) => {
		var formData = new FormData();
		formData.append( 'action', 'grigora_get_pattern_data' );
		formData.append( 'id', id );
		fetch( grigora_kit_blocks_params.ajax_url, {
			method: 'POST',
			body: formData,
		} )
			.then( ( response ) => response.json() )
			.then( ( data ) => {
				if ( data.success && data.data.success ) {
					insertPatternInBlockEditor( data.data.content );
					cancelImportAnimations();
					setImporting( false );
				} else {
					cancelImportAnimations();
					setImporting( false );
				}
			} );
		return;
	};

	const patterns_filtered = Object.values( patterns ).filter( function (
		el
	) {
		if ( category === 'All' ) {
			return true;
		} else {
			return el.tags.includes( category );
		}
	} );

	return (
		<>
			<div className="header-g">
				<div className="left">
					<img src={ grigora_kit_blocks_params.svg_icon }></img>
					{ __( 'Grigora Patterns', 'grigora-kit' ) }
				</div>
				<div className="center">
					{ __( 'Choose a Pattern', 'grigora-kit' ) }
				</div>
				<div className="right">
					<div
						className="close"
						onClick={ ( e ) => {
							closeModal();
							e.stopPropagation();
						} }
					>
						<SVG
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-x"
							viewBox="0 0 16 16"
						>
							<Path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
						</SVG>
					</div>
				</div>
			</div>
			<div className="body">
				<div className="sidebar">
					<div className="title">
						{ __( 'Categories', 'grigora-kit' ) }
					</div>
					<div className="categories">
						{ categories.map( ( e ) => (
							<div
								className={ `select-category ${
									e.name === category ? `active` : ``
								}` }
								onClick={ () => {
									setCategory( e.name );
								} }
							>
								<div className="name">{ e.name }</div>
								<div className="count">{ e.count }</div>
							</div>
						) ) }
					</div>
				</div>
				{ loading && (
					<ResponsiveMasonry
						columnsCountBreakPoints={ { 350: 1, 750: 2, 900: 3 } }
						className="patterns-parent"
					>
						<Masonry className="patterns" gutter="15px">
							{ [ ...Array( 30 ) ].map( ( e ) => (
								<div className={ `select-pattern loading` }>
									<div className="thumbnail"></div>
								</div>
							) ) }
						</Masonry>
					</ResponsiveMasonry>
				) }
				{ ! loading && (
					<ResponsiveMasonry
						columnsCountBreakPoints={ { 350: 1, 750: 2, 900: 3 } }
						className="patterns-parent"
					>
						<Masonry className="patterns" gutter="15px">
							{ patterns_filtered.map( ( e ) => (
								<div className={ `select-pattern` }>
									<div className="thumbnail">
										<img src={ e.thumbnail } />
									</div>
									<div className="overlay">
										<div
											className="import"
											onClick={ ( element ) => {
												if ( ! importing ) {
													setImporting( true );
													element.target
														.closest(
															'.select-pattern'
														)
														.classList.add(
															'active'
														);
													importPattern( e.id );
												}
											} }
										>
											{ __( 'Import', 'grigora-kit' ) }
										</div>
										<a
											className="preview"
											href={ e.url }
											target="_blank"
										>
											{ __( 'Preview', 'grigora-kit' ) }
										</a>
										<span class="loader"></span>
									</div>
								</div>
							) ) }
						</Masonry>
					</ResponsiveMasonry>
				) }
			</div>
		</>
	);
}

export default compose( [
	withDispatch( ( dispatch ) => {
		const { insertBlocks, removeBlock } = dispatch( 'core/block-editor' );

		return {
			insertBlocks,
			removeBlock,
		};
	} ),
] )( GrigoraPatterns );

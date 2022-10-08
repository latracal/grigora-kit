import classnames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { __, _x } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentControl,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	TabPanel as WPTabPanel,
	PanelBody,
	ToggleControl,
	__experimentalHStack as HStack,
	__experimentalNumberControl as NumberControl,
	Notice,
	__experimentalSpacer as Spacer,
	Spinner,
} from '@wordpress/components';
import {
	alignLeft,
	alignRight,
	alignCenter,
	alignJustify,
	link,
	linkOff,
	desktop,
} from '@wordpress/icons';
import { useState, useRef, useEffect, useMemo } from '@wordpress/element';
import { displayShortcut } from '@wordpress/keycodes';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

import parse from 'html-react-parser';

import generateId from '@helpers/generateId';
import uniqueIDs from '@helpers/uniqueID';
import IconPicker from '@components/icon-picker';
import GrigoraColorInput from '@components/color-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraBoxInput from '@components/box-input';
import SVGIcons from '@constants/icons.json';
import classNames from 'classnames';
import isEmpty from '@helpers/objEmpty';

import InspectorTabs from '@components/inspector-tabs';
import GrigoraSelectInput from '@components/select-input';
import GrigoraNumberInput from '@components/number-input';
import GrigoraTextInput from '@components/text-input';
import GrigoraMultiSelectInput from '@components/multiselect-input';
import { useAuthors, usePosts, usePostTypes, useTaxonomiesInfo } from '@helpers/postUtils';
import GrigoraRangeInput from '@components/range-input';
import GrigoraDateTimeInput from '@components/datetime-input';
import GrigoraColorGradientInput from '@components/colorgradient-input';
import GrigoraBorderRadiusInput from '@components/borderradius-input';
import GrigoraCSSFilterInput from '@components/cssfilter-input';
import Googlefontloader from '@components/googlefontloader';
import GrigoraTypographyInput from '@components/typography-input';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

const HOVER_ANIMATIONS = [
	{
		label: __( 'No Animation', 'grigora-kit' ),
		value: 'none',
	},
	{
		label: __( 'Zoom In', 'grigora-kit' ),
		value: 'zoomIn',
	},
	{
		label: __( 'Zoom Out', 'grigora-kit' ),
		value: 'zoomOut',
	},
	{
		label: __( 'Opacity', 'grigora-kit' ),
		value: 'opacity',
	},
	{
		label: __( 'Rotate Left', 'grigora-kit' ),
		value: 'rotateLeft',
	},
	{
		label: __( 'Rotate Right', 'grigora-kit' ),
		value: 'rotateRight',
	},
	{
		label: __( 'Slide Left', 'grigora-kit' ),
		value: 'slideLeft',
	},
	{
		label: __( 'Slide Right', 'grigora-kit' ),
		value: 'slideRight',
	},
];

export default function Edit( props ) {
	const { attributes, setAttributes, isSelected } = props;

	const {
		id,
		post_type,
		offset,
		order,
		orderby,
		author,
		excludeAuthor,
		taxonomy,
		excludeTaxonomy,
		selectedTaxOption,
		selectedExcludeTaxOption,
		search,
		includePost,
		excludePost,
		afterDate,
		beforeDate,
		align,
		gap,
		newTab,
		excerptToggle,
		categoryToggle,
		authorToggle,
		dateToggle,
		ContentTag,
		contHeight,
		imageBorderRadius,
		hoverAnimation,
		transitionColorTime,
		effectNShadowHO,
		effectNShadowVO,
		effectNShadowBlur,
		effectNShadowSpread,
		effectNShadowColor,
		effectHShadowHO,
		effectHShadowVO,
		effectHShadowBlur,
		effectHShadowSpread,
		effectHShadowColor,
		cssHFilters,
		cssFilters,
		overlayColor,
		overlayGradient,
		overlayOpacity,
		TitleTag,
		layoutPadding,
		maxLength,
		contentMaxLength,
		titleTextColor,
		titleTextHColor,
		bgColor,
		bgHColor,
		titleBTypoSize,
		titleBTypoDecoration,
		titleBTypoFontFamily,
		titleBTypoLetterSpacing,
		titleBTypoLineHeight,
		titleBTypoStyle,
		titleBTypoTransform,
		titleBTypoWeight,
		titleBTypoWordSpacing,
		titleSTypoSize,
		titleSTypoDecoration,
		titleSTypoFontFamily,
		titleSTypoLetterSpacing,
		titleSTypoLineHeight,
		titleSTypoStyle,
		titleSTypoTransform,
		titleSTypoWeight,
		titleSTypoWordSpacing,
		contentTypoSize,
		contentTypoDecoration,
		contentTypoFontFamily,
		contentTypoLetterSpacing,
		contentTypoLineHeight,
		contentTypoStyle,
		contentTypoTransform,
		contentTypoWeight,
		contentTypoWordSpacing,
		elementsList,
		categoryLink,
		catBorderRadius,
		categoryTextColor,
		categoryTextHColor,
		bgCatColor,
		bgHCatColor,
		layoutCatPadding,
	} = attributes;

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'post-grid-2' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'post-grid-2' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

	const [ query, setQuery ] = useState( { post_type: 'post', per_page: 5 } );

	useEffect( () => {
		let tempQuery = {
			post_type: post_type,
			per_page: 5,
			offset: offset,
			order: order,
			search: search,
			orderby: orderby,
			author: author.map( ( item ) => {
				return item.value;
			} ),
			author_exclude: excludeAuthor.map( ( item ) => {
				return item.value;
			} ),
			categories: { ...selectedTaxOption.category },
			tags: { ...selectedTaxOption.tag },
			categories_exclude: { ...selectedExcludeTaxOption.category },
			tags_exclude: { ...selectedExcludeTaxOption.tag },
			exclude: excludePost.map( ( item ) => {
				return item.value;
			} ),
		};
		if ( includePost.length !== 0 ) {
			tempQuery = {
				...tempQuery,
				include: includePost.map( ( item ) => {
					return item.value;
				} ),
			};
		}
		if ( afterDate !== '' ) {
			tempQuery = { ...tempQuery, after: afterDate };
		}
		if ( beforeDate !== '' ) {
			tempQuery = { ...tempQuery, before: beforeDate };
		}
		setQuery( tempQuery );
	}, [
		post_type,
		offset,
		order,
		orderby,
		search,
		author,
		excludeAuthor,
		taxonomy,
		excludeTaxonomy,
		includePost,
		excludePost,
		afterDate,
		beforeDate,
	] );

	const normalizedQuery = useMemo( () => {
		return query;
	}, [ JSON.stringify( query ) ] );

	const { data, isResolvingData, hasResolvedData } = useSelect(
		( select ) => {
			const { getEntityRecords, isResolving, hasFinishedResolution } =
				select( coreStore );

			const queryParams = [
				'postType',
				query.post_type || 'post',
				normalizedQuery,
			];

			return {
				data: getEntityRecords( ...queryParams ),
				isResolvingData: isResolving( 'getEntityRecords', queryParams ),
				hasResolvedData: hasFinishedResolution(
					'getEntityRecords',
					queryParams
				),
			};
		},
		[ JSON.stringify( normalizedQuery ) ]
	);

	// postTypes Options
	const { postTypesTaxonomiesMap, postTypesSelectOptions } = usePostTypes();

	// author Options
	const authorsInfo = useAuthors();
	let authorOptions = authorsInfo !== null ? authorsInfo.mapById : [];

	// taxonomy Options
	let taxonomiesInfo = useTaxonomiesInfo( post_type );

	const [ taxonomiesOptions, setTaxonomiesOptions ] = useState( [] );
	useEffect( () => {
		if ( typeof taxonomiesInfo !== 'undefined' ) {
			let temp = [];
			for ( let i = 0; i < taxonomiesInfo.length; i++ ) {
				let slug = taxonomiesInfo[ i ].slug;
				let entities = taxonomiesInfo[ i ].terms.entities;
				if ( entities !== null ) {
					for ( let j = 0; j < entities.length; j++ ) {
						let label =
							slug === 'post_tag'
								? 'Tag: ' + entities[ j ].name
								: 'Category: ' + entities[ j ].name;
						temp.push( {
							label: label,
							value: entities[ j ].id,
							tax_object: {
								taxonomy: slug,
								terms: entities[ j ].id,
							},
						} );
					}
				}
			}
			setTaxonomiesOptions( temp );
		}
	}, [ taxonomiesInfo ] );

	// postOptions
	let postOptions = usePosts( post_type );

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-post-grid-2': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

	const authorIcon =
		'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">\n  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>\n  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>\n</svg>';

	const calendarIcon =
		'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">\n  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>\n</svg>';

	const dateConverter = ( dateStr ) => {
		return dateStr.split( 'T' )[ 0 ];
	};
	const textTrimmer = ( title, len ) => {
		let temp = title.split( ' ' );
		let titleLength = temp.length;
		temp.splice( len );
		let res = temp.join( ' ' );
		if ( len < titleLength ) res = res + String.fromCodePoint( 0x2026 );
		return res;
	};
	function stripRenderedExcerpt( renderedExcerpt ) {
		if ( ! renderedExcerpt ) return '';
		const document = new window.DOMParser().parseFromString(
			renderedExcerpt,
			'text/html'
		);
		return document.body.textContent || document.body.innerText || '';
	}
	const authorFromId = ( id ) => {
		if ( authorOptions.length !== 0 ) {
			let authorName = Object.entries( authorOptions ).filter(
				( item ) => item[ 1 ].id === id
			);
			return authorName[ 0 ][ 1 ].name;
		}
	};
	const categoryFromId = ( id ) => {
		if ( taxonomiesOptions.length !== 0 ) {
			let categoryName = taxonomiesOptions.filter(
				( item ) => item.value === id
			);
			if ( categoryName.length !== 0 ) {
				let categoryArray = categoryName[ 0 ].label.split( ' ' );
				categoryArray.shift();
				return categoryArray.join( ' ' );
			} else return '';
		} else return '';
	};
	const SortableItem = sortableElement( ( { value } ) => (
		<li className="element-container">{ value }</li>
	) );
	const SortableContainer = sortableContainer( ( { children } ) => {
		return <ul>{ children }</ul>;
	} );
	const onSortEnd = ( { oldIndex, newIndex } ) => {
		setAttributes( {
			elementsList: {
				elements: arrayMoveImmutable(
					elementsList.elements,
					oldIndex,
					newIndex
				),
			},
		} );
	};
	const categoryLinkFromID = (id) => {
		if(taxonomiesInfo.length !== 0 && typeof taxonomiesInfo !== 'undefined') {
			let catArray = taxonomiesInfo.filter( catItem => catItem.slug === 'category')
			let catEntities = catArray[0].terms.entities
			let catLink = catEntities ? catEntities.filter(catItem => catItem.id === id) : []
			if(catLink.length !== 0) return catLink[0].link
			else return ''
		}
	}

	function categoryEffectNormalRender() {
		return (
			<>
				<GrigoraColorInput
					value={ categoryTextColor }
					onChange={ ( categoryTextColor ) =>
						setAttributes( { categoryTextColor } )
					}
					resetValue={ 'white' }
					label={ __( 'Category', 'grigora-kit' ) }
				/>
			</>
		);
	}
	function categoryEffectHoverRender() {
		return (
			<div className={ `grigora-hover-effects-panel` }>
				<GrigoraColorInput
					value={ categoryTextHColor }
					onChange={ ( categoryTextHColor ) =>
						setAttributes( { categoryTextHColor } )
					}
					resetValue={ '' }
					label={ __( 'Category', 'grigora-kit' ) }
				/>
				<GrigoraRangeInput
					label={ __( 'Transition Time', 'grigora-kit' ) }
					max={ 5 }
					min={ 0.1 }
					unit={ 'sec' }
					step={ 0.1 }
					setValue={ ( transitionColorTime ) =>
						setAttributes( { transitionColorTime } )
					}
					value={ transitionColorTime }
					resetValue={ 0.2 }
				/>
			</div>
		);
	}
	function bgCatEffectNormalRender() {
		return (
			<>
				<GrigoraColorInput
					value={ bgCatColor }
					onChange={ ( bgCatColor ) => setAttributes( { bgCatColor } ) }
					resetValue={ '' }
					label={ __( 'Category Background', 'grigora-kit' ) }
				/>
			</>
		);
	}
	function bgCatEffectHoverRender() {
		return (
			<div className={ `grigora-hover-effects-panel` }>
				<GrigoraColorInput
					value={ bgHCatColor }
					onChange={ ( bgHCatColor ) => setAttributes( { bgHCatColor } ) }
					resetValue={ '' }
					label={ __( 'Category Background', 'grigora-kit' ) }
				/>
				<GrigoraRangeInput
					label={ __( 'Transition Time', 'grigora-kit' ) }
					max={ 5 }
					min={ 0.1 }
					unit={ 'sec' }
					step={ 0.1 }
					setValue={ ( transitionColorTime ) =>
						setAttributes( { transitionColorTime } )
					}
					value={ transitionColorTime }
					resetValue={ 0.2 }
				/>
			</div>
		);
	}

	function overlayRender() {
		return (
			<>
				<GrigoraColorGradientInput
					color={ overlayColor }
					gradient={ overlayGradient }
					onColorChange={ ( overlayColor ) =>
						setAttributes( { overlayColor } )
					}
					onGradientChange={ ( overlayGradient ) =>
						setAttributes( { overlayGradient } )
					}
					label={ __( 'Color', 'grigora-kit' ) }
				/>
				<GrigoraRangeInput
					value={ overlayOpacity }
					min={ 0 }
					max={ 100 }
					unit={ ' ' }
					setValue={ ( overlayOpacity ) => {
						setAttributes( { overlayOpacity } );
					} }
					label={ __( 'Opacity', 'grigora-kit' ) }
					resetValue={ 40 }
				/>
			</>
		);
	}
	function cssFiltersNormalRender() {
		return (
			<>
				<br />
				<GrigoraCSSFilterInput
					value={ cssFilters }
					setValue={ ( cssFilters ) =>
						setAttributes( { cssFilters } )
					}
					label={ __( 'CSS Filters', 'grigora-kit' ) }
					reset={ {} }
				/>
			</>
		);
	}
	function cssFiltersHoverRender() {
		return (
			<>
				<br />
				<GrigoraCSSFilterInput
					value={ cssHFilters }
					setValue={ ( cssHFilters ) =>
						setAttributes( { cssHFilters } )
					}
					label={ __( 'CSS Filters', 'grigora-kit' ) }
					reset={ {} }
				/>
			</>
		);
	}
	function titleEffectNormalRender() {
		return (
			<>
				<GrigoraColorInput
					value={ titleTextColor }
					onChange={ ( titleTextColor ) =>
						setAttributes( { titleTextColor } )
					}
					resetValue={ 'white' }
					label={ __( 'Title', 'grigora-kit' ) }
				/>
			</>
		);
	}
	function titleEffectHoverRender() {
		return (
			<div className={ `grigora-hover-effects-panel` }>
				<GrigoraColorInput
					value={ titleTextHColor }
					onChange={ ( titleTextHColor ) =>
						setAttributes( { titleTextHColor } )
					}
					resetValue={ '' }
					label={ __( 'Title', 'grigora-kit' ) }
				/>
				<GrigoraRangeInput
					label={ __( 'Transition Time', 'grigora-kit' ) }
					max={ 5 }
					min={ 0.1 }
					unit={ 'sec' }
					step={ 0.1 }
					setValue={ ( transitionColorTime ) =>
						setAttributes( { transitionColorTime } )
					}
					value={ transitionColorTime }
					resetValue={ 0.2 }
				/>
			</div>
		);
	}
	function bgEffectNormalRender() {
		return (
			<>
				<GrigoraColorInput
					value={ bgColor }
					onChange={ ( bgColor ) => setAttributes( { bgColor } ) }
					resetValue={ '' }
					label={ __( 'Title Background', 'grigora-kit' ) }
				/>
			</>
		);
	}
	function bgEffectHoverRender() {
		return (
			<div className={ `grigora-hover-effects-panel` }>
				<GrigoraColorInput
					value={ bgHColor }
					onChange={ ( bgHColor ) => setAttributes( { bgHColor } ) }
					resetValue={ '' }
					label={ __( 'Title Background', 'grigora-kit' ) }
				/>
				<GrigoraRangeInput
					label={ __( 'Transition Time', 'grigora-kit' ) }
					max={ 5 }
					min={ 0.1 }
					unit={ 'sec' }
					step={ 0.1 }
					setValue={ ( transitionColorTime ) =>
						setAttributes( { transitionColorTime } )
					}
					value={ transitionColorTime }
					resetValue={ 0.2 }
				/>
			</div>
		);
	}

	function generalSettings() {
		return (
			<>
				<PanelBody>
					<GrigoraSelectInput
						label={ __( 'Post Type', 'grigora-kit' ) }
						labelPosition="side"
						onChange={ ( post_type ) =>
							setAttributes( { post_type } )
						}
						value={ post_type }
						options={ postTypesSelectOptions }
						resetValue={ 'post' }
					/>
					<GrigoraSelectInput
						label={ __( 'Order', 'grigora-kit' ) }
						labelPosition="side"
						onChange={ ( order ) => setAttributes( { order } ) }
						value={ order }
						options={ [
							{ label: 'Ascending', value: 'asc' },
							{ label: 'Descending', value: 'desc' },
						] }
						resetValue={ 'asc' }
					/>
					<GrigoraSelectInput
						label={ __( 'Order By', 'grigora-kit' ) }
						labelPosition="side"
						onChange={ ( orderby ) => setAttributes( { orderby } ) }
						value={ orderby }
						options={ [
							{ label: 'Id', value: 'id' },
							{ label: 'Title', value: 'title' },
							{ label: 'Slug', value: 'slug' },
							{ label: 'Author', value: 'author' },
							{ label: 'Date', value: 'date' },
							{ label: 'Last modified date', value: 'modified' },
							{ label: 'Parent id', value: 'parent' },
							{ label: 'Menu order', value: 'menu_order' },
						] }
						resetValue={ 'id' }
					/>
					<GrigoraNumberInput
						label={ __( 'Offset', 'grigora-kit' ) }
						onChange={ ( offset ) => setAttributes( { offset } ) }
						value={ offset }
						resetValue={ 0 }
					/>
					<GrigoraTextInput
						label={ __( 'Search', 'grigora-kit' ) }
						onChange={ ( search ) => setAttributes( { search } ) }
						value={ search }
						resetValue={ '' }
					/>
					<GrigoraMultiSelectInput
						label={ __( 'Author', 'grigora-kit' ) }
						onChange={ ( author ) => setAttributes( { author } ) }
						value={ author }
						options={ Object.entries( authorOptions ).map(
							( obj ) => {
								return {
									label: obj[ 1 ].name,
									value: obj[ 1 ].id,
								};
							}
						) }
					/>
					<GrigoraMultiSelectInput
						label={ __( 'Exclude Author', 'grigora-kit' ) }
						onChange={ ( excludeAuthor ) =>
							setAttributes( { excludeAuthor } )
						}
						value={ excludeAuthor }
						options={ Object.entries( authorOptions ).map(
							( obj ) => {
								return {
									label: obj[ 1 ].name,
									value: obj[ 1 ].id,
								};
							}
						) }
					/>
					<GrigoraMultiSelectInput
						label={ __( 'Taxonomies', 'grigora-kit' ) }
						onChange={ ( e ) => {
							setAttributes( { taxonomy: e } );
							let tempTax = {
								category: { terms: [], include_children: true },
								tag: { terms: [] },
							};
							e.forEach( ( item ) => {
								if ( item.tax_object.taxonomy === 'category' )
									tempTax.category.terms.push( item.value );
								else tempTax.tag.terms.push( item.value );
							} );
							setAttributes( { selectedTaxOption: tempTax } );
						} }
						value={ taxonomy }
						options={ taxonomiesOptions }
					/>
					<GrigoraMultiSelectInput
						label={ __( 'Exclude Taxonomies', 'grigora-kit' ) }
						onChange={ ( e ) => {
							setAttributes( { excludeTaxonomy: e } );
							let tempTaxEx = {
								category: { terms: [], include_children: true },
								tag: { terms: [] },
							};
							e.forEach( ( item ) => {
								if ( item.tax_object.taxonomy === 'category' )
									tempTaxEx.category.terms.push( item.value );
								else tempTaxEx.tag.terms.push( item.value );
							} );
							setAttributes( {
								selectedExcludeTaxOption: tempTaxEx,
							} );
						} }
						value={ excludeTaxonomy }
						options={ taxonomiesOptions }
					/>
					<GrigoraMultiSelectInput
						label={ __( 'Include Post', 'grigora-kit' ) }
						onChange={ ( includePost ) =>
							setAttributes( { includePost } )
						}
						value={ includePost }
						options={ postOptions.records.map( ( item ) => {
							return {
								label: item.title.rendered,
								value: item.id,
							};
						} ) }
					/>
					<GrigoraMultiSelectInput
						label={ __( 'Exclude Post', 'grigora-kit' ) }
						onChange={ ( excludePost ) =>
							setAttributes( { excludePost } )
						}
						value={ excludePost }
						options={ postOptions.records.map( ( item ) => {
							return {
								label: item.title.rendered,
								value: item.id,
							};
						} ) }
					/>
					<br />
					<GrigoraDateTimeInput
						label={ __( 'Date After', 'grigora-kit' ) }
						currentDate={ afterDate }
						onChange={ ( afterDate ) => {
							setAttributes( { afterDate } );
						} }
					/>
					<br />
					<GrigoraDateTimeInput
						label={ __( 'Date Before', 'grigora-kit' ) }
						currentDate={ beforeDate }
						onChange={ ( beforeDate ) => {
							setAttributes( { beforeDate } );
						} }
					/>
				</PanelBody>
			</>
		);
	}
	function stylesSettings() {
		return (
			<>
				<PanelBody
					title={ __( 'Container', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraSelectInput
						label={ __( 'Alignment', 'grigora-kit' ) }
						labelPosition="side"
						onChange={ ( align ) => setAttributes( { align } ) }
						value={ align }
						options={ [
							{ label: 'Left', value: 'start' },
							{ label: 'Center', value: 'center' },
							{ label: 'Right', value: 'end' },
						] }
						resetValue={ 'start' }
					/>
					<GrigoraSelectInput
						label={ __( 'Content Tag', 'grigora-kit' ) }
						labelPosition="side"
						onChange={ ( ContentTag ) =>
							setAttributes( { ContentTag } )
						}
						value={ ContentTag }
						options={ [
							{ label: 'article', value: 'article' },
							{ label: 'section', value: 'section' },
							{ label: 'div', value: 'div' },
						] }
						resetValue={ 'div' }
					/>
					<ToggleControl
						label={ __( 'Open Links in new Tab', 'grigora-kit' ) }
						checked={ !! newTab }
						onChange={ () =>
							setAttributes( {
								newTab: ! newTab,
							} )
						}
					/>
					<ToggleControl
						label={ __( 'Display Category', 'grigora-kit' ) }
						checked={ !! categoryToggle }
						onChange={ () =>
							setAttributes( {
								categoryToggle: ! categoryToggle,
							} )
						}
					/>
					<ToggleControl
						label={ __( 'Category link to category page', 'grigora-kit' ) }
						checked={ !! categoryLink }
						onChange={ () =>
							setAttributes( {
								categoryLink: ! categoryLink,
							} )
						}
					/>
					<ToggleControl
						label={ __( 'Display Excerpt', 'grigora-kit' ) }
						checked={ !! excerptToggle }
						onChange={ () =>
							setAttributes( {
								excerptToggle: ! excerptToggle,
							} )
						}
					/>
					<ToggleControl
						label={ __( 'Display Author', 'grigora-kit' ) }
						checked={ !! authorToggle }
						onChange={ () =>
							setAttributes( {
								authorToggle: ! authorToggle,
							} )
						}
					/>
					<ToggleControl
						label={ __( 'Display Date', 'grigora-kit' ) }
						checked={ !! dateToggle }
						onChange={ () =>
							setAttributes( {
								dateToggle: ! dateToggle,
							} )
						}
					/>
					<GrigoraRangeInput
						value={ gap }
						setValue={ ( gap ) => {
							setAttributes( { gap } );
						} }
						label={ `Gap` }
						resetValue={ 5 }
					/>
					<GrigoraRangeInput
						value={ contHeight }
						setValue={ ( contHeight ) => {
							setAttributes( { contHeight } );
						} }
						max="700"
						label={ `Height of the container` }
						resetValue={ 500 }
					/>
					<GrigoraBorderRadiusInput
						label={ __( 'Border Radius', 'grigora-kit' ) }
						onChange={ ( imageBorderRadius ) => {
							if (
								typeof imageBorderRadius === 'string' ||
								imageBorderRadius instanceof String
							) {
								setAttributes( {
									imageBorderRadius: {
										topLeft: imageBorderRadius,
										topRight: imageBorderRadius,
										bottomLeft: imageBorderRadius,
										bottomRight: imageBorderRadius,
									},
								} );
							} else {
								setAttributes( {
									imageBorderRadius,
								} );
							}
						} }
						values={ imageBorderRadius }
						resetValue={ {
							topLeft: '0px',
							topRight: '0px',
							bottomLeft: '0px',
							bottomRight: '0px',
						} }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Title', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraSelectInput
						label={ __( 'Title Tag', 'grigora-kit' ) }
						labelPosition="side"
						onChange={ ( TitleTag ) =>
							setAttributes( { TitleTag } )
						}
						value={ TitleTag }
						options={ [
							'h1',
							'h2',
							'h3',
							'h4',
							'h5',
							'h6',
							'p',
							'span',
							'div',
						].map( function ( item ) {
							return {
								label: item,
								value: item,
							};
						} ) }
						resetValue={ 'h3' }
					/>
					<GrigoraBoxInput
						label={ __( 'Padding', 'grigora-kit' ) }
						onChange={ ( layoutPadding ) =>
							setAttributes( { layoutPadding } )
						}
						values={ layoutPadding }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '0px',
							right: '0px',
						} }
					/>
					<GrigoraRangeInput
						value={ maxLength }
						min={ 1 }
						max={ 40 }
						unit={ ' ' }
						setValue={ ( maxLength ) => {
							setAttributes( { maxLength } );
						} }
						label={ `Title Max Length` }
						resetValue={ 10 }
					/>
					<GrigoraRangeInput
						value={ contentMaxLength }
						min={ 1 }
						max={ 20 }
						unit={ ' ' }
						setValue={ ( contentMaxLength ) => {
							setAttributes( { contentMaxLength } );
						} }
						label={ `Content Max Length` }
						resetValue={ 10 }
					/>
					<br />
					<GrigoraTypographyInput
						label={ __( 'Typography (Title Big)', 'grigora-kit' ) }
						size={ titleBTypoSize }
						sizeChange={ ( titleBTypoSize ) => {
							setAttributes( { titleBTypoSize } );
						} }
						sizeReset={ 24 }
						lineHeight={ titleBTypoLineHeight }
						lineHeightChange={ ( titleBTypoLineHeight ) => {
							setAttributes( {
								titleBTypoLineHeight:
									titleBTypoLineHeight.toString(),
							} );
						} }
						letterSpacing={ titleBTypoLetterSpacing }
						letterSpacingChange={ ( titleBTypoLetterSpacing ) => {
							setAttributes( {
								titleBTypoLetterSpacing:
									titleBTypoLetterSpacing.toString(),
							} );
						} }
						wordSpacing={ titleBTypoWordSpacing }
						wordSpacingChange={ ( titleBTypoWordSpacing ) => {
							setAttributes( {
								titleBTypoWordSpacing:
									titleBTypoWordSpacing.toString(),
							} );
						} }
						transform={ titleBTypoTransform }
						transformChange={ ( titleBTypoTransform ) =>
							setAttributes( { titleBTypoTransform } )
						}
						style={ titleBTypoStyle }
						styleChange={ ( titleBTypoStyle ) =>
							setAttributes( { titleBTypoStyle } )
						}
						decoration={ titleBTypoDecoration }
						decorationChange={ ( titleBTypoDecoration ) =>
							setAttributes( { titleBTypoDecoration } )
						}
						weight={ titleBTypoWeight }
						weightChange={ ( titleBTypoWeight ) =>
							setAttributes( { titleBTypoWeight } )
						}
						hasFontFamily = 'true'
						fontFamilyChange={ ( titleBTypoFontFamily ) =>
							setAttributes( { titleBTypoFontFamily } )
						}
						fontFamily={ titleBTypoFontFamily }
					/>
					<br />
					<GrigoraTypographyInput
						label={ __(
							'Typography (Title Small)',
							'grigora-kit'
						) }
						size={ titleSTypoSize }
						sizeChange={ ( titleSTypoSize ) => {
							setAttributes( { titleSTypoSize } );
						} }
						sizeReset={ 24 }
						lineHeight={ titleSTypoLineHeight }
						lineHeightChange={ ( titleSTypoLineHeight ) => {
							setAttributes( {
								titleSTypoLineHeight:
									titleSTypoLineHeight.toString(),
							} );
						} }
						letterSpacing={ titleSTypoLetterSpacing }
						letterSpacingChange={ ( titleSTypoLetterSpacing ) => {
							setAttributes( {
								titleSTypoLetterSpacing:
									titleSTypoLetterSpacing.toString(),
							} );
						} }
						wordSpacing={ titleSTypoWordSpacing }
						wordSpacingChange={ ( titleSTypoWordSpacing ) => {
							setAttributes( {
								titleSTypoWordSpacing:
									titleSTypoWordSpacing.toString(),
							} );
						} }
						transform={ titleSTypoTransform }
						transformChange={ ( titleSTypoTransform ) =>
							setAttributes( { titleSTypoTransform } )
						}
						style={ titleSTypoStyle }
						styleChange={ ( titleSTypoStyle ) =>
							setAttributes( { titleSTypoStyle } )
						}
						decoration={ titleSTypoDecoration }
						decorationChange={ ( titleSTypoDecoration ) =>
							setAttributes( { titleSTypoDecoration } )
						}
						weight={ titleSTypoWeight }
						weightChange={ ( titleSTypoWeight ) =>
							setAttributes( { titleSTypoWeight } )
						}
						hasFontFamily = 'true'
						fontFamilyChange={ ( titleSTypoFontFamily ) =>
							setAttributes( { titleSTypoFontFamily } )
						}
						fontFamily={ titleSTypoFontFamily }
					/>
					<br />
					<GrigoraTypographyInput
						label={ __( 'Typography (Content)', 'grigora-kit' ) }
						size={ contentTypoSize }
						sizeChange={ ( contentTypoSize ) => {
							setAttributes( { contentTypoSize } );
						} }
						sizeReset={ 16 }
						lineHeight={ contentTypoLineHeight }
						lineHeightChange={ ( contentTypoLineHeight ) => {
							setAttributes( {
								contentTypoLineHeight:
									contentTypoLineHeight.toString(),
							} );
						} }
						letterSpacing={ contentTypoLetterSpacing }
						letterSpacingChange={ ( contentTypoLetterSpacing ) => {
							setAttributes( {
								contentTypoLetterSpacing:
									contentTypoLetterSpacing.toString(),
							} );
						} }
						wordSpacing={ contentTypoWordSpacing }
						wordSpacingChange={ ( contentTypoWordSpacing ) => {
							setAttributes( {
								contentTypoWordSpacing:
									contentTypoWordSpacing.toString(),
							} );
						} }
						transform={ contentTypoTransform }
						transformChange={ ( contentTypoTransform ) =>
							setAttributes( { contentTypoTransform } )
						}
						style={ contentTypoStyle }
						styleChange={ ( contentTypoStyle ) =>
							setAttributes( { contentTypoStyle } )
						}
						decoration={ contentTypoDecoration }
						decorationChange={ ( contentTypoDecoration ) =>
							setAttributes( { contentTypoDecoration } )
						}
						weight={ contentTypoWeight }
						weightChange={ ( contentTypoWeight ) =>
							setAttributes( { contentTypoWeight } )
						}
						hasFontFamily = 'true'
						fontFamilyChange={ ( contentTypoFontFamily ) =>
							setAttributes( { contentTypoFontFamily } )
						}
						fontFamily={ contentTypoFontFamily }
					/>
					<br />
					<PanelBody
						title={ __( 'Color', 'grigora-kit' ) }
						initialOpen={ false }
					>
						<Tabs className="grigora-normal-hover-tabs-container">
							<TabList className="tabs-header">
								<Tab className="normal">
									{ __( 'Normal', 'grigora-kit' ) }
								</Tab>
								<Tab className="hover">
									{ __( 'Hover', 'grigora-kit' ) }
								</Tab>
							</TabList>
							<TabPanel>
								<>{ titleEffectNormalRender() }</>
							</TabPanel>
							<TabPanel>
								<>{ titleEffectHoverRender() }</>
							</TabPanel>
						</Tabs>
					</PanelBody>
					<PanelBody
						title={ __( 'Background Color', 'grigora-kit' ) }
						initialOpen={ false }
					>
						<Tabs className="grigora-normal-hover-tabs-container">
							<TabList className="tabs-header">
								<Tab className="normal">
									{ __( 'Normal', 'grigora-kit' ) }
								</Tab>
								<Tab className="hover">
									{ __( 'Hover', 'grigora-kit' ) }
								</Tab>
							</TabList>
							<TabPanel>
								<>{ bgEffectNormalRender() }</>
							</TabPanel>
							<TabPanel>
								<>{ bgEffectHoverRender() }</>
							</TabPanel>
						</Tabs>
					</PanelBody>
				</PanelBody>
				<PanelBody
					title={ __( 'Image', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<PanelBody
						title={ __( 'Hover Animation', 'grigora-kit' ) }
						initialOpen={ false }
					>
						<GrigoraSelectInput
							label={ __( ' ', 'grigora-kit' ) }
							labelPosition="side"
							onChange={ ( hoverAnimation ) =>
								setAttributes( { hoverAnimation } )
							}
							value={ hoverAnimation }
							options={ HOVER_ANIMATIONS }
							resetValue={ 'none' }
						/>
						<GrigoraRangeInput
							label={ __( 'Transition Time', 'grigora-kit' ) }
							max={ 5 }
							min={ 0.1 }
							unit={ 'sec' }
							step={ 0.1 }
							setValue={ ( transitionColorTime ) =>
								setAttributes( { transitionColorTime } )
							}
							value={ transitionColorTime }
							resetValue={ 0.2 }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'CSS Filters', 'grigora-kit' ) }
						initialOpen={ false }
					>
						<Tabs className="grigora-normal-hover-tabs-container">
							<TabList className="tabs-header">
								<Tab className="normal">
									{ __( 'Normal', 'grigora-kit' ) }
								</Tab>
								<Tab className="hover">
									{ __( 'Hover', 'grigora-kit' ) }
								</Tab>
							</TabList>
							<TabPanel>
								<>{ cssFiltersNormalRender() }</>
							</TabPanel>
							<TabPanel>
								<>{ cssFiltersHoverRender() }</>
							</TabPanel>
						</Tabs>
					</PanelBody>
					<PanelBody
						title={ __( 'Box Shadow', 'grigora-kit' ) }
						initialOpen={ false }
					>
						<Tabs className="grigora-normal-hover-tabs-container">
							<TabList className="tabs-header">
								<Tab className="normal">
									{ __( 'Normal', 'grigora-kit' ) }
								</Tab>
								<Tab className="hover">
									{ __( 'Hover', 'grigora-kit' ) }
								</Tab>
							</TabList>
							<TabPanel>
								<>
									<GrigoraColorInput
										label={ __( 'Color', 'grigora-kit' ) }
										value={ effectNShadowColor }
										onChange={ ( effectNShadowColor ) =>
											setAttributes( {
												effectNShadowColor,
											} )
										}
										resetValue={ '#00000033' }
									/>
									<HStack spacing={ 2 }>
										<GrigoraUnitInput
											label={ __(
												'Horizontal',
												'grigora-kit'
											) }
											value={ effectNShadowHO }
											onChange={ ( effectNShadowHO ) =>
												setAttributes( {
													effectNShadowHO,
												} )
											}
											resetValue={ '1px' }
										/>
										<GrigoraUnitInput
											label={ __(
												'Vertical',
												'grigora-kit'
											) }
											value={ effectNShadowVO }
											onChange={ ( effectNShadowVO ) =>
												setAttributes( {
													effectNShadowVO,
												} )
											}
											resetValue={ '7px' }
										/>
									</HStack>
									<HStack spacing={ 2 }>
										<GrigoraUnitInput
											label={ __(
												'Blur',
												'grigora-kit'
											) }
											value={ effectNShadowBlur }
											onChange={ ( effectNShadowBlur ) =>
												setAttributes( {
													effectNShadowBlur,
												} )
											}
											resetValue={ '14px' }
										/>
										<GrigoraUnitInput
											label={ __(
												'Spread',
												'grigora-kit'
											) }
											value={ effectNShadowSpread }
											onChange={ (
												effectNShadowSpread
											) =>
												setAttributes( {
													effectNShadowSpread,
												} )
											}
											resetValue={ '-5px' }
										/>
									</HStack>
								</>
							</TabPanel>
							<TabPanel>
								<>
									<GrigoraColorInput
										label={ __( 'Color', 'grigora-kit' ) }
										value={ effectHShadowColor }
										onChange={ ( effectHShadowColor ) =>
											setAttributes( {
												effectHShadowColor,
											} )
										}
										resetValue={ '#000' }
									/>
									<HStack spacing={ 2 }>
										<GrigoraUnitInput
											label={ __(
												'Horizontal',
												'grigora-kit'
											) }
											value={ effectHShadowHO }
											onChange={ ( effectHShadowHO ) =>
												setAttributes( {
													effectHShadowHO,
												} )
											}
											resetValue={ '' }
										/>
										<GrigoraUnitInput
											label={ __(
												'Vertical',
												'grigora-kit'
											) }
											value={ effectHShadowVO }
											onChange={ ( effectHShadowVO ) =>
												setAttributes( {
													effectHShadowVO,
												} )
											}
											resetValue={ '' }
										/>
									</HStack>
									<HStack spacing={ 2 }>
										<GrigoraUnitInput
											label={ __(
												'Blur',
												'grigora-kit'
											) }
											value={ effectHShadowBlur }
											onChange={ ( effectHShadowBlur ) =>
												setAttributes( {
													effectHShadowBlur,
												} )
											}
											resetValue={ '' }
										/>
										<GrigoraUnitInput
											label={ __(
												'Spread',
												'grigora-kit'
											) }
											value={ effectHShadowSpread }
											onChange={ (
												effectHShadowSpread
											) =>
												setAttributes( {
													effectHShadowSpread,
												} )
											}
											resetValue={ '' }
										/>
									</HStack>
									<GrigoraRangeInput
										label={ __(
											'Transition Time',
											'grigora-kit'
										) }
										max={ 5 }
										min={ 0.1 }
										unit={ 'sec' }
										step={ 0.1 }
										setValue={ ( transitionColorTime ) =>
											setAttributes( {
												transitionColorTime,
											} )
										}
										value={ transitionColorTime }
										resetValue={ 0.2 }
									/>
								</>
							</TabPanel>
						</Tabs>
					</PanelBody>
					<PanelBody
						title={ __( 'Overlay', 'grigora-kit' ) }
						initialOpen={ false }
					>
						<Tabs className="grigora-normal-hover-tabs-container">
							<TabPanel>
								<>{ overlayRender() }</>
							</TabPanel>
						</Tabs>
					</PanelBody>
				</PanelBody>
				<PanelBody
					title={ __( 'Category', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraBoxInput
						label={ __( 'Padding', 'grigora-kit' ) }
						onChange={ ( layoutCatPadding ) =>
							setAttributes( { layoutCatPadding } )
						}
						values={ layoutCatPadding }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '0px',
							right: '0px',
						} }
					/>
					<GrigoraBorderRadiusInput
						label={ __( 'Border Radius', 'grigora-kit' ) }
						onChange={ ( catBorderRadius ) => {
							if (
								typeof catBorderRadius === 'string' ||
								catBorderRadius instanceof String
							) {
								setAttributes( {
									catBorderRadius: {
										topLeft: catBorderRadius,
										topRight: catBorderRadius,
										bottomLeft: catBorderRadius,
										bottomRight: catBorderRadius,
									},
								} );
							} else {
								setAttributes( {
									catBorderRadius,
								} );
							}
						} }
						values={ catBorderRadius }
						resetValue={ {
							topLeft: '0px',
							topRight: '0px',
							bottomLeft: '0px',
							bottomRight: '0px',
						} }
					/>
					<PanelBody
						title={ __( 'Color', 'grigora-kit' ) }
						initialOpen={ false }
					>
						<Tabs className="grigora-normal-hover-tabs-container">
							<TabList className="tabs-header">
								<Tab className="normal">
									{ __( 'Normal', 'grigora-kit' ) }
								</Tab>
								<Tab className="hover">
									{ __( 'Hover', 'grigora-kit' ) }
								</Tab>
							</TabList>
							<TabPanel>
								<>{ categoryEffectNormalRender() }</>
							</TabPanel>
							<TabPanel>
								<>{ categoryEffectHoverRender() }</>
							</TabPanel>
						</Tabs>
					</PanelBody>
					<PanelBody
						title={ __( 'Background Color', 'grigora-kit' ) }
						initialOpen={ false }
					>
						<Tabs className="grigora-normal-hover-tabs-container">
							<TabList className="tabs-header">
								<Tab className="normal">
									{ __( 'Normal', 'grigora-kit' ) }
								</Tab>
								<Tab className="hover">
									{ __( 'Hover', 'grigora-kit' ) }
								</Tab>
							</TabList>
							<TabPanel>
								<>{ bgCatEffectNormalRender() }</>
							</TabPanel>
							<TabPanel>
								<>{ bgCatEffectHoverRender() }</>
							</TabPanel>
						</Tabs>
					</PanelBody>
				</PanelBody>
			</>
		);
	}
	function advancedSettings() {
		const listValues = elementsList.elements;
		return (
			<PanelBody title={ __( 'Order Elements', 'grigora-kit' ) }>
				<SortableContainer onSortEnd={ onSortEnd }>
					{ listValues.map( ( value, index ) => (
						<SortableItem
							key={ `item-${ value }` }
							index={ index }
							value={ value }
						/>
					) ) }
				</SortableContainer>
			</PanelBody>
		);
	}

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<InspectorTabs className="grigora-tabs-container">
					<TabList className="tabs-header">
						<Tab className="general">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-pencil-fill"
								viewBox="0 0 16 16"
							>
								<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
							</svg>
							{ __( 'General', 'grigora-kit' ) }
						</Tab>
						<Tab className="styles">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-palette-fill"
								viewBox="0 0 16 16"
							>
								<path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07zM8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
							</svg>
							{ __( 'Styles', 'grigora-kit' ) }
						</Tab>
						<Tab className="advanced">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-gear-fill"
								viewBox="0 0 16 16"
							>
								<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
							</svg>
							{ __( 'Advanced', 'grigora-kit' ) }
						</Tab>
					</TabList>

					<TabPanel>{ generalSettings() }</TabPanel>
					<TabPanel>{ stylesSettings() }</TabPanel>
					<TabPanel>{ advancedSettings() }</TabPanel>
				</InspectorTabs>
			</InspectorControls>
			<style>
				{ `
					.block-id-${ id } .category-style {order: ${ elementsList.elements.indexOf(
					'Category'
				) };}
					.block-id-${ id } .title-container {order: ${ elementsList.elements.indexOf(
					'Title'
				) };}
					.block-id-${ id } .excerpt-style {order: ${ elementsList.elements.indexOf(
					'Excerpt'
				) };}
					.block-id-${ id } .meta-style {order: ${ elementsList.elements.indexOf(
					'Meta'
				) };}
					.block-id-${ id } .category-style {
						${ categoryTextColor ? `color: ${ categoryTextColor };` : `` }
						${ bgCatColor ? `background-color: ${ bgCatColor };` : `` }
						padding-left: ${ layoutCatPadding?.left };
						padding-right: ${ layoutCatPadding?.right };
						padding-top: ${ layoutCatPadding?.top };
						padding-bottom: ${ layoutCatPadding?.bottom };
						border-top-right-radius: ${ catBorderRadius?.topRight };
						border-top-left-radius: ${ catBorderRadius?.topLeft };
						border-bottom-right-radius: ${ catBorderRadius?.bottomRight };
						border-bottom-left-radius: ${ catBorderRadius?.bottomLeft };
					}
					${
						categoryTextHColor
							? `.block-id-${ id }:hover .category-style {color: ${ categoryTextHColor } ;} `
							: ``
					}
					${
						bgHCatColor
							? `.block-id-${ id }:hover .category-style {background-color: ${ bgHCatColor };} `
							: ``
					}
					.block-id-${ id } .big-style, .block-id-${ id } .small-style {
						border-top-right-radius: ${ imageBorderRadius?.topRight };
						border-top-left-radius: ${ imageBorderRadius?.topLeft };
						border-bottom-right-radius: ${ imageBorderRadius?.bottomRight };
						border-bottom-left-radius: ${ imageBorderRadius?.bottomLeft };
						transition: ${ transitionColorTime }s;
						box-shadow: ${ effectNShadowHO } ${ effectNShadowVO } ${ effectNShadowBlur } ${ effectNShadowSpread } ${ effectNShadowColor };
					}
					.block-id-${ id } .big-style:hover {
						${
							effectHShadowHO ||
							effectHShadowVO ||
							effectHShadowBlur ||
							effectHShadowSpread
								? `box-shadow: ${
										effectHShadowHO
											? effectHShadowHO
											: effectNShadowHO
								  } ${
										effectHShadowVO
											? effectHShadowVO
											: effectNShadowVO
								  } ${
										effectHShadowBlur
											? effectHShadowBlur
											: effectNShadowBlur
								  } ${
										effectHShadowSpread
											? effectHShadowSpread
											: effectNShadowSpread
								  } ${ effectHShadowColor };`
								: ``
						}
					}
					.block-id-${ id } .small-style:hover {
						${
							effectHShadowHO ||
							effectHShadowVO ||
							effectHShadowBlur ||
							effectHShadowSpread
								? `box-shadow: ${
										effectHShadowHO
											? effectHShadowHO
											: effectNShadowHO
								  } ${
										effectHShadowVO
											? effectHShadowVO
											: effectNShadowVO
								  } ${
										effectHShadowBlur
											? effectHShadowBlur
											: effectNShadowBlur
								  } ${
										effectHShadowSpread
											? effectHShadowSpread
											: effectNShadowSpread
								  } ${ effectHShadowColor };`
								: ``
						}
					}
					.block-id-${ id } .first-style {
						gap: ${ gap }px;
						height: ${ contHeight }px;
						text-align: ${ align };
					}
					.block-id-${ id } .middle-style {
						gap: ${ gap }px;
					}
					.block-id-${ id } .second-style {
						gap: ${ gap }px;
					}
					.block-id-${ id } .meta-style {
						justify-content: ${ align };
					}
					.block-id-${ id } .img-style {
						${
							! isEmpty( cssFilters )
								? `filter: ${
										cssFilters.blur !== undefined
											? `blur(${ cssFilters.blur }px)`
											: ``
								  } ${
										cssFilters.brightness !== undefined
											? `brightness(${ cssFilters.brightness }%)`
											: ``
								  } ${
										cssFilters.contrast !== undefined
											? `contrast(${ cssFilters.contrast }%)`
											: ``
								  } ${
										cssFilters.saturation !== undefined
											? `saturate(${ cssFilters.saturation }%)`
											: ``
								  } ${
										cssFilters.hue !== undefined
											? `hue-rotate(${ cssFilters.hue }deg)`
											: ``
								  }
									;`
								: ``
						}
					}
					.block-id-${ id } :hover .img-style {
						${
							! isEmpty( cssHFilters )
								? `filter: ${
										cssHFilters.blur !== undefined
											? `blur(${ cssHFilters.blur }px)`
											: ``
								  } ${
										cssHFilters.brightness !== undefined
											? `brightness(${ cssHFilters.brightness }%)`
											: ``
								  } ${
										cssHFilters.contrast !== undefined
											? `contrast(${ cssHFilters.contrast }%)`
											: ``
								  } ${
										cssHFilters.saturation !== undefined
											? `saturate(${ cssHFilters.saturation }%)`
											: ``
								  } ${
										cssHFilters.hue !== undefined
											? `hue-rotate(${ cssHFilters.hue }deg)`
											: ``
								  }
									;`
								: ``
						}
					}
					.block-id-${ id } .big-style:hover .img-style, .block-id-${ id } .small-style:hover .img-style {
						${
							hoverAnimation !== 'none'
								? `
								${ hoverAnimation === 'zoomIn' ? `transform: scale(1.1);` : `` }
								${ hoverAnimation === 'zoomOut' ? `transform: scale(1.3);` : `` }
								${ hoverAnimation === 'opacity' ? `opacity: 0.7;` : `` }
								${
									hoverAnimation === 'rotateLeft'
										? `transform: rotate(-5deg) scale(1.2);`
										: ``
								}
								${
									hoverAnimation === 'rotateRight'
										? `transform: rotate(5deg) scale(1.2);`
										: ``
								}
								${
									hoverAnimation === 'slideLeft'
										? `transform: translateX(8%) scale(1.2);`
										: ``
								}
								${
									hoverAnimation === 'slideRight'
										? `transform: translateX(-8%) scale(1.2);`
										: ``
								}
							`
								: ``
						}
					}
					.block-id-${ id } .overlay-style {
						opacity: calc(${ overlayOpacity }/100);
						${ overlayColor ? `background-color: ${ overlayColor };` : `` }
						${ overlayGradient ? `background: ${ overlayGradient };` : `` }
					}
					.block-id-${ id } .title-style {
						${ titleTextColor ? `color: ${ titleTextColor };` : `` }
						${ bgColor ? `background-color: ${ bgColor };` : `` }
					}
					${
						titleTextHColor
							? `.block-id-${ id }:hover .title-style {color: ${ titleTextHColor } ;} `
							: ``
					}
					${
						bgHColor
							? `.block-id-${ id }:hover .title-style {background-color: ${ bgHColor };} `
							: ``
					}
					.block-id-${ id } .titleB-style {
						padding-left: ${ layoutPadding?.left };
						padding-right: ${ layoutPadding?.right };
						padding-top: ${ layoutPadding?.top };
						padding-bottom: ${ layoutPadding?.bottom };
						font-size: ${ titleBTypoSize }px;
						font-weight: ${ titleBTypoWeight };
						text-transform: ${ titleBTypoTransform };
						font-style: ${ titleBTypoStyle };
						text-decoration: ${ titleBTypoDecoration };
						line-height: ${
							titleBTypoLineHeight != 'normal'
								? `${ titleBTypoLineHeight }px`
								: `normal`
						};
						letter-spacing: ${
							titleBTypoLetterSpacing != 'normal'
								? `${ titleBTypoLetterSpacing }px`
								: `normal`
						} ;
						word-spacing: ${
							titleBTypoWordSpacing != 'normal'
								? `${ titleBTypoWordSpacing }px`
								: `normal`
						} ;
						font-family: ${ titleBTypoFontFamily ? titleBTypoFontFamily : '' } ;
					}
					.block-id-${ id } .titleS-style {
						padding-left: ${ layoutPadding?.left };
						padding-right: ${ layoutPadding?.right };
						padding-top: ${ layoutPadding?.top };
						padding-bottom: ${ layoutPadding?.bottom };
						font-size: ${ titleSTypoSize }px;
						font-weight: ${ titleSTypoWeight };
						text-transform: ${ titleSTypoTransform };
						font-style: ${ titleSTypoStyle };
						text-decoration: ${ titleSTypoDecoration };
						line-height: ${
							titleSTypoLineHeight != 'normal'
								? `${ titleSTypoLineHeight }px`
								: `normal`
						};
						letter-spacing: ${
							titleSTypoLetterSpacing != 'normal'
								? `${ titleSTypoLetterSpacing }px`
								: `normal`
						} ;
						word-spacing: ${
							titleSTypoWordSpacing != 'normal'
								? `${ titleSTypoWordSpacing }px`
								: `normal`
						} ;
						font-family: ${ titleSTypoFontFamily ? titleSTypoFontFamily : '' } ;
					}
					.block-id-${ id } .excerpt-style {
						font-size: ${ contentTypoSize }px ;
						font-weight: ${ contentTypoWeight } ;
						text-transform: ${ contentTypoTransform } ;
						font-style: ${ contentTypoStyle } ;
						text-decoration: ${ contentTypoDecoration } ;
						line-height: ${
							contentTypoLineHeight != 'normal'
								? `${ contentTypoLineHeight }px`
								: `normal`
						} ;
						letter-spacing: ${
							contentTypoLetterSpacing != 'normal'
								? `${ contentTypoLetterSpacing }px`
								: `normal`
						} ;
						word-spacing: ${
							contentTypoWordSpacing != 'normal'
								? `${ contentTypoWordSpacing }px`
								: `normal`
						} ;
						font-family: ${ contentTypoFontFamily ? contentTypoFontFamily : '' } ;
					}
				` }
			</style>
			{ isResolvingData && <Spinner /> }
			{ hasResolvedData && ( ! data || data.length !== 5 ) && (
				<div className="main-error-container">
					<h3 className="error-title-container"> { __( 'Post Grid 2', 'grigora-kit' ) } </h3>
					<p>
					{ __( 'Not enough posts to display. This block requires atleast' + 
						' 5 posts to work. Please change you filter or add new' + 
						' posts.' , 'grigora-kit' ) }
					</p>
				</div>
			) }
			{ hasResolvedData && data && data.length === 5 && (
				<div className="first-style pointer-events">
					<ContentTag className="big-style">
						<a
							href={ data[ 0 ].link }
							className="a-container"
							onClick={ ( e ) => e.preventDefault() }
							target={ newTab ? '_blank' : '_self' }
						/>
						<img
							src={ data[ 0 ].featured_image.large[ 0 ] }
							className="img-style"
						/>
						<div className="overlay-style"></div>
						<div className="content-container">
							{ categoryToggle && (
								<p className="category-style">
									{ ' ' }
									{ categoryFromId(
										data[ 0 ].categories[ 0 ]
									) }{ ' ' }
								</p>
							) }
							<TitleTag className="title-container titleB-style">
								<span className="title-style">
									{ ' ' }
									{ textTrimmer(
										data[ 0 ].title.rendered,
										maxLength
									) }{ ' ' }
								</span>
							</TitleTag>
							{ excerptToggle && (
								<p className="excerpt-style">
									{ ' ' }
									{ textTrimmer(
										stripRenderedExcerpt(
											data[ 0 ].excerpt.rendered
										),
										contentMaxLength
									) }{ ' ' }
								</p>
							) }
							<div className="meta-style">
								{ authorToggle && (
									<span className="meta-field-container">
										{ parse( authorIcon ) }
										{ authorFromId( data[ 0 ].author ) }
									</span>
								) }
								{ dateToggle && (
									<span className="meta-field-container">
										{ parse( calendarIcon ) }
										{ dateConverter( data[ 0 ].date ) }
									</span>
								) }
							</div>
						</div>
					</ContentTag>
					<div className="second-style">
						<div className="middle-style">
							<ContentTag className="small-style">
								<a
									href={ data[ 1 ].link }
									className="a-container"
									onClick={ ( e ) => e.preventDefault() }
									target={ newTab ? '_blank' : '_self' }
								/>
								<img
									src={ data[ 1 ].featured_image.large[ 0 ] }
									className="img-style"
								/>
								<div className="overlay-style"></div>
								<div className="content-container">
									{ categoryToggle && (
										<p className="category-style">
											{ ' ' }
											{ categoryFromId(
												data[ 1 ].categories[ 0 ]
											) }{ ' ' }
										</p>
									) }
									<TitleTag className="title-container titleS-style">
										<span className="title-style">
											{ ' ' }
											{ textTrimmer(
												data[ 1 ].title.rendered,
												maxLength
											) }{ ' ' }
										</span>
									</TitleTag>
									<div className="meta-style">
										{ authorToggle && (
											<span className="meta-field-container">
												{ parse( authorIcon ) }
												{ authorFromId(
													data[ 1 ].author
												) }
											</span>
										) }
										{ dateToggle && (
											<span className="meta-field-container">
												{ parse( calendarIcon ) }
												{ dateConverter(
													data[ 1 ].date
												) }
											</span>
										) }
									</div>
								</div>
							</ContentTag>
							<ContentTag className="small-style">
								<a
									href={ data[ 2 ].link }
									className="a-container"
									onClick={ ( e ) => e.preventDefault() }
									target={ newTab ? '_blank' : '_self' }
								/>
								<img
									src={ data[ 2 ].featured_image.large[ 0 ] }
									className="img-style"
								/>
								<div className="overlay-style"></div>
								<div className="content-container">
									{ categoryToggle && (
										<p className="category-style">
											{ ' ' }
											{ categoryFromId(
												data[ 2 ].categories[ 0 ]
											) }{ ' ' }
										</p>
									) }
									<TitleTag className="title-container titleS-style">
										<span className="title-style">
											{ ' ' }
											{ textTrimmer(
												data[ 2 ].title.rendered,
												maxLength
											) }{ ' ' }
										</span>
									</TitleTag>
									<div className="meta-style">
										{ authorToggle && (
											<span className="meta-field-container">
												{ parse( authorIcon ) }
												{ authorFromId(
													data[ 2 ].author
												) }
											</span>
										) }
										{ dateToggle && (
											<span className="meta-field-container">
												{ parse( calendarIcon ) }
												{ dateConverter(
													data[ 2 ].date
												) }
											</span>
										) }
									</div>
								</div>
							</ContentTag>
						</div>
						<div className="middle-container middle-style">
							<ContentTag className="small-style">
								<a
									href={ data[ 3 ].link }
									className="a-container"
									onClick={ ( e ) => e.preventDefault() }
									target={ newTab ? '_blank' : '_self' }
								/>
								<img
									src={ data[ 3 ].featured_image.large[ 0 ] }
									className="img-style"
								/>
								<div className="overlay-style"></div>
								<div className="content-container">
									{ categoryToggle && (
										<p className="category-style">
											{ ' ' }
											{ categoryFromId(
												data[ 3 ].categories[ 0 ]
											) }{ ' ' }
										</p>
									) }
									<TitleTag className="title-container titleS-style">
										<span className="title-style">
											{ ' ' }
											{ textTrimmer(
												data[ 3 ].title.rendered,
												maxLength
											) }{ ' ' }
										</span>
									</TitleTag>
									<div className="meta-style">
										{ authorToggle && (
											<span className="meta-field-container">
												{ parse( authorIcon ) }
												{ authorFromId(
													data[ 3 ].author
												) }
											</span>
										) }
										{ dateToggle && (
											<span className="meta-field-container">
												{ parse( calendarIcon ) }
												{ dateConverter(
													data[ 3 ].date
												) }
											</span>
										) }
									</div>
								</div>
							</ContentTag>
							<ContentTag className="small-style">
								<a
									href={ data[ 4 ].link }
									className="a-container"
									onClick={ ( e ) => e.preventDefault() }
									target={ newTab ? '_blank' : '_self' }
								/>
								<img
									src={ data[ 4 ].featured_image.large[ 0 ] }
									className="img-style"
								/>
								<div className="overlay-style"></div>
								<div className="content-container">
									{ categoryToggle && (
										<p className="category-style">
											{ ' ' }
											{ categoryFromId(
												data[ 4 ].categories[ 0 ]
											) }{ ' ' }
										</p>
									) }
									<TitleTag className="title-container titleS-style">
										<span className="title-style">
											{ ' ' }
											{ textTrimmer(
												data[ 4 ].title.rendered,
												maxLength
											) }{ ' ' }
										</span>
									</TitleTag>
									<div className="meta-style">
										{ authorToggle && (
											<span className="meta-field-container">
												{ parse( authorIcon ) }
												{ authorFromId(
													data[ 4 ].author
												) }
											</span>
										) }
										{ dateToggle && (
											<span className="meta-field-container">
												{ parse( calendarIcon ) }
												{ dateConverter(
													data[ 4 ].date
												) }
											</span>
										) }
									</div>
								</div>
							</ContentTag>
						</div>
					</div>
				</div>
			) }
			<Googlefontloader
				config={ {
					google: {
						families: [
							titleBTypoFontFamily,
							titleSTypoFontFamily,
							contentTypoFontFamily,
						],
					},
				} }
			></Googlefontloader>
		</div>
	);
}

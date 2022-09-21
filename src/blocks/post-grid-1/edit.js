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
	DateTimePicker
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

import InspectorTabs from '@components/inspector-tabs';
import GrigoraSelectInput from '@components/select-input';
import GrigoraNumberInput from '@components/number-input';
import GrigoraTextInput from '@components/text-input';
import GrigoraMultiSelectInput from '@components/multiselect-input';
import { useAuthors, usePosts, usePostTypes, useTaxonomiesInfo } from './utils';
import GrigoraRangeInput from '@components/range-input';
import GrigoraColorGradientInput from '@components/colorgradient-input';
import GrigoraBorderRadiusInput from '@components/borderradius-input';
import GrigoraCSSFilterInput from '@components/cssfilter-input';

import {
	ENTRANCE_ANIMATIONS,
	TEXT_TRANSFORMS,
	TEXT_STYLE,
	TEXT_DECORATION,
	FONT_WEIGHTS,
} from '@constants';

export default function Edit( props ) {
	const { attributes, setAttributes, isSelected } = props;

	const { 
		id, 
		content1, 
		content2, 
		content3, 
		post_type, 
		offset, 
		order,
		orderby,
		author,
		excludeAuthor,
		taxonomy,
		excludeTaxonomy,
		search,
		includePost,
		excludePost,
		afterDate,
		beforeDate,
		align,
		ContentTag,
		newTab,
		gap,
		contHeight,
		imageBorderRadius,
		TitleTag,
		transitionColorTime,
		textColor,
		textGradient,
		textHColor,
		textHGradient,
		backColor,
		backGradient,
		layoutPadding,
		maxLength,
		entranceAnimation,
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
		cssFilters
	} = attributes;

	const [hover1, setHover1] = useState(false);
	const [hover2, setHover2] = useState(false);
	const [hover3, setHover3] = useState(false);
	const [hover4, setHover4] = useState(false);

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'post-grid-1' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'post-grid-1' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

	// function tax_query_fucntion(postVal, inc) {
	// 	let res = [
	// 		{
	// 			taxonomy: 'category',
	// 			terms: [],
	// 			rest: 'categories',
	// 			includeChildren: true
	// 		},
	// 		{
	// 			taxonomy: 'post_tags',
	// 			terms: [],
	// 			rest: 'tags'
	// 		}
	// 	]
	// 	for(let i=0; i<postVal.length;i++) {
	// 		if(postVal[i].value.taxonomy === 'category') {
	// 			res[0].terms.push(postVal[i].value.terms)
	// 		}
	// 		else {
	// 			res[1].terms.push(postVal[i].value.terms)
	// 		}
	// 	}
	// 	if(inc) {
	// 		if(res[0].terms.length === 0) res.splice(0,0);
	// 		if(res[1].terms.length === 0) res.splice(1,1);
	// 	}
	// 	return res;
	// }

	const [ query, setQuery ] = useState( {post_type: 'post', per_page: 4} );
	

	useEffect( () => {
		setQuery({
			post_type: post_type, 
			per_page: 4, 
			offset: offset, 
			order: order, 
			search: search,
			orderby: orderby,
			author: author.map((item) => {return item.value}),
			author_exclude: excludeAuthor.map((item) => {return item.value}),
			// tax_query: tax_query_fucntion(taxonomy, true),
			exclude: excludePost.map((item) => {return item.value}),
		})
		if(includePost.length !== 0) {
			setQuery( prev => ({...prev, include: includePost.map((item) => {return item.value})}))
		}
		if(afterDate !== "") {
			setQuery( prev => ({...prev, after: afterDate}))
		}
		if(beforeDate !== "") {
			setQuery( prev => ({...prev, before: beforeDate}))
		}
	}, [post_type, 
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
		beforeDate
	])

	const normalizedQuery = useMemo( () => {
		return query;
	}, [ JSON.stringify( query ) ] );

	console.log(query)

	const { data, isResolvingData, hasResolvedData } = useSelect( ( select ) => {
		const {
			getEntityRecords,
			isResolving,
			hasFinishedResolution,
		} = select( coreStore );

		const queryParams = [ 'postType', query.post_type || 'post', normalizedQuery ];

		// const queryParams = ['postType', 'post', {post_type: 'post', per_page: 10, 
		// 	tax_query: [{taxonomy: 'category',
		// 	rest: 'categories',
		// 	includeChildren: true,
		// 	terms: [4]
		// 	}] 
		// }]

		return {
			data: getEntityRecords( ...queryParams ),
			isResolvingData: isResolving( 'getEntityRecords', queryParams ),
			hasResolvedData: hasFinishedResolution( 'getEntityRecords', queryParams ),
		};
	}, [ JSON.stringify( normalizedQuery ) ] );

	console.log(data)

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-post-grid-1': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

	// postTypes Options
	const { postTypesTaxonomiesMap, postTypesSelectOptions } = usePostTypes()

	// author Options
	const authorsInfo = useAuthors()
	let authorOptions = (authorsInfo !== null) ? authorsInfo.mapById : [];

	// taxonomy Options
	let taxonomiesInfo = useTaxonomiesInfo(post_type)
	taxonomiesInfo = (typeof taxonomiesInfo !== "undefined") ? taxonomiesInfo : []

	const [taxonomiesOptions, setTaxonomiesOptions] = useState([])
	useEffect( () => {
		let temp = []
		for(let i=0; i<taxonomiesInfo.length; i++) {
			let slug = taxonomiesInfo[i].slug
			let entities = taxonomiesInfo[i].terms.entities;
			if(entities !== null) {
				for(let j=0; j<entities.length; j++) {
					let label = slug === "post_tag" ? "Tag: "+entities[j].name : "Category: "+entities[j].name
					temp.push({label: label, value: { taxonomy: slug, terms: entities[j].id }})
				}
			}	
		}
		setTaxonomiesOptions(temp)
	}, [taxonomiesInfo])

	// postOptions
	let postOptions = usePosts(post_type);

	function effectNormalColorRender() {
		return (
			<>
				{ textGradient && backGradient && (
					<Notice status={ 'warning' } isDismissible={ false }>
						<p>
							{ __(
								'Background Gradient doesnt work when text gradient is used. Please wrap the block in the group and then give group a gradient to create similar effects.',
								'grigora-kit'
							) }
						</p>
					</Notice>
				) }
				<GrigoraColorGradientInput
					color={ textColor }
					gradient={ textGradient }
					onColorChange={ ( textColor ) =>
						setAttributes( { textColor } )
					}
					onGradientChange={ ( textGradient ) =>
						setAttributes( { textGradient } )
					}
					label={ __( 'Text', 'grigora-kit' ) }
				/>
				<GrigoraColorGradientInput
					color={ backColor }
					gradient={ backGradient }
					onColorChange={ ( backColor ) =>
						setAttributes( { backColor } )
					}
					onGradientChange={ ( backGradient ) =>
						setAttributes( { backGradient } )
					}
					label={ __( 'Background', 'grigora-kit' ) }
				/>
			</>
		);
	}
	function effectHoverColorRender() {
		return (
			<div className={ `grigora-hover-effects-panel` }>
				{ textGradient && textHGradient && (
					<Notice status={ 'warning' } isDismissible={ false }>
						<p>
							{ __(
								'Gradient Hover on Gradient might not work due to how CSS is implemented.',
								'grigora-kit'
							) }
						</p>
					</Notice>
				) }
				<GrigoraColorGradientInput
					color={ textHColor }
					gradient={ textHGradient }
					onColorChange={ ( textHColor ) =>
						setAttributes( { textHColor } )
					}
					onGradientChange={ ( textHGradient ) =>
						setAttributes( { textHGradient } )
					}
					label={ __( 'Text', 'grigora-kit' ) }
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
						onChange={ ( order ) =>
							setAttributes( { order } )
						}
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
						onChange={ ( orderby ) =>
							setAttributes( { orderby } )
						}
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
						label="Offset"
						onChange={ ( offset ) => setAttributes( { offset } ) }
						value={ offset }
						resetValue={ 0 }
					/>
					<GrigoraTextInput
						label={ __( 'Search', 'grigora-kit' ) }
						onChange={ ( search ) =>
							setAttributes( { search } )
						}
						value={ search }
						resetValue={ '' }
					/>
					<GrigoraMultiSelectInput
						label={ __( 'Author', 'grigora-kit' ) }
						onChange={ ( author ) =>
							setAttributes( { author } )
						}
						value={ author }
						options={ Object.entries(authorOptions).map(obj => {
							return {label: obj[1].name, value: obj[1].id}
						}) }
					/>
					<GrigoraMultiSelectInput
						label={ __( 'Exclude Author', 'grigora-kit' ) }
						onChange={ ( excludeAuthor ) =>
							setAttributes( { excludeAuthor } )
						}
						value={ excludeAuthor }
						options={ Object.entries(authorOptions).map(obj => {
							return {label: obj[1].name, value: obj[1].id}
						}) }
					/>
					<GrigoraMultiSelectInput
						label={ __( 'Taxonomies', 'grigora-kit' ) }
						onChange={ ( taxonomy ) =>
							setAttributes( { taxonomy } )
						}
						value={ taxonomy }
						options={ taxonomiesOptions }
					/>
					<GrigoraMultiSelectInput
						label={ __( 'Exclude Taxonomies', 'grigora-kit' ) }
						onChange={ ( excludeTaxonomy ) =>
							setAttributes( { excludeTaxonomy } )
						}
						value={ excludeTaxonomy }
						options={ taxonomiesOptions }
					/>
					<GrigoraMultiSelectInput
						label={ __( 'Include Post', 'grigora-kit' ) }
						onChange={ ( includePost ) =>
							setAttributes( { includePost } )
						}
						value={ includePost }
						options={ postOptions.records.map( (item) => 
							{ return {label: item.title.rendered, value: item.id};
						} ) }
					/>
					<GrigoraMultiSelectInput
						label={ __( 'Exclude Post', 'grigora-kit' ) }
						onChange={ ( excludePost ) =>
							setAttributes( { excludePost } )
						}
						value={ excludePost }
						options={ postOptions.records.map( (item) => 
							{ return {label: item.title.rendered, value: item.id};
						} ) }
					/>
					<br/><br/><br/><br/><br/><br/>
					<DateTimePicker
						label="Date After"
						currentDate={ afterDate }
						onChange={ ( afterDate ) => {
							setAttributes( { afterDate } );
						} }
						is12Hour={ false }
						__nextRemoveHelpButton
						__nextRemoveResetButton
					/>
					<br/><br/><br/>
					<DateTimePicker
						label="Date Before"
						currentDate={ beforeDate }
						onChange={ ( beforeDate ) => {
							setAttributes( { beforeDate } );
						} }
						is12Hour={ false }
						__nextRemoveHelpButton
						__nextRemoveResetButton
					/>
				</PanelBody>
			</>
		)
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
						onChange={ ( align ) =>
							setAttributes( { align } )
						}
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
						label={ __('Open Links in new Tab', 'grigora-kit') }
						checked={ !! newTab }
						onChange={ () =>
							setAttributes( {
								newTab: ! newTab,
							} )
						}
					/>
					<GrigoraRangeInput
						value={ gap }
						setValue={ ( gap ) => {
							setAttributes( { gap } );
						} }
						label={ `Gap` }
						resetValue={ 16 }
					/>
					<GrigoraRangeInput
						value={ contHeight }
						setValue={ ( contHeight ) => {
							setAttributes( { contHeight } );
						} }
						label={ `Height of the container` }
						resetValue={ 16 }
					/>
					<GrigoraBorderRadiusInput
						label={ __( 'Border Radius', 'grigora-kit' ) }
						onChange={ ( imageBorderRadius ) => {
							if (
								typeof imageBorderRadius ===
									'string' ||
								imageBorderRadius instanceof
									String
							) {
								setAttributes( {
									imageBorderRadius: {
										topLeft:
											imageBorderRadius,
										topRight:
											imageBorderRadius,
										bottomLeft:
											imageBorderRadius,
										bottomRight:
											imageBorderRadius,
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
					<PanelBody title={ __( 'Colors', 'grigora-kit' ) } initialOpen={ false }>
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
								<>{ effectNormalColorRender() }</>
							</TabPanel>
							<TabPanel>
								<>{ effectHoverColorRender() }</>
							</TabPanel>
						</Tabs>
					</PanelBody>
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
						setValue={ ( maxLength ) => {
							setAttributes( { maxLength } );
						} }
						label={ `Max Length` }
						resetValue={ 10 }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Image', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraSelectInput
						label={ __( 'Animation: ', 'grigora-kit' ) }
						labelPosition="side"
						onChange={ ( entranceAnimation ) =>
							setAttributes( { entranceAnimation } )
						}
						value={ entranceAnimation }
						options={ ENTRANCE_ANIMATIONS }
						resetValue={ 'none' }
					/>
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
											setAttributes( { effectNShadowColor } )
										}
										resetValue={ '#000' }
									/>
									<HStack spacing={ 2 }>
										<GrigoraUnitInput
											label={ __(
												'Horizontal',
												'grigora-kit'
											) }
											value={ effectNShadowHO }
											onChange={ ( effectNShadowHO ) =>
												setAttributes( { effectNShadowHO } )
											}
											resetValue={ '0px' }
										/>
										<GrigoraUnitInput
											label={ __(
												'Vertical',
												'grigora-kit'
											) }
											value={ effectNShadowVO }
											onChange={ ( effectNShadowVO ) =>
												setAttributes( { effectNShadowVO } )
											}
											resetValue={ '0px' }
										/>
									</HStack>
									<HStack spacing={ 2 }>
										<GrigoraUnitInput
											label={ __( 'Blur', 'grigora-kit' ) }
											value={ effectNShadowBlur }
											onChange={ ( effectNShadowBlur ) =>
												setAttributes( {
													effectNShadowBlur,
												} )
											}
											resetValue={ '0px' }
										/>
										<GrigoraUnitInput
											label={ __( 'Spread', 'grigora-kit' ) }
											value={ effectNShadowSpread }
											onChange={ ( effectNShadowSpread ) =>
												setAttributes( {
													effectNShadowSpread,
												} )
											}
											resetValue={ '0px' }
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
											setAttributes( { effectHShadowColor } )
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
												setAttributes( { effectHShadowHO } )
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
												setAttributes( { effectHShadowVO } )
											}
											resetValue={ '' }
										/>
									</HStack>
									<HStack spacing={ 2 }>
										<GrigoraUnitInput
											label={ __( 'Blur', 'grigora-kit' ) }
											value={ effectHShadowBlur }
											onChange={ ( effectHShadowBlur ) =>
												setAttributes( {
													effectHShadowBlur,
												} )
											}
											resetValue={ '' }
										/>
										<GrigoraUnitInput
											label={ __( 'Spread', 'grigora-kit' ) }
											value={ effectHShadowSpread }
											onChange={ ( effectHShadowSpread ) =>
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
											setAttributes( { transitionColorTime } )
										}
										value={ transitionColorTime }
										resetValue={ 0.2 }
									/>
								</>
							</TabPanel>
						</Tabs>
					</PanelBody>
					<GrigoraCSSFilterInput
							value={ cssFilters }
							setValue={ ( cssFilters ) =>
								setAttributes( { cssFilters } )
							}
							label={ __( 'CSS Filters', 'grigora-kit' ) }
							reset={ {} }
						/>
				</PanelBody>
			</>
		)
	}

	function advancedSettings() {
		return (
			<PanelBody>
				
			</PanelBody>
		)
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
			<div className='main-container'>
				<style>
					{ 	` 
							.block-id-${ id } .first-block-style {
								opacity: ${ hover1 ? 0.8 : 1 };
								background-position : ${ hover1 ? '30%' : '20%' };
							}
							.block-id-${ id } .second-block-style {
								opacity: ${ hover2 ? 0.8 : 1 };
								background-position : ${ hover2 ? '30%' : '20%' };
							}
							.block-id-${ id } .third-block-style {
								opacity: ${ hover2 ? 0.8 : 1 };
								background-position : ${ hover3 ? '30%' : '20%' };
							}
							.block-id-${ id } .fourth-block-style {
								opacity: ${ hover4 ? 0.8 : 1 };
								background-position : ${ hover4 ? '30%' : '20%' };
							} 
							.block-id-${ id } .content-style {
								text-align: ${ align };
							}
						` 
					}
				</style>
				<ContentTag className='first-block-css first-block-style'
					onMouseEnter={() => setHover1(true)}
					onMouseLeave={() => setHover1(false)}
				>
					<div className='content-css content-style'>
						<RichText
							value={ content1 }
							onChange={ ( content1 ) => setAttributes( { content1 } ) }
							placeholder={ __( 'Text...' ) }
						/>
						<RichText
							value={ content2 }
							onChange={ ( content2 ) => setAttributes( { content2 } ) }
							placeholder={ __( 'Text...' ) }
						/>
						<RichText
							value={ content3 }
							onChange={ ( content3 ) => setAttributes( { content3 } ) }
							placeholder={ __( 'Text...' ) }
						/> 
					</div>
				</ContentTag>
				<div className='middle-container'>
					<ContentTag className='second-block-css second-block-style'
						onMouseEnter={() => setHover2(true)}
						onMouseLeave={() => setHover2(false)}
					>
						<div className='content-css content-style'>
							<RichText
								value={ content1 }
								onChange={ ( content1 ) => setAttributes( { content1 } ) }
								placeholder={ __( 'Text...' ) }
							/>
							<RichText
								value={ content2 }
								onChange={ ( content2 ) => setAttributes( { content2 } ) }
								placeholder={ __( 'Text...' ) }
							/>
							<RichText
								value={ content3 }
								onChange={ ( content3 ) => setAttributes( { content3 } ) }
								placeholder={ __( 'Text...' ) }
							/> 
						</div>
					</ContentTag>
					<div className='last-container'>
						<ContentTag className='third-block-css third-block-style'
							onMouseEnter={() => setHover3(true)}
							onMouseLeave={() => setHover3(false)}
						>
							<div className='content-css content-style'>
								<RichText
									value={ content1 }
									onChange={ ( content1 ) => setAttributes( { content1 } ) }
									placeholder={ __( 'Text...' ) }
								/>
								<RichText
									value={ content2 }
									onChange={ ( content2 ) => setAttributes( { content2 } ) }
									placeholder={ __( 'Text...' ) }
								/>
								<RichText
									value={ content3 }
									onChange={ ( content3 ) => setAttributes( { content3 } ) }
									placeholder={ __( 'Text...' ) }
								/> 
							</div>
						</ContentTag>
						<ContentTag className='fourth-block-css fourth-block-style'
							onMouseEnter={() => setHover4(true)}
							onMouseLeave={() => setHover4(false)}
						>
							<div className='content-css content-style'>
								<RichText
									value={ content1 }
									onChange={ ( content1 ) => setAttributes( { content1 } ) }
									placeholder={ __( 'Text...' ) }
								/>
								<RichText
									value={ content2 }
									onChange={ ( content2 ) => setAttributes( { content2 } ) }
									placeholder={ __( 'Text...' ) }
								/>
								<RichText
									value={ content3 }
									onChange={ ( content3 ) => setAttributes( { content3 } ) }
									placeholder={ __( 'Text...' ) }
								/> 
							</div>
						</ContentTag>
					</div>
				</div>
			</div>
		</div>
	);
}

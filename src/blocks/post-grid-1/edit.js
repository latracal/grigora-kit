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
import { after, before } from 'lodash';

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
		beforeDate
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

	function querySettings() {
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
							{ __( 'Query', 'grigora-kit' ) }
						</Tab>
					</TabList>
					<TabPanel>{ querySettings() }</TabPanel>
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
						` 
					}
				</style>
				<div className='first-block-css first-block-style'
					onMouseEnter={() => setHover1(true)}
					onMouseLeave={() => setHover1(false)}
				>
					<div className='first-block-content-container'>
						<RichText
							value={ content1 }
							onChange={ ( content1 ) => setAttributes( { content1 } ) }
							placeholder={ __( 'Text...' ) }
							style={{backgroundColor: 'white', padding: '10px'}}
						/>
						<RichText
							value={ content2 }
							onChange={ ( content2 ) => setAttributes( { content2 } ) }
							placeholder={ __( 'Text...' ) }
							style={{color: 'white'}}
						/>
						{ hover1 && 
							<RichText
								value={ content3 }
								onChange={ ( content3 ) => setAttributes( { content3 } ) }
								placeholder={ __( 'Text...' ) }
								style={{color: 'white'}}
							/> 
						}
					</div>
				</div>
				<div className='middle-container'>
					<div className='second-block-css second-block-style'
						onMouseEnter={() => setHover2(true)}
						onMouseLeave={() => setHover2(false)}
					>
						<div className='second-block-content-container'>
							<RichText
								value={ content1 }
								onChange={ ( content1 ) => setAttributes( { content1 } ) }
								placeholder={ __( 'Text...' ) }
								style={{backgroundColor: 'white', padding: '10px'}}
							/>
							<RichText
								value={ content2 }
								onChange={ ( content2 ) => setAttributes( { content2 } ) }
								placeholder={ __( 'Text...' ) }
								style={{color: 'white'}}
							/>
							{ hover2 && 
								<RichText
									value={ content3 }
									onChange={ ( content3 ) => setAttributes( { content3 } ) }
									placeholder={ __( 'Text...' ) }
									style={{color: 'white'}}
								/> 
							}
						</div>
					</div>
					<div className='last-container'>
						<div className='third-block-css third-block-style'
							onMouseEnter={() => setHover3(true)}
							onMouseLeave={() => setHover3(false)}
						>
							<div className='third-block-content-container'>
								<RichText
									value={ content1 }
									onChange={ ( content1 ) => setAttributes( { content1 } ) }
									placeholder={ __( 'Text...' ) }
									style={{backgroundColor: 'white', padding: '10px'}}
								/>
								<RichText
									value={ content2 }
									onChange={ ( content2 ) => setAttributes( { content2 } ) }
									placeholder={ __( 'Text...' ) }
									style={{color: 'white'}}
								/>
								{ hover3 && 
									<RichText
										value={ content3 }
										onChange={ ( content3 ) => setAttributes( { content3 } ) }
										placeholder={ __( 'Text...' ) }
										style={{color: 'white'}}
									/> 
								}
							</div>
						</div>
						<div className='fourth-block-css fourth-block-style'
							onMouseEnter={() => setHover4(true)}
							onMouseLeave={() => setHover4(false)}
						>
							<div className='fourth-block-content-container'>
								<RichText
									value={ content1 }
									onChange={ ( content1 ) => setAttributes( { content1 } ) }
									placeholder={ __( 'Text...' ) }
									style={{backgroundColor: 'white', padding: '10px'}}
								/>
								<RichText
									value={ content2 }
									onChange={ ( content2 ) => setAttributes( { content2 } ) }
									placeholder={ __( 'Text...' ) }
									style={{color: 'white'}}
								/>
								{ hover4 && 
									<RichText
										value={ content3 }
										onChange={ ( content3 ) => setAttributes( { content3 } ) }
										placeholder={ __( 'Text...' ) }
										style={{color: 'white'}}
									/> 
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

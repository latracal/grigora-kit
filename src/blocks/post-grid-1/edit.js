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
import { useAuthors, usePostTypes, useTaxonomiesInfo } from './utils';

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

	const [ query, setQuery ] = useState( {post_type: 'post', per_page: 4} );

	const normalizedQuery = useMemo( () => {
		return query;
	}, [ JSON.stringify( query ) ] );

	// console.log(query)

	const { data, isResolvingData, hasResolvedData } = useSelect( ( select ) => {
		const {
			getEntityRecords,
			isResolving,
			hasFinishedResolution,
		} = select( coreStore );

		const queryParams = [ 'postType', query.post_type || 'post', normalizedQuery ];

		return {
			data: getEntityRecords( ...queryParams ),
			isResolvingData: isResolving( 'getEntityRecords', queryParams ),
			hasResolvedData: hasFinishedResolution( 'getEntityRecords', queryParams ),
		};
	}, [ JSON.stringify( normalizedQuery ) ] );

	// console.log(data)

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-post-grid-1': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

	const { postTypesTaxonomiesMap, postTypesSelectOptions } = usePostTypes()

	const authorsInfo = useAuthors()
	let authorOptions = (authorsInfo !== null) ? authorsInfo.names : [];
	authorOptions = authorOptions.map((item, index) => { return {label: item, value: index}; })

	const taxonomiesInfo = useTaxonomiesInfo()
	let taxonomiesOptions = (typeof taxonomiesInfo !== "undefined") ? taxonomiesInfo : []
	taxonomiesOptions = taxonomiesOptions.map((item, index) => { return {label: item.name, value: index}; })

	let postOptions = (data !== null) ? data : [];
	postOptions = postOptions.map((item) => { return {label: item.title.rendered, value: item.id}; })

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
							{ label: 'Ascending', value: 'Ascending' },
							{ label: 'Descending', value: 'Descending' },
						] }
						resetValue={ 'Ascending' }
					/>
					<GrigoraSelectInput
						label={ __( 'Order By', 'grigora-kit' ) }
						labelPosition="side"
						onChange={ ( orderby ) =>
							setAttributes( { orderby } )
						}
						value={ orderby }
						options={ [
							{ label: 'id', value: 'id' },
							{ label: 'Title', value: 'title' },
							{ label: 'Slug', value: 'slug' },
							{ label: 'Author', value: 'author' },
							{ label: 'Date', value: 'date' },
							{ label: 'Last modified date', value: 'modified' },
							{ label: 'Parent id', value: 'parent' },
							{ label: 'Menu order', value: 'menu_order' },
						] }
						resetValue={ '' }
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
						options={ authorOptions }
					/>
					<GrigoraMultiSelectInput
						label={ __( 'Exclude Author', 'grigora-kit' ) }
						onChange={ ( excludeAuthor ) =>
							setAttributes( { excludeAuthor } )
						}
						value={ excludeAuthor }
						options={ authorOptions }
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
						options={ postOptions }
					/>
					<GrigoraMultiSelectInput
						label={ __( 'Exclude Post', 'grigora-kit' ) }
						onChange={ ( excludePost ) =>
							setAttributes( { excludePost } )
						}
						value={ excludePost }
						options={ postOptions }
					/>
					<br/><br/><br/><br/>
					<DateTimePicker
						label="Date After"
						currentDate={ afterDate }
						onChange={ ( afterDate ) => {
							setAttributes( { afterDate } );
							let pickedDate = new Date( afterDate );
							let today = new Date();
						} }
						is12Hour={ false }
						__nextRemoveHelpButton
						__nextRemoveResetButton
					/>
					<br/><br/>
					<DateTimePicker
						label="Date Before"
						currentDate={ beforeDate }
						onChange={ ( beforeDate ) => {
							setAttributes( { beforeDate } );
							let pickedDate = new Date( beforeDate );
							let today = new Date();
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

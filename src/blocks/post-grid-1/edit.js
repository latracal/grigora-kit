import classnames from 'classnames';

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
	TabPanel,
	PanelBody,
	ToggleControl,
	ToolbarButton,
	Popover,
	Button,
	Icon,
	Tooltip,
	__experimentalHStack as HStack,
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

export default function Edit( props ) {
	const { attributes, setAttributes, isSelected } = props;

	const { id, content1, content2, content3 } = attributes;
	
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

	console.log(query)

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

	console.log(data)

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-post-grid-1': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

	return (
		<div { ...blockProps }>
			<InspectorControls></InspectorControls>
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

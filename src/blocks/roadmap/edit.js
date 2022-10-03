import classnames from 'classnames';

import Countdown, { zeroPad } from 'react-countdown';
import { useSelect, useDispatch } from '@wordpress/data';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockIcon, //Img
	MediaPlaceholder, //Img
	BlockControls,
	AlignmentControl,
	store as blockEditorStore,
	InnerBlocks,
	RichText,
	__experimentalUseBorderProps as useBorderProps, //Img
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';

import { displayShortcut } from '@wordpress/keycodes';

import IconPicker from '@components/icon-picker';

import {
	PanelBody,
	Button,
	ToolbarButton,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
	TextControl,
} from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import { alignLeft, alignRight, alignCenter } from '@wordpress/icons';

import {
	HOVER_ANIMATIONS,
	ENTRANCE_ANIMATIONS,
	ICON_POSITIONS,
	TEXT_TRANSFORMS,
	TEXT_STYLE,
	TEXT_DECORATION,
	FONT_WEIGHTS,
} from '@constants';
import generateId from '@helpers/generateId';
import uniqueIDs from '@helpers/uniqueID';
import GrigoraRangeInput from '@components/range-input';
import GrigoraSelectInput from '@components/select-input';
import GrigoraColorInput from '@components/color-input';
import GrigoraGradientInput from '@components/gradient-input';
import GrigoraBorderBoxInput from '@components/borderbox-input';
import GrigoraBorderRadiusInput from '@components/borderradius-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraBoxInput from '@components/box-input';
import GrigoraNumberInput from '@components/number-input';
import GrigoraTextInput from '@components/text-input';
import GrigoraToggleInput from '@components/toggle-input';
import GrigoraDateTimeInput from '@components/date-input';
import GrigoraTypographyInput from '@components/typography-input';

import InspectorTabs from '@components/inspector-tabs';

import parse from "html-react-parser"
import SVGIcons from '@constants/icons.json';

// For image

import { pick } from 'lodash';
import { Placeholder, Icon, Popover } from '@wordpress/components';
import { image as icon, link,
	linkOff, } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';



const placeholder = ( content ) => {
	return (
		<Placeholder
			className="block-editor-media-placeholder"
			withIllustration={ true }
			icon={ icon }
			label={ __( 'Image' ) }
			instructions={ __(
				'Upload an image file, pick one from your media library, or add one with a URL.'
			) }
		>
			{ content }
		</Placeholder>
	);
};


export const pickRelevantMediaFiles = ( image ) => {
	const imageProps = pick( image );
	imageProps.url =
		image.url;
	return imageProps;
};


//End of Internal Dependecies of image

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	let [ displayPopup, setDisplayPopup ] = useState( false );
	let [currentIndex, setCurrentIndex] = useState(0);
	const {

		id,
		iconPick,
		imageHeight,
		roadmapItems,
		layout,
		textAlign,
		displayDate,
		displayAuthor,
		displayButton,
		displayImage,
		titleTag,
		contentTag,
		iconBgSize,
		iconBorderWidth,
		connectorThickness,
		layoutPadding,
		imagePadding,
		headingColor,
		contentColor,
		bgColor,
		headingHoverColor,
		contentHoverColor,
		bgHoverColor,
		gapItems,
		gapItemMarker,
		iconColor,
		iconBgColor,
		iconBorderColor,
		connectorColor,
		typoHSize,
		typoHStyle,
		typoHDecoration,
		typoHLetterSpacing,
		typoHLineHeight,
		typoHTransform,
		typoHWeight,
		typoHWordSpacing,
		typoCSize,
		typoCStyle,
		typoCDecoration,
		typoCLetterSpacing,
		typoCLineHeight,
		typoCTransform,
		typoCWeight,
		typoCWordSpacing,
		effectBorder,
		effectBorderRadius,

	} = attributes;


	const LAYOUT = [
		{
			label: __( 'Left Right', 'grigora-kit' ),
			value: 'leftright',
		},
		{
			label: __( 'Left', 'grigora-kit' ),
			value: 'left',
		},
		{
			label: __( 'Right', 'grigora-kit' ),
			value: 'right',
		}
	];

	const TEXT_ALIGN = [
		{
			label: __( 'Left to Right', 'grigora-kit' ),
			value: 'ltr',
		},
		{
			label: __( 'Right to Left', 'grigora-kit' ),
			value: 'rtl',
		},
	];

	const TAGS = [
		{
			label: __( 'h1', 'grigora-kit' ),
			value: 'h1',
		},

		{
			label: __( 'h2', 'grigora-kit' ),
			value: 'h2',
		},

		{
			label: __( 'h3', 'grigora-kit' ),
			value: 'h3',
		},

		{
			label: __( 'h4', 'grigora-kit' ),
			value: 'h4',
		},

		{
			label: __( 'h5', 'grigora-kit' ),
			value: 'h5',
		},

		{
			label: __( 'p', 'grigora-kit' ),
			value: 'p',
		},
	]

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'roadmap' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
			const temp_roadmap = [ ...roadmapItems ];
			temp_roadmap.forEach( function ( part, index ) {
				if ( ! part.id ) {
					this[ index ] = {
						...this[ index ],
						id: generateId( `roadmap-${ index }` ),
					};
				}
			}, temp_roadmap );
			setAttributes( { roadmapItems: temp_roadmap } );

		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'roadmap' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
			const temp_roadmap = [ ...roadmapItems ];
			temp_roadmap.forEach( function ( part, index ) {
				if ( ! part.id ) {
					this[ index ] = {
						...this[ index ],
						id: generateId( `roadmap-${ index }` ),
					};
				}
			}, temp_roadmap );
			setAttributes( { roadmapItems: temp_roadmap } );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-roadmap': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

	function handleAddButton(){
		let newItems = [...roadmapItems];
	
		newItems.push({
				title: "Another Title",
				date: "1st Jan 2022",
				icon: "apple",
				link: "",
				linkText: "Read More",
				content: "This is where you write the content of the roadmap item. You can add as many items as you want.",
				author: "-Someone Famous",
				url:"",
				id: generateId( `roadmap` ),
		});
		setAttributes({roadmapItems: newItems});
	}

	function setActiveIcon(iconPick){
		setAttributes({iconPick})
	}

	function generalSettings(){
		return(
			<>
				<PanelBody
					title={ __( 'Roadmap', 'grigora-kit' ) }
					initialOpen={ false }
				>
		
					<GrigoraSelectInput
						label={ __( 'Layout', 'grigora-kit' ) }
						onChange={ ( layout ) =>
							setAttributes( { layout } )
						}
						value={ layout }
						resetValue={ 'leftright' }
						options={ LAYOUT }
					/>
					
					<GrigoraSelectInput
						label={ __( 'Text Align', 'grigora-kit' ) }
						onChange={ ( textAlign ) =>
							setAttributes( { textAlign } )
						}
						value={ textAlign }
						resetValue={ 'ltr' }
						options={ TEXT_ALIGN }
					/>

					<GrigoraToggleInput
						label={ __( 'Display Date', 'grigora-kit' ) }
						onChange={ ( displayDate ) => {
							setAttributes( { displayDate } );
						} }
						value={ displayDate }
						resetValue={ true }
						help={ __( 'Display date (ON/OFF)', 'grigora-kit' ) }
					/>
					
					<GrigoraToggleInput
						label={ __( 'Display Author', 'grigora-kit' ) }
						onChange={ ( displayAuthor ) => {
							setAttributes( { displayAuthor } );
						} }
						value={ displayAuthor }
						resetValue={ true }
						help={ __( 'Display Author (ON/OFF)', 'grigora-kit' ) }
					/>
					
					<GrigoraToggleInput
						label={ __( 'Display Button', 'grigora-kit' ) }
						onChange={ ( displayButton ) => {
							setAttributes( { displayButton } );
						} }
						value={ displayButton }
						resetValue={ true }
						help={ __( 'Display Button (ON/OFF)', 'grigora-kit' ) }
					/>

					<GrigoraToggleInput
						label={ __( 'Display Image', 'grigora-kit' ) }
						onChange={ ( displayImage ) => {
							setAttributes( { displayImage } );
						} }
						value={ displayImage }
						resetValue={ true }
						help={ __( 'Display Image (ON/OFF)', 'grigora-kit' ) }
					/>


					
					


				</PanelBody>
				<PanelBody
					title={ __( 'Heading', 'grigora-kit' ) }
					initialOpen={ false }
				>
		
					<GrigoraSelectInput
						label={ __( 'Tag', 'grigora-kit' ) }
						onChange={ ( titleTag ) =>{
							setAttributes( { titleTag } )
							setAttributes( {  typoHSize: 'normal' } )
						}
						}
						value={ titleTag }
						resetValue={ 'h3' }
						options={ TAGS }
					/>
					


				</PanelBody>

				<PanelBody
					title={ __( 'Content', 'grigora-kit' ) }
					initialOpen={ false }
				>
		
					<GrigoraSelectInput
						label={ __( 'Tag', 'grigora-kit' ) }
						onChange={ ( contentTag ) =>
							setAttributes( { contentTag } )
						}
						value={ contentTag }
						resetValue={ 'p' }
						options={ TAGS }
					/>
					


				</PanelBody>

				<PanelBody
					title={ __( 'Icon', 'grigora-kit' ) }
					initialOpen={ false }
				>

					<h2>End Icon</h2>
					<IconPicker
						activeIcon={ iconPick }
						setActiveIcon = { setActiveIcon }
					/>

					<GrigoraRangeInput
							value={ iconBgSize }
							setValue={ ( iconBgSize ) => {
								setAttributes( { iconBgSize } );
							} }
							label={ `Background Size` }
							resetValue={ 40 }
						/>

					<GrigoraRangeInput
							value={ iconBorderWidth }
							setValue={ ( iconBorderWidth ) => {
								setAttributes( { iconBorderWidth } );
							} }
							label={ `Border Width` }
							resetValue={ 4 }
							min = { 1 }
							max = { 20 }
						/>
					
					<GrigoraRangeInput
							value={ connectorThickness }
							setValue={ ( connectorThickness ) => {
								setAttributes( { connectorThickness } );
							} }
							label={ `Connector Thickness` }
							resetValue={ 4 }
							min = { 1 }
							max = { 20 }
						/>
						{
							roadmapItems.map( ( item, index ) => {
								return(
									<PanelBody
									title={ __( `Icon${index+1}`, 'grigora-kit' ) }
									initialOpen={ false }
									>

										<IconPicker
											activeIcon={ item.icon }
											setActiveIcon = { (newIcon) => {
												let newArr = [...roadmapItems];
												let newItem = item;
												newItem.icon = newIcon;
												newArr[index] = newItem;
												setAttributes( { roadmapItems: newArr} )
											} }
										/>

									</PanelBody>
								)
							} )
						}
					
				</PanelBody>
			</>
		)
	}

	function colorNormalRender(){
		return (
			<>
				<GrigoraColorInput
						label={ __( 'Heading', 'grigora-kit' ) }
						value={ headingColor }
						onChange={ ( headingColor ) =>
							setAttributes( { headingColor } )
						}
						resetValue={ '#000' }
					/>

				<GrigoraColorInput
					label={ __( 'Content', 'grigora-kit' ) }
					value={ contentColor }
					onChange={ ( contentColor ) =>
						setAttributes( { contentColor } )
					}
					resetValue={ '#000' }
				/>

				<GrigoraColorInput
					label={ __( 'Background', 'grigora-kit' ) }
					value={ bgColor }
					onChange={ ( bgColor ) =>
						setAttributes( { bgColor } )
					}
					resetValue={ '#fff' }
				/>



			</>
		)
	}
	
	function colorHoverRender(){
		return (
			<>
				<GrigoraColorInput
						label={ __( 'Heading', 'grigora-kit' ) }
						value={ headingHoverColor }
						onChange={ ( headingHoverColor ) =>
							setAttributes( { headingHoverColor } )
						}
						resetValue={ '#000' }
					/>

				<GrigoraColorInput
					label={ __( 'Content', 'grigora-kit' ) }
					value={ contentHoverColor }
					onChange={ ( contentHoverColor ) =>
						setAttributes( { contentHoverColor } )
					}
					resetValue={ '#000' }
				/>

				<GrigoraColorInput
					label={ __( 'Background', 'grigora-kit' ) }
					value={ bgHoverColor }
					onChange={ ( bgHoverColor ) =>
						setAttributes( { bgHoverColor } )
					}
					resetValue={ '#fff' }
				/>
				</>
		)
	}

	function stylesSettings(){
		return(
			<>
				<PanelBody
					title={ __( 'Container', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraBoxInput
						label={ __( 'Padding', 'grigora-kit' ) }
						onChange={ ( layoutPadding ) =>
							setAttributes( { layoutPadding } )
						}
						values={ layoutPadding }
						resetValue={ {
							top: '20px',
							bottom: '20px',
							left: '20px',
							right: '20px',
						} }
					/>

					<PanelBody
						title={ __( 'Colors', 'grigora-kit' ) }
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

						<TabPanel>{ colorNormalRender() }</TabPanel>
						<TabPanel>{ colorHoverRender() }</TabPanel>
					</Tabs>
					</PanelBody>

					<GrigoraRangeInput
							value={ gapItems }
							setValue={ ( gapItems ) => {
								setAttributes( { gapItems } );
							} }
							label={ `Gap between Items` }
							resetValue={ 40 }
							max={500}
						/>

				</PanelBody>

				<PanelBody
					title={ __( 'Icon', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraRangeInput
							value={ gapItemMarker }
							setValue={ ( gapItemMarker ) => {
								setAttributes( { gapItemMarker } );
							} }
							label={ `Gap between Item and Marker` }
							resetValue={ 10 }
						/>
					<PanelBody
						title={ __( 'Colors', 'grigora-kit' ) }
						initialOpen={ false }
					>
						
						<GrigoraColorInput
						label={ __( 'Icon Color', 'grigora-kit' ) }
						value={ iconColor }
						onChange={ ( iconColor ) =>
							setAttributes( { iconColor } )
						}
						resetValue={ '#3ea0e2' }
						/>

						<GrigoraColorInput
							label={ __( 'Background Color', 'grigora-kit' ) }
							value={ iconBgColor }
							onChange={ ( iconBgColor ) =>
								setAttributes( { iconBgColor } )
							}
							resetValue={ '#f2f2f2' }
						/>

						<GrigoraColorInput
							label={ __( 'Border Color', 'grigora-kit' ) }
							value={ iconBorderColor }
							onChange={ ( iconBorderColor ) =>
								setAttributes( { iconBorderColor } )
							}
							resetValue={ '#fff' }
						/>

						<GrigoraColorInput
							label={ __( 'Connector Color', 'grigora-kit' ) }
							value={ connectorColor }
							onChange={ ( connectorColor ) =>
								setAttributes( { connectorColor } )
							}
							resetValue={ 'linear-gradient(89.9deg, rgb(102, 64, 123) 0%, rgb(252, 41, 119) 100%, rgb(251, 168, 214) 100.1%)' }
						/>

					</PanelBody>


				</PanelBody>

				<PanelBody
					title={ __( 'Typography', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraTypographyInput
						label={ __( 'Title', 'grigora-kit' ) }
						size={ typoHSize }
						sizeChange={ ( typoHSize ) => {
							setAttributes( {
								typoHSize: typoHSize.toString(),
							} );
						} }
						lineHeight={ typoHLineHeight }
						lineHeightChange={ ( typoHLineHeight ) => {
							setAttributes( {
								typoHLineHeight: typoHLineHeight.toString(),
							} );
						} }
						letterSpacing={ typoHLetterSpacing }
						letterSpacingChange={ ( typoHLetterSpacing ) => {
							setAttributes( {
								typoHLetterSpacing:
									typoHLetterSpacing.toString(),
							} );
						} }
						wordSpacing={ typoHWordSpacing }
						wordSpacingChange={ ( typoHWordSpacing ) => {
							setAttributes( {
								typoHWordSpacing: typoHWordSpacing.toString(),
							} );
						} }
						transform={ typoHTransform }
						transformChange={ ( typoHTransform ) =>
							setAttributes( { typoHTransform } )
						}
						style={ typoHStyle }
						styleChange={ ( typoHStyle ) =>
							setAttributes( { typoHStyle } )
						}
						decoration={ typoHDecoration }
						decorationChange={ ( typoHDecoration ) =>
							setAttributes( { typoHDecoration } )
						}
						weight={ typoHWeight }
						weightChange={ ( typoHWeight ) =>
							setAttributes( { typoHWeight } )
						}
					/>
					<br></br>
					
						<>
							<GrigoraTypographyInput
								label={ __(
									'Content',
									'grigora-kit'
								) }
								size={ typoCSize }
								sizeChange={ ( typoCSize ) => {
									setAttributes( {
										typoCSize: typoCSize.toString(),
									} );
								} }
								lineHeight={ typoCLineHeight }
								lineHeightChange={ ( typoCLineHeight ) => {
									setAttributes( {
										typoCLineHeight:
											typoCLineHeight.toString(),
									} );
								} }
								letterSpacing={ typoCLetterSpacing }
								letterSpacingChange={ (
									typoCLetterSpacing
								) => {
									setAttributes( {
										typoCLetterSpacing:
											typoCLetterSpacing.toString(),
									} );
								} }
								wordSpacing={ typoCWordSpacing }
								wordSpacingChange={ ( typoCWordSpacing ) => {
									setAttributes( {
										typoCWordSpacing:
											typoCWordSpacing.toString(),
									} );
								} }
								transform={ typoCTransform }
								transformChange={ ( typoCTransform ) =>
									setAttributes( { typoCTransform } )
								}
								style={ typoCStyle }
								styleChange={ ( typoCStyle ) =>
									setAttributes( { typoCStyle } )
								}
								decoration={ typoCDecoration }
								decorationChange={ ( typoCDecoration ) =>
									setAttributes( { typoCDecoration } )
								}
								weight={ typoCWeight }
								weightChange={ ( typoCWeight ) =>
									setAttributes( { typoCWeight } )
								}
							/>
							<br></br>
						</>
					
				</PanelBody>

				<PanelBody
					title={ __( 'Image', 'grigora-kit' ) }
					initialOpen={ false }
				>

					<GrigoraRangeInput
						value={ imageHeight }
						setValue={ ( imageHeight ) => {
							setAttributes( { imageHeight: imageHeight.toString() } );
						} }
						label={ `Image Height` }
						min={ 0 }
						max={ 500 }
						resetValue={ 200 }
					/>

					<GrigoraBoxInput
						label={ __( 'Padding', 'grigora-kit' ) }
						onChange={ ( imagePadding ) =>
							setAttributes( { imagePadding } )
						}
						values={ imagePadding }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '0px',
							right: '0px',
						} }
					/>	


				</PanelBody>
			</>
		)
	}

	function advancedSettings(){
		return(
				<PanelBody
					title={ __( 'Border', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<>
								<GrigoraBorderBoxInput
									label={ __( 'Width', 'grigora-kit' ) }
									onChange={ ( effectBorder ) => {
										if ( ! effectBorder.top ) {
											setAttributes( {
												effectBorder: {
													top: effectBorder,
													bottom: effectBorder,
													right: effectBorder,
													left: effectBorder,
												},
											} );
										} else {
											setAttributes( { effectBorder } );
										}
									} }
									value={ effectBorder }
									resetValue={ {
										top: {
											color: '#000',
											style: 'solid',
											width: '1px',
										},
										bottom: {
											color: '#000',
											style: 'solid',
											width: '1px',
										},
										right: {
											color: '#000',
											style: 'solid',
											width: '1px',
										},
										left: {
											color: '#000',
											style: 'solid',
											width: '1px',
										},
									} }
								/>
								<GrigoraBorderRadiusInput
									label={ __( 'Radius', 'grigora-kit' ) }
									onChange={ ( effectBorderRadius ) => {
										if (
											typeof effectBorderRadius ===
												'string' ||
											effectBorderRadius instanceof
												String
										) {
											setAttributes( {
												effectBorderRadius: {
													topLeft:
														effectBorderRadius,
													topRight:
														effectBorderRadius,
													bottomLeft:
														effectBorderRadius,
													bottomRight:
														effectBorderRadius,
												},
											} );
										} else {
											setAttributes( {
												effectBorderRadius,
											} );
										}
									} }
									values={ effectBorderRadius }
									resetValue={ {
										topLeft: '4px',
										topRight: '4px',
										bottomLeft: '4px',
										bottomRight: '4px',
									} }
								/>
							</>

				</PanelBody>
				
			
		)
	}

		function getIcon() {
			return parse(
				`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
				<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"></path>
				</svg>`
			);
		}
	
		const { createErrorNotice } = useDispatch( noticesStore );
		
	//Navigate functions
	const [renderNavigate, setRenderNavigate] = useState(-1);
	const [renderLinkInsert, setRenderLinkInsert] = useState(-1);
	const [ openPopOver, setOpenPopOver ] = useState( false );
	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const ref = useRef();

	function toggleEditing() {
		setIsEditingURL( ! isEditingURL );
		setOpenPopOver( ! openPopOver );
		if ( openPopOver ){
			setRenderLinkInsert( -1 );
		}
	}

    function renderNavigationButtons(index) {
	
		const delete_icon = parse( SVGIcons[ 'x-circle' ] );
		const up_icon = parse( SVGIcons[ 'chevron-up' ] );
		const down_icon = parse( SVGIcons[ 'chevron-down' ] );

		
		if (index < 1){
			return (
				<div className='naviagte-tab'>
                    <div className='navigate-icons'>
                        <div className='navigate-icon' onClick={() => navigateDown(index)}>{down_icon}</div>
                        <div className='delete-icon' onClick={() => handleDeleteItem(index)}>{delete_icon}</div>
                    </div>
				</div>
			)
		}

		else if (index == roadmapItems.length - 1){
			return (
				<div className='naviagte-tab'>
                    <div className='navigate-icons'>
                        <div className='navigate-icon' onClick={() => navigateTop(index)}>{up_icon}</div>
                        <div className='delete-icon' onClick={() => handleDeleteItem(index)}>{delete_icon}</div>
                    </div>
				</div>
			)
		}

		else{
			return (
				<div className='naviagte-tab'>
                    <div className='navigate-icons'>
                        <div className='navigate-icon' onClick={() => navigateTop(index)}>{up_icon}</div>
                        <div className='navigate-icon' onClick={() => navigateDown(index)}>{down_icon}</div>
                        <div className='delete-icon' onClick={() => handleDeleteItem(index)}>{delete_icon}</div>				
                    </div>
					
				</div>
			)
		}
		
	}

	function renderLinkInserter(item,index){
		return(
			<div className='insert-tab' >
				<div className='insert-icons'>
				<ToolbarButton
							name="link"
							icon={ item.link ? linkOff : link }
							title={ __( 'Link', 'grigora-kit' ) }
							shortcut={ displayShortcut.primary( 'k' ) }
							onClick={ toggleEditing }
							isActive={ item.link ? true : false }
							onMouseEnter={() => setRenderLinkInsert(index)}
						/>
						{  openPopOver && ( isEditingURL ) && (
							<Popover
							position="top center"
							onClose={ () => {
								setIsEditingURL( true );
								setOpenPopOver( true );
							} }
							anchorRef={ ref?.current }
							focusOnMount={ isEditingURL ? 'firstElement' : false }
							__unstableSlotName={ '__unstable-block-tools-after' }
							onMouseLeave={() => setRenderLinkInsert(-1)}
						>
							
								{ (
								<HStack spacing={ 4 }>
									<div className="grigora-radio-input__label">
										{ '' }
									</div>
									<Button
										isSmall
										icon={
											<Icon
												icon={ () => (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														viewBox="0 0 16 16"
													>
														<path
															fill-rule="evenodd"
															d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
														/>
														<path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
													</svg>
												) }
											/>
										}
										onClick={ () =>{
											let newArr = [...roadmapItems];
											let newItem = item;
											newItem.link = '';
											newArr[index] = newItem;
											setAttributes( { roadmapItems: newArr} );
										}
										}
									/>
								</HStack>
							)}

							
								<TextControl
										label={ __( 'Button Link (https format)' ) }
										value={ item.link }
										onChange={ ( 
											val
										) => {
											let newArr = [...roadmapItems];
											let newItem = item;
											newItem.link = val;
											newArr[index] = newItem;
											setAttributes( { roadmapItems: newArr} );
										} }
										style={{width: '300px', height: '20px'}}
									/>
							


							</Popover>
						)}
				</div>
			</div>
		)
	}

	function handleDeleteItem(index){
		let newroadmapItems = [...roadmapItems];
		newroadmapItems.splice(index, 1);
		setAttributes({roadmapItems: newroadmapItems});
	}

    function navigateTop(index){
        if(index > 0){
            let newroadmapItems = [...roadmapItems];
            let temp = newroadmapItems[index];
			newroadmapItems[index] = newroadmapItems[index-1];
			newroadmapItems[index-1] = temp;
			setAttributes({roadmapItems: newroadmapItems});		
		}
    }

    function navigateDown(index){
        if(index < roadmapItems.length - 1){
            let newroadmapItems = [...roadmapItems];
            let temp = newroadmapItems[index];
            newroadmapItems[index] = newroadmapItems[index+1];
            newroadmapItems[index+1] = temp;
            setAttributes({roadmapItems: newroadmapItems});		
        }
    }

	

	return(
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
				{
					`
					.block-id-${ id } .wrapper .row{
						margin-bottom: ${gapItems}px;
					}

					.block-id-${ id } .wrapper .row .card-content:hover{
						background-color: ${ bgHoverColor };	
					}

					.block-id-${ id } .wrapper .row section .card-container{
						border-left: ${ effectBorder?.left?.width } ${ effectBorder?.left?.style } ${
							effectBorder?.left?.color
								? effectBorder?.left?.color
								: ''
						};
							border-right: ${ effectBorder?.right?.width } ${
								effectBorder?.right?.style
						} ${
							effectBorder?.right?.color
								? effectBorder?.right?.color
								: ''
						};
							border-top: ${ effectBorder?.top?.width } ${ effectBorder?.top?.style } ${
								effectBorder?.top?.color
								? effectBorder?.top?.color
								: ''
						};
							border-bottom: ${ effectBorder?.bottom?.width } ${
								effectBorder?.bottom?.style
						} ${
							effectBorder?.bottom?.color
								? effectBorder?.bottom?.color
								: ''
						};
						${
							effectBorderRadius?.topRight
								? `border-top-right-radius: ${ effectBorderRadius?.topRight }`
								: ``
						};
						${
							effectBorderRadius?.topLeft
								? `border-top-left-radius: ${ effectBorderRadius?.topLeft }`
								: ``
						};
						${
							effectBorderRadius?.bottomRight
								? `border-bottom-right-radius: ${ effectBorderRadius?.bottomRight }`
								: ``
						};
						${
							effectBorderRadius?.bottomLeft
								? `border-bottom-left-radius: ${ effectBorderRadius?.bottomLeft }`
								: ``
						};
						
					}

					.block-id-${ id } .wrapper .row .card-content{
						padding-left: ${ layoutPadding?.left };
						padding-right: ${ layoutPadding?.right };
						padding-top: ${ layoutPadding?.top };
						padding-bottom: ${ layoutPadding?.bottom };
						background-color: ${ bgColor };	

						border-left: ${ effectBorder?.left?.width } ${ effectBorder?.left?.style } ${
							effectBorder?.left?.color
								? effectBorder?.left?.color
								: ''
						};
							border-right: ${ effectBorder?.right?.width } ${
								effectBorder?.right?.style
						} ${
							effectBorder?.right?.color
								? effectBorder?.right?.color
								: ''
						};
							border-top: ${ effectBorder?.top?.width } ${ effectBorder?.top?.style } ${
								effectBorder?.top?.color
								? effectBorder?.top?.color
								: ''
						};
							border-bottom: ${ effectBorder?.bottom?.width } ${
								effectBorder?.bottom?.style
						} ${
							effectBorder?.bottom?.color
								? effectBorder?.bottom?.color
								: ''
						};
						

						${
							effectBorderRadius?.topRight
								? `border-top-right-radius: ${ effectBorderRadius?.topRight }`
								: ``
						};
						${
							effectBorderRadius?.topLeft
								? `border-top-left-radius: ${ effectBorderRadius?.topLeft }`
								: ``
						};

						${
							effectBorderRadius?.bottomRight
								? `border-bottom-right-radius: ${ effectBorderRadius?.bottomRight }`
								: ``
						};
						${
							effectBorderRadius?.bottomLeft
								? `border-bottom-left-radius: ${ effectBorderRadius?.bottomLeft }`
								: ``
						};
						
					}

					.block-id-${ id } .wrapper .row .card-contentimg:hover{
						background-color: ${ bgHoverColor };
					}

					.block-id-${ id } .wrapper .row .card-contentimg{
						padding-left: ${ layoutPadding?.left };
						padding-right: ${ layoutPadding?.right };
						padding-top: ${ layoutPadding?.top };
						padding-bottom: ${ layoutPadding?.bottom };
						background-color: ${ bgColor };	

						${
							effectBorderRadius?.bottomRight
								? `border-bottom-right-radius: ${ effectBorderRadius?.bottomRight }`
								: ``
						};
						${
							effectBorderRadius?.bottomLeft
								? `border-bottom-left-radius: ${ effectBorderRadius?.bottomLeft }`
								: ``
						};

						border-left: ${ effectBorder?.left?.width } ${ effectBorder?.left?.style } ${
							effectBorder?.left?.color
								? effectBorder?.left?.color
								: ''
						};
						
						border-right: ${ effectBorder?.right?.width } ${
								effectBorder?.right?.style
						} ${
							effectBorder?.right?.color
								? effectBorder?.right?.color
								: ''
						};

						border-bottom: ${ effectBorder?.bottom?.width } ${
							effectBorder?.bottom?.style
					} ${
						effectBorder?.bottom?.color
							? effectBorder?.bottom?.color
							: ''
					};
						
					}

					.block-id-${ id } .wrapper .row section .card-container::before:hover{
						background-color: ${ bgHoverColor };
					}


					.block-id-${ id } .wrapper .row section .card-container::before{
						background-color: ${ bgColor };
					}

					.block-id-${ id } .row section .icon svg, .block-id-${ id } .wrapper .scroll-icon svg{
						height: ${ iconBgSize - 16}px;
						width: ${ iconBgSize - 16}px;
						color: ${ iconColor };
						
					}

					.block-id-${ id } .row section .icon, .block-id-${ id } .wrapper .scroll-icon{
						height: ${ iconBgSize }px;
						width: ${ iconBgSize }px;
						background-color: ${ iconBgColor };
					}

					.block-id-${ id } .row-1 section .icon{
						top: calc(15px - ${ ( iconBgSize - 40) / 2 }px);
        				right: calc(-60px - ${( iconBgSize - 40) / 2}px);
					}

					.block-id-${ id } .row-2 section .icon{
						top: calc(15px - ${ ( iconBgSize - 40) / 2 }px);
        				left: calc(-60px - ${( iconBgSize - 40) / 2}px);
					}

					

					.block-id-${ id }  .row section .icon, .block-id-${ id } .wrapper .scroll-icon{
						box-shadow: 0 0 0 ${iconBorderWidth}px ${iconBorderColor}, inset 0 2px 0 rgba(0,0,0,0.08), 0 3px 0 4px rgba(0,0,0,0.05);
					}

					.block-id-${ id } .wrapper .center-line, .block-id-${ id } .wrapper .center-line.left, .block-id-${ id } .wrapper .center-line.right{
						width: ${connectorThickness}px;
						background: ${connectorColor};
					}

					.block-id-${ id } .row section .details .title:hover{
						color: ${ headingHoverColor };
					}

					.block-id-${ id } .row section .details .title{
						color: ${ headingColor };
						font-size: ${ typoHSize }px;
						font-weight: ${ typoHWeight };
						text-transform: ${ typoHTransform };
						font-style: ${ typoHStyle };
						line-height: ${
							typoHLineHeight != 'normal'
								? `${ typoHLineHeight }px`
								: `normal`
						};;
						letter-spacing: ${
							typoHLetterSpacing != 'normal'
								? `${ typoHLetterSpacing }px`
								: `normal`
						};
						word-spacing: ${
							typoHWordSpacing != 'normal'
								? `${ typoHWordSpacing }px`
								: `normal`
						};
						
						text-decoration: ${ typoHDecoration };

					}
					
					.block-id-${ id } .row section .content{
						color: ${ contentColor };
						font-size: ${ typoCSize }px;
						font-weight: ${ typoCWeight };
						text-transform: ${ typoCTransform };
						font-style: ${ typoCStyle };
						line-height: ${
							typoCLineHeight != 'normal'
								? `${ typoCLineHeight }px`
								: `normal`
						};;
						letter-spacing: ${
							typoCLetterSpacing != 'normal'
								? `${ typoCLetterSpacing }px`
								: `normal`
						};
						word-spacing: ${
							typoCWordSpacing != 'normal'
								? `${ typoCWordSpacing }px`
								: `normal`
						};

						text-decoration: ${ typoCDecoration };


					}

					.block-id-${ id } .row section .content:hover{
						color: ${ contentHoverColor };
					}

					.block-id-${ id } .row section .author, .block-id-${ id } .row section .date{
						color: ${ contentColor };
					}
					.block-id-${ id } .row section .author:hover, .block-id-${ id } .row section .date:hover{
						color: ${ contentHoverColor };
					}

					.block-id-${ id } .row section .details, .block-id-${ id } .row section .bottom{
						${textAlign === 'rtl' ? 'flex-direction: row-reverse;' : 'flex-direction: row;'}
					}

					.block-id-${ id } .wrapper section .image-container{
						
						padding-left: ${ imagePadding?.left };
						padding-right: ${ imagePadding?.right };
						padding-top: ${ imagePadding?.top };
						padding-bottom: ${ imagePadding?.bottom };

						${
							effectBorderRadius?.topRight
								? `border-top-right-radius: ${ effectBorderRadius?.topRight }`
								: ``
						};
						${
							effectBorderRadius?.topLeft
								? `border-top-left-radius: ${ effectBorderRadius?.topLeft }`
								: ``
						};

						border-left: ${ effectBorder?.left?.width } ${ effectBorder?.left?.style } ${
							effectBorder?.left?.color
								? effectBorder?.left?.color
								: ''
						};
							border-right: ${ effectBorder?.right?.width } ${
								effectBorder?.right?.style
						} ${
							effectBorder?.right?.color
								? effectBorder?.right?.color
								: ''
						};
							border-top: ${ effectBorder?.top?.width } ${ effectBorder?.top?.style } ${
								effectBorder?.top?.color
								? effectBorder?.top?.color
								: ''
						};
						
						
					  }


					  .block-id-${ id } .wrapper section img{

						height: ${ imageHeight }px;

					  }

					  .block-id-${ id } .wrapper .row.row-1.right section .card-container, .block-id-${ id } .wrapper .row.row-1 section .card-container{
						margin-right: ${ gapItemMarker }px;
					  }

					  .block-id-${ id } .wrapper .row.row-2.left section .card-container, .block-id-${ id } .wrapper .row.row-2 section .card-container{
						margin-left: ${ gapItemMarker }px;
					  }

					  .block-id-${ id } .row-1 section .arrow-design {
						right: calc(-12px + ${ ( gapItemMarker) }px);
					  }

					  .block-id-${ id } .row-2 section .arrow-design {
						left: calc(-12px + ${ ( gapItemMarker) }px);
					  }
					`
				}
			</style>

			
			<div className={`wrapper ${layout==='leftright' ? 'middle': layout === 'left' ? 'left' : 'right'}`}>
				<div className={`center-line ${layout==='left' ? 'left' : layout ==='right' ? 'right' : ''}`}>
					<div className="scroll-icon">
						{parse(SVGIcons[ iconPick ])}
					</div>
				</div>
				{
					roadmapItems.map( ( item, index ) => {
					
						return(
							<div className={`row row-${layout === "left" ? '2 left' : layout === "right" ? '1 right' : (index % 2 == 0 ? '1' : '2')}`}>
								{/* <div className='arrow-right'></div> */}
								<section onMouseEnter={() => setRenderNavigate(index)}
								onMouseLeave={() => setRenderNavigate(-1)}
								>
									
										<div className='icon'>
											{item.icon && parse(SVGIcons[ item.icon ])}
										</div>
									
										<div>
											<div className="arrow-design"></div>
											<div className='card-container'>
													{index === renderNavigate && renderNavigationButtons(index)}
												{ displayImage && <figure  onMouseEnter={ () => {setDisplayPopup( true ) 
												setCurrentIndex(index)} }
														onMouseLeave={ () => setDisplayPopup( false ) }>
													<div className="editPopupContainer">
														{ (displayPopup && currentIndex === index && (item.url != "")) && (
															<div className="editPopup" onClick = {
																() => {
																	let newArr = [...roadmapItems];
																	let newItem = item;
																	newItem.url = "";
																		newArr[index] = newItem;
																		setAttributes( { roadmapItems: newArr} )
																}
															}>{ getIcon() }</div>
														) }
													</div>
													{ ( item.url ) && (
														<div className='image-container' 
														>
															<img src={item.url}/>
														</div>
														) }

														<MediaPlaceholder
															icon={ <BlockIcon icon={ icon } /> }
															onSelect={ 
																( media ) => {

																	
														
																	let newArr = [...roadmapItems];
																	let newItem = item;
														
																	if ( ! media || ! media.url ) {
																		
																		newItem.url = "https://cdn.discordapp.com/attachments/935982397986603088/937922868979859466/unknown.png";
																		newArr[index] = newItem;
																		setAttributes( { roadmapItems: newArr} )
															
																		return;
																	}
															
																	newItem.url = media.url;
																	newArr[index] = newItem;
																	setAttributes( { roadmapItems: newArr} )
														
																}
															}
															onSelectURL={ ( newURL) => {
																let newArr = [...roadmapItems];
																let newItem = item;
																
																if ( newURL !== item.url ) {
																	newItem.url = newURL;
																	newArr[index] = newItem;
																	setAttributes( { roadmapItems: newArr} )
																}
															} }
															onError={ ( message ) => {
																let newArr = [...roadmapItems];
																let newItem = item;
																createErrorNotice( message, { type: 'snackbar' } );
																newItem.url = "https://cdn.discordapp.com/attachments/935982397986603088/937922868979859466/unknown.png";
																newArr[index] = newItem;
																setAttributes( { roadmapItems: newArr} )
																
															} }
															placeholder={ placeholder }
															accept="image/*"
															allowedTypes={ [ 'image' ] }
															disableMediaButtons={ item.url }
														/>	
												</figure>}
												<div className={`card-content${ !displayImage ? '':'img'}`}>
												<div className="details">
													<RichText
														tagName={ titleTag }
														value={ item.title }
														onChange={ ( currentTitle ) => {
															let newArr = [...roadmapItems];
															let newItem = item;
															newItem.title = currentTitle;
															newArr[index] = newItem;
															setAttributes( { roadmapItems: newArr} ) 
														}}
														placeholder={ __( 'Title...' ) }
														className='title'
													/>
													{displayDate && <RichText
														tagName={ 'span' }
														value={ item.date }
														onChange={ ( currentDate ) => {
															let newArr = [...roadmapItems];
															let newItem = item;
															newItem.date = currentDate;
															newArr[index] = newItem;
															setAttributes( { roadmapItems: newArr} )
														}}
														placeholder={ __( 'Date...' ) }
														className='date'
													/>}
												</div>
												<RichText
													tagName={ contentTag }
													value={ item.content }
													onChange={ ( currentContent ) => {
														let newArr = [...roadmapItems];
														let newItem = item;
														newItem.content = currentContent;
														newArr[index] = newItem;
														setAttributes( { roadmapItems: newArr} )
													}}
													placeholder={ __( 'Content...' ) }
													className='content'
												/>
												<div className='bottom'>
													<div onMouseEnter={() => setRenderLinkInsert(index)}>
														{index === renderLinkInsert && renderLinkInserter(item, index)}
														{displayButton && <RichText
															tagName={ 'div' }
															value={ item.linkText }
															onChange={ ( currentLinkText ) => {
																let newArr = [...roadmapItems];
																let newItem = item;
																newItem.linkText = currentLinkText;
																newArr[index] = newItem;
																setAttributes( { roadmapItems: newArr} )
															}}
															placeholder={ __( 'Read More...' ) }
															className='link-text'
															
														/>}
													</div>

													{displayAuthor && 
													<RichText
														tagName={ 'i' }
														value={ item.author }
														onChange={ ( currentAuthor ) => {
															let newArr = [...roadmapItems];
															let newItem = item;
															newItem.author = currentAuthor;
															newArr[index] = newItem;
															setAttributes( { roadmapItems: newArr} )
														}}
														placeholder={ __( '- Author' ) }
														className='author'
													/>}

													</div>
												</div>
											</div>

										</div>
								</section>
							</div>
						)
					
					})
				}
				
			</div>
			<Button variant="primary" className='add-item'
			onClick={handleAddButton}
			>Add On</Button>
		</div>
	)

}
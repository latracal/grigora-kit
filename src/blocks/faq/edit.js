import classnames from 'classnames';
import { createBlock } from '@wordpress/blocks';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {
	TabPanel as WTabPanel,
} from '@wordpress/components';
import InspectorTabs from '@components/inspector-tabs';
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
	PanelBody,
	ToggleControl,
	ToolbarButton,
	Popover,
	Button,
	Icon,
	Tooltip,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';

import SVGIcons from '@constants/icons.json';

import {
	HOVER_ANIMATIONS,
	ENTRANCE_ANIMATIONS,
	ICON_POSITIONS,
	TEXT_TRANSFORMS,
	TEXT_STYLE,
	TEXT_DECORATION,
	FONT_WEIGHTS,
} from '@constants';

import {
	alignLeft,
	alignRight,
	alignJustify,
	link,
	linkOff,
} from '@wordpress/icons';
import { useState, useRef, useEffect } from '@wordpress/element';
import { displayShortcut } from '@wordpress/keycodes';

import parse from 'html-react-parser';

import generateId from '@helpers/generateId';
import uniqueIDs from '@helpers/uniqueID';
import IconPicker from '@components/icon-picker';
import GrigoraRangeInput from '@components/range-input';
import GrigoraSelectInput from '@components/select-input';
import GrigoraColorInput from '@components/color-input';
import GrigoraBorderBoxInput from '@components/borderbox-input';
import GrigoraBorderRadiusInput from '@components/borderradius-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraBoxInput from '@components/box-input';
import GrigoraToggleInput from '@components/toggle-input';
import GrigoraFontFamilyInput from '@components/fontfamily-input';
import GrigoraFaqInput from './faq-input';



export default function Edit( props ) {
	const {
		attributes,
		setAttributes,
		mergeBlocks,
		onReplace,
		onRemove,
		clientId,
	} = props;

	//Popover

	const [ openPopOver, setOpenPopOver ] = useState( true );
	function toggleEditing() {
		setOpenPopOver( ! openPopOver );
	}



	const [ panelOpen, setPanelOpen ] = useState( {
		typography: false,
		cbe: false,
		textshadow: false,
		layout: false,
		icon: false,
		onscroll: false,
	} );

	function closePanels( panel ) {
		const temp = { ...panelOpen };
		temp[ 'typography' ] = false;
		temp[ 'cbe' ] = false;
		temp[ 'textshadow' ] = false;
		temp[ 'layout' ] = false;
		temp[ 'icon' ] = false;
		temp[ 'onscroll' ] = false;
		temp[ panel ] = ! panelOpen[ panel ];
		setPanelOpen( temp );
	}

	const ref = useRef();

	const { 
		id,
		faqs,
		structureTagAn,
		titleTag,
		faqSchema,
		closedIcon,
		openedIcon,
		effectNBorder,
		effectNBorderRadius,
		spaceBwContainer,
		effectNShadowBlur,
		effectNShadowSpread,
		effectNShadowColor,
		effectNShadowHO,
		effectNShadowVO,
		titleColor,
		titleActiveColor,
		titleBgColor,
		titleTypoSize,
		titleTypoWeight,
		titleTypoTransform,
		titleTypoStyle,
		titleTypoDecoration,
		titleTypoLineHeight,
		titleTypoLetterSpacing,
		titleTypoWordSpacing,
		titleTypoFontFamily,
		titlePadding,
		contentColor,
		contentBgColor,
		contentTypoSize,
		contentTypoWeight,
		contentTypoTransform,
		contentTypoStyle,
		contentTypoDecoration,
		contentTypoLineHeight,
		contentTypoLetterSpacing,
		contentTypoWordSpacing,
		contentTypoFontFamily,
		contentPadding,
		iconAlign,
		iconColor,
		iconActiveColor,
		entranceAnimation,
		transitionTime,

	
	} = attributes;

	function renderSingleIcon(hide) {

		
		if(hide)
		{
			if ( closedIcon && SVGIcons[ closedIcon ] ) {
			const icon_parsed = parse( SVGIcons[ closedIcon ] );
			return icon_parsed;
			}
		else
		{
			return parse(
				SVGIcons['chevron-double-down']
			);
		}
		}
		else{
			if ( openedIcon && SVGIcons[ openedIcon ] ) {
				const icon_parsed = parse( SVGIcons[ openedIcon ] );
				return icon_parsed;
				}
			else
			{
				return parse(
					SVGIcons['chevron-compact-up']
				);
			}
		}
	}

	function renderDeleteIcon(){
		return parse(
			SVGIcons['x-square']
		);
	}

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'faq' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'faq' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
		console.log(closedIcon)
	}, [] );


	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-faq': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );


	const faqClass = classnames( {
		[ `block-id-${ id }` ]: id,
		[ `animateOnce` ]: entranceAnimation != 'none',
	} );

	function colorTitleNormalRender(){
		return (
			<>
				<GrigoraColorInput
											label={ __( 'Text Color', 'grigora-kit' ) }
											value={ titleColor }
											onChange={ ( titleColor ) =>
												setAttributes( { titleColor } )
											}
											resetValue={ '#000' }
										/>
			
			</>
		)
	}


	function colorTitleActiveRender(){
		return (
			<>
				<GrigoraColorInput
											label={ __( 'Active Text Color', 'grigora-kit' ) }
											value={ titleActiveColor }
											onChange={ ( titleActiveColor ) =>
												setAttributes( { titleActiveColor } )
											}
											resetValue={ '#000' }
										/>
			
			</>
		)
	}


	const handleDeleteButton = ( fid ) => {
		const newFaqs = faqs.filter( ( faq ) => faq.id !== fid );
		setAttributes( { faqs: newFaqs } );
	}

	const handleAddButton = () => {
		const tempID = generateId( 'faqAdd' );
		setAttributes( { faqs: [ ...faqs, { id: tempID, question: '', answer: '', hide: false } ] } );
	}

	const TITLE_TAG = [
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
			label: __( 'h6', 'grigora-kit' ),
			value: 'h6',
		},
		{
			label: __( 'Custom div', 'grigora-kit' ),
			value: 'div',
		},
		{
			label: __( 'p', 'grigora-kit' ),
			value: 'p',
		},
	];

	function setActiveOpenIcon( openedIcon ) {
		setAttributes( { openedIcon } );
	}

	function setActiveCloseIcon( closedIcon ) {
		setAttributes( { closedIcon } );
	}

	function generalSettings(){
		return (
		<>
			<Spacer marginBottom={ 0 } paddingX={ 3 } paddingY={ 3 }>
					<GrigoraSelectInput
								label={ __( 'Title HTML Tag', 'grigora-kit' ) }
								onChange={ ( titleTag ) =>{
									setAttributes( { titleTag } )
									setAttributes( { titleTypoSize: 'normal' } )
								}
								}
								value={ titleTag }
								resetValue={ 'h2' }
								options={ TITLE_TAG }
					/>
			

					<GrigoraToggleInput
						label={ __( 'FAQ Schema', 'grigora-kit' ) }
						onChange={ ( faqSchema ) => {
							setAttributes( { faqSchema } );
						} }
						value={ faqSchema }
						resetValue={ false }
						help={ __( 'Choose the FAQ Schema you would like your website to have.', 'grigora-kit' ) }
					/>

					<h3>Opened Icon</h3>
					<IconPicker
						activeIcon={ closedIcon }
						setActiveIcon={ setActiveCloseIcon }
					/>

					
					
					<br/>
					
					<h3>Closed Icon</h3>
					<IconPicker
						activeIcon={ openedIcon }
						setActiveIcon={ setActiveOpenIcon }
					/>

			</Spacer>
			

			
		</>)
	}

	function stylesSettings(){
		return(
			<>
			
			<PanelBody
					title={ __( 'Container', 'grigora-kit' ) }
					initialOpen={ false }
				>

					<GrigoraBorderBoxInput
						label={ __( 'Border width', 'grigora-kit' ) }
						onChange={ ( effectNBorder ) => {
							if ( ! effectNBorder.top ) {
								setAttributes( {
									effectNBorder: {
										top: effectNBorder,
										bottom: effectNBorder,
										right: effectNBorder,
										left: effectNBorder,
									},
								} );
							} else {
								setAttributes( { effectNBorder } );
							}
						} }
						value={ effectNBorder }
						resetValue={ {
							top: {
								color: '#72aee6',
								style: 'dashed',
								width: '0px',
							},
							bottom: {
								color: '#72aee6',
								style: 'dashed',
								width: '0px',
							},
							right: {
								color: '#72aee6',
								style: 'dashed',
								width: '0px',
							},
							left: {
								color: '#72aee6',
								style: 'dashed',
								width: '0px',
							},
						} }
					/>
					<br></br>
					<GrigoraBorderRadiusInput
						label={ __( 'Radius', 'grigora-kit' ) }
						onChange={ ( effectNBorderRadius ) => {
							if (
								typeof effectNBorderRadius === 'string' ||
								effectNBorderRadius instanceof String
							) {
								setAttributes( {
									effectNBorderRadius: {
										topLeft: effectNBorderRadius,
										topRight: effectNBorderRadius,
										bottomLeft: effectNBorderRadius,
										bottomRight: effectNBorderRadius,
									},
								} );
							} else {
								setAttributes( { effectNBorderRadius } );
							}
						} }
						values={ effectNBorderRadius }
						resetValue={ {
							topLeft: '4px',
							topRight: '4px',
							bottomLeft: '4px',
							bottomRight: '4px',
						} }
					/>

					<GrigoraBorderRadiusInput
						label={ __( 'Space Between Containers', 'grigora-kit' ) }
						onChange={ ( spaceBwContainer ) => {
							
								setAttributes( { spaceBwContainer } );
							}
						} 
						values={ spaceBwContainer }
						resetValue={ '20px' }
					/>

				<PanelBody
					title={ __( 'Box Shadow', 'grigora-kit' ) }
					initialOpen={ false }
					className={ `grigora-inside-panel` }
				>
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
							label={ __( 'Horizontal', 'grigora-kit' ) }
							value={ effectNShadowHO }
							onChange={ ( effectNShadowHO ) =>
								setAttributes( { effectNShadowHO } )
							}
							resetValue={ '0px' }
						/>
						<GrigoraUnitInput
							label={ __( 'Vertical', 'grigora-kit' ) }
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
								setAttributes( { effectNShadowBlur } )
							}
							resetValue={ '0px' }
						/>
						<GrigoraUnitInput
							label={ __( 'Spread', 'grigora-kit' ) }
							value={ effectNShadowSpread }
							onChange={ ( effectNShadowSpread ) =>
								setAttributes( { effectNShadowSpread } )
							}
							resetValue={ '0px' }
						/>
					</HStack>
				</PanelBody>
			</PanelBody>
				<PanelBody
					title={ __( 'Title', 'grigora-kit' ) }
					initialOpen={ false }
				>

					<WTabPanel
						className="grigora-effects-settings"
						tabs={ [
							{
								name: 'Normal',
								title: __( 'Normal', 'grigora-kit' ),
								className: 'tab-normal',
							},
							{
								name: 'Active',
								title: __( 'Active', 'grigora-kit' ),
								className: 'tab-hover',
							},
						] }
					>
						{ ( tab ) => {
							if ( tab.name == 'Normal' ) {
								return colorTitleNormalRender();
							} else {
								return colorTitleActiveRender();
							}
						} }
					</WTabPanel>
					
					
					

					<GrigoraColorInput
						label={ __( 'Background Color', 'grigora-kit' ) }
						value={ titleBgColor }
						onChange={ ( titleBgColor ) =>
							setAttributes( { titleBgColor } )
						}
						resetValue={ '#f5f5f5' }
					/>
					<br></br>

					{
						faqSchema && (
						<Popover
						position="bottom center"
						onClose={ () => {
							setOpenPopOver( false );
						} }
						anchorRef={ ref?.current }
						focusOnMount={ faqSchema ? 'firstElement' : false }
						__unstableSlotName={ '__unstable-block-tools-after' }
						>

						<div className="popover-link-controls">
							<GrigoraRangeInput
							value={ titleTypoSize }
							setValue={ ( titleTypoSize ) => {
								setAttributes( { titleTypoSize } );
							} }
							label={ `Size` }
							resetValue={ 'normal' }
							/>
							<GrigoraRangeInput
								value={ titleTypoLineHeight }
								setValue={ ( titleTypoLineHeight ) => {
									setAttributes( {
										titleTypoLineHeight: titleTypoLineHeight.toString(),
									} );
								} }
								label={ `Line Height` }
								min={ 10 }
								max={ 300 }
								resetValue={ 'normal' }
							/>
						</div>

						</Popover>
						)
					}


					<PanelBody
					title={ __( 'Typography', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraRangeInput
						value={ titleTypoSize }
						setValue={ ( titleTypoSize ) => {
							setAttributes( { titleTypoSize } );
						} }
						label={ `Size` }
						resetValue={ 'normal' }
					/>
					<GrigoraRangeInput
						value={ titleTypoLineHeight }
						setValue={ ( titleTypoLineHeight ) => {
							setAttributes( {
								titleTypoLineHeight: titleTypoLineHeight.toString(),
							} );
						} }
						label={ `Line Height` }
						min={ 10 }
						max={ 300 }
						resetValue={ 'normal' }
					/>
					<GrigoraRangeInput
						value={ titleTypoLetterSpacing }
						setValue={ ( titleTypoLetterSpacing ) => {
							setAttributes( {
								titleTypoLetterSpacing: titleTypoLetterSpacing.toString(),
							} );
						} }
						label={ `Letter Spacing` }
						min={ 0 }
						max={ 150 }
						resetValue={ 'normal' }
					/>
					<GrigoraRangeInput
						value={ titleTypoWordSpacing }
						setValue={ ( titleTypoWordSpacing ) => {
							setAttributes( {
								titleTypoWordSpacing: titleTypoWordSpacing.toString(),
							} );
						} }
						label={ `Word Spacing` }
						min={ 0 }
						max={ 150 }
						resetValue={ 'normal' }
					/>
					<br></br>
					<HStack spacing={ 2 } className="grigora-dropdown-hstack">
						<GrigoraSelectInput
							label={ __( 'Transform', 'grigora-kit' ) }
							onChange={ ( titleTypoTransform ) =>
								setAttributes( { titleTypoTransform } )
							}
							value={ titleTypoTransform }
							resetValue={ 'none' }
							options={ TEXT_TRANSFORMS }
						/>
						<GrigoraSelectInput
							label={ __( 'Style', 'grigora-kit' ) }
							onChange={ ( titleTypoStyle ) =>
								setAttributes( { titleTypoStyle } )
							}
							value={ titleTypoStyle }
							resetValue={ 'normal' }
							options={ TEXT_STYLE }
						/>
					</HStack>
					<HStack spacing={ 2 } className="grigora-dropdown-hstack">
						<GrigoraSelectInput
							label={ __( 'Decoration', 'grigora-kit' ) }
							onChange={ ( titleTypoDecoration ) =>
								setAttributes( { titleTypoDecoration } )
							}
							value={ titleTypoDecoration }
							resetValue={ 'initial' }
							options={ TEXT_DECORATION }
						/>
						<GrigoraSelectInput
							label={ __( 'Weight', 'grigora-kit' ) }
							onChange={ ( titleTypoWeight ) =>
								setAttributes( { titleTypoWeight } )
							}
							value={ titleTypoWeight }
							resetValue={ 'default' }
							options={ [
								{
									label: 'Default',
									value: 'default',
								},
							].concat(
								FONT_WEIGHTS.map( ( obj ) => {
									return {
										label: obj,
										value: obj,
									};
								} )
							) }
						/>
					</HStack>
					<GrigoraFontFamilyInput
						label={ __( 'Font Family:', 'grigora-kit' ) }
						labelPosition="side"
						onChange={ ( titleTypoFontFamily ) =>
							setAttributes( { titleTypoFontFamily } )
						}
						value={ titleTypoFontFamily }
						resetValue={ '' }
					/>
				</PanelBody>
					<br></br>
				<GrigoraBoxInput
						label={ __( 'Padding', 'grigora-kit' ) }
						onChange={ ( titlePadding ) =>
							setAttributes( { titlePadding } )
						}
						values={ titlePadding }
						resetValue={ {
							top: '15px',
							bottom: '15px',
							left: '30px',
							right: '30px',
						} }
				/>

				</PanelBody>

				<PanelBody title={ __( 'Content', 'grigora-kit' ) } initialOpen={ false }>

					<GrigoraColorInput
						label={ __( 'Text Color', 'grigora-kit' ) }
						value={ contentColor }
						onChange={ ( contentColor ) =>
							setAttributes( { contentColor } )
						}
						resetValue={ '#000' }
					/>
					

					<GrigoraColorInput
						label={ __( 'Background Color', 'grigora-kit' ) }
						value={ contentBgColor }
						onChange={ ( contentBgColor ) =>
							setAttributes( { contentBgColor } )
						}
						resetValue={ '#f5f5f5' }
					/>
					<br></br>

					
					

					<PanelBody
					title={ __( 'Typography', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraRangeInput
						value={ contentTypoSize }
						setValue={ ( contentTypoSize ) => {
							setAttributes( { contentTypoSize } );
						} }
						label={ `Size` }
						resetValue={ 16 }
					/>
					<GrigoraRangeInput
						value={ contentTypoLineHeight }
						setValue={ ( contentTypoLineHeight ) => {
							setAttributes( {
								contentTypoLineHeight: contentTypoLineHeight.toString(),
							} );
						} }
						label={ `Line Height` }
						min={ 10 }
						max={ 300 }
						resetValue={ 'normal' }
					/>
					<GrigoraRangeInput
						value={ contentTypoLetterSpacing }
						setValue={ ( contentTypoLetterSpacing ) => {
							setAttributes( {
								contentTypoLetterSpacing: contentTypoLetterSpacing.toString(),
							} );
						} }
						label={ `Letter Spacing` }
						min={ 0 }
						max={ 150 }
						resetValue={ 'normal' }
					/>
					<GrigoraRangeInput
						value={ contentTypoWordSpacing }
						setValue={ ( contentTypoWordSpacing ) => {
							setAttributes( {
								contentTypoWordSpacing: contentTypoWordSpacing.toString(),
							} );
						} }
						label={ `Word Spacing` }
						min={ 0 }
						max={ 150 }
						resetValue={ 'normal' }
					/>
					<br></br>
					<HStack spacing={ 2 } className="grigora-dropdown-hstack">
						<GrigoraSelectInput
							label={ __( 'Transform', 'grigora-kit' ) }
							onChange={ ( contentTypoTransform ) =>
								setAttributes( { contentTypoTransform } )
							}
							value={ contentTypoTransform }
							resetValue={ 'none' }
							options={ TEXT_TRANSFORMS }
						/>
						<GrigoraSelectInput
							label={ __( 'Style', 'grigora-kit' ) }
							onChange={ ( contentTypoStyle ) =>
								setAttributes( { contentTypoStyle } )
							}
							value={ contentTypoStyle }
							resetValue={ 'normal' }
							options={ TEXT_STYLE }
						/>
					</HStack>
					<HStack spacing={ 2 } className="grigora-dropdown-hstack">
						<GrigoraSelectInput
							label={ __( 'Decoration', 'grigora-kit' ) }
							onChange={ ( contentTypoDecoration ) =>
								setAttributes( { contentTypoDecoration } )
							}
							value={ contentTypoDecoration }
							resetValue={ 'initial' }
							options={ TEXT_DECORATION }
						/>
						<GrigoraSelectInput
							label={ __( 'Weight', 'grigora-kit' ) }
							onChange={ ( contentTypoWeight ) =>
								setAttributes( { contentTypoWeight } )
							}
							value={ contentTypoWeight }
							resetValue={ 'default' }
							options={ [
								{
									label: 'Default',
									value: 'default',
								},
							].concat(
								FONT_WEIGHTS.map( ( obj ) => {
									return {
										label: obj,
										value: obj,
									};
								} )
							) }
						/>
					</HStack>
					<GrigoraFontFamilyInput
						label={ __( 'Font Family:', 'grigora-kit' ) }
						labelPosition="side"
						onChange={ ( contentTypoFontFamily ) =>
							setAttributes( { contentTypoFontFamily } )
						}
						value={ contentTypoFontFamily }
						resetValue={ '' }
					/>
					</PanelBody>


					

				<br></br>

				<GrigoraBoxInput
						label={ __( 'Padding', 'grigora-kit' ) }
						onChange={ ( contentPadding ) =>
							setAttributes( { contentPadding } )
						}
						values={ contentPadding }
						resetValue={ {
							top: '15px',
							bottom: '15px',
							left: '30px',
							right: '30px',
						} }
				/>
				
				</PanelBody>

				<PanelBody title={ __( 'Icon', 'grigora-kit' ) } initialOpen={ false }>

					<h3>Align Icon</h3>
					<div class={'align-editor'}>
										
						<div style={{marginRight: '15px'}} onClick={() => setAttributes({iconAlign: 1})}>
							{parse(
								SVGIcons['align-start'],
							)}
						</div>
						<div onClick={() => setAttributes({iconAlign: 4})}>
							{parse(
								SVGIcons['align-end']
							)}
						</div>
					</div>

					<GrigoraColorInput
						label={ __( 'Text Color', 'grigora-kit' ) }
						value={ iconColor }
						onChange={ ( iconColor ) =>
							setAttributes( { iconColor } )
						}
						resetValue={ '#000' }
					/>
					
					<GrigoraColorInput
						label={ __( 'Active Text Color', 'grigora-kit' ) }
						value={ iconActiveColor }
						onChange={ ( iconActiveColor ) =>
							setAttributes( { iconActiveColor } )
						}
						resetValue={ '#000' }
					/>


				</PanelBody>
						


			

			</>
		)
	}

	function advancedSettings(){

		return ( <>
			<PanelBody
					title={ __( 'On Scroll', 'grigora-kit' ) }
					initialOpen={ false }
					opened={ panelOpen[ 'onscroll' ] }
					onToggle={ () => {
						closePanels( 'onscroll' );
					} }
				>
					<br></br>
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
					<GrigoraRangeInput
						label={ __( 'Transition Time', 'grigora-kit' ) }
						max={ 5 }
						min={ 0.1 }
						unit={ 'sec' }
						step={ 0.1 }
						setValue={ ( transitionTime ) =>
							setAttributes( { transitionTime } )
						}
						value={ transitionTime }
						resetValue={ 1 }
					/>
			</PanelBody>
		</>)
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
				.block-id-${ id } {


					${
						entranceAnimation != 'none'
							? `
					.block-id-${ id }.animateOnce {
						animation: ${ entranceAnimation } ${ transitionTime }s;
					}
					`
							: ``
					}
				}

				
				

				.block-id-${ id } .faq-block {

					border-left: ${ effectNBorder?.left?.width } ${ effectNBorder?.left?.style } ${
						effectNBorder?.left?.color
							? effectNBorder?.left?.color
							: ''
					};
					border-right: ${ effectNBorder?.right?.width } ${
						effectNBorder?.right?.style
					} ${
						effectNBorder?.right?.color
							? effectNBorder?.right?.color
							: ''
					};
					border-top: ${ effectNBorder?.top?.width } ${ effectNBorder?.top?.style } ${
						effectNBorder?.top?.color
							? effectNBorder?.top?.color
							: ''
					};
					border-bottom: ${ effectNBorder?.bottom?.width } ${
						effectNBorder?.bottom?.style
					} ${
						effectNBorder?.bottom?.color
							? effectNBorder?.bottom?.color
							: ''
					};

					border-top-right-radius: ${ effectNBorderRadius?.topRight };
					border-top-left-radius: ${ effectNBorderRadius?.topLeft };
					border-bottom-right-radius: ${ effectNBorderRadius?.bottomRight };
					border-bottom-left-radius: ${ effectNBorderRadius?.bottomLeft };
				
					margin-bottom: ${ spaceBwContainer };

					box-shadow: ${ effectNShadowHO } ${ effectNShadowVO } ${ effectNShadowBlur } ${ effectNShadowSpread } ${ effectNShadowColor };
					

				}


				.block-id-${ id } .faq-head {
				
					display: flex;
					justify-content: space-between;
					align-items: center;
					background-color: ${ titleBgColor };

				}

				

				.block-id-${ id } .hide-button{
					height: 30px;
					width: 30px;
					margin-right: 10px;
					color: ${ iconColor };
					order: ${ iconAlign };
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.block-id-${ id } .faq-question-container {
					order: 2;
					width: 100%;
					color: ${ titleColor };
				}
				
				.block-id-${ id } .faq-question{
					font-size: ${ titleTypoSize }px;
					font-weight: ${ titleTypoWeight };
					text-transform: ${ titleTypoTransform };
					font-style: ${ titleTypoStyle };
					text-decoration: ${ titleTypoDecoration };
					line-height: ${
						titleTypoLineHeight != 'normal'
							? `${ titleTypoLineHeight }px`
							: `normal`
					};;
					letter-spacing: ${
						titleTypoLetterSpacing != 'normal'
							? `${ titleTypoLetterSpacing }px`
							: `normal`
					};
					word-spacing: ${
						titleTypoWordSpacing != 'normal'
							? `${ titleTypoWordSpacing }px`
							: `normal`
					};
					font-family: ${ titleTypoFontFamily ? titleTypoFontFamily : '' };

					padding-left: ${ titlePadding?.left };
					padding-right: ${ titlePadding?.right };
					padding-top: ${ titlePadding?.top };
					padding-bottom: ${ titlePadding?.bottom };
					margin: 0

				}

				.block-id-${ id } .faq-answer{
					width: 100%;
					color: ${ contentColor };
					background-color: ${ contentBgColor };

					font-size: ${ contentTypoSize }px;
					font-weight: ${ contentTypoWeight };
					text-transform: ${ contentTypoTransform };
					font-style: ${ contentTypoStyle };
					text-decoration: ${ contentTypoDecoration };
					line-height: ${
						contentTypoLineHeight != 'normal'
							? `${ contentTypoLineHeight }px`
							: `normal`
					};;
					letter-spacing: ${
						contentTypoLetterSpacing != 'normal'
							? `${ contentTypoLetterSpacing }px`
							: `normal`
					};
					word-spacing: ${
						contentTypoWordSpacing != 'normal'
							? `${ contentTypoWordSpacing }px`
							: `normal`
					};
					font-family: ${ contentTypoFontFamily ? contentTypoFontFamily : '' };

					padding-left: ${ contentPadding?.left };
					padding-right: ${ contentPadding?.right };
					padding-top: ${ contentPadding?.top };
					padding-bottom: ${ contentPadding?.bottom };
					margin: 0
				}

				` }
			</style>
			
			<div className={faqClass}>
				<div className='faq-container'>
					{
						faqs.map( ( faq, index ) => {
							return(
						
						<GrigoraFaqInput
							
							structureTagQn = { titleTag }
							structureTagAn = { structureTagAn }
							faq = { faq }
							faqs = {faqs}
							mergeBlocks = { mergeBlocks }
							onReplace = { onReplace }
							onRemove = { onRemove }
							setAttributes = { setAttributes }
							handleDeleteButton = { handleDeleteButton }
							renderSingleIcon = { renderSingleIcon }
							renderDeleteIcon = { renderDeleteIcon }
							iconActiveColor = { iconActiveColor }
							titleActiveColor = { titleActiveColor }
							contentColor = { contentColor }
			
						/>
						)
						}
					)
					}
				</div>
			</div>
			
			<br></br>
			<Button variant="primary" onClick={handleAddButton}>Add On</Button>
	</div>

	);
}

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
	ToolbarButton,
	ToggleControl,
	Popover,
	Button,
	Tooltip,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';
import {
	alignLeft,
	alignRight,
	alignCenter,
	alignJustify,
	link,
	linkOff,
} from '@wordpress/icons';
import { displayShortcut } from '@wordpress/keycodes';

import parse from 'html-react-parser';

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
import IconPicker from '@components/icon-picker';
import GrigoraRangeInput from '@components/range-input';
import GrigoraSelectInput from '@components/select-input';
import GrigoraColorInput from '@components/color-input';
import GrigoraGradientInput from '@components/gradient-input';
import GrigoraBorderBoxInput from '@components/borderbox-input';
import GrigoraBorderRadiusInput from '@components/borderradius-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraBoxInput from '@components/box-input';
import GrigoraFontFamilyInput from '@components/fontfamily-input';
import SVGIcons from '@constants/icons.json';
import Googlefontloader from '@components/googlefontloader';

import InspectorTabs from '@components/inspector-tabs';

export default function Edit( props ) {
	const { attributes, setAttributes, isSelected } = props;

	const {
		id,
		content,
		url,
		opensInNewTab,
		urlnofollow,
		urlnoreferrer,
		urlsponsored,
		typoSize,
		typoWeight,
		typoTransform,
		typoStyle,
		typoDecoration,
		typoLineHeight,
		typoLetterSpacing,
		typoWordSpacing,
		typoFontFamily,
		align,
		textShadowColor,
		textShadowBlur,
		textShadowHorizontal,
		textShadowVertical,
		layoutPadding,
		layoutVerticalAlign,
		layoutPosition,
		effectNColor,
		effectNBFlag,
		effectNBGradient,
		effectNBColor,
		effectNPerspective,
		effectNRotateX,
		effectNRotateY,
		effectNRotateZ,
		effectNSkewX,
		effectNSkewY,
		effectNOffsetX,
		effectNOffsetY,
		effectNScale,
		effectNBorder,
		effectNBorderRadius,
		effectNShadowHO,
		effectNShadowVO,
		effectNShadowBlur,
		effectNShadowSpread,
		effectNShadowColor,
		effectHAnimation,
		hoverAnimationTime,
		effectHColor,
		effectHBGradient,
		effectHBColor,
		transitionTime,
		effectHPerspective,
		effectHRotateX,
		effectHRotateY,
		effectHRotateZ,
		effectHSkewX,
		effectHSkewY,
		effectHOffsetX,
		effectHOffsetY,
		effectHScale,
		effectHBorder,
		effectHBorderRadius,
		effectHShadowHO,
		effectHShadowVO,
		effectHShadowBlur,
		effectHShadowSpread,
		effectHShadowColor,
		entranceAnimation,
		entranceAnimationTime,
		icon,
		iconSize,
		iconPosition,
		iconPadding,
		iconColorFlag,
		iconNormalColor,
		iconHoverColor,
	} = attributes;

	const isURLSet = !! url;

	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const [ openPopOver, setOpenPopOver ] = useState( false );

	const ref = useRef();

	useEffect( () => {
		// id
		if ( ! id ) {
			const tempID = generateId( 'button' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'button' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-button-wrapper': true,
			[ `grigora-button-align-${ align }` ]: align,
		} ),
		style: {},
	} );

	const buttonClass = classnames( {
		'grigora-kit-button': true,
		[ `block-id-${ id }` ]: id,
		[ `animateOnce` ]: entranceAnimation != 'none',
	} );

	const DEFAULT_ALIGNMENT_CONTROLS = [
		{
			icon: alignLeft,
			title: __( 'Align button left' ),
			align: 'left',
		},
		{
			icon: alignCenter,
			title: __( 'Align button center' ),
			align: 'center',
		},
		{
			icon: alignRight,
			title: __( 'Align button right' ),
			align: 'right',
		},
		{
			icon: alignJustify,
			title: __( 'Align button full' ),
			align: 'justify',
		},
	];

	function toggleEditing() {
		setOpenPopOver( ! openPopOver );
		setIsEditingURL( ! isEditingURL );
	}

	function setActiveIcon( icon ) {
		setAttributes( { icon } );
	}

	function effectIconNormalRender() {
		return (
			<>
				<GrigoraColorInput
					label={ __( 'Icon Color', 'grigora-kit' ) }
					value={ iconNormalColor }
					onChange={ ( iconNormalColor ) =>
						setAttributes( { iconNormalColor } )
					}
					resetValue={ '#000' }
				/>
			</>
		);
	}

	function effectIconHoverRender() {
		return (
			<>
				<GrigoraColorInput
					label={ __( 'Icon Color', 'grigora-kit' ) }
					value={ iconHoverColor }
					onChange={ ( iconHoverColor ) =>
						setAttributes( { iconHoverColor } )
					}
					resetValue={ '' }
				/>
			</>
		);
	}

	function renderSingleIcon() {
		if ( icon && SVGIcons[ icon ] ) {
			const icon_parsed = parse( SVGIcons[ icon ] );

			return icon_parsed;
		}

		return null;
	}

	function generalSettings() {
		return (
			<>
				<Spacer marginBottom={ 0 } paddingX={ 4 } paddingY={ 3 }>
					<>
						<GrigoraRangeInput
							value={ typoSize }
							setValue={ ( typoSize ) => {
								setAttributes( { typoSize } );
							} }
							label={ `Size` }
							resetValue={ 16 }
						/>
						<GrigoraBoxInput
							label={ __( 'Padding', 'grigora-kit' ) }
							onChange={ ( layoutPadding ) =>
								setAttributes( { layoutPadding } )
							}
							values={ layoutPadding }
							resetValue={ {
								top: '15px',
								bottom: '15px',
								left: '30px',
								right: '30px',
							} }
						/>
					</>
				</Spacer>
				<PanelBody
					title={ __( 'Icon', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<IconPicker
						activeIcon={ icon }
						setActiveIcon={ setActiveIcon }
					/>
					{ icon && (
						<>
							<br></br>
							<HStack
								spacing={ 2 }
								className="grigora-dropdown-hstack dropdown-component-margin-0"
							>
								<GrigoraUnitInput
									label="Size"
									onChange={ ( iconSize ) =>
										setAttributes( { iconSize } )
									}
									value={ iconSize }
									resetValue={ '26px' }
								/>
								<GrigoraSelectInput
									label={ __( 'Position: ', 'grigora-kit' ) }
									labelPosition="top"
									onChange={ ( iconPosition ) =>
										setAttributes( { iconPosition } )
									}
									value={ iconPosition }
									options={ ICON_POSITIONS }
									resetValue={ 'left' }
								/>
							</HStack>
							<br></br>
							<GrigoraBoxInput
								label={ __( 'Icon Padding', 'grigora-kit' ) }
								onChange={ ( iconPadding ) =>
									setAttributes( { iconPadding } )
								}
								values={ iconPadding }
								resetValue={ {
									top: '0px',
									bottom: '0px',
									left: '5px',
									right: '5px',
								} }
							/>
							<ToggleControl
								label={ __( 'Icon Color', 'grigora-kit' ) }
								checked={ !! iconColorFlag }
								onChange={ () =>
									setAttributes( {
										iconColorFlag: ! iconColorFlag,
									} )
								}
							/>
							{ iconColorFlag && (
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
										<>{ effectIconNormalRender() }</>
									</TabPanel>
									<TabPanel>
										<>{ effectIconHoverRender() }</>
									</TabPanel>
								</Tabs>
							) }
						</>
					) }
				</PanelBody>
			</>
		);
	}

	function stylesSettings() {
		return (
			<>
				<PanelBody title={ __( 'Colors', 'grigora-kit' ) }>
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
									label={ __( 'Text', 'grigora-kit' ) }
									value={ effectNColor }
									onChange={ ( effectNColor ) =>
										setAttributes( { effectNColor } )
									}
									resetValue={ '#fff' }
								/>
								<ToggleControl
									label={ __(
										'Use Gradient Background',
										'grigora-kit'
									) }
									checked={ !! effectNBFlag }
									onChange={ () =>
										setAttributes( {
											effectNBFlag: ! effectNBFlag,
										} )
									}
								/>
								{ effectNBFlag && (
									<GrigoraGradientInput
										label={ __(
											'Background',
											'grigora-kit'
										) }
										value={ effectNBGradient }
										onChange={ ( effectNBGradient ) =>
											setAttributes( {
												effectNBGradient,
											} )
										}
										resetValue={
											'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)'
										}
									/>
								) }
								{ ! effectNBFlag && (
									<GrigoraColorInput
										label={ __(
											'Background',
											'grigora-kit'
										) }
										value={ effectNBColor }
										onChange={ ( effectNBColor ) =>
											setAttributes( { effectNBColor } )
										}
										resetValue={ '#5093d4' }
									/>
								) }
							</>
						</TabPanel>
						<TabPanel>
							<>
								<GrigoraColorInput
									label={ __( 'Text', 'grigora-kit' ) }
									value={ effectHColor }
									onChange={ ( effectHColor ) =>
										setAttributes( { effectHColor } )
									}
									resetValue={ '' }
								/>
								{ effectNBFlag && (
									<GrigoraGradientInput
										label={ __(
											'Background',
											'grigora-kit'
										) }
										value={ effectHBGradient }
										onChange={ ( effectHBGradient ) =>
											setAttributes( {
												effectHBGradient,
											} )
										}
										resetValue={ '' }
									/>
								) }
								{ ! effectNBFlag && (
									<GrigoraColorInput
										label={ __(
											'Background',
											'grigora-kit'
										) }
										clearable={ false }
										value={ effectHBColor }
										onChange={ ( effectHBColor ) =>
											setAttributes( { effectHBColor } )
										}
										resetValue={ '' }
									/>
								) }
							</>
							<GrigoraRangeInput
								label={ __( 'Transition Time', 'grigora-kit' ) }
								max={ 5 }
								min={ 0.1 }
								step={ 0.1 }
								unit={ 'sec' }
								setValue={ ( transitionTime ) =>
									setAttributes( { transitionTime } )
								}
								value={ transitionTime }
								resetValue={ 1 }
							/>
						</TabPanel>
					</Tabs>
				</PanelBody>
				<PanelBody
					title={ __( 'Typography', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraRangeInput
						value={ typoSize }
						setValue={ ( typoSize ) => {
							setAttributes( { typoSize } );
						} }
						label={ `Size` }
						resetValue={ 16 }
					/>
					<GrigoraRangeInput
						value={ typoLineHeight }
						setValue={ ( typoLineHeight ) => {
							setAttributes( {
								typoLineHeight: typoLineHeight.toString(),
							} );
						} }
						label={ `Line Height` }
						min={ 10 }
						max={ 300 }
						resetValue={ 'normal' }
					/>
					<GrigoraRangeInput
						value={ typoLetterSpacing }
						setValue={ ( typoLetterSpacing ) => {
							setAttributes( {
								typoLetterSpacing: typoLetterSpacing.toString(),
							} );
						} }
						label={ `Letter Spacing` }
						min={ 0 }
						max={ 150 }
						resetValue={ 'normal' }
					/>
					<GrigoraRangeInput
						value={ typoWordSpacing }
						setValue={ ( typoWordSpacing ) => {
							setAttributes( {
								typoWordSpacing: typoWordSpacing.toString(),
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
							onChange={ ( typoTransform ) =>
								setAttributes( { typoTransform } )
							}
							value={ typoTransform }
							resetValue={ 'none' }
							options={ TEXT_TRANSFORMS }
						/>
						<GrigoraSelectInput
							label={ __( 'Style', 'grigora-kit' ) }
							onChange={ ( typoStyle ) =>
								setAttributes( { typoStyle } )
							}
							value={ typoStyle }
							resetValue={ 'normal' }
							options={ TEXT_STYLE }
						/>
					</HStack>
					<HStack spacing={ 2 } className="grigora-dropdown-hstack">
						<GrigoraSelectInput
							label={ __( 'Decoration', 'grigora-kit' ) }
							onChange={ ( typoDecoration ) =>
								setAttributes( { typoDecoration } )
							}
							value={ typoDecoration }
							resetValue={ 'initial' }
							options={ TEXT_DECORATION }
						/>
						<GrigoraSelectInput
							label={ __( 'Weight', 'grigora-kit' ) }
							onChange={ ( typoWeight ) =>
								setAttributes( { typoWeight } )
							}
							value={ typoWeight }
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
						onChange={ ( typoFontFamily ) =>
							setAttributes( { typoFontFamily } )
						}
						value={ typoFontFamily }
						resetValue={ '' }
					/>
				</PanelBody>
			</>
		);
	}

	function advancedSettings() {
		return (
			<>
				<PanelBody
					title={ __( 'Animation', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraSelectInput
						label={ __( 'Attention Seekers: ', 'grigora-kit' ) }
						labelPosition="side"
						onChange={ ( effectHAnimation ) =>
							setAttributes( { effectHAnimation } )
						}
						value={ effectHAnimation }
						options={ HOVER_ANIMATIONS }
						resetValue={ 'none' }
					/>
					<GrigoraRangeInput
						label={ __( 'Transition Time', 'grigora-kit' ) }
						max={ 5 }
						min={ 0.1 }
						step={ 0.1 }
						unit={ 'sec' }
						setValue={ ( hoverAnimationTime ) =>
							setAttributes( { hoverAnimationTime } )
						}
						value={ hoverAnimationTime }
						resetValue={ 1 }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'On Scroll Animations', 'grigora-kit' ) }
					initialOpen={ false }
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
						setValue={ ( entranceAnimationTime ) =>
							setAttributes( { entranceAnimationTime } )
						}
						value={ entranceAnimationTime }
						resetValue={ 1 }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Border', 'grigora-kit' ) }
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
								<GrigoraBorderBoxInput
									label={ __( 'Width', 'grigora-kit' ) }
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
											style: 'solid',
											width: '0px',
										},
										bottom: {
											color: '#72aee6',
											style: 'solid',
											width: '0px',
										},
										right: {
											color: '#72aee6',
											style: 'solid',
											width: '0px',
										},
										left: {
											color: '#72aee6',
											style: 'solid',
											width: '0px',
										},
									} }
								/>
								<GrigoraBorderRadiusInput
									label={ __( 'Radius', 'grigora-kit' ) }
									onChange={ ( effectNBorderRadius ) => {
										if (
											typeof effectNBorderRadius ===
												'string' ||
											effectNBorderRadius instanceof
												String
										) {
											setAttributes( {
												effectNBorderRadius: {
													topLeft:
														effectNBorderRadius,
													topRight:
														effectNBorderRadius,
													bottomLeft:
														effectNBorderRadius,
													bottomRight:
														effectNBorderRadius,
												},
											} );
										} else {
											setAttributes( {
												effectNBorderRadius,
											} );
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
							</>
						</TabPanel>
						<TabPanel>
							<>
								<GrigoraBorderBoxInput
									label={ __( 'Width', 'grigora-kit' ) }
									onChange={ ( effectHBorder ) => {
										if ( ! effectHBorder.top ) {
											setAttributes( {
												effectHBorder: {
													top: effectHBorder,
													bottom: effectHBorder,
													right: effectHBorder,
													left: effectHBorder,
												},
											} );
										} else {
											setAttributes( { effectHBorder } );
										}
									} }
									value={ effectHBorder }
									resetValue={ {
										top: {
											color: '#72aee6',
											style: 'solid',
											width: 'undefined',
										},
										bottom: {
											color: '#72aee6',
											style: 'solid',
											width: 'undefined',
										},
										right: {
											color: '#72aee6',
											style: 'solid',
											width: 'undefined',
										},
										left: {
											color: '#72aee6',
											style: 'solid',
											width: 'undefined',
										},
									} }
								/>
								<GrigoraBorderRadiusInput
									label={ __( 'Radius', 'grigora-kit' ) }
									onChange={ ( effectHBorderRadius ) => {
										if (
											typeof effectHBorderRadius ===
												'string' ||
											effectHBorderRadius instanceof
												String
										) {
											setAttributes( {
												effectHBorderRadius: {
													topLeft:
														effectHBorderRadius,
													topRight:
														effectHBorderRadius,
													bottomLeft:
														effectHBorderRadius,
													bottomRight:
														effectHBorderRadius,
												},
											} );
										} else {
											setAttributes( {
												effectHBorderRadius,
											} );
										}
									} }
									values={ effectHBorderRadius }
									resetValue={ {
										topLeft: '',
										topRight: '',
										bottomLeft: '',
										bottomRight: '',
									} }
								/>
								<GrigoraRangeInput
									label={ __(
										'Transition Time',
										'grigora-kit'
									) }
									max={ 5 }
									min={ 0.1 }
									step={ 0.1 }
									unit={ 'sec' }
									setValue={ ( transitionTime ) =>
										setAttributes( { transitionTime } )
									}
									value={ transitionTime }
									resetValue={ 1 }
								/>
							</>
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
									clearable={ false }
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
									step={ 0.1 }
									unit={ 'sec' }
									setValue={ ( transitionTime ) =>
										setAttributes( { transitionTime } )
									}
									value={ transitionTime }
									resetValue={ 1 }
								/>
							</>
						</TabPanel>
					</Tabs>
				</PanelBody>
				<PanelBody
					title={ __( 'Transforms', 'grigora-kit' ) }
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
								<GrigoraUnitInput
									label={ __( 'Perspective', 'grigora-kit' ) }
									onChange={ ( effectNPerspective ) =>
										setAttributes( { effectNPerspective } )
									}
									value={ effectNPerspective }
									resetValue={ '' }
								/>
								<br></br>
								<p>{ __( 'Rotate', 'grigora-kit' ) }</p>
								<HStack spacing={ 2 }>
									<GrigoraUnitInput
										label="X"
										onChange={ ( effectNRotateX ) =>
											setAttributes( { effectNRotateX } )
										}
										units={ [
											{
												default: 1,
												label: 'deg',
												value: 'deg',
											},
										] }
										value={ effectNRotateX }
										resetValue={ '0deg' }
									/>
									<GrigoraUnitInput
										label="Y"
										onChange={ ( effectNRotateY ) =>
											setAttributes( { effectNRotateY } )
										}
										units={ [
											{
												default: 1,
												label: 'deg',
												value: 'deg',
											},
										] }
										value={ effectNRotateY }
										resetValue={ '0deg' }
									/>
									<GrigoraUnitInput
										label="Z"
										onChange={ ( effectNRotateZ ) =>
											setAttributes( { effectNRotateZ } )
										}
										units={ [
											{
												default: 1,
												label: 'deg',
												value: 'deg',
											},
										] }
										value={ effectNRotateZ }
										resetValue={ '0deg' }
									/>
								</HStack>
								<br></br>
								<p>{ __( 'Skew', 'grigora-kit' ) }</p>
								<HStack spacing={ 2 }>
									<GrigoraUnitInput
										label="X"
										onChange={ ( effectNSkewX ) =>
											setAttributes( { effectNSkewX } )
										}
										units={ [
											{
												default: 1,
												label: 'deg',
												value: 'deg',
											},
										] }
										value={ effectNSkewX }
										resetValue={ '0deg' }
									/>
									<GrigoraUnitInput
										label="Y"
										onChange={ ( effectNSkewY ) =>
											setAttributes( { effectNSkewY } )
										}
										units={ [
											{
												default: 1,
												label: 'deg',
												value: 'deg',
											},
										] }
										value={ effectNSkewY }
										resetValue={ '0deg' }
									/>
								</HStack>
								<br></br>
								<p>{ __( 'Offset', 'grigora-kit' ) }</p>
								<HStack spacing={ 2 }>
									<GrigoraUnitInput
										label="X"
										onChange={ ( effectNOffsetX ) =>
											setAttributes( { effectNOffsetX } )
										}
										value={ effectNOffsetX }
										resetValue={ '0px' }
									/>
									<GrigoraUnitInput
										label="Y"
										onChange={ ( effectNOffsetY ) =>
											setAttributes( { effectNOffsetY } )
										}
										value={ effectNOffsetY }
										resetValue={ '0px' }
									/>
								</HStack>
								<br></br>
								<GrigoraRangeInput
									label={ __( 'Scale', 'grigora-kit' ) }
									max={ 2 }
									min={ 0 }
									step={ 0.1 }
									unit={ 'x' }
									setValue={ ( effectNScale ) =>
										setAttributes( { effectNScale } )
									}
									value={ effectNScale }
									resetValue={ 1 }
								/>
							</>
						</TabPanel>
						<TabPanel>
							<>
								<GrigoraUnitInput
									label="Perspective"
									onChange={ ( effectHPerspective ) =>
										setAttributes( { effectHPerspective } )
									}
									value={ effectHPerspective }
									resetValue={ '' }
								/>
								<br></br>
								<p>{ __( 'Rotate', 'grigora-kit' ) }</p>
								<HStack spacing={ 2 }>
									<GrigoraUnitInput
										label="X"
										onChange={ ( effectHRotateX ) =>
											setAttributes( { effectHRotateX } )
										}
										units={ [
											{
												default: 1,
												label: 'deg',
												value: 'deg',
											},
										] }
										value={ effectHRotateX }
										resetValue={ '' }
									/>
									<GrigoraUnitInput
										label="Y"
										onChange={ ( effectHRotateY ) =>
											setAttributes( { effectHRotateY } )
										}
										units={ [
											{
												default: 1,
												label: 'deg',
												value: 'deg',
											},
										] }
										value={ effectHRotateY }
										resetValue={ '' }
									/>
									<GrigoraUnitInput
										label="Z"
										onChange={ ( effectHRotateZ ) =>
											setAttributes( { effectHRotateZ } )
										}
										units={ [
											{
												default: 1,
												label: 'deg',
												value: 'deg',
											},
										] }
										value={ effectHRotateZ }
										resetValue={ '' }
									/>
								</HStack>
								<br></br>
								<p>{ __( 'Skew', 'grigora-kit' ) }</p>
								<HStack spacing={ 2 }>
									<GrigoraUnitInput
										label="X"
										onChange={ ( effectHSkewX ) =>
											setAttributes( { effectHSkewX } )
										}
										units={ [
											{
												default: 1,
												label: 'deg',
												value: 'deg',
											},
										] }
										value={ effectHSkewX }
										resetValue={ '' }
									/>
									<GrigoraUnitInput
										label="Y"
										onChange={ ( effectHSkewY ) =>
											setAttributes( { effectHSkewY } )
										}
										units={ [
											{
												default: 1,
												label: 'deg',
												value: 'deg',
											},
										] }
										value={ effectHSkewY }
										resetValue={ '' }
									/>
								</HStack>
								<br></br>
								<p>{ __( 'Offset', 'grigora-kit' ) }</p>
								<HStack spacing={ 2 }>
									<GrigoraUnitInput
										label="X"
										onChange={ ( effectHOffsetX ) =>
											setAttributes( { effectHOffsetX } )
										}
										value={ effectHOffsetX }
										resetValue={ '' }
									/>
									<GrigoraUnitInput
										label="Y"
										onChange={ ( effectHOffsetY ) =>
											setAttributes( { effectHOffsetY } )
										}
										value={ effectHOffsetY }
										resetValue={ '' }
									/>
								</HStack>
								<br></br>
								<GrigoraRangeInput
									label={ __( 'Scale', 'grigora-kit' ) }
									max={ 2 }
									min={ 0 }
									step={ 0.1 }
									unit={ 'x' }
									setValue={ ( effectHScale ) =>
										setAttributes( {
											effectHScale:
												effectHScale.toString(),
										} )
									}
									value={ effectHScale }
									resetValue={ '' }
								/>
								<GrigoraRangeInput
									label={ __(
										'Transition Time',
										'grigora-kit'
									) }
									max={ 5 }
									min={ 0.1 }
									step={ 0.1 }
									unit={ 'sec' }
									setValue={ ( transitionTime ) =>
										setAttributes( { transitionTime } )
									}
									value={ transitionTime }
									resetValue={ 1 }
								/>
							</>
						</TabPanel>
					</Tabs>
				</PanelBody>
				<PanelBody
					title={ __( 'Text Shadow', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<>
						<GrigoraColorInput
							label={ __( 'Color', 'grigora-kit' ) }
							value={ textShadowColor }
							onChange={ ( textShadowColor ) =>
								setAttributes( { textShadowColor } )
							}
							resetValue={ '#000' }
						/>
						<HStack spacing={ 2 }>
							<GrigoraUnitInput
								label="Blur"
								onChange={ ( textShadowBlur ) =>
									setAttributes( { textShadowBlur } )
								}
								value={ textShadowBlur }
								resetValue={ '0px' }
							/>
							<GrigoraUnitInput
								label="Horizontal"
								onChange={ ( textShadowHorizontal ) =>
									setAttributes( {
										textShadowHorizontal,
									} )
								}
								value={ textShadowHorizontal }
								resetValue={ '0px' }
							/>
							<GrigoraUnitInput
								label="Vertical"
								onChange={ ( textShadowVertical ) =>
									setAttributes( { textShadowVertical } )
								}
								value={ textShadowVertical }
								resetValue={ '0px' }
							/>
						</HStack>
					</>
				</PanelBody>
			</>
		);
	}

	return (
		<div { ...useBlockProps() }>
			<BlockControls group="block">
				<AlignmentControl
					value={ align }
					onChange={ ( newAlign ) =>
						setAttributes( { align: newAlign } )
					}
					alignmentControls={ DEFAULT_ALIGNMENT_CONTROLS }
				/>
			</BlockControls>
			<BlockControls group="block">
				<ToolbarButton
					name="link"
					icon={ url ? linkOff : link }
					title={ __( 'Link', 'grigora-kit' ) }
					shortcut={ displayShortcut.primary( 'k' ) }
					onClick={ toggleEditing }
					isActive={ url ? true : false }
				/>
			</BlockControls>
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
			<div { ...blockProps }>
				<style>
					{ ` .block-id-${ id } {
					font-size: ${ typoSize }px;
					font-weight: ${ typoWeight };
					text-transform: ${ typoTransform };
					font-style: ${ typoStyle };
					text-decoration: ${ typoDecoration };
					line-height: ${
						typoLineHeight != 'normal'
							? `${ typoLineHeight }px`
							: `normal`
					};;
					letter-spacing: ${
						typoLetterSpacing != 'normal'
							? `${ typoLetterSpacing }px`
							: `normal`
					};
					word-spacing: ${
						typoWordSpacing != 'normal'
							? `${ typoWordSpacing }px`
							: `normal`
					};
					font-family: ${ typoFontFamily ? typoFontFamily : '' };
					padding-left: ${ layoutPadding?.left };
					padding-right: ${ layoutPadding?.right };
					padding-top: ${ layoutPadding?.top };
					padding-bottom: ${ layoutPadding?.bottom };
					${
						( textShadowHorizontal &&
							textShadowHorizontal != '0px' ) ||
						( textShadowVertical && textShadowVertical != '0px' ) ||
						( textShadowBlur && textShadowBlur != '0px' )
							? `text-shadow: ${ `${
									textShadowHorizontal
										? textShadowHorizontal
										: '0px'
							  } ${
									textShadowVertical
										? textShadowVertical
										: '0px'
							  } ${ textShadowBlur ? textShadowBlur : '0px' } ${
									textShadowColor ? textShadowColor : '#000'
							  }` };`
							: ``
					}
					align-self: ${ layoutVerticalAlign };
					position: ${ layoutPosition };
					transition: ${ `${ transitionTime }s` };
					color: ${ effectNColor };
					background-color: ${ ! effectNBFlag ? effectNBColor : '' };
					background-image: ${ effectNBFlag ? effectNBGradient : '' };
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
					transform: ${ effectNPerspective ? `perspective(${ effectNPerspective })` : `` } rotateX(${ effectNRotateX ? effectNRotateX : '0deg' }) rotateY(${
						effectNRotateY ? effectNRotateY : '0deg'
					}) rotateZ(${
						effectNRotateZ ? effectNRotateZ : '0deg'
					}) skewX(${ effectNSkewX ? effectNSkewX : '0deg' }) skewY(${
						effectNSkewY ? effectNSkewY : '0deg'
					}) translateX(${ effectNOffsetX }) translateY(${ effectNOffsetY }) scale(${ effectNScale });
					box-shadow: ${ effectNShadowHO } ${ effectNShadowVO } ${ effectNShadowBlur } ${ effectNShadowSpread } ${ effectNShadowColor };
					}
					${
						entranceAnimation != 'none'
							? `
					.block-id-${ id }.animateOnce {
						animation: ${ entranceAnimation } ${ entranceAnimationTime }s;
					}
					`
							: ``
					}
					${
						icon != 'none'
							? `
					.block-id-${ id } .grigora-svg-icon {
						color: ${ iconColorFlag ? iconNormalColor : 'currentColor' };
						padding-left: ${ iconPadding?.left };
						padding-right: ${ iconPadding?.right };
						padding-top: ${ iconPadding?.top };
						padding-bottom: ${ iconPadding?.bottom };
					}
					.block-id-${ id }:hover .grigora-svg-icon {
						${ iconColorFlag && iconHoverColor ? `color: ${ iconHoverColor }` : '' }
					}
					.block-id-${ id } .grigora-svg-icon svg{
						width: ${ iconSize };
						height: ${ iconSize };
					}
					`
							: ``
					}
					.block-id-${ id }:hover {
						${ effectHColor ? `color: ${ effectHColor };` : `` }
						${
							effectHAnimation != 'none'
								? `animation: ${ effectHAnimation } ${ hoverAnimationTime }s;`
								: ``
						}
						${
							! effectNBFlag && effectHBColor
								? `background-color: ${ effectHBColor };`
								: ``
						}
						
						border-left: ${ effectHBorder?.left?.width } ${ effectHBorder?.left?.style } ${
						effectHBorder?.left?.color
							? effectHBorder?.left?.color
							: ''
					};
						border-right: ${ effectHBorder?.right?.width } ${
						effectHBorder?.right?.style
					} ${
						effectHBorder?.right?.color
							? effectHBorder?.right?.color
							: ''
					};
						border-top: ${ effectHBorder?.top?.width } ${ effectHBorder?.top?.style } ${
						effectHBorder?.top?.color
							? effectHBorder?.top?.color
							: ''
					};
						border-bottom: ${ effectHBorder?.bottom?.width } ${
						effectHBorder?.bottom?.style
					} ${
						effectHBorder?.bottom?.color
							? effectHBorder?.bottom?.color
							: ''
					};
							  ${
									effectHBorderRadius?.topRight
										? `border-top-right-radius: ${ effectHBorderRadius?.topRight }`
										: ``
								};
							${
								effectHBorderRadius?.topLeft
									? `border-top-left-radius: ${ effectHBorderRadius?.topLeft }`
									: ``
							};
							${
								effectHBorderRadius?.bottomRight
									? `border-bottom-right-radius: ${ effectHBorderRadius?.bottomRight }`
									: ``
							};
							${
								effectHBorderRadius?.bottomLeft
									? `border-bottom-left-radius: ${ effectHBorderRadius?.bottomLeft }`
									: ``
							};
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
							${
								effectHPerspective ||
								effectHRotateX ||
								effectHRotateY ||
								effectHRotateZ ||
								effectHSkewX ||
								effectHSkewY ||
								effectHOffsetX ||
								effectHOffsetY ||
								effectHScale
									? `
							transform: ${ effectHPerspective ? `perspective(${ effectHPerspective })` : `${ effectNPerspective ? `perspective(${ effectNPerspective })` : `` }` } rotateX(${
								effectHRotateX ? effectHRotateX : effectNRotateX
							}) rotateY(${
											effectHRotateY
												? effectHRotateY
												: effectNRotateY
									  }) rotateZ(${
											effectHRotateZ
												? effectHRotateZ
												: effectNRotateZ
									  }) skewX(${
											effectHSkewX
												? effectHSkewX
												: effectNSkewX
									  }) skewY(${
											effectHSkewY
												? effectHSkewY
												: effectNSkewY
									  }) translateX(${
											effectHOffsetX
												? effectHOffsetX
												: effectNOffsetX
									  }) translateY(${
											effectHOffsetY
												? effectHOffsetY
												: effectNOffsetY
									  }) scale(${
											effectHScale
												? effectHScale
												: effectNScale
									  });
							`
									: ``
							}
					}
					${
						effectNBFlag
							? `
					.block-id-${ id }::before {
						${
							effectNBFlag && effectHBGradient
								? `background: ${ effectHBGradient };`
								: ``
						}
					}
					`
							: ``
					}
					` }
				</style>
				<div className={ buttonClass }>
					{ icon && iconPosition == 'left' && (
						<div class={ `grigora-svg-icon` }>
							{ renderSingleIcon() }
						</div>
					) }
					<RichText
						tagName={ 'span' }
						identifier="content"
						value={ content }
						onChange={ ( content ) => {
							setAttributes( { content } );
						} }
						placeholder={ __( 'Button', 'grigora-kit' ) }
						withoutInteractiveFormatting
					/>
					{ icon && iconPosition == 'right' && (
						<div class={ `grigora-svg-icon` }>
							{ renderSingleIcon() }
						</div>
					) }
				</div>
			</div>
			{ isSelected && openPopOver && ( isEditingURL || isURLSet ) && (
				<Popover
					position="bottom center"
					onClose={ () => {
						setIsEditingURL( false );
					} }
					anchorRef={ ref?.current }
					focusOnMount={ isEditingURL ? 'firstElement' : false }
					__unstableSlotName={ '__unstable-block-tools-after' }
					onFocusOutside={ () => {
						toggleEditing();
					} }
				>
					<LinkControl
						className="wp-block-navigation-link__inline-link-input"
						value={ { url, opensInNewTab } }
						onChange={ ( {
							url: newURL = '',
							opensInNewTab: newOpensInNewTab,
						} ) => {
							setAttributes( {
								url: newURL,
								opensInNewTab: newOpensInNewTab,
							} );
						} }
						forceIsEditingLink={ isEditingURL }
					/>
					<div className="popover-link-controls">
						<ToggleControl
							label={ __( 'No follow', 'grigora-kit' ) }
							checked={ !! urlnofollow }
							onChange={ () =>
								setAttributes( { urlnofollow: ! urlnofollow } )
							}
						/>
						<ToggleControl
							label={ __( 'No referrer', 'grigora-kit' ) }
							checked={ !! urlnoreferrer }
							onChange={ () =>
								setAttributes( {
									urlnoreferrer: ! urlnoreferrer,
								} )
							}
						/>
						<ToggleControl
							label={ __( 'Sponsored', 'grigora-kit' ) }
							checked={ !! urlsponsored }
							onChange={ () =>
								setAttributes( {
									urlsponsored: ! urlsponsored,
								} )
							}
						/>
					</div>
				</Popover>
			) }
			<Googlefontloader
				config={ {
					google: {
						families: [ typoFontFamily ],
					},
				} }
			></Googlefontloader>
		</div>
	);
}

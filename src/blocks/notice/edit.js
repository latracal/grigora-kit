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
	TabPanel as WPTabPanel,
	PanelBody,
	ToggleControl,
	ToolbarButton,
	Popover,
	Button,
	Icon,
	Tooltip,
	Notice,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import {
	alignLeft,
	alignRight,
	alignCenter,
	alignJustify,
	link,
	linkOff,
} from '@wordpress/icons';
import { useState, useRef, useEffect } from '@wordpress/element';
import { displayShortcut } from '@wordpress/keycodes';
import {
	ENTRANCE_ANIMATIONS,
	TEXT_TRANSFORMS,
	TEXT_STYLE,
	TEXT_DECORATION,
	FONT_WEIGHTS,
} from '@constants';

import parse from 'html-react-parser';

import generateId from '@helpers/generateId';
import uniqueIDs from '@helpers/uniqueID';
import GrigoraRangeInput from '@components/range-input';
import GrigoraSelectInput from '@components/select-input';
import GrigoraColorInput from '@components/color-input';
import GrigoraGradientInput from '@components/gradient-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraBoxInput from '@components/box-input';
import GrigoraFontFamilyInput from '@components/fontfamily-input';
import GrigoraColorGradientInput from '@components/colorgradient-input';
import Googlefontloader from '@components/googlefontloader';
import GrigoraBorderBoxInput from '@components/borderbox-input';
import GrigoraBorderRadiusInput from '@components/borderradius-input';

import InspectorTabs from '@components/inspector-tabs';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SVGIcons from '@constants/icons.json';
import IconPicker from '@components/icon-picker';

export default function Edit( props ) {
	const {
		attributes,
		setAttributes,
	} = props;

	const { 
		id,
		icon,
		iconColorFlag,
		iconHoverColor,
		iconNormalColor,
		iconPadding,
		iconMargin,
		iconSize,
		align,
		dismiss,
		boxBackgroundColor,
		boxBackgroundHColor,
		titleTypoSize,
		titleMinWidth,
		titleTypoDecoration,
		titleTypoFontFamily,
		titleTypoLetterSpacing,
		titleTypoLineHeight,
		titleTypoStyle,
		titleTypoTransform,
		titleTypoWeight,
		titleTypoWordSpacing,
		titleTag,
		title,
		titleLayoutPadding,
		titleTextColor,
		titleTextHColor,
		contentTypoSize,
		contentTypoDecoration,
		contentTypoFontFamily,
		contentTypoLetterSpacing,
		contentTypoLineHeight,
		contentTypoStyle,
		contentTypoTransform,
		contentTypoWeight,
		contentTypoWordSpacing,
		content,
		contentLayoutPadding,
		contentTextColor,
		contentTextHColor,
		transitionColorTime,
		transitionTime,
		entranceAnimation,
		textShadowBlur,
		textShadowColor,
		textShadowHorizontal,
		textShadowVertical,
		effectNBorder,
		effectNBorderRadius,
		effectNShadowHO,
		effectNShadowVO,
		effectNShadowBlur,
		effectNShadowSpread,
		effectNShadowColor,
		textShadowHBlur,
		textShadowHColor,
		textShadowHHorizontal,
		textShadowHVertical,
		effectHBorder,
		effectHBorderRadius,
		effectHShadowHO,
		effectHShadowVO,
		effectHShadowBlur,
		effectHShadowSpread,
		effectHShadowColor
	} = attributes;

	useEffect( () => {
		if ( ! id ) {
			let tempID = generateId( 'notice' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			let tempID = generateId( 'notice' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

	const DEFAULT_ALIGNMENT_CONTROLS = [
		{
			icon: alignLeft,
			title: __( 'Align left' ),
			align: 'start',
		},
		{
			icon: alignCenter,
			title: __( 'Align center' ),
			align: 'center',
		},
		{
			icon: alignRight,
			title: __( 'Align right' ),
			align: 'end',
		},
	];

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-notice': true,
			[ `block-id-${ id }` ]: id,
			[ `animateOnce` ]: entranceAnimation != 'none',
		} ),
		style: {},
	} );

	const titleProps =  {
		className: classnames( {
			[ `notice-title-style` ]: true,
		} ),
		style: {marginBottom: '0px', marginTop: '0px', marginLeft: '6px', marginRight: '6px'},
	} ;

	const contentProps =  {
		className: classnames( {
			[ `notice-content-style` ]: true,
		} ),
		style: {marginBottom: '0px', marginTop: '0px', marginLeft: '6px', marginRight: '6px'},
	} ;

	const iconProps = {
		className: classnames( {
			[ `icon-container` ]: true,
		} ),
		style: {display: 'flex', alignItems: 'center', maxWidth: '10%', justifyContent: 'center'},
	}

	const dismissIconProps = {
		className: classnames( {
			[ `dismiss-icon-container` ]: true,
		} ),
		style: {display: 'flex', alignItems: 'center', width: '10%', justifyContent: 'center'}
	}

	// color functions
	function boxBackgroundColorNormalRender() {
		return (
			<>
				<GrigoraColorInput
					value={ boxBackgroundColor }
					onChange={ ( boxBackgroundColor ) =>
						setAttributes( { boxBackgroundColor } )
					}
					resetValue= {'white'}
					label={ __( 'Background Color', 'grigora-kit' ) }
				/>
			</>
		);
	}
	function boxBackgroundColorHoverRender() {
		return (
			<div className={ `grigora-hover-effects-panel` }>
				<GrigoraColorInput
					value={ boxBackgroundHColor }
					onChange={ ( boxBackgroundHColor ) =>
						setAttributes( { boxBackgroundHColor } )
					}
					resetValue= {''}
					label={ __( 'Background Color', 'grigora-kit' ) }
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

	function titleEffectNormalRender() {
		return (
			<>
				<GrigoraColorInput
					value={ titleTextColor }
					onChange={ ( titleTextColor ) =>
						setAttributes( { titleTextColor } )
					}
					resetValue= {'black'}
					label={ __( 'Text', 'grigora-kit' ) }
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
					resetValue= {''}
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

	function contentEffectNormalRender() {
		return (
			<>
				<GrigoraColorInput
					value={ contentTextColor }
					onChange={ ( contentTextColor ) =>
						setAttributes( { contentTextColor } )
					}
					resetValue= {'black'}
					label={ __( 'Text', 'grigora-kit' ) }
				/>
			</>
		);
	}
	function contentEffectHoverRender() {
		return (
			<div className={ `grigora-hover-effects-panel` }>
				<GrigoraColorInput
					value={ contentTextHColor }
					onChange={ ( contentTextHColor ) =>
						setAttributes( { contentTextHColor } )
					}
					resetValue= {''}
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

	// text shadow functions
	function textShadowNormal() {
		return (
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
							setAttributes( { textShadowHorizontal } )
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
		);
	}
	function textShadowHover() {
		return (
			<>
				<GrigoraColorInput
					label={ __( 'Color', 'grigora-kit' ) }
					value={ textShadowHColor }
					onChange={ ( textShadowHColor ) =>
						setAttributes( { textShadowHColor } )
					}
					resetValue={ '#000' }
				/>
				<HStack spacing={ 2 }>
					<GrigoraUnitInput
						label="Blur"
						onChange={ ( textShadowHBlur ) =>
							setAttributes( { textShadowHBlur } )
						}
						value={ textShadowHBlur }
						resetValue={ '' }
					/>
					<GrigoraUnitInput
						label="Horizontal"
						onChange={ ( textShadowHHorizontal ) =>
							setAttributes( { textShadowHHorizontal } )
						}
						value={ textShadowHHorizontal }
						resetValue={ '' }
					/>
					<GrigoraUnitInput
						label="Vertical"
						onChange={ ( textShadowHVertical ) =>
							setAttributes( { textShadowHVertical } )
						}
						value={ textShadowHVertical }
						resetValue={ '' }
					/>
				</HStack>
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
			</>
		);
	}

	// fucntions for icon
	function setActiveIcon( icon ) {
		setAttributes( { icon } );
	}
	function renderSingleIcon() {
		if ( icon && SVGIcons[ icon ] ) {
			const icon_parsed = parse( SVGIcons[ icon ] );
			return icon_parsed;
		}
	}
	function effectIconNormalRender() {
		return (
			<>
				<GrigoraColorInput
					label={ __( '', 'grigora-kit' ) }
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
					label={ __( '', 'grigora-kit' ) }
					value={ iconHoverColor }
					onChange={ ( iconHoverColor ) =>
						setAttributes( { iconHoverColor } )
					}
					resetValue={ '#000' }
				/>
			</>
		);
	}

	// settings
	function generalSettings() {
		return (
			<>
				<Spacer marginBottom={ 0 } paddingX={ 4 } paddingY={ 3 }>
					<GrigoraSelectInput
						label={ __( 'Title Tag', 'grigora-kit' ) }
						labelPosition="side"
						onChange={ ( titleTag ) =>
							setAttributes( { titleTag } )
						}
						value={ titleTag }
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
					<GrigoraSelectInput
						label={ __( 'Notice Display', 'grigora-kit' ) }
						labelPosition="side"
						onChange={ ( dismiss ) =>
							setAttributes( { dismiss } )
						}
						value={ dismiss }
						options={ [
							'Always Show',
							'Dismissable'
						].map( function ( item ) {
							return {
								label: item,
								value: item,
							};
						} ) }
						resetValue={ 'Dismissable' }
					/>
				</Spacer>
				<PanelBody title={ __( 'Background Color', 'grigora-kit' ) } initialOpen={ false }>
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
							<>{ boxBackgroundColorNormalRender() }</>
						</TabPanel>
						<TabPanel>
							<>{ boxBackgroundColorHoverRender() }</>
						</TabPanel>
					</Tabs>
				</PanelBody>
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
							<GrigoraUnitInput
								label="Size"
								onChange={ ( iconSize ) =>
									setAttributes( { iconSize } )
								}
								value={ iconSize }
								resetValue={ '20px' }
							/>
							<br></br>
							<ToggleControl
								label={ __( 'Color', 'grigora-kit' ) }
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
				<PanelBody
					title={ __( 'Icon Layout', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraBoxInput
						label={ __( 'Padding', 'grigora-kit' ) }
						onChange={ ( iconPadding ) =>
							setAttributes( { iconPadding } )
						}
						values={ iconPadding }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '0px',
							right: '0px',
						} }
					/>
					<GrigoraBoxInput
						label={ __( 'Margin', 'grigora-kit' ) }
						onChange={ ( iconMargin ) =>
							setAttributes( { iconMargin } )
						}
						values={ iconMargin }
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

	function stylesSettings() {
		return (
			<div>
				<PanelBody
						title={ __( 'Padding Title', 'grigora-kit' ) }
						initialOpen={ false }
				>
					<GrigoraBoxInput
						label={ __( 'Padding Title', 'grigora-kit' ) }
						onChange={ ( titleLayoutPadding ) =>
							setAttributes( { titleLayoutPadding } )
						}
						values={ titleLayoutPadding }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '0px',
							right: '0px',
						} }
						/>
				</PanelBody>
				<PanelBody title={ __( 'Color Title', 'grigora-kit' ) } initialOpen={ false }>
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
					title={ __( 'Title Typography', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraRangeInput
						value={ titleTypoSize }
						setValue={ ( titleTypoSize ) => {
							setAttributes( { titleTypoSize: titleTypoSize.toString() } );
						} }
						label={ `Size` }
						resetValue={ 'default' }
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
				<PanelBody
						title={ __( 'Padding Content', 'grigora-kit' ) }
						initialOpen={ false }
				>
					<GrigoraBoxInput
						label={ __( 'Padding Content', 'grigora-kit' ) }
						onChange={ ( contentLayoutPadding ) =>
							setAttributes( { contentLayoutPadding } )
						}
						values={ contentLayoutPadding }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '0px',
							right: '0px',
						} }
						/>
				</PanelBody>
				<PanelBody title={ __( 'Color Content', 'grigora-kit' ) } initialOpen={ false }>
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
							<>{ contentEffectNormalRender() }</>
						</TabPanel>
						<TabPanel>
							<>{ contentEffectHoverRender() }</>
						</TabPanel>
					</Tabs>
				</PanelBody>
				<PanelBody
					title={ __( 'Content Typography', 'grigora-kit' ) }
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
			</div>
		)
	}

	function advancedSettings() {
		return (
			<>
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
											width: '6px',
										},
									} }
								/>
								<br></br>
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
										topLeft: '10px',
										topRight: '10px',
										bottomLeft: '10px',
										bottomRight: '10px',
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
								<br></br>
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
				<PanelBody
					title={ __( 'Text Shadow', 'grigora-kit' ) }
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
							<>{ textShadowNormal() }</>
						</TabPanel>
						<TabPanel>
							<>{ textShadowHover() }</>
						</TabPanel>
					</Tabs>
				</PanelBody>
				<PanelBody
					title={ __( 'On Scroll', 'grigora-kit' ) }
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
						setValue={ ( transitionTime ) =>
							setAttributes( { transitionTime } )
						}
						value={ transitionTime }
						resetValue={ 1 }
					/>
				</PanelBody>
		</>
		)
	}

	return (
		<div { ...blockProps }>
			<BlockControls group="block">
				<AlignmentControl
					value={ align }
					onChange={ ( newAlign ) =>
						setAttributes( { align: newAlign } )
					}
					alignmentControls={ DEFAULT_ALIGNMENT_CONTROLS }
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
			<style>  {/*  block styling  */}
				{`
					.block-id-${ id } {
						background-color: ${ boxBackgroundColor };
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
						box-shadow: ${ effectNShadowHO } ${ effectNShadowVO } ${ effectNShadowBlur } ${ effectNShadowSpread } ${ effectNShadowColor };
					}
				
					${
						entranceAnimation != 'none' ? 
							`.block-id-${ id }.animateOnce {
							animation: ${ entranceAnimation } ${ transitionTime }s; }` : ``
					}

					${
						boxBackgroundHColor != '' ?
						`.block-id-${ id }:hover {
							background-color: ${ boxBackgroundHColor };
						}` : ``
					}
					
					.block-id-${ id }:hover {
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
					}
				`}
			</style>
			<style> {/*  icon styling  */}
				{`
					.block-id-${ id } .icon-container {
						padding-left: ${ iconPadding?.left };
						padding-right: ${ iconPadding?.right };
						padding-top: ${ iconPadding?.top };
						padding-bottom: ${ iconPadding?.bottom };
						margin-left: ${ iconMargin?.left };
						margin-right: ${ iconMargin?.right };
						margin-top: ${ iconMargin?.top };
						margin-bottom: ${ iconMargin?.bottom };
						justify-content: ${ align };
					}
					${
						icon && icon != 'none' ? `
							.block-id-${ id } .icon-container svg {
								width: ${ iconSize };
								height: ${ iconSize };
								color: ${ iconColorFlag ? iconNormalColor : 
										effectNBorder?.left?.color ? effectNBorder?.left?.color
										: 'currentColor'
								};
							}
							.block-id-${id}:hover .icon-container svg {
								color: ${ iconColorFlag ? iconHoverColor : 
										effectHBorder?.left?.color ? effectHBorder?.left?.color
										: 'currentColor' };
							}` : ``
					}
				`}
			</style>
			<style> {/*  title styling  */}
				{`
					.block-id-${ id } .notice-title-style {
						text-align: ${align};
						font-size: ${ titleTypoSize }px !important;
						font-weight: ${ titleTypoWeight } !important;
						text-transform: ${ titleTypoTransform } !important;
						font-style: ${ titleTypoStyle } !important;
						text-decoration: ${ titleTypoDecoration } !important;
						min-width: ${ titleMinWidth };
						line-height: ${
							titleTypoLineHeight != 'normal'
								? `${ titleTypoLineHeight }px`
								: `normal`
						} !important;
						letter-spacing: ${
							titleTypoLetterSpacing != 'normal'
								? `${ titleTypoLetterSpacing }px`
								: `normal`
						} !important;
						word-spacing: ${
							titleTypoWordSpacing != 'normal'
								? `${ titleTypoWordSpacing }px`
								: `normal`
						} !important;
						font-family: ${ titleTypoFontFamily ? titleTypoFontFamily : '' } !important;
						padding-left: ${ titleLayoutPadding?.left } !important;
						padding-right: ${ titleLayoutPadding?.right } !important;
						padding-top: ${ titleLayoutPadding?.top } !important;
						padding-bottom: ${ titleLayoutPadding?.bottom } !important;
						${ titleTextColor ? `color: ${ titleTextColor };` : `` }
						transition: ${ transitionColorTime }s;
						${
							( textShadowHorizontal &&
								textShadowHorizontal != '0px' ) ||
							( textShadowVertical &&
								textShadowVertical != '0px' ) ||
							( textShadowBlur && textShadowBlur != '0px' )
								? `text-shadow:${ `${
										textShadowHorizontal
											? textShadowHorizontal
											: '0px'
								  } ${
										textShadowVertical
											? textShadowVertical
											: '0px'
								  } ${
										textShadowBlur ? textShadowBlur : '0px'
								  } ${
										textShadowColor
											? textShadowColor
											: '#000'
								  }` };`
								: ``
						}
					}
					${
						titleTextHColor
							? `.block-id-${ id }:hover .notice-title-style {color: ${ titleTextHColor };} `
							: ``
					}
					${
						textShadowHHorizontal ||
						textShadowHVertical ||
						textShadowHBlur
							? `.block-id-${ id }:hover .notice-title-style { text-shadow: ${
									textShadowHHorizontal
										? textShadowHHorizontal
										: textShadowHorizontal
										? textShadowHHorizontal
										: '0px'
							  } ${
									textShadowHVertical
										? textShadowHVertical
										: textShadowVertical
										? textShadowVertical
										: '0px'
							  } ${
									textShadowHBlur
										? textShadowHBlur
										: textShadowBlur
										? textShadowBlur
										: '0px'
							  } ${
									textShadowHColor ? textShadowHColor : '#000'
							  };}`
							: ``
					}
				`}
			</style>
			<style> {/*  content styling  */}
				{`
					.block-id-${ id } .notice-content-style {
						text-align: ${align};
						font-size: ${ contentTypoSize }px;
						font-weight: ${ contentTypoWeight };
						text-transform: ${ contentTypoTransform };
						font-style: ${ contentTypoStyle };
						text-decoration: ${ contentTypoDecoration };
						line-height: ${
							contentTypoLineHeight != 'normal'
								? `${ contentTypoLineHeight }px`
								: `normal`
						};
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
						padding-left: ${ contentLayoutPadding?.left };
						padding-right: ${ contentLayoutPadding?.right };
						padding-top: ${ contentLayoutPadding?.top };
						padding-bottom: ${ contentLayoutPadding?.bottom };
						${ contentTextColor ? `color: ${ contentTextColor };` : `` }
						transition: ${ transitionColorTime }s;
						${
							( textShadowHorizontal &&
								textShadowHorizontal != '0px' ) ||
							( textShadowVertical &&
								textShadowVertical != '0px' ) ||
							( textShadowBlur && textShadowBlur != '0px' )
								? `text-shadow : ${ `${
										textShadowHorizontal
											? textShadowHorizontal
											: '0px'
								  } ${
										textShadowVertical
											? textShadowVertical
											: '0px'
								  } ${
										textShadowBlur ? textShadowBlur : '0px'
								  } ${
										textShadowColor
											? textShadowColor
											: '#000'
								  }` };`
								: ``
						}
					}
						${
							textShadowHHorizontal ||
							textShadowHVertical ||
							textShadowHBlur
								? `.block-id-${ id }:hover .notice-content-style { text-shadow: ${
										textShadowHHorizontal
											? textShadowHHorizontal
											: textShadowHorizontal
											? textShadowHHorizontal
											: '0px'
								  } ${
										textShadowHVertical
											? textShadowHVertical
											: textShadowVertical
											? textShadowVertical
											: '0px'
								  } ${
										textShadowHBlur
											? textShadowHBlur
											: textShadowBlur
											? textShadowBlur
											: '0px'
								  } ${
										textShadowHColor ? textShadowHColor : '#000'
								  };}`
								: ``
						}
					${
						contentTextHColor
							? `.block-id-${ id }:hover .notice-content-style {color: ${ contentTextHColor };} `
							: ``
					}
				`}
			</style>
			<style> {/*  dismiss icon styling  */}
				{`
					.block-id-${ id } .dismiss-icon-container {
						padding-top: ${ titleLayoutPadding?.top } !important;
						padding-bottom: ${ titleLayoutPadding?.bottom } !important;
					}
				`}
			</style>
			<div className='main-block'>
				<div {...iconProps}>
					{ renderSingleIcon() }
				</div>
				<div className='title-content'>
					<div className='title-container'>
						<RichText
							{ ...titleProps }
							tagName={ titleTag }
							value={ title }
							onChange={ ( title ) => setAttributes( { title } ) }
							placeholder={ __( 'Title...' ) }
						/>
						<div {...dismissIconProps}>
							{dismiss === 'Dismissable' && parse(SVGIcons["x-circle"])}
						</div>
					</div>
					<div className='content-container'>
						<RichText
							{ ...contentProps }
							value={ content }
							onChange={ ( content ) => setAttributes( { content } ) }
							placeholder={ __( 'Content...' ) }
						/>
					</div>
				</div>
			</div>
			<Googlefontloader
				config={ {
					google: {
						families: [ titleTypoFontFamily, contentTypoFontFamily ],
					},
				} }
			></Googlefontloader>
		</div>
	);
}

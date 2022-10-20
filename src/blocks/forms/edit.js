import classnames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { __, _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
	InnerBlocks,
	useInnerBlocksProps,
	useBlockProps,
	BlockVerticalAlignmentToolbar,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentControl,
	MediaUpload,
	useSetting,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	TabPanel as WPTabPanel,
	PanelBody,
	Button,
	ToggleControl,
	FocalPointPicker,
	Tooltip,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
	Toolbar,
	ToolbarButton,
    TextControl
} from '@wordpress/components';
import { useRef, useEffect } from '@wordpress/element';
import {
	alignLeft,
	alignRight,
	alignCenter,
	formatIndent,
	formatIndentRTL,
	alignJustify,
	link,
	linkOff,
	group,
	code,
} from '@wordpress/icons';

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
import isEmpty from '@helpers/objEmpty';
import uniqueIDs from '@helpers/uniqueID';

import InspectorTabs from '@components/inspector-tabs';
import GrigoraTypographyInput from '@components/typography-input';
import GrigoraBoxInput from '@components/box-input';
import GrigoraColorInput from '@components/color-input';
import GrigoraRangeInput from '@components/range-input';
import Googlefontloader from '@components/googlefontloader';
import GrigoraBorderRadiusInput from '@components/borderradius-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraBorderBoxInput from '@components/borderbox-input';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;

	const { 
		id,
		labelTypoSize,
		labelTypoDecoration,
		labelTypoFontFamily,
		labelTypoLetterSpacing,
		labelTypoLineHeight,
		labelTypoStyle,
		labelTypoTransform,
		labelTypoWeight,
		labelTypoWordSpacing,
		labelTextColor,
		labelTextHColor,
		transitionLabelColorTime,
		labelBgColor,
		labelBgHColor,
		transitionLabelBgColorTime,
		labelPadding,
		buttonTypoSize,
		buttonTypoDecoration,
		buttonTypoFontFamily,
		buttonTypoLetterSpacing,
		buttonTypoLineHeight,
		buttonTypoStyle,
		buttonTypoTransform,
		buttonTypoWeight,
		buttonTypoWordSpacing,
		buttonTextColor,
		buttonTextHColor,
		transitionButtonColorTime,
		buttonBgColor,
		buttonBgHColor,
		transitionButtonBgColorTime,
		buttonPadding,
		buttonNShadowHO,
		buttonNShadowVO,
		buttonNShadowBlur,
		buttonNShadowSpread,
		buttonNShadowColor,
		buttonHShadowHO,
		buttonHShadowVO,
		buttonHShadowBlur,
		buttonHShadowSpread,
		buttonHShadowColor,
		transitionButtonShadowTime,
		transitionButtonBorderTime,
		buttonNBorder,
		buttonHBorder,
		buttonNBorderRadius,
		buttonHBorderRadius,
		fieldTypoSize,
		fieldTypoDecoration,
		fieldTypoFontFamily,
		fieldTypoLetterSpacing,
		fieldTypoLineHeight,
		fieldTypoStyle,
		fieldTypoTransform,
		fieldTypoWeight,
		fieldTypoWordSpacing,
		fieldTextColor,
		fieldTextHColor,
		transitionFieldColorTime,
		fieldBgColor,
		fieldBgHColor,
		transitionFieldBgColorTime,
		fieldPadding,
		fieldNShadowHO,
		fieldNShadowVO,
		fieldNShadowBlur,
		fieldNShadowSpread,
		fieldNShadowColor,
		fieldHShadowHO,
		fieldHShadowVO,
		fieldHShadowBlur,
		fieldHShadowSpread,
		fieldHShadowColor,
		transitionFieldShadowTime,
		transitionFieldBorderTime,
		fieldNBorder,
		fieldHBorder,
		fieldNBorderRadius,
		fieldHBorderRadius
	} = attributes;

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'forms' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'forms' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

    const { hasInnerBlocks, themeSupportsLayout } = useSelect(
		( select ) => {
			const { getBlock, getSettings } = select( blockEditorStore );
			const block = getBlock( clientId );
			return {
				hasInnerBlocks: !! ( block && block.innerBlocks.length ),
				themeSupportsLayout: getSettings()?.supportsLayout,
			};
		},
		[ clientId ]
	);

    const ALLOWED_BLOCKS = [ 
		'grigora-kit/form-email',
		'grigora-kit/form-text',
		'grigora-kit/form-textarea',
		'grigora-kit/form-checkbox',
		'grigora-kit/form-select',
		'grigora-kit/form-radio',
		'grigora-kit/form-hidden',
		'grigora-kit/form-submit'
	];

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-forms': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

    const innerBlocksProps = useInnerBlocksProps(
		{
			className: classnames( {
				'form-options': true,
			} ),
		},
        {
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
		}
	);

	function labelEffectNormalRender() {
		return (
			<>
				<GrigoraColorInput
					value={ labelTextColor }
					onChange={ ( labelTextColor ) =>
						setAttributes( { labelTextColor } )
					}
					resetValue={ 'black' }
					label={ __( 'Label', 'grigora-kit' ) }
				/>
			</>
		);
	}
	function labelEffectHoverRender() {
		return (
			<div className={ `grigora-hover-effects-panel` }>
				<GrigoraColorInput
					value={ labelTextHColor }
					onChange={ ( labelTextHColor ) =>
						setAttributes( { labelTextHColor } )
					}
					resetValue={ '' }
					label={ __( 'Label', 'grigora-kit' ) }
				/>
				<GrigoraRangeInput
					label={ __( 'Transition Time', 'grigora-kit' ) }
					max={ 5 }
					min={ 0.1 }
					unit={ 'sec' }
					step={ 0.1 }
					setValue={ ( transitionLabelColorTime ) =>
						setAttributes( { transitionLabelColorTime } )
					}
					value={ transitionLabelColorTime }
					resetValue={ 0.2 }
				/>
			</div>
		);
	}

	function labelBgEffectNormalRender() {
		return (
			<>
				<GrigoraColorInput
					value={ labelBgColor }
					onChange={ ( labelBgColor ) => setAttributes( { labelBgColor } ) }
					resetValue={ '' }
					label={ __( 'Label Background', 'grigora-kit' ) }
				/>
			</>
		);
	}
	function labelBgEffectHoverRender() {
		return (
			<div className={ `grigora-hover-effects-panel` }>
				<GrigoraColorInput
					value={ labelBgHColor }
					onChange={ ( labelBgHColor ) => setAttributes( { labelBgHColor } ) }
					resetValue={ '' }
					label={ __( 'Label Background', 'grigora-kit' ) }
				/>
				<GrigoraRangeInput
					label={ __( 'Transition Time', 'grigora-kit' ) }
					max={ 5 }
					min={ 0.1 }
					unit={ 'sec' }
					step={ 0.1 }
					setValue={ ( transitionLabelBgColorTime ) =>
						setAttributes( { transitionLabelBgColorTime } )
					}
					value={ transitionLabelBgColorTime }
					resetValue={ 0.2 }
				/>
			</div>
		);
	}

	function buttonEffectNormalRender() {
		return (
			<>
				<GrigoraColorInput
					value={ buttonTextColor }
					onChange={ ( buttonTextColor ) =>
						setAttributes( { buttonTextColor } )
					}
					resetValue={ 'white' }
					label={ __( 'Button', 'grigora-kit' ) }
				/>
			</>
		);
	}
	function buttonEffectHoverRender() {
		return (
			<div className={ `grigora-hover-effects-panel` }>
				<GrigoraColorInput
					value={ buttonTextHColor }
					onChange={ ( buttonTextHColor ) =>
						setAttributes( { buttonTextHColor } )
					}
					resetValue={ 'white' }
					label={ __( 'Button', 'grigora-kit' ) }
				/>
				<GrigoraRangeInput
					label={ __( 'Transition Time', 'grigora-kit' ) }
					max={ 5 }
					min={ 0.1 }
					unit={ 'sec' }
					step={ 0.1 }
					setValue={ ( transitionButtonColorTime ) =>
						setAttributes( { transitionButtonColorTime } )
					}
					value={ transitionButtonColorTime }
					resetValue={ 0.2 }
				/>
			</div>
		);
	}

	function buttonBgEffectNormalRender() {
		return (
			<>
				<GrigoraColorInput
					value={ buttonBgColor }
					onChange={ ( buttonBgColor ) => setAttributes( { buttonBgColor } ) }
					resetValue={ '#1768ea' }
					label={ __( 'Button Background', 'grigora-kit' ) }
				/>
			</>
		);
	}
	function buttonBgEffectHoverRender() {
		return (
			<div className={ `grigora-hover-effects-panel` }>
				<GrigoraColorInput
					value={ buttonBgHColor }
					onChange={ ( buttonBgHColor ) => setAttributes( { buttonBgHColor } ) }
					resetValue={ '#1768ea' }
					label={ __( 'Button Background', 'grigora-kit' ) }
				/>
				<GrigoraRangeInput
					label={ __( 'Transition Time', 'grigora-kit' ) }
					max={ 5 }
					min={ 0.1 }
					unit={ 'sec' }
					step={ 0.1 }
					setValue={ ( transitionButtonBgColorTime ) =>
						setAttributes( { transitionButtonBgColorTime } )
					}
					value={ transitionButtonBgColorTime }
					resetValue={ 0.2 }
				/>
			</div>
		);
	}

	function fieldEffectNormalRender() {
		return (
			<>
				<GrigoraColorInput
					value={ fieldTextColor }
					onChange={ ( fieldTextColor ) =>
						setAttributes( { fieldTextColor } )
					}
					resetValue={ 'black' }
					label={ __( 'field', 'grigora-kit' ) }
				/>
			</>
		);
	}
	function fieldEffectHoverRender() {
		return (
			<div className={ `grigora-hover-effects-panel` }>
				<GrigoraColorInput
					value={ fieldTextHColor }
					onChange={ ( fieldTextHColor ) =>
						setAttributes( { fieldTextHColor } )
					}
					resetValue={ 'black' }
					label={ __( 'field', 'grigora-kit' ) }
				/>
				<GrigoraRangeInput
					label={ __( 'Transition Time', 'grigora-kit' ) }
					max={ 5 }
					min={ 0.1 }
					unit={ 'sec' }
					step={ 0.1 }
					setValue={ ( transitionfieldColorTime ) =>
						setAttributes( { transitionfieldColorTime } )
					}
					value={ transitionFieldColorTime }
					resetValue={ 0.2 }
				/>
			</div>
		);
	}

	function fieldBgEffectNormalRender() {
		return (
			<>
				<GrigoraColorInput
					value={ fieldBgColor }
					onChange={ ( fieldBgColor ) => setAttributes( { fieldBgColor } ) }
					resetValue={ 'white' }
					label={ __( 'field Background', 'grigora-kit' ) }
				/>
			</>
		);
	}
	function fieldBgEffectHoverRender() {
		return (
			<div className={ `grigora-hover-effects-panel` }>
				<GrigoraColorInput
					value={ fieldBgHColor }
					onChange={ ( fieldBgHColor ) => setAttributes( { fieldBgHColor } ) }
					resetValue={ 'white' }
					label={ __( 'field Background', 'grigora-kit' ) }
				/>
				<GrigoraRangeInput
					label={ __( 'Transition Time', 'grigora-kit' ) }
					max={ 5 }
					min={ 0.1 }
					unit={ 'sec' }
					step={ 0.1 }
					setValue={ ( transitionfieldBgColorTime ) =>
						setAttributes( { transitionFieldBgColorTime } )
					}
					value={ transitionFieldBgColorTime }
					resetValue={ 0.2 }
				/>
			</div>
		);
	}

	function generalSettings() { 
		return (
			<>
			</>
		)
	}

	function stylesSettings() { 
		return (
			<>
				<Spacer marginBottom={ 0 } paddingX={ 3 } paddingY={ 3 }>

					<PanelBody title={ __( 'Label Settings', 'grigora-kit' ) }
						initialOpen={ false }
					>

						<br/>

						<GrigoraTypographyInput
							label={ __( 'Typography', 'grigora-kit' ) }
							size={ labelTypoSize }
							sizeChange={ ( labelTypoSize ) => {
								setAttributes( { labelTypoSize } );
							} }
							sizeReset={ 16 }
							lineHeight={ labelTypoLineHeight }
							lineHeightChange={ ( labelTypoLineHeight ) => {
								setAttributes( {
									labelTypoLineHeight:
										labelTypoLineHeight.toString(),
								} );
							} }
							letterSpacing={ labelTypoLetterSpacing }
							letterSpacingChange={ ( labelTypoLetterSpacing ) => {
								setAttributes( {
									labelTypoLetterSpacing:
										labelTypoLetterSpacing.toString(),
								} );
							} }
							wordSpacing={ labelTypoWordSpacing }
							wordSpacingChange={ ( labelTypoWordSpacing ) => {
								setAttributes( {
									labelTypoWordSpacing:
										labelTypoWordSpacing.toString(),
								} );
							} }
							transform={ labelTypoTransform }
							transformChange={ ( labelTypoTransform ) =>
								setAttributes( { labelTypoTransform } )
							}
							style={ labelTypoStyle }
							styleChange={ ( labelTypoStyle ) =>
								setAttributes( { labelTypoStyle } )
							}
							decoration={ labelTypoDecoration }
							decorationChange={ ( labelTypoDecoration ) =>
								setAttributes( { labelTypoDecoration } )
							}
							weight={ labelTypoWeight }
							weightChange={ ( labelTypoWeight ) =>
								setAttributes( { labelTypoWeight } )
							}
							hasFontFamily="true"
							fontFamilyChange={ ( labelTypoFontFamily ) =>
								setAttributes( { labelTypoFontFamily } )
							}
							fontFamily={ labelTypoFontFamily }
						/>
						
						<br />

						<PanelBody title={ __( 'Color', 'grigora-kit' ) }
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
									<>{ labelEffectNormalRender() }</>
								</TabPanel>
								<TabPanel>
									<>{ labelEffectHoverRender() }</>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<PanelBody title={ __( 'Background Color', 'grigora-kit' ) }
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
									<>{ labelBgEffectNormalRender() }</>
								</TabPanel>
								<TabPanel>
									<>{ labelBgEffectHoverRender() }</>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<GrigoraBoxInput
							label={ __( 'Padding', 'grigora-kit' ) }
							onChange={ ( labelPadding ) =>
								setAttributes( { labelPadding } )
							}
							values={ labelPadding }
							resetValue={ {
								top: '0px',
								bottom: '0px',
								left: '0px',
								right: '0px',
							} }
						/>

					</PanelBody>

					<PanelBody title={ __( 'Button Settings', 'grigora-kit' ) }
						initialOpen={ false }
					>

						<br/>

						<GrigoraTypographyInput
							label={ __( 'Typography', 'grigora-kit' ) }
							size={ buttonTypoSize }
							sizeChange={ ( buttonTypoSize ) => {
								setAttributes( { buttonTypoSize } );
							} }
							sizeReset={ 20 }
							lineHeight={ buttonTypoLineHeight }
							lineHeightChange={ ( buttonTypoLineHeight ) => {
								setAttributes( {
									buttonTypoLineHeight:
										buttonTypoLineHeight.toString(),
								} );
							} }
							letterSpacing={ buttonTypoLetterSpacing }
							letterSpacingChange={ ( buttonTypoLetterSpacing ) => {
								setAttributes( {
									buttonTypoLetterSpacing:
										buttonTypoLetterSpacing.toString(),
								} );
							} }
							wordSpacing={ buttonTypoWordSpacing }
							wordSpacingChange={ ( buttonTypoWordSpacing ) => {
								setAttributes( {
									buttonTypoWordSpacing:
										buttonTypoWordSpacing.toString(),
								} );
							} }
							transform={ buttonTypoTransform }
							transformChange={ ( buttonTypoTransform ) =>
								setAttributes( { buttonTypoTransform } )
							}
							style={ buttonTypoStyle }
							styleChange={ ( buttonTypoStyle ) =>
								setAttributes( { buttonTypoStyle } )
							}
							decoration={ buttonTypoDecoration }
							decorationChange={ ( buttonTypoDecoration ) =>
								setAttributes( { buttonTypoDecoration } )
							}
							weight={ buttonTypoWeight }
							weightChange={ ( buttonTypoWeight ) =>
								setAttributes( { buttonTypoWeight } )
							}
							hasFontFamily="true"
							fontFamilyChange={ ( buttonTypoFontFamily ) =>
								setAttributes( { buttonTypoFontFamily } )
							}
							fontFamily={ buttonTypoFontFamily }
						/>
						
						<br />

						<GrigoraBoxInput
							label={ __('Padding', 'grigora-kit')}
							button={ __( 'Padding', 'grigora-kit' ) }
							onChange={ ( buttonPadding ) =>
								setAttributes( { buttonPadding } )
							}
							values={ buttonPadding }
							resetValue={ {
								top: '10px',
								bottom: '10px',
								left: '10px',
								right: '10px',
							} }
						/>

						<PanelBody title={ __( 'Color', 'grigora-kit' ) }
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
									<>{ buttonEffectNormalRender() }</>
								</TabPanel>
								<TabPanel>
									<>{ buttonEffectHoverRender() }</>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<PanelBody title={ __( 'Background Color', 'grigora-kit' ) }
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
									<>{ buttonBgEffectNormalRender() }</>
								</TabPanel>
								<TabPanel>
									<>{ buttonBgEffectHoverRender() }</>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<PanelBody title={ __( 'Border', 'grigora-kit' ) }
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
											onChange={ ( buttonNBorder ) => {
												if ( ! buttonNBorder.top ) {
													setAttributes( {
														buttonNBorder: {
															top: buttonNBorder,
															bottom: buttonNBorder,
															right: buttonNBorder,
															left: buttonNBorder,
														},
													} );
												} else {
													setAttributes( { buttonNBorder } );
												}
											} }
											value={ buttonNBorder }
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
										<br></br>
										<GrigoraBorderRadiusInput
											label={ __( 'Radius', 'grigora-kit' ) }
											onChange={ ( buttonNBorderRadius ) => {
												if (
													typeof buttonNBorderRadius ===
														'string' ||
													buttonNBorderRadius instanceof
														String
												) {
													setAttributes( {
														buttonNBorderRadius: {
															topLeft:
																buttonNBorderRadius,
															topRight:
																buttonNBorderRadius,
															bottomLeft:
																buttonNBorderRadius,
															bottomRight:
																buttonNBorderRadius,
														},
													} );
												} else {
													setAttributes( {
														buttonNBorderRadius,
													} );
												}
											} }
											values={ buttonNBorderRadius }
											resetValue={ {
												topLeft: '5px',
												topRight: '5px',
												bottomLeft: '5px',
												bottomRight: '5px',
											} }
										/>
									</>
								</TabPanel>
								<TabPanel>
									<>
										<GrigoraBorderBoxInput
											label={ __( 'Width', 'grigora-kit' ) }
											onChange={ ( buttonHBorder ) => {
												if ( ! buttonHBorder.top ) {
													setAttributes( {
														buttonHBorder: {
															top: buttonHBorder,
															bottom: buttonHBorder,
															right: buttonHBorder,
															left: buttonHBorder,
														},
													} );
												} else {
													setAttributes( { buttonHBorder } );
												}
											} }
											value={ buttonHBorder }
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
											onChange={ ( buttonHBorderRadius ) => {
												if (
													typeof buttonHBorderRadius ===
														'string' ||
													buttonHBorderRadius instanceof
														String
												) {
													setAttributes( {
														buttonHBorderRadius: {
															topLeft:
																buttonHBorderRadius,
															topRight:
																buttonHBorderRadius,
															bottomLeft:
																buttonHBorderRadius,
															bottomRight:
																buttonHBorderRadius,
														},
													} );
												} else {
													setAttributes( {
														buttonHBorderRadius,
													} );
												}
											} }
											values={ buttonHBorderRadius }
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
											setValue={ ( transitionButtonBorderTime ) =>
												setAttributes( { transitionButtonBorderTime } )
											}
											value={ transitionButtonBorderTime }
											resetValue={ 0.2 }
										/>
									</>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<PanelBody title={ __( 'Box Shadow', 'grigora-kit' ) }
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
											value={ buttonNShadowColor }
											onChange={ ( buttonNShadowColor ) =>
												setAttributes( {
													buttonNShadowColor,
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
												value={ buttonNShadowHO }
												onChange={ ( buttonNShadowHO ) =>
													setAttributes( {
														buttonNShadowHO,
													} )
												}
												resetValue={ '1px' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Vertical',
													'grigora-kit'
												) }
												value={ buttonNShadowVO }
												onChange={ ( buttonNShadowVO ) =>
													setAttributes( {
														buttonNShadowVO,
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
												value={ buttonNShadowBlur }
												onChange={ ( buttonNShadowBlur ) =>
													setAttributes( {
														buttonNShadowBlur,
													} )
												}
												resetValue={ '14px' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Spread',
													'grigora-kit'
												) }
												value={ buttonNShadowSpread }
												onChange={ (
													buttonNShadowSpread
												) =>
													setAttributes( {
														buttonNShadowSpread,
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
											value={ buttonHShadowColor }
											onChange={ ( buttonHShadowColor ) =>
												setAttributes( {
													buttonHShadowColor,
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
												value={ buttonHShadowHO }
												onChange={ ( buttonHShadowHO ) =>
													setAttributes( {
														buttonHShadowHO,
													} )
												}
												resetValue={ '' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Vertical',
													'grigora-kit'
												) }
												value={ buttonHShadowVO }
												onChange={ ( buttonHShadowVO ) =>
													setAttributes( {
														buttonHShadowVO,
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
												value={ buttonHShadowBlur }
												onChange={ ( buttonHShadowBlur ) =>
													setAttributes( {
														buttonHShadowBlur,
													} )
												}
												resetValue={ '' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Spread',
													'grigora-kit'
												) }
												value={ buttonHShadowSpread }
												onChange={ (
													buttonHShadowSpread
												) =>
													setAttributes( {
														buttonHShadowSpread,
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
											setValue={ ( transitionButtonShadowTime ) =>
												setAttributes( {
													transitionButtonShadowTime,
												} )
											}
											value={ transitionButtonShadowTime }
											resetValue={ 0.2 }
										/>
									</>
								</TabPanel>
							</Tabs>
						</PanelBody>

					</PanelBody>

					<PanelBody title={ __( 'Field Settings', 'grigora-kit' ) }
						initialOpen={ false }
					>

						<br/>

						<GrigoraTypographyInput
							label={ __( 'Typography', 'grigora-kit' ) }
							size={ fieldTypoSize }
							sizeChange={ ( fieldTypoSize ) => {
								setAttributes( { fieldTypoSize } );
							} }
							sizeReset={ 20 }
							lineHeight={ fieldTypoLineHeight }
							lineHeightChange={ ( fieldTypoLineHeight ) => {
								setAttributes( {
									fieldTypoLineHeight:
										fieldTypoLineHeight.toString(),
								} );
							} }
							letterSpacing={ fieldTypoLetterSpacing }
							letterSpacingChange={ ( fieldTypoLetterSpacing ) => {
								setAttributes( {
									fieldTypoLetterSpacing:
										fieldTypoLetterSpacing.toString(),
								} );
							} }
							wordSpacing={ fieldTypoWordSpacing }
							wordSpacingChange={ ( fieldTypoWordSpacing ) => {
								setAttributes( {
									fieldTypoWordSpacing:
										fieldTypoWordSpacing.toString(),
								} );
							} }
							transform={ fieldTypoTransform }
							transformChange={ ( fieldTypoTransform ) =>
								setAttributes( { fieldTypoTransform } )
							}
							style={ fieldTypoStyle }
							styleChange={ ( fieldTypoStyle ) =>
								setAttributes( { fieldTypoStyle } )
							}
							decoration={ fieldTypoDecoration }
							decorationChange={ ( fieldTypoDecoration ) =>
								setAttributes( { fieldTypoDecoration } )
							}
							weight={ fieldTypoWeight }
							weightChange={ ( fieldTypoWeight ) =>
								setAttributes( { fieldTypoWeight } )
							}
							hasFontFamily="true"
							fontFamilyChange={ ( fieldTypoFontFamily ) =>
								setAttributes( { fieldTypoFontFamily } )
							}
							fontFamily={ fieldTypoFontFamily }
						/>
						
						<br />

						<GrigoraBoxInput
							label={ __('Padding', 'grigora-kit')}
							field={ __( 'Padding', 'grigora-kit' ) }
							onChange={ ( fieldPadding ) =>
								setAttributes( { fieldPadding } )
							}
							values={ fieldPadding }
							resetValue={ {
								top: '10px',
								bottom: '10px',
								left: '10px',
								right: '10px',
							} }
						/>

						<PanelBody title={ __( 'Color', 'grigora-kit' ) }
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
									<>{ fieldEffectNormalRender() }</>
								</TabPanel>
								<TabPanel>
									<>{ fieldEffectHoverRender() }</>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<PanelBody title={ __( 'Background Color', 'grigora-kit' ) }
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
									<>{ fieldBgEffectNormalRender() }</>
								</TabPanel>
								<TabPanel>
									<>{ fieldBgEffectHoverRender() }</>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<PanelBody title={ __( 'Border', 'grigora-kit' ) }
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
											onChange={ ( fieldNBorder ) => {
												if ( ! fieldNBorder.top ) {
													setAttributes( {
														fieldNBorder: {
															top: fieldNBorder,
															bottom: fieldNBorder,
															right: fieldNBorder,
															left: fieldNBorder,
														},
													} );
												} else {
													setAttributes( { fieldNBorder } );
												}
											} }
											value={ fieldNBorder }
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
										<br></br>
										<GrigoraBorderRadiusInput
											label={ __( 'Radius', 'grigora-kit' ) }
											onChange={ ( fieldNBorderRadius ) => {
												if (
													typeof fieldNBorderRadius ===
														'string' ||
													fieldNBorderRadius instanceof
														String
												) {
													setAttributes( {
														fieldNBorderRadius: {
															topLeft:
																fieldNBorderRadius,
															topRight:
																fieldNBorderRadius,
															bottomLeft:
																fieldNBorderRadius,
															bottomRight:
																fieldNBorderRadius,
														},
													} );
												} else {
													setAttributes( {
														fieldNBorderRadius,
													} );
												}
											} }
											values={ fieldNBorderRadius }
											resetValue={ {
												topLeft: '5px',
												topRight: '5px',
												bottomLeft: '5px',
												bottomRight: '5px',
											} }
										/>
									</>
								</TabPanel>
								<TabPanel>
									<>
										<GrigoraBorderBoxInput
											label={ __( 'Width', 'grigora-kit' ) }
											onChange={ ( fieldHBorder ) => {
												if ( ! fieldHBorder.top ) {
													setAttributes( {
														fieldHBorder: {
															top: fieldHBorder,
															bottom: fieldHBorder,
															right: fieldHBorder,
															left: fieldHBorder,
														},
													} );
												} else {
													setAttributes( { fieldHBorder } );
												}
											} }
											value={ fieldHBorder }
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
											onChange={ ( fieldHBorderRadius ) => {
												if (
													typeof fieldHBorderRadius ===
														'string' ||
													fieldHBorderRadius instanceof
														String
												) {
													setAttributes( {
														fieldHBorderRadius: {
															topLeft:
																fieldHBorderRadius,
															topRight:
																fieldHBorderRadius,
															bottomLeft:
																fieldHBorderRadius,
															bottomRight:
																fieldHBorderRadius,
														},
													} );
												} else {
													setAttributes( {
														fieldHBorderRadius,
													} );
												}
											} }
											values={ fieldHBorderRadius }
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
											setValue={ ( transitionFieldBorderTime ) =>
												setAttributes( { transitionFieldBorderTime } )
											}
											value={ transitionFieldBorderTime }
											resetValue={ 0.2 }
										/>
									</>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<PanelBody title={ __( 'Box Shadow', 'grigora-kit' ) }
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
											value={ fieldNShadowColor }
											onChange={ ( fieldNShadowColor ) =>
												setAttributes( {
													fieldNShadowColor,
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
												value={ fieldNShadowHO }
												onChange={ ( fieldNShadowHO ) =>
													setAttributes( {
														fieldNShadowHO,
													} )
												}
												resetValue={ '1px' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Vertical',
													'grigora-kit'
												) }
												value={ fieldNShadowVO }
												onChange={ ( fieldNShadowVO ) =>
													setAttributes( {
														fieldNShadowVO,
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
												value={ fieldNShadowBlur }
												onChange={ ( fieldNShadowBlur ) =>
													setAttributes( {
														fieldNShadowBlur,
													} )
												}
												resetValue={ '14px' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Spread',
													'grigora-kit'
												) }
												value={ fieldNShadowSpread }
												onChange={ (
													fieldNShadowSpread
												) =>
													setAttributes( {
														fieldNShadowSpread,
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
											value={ fieldHShadowColor }
											onChange={ ( fieldHShadowColor ) =>
												setAttributes( {
													fieldHShadowColor,
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
												value={ fieldHShadowHO }
												onChange={ ( fieldHShadowHO ) =>
													setAttributes( {
														fieldHShadowHO,
													} )
												}
												resetValue={ '' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Vertical',
													'grigora-kit'
												) }
												value={ fieldHShadowVO }
												onChange={ ( fieldHShadowVO ) =>
													setAttributes( {
														fieldHShadowVO,
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
												value={ fieldHShadowBlur }
												onChange={ ( fieldHShadowBlur ) =>
													setAttributes( {
														fieldHShadowBlur,
													} )
												}
												resetValue={ '' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Spread',
													'grigora-kit'
												) }
												value={ fieldHShadowSpread }
												onChange={ (
													fieldHShadowSpread
												) =>
													setAttributes( {
														fieldHShadowSpread,
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
											setValue={ ( transitionFieldShadowTime ) =>
												setAttributes( {
													transitionFieldShadowTime,
												} )
											}
											value={ transitionFieldShadowTime }
											resetValue={ 0.2 }
										/>
									</>
								</TabPanel>
							</Tabs>
						</PanelBody>

					</PanelBody>

				</Spacer>
			</>
		)
	}

	function advancedSettings() { 
		return (
			<>
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
					.block-id-${ id } label{
						transition: color ${ transitionLabelColorTime }s, background-color ${ transitionLabelBgColorTime }s;
						padding-left: ${ labelPadding?.left };
						padding-right: ${ labelPadding?.right };
						padding-top: ${ labelPadding?.top };
						padding-bottom: ${ labelPadding?.bottom };
						font-size: ${ labelTypoSize }px ;
						font-weight: ${ labelTypoWeight } ;
						text-transform: ${ labelTypoTransform } ;
						font-style: ${ labelTypoStyle } ;
						text-decoration: ${ labelTypoDecoration } ;
						line-height: ${
							labelTypoLineHeight != 'normal'
								? `${ labelTypoLineHeight }px`
								: `normal`
						} ;
						letter-spacing: ${
							labelTypoLetterSpacing != 'normal'
								? `${ labelTypoLetterSpacing }px`
								: `normal`
						} ;
						word-spacing: ${
							labelTypoWordSpacing != 'normal'
								? `${ labelTypoWordSpacing }px`
								: `normal`
						} ;
						font-family: ${ labelTypoFontFamily ? labelTypoFontFamily : '' } ;
						${ labelTextColor ? `color: ${ labelTextColor };` : `` }
						${ labelBgColor ? `background-color: ${ labelBgColor };` : `` }
					}
					${
						labelTextHColor ? ` .block-id-${ id } label:hover {
							color: ${ labelTextHColor };
						}` : ``
					}
					${
						labelBgHColor ? ` .block-id-${ id } label:hover {
							background-color: ${ labelBgHColor };
						}` : ``
					}
					.block-id-${ id } button{
						transition: color ${ transitionButtonColorTime }s, background-color ${ transitionButtonBgColorTime }s;
						border-left: ${ buttonNBorder?.left?.width } ${ buttonNBorder?.left?.style } ${
							buttonNBorder?.left?.color
								? buttonNBorder?.left?.color
								: ''
						} !important;
						border-right: ${ buttonNBorder?.right?.width } ${
							buttonNBorder?.right?.style
						} ${
							buttonNBorder?.right?.color
								? buttonNBorder?.right?.color
								: ''
						} !important;
						border-top: ${ buttonNBorder?.top?.width } ${ buttonNBorder?.top?.style } ${
							buttonNBorder?.top?.color
								? buttonNBorder?.top?.color
								: ''
						} !important;
						border-bottom: ${ buttonNBorder?.bottom?.width } ${
							buttonNBorder?.bottom?.style
						} ${
							buttonNBorder?.bottom?.color
								? buttonNBorder?.bottom?.color
								: ''
						} !important;
						border-top-right-radius: ${ buttonNBorderRadius?.topRight } !important;
						border-top-left-radius: ${ buttonNBorderRadius?.topLeft } !important;
						border-bottom-right-radius: ${ buttonNBorderRadius?.bottomRight } !important;
						border-bottom-left-radius: ${ buttonNBorderRadius?.bottomLeft } !important;
						box-shadow: ${ buttonNShadowHO } ${ buttonNShadowVO } ${ buttonNShadowBlur } ${ buttonNShadowSpread } ${ buttonNShadowColor } !important;
						padding-left: ${ buttonPadding?.left } !important;
						padding-right: ${ buttonPadding?.right } !important;
						padding-top: ${ buttonPadding?.top } !important;
						padding-bottom: ${ buttonPadding?.bottom } !important;
						font-size: ${ buttonTypoSize }px !important;
						font-weight: ${ buttonTypoWeight } !important;
						text-transform: ${ buttonTypoTransform } ;
						font-style: ${ buttonTypoStyle } ;
						text-decoration: ${ buttonTypoDecoration } ;
						line-height: ${
							buttonTypoLineHeight != 'normal'
								? `${ buttonTypoLineHeight }px`
								: `normal`
						} !important;
						letter-spacing: ${
							buttonTypoLetterSpacing != 'normal'
								? `${ buttonTypoLetterSpacing }px`
								: `normal`
						} ;
						word-spacing: ${
							buttonTypoWordSpacing != 'normal'
								? `${ buttonTypoWordSpacing }px`
								: `normal`
						} ;
						${ buttonTypoFontFamily  ? `font-family: ${ buttonTypoFontFamily }; !important` : '' }
						${ buttonTextColor ? `color: ${ buttonTextColor } !important;` : `` }
						${ buttonBgColor ? `background-color: ${ buttonBgColor } !important;` : `` }
					}
					.block-id-${ id } button:hover {
						${ buttonTextHColor ? `color: ${ buttonTextHColor } !important;` : `` }
						${ buttonBgHColor ? `background-color: ${ buttonBgHColor } !important;` : `` }
						${
							buttonHShadowHO ||
							buttonHShadowVO ||
							buttonHShadowBlur ||
							buttonHShadowSpread
								? `box-shadow: ${
										buttonHShadowHO
											? buttonHShadowHO
											: buttonNShadowHO
								} ${
										buttonHShadowVO
											? buttonHShadowVO
											: buttonNShadowVO
								} ${
										buttonHShadowBlur
											? buttonHShadowBlur
											: buttonNShadowBlur
								} ${
										buttonHShadowSpread
											? buttonHShadowSpread
											: buttonNShadowSpread
								} ${ buttonHShadowColor } !important;`
								: ``
						}
						border-left: ${ buttonHBorder?.left?.width } ${ buttonHBorder?.left?.style } ${ buttonHBorder?.left?.color ? buttonHBorder?.left?.color : '' } !important;
						border-right: ${ buttonHBorder?.right?.width } ${ buttonHBorder?.right?.style } ${ buttonHBorder?.right?.color ? buttonHBorder?.right?.color : '' } !important;
						border-top: ${ buttonHBorder?.top?.width } ${ buttonHBorder?.top?.style } ${ buttonHBorder?.top?.color ? buttonHBorder?.top?.color : '' } !important;
						border-bottom: ${ buttonHBorder?.bottom?.width } ${ buttonHBorder?.bottom?.style } ${ buttonHBorder?.bottom?.color ? buttonHBorder?.bottom?.color : '' } !important;
						${
							buttonHBorderRadius?.topRight
								? `border-top-right-radius: ${ buttonHBorderRadius?.topRight } !important;`
								: ``
						}
						${
							buttonHBorderRadius?.topLeft
								? `border-top-left-radius: ${ buttonHBorderRadius?.topLeft } !important;`
								: ``
						}
						${
							buttonHBorderRadius?.bottomRight
								? `border-bottom-right-radius: ${ buttonHBorderRadius?.bottomRight } !important;`
								: ``
						}
						${
							buttonHBorderRadius?.bottomLeft
								? `border-bottom-left-radius: ${ buttonHBorderRadius?.bottomLeft } !important;`
								: ``
						}
					}
					.block-id-${ id } .input-style, .block-id-${ id } .text-style{
						transition: color ${ transitionFieldColorTime }s, background-color ${ transitionFieldBgColorTime }s !important;
						border-left: ${ fieldNBorder?.left?.width } ${ fieldNBorder?.left?.style } ${
							fieldNBorder?.left?.color
								? fieldNBorder?.left?.color
								: ''
						} !important;
						border-right: ${ fieldNBorder?.right?.width } ${
							fieldNBorder?.right?.style
						} ${
							fieldNBorder?.right?.color
								? fieldNBorder?.right?.color
								: ''
						} !important;
						border-top: ${ fieldNBorder?.top?.width } ${ fieldNBorder?.top?.style } ${
							fieldNBorder?.top?.color
								? fieldNBorder?.top?.color
								: ''
						} !important;
						border-bottom: ${ fieldNBorder?.bottom?.width } ${
							fieldNBorder?.bottom?.style
						} ${
							fieldNBorder?.bottom?.color
								? fieldNBorder?.bottom?.color
								: ''
						} !important;
						border-top-right-radius: ${ fieldNBorderRadius?.topRight } !important;
						border-top-left-radius: ${ fieldNBorderRadius?.topLeft } !important;
						border-bottom-right-radius: ${ fieldNBorderRadius?.bottomRight } !important;
						border-bottom-left-radius: ${ fieldNBorderRadius?.bottomLeft } !important;
						box-shadow: ${ fieldNShadowHO } ${ fieldNShadowVO } ${ fieldNShadowBlur } ${ fieldNShadowSpread } ${ fieldNShadowColor } !important;
						padding-left: ${ fieldPadding?.left } !important;
						padding-right: ${ fieldPadding?.right } !important;
						padding-top: ${ fieldPadding?.top } !important;
						padding-bottom: ${ fieldPadding?.bottom } !important;
						font-size: ${ fieldTypoSize }px !important;
						font-weight: ${ fieldTypoWeight } !important;
						text-transform: ${ fieldTypoTransform } ;
						font-style: ${ fieldTypoStyle } ;
						text-decoration: ${ fieldTypoDecoration } ;
						line-height: ${
							fieldTypoLineHeight != 'normal'
								? `${ fieldTypoLineHeight }px`
								: `normal`
						} !important;
						letter-spacing: ${
							fieldTypoLetterSpacing != 'normal'
								? `${ fieldTypoLetterSpacing }px`
								: `normal`
						} ;
						word-spacing: ${
							fieldTypoWordSpacing != 'normal'
								? `${ fieldTypoWordSpacing }px`
								: `normal`
						} ;
						${ fieldTypoFontFamily  ? `font-family: ${ fieldTypoFontFamily }; !important` : '' }
						${ fieldTextColor ? `color: ${ fieldTextColor } !important;` : `` }
						${ fieldBgColor ? `background-color: ${ fieldBgColor } !important;` : `` }
					}
				` }
			</style>
			<div { ...innerBlocksProps } />
			<Googlefontloader
				config={ {
					google: {
						families: [
							labelTypoFontFamily,
							buttonTypoFontFamily,
							fieldTypoFontFamily
						],
					},
				} }
			></Googlefontloader>
		</div>
	);
}
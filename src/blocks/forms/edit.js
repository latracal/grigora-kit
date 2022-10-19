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
		buttonBorderRadius,
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

						<GrigoraBorderRadiusInput
							label={ __( 'Border Radius', 'grigora-kit' ) }
							onChange={ ( buttonBorderRadius ) => {
								if (
									typeof buttonBorderRadius === 'string' ||
									buttonBorderRadius instanceof String
								) {
									setAttributes( {
										buttonBorderRadius: {
											topLeft: buttonBorderRadius,
											topRight: buttonBorderRadius,
											bottomLeft: buttonBorderRadius,
											bottomRight: buttonBorderRadius,
										},
									} );
								} else {
									setAttributes( {
										buttonBorderRadius,
									} );
								}
							} }
							values={ buttonBorderRadius }
							resetValue={ {
								topLeft: '0px',
								topRight: '0px',
								bottomLeft: '0px',
								bottomRight: '0px',
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
						border-top-right-radius: ${ buttonBorderRadius?.topRight } !important;
						border-top-left-radius: ${ buttonBorderRadius?.topLeft } !important;
						border-bottom-right-radius: ${ buttonBorderRadius?.bottomRight } !important;
						border-bottom-left-radius: ${ buttonBorderRadius?.bottomLeft } !important;
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
					${
						buttonTextHColor ? ` .block-id-${ id } button:hover {
							color: ${ buttonTextHColor } !important;
						}` : ``
					}
					${
						buttonBgHColor ? ` .block-id-${ id } button:hover {
							background-color: ${ buttonBgHColor } !important;
						}` : ``
					}
					${
						buttonHShadowHO ||
						buttonHShadowVO ||
						buttonHShadowBlur ||
						buttonHShadowSpread
							? `.block-id-${ id } button:hover {box-shadow: ${
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
							  } ${ buttonHShadowColor };}`
							: ``
					}
				` }
			</style>
			<div { ...innerBlocksProps } />
			<Googlefontloader
				config={ {
					google: {
						families: [
							labelTypoFontFamily,
						],
					},
				} }
			></Googlefontloader>
		</div>
	);
}
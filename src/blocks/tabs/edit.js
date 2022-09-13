import classnames from 'classnames';

import { useSelect } from '@wordpress/data';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import {
	TabPanel as WTabPanel,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	useInnerBlocksProps,
	BlockControls,
	AlignmentControl,
	store as blockEditorStore,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
	DateTimePicker,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
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

import InspectorTabs from '@components/inspector-tabs';
import { forEach } from 'lodash';

import parse from 'html-react-parser';

export default function Edit( props ) {
	const { attributes, setAttributes, isSelected, clientId } = props;

	const { 
		id,
		renderer,
		tabs,
		activeTab,
		minHeight,
		maxWidth,
		showTabTitles,
		entranceAnimation,
		entranceAnimationTime,
		typoTSize,
		typoTStyle,
		typoTDecoration,
		typoTLetterSpacing,
		typoTLineHeight,
		typoTTransform,
		typoTWeight,
		typoTWordSpacing,
		titleColor,
		titleHoverColor,
		activeColor,
		bgColor,
		margin,
		padding,
		effectNBorder,
		effectNBorderRadius,
		typoCSize,
		typoCStyle,
		typoCDecoration,
		typoCLetterSpacing,
		typoCLineHeight,
		typoCTransform,
		typoCWeight,
		typoCWordSpacing,
		contentColor,
		contentHoverColor,
		contentBgColor,
		contentMargin,
		contentPadding,
		effectCBorder,
		effectCBorderRadius,
	 } = attributes;

	const MY_TEMPLATE = [
		[ 'grigora-kit/inner-tab', {} ],
		[ 'grigora-kit/inner-tab', {} ],
		[ 'grigora-kit/inner-tab', {} ],
	];

	const [ currentTab, setCurrentTab ] = useState( activeTab );

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
		'grigora-kit/inner-tab',
	];

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'tabs' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'tabs' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );


	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-tabs': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

	const innerBlocksProps = useInnerBlocksProps( {
		className: classnames( {
			'tab-contents': true,
		} ),
	},{
		template: MY_TEMPLATE,
		templateLock: "all",
		allowedBlocks: ALLOWED_BLOCKS,
	} );

	function generalSettings(){
		return(
			<Spacer marginBottom={ 0 } paddingX={ 3 } paddingY={ 3 }>
				<GrigoraTextInput
							label={ __(
								'Initially Opened Tab',
								'grigora-kit'
							) }
							onChange={ ( activeTab ) =>
								setAttributes( { activeTab } )
							}
							value={ activeTab }
							resetValue={ 1 }
				/>

				<GrigoraRangeInput
						value={ minHeight }
						setValue={ ( minHeight ) => {
							setAttributes( { minHeight: minHeight.toString() } );
						} }
						label={ `Minimum Height` }
						resetValue={ '100px' }
				/>

				<GrigoraRangeInput
						value={ maxWidth }
						setValue={ ( maxWidth ) => {
							setAttributes( { maxWidth: maxWidth.toString() } );
						} }
						label={ `Maximum Width` }
						resetValue={ '100%' }
				/>

				<GrigoraToggleInput
						label={ `Show Tab Titles` }
						value={ showTabTitles }
						onChange={ ( showTabTitles ) =>
							setAttributes( { showTabTitles } )
						}
				/>
			</Spacer>
		)
	}

	function stylesSettings(){
		return(
			<>
			<PanelBody
					title={ __( 'Title', 'grigora-kit' ) }
					initialOpen={ false }
				>
				<GrigoraRangeInput
							value={ typoTSize }
							setValue={ ( typoTSize ) => {
								setAttributes( {
									typoTSize: typoTSize.toString(),
								} );
							} }
							label={ `Size` }
							resetValue={ 'default' }
						/>
						<GrigoraRangeInput
							value={ typoTLineHeight }
							setValue={ ( typoTLineHeight ) => {
								setAttributes( {
									typoTLineHeight: typoTLineHeight.toString(),
								} );
							} }
							label={ `Line Height` }
							min={ 10 }
							max={ 300 }
							resetValue={ 'normal' }
						/>
						<GrigoraRangeInput
							value={ typoTLetterSpacing }
							setValue={ ( typoTLetterSpacing ) => {
								setAttributes( {
									typoTLetterSpacing:
										typoTLetterSpacing.toString(),
								} );
							} }
							label={ `Letter Spacing` }
							min={ 0 }
							max={ 150 }
							resetValue={ 'normal' }
						/>
						<GrigoraRangeInput
							value={ typoTWordSpacing }
							setValue={ ( typoTWordSpacing ) => {
								setAttributes( {
									typoTWordSpacing:
										typoTWordSpacing.toString(),
								} );
							} }
							label={ `Word Spacing` }
							min={ 0 }
							max={ 150 }
							resetValue={ 'normal' }
						/>
						<br></br>
						<HStack
							spacing={ 2 }
							className="grigora-dropdown-hstack"
						>
							<GrigoraSelectInput
								label={ __( 'Transform', 'grigora-kit' ) }
								onChange={ ( typoTTransform ) =>
									setAttributes( { typoTTransform } )
								}
								value={ typoTTransform }
								resetValue={ 'none' }
								options={ TEXT_TRANSFORMS }
							/>
							<GrigoraSelectInput
								label={ __( 'Style', 'grigora-kit' ) }
								onChange={ ( typoTStyle ) =>
									setAttributes( { typoTStyle } )
								}
								value={ typoTStyle }
								resetValue={ 'normal' }
								options={ TEXT_STYLE }
							/>
						</HStack>
						<HStack
							spacing={ 2 }
							className="grigora-dropdown-hstack"
						>
							<GrigoraSelectInput
								label={ __( 'Decoration', 'grigora-kit' ) }
								onChange={ ( typoTDecoration ) =>
									setAttributes( { typoTDecoration } )
								}
								value={ typoTDecoration }
								resetValue={ 'initial' }
								options={ TEXT_DECORATION }
							/>
							<GrigoraSelectInput
								label={ __( 'Weight', 'grigora-kit' ) }
								onChange={ ( typoTWeight ) =>
									setAttributes( { typoTWeight } )
								}
								value={ typoTWeight }
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

						<GrigoraBoxInput
						label={ __( 'Padding', 'grigora-kit' ) }
						onChange={ ( padding ) =>
							setAttributes( { padding } )
						}
						values={ padding }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '5px',
							right: '5px',
						} }
					/>
					<GrigoraBoxInput
						label={ __( 'Margin', 'grigora-kit' ) }
						onChange={ ( margin ) =>
							setAttributes( { margin } )
						}
						values={ margin }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '0px',
							right: '0px',
						} }
					/>

				
			</PanelBody>
			<PanelBody
					title={ __( 'Title Color', 'grigora-kit' ) }
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
							{
								name: 'Hover',
								title: __( 'Active', 'grigora-kit' ),
								className: 'tab-hover',
							},
						] }
					>
						{ ( tab ) => {
							if ( tab.name == 'Normal' ) {
								return (
									<>
										<GrigoraColorInput
											label={ __( 'Title Color', 'grigora-kit' ) }
											value={ titleColor }
											onChange={ ( titleColor ) =>
												setAttributes( { titleColor } )
											}
											resetValue={ '#000' }
										/>

										<GrigoraColorInput
											label={ __( 'Background Color', 'grigora-kit' ) }
											value={ bgColor }
											onChange={ ( bgColor ) =>
												setAttributes( { bgColor } )
											}
											resetValue={ '#ffffff' }
										/>

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

									</>
								);
							} else if(tab.name == 'Active') {
								return (
									<>
										<GrigoraColorInput
											label={ __( 'Active Color', 'grigora-kit' ) }
											value={ activeColor }
											onChange={ ( activeColor ) =>
												setAttributes( { activeColor } )
											}
											resetValue={ '#000' }
										/>
									</>
								);
							}
							else{
								return (
									<>
										<GrigoraColorInput
											label={ __( 'Hover Color', 'grigora-kit' ) }
											value={ titleHoverColor }
											onChange={ ( titleHoverColor ) =>
												setAttributes( { titleHoverColor } )
											}
											resetValue={ '#000' }
										/>
									</>
								);
							}
						} }
					</WTabPanel>


			</PanelBody>
			<PanelBody
					title={ __( 'Content', 'grigora-kit' ) }
					initialOpen={ false }
				>

				<GrigoraRangeInput
							value={ typoCSize }
							setValue={ ( typoCSize ) => {
								setAttributes( {
									typoCSize: typoCSize.toString(),
								} );
							} }
							label={ `Size` }
							resetValue={ 'default' }
						/>
						<GrigoraRangeInput
							value={ typoCLineHeight }
							setValue={ ( typoCLineHeight ) => {
								setAttributes( {
									typoCLineHeight: typoCLineHeight.toString(),
								} );
							} }
							label={ `Line Height` }
							min={ 10 }
							max={ 300 }
							resetValue={ 'normal' }
						/>
						<GrigoraRangeInput
							value={ typoCLetterSpacing }
							setValue={ ( typoCLetterSpacing ) => {
								setAttributes( {
									typoCLetterSpacing:
										typoCLetterSpacing.toString(),
								} );
							} }
							label={ `Letter Spacing` }
							min={ 0 }
							max={ 150 }
							resetValue={ 'normal' }
						/>
						<GrigoraRangeInput
							value={ typoCWordSpacing }
							setValue={ ( typoCWordSpacing ) => {
								setAttributes( {
									typoCWordSpacing:
										typoCWordSpacing.toString(),
								} );
							} }
							label={ `Word Spacing` }
							min={ 0 }
							max={ 150 }
							resetValue={ 'normal' }
						/>
						<br></br>
						<HStack
							spacing={ 2 }
							className="grigora-dropdown-hstack"
						>
							<GrigoraSelectInput
								label={ __( 'Transform', 'grigora-kit' ) }
								onChange={ ( typoCTransform ) =>
									setAttributes( { typoCTransform } )
								}
								value={ typoCTransform }
								resetValue={ 'none' }
								options={ TEXT_TRANSFORMS }
							/>
							<GrigoraSelectInput
								label={ __( 'Style', 'grigora-kit' ) }
								onChange={ ( typoCStyle ) =>
									setAttributes( { typoCStyle } )
								}
								value={ typoCStyle }
								resetValue={ 'normal' }
								options={ TEXT_STYLE }
							/>
						</HStack>
						<HStack
							spacing={ 2 }
							className="grigora-dropdown-hstack"
						>
							<GrigoraSelectInput
								label={ __( 'Decoration', 'grigora-kit' ) }
								onChange={ ( typoCDecoration ) =>
									setAttributes( { typoCDecoration } )
								}
								value={ typoCDecoration }
								resetValue={ 'initial' }
								options={ TEXT_DECORATION }
							/>
							<GrigoraSelectInput
								label={ __( 'Weight', 'grigora-kit' ) }
								onChange={ ( typoCWeight ) =>
									setAttributes( { typoCWeight } )
								}
								value={ typoCWeight }
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

						<GrigoraBoxInput
						label={ __( 'Padding', 'grigora-kit' ) }
						onChange={ ( contentPadding ) =>
							setAttributes( { contentPadding } )
						}
						values={ contentPadding }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '5px',
							right: '5px',
						} }
					/>
					<GrigoraBoxInput
						label={ __( 'Margin', 'grigora-kit' ) }
						onChange={ ( contentMargin ) =>
							setAttributes( { contentMargin } )
						}
						values={ contentMargin }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '0px',
							right: '0px',
						} }
					/>

				
			</PanelBody>
			<PanelBody
					title={ __( 'Content Color', 'grigora-kit' ) }
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
								name: 'Hover',
								title: __( 'Hover', 'grigora-kit' ),
								className: 'tab-hover',
							},
						] }
					>
						{ ( tab ) => {
							if ( tab.name == 'Normal' ) {
								return (
									<>
										<GrigoraColorInput
											label={ __( 'Title Color', 'grigora-kit' ) }
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
											resetValue={ '#ffffff' }
										/>

									<GrigoraBorderBoxInput
										label={ __( 'Border width', 'grigora-kit' ) }
										onChange={ ( effectCBorder ) => {
											if ( ! effectCBorder.top ) {
												setAttributes( {
													effectCBorder: {
														top: effectCBorder,
														bottom: effectCBorder,
														right: effectCBorder,
														left: effectCBorder,
													},
												} );
											} else {
												setAttributes( { effectCBorder } );
											}
										} }
										value={ effectCBorder }
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
										onChange={ ( effectCBorderRadius ) => {
											if (
												typeof effectCBorderRadius === 'string' ||
												effectCBorderRadius instanceof String
											) {
												setAttributes( {
													effectCBorderRadius: {
														topLeft: effectCBorderRadius,
														topRight: effectCBorderRadius,
														bottomLeft: effectCBorderRadius,
														bottomRight: effectCBorderRadius,
													},
												} );
											} else {
												setAttributes( { effectCBorderRadius } );
											}
										} }
										values={ effectCBorderRadius }
										resetValue={ {
											topLeft: '4px',
											topRight: '4px',
											bottomLeft: '4px',
											bottomRight: '4px',
										} }
									/>

									</>
								);
							} 
							else{
								return (
									<>
										<GrigoraColorInput
											label={ __( 'Hover Color', 'grigora-kit' ) }
											value={ contentHoverColor }
											onChange={ ( contentHoverColor ) =>
												setAttributes( { contentHoverColor } )
											}
											resetValue={ '#000' }
										/>
									</>
								);
							}
						} }
					</WTabPanel>


			</PanelBody>
			</>
		)
	}

	function advancedSettings(){
		return(
			<>
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
						setValue={ ( entranceAnimationTime ) =>
							setAttributes( { entranceAnimationTime } )
						}
						value={ entranceAnimationTime }
						resetValue={ 1 }
					/>
				</PanelBody>
			</>
		)
	}

	return (
			<div { ...blockProps }>
				<InspectorControls >
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
					/* Hide all tabs */ 
					${
						`.block-id-${ id } .tab-contents .grigora-kit-inner-tab {display: none;}`
					}
					/* Show active tab */ 
					${
						`.block-id-${ id } .tab-contents .grigora-kit-inner-tab:nth-child(${currentTab+1}) {display: block;}`
					}
					`}
				</style>
				<div className='tab-titles'>
				{ tabs.map((item, index) => (
					<div className={`tab-btn tab-${item.id} ${currentTab == index ? `tab-active` : ``}`} key={index} onClick={()=>{setCurrentTab(index)}}>
						{item.title}
					</div>
					))
				}
				</div>
				<div {...innerBlocksProps}></div>
			</div>

	);
}

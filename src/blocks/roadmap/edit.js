import classnames from 'classnames';

import Countdown, { zeroPad } from 'react-countdown';
import { useSelect } from '@wordpress/data';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentControl,
	store as blockEditorStore,
	InnerBlocks,
	RichText,
} from '@wordpress/block-editor';

import IconPicker from '@components/icon-picker';

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

import parse from "html-react-parser"
import SVGIcons from '@constants/icons.json';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;

	const {
		id,
		roadmapItems,
		layout,
		textAlign,
		displayDate,
		displayAuthor,
		displayButton,
		titleTag,
		contentTag,
		icon,
		iconSize,
		iconBgSize,
		iconBorderWidth,
		connectorThickness,
		layoutPadding,
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
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'roadmap' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
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
		console.log("Button clicked")
		newItems.push({
				title: "",
				date: "",
				icon: "x-circle",
				link: "",
				linkText: "",
				content: "",
				author: ""
		});
		setAttributes({roadmapItems: newItems});
	}

	function setActiveIcon(icon){
		setAttributes({icon})
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

					<IconPicker
						activeIcon={ icon }
						setActiveIcon = { setActiveIcon }
					/>

					<GrigoraRangeInput
							value={ iconSize }
							setValue={ ( iconSize ) => {
							
								setAttributes( { iconSize } );
							} }
							label={ `Size` }
							resetValue={ 16 }
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
						resetValue={ '#fff' }
					/>

				<GrigoraColorInput
					label={ __( 'Content', 'grigora-kit' ) }
					value={ contentHoverColor }
					onChange={ ( contentHoverColor ) =>
						setAttributes( { contentHoverColor } )
					}
					resetValue={ '#fff' }
				/>

				<GrigoraColorInput
					label={ __( 'Background', 'grigora-kit' ) }
					value={ bgHoverColor }
					onChange={ ( bgHoverColor ) =>
						setAttributes( { bgHoverColor } )
					}
					resetValue={ '#3ea0e2' }
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
							resetValue={ '#fff' }
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
							resetValue={ '#fff' }
						/>

					</PanelBody>


				</PanelBody>

				<PanelBody
					title={ __( 'Typography', 'grigora-kit' ) }
					initialOpen={ false }
				>
					
					<PanelBody
					title={ __( 'Heading', 'grigora-kit' ) }
					initialOpen={ false }
					>

						<GrigoraRangeInput
							value={ typoHSize }
							setValue={ ( typoHSize ) => {
								setAttributes({titleTag: "div"});
								setAttributes( { typoHSize: typoHSize.toString() } );
							} }
							label={ `Size` }
							resetValue={ 'default' }
						/>
						<GrigoraRangeInput
							value={ typoHLineHeight }
							setValue={ ( typoHLineHeight ) => {
								setAttributes( {
									typoHLineHeight: typoHLineHeight.toString(),
								} );
							} }
							label={ `Line Height` }
							min={ 10 }
							max={ 300 }
							resetValue={ 'normal' }
						/>
						<GrigoraRangeInput
							value={ typoHLetterSpacing }
							setValue={ ( typoHLetterSpacing ) => {
								setAttributes( {
									typoHLetterSpacing: typoHLetterSpacing.toString(),
								} );
							} }
							label={ `Letter Spacing` }
							min={ 0 }
							max={ 150 }
							resetValue={ 'normal' }
						/>
						<HStack spacing={ 2 } className="grigora-dropdown-hstack">
							<GrigoraSelectInput
								label={ __( 'Transform', 'grigora-kit' ) }
								onChange={ ( typoHTransform ) =>
									setAttributes( { typoHTransform } )
								}
								value={ typoHTransform }
								resetValue={ 'none' }
								options={ TEXT_TRANSFORMS }
							/>
							<GrigoraSelectInput
								label={ __( 'Style', 'grigora-kit' ) }
								onChange={ ( typoHStyle ) =>
									setAttributes( { typoHStyle } )
								}
								value={ typoHStyle }
								resetValue={ 'normal' }
								options={ TEXT_STYLE }
							/>
						</HStack>
						<HStack spacing={ 2 } className="grigora-dropdown-hstack">
							<GrigoraSelectInput
								label={ __( 'Decoration', 'grigora-kit' ) }
								onChange={ ( typoHDecoration ) =>
									setAttributes( { typoHDecoration } )
								}
								value={ typoHDecoration }
								resetValue={ 'initial' }
								options={ TEXT_DECORATION }
							/>
							<GrigoraSelectInput
								label={ __( 'Weight', 'grigora-kit' ) }
								onChange={ ( typoHWeight ) =>
									setAttributes( { typoHWeight } )
								}
								value={ typoHWeight }
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
							<GrigoraRangeInput
								value={ typoHWordSpacing }
								setValue={ ( typoHWordSpacing ) => {
									setAttributes( {
										typoHWordSpacing: typoHWordSpacing.toString(),
									} );
								} }
								label={ `Word Spacing` }
								min={ 0 }
								max={ 150 }
								resetValue={ 'normal' }
							/>

					</PanelBody>

					<PanelBody
					title={ __( 'Content', 'grigora-kit' ) }
					initialOpen={ false }
					>
						<GrigoraRangeInput
							value={ typoCSize }
							setValue={ ( typoCSize ) => {
								setAttributes( { typoCSize: typoCSize.toString() } );
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
									typoCLetterSpacing: typoCLetterSpacing.toString(),
								} );
							} }
							label={ `Letter Spacing` }
							min={ 0 }
							max={ 150 }
							resetValue={ 'normal' }
						/>
						<HStack spacing={ 2 } className="grigora-dropdown-hstack">
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
						<HStack spacing={ 2 } className="grigora-dropdown-hstack">
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
							<GrigoraRangeInput
								value={ typoCWordSpacing }
								setValue={ ( typoCWordSpacing ) => {
									setAttributes( {
										typoCWordSpacing: typoCWordSpacing.toString(),
									} );
								} }
								label={ `Word Spacing` }
								min={ 0 }
								max={ 150 }
								resetValue={ 'normal' }
							/>

					</PanelBody>

				</PanelBody>
			</>
		)
	}

	function advancedSettings(){
		return(
			<div>

			</div>
		)
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

					.block-id-${ id } .wrapper .row section{
						padding-left: ${ layoutPadding?.left };
						padding-right: ${ layoutPadding?.right };
						padding-top: ${ layoutPadding?.top };
						padding-bottom: ${ layoutPadding?.bottom };
						background-color: ${ bgColor };	
					}


					.block-id-${ id } .wrapper .row section::before{
						background-color: ${ bgColor };
					}

					.block-id-${ id } .icon svg{
						height: ${ iconSize }px;
						width: ${ iconSize }px;
						color: ${ iconColor };
						
					}

					
					

					.block-id-${ id } .row section .icon {
						height: ${ iconBgSize }px;
						width: ${ iconBgSize }px;
						background-color: ${ iconBgColor };
					}

					.block-id-${ id }  .row section .icon, .center-line .scroll-icon{
						box-shadow: 0 0 0 ${iconBorderWidth}px ${iconBorderColor}, inset 0 2px 0 rgba(0,0,0,0.08), 0 3px 0 4px rgba(0,0,0,0.05);
					}

					.block-id-${ id } .wrapper .center-line{
						width: ${connectorThickness}px;
						background-color: ${connectorColor};
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


					}

					.block-id-${ id } .row section .details, .block-id-${ id } .row section .bottom{
						${textAlign === 'rtl' ? 'flex-direction: row-reverse;' : 'flex-direction: row;'}
					}

					
					
					
					`
				}
			</style>
			<div className={`wrapper ${layout==='leftright' ? 'middle': ''}`}>
				<div className={`center-line ${layout==='left' ? 'left' : layout ==='right' ? 'right' : ''}`}>
					<div className="scroll-icon">
						{parse(SVGIcons[ 'chevron-up' ])}
					</div>
				</div>
				{
					roadmapItems.map( ( item, index ) => {
					
						return(
							<div className={`row row-${layout === "left" ? '2 left' : layout === "right" ? '1 right' : (index % 2 == 0 ? '1' : '2')}`}>
								<section>
									<div className='icon'>
										{icon && parse(SVGIcons[ icon ])}
									</div>
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
								</section>
							</div>
						)
					
					})
				}
				
			</div>
			<Button variant="primary" 
			onClick={handleAddButton}
			>Add On</Button>
		</div>
	)

}
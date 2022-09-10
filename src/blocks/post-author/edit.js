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
	ToolbarButton,
	Popover,
	Button,
	Icon,
	Tooltip,
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
	arrowRight,
	arrowDown,
	arrowLeft,
	image,
} from '@wordpress/icons';
import { useState, useRef, useEffect } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect, useDispatch } from '@wordpress/data';
import { displayShortcut } from '@wordpress/keycodes';

import parse from 'html-react-parser';

import {
	ENTRANCE_ANIMATIONS,
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
import GrigoraBorderBoxInput from '@components/borderbox-input';
import GrigoraBoxInput from '@components/box-input';
import GrigoraBorderRadiusInput from '@components/borderradius-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraFontFamilyInput from '@components/fontfamily-input';
import GrigoraColorGradientInput from '@components/colorgradient-input';
import GrigoraTextInput from '@components/text-input';
import InspectorTabs from '@components/inspector-tabs';
import SVGIcons from '@constants/icons.json';
import Googlefontloader from '@components/googlefontloader';
import GrigoraToggleInput from '@components/toggle-input';

export default function Edit( props ) {
	const {
		attributes,
		setAttributes,
		context: { postType, postId },
	} = props;

	const {
		id,
		align,
		layout,
		author,
		showAvatar,
		showName,
		NameTag,
		nameLink,
		showBio,
		nameColor,
		bioColor,
		backColor,
		nameHColor,
		bioHColor,
		backHColor,
		stylesTransitionTime,
		imageVerticalAlign,
		imageSize,
		imageGap,
		imageBorderRadius,
		imageBorderFlag,
		imageBorder,
		typoSize,
		typoWeight,
		typoTransform,
		typoStyle,
		typoDecoration,
		typoLineHeight,
		typoLetterSpacing,
		typoWordSpacing,
		typoFontFamily,
		typoBSize,
		typoBWeight,
		typoBTransform,
		typoBStyle,
		typoBDecoration,
		typoBLineHeight,
		typoBLetterSpacing,
		typoBWordSpacing,
		typoBFontFamily,
		entranceAnimation,
		transitionAnimationTime,
		transitionTime,
		effectNBorder,
		effectNBorderRadius,
		effectHBorder,
		effectHBorderRadius,
		effectNShadowColor,
		effectNShadowHO,
		effectNShadowVO,
		effectNShadowBlur,
		effectNShadowSpread,
		effectHShadowColor,
		effectHShadowHO,
		effectHShadowVO,
		effectHShadowBlur,
		effectHShadowSpread,
		effectNPerspective,
		effectNRotateX,
		effectNRotateY,
		effectNRotateZ,
		effectNSkewX,
		effectNSkewY,
		effectNOffsetX,
		effectNOffsetY,
		effectNScale,
		effectHPerspective,
		effectHRotateX,
		effectHRotateY,
		effectHRotateZ,
		effectHSkewX,
		effectHSkewY,
		effectHOffsetX,
		effectHOffsetY,
		effectHScale,
		layoutPadding,
		layoutMargin,
	} = attributes;

	const { authorId, authorDetails, authors } = useSelect(
		( select ) => {
			const { getEditedEntityRecord, getUser, getUsers } =
				select( coreStore );
			const _authorId = getEditedEntityRecord(
				'postType',
				postType,
				postId
			)?.author;

			return {
				authorId: _authorId,
				authorDetails: _authorId
					? getUser( author == -1 ? _authorId : author )
					: null,
				authors: getUsers( { who: 'authors' } ),
			};
		},
		[ postType, postId, author ]
	);

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'post-author' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'post-author' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-post-author': true,
			[ `block-id-${ id }` ]: id,
			[ `animateOnce` ]: entranceAnimation != 'none',
		} ),
		style: {},
	} );

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

	function generalSettings() {
		return (
			<>
				<Spacer marginBottom={ 0 } paddingX={ 4 } paddingY={ 3 }>
					{ !! authors?.length && (
						<GrigoraSelectInput
							label={ __( 'Author', 'grigora-kit' ) }
							value={ author }
							options={ [
								{
									label: __(
										'Current Author',
										'grigora-kit'
									),
									value: -1,
								},
							].concat(
								authors.map( ( { id, name } ) => {
									return {
										value: id,
										label: name,
									};
								} )
							) }
							resetValue={ -1 }
							onChange={ ( author ) =>
								setAttributes( { author } )
							}
						/>
					) }
					<GrigoraToggleInput
						label={ __( 'Show avatar', 'grigora-kit' ) }
						value={ showAvatar }
						onChange={ () =>
							setAttributes( { showAvatar: ! showAvatar } )
						}
						resetValue={ true }
					/>
					<GrigoraToggleInput
						label={ __( 'Show name', 'grigora-kit' ) }
						value={ showName }
						onChange={ () =>
							setAttributes( { showName: ! showName } )
						}
						resetValue={ true }
					/>
					{ showName && (
						<>
							<GrigoraSelectInput
								label={ __( 'HTML Tag', 'grigora-kit' ) }
								value={ NameTag }
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
								onChange={ ( NameTag ) =>
									setAttributes( { NameTag } )
								}
							/>
							<GrigoraSelectInput
								label={ __( 'Link', 'grigora-kit' ) }
								value={ nameLink }
								options={ [
									{
										label: 'None',
										value: 'none',
									},
									{
										label: 'Website',
										value: 'website',
									},
									{
										label: 'Posts Archive',
										value: 'postsarchive',
									},
								] }
								resetValue={ 'none' }
								onChange={ ( nameLink ) =>
									setAttributes( { nameLink } )
								}
							/>
						</>
					) }
					<GrigoraToggleInput
						label={ __( 'Show bio', 'grigora-kit' ) }
						value={ showBio }
						onChange={ () =>
							setAttributes( { showBio: ! showBio } )
						}
						resetValue={ true }
					/>
					<GrigoraSelectInput
						label={ __( 'Layout', 'grigora-kit' ) }
						value={ layout }
						options={ [
							{
								label: 'Left',
								value: 'row',
							},
							{
								label: 'Above',
								value: 'column',
							},
							{
								label: 'Right',
								value: 'row-reverse',
							},
						] }
						resetValue={ 'row' }
						onChange={ ( layout ) => setAttributes( { layout } ) }
					/>
				</Spacer>
			</>
		);
	}

	function stylesSettings() {
		return (
			<>
				<PanelBody title={ __( 'Color', 'grigora-kit' ) }>
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
								{ showName && (
									<GrigoraColorInput
										label={ __( 'Name', 'grigora-kit' ) }
										value={ nameColor }
										onChange={ ( nameColor ) =>
											setAttributes( { nameColor } )
										}
										resetValue={ '' }
									/>
								) }
								{ showBio && (
									<GrigoraColorInput
										label={ __( 'Bio', 'grigora-kit' ) }
										value={ bioColor }
										onChange={ ( bioColor ) =>
											setAttributes( { bioColor } )
										}
										resetValue={ '' }
									/>
								) }
								<GrigoraColorInput
									label={ __( 'Background', 'grigora-kit' ) }
									value={ backColor }
									onChange={ ( backColor ) =>
										setAttributes( { backColor } )
									}
									resetValue={ '' }
								/>
							</>
						</TabPanel>
						<TabPanel>
							<>
								{ showName && (
									<GrigoraColorInput
										label={ __( 'Name', 'grigora-kit' ) }
										value={ nameHColor }
										onChange={ ( nameHColor ) =>
											setAttributes( { nameHColor } )
										}
										resetValue={ '' }
									/>
								) }
								{ showBio && (
									<GrigoraColorInput
										label={ __( 'Bio', 'grigora-kit' ) }
										value={ bioHColor }
										onChange={ ( bioHColor ) =>
											setAttributes( { bioHColor } )
										}
										resetValue={ '' }
									/>
								) }
								<GrigoraColorInput
									label={ __( 'Background', 'grigora-kit' ) }
									value={ backHColor }
									onChange={ ( backHColor ) =>
										setAttributes( { backHColor } )
									}
									resetValue={ '' }
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
									setValue={ ( stylesTransitionTime ) =>
										setAttributes( {
											stylesTransitionTime,
										} )
									}
									value={ stylesTransitionTime }
									resetValue={ 0.2 }
								/>
							</>
						</TabPanel>
					</Tabs>
				</PanelBody>
				{ showAvatar && (
					<PanelBody
						title={ __( 'Image', 'grigora-kit' ) }
						initialOpen={ false }
					>
						<>
							{ layout != 'column' && (
								<GrigoraSelectInput
									label={ __(
										'Vertical Align',
										'grigora-kit'
									) }
									value={ imageVerticalAlign }
									options={ [
										{
											label: 'Start',
											value: 'start',
										},
										{
											label: 'Center',
											value: 'center',
										},
										{
											label: 'End',
											value: 'end',
										},
									] }
									resetValue={ 'center' }
									onChange={ ( imageVerticalAlign ) =>
										setAttributes( { imageVerticalAlign } )
									}
								/>
							) }
							<GrigoraRangeInput
								label={ __( 'Image Size', 'grigora-kit' ) }
								max={ 200 }
								min={ 1 }
								unit={ 'px' }
								setValue={ ( imageSize ) =>
									setAttributes( { imageSize } )
								}
								value={ imageSize }
								resetValue={ 96 }
							/>
							<GrigoraRangeInput
								label={ __( 'Gap', 'grigora-kit' ) }
								min={ 1 }
								max={ 100 }
								unit={ 'px' }
								setValue={ ( imageGap ) =>
									setAttributes( { imageGap } )
								}
								value={ imageGap }
								resetValue={ 10 }
							/>
							<GrigoraRangeInput
								label={ __( 'Border Radius', 'grigora-kit' ) }
								min={ 0 }
								max={ 100 }
								unit={ 'px' }
								setValue={ ( imageBorderRadius ) =>
									setAttributes( { imageBorderRadius } )
								}
								value={ imageBorderRadius }
								resetValue={ 48 }
							/>
							<ToggleControl
								label={ __( 'Border', 'grigora-kit' ) }
								checked={ !! imageBorderFlag }
								onChange={ () =>
									setAttributes( {
										imageBorderFlag: ! imageBorderFlag,
									} )
								}
							/>
							{ imageBorderFlag && (
								<GrigoraBorderBoxInput
									label={ __( 'Border', 'grigora-kit' ) }
									onChange={ ( imageBorder ) => {
										if ( ! imageBorder.top ) {
											setAttributes( {
												imageBorder: {
													top: imageBorder,
													bottom: imageBorder,
													right: imageBorder,
													left: imageBorder,
												},
											} );
										} else {
											setAttributes( { imageBorder } );
										}
									} }
									value={ imageBorder }
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
							) }
						</>
					</PanelBody>
				) }
				{ showName && (
					<PanelBody
						title={ __( 'Typography - Name', 'grigora-kit' ) }
						initialOpen={ false }
					>
						<GrigoraRangeInput
							value={ typoSize }
							setValue={ ( typoSize ) => {
								setAttributes( {
									typoSize: typoSize.toString(),
								} );
							} }
							label={ `Size` }
							min={ 5 }
							max={ 300 }
							resetValue={ 'inherit' }
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
							resetValue={ 'inherit' }
						/>
						<GrigoraRangeInput
							value={ typoLetterSpacing }
							setValue={ ( typoLetterSpacing ) => {
								setAttributes( {
									typoLetterSpacing:
										typoLetterSpacing.toString(),
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
						<HStack
							spacing={ 2 }
							className="grigora-dropdown-hstack"
						>
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
						<HStack
							spacing={ 2 }
							className="grigora-dropdown-hstack"
						>
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
				) }
				{ showBio && (
					<PanelBody
						title={ __( 'Typography - Bio', 'grigora-kit' ) }
						initialOpen={ false }
					>
						<GrigoraRangeInput
							value={ typoBSize }
							setValue={ ( typoBSize ) => {
								setAttributes( {
									typoBSize: typoBSize.toString(),
								} );
							} }
							label={ `Size` }
							min={ 5 }
							max={ 300 }
							resetValue={ 'inherit' }
						/>
						<GrigoraRangeInput
							value={ typoBLineHeight }
							setValue={ ( typoBLineHeight ) => {
								setAttributes( {
									typoBLineHeight: typoBLineHeight.toString(),
								} );
							} }
							label={ `Line Height` }
							min={ 10 }
							max={ 300 }
							resetValue={ 'inherit' }
						/>
						<GrigoraRangeInput
							value={ typoBLetterSpacing }
							setValue={ ( typoBLetterSpacing ) => {
								setAttributes( {
									typoBLetterSpacing:
										typoBLetterSpacing.toString(),
								} );
							} }
							label={ `Letter Spacing` }
							min={ 0 }
							max={ 150 }
							resetValue={ 'normal' }
						/>
						<GrigoraRangeInput
							value={ typoBWordSpacing }
							setValue={ ( typoBWordSpacing ) => {
								setAttributes( {
									typoBWordSpacing:
										typoBWordSpacing.toString(),
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
								onChange={ ( typoBTransform ) =>
									setAttributes( { typoBTransform } )
								}
								value={ typoBTransform }
								resetValue={ 'none' }
								options={ TEXT_TRANSFORMS }
							/>
							<GrigoraSelectInput
								label={ __( 'Style', 'grigora-kit' ) }
								onChange={ ( typoBStyle ) =>
									setAttributes( { typoBStyle } )
								}
								value={ typoBStyle }
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
								onChange={ ( typoBDecoration ) =>
									setAttributes( { typoBDecoration } )
								}
								value={ typoBDecoration }
								resetValue={ 'initial' }
								options={ TEXT_DECORATION }
							/>
							<GrigoraSelectInput
								label={ __( 'Weight', 'grigora-kit' ) }
								onChange={ ( typoBWeight ) =>
									setAttributes( { typoBWeight } )
								}
								value={ typoBWeight }
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
							onChange={ ( typoBFontFamily ) =>
								setAttributes( { typoBFontFamily } )
							}
							value={ typoBFontFamily }
							resetValue={ '' }
						/>
					</PanelBody>
				) }
			</>
		);
	}

	function advancedSettings() {
		return (
			<>
				<PanelBody
					title={ __( 'On Scroll Animation', 'grigora-kit' ) }
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
						setValue={ ( transitionAnimationTime ) =>
							setAttributes( { transitionAnimationTime } )
						}
						value={ transitionAnimationTime }
						resetValue={ 1 }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Layout', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraBoxInput
						label={ __( 'Padding', 'grigora-kit' ) }
						onChange={ ( layoutPadding ) =>
							setAttributes( { layoutPadding } )
						}
						values={ layoutPadding }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '0px',
							right: '0px',
						} }
					/>
					<GrigoraBoxInput
						label={ __( 'Margin', 'grigora-kit' ) }
						onChange={ ( layoutMargin ) =>
							setAttributes( { layoutMargin } )
						}
						values={ layoutMargin }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '0px',
							right: '0px',
						} }
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
										topLeft: '0px',
										topRight: '0px',
										bottomLeft: '0px',
										bottomRight: '0px',
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
									setValue={ ( transitionTime ) =>
										setAttributes( { transitionTime } )
									}
									value={ transitionTime }
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
									setValue={ ( transitionTime ) =>
										setAttributes( { transitionTime } )
									}
									value={ transitionTime }
									resetValue={ 0.2 }
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
							</>
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
								resetValue={ 0.2 }
							/>
						</TabPanel>
					</Tabs>
				</PanelBody>
			</>
		);
	}

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<BlockControls group="block">
					<AlignmentControl
						value={ align }
						onChange={ ( newAlign ) =>
							setAttributes( { align: newAlign } )
						}
						alignmentControls={ DEFAULT_ALIGNMENT_CONTROLS }
					/>
				</BlockControls>
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
					flex-direction: ${ layout };
					${ layout == 'column' && align ? `align-items: ${ align };` : `` }
					gap: ${ imageGap }px;
					padding-left: ${ layoutPadding?.left };
					padding-right: ${ layoutPadding?.right };
					padding-top: ${ layoutPadding?.top };
					padding-bottom: ${ layoutPadding?.bottom };
					margin-left: ${ layoutMargin?.left };
					margin-right: ${ layoutMargin?.right };
					margin-top: ${ layoutMargin?.top };
					margin-bottom: ${ layoutMargin?.bottom };
					transition: ${ transitionTime }s;
					${ backColor ? `background-color: ${ backColor };` : `` }
					border-left: ${ effectNBorder?.left?.width } ${ effectNBorder?.left?.style } ${
					effectNBorder?.left?.color ? effectNBorder?.left?.color : ''
				};
					border-right: ${ effectNBorder?.right?.width } ${
					effectNBorder?.right?.style
				} ${
					effectNBorder?.right?.color
						? effectNBorder?.right?.color
						: ''
				};
					border-top: ${ effectNBorder?.top?.width } ${ effectNBorder?.top?.style } ${
					effectNBorder?.top?.color ? effectNBorder?.top?.color : ''
				};
					border-bottom: ${ effectNBorder?.bottom?.width } ${
					effectNBorder?.bottom?.style
				} ${
					effectNBorder?.bottom?.color
						? effectNBorder?.bottom?.color
						: ''
				};
					border-top-right-radius: ${ effectNBorderRadius?.topRight } !important;
					border-top-left-radius: ${ effectNBorderRadius?.topLeft } !important;
					border-bottom-right-radius: ${ effectNBorderRadius?.bottomRight } !important;
					border-bottom-left-radius: ${ effectNBorderRadius?.bottomLeft } !important;
					transform: ${
						effectNPerspective
							? `perspective(${ effectNPerspective })`
							: ``
					} rotateX(${
					effectNRotateX ? effectNRotateX : '0deg'
				}) rotateY(${
					effectNRotateY ? effectNRotateY : '0deg'
				}) rotateZ(${
					effectNRotateZ ? effectNRotateZ : '0deg'
				}) skewX(${ effectNSkewX ? effectNSkewX : '0deg' }) skewY(${
					effectNSkewY ? effectNSkewY : '0deg'
				}) translateX(${ effectNOffsetX }) translateY(${ effectNOffsetY }) scale(${ effectNScale });
					box-shadow: ${ effectNShadowHO } ${ effectNShadowVO } ${ effectNShadowBlur } ${ effectNShadowSpread } ${ effectNShadowColor } !important;
				}
				.block-id-${ id } .grigora-kit-post-author__avatar {
					${
						layout != 'column' && imageVerticalAlign
							? `align-self: ${ imageVerticalAlign };`
							: ``
					}
					width: ${ imageSize }px;
				}
				.block-id-${ id } .grigora-kit-post-author__avatar img {
					border-radius: ${ imageBorderRadius }px;
					${
						imageBorderFlag
							? `
					border-left: ${ imageBorder?.left?.width } ${ imageBorder?.left?.style } ${
									imageBorder?.left?.color
										? imageBorder?.left?.color
										: ''
							  };
					border-right: ${ imageBorder?.right?.width } ${ imageBorder?.right?.style } ${
									imageBorder?.right?.color
										? imageBorder?.right?.color
										: ''
							  };
					border-top: ${ imageBorder?.top?.width } ${ imageBorder?.top?.style } ${
									imageBorder?.top?.color
										? imageBorder?.top?.color
										: ''
							  };
					border-bottom: ${ imageBorder?.bottom?.width } ${
									imageBorder?.bottom?.style
							  } ${
									imageBorder?.bottom?.color
										? imageBorder?.bottom?.color
										: ''
							  };
					`
							: ``
					}
				}
				.block-id-${ id }:hover {
					${ backHColor ? `background-color: ${ backHColor };` : `` }
					border-left: ${ effectHBorder?.left?.width } ${ effectHBorder?.left?.style } ${
					effectHBorder?.left?.color ? effectHBorder?.left?.color : ''
				};
						border-right: ${ effectHBorder?.right?.width } ${
					effectHBorder?.right?.style
				} ${
					effectHBorder?.right?.color
						? effectHBorder?.right?.color
						: ''
				};
						border-top: ${ effectHBorder?.top?.width } ${ effectHBorder?.top?.style } ${
					effectHBorder?.top?.color ? effectHBorder?.top?.color : ''
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
								? `border-top-right-radius: ${ effectHBorderRadius?.topRight } !important`
								: ``
						};
						${
							effectHBorderRadius?.topLeft
								? `border-top-left-radius: ${ effectHBorderRadius?.topLeft } !important`
								: ``
						};
						${
							effectHBorderRadius?.bottomRight
								? `border-bottom-right-radius: ${ effectHBorderRadius?.bottomRight } !important`
								: ``
						};
						${
							effectHBorderRadius?.bottomLeft
								? `border-bottom-left-radius: ${ effectHBorderRadius?.bottomLeft } !important`
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
								  } ${ effectHShadowColor } !important;`
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
						transform: ${
							effectHPerspective
								? `perspective(${ effectHPerspective })`
								: `${
										effectNPerspective
											? `perspective(${ effectNPerspective })`
											: ``
								  }`
						} rotateX(${
										effectHRotateX
											? effectHRotateX
											: effectNRotateX
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
				.block-id-${ id } .grigora-kit-post-author__content {
					${ align ? `align-items: ${ align };text-align: ${ align };` : `` }
				}
				.block-id-${ id } .grigora-kit-post-author__name {
					transition: ${ stylesTransitionTime }s;
					${ nameColor ? `color: ${ nameColor };` : `` }
					font-size: ${ typoSize }px;
					font-weight: ${ typoWeight };
					text-transform: ${ typoTransform };
					font-style: ${ typoStyle };
					text-decoration: ${ typoDecoration };
					line-height: ${
						typoLineHeight != 'normal'
							? `${ typoLineHeight }px`
							: `normal`
					};
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
				}
				.block-id-${ id } .grigora-kit-post-author__name:hover {
					${ nameHColor ? `color: ${ nameHColor };` : `` }
				}
				.block-id-${ id } .grigora-kit-post-author__bio {
					transition: ${ stylesTransitionTime }s;
					${ bioColor ? `color: ${ bioColor };` : `` }
					font-size: ${ typoBSize }px;
					font-weight: ${ typoBWeight };
					text-transform: ${ typoBTransform };
					font-style: ${ typoBStyle };
					text-decoration: ${ typoBDecoration };
					line-height: ${
						typoBLineHeight != 'normal'
							? `${ typoBLineHeight }px`
							: `normal`
					};
					letter-spacing: ${
						typoBLetterSpacing != 'normal'
							? `${ typoBLetterSpacing }px`
							: `normal`
					};
					word-spacing: ${
						typoBWordSpacing != 'normal'
							? `${ typoBWordSpacing }px`
							: `normal`
					};
					font-family: ${ typoBFontFamily ? typoBFontFamily : '' };
				}
				.block-id-${ id } .grigora-kit-post-author__bio:hover {
					${ bioHColor ? `color: ${ bioHColor };` : `` }
				}
				${
					entranceAnimation != 'none'
						? `
				.block-id-${ id }.animateOnce {
					animation: ${ entranceAnimation } ${ transitionAnimationTime }s;
				}
				`
						: ``
				}
				` }
			</style>
			{ showAvatar && authorDetails && (
				<div className="grigora-kit-post-author__avatar">
					<img
						width={ attributes.imageSize }
						src={ authorDetails.avatar_urls[ 96 ] }
						alt={ authorDetails.name }
					/>
				</div>
			) }
			<div className="grigora-kit-post-author__content">
				{ showName && authorDetails && (
					<NameTag className="grigora-kit-post-author__name">
						{ nameLink == 'none' && (
							<>{ authorDetails?.name || __( 'Post Author' ) }</>
						) }
						{ nameLink == 'website' && (
							<>
								<a
									href={ authorDetails?.url }
									target={ '_blank' }
									onClick={ ( event ) =>
										event.preventDefault()
									}
									dangerouslySetInnerHTML={ {
										__html:
											authorDetails?.name ||
											__( 'Post Author' ),
									} }
								/>
							</>
						) }
						{ nameLink == 'postsarchive' && (
							<>
								<a
									href={ authorDetails?.link }
									target={ '_blank' }
									onClick={ ( event ) =>
										event.preventDefault()
									}
									dangerouslySetInnerHTML={ {
										__html:
											authorDetails?.name ||
											__( 'Post Author' ),
									} }
								/>
							</>
						) }
					</NameTag>
				) }
				{ showBio && authorDetails?.description && (
					<p
						className="grigora-kit-post-author__bio"
						dangerouslySetInnerHTML={ {
							__html: authorDetails?.description,
						} }
					/>
				) }
			</div>
			<Googlefontloader
				config={ {
					google: {
						families: [ typoFontFamily, typoBFontFamily ],
					},
				} }
			></Googlefontloader>
		</div>
	);
}

import classnames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { __, _x } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentControl,
	PlainText,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	TabPanel as WPTabPanel,
	PanelBody,
	ToggleControl,
	Popover,
	__experimentalHStack as HStack,
	TextControl,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import { useState, useRef, useEffect, useMemo } from '@wordpress/element';
import {
	alignLeft,
	alignRight,
	alignCenter,
	alignJustify,
} from '@wordpress/icons';
import { useEntityProp } from '@wordpress/core-data';
import { applyFilters } from '@wordpress/hooks';

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
import GrigoraNumberInput from '@components/number-input';
import InspectorTabs from '@components/inspector-tabs';
import SVGIcons from '@constants/icons.json';
import Googlefontloader from '@components/googlefontloader';
import Notice from '@components/notice';

import { useCanEditEntity } from '@helpers/useCanEditEntity';
import { trim } from 'lodash';

export default function Edit( props ) {
	const {
		attributes,
		setAttributes,
		context: { postType, postId },
	} = props;

	const {
		id,
		excerptLength,
		suffix,
		typoSize,
		linkPost,
		linkTarget,
		rel,
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
		textShadowHColor,
		textShadowHBlur,
		textShadowHHorizontal,
		textShadowHVertical,
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
		entranceAnimationDelay,
		entranceAnimationTime,
		transitionColorTime,
		textColor,
		textGradient,
		textHColor,
		textHGradient,
		backColor,
		backGradient,
		StructureTag,
		layoutPadding,
		layoutMargin,
	} = attributes;

	const userCanEdit = useCanEditEntity( 'postType', postType, postId );
	const [
		rawExcerpt,
		setExcerpt,
		{ rendered: renderedExcerpt, protected: isProtected } = {},
	] = useEntityProp( 'postType', postType, 'excerpt', postId );
	const [ link ] = useEntityProp( 'postType', postType, 'link', postId );
	const maxExcerptLength = applyFilters( 'excerpt_length', 55 );
	const excerptDefaultSuffix = applyFilters( 'excerpt_more', '…' );

	useEffect( () => {
		// id
		if ( ! id ) {
			const tempID = generateId( 'post-excerpt' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'post-excerpt' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}

		// excerpt length
		if ( ! excerptLength ) {
			setAttributes( { excerptLength: maxExcerptLength } );
		}

		// suffix
		if ( ! suffix ) {
			setAttributes( { suffix: excerptDefaultSuffix } );
		}
	}, [] );

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-post-excerpt': true,
			[ `grigora-post-excerpt-align-${ align }` ]: align,
			[ `block-id-${ id }` ]: id,
			[ `animateOnce` ]: entranceAnimation != 'none',
		} ),
		style: {},
	} );

	function stripRenderedExcerpt() {
		if ( ! renderedExcerpt ) return '';
		const document = new window.DOMParser().parseFromString(
			renderedExcerpt,
			'text/html'
		);
		return document.body.textContent || document.body.innerText || '';
	}

	const strippedRenderedExcerpt = stripRenderedExcerpt();
	if ( ! postType || ! postId ) {
		return (
			<div { ...blockProps }>
				<p>
					{ __(
						'This is the Post Excerpt block, it will display the excerpt from single posts.'
					) }
				</p>
				<p>
					{ __(
						'If there are any Custom Post Types with support for excerpts, the Post Excerpt block can display the excerpts of those entries as well.'
					) }
				</p>
			</div>
		);
	}
	if ( isProtected && ! userCanEdit ) {
		return (
			<div { ...blockProps }>
				<Warning>
					{ __(
						'There is no excerpt because this is a protected post.'
					) }
				</Warning>
			</div>
		);
	}

	function formattedExcerpt() {
		if ( ! strippedRenderedExcerpt ) {
			return '';
		}

		// trim
		let trimmed = strippedRenderedExcerpt.trim();
		trimmed = trimmed.split( ' ' ).splice( 0, excerptLength ).join( ' ' );

		// suffix
		if ( trimmed ) {
			if (
				trimmed
					.toLowerCase()
					.endsWith( excerptDefaultSuffix.toLowerCase() )
			) {
				trimmed = trimmed
					.slice( 0, -excerptDefaultSuffix.length )
					.concat( suffix );
			}
			if ( ! trimmed.toLowerCase().endsWith( suffix.toLowerCase() ) ) {
				trimmed = trimmed.concat( suffix );
			}
		}

		return trimmed;
	}

	let excerptContent = (
		<StructureTag>
			{ strippedRenderedExcerpt
				? formattedExcerpt()
				: __( 'No post excerpt found' ) }
		</StructureTag>
	);
	if ( linkPost && postType && postId ) {
		excerptContent = (
			<StructureTag>
				<a
					href={ link }
					target={ linkTarget }
					rel={ rel }
					onClick={ ( event ) => event.preventDefault() }
					dangerouslySetInnerHTML={ {
						__html: formattedExcerpt(),
					} }
				/>
			</StructureTag>
		);
	}

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

	function effectNormalColorRender() {
		return (
			<>
				{ textGradient && backGradient && (
					<Notice
						text={ __(
							'Background Gradient doesnt work when text gradient is used. Please wrap the block in the group and then give group a gradient to create similar effects.',
							'grigora-kit'
						) }
						status={ 'warning' }
					/>
				) }
				<GrigoraColorGradientInput
					color={ textColor }
					gradient={ textGradient }
					onColorChange={ ( textColor ) =>
						setAttributes( { textColor } )
					}
					onGradientChange={ ( textGradient ) =>
						setAttributes( { textGradient } )
					}
					label={ __( 'Text', 'grigora-kit' ) }
				/>
				<GrigoraColorGradientInput
					color={ backColor }
					gradient={ backGradient }
					onColorChange={ ( backColor ) =>
						setAttributes( { backColor } )
					}
					onGradientChange={ ( backGradient ) =>
						setAttributes( { backGradient } )
					}
					label={ __( 'Background', 'grigora-kit' ) }
				/>
			</>
		);
	}
	function effectHoverColorRender() {
		return (
			<div className={ `grigora-hover-effects-panel` }>
				{ textGradient && textHGradient && (
					<Notice
						text={ __(
							'Gradient Hover on Gradient might not work due to how CSS is implemented.',
							'grigora-kit'
						) }
						status={ 'warning' }
					/>
				) }
				<GrigoraColorGradientInput
					color={ textHColor }
					gradient={ textHGradient }
					onColorChange={ ( textHColor ) =>
						setAttributes( { textHColor } )
					}
					onGradientChange={ ( textHGradient ) =>
						setAttributes( { textHGradient } )
					}
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

	function generalSettings() {
		return (
			<>
				<Spacer marginBottom={ 0 } paddingX={ 4 } paddingY={ 3 }>
					<>
						<GrigoraSelectInput
							label={ __( 'Tag', 'grigora-kit' ) }
							labelPosition="side"
							onChange={ ( StructureTag ) =>
								setAttributes( { StructureTag } )
							}
							value={ StructureTag }
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
							resetValue={ 'p' }
						/>
						<GrigoraRangeInput
							label={ __( 'Number of Words', 'grigora-kit' ) }
							max={ maxExcerptLength }
							min={ 1 }
							unit={ 'words' }
							setValue={ ( excerptLength ) =>
								setAttributes( { excerptLength } )
							}
							value={ excerptLength }
							resetValue={ 55 }
						/>
						<GrigoraTextInput
							label={ __( 'Excerpt Suffix', 'grigora-kit' ) }
							onChange={ ( suffix ) =>
								setAttributes( { suffix } )
							}
							value={ suffix }
							resetValue={ excerptDefaultSuffix }
						/>
						<br></br>
						<ToggleControl
							label={ __( 'Make excerpt a link', 'grigora-kit' ) }
							checked={ !! linkPost }
							onChange={ () =>
								setAttributes( {
									linkPost: ! linkPost,
								} )
							}
						/>
						{ linkPost && (
							<>
								<ToggleControl
									label={ __( 'Open in new tab' ) }
									onChange={ ( value ) =>
										setAttributes( {
											linkTarget: value
												? '_blank'
												: '_self',
										} )
									}
									checked={ linkTarget === '_blank' }
								/>
								<TextControl
									label={ __( 'Link rel' ) }
									value={ rel }
									onChange={ ( newRel ) =>
										setAttributes( { rel: newRel } )
									}
								/>
							</>
						) }
					</>
				</Spacer>
				<PanelBody
					title={ __( 'Typography', 'grigora-kit' ) }
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

						<TabPanel>{ effectNormalColorRender() }</TabPanel>
						<TabPanel>{ effectHoverColorRender() }</TabPanel>
					</Tabs>
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
			</>
		);
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
											style: 'dashed',
											width: 'undefined',
										},
										bottom: {
											color: '#72aee6',
											style: 'dashed',
											width: 'undefined',
										},
										right: {
											color: '#72aee6',
											style: 'dashed',
											width: 'undefined',
										},
										left: {
											color: '#72aee6',
											style: 'dashed',
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
											setAttributes( {
												textShadowVertical,
											} )
										}
										value={ textShadowVertical }
										resetValue={ '0px' }
									/>
								</HStack>
							</>
						</TabPanel>
						<TabPanel>
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
											setAttributes( {
												textShadowHHorizontal,
											} )
										}
										value={ textShadowHHorizontal }
										resetValue={ '' }
									/>
									<GrigoraUnitInput
										label="Vertical"
										onChange={ ( textShadowHVertical ) =>
											setAttributes( {
												textShadowHVertical,
											} )
										}
										value={ textShadowHVertical }
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
								setValue={ ( transitionColorTime ) =>
									setAttributes( { transitionColorTime } )
								}
								value={ transitionColorTime }
								resetValue={ 0.2 }
							/>
						</TabPanel>
					</Tabs>
				</PanelBody>
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
					<GrigoraNumberInput
						label={ __( 'Delay (ms)', 'grigora-kit' ) }
						onChange={ ( entranceAnimationDelay ) =>
							setAttributes( { entranceAnimationDelay } )
						}
						value={ entranceAnimationDelay }
						resetValue={ 0 }
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
		);
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
			<BlockControls group="block">
				{ /* <ToolbarButton
					name="link"
					icon={ url ? linkOff : link }
					title={ __( 'Link', 'grigora-kit' ) }
					shortcut={ displayShortcut.primary( 'k' ) }
					onClick={ toggleEditing }
					isActive={ url ? true : false }
				/> */ }
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
					{ ` .block-id-${ id } ${ StructureTag } {
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
					padding-left: ${ layoutPadding?.left };
					padding-right: ${ layoutPadding?.right };
					padding-top: ${ layoutPadding?.top };
					padding-bottom: ${ layoutPadding?.bottom };
					margin-left: ${ layoutMargin?.left };
					margin-right: ${ layoutMargin?.right };
					margin-top: ${ layoutMargin?.top };
					margin-bottom: ${ layoutMargin?.bottom };
					transition: ${ transitionColorTime }s;
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
					box-shadow: ${ effectNShadowHO } ${ effectNShadowVO } ${ effectNShadowBlur } ${ effectNShadowSpread } ${ effectNShadowColor };
					${ backColor ? `background-color: ${ backColor };` : `` }
					${ backGradient ? `background-image: ${ backGradient };` : `` }
					${ textColor ? `color: ${ textColor };` : `` }
					${
						textGradient
							? `background-image: ${ textGradient };-webkit-background-clip: text;-webkit-text-fill-color: transparent;`
							: ``
					}
					${
						( textShadowHorizontal &&
							textShadowHorizontal != '0px' ) ||
						( textShadowVertical && textShadowVertical != '0px' ) ||
						( textShadowBlur && textShadowBlur != '0px' )
							? `filter: drop-shadow(${ `${
									textShadowHorizontal
										? textShadowHorizontal
										: '0px'
							  } ${
									textShadowVertical
										? textShadowVertical
										: '0px'
							  } ${ textShadowBlur ? textShadowBlur : '0px' } ${
									textShadowColor ? textShadowColor : '#000'
							  }` });`
							: ``
					}
					}
					${
						textHColor
							? `.block-id-${ id }:hover ${ StructureTag } {${
									textGradient
										? `-webkit-text-fill-color`
										: `color`
							  }: ${ textHColor };} `
							: ``
					}
					${
						textHGradient
							? `.block-id-${ id } ${ StructureTag } {background-image: ${ textHGradient };-webkit-background-clip: text;} .block-id-${ id }:hover {color: transparent;} `
							: ``
					}
					${
						entranceAnimation != 'none'
							? `
					.block-id-${ id }.animateOnce {
						animation: ${ entranceAnimation } ${ entranceAnimationTime }s ${ entranceAnimationDelay }ms;
					}
					`
							: ``
					}
					${
						textHGradient
							? `.block-id-${ id } {background-image: ${ textHGradient };-webkit-background-clip: text;} .block-id-${ id }:hover {color: transparent;} `
							: ``
					}
					.block-id-${ id }:hover ${ StructureTag } {
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
							textShadowHHorizontal ||
							textShadowHVertical ||
							textShadowHBlur
								? `filter: drop-shadow(${ `${
										textShadowHHorizontal
											? textShadowHHorizontal
											: textShadowHorizontal
								  } ${
										textShadowHVertical
											? textShadowHVertical
											: textShadowVertical
								  } ${
										textShadowHBlur
											? textShadowHBlur
											: textShadowBlur
								  } ${
										textShadowHColor
											? textShadowHColor
											: '#000'
								  }` });`
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
						
					` }
				</style>
				{ excerptContent }
			</div>
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

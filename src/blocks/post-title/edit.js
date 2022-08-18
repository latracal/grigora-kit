import classnames from 'classnames';

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
	TabPanel,
	PanelBody,
	ToggleControl,
	Popover,
	Notice,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';
import {
	alignLeft,
	alignRight,
	alignCenter,
	alignJustify,
} from '@wordpress/icons';
import { useEntityProp } from '@wordpress/core-data';

import parse from 'html-react-parser';

import {
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
import SVGIcons from '@constants/icons.json';
import Googlefontloader from '@components/googlefontloader';

export default function Edit( props ) {
	const { attributes, setAttributes, isSelected, context: { postType, postId, queryId } } = props;

	const {
		id,
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
		textShadow,
		textShadowColor,
		textShadowBlur,
		textShadowHorizontal,
		textShadowVertical,
		layoutVerticalAlign,
		layoutPosition,
		effectNBFlag,
		effectNBGradient,
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
		hoverEffect,
		effectHAnimation,
		effectHBGradient,
		transitionTime,
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
		icon,
		iconSize,
		iconPadding,
		iconColorFlag,
		iconNormalColor,
		iconHoverColor,
		transitionColorTime,
		textColor,
		textGradient,
		textHColor,
		textHGradient,
		StructureTag,
		layoutPadding,
		layoutMargin,
	} = attributes;

	const ref = useRef();

	const isDescendentOfQueryLoop = Number.isFinite( queryId );
	const [ rawTitle = '', setTitle, fullTitle ] = useEntityProp(
		'postType',
		postType,
		'title',
		postId
	);

	useEffect( () => {
		// id
		if ( ! id ) {
			const tempID = generateId( 'post-title' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'post-title' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

	const blockProps = useBlockProps( {
		className: classnames( {
			[ `grigora-post-title-align-${ align }` ]: align,
			'grigora-kit-post-title': true,
			[ `block-id-${ id }` ]: id,
			[ `animateOnce` ]: entranceAnimation != 'none',
		} ),
		style: {},
	} );

	const DEFAULT_ALIGNMENT_CONTROLS = [
		{
			icon: alignLeft,
			title: __( 'Align tile left' ),
			align: 'left',
		},
		{
			icon: alignCenter,
			title: __( 'Align tile center' ),
			align: 'center',
		},
		{
			icon: alignRight,
			title: __( 'Align tile right' ),
			align: 'right',
		},
		{
			icon: alignJustify,
			title: __( 'Align tile full' ),
			align: 'justify',
		},
	];

	function effectNormalRender() {
		return (
			<>
				<PanelBody
					title={ __( 'Border', 'grigora-kit' ) }
					initialOpen={ false }
					className={ `grigora-inside-panel` }
				>
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
				</PanelBody>
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
				<PanelBody
					title={ __( 'Transforms', 'grigora-kit' ) }
					initialOpen={ false }
					className={ `grigora-inside-panel` }
				>
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
				</PanelBody>
			</>
		);
	}

	function effectNormalColorRender() {
		return (
			<>
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
			</>
		);
	}
	function effectHoverColorRender() {
		return (
			<div className={ `grigora-hover-effects-panel` }>
				{ textGradient && textHGradient && (
					<Notice status={ 'warning' } isDismissible={ false }>
						<p>
							{ __(
								'Gradient Hover on Gradient might not work due to how CSS is implemented.',
								'grigora-kit'
							) }
						</p>
					</Notice>
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
				{/* <ToolbarButton
					name="link"
					icon={ url ? linkOff : link }
					title={ __( 'Link', 'grigora-kit' ) }
					shortcut={ displayShortcut.primary( 'k' ) }
					onClick={ toggleEditing }
					isActive={ url ? true : false }
				/> */}
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={ __( 'Layout', 'grigora-kit' ) }
					initialOpen={ false }
				>
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
						resetValue={ 'h2' }
					/>
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
							resetValue={ '500' }
							options={ FONT_WEIGHTS.map( ( obj ) => {
								return {
									label: obj,
									value: obj,
								};
							} ) }
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
				<PanelBody
					title={ __( 'Colors', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<TabPanel
						className="grigora-effects-settings"
						tabs={ [
							{
								name: 'normal',
								title: __( 'Normal', 'grigora-kit' ),
								className: 'tab-normal',
							},
							{
								name: 'hover',
								title: __( 'Hover', 'grigora-kit' ),
								className: 'tab-hover',
							},
						] }
					>
						{ ( tab ) => {
							if ( tab.name == 'normal' ) {
								return effectNormalColorRender();
							} else {
								return effectHoverColorRender();
							}
						} }
					</TabPanel>
				</PanelBody>
				<PanelBody
					title={ __( 'Border & Effects', 'grigora-kit' ) }
					initialOpen={ false }
				>
					{ effectNormalRender() } 
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<style>
					{ ` .block-id-${ id } ${StructureTag} {
					font-size: ${ typoSize }px;
					${ textColor ? `color: ${ textColor };` : `` }
					${
						textGradient
							?
							`background-image: ${ textGradient };
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;`
							:
							``
					}
					transition: ${ transitionColorTime }s;
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
					text-shadow: ${
						textShadow
							? `${
									textShadowHorizontal
										? textShadowHorizontal
										: '0px'
							  } ${
									textShadowVertical
										? textShadowVertical
										: '0px'
							  } ${
									textShadowBlur ? textShadowBlur : '0px'
							  } ${ textShadowColor }`
							: `#000`
					};
					padding-left: ${ layoutPadding?.left };
					padding-right: ${ layoutPadding?.right };
					padding-top: ${ layoutPadding?.top };
					padding-bottom: ${ layoutPadding?.bottom };
					margin-left: ${ layoutMargin?.left };
					margin-right: ${ layoutMargin?.right };
					margin-top: ${ layoutMargin?.top };
					margin-bottom: ${ layoutMargin?.bottom };
					align-self: ${ layoutVerticalAlign };
					position: ${ layoutPosition };
					transition: ${ hoverEffect ? `${ transitionTime }s` : `0s` };
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
					transform: rotateX(${ effectNRotateX ? effectNRotateX : '0deg' }) rotateY(${
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
						animation: ${ entranceAnimation } ${ transitionTime }s;
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
						color: ${ iconColorFlag ? iconHoverColor : 'currentColor' };
					}
					.block-id-${ id } .grigora-svg-icon svg{
						width: ${ iconSize };
						height: ${ iconSize };
					}
					`
							: ``
					}
					${
						hoverEffect
							? `
					.block-id-${ id } ${StructureTag}:hover {
						color: ${ textHColor };
						${
							effectHAnimation != 'none'
								? `animation: ${ effectHAnimation } ${ transitionTime }s;`
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
						border-top-right-radius: ${ effectHBorderRadius?.topRight };
						border-top-left-radius: ${ effectHBorderRadius?.topLeft };
						border-bottom-right-radius: ${ effectHBorderRadius?.bottomRight };
						border-bottom-left-radius: ${ effectHBorderRadius?.bottomLeft };
						transform: rotateX(${ effectHRotateX ? effectHRotateX : '0deg' }) rotateY(${
									effectHRotateY ? effectHRotateY : '0deg'
							  }) rotateZ(${
									effectHRotateZ ? effectHRotateZ : '0deg'
							  }) skewX(${
									effectHSkewX ? effectHSkewX : '0deg'
							  }) skewY(${
									effectHSkewY ? effectHSkewY : '0deg'
							  }) translateX(${ effectHOffsetX }) translateY(${ effectHOffsetY }) scale(${ effectHScale });
						box-shadow: ${ effectHShadowHO } ${ effectHShadowVO } ${ effectHShadowBlur } ${ effectHShadowSpread } ${ effectHShadowColor };  
					}
					${
						textHGradient
						? `.block-id-${ id } {background-image: ${ textHGradient };-webkit-background-clip: text;} .block-id-${ id }:hover {color: transparent;} `
						: ``
					}
					${
						effectNBFlag
							? `
					.block-id-${ id }::before {
						background: ${ effectNBFlag ? effectHBGradient : '' };
					}
					`
							: ``
					}
					`
							: ``
					}
					` }
				</style>
				{ !isDescendentOfQueryLoop && (
					<PlainText
						tagName={ StructureTag }
						placeholder={ __( 'No Title' ) }
						value={ rawTitle }
						onChange={ setTitle }
						__experimentalVersion={ 2 }
					/>
				)}
				{ isDescendentOfQueryLoop && (
					<StructureTag
					dangerouslySetInnerHTML={ { __html: fullTitle?.rendered } }
				/>
				)}
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

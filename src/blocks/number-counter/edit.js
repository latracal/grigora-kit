import classnames from 'classnames';

import CountUp from 'react-countup';
import {IntlProvider, FormattedNumber} from 'react-intl';

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, BlockControls, AlignmentControl } from '@wordpress/block-editor';
import { TabPanel, 
	PanelBody,
	ToolbarButton,
	ToggleControl, 
	Popover,
	__experimentalHStack as HStack,__experimentalNumberControl as NumberControl } from '@wordpress/components';
import { useState, useRef } from '@wordpress/element';
import { alignLeft, alignRight, alignCenter, alignJustify, link, linkOff } from '@wordpress/icons';

import './editor.scss';

import { HOVER_ANIMATIONS, ENTRANCE_ANIMATIONS, ICON_POSITIONS, TEXT_TRANSFORMS, TEXT_STYLE, TEXT_DECORATION, FONT_WEIGHTS } from '@constants';
import generateId from '@helpers/generateId';
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

export default function Edit( props ) {

	const {
		attributes,
		setAttributes,
	} = props;

	const {
		id,
		align,
		countStart,
		countEnd,
		countTime,
		numFormat,
		numPrefix,
		numSuffix,
		numTSeparator,
		typoSize,
		typoStyle,
		typoDecoration,
		typoLetterSpacing,
		typoLineHeight,
		typoTransform,
		typoWeight,
		typoWordSpacing,
		effectNColor,
		effectNRotateX,
		effectNRotateY,
		effectNRotateZ,
		effectNSkewX,
		effectNSkewY,
		effectNOffsetX,
		effectNOffsetY,
		effectNScale,
		textShadowColor,
		textShadowBlur,
		textShadowHorizontal,
		textShadowVertical,
	} = attributes;

	if( !id ){
		setAttributes( {"id": generateId("number-counter")} );
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
		}
	];

	const THOUSAND_SEPARATOR = [
		{
			label: __( "None", "grigora-kit" ),
			value: ""
		},
		{
			label: __( ",", "grigora-kit" ),
			value: ","
		},
		{
			label: __( ".", "grigora-kit" ),
			value: "."
		}
	];

	function numberReadable(labelValue) {
    return (Math.abs(Number(labelValue))) >= 1.0e+9
    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    : Math.abs(Number(labelValue)) >= 1.0e+6
    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
    : Math.abs(Number(labelValue)) >= 1.0e+3
    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
}
   

	function effectNormalRender(){
		return (
			<>
				<PanelBody title={__( 'Colors', "grigora-kit" )} initialOpen={false} className={`grigora-inside-panel`}>
				<GrigoraColorInput
					label={__( 'Text', "grigora-kit" )}
					value={ effectNColor }
					onChange={ effectNColor => setAttributes( { effectNColor } ) }
					resetValue={'#444444'}
				/>
				</PanelBody>
				<PanelBody title={ __( 'Text Shadow', "grigora-kit" ) } initialOpen={false} className={`grigora-inside-panel`}>
					<GrigoraColorInput
						label={__( 'Color', "grigora-kit" )}
						value={ textShadowColor }
						onChange={ textShadowColor => setAttributes( { textShadowColor } ) }
						resetValue={'#000'}
					/>
					<HStack spacing={ 2 }>
						<GrigoraUnitInput
							label="Blur"
							onChange={ textShadowBlur => setAttributes( { textShadowBlur } ) }
							value={textShadowBlur}
							resetValue={ "0px" }
						/>
						<GrigoraUnitInput
							label="Horizontal"
							onChange={ textShadowHorizontal => setAttributes( { textShadowHorizontal } ) }
							value={textShadowHorizontal}
							resetValue={ "0px" }
						/>
						<GrigoraUnitInput
							label="Vertical"
							onChange={ textShadowVertical => setAttributes( { textShadowVertical } ) }
							value={textShadowVertical}
							resetValue={ "0px" }
						/>
					</HStack>
				</PanelBody>
				<PanelBody title={__( 'Transforms', "grigora-kit" )} initialOpen={false} className={`grigora-inside-panel`}>
				<p>{__( 'Rotate', "grigora-kit" )}</p>
				<HStack spacing={ 2 }>
					<GrigoraUnitInput
						label="X"
						onChange={ effectNRotateX => setAttributes( { effectNRotateX } ) }
						units={[
							{
							  default: 1,
							  label: 'deg',
							  value: 'deg'
							}
						]}
						value={effectNRotateX}
						resetValue={ "0deg" }
					/>
					<GrigoraUnitInput
						label="Y"
						onChange={ effectNRotateY => setAttributes( { effectNRotateY } ) }
						units={[
							{
							  default: 1,
							  label: 'deg',
							  value: 'deg'
							}
						]}
						value={effectNRotateY}
						resetValue={ "0deg" }
					/>
					<GrigoraUnitInput
						label="Z"
						onChange={ effectNRotateZ => setAttributes( { effectNRotateZ } ) }
						units={[
							{
							  default: 1,
							  label: 'deg',
							  value: 'deg'
							}
						]}
						value={effectNRotateZ}
						resetValue={ "0deg" }
					/>
				</HStack>
				<br></br>
				<p>{__( 'Skew', "grigora-kit" )}</p>
				<HStack spacing={ 2 }>
					<GrigoraUnitInput
						label="X"
						onChange={ effectNSkewX => setAttributes( { effectNSkewX } ) }
						units={[
							{
							  default: 1,
							  label: 'deg',
							  value: 'deg'
							}
						]}
						value={effectNSkewX}
						resetValue={ "0deg" }
					/>
					<GrigoraUnitInput
						label="Y"
						onChange={ effectNSkewY => setAttributes( { effectNSkewY } ) }
						units={[
							{
							  default: 1,
							  label: 'deg',
							  value: 'deg'
							}
						]}
						value={effectNSkewY}
						resetValue={ "0deg" }
					/>
				</HStack>
				<br></br>
				<p>{__( 'Offset', "grigora-kit" )}</p>
				<HStack spacing={ 2 }>
					<GrigoraUnitInput
						label="X"
						onChange={ effectNOffsetX => setAttributes( { effectNOffsetX } ) }
						value={effectNOffsetX}
						resetValue={ "0px" }
					/>
					<GrigoraUnitInput
						label="Y"
						onChange={ effectNOffsetY => setAttributes( { effectNOffsetY } ) }
						value={effectNOffsetY}
						resetValue={ "0px" }
					/>
				</HStack>
				<br></br>
				<GrigoraRangeInput
				label={ __( 'Scale', "grigora-kit" ) }
				max={ 2 }
				min={ 0 }
				step={0.1}
				unit={"x"}
				setValue={ effectNScale => setAttributes( { effectNScale } ) }
				value={ effectNScale }
				resetValue={1} />
				</PanelBody>
			</>
		)
	}

	const blockProps = useBlockProps( {
		className: classnames( {
			"grigora-kit-number-counter": true,
			[ `block-id-${ id }` ]: id
		} ),
		style: {
		},
	} );

	return (
		<div { ...blockProps }>
			<style>
				{`
				.block-id-${id} {
					text-align: ${align};
					font-size: ${ typoSize }px;
					font-weight: ${typoWeight};
					text-transform: ${typoTransform};
					font-style: ${typoStyle};
					text-decoration: ${typoDecoration};
					line-height: ${typoLineHeight != "normal" ? `${typoLineHeight}px` : `normal`};;
					letter-spacing: ${typoLetterSpacing != "normal" ? `${typoLetterSpacing}px` : `normal`};
					word-spacing: ${typoWordSpacing != "normal" ? `${typoWordSpacing}px` : `normal`};
					color: ${effectNColor};
					text-shadow: ${`${ textShadowHorizontal ? textShadowHorizontal : "0px" } ${ textShadowVertical ? textShadowVertical : "0px" } ${ textShadowBlur ? textShadowBlur : "0px" } ${ textShadowColor }`};
				}

				.block-id-${id} span {
					transform: rotateX(${ effectNRotateX ? effectNRotateX : "0deg" }) rotateY(${ effectNRotateY ? effectNRotateY : "0deg" }) rotateZ(${ effectNRotateZ ? effectNRotateZ : "0deg" }) skewX(${ effectNSkewX ? effectNSkewX : "0deg" }) skewY(${ effectNSkewY ? effectNSkewY : "0deg" }) translateX(${ effectNOffsetX }) translateY(${ effectNOffsetY }) scale(${ effectNScale });
				}
				`}
			</style>
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
				<PanelBody title={ __( 'Counter', "grigora-kit" ) } >
					<GrigoraNumberInput
						label="Start"
						onChange={ countStart => setAttributes( { countStart } ) }
						value={countStart}
						resetValue={ 0 }
					/>
					<br></br>
					<GrigoraNumberInput
						label="End"
						onChange={ countEnd => setAttributes( { countEnd } ) }
						value={countEnd}
						resetValue={ 100 }
					/>
					<br></br>
					<GrigoraRangeInput
						label={ __( 'Time', "grigora-kit" ) }
						max={ 20 }
						min={ 0.5 }
						step={0.1}
						unit={"sec"}
						setValue={ countTime => setAttributes( { countTime } ) }
						value={ countTime }
						resetValue={3}
					/>
					<br></br>
					<GrigoraToggleInput
						label={ __( 'Auto-format Number', "grigora-kit" ) }
						onChange={ numFormat => setAttributes( { numFormat } ) }
						value={numFormat}
						resetValue={ false }
						help={ __( 'Numbers will be autoformatted to compact notation. Eg. 1100 will become 1.1K', "grigora-kit" ) }
					/>
					<br></br>
					<GrigoraTextInput
						label={ __( 'Number Prefix', "grigora-kit" ) }
						onChange={ numPrefix => setAttributes( { numPrefix } ) }
						value={ numPrefix }
						resetValue={""}
					/>
					<GrigoraTextInput
						label={ __( 'Number Suffix', "grigora-kit" ) }
						onChange={ numSuffix => setAttributes( { numSuffix } ) }
						value={ numSuffix }
						resetValue={""}
					/>
					<GrigoraSelectInput
						label={ __( "Thousands Separator", "grigora-kit" ) }
						onChange={ numTSeparator => setAttributes( { numTSeparator } ) }
						value={ numTSeparator }
						resetValue={""}
						options={ THOUSAND_SEPARATOR }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Typography', "grigora-kit" ) } initialOpen={false}>
				<GrigoraRangeInput value={typoSize} setValue={(typoSize)=>{setAttributes({typoSize});}} label={`Size`} resetValue={50} />
				<GrigoraRangeInput value={typoLineHeight} setValue={(typoLineHeight)=>{setAttributes({typoLineHeight:typoLineHeight.toString()})}} label={`Line Height`} min={10} max={300} resetValue={"normal"} />
				<GrigoraRangeInput value={typoLetterSpacing} setValue={(typoLetterSpacing)=>{setAttributes({typoLetterSpacing:typoLetterSpacing.toString()})}} label={`Letter Spacing`} min={0} max={150} resetValue={"normal"} />
				<GrigoraRangeInput value={typoWordSpacing} setValue={(typoWordSpacing)=>{setAttributes({typoWordSpacing:typoWordSpacing.toString()})}} label={`Word Spacing`} min={0} max={150} resetValue={"normal"} />
				<br></br>
				<HStack spacing={ 2 } className='grigora-dropdown-hstack'>
					<GrigoraSelectInput
						label={ __( "Transform", "grigora-kit" ) }
						onChange={ typoTransform => setAttributes( { typoTransform } ) }
						value={ typoTransform }
						resetValue={"none"}
						options={TEXT_TRANSFORMS}
					/>
					<GrigoraSelectInput
						label={ __( "Style", "grigora-kit" ) }
						onChange={ typoStyle => setAttributes( { typoStyle } ) }
						value={ typoStyle }
						resetValue={"normal"}
						options={TEXT_STYLE}
					/>
				</HStack>
				<HStack spacing={ 2 } className='grigora-dropdown-hstack'>
					<GrigoraSelectInput
						label={ __( "Decoration", "grigora-kit" ) }
						onChange={ typoDecoration => setAttributes( { typoDecoration } ) }
						value={ typoDecoration }
						resetValue={"initial"}
						options={TEXT_DECORATION}
					/>
					<GrigoraSelectInput
					label={ __( "Weight", "grigora-kit" ) }
					onChange={ typoWeight => setAttributes( { typoWeight } ) }
					value={ typoWeight }
					resetValue={"500"}
					options={
						FONT_WEIGHTS.map(obj=>{
							return {
								label: obj,
								value: obj
							}
						})
						}
					/>
				</HStack>
				</PanelBody>
				<PanelBody title={ __( 'Color & Effects', "grigora-kit" ) } initialOpen={false}>
					{effectNormalRender()}
				</PanelBody>
			</InspectorControls>
			<CountUp start={countStart} end={countEnd} prefix={numPrefix} suffix={numSuffix} duration={countTime} separator={numTSeparator} />
		</div>
	);
}

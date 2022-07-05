import classnames from 'classnames';
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __, _x, isRTL } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, MediaUpload, RichText, BlockControls, InspectorControls, AlignmentControl } from '@wordpress/block-editor';
import { PanelBody, PanelColor, ColorPalette, ToolbarDropdownMenu, ToggleControl, RangeControl, SelectControl, Notice } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { useState } from '@wordpress/element';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

 function ParagraphRTLControl( { direction, setDirection } ) {
	return (
		isRTL() && (
			<ToolbarDropdownMenu
				controls={ [
					{
						icon: formatLtr,
						title: _x( 'Left to right', 'editor button' ),
						isActive: direction === 'ltr',
						onClick() {
							setDirection(
								direction === 'ltr' ? undefined : 'ltr'
							);
						},
					},
				] }
			/>
		)
	);
}

export default function Edit( props ) {

	const {
		attributes,
		setAttributes,
		clientId
	} = props;

	const [hovered, setHovered] = useState( false );

	

	const {
		id,
		content,
		align,
		direction,
		textShadow,
		textShadowColor,
		textShadowBlur,
		textShadowHorizontal,
		textShadowVertical,
		layoutVerticalAlign,
		layoutPosition,
		effectNRotateX,
		effectNRotateY,
		effectNRotateZ,
		effectNOffsetX,
		effectNOffsetY,
		effectNScale,
		effectNBorderType,
		effectNBorderWidth,
		effectNBorderColor,
		effectNBorderRadiusTL,
		effectNBorderRadiusTR,
		effectNBorderRadiusBL,
		effectNBorderRadiusBR,
		hoverEffect,
		transitionTime,
		effectHRotateX,
		effectHRotateY,
		effectHRotateZ,
		effectHOffsetX,
		effectHOffsetY,
		effectHScale,
		effectHBorderType,
		effectHBorderWidth,
		effectHBorderColor,
		effectHBorderRadiusTL,
		effectHBorderRadiusTR,
		effectHBorderRadiusBL,
		effectHBorderRadiusBR
	} = attributes;

	if( clientId && !id ){
		setAttributes( {"id": clientId} );
	}

	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ align }` ]: align,
		} ),
		style: {
			"transition": ( hoverEffect ? `${ transitionTime }s`: `0s` ),
			"direction": direction,
			"text-shadow": (textShadow ?  `${ textShadowHorizontal }px ${ textShadowVertical }px ${ textShadowBlur }px ${ textShadowColor }` : "none"),
			"align-self": layoutVerticalAlign,
			"position": layoutPosition,
			"transform": ( (hoverEffect && hovered) ?  `rotateX(${ effectHRotateX }deg) rotateY(${ effectHRotateY }deg) rotateZ(${ effectHRotateZ }deg) translateX(${ effectHOffsetX }px) translateY(${ effectHOffsetY }px) scale(${ effectHScale })` : `rotateX(${ effectNRotateX }deg) rotateY(${ effectNRotateY }deg) rotateZ(${ effectNRotateZ }deg) translateX(${ effectNOffsetX }px) translateY(${ effectNOffsetY }px) scale(${ effectNScale })`),
			"border-width": ((hoverEffect && hovered) ? `${ effectHBorderWidth }px` : `${ effectNBorderWidth }px`),
			"border-style": ((hoverEffect && hovered) ? `${ effectHBorderType }` : `${ effectNBorderType }`),
			"border-color": ((hoverEffect && hovered) ? `${ effectHBorderColor }` : `${ effectNBorderColor }`),
			"borderTopLeftRadius": ((hoverEffect && hovered) ? `${ effectHBorderRadiusTL }%` : `${ effectNBorderRadiusTL }%`),
			"borderTopRightRadius": ((hoverEffect && hovered) ? `${ effectHBorderRadiusTR }%` : `${ effectNBorderRadiusTR }%`),
			"borderBottomLeftRadius": ((hoverEffect && hovered) ? `${ effectHBorderRadiusBL }%` : `${ effectNBorderRadiusBL }%`),
			"borderBottomRightRadius": ((hoverEffect && hovered) ? `${ effectHBorderRadiusBR }%` : `${ effectNBorderRadiusBR }%`)
		},
	} );

	return (
		<div {...useBlockProps()}>
			<BlockControls group="block">
				<AlignmentControl
					value={ align }
					onChange={ ( newAlign ) =>
						setAttributes( { align: newAlign } )
					}
				/>
				<ParagraphRTLControl
					direction={ direction }
					setDirection={ ( newDirection ) =>
						setAttributes( { direction: newDirection } )
					}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Text Shadow', "grigora-kit" ) } initialOpen={false}>
					<ToggleControl
						label={ __( 'Text Shadow', "grigora-kit" ) }
						checked={ !! textShadow }
						onChange={ () =>
							setAttributes( { textShadow: ! textShadow } )
						}
					/>
					{ textShadow && (
					<>
						<ColorPalette
							clearable={ false }
							value={ textShadowColor }
							onChange={ textShadowColor => setAttributes( { textShadowColor } ) }
						/>
						<RangeControl
							
							initialPosition={ 33 }
							label={ __( 'Blur', "grigora-kit" ) }
							max={ 100 }
							min={ 0 }
							onChange={ textShadowBlur => setAttributes( { textShadowBlur } ) }
							value={ textShadowBlur }
						/>
						<RangeControl
							
							initialPosition={ 0 }
							label={ __( 'Horizontal', "grigora-kit" ) }
							max={ 100 }
							min={ -100 }
							onChange={ textShadowHorizontal => setAttributes( { textShadowHorizontal } ) }
							value={ textShadowHorizontal }
						/>
						<RangeControl
							
							initialPosition={ 0 }
							label={ __( 'Vertical', "grigora-kit" ) }
							max={ 100 }
							min={ -100 }
							onChange={ textShadowVertical => setAttributes( { textShadowVertical } ) }
							value={ textShadowVertical }
						/>
					</>
					) }
				</PanelBody>
				<PanelBody title={ __( 'Layout', "grigora-kit" ) } initialOpen={false}>
				<SelectControl
				label={ __( "Vertical Align: ", "grigora-kit" ) }
				labelPosition="side"
				onChange={ layoutVerticalAlign => setAttributes( { layoutVerticalAlign } ) }
				value={ layoutVerticalAlign }
				options={[
					{
					label: 'Start',
					value: 'flex-start'
					},
					{
					label: 'Center',
					value: 'center'
					},
					{
					label: 'End',
					value: 'flex-end'
					}
				]}
				/>
				{
					layoutPosition != "initial" && (
						<>
						<Notice
							status={ "warning" }
							isDismissible={ false }
						>
							<p>
								{ __( "Position other than default is not recommended. Don't change this unless, you're sure of what you're doing.", "grigora-kit" ) }
							</p>
						</Notice>
						<br></br>
						</>
					)
				}
				<SelectControl
				label={ __( "Position: ", "grigora-kit" ) }
				labelPosition="side"
				onChange={ layoutPosition => setAttributes( { layoutPosition } ) }
				value={ layoutPosition }
				options={[
					{
					label: 'Default',
					value: 'initial'
					},
					{
					label: 'Absolute',
					value: 'absolute'
					},
					{
					label: 'Fixed',
					value: 'fixed'
					},
					{
					label: 'Sticky',
					value: 'sticky'
					}
				]}
				/>
				</PanelBody>
				<PanelBody title={ __( 'Effects & Border: Normal', "grigora-kit" ) } initialOpen={false}>
				<RangeControl
					
					initialPosition={ 0 }
					label={ __( 'Rotate X (degrees)', "grigora-kit" ) }
					max={ 180 }
					min={ -180 }
					onChange={ effectNRotateX => setAttributes( { effectNRotateX } ) }
					value={ effectNRotateX }
				/>
				<RangeControl
					
					initialPosition={ 0 }
					label={ __( 'Rotate Y (degrees)', "grigora-kit" ) }
					max={ 180 }
					min={ -180 }
					onChange={ effectNRotateY => setAttributes( { effectNRotateY } ) }
					value={ effectNRotateY }
				/>
				<RangeControl
					
					initialPosition={ 0 }
					label={ __( 'Rotate Z (degrees)', "grigora-kit" ) }
					max={ 180 }
					min={ -180 }
					onChange={ effectNRotateZ => setAttributes( { effectNRotateZ } ) }
					value={ effectNRotateZ }
				/>
				<RangeControl
					
					initialPosition={ 0 }
					label={ __( 'Offset X (px)', "grigora-kit" ) }
					max={ 500 }
					min={ -500 }
					onChange={ effectNOffsetX => setAttributes( { effectNOffsetX } ) }
					value={ effectNOffsetX }
				/>
				<RangeControl
					
					initialPosition={ 0 }
					label={ __( 'Offset Y (px)', "grigora-kit" ) }
					max={ 500 }
					min={ -500 }
					onChange={ effectNOffsetY => setAttributes( { effectNOffsetY } ) }
					value={ effectNOffsetY }
				/>
				<RangeControl
					
					initialPosition={ 1 }
					label={ __( 'Scale', "grigora-kit" ) }
					max={ 1.5 }
					min={ 0 }
					step={0.1}
					onChange={ effectNScale => setAttributes( { effectNScale } ) }
					value={ effectNScale }
				/>
				<SelectControl
				label={ __( "Border Type: ", "grigora-kit" ) }
				labelPosition="side"
				onChange={ effectNBorderType => setAttributes( { effectNBorderType } ) }
				value={ effectNBorderType }
				options={[
					{
					label: 'None',
					value: 'none'
					},
					{
					label: 'Solid',
					value: 'solid'
					},
					{
					label: 'Dotted',
					value: 'dotted'
					},
					{
					label: 'Dashed',
					value: 'dashed'
					}
				]}
				/>
				{ effectNBorderType != "none" && (
					<>
					<RangeControl
					initialPosition={ 0 }
					label={ __( 'Border Width (px)', "grigora-kit" ) }
					max={ 10 }
					min={ 0 }
					onChange={ effectNBorderWidth => setAttributes( { effectNBorderWidth } ) }
					value={ effectNBorderWidth }
					/>
					<ColorPalette
						clearable={ false }
						value={ effectNBorderColor }
						onChange={ effectNBorderColor => setAttributes( { effectNBorderColor } ) }
					/>
					</>
				)}
				<RangeControl
					
					initialPosition={ 0 }
					label={ __( 'Border Radius TL (%)', "grigora-kit" ) }
					max={ 100 }
					min={ 0 }
					onChange={ effectNBorderRadiusTL => setAttributes( { effectNBorderRadiusTL } ) }
					value={ effectNBorderRadiusTL }
				/>
				<RangeControl
					
					initialPosition={ 0 }
					label={ __( 'Border Radius TR (%)', "grigora-kit" ) }
					max={ 100 }
					min={ 0 }
					onChange={ effectNBorderRadiusTR => setAttributes( { effectNBorderRadiusTR } ) }
					value={ effectNBorderRadiusTR }
				/>
				<RangeControl
					
					initialPosition={ 0 }
					label={ __( 'Border Radius BL (%)', "grigora-kit" ) }
					max={ 100 }
					min={ 0 }
					onChange={ effectNBorderRadiusBL => setAttributes( { effectNBorderRadiusBL } ) }
					value={ effectNBorderRadiusBL }
				/>
				<RangeControl
					
					initialPosition={ 0 }
					label={ __( 'Border Radius BR (%)', "grigora-kit" ) }
					max={ 100 }
					min={ 0 }
					onChange={ effectNBorderRadiusBR => setAttributes( { effectNBorderRadiusBR } ) }
					value={ effectNBorderRadiusBR }
				/>
			</PanelBody>
			<PanelBody title={ __( 'Effects & Border: Hover', "grigora-kit" ) } initialOpen={false}>
				<ToggleControl
					label={ __( 'Hover Effects', "grigora-kit" ) }
					checked={ !! hoverEffect }
					onChange={ () =>
						setAttributes( { hoverEffect: ! hoverEffect } )
					}
				/>
				{ hoverEffect && (
					<>
						<RangeControl
							initialPosition={ 1 }
							label={ __( 'Transition Time (sec)', "grigora-kit" ) }
							max={ 5 }
							min={ 0.1 }
							step={0.1}
							onChange={ transitionTime => setAttributes( { transitionTime } ) }
							value={ transitionTime }
						/>
						<RangeControl
							initialPosition={ 0 }
							label={ __( 'Rotate X (degrees)', "grigora-kit" ) }
							max={ 180 }
							min={ -180 }
							onChange={ effectHRotateX => setAttributes( { effectHRotateX } ) }
							value={ effectHRotateX }
						/>
						<RangeControl
							
							initialPosition={ 0 }
							label={ __( 'Rotate Y (degrees)', "grigora-kit" ) }
							max={ 180 }
							min={ -180 }
							onChange={ effectHRotateY => setAttributes( { effectHRotateY } ) }
							value={ effectHRotateY }
						/>
						<RangeControl
							
							initialPosition={ 0 }
							label={ __( 'Rotate Z (degrees)', "grigora-kit" ) }
							max={ 180 }
							min={ -180 }
							onChange={ effectHRotateZ => setAttributes( { effectHRotateZ } ) }
							value={ effectHRotateZ }
						/>
						<RangeControl
							
							initialPosition={ 0 }
							label={ __( 'Offset X (px)', "grigora-kit" ) }
							max={ 500 }
							min={ -500 }
							onChange={ effectHOffsetX => setAttributes( { effectHOffsetX } ) }
							value={ effectHOffsetX }
						/>
						<RangeControl
							
							initialPosition={ 0 }
							label={ __( 'Offset Y (px)', "grigora-kit" ) }
							max={ 500 }
							min={ -500 }
							onChange={ effectHOffsetY => setAttributes( { effectHOffsetY } ) }
							value={ effectHOffsetY }
						/>
						<RangeControl
							
							initialPosition={ 1 }
							label={ __( 'Scale', "grigora-kit" ) }
							max={ 1.5 }
							min={ 0 }
							step={0.1}
							onChange={ effectHScale => setAttributes( { effectHScale } ) }
							value={ effectHScale }
						/>
						<SelectControl
						label={ __( "Border Type: ", "grigora-kit" ) }
						labelPosition="side"
						onChange={ effectHBorderType => setAttributes( { effectHBorderType } ) }
						value={ effectHBorderType }
						options={[
							{
							label: 'None',
							value: 'none'
							},
							{
							label: 'Solid',
							value: 'solid'
							},
							{
							label: 'Dotted',
							value: 'dotted'
							},
							{
							label: 'Dashed',
							value: 'dashed'
							}
						]}
						/>
						{ effectHBorderType != "none" && (
							<>
							<RangeControl
							initialPosition={ 0 }
							label={ __( 'Border Width (px)', "grigora-kit" ) }
							max={ 10 }
							min={ 0 }
							onChange={ effectHBorderWidth => setAttributes( { effectHBorderWidth } ) }
							value={ effectHBorderWidth }
							/>
							<ColorPalette
								clearable={ false }
								value={ effectHBorderColor }
								onChange={ effectHBorderColor => setAttributes( { effectHBorderColor } ) }
							/>
							</>
						)}
						<RangeControl
							
							initialPosition={ 0 }
							label={ __( 'Border Radius TL (%)', "grigora-kit" ) }
							max={ 100 }
							min={ 0 }
							onChange={ effectHBorderRadiusTL => setAttributes( { effectHBorderRadiusTL } ) }
							value={ effectHBorderRadiusTL }
						/>
						<RangeControl
							
							initialPosition={ 0 }
							label={ __( 'Border Radius TR (%)', "grigora-kit" ) }
							max={ 100 }
							min={ 0 }
							onChange={ effectHBorderRadiusTR => setAttributes( { effectHBorderRadiusTR } ) }
							value={ effectHBorderRadiusTR }
						/>
						<RangeControl
							
							initialPosition={ 0 }
							label={ __( 'Border Radius BL (%)', "grigora-kit" ) }
							max={ 100 }
							min={ 0 }
							onChange={ effectHBorderRadiusBL => setAttributes( { effectHBorderRadiusBL } ) }
							value={ effectHBorderRadiusBL }
						/>
						<RangeControl
							
							initialPosition={ 0 }
							label={ __( 'Border Radius BR (%)', "grigora-kit" ) }
							max={ 100 }
							min={ 0 }
							onChange={ effectHBorderRadiusBR => setAttributes( { effectHBorderRadiusBR } ) }
							value={ effectHBorderRadiusBR }
						/>
					</>
				)  }
				
			</PanelBody>
			</InspectorControls>
			<RichText
				{ ...blockProps }
				onMouseEnter={() => {
					setHovered(true);
				  }}
				  onMouseLeave={() => {
					setHovered(false);
				  }}
				tagName={ "p" }
				identifier="content"
				value={ content }
				onChange={ ( content ) => {
					setAttributes( {content} );
				} }
				placeholder={ __( 'Write Something...', "grigora-kit" ) }
			/>
		</div>
	);
}

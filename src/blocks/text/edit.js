import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentControl,
	RichText,
	__experimentalColorGradientControl as ColorGradientControl,
} from '@wordpress/block-editor';
import {
	TabPanel,
	PanelBody,
	ToggleControl,
	__experimentalHStack as HStack,
	__experimentalNumberControl as NumberControl,
	Notice,
} from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';
import {
	alignLeft,
	alignRight,
	alignCenter,
	alignJustify,
	link,
	linkOff,
} from '@wordpress/icons';
import { createBlock } from '@wordpress/blocks';

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
import GrigoraGradientInput from '@components/gradient-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraBoxInput from '@components/box-input';
import GrigoraFontFamilyInput from '@components/fontfamily-input';
import GrigoraColorGradientInput from '@components/colorgradient-input';
import Googlefontloader from '@components/googlefontloader';

const name = 'grigora-kit/text';

export default function Edit( props ) {
	const {
		attributes,
		setAttributes,
		mergeBlocks,
		onReplace,
		onRemove,
		clientId,
	} = props;

	const {
		id,
		content,
		typoSize,
		typoLineHeight,
		typoLetterSpacing,
		typoWordSpacing,
		typoTransform,
		typoStyle,
		typoDecoration,
		typoWeight,
		typoFontFamily,
		align,
		transitionTime,
		transitionColorTime,
		textColor,
		textGradient,
		backgroundColor,
		backgroundGradient,
		textHColor,
		textHGradient,
		backgroundHColor,
		backgroundHGradient,
		entranceAnimation,
		layoutPadding,
		layoutMargin,
		layoutColumns,
		layoutColumnsGap,
		textShadowColor,
		textShadowBlur,
		textShadowHorizontal,
		textShadowVertical,
		textShadowHColor,
		textShadowHBlur,
		textShadowHHorizontal,
		textShadowHVertical,
		structureTag,
	} = attributes;

	useEffect( () => {
		// id
		if ( ! id ) {
			const tempID = generateId( 'text' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'text' );
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
			'grigora-kit-text': true,
			[ `block-id-${ id }` ]: id,
			[ `grigora-text-align-${ align }` ]: align,
			[ `animateOnce` ]: entranceAnimation != 'none',
		} ),
		style: {},
	} );

	function effectNormalRender() {
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
				{ /* <GrigoraColorGradientInput
					color={ backgroundColor }
					gradient={ backgroundGradient }
					onColorChange={ (backgroundColor) => setAttributes({ backgroundColor }) }
					onGradientChange={ (backgroundGradient) => setAttributes({ backgroundGradient }) }
					label={ __( 'Background', "grigora-kit" ) }
				/> */ }
			</>
		);
	}
	function effectHoverRender() {
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
				{ /* <GrigoraColorGradientInput
					color={ backgroundHColor }
					gradient={ backgroundHGradient }
					onColorChange={ (backgroundHColor) => setAttributes({ backgroundHColor }) }
					onGradientChange={ (backgroundHGradient) => setAttributes({ backgroundHGradient }) }
					label={ __( 'Background', "grigora-kit" ) }
				/> */ }
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
						resetValue={ '0px' }
					/>
					<GrigoraUnitInput
						label="Horizontal"
						onChange={ ( textShadowHHorizontal ) =>
							setAttributes( { textShadowHHorizontal } )
						}
						value={ textShadowHHorizontal }
						resetValue={ '0px' }
					/>
					<GrigoraUnitInput
						label="Vertical"
						onChange={ ( textShadowHVertical ) =>
							setAttributes( { textShadowHVertical } )
						}
						value={ textShadowHVertical }
						resetValue={ '0px' }
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
				<PanelBody
					title={ __( 'Typography', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraRangeInput
						value={ typoSize }
						setValue={ ( typoSize ) => {
							setAttributes( { typoSize } );
						} }
						label={ `Size` }
						resetValue={ 16 }
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
					title={ __( 'Layout', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraSelectInput
						label={ __( 'Tag', 'grigora-kit' ) }
						labelPosition="side"
						onChange={ ( structureTag ) =>
							setAttributes( { structureTag } )
						}
						value={ structureTag }
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
						value={ layoutColumns }
						setValue={ ( layoutColumns ) => {
							setAttributes( {
								layoutColumns: layoutColumns.toString(),
							} );
						} }
						label={ `Columns` }
						min={ 1 }
						max={ 10 }
						resetValue={ 'default' }
						unit={ '' }
					/>
					<GrigoraRangeInput
						value={ layoutColumnsGap }
						setValue={ ( layoutColumnsGap ) => {
							setAttributes( {
								layoutColumnsGap: layoutColumnsGap.toString(),
							} );
						} }
						label={ `Columns Gap` }
						min={ 1 }
						max={ 100 }
						resetValue={ 'normal' }
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
								return effectNormalRender();
							} else {
								return effectHoverRender();
							}
						} }
					</TabPanel>
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

				<PanelBody
					title={ __( 'Text Shadow', 'grigora-kit' ) }
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
								return textShadowNormal();
							} else {
								return textShadowHover();
							}
						} }
					</TabPanel>
				</PanelBody>
			</InspectorControls>
			<style>
				{ ` .block-id-${ id } {
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
						column-count: ${ layoutColumns ? layoutColumns : 'default' };
						column-gap: ${ layoutColumnsGap ? `${ layoutColumnsGap }px` : 'normal' };
						padding-left: ${ layoutPadding?.left };
						padding-right: ${ layoutPadding?.right };
						padding-top: ${ layoutPadding?.top };
						padding-bottom: ${ layoutPadding?.bottom };
						${
							( textShadowHorizontal &&
								textShadowHorizontal != '0px' ) ||
							( textShadowVertical &&
								textShadowVertical != '0px' ) ||
							( textShadowBlur && textShadowBlur != '0px' )
								? `filter: drop-shadow(${ `${
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
								  }` });`
								: ``
						}
						${ textColor ? `color: ${ textColor };` : `` }
						${
							textGradient
								? `background-image: ${ textGradient };-webkit-background-clip: text;-webkit-text-fill-color: transparent;`
								: ``
						}
						transition: ${ transitionColorTime }s;
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
						textHColor
							? `.block-id-${ id }:hover {${
									textColor
										? `color`
										: `-webkit-text-fill-color`
							  }: ${ textHColor };} `
							: ``
					}
					${
						textHGradient
							? `.block-id-${ id } {background-image: ${ textHGradient };-webkit-background-clip: text;} .block-id-${ id }:hover {color: transparent;} `
							: ``
					}
					${
						( textShadowHHorizontal &&
							textShadowHHorizontal != '0px' ) ||
						( textShadowHVertical &&
							textShadowHVertical != '0px' ) ||
						( textShadowHBlur && textShadowHBlur != '0px' )
							? `.block-id-${ id }:hover{filter: drop-shadow(${ `${
									textShadowHHorizontal
										? textShadowHHorizontal
										: '0px'
							  } ${
									textShadowHVertical
										? textShadowHVertical
										: '0px'
							  } ${
									textShadowHBlur ? textShadowHBlur : '0px'
							  } ${
									textShadowHColor ? textShadowHColor : '#000'
							  }` });}`
							: ``
					}
					` }
			</style>
			<RichText
				tagName={ structureTag }
				value={ content }
				onChange={ ( content ) => setAttributes( { content } ) }
				placeholder={ __( 'Text...' ) }
				allowedFormats={ [
					'core/bold',
					'core/code',
					'core/image',
					'core/italic',
					'core/strikethrough',
					'core/underline',
					'core/subscript',
					'core/superscript',
					'core/keyboard',
					'core/link',
				] }
				onSplit={ ( value, isOriginal ) => {
					let newAttributes;

					if ( isOriginal || value ) {
						newAttributes = {
							...attributes,
							content: value,
						};
					}

					const block = createBlock( name, newAttributes );

					if ( isOriginal ) {
						block.clientId = clientId;
					}

					return block;
				} }
				onMerge={ mergeBlocks }
				onReplace={ onReplace }
				onRemove={ onRemove }
			/>
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

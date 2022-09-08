import classnames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
	TabPanel as WPTabPanel,
	PanelBody,
	ToggleControl,
	__experimentalHStack as HStack,
	__experimentalNumberControl as NumberControl,
	__experimentalSpacer as Spacer,
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
import Notice from '@components/notice';

import InspectorTabs from '@components/inspector-tabs';

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
					<Notice text={__( 'Gradient Hover on Gradient might not work due to how CSS is implemented.', 'grigora-kit' )} status={'warning'} />
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
						resetValue={ '' }
					/>
					<GrigoraUnitInput
						label="Horizontal"
						onChange={ ( textShadowHHorizontal ) =>
							setAttributes( { textShadowHHorizontal } )
						}
						value={ textShadowHHorizontal }
						resetValue={ '' }
					/>
					<GrigoraUnitInput
						label="Vertical"
						onChange={ ( textShadowHVertical ) =>
							setAttributes( { textShadowHVertical } )
						}
						value={ textShadowHVertical }
						resetValue={ '' }
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

	function generalSettings() {
		return (
			<>
				<Spacer marginBottom={ 0 } paddingX={ 4 } paddingY={ 3 }>
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
				</Spacer>
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
						<TabPanel>
							<>{ effectNormalRender() }</>
						</TabPanel>
						<TabPanel>
							<>{ effectHoverRender() }</>
						</TabPanel>
					</Tabs>
				</PanelBody>
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

	function advancedSettings() {
		return (
			<>
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
							<>{ textShadowNormal() }</>
						</TabPanel>
						<TabPanel>
							<>{ textShadowHover() }</>
						</TabPanel>
					</Tabs>
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
						textShadowHHorizontal ||
						textShadowHVertical ||
						textShadowHBlur
							? `.block-id-${ id }:hover{ filter: drop-shadow(${
									textShadowHHorizontal
										? textShadowHHorizontal
										: textShadowHorizontal
										? textShadowHHorizontal
										: '0px'
							  } ${
									textShadowHVertical
										? textShadowHVertical
										: textShadowVertical
										? textShadowVertical
										: '0px'
							  } ${
									textShadowHBlur
										? textShadowHBlur
										: textShadowBlur
										? textShadowBlur
										: '0px'
							  } ${
									textShadowHColor ? textShadowHColor : '#000'
							  });}`
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
					'grigora-kit/gradient',
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

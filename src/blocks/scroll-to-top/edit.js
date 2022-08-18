import classnames from 'classnames';

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
	TabPanel,
	PanelBody,
	ToggleControl,
	ToolbarButton,
	Popover,
	Button,
	Icon,
	Tooltip,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import {
	alignLeft,
	alignRight,
	alignCenter,
	alignJustify,
	link,
	linkOff,
} from '@wordpress/icons';
import { useState, useRef, useEffect } from '@wordpress/element';
import { displayShortcut } from '@wordpress/keycodes';

import parse from 'html-react-parser';

import generateId from '@helpers/generateId';
import uniqueIDs from '@helpers/uniqueID';
import IconPicker from '@components/icon-picker';
import GrigoraColorInput from '@components/color-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraSelectInput from '@components/select-input';
import GrigoraLTRBInput from '@components/ltrb-input';
import GrigoraNumberInput from '@components/number-input';
import GrigoraToggleInput from '@components/toggle-input';
import GrigoraRangeInput from '@components/range-input';
import GrigoraBoxInput from '@components/box-input';
import GrigoraBorderRadiusInput from '@components/borderradius-input';
import SVGIcons from '@constants/icons.json';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const {
		id,
		icon,
		iconColorFlag,
		iconHoverColor,
		iconNormalColor,
		backgroundNormalColor,
		backgroundHoverColor,
		iconPadding,
		iconMargin,
		iconSize,
		position,
		positionCoord,
		offset,
		displayScrollUp,
		effectNBorderRadius,
		effectNShadowHO,
		effectNShadowVO,
		effectNShadowBlur,
		effectNShadowSpread,
		effectNShadowColor,
		smoothScrolling,
		zindex,
		transitionTime
	} = attributes;

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'scroll-to-top' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'scroll-to-top' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );


	const ref = useRef();


	function setActiveIcon( icon ) {
		setAttributes( { icon } );
	}

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-scroll-to-top': true,
			[ `block-id-${ id }` ]: id,
			// 'no-icon-selected': ! ( icon && SVGIcons[ icon ] ),
		} ),
		style: {},
	} );

	function renderSingleIcon() {
		if ( icon && SVGIcons[ icon ] ) {
			const icon_parsed = parse( SVGIcons[ icon ] );
			return icon_parsed;
		}
		return parse(
			'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>'
		);
	}

	function effectIconNormalRender() {
		return (
			<>
				<GrigoraColorInput
					label={ __( 'Icon', 'grigora-kit' ) }
					value={ iconNormalColor }
					onChange={ ( iconNormalColor ) =>
						setAttributes( { iconNormalColor } )
					}
					resetValue={ '#ffffff' }
				/>
				<GrigoraColorInput
					label={ __( 'Background', 'grigora-kit' ) }
					value={ backgroundNormalColor }
					onChange={ ( backgroundNormalColor ) =>
						setAttributes( { backgroundNormalColor } )
					}
					resetValue={ '#16537e' }
				/>
			</>
		);
	}

	function effectIconHoverRender() {
		return (
			<>
				<GrigoraColorInput
					label={ __( 'Icon', 'grigora-kit' ) }
					value={ iconHoverColor }
					onChange={ ( iconHoverColor ) =>
						setAttributes( { iconHoverColor } )
					}
					resetValue={ '#ffffff' }
				/>
				<GrigoraColorInput
					label={ __( 'Background', 'grigora-kit' ) }
					value={ backgroundHoverColor }
					onChange={ ( backgroundHoverColor ) =>
						setAttributes( { backgroundHoverColor } )
					}
					resetValue={ '#124366' }
				/>
				<GrigoraRangeInput
					label={ __( 'Transition Time', 'grigora-kit' ) }
					max={ 5 }
					min={ 0.1 }
					step={ 0.1 }
					unit={ 'sec' }
					setValue={ ( transitionTime ) =>
						setAttributes( { transitionTime } )
					}
					value={ transitionTime }
					resetValue={ 0.3 }
				/>
			</>
		);
	}

	return (
		<div { ...blockProps }>
			<InspectorControls>
			<PanelBody
					title={ __( 'Settings', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraUnitInput
						label="Show After Scrolling"
						onChange={ ( offset ) =>
							setAttributes( { offset } )
						}
						units={ [
							{
								default: 1,
								label: 'px',
								value: 'px',
							},
						] }
						value={ offset }
						resetValue={ '400px' }
					/>
					<GrigoraToggleInput
						label={ __( 'Only show when scrolling up', 'grigora-kit' ) }
						onChange={ ( displayScrollUp ) =>
							setAttributes( { displayScrollUp } )
						}
						value={ displayScrollUp }
						resetValue={ false }
					/>
					<GrigoraToggleInput
						label={ __( 'Smooth Scrolling', 'grigora-kit' ) }
						onChange={ ( smoothScrolling ) =>
							setAttributes( { smoothScrolling } )
						}
						value={ smoothScrolling }
						resetValue={ true }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Icon', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<IconPicker
						activeIcon={ icon }
						setActiveIcon={ setActiveIcon }
						hideRemoveButton
					/>
					{ icon && (
						<>
							<br></br>
							<GrigoraUnitInput
								label="Size"
								onChange={ ( iconSize ) =>
									setAttributes( { iconSize } )
								}
								value={ iconSize }
								resetValue={ '26px' }
							/>
						</>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Layout', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraBoxInput
						label={ __( 'Padding', 'grigora-kit' ) }
						onChange={ ( iconPadding ) =>
							setAttributes( { iconPadding } )
						}
						values={ iconPadding }
						resetValue={ {
							top: '8px',
							bottom: '8px',
							left: '8px',
							right: '8px',
						} }
					/>
					<GrigoraBoxInput
						label={ __( 'Margin', 'grigora-kit' ) }
						onChange={ ( iconMargin ) =>
							setAttributes( { iconMargin } )
						}
						values={ iconMargin }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '0px',
							right: '0px',
						} }
					/>
					<GrigoraBorderRadiusInput
						label={ __( 'Border Radius', 'grigora-kit' ) }
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
							topLeft: '100px',
							topRight: '100px',
							bottomLeft: '100px',
							bottomRight: '100px',
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
					title={ __( 'Position', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraSelectInput
						label={ __(
							'Position: ',
							'grigora-kit'
						) }
						labelPosition="side"
						onChange={ ( position ) =>
							setAttributes( { position } )
						}
						value={ position }
						options={ [{
							label: "Default",
							value: "default"
						},
						{
							label: "Static",
							value: "static"
						},
						{
							label: "Relative",
							value: "relative"
						},
						{
							label: "Absolute",
							value: "absolute"
						},
						{
							label: "Fixed",
							value: "fixed"
						},
						{
							label: "Sticky",
							value: "sticky"
						}] }
						resetValue={ 'fixed' }
					/>
					<GrigoraLTRBInput
						onChange={ ( positionCoord ) =>
							setAttributes( { positionCoord } )
						}
						value={ positionCoord }
						resetValue={ {
							top: '',
							bottom: '5vh',
							left: '',
							right: '3vw',
						} }
					/>
					<GrigoraNumberInput
						label="Z Index"
						onChange={ ( zindex ) =>
							setAttributes( { zindex } )
						}
						value={ zindex }
						resetValue={ 100 }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Color', 'grigora-kit' ) }
					initialOpen={ false }
				>
				<TabPanel
					className="grigora-effects-settings"
					tabs={ [
						{
							name: 'normal',
							title: __(
								'Normal',
								'grigora-kit'
							),
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
							return effectIconNormalRender();
						} else {
							return effectIconHoverRender();
						}
					} }
				</TabPanel>
				</PanelBody>
			</InspectorControls>
				<style>
					{ `
					.block-id-${ id } {
						position: ${ position } !important;
						left: ${ positionCoord?.left };
						top: ${ positionCoord?.top };
						right: ${ positionCoord?.right };
						bottom: ${ positionCoord?.bottom };
						z-index: ${ zindex };
						padding-left: ${ iconPadding?.left };
						padding-right: ${ iconPadding?.right };
						padding-top: ${ iconPadding?.top };
						padding-bottom: ${ iconPadding?.bottom };
						margin-left: ${ iconMargin?.left };
						margin-right: ${ iconMargin?.right };
						margin-top: ${ iconMargin?.top };
						margin-bottom: ${ iconMargin?.bottom };
						border-top-right-radius: ${ effectNBorderRadius?.topRight };
						border-top-left-radius: ${ effectNBorderRadius?.topLeft };
						border-bottom-right-radius: ${ effectNBorderRadius?.bottomRight };
						border-bottom-left-radius: ${ effectNBorderRadius?.bottomLeft };
						box-shadow: ${ effectNShadowHO } ${ effectNShadowVO } ${ effectNShadowBlur } ${ effectNShadowSpread } ${ effectNShadowColor };
						background-color: ${ backgroundNormalColor };
						transition: ${  transitionTime }s;
					}
					${
						icon && icon != 'none'
							? `
					.block-id-${ id } svg {
						width: ${ iconSize };
						height: ${ iconSize };
						color: ${ iconNormalColor };
					}
					.block-id-${ id }:hover {
						background-color: ${ backgroundHoverColor };
					}
					.block-id-${ id }:hover svg {
						color: ${ iconHoverColor };
					}
					`
							: ``
					}
					
					` }
				</style>
				{ renderSingleIcon() }
		</div>
	);
}

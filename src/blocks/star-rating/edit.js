import classnames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentControl,
	RichText,
} from '@wordpress/block-editor';
import {
	alignLeft,
	alignRight,
	alignCenter,
	alignJustify,
	link,
	linkOff,
	color,
	justifyCenter,
} from '@wordpress/icons';
import {
	TabPanel as WPTabPanel,
	Icon,
	PanelBody,
	TextControl,
	__experimentalHStack as HStack,
	ToggleControl,
	Notice,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

import parse from 'html-react-parser';

import { ENTRANCE_ANIMATIONS } from '@constants';
import generateId from '@helpers/generateId';
import uniqueIDs from '@helpers/uniqueID';
import GrigoraRangeInput from '@components/range-input';
import GrigoraColorInput from '@components/color-input';
import IconPicker from '@components/icon-picker';
import GrigoraTextInput from '@components/text-input';
import GrigoraGradientInput from '@components/gradient-input';
import GrigoraSelectInput from '@components/select-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraNumberInput from '@components/number-input';
import SVGIcons from '@constants/icons.json';
import GrigoraAlignmentInput from '@components/alignment-input';
import { getDevice, getDeviceProperty } from '../../helpers/previewDevice';

import InspectorTabs from '@components/inspector-tabs';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		id,
		iconSize,
		iconSizeTablet,
		iconSizeMobile,
		align,
		alignTablet,
		alignMobile,
		iconSpacing,
		displayStars,
		numStars,
		iconActiveColor,
		iconInactiveColor,
		icon,
		activeIcon,
		textPrefix,
		textSuffix,
		effectNRotateX,
		effectNRotateY,
		effectNRotateZ,
		effectNSkewX,
		effectNSkewY,
		effectNOffsetX,
		effectNOffsetY,
		effectNScale,
		transitionTime,
		effectHRotateX,
		effectHRotateY,
		effectHRotateZ,
		effectHSkewX,
		effectHSkewY,
		effectHOffsetX,
		effectHOffsetY,
		effectHScale,
		entranceAnimation,
		entranceAnimationDelay,
		entranceAnimationTime,
	} = attributes;

	const device = getDevice();

	const parentClasses = classnames( {
		'grigora-kit-star-rating': true,
		[ `block-id-${ id }` ]: id,
		[ `animateOnce` ]: entranceAnimation != 'none',
	} );

	function setIcon( icon ) {
		setAttributes( { icon } );
	}

	function setActiveIcon( activeIcon ) {
		setAttributes( { activeIcon } );
	}

	function renderSingleIcon( icon ) {
		if ( icon && SVGIcons[ icon ] ) {
			const icon_parsed = parse( SVGIcons[ icon ] );

			return icon_parsed;
		}

		return null;
	}

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'icon' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'icon' );
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

	function iconActiveRender() {
		return (
			<>
				<IconPicker
					activeIcon={ icon }
					setActiveIcon={ setIcon }
					hideRemoveButton
				/>
			</>
		);
	}
	function iconInactiveRender() {
		return (
			<div className={ `grigora-hover-effects-panel` }>
				<IconPicker
					activeIcon={ activeIcon }
					setActiveIcon={ setActiveIcon }
					hideRemoveButton
				/>
			</div>
		);
	}

	function effectNormalRender() {
		return (
			<>
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
					step={ 0.04 }
					unit={ 'x' }
					setValue={ ( effectNScale ) =>
						setAttributes( { effectNScale } )
					}
					value={ effectNScale }
					resetValue={ 1 }
				/>
			</>
		);
	}

	function effectHoverRender() {
		return (
			<div className={ `grigora-hover-effects-panel` }>
				<>
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
								effectHScale: effectHScale.toString(),
							} )
						}
						value={ effectHScale }
						resetValue={ '' }
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
			</div>
		);
	}

	function generalSettings() {
		return (
			<>
				<Spacer marginBottom={ 0 } paddingX={ 4 } paddingY={ 3 }>
					<GrigoraRangeInput
						label={ __( 'Total Number of Stars', 'grigora-kit' ) }
						max={ 20 }
						min={ 1 }
						unit={ '' }
						setValue={ ( displayStars ) => {
							if ( numStars > displayStars ) {
								setAttributes( { numStars: displayStars } );
							}
							setAttributes( { displayStars } );
						} }
						value={ displayStars }
						resetValue={ 5 }
					/>
					<GrigoraRangeInput
						label={ __( 'Rating', 'grigora-kit' ) }
						max={ displayStars }
						min={ 0 }
						unit={ '' }
						setValue={ ( numStars ) =>
							setAttributes( { numStars } )
						}
						value={ numStars }
						resetValue={ 3 }
					/>
					<GrigoraRangeInput
						label={ __( 'Set Icon Size', 'grigora-kit' ) }
						unit={ 'px' }
						step={ 1 }
						setValue={ ( iconSize ) =>
							setAttributes( { iconSize } )
						}
						value={ iconSize }
						resetValue={ 18 }
						min={ 1 }
						max={ 150 }
						isResponsive
						valueTablet={ iconSizeTablet }
						setValueTablet={ ( iconSizeTablet ) => {
							setAttributes( {
								iconSizeTablet: iconSizeTablet.toString(),
							} );
						} }
						resetValueTablet=""
						valueMobile={ iconSizeMobile }
						setValueMobile={ ( iconSizeMobile ) => {
							setAttributes( {
								iconSizeMobile: iconSizeMobile.toString(),
							} );
						} }
						resetValueMobile=""
					/>
					<GrigoraRangeInput
						value={ iconSpacing }
						setValue={ ( iconSpacing ) =>
							setAttributes( { iconSpacing } )
						}
						label={ `Icon Spacing` }
						min={ 0 }
						max={ 150 }
						resetValue={ 5 }
					/>
					<GrigoraAlignmentInput
						value={ align }
						onChange={ ( value ) =>
							setAttributes( { align: value } )
						}
						label={ __( 'Alignment', 'grigora-kit' ) }
						options={ [
							{
								label: __( 'Left', 'grigora-kit' ),
								value: 'start',
							},
							{
								label: __( 'Center', 'grigora-kit' ),
								value: 'center',
							},
							{
								label: __( 'Right', 'grigora-kit' ),
								value: 'end',
							},
						] }
						isResponsive
						valueTablet={ alignTablet }
						onChangeTablet={ ( alignTablet ) => {
							setAttributes( { alignTablet } );
						} }
						resetValueTablet=""
						valueMobile={ alignMobile }
						onChangeMobile={ ( alignMobile ) => {
							setAttributes( { alignMobile } );
						} }
						resetValueMobile=""
					/>
				</Spacer>
				<PanelBody
					title={ __( 'Icon Settings', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<Tabs className="grigora-normal-hover-tabs-container">
						<TabList className="tabs-header">
							<Tab className="normal">
								{ __( 'Active', 'grigora-kit' ) }
							</Tab>
							<Tab className="hover">
								{ __( 'Inactive', 'grigora-kit' ) }
							</Tab>
						</TabList>
						<TabPanel>
							<>{ iconActiveRender() }</>
						</TabPanel>
						<TabPanel>
							<>{ iconInactiveRender() }</>
						</TabPanel>
					</Tabs>
				</PanelBody>
				<PanelBody
					title={ __( 'Text', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraTextInput
						label={ __( 'Prefix Text', 'grigora-kit' ) }
						onChange={ ( textPrefix ) =>
							setAttributes( { textPrefix } )
						}
						value={ textPrefix }
						resetValue={ '' }
					/>
					<GrigoraTextInput
						label={ __( 'Suffix Text', 'grigora-kit' ) }
						onChange={ ( textSuffix ) =>
							setAttributes( { textSuffix } )
						}
						value={ textSuffix }
						resetValue={ '' }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'SEO', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<p>{ __( 'Coming Soon.', 'grigora-kit' ) }</p>
					<ToggleControl
						label={ __( 'Rating Schema', 'grigora-kit' ) }
						disabled
						onChange={ () => {} }
					/>
				</PanelBody>
			</>
		);
	}

	function stylesSettings() {
		return (
			<>
				<PanelBody title={ __( 'Rating Colors', 'grigora-kit' ) }>
					<GrigoraColorInput
						label={ __( 'Active', 'grigora-kit' ) }
						value={ iconActiveColor }
						onChange={ ( iconActiveColor ) =>
							setAttributes( { iconActiveColor } )
						}
						resetValue={ 'orange' }
					/>
					<GrigoraColorInput
						label={ __( 'Inactive', 'grigora-kit' ) }
						value={ iconInactiveColor }
						onChange={ ( iconInactiveColor ) =>
							setAttributes( { iconInactiveColor } )
						}
						resetValue={ 'black' }
					/>
				</PanelBody>
			</>
		);
	}

	function advancedSettings() {
		return (
			<>
				<PanelBody
					title={ __( 'On Scroll Animations', 'grigora-kit' ) }
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
							<>{ effectNormalRender() }</>
						</TabPanel>
						<TabPanel>
							<>{ effectHoverRender() }</>
						</TabPanel>
					</Tabs>
				</PanelBody>
			</>
		);
	}

	return (
		<p { ...useBlockProps() }>
			<div className={ parentClasses }>
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
					{ `
					.block-id-${ id }{
						gap: ${ iconSpacing }px;
						${
							getDeviceProperty(
								device,
								align,
								alignTablet,
								alignMobile
							)
								? `justify-content: ${ getDeviceProperty(
										device,
										align,
										alignTablet,
										alignMobile
								  ) };`
								: ``
						}
					}
					.block-id-${ id } svg{
						width: ${ getDeviceProperty(
							device,
							iconSize,
							iconSizeTablet,
							iconSizeMobile
						) }px;
						height: ${ getDeviceProperty(
							device,
							iconSize,
							iconSizeTablet,
							iconSizeMobile
						) }px;
						color: ${ iconInactiveColor };
						transition: ${ transitionTime }s;
						transform: rotateX(${ effectNRotateX ? effectNRotateX : '0deg' }) rotateY(${
						effectNRotateY ? effectNRotateY : '0deg'
					}) rotateZ(${
						effectNRotateZ ? effectNRotateZ : '0deg'
					}) skewX(${ effectNSkewX ? effectNSkewX : '0deg' }) skewY(${
						effectNSkewY ? effectNSkewY : '0deg'
					}) translateX(${ effectNOffsetX }) translateY(${ effectNOffsetY }) scale(${ effectNScale });
					}
					.block-id-${ id } svg:hover{
						${
							effectHRotateX ||
							effectHRotateY ||
							effectHRotateZ ||
							effectHSkewX ||
							effectHSkewY ||
							effectHOffsetX ||
							effectHOffsetY ||
							effectHScale
								? `
						transform: rotateX(${
							effectHRotateX ? effectHRotateX : effectNRotateX
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
					.block-id-${ id } .active svg{
						color: ${ iconActiveColor };
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
					` }
				</style>
				<span>{ textPrefix }</span>
				{ Array.from( Array( displayStars ).keys() ).map( function (
					value,
					i
				) {
					return (
						<div
							className={ `star${
								numStars > i ? ` active` : ``
							}` }
						>
							{ renderSingleIcon(
								numStars > i ? icon : activeIcon
							) }
						</div>
					);
				} ) }
				<span>{ textSuffix }</span>
			</div>
		</p>
	);
}

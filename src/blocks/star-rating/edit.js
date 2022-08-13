import classnames from 'classnames';


import './editor.scss';

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls,BlockControls,AlignmentControl,RichText } from '@wordpress/block-editor';
import { alignLeft, alignRight, alignCenter, alignJustify, link, linkOff, color, justifyCenter } from '@wordpress/icons';
import {TabPanel,Icon, PanelBody,TextControl,__experimentalHStack as HStack,ToggleControl, Notice} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

import parse from 'html-react-parser';

import generateId from '@helpers/generateId';
import uniqueIDs from '@helpers/uniqueID';
import GrigoraRangeInput from '@components/range-input';
import GrigoraColorInput from '@components/color-input';
import IconPicker from '@components/icon-picker';
import GrigoraTextInput from '@components/text-input';
import GrigoraGradientInput from '@components/gradient-input';
import GrigoraUnitInput from '@components/unit-input';
import SVGIcons from '@constants/icons.json';


export default function Edit( props ) {

	const {attributes, setAttributes} = props;
	const {
		id,
		iconSize,
		align,
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
	} = attributes;

	const parentClasses= classnames( {
		"grigora-kit-star-rating": true,
		[ `block-id-${ id }` ]: id
	} )

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
		}
	];

	function iconActiveRender(){
		return (
			<>
			<IconPicker
				activeIcon={ icon }
				setActiveIcon={ setIcon }
				hideRemoveButton
			/>
			<GrigoraColorInput
				label={__( 'Color', "grigora-kit" )}
				value={ iconActiveColor }
				onChange={ iconActiveColor => setAttributes( { iconActiveColor } ) }
				resetValue={'orange'}
			/>
			</>
		)
	}
	function iconInactiveRender(){
		return(
			<div className={`grigora-hover-effects-panel`}>
				<IconPicker
				activeIcon={ activeIcon }
				setActiveIcon={ setActiveIcon }
				hideRemoveButton
				/>
				<GrigoraColorInput
				label={__( 'Color', "grigora-kit" )}
				value={ iconInactiveColor }
				onChange={ iconInactiveColor => setAttributes( { iconInactiveColor } ) }
				resetValue={'black'}
			/>
			</div>
		)
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
						step={ 0.1 }
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
									resetValue={ '0deg' }
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
									resetValue={ '0deg' }
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
									resetValue={ '0deg' }
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
									resetValue={ '0deg' }
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
									resetValue={ '0deg' }
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
									resetValue={ '0px' }
								/>
								<GrigoraUnitInput
									label="Y"
									onChange={ ( effectHOffsetY ) =>
										setAttributes( { effectHOffsetY } )
									}
									value={ effectHOffsetY }
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
								setValue={ ( effectHScale ) =>
									setAttributes( { effectHScale } )
								}
								value={ effectHScale }
								resetValue={ 1 }
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

	return (
		<p { ...useBlockProps() }>
			<div className={parentClasses}>
				<style>
					{`
					.block-id-${id}{
						gap: ${iconSpacing}px;
						${ align ? `justify-content: ${ align };` : `` }
					}
					.block-id-${id} svg{
						width: ${iconSize}px;
						height: ${iconSize}px;
						color: ${ iconInactiveColor };
						transition: ${ transitionTime }s;
						transform: rotateX(${
							effectNRotateX ? effectNRotateX : '0deg'
						}) rotateY(${
								effectNRotateY ? effectNRotateY : '0deg'
						}) rotateZ(${
								effectNRotateZ ? effectNRotateZ : '0deg'
						}) skewX(${
								effectNSkewX ? effectNSkewX : '0deg'
						}) skewY(${
								effectNSkewY ? effectNSkewY : '0deg'
						}) translateX(${ effectNOffsetX }) translateY(${ effectNOffsetY }) scale(${ effectNScale });
					}
					.block-id-${id} svg:hover{
						transform: rotateX(${
							effectHRotateX ? effectHRotateX : '0deg'
						}) rotateY(${
								effectHRotateY ? effectHRotateY : '0deg'
						}) rotateZ(${
								effectHRotateZ ? effectHRotateZ : '0deg'
						}) skewX(${
								effectHSkewX ? effectHSkewX : '0deg'
						}) skewY(${
								effectHSkewY ? effectHSkewY : '0deg'
						}) translateX(${ effectHOffsetX }) translateY(${ effectHOffsetY }) scale(${ effectHScale });
					}
					.block-id-${id} .active svg{
						color: ${ iconActiveColor };
					}
					`}
				</style>
				<span>{ textPrefix }</span>
					{Array.from(Array(displayStars).keys()).map(function(value, i){
						return <div
									className={`star${ numStars > i ? ` active` : `` }` }
								>
								{renderSingleIcon(numStars > i ? icon : activeIcon )}
								</div>;
					})}
				<span>{ textSuffix }</span>
			</div>

			
			<BlockControls group="block">
				<AlignmentControl
					value={ align }
					onChange={ ( newAlign ) =>setAttributes( { align: newAlign } )}
					alignmentControls={DEFAULT_ALIGNMENT_CONTROLS} 
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title="Star Settings" initialOpen={false}>
					<GrigoraRangeInput
						label={ __( 'Total Number of Stars', "grigora-kit" ) }
						max={ 20 }
						min={1}
						unit={""}
						setValue={ (displayStars) => { if(numStars > displayStars){setAttributes( { numStars: displayStars } )} setAttributes( { displayStars } );} }
						value={ displayStars }
						resetValue={5} 
					/>
					<GrigoraRangeInput
						label={ __( 'Rating', "grigora-kit" ) }
						max={ displayStars }
						min={ 0 }
						unit={""}
						setValue={ (numStars) => setAttributes( { numStars } ) }
						value={ numStars }
						resetValue={3} 
					/>
					<GrigoraRangeInput
						label={ __( 'Set Icon Size', "grigora-kit" ) }
						unit={"px"}
						step={1}
						setValue={ (iconSize) => setAttributes( { iconSize } ) }
						value={ iconSize }
						resetValue={18} 
						min={1} 
						max={150}
						/>
					<GrigoraRangeInput 
						value={iconSpacing} 
						setValue={ (iconSpacing) => setAttributes( { iconSpacing } ) }
						label={`Icon Spacing`} 
						min={0} 
						max={150}
						resetValue={0}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Icon Settings', "grigora-kit" ) } initialOpen={false} >
					<TabPanel
						className="grigora-effects-settings"
						tabs={ [
							{
								name: 'active',
								title: __( 'Active', "grigora-kit" ),
								className: 'tab-active',
							},
							{
								name: 'Inactive',
								title: __( 'Inactive', "grigora-kit" ),
								className: 'tab-inactive',
							}
						] }
					>
						{ ( tab ) => { 
							if(tab.name == "active"){
								return iconActiveRender();
							}
							else{
								return iconInactiveRender();
							}
						}
						}
					</TabPanel>
				</PanelBody>
				<PanelBody title={ __( 'Text', "grigora-kit" ) } initialOpen={false} >
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
					title={ __( 'Effects', 'grigora-kit' ) }
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
					title={ __( 'SEO', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<p>
						{ __(
							'Coming Soon.',
							'grigora-kit'
						) }
					</p>
					<ToggleControl
						label={ __( 'Rating Schema', 'grigora-kit' ) }
						disabled
						onChange={ () => {} }
					/>
				</PanelBody>
			</InspectorControls>	
		</p>
	);
}
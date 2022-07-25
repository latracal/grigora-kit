import classnames from 'classnames';

import { __, _x } from '@wordpress/i18n';
import { useBlockProps,
	RichText,
	BlockControls,
	InspectorControls, AlignmentControl,
	__experimentalLinkControl as LinkControl  } from '@wordpress/block-editor';
import { TabPanel, 
	PanelBody,
	ToolbarButton,
	ToggleControl, 
	Popover,
	Button,
	Tooltip,
	__experimentalHStack as HStack } from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';
import { alignLeft, alignRight, alignCenter, alignJustify, link, linkOff } from '@wordpress/icons';
import { displayShortcut } from '@wordpress/keycodes';

import parse from 'html-react-parser';

import { HOVER_ANIMATIONS, ENTRANCE_ANIMATIONS, ICON_POSITIONS, TEXT_TRANSFORMS, TEXT_STYLE, TEXT_DECORATION, FONT_WEIGHTS } from '@constants';
import generateId from '@helpers/generateId';
import IconPicker from '@components/icon-picker';
import GrigoraRangeInput from '@components/range-input';
import GrigoraSelectInput from '@components/select-input';
import GrigoraColorInput from '@components/color-input';
import GrigoraGradientInput from '@components/gradient-input';
import GrigoraBorderBoxInput from '@components/borderbox-input';
import GrigoraBorderRadiusInput from '@components/borderradius-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraBoxInput from '@components/box-input';
import SVGIcons from '@constants/icons.json';

export default function Edit( props ) {

	const {
		attributes,
		setAttributes,
		isSelected
	} = props;

	const {
		id,
		content,
		url,
		opensInNewTab,
		urlnofollow,
		urlnoreferrer,
		urlsponsored,
		typoSize,
		typoWeight,
		typoTransform,
		typoStyle,
		typoDecoration,
		typoLineHeight,
		typoLetterSpacing,
		typoWordSpacing,
		align,
		textShadow,
		textShadowColor,
		textShadowBlur,
		textShadowHorizontal,
		textShadowVertical,
		layoutPadding,
		layoutVerticalAlign,
		layoutPosition,
		effectNColor,
		effectNBFlag,
		effectNBGradient,
		effectNBColor,
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
		effectNShadow,
		effectNShadowHO,
		effectNShadowVO,
		effectNShadowBlur,
		effectNShadowSpread,
		effectNShadowColor,
		hoverEffect,
		effectHAnimation,
		effectHColor,
		effectHBFlag,
		effectHBGradient,
		effectHBColor,
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
		effectHShadow,
		effectHShadowHO,
		effectHShadowVO,
		effectHShadowBlur,
		effectHShadowSpread,
		effectHShadowColor,
		entranceAnimation,
		icon,
		iconSize,
		iconPosition,
		iconPadding,
		iconColorFlag,
		iconNormalColor,
		iconHoverColor
	} = attributes;

	const isURLSet = !! url;


	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const [ openPopOver, setOpenPopOver ] = useState( false );
	const [ panelOpen, setPanelOpen ] = useState( {"typography": false, "cbe": false, "textshadow": false, "layout": false, "icon": false, "onscroll": false} );

	const ref = useRef();

	if( !id ){
		setAttributes( {"id": generateId("button")} );
	}

	const blockProps = useBlockProps( {
		className: classnames( {
			"grigora-kit-button-wrapper": true,
			[ `grigora-button-align-${ align }` ]: align
		} ),
		style: {
		},
	} );

	const buttonClass = classnames( {
		"grigora-kit-button": true,
		[ `block-id-${ id }` ]: id,
		[ `animateOnce` ]: entranceAnimation != "none"
	} );

	const DEFAULT_ALIGNMENT_CONTROLS = [
		{
			icon: alignLeft,
			title: __( 'Align button left' ),
			align: 'left',
		},
		{
			icon: alignCenter,
			title: __( 'Align button center' ),
			align: 'center',
		},
		{
			icon: alignRight,
			title: __( 'Align button right' ),
			align: 'right',
		},
		{
			icon: alignJustify,
			title: __( 'Align button full' ),
			align: 'justify',
		}
	];

	function toggleEditing( ) {
		setOpenPopOver( !openPopOver );
		setIsEditingURL( !isEditingURL );
	}

	function setActiveIcon(icon){
		setAttributes({icon});
	}

	function closePanels(panel){
		const temp = {...panelOpen};
		temp["typography"] = false;
		temp["cbe"] = false;
		temp["textshadow"] = false;
		temp["layout"] = false;
		temp["icon"] = false;
		temp["onscroll"] = false;
		temp[panel] = !panelOpen[panel];
		setPanelOpen(temp);
	}

	function effectNormalRender(){
		return (
			<>
				<PanelBody title={__( 'Colors', "grigora-kit" )} initialOpen={false} className={`grigora-inside-panel`}>
				<GrigoraColorInput
					label={__( 'Text', "grigora-kit" )}
					value={ effectNColor }
					onChange={ effectNColor => setAttributes( { effectNColor } ) }
					resetValue={'#fff'}
				/>
				<ToggleControl
					label={ __( 'Use Gradient Background', "grigora-kit" ) }
					checked={ !! effectNBFlag }
					onChange={ () =>
						setAttributes( { effectNBFlag: ! effectNBFlag } )
					}
				/>
				{ effectNBFlag && (
					<GrigoraGradientInput
					label={__( 'Background', "grigora-kit" )}
					value={ effectNBGradient }
					onChange={ (effectNBGradient) =>
						setAttributes( { effectNBGradient } )
					}
					resetValue={"linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"}
					/>
				) }
				{ !effectNBFlag && (
					<GrigoraColorInput
					label={__( 'Background', "grigora-kit" )}
					value={ effectNBColor }
					onChange={ effectNBColor => setAttributes( { effectNBColor } ) }
					resetValue={'#5093d4'}
					/>
				)
				}
				</PanelBody>
				<PanelBody title={__( 'Border', "grigora-kit" )} initialOpen={false} className={`grigora-inside-panel`}>
				<GrigoraBorderBoxInput
					label={ __( 'Width', "grigora-kit" ) }
					onChange={ effectNBorder => {
						if( !effectNBorder.top ){
							setAttributes( { "effectNBorder":{
								"top": effectNBorder,
								"bottom": effectNBorder,
								"right": effectNBorder,
								"left": effectNBorder
							}
							} );
						}
						else{
							setAttributes( { effectNBorder } );
						}
					} }
					value={ effectNBorder }
					resetValue={{"top":{color: '#72aee6',
						style: 'dashed',
						width: '0px'},
						"bottom":{color: '#72aee6',
						style: 'dashed',
						width: '0px'},
						"right":{color: '#72aee6',
						style: 'dashed',
						width: '0px'},
						"left":{color: '#72aee6',
						style: 'dashed',
						width: '0px'},
				}}
				/>
				<br></br>
				<GrigoraBorderRadiusInput
					label={ __( 'Radius', "grigora-kit" ) }
					onChange={ effectNBorderRadius => {
						if (typeof effectNBorderRadius === 'string' || effectNBorderRadius instanceof String){
							setAttributes( { "effectNBorderRadius":{
								"topLeft": effectNBorderRadius,
								"topRight": effectNBorderRadius,
								"bottomLeft": effectNBorderRadius,
								"bottomRight": effectNBorderRadius
							} } );
						}else{
							setAttributes( { effectNBorderRadius } );
						}
					} }
					values={ effectNBorderRadius }
					resetValue={{
						"topLeft": "4px",
						"topRight": "4px",
						"bottomLeft": "4px",
						"bottomRight": "4px"
					}}
				/>
				</PanelBody>
				<PanelBody title={__( 'Box Shadow', "grigora-kit" )} initialOpen={false} className={`grigora-inside-panel`}>
				<GrigoraColorInput
					label={__( 'Color', "grigora-kit" )}
					value={ effectNShadowColor }
					onChange={ effectNShadowColor => setAttributes( { effectNShadowColor } ) }
					resetValue={'#000'}
				/>
				<HStack spacing={ 2 }>
					<GrigoraUnitInput
						label={ __( 'Horizontal', "grigora-kit" ) }
						value={ effectNShadowHO }
						onChange={ effectNShadowHO => setAttributes( { effectNShadowHO } ) }
						resetValue={ "0px" }
					/>
					<GrigoraUnitInput
						label={ __( 'Vertical', "grigora-kit" ) }
						value={ effectNShadowVO }
						onChange={ effectNShadowVO => setAttributes( { effectNShadowVO } ) }
						resetValue={ "0px" }
					/>
				</HStack>
				<HStack spacing={ 2 }>
					<GrigoraUnitInput
						label={ __( 'Blur', "grigora-kit" ) }
						value={ effectNShadowBlur }
						onChange={ effectNShadowBlur => setAttributes( { effectNShadowBlur } ) }
						resetValue={ "0px" }
					/>
					<GrigoraUnitInput
						label={ __( 'Spread', "grigora-kit" ) }
						value={ effectNShadowSpread }
						onChange={ effectNShadowSpread => setAttributes( { effectNShadowSpread } ) }
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

	function effectHoverRender(){
		return(
			<div className={`grigora-hover-effects-panel`}>
				<br></br>
				<ToggleControl
					label={ __( 'Hover Effects', "grigora-kit" ) }
					checked={ !! hoverEffect }
					onChange={ () =>
						setAttributes( { hoverEffect: ! hoverEffect } )
					}
				/>
				{ hoverEffect && (
					<>
						<PanelBody title={__( 'Animation', "grigora-kit" )} initialOpen={false} className={`grigora-inside-panel`}>
						<GrigoraSelectInput
							label={ __( "Attention Seekers: ", "grigora-kit" ) }
							labelPosition="side"
							onChange={ effectHAnimation => setAttributes( { effectHAnimation } ) }
							value={ effectHAnimation }
							options={ HOVER_ANIMATIONS }
							resetValue={"none"}
						/>
						<GrigoraRangeInput
						label={ __( 'Transition Time', "grigora-kit" ) }
						max={ 5 }
						min={ 0.1 }
						step={0.1}
						unit={"sec"}
						setValue={ transitionTime => setAttributes( { transitionTime } ) }
						value={ transitionTime }
						resetValue={1} />
						</PanelBody>
						<PanelBody title={__( 'Colors', "grigora-kit" )} initialOpen={false} className={`grigora-inside-panel`}>
						<GrigoraColorInput
							label={__( 'Text', "grigora-kit" )}
							value={ effectHColor }
							onChange={ effectHColor => setAttributes( { effectHColor } ) }
							resetValue={'#fff'}
						/>
						{ effectNBFlag && (
							<GrigoraGradientInput
							label={__( 'Background', "grigora-kit" )}
							value={ effectHBGradient }
							onChange={ (effectHBGradient) =>
								setAttributes( { effectHBGradient } )
							}
							resetValue={"linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"}
							/>
						) }
						{ !effectNBFlag && (
							<GrigoraColorInput
								label={__( 'Background', "grigora-kit" )}
								clearable={ false }
								value={ effectHBColor }
								onChange={ effectHBColor => setAttributes( { effectHBColor } ) }
								resetValue={'#5093d4'}
							/>
						)
						}
						</PanelBody>
						<PanelBody title={__( 'Border', "grigora-kit" )} initialOpen={false} className={`grigora-inside-panel`}>
						<GrigoraBorderBoxInput
							label={ __( 'Width', "grigora-kit" ) }
							onChange={ effectHBorder => {
								if( !effectHBorder.top ){
									setAttributes( { "effectHBorder":{
										"top": effectHBorder,
										"bottom": effectHBorder,
										"right": effectHBorder,
										"left": effectHBorder
									}
									} );
								}
								else{
									setAttributes( { effectHBorder } );
								}
							} }
							value={ effectHBorder }
							resetValue={{"top":{color: '#72aee6',
								style: 'dashed',
								width: '0px'},
								"bottom":{color: '#72aee6',
								style: 'dashed',
								width: '0px'},
								"right":{color: '#72aee6',
								style: 'dashed',
								width: '0px'},
								"left":{color: '#72aee6',
								style: 'dashed',
								width: '0px'},
						}}
						/>
						<GrigoraBorderRadiusInput
							label={ __( 'Radius', "grigora-kit" ) }
							onChange={ effectHBorderRadius => {
								if (typeof effectHBorderRadius === 'string' || effectHBorderRadius instanceof String){
									setAttributes( { "effectHBorderRadius":{
										"topLeft": effectHBorderRadius,
										"topRight": effectHBorderRadius,
										"bottomLeft": effectHBorderRadius,
										"bottomRight": effectHBorderRadius
									} } );
								}else{
									setAttributes( { effectHBorderRadius } );
								}
							}
							}
							values={ effectHBorderRadius }
							resetValue={{
								"topLeft": "4px",
								"topRight": "4px",
								"bottomLeft": "4px",
								"bottomRight": "4px"
							}}
						/>
						</PanelBody>
						<PanelBody title={__( 'Box Shadow', "grigora-kit" )} initialOpen={false} className={`grigora-inside-panel`}>
							<>
							<GrigoraColorInput
								label={__( 'Color', "grigora-kit" )}
								clearable={ false }
								value={ effectHShadowColor }
								onChange={ effectHShadowColor => setAttributes( { effectHShadowColor } ) }
								resetValue={'#000'}
							/>
							<HStack spacing={ 2 }>
								<GrigoraUnitInput
									label={ __( 'Horizontal', "grigora-kit" ) }
									value={ effectHShadowHO }
									onChange={ effectHShadowHO => setAttributes( { effectHShadowHO } ) }
									resetValue={ "0px" }
								/>
								<GrigoraUnitInput
									label={ __( 'Vertical', "grigora-kit" ) }
									value={ effectHShadowVO }
									onChange={ effectHShadowVO => setAttributes( { effectHShadowVO } ) }
									resetValue={ "0px" }
								/>
							</HStack>
							<HStack spacing={ 2 }>
								<GrigoraUnitInput
									label={ __( 'Blur', "grigora-kit" ) }
									value={ effectHShadowBlur }
									onChange={ effectHShadowBlur => setAttributes( { effectHShadowBlur } ) }
									resetValue={ "0px" }
								/>
								<GrigoraUnitInput
									label={ __( 'Spread', "grigora-kit" ) }
									value={ effectHShadowSpread }
									onChange={ effectHShadowSpread => setAttributes( { effectHShadowSpread } ) }
									resetValue={ "0px" }
								/>
							</HStack>
							</>
						</PanelBody>
						<PanelBody title={__( 'Transforms', "grigora-kit" )} initialOpen={false} className={`grigora-inside-panel`}>
						<p>{__( 'Rotate', "grigora-kit" )}</p>
						<HStack spacing={ 2 }>
							<GrigoraUnitInput
								label="X"
								onChange={ effectHRotateX => setAttributes( { effectHRotateX } ) }
								units={[
									{
									default: 1,
									label: 'deg',
									value: 'deg'
									}
								]}
								value={effectHRotateX}
								resetValue={ "0deg" }
							/>
							<GrigoraUnitInput
								label="Y"
								onChange={ effectHRotateY => setAttributes( { effectHRotateY } ) }
								units={[
									{
									default: 1,
									label: 'deg',
									value: 'deg'
									}
								]}
								value={effectHRotateY}
								resetValue={ "0deg" }
							/>
							<GrigoraUnitInput
								label="Z"
								onChange={ effectHRotateZ => setAttributes( { effectHRotateZ } ) }
								units={[
									{
									default: 1,
									label: 'deg',
									value: 'deg'
									}
								]}
								value={effectHRotateZ}
								resetValue={ "0deg" }
							/>
						</HStack>
						<br></br>
						<p>{__( 'Skew', "grigora-kit" )}</p>
						<HStack spacing={ 2 }>
							<GrigoraUnitInput
								label="X"
								onChange={ effectHSkewX => setAttributes( { effectHSkewX } ) }
								units={[
									{
									default: 1,
									label: 'deg',
									value: 'deg'
									}
								]}
								value={effectHSkewX}
								resetValue={ "0deg" }
							/>
							<GrigoraUnitInput
								label="Y"
								onChange={ effectHSkewY => setAttributes( { effectHSkewY } ) }
								units={[
									{
									default: 1,
									label: 'deg',
									value: 'deg'
									}
								]}
								value={effectHSkewY}
								resetValue={ "0deg" }
							/>
						</HStack>
						<br></br>
						<p>{__( 'Offset', "grigora-kit" )}</p>
						<HStack spacing={ 2 }>
							<GrigoraUnitInput
								label="X"
								onChange={ effectHOffsetX => setAttributes( { effectHOffsetX } ) }
								value={effectHOffsetX}
								resetValue={ "0px" }
							/>
							<GrigoraUnitInput
								label="Y"
								onChange={ effectHOffsetY => setAttributes( { effectHOffsetY } ) }
								value={effectHOffsetY}
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
						setValue={ effectHScale => setAttributes( { effectHScale } ) }
						value={ effectHScale }
						resetValue={1} />
						</PanelBody>
					</>
				)  }
			</div>
		)
	}

	function effectIconNormalRender(){
		return(
			<>
				<GrigoraColorInput
					label={__( '', "grigora-kit" )}
					value={ iconNormalColor }
					onChange={ iconNormalColor => setAttributes( { iconNormalColor } ) }
					resetValue={'#000'}
				/>
			</>
		)
	}

	function effectIconHoverRender(){
		return(
			<>
				<GrigoraColorInput
					label={__( '', "grigora-kit" )}
					value={ iconHoverColor }
					onChange={ iconHoverColor => setAttributes( { iconHoverColor } ) }
					resetValue={'#000'}
				/>
			</>
		)
	}

	function renderSingleIcon( ){

		if(icon && SVGIcons[icon]){
			const icon_parsed = parse( SVGIcons[icon] );
	
			return(
				icon_parsed
			);
		}
		
		return null;

    }

	return (
		<div {...useBlockProps()}>
			<BlockControls group="block">
				<AlignmentControl
					value={ align }
					onChange={ ( newAlign ) =>
						setAttributes( { align: newAlign } )
					}
					alignmentControls={DEFAULT_ALIGNMENT_CONTROLS} 
				/>
			</BlockControls>
			<BlockControls group="block">
					<ToolbarButton
						name="link"
						icon={ url ? linkOff : link }
						title={ __( 'Link', "grigora-kit" ) }
						shortcut={ displayShortcut.primary( 'k' ) }
						onClick={ toggleEditing }
						isActive={ url ? true : false }
					/>
			</BlockControls>
			<InspectorControls>
				<HStack spacing={ 2 }>
				<div></div>
				<Tooltip text={__("Create a new Unique ID for CSS/JS actions. Click this whenever you copy and paste blocks.", "grigora-kit")}>
					<Button variant="secondary" onClick={ () => { setAttributes( {"id": generateId("button")} ); } }>
						{__("Regenerate ID", "grigora-kit")}
					</Button>
				</Tooltip>
				<div></div>
				</HStack>
				<br></br>
				<PanelBody title={ __( 'Typography', "grigora-kit" ) } opened={panelOpen["typography"]} onToggle={()=>{closePanels("typography")}}>
				<GrigoraRangeInput value={typoSize} setValue={(typoSize)=>{setAttributes({typoSize});}} label={`Size`} resetValue={16} />
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
				<PanelBody title={ __( 'Color, Border & Effects', "grigora-kit" ) } initialOpen={false} opened={panelOpen["cbe"]} onToggle={()=>{closePanels("cbe")}}>
					<TabPanel
						className="grigora-effects-settings"
						tabs={ [
							{
								name: 'normal',
								title: __( 'Normal', "grigora-kit" ),
								className: 'tab-normal',
							},
							{
								name: 'hover',
								title: __( 'Hover', "grigora-kit" ),
								className: 'tab-hover',
							}
						] }
					>
						{ ( tab ) => { 
							if(tab.name == "normal"){
								return effectNormalRender();
							}
							else{
								return effectHoverRender();
							}
						}
						}
					</TabPanel>
				</PanelBody>
				<PanelBody title={ __( 'Text Shadow', "grigora-kit" ) } initialOpen={false} opened={panelOpen["textshadow"]} onToggle={()=>{closePanels("textshadow")}}>
					<ToggleControl
						label={ __( 'Text Shadow', "grigora-kit" ) }
						checked={ !! textShadow }
						onChange={ () =>
							setAttributes( { textShadow: ! textShadow } )
						}
					/>
					{ textShadow && (
					<>
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
					</>
					) }
				</PanelBody>
				<PanelBody title={ __( 'Layout', "grigora-kit" ) } initialOpen={false} opened={panelOpen["layout"]} onToggle={()=>{closePanels("layout")}}>
				<GrigoraBoxInput 
				label={ __( "Padding", "grigora-kit" ) }
				onChange={ layoutPadding => setAttributes( { layoutPadding } ) }
				values={ layoutPadding }
				resetValue={{
					"top": "15px",
					"bottom": "15px",
					"left": "30px",
					"right": "30px",
				}}
				/>
				{/* <SelectControl
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
				/> */}
				</PanelBody>
				<PanelBody title={ __( 'Icon', "grigora-kit" ) } initialOpen={false} className='grigora-icons-panel' opened={panelOpen["icon"]} onToggle={()=>{closePanels("icon")}}>
					<IconPicker
						activeIcon={icon}
						setActiveIcon={setActiveIcon}
					/>
					{icon && (
						<>
							<br></br>
							<HStack spacing={ 2 } className='grigora-dropdown-hstack dropdown-component-margin-0'>
							<GrigoraUnitInput
								label="Size"
								onChange={ iconSize => setAttributes( { iconSize } ) }
								value={ iconSize }
								resetValue={ "26px" }
							/>
							<GrigoraSelectInput
								label={ __( "Position: ", "grigora-kit" ) }
								labelPosition="top"
								onChange={ iconPosition => setAttributes( { iconPosition } ) }
								value={ iconPosition }
								options={ ICON_POSITIONS }
								resetValue={"left"}
							/>
							</HStack>
							<br></br>
							<GrigoraBoxInput 
								label={ __( "Padding", "grigora-kit" ) }
								onChange={ iconPadding => setAttributes( { iconPadding } ) }
								values={ iconPadding }
								resetValue={{
									"top": "0px",
									"bottom": "0px",
									"left": "5px",
									"right": "5px"
								}}
							/>
							<ToggleControl
								label={ __( 'Color', "grigora-kit" ) }
								checked={ !! iconColorFlag }
								onChange={ () =>
									setAttributes( { iconColorFlag: ! iconColorFlag } )
								}
							/>
							{iconColorFlag && (
								<TabPanel
									className="grigora-effects-settings"
									tabs={ [
										{
											name: 'normal',
											title: __( 'Normal', "grigora-kit" ),
											className: 'tab-normal',
										},
										{
											name: 'hover',
											title: __( 'Hover', "grigora-kit" ),
											className: 'tab-hover',
										}
									] }
								>
									{ ( tab ) => { 
										if(tab.name == "normal"){
											return effectIconNormalRender();
										}
										else{
											return effectIconHoverRender();
										}
									}
									}
								</TabPanel>
							)}
						</>
					)}
				</PanelBody>
				<PanelBody title={ __( 'On Scroll', "grigora-kit" ) } initialOpen={false} opened={panelOpen["onscroll"]} onToggle={()=>{closePanels("onscroll")}}>
					<br></br>
					<GrigoraSelectInput
						label={ __( "Animation: ", "grigora-kit" ) }
						labelPosition="side"
						onChange={ entranceAnimation => setAttributes( { entranceAnimation } ) }
						value={ entranceAnimation }
						options={ ENTRANCE_ANIMATIONS }
						resetValue={"none"}
					/>
					<GrigoraRangeInput
						label={ __( 'Transition Time', "grigora-kit" ) }
						max={ 5 }
						min={ 0.1 }
						unit={"sec"}
						step={0.1}
						setValue={ transitionTime => setAttributes( { transitionTime } ) }
						value={ transitionTime }
						resetValue={1} />
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<style>
					{` .block-id-${id} {
					font-size: ${ typoSize }px;
					font-weight: ${typoWeight};
					text-transform: ${typoTransform};
					font-style: ${typoStyle};
					text-decoration: ${typoDecoration};
					line-height: ${typoLineHeight != "normal" ? `${typoLineHeight}px` : `normal`};;
					letter-spacing: ${typoLetterSpacing != "normal" ? `${typoLetterSpacing}px` : `normal`};
					word-spacing: ${typoWordSpacing != "normal" ? `${typoWordSpacing}px` : `normal`};
					padding-left: ${layoutPadding?.left};
					padding-right: ${layoutPadding?.right};
					padding-top: ${layoutPadding?.top};
					padding-bottom: ${layoutPadding?.bottom};
					text-shadow: ${(textShadow) ?  `${ textShadowHorizontal ? textShadowHorizontal : "0px" } ${ textShadowVertical ? textShadowVertical : "0px" } ${ textShadowBlur ? textShadowBlur : "0px" } ${ textShadowColor }` : `#000`};
					align-self: ${layoutVerticalAlign};
					position: ${layoutPosition};
					transition: ${( hoverEffect) ? `${ transitionTime }s`: `0s`};
					color: ${effectNColor};
					background-color: ${ (!effectNBFlag) ? effectNBColor : ""};
					background-image: ${( effectNBFlag )? effectNBGradient : ""};
					border-left: ${ effectNBorder?.left?.width } ${ effectNBorder?.left?.style } ${ effectNBorder?.left?.color? effectNBorder?.left?.color : "" };
					border-right: ${ effectNBorder?.right?.width } ${ effectNBorder?.right?.style } ${ effectNBorder?.right?.color? effectNBorder?.right?.color : "" };
					border-top: ${ effectNBorder?.top?.width } ${ effectNBorder?.top?.style } ${ effectNBorder?.top?.color? effectNBorder?.top?.color : "" };
					border-bottom: ${ effectNBorder?.bottom?.width } ${ effectNBorder?.bottom?.style } ${ effectNBorder?.bottom?.color? effectNBorder?.bottom?.color : "" };
					border-top-right-radius: ${effectNBorderRadius?.topRight};
					border-top-left-radius: ${effectNBorderRadius?.topLeft};
					border-bottom-right-radius: ${effectNBorderRadius?.bottomRight};
					border-bottom-left-radius: ${effectNBorderRadius?.bottomLeft};
					transform: rotateX(${ effectNRotateX ? effectNRotateX : "0deg" }) rotateY(${ effectNRotateY ? effectNRotateY : "0deg" }) rotateZ(${ effectNRotateZ ? effectNRotateZ : "0deg" }) skewX(${ effectNSkewX ? effectNSkewX : "0deg" }) skewY(${ effectNSkewY ? effectNSkewY : "0deg" }) translateX(${ effectNOffsetX }) translateY(${ effectNOffsetY }) scale(${ effectNScale });
					box-shadow: ${ effectNShadowHO } ${ effectNShadowVO } ${ effectNShadowBlur } ${ effectNShadowSpread } ${ effectNShadowColor };
					}
					${ entranceAnimation != "none" ? `
					.block-id-${id}.animateOnce {
						animation: ${entranceAnimation} ${ transitionTime }s;
					}
					` : `` }
					${ icon != "none" ? `
					.block-id-${id} .grigora-svg-icon {
						color: ${ iconColorFlag ? iconNormalColor : "currentColor"};
						padding-left: ${iconPadding?.left};
						padding-right: ${iconPadding?.right};
						padding-top: ${iconPadding?.top};
						padding-bottom: ${iconPadding?.bottom};
					}
					.block-id-${id}:hover .grigora-svg-icon {
						color: ${ iconColorFlag ? iconHoverColor : "currentColor"};
					}
					.block-id-${id} .grigora-svg-icon svg{
						width: ${iconSize};
						height: ${iconSize};
					}
					` : `` }
					${ hoverEffect ? `
					.block-id-${id}:hover {
						color: ${effectHColor};
						${ effectHAnimation != "none" ? `animation: ${effectHAnimation} ${ transitionTime }s;` : ``}
						background-color: ${ (!effectNBFlag) ? effectHBColor : ""};
						border-left: ${ effectHBorder?.left?.width } ${ effectHBorder?.left?.style } ${ effectHBorder?.left?.color? effectHBorder?.left?.color : "" };
						border-right: ${ effectHBorder?.right?.width } ${ effectHBorder?.right?.style } ${ effectHBorder?.right?.color? effectHBorder?.right?.color : "" };
						border-top: ${ effectHBorder?.top?.width } ${ effectHBorder?.top?.style } ${ effectHBorder?.top?.color? effectHBorder?.top?.color : "" };
						border-bottom: ${ effectHBorder?.bottom?.width } ${ effectHBorder?.bottom?.style } ${ effectHBorder?.bottom?.color? effectHBorder?.bottom?.color : "" };
						border-top-right-radius: ${effectHBorderRadius?.topRight};
						border-top-left-radius: ${effectHBorderRadius?.topLeft};
						border-bottom-right-radius: ${effectHBorderRadius?.bottomRight};
						border-bottom-left-radius: ${effectHBorderRadius?.bottomLeft};
						transform: rotateX(${ effectHRotateX ? effectHRotateX : "0deg" }) rotateY(${ effectHRotateY ? effectHRotateY : "0deg" }) rotateZ(${ effectHRotateZ ? effectHRotateZ : "0deg" }) skewX(${ effectHSkewX ? effectHSkewX : "0deg" }) skewY(${ effectHSkewY ? effectHSkewY : "0deg" }) translateX(${ effectHOffsetX }) translateY(${ effectHOffsetY }) scale(${ effectHScale });
						box-shadow: ${ effectHShadowHO } ${ effectHShadowVO } ${ effectHShadowBlur } ${ effectHShadowSpread } ${ effectHShadowColor };  
					}
					${ effectNBFlag ? `
					.block-id-${id}::before {
						background: ${( effectNBFlag )? effectHBGradient : ""};
					}
					` : `` }
					` : `` }
					`}
				</style>
				<div
					className={ buttonClass }
				>
					{ (icon && iconPosition == "left") && (
						<div class={`grigora-svg-icon`}>
							{ renderSingleIcon( ) }
						</div>
					)}
					<RichText
						tagName={ "span" }
						identifier="content"
						value={ content }
						onChange={ ( content ) => {
							setAttributes( {content} );
						} }
						placeholder={ __( 'Button', "grigora-kit" ) }
						withoutInteractiveFormatting
					/>
					{ (icon && iconPosition == "right") && (
						<div class={`grigora-svg-icon`}>
							{ renderSingleIcon( ) }
						</div>
					)}
				</div>
			</div>
			{ isSelected && openPopOver && ( isEditingURL || isURLSet ) && (
				<Popover
					position="bottom center"
					onClose={ () => {
						setIsEditingURL( false );
					} }
					anchorRef={ ref?.current }
					focusOnMount={ isEditingURL ? 'firstElement' : false }
					__unstableSlotName={ '__unstable-block-tools-after' }
					onFocusOutside={()=>{
						 toggleEditing();
					}}
				>
					<LinkControl
						className="wp-block-navigation-link__inline-link-input"
						value={ { url, opensInNewTab } }
						onChange={ ( {
							url: newURL = '',
							opensInNewTab: newOpensInNewTab,
						} ) => {
							setAttributes( { url: newURL, opensInNewTab: newOpensInNewTab } );
						} }
						forceIsEditingLink={ isEditingURL }
					/>
					<div className='popover-link-controls'>
						<ToggleControl
							label={ __( 'No follow', "grigora-kit" ) }
							checked={ !! urlnofollow }
							onChange={ () =>
								setAttributes( { urlnofollow: ! urlnofollow } )
							}
						/>
						<ToggleControl
							label={ __( 'No referrer', "grigora-kit" ) }
							checked={ !! urlnoreferrer }
							onChange={ () =>
								setAttributes( { urlnoreferrer: ! urlnoreferrer } )
							}
						/>
						<ToggleControl
							label={ __( 'Sponsored', "grigora-kit" ) }
							checked={ !! urlsponsored }
							onChange={ () =>
								setAttributes( { urlsponsored: ! urlsponsored } )
							}
						/>
					</div>
				</Popover>
			) }
		</div>
	);
}

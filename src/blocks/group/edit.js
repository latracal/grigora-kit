import classnames from 'classnames';

import { __, _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { InnerBlocks,
	useBlockProps,
	BlockVerticalAlignmentToolbar,
	RichText,
	BlockControls,
	InspectorControls, AlignmentControl,
	MediaUpload,
	useSetting,
	store as blockEditorStore  } from '@wordpress/block-editor';
import { TabPanel, 
	PanelBody,
	Button,
	ToggleControl, 
	Notice,
	FocalPointPicker,
	Tooltip,
	__experimentalHStack as HStack,
     } from '@wordpress/components';
import { useRef, useEffect } from '@wordpress/element';
import { alignLeft, alignRight, alignCenter, alignJustify, link, linkOff } from '@wordpress/icons';


import './editor.scss';

import { HOVER_ANIMATIONS, ENTRANCE_ANIMATIONS, ICON_POSITIONS, TEXT_TRANSFORMS, TEXT_STYLE, TEXT_DECORATION, FONT_WEIGHTS } from '@constants';
import generateId from '@helpers/generateId';
import isEmpty from "@helpers/objEmpty";
import GrigoraRangeInput from '@components/range-input';
import GrigoraSelectInput from '@components/select-input';
import GrigoraColorInput from '@components/color-input';
import GrigoraGradientInput from '@components/gradient-input';
import GrigoraTextInput from '@components/text-input';
import GrigoraToggleInput from '@components/toggle-input';
import GrigoraBorderBoxInput from '@components/borderbox-input';
import GrigoraBorderRadiusInput from '@components/borderradius-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraBoxInput from '@components/box-input';
import GrigoraRadioInput from '@components/radio-input';
import GrigoraCSSFilterInput from '@components/cssfilter-input';

export default function Edit( props ) {

	const {
		attributes,
		setAttributes,
		clientId
	} = props;

	const {
		id,
		align,
		verticalAlignment,
		layoutPadding,
		layoutMargin,
		layoutGap,
		backgroundNMode,
		backgroundNColor,
		backgroundNGradient,
		backgroundHMode,
		backgroundHColor,
		backgroundHGradient,
		backgroundHTransitionTime,
		backgroundFixed,
		backgroundOMode,
		backgroundOColor,
		backgroundOGradient,
		backgroundOOpacity,
		backgroundOCSS,
		backgroundOHMode,
		backgroundOHColor,
		backgroundOHGradient,
		backgroundOHOpacity,
		backgroundOHCSS,
		backgroundOHTransitionTime,
		backgroundOFixed,
		videoLink,
		videoLoop,
		videoPreload,
		images,
		imageH,
		imageO,
		imageOH,
		imageFocus,
		imageHFocus,
		imageLoop,
		imageDuration,
		imageTransition,
		imageTransitionDuration,
		structureTag,
		structureMaxWidth,
		structureMinHeight,
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
		hideDesktop,
		hideTablet,
		hideMobile,
		textNColor,
		linkNColor,
		textHColor,
		linkHColor,
		entranceAnimation,
		entranceAnimationTime
	} = attributes;


	if( !id ){
		setAttributes( {"id": generateId("group")} );
	}

	const updateAlignment = ( value ) => {
		setAttributes( { verticalAlignment: value } );
	};

	const DEFAULT_ALIGNMENT_CONTROLS = [
		{
			icon: alignLeft,
			title: __( 'Align content left' ),
			align: 'left',
		},
		{
			icon: alignCenter,
			title: __( 'Align content center' ),
			align: 'center',
		},
		{
			icon: alignRight,
			title: __( 'Align content right' ),
			align: 'right',
		}
	];

	const { hasInnerBlocks, themeSupportsLayout } = useSelect(
		( select ) => {
			const { getBlock, getSettings } = select( blockEditorStore );
			const block = getBlock( clientId );
			return {
				hasInnerBlocks: !! ( block && block.innerBlocks.length ),
				themeSupportsLayout: getSettings()?.supportsLayout,
			};
		},
		[ clientId ]
	);

	const videoRef = useRef();

	useEffect(() => {    
		videoRef.current?.load();
	  }, [videoLink, videoLoop, videoPreload]);

	const blockProps = useBlockProps( {
		className: classnames( {
			"grigora-kit-group-wrapper": true,
			[ `block-id-${ id }` ]: id,
			[ `animateOnce` ]: entranceAnimation != "none"
		} ),
		style: {
		},
	} );

	function renderImages(){
		return(
			<>
				<div class="grigora-gallery-picker-editor">
				{
					images.map(function(item){
						return <img src={item.url} />
					  })
				}
				</div>
			</>
		)
	}

	function addNew(image){
		setAttributes( { "images": image.map((e) => {
			return {id: e.id, url: e.url}
		 }) } );
	}

	function effectNormalRender(){
		return (
			<>
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
						"topLeft": "0px",
						"topRight": "0px",
						"bottomLeft": "0px",
						"bottomRight": "0px"
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
				{backgroundFixed || backgroundOFixed && (
				<Notice
				status={ "warning" }
				isDismissible={ false }
				>
					<p>
						{ __( "Transforms won't work with fixed backgrounds. Please turn off the fixed background in Background/Overlay.", "grigora-kit" ) }
					</p>
				</Notice>
				)}
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
								"topLeft": "0px",
								"topRight": "0px",
								"bottomLeft": "0px",
								"bottomRight": "0px"
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

	function backgroundNormal(){
		return (
			<>
				<GrigoraRadioInput 
				label=""
				onChange={ (backgroundNMode) => setAttributes({backgroundNMode}) }
				value={ backgroundNMode }
				radios={
					[
						{
							"value": "color",
							"text": __( "Color", "grigora-kit" )
						},
						{
							"value": "gradient",
							"text": __( "Gradient", "grigora-kit" )
						},
						{
							"value": "images",
							"text": __( "Images", "grigora-kit" )
						},
						{
							"value": "video",
							"text": __( "Video", "grigora-kit" )
						}
					]

				}
				/>
				{ backgroundNMode === "color" && (
					<GrigoraColorInput
					label={__( 'Color', "grigora-kit" )}
					value={ backgroundNColor }
					onChange={ backgroundNColor => setAttributes( { backgroundNColor } ) }
					resetValue={'#ffffff'}
					/>
				) }
				{ backgroundNMode === "gradient" && (
					<>
					<GrigoraGradientInput
					label=""
					value={ backgroundNGradient }
					onChange={ (backgroundNGradient) =>
						setAttributes( { backgroundNGradient } )
					}
					resetValue={"linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"}
					/>
					<GrigoraToggleInput
						label={ __( 'Fixed', "grigora-kit" ) }
						onChange={ backgroundFixed => setAttributes( { backgroundFixed } ) }
						value={backgroundFixed}
						resetValue={ false }
					/>
					</>
				) }
				{ backgroundNMode === "images" && (
					<div className="grigora-media-select">
					{ images.length > 0 && (
						<>
						<br></br>
						{renderImages()}
						</>
					)}
					<br></br>
					<MediaUpload
						onSelect={ addNew }
						allowedTypes={[ 'image' ]}
						multiple
						gallery
						value={images.map((e) => {
							return e.id
						 })}
						render={ ( { open } ) => (
							<Button
								variant="primary"
								onClick={ open }
							>
								{ __( 'Select Images', "grigora-kit" ) }
							</Button>
						) }
					/>
					{ images.length > 0 && (
						<>
						<br></br>
						<FocalPointPicker
							className='grigora-focalpoint-picker-h1ma'
							url={ images[0].url }
							value={ imageFocus }
							onChange={ ( imageFocus ) => setAttributes( { imageFocus } ) }
						/>
						<GrigoraToggleInput
						label={ __( 'Fixed', "grigora-kit" ) }
						onChange={ backgroundFixed => setAttributes( { backgroundFixed } ) }
						value={backgroundFixed}
						resetValue={ false }
						/>
						</>
					)}
					{ images.length > 1 && (
						<>
						<GrigoraToggleInput
						label={ __( 'Loop', "grigora-kit" ) }
						onChange={ imageLoop => setAttributes( { imageLoop } ) }
						value={imageLoop}
						resetValue={ true }
						/>
					<GrigoraRangeInput
						label={ __( 'Single Image Duration', "grigora-kit" ) }
						max={ 20 }
						min={ 0.5 }
						step={0.1}
						unit={"sec"}
						setValue={ imageDuration => {
							if(imageDuration < imageTransitionDuration){
								setAttributes( { imageDuration: imageDuration, imageTransitionDuration: imageDuration } );
							}else{
								setAttributes( { imageDuration } );
							}} 
						}
						value={ imageDuration }
						resetValue={5}
					/>
					<GrigoraSelectInput
						label={ __( "Transition ", "grigora-kit" ) }
						labelPosition="side"
						onChange={ imageTransition => setAttributes( { imageTransition } ) }
						value={ imageTransition }
						options={ [
							{
								label: 'Fade',
								value: 'fade'
							},
							{
								label: 'Slide Right',
								value: 'slideright'
							},
							{
								label: 'Slide Left',
								value: 'slideleft'
							},
							{
								label: 'Slide Up',
								value: 'slideup'
							},
							{
								label: 'Slide Down',
								value: 'slidedown'
							}
							] }
						resetValue={"fade"}
					/>
					{ imageTransitionDuration*100/(images.length*imageDuration) < 0.5 && (
						<Notice
						status={ "warning" }
						isDismissible={ false }
						>
						<p>
							{ __( "Very low transition duration to total time detected. Either increase the transition duration, reduce number of images or reduce the single image time.", "grigora-kit" ) }
						</p>
						</Notice>
					)}
					<GrigoraRangeInput
						label={ __( 'Transition Duration', "grigora-kit" ) }
						max={ imageDuration }
						min={ 0.1 }
						step={0.1}
						unit={"sec"}
						setValue={ imageTransitionDuration => setAttributes( { imageTransitionDuration } ) }
						value={ imageTransitionDuration }
						resetValue={0.5}
					/>
						</>
					) }
					</div>
				) }
				{ backgroundNMode === "video" && (
					<>
						<br></br>
						<GrigoraTextInput
							label={ __( 'Video Link (mp4)', "grigora-kit" ) }
							onChange={ videoLink => setAttributes( { videoLink } ) }
							value={ videoLink }
							resetValue={""}
						/>
						<div className="grigora-media-select">
						<MediaUpload
							onSelect={ (video)=>{setAttributes({videoLink: video.url});setAttributes({videoLinkID: video.id});} }
							allowedTypes="video"
							value={ videoLink }
							render={ ( { open } ) => (
								<Button
									variant="primary"
									onClick={ open }
								>
									{ __( 'Select from Gallery', "grigora-kit" ) }
								</Button>
							) }
						/>
                        </div>
						<GrigoraToggleInput
							label={ __( 'Loop', "grigora-kit" ) }
							onChange={ videoLoop => setAttributes( { videoLoop } ) }
							value={videoLoop}
							resetValue={ true }
						/>
						{/* <GrigoraToggleInput
							label={ __( 'Muted', "grigora-kit" ) }
							onChange={ videoMuted => setAttributes( { videoMuted } ) }
							value={videoMuted}
							resetValue={ true }
						/> */}
						<GrigoraSelectInput
							label={ __( "Preload ", "grigora-kit" ) }
							labelPosition="side"
							onChange={ videoPreload => setAttributes( { videoPreload } ) }
							value={ videoPreload }
							options={ [
								{
								  label: 'Auto',
								  value: 'auto'
								},
								{
								  label: 'Metadata',
								  value: 'metadata'
								},
								{
								  label: 'None',
								  value: 'none'
								}
							  ] }
							resetValue={"auto"}
						/>
					</>
				) }
			</>
		);
	}

	function backgroundHover(){
		return (
			<>
			<GrigoraRadioInput 
			label=""
			onChange={ (backgroundHMode) => setAttributes({backgroundHMode}) }
			value={ backgroundHMode }
			radios={
				[
					{
						"value": "color",
						"text": __( "Color", "grigora-kit" )
					},
					{
						"value": "gradient",
						"text": __( "Gradient", "grigora-kit" )
					},
					{
						"value": "image",
						"text": __( "Image", "grigora-kit" )
					}
				]

			}
			/>
			{ backgroundHMode === "color" && (
				<>
				<GrigoraColorInput
				label={__( 'Color', "grigora-kit" )}
				value={ backgroundHColor }
				onChange={ backgroundHColor => setAttributes( { backgroundHColor } ) }
				resetValue={'#ffffff'}
				/>
				<GrigoraRangeInput
				label={ __( 'Transition Time', "grigora-kit" ) }
				max={ 5 }
				min={ 0.1 }
				step={0.1}
				unit={"sec"}
				setValue={ backgroundHTransitionTime => setAttributes( { backgroundHTransitionTime } ) }
				value={ backgroundHTransitionTime }
				resetValue={1} />
				</>
			) }
			{ backgroundHMode === "gradient" && (
				<>
				<GrigoraGradientInput
				label=""
				value={ backgroundHGradient }
				onChange={ (backgroundHGradient) =>
					setAttributes( { backgroundHGradient } )
				}
				resetValue={"linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"}
				/>
				<GrigoraToggleInput
				label={ __( 'Fixed', "grigora-kit" ) }
				onChange={ backgroundFixed => setAttributes( { backgroundFixed } ) }
				value={backgroundFixed}
				resetValue={ false }
				/>
				<GrigoraRangeInput
				label={ __( 'Transition Time', "grigora-kit" ) }
				max={ 5 }
				min={ 0.1 }
				step={0.1}
				unit={"sec"}
				setValue={ backgroundHTransitionTime => setAttributes( { backgroundHTransitionTime } ) }
				value={ backgroundHTransitionTime }
				resetValue={1} />
				
				</>
			) }
			{ backgroundHMode === "image" && (
					<div className="grigora-media-select">
					<br></br>
					<MediaUpload
						onSelect={ imageH => setAttributes({"imageH": {
							"id": imageH.id,
							"url": imageH.url
						}}) }
						allowedTypes={[ 'image' ]}
						value={imageH.id}
						render={ ( { open } ) => (
							<Button
								variant="primary"
								onClick={ open }
							>
								{ __( 'Select Image', "grigora-kit" ) }
							</Button>
						) }
					/>
					{ imageH.url && (
						<>
						<br></br>
						<FocalPointPicker
							className='grigora-focalpoint-picker-h1ma'
							url={ imageH.url }
							value={ imageHFocus }
							onChange={ ( imageHFocus ) => setAttributes( { imageHFocus } ) }
						/>
						<GrigoraToggleInput
						label={ __( 'Fixed', "grigora-kit" ) }
						onChange={ backgroundFixed => setAttributes( { backgroundFixed } ) }
						value={backgroundFixed}
						resetValue={ false }
						/>
						</>
					)}
					<GrigoraRangeInput
					label={ __( 'Transition Time', "grigora-kit" ) }
					max={ 5 }
					min={ 0.1 }
					step={0.1}
					unit={"sec"}
					setValue={ backgroundHTransitionTime => setAttributes( { backgroundHTransitionTime } ) }
					value={ backgroundHTransitionTime }
					resetValue={1} />
					</div>
				) }
		</>
		);
	}

	function backgroundOverlayNormal(){
		return(
			<>
			<GrigoraRadioInput 
			label=""
			onChange={ (backgroundOMode) => setAttributes({backgroundOMode}) }
			value={ backgroundOMode }
			radios={
				[
					{
						"value": "color",
						"text": __( "Color", "grigora-kit" )
					},
					{
						"value": "gradient",
						"text": __( "Gradient", "grigora-kit" )
					},
					{
						"value": "image",
						"text": __( "Image", "grigora-kit" )
					}
				]

			}
			/>
			{ backgroundOMode === "color" && (
				<>
				<GrigoraColorInput
				label={__( 'Color', "grigora-kit" )}
				value={ backgroundOColor }
				onChange={ backgroundOColor => setAttributes( { backgroundOColor } ) }
				resetValue={'#ffffff'}
				/>
				<GrigoraCSSFilterInput value={backgroundOCSS}
				setValue={ backgroundOCSS => setAttributes({backgroundOCSS}) }
				label={__( 'CSS Filters', "grigora-kit" )}
				reset={{}}
				/>
				<br></br>
				<GrigoraRangeInput
				label={ __( 'Opacity', "grigora-kit" ) }
				max={ 1 }
				min={ 0 }
				step={0.05}
				unit={""}
				setValue={ backgroundOOpacity => setAttributes( { backgroundOOpacity } ) }
				value={ backgroundOOpacity }
				resetValue={0.5} />
				</>
			) }
			{ backgroundOMode === "gradient" && (
				<>
				<GrigoraGradientInput
				label=""
				value={ backgroundOGradient }
				onChange={ (backgroundOGradient) =>
					setAttributes( { backgroundOGradient } )
				}
				resetValue={"linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"}
				/>
				<GrigoraCSSFilterInput value={backgroundOCSS}
				setValue={ backgroundOCSS => setAttributes({backgroundOCSS}) }
				label={__( 'CSS Filters', "grigora-kit" )}
				reset={{}}
				/>
				<br></br>
				<GrigoraToggleInput
				label={ __( 'Fixed', "grigora-kit" ) }
				onChange={ backgroundOFixed => setAttributes( { backgroundOFixed } ) }
				value={backgroundOFixed}
				resetValue={ false }
				/>
				<GrigoraRangeInput
				label={ __( 'Opacity', "grigora-kit" ) }
				max={ 1 }
				min={ 0 }
				step={0.05}
				unit={""}
				setValue={ backgroundOOpacity => setAttributes( { backgroundOOpacity } ) }
				value={ backgroundOOpacity }
				resetValue={0.5} />
				</>
			) }
			{ backgroundOMode === "image" && (
				<div className="grigora-media-select">
				<br></br>
				<MediaUpload
					onSelect={ imageO => setAttributes({"imageO": {
						"id": imageO.id,
						"url": imageO.url
					}}) }
					allowedTypes={[ 'image' ]}
					value={imageO.id}
					render={ ( { open } ) => (
						<Button
							variant="primary"
							onClick={ open }
						>
							{ __( 'Select Image', "grigora-kit" ) }
						</Button>
					) }
				/>
				<GrigoraToggleInput
				label={ __( 'Fixed', "grigora-kit" ) }
				onChange={ backgroundOFixed => setAttributes( { backgroundOFixed } ) }
				value={backgroundOFixed}
				resetValue={ false }
				/>
				<GrigoraCSSFilterInput value={backgroundOCSS}
				setValue={ backgroundOCSS => setAttributes({backgroundOCSS}) }
				label={__( 'CSS Filters', "grigora-kit" )}
				reset={{}}
				/>
				<br></br>
				<GrigoraRangeInput
				label={ __( 'Opacity', "grigora-kit" ) }
				max={ 1 }
				min={ 0 }
				step={0.05}
				unit={""}
				setValue={ backgroundOOpacity => setAttributes( { backgroundOOpacity } ) }
				value={ backgroundOOpacity }
				resetValue={0.5} />
				</div>
				) }
			</>
		);
	}

	function backgroundOverlayHover(){
		return(
			<>
			<GrigoraRadioInput 
			label=""
			onChange={ (backgroundOHMode) => setAttributes({backgroundOHMode}) }
			value={ backgroundOHMode }
			radios={
				[
					{
						"value": "color",
						"text": __( "Color", "grigora-kit" )
					},
					{
						"value": "gradient",
						"text": __( "Gradient", "grigora-kit" )
					},
					{
						"value": "image",
						"text": __( "Image", "grigora-kit" )
					}
				]

			}
			/>
			{ backgroundOHMode === "color" && (
				<>
				<GrigoraColorInput
				label={__( 'Color', "grigora-kit" )}
				value={ backgroundOHColor }
				onChange={ backgroundOHColor => setAttributes( { backgroundOHColor } ) }
				resetValue={'#ffffff'}
				/>
				<GrigoraCSSFilterInput value={backgroundOHCSS}
				setValue={ backgroundOHCSS => setAttributes({backgroundOHCSS}) }
				label={__( 'CSS Filters', "grigora-kit" )}
				reset={{}}
				/>
				<br></br>
				<GrigoraRangeInput
				label={ __( 'Opacity', "grigora-kit" ) }
				max={ 1 }
				min={ 0 }
				step={0.05}
				unit={""}
				setValue={ backgroundOHOpacity => setAttributes( { backgroundOHOpacity } ) }
				value={ backgroundOHOpacity }
				resetValue={0.5} />
				<GrigoraRangeInput
				label={ __( 'Transition Time', "grigora-kit" ) }
				max={ 5 }
				min={ 0.1 }
				step={0.1}
				unit={"sec"}
				setValue={ backgroundOHTransitionTime => setAttributes( { backgroundOHTransitionTime } ) }
				value={ backgroundOHTransitionTime }
				resetValue={1} />
				</>
			) }
			{ backgroundOHMode === "gradient" && (
				<>
				<GrigoraGradientInput
				label=""
				value={ backgroundOHGradient }
				onChange={ (backgroundOHGradient) =>
					setAttributes( { backgroundOHGradient } )
				}
				resetValue={"linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"}
				/>
				<GrigoraCSSFilterInput value={backgroundOHCSS}
				setValue={ backgroundOHCSS => setAttributes({backgroundOHCSS}) }
				label={__( 'CSS Filters', "grigora-kit" )}
				reset={{}}
				/>
				<br></br>
				<GrigoraRangeInput
				label={ __( 'Opacity', "grigora-kit" ) }
				max={ 1 }
				min={ 0 }
				step={0.05}
				unit={""}
				setValue={ backgroundOHOpacity => setAttributes( { backgroundOHOpacity } ) }
				value={ backgroundOHOpacity }
				resetValue={0.5} />
				<GrigoraToggleInput
				label={ __( 'Fixed', "grigora-kit" ) }
				onChange={ backgroundOFixed => setAttributes( { backgroundOFixed } ) }
				value={backgroundOFixed}
				resetValue={ false }
				/>
				<GrigoraRangeInput
				label={ __( 'Transition Time', "grigora-kit" ) }
				max={ 5 }
				min={ 0.1 }
				step={0.1}
				unit={"sec"}
				setValue={ backgroundOHTransitionTime => setAttributes( { backgroundOHTransitionTime } ) }
				value={ backgroundOHTransitionTime }
				resetValue={1} />
				</>
			) }
			{ backgroundOHMode === "image" && (
				<div className="grigora-media-select">
				<br></br>
				<MediaUpload
					onSelect={ imageOH => setAttributes({"imageOH": {
						"id": imageOH.id,
						"url": imageOH.url
					}}) }
					allowedTypes={[ 'image' ]}
					value={imageOH.id}
					render={ ( { open } ) => (
						<Button
							variant="primary"
							onClick={ open }
						>
							{ __( 'Select Image', "grigora-kit" ) }
						</Button>
					) }
				/>
				<GrigoraCSSFilterInput value={backgroundOHCSS}
				setValue={ backgroundOHCSS => setAttributes({backgroundOHCSS}) }
				label={__( 'CSS Filters', "grigora-kit" )}
				reset={{}}
				/>
				<br></br>
				<GrigoraToggleInput
				label={ __( 'Fixed', "grigora-kit" ) }
				onChange={ backgroundOFixed => setAttributes( { backgroundOFixed } ) }
				value={backgroundOFixed}
				resetValue={ false }
				/>
				<GrigoraRangeInput
				label={ __( 'Opacity', "grigora-kit" ) }
				max={ 1 }
				min={ 0 }
				step={0.05}
				unit={""}
				setValue={ backgroundOHOpacity => setAttributes( { backgroundOHOpacity } ) }
				value={ backgroundOHOpacity }
				resetValue={0.5} />
				<GrigoraRangeInput
				label={ __( 'Transition Time', "grigora-kit" ) }
				max={ 5 }
				min={ 0.1 }
				step={0.1}
				unit={"sec"}
				setValue={ backgroundOHTransitionTime => setAttributes( { backgroundOHTransitionTime } ) }
				value={ backgroundOHTransitionTime }
				resetValue={1} />
				</div>
				) }
			</>
		);
	}

	function textColorNormal(){
		return(
			<>
				<GrigoraColorInput
					label={__( 'Text Color', "grigora-kit" )}
					value={ textNColor }
					onChange={ textNColor => setAttributes( { textNColor } ) }
					resetValue={''}
				/>
				<GrigoraColorInput
					label={__( 'Link Color', "grigora-kit" )}
					value={ linkNColor }
					onChange={ linkNColor => setAttributes( { linkNColor } ) }
					resetValue={''}
				/>
			</>
		)
	}

	function textColorHover(){
		return(
			<>
				<GrigoraColorInput
					label={__( 'Text Hover Color', "grigora-kit" )}
					value={ textHColor }
					onChange={ textHColor => setAttributes( { textHColor } ) }
					resetValue={''}
				/>
				<GrigoraColorInput
					label={__( 'Link Hover Color', "grigora-kit" )}
					value={ linkHColor }
					onChange={ linkHColor => setAttributes( { linkHColor } ) }
					resetValue={''}
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
			</>
		)
	}

	return (
		<div {...blockProps}>
			<BlockControls group="block">
			<AlignmentControl
					value={ align }
					onChange={ ( newAlign ) =>
						setAttributes( { align: newAlign } )
					}
					alignmentControls={DEFAULT_ALIGNMENT_CONTROLS} 
				/>
			<BlockVerticalAlignmentToolbar
					onChange={ updateAlignment }
					value={ verticalAlignment }
				/>
			</BlockControls>
			<InspectorControls>
				<HStack spacing={ 2 }>
				<div></div>
				<Tooltip text={__("Create a new Unique ID for CSS/JS actions. Click this whenever you copy and paste blocks.", "grigora-kit")}>
					<Button variant="secondary" onClick={ () => { setAttributes( {"id": generateId("group")} ); } }>
						{__("Regenerate ID", "grigora-kit")}
					</Button>
				</Tooltip>
				<div></div>
				</HStack>
				<br></br>
				<PanelBody title={ __( 'Layout', "grigora-kit" ) } initialOpen={false} >
				<GrigoraBoxInput 
				label={ __( "Padding", "grigora-kit" ) }
				onChange={ layoutPadding => setAttributes( { layoutPadding } ) }
				values={ layoutPadding }
				resetValue={{
					"top": "0px",
					"bottom": "0px",
					"left": "0px",
					"right": "0px",
				}}
				/>
				<GrigoraBoxInput 
				label={ __( "Margin", "grigora-kit" ) }
				onChange={ layoutMargin => setAttributes( { layoutMargin } ) }
				values={ layoutMargin }
				resetValue={{
					"top": "0px",
					"bottom": "0px",
					"left": "0px",
					"right": "0px",
				}}
				/>
				<GrigoraUnitInput
					label={ __( 'Block Gap', "grigora-kit" ) }
					onChange={ layoutGap => setAttributes( { layoutGap } ) }
					value={layoutGap}
					resetValue={ "" }
				/>
				</PanelBody>
				<PanelBody title={ __( 'Structure', "grigora-kit" ) } initialOpen={false} >
				<GrigoraSelectInput
					label={ __( "Container Tag ", "grigora-kit" ) }
					labelPosition="side"
					onChange={ structureTag => setAttributes( { structureTag } ) }
					value={ structureTag }
					options={ [ 'div', 'main', 'header', 'aside', 'footer', 'section', 'article' ].map(function(item){
						return {
							label: item,
							value: item
						};
					})
					 }
					resetValue={"div"}
				/>
				<GrigoraUnitInput
					label={ __( 'Maximum Width', "grigora-kit" ) }
					onChange={ structureMaxWidth => setAttributes( { structureMaxWidth } ) }
					value={structureMaxWidth}
					resetValue={ "" }
				/>
				<GrigoraUnitInput
					label={ __( 'Minimum Height', "grigora-kit" ) }
					onChange={ structureMinHeight => setAttributes( { structureMinHeight } ) }
					value={structureMinHeight}
					resetValue={ "" }
				/>
				</PanelBody>
				<PanelBody title={ __( 'Background', "grigora-kit" ) } initialOpen={false} >
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
								return backgroundNormal();
							}
							else{
								return backgroundHover();
							}
						}
						}
					</TabPanel>
				</PanelBody>
				<PanelBody title={ __( 'Background Overlay', "grigora-kit" ) } initialOpen={false}>
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
								return backgroundOverlayNormal();
							}
							else{
								return backgroundOverlayHover();
							}
						}
						}
					</TabPanel>
				</PanelBody>
				<PanelBody title={ __( 'Text Color', "grigora-kit" ) } initialOpen={false}>
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
								return textColorNormal();
							}
							else{
								return textColorHover();
							}
						}
						}
					</TabPanel>
				</PanelBody>
				<PanelBody title={ __( 'Border & Effects', "grigora-kit" ) } initialOpen={false}>
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
				<PanelBody title={ __( 'On Scroll', "grigora-kit" ) } initialOpen={false} >
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
						setValue={ entranceAnimationTime => setAttributes( { entranceAnimationTime } ) }
						value={ entranceAnimationTime }
						resetValue={1} />
				</PanelBody>
				<PanelBody title={ __( 'Visibility', "grigora-kit" ) } initialOpen={false}>
				<GrigoraToggleInput
					label={ __( 'Hide on Desktop', "grigora-kit" ) }
					onChange={ hideDesktop => setAttributes( { hideDesktop } ) }
					value={hideDesktop}
					resetValue={ false }
				/>
				<GrigoraToggleInput
					label={ __( 'Hide on Tablet', "grigora-kit" ) }
					onChange={ hideTablet => setAttributes( { hideTablet } ) }
					value={hideTablet}
					resetValue={ false }
				/>
				<GrigoraToggleInput
					label={ __( 'Hide on Mobile', "grigora-kit" ) }
					onChange={ hideMobile => setAttributes( { hideMobile } ) }
					value={hideMobile}
					resetValue={ false }
				/>
				</PanelBody>
			</InspectorControls>
				<style>
					{` .block-id-${id} {
					padding-left: ${layoutPadding?.left};
					padding-right: ${layoutPadding?.right};
					padding-top: ${layoutPadding?.top};
					padding-bottom: ${layoutPadding?.bottom};
					margin-left: ${layoutMargin?.left};
					margin-right: ${layoutMargin?.right};
					margin-top: ${layoutMargin?.top};
					margin-bottom: ${layoutMargin?.bottom};
					${ verticalAlignment ? `justify-content: ${align};` : `text-align: ${align};` }
					${ textNColor ? `color: ${textNColor};`: `` }
					${ structureMaxWidth ? `max-width: ${structureMaxWidth} !important;` : `` }
					${ structureMinHeight ? `min-height: ${structureMinHeight};` : `` }
					transition: ${`${ transitionTime }s`};
					border-left: ${ effectNBorder?.left?.width } ${ effectNBorder?.left?.style } ${ effectNBorder?.left?.color? effectNBorder?.left?.color : "" };
					border-right: ${ effectNBorder?.right?.width } ${ effectNBorder?.right?.style } ${ effectNBorder?.right?.color? effectNBorder?.right?.color : "" };
					border-top: ${ effectNBorder?.top?.width } ${ effectNBorder?.top?.style } ${ effectNBorder?.top?.color? effectNBorder?.top?.color : "" };
					border-bottom: ${ effectNBorder?.bottom?.width } ${ effectNBorder?.bottom?.style } ${ effectNBorder?.bottom?.color? effectNBorder?.bottom?.color : "" };
					border-top-right-radius: ${effectNBorderRadius?.topRight};
					border-top-left-radius: ${effectNBorderRadius?.topLeft};
					border-bottom-right-radius: ${effectNBorderRadius?.bottomRight};
					border-bottom-left-radius: ${effectNBorderRadius?.bottomLeft};
					${ backgroundFixed || backgroundOFixed ? `` : `transform: rotateX(${ effectNRotateX ? effectNRotateX : "0deg" }) rotateY(${ effectNRotateY ? effectNRotateY : "0deg" }) rotateZ(${ effectNRotateZ ? effectNRotateZ : "0deg" }) skewX(${ effectNSkewX ? effectNSkewX : "0deg" }) skewY(${ effectNSkewY ? effectNSkewY : "0deg" }) translateX(${ effectNOffsetX }) translateY(${ effectNOffsetY }) scale(${ effectNScale });`}
					box-shadow: ${ effectNShadowHO } ${ effectNShadowVO } ${ effectNShadowBlur } ${ effectNShadowSpread } ${ effectNShadowColor };
					}
					${ linkNColor ? `.block-id-${id} a {color: ${linkNColor};}`: `` }
					${ textHColor ? `.block-id-${id}:hover {color: ${textHColor};}` : `` }
					${ linkHColor ? `.block-id-${id}:hover a {color: ${linkHColor};}` : `` }
					${ hoverEffect ? `
					.block-id-${id}:hover {
						${ effectHAnimation != "none" ? `animation: ${effectHAnimation} ${ transitionTime }s;` : ``}
						border-left: ${ effectHBorder?.left?.width } ${ effectHBorder?.left?.style } ${ effectHBorder?.left?.color? effectHBorder?.left?.color : "" };
						border-right: ${ effectHBorder?.right?.width } ${ effectHBorder?.right?.style } ${ effectHBorder?.right?.color? effectHBorder?.right?.color : "" };
						border-top: ${ effectHBorder?.top?.width } ${ effectHBorder?.top?.style } ${ effectHBorder?.top?.color? effectHBorder?.top?.color : "" };
						border-bottom: ${ effectHBorder?.bottom?.width } ${ effectHBorder?.bottom?.style } ${ effectHBorder?.bottom?.color? effectHBorder?.bottom?.color : "" };
						border-top-right-radius: ${effectHBorderRadius?.topRight};
						border-top-left-radius: ${effectHBorderRadius?.topLeft};
						border-bottom-right-radius: ${effectHBorderRadius?.bottomRight};
						border-bottom-left-radius: ${effectHBorderRadius?.bottomLeft};
						${ backgroundFixed || backgroundOFixed ? `` : `transform: rotateX(${ effectHRotateX ? effectHRotateX : "0deg" }) rotateY(${ effectHRotateY ? effectHRotateY : "0deg" }) rotateZ(${ effectHRotateZ ? effectHRotateZ : "0deg" }) skewX(${ effectHSkewX ? effectHSkewX : "0deg" }) skewY(${ effectHSkewY ? effectHSkewY : "0deg" }) translateX(${ effectHOffsetX }) translateY(${ effectHOffsetY }) scale(${ effectHScale })`};
						box-shadow: ${ effectHShadowHO } ${ effectHShadowVO } ${ effectHShadowBlur } ${ effectHShadowSpread } ${ effectHShadowColor };  
					}`:``}
					${ layoutGap ? `
						.block-id-${id} .block-editor-block-list__layout > * + * {
							margin-block-start: ${ layoutGap } !important;
						}
					` : `` }
					${ verticalAlignment ? `
						.block-id-${id} {
							display: flex !important;
							${ verticalAlignment === "top" ? `align-items: flex-start !important;` : `` }
							${ verticalAlignment === "center" ? `align-items: center !important;` : `` }
							${ verticalAlignment === "bottom" ? `align-items: flex-end !important;` : `` }
						}
					` : `` }
					${ entranceAnimation != "none" ? `
					.block-id-${id}.animateOnce {
						animation: ${entranceAnimation} ${ entranceAnimationTime }s;
					}`: ``}
					${ backgroundNMode === "color" ? 
						`.block-id-${id} .background-color { 
							background-color: ${backgroundNColor};
						}` : ``
					}
					${ backgroundHMode ?
						`.block-id-${id} .background-hover-color { 
							transition: ${ backgroundHTransitionTime }s;
							opacity: 0;
							background-attachment: ${ backgroundFixed ? 'fixed': '' };
							${ backgroundHMode === "color" ? 
								`background-color: ${backgroundHColor};` : ``
							}
							${ backgroundHMode === "gradient" ? 
								`background-image: ${backgroundHGradient};` : ``
							}
							${ backgroundHMode === "image" ? 
								`background-position: ${imageHFocus.x*100}% ${imageHFocus.y*100}%;
								background-image: url(${imageH.url});` : ``
							}
						}
						.block-id-${id}:hover .background-hover-color { 
							opacity: 1;
						}
						` : ``
					}
					${ backgroundOMode ?
						`.block-id-${id} .background-overlay { 
							opacity: ${backgroundOOpacity};
							${ backgroundOMode === "color" ? 
								`background-color: ${backgroundOColor};` : ``
							}
							${ backgroundOMode === "gradient" ? 
								`background-image: ${backgroundOGradient};` : ``
							}
							${ backgroundOMode === "image" ? 
								`background-image: url(${imageO.url});` : ``
							}
							${ !isEmpty(backgroundOCSS) ? 
								`filter: blur(${backgroundOCSS.blur}px) brightness(${backgroundOCSS.brightness}%) contrast(${backgroundOCSS.contrast}%) saturate(${backgroundOCSS.saturation}%) hue-rotate(${backgroundOCSS.hue}deg);` : ``
							}
							transition: ${backgroundOHTransitionTime}s;
							background-attachment: ${ backgroundOFixed ? 'fixed': '' };
						}
						` : ``
					}
					${ backgroundOHMode ?
						`.block-id-${id}:hover .background-overlay { 
							opacity: ${backgroundOHOpacity};
							${ backgroundOHMode === "color" ? 
								`background-color: ${backgroundOHColor};` : ``
							}
							${ backgroundOHMode === "gradient" ? 
								`background-image: ${backgroundOHGradient};` : ``
							}
							${ backgroundOHMode === "image" ? 
								`background-image: url(${imageOH.url});` : ``
							}
							${ !isEmpty(backgroundOHCSS) ? 
								`filter: blur(${backgroundOHCSS.blur}px) brightness(${backgroundOHCSS.brightness}%) contrast(${backgroundOHCSS.contrast}%) saturate(${backgroundOHCSS.saturation}%) hue-rotate(${backgroundOHCSS.hue}deg)` : ``
							}
						}
						` : ``
					}
					${ backgroundNMode === "gradient" ?
						`.block-id-${id} .background-color { 
							background-image: ${ backgroundNGradient };
							background-attachment: ${ backgroundFixed ? 'fixed': '' };
						}` : ``
					}
					${backgroundNMode === "images" ? `
					${ images.length > 1 ? `
					.block-id-${id} .grigora-group-slideshow li span { 
						background-attachment: ${ backgroundFixed ? 'fixed': '' };
						-webkit-backface-visibility: hidden;
						-webkit-animation: imageAnimation-${id} ${ images.length*imageDuration }s ${ imageLoop ? `infinite` : `1` } 0s ${ imageLoop ? `` : `forwards` };
						-moz-animation: imageAnimation-${id} ${ images.length*imageDuration }s linear ${ imageLoop ? `infinite` : `1` } 0s ${ imageLoop ? `` : `forwards` };
						-o-animation: imageAnimation-${id} ${ images.length*imageDuration }s linear ${ imageLoop ? `infinite` : `1` } 0s ${ imageLoop ? `` : `forwards` };
						-ms-animation: imageAnimation-${id} ${ images.length*imageDuration }s linear ${ imageLoop ? `infinite` : `1` } 0s ${ imageLoop ? `` : `forwards` };
						animation: imageAnimation-${id} ${ images.length*imageDuration }s linear ${ imageLoop ? `infinite` : `1` } 0s ${ imageLoop ? `` : `forwards` };
						${ imageTransition === "fade" ? `opacity: 0;` : `opacity: 1;` }
						${ imageTransition === "slideright" ? `transform: translateX(-100%);` : `` }
						${ imageTransition === "slideleft" ? `transform: translateX(100%);` : `` }
						${ imageTransition === "slideup" ? `transform: translateY(100%);` : `` }
						${ imageTransition === "slidedown" ? `transform: translateY(-100%);` : `` }
					}
					${
						images.map(function(item, index){
							return ` .block-id-${id} .grigora-group-slideshow li:nth-child(${index+1}) span { 
								background-position: ${imageFocus.x*100}% ${imageFocus.y*100}%;
								background-image: url(${item.url});
								-webkit-animation-delay: ${index*imageDuration}s;
								-moz-animation-delay: ${index*imageDuration}s;
								-o-animation-delay: ${index*imageDuration}s;
								-ms-animation-delay: ${index*imageDuration}s;
								animation-delay: ${index*imageDuration}s;
							} `;
						}).join(' ')
					}
					@keyframes imageAnimation-${id} { 
						${ imageTransition === "fade" ? `0% { opacity: 0; }` : `` }
						${ imageTransition === "slideright" ? `0% { transform: translateX(-100%); }` : `` }
						${ imageTransition === "slideleft" ? `0% { transform: translateX(100%); }` : `` }
						${ imageTransition === "slideup" ? `0% { transform: translateY(100%); }` : `` }
						${ imageTransition === "slidedown" ? `0% { transform: translateY(-100%); }` : `` }
						${(imageTransitionDuration*100/(images.length*imageDuration)).toFixed(2)}% {  
							${ imageTransition === "fade" ? `opacity: 1;` : `` }
							${ imageTransition === "slideright" ? `transform: translateX(0%);` : `` }
							${ imageTransition === "slideleft" ? `transform: translateX(0%);` : `` }
							${ imageTransition === "slideup" ? `transform: translateY(0%);` : `` }
							${ imageTransition === "slidedown" ? `transform: translateY(0%);` : `` }
						}
						${((imageTransitionDuration + imageDuration)*100/(images.length*imageDuration)).toFixed(2)}% { 
							${ imageTransition === "fade" ? `opacity: 1;` : `` }
							${ imageTransition === "slideright" ? `transform: translateX(0%);` : `` }
							${ imageTransition === "slideleft" ? `transform: translateX(0%);` : `` }
							${ imageTransition === "slideup" ? `transform: translateY(0%);` : `` }
							${ imageTransition === "slidedown" ? `transform: translateY(0%);` : `` }
						 }
						${((imageTransitionDuration*2 + imageDuration)*100/(images.length*imageDuration)).toFixed(2)}% { 
							${ imageTransition === "fade" ? `${ imageLoop ? `opacity: 0` : `opacity: 1` };` : `` }
							${ imageTransition === "slideright" ? `${ imageLoop ? `transform: translateX(100%)` : `transform: translateX(0%)` };` : `` }
							${ imageTransition === "slideleft" ? `${ imageLoop ? `transform: translateX(-100%)` : `transform: translateX(0%)` };` : `` }
							${ imageTransition === "slideup" ? `${ imageLoop ? `transform: translateY(-100%)` : `transform: translateY(0%)` };` : `` }
							${ imageTransition === "slidedown" ? `${ imageLoop ? `transform: translateY(100%)` : `transform: translateY(0%)` };` : `` }
						}
						100% { 
							${ imageTransition === "fade" ? `${ imageLoop ? `opacity: 0` : `opacity: 1` };` : `` }
							${ imageTransition === "slideright" ? `${ imageLoop ? `transform: translateX(100%)` : `transform: translateX(0%)` };` : `` }
							${ imageTransition === "slideleft" ? `${ imageLoop ? `transform: translateX(-100%)` : `transform: translateX(0%)` };` : `` }
							${ imageTransition === "slideup" ? `${ imageLoop ? `transform: translateY(-100%)` : `transform: translateY(0%)` };` : `` }
							${ imageTransition === "slidedown" ? `${ imageLoop ? `transform: translateY(100%)` : `transform: translateY(0%)` };` : `` }
						}
					}` : `${
						images.map(function(item, index){
							return ` .block-id-${id} .grigora-group-slideshow li:nth-child(${index+1}) span { 
								background-position: ${imageFocus.x*100}% ${imageFocus.y*100}%;
								background-image: url(${item.url});
								background-attachment: ${ backgroundFixed ? 'fixed': '' };
							} `;
						}).join(' ')
					}` }
					` : ``}
					
					`}
				</style>
				{backgroundNMode === "color" && (
					<div class="background-color">
					</div>
				)}
				{backgroundNMode === "gradient" && (
					<div class="background-color">
					</div>
				)}
				{backgroundNMode === "images" && (
					<ul class="grigora-group-slideshow">
						{
							images.map(function(item){
								return <li><span></span></li>
							})
						}
					</ul>
				)}
				{backgroundNMode === "video" && (
					<video ref={videoRef} autoPlay loop={videoLoop ? true : undefined} preload={videoPreload}>
						<source src={videoLink} type="video/mp4" />
					</video>
				)}
				{backgroundHMode && (
					<div class="background-hover-color">
					</div>
				)}
				{backgroundOMode && (
					<div class="background-overlay">
					</div>
				)}
				<InnerBlocks renderAppender={hasInnerBlocks ? undefined: InnerBlocks.ButtonBlockAppender} />
		</div>
	);
}

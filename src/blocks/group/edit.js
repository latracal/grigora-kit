import classnames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { __, _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
	InnerBlocks,
	useInnerBlocksProps,
	useBlockProps,
	BlockVerticalAlignmentToolbar,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentControl,
	MediaUpload,
	useSetting,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	TabPanel as WPTabPanel,
	PanelBody,
	Button,
	ToggleControl,
	FocalPointPicker,
	Tooltip,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
	Toolbar,
	ToolbarButton,
} from '@wordpress/components';
import { useRef, useEffect } from '@wordpress/element';
import {
	alignLeft,
	alignRight,
	alignCenter,
	formatIndent,
	formatIndentRTL,
	alignJustify,
	link,
	linkOff,
	group,
	code,
} from '@wordpress/icons';

import {
	HOVER_ANIMATIONS,
	ENTRANCE_ANIMATIONS,
	ICON_POSITIONS,
	TEXT_TRANSFORMS,
	TEXT_STYLE,
	TEXT_DECORATION,
	FONT_WEIGHTS,
} from '@constants';
import generateId from '@helpers/generateId';
import isEmpty from '@helpers/objEmpty';
import uniqueIDs from '@helpers/uniqueID';
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
import GrigoraAlignmentInput from '@components/alignment-input';
import GrigoraCSSFilterInput from '@components/cssfilter-input';
import GrigoraNumberInput from '@components/number-input';
import Notice from '@components/notice';

import InspectorTabs from '@components/inspector-tabs';
import { getDevice, getDeviceProperty } from '@helpers/previewDevice';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;

	const {
		id,
		align,
		groupAlign,
		verticalAlignment,
		layoutPadding,
		layoutPaddingTablet,
		layoutPaddingMobile,
		layoutMargin,
		layoutMarginTablet,
		layoutMarginMobile,
		layoutGap,
		layoutGapTablet,
		layoutGapMobile,
		overflow,
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
		structureMaxWidthTablet,
		structureMaxWidthMobile,
		structureMinHeight,
		structureMinHeightTablet,
		structureMinHeightMobile,
		effectNPerspective,
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
		effectHAnimation,
		effectHAnimationTime,
		transitionTime,
		effectHPerspective,
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
		textNColor,
		linkNColor,
		textHColor,
		linkHColor,
		entranceAnimation,
		entranceAnimationDelay,
		entranceAnimationTime,
	} = attributes;

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'group' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'group' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

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
		},
	];

	const CONTAINER_ALIGNMENT_CONTROLS = [
		{
			icon: formatIndent,
			title: __( 'Align group left' ),
			align: 'left',
		},
		{
			icon: code,
			title: __( 'Align group center' ),
			align: 'center',
		},
		{
			icon: formatIndentRTL,
			title: __( 'Align group right' ),
			align: 'right',
		},
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

	const device = getDevice();

	const videoRef = useRef();

	useEffect( () => {
		videoRef.current?.load();
	}, [ videoLink, videoLoop, videoPreload ] );

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-group-wrapper': true,
			[ `block-id-${ id }` ]: id,
			[ `animateOnce` ]: entranceAnimation != 'none',
			alignleft: structureMaxWidth && groupAlign === 'left',
			aligncenter: structureMaxWidth && groupAlign === 'center',
			alignright: structureMaxWidth && groupAlign === 'right',
		} ),
		style: {},
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: classnames( {
				'grigora-kit-group-inner': true,
			} ),
		},
		{
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	function renderImages() {
		return (
			<>
				<div class="grigora-gallery-picker-editor">
					{ images.map( function ( item ) {
						return <img src={ item.url } />;
					} ) }
				</div>
			</>
		);
	}

	function addNew( image ) {
		setAttributes( {
			images: image.map( ( e ) => {
				return { id: e.id, url: e.url };
			} ),
		} );
	}

	function backgroundNormal() {
		return (
			<>
				<GrigoraRadioInput
					label=""
					onChange={ ( backgroundNMode ) =>
						setAttributes( { backgroundNMode } )
					}
					value={ backgroundNMode }
					radios={ [
						{
							value: 'color',
							text: __( 'Color', 'grigora-kit' ),
						},
						{
							value: 'gradient',
							text: __( 'Gradient', 'grigora-kit' ),
						},
						{
							value: 'images',
							text: __( 'Images', 'grigora-kit' ),
						},
						{
							value: 'video',
							text: __( 'Video', 'grigora-kit' ),
						},
					] }
				/>
				{ backgroundNMode === 'color' && (
					<GrigoraColorInput
						label={ __( 'Color', 'grigora-kit' ) }
						value={ backgroundNColor }
						onChange={ ( backgroundNColor ) =>
							setAttributes( { backgroundNColor } )
						}
						resetValue={ '' }
					/>
				) }
				{ backgroundNMode === 'gradient' && (
					<>
						<GrigoraGradientInput
							label=""
							value={ backgroundNGradient }
							onChange={ ( backgroundNGradient ) =>
								setAttributes( { backgroundNGradient } )
							}
							resetValue={
								'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)'
							}
						/>
						<GrigoraToggleInput
							label={ __( 'Fixed', 'grigora-kit' ) }
							onChange={ ( backgroundFixed ) =>
								setAttributes( { backgroundFixed } )
							}
							value={ backgroundFixed }
							resetValue={ false }
						/>
					</>
				) }
				{ backgroundNMode === 'images' && (
					<div className="grigora-media-select">
						{ images.length > 0 && (
							<>
								<br></br>
								{ renderImages() }
							</>
						) }
						<br></br>
						<MediaUpload
							onSelect={ addNew }
							allowedTypes={ [ 'image' ] }
							multiple
							gallery
							value={ images.map( ( e ) => {
								return e.id;
							} ) }
							render={ ( { open } ) => (
								<Button variant="primary" onClick={ open }>
									{ __( 'Select Images', 'grigora-kit' ) }
								</Button>
							) }
						/>
						{ images.length > 0 && (
							<>
								<br></br>
								<FocalPointPicker
									className="grigora-focalpoint-picker-h1ma"
									url={ images[ 0 ].url }
									value={ imageFocus }
									onChange={ ( imageFocus ) =>
										setAttributes( { imageFocus } )
									}
								/>
								<GrigoraToggleInput
									label={ __( 'Fixed', 'grigora-kit' ) }
									onChange={ ( backgroundFixed ) =>
										setAttributes( { backgroundFixed } )
									}
									value={ backgroundFixed }
									resetValue={ false }
								/>
							</>
						) }
						{ images.length > 1 && (
							<>
								<GrigoraToggleInput
									label={ __( 'Loop', 'grigora-kit' ) }
									onChange={ ( imageLoop ) =>
										setAttributes( { imageLoop } )
									}
									value={ imageLoop }
									resetValue={ true }
								/>
								<GrigoraRangeInput
									label={ __(
										'Single Image Duration',
										'grigora-kit'
									) }
									max={ 20 }
									min={ 0.5 }
									step={ 0.1 }
									unit={ 'sec' }
									setValue={ ( imageDuration ) => {
										if (
											imageDuration <
											imageTransitionDuration
										) {
											setAttributes( {
												imageDuration: imageDuration,
												imageTransitionDuration:
													imageDuration,
											} );
										} else {
											setAttributes( { imageDuration } );
										}
									} }
									value={ imageDuration }
									resetValue={ 5 }
								/>
								<GrigoraSelectInput
									label={ __( 'Transition ', 'grigora-kit' ) }
									labelPosition="side"
									onChange={ ( imageTransition ) =>
										setAttributes( { imageTransition } )
									}
									value={ imageTransition }
									options={ [
										{
											label: 'Fade',
											value: 'fade',
										},
										{
											label: 'Slide Right',
											value: 'slideright',
										},
										{
											label: 'Slide Left',
											value: 'slideleft',
										},
										{
											label: 'Slide Up',
											value: 'slideup',
										},
										{
											label: 'Slide Down',
											value: 'slidedown',
										},
									] }
									resetValue={ 'fade' }
								/>
								{ ( imageTransitionDuration * 100 ) /
									( images.length * imageDuration ) <
									0.5 && (
									<Notice
										text={ __(
											'Very low transition duration detected compared to total time. Either increase the transition duration, reduce number of images or reduce the single image time.',
											'grigora-kit'
										) }
										status={ 'warning' }
									/>
								) }
								<GrigoraRangeInput
									label={ __(
										'Transition Duration',
										'grigora-kit'
									) }
									max={ imageDuration }
									min={ 0.1 }
									step={ 0.1 }
									unit={ 'sec' }
									setValue={ ( imageTransitionDuration ) =>
										setAttributes( {
											imageTransitionDuration,
										} )
									}
									value={ imageTransitionDuration }
									resetValue={ 0.5 }
								/>
							</>
						) }
					</div>
				) }
				{ backgroundNMode === 'video' && (
					<>
						<br></br>
						<GrigoraTextInput
							label={ __( 'Video Link (mp4)', 'grigora-kit' ) }
							onChange={ ( videoLink ) =>
								setAttributes( { videoLink } )
							}
							value={ videoLink }
							resetValue={ '' }
						/>
						<div className="grigora-media-select">
							<MediaUpload
								onSelect={ ( video ) => {
									setAttributes( { videoLink: video.url } );
									setAttributes( { videoLinkID: video.id } );
								} }
								allowedTypes="video"
								value={ videoLink }
								render={ ( { open } ) => (
									<Button variant="primary" onClick={ open }>
										{ __(
											'Select from Gallery',
											'grigora-kit'
										) }
									</Button>
								) }
							/>
						</div>
						<GrigoraToggleInput
							label={ __( 'Loop', 'grigora-kit' ) }
							onChange={ ( videoLoop ) =>
								setAttributes( { videoLoop } )
							}
							value={ videoLoop }
							resetValue={ true }
						/>
						{ /* <GrigoraToggleInput
							label={ __( 'Muted', "grigora-kit" ) }
							onChange={ videoMuted => setAttributes( { videoMuted } ) }
							value={videoMuted}
							resetValue={ true }
						/> */ }
						<GrigoraSelectInput
							label={ __( 'Preload ', 'grigora-kit' ) }
							labelPosition="side"
							onChange={ ( videoPreload ) =>
								setAttributes( { videoPreload } )
							}
							value={ videoPreload }
							options={ [
								{
									label: 'Auto',
									value: 'auto',
								},
								{
									label: 'Metadata',
									value: 'metadata',
								},
								{
									label: 'None',
									value: 'none',
								},
							] }
							resetValue={ 'auto' }
						/>
					</>
				) }
			</>
		);
	}

	function backgroundHover() {
		return (
			<>
				<GrigoraRadioInput
					label=""
					onChange={ ( backgroundHMode ) =>
						setAttributes( { backgroundHMode } )
					}
					value={ backgroundHMode }
					radios={ [
						{
							value: 'color',
							text: __( 'Color', 'grigora-kit' ),
						},
						{
							value: 'gradient',
							text: __( 'Gradient', 'grigora-kit' ),
						},
						{
							value: 'image',
							text: __( 'Image', 'grigora-kit' ),
						},
					] }
				/>
				{ backgroundHMode === 'color' && (
					<>
						<GrigoraColorInput
							label={ __( 'Color', 'grigora-kit' ) }
							value={ backgroundHColor }
							onChange={ ( backgroundHColor ) =>
								setAttributes( { backgroundHColor } )
							}
							resetValue={ '' }
						/>
						<GrigoraRangeInput
							label={ __( 'Transition Time', 'grigora-kit' ) }
							max={ 5 }
							min={ 0.1 }
							step={ 0.1 }
							unit={ 'sec' }
							setValue={ ( backgroundHTransitionTime ) =>
								setAttributes( { backgroundHTransitionTime } )
							}
							value={ backgroundHTransitionTime }
							resetValue={ 1 }
						/>
					</>
				) }
				{ backgroundHMode === 'gradient' && (
					<>
						<GrigoraGradientInput
							label=""
							value={ backgroundHGradient }
							onChange={ ( backgroundHGradient ) =>
								setAttributes( { backgroundHGradient } )
							}
							resetValue={
								'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)'
							}
						/>
						<GrigoraToggleInput
							label={ __( 'Fixed', 'grigora-kit' ) }
							onChange={ ( backgroundFixed ) =>
								setAttributes( { backgroundFixed } )
							}
							value={ backgroundFixed }
							resetValue={ false }
						/>
						<GrigoraRangeInput
							label={ __( 'Transition Time', 'grigora-kit' ) }
							max={ 5 }
							min={ 0.1 }
							step={ 0.1 }
							unit={ 'sec' }
							setValue={ ( backgroundHTransitionTime ) =>
								setAttributes( { backgroundHTransitionTime } )
							}
							value={ backgroundHTransitionTime }
							resetValue={ 1 }
						/>
					</>
				) }
				{ backgroundHMode === 'image' && (
					<div className="grigora-media-select">
						<br></br>
						<MediaUpload
							onSelect={ ( imageH ) =>
								setAttributes( {
									imageH: {
										id: imageH.id,
										url: imageH.url,
									},
								} )
							}
							allowedTypes={ [ 'image' ] }
							value={ imageH.id }
							render={ ( { open } ) => (
								<Button variant="primary" onClick={ open }>
									{ __( 'Select Image', 'grigora-kit' ) }
								</Button>
							) }
						/>
						{ imageH.url && (
							<>
								<br></br>
								<FocalPointPicker
									className="grigora-focalpoint-picker-h1ma"
									url={ imageH.url }
									value={ imageHFocus }
									onChange={ ( imageHFocus ) =>
										setAttributes( { imageHFocus } )
									}
								/>
								<GrigoraToggleInput
									label={ __( 'Fixed', 'grigora-kit' ) }
									onChange={ ( backgroundFixed ) =>
										setAttributes( { backgroundFixed } )
									}
									value={ backgroundFixed }
									resetValue={ false }
								/>
							</>
						) }
						<GrigoraRangeInput
							label={ __( 'Transition Time', 'grigora-kit' ) }
							max={ 5 }
							min={ 0.1 }
							step={ 0.1 }
							unit={ 'sec' }
							setValue={ ( backgroundHTransitionTime ) =>
								setAttributes( { backgroundHTransitionTime } )
							}
							value={ backgroundHTransitionTime }
							resetValue={ 1 }
						/>
					</div>
				) }
			</>
		);
	}

	function backgroundOverlayNormal() {
		return (
			<>
				<GrigoraRadioInput
					label=""
					onChange={ ( backgroundOMode ) =>
						setAttributes( { backgroundOMode } )
					}
					value={ backgroundOMode }
					radios={ [
						{
							value: 'color',
							text: __( 'Color', 'grigora-kit' ),
						},
						{
							value: 'gradient',
							text: __( 'Gradient', 'grigora-kit' ),
						},
						{
							value: 'image',
							text: __( 'Image', 'grigora-kit' ),
						},
					] }
				/>
				{ backgroundOMode === 'color' && (
					<>
						<GrigoraColorInput
							label={ __( 'Color', 'grigora-kit' ) }
							value={ backgroundOColor }
							onChange={ ( backgroundOColor ) =>
								setAttributes( { backgroundOColor } )
							}
							resetValue={ '#ffffff' }
						/>
						<GrigoraCSSFilterInput
							value={ backgroundOCSS }
							setValue={ ( backgroundOCSS ) =>
								setAttributes( { backgroundOCSS } )
							}
							label={ __( 'CSS Filters', 'grigora-kit' ) }
							reset={ {} }
						/>
						<br></br>
						<GrigoraRangeInput
							label={ __( 'Opacity', 'grigora-kit' ) }
							max={ 1 }
							min={ 0 }
							step={ 0.05 }
							unit={ '' }
							setValue={ ( backgroundOOpacity ) =>
								setAttributes( { backgroundOOpacity } )
							}
							value={ backgroundOOpacity }
							resetValue={ 0.5 }
						/>
					</>
				) }
				{ backgroundOMode === 'gradient' && (
					<>
						<GrigoraGradientInput
							label=""
							value={ backgroundOGradient }
							onChange={ ( backgroundOGradient ) =>
								setAttributes( { backgroundOGradient } )
							}
							resetValue={
								'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)'
							}
						/>
						<GrigoraCSSFilterInput
							value={ backgroundOCSS }
							setValue={ ( backgroundOCSS ) =>
								setAttributes( { backgroundOCSS } )
							}
							label={ __( 'CSS Filters', 'grigora-kit' ) }
							reset={ {} }
						/>
						<br></br>
						<GrigoraToggleInput
							label={ __( 'Fixed', 'grigora-kit' ) }
							onChange={ ( backgroundOFixed ) =>
								setAttributes( { backgroundOFixed } )
							}
							value={ backgroundOFixed }
							resetValue={ false }
						/>
						<GrigoraRangeInput
							label={ __( 'Opacity', 'grigora-kit' ) }
							max={ 1 }
							min={ 0 }
							step={ 0.05 }
							unit={ '' }
							setValue={ ( backgroundOOpacity ) =>
								setAttributes( { backgroundOOpacity } )
							}
							value={ backgroundOOpacity }
							resetValue={ 0.5 }
						/>
					</>
				) }
				{ backgroundOMode === 'image' && (
					<div className="grigora-media-select">
						<br></br>
						<MediaUpload
							onSelect={ ( imageO ) =>
								setAttributes( {
									imageO: {
										id: imageO.id,
										url: imageO.url,
									},
								} )
							}
							allowedTypes={ [ 'image' ] }
							value={ imageO.id }
							render={ ( { open } ) => (
								<Button variant="primary" onClick={ open }>
									{ __( 'Select Image', 'grigora-kit' ) }
								</Button>
							) }
						/>
						<GrigoraCSSFilterInput
							value={ backgroundOCSS }
							setValue={ ( backgroundOCSS ) =>
								setAttributes( { backgroundOCSS } )
							}
							label={ __( 'CSS Filters', 'grigora-kit' ) }
							reset={ {} }
						/>
						<GrigoraToggleInput
							label={ __( 'Fixed', 'grigora-kit' ) }
							onChange={ ( backgroundOFixed ) =>
								setAttributes( { backgroundOFixed } )
							}
							value={ backgroundOFixed }
							resetValue={ false }
						/>
						<br></br>
						<GrigoraRangeInput
							label={ __( 'Opacity', 'grigora-kit' ) }
							max={ 1 }
							min={ 0 }
							step={ 0.05 }
							unit={ '' }
							setValue={ ( backgroundOOpacity ) =>
								setAttributes( { backgroundOOpacity } )
							}
							value={ backgroundOOpacity }
							resetValue={ 0.5 }
						/>
					</div>
				) }
			</>
		);
	}

	function backgroundOverlayHover() {
		return (
			<>
				<GrigoraRadioInput
					label=""
					onChange={ ( backgroundOHMode ) =>
						setAttributes( { backgroundOHMode } )
					}
					value={ backgroundOHMode }
					radios={ [
						{
							value: 'color',
							text: __( 'Color', 'grigora-kit' ),
						},
						{
							value: 'gradient',
							text: __( 'Gradient', 'grigora-kit' ),
						},
						{
							value: 'image',
							text: __( 'Image', 'grigora-kit' ),
						},
					] }
				/>
				{ backgroundOHMode === 'color' && (
					<>
						<GrigoraColorInput
							label={ __( 'Color', 'grigora-kit' ) }
							value={ backgroundOHColor }
							onChange={ ( backgroundOHColor ) =>
								setAttributes( { backgroundOHColor } )
							}
							resetValue={ '#ffffff' }
						/>
						<GrigoraCSSFilterInput
							value={ backgroundOHCSS }
							setValue={ ( backgroundOHCSS ) =>
								setAttributes( { backgroundOHCSS } )
							}
							label={ __( 'CSS Filters', 'grigora-kit' ) }
							reset={ {} }
						/>
						<br></br>
						<GrigoraRangeInput
							label={ __( 'Opacity', 'grigora-kit' ) }
							max={ 1 }
							min={ 0 }
							step={ 0.05 }
							unit={ '' }
							setValue={ ( backgroundOHOpacity ) =>
								setAttributes( { backgroundOHOpacity } )
							}
							value={ backgroundOHOpacity }
							resetValue={ 0.5 }
						/>
						<GrigoraRangeInput
							label={ __( 'Transition Time', 'grigora-kit' ) }
							max={ 5 }
							min={ 0.1 }
							step={ 0.1 }
							unit={ 'sec' }
							setValue={ ( backgroundOHTransitionTime ) =>
								setAttributes( { backgroundOHTransitionTime } )
							}
							value={ backgroundOHTransitionTime }
							resetValue={ 1 }
						/>
					</>
				) }
				{ backgroundOHMode === 'gradient' && (
					<>
						<GrigoraGradientInput
							label=""
							value={ backgroundOHGradient }
							onChange={ ( backgroundOHGradient ) =>
								setAttributes( { backgroundOHGradient } )
							}
							resetValue={
								'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)'
							}
						/>
						<GrigoraCSSFilterInput
							value={ backgroundOHCSS }
							setValue={ ( backgroundOHCSS ) =>
								setAttributes( { backgroundOHCSS } )
							}
							label={ __( 'CSS Filters', 'grigora-kit' ) }
							reset={ {} }
						/>
						<br></br>
						<GrigoraRangeInput
							label={ __( 'Opacity', 'grigora-kit' ) }
							max={ 1 }
							min={ 0 }
							step={ 0.05 }
							unit={ '' }
							setValue={ ( backgroundOHOpacity ) =>
								setAttributes( { backgroundOHOpacity } )
							}
							value={ backgroundOHOpacity }
							resetValue={ 0.5 }
						/>
						<GrigoraToggleInput
							label={ __( 'Fixed', 'grigora-kit' ) }
							onChange={ ( backgroundOFixed ) =>
								setAttributes( { backgroundOFixed } )
							}
							value={ backgroundOFixed }
							resetValue={ false }
						/>
						<GrigoraRangeInput
							label={ __( 'Transition Time', 'grigora-kit' ) }
							max={ 5 }
							min={ 0.1 }
							step={ 0.1 }
							unit={ 'sec' }
							setValue={ ( backgroundOHTransitionTime ) =>
								setAttributes( { backgroundOHTransitionTime } )
							}
							value={ backgroundOHTransitionTime }
							resetValue={ 1 }
						/>
					</>
				) }
				{ backgroundOHMode === 'image' && (
					<div className="grigora-media-select">
						<br></br>
						<MediaUpload
							onSelect={ ( imageOH ) =>
								setAttributes( {
									imageOH: {
										id: imageOH.id,
										url: imageOH.url,
									},
								} )
							}
							allowedTypes={ [ 'image' ] }
							value={ imageOH.id }
							render={ ( { open } ) => (
								<Button variant="primary" onClick={ open }>
									{ __( 'Select Image', 'grigora-kit' ) }
								</Button>
							) }
						/>
						<GrigoraCSSFilterInput
							value={ backgroundOHCSS }
							setValue={ ( backgroundOHCSS ) =>
								setAttributes( { backgroundOHCSS } )
							}
							label={ __( 'CSS Filters', 'grigora-kit' ) }
							reset={ {} }
						/>
						<GrigoraToggleInput
							label={ __( 'Fixed', 'grigora-kit' ) }
							onChange={ ( backgroundOFixed ) =>
								setAttributes( { backgroundOFixed } )
							}
							value={ backgroundOFixed }
							resetValue={ false }
						/>
						<GrigoraRangeInput
							label={ __( 'Opacity', 'grigora-kit' ) }
							max={ 1 }
							min={ 0 }
							step={ 0.05 }
							unit={ '' }
							setValue={ ( backgroundOHOpacity ) =>
								setAttributes( { backgroundOHOpacity } )
							}
							value={ backgroundOHOpacity }
							resetValue={ 0.5 }
						/>
						<GrigoraRangeInput
							label={ __( 'Transition Time', 'grigora-kit' ) }
							max={ 5 }
							min={ 0.1 }
							step={ 0.1 }
							unit={ 'sec' }
							setValue={ ( backgroundOHTransitionTime ) =>
								setAttributes( { backgroundOHTransitionTime } )
							}
							value={ backgroundOHTransitionTime }
							resetValue={ 1 }
						/>
					</div>
				) }
			</>
		);
	}

	function textColorNormal() {
		return (
			<>
				<GrigoraColorInput
					label={ __( 'Text Color', 'grigora-kit' ) }
					value={ textNColor }
					onChange={ ( textNColor ) =>
						setAttributes( { textNColor } )
					}
					resetValue={ '' }
				/>
				<GrigoraColorInput
					label={ __( 'Link Color', 'grigora-kit' ) }
					value={ linkNColor }
					onChange={ ( linkNColor ) =>
						setAttributes( { linkNColor } )
					}
					resetValue={ '' }
				/>
			</>
		);
	}

	function textColorHover() {
		return (
			<>
				<GrigoraColorInput
					label={ __( 'Text Color', 'grigora-kit' ) }
					value={ textHColor }
					onChange={ ( textHColor ) =>
						setAttributes( { textHColor } )
					}
					resetValue={ '' }
				/>
				<GrigoraColorInput
					label={ __( 'Link Color', 'grigora-kit' ) }
					value={ linkHColor }
					onChange={ ( linkHColor ) =>
						setAttributes( { linkHColor } )
					}
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
					resetValue={ 1 }
				/>
			</>
		);
	}

	function generalSettings() {
		return (
			<>
				<Spacer marginBottom={ 0 } paddingX={ 4 } paddingY={ 3 }>
					<GrigoraSelectInput
						label={ __( 'Container Tag ', 'grigora-kit' ) }
						labelPosition="side"
						onChange={ ( structureTag ) =>
							setAttributes( { structureTag } )
						}
						value={ structureTag }
						options={ [
							'div',
							'main',
							'header',
							'aside',
							'footer',
							'section',
							'article',
						].map( function ( item ) {
							return {
								label: item,
								value: item,
							};
						} ) }
						resetValue={ 'div' }
					/>
					<GrigoraUnitInput
						label={ __( 'Maximum Width', 'grigora-kit' ) }
						onChange={ ( structureMaxWidth ) =>
							setAttributes( { structureMaxWidth } )
						}
						value={ structureMaxWidth }
						resetValue={ '' }
						isResponsive
						valueTablet={ structureMaxWidthTablet }
						onChangeTablet={ ( structureMaxWidthTablet ) => {
							setAttributes( { structureMaxWidthTablet } );
						} }
						resetValueTablet=""
						valueMobile={ structureMaxWidthMobile }
						onChangeMobile={ ( structureMaxWidthMobile ) => {
							setAttributes( { structureMaxWidthMobile } );
						} }
						resetValueMobile=""
					/>
					{ structureMaxWidth && (
						<>
							<br></br>
							<p className="group-alignment-toolbar-label">
								{ __( 'Group Alignment', 'grigora-kit' ) }
							</p>
							<Toolbar
								label={ __( 'Group Alignment', 'grigora-kit' ) }
								className="group-alignment-toolbar"
							>
								<ToolbarButton
									isActive={ groupAlign === 'left' }
									onClick={ () => {
										if ( groupAlign === 'left' ) {
											setAttributes( { groupAlign: '' } );
										} else {
											setAttributes( {
												groupAlign: 'left',
											} );
										}
									} }
									className="inner-btn"
								>
									{ __( 'Left', 'grigora-kit' ) }
								</ToolbarButton>
								<ToolbarButton
									isActive={ groupAlign === 'center' }
									onClick={ () => {
										if ( groupAlign === 'center' ) {
											setAttributes( { groupAlign: '' } );
										} else {
											setAttributes( {
												groupAlign: 'center',
											} );
										}
									} }
									className="inner-btn"
								>
									{ __( 'Center', 'grigora-kit' ) }
								</ToolbarButton>
								<ToolbarButton
									isActive={ groupAlign === 'right' }
									onClick={ () => {
										if ( groupAlign === 'right' ) {
											setAttributes( { groupAlign: '' } );
										} else {
											setAttributes( {
												groupAlign: 'right',
											} );
										}
									} }
									className="inner-btn"
								>
									{ __( 'Right', 'grigora-kit' ) }
								</ToolbarButton>
							</Toolbar>
						</>
					) }
					<GrigoraUnitInput
						label={ __( 'Minimum Height', 'grigora-kit' ) }
						onChange={ ( structureMinHeight ) =>
							setAttributes( { structureMinHeight } )
						}
						value={ structureMinHeight }
						resetValue={ '' }
						isResponsive
						valueTablet={ structureMinHeightTablet }
						onChangeTablet={ ( structureMinHeightTablet ) => {
							setAttributes( { structureMinHeightTablet } );
						} }
						resetValueTablet=""
						valueMobile={ structureMinHeightMobile }
						onChangeMobile={ ( structureMinHeightMobile ) => {
							setAttributes( { structureMinHeightMobile } );
						} }
						resetValueMobile=""
					/>
					<GrigoraUnitInput
						label={ __( 'Block Gap', 'grigora-kit' ) }
						onChange={ ( layoutGap ) =>
							setAttributes( { layoutGap } )
						}
						value={ layoutGap }
						resetValue={ '' }
						isResponsive
						valueTablet={ layoutGapTablet }
						onChangeTablet={ ( layoutGapTablet ) => {
							setAttributes( { layoutGapTablet } );
						} }
						resetValueTablet=""
						valueMobile={ layoutGapMobile }
						onChangeMobile={ ( layoutGapMobile ) => {
							setAttributes( { layoutGapMobile } );
						} }
						resetValueMobile=""
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
						isResponsive
						valueTablet={ layoutPaddingTablet }
						onChangeTablet={ ( layoutPaddingTablet ) => {
							setAttributes( { layoutPaddingTablet } );
						} }
						resetValueTablet={ {
							top: '',
							bottom: '',
							left: '',
							right: '',
						} }
						valueMobile={ layoutPaddingMobile }
						onChangeMobile={ ( layoutPaddingMobile ) => {
							setAttributes( { layoutPaddingMobile } );
						} }
						resetValueMobile={ {
							top: '',
							bottom: '',
							left: '',
							right: '',
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
						isResponsive
						valueTablet={ layoutMarginTablet }
						onChangeTablet={ ( layoutMarginTablet ) => {
							setAttributes( { layoutMarginTablet } );
						} }
						resetValueTablet={ {
							top: '',
							bottom: '',
							left: '',
							right: '',
						} }
						valueMobile={ layoutMarginMobile }
						onChangeMobile={ ( layoutMarginMobile ) => {
							setAttributes( { layoutMarginMobile } );
						} }
						resetValueMobile={ {
							top: '',
							bottom: '',
							left: '',
							right: '',
						} }
					/>
					<GrigoraSelectInput
						label={ __( 'Overflow', 'grigora-kit' ) }
						onChange={ ( overflow ) =>
							setAttributes( { overflow } )
						}
						value={ overflow }
						resetValue={ '' }
						options={ [
							{
								label: 'Default',
								value: '',
								disabled: true,
							},
							{
								label: 'Visible',
								value: 'visible',
							},
							{
								label: 'Hidden',
								value: 'hidden',
							},
							{
								label: 'Scroll',
								value: 'scroll',
							},
						] }
					/>
				</Spacer>
			</>
		);
	}

	function stylesSettings() {
		return (
			<>
				<PanelBody
					title={ __( 'Text Color', 'grigora-kit' ) }
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
							<>{ textColorNormal() }</>
						</TabPanel>
						<TabPanel>
							<>{ textColorHover() }</>
						</TabPanel>
					</Tabs>
				</PanelBody>
				<PanelBody
					title={ __( 'Background', 'grigora-kit' ) }
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
							<>{ backgroundNormal() }</>
						</TabPanel>
						<TabPanel>
							<>{ backgroundHover() }</>
						</TabPanel>
					</Tabs>
				</PanelBody>
				<PanelBody
					title={ __( 'Background Overlay', 'grigora-kit' ) }
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
							<>{ backgroundOverlayNormal() }</>
						</TabPanel>
						<TabPanel>
							<>{ backgroundOverlayHover() }</>
						</TabPanel>
					</Tabs>
				</PanelBody>
			</>
		);
	}

	function advancedSettings() {
		return (
			<>
				<PanelBody
					title={ __( 'Hover Animations', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraSelectInput
						label={ __( 'Attention Seekers: ', 'grigora-kit' ) }
						labelPosition="side"
						onChange={ ( effectHAnimation ) =>
							setAttributes( { effectHAnimation } )
						}
						value={ effectHAnimation }
						options={ HOVER_ANIMATIONS }
						resetValue={ 'none' }
					/>
					<GrigoraRangeInput
						label={ __( 'Transition Time', 'grigora-kit' ) }
						max={ 5 }
						min={ 0.1 }
						step={ 0.1 }
						unit={ 'sec' }
						setValue={ ( effectHAnimationTime ) =>
							setAttributes( { effectHAnimationTime } )
						}
						value={ effectHAnimationTime }
						resetValue={ 1 }
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
					title={ __( 'Border', 'grigora-kit' ) }
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
							<>
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
											style: 'solid',
											width: '0px',
										},
										bottom: {
											color: '#72aee6',
											style: 'solid',
											width: '0px',
										},
										right: {
											color: '#72aee6',
											style: 'solid',
											width: '0px',
										},
										left: {
											color: '#72aee6',
											style: 'solid',
											width: '0px',
										},
									} }
								/>
								<br></br>
								<Notice
									text={ __(
										'It would be best if you used General > Overflow > Hidden setting to apply Border Radius to Background and Overlay. You can skip this if you only want a border radius to elements inside the group.',
										'grigora-kit'
									) }
									status={ 'success' }
								/>
								<GrigoraBorderRadiusInput
									label={ __( 'Radius', 'grigora-kit' ) }
									onChange={ ( effectNBorderRadius ) => {
										if (
											typeof effectNBorderRadius ===
												'string' ||
											effectNBorderRadius instanceof
												String
										) {
											setAttributes( {
												effectNBorderRadius: {
													topLeft:
														effectNBorderRadius,
													topRight:
														effectNBorderRadius,
													bottomLeft:
														effectNBorderRadius,
													bottomRight:
														effectNBorderRadius,
												},
											} );
										} else {
											setAttributes( {
												effectNBorderRadius,
											} );
										}
									} }
									values={ effectNBorderRadius }
									resetValue={ {
										topLeft: '0px',
										topRight: '0px',
										bottomLeft: '0px',
										bottomRight: '0px',
									} }
								/>
							</>
						</TabPanel>
						<TabPanel>
							<>
								<GrigoraBorderBoxInput
									label={ __( 'Width', 'grigora-kit' ) }
									onChange={ ( effectHBorder ) => {
										if ( ! effectHBorder.top ) {
											setAttributes( {
												effectHBorder: {
													top: effectHBorder,
													bottom: effectHBorder,
													right: effectHBorder,
													left: effectHBorder,
												},
											} );
										} else {
											setAttributes( { effectHBorder } );
										}
									} }
									value={ effectHBorder }
									resetValue={ {
										top: {
											color: '#72aee6',
											style: 'solid',
											width: 'undefined',
										},
										bottom: {
											color: '#72aee6',
											style: 'solid',
											width: 'undefined',
										},
										right: {
											color: '#72aee6',
											style: 'solid',
											width: 'undefined',
										},
										left: {
											color: '#72aee6',
											style: 'solid',
											width: 'undefined',
										},
									} }
								/>
								<br></br>
								<Notice
									text={ __(
										'It would be best if you used General > Overflow > Hidden setting to apply Border Radius to Background and Overlay. You can skip this if you only want a border radius to elements inside the group.',
										'grigora-kit'
									) }
									status={ 'success' }
								/>
								<GrigoraBorderRadiusInput
									label={ __( 'Radius', 'grigora-kit' ) }
									onChange={ ( effectHBorderRadius ) => {
										if (
											typeof effectHBorderRadius ===
												'string' ||
											effectHBorderRadius instanceof
												String
										) {
											setAttributes( {
												effectHBorderRadius: {
													topLeft:
														effectHBorderRadius,
													topRight:
														effectHBorderRadius,
													bottomLeft:
														effectHBorderRadius,
													bottomRight:
														effectHBorderRadius,
												},
											} );
										} else {
											setAttributes( {
												effectHBorderRadius,
											} );
										}
									} }
									values={ effectHBorderRadius }
									resetValue={ {
										topLeft: '',
										topRight: '',
										bottomLeft: '',
										bottomRight: '',
									} }
								/>
								<GrigoraRangeInput
									label={ __(
										'Transition Time',
										'grigora-kit'
									) }
									max={ 5 }
									min={ 0.1 }
									step={ 0.1 }
									unit={ 'sec' }
									setValue={ ( transitionTime ) =>
										setAttributes( { transitionTime } )
									}
									value={ transitionTime }
									resetValue={ 1 }
								/>
							</>
						</TabPanel>
					</Tabs>
				</PanelBody>
				<PanelBody
					title={ __( 'Box Shadow', 'grigora-kit' ) }
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
							<>
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
										label={ __(
											'Horizontal',
											'grigora-kit'
										) }
										value={ effectNShadowHO }
										onChange={ ( effectNShadowHO ) =>
											setAttributes( { effectNShadowHO } )
										}
										resetValue={ '0px' }
									/>
									<GrigoraUnitInput
										label={ __(
											'Vertical',
											'grigora-kit'
										) }
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
											setAttributes( {
												effectNShadowBlur,
											} )
										}
										resetValue={ '0px' }
									/>
									<GrigoraUnitInput
										label={ __( 'Spread', 'grigora-kit' ) }
										value={ effectNShadowSpread }
										onChange={ ( effectNShadowSpread ) =>
											setAttributes( {
												effectNShadowSpread,
											} )
										}
										resetValue={ '0px' }
									/>
								</HStack>
							</>
						</TabPanel>
						<TabPanel>
							<>
								<GrigoraColorInput
									label={ __( 'Color', 'grigora-kit' ) }
									clearable={ false }
									value={ effectHShadowColor }
									onChange={ ( effectHShadowColor ) =>
										setAttributes( { effectHShadowColor } )
									}
									resetValue={ '#000' }
								/>
								<HStack spacing={ 2 }>
									<GrigoraUnitInput
										label={ __(
											'Horizontal',
											'grigora-kit'
										) }
										value={ effectHShadowHO }
										onChange={ ( effectHShadowHO ) =>
											setAttributes( { effectHShadowHO } )
										}
										resetValue={ '' }
									/>
									<GrigoraUnitInput
										label={ __(
											'Vertical',
											'grigora-kit'
										) }
										value={ effectHShadowVO }
										onChange={ ( effectHShadowVO ) =>
											setAttributes( { effectHShadowVO } )
										}
										resetValue={ '' }
									/>
								</HStack>
								<HStack spacing={ 2 }>
									<GrigoraUnitInput
										label={ __( 'Blur', 'grigora-kit' ) }
										value={ effectHShadowBlur }
										onChange={ ( effectHShadowBlur ) =>
											setAttributes( {
												effectHShadowBlur,
											} )
										}
										resetValue={ '' }
									/>
									<GrigoraUnitInput
										label={ __( 'Spread', 'grigora-kit' ) }
										value={ effectHShadowSpread }
										onChange={ ( effectHShadowSpread ) =>
											setAttributes( {
												effectHShadowSpread,
											} )
										}
										resetValue={ '' }
									/>
								</HStack>
								<GrigoraRangeInput
									label={ __(
										'Transition Time',
										'grigora-kit'
									) }
									max={ 5 }
									min={ 0.1 }
									step={ 0.1 }
									unit={ 'sec' }
									setValue={ ( transitionTime ) =>
										setAttributes( { transitionTime } )
									}
									value={ transitionTime }
									resetValue={ 1 }
								/>
							</>
						</TabPanel>
					</Tabs>
				</PanelBody>
				<PanelBody
					title={ __( 'Transforms', 'grigora-kit' ) }
					initialOpen={ false }
				>
					{ ( backgroundFixed || backgroundOFixed ) && (
						<Notice
							text={ __(
								"Transforms won't work with fixed backgrounds. Please turn off the fixed background in Background/Overlay.",
								'grigora-kit'
							) }
							status={ 'warning' }
						/>
					) }
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
							<>
								<GrigoraUnitInput
									label={ __( 'Perspective', 'grigora-kit' ) }
									onChange={ ( effectNPerspective ) =>
										setAttributes( { effectNPerspective } )
									}
									value={ effectNPerspective }
									resetValue={ '' }
								/>
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
						</TabPanel>
						<TabPanel>
							<>
								<GrigoraUnitInput
									label="Perspective"
									onChange={ ( effectHPerspective ) =>
										setAttributes( { effectHPerspective } )
									}
									value={ effectHPerspective }
									resetValue={ '' }
								/>
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
									step={ 0.04 }
									unit={ 'x' }
									setValue={ ( effectHScale ) =>
										setAttributes( {
											effectHScale:
												effectHScale.toString(),
										} )
									}
									value={ effectHScale }
									resetValue={ '' }
								/>
								<GrigoraRangeInput
									label={ __(
										'Transition Time',
										'grigora-kit'
									) }
									max={ 5 }
									min={ 0.1 }
									step={ 0.1 }
									unit={ 'sec' }
									setValue={ ( transitionTime ) =>
										setAttributes( { transitionTime } )
									}
									value={ transitionTime }
									resetValue={ 1 }
								/>
							</>
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
				<BlockVerticalAlignmentToolbar
					onChange={ updateAlignment }
					value={ verticalAlignment }
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
					overflow: ${ overflow };
					padding-left: ${ getDeviceProperty(
						device,
						layoutPadding?.left,
						layoutPaddingTablet?.left,
						layoutPaddingMobile?.left
					) };
					padding-right: ${ getDeviceProperty(
						device,
						layoutPadding?.right,
						layoutPaddingTablet?.right,
						layoutPaddingMobile?.right
					) };
					padding-top: ${ getDeviceProperty(
						device,
						layoutPadding?.top,
						layoutPaddingTablet?.top,
						layoutPaddingMobile?.top
					) };
					padding-bottom: ${ getDeviceProperty(
						device,
						layoutPadding?.bottom,
						layoutPaddingTablet?.bottom,
						layoutPaddingMobile?.bottom
					) };
					margin-left: ${ getDeviceProperty(
						device,
						layoutMargin?.left,
						layoutMarginTablet?.left,
						layoutMarginMobile?.left
					) };
					margin-right: ${ getDeviceProperty(
						device,
						layoutMargin?.right,
						layoutMarginTablet?.right,
						layoutMarginMobile?.right
					) };
					margin-top: ${ getDeviceProperty(
						device,
						layoutMargin?.top,
						layoutMarginTablet?.top,
						layoutMarginMobile?.top
					) };
					margin-bottom: ${ getDeviceProperty(
						device,
						layoutMargin?.bottom,
						layoutMarginTablet?.bottom,
						layoutMarginMobile?.bottom
					) };
					${
						verticalAlignment
							? `justify-content: ${ align };`
							: `text-align: ${ align };`
					}
					${ textNColor ? `color: ${ textNColor };` : `` }
					${
						getDeviceProperty(
							device,
							structureMaxWidth,
							structureMaxWidthTablet,
							structureMaxWidthMobile
						)
							? `max-width: ${ getDeviceProperty(
									device,
									structureMaxWidth,
									structureMaxWidthTablet,
									structureMaxWidthMobile
							  ) } !important;`
							: ``
					}
					${
						getDeviceProperty(
							device,
							structureMinHeight,
							structureMinHeightTablet,
							structureMinHeightMobile
						)
							? `min-height: ${ getDeviceProperty(
									device,
									structureMinHeight,
									structureMinHeightTablet,
									structureMinHeightMobile
							  ) };`
							: ``
					}
					transition: ${ `${ transitionTime }s` };
					border-left: ${ effectNBorder?.left?.width } ${ effectNBorder?.left?.style } ${
					effectNBorder?.left?.color ? effectNBorder?.left?.color : ''
				};
					border-right: ${ effectNBorder?.right?.width } ${
					effectNBorder?.right?.style
				} ${
					effectNBorder?.right?.color
						? effectNBorder?.right?.color
						: ''
				};
					border-top: ${ effectNBorder?.top?.width } ${ effectNBorder?.top?.style } ${
					effectNBorder?.top?.color ? effectNBorder?.top?.color : ''
				};
					border-bottom: ${ effectNBorder?.bottom?.width } ${
					effectNBorder?.bottom?.style
				} ${
					effectNBorder?.bottom?.color
						? effectNBorder?.bottom?.color
						: ''
				};
					border-top-right-radius: ${ effectNBorderRadius?.topRight } !important;
					border-top-left-radius: ${ effectNBorderRadius?.topLeft } !important;
					border-bottom-right-radius: ${ effectNBorderRadius?.bottomRight } !important;
					border-bottom-left-radius: ${ effectNBorderRadius?.bottomLeft } !important;
					${
						backgroundFixed || backgroundOFixed
							? ``
							: `transform: ${
									effectNPerspective
										? `perspective(${ effectNPerspective })`
										: ``
							  } rotateX(${
									effectNRotateX ? effectNRotateX : '0deg'
							  }) rotateY(${
									effectNRotateY ? effectNRotateY : '0deg'
							  }) rotateZ(${
									effectNRotateZ ? effectNRotateZ : '0deg'
							  }) skewX(${
									effectNSkewX ? effectNSkewX : '0deg'
							  }) skewY(${
									effectNSkewY ? effectNSkewY : '0deg'
							  }) translateX(${ effectNOffsetX }) translateY(${ effectNOffsetY }) scale(${ effectNScale });`
					}
					${
						effectNShadowHO !== '0px' ||
						effectNShadowVO !== '0px' ||
						effectNShadowBlur !== '0px' ||
						effectNShadowSpread !== '0px' ||
						effectNShadowColor !== '#000'
							? `box-shadow: ${ effectNShadowHO } ${ effectNShadowVO } ${ effectNShadowBlur } ${ effectNShadowSpread } ${ effectNShadowColor };`
							: ``
					}
					}
					${ linkNColor ? `.block-id-${ id } a {color: ${ linkNColor };}` : `` }
					${ textHColor ? `.block-id-${ id }:hover {color: ${ textHColor };}` : `` }
					${ linkHColor ? `.block-id-${ id }:hover a {color: ${ linkHColor };}` : `` }
					.block-id-${ id }:hover {
						${
							effectHAnimation != 'none'
								? `animation: ${ effectHAnimation } ${ effectHAnimationTime }s;`
								: ``
						}
						border-left: ${ effectHBorder?.left?.width } ${ effectHBorder?.left?.style } ${
					effectHBorder?.left?.color ? effectHBorder?.left?.color : ''
				};
						border-right: ${ effectHBorder?.right?.width } ${
					effectHBorder?.right?.style
				} ${
					effectHBorder?.right?.color
						? effectHBorder?.right?.color
						: ''
				};
						border-top: ${ effectHBorder?.top?.width } ${ effectHBorder?.top?.style } ${
					effectHBorder?.top?.color ? effectHBorder?.top?.color : ''
				};
						border-bottom: ${ effectHBorder?.bottom?.width } ${
					effectHBorder?.bottom?.style
				} ${
					effectHBorder?.bottom?.color
						? effectHBorder?.bottom?.color
						: ''
				};
							  ${
									effectHBorderRadius?.topRight
										? `border-top-right-radius: ${ effectHBorderRadius?.topRight } !important`
										: ``
								};
							${
								effectHBorderRadius?.topLeft
									? `border-top-left-radius: ${ effectHBorderRadius?.topLeft } !important`
									: ``
							};
							${
								effectHBorderRadius?.bottomRight
									? `border-bottom-right-radius: ${ effectHBorderRadius?.bottomRight } !important`
									: ``
							};
							${
								effectHBorderRadius?.bottomLeft
									? `border-bottom-left-radius: ${ effectHBorderRadius?.bottomLeft } !important`
									: ``
							};
						${
							backgroundFixed || backgroundOFixed
								? ``
								: `
								${
									effectHPerspective ||
									effectHRotateX ||
									effectHRotateY ||
									effectHRotateZ ||
									effectHSkewX ||
									effectHSkewY ||
									effectHOffsetX ||
									effectHOffsetY ||
									effectHScale
										? `
								transform: ${
									effectHPerspective
										? `perspective(${ effectHPerspective })`
										: `${
												effectNPerspective
													? `perspective(${ effectNPerspective })`
													: ``
										  }`
								} rotateX(${
												effectHRotateX
													? effectHRotateX
													: effectNRotateX
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
								`
						};
						${
							effectHShadowHO ||
							effectHShadowVO ||
							effectHShadowBlur ||
							effectHShadowSpread
								? `box-shadow: ${
										effectHShadowHO
											? effectHShadowHO
											: effectNShadowHO
								  } ${
										effectHShadowVO
											? effectHShadowVO
											: effectNShadowVO
								  } ${
										effectHShadowBlur
											? effectHShadowBlur
											: effectNShadowBlur
								  } ${
										effectHShadowSpread
											? effectHShadowSpread
											: effectNShadowSpread
								  } ${ effectHShadowColor };`
								: ``
						}
					}
					${
						getDeviceProperty(
							device,
							layoutGap,
							layoutGapTablet,
							layoutGapMobile
						)
							? `
						.block-id-${ id } .grigora-kit-group-inner > * + * {
							margin-block-start: ${ getDeviceProperty(
								device,
								layoutGap,
								layoutGapTablet,
								layoutGapMobile
							) } !important;
						}
					`
							: ``
					}
					${
						verticalAlignment
							? `
						.block-id-${ id } {
							display: flex !important;
							${ verticalAlignment === 'top' ? `align-items: flex-start !important;` : `` }
							${ verticalAlignment === 'center' ? `align-items: center !important;` : `` }
							${ verticalAlignment === 'bottom' ? `align-items: flex-end !important;` : `` }
						}
					`
							: ``
					}
					${
						entranceAnimation != 'none'
							? `
					.block-id-${ id }.animateOnce {
						animation: ${ entranceAnimation } ${ entranceAnimationTime }s ${ entranceAnimationDelay }ms;
					}`
							: ``
					}
					${
						backgroundNMode === 'color'
							? `.block-id-${ id } > .background-color { 
							${ backgroundNColor ? `background-color: ${ backgroundNColor };` : `` }
						}`
							: ``
					}
					${
						backgroundHMode
							? `.block-id-${ id } > .background-hover-color { 
							transition: ${ backgroundHTransitionTime }s;
							opacity: 0;
							background-attachment: ${ backgroundFixed ? 'fixed' : '' };
							${
								backgroundHMode === 'color'
									? `${
											backgroundHColor
												? `background-color: ${ backgroundHColor }`
												: ``
									  };`
									: ``
							}
							${
								backgroundHMode === 'gradient'
									? `background-image: ${ backgroundHGradient };`
									: ``
							}
							${
								backgroundHMode === 'image'
									? `background-position: ${
											imageHFocus.x * 100
									  }% ${ imageHFocus.y * 100 }%;
								background-image: url(${ imageH.url });`
									: ``
							}
						}
						.block-id-${ id }:hover > .background-hover-color { 
							opacity: 1;
						}
						`
							: ``
					}
					.block-id-${ id } > .background-overlay { 
						transition: ${ backgroundOHTransitionTime }s;
					}
					${
						backgroundOMode
							? `.block-id-${ id } > .background-overlay { 
							opacity: ${ backgroundOOpacity };
							${
								backgroundOMode === 'color'
									? `background-color: ${ backgroundOColor };`
									: ``
							}
							${
								backgroundOMode === 'gradient'
									? `background-image: ${ backgroundOGradient };`
									: ``
							}
							${
								backgroundOMode === 'image'
									? `background-image: url(${ imageO.url });`
									: ``
							}
							${
								! isEmpty( backgroundOCSS )
									? `filter: blur(${ backgroundOCSS.blur }px) brightness(${ backgroundOCSS.brightness }%) contrast(${ backgroundOCSS.contrast }%) saturate(${ backgroundOCSS.saturation }%) hue-rotate(${ backgroundOCSS.hue }deg);`
									: ``
							}
							background-attachment: ${ backgroundOFixed ? 'fixed' : '' };
						}
						`
							: ``
					}
					${
						backgroundOHMode
							? `.block-id-${ id }:hover > .background-overlay { 
							opacity: ${ backgroundOHOpacity };
							${
								backgroundOHMode === 'color'
									? `background-color: ${ backgroundOHColor };`
									: ``
							}
							${
								backgroundOHMode === 'gradient'
									? `background-image: ${ backgroundOHGradient };`
									: ``
							}
							${
								backgroundOHMode === 'image'
									? `background-image: url(${ imageOH.url });`
									: ``
							}
							${
								! isEmpty( backgroundOHCSS )
									? `filter: blur(${ backgroundOHCSS.blur }px) brightness(${ backgroundOHCSS.brightness }%) contrast(${ backgroundOHCSS.contrast }%) saturate(${ backgroundOHCSS.saturation }%) hue-rotate(${ backgroundOHCSS.hue }deg)`
									: ``
							}
						}
						`
							: ``
					}
					${
						backgroundNMode === 'gradient'
							? `.block-id-${ id } > .background-color { 
							background-image: ${ backgroundNGradient };
							background-attachment: ${ backgroundFixed ? 'fixed' : '' };
						}`
							: ``
					}
					${
						backgroundNMode === 'images'
							? `
					${
						images.length > 1
							? `
					.block-id-${ id } > .grigora-group-slideshow li span { 
						background-attachment: ${ backgroundFixed ? 'fixed' : '' };
						-webkit-backface-visibility: hidden;
						-webkit-animation: imageAnimation-${ id } ${ images.length * imageDuration }s ${
									imageLoop ? `infinite` : `1`
							  } 0s ${ imageLoop ? `` : `forwards` };
						-moz-animation: imageAnimation-${ id } ${
									images.length * imageDuration
							  }s linear ${ imageLoop ? `infinite` : `1` } 0s ${
									imageLoop ? `` : `forwards`
							  };
						-o-animation: imageAnimation-${ id } ${
									images.length * imageDuration
							  }s linear ${ imageLoop ? `infinite` : `1` } 0s ${
									imageLoop ? `` : `forwards`
							  };
						-ms-animation: imageAnimation-${ id } ${
									images.length * imageDuration
							  }s linear ${ imageLoop ? `infinite` : `1` } 0s ${
									imageLoop ? `` : `forwards`
							  };
						animation: imageAnimation-${ id } ${ images.length * imageDuration }s linear ${
									imageLoop ? `infinite` : `1`
							  } 0s ${ imageLoop ? `` : `forwards` };
						${ imageTransition === 'fade' ? `opacity: 0;` : `opacity: 1;` }
						${ imageTransition === 'slideright' ? `transform: translateX(-100%);` : `` }
						${ imageTransition === 'slideleft' ? `transform: translateX(100%);` : `` }
						${ imageTransition === 'slideup' ? `transform: translateY(100%);` : `` }
						${ imageTransition === 'slidedown' ? `transform: translateY(-100%);` : `` }
					}
					${ images
						.map( function ( item, index ) {
							return ` .block-id-${ id } > .grigora-group-slideshow li:nth-child(${ index + 1 }) span { 
								background-position: ${ imageFocus.x * 100 }% ${ imageFocus.y * 100 }%;
								background-image: url(${ item.url });
								-webkit-animation-delay: ${ index * imageDuration }s;
								-moz-animation-delay: ${ index * imageDuration }s;
								-o-animation-delay: ${ index * imageDuration }s;
								-ms-animation-delay: ${ index * imageDuration }s;
								animation-delay: ${ index * imageDuration }s;
							} `;
						} )
						.join( ' ' ) }
					@keyframes imageAnimation-${ id } { 
						${ imageTransition === 'fade' ? `0% { opacity: 0; }` : `` }
						${
							imageTransition === 'slideright'
								? `0% { transform: translateX(-100%); }`
								: ``
						}
						${
							imageTransition === 'slideleft'
								? `0% { transform: translateX(100%); }`
								: ``
						}
						${ imageTransition === 'slideup' ? `0% { transform: translateY(100%); }` : `` }
						${
							imageTransition === 'slidedown'
								? `0% { transform: translateY(-100%); }`
								: ``
						}
						${ (
							( imageTransitionDuration * 100 ) /
							( images.length * imageDuration )
						).toFixed( 2 ) }% {  
							${ imageTransition === 'fade' ? `opacity: 1;` : `` }
							${ imageTransition === 'slideright' ? `transform: translateX(0%);` : `` }
							${ imageTransition === 'slideleft' ? `transform: translateX(0%);` : `` }
							${ imageTransition === 'slideup' ? `transform: translateY(0%);` : `` }
							${ imageTransition === 'slidedown' ? `transform: translateY(0%);` : `` }
						}
						${ (
							( ( imageTransitionDuration + imageDuration ) *
								100 ) /
							( images.length * imageDuration )
						).toFixed( 2 ) }% { 
							${ imageTransition === 'fade' ? `opacity: 1;` : `` }
							${ imageTransition === 'slideright' ? `transform: translateX(0%);` : `` }
							${ imageTransition === 'slideleft' ? `transform: translateX(0%);` : `` }
							${ imageTransition === 'slideup' ? `transform: translateY(0%);` : `` }
							${ imageTransition === 'slidedown' ? `transform: translateY(0%);` : `` }
						 }
						${ (
							( ( imageTransitionDuration * 2 + imageDuration ) *
								100 ) /
							( images.length * imageDuration )
						).toFixed( 2 ) }% { 
							${
								imageTransition === 'fade'
									? `${
											imageLoop
												? `opacity: 0`
												: `opacity: 1`
									  };`
									: ``
							}
							${
								imageTransition === 'slideright'
									? `${
											imageLoop
												? `transform: translateX(100%)`
												: `transform: translateX(0%)`
									  };`
									: ``
							}
							${
								imageTransition === 'slideleft'
									? `${
											imageLoop
												? `transform: translateX(-100%)`
												: `transform: translateX(0%)`
									  };`
									: ``
							}
							${
								imageTransition === 'slideup'
									? `${
											imageLoop
												? `transform: translateY(-100%)`
												: `transform: translateY(0%)`
									  };`
									: ``
							}
							${
								imageTransition === 'slidedown'
									? `${
											imageLoop
												? `transform: translateY(100%)`
												: `transform: translateY(0%)`
									  };`
									: ``
							}
						}
						100% { 
							${
								imageTransition === 'fade'
									? `${
											imageLoop
												? `opacity: 0`
												: `opacity: 1`
									  };`
									: ``
							}
							${
								imageTransition === 'slideright'
									? `${
											imageLoop
												? `transform: translateX(100%)`
												: `transform: translateX(0%)`
									  };`
									: ``
							}
							${
								imageTransition === 'slideleft'
									? `${
											imageLoop
												? `transform: translateX(-100%)`
												: `transform: translateX(0%)`
									  };`
									: ``
							}
							${
								imageTransition === 'slideup'
									? `${
											imageLoop
												? `transform: translateY(-100%)`
												: `transform: translateY(0%)`
									  };`
									: ``
							}
							${
								imageTransition === 'slidedown'
									? `${
											imageLoop
												? `transform: translateY(100%)`
												: `transform: translateY(0%)`
									  };`
									: ``
							}
						}
					}`
							: `${ images
									.map( function ( item, index ) {
										return ` .block-id-${ id } > .grigora-group-slideshow li:nth-child(${ index + 1 }) span { 
								background-position: ${ imageFocus.x * 100 }% ${ imageFocus.y * 100 }%;
								background-image: url(${ item.url });
								background-attachment: ${ backgroundFixed ? 'fixed' : '' };
							} `;
									} )
									.join( ' ' ) }`
					}
					`
							: ``
					}
					
					` }
			</style>
			{ backgroundNMode === 'color' && (
				<div class="background-color"></div>
			) }
			{ backgroundNMode === 'gradient' && (
				<div class="background-color"></div>
			) }
			{ backgroundNMode === 'images' && (
				<ul class="grigora-group-slideshow">
					{ images.map( function ( item ) {
						return (
							<li>
								<span></span>
							</li>
						);
					} ) }
				</ul>
			) }
			{ backgroundNMode === 'video' && (
				<video
					ref={ videoRef }
					autoPlay
					loop={ videoLoop ? true : undefined }
					preload={ videoPreload }
				>
					<source src={ videoLink } type="video/mp4" />
				</video>
			) }
			{ backgroundHMode && <div class="background-hover-color"></div> }
			{ ( backgroundOMode || backgroundOHMode ) && (
				<div class="background-overlay"></div>
			) }
			<div { ...innerBlocksProps } />
		</div>
	);
}

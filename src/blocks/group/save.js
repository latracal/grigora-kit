import classnames from 'classnames';

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {

	const {
		id,
		verticalAlignment,
		layoutPadding,
		layoutMargin,
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
		videoLinkID,
		videoLoop,
		videoMuted,
		videoPreload,
		videoPoster,
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
		effectNBFlag,
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
		effectHColor,
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

	const HtmlTag = ( ! structureTag ? 'div' : structureTag );


	const groupClasses = classnames( {
		"wp-block-grigora-kit-group": true,
		"wp-block-group": true,
		"grigora-kit-group-wrapper": true,
		[ `block-id-${ id }` ]: id,
		[ `animateOnce` ]: entranceAnimation != "none",
		[ `has-entrance-animation animateOnce` ]: entranceAnimation != "none",
		"has-custom-background": backgroundNMode || backgroundHMode || backgroundOMode || backgroundOHMode,
		"grigora-hide-desktop": hideDesktop,
		"grigora-hide-tablet": hideTablet,
		"grigora-hide-mobile": hideMobile
	} );

	return (
		<HtmlTag { ...useBlockProps.save({className: groupClasses}) }>
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
			<video  autoPlay loop={videoLoop ? true : undefined} preload={videoPreload}>
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
		<div class="inner-content">
		<InnerBlocks.Content />
		</div>
	</HtmlTag>
	);
}

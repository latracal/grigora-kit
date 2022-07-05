import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

import parse from 'html-react-parser';

import SVGIcons from '@constants/icons.json';


export default function save( { attributes, className } ) {

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


	const buttonWrapper = classnames( {
			"grigora-kit-button-wrapper": true,
			[ `grigora-button-align-${ align }` ]: align
		} );

	const buttonClass = classnames( {
		"grigora-kit-button": true,
		[ `block-id-${ id }` ]: id,
		"hover-effects": hoverEffect,
		[ `has-entrance-animation animateOnce` ]: entranceAnimation != "none"



	} );

	const buttonStyle = {
		// "font-size": typoSize,
		// "font-weight": typoWeight,
		// "text-transform": typoTransform,
		// "font-style": typoStyle,
		// "text-decoration": typoDecoration,
		// "line-height": typoLineHeight,
		// "letter-spacing": typoLetterSpacing,
		// "word-spacing": typoWordSpacing,
		// "padding-left": layoutPadding?.left,
		// "padding-right": layoutPadding?.right,
		// "padding-top": layoutPadding?.top,
		// "padding-bottom": layoutPadding?.bottom,
		// "text-shadow": (textShadow ?  `${ textShadowHorizontal }px ${ textShadowVertical }px ${ textShadowBlur }px ${ textShadowColor }` : "none"),
		// "align-self": layoutVerticalAlign,
		// "position": layoutPosition,
		// "transition": ( hoverEffect ? `${ transitionTime }s`: `0s` ),
		// "color": ( effectNColor),
		// "background-color": ( !effectNBFlag? effectNBColor : ""),
		// "background-image": ( effectNBFlag? effectNBGradient : ""),
		// "border-left": `${ effectNBorder?.left?.width } ${ effectNBorder?.left?.style } ${ effectNBorder?.left?.color? effectNBorder?.left?.color : "" }`,
		// "border-right": `${ effectNBorder?.right?.width } ${ effectNBorder?.right?.style } ${ effectNBorder?.right?.color? effectNBorder?.right?.color : "" }`,
		// "border-top": `${ effectNBorder?.top?.width } ${ effectNBorder?.top?.style } ${ effectNBorder?.top?.color? effectNBorder?.top?.color : "" }`,
		// "border-bottom": `${ effectNBorder?.bottom?.width } ${ effectNBorder?.bottom?.style } ${ effectNBorder?.bottom?.color? effectNBorder?.bottom?.color : "" }`,
		// "border-top-right-radius": effectNBorderRadius?.topRight,
		// "border-top-left-radius": effectNBorderRadius?.topLeft,
		// "border-bottom-right-radius": effectNBorderRadius?.bottomRight,
		// "border-bottom-left-radius": effectNBorderRadius?.bottomLeft,
		// "transform": `rotateX(${ effectNRotateX }deg) rotateY(${ effectNRotateY }deg) rotateZ(${ effectNRotateZ }deg) translateX(${ effectNOffsetX }px) translateY(${ effectNOffsetY }px) scale(${ effectNScale })`,
		// "box-shadow": (effectNShadow ?  `${ effectNShadowHO } ${ effectNShadowVO } ${ effectNShadowBlur } ${ effectNShadowSpread } ${ effectNShadowColor }` : "")
	};

	

	const hoverDA = JSON.stringify({
		// id,
		// effectHAnimation,
		// effectHColor,
		// effectHBFlag,
		// effectHBGradient,
		// effectHBColor,
		// transitionTime,
		// effectHRotateX,
		// effectHRotateY,
		// effectHRotateZ,
		// effectHOffsetX,
		// effectHOffsetY,
		// effectHScale,
		// effectHBorder,
		// effectHBorderRadius,
		// effectHShadow,
		// effectHShadowHO,
		// effectHShadowVO,
		// effectHShadowBlur,
		// effectHShadowSpread,
		// effectHShadowColor,
	});

	function renderSingleIcon( ){

        const icon_parsed = parse( SVGIcons[icon] );

        return(
            icon_parsed
        );
    }
	
	return (
		<div { ...useBlockProps.save( { className: buttonWrapper } ) }>
		<a 
		href={ url } 
		target={ (opensInNewTab ? "_blank" : "" )}
		rel={ `noopener${ (urlnofollow ?  " nofollow": "") }${ (urlnoreferrer? " noreferrer": "") }${ (urlsponsored? " sponsored": "") }` }
		className={`button-link`}
		>
			<div
				className={ buttonClass }
				style= { buttonStyle }
			>
				{ (icon && iconPosition == "left") && (
						<div class={`grigora-svg-icon`}>
							{ renderSingleIcon( ) }
						</div>
					)}
				<RichText.Content
					tagName={ "span" }
					identifier="content"
					value={ content }
				/>
				{ (icon && iconPosition == "right") && (
						<div class={`grigora-svg-icon`}>
							{ renderSingleIcon( ) }
						</div>
					)}
			</div>
		</a>
	</div>
	);
}

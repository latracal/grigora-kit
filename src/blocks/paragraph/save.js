import classnames from 'classnames';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes, className, clientId } ) {

	const {
		id,
		content,
		align,
		direction,
		textShadow,
		textShadowColor,
		textShadowBlur,
		textShadowHorizontal,
		textShadowVertical,
		layoutVerticalAlign,
		layoutPosition,
		effectNRotateX,
		effectNRotateY,
		effectNRotateZ,
		effectNOffsetX,
		effectNOffsetY,
		effectNScale,
		effectNBorderType,
		effectNBorderWidth,
		effectNBorderColor,
		effectNBorderRadiusTL,
		effectNBorderRadiusTR,
		effectNBorderRadiusBL,
		effectNBorderRadiusBR,
		hoverEffect,
		transitionTime,
		effectHRotateX,
		effectHRotateY,
		effectHRotateZ,
		effectHOffsetX,
		effectHOffsetY,
		effectHScale,
		effectHBorderType,
		effectHBorderWidth,
		effectHBorderColor,
		effectHBorderRadiusTL,
		effectHBorderRadiusTR,
		effectHBorderRadiusBL,
		effectHBorderRadiusBR
	} = attributes;


	const wrapperClasses = classnames( className, {
		[ `has-text-align-${ align }` ]: align,
		"wp-block-grigora-kit-paragraph": true,
		"hover-effects": hoverEffect,
		[ `block-id-${ id }` ]: id,
	} );

	const aParaStyle = {
		"transition": ( hoverEffect ? `${ transitionTime }s`: `0s` ),
		"direction": direction,
		"text-shadow": (textShadow ?  `${ textShadowHorizontal }px ${ textShadowVertical }px ${ textShadowBlur }px ${ textShadowColor }` : "none"),
		"align-self": layoutVerticalAlign,
		"position": layoutPosition,
		"transform":  `rotateX(${ effectNRotateX }deg) rotateY(${ effectNRotateY }deg) rotateZ(${ effectNRotateZ }deg) translateX(${ effectNOffsetX }px) translateY(${ effectNOffsetY }px) scale(${ effectNScale })`,
		"border-width": `${ effectNBorderWidth }px`,
		"border-style": `${ effectNBorderType }`,
		"border-color": `${ effectNBorderColor }`,
		"borderTopLeftRadius": `${ effectNBorderRadiusTL }%`,
		"borderTopRightRadius": `${ effectNBorderRadiusTR }%`,
		"borderBottomLeftRadius": `${ effectNBorderRadiusBL }%`,
		"borderBottomRightRadius": `${ effectNBorderRadiusBR }%`
	};

	

	const hoverDA = JSON.stringify({
		id,
		effectHRotateX,
		effectHRotateY,
		effectHRotateZ,
		effectHOffsetX,
		effectHOffsetY,
		effectHScale,
		effectHBorderType,
		effectHBorderWidth,
		effectHBorderColor,
		effectHBorderRadiusTL,
		effectHBorderRadiusTR,
		effectHBorderRadiusBL,
		effectHBorderRadiusBR
	});
	
	return (
			<RichText.Content
			tagName="p"
			className={ wrapperClasses }
			value={ content }
			style={ aParaStyle }
			data-settings={ hoverDA }
			/>	
	);
}

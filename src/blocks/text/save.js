import classnames from 'classnames';

import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentControl,
	RichText,
	__experimentalColorGradientControl as ColorGradientControl,
} from '@wordpress/block-editor';

export default function save( { attributes, className } ) {
	const {
		id,
		content,
		align,
		entranceAnimation,
		structureTag,
		entranceAnimationDelay,
	} = attributes;

	const wrapperClass = classnames( {
		'grigora-kit-text': true,
		[ `block-id-${ id }` ]: id,
		[ `has-entrance-animation animateOnce` ]: entranceAnimation != 'none',
		[ `grigora-text-align-${ align }` ]: align,
	} );

	console.log(wrapperClass)

	return (
		<RichText.Content
			{ ...useBlockProps.save( { className: wrapperClass } ) }
			data-animation-delay={
				entranceAnimationDelay ? entranceAnimationDelay : undefined
			}
			tagName={ structureTag }
			value={ content }
		/>
	);
}

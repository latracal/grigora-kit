import classnames from 'classnames';

import { useBlockProps, InspectorControls, BlockControls, AlignmentControl, RichText, __experimentalColorGradientControl as ColorGradientControl } from '@wordpress/block-editor';


export default function save( { attributes, className } ) {

	const {
		id,
		content,
		align,
		entranceAnimation,
		structureTag
	} = attributes;

	const wrapperClass = classnames( {
		'grigora-kit-text': true,
		[ `block-id-${ id }` ]: id,
		[ `has-entrance-animation animateOnce` ]: entranceAnimation != 'none',
		[ `grigora-text-align-${ align }` ]: align,
	} );

	return (
		<RichText.Content { ...useBlockProps.save( { className: wrapperClass } )} tagName={structureTag} value={ content } />
	);
}

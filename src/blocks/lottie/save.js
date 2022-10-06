import classnames from 'classnames';

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		id,
		
	} = attributes;

	const lottieWrapper = classnames( {
		'grigora-kit-lottie': true,
		[ `block-id-${ id }` ]: id,
	} );

	return (
		<div
			{ ...useBlockProps.save( { className: lottieWrapper } ) }
		>
		</div>
	);
}

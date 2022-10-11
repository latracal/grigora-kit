import classnames from 'classnames';

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		id,
	} = attributes;

	const codeWrapper = classnames( {
		'grigora-kit-code': true,
		[ `block-id-${ id }` ]: id,
	} );

	return (
		<div
			{ ...useBlockProps.save( { className: codeWrapper } ) }
		>
			
		</div>
	);
}

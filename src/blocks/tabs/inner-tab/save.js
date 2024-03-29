import classnames from 'classnames';

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { id } = attributes;

	const groupClasses = classnames( {
		'grigora-kit-inner-tab': true,
		[ `block-id-${ id }` ]: id,
	} );

	return (
		<div { ...useBlockProps.save( { className: groupClasses } ) }>
			<InnerBlocks.Content />
		</div>
	);
}

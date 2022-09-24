import classnames from 'classnames';

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		id,
	} = attributes;

	const roadmapWrapper = classnames( {
		'grigora-kit-roadmap': true,
		[ `block-id-${ id }` ]: id,
	} );

	return (
		<div
			{ ...useBlockProps.save( { className: roadmapWrapper } ) }	
		>
			
		</div>
	);
}

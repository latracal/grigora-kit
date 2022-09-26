import classnames from 'classnames';


import { 

	useBlockProps, 
 } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		id,
		url

	} = attributes;

// Used in image
	const image = (
		<img
			src={ url }
		/>
	);

	const figure = (
		<>
			{image}		
		</>
	);

	const roadmapWrapper = classnames( {
		'grigora-kit-roadmap': true,
		[ `block-id-${ id }` ]: id,
	} );

	return (
		<div
			{ ...useBlockProps.save( { className: roadmapWrapper } ) }	
		>
			<figure>
				{ figure }
			</figure>
			
		</div>
	);
}

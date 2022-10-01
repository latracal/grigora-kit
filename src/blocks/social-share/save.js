import classnames from 'classnames';
import parse from 'html-react-parser';

import { useBlockProps } from '@wordpress/block-editor';

import SVGIcons from '@constants/icons.json';

export default function save( { attributes, className } ) {
	const {
		id,
		
	} = attributes;

	const socialWrapper = classnames( {
		'grigora-kit-social-share': true,
		[ `block-id-${ id }` ]: id,
		// [ `has-entrance-animation animateOnce` ]: entranceAnimation != 'none',
	} );

	

	return (
		<div
			{ ...useBlockProps.save( { className: socialWrapper } ) }
		>
			
		</div>
	);
}

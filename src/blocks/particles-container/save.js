import classnames from 'classnames';

import { useBlockProps } from '@wordpress/block-editor';

import parse from 'html-react-parser';

export default function save( { attributes, className } ) {
	const {
		id,
	} = attributes;

	const counterWrapper = classnames( {
		'grigora-kit-particles-container': true,
		[ `block-id-${ id }` ]: id,
	} );

	return (
		<></>
	);
}

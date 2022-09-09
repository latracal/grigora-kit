import classnames from 'classnames';

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import parse from 'html-react-parser';

import SVGIcons from '@constants/icons.json';

export default function save( { attributes, className } ) {
	const { id } = attributes;

	return (
		<>
		<InnerBlocks.Content />
		</>
	);
}

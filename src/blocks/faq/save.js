import classnames from 'classnames';

import { useBlockProps } from '@wordpress/block-editor';

import parse from 'html-react-parser';

import SVGIcons from '@constants/icons.json';

export default function save( { attributes, className } ) {
	const { id,
		faqs,
	 } = attributes;

	 const faqWrapper = classnames( {
		'grigora-kit-faq': true,
		[ `block-id-${ id }` ]: id,
	} );

	return (
		<div { ...useBlockProps.save( { className: faqWrapper } ) }
		data-id={ `block-id-${ id }` }
		data-faqs = { faqs }
		>
			<h1>FAQ</h1>
		</div>
	);
}

import classnames from 'classnames';

import { RichText, useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {

	const {
		id,
		content,
		url,
		opensInNewTab,
		urlnofollow,
		urlnoreferrer,
		urlsponsored,
		align,
		hoverEffect,
		entranceAnimation,
	} = attributes;


	const buttonWrapper = classnames( {
			"grigora-kit-button-wrapper": true,
			[ `grigora-button-align-${ align }` ]: align
		} );

	const buttonClass = classnames( {
		"grigora-kit-button": true,
		[ `block-id-${ id }` ]: id,

	} );

	return (
		<div { ...useBlockProps.save( { className: buttonWrapper } ) }>
		<InnerBlocks.Content />
	</div>
	);
}

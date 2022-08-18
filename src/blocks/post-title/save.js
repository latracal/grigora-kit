import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

import parse from 'html-react-parser';

import SVGIcons from '@constants/icons.json';

export default function save( { attributes, className } ) {
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
		icon,
		iconPosition,
	} = attributes;

	const postTitleWrapper = classnames( {
		'grigora-kit-post-title-wrapper': true,
		[ `grigora-post-title-align-${ align }` ]: align,
	} );

	const postTitleClass = classnames( {
		'grigora-kit-post-title': true,
		[ `block-id-${ id }` ]: id,
		'hover-effects': hoverEffect,
		[ `has-entrance-animation animateOnce` ]: entranceAnimation != 'none',
	} );

	function renderSingleIcon() {
		if ( icon && SVGIcons[ icon ] ) {
			const icon_parsed = parse( SVGIcons[ icon ] );

			return icon_parsed;
		}

		return null;
	}

	return (
		<div { ...useBlockProps.save( { className: postTitleWrapper } ) }>
			
		</div>
	);
}

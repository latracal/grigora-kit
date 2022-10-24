import classnames from 'classnames';

import { useBlockProps } from '@wordpress/block-editor';

import parse from 'html-react-parser';

import SVGIcons from '@constants/icons.json';
const isSvg = require( 'is-svg' );

export default function save( { attributes, className } ) {
	const {
		id,
		icon,
		hasCustomIcon,
		customIcon,
		url,
		opensInNewTab,
		urlnofollow,
		urlnoreferrer,
		urlsponsored,
	} = attributes;

	const iconWrapper = classnames( {
		'grigora-kit-icon': true,
		[ `block-id-${ id }` ]: id,
		'no-icon-selected': ! (
			( icon && SVGIcons[ icon ] ) ||
			( hasCustomIcon && customIcon && isSvg( customIcon ) )
		),
	} );

	function renderSingleIcon() {
		if ( hasCustomIcon && customIcon && isSvg( customIcon ) ) {
			const icon_parsed = parse( customIcon );
			return icon_parsed;
		}
		if ( icon && SVGIcons[ icon ] ) {
			const icon_parsed = parse( SVGIcons[ icon ] );
			return icon_parsed;
		} else {
			null;
		}
	}

	return (
		<div { ...useBlockProps.save( { className: iconWrapper } ) }>
			{ url && (
				<a
					href={ url }
					target={ opensInNewTab ? '_blank' : '' }
					rel={ `noopener${ urlnofollow ? ' nofollow' : '' }${
						urlnoreferrer ? ' noreferrer' : ''
					}${ urlsponsored ? ' sponsored' : '' }` }
					className={ `button-link` }
				>
					{ renderSingleIcon() }
				</a>
			) }
			{ ! url && <>{ renderSingleIcon() }</> }
		</div>
	);
}

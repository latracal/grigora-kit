import classnames from 'classnames';

import { useBlockProps } from '@wordpress/block-editor';

import parse from 'html-react-parser';

import SVGIcons from '@constants/icons.json';

export default function save( { attributes, className } ) {
	const { id, icon, offset, smoothScrolling, displayScrollUp } = attributes;

	const sttWrapper = classnames( {
		'grigora-kit-scroll-to-top': true,
		[ `block-id-${ id }` ]: id,
		// 'no-icon-selected': ! ( icon && SVGIcons[ icon ] ),
	} );

	function renderSingleIcon() {
		if ( icon && SVGIcons[ icon ] ) {
			const icon_parsed = parse( SVGIcons[ icon ] );
			return icon_parsed;
		} else {
			null;
		}
	}

	return (
		<div
			{ ...useBlockProps.save( { className: sttWrapper } ) }
			data-offset={ offset }
			data-smooth={ smoothScrolling }
			data-displayscrollup={ displayScrollUp }
		>
			{ renderSingleIcon() }
		</div>
	);
}

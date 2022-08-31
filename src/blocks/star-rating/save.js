import classnames from 'classnames';
import parse from 'html-react-parser';

import { useBlockProps } from '@wordpress/block-editor';

import SVGIcons from '@constants/icons.json';

export default function save( { attributes, className } ) {
	const {
		id,
		iconSize,
		align,
		iconSpacing,
		displayStars,
		numStars,
		iconActiveColor,
		iconInactiveColor,
		icon,
		activeIcon,
		textPrefix,
		textSuffix,
		effectNRotateX,
		effectNRotateY,
		effectNRotateZ,
		effectNSkewX,
		effectNSkewY,
		effectNOffsetX,
		effectNOffsetY,
		effectNScale,
		transitionTime,
		effectHRotateX,
		effectHRotateY,
		effectHRotateZ,
		effectHSkewX,
		effectHSkewY,
		effectHOffsetX,
		effectHOffsetY,
		effectHScale,
		entranceAnimation,
	} = attributes;

	const ratingWrapper = classnames( {
		'grigora-kit-star-rating': true,
		[ `block-id-${ id }` ]: id,
		[ `animateOnce` ]: entranceAnimation != 'none',
	} );

	function renderSingleIcon( icon ) {
		if ( icon && SVGIcons[ icon ] ) {
			const icon_parsed = parse( SVGIcons[ icon ] );

			return icon_parsed;
		}

		return null;
	}

	return (
		<div { ...useBlockProps.save( { className: ratingWrapper } ) }>
			<span>{ textPrefix }</span>
			{ Array.from( Array( displayStars ).keys() ).map( function (
				value,
				i
			) {
				return (
					<div className={ `star${ numStars > i ? ` active` : `` }` }>
						{ renderSingleIcon( numStars > i ? icon : activeIcon ) }
					</div>
				);
			} ) }
			<span>{ textSuffix }</span>
		</div>
	);
}

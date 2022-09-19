import classnames from 'classnames';
import parse from 'html-react-parser';

import { useBlockProps } from '@wordpress/block-editor';

import SVGIcons from '@constants/icons.json';

export default function save( { attributes, className } ) {
	const {
		id,
		displayStars,
		numStars,
		icon,
		activeIcon,
		textPrefix,
		textSuffix,
		entranceAnimation,
		entranceAnimationDelay,
	} = attributes;

	const ratingWrapper = classnames( {
		'grigora-kit-star-rating': true,
		[ `block-id-${ id }` ]: id,
		[ `has-entrance-animation animateOnce` ]: entranceAnimation != 'none',
	} );

	function renderSingleIcon( icon ) {
		if ( icon && SVGIcons[ icon ] ) {
			const icon_parsed = parse( SVGIcons[ icon ] );

			return icon_parsed;
		}

		return null;
	}

	return (
		<div
			{ ...useBlockProps.save( { className: ratingWrapper } ) }
			data-animation-delay={
				entranceAnimationDelay ? entranceAnimationDelay : undefined
			}
		>
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

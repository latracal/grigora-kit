import classnames from 'classnames';

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		id,
		backgroundNMode,
		backgroundHMode,
		backgroundOMode,
		backgroundOHMode,
		videoLink,
		videoLoop,
		videoPreload,
		images,
		structureTag,
		entranceAnimation,
		entranceAnimationDelay,
	} = attributes;

	const HtmlTag = ! structureTag ? 'div' : structureTag;

	const groupClasses = classnames( {
		'wp-block-grigora-kit-group': true,
		'wp-block-group': true,
		'grigora-kit-group-wrapper': true,
		[ `block-id-${ id }` ]: id,
		[ `animateOnce` ]: entranceAnimation != 'none',
		[ `has-entrance-animation animateOnce` ]: entranceAnimation != 'none',
		'has-custom-background':
			backgroundNMode ||
			backgroundHMode ||
			backgroundOMode ||
			backgroundOHMode,
	} );

	return (
		<HtmlTag
			{ ...useBlockProps.save( { className: groupClasses } ) }
			data-animation-delay={
				entranceAnimationDelay ? entranceAnimationDelay : undefined
			}
		>
			{ backgroundNMode === 'color' && (
				<div class="background-color"></div>
			) }
			{ backgroundNMode === 'gradient' && (
				<div class="background-color"></div>
			) }
			{ backgroundNMode === 'images' && (
				<ul class="grigora-group-slideshow">
					{ images.map( function ( item ) {
						return (
							<li>
								<span></span>
							</li>
						);
					} ) }
				</ul>
			) }
			{ backgroundNMode === 'video' && (
				<video
					autoPlay
					loop={ videoLoop ? true : undefined }
					preload={ videoPreload }
				>
					<source src={ videoLink } type="video/mp4" />
				</video>
			) }
			{ backgroundHMode && <div class="background-hover-color"></div> }
			{ ( backgroundOMode || backgroundOHMode ) && (
				<div class="background-overlay"></div>
			) }
			<div class="inner-content">
				<InnerBlocks.Content />
			</div>
		</HtmlTag>
	);
}

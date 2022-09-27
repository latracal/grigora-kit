import classnames from 'classnames';

import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		id,
		tabs,
		activeTab,
		showTabSubtitles,
		entranceAnimation,
		entranceAnimationDelay,
	} = attributes;

	const tabsWrapper = classnames( {
		'wp-block-grigora-kit-inner-tab': true,
		'wp-block-grigora-kit-tabs': true,
		'grigora-kit-tabs': true,
		[ `block-id-${ id }` ]: id,
		[ `has-entrance-animation animateOnce` ]: entranceAnimation != 'none',
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: classnames( {
			'tab-contents': true,
		} ),
	} );

	return (
		<div
			{ ...useBlockProps.save( { className: tabsWrapper } ) }
			data-animation-delay={
				entranceAnimationDelay ? entranceAnimationDelay : undefined
			}
		>
			<div className="tab-titles">
				{ tabs.map( ( item, index ) => (
					<div
						className={ `tab-btn tab-${ index } ${
							activeTab == index ? `tab-active` : ``
						}` }
					>
						<div className="title-subtitle">
							<div className="title-class">{ item.title }</div>
							{ showTabSubtitles && (
								<div className="subtitle-class">
									{ item.subtitle }
								</div>
							) }
						</div>
					</div>
				) ) }
			</div>
			<div { ...innerBlocksProps }></div>
		</div>
	);
}

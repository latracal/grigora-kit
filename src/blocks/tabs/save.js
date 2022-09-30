import classnames from 'classnames';

import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
	RichText,
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
							<RichText.Content
								tagName={ 'div' }
								className="title-class"
								value={ item.title }
							/>
							{ showTabSubtitles && (
								<RichText.Content
									tagName={ 'div' }
									className="subtitle-class"
									value={ item.subtitle }
								/>
							) }
						</div>
					</div>
				) ) }
			</div>
			<div { ...innerBlocksProps }></div>
		</div>
	);
}

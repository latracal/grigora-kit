import classnames from 'classnames';

import { useBlockProps, InnerBlocks, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save( { attributes, className } ) {
	const { 
		id,
		tabs,
		activeTab,
		showTabSubtitles,
	 } = attributes;

	const tabsWrapper = classnames( {
		'grigora-kit-tabs': true,
		[ `block-id-${ id }` ]: id,
	} );

	const tabContentWrapper = classnames( {
		'tab-contents': true,
		[ `block-id-${ id }` ]: id,
	} );

	// 
	return (
		<div 
		{ ...useBlockProps.save( { className: tabsWrapper } ) }
		data-id = { `block-id-${ id }` }
		data-length = { tabs.length }
		>
		<div className='tab-titles'>
					{ tabs.map((item, index) => (
						
						<div className={`tab-btn tab-${index} ${activeTab == index ? `tab-active` : ``}`  }  
						id={`block-id-${ id } ${index}`}>
							<div className='title-subtitle' >
								<div className='title-class'>
									{item.title}
								</div>
								{showTabSubtitles && <div className='subtitle-class'>
									{item.subtitle}
								</div>}
							</div>
						</div>
						))
					}
		</div>
			<div className="content-container" >
			<InnerBlocks.Content 
			
			/>
			<div
			{...useInnerBlocksProps.save({
				className: tabContentWrapper
			})}
			></div>
			</div>
		</div>
	);
}

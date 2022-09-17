import classnames from 'classnames';

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import parse from 'html-react-parser';

import SVGIcons from '@constants/icons.json';

export default function save( { attributes, className } ) {
	const { 
		id,
		tabs,
		activeTab,
		showTabSubtitles
	 } = attributes;

	function renderAddIcon() {
	
		const icon_parsed = parse( SVGIcons[ 'plus-circle' ] );
		return icon_parsed;
		
	}

	function renderDeleteIcon() {
	
		const icon_parsed = parse( SVGIcons[ 'x-circle' ] );
		return icon_parsed;
		
	}

	const tabsWrapper = classnames( {
		'grigora-kit-tabs': true,
		[ `block-id-${ id }` ]: id,
	} );

	return (
		<div 
		{ ...useBlockProps.save( { className: tabsWrapper } ) }
		
		>
		<div className='tab-titles'>
					{ tabs.map((item, index) => (
						<div className={`tab-btn tab-${item.id} ${activeTab == index ? `tab-active` : ``}`} key={index}>
							<div className='title-subtitle' >
								<div className='delete-icon'>
									{renderDeleteIcon()}
								</div>
								<div className='title'>
									{item.title}
								</div>
								{showTabSubtitles && item.subtitle && <div>{item.subtitle}</div>}
							</div>
						</div>
						))
					}
		</div>
		<InnerBlocks.Content />
		</div>
	);
}

import classnames from 'classnames';
import parse from 'html-react-parser';

import { useBlockProps, RichText, } from '@wordpress/block-editor';

import SVGIcons from '@constants/icons.json';

export default function save( { attributes, className } ) {
	const {
		id,
		iconItems,
		displayShare,
		displayText,
		textShare,
	} = attributes;

	const socialWrapper = classnames( {
		'grigora-kit-social-share': true,
		[ `block-id-${ id }` ]: id,
		// [ `has-entrance-animation animateOnce` ]: entranceAnimation != 'none',
	} );

	function renderSingleIcon(icon) {
		if ( icon && SVGIcons[ icon ] ) {
			const icon_parsed = parse( SVGIcons[ icon ] );
			return icon_parsed;
		} else {
			null;
		}
	}

	

	return (
		<div
			{ ...useBlockProps.save( { className: socialWrapper } ) }
			data-textshare = { textShare }
		>
			
			
			
					{
						iconItems.map( ( item, index ) => {
							return (<>
							
									{item.display && 	
										<div style={{color: item.color, backgroundColor: item.backgroundColor, textDecoration: 'none'}} 
										className={`icon-item-container ${item.title}`}>
											{renderSingleIcon(item.title)}
											{displayText && item.display && <RichText.Content
											tagName="div"
											value={ item.shareText }
											className="share-text"
										/>}
										</div>
									
											
									}				
									
							</>				
							);
						})
					}
				


		</div>
	);
}

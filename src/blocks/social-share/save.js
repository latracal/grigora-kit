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
		>
			
			
			<div className='social-share-container'>
				{displayShare && <div className='share-icon-container'>
					<div className='arrow-design'></div>
					<div className='share-icon'>
						{renderSingleIcon('share-fill')}
					</div>
					<div>
						<b>Share</b>
					</div>
				</div>}
				<div className='icons-container'>
					{
						iconItems.map( ( item, index ) => {
							return (<div onClick={() => handleIconClick()}>
							
									{item.display && 	
										<a style={{color: item.color, backgroundColor: item.backgroundColor, textDecoration: 'none'}} 
										href={
											item.title === "whatsapp" ? 'https://web.whatsapp.com/send?text= Checkout the blogs in this website: ' + window.location.href : 
											item.title === "facebook" ? 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href :
											item.title === "twitter" ? 'https://twitter.com/intent/tweet?url=' + window.location.href :
											item.title === "instagram" ? 'https://www.instagram.com/?url=' + window.location.href :
											item.title === "linkedin" ? 'https://www.linkedin.com/shareArticle?mini=true&url=' + window.location.href :
											item.title === "pinterest" ? 'https://pinterest.com/pin/create/button/?url=' + window.location.href :
											item.title === "reddit" ? 'https://reddit.com/submit?url=' + window.location.href :
											item.title === "telegram" ? 'https://telegram.me/share/url?url=' + window.location.href :
											'https://www.snapchat.com/add/?url=' + window.location.href 
										} 
										className="icon-item-container">
											{renderSingleIcon(item.title)}
											{displayText && item.display && <RichText.Content
											tagName="div"
											value={ item.shareText }
											className="share-text"
										/>}
										</a>
									
											
									}				
									
							</div>				
							);
						})
					}
				</div>
			</div>


		</div>
	);
}

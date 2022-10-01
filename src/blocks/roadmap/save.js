import classnames from 'classnames';
import parse from 'html-react-parser';
import SVGIcons from '@constants/icons.json';

import { 

	useBlockProps, 
	RichText,

 } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		id,
		roadmapItems,
		layout,
		displayDate,
		displayAuthor,
		displayButton,
		displayImage,
		titleTag,
		contentTag,
		iconPick,

	} = attributes;

	

	const roadmapWrapper = classnames( {
		'grigora-kit-roadmap': true,
		[ `block-id-${ id }` ]: id,
	} );

	return (
		<div
			{ ...useBlockProps.save( { className: roadmapWrapper } ) }	
		>
			<div className={`wrapper ${layout==='leftright' ? 'middle': layout === 'left' ? 'left' : 'right'}`}>
				<div className={`center-line ${layout==='left' ? 'left' : layout ==='right' ? 'right' : ''}`}>
					<div className="scroll-icon">
						{parse(SVGIcons[ iconPick ])}
					</div>
				</div>
				
				{/* Problem in the below block */}

				{
					roadmapItems.map( ( item, index ) => {
					
						return(
							<div className={`row row-${layout === "left" ? '2 left' : layout === "right" ? '1 right' : (index % 2 == 0 ? '1' : '2')}`}>
								<section>
									<div className='icon'>
										{item.icon && parse(SVGIcons[ item.icon ])}
									</div>
									<div className="arrow-design"></div>
									<div className='card-container'>
											{ displayImage && 
											<figure>
												{ ( item.url ) && (
													<div className='image-container' 
													>
														<img src={item.url}/>
													</div>
													) }

											</figure>}
											<div className={`card-content${(item.url === "" || !displayImage) ? '':'img'}`}>
											<div className="details">
												<RichText.Content
													tagName={ titleTag }
													value={ item.title }
													className='title'
												/>
												{displayDate && <RichText.Content
													tagName={ 'span' }
													value={ item.date }
													className='date'
												/>}
											</div>
											<RichText.Content
												tagName={ contentTag }
												value={ item.content }
												className='content'
											/>
											<div className='bottom'>
												{displayButton && 
												<a href={item.link}>
													<RichText.Content
														tagName={ 'div' }
														value={ item.linkText }
														className='link-text'
														/>
												</a>
													}

												{displayAuthor && 
												<RichText.Content
													tagName={ 'i' }
													value={ item.author }
													className='author'
												/>}

											</div>
											</div>
									</div>
								</section>
							</div>
						)
					
					})
				}

				{/* Until this point */}
				
			</div>
			
		</div>
	);
}

import classnames from 'classnames';

import { useBlockProps } from '@wordpress/block-editor';

import parse from 'html-react-parser';

import SVGIcons from '@constants/icons.json';

export default function save( { attributes, className } ) {
	const { 
		id,
		faqs,
		titleTag,
		iconActiveColor,
    	titleActiveColor,
		closedIcon,
		openedIcon,
	 } = attributes;

	
	 function renderSingleIcon(show) {

		
		if(show)
		{
			if ( closedIcon && SVGIcons[ closedIcon ] ) {
			const icon_parsed = parse( SVGIcons[ closedIcon ] );
			return(
				<div className='hide-button' style={{color: iconActiveColor}}>
					{
						icon_parsed
					}
				</div>
			) 
			}
			else
			{
				return(
					<div className='hide-button' style={{color: iconActiveColor}}>
						{
							parse(
								SVGIcons['chevron-double-down']
							)
						}
					</div>
				) 
				
			}
		}
		else{
			if ( openedIcon && SVGIcons[ openedIcon ] ) {
				const icon_parsed = parse( SVGIcons[ openedIcon ] );
				return(
					<div className='hide-button'>
						{
							icon_parsed
						}
					</div>
				) 
				}
			else
			{
				return(
					<div className='hide-button'>
						{
							parse(
								SVGIcons['chevron-compact-up']
							)
						}
					</div>
				) 
			}
		}
	}

	 const faqWrapper = classnames( {
		'grigora-kit-faq': true,
		[ `block-id-${ id }` ]: id,
	} );

	

	const HtmlTag = ! titleTag ? 'div' : titleTag;

	return (
		<div { ...useBlockProps.save( { className: faqWrapper } ) }
		data-id={ id }
		data-length = { faqs.length }
	
		>
			<div className='faq-container'>
				{ faqs.map( ( faq, index ) => {return(
					<div className='faq-block' id={`faq-block-${id}-${index}`}> 
						<div className='faq-head'>
							<div className={`faq-question-container ${faq.hide ? '': ' active'}`} id={`faq-question-${id}-${index}`}>
								<HtmlTag className='faq-question' > {faq.question}</HtmlTag>
							</div>

								<div className='hide-button'>
									<div id={`hide-${id}-${index}`}>{renderSingleIcon(true)}</div>
									<div id={`unhide-${id}-${index}`}>{renderSingleIcon(false)}</div>
								</div>
						</div>
						<div id={`faq-answer-${id}-${index}`}>
							<div className='faq-answer'> {faq.answer}</div>
						</div>
					</div>
				)
				} ) }
			</div>
		</div>
	);
}

import classnames from 'classnames';

import { useBlockProps } from '@wordpress/block-editor';

import parse from 'html-react-parser';

import SVGIcons from '@constants/icons.json';

export default function save( { attributes, className } ) {
	const { id,
		faqs,
		titleTag,
		iconActiveColor,
    	titleActiveColor,
		closedIcon,
		openedIcon,
	 } = attributes;

	 function renderSingleIcon(hide) {

		
		if(hide)
		{
			if ( closedIcon && SVGIcons[ closedIcon ] ) {
			const icon_parsed = parse( SVGIcons[ closedIcon ] );
			return icon_parsed;
			}
		else
		{
			return parse(
				SVGIcons['chevron-double-down']
			);
		}
		}
		else{
			if ( openedIcon && SVGIcons[ openedIcon ] ) {
				const icon_parsed = parse( SVGIcons[ openedIcon ] );
				return icon_parsed;
				}
			else
			{
				return parse(
					SVGIcons['chevron-compact-up']
				);
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
		data-id={ `block-id-${ id }` }
		data-faqs = { faqs }
		>
			<div id={ `block-id-${ id }`} class='faq-container'>
				{ faqs.map( ( faq ) => {return(
					<div class='faq-block'> 
						<div class='faq-head'>
							<div class='faq-question-container' style={!faq.hide ? {color: titleActiveColor}: {}}>
								<HtmlTag class='faq-question'> {faq.question} </HtmlTag>
							</div>
								<div class='hide-button' style={!faq.hide ? {color: iconActiveColor}: {}}> {renderSingleIcon(!faq.hide)} </div>
						</div>
						<div class='faq-answer'> {faq.answer} </div>
					</div>
				)
				} ) }
			</div>
		</div>
	);
}

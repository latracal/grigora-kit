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

	let closedIconRenderer = renderSingleIcon(true);
	let openedIconRenderer = renderSingleIcon(false);

	const HtmlTag = ! titleTag ? 'div' : titleTag;

	return (
		<div { ...useBlockProps.save( { className: faqWrapper } ) }
		data-faqs = { JSON.stringify(faqs) }
		data-id={ `block-id-${ id }` }
		data-titleactivecolor = { titleActiveColor }
		data-iconactivecolor = { iconActiveColor }
		>
			<div class='faq-container'>
				{ faqs.map( ( faq ) => {return(
					<div class='faq-block' > 
						<div class='faq-head' id={ `${faq.id}`}>
							<div class='faq-question-container' id={`${faq.id}-question`} style={!faq.hide ? {color: titleActiveColor}: {}}>
								<HtmlTag class='faq-question' > {faq.question}</HtmlTag>
							</div>

								<div class='hide-button'>
									<div  style={!faq.hide ? {color: iconActiveColor}: {}}  id={`${faq.id}-hide-3`} > {renderSingleIcon(!faq.hide)} </div>
									<div  style={!faq.hide ? {color: iconActiveColor}: {}}  id={`${faq.id}-hide-1`} > {renderSingleIcon(false)} </div>
									<div  id={`${faq.id}-hide-2`} > {renderSingleIcon(true)} </div>
								</div>
						</div>
						<div id={`${faq.id}-answer`}>
							{!faq.hide && <div class='faq-answer'> {faq.answer}</div>}
						</div>
					</div>
				)
				} ) }
			</div>
		</div>
	);
}

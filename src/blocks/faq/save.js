import classnames from 'classnames';

import { useBlockProps,RichText } from '@wordpress/block-editor';

import parse from 'html-react-parser';

import SVGIcons from '@constants/icons.json';

export default function save( { attributes, className } ) {
	const { 
		id,
		faqs,
		titleTag,
		closedIcon,
		openedIcon,
		faqSchema,
		entranceAnimation,
	 } = attributes;

	
	 function renderSingleIcon(show) {

		
		if(show)
		{	
				return(
					<div className='hide-button active'>
						{
							parse(
								SVGIcons[closedIcon]
							)
						}
					</div>
				) 	
		}
		else{

				return(
					<div className='hide-button'>
						{
							parse(
								SVGIcons[openedIcon]
							)
						}
					</div>
				) 
			}
	}

	 const faqWrapper = classnames( {
		'grigora-kit-faq': true,
		[ `block-id-${ id }` ]: id,
		[ `has-entrance-animation animateOnce` ]: entranceAnimation != 'none'
	} );

	let schemaObject = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				'name': faqs[0].question,
				'acceptedAnswer': {
					'@type': 'Answer',
					'text':  faqs[0].answer,
			}
			}
		]

	}

	return (
		<div { ...useBlockProps.save( { className: faqWrapper } ) }
		>		
			<div className='faq-container'>
				{ faqs.map( ( faq, index ) => {return(
					<div className='faq-block' id={`faq-block-${id}-${index}`}> 
						<div className='faq-head'>
							<div className={`faq-question-container ${faq.hide ? '': ' active'}`}>
								<RichText.Content
									className='faq-question'
									tagName={ titleTag }
									value={ faq.question }
								/>
							</div>

								<div className='hide-button'>
									{/* {faq.hide ? renderSingleIcon(false) : renderSingleIcon(true)} */}
									<div className={`renderhide ${faq.hide ? '': ' active'}`}>{renderSingleIcon(true)}</div>
									<div className={`renderhide ${faq.hide ? ' active': ''}`}>{renderSingleIcon(false)}</div>
								</div>
						</div>
						<div className={`faq-answer-container ${faq.hide ? '': ' active'}`}>
							<RichText.Content
								className='faq-answer'
								tagName='div'
								value={ faq.answer }
							/>
						</div>
					</div>
				)
				} ) }
			</div>
			{faqSchema && <script type="application/ld+json" className={`grigora-kit-faq-schema-graph grigora-kit-faq-schema-graph--${id}`}>
				{JSON.stringify(schemaObject)}
			</script>}
		</div>
	);
}

import { createBlock } from '@wordpress/blocks';

import {

	RichText,

} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

function GrigoraFaqInput( {
    structureTagQn,
	structureTagAn,
    faq,
    faqs,
    setAttributes,
    handleDeleteButton,
    renderSingleIcon,
    renderDeleteIcon,
    iconActiveColor,
    titleActiveColor,
    contentColor
} ) {
    return (        
            
            <div className='faq-block'>

                    <div className='faq-head'>
                            <div className='faq-question-container' style={!faq.hide ? {color: titleActiveColor}: {}}>

                                <RichText
                                    tagName={ structureTagQn }
                                    value={ faq.question }
                                    onChange={ ( currentQ ) => {
                                        let newArr = [...faqs];
                                        let newFaq = faq;
                                        newFaq.question = currentQ;
                                        newArr[faqs.indexOf(faq)] = newFaq;
                                        setAttributes( { faqs: newArr} ) 
                                    }}
                                    placeholder={ __( 'Qn...' ) }
                                    className='faq-question'
                                    
                                    
                                />

                            </div>

                            <div className='hide-button' style={!faq.hide ? {color: iconActiveColor}: {}} onClick={() => {
                                let newArr = [...faqs];
                                let newFaq = faq;
                                newFaq.hide = !newFaq.hide;
                                newArr[faqs.indexOf(faq)] = newFaq;
                                setAttributes( { faqs: newArr} ) 
                            }}>{renderSingleIcon(!faq.hide)}</div>
                            <div className='delete-button' style={{color: "red"}} onClick={() => {handleDeleteButton(faq.id)}}>{renderDeleteIcon()}</div>

                    </div>

					

                    



					{(!faq.hide) && 
                    <div style={{color: contentColor}}>
                    <RichText
						tagName={ structureTagAn }
						value={ faq.answer }
						onChange={ ( currentA ) => {
                            let newArr = [...faqs];
                            let newFaq = faq;
                            newFaq.answer = currentA;
                            newArr[faqs.indexOf(faq)] = newFaq;
                            setAttributes( { faqs: newArr} )
                        } }
						placeholder={ __( 'Ans...' ) }
						className='faq-answer'
					/>
                    </div>

                    
                    }
					
				</div>)};

export default GrigoraFaqInput;
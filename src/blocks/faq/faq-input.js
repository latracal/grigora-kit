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
} ) {
    return (        
            
            <div className='faq-block'>

                    <div className='faq-head'>
                            <div className='faq-question'>

                                <RichText
                                    tagName={ structureTagQn }
                                    value={ faq.question }
                                    onChange={ ( currentQ ) => {
                                        let newArr = [...faqs];
                                        let newFaq = faq;
                                        newFaq.question = currentQ;
                                        newArr[faqs.indexOf(faq)] = newFaq;
                                        setAttributes( { faqs: newArr} ) 
                                        console.log("This is change in current question ",newFaq)
                                    }}
                                    placeholder={ __( 'Qn...' ) }
                                    
                                    
                                    
                                />

                            </div>

                            <div className='hide-button' style={!faq.hide ? {color: iconActiveColor}: {}} onClick={() => {
                                let newArr = [...faqs];
                                let newFaq = faq;
                                console.log(newFaq)
                                newFaq.hide = !newFaq.hide;
                                newArr[faqs.indexOf(faq)] = newFaq;
                                setAttributes( { faqs: newArr} ) 
                            }}>{renderSingleIcon(!faq.hide)}</div>
                            <div className='delete-button' style={{color: "red"}} onClick={() => {handleDeleteButton(faq.id)}}>{renderDeleteIcon()}</div>

                    </div>

					

                    



					{!faq.hide && 
                    <div className='faq-answer'>
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
						
						

					/>
                    </div>
                    
                    }
					
				</div>)};

export default GrigoraFaqInput;
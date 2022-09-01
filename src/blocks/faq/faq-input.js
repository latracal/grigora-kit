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

                            <button className='delete-button' style={{backgroundColor: "red"}} onClick={() => {handleDeleteButton(faq.id)}}></button>
                            <button className='hide-button' style={{backgroundColor: "black"}} onClick={() => {
                                let newArr = [...faqs];
                                let newFaq = faq;
                                console.log(newFaq)
                                newFaq.hide = !newFaq.hide;
                                newArr[faqs.indexOf(faq)] = newFaq;
                                setAttributes( { faqs: newArr} ) 
                            }}></button>

                    </div>

					

                    



					{!faq.hide && <RichText
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
						allowedFormats={ [
							'core/bold',
							'core/code',
							'core/image',
							'core/italic',
							'core/strikethrough',
							'core/underline',
							'core/subscript',
							'core/superscript',
							'core/keyboard',
							'core/link',
						] }
						

					/>}
					
				</div>)};

export default GrigoraFaqInput;
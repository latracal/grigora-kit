import { useState } from '@wordpress/element';

import SVGIcons from '@constants/icons.json';
import parse from 'html-react-parser';

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
    contentColor,
    index
} ) {

    const [renderNavigate, setRenderNavigate] = useState(-1);

    function renderNavigationButtons(index) {
	
		const delete_icon = parse( SVGIcons[ 'x-circle' ] );
		const up_icon = parse( SVGIcons[ 'chevron-up' ] );
		const down_icon = parse( SVGIcons[ 'chevron-down' ] );
		
		if (index < 1){
			return (
				<div className='naviagte-tab'>
                    <div className='navigate-icons'>
                        <div className='navigate-icon' onClick={() => navigateDown(index)}>{down_icon}</div>
                        <div className='delete-icon' onClick={() => handleDeleteButton(faqs[index].id)}>{delete_icon}</div>
                    </div>
				</div>
			)
		}

		else if (index == faqs.length - 1){
			return (
				<div className='naviagte-tab'>
                    <div className='navigate-icons'>
                        <div className='navigate-icon' onClick={() => navigateTop(index)}>{up_icon}</div>
                        <div className='delete-icon' onClick={() => handleDeleteButton(faqs[index].id)}>{delete_icon}</div>
                    </div>
				</div>
			)
		}

		else{
			return (
				<div className='naviagte-tab'>
                    <div className='navigate-icons'>
                        <div className='navigate-icon' onClick={() => navigateTop(index)}>{up_icon}</div>
                        <div className='navigate-icon' onClick={() => navigateDown(index)}>{down_icon}</div>
                        <div className='delete-icon' onClick={() => handleDeleteButton(faqs[index].id)}>{delete_icon}</div>
                    </div>
				</div>
			)
		}
		
	}

    function navigateTop(index){
        if(index > 0){
            let newFaqs = [...faqs];
            let temp = newFaqs[index];
			newFaqs[index] = newFaqs[index-1];
			newFaqs[index-1] = temp;
			setAttributes({faqs: newFaqs});		
		}
    }

    function navigateDown(index){
        if(index < faqs.length - 1){
            let newFaqs = [...faqs];
            let temp = newFaqs[index];
            newFaqs[index] = newFaqs[index+1];
            newFaqs[index+1] = temp;
            setAttributes({faqs: newFaqs});		
        }
    }


    return (        
            // Remove this
            <>
            
            
           
                
            
            <div className='faq-block' onMouseEnter={()=>setRenderNavigate(index)}	
            onMouseLeave={()=>setRenderNavigate(-1)}> 
                    <div className={`faq-head ${!faq.hide ? 'active': ''}`} >
                            {index === renderNavigate && renderNavigationButtons(index)}
                            <div className={`faq-question-container ${!faq.hide ? 'active': ''}`}>

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

                            <div className={`hide-button ${faq.hide ? '': 'active'}`}  onClick={() => {
                                let newArr = [...faqs];
                                let newFaq = faq;
                                newFaq.hide = !newFaq.hide;
                                newArr[faqs.indexOf(faq)] = newFaq;
                                setAttributes( { faqs: newArr} ) 
                            }}>{renderSingleIcon(!faq.hide)}</div>

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
					
				</div> </>)};

export default GrigoraFaqInput;
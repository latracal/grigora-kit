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
    mergeBlocks,
    onReplace,
    onRemove,
    handleDeleteButton,
} ) {
    return (        
            
            <div className='faq-block'>
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
						onSplit={ ( value, isOriginal ) => {
							let newAttributes;

							if ( isOriginal || value ) {
								newAttributes = {
									...attributes,
									content: value,
								};
							}

							const block = createBlock( name, newAttributes );

							if ( isOriginal ) {
								block.clientId = clientId;
							}

							return block;
						} }
						onMerge={ mergeBlocks }
						onReplace={ onReplace }
						onRemove={ onRemove }
					/>
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
						onSplit={ ( value, isOriginal ) => {
							let newAttributes;

							if ( isOriginal || value ) {
								newAttributes = {
									...attributes,
									content: value,
								};
							}

							const block = createBlock( name, newAttributes );

							if ( isOriginal ) {
								block.clientId = clientId;
							}

							return block;
						} }
						onMerge={ mergeBlocks }
						onReplace={ onReplace }
						onRemove={ onRemove }
					/>
					<button style={{backgroundColor: 'red'}}className='delete' onClick={() => {handleDeleteButton(faq.id)}}>Delete</button>
				</div>)};

export default GrigoraFaqInput;
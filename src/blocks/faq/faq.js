 /**
  * WordPress dependencies
  */
 import { __ } from '@wordpress/i18n'
 import { applyFilters } from '@wordpress/hooks'
 import { Button } from '@wordpress/components'
 import { Component } from '@wordpress/element'
 import { RichText } from '@wordpress/block-editor'
 
 /**
  * A Question and answer pair within FAQ block.
  */
  export default function Faq( props ){


      const { faq, key } = props;
     return(
        <div key={key}>
        <RichText
            tagName={ "h3" }

            value={ faq.question }
            onChange={ ( newQuestion ) => {
                setFaqProp( 'question', newQuestion )
            } }
            placeholder={ __( 'Question…', 'rank-math' ) }
        />
        <RichText
            tagName={ "p" }

            value={ faq.answer }
            onChange={ ( answer ) => {
                setFaqProp( 'answer', answer )
            } }
            placeholder={ __( 'Answer...', 'rank-math' ) }
        />
     </div>
     );

    function setFaqProp(prop, value){
        const { setAttributes, index } = props;
        const faqs = [ ...props.faqs ]
        faqs[ index ][ prop ] = value;
        setAttributes( { faqs } );
    }

 
 }

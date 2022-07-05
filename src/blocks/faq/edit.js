/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

import Faq from './faq'
import { isEmpty } from 'lodash'
import generateId from '@helpers/generateId'

export default function Edit( props ) {

	const {
		attributes,
		setAttributes,
	} = props;

	function renderQuestions(){
		let { faqs } = attributes
		if ( isEmpty( faqs ) ) {
			faqs = [
				{
					id: generateId( 'faq-question' ),
					question: '',
					answer: ''
				},
			]
			setAttributes( { faqs } );
		}

		return faqs.map( ( faq, index ) => {
			return (
				<li key={ faq.id } class={faq.id}>
					<Faq
						{ ...faq }
						index={ index }
						key={faq.id}
						faq={ faq }
						faqs={ faqs }
						setAttributes={ setAttributes }
					/>
				</li>
			)
		} )
	}

	function addNew(){
		const faqs = [ ...props.attributes.faqs ]
		faqs.push( {
			id: generateId( 'faq-question' ),
			question: '',
			answer: ''
		} )
		props.setAttributes( { faqs } );
	}


	return (
		<div {...useBlockProps()}>
			
			<ul>{ renderQuestions() }</ul>

			<Button
					isPrimary={ true }
					onClick={ addNew }
				>
					{ __( 'Add New FAQ', 'rank-math' ) }
					
				</Button>
		</div>
	);
}

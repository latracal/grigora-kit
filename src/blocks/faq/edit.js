import classnames from 'classnames';
import { createBlock } from '@wordpress/blocks';

import { __, _x } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentControl,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	TabPanel,
	PanelBody,
	ToggleControl,
	ToolbarButton,
	Popover,
	Button,
	Icon,
	Tooltip,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import {
	alignLeft,
	alignRight,
	alignCenter,
	alignJustify,
	link,
	linkOff,
} from '@wordpress/icons';
import { useState, useRef, useEffect } from '@wordpress/element';
import { displayShortcut } from '@wordpress/keycodes';

import parse from 'html-react-parser';

import generateId from '@helpers/generateId';
import uniqueIDs from '@helpers/uniqueID';
import IconPicker from '@components/icon-picker';
import GrigoraColorInput from '@components/color-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraBoxInput from '@components/box-input';
import SVGIcons from '@constants/icons.json';

export default function Edit( props ) {
	const {
		attributes,
		setAttributes,
		mergeBlocks,
		onReplace,
		onRemove,
		clientId,
	} = props;

	const { 
		id,
		currentQuestion,
		currentAnswer,
		questionChanged,
		answerChanged,
		newQuestion,
		newAnswer,
		faqs,
		structureTagQn,
		structureTagAn,
	
	} = attributes;



	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'faq' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'faq' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-faq': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

	const handleAddButton = () => {
		const tempID = generateId( 'faqAdd' );
		setAttributes( { faqs: [ ...faqs, { id: tempID, question: newQuestion, answer: newAnswer } ] } );
		setAttributes( { newQuestion: '' } );
		setAttributes( { newAnswer: '' } );
	}


	const handleSaveButton = (fid, prevQuestion, prevAnswer) => {
		if(questionChanged)
		{
			prevQuestion = currentQuestion;
		}

		if(answerChanged)
		{
			prevAnswer = currentAnswer;
		}

		const newFaqs = faqs.map((faq) => {
			if (faq.id === fid) {
				return {
					id: fid,
					question: prevQuestion,
					answer: prevAnswer,
				}
			} else {
				return faq;
			}
		} );
		console.log("New faqs after save", newFaqs);
		setAttributes( { faqs: newFaqs } );
		setAttributes( { currentQuestion: '' } );
		setAttributes( { currentAnswer: '' } );
		setAttributes( { questionChanged: false } );
		setAttributes( { answerChanged: false } );
	
	}


	const handleDeleteButton = ( fid ) => {
		const newFaqs = faqs.filter( ( faq ) => faq.id !== fid );
		setAttributes( { faqs: newFaqs } );
		console.log("has handleDeleteButton ", fid);
	}

	return (
		<div { ...blockProps }>
			<InspectorControls></InspectorControls>
			<style>
				{ `
				.block-id-${ id } {
				}
				` }
			</style>
			
			{/* <FaqsInput
				structureTagQn={ structureTagQn }
				structureTagAn={ structureTagAn }
				faqs={ faqs }
				onChange={ ( newFaqs ) => {
					setAttributes( { faqs: newFaqs } );
				} }
			/> */}

			{
				faqs.map( ( faq, index ) => {
					return(
				<div>
					<RichText
						tagName={ structureTagQn }
						value={ faq.question }
						onChange={ ( currentQuestion ) => setAttributes( { currentQuestion: currentQuestion, questionChanged: true } ) }
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
						onChange={ ( currentAnswer ) => setAttributes( { currentAnswer: currentAnswer, answerChanged: true } ) }
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
					<button style={{backgroundColor: 'green'}} onClick={() => handleSaveButton(faq.id, faq.question, faq.answer)}>Save</button>
					<button style={{backgroundColor: 'red'}} onClick={() => {handleDeleteButton(faq.id)}}>Delete</button>
				</div>)
				}
			)
			}
				<div>
					<RichText
						tagName={ structureTagQn }
						value={ newQuestion }
						onChange={ ( newQuestion ) => setAttributes( { newQuestion } ) }
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
						value={ newAnswer }
						onChange={ ( newAnswer ) => setAttributes( { newAnswer } ) }
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
					<button style={{backgroundColor: 'green'}} onClick={handleAddButton}>Add On</button>
				</div>
	</div>

	);
}

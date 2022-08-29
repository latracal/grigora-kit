import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import icon from './icon';

const attributes = {
	id: {
		type: 'string',
		default: '',
	},
	currentQuestion: {
		type: 'string',
		default: '',
	},
	currentAnswer: {
		type: 'string',
		default: '',
	},
	questionChanged:{
		type: 'boolean',
		default: false,
	},
	answerChanged:{
		type: 'boolean',
		default: false,
	},
	newQuestion: {
		type: 'string',
		default: '',
	},
	newAnswer: {
		type: 'string',
		default: '',
	},
	faqs: {
		type: 'array',
		default: [],
	},

	structureTagQn: {
		type: 'string',
		default: 'h3',
	},

	structureTagAn: {
		type: 'string',
		default: 'p',
	},


};



registerBlockType( metadata.name, {
	edit: Edit,
	save,
	attributes,
	icon,
} );

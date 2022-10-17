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
	required: {
		type: 'boolean',
		default: false
	},
	showLabel: {
		type: 'boolean',
		default: false
	},
	label: {
		type: 'string',
		default: ''
	},
	placeholder: {
		type: 'string',
		default: ''
	},
	defaultText: {
		type: 'string',
		default: ''
	},
	helpText: {
		type: 'string',
		default: ''
	},
	ariaDescription: {
		type: 'string',
		default: ''
	},
	autoFill: {
		type: 'string',
		default: 'name'
	}
};

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	attributes,
	supports: {
		className: false,
		customClassName: false,
		// inserter: false,
		reusable: false,
		html: false,
		lock: false,
	},
	icon,
} );

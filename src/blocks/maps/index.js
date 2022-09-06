import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import icon from './icon';

const attributes = {
	id: {
		type: 'string',
		default: '',
	},

	location: {
		type: 'string',
		default: 'Chennai',
	},

	zoom: {
		type: 'string',
		default: '11',
	},

	mapType: {
		type: 'string',
		default: 'roadmap',
	},

	mapFormat: {
		type: 'string',
		default: 'none',
	},

	apiKey: {
		type: 'string',
		default: '',
	},

	height: {
		type: 'string',
		default: '515',
	},

	maxWidth: {
		type: 'string',
		default: '720',
	},

	layoutPadding: {
		type: 'object',
		default: {
			top: '10px',
			bottom: '10px',
			left: '20px',
			right: '20px',
		},
	},
};

const supports = {
	className: false,
};


registerBlockType( metadata.name, {
	edit: Edit,
	save,
	attributes,
	supports,
	icon,
} );

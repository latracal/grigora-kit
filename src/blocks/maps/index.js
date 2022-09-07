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

	latitude: {
		type: 'string',
		default: '20.5937',
	},

	longitude: {
		type: 'string',
		default: '78.9629',
	},

	language: {
		type: 'string',
		default: 'en',
	},

	entranceAnimation: {
		type: 'string',
		default: 'none',
	},
	entranceAnimationTime: {
		type: 'number',
		default: 1,
	},

	zoom: {
		type: 'string',
		default: '5',
	},

	mapType: {
		type: 'string',
		default: 'roadmap',
	},

	mapMode: {
		type: 'string',
		default: 'place',
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
		default: '575',
	},

	layoutMargin: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
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

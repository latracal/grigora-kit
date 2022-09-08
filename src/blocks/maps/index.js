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

	apiKey:{
		type: 'string',
		default: 'AIzaSyAeSWmYilRQSpfgQc_aZgCioDWdEIy4HdY',
	},

	location: {
		type: 'string',
		default: 'New york',
	},

	latitude: {
		type: 'string',
		default: '40.7128',
	},

	longitude: {
		type: 'string',
		default: '74.0060',
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
		default: '14',
	},

	mapType: {
		type: 'string',
		default: 'roadmap',
	},

	mapMode: {
		type: 'string',
		default: 'place',
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
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
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

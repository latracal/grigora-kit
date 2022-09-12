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
	align: {
		type: 'string',
		default: '',
	},
	apiKey: {
		type: 'string',
		default: '',
	},
	location: {
		type: 'string',
		default: 'New York',
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
		default: '500',
	},
	maxWidth: {
		type: 'string',
		default: '',
	},
	layoutMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	layoutPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
};

const supports = {
	className: false,
	grigoraMotion: true,
	grigoraSticky: true,
	grigoraResponsive: true,
	grigoraPosition: true,
};

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	attributes,
	supports,
	icon,
} );

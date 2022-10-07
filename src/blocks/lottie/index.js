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

	autoplay: {
		type: 'boolean',
		default: false,
	},

	controls:{
		type: 'boolean',
		default: false,
	},

	count:{
		type: 'number',
		default: undefined,
	},

	direction:{
		type: 'number',
		default: 1,
	},

	hover:{
		type: 'boolean',
		default: false,
	},

	loop:{
		type: 'boolean',
		default: false,
	},

	mode:{
		type: 'string',
		default: 'normal',
	},

	speed:{
		type: 'number',
		default: 1,
	},

	jsonSrc:{
		type: 'string',
		default: '',
	},

	heightAnimation: {
		type: 'string',
		default: 'default',
	},

	widthAnimation: {
		type: 'string',
		default: 'default',
	},

	backgroundColor: {
		type: 'string',
		default: 'transparent',
	},
	
};

const supports = {
	customClassName: false,
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

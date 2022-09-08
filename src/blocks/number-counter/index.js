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
	countStart: {
		type: 'number',
		default: 0,
	},
	countEnd: {
		type: 'number',
		default: 100,
	},
	countTime: {
		type: 'number',
		default: 3,
	},
	numFormat: {
		type: 'boolean',
		default: false,
	},
	numSuffix: {
		type: 'string',
		default: '',
	},
	numPrefix: {
		type: 'string',
		default: '',
	},
	numTSeparator: {
		type: 'string',
		default: '',
	},
	typoSize: {
		type: 'number',
		default: 50,
	},
	typoWeight: {
		type: 'string',
		default: 'default',
	},
	typoTransform: {
		type: 'string',
		default: 'none',
	},
	typoStyle: {
		type: 'string',
		default: 'normal',
	},
	typoDecoration: {
		type: 'string',
		default: 'initial',
	},
	typoLineHeight: {
		type: 'string',
		default: 'normal',
	},
	typoLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	typoWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	effectNColor: {
		type: 'string',
		default: '#444444',
	},
	effectNRotateX: {
		type: 'string',
		default: '0deg',
	},
	effectNRotateY: {
		type: 'string',
		default: '0deg',
	},
	effectNRotateZ: {
		type: 'string',
		default: '0deg',
	},
	effectNSkewX: {
		type: 'string',
		default: '0deg',
	},
	effectNSkewY: {
		type: 'string',
		default: '0deg',
	},
	effectNOffsetX: {
		type: 'string',
		default: '0px',
	},
	effectNOffsetY: {
		type: 'string',
		default: '0px',
	},
	effectNScale: {
		type: 'number',
		default: 1,
	},
	textShadowColor: {
		type: 'string',
		default: '#000',
	},
	textShadowBlur: {
		type: 'string',
		default: '0px',
	},
	textShadowHorizontal: {
		type: 'string',
		default: '0px',
	},
	textShadowVertical: {
		type: 'string',
		default: '0px',
	},
};

const supports = {
	customClassName: false,
	grigoraMotion: true,
	grigoraResponsive: true,
};

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	attributes,
	supports,
	icon,
} );

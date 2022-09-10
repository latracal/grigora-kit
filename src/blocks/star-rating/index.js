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
	iconActiveColor: {
		type: 'string',
		default: 'orange',
	},
	iconInactiveColor: {
		type: 'string',
		default: 'black',
	},
	iconSize: {
		type: 'number',
		default: 18,
	},
	iconSpacing: {
		type: 'number',
		default: 5,
	},
	displayStars: {
		type: 'number',
		default: 5,
	},
	numStars: {
		type: 'number',
		default: 3,
	},
	icon: {
		type: 'string',
		default: 'star-fill',
	},
	activeIcon: {
		type: 'string',
		default: 'star-fill',
	},
	textSuffix: {
		type: 'string',
		default: '',
	},
	textPrefix: {
		type: 'string',
		default: '',
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
	effectHBFlag: {
		type: 'boolean',
		default: false,
	},
	transitionTime: {
		type: 'number',
		default: 0.3,
	},
	effectHRotateX: {
		type: 'string',
		default: '',
	},
	effectHRotateY: {
		type: 'string',
		default: '',
	},
	effectHRotateZ: {
		type: 'string',
		default: '',
	},
	effectHSkewX: {
		type: 'string',
		default: '',
	},
	effectHSkewY: {
		type: 'string',
		default: '',
	},
	effectHOffsetX: {
		type: 'string',
		default: '',
	},
	effectHOffsetY: {
		type: 'string',
		default: '',
	},
	effectHScale: {
		type: 'string',
		default: '',
	},
	entranceAnimation: {
		type: 'string',
		default: 'none',
	},
	entranceAnimationTime: {
		type: 'number',
		default: 1,
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

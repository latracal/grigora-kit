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
	effectNBFlag: {
		type: 'boolean',
		default: false,
	},
	effectNBGradient: {
		type: 'string',
		default:
			'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)',
	},
	effectNBColor: {
		type: 'string',
		default: '#5093d4',
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
		default: '0deg',
	},
	effectHRotateY: {
		type: 'string',
		default: '0deg',
	},
	effectHRotateZ: {
		type: 'string',
		default: '0deg',
	},
	effectHSkewX: {
		type: 'string',
		default: '0deg',
	},
	effectHSkewY: {
		type: 'string',
		default: '0deg',
	},
	effectHOffsetX: {
		type: 'string',
		default: '0px',
	},
	effectHOffsetY: {
		type: 'string',
		default: '0px',
	},
	effectHScale: {
		type: 'number',
		default: 1,
	},
};

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	attributes,
	icon,
} );

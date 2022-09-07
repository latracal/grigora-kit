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
	align: {
		type: 'string',
	},
	icon: {
		type: 'string',
		default: 'arrow-up-short',
	},
	iconSize: {
		type: 'string',
		default: '26px',
	},
	iconPadding: {
		type: 'object',
		default: {
			top: '8px',
			bottom: '8px',
			left: '8px',
			right: '8px',
		},
	},
	iconMargin: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
	},
	position: {
		type: 'string',
		default: 'fixed',
	},
	positionCoord: {
		type: 'object',
		default: {
			top: '',
			bottom: '5vh',
			left: '',
			right: '3vw',
		},
	},
	offset: {
		type: 'string',
		default: '400px',
	},
	displayScrollUp: {
		type: 'boolean',
		default: false,
	},
	effectNBorderRadius: {
		type: 'object',
		default: {
			topLeft: '100px',
			topRight: '100px',
			bottomLeft: '100px',
			bottomRight: '100px',
		},
	},
	iconColorFlag: {
		type: 'boolean',
		default: false,
	},
	iconNormalColor: {
		type: 'string',
		default: '#ffffff',
	},
	iconHoverColor: {
		type: 'string',
		default: '#ffffff',
	},
	backgroundNormalColor: {
		type: 'string',
		default: '#16537e',
	},
	backgroundHoverColor: {
		type: 'string',
		default: '#124366',
	},
	effectNShadowHO: {
		type: 'string',
		default: '0px',
	},
	effectNShadowVO: {
		type: 'string',
		default: '0px',
	},
	effectNShadowBlur: {
		type: 'string',
		default: '0px',
	},
	effectNShadowSpread: {
		type: 'string',
		default: '0px',
	},
	effectNShadowColor: {
		type: 'string',
		default: '#000',
	},
	smoothScrolling: {
		type: 'boolean',
		default: true,
	},
	zindex: {
		type: 'number',
		default: 100,
	},
	transitionTime: {
		type: 'number',
		default: 0.3,
	},
};

const supports = {
	customClassName: false,
	grigoraMotion: true,
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save,

	attributes,

	supports,

	icon,
} );

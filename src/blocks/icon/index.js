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
		default: '',
	},
	hasCustomIcon: {
		type: 'boolean',
		default: false,
	},
	customIcon: {
		type: 'string',
		default: '',
	},
	iconSize: {
		type: 'string',
		default: '20px',
	},
	iconSizeTablet: {
		type: 'string',
		default: '',
	},
	iconSizeMobile: {
		type: 'string',
		default: '',
	},
	iconPadding: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '5px',
			right: '5px',
		},
	},
	iconPaddingTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	iconPaddingMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
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
	iconMarginTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	iconMarginMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	iconColorFlag: {
		type: 'boolean',
		default: false,
	},
	iconNormalColor: {
		type: 'string',
		default: '#000',
	},
	iconHoverColor: {
		type: 'string',
		default: '',
	},
	url: {
		type: 'string',
		default: '',
	},
	opensInNewTab: {
		type: 'boolean',
		default: false,
	},
	urlnofollow: {
		type: 'boolean',
		default: false,
	},
	urlnoopener: {
		type: 'boolean',
		default: false,
	},
	urlnoreferrer: {
		type: 'boolean',
		default: false,
	},
	urlsponsored: {
		type: 'boolean',
		default: false,
	},
};

const supports = {
	anchor: true,
	className: false,
	grigoraMotion: true,
	grigoraSticky: true,
	grigoraResponsive: true,
	grigoraPosition: true,
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

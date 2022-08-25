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
	layout: {
		type: 'string',
		default: 'left'
	},
	author: {
		type: "number",
		default: -1
	},
	avatarSize: {
		type: "number",
		default: 48
	},
	showAvatar: {
		type: "boolean",
		default: true
	},
	showName: {
		type: "boolean",
		default: true
	},
	NameTag: {
		type: "string",
		default: "h3"
	},
	nameLink:{
		type: "string",
		default: "none"
	},
	showBio: {
		type: "boolean",
		default: true
	},
};

const supports = {
	customClassName: false,
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

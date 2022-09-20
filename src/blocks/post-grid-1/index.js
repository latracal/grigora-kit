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
	content1: {
		type: 'string',
		default: ''
	},
	content2: {
		type: 'string',
		default: ''
	},
	content3: {
		type: 'string',
		default: ''
	},
	post_type: {
		type: 'string',
		default: 'post'
	},
	order: {
		type: 'string',
		default: 'Ascending'
	},
	orderby: {
		type: 'string',
		default: ''
	},
	author: {
		type: 'array',
		default: []
	},
	excludeAuthor: {
		type: 'array',
		default: []
	},
	taxonomy: {
		type: 'array',
		default: []
	},
	excludeTaxonomy: {
		type: 'array',
		default: []
	},
	offset: {
		type: 'number',
		default: 0
	},
	search: {
		type: 'string',
		default: '',
	},
	afterDate: {
		type: 'string',
		default: '',
	},
	beforeDate: {
		type: 'string',
		default: '',
	},
};

const supports = {
	anchor: true,
	className: false,
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

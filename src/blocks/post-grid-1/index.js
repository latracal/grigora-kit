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
		default: 'asc'
	},
	orderby: {
		type: 'string',
		default: 'id'
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
	includePost: {
		type: 'array',
		default: []
	},
	excludePost: {
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
	align: {
		type: 'string',
		default: 'start'
	},
	ContentTag: {
		type: 'string',
		default: 'div'
	},
	newTab: {
		type: 'boolean',
		default: false,
	},
	gap: {
		type: 'number',
		default: 10,
	},
	contHeight: {
		type: 'number',
		default: 500,
	},
	maxLength: {
		type: 'number',
		default: 10,
	},
	imageBorderRadius: {
		type: 'object',
		default: {
			topLeft: '0px',
			topRight: '0px',
			bottomLeft: '0px',
			bottomRight: '0px',
		},
	},
	TitleTag: {
		type: 'string',
		default: 'h3'
	},
	titleTextColor: {
		type: 'string',
		default: 'white',
	},
	titleTextHColor: {
		type: 'string',
		default: '',
	},
	bgColor: {
		type: 'string',
		default: '',
	},
	bgHColor: {
		type: 'string',
		default: '',
	},
	transitionColorTime: {
		type: 'number',
		default: 0.2,
	},
	layoutPadding: {
		type: 'object',
		default: {
			top: '20px',
			bottom: '20px',
			left: '20px',
			right: '20px',
		},
	},
	effectNShadowHO: {
		type: 'string',
		default: '1px',
	},
	effectNShadowVO: {
		type: 'string',
		default: '7px',
	},
	effectNShadowBlur: {
		type: 'string',
		default: '14px',
	},
	effectNShadowSpread: {
		type: 'string',
		default: '-5px',
	},
	effectNShadowColor: {
		type: 'string',
		default: '#00000033',
	},
	effectHShadow: {
		type: 'boolean',
		default: false,
	},
	effectHShadowHO: {
		type: 'string',
		default: '',
	},
	effectHShadowVO: {
		type: 'string',
		default: '',
	},
	effectHShadowBlur: {
		type: 'string',
		default: '',
	},
	effectHShadowSpread: {
		type: 'string',
		default: '',
	},
	effectHShadowColor: {
		type: 'string',
		default: '#00000033',
	},
	cssFilters: {
		type: 'object',
		default: {},
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

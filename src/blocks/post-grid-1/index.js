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
		default: 5,
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
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
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
	cssHFilters: {
		type: 'object',
		default: {},
	},
	hoverAnimation: {
		type: 'string',
		default: 'No Animation'
	},
	title1TypoSize: {
		type: 'number',
		default: '16px',
	},
	title1TypoLineHeight: {
		type: 'string',
		default: 'normal',
	},
	title1TypoLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	title1TypoWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	title1TypoWordSpacing: {
		type: 'string',
		default: 'none',
	},
	title1TypoTransform: {
		type: 'string',
		default: 'none',
	},
	title1TypoStyle: {
		type: 'string',
		default: 'normal',
	},
	title1TypoDecoration: {
		type: 'string',
		default: 'initial',
	},
	title1TypoWeight: {
		type: 'string',
		default: 'default',
	},
	title1TypoFontFamily: {
		type: 'string',
		default: '',
	},
	title234TypoSize: {
		type: 'number',
		default: '16px',
	},
	title234TypoLineHeight: {
		type: 'string',
		default: 'normal',
	},
	title234TypoLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	title234TypoWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	title234TypoWordSpacing: {
		type: 'string',
		default: 'none',
	},
	title234TypoTransform: {
		type: 'string',
		default: 'none',
	},
	title234TypoStyle: {
		type: 'string',
		default: 'normal',
	},
	title234TypoDecoration: {
		type: 'string',
		default: 'initial',
	},
	title234TypoWeight: {
		type: 'string',
		default: 'default',
	},
	title234TypoFontFamily: {
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

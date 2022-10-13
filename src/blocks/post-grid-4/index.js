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
	posts: {
		type: 'number',
		default: 6,
	},
	columns: {
		type: 'number',
		default: 3,
	},
	post_type: {
		type: 'string',
		default: 'post',
	},
	order: {
		type: 'string',
		default: 'asc',
	},
	orderby: {
		type: 'string',
		default: 'id',
	},
	author: {
		type: 'array',
		default: [],
	},
	excludeAuthor: {
		type: 'array',
		default: [],
	},
	selectedTaxOption: {
		type: 'object',
		default: {
			category: { terms: [], include_children: true },
			tag: { terms: [] },
		},
	},
	selectedExcludeTaxOption: {
		type: 'object',
		default: {
			category: { terms: [], include_children: true },
			tag: { terms: [] },
		},
	},
	taxonomy: {
		type: 'array',
		default: [],
	},
	excludeTaxonomy: {
		type: 'array',
		default: [],
	},
	includePost: {
		type: 'array',
		default: [],
	},
	excludePost: {
		type: 'array',
		default: [],
	},
	offset: {
		type: 'number',
		default: 0,
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
		default: 'start',
	},
	ContentTag: {
		type: 'string',
		default: 'div',
	},
	newTab: {
		type: 'boolean',
		default: false,
	},
	excerptToggle: {
		type: 'boolean',
		default: false,
	},
	categoryToggle: {
		type: 'boolean',
		default: false,
	},
	authorToggle: {
		type: 'boolean',
		default: false,
	},
	dateToggle: {
		type: 'boolean',
		default: false,
	},
	gap: {
		type: 'number',
		default: 5,
	},
	contHeight: {
		type: 'number',
		default: 300,
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
	overlayColor: {
		type: 'string',
		default: '',
	},
	overlayGradient: {
		type: 'string',
		default: '',
	},
	overlayOpacity: {
		type: 'number',
		default: 40,
	},
	transitionColorTime: {
		type: 'number',
		default: 0.2,
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
		default: '#000',
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
		default: 'none',
	},
	TitleTag: {
		type: 'string',
		default: 'h3',
	},
	maxLength: {
		type: 'number',
		default: 10,
	},
	contentMaxLength: {
		type: 'number',
		default: 10,
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
	layoutPadding: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
	},
	titleTypoSize: {
		type: 'number',
		default: 24,
	},
	titleTypoLineHeight: {
		type: 'string',
		default: 'normal',
	},
	titleTypoLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	titleTypoWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	titleTypoTransform: {
		type: 'string',
		default: 'none',
	},
	titleTypoStyle: {
		type: 'string',
		default: 'normal',
	},
	titleTypoDecoration: {
		type: 'string',
		default: 'initial',
	},
	titleTypoWeight: {
		type: 'string',
		default: 'default',
	},
	titleTypoFontFamily: {
		type: 'string',
		default: '',
	},
	contentTypoSize: {
		type: 'number',
		default: 16,
	},
	contentTypoLineHeight: {
		type: 'string',
		default: 'normal',
	},
	contentTypoLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	contentTypoWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	contentTypoTransform: {
		type: 'string',
		default: 'none',
	},
	contentTypoStyle: {
		type: 'string',
		default: 'normal',
	},
	contentTypoDecoration: {
		type: 'string',
		default: 'initial',
	},
	contentTypoWeight: {
		type: 'string',
		default: 'default',
	},
	contentTypoFontFamily: {
		type: 'string',
		default: '',
	},
	elementsList: {
		type: 'object',
		default: { elements: [ 'Category', 'Title', 'Excerpt', 'Meta' ] },
	},
	categoryLink: {
		type: 'boolean',
		default: false,
	},
	catBorderRadius: {
		type: 'object',
		default: {
			topLeft: '0px',
			topRight: '0px',
			bottomLeft: '0px',
			bottomRight: '0px',
		},
	},
	categoryTextColor: {
		type: 'string',
		default: 'white',
	},
	categoryTextHColor: {
		type: 'string',
		default: '',
	},
	bgCatColor: {
		type: 'string',
		default: '',
	},
	bgHCatColor: {
		type: 'string',
		default: '',
	},
	layoutCatPadding: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
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

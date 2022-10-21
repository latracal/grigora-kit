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
	categoryLink: {
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
		default: 500,
	},
	maxLength: {
		type: 'number',
		default: 10,
	},
	contentMaxLength: {
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
	catBorderRadius: {
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
		default: 'h3',
	},
	overlayColor: {
		type: 'string',
		default: '',
	},
	overlayGradient: {
		type: 'string',
		default:
			'linear-gradient(175deg,rgba(255,255,255,0) 0%,rgba(255,255,255,0) 61%,rgb(0,0,0) 100%)',
	},
	overlayOpacity: {
		type: 'number',
		default: 40,
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
	title1TypoSize: {
		type: 'number',
		default: 24,
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
		default: 24,
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
	transitionBgColorTime: {
		type: 'number',
		default: 0.2,
	},
	transitionCatColorTime: {
		type: 'number',
		default: 0.2,
	},
	transitionCatBgColorTime: {
		type: 'number',
		default: 0.2,
	},
	transitionImageTime: {
		type: 'number',
		default: 0.2,
	},
	transitionShadowTime: {
		type: 'number',
		default: 0.2,
	},
	catTypoSize: {
		type: 'number',
		default: 16,
	},
	catTypoLineHeight: {
		type: 'string',
		default: 'normal',
	},
	catTypoLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	catTypoWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	catTypoTransform: {
		type: 'string',
		default: 'none',
	},
	catTypoStyle: {
		type: 'string',
		default: 'normal',
	},
	catTypoDecoration: {
		type: 'string',
		default: 'initial',
	},
	catTypoWeight: {
		type: 'string',
		default: 'default',
	},
	catTypoFontFamily: {
		type: 'string',
		default: '',
	},
	metaTypoSize: {
		type: 'number',
		default: 12,
	},
	metaTypoLineHeight: {
		type: 'string',
		default: 'normal',
	},
	metaTypoLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	metaTypoWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	metaTypoTransform: {
		type: 'string',
		default: 'none',
	},
	metaTypoStyle: {
		type: 'string',
		default: 'normal',
	},
	metaTypoDecoration: {
		type: 'string',
		default: 'initial',
	},
	metaTypoWeight: {
		type: 'string',
		default: 'default',
	},
	metaTypoFontFamily: {
		type: 'string',
		default: '',
	},
};

const supports = {
	customClassName: false,
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
